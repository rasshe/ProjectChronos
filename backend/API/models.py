from django.db import models

class User(models.Model):
    first_name = models.CharField(max_length= 30)
    last_name = models.CharField(max_length= 30)

class Calendar(models.Model):
    user_id = models.OneToOneField("User", on_delete= models.CASCADE)
    events = models.ManyToManyField('Events')

class Events(models.Model):
    name = models.CharField(max_length= 30)
    owner_id = models.OneToOneField("User", on_delete= models.CASCADE)
    


# Create your models here.
