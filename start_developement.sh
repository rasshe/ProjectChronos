#Start virtual env...
source ../django/bin/activate

#Start Django and react development server
cd frontend/
npm start&
python3 ../backend/manage.py runserver

