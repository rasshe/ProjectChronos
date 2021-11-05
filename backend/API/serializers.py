from rest_framework import serializers
from .models import Study_events
  
class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Study_events
        fields = "__all__"
