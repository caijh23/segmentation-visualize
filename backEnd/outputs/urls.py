from django.conf.urls import url
from outputs import views

urlpatterns = [
	url(r'outputs/{0,1}$',views.output_list),
]