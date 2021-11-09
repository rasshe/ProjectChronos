from rest_framework import serializers
from .models import Events

from .models import Study_events
  
class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Study_events
        fields = "__all__"


from django.contrib.auth.models import User

class User_serializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username']