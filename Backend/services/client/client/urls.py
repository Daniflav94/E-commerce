from django.conf.urls import include
from django.urls import re_path

from client.adm_api import urls as adm_urls
from client.payment_api import urls as payment_urls
from client.core_api import urls as core_urls

urlpatterns = [
    re_path(r'^adm/', include(adm_urls, namespace='adm')),
    re_path(r'^payment/', include(payment_urls, namespace='payment')),
    re_path(r'^core/', include(core_urls, namespace='core')),
]
