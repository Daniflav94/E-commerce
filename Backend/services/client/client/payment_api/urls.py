from django.urls import re_path

from .views import *

app_name ="payment"

urlpatterns = [
    re_path(r'^pix_payment$', pix_payment, name='pix_payment'),
    re_path(r'^generate_qr_code$', generate_qr_code, name='generate_qr_code'),
    re_path(r'^pix_revision$', pix_revision, name='pix_revision'),
    re_path(r'^pix_recived$', pix_recived, name='pix_recived'),
]