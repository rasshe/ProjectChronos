from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def SomeView(request):
    print(request)
    print(request.user)
    print(request.user.is_authenticated)
    return  HttpResponse("HELLO!!")
