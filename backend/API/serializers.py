from rest_framework import serializers
from .models import Events

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Events
        fields = "__all__"


from django.contrib.auth.models import User

class User_serializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username']