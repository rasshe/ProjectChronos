from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Calendar
from .serializers import EventSerializer


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

