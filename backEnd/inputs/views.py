from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from inputs.models import *
from inputs.serializers import *

@csrf_exempt
def input_list(request):
	'''all inputs'''
	if request.method == 'POST':
		try:
			new_img = ImgInput(
				img = request.FILES.get('file'),
				filename = request.FILES.get('file').name
			)
			new_img.save()
		except BaseException as e:
			print(e)
			return HttpResponse(status=400)
		serializer = ImgInputSerializer(new_img)
		return JsonResponse(serializer.data)

	return HttpResponse(status=404)
