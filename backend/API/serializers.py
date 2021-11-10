from rest_framework import serializers
#from .models import Events

from .models import *

from django.contrib.auth.models import User
  

# Dump all data to the user about the object.
class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Study_events
        fields = "__all__"

class DeadlinesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deadlines
        fields = "__all__"


class User_serializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username']


