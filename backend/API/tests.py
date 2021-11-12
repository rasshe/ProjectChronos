from django.test import TestCase
from .models import *
from django.test import Client
from django.contrib.auth.models import User
from django.urls import reverse
from datetime import datetime, timedelta
from django.utils import timezone
from django.contrib import auth
from .serializers import  *
from django.core import serializers

# Create your tests here.
class APITestCase(TestCase):
    """API tests:


    [] SomeView
    [] RegisterView
    [] UserView
    [] custom_event
    [] event_detail
    [] CalendarView
    [] CalendarParserView
    [] DeadlineView
    [] PublicEventView
    []

    Args:
        TestCase ([type]): [description]
    """
    def setUp(self):
        
        self.log_user = User.objects.create_user('lemon123', 'Lemonade@chronos.com', 'Yippyyy!2315415ds')
        self.log_user.save()
        self.user = User.objects.create(username='testuser12')
        self.user.set_password('1234567B!')
        self.user.save()

        cal = Calendar(user_id=self.user)
        cal.save()
        for i in range(10):
            data ={
            "name":"Test-event"+str(i),
            "owner_id":self.user,
            "description":"newdesct",
            "starting_time":timezone.now()+timedelta(hours=1),
            "end_time":timezone.now()+timedelta(hours=2),
            "is_public":False,
            "place":"Anywhere",
            "attendees":0
            }    
            ev = Study_events(**data)
            ev.save()
            cal.studyevents.add(ev)
        self.cal = cal
    def test_user_register(self):
        """
        1. Is endpoint accessible
        2. Works as indented?
        """
        c = Client()
        data = {"username":"Testname","password1":"Yippyyy!2315415ds","password2":"Yippyyy!2315415ds"}
        
        user_count = User.objects.all().count()
        
        respo = c.post(reverse('user_registration'),data)
        
        user_count_after = User.objects.all().count()

        self.assertEqual(respo.status_code,200,"Response code was not 200")
        #print(respo,user_count,user_count_after)
        self.assertEqual(user_count+1,user_count_after,"User object was not created")
        #user_registration

    def test_event_custom(self):
        """create custom event
            Not logging user in.
        """
        c = Client()
        
        data ={
            "name":"Test-event44",
            #"owner_id":1,
            "description":"newdesct",
            "starting_time":timezone.now()+timedelta(hours=1),
            "end_time":timezone.now()+timedelta(hours=2),
            "is_public":False,
            "place":"Anywhere",
            #"attendees":0
            }
        
        ev_count1 = Study_events.objects.all().count()
        resp1 = c.post(reverse('event_custom'),data)
        ev_count_after1 = Study_events.objects.all().count()
       
        self.assertEqual(ev_count1,ev_count_after1,"Object was created as Anonomyous user. ")
            
       
        login = c.login(username='testuser12', password='1234567B!')
        #login = c.force_login(user)
        #print(c,login,user)
        ev_count = Study_events.objects.all().count()
        
        resp = c.post( reverse('event_custom'), data )
        
        ev_count_after = Study_events.objects.all().count()

        self.assertEqual(resp.status_code,200,"Was not success.")

        self.assertEqual(ev_count+1,ev_count_after,"Object was not created as logged in user")

        c.logout()


    def test_event_edit(self):
        data ={
            "name":"Test-event44",
            "owner_id":self.user,
            "description":"newdesct",
            "starting_time":timezone.now()+timedelta(hours=1),
            "end_time":timezone.now()+timedelta(hours=2),
            "is_public":False,
            "place":"Anywhere",
            "attendees":0
            }
        ev = Study_events(**data)
        ev.save()

        c = Client()
        login = c.login(username='testuser12', password='1234567B!')

        resp = c.get(reverse('Event_detail',args=[ev.id]))

        self.assertEqual(resp.status_code,200,"Request was not successful.")
        self.assertJSONEqual(resp.content,EventSerializer(ev).data,"Returned Data was not correct.")
        
        mod_ev ={"is_publicXXX":True}
        
        resp = c.post(reverse('Event_detail',args=[ev.id+549023527398]),mod_ev)
        self.assertEqual(resp.status_code,404,"Request was successful for non existing object")


        mod_ev ={"is_public":True}
        
        resp = c.post(reverse('Event_detail',args=[ev.id]),mod_ev)
    
        self.assertEqual(resp.status_code,200,"Request was not successful.")
        #refetch ev object
        ev = Study_events.objects.get(id= ev.id)
        self.assertTrue(ev.is_public,"Object was not modified")

        # object is not public


        an_c = Client()


        resp = an_c.get(reverse('Event_detail',args=[ev.id]))

        self.assertEqual(resp.status_code,200,"cannot fetch public event as unauthorized")
        self.assertJSONEqual(resp.content,EventSerializer(ev).data,"Returned Data was not correct.")
        
        pass
        
    def test_PublicEventView(self):
        
        for i in range(5):
            data ={
                "name":"Test-event44",
                "owner_id":self.user,
                "description":"newdesct",
                "starting_time":timezone.now()+timedelta(hours=1),
                "end_time":timezone.now()+timedelta(hours=2),
                "is_public":True,
                "place":"Anywhere",
                "attendees":0
                }
            EV = Study_events(**data)
            EV.save()
        c = Client()
        resp = c.get(reverse('All_public_events'))
        self.assertEqual(resp.status_code,200,"Was not successful")
        public_events = Study_events.objects.filter(is_public=True)
        self.assertJSONEqual(resp.content, serializers.serialize("json", public_events), "Recieved data was not correct. ")
        

    '''
    def test_deadlines(self):
        c = Client()

        resp = c.get('Calendar_deadlines')

        self.assertEqual(resp.status_code,404,"Should be unauthorized")

        #Calendar_deadlines
    '''
    def test_get_public_events(self):
        #Calendar_events#
        # build a calendar for our user
        import json
        c = Client()

        respinit = resp = c.get(reverse('Calendar_events'))
        self.assertEqual(respinit.status_code,401,"Was not unauthorized statuscode as Anonomous user")

        login = c.login(username='testuser12', password='1234567B!')

        resp = c.get(reverse('Calendar_events'))
        self.assertEqual(resp.status_code,200,"Was not successful")
        
        
        
        #self.assertEqual(resp.content, json.load(serializers.serialize("json", self.cal.studyevents.all())), "Returned incorrect data.")
        #return 0
        


        #All_public_events

