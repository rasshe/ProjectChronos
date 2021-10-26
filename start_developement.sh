#!/bin/bash
#Start virtual env...
source ../virtual1/bin/activate

#Start Django and react development server
cd frontend/
npm start&
python3 ../backend/manage.py runserver

