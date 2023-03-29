from django.urls import re_path

from .views import *

app_name ="adm"

urlpatterns = [
    re_path(r'^create_new_product$', create_new_product, name='create_new_product'), 
    re_path(r'^edit_product/(?P<pk>\d+)$', edit_product, name='edit_product'),   
    re_path(r'^create_product_category$', create_product_category, name='create_product_category'),   
]