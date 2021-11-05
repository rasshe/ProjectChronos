from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Calendar, Deadlines, Study_events
from .serializers import EventSerializer
import icalendar
import json
from datetime import datetime, timedelta
import math


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def SomeView(request):
    print(request)
    print(request.user)
    print(request.user.is_authenticated)
    return  HttpResponse("HELLO!!")

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def CalendarView(request):
    own_calendar = Calendar.objects.get(user_id = request.user)
    events = own_calendar.studyevents.all()
    serializer = serializers.serialize("json", events)
    return JsonResponse(serializer, safe=False)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def CalendarParserView(request):
    calendar_file = request.FILES["file"]
    gcal = icalendar.Calendar.from_ical(calendar_file.read())
    deadlines = []
    for component in gcal.walk():
        if component.name == "VEVENT":
            startdt = component.get('dtstart').dt
            enddt = component.get('dtend').dt
            summary = component.get('summary')
            description = component.get('description')
            if startdt == enddt:
                deadlines.append({"time": startdt, "summary": summary, "description": description})
    return  JsonResponse(deadlines, safe=False)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def DeadlineView(request):
    calendar, _ = Calendar.objects.get_or_create(user_id=request.user)
    deadlines = json.loads(request.POST.get("data", []))
    for deadline in deadlines:
        deadline_object = Deadlines.objects.create(
            name = deadline["summary"],
            owner_id = request.user,
            description = deadline["description"],
            time = datetime.strptime(deadline["time"], "%Y-%m-%dT%H:%M:%SZ"),
            total_allocated_time = deadline["allocation"],
            completed_time = 0
        )
        calendar.deadlines.add(deadline_object)
    simple_schedule(deadlines, request.user, calendar)
    calendar.save()
    return HttpResponse("GOOD")


def create_events(deadline, allocation, day, time, hours_left_day, now, user, calendar, suffix=0):
    if allocation <= hours_left_day:
        start_time = now + timedelta(day)
        start_time = start_time.replace(hour=time, minute=0)
        end_time = now + timedelta(day)
        end_time = end_time.replace(hour=time+allocation, minute=0)
        event = Study_events.objects.create(
            starting_time = start_time,
            end_time = end_time,
            name = deadline["summary"] + suffix,
            description = deadline["description"],
            owner_id = user,
            attendees = 1
        )
        calendar.studyevents.add(event)
        return (0, allocation)
    else:
        start_time = now + timedelta(day)
        start_time = start_time.replace(hour=time, minute=0)
        end_time = now + timedelta(day)
        end_time = end_time.replace(hour=time + hours_left_day, minute=0)
        event = Study_events.objects.create(
            starting_time = start_time,
            end_time = end_time,
            name = deadline["summary"] + suffix,
            description = deadline["description"],
            owner_id = user,
            attendees = 1
        )
        calendar.studyevents.add(event)
        return (allocation - hours_left_day, hours_left_day)

def simple_schedule(deadlines, user, calendar):
    now = datetime.now()
    start_weekday = 1
    if now.weekday() + 1 >= 5:
        start_weekday = 7 - now.weekday() + 1
    start_time = 9
    hours_per_day = 6
    hours_allocated = 0
    sorted_deadlines = sorted(deadlines, key=lambda d: d['time'])
    for deadline in sorted_deadlines:
        allocation = int(deadline["allocation"])
        left_of_allocation = allocation
        iteration = 1
        while left_of_allocation > 0:
            day = math.ceil(hours_allocated / hours_per_day) + start_weekday
            if (now + timedelta(day)).weekday() >= 5:
                hours_allocated+=2*hours_per_day
                day = math.ceil(hours_allocated / hours_per_day) + start_weekday
            done_this_day = hours_allocated % hours_per_day
            print("DAY: ", day, "TIME: ", start_time + done_this_day, "LEFT: ", hours_per_day - done_this_day)
            left_of_allocation, used_time = create_events(
                deadline, 
                left_of_allocation,
                day, 
                start_time + done_this_day, #time
                hours_per_day - done_this_day, #hours left day
                now,
                user,
                calendar,
                suffix="({})".format(iteration))
            iteration += 1
            hours_allocated += used_time