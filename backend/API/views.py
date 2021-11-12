from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from django.utils import timezone
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Calendar, Deadlines, Study_events
from .serializers import EventSerializer
import icalendar
import json
from datetime import datetime
from rest_framework.response import Response
from datetime import datetime, timedelta
import math
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, get_object_or_404, Http404


from django.contrib.auth.decorators import login_required
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

    if Calendar.objects.filter(user_id = request.user).exists():
        own_calendar = Calendar.objects.get(user_id = request.user)
        events = own_calendar.studyevents.all()
        serializer = serializers.serialize("json", events)
        return JsonResponse(serializer, safe=False)
    else:
        return JsonResponse("", safe=False)
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

@api_view(['GET'])
def PublicEventView(request):
    public_events = Study_events.objects.filter(is_public=True)
    data = serializers.serialize("json", public_events)
    return HttpResponse(data)

'''
@api_view(['GET'])
def user_data(request):
    serializer = User_serializer(request.user)
    return Response(serializer)
'''





@api_view(['POST','GET'])
def RegisterView(request):
    
    #print(UserCreationForm())
    #print('--'*10)
    #print('--'*10)

    if request.method == 'POST':
        
        user_create_form = UserCreationForm(data=request.data)

        if user_create_form.is_valid():
            a= user_create_form.save()
            #print("new user", a)
            return Response("Got it!")
        else:
            #print(user_create_form.errors)
            #print("NOGO")
            return Response("NOGO")
        
    elif request.method == "GET":
        
        return Response(UserCreationForm().as_p())
        
@permission_classes([IsAuthenticated])
def UserView(request):
    return HttpResponse(request.user.username)

def create_events(deadline, allocation, day, time, hours_left_day, now, user, calendar, suffix=0):
    if allocation <= hours_left_day:
        start_time = now + timedelta(day)
        start_time = start_time.replace(hour=time, minute=15)
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
        start_time = start_time.replace(hour=time, minute=15)
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
    now = timezone.now()
    start_weekday = 1
    if now.weekday() + 1 >= 5: #if its weekend:
        start_weekday = 7 - now.weekday() + 1
    start_time = 9
    hours_per_day = 10
    hours_allocated = 0 # this is counter!
    sorted_deadlines = sorted(deadlines, key=lambda d: d['time'])
    for deadline in sorted_deadlines:
        allocation = int(deadline["allocation"])
        left_of_allocation = allocation
        iteration = 1
        while left_of_allocation > 0:
            day = math.floor(hours_allocated / hours_per_day) + start_weekday
            if (now + timedelta(day)).weekday() >= 5:
                hours_allocated+=2*hours_per_day
                day = math.ceil(hours_allocated / hours_per_day) + start_weekday
            done_this_day = hours_allocated % hours_per_day
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


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def custom_event(request):
    """ Create Custom event

    Args:
        request ([type]): [description]

    Raises:
        Http404: Error code Http 404
    """
    #if request.user.is_authenticated() and request.method == "POST":

    if request.method == "POST":
        print("posted")
        #request.data['owner_id'] = request.user
        serializer = EventSerializer(data=request.data)
        #serializer.owner_id = request.user

        if serializer.is_valid():
            a = serializer.save(owner_id= request.user)
            print("am i saved? ", a)
        
            try:
                calendar_obj= Calendar.objects.get(user_id= request.user)
                
                #These events can be anything. 
                calendar_obj.studyevents.add(a)
            except:
                #create one? 
                print()
                return Response("ERROR: USER HAS NO CALENDAR -- bypass")
            return Response("OK")
        else:
            print("posted")
            print(serializer.errors)
            return Response("NO")
    else:
        raise Http404()
@api_view(['POST', 'GET'])
def event_detail(request,id):
    """ Modify and view event details


        Example: 
        POST:
            passing {"is_public": true}
            changes existing event to public
        GET:
            Gets event details

        TODO:
        POST: DEADLINES

    Args:
        request ([type]): [description]

    Raises:
        Http404: [description]
    """
    #event_obj = get_list_or_404(Event,id = id, owner_id=request.user)
    

    if request.method == "POST":
        
        #event_obj = get_list_or_404(Study_events,id = id, owner_id=request.user)
        
        event_obj = get_object_or_404(Study_events,id = id)
        
        #Modify event that user owns
        if Study_events.objects.filter(id= event_obj.id).exists(): 
            serializer = EventSerializer(event_obj,data=request.data,partial=True)
            print(serializer)
            if serializer.is_valid():
                a = serializer.save()
                
                #return Response("Was valid"+str(serializer.data))
                return Response("OK")
            else:

                print(serializer.errors)
                return Response("NO")
                #return Response("NO-GO:"+str(serializer.errors))
        else:
            ## Can user change deadlines (?)
            raise Http404()
    elif request.method=="GET":
        event_obj = get_object_or_404(Study_events,id = id)

        if event_obj.is_public:
            return Response(EventSerializer(event_obj).data)            
        else:
            if event_obj.owner_id == request.user:
                return Response(EventSerializer(event_obj).data)
            else:
                raise Http404()
        #return Response(EventSerializer(event_obj).data)
    '''
    elif request.method =="GET":
        event_obj = get_list_or_404(Study_events,id = id, owner_id=request.user)
        if Study_event.objects.filter(id= event_obj.id).exists():
            serializer = EventSerializer(event_obj)
            return Response(serializer.data)

        elif Deadlines.objects.filter(id= event_obj.id).exists():
            serializer = DeadlinesSerializer(event_obj)
            return Response(serializer.data)
        else:
            raise Http404()
    else:
        raise Http404()
    '''


def get_hyped_events(request):
    pass
