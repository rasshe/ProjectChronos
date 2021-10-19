from django.shortcuts import render
from django.contrib.auth.models import User
from .models import *
from django.contrib.auth import login, logout

def LoginView(request):
    if request.method == "POST":
        pass

# Create your views here.
