from django.conf.urls import url
from templates import views

urlpatterns = [
    url(r'templates/{0,1}$',views.template_list),
    url(r'templates/(?P<id>[0-9]+)/{0,1}$',views.template_detail),
]