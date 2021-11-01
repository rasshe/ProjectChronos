from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Calendar, Deadlines
from .serializers import EventSerializer
import icalendar
import json
from datetime import datetime


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
    events = own_calendar.events.all()
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
    print(calendar)
    deadlines = json.loads(request.POST.get("data", []))
    print(deadlines, type(deadlines))
    for deadline in deadlines:
        print(deadline)
        deadline_object = Deadlines.objects.create(
            name = deadline["summary"],
            owner_id = request.user,
            description = deadline["description"],
            time = datetime.strptime(deadline["time"], "%Y-%m-%dT%H:%M:%SZ"),
            total_allocated_time = deadline["allocation"],
            completed_time = 0
        )
        calendar.events.add(deadline_object)
    calendar.save()
    return HttpResponse("GOOD")