from django.conf.urls import url
from inputs import views

urlpatterns = [
	url(r'inputs/{0,1}$',views.input_list),
]