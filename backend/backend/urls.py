"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from API.views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/accounts/',include('django.contrib.auth.urls')),

    path('api/register/',RegisterView,name="user_registration"),
    path('api/form/', SomeView),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/calendar/', CalendarView,name='Calendar_events'),
    path('api/calendar_file/', CalendarParserView,name="Cal_parser"),
    path('api/deadlines/', DeadlineView,name="Calendar_deadlines"),
    path('api/public_events/', PublicEventView,name="All_public_events"),

    path('api/sharedevent/<str:uid>',get_shared_link,name="Shared_event"),
    path('api/view_event_detail/<int:id>',event_detail,name="Event_detail"),
    path('api/custom_event/',custom_event,name="event_custom"),
    path('api/custom_event_and_move/',add_custom_event_and_move),
    path('api/user/', UserView),


    path('api/joinevent/<str:unique_id>',join_event,name="Join_event"),


] 