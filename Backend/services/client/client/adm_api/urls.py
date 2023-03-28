from django.urls import re_path

from .views import *

app_name ="adm"

urlpatterns = [
    re_path(r'^create_user$', create_user, name='create_user'),   
]