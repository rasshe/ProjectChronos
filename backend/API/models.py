from django.db import models
from django.contrib.auth.models import User


class Events(models.Model):
    name = models.CharField(max_length= 30)
    owner_id = models.OneToOneField(User, on_delete= models.CASCADE)
    description = models.CharField(max_length= 30, blank= True)
    
class Study_events(Events):
    starting_time = models.DateTimeField()
    end_time = models.DateTimeField()
    is_public = models.BooleanField(default=False)
    place = models.CharField(max_length= 30)
    attendees = models.ManyToManyField(User)

class Deadlines(Events):
    time = models.DateTimeField
    total_allocated_time = models.IntegerField()
    completed_time = models.BooleanField(default= False)
    
class Calendar(models.Model):
    user_id = models.OneToOneField(User, on_delete= models.CASCADE)
    events = models.ManyToManyField(Events)

