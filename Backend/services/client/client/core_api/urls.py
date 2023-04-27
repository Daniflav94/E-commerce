from django.urls import re_path

from .views import *

app_name ="core"

urlpatterns = [
    re_path(r'^get_products/(?P<pk>\d+)$', get_products, name='get_products'),
    re_path(r'^get_products$', get_products, name='get_all_products'),
    re_path(r'^feature_products$', feature_products, name='feature_products'),  
    re_path(r'^get_products_category$', get_products_category, name='get_products_category'),  
    re_path(r'^search_products$', search_products, name='search_products'),
    re_path(r'^create_client$', create_client, name='create_client'), 
    re_path(r'^add_product_car$', add_product_car, name='add_product_car'),
    re_path(r'^login$', login, name='login'),
]