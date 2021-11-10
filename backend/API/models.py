from django.db import models
from django.contrib.auth.models import User

   
class Study_events(models.Model):
    name = models.CharField(max_length= 30)
    owner_id = models.ForeignKey(User, on_delete= models.CASCADE)
    description = models.CharField(max_length= 30, blank= True, default="")
    starting_time = models.DateTimeField()
    end_time = models.DateTimeField()
    is_public = models.BooleanField(default=False)
    place = models.CharField(max_length= 30,blank=True, default="")
    attendees = models.IntegerField(default=0)

class Deadlines(models.Model):
    name = models.CharField(max_length= 30)
    owner_id = models.ForeignKey(User, on_delete= models.CASCADE)
    description = models.CharField(max_length= 30, blank= True)
    time = models.DateTimeField()
    total_allocated_time = models.IntegerField()
    completed_time = models.BooleanField(default= False)
    
class Calendar(models.Model):
    user_id = models.OneToOneField(User, on_delete= models.CASCADE)
    deadlines = models.ManyToManyField(Deadlines)
    studyevents = models.ManyToManyField(Study_events)


