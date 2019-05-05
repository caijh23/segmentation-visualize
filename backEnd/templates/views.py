from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from templates.models import *
from templates.serializers import *
import network_instance

network_instance.initModels(Template.objects.all())

@csrf_exempt
def template_list(request):
	'''all templates'''
	if request.method == 'GET':
		templates = Template.objects.all()
		serializer = SimpleTemplateSerializer(templates,many=True)
		return JsonResponse({'template_lists': serializer.data})
	elif  request.method == 'POST':
		data = JSONParser().parse(request)
		network_instance.addModel(data['path'], data['text'])
		try:
			newTemplate = Template()
			newTemplate.text = data['text']
			newTemplate.path = data['path']
			newTemplate.save()
		except BaseException as e:
			print(e)
			return HttpResponse(status=400)
		try:
			for item in data['input_lists']:
				newInput = InputDesc(templateId=newTemplate,description=item)
				newInput.save()
			for item in data['output_lists']:
				newOutput = OutputDesc(templateId=newTemplate,description=item)
				newOutput.save()
		except BaseException as e:
			print(e)
			return HttpResponse(status=400)
		return JsonResponse({'text': newTemplate.text, 'templateId': newTemplate.id})

	return HttpResponse(status=404)

@csrf_exempt
def template_detail(request,id):
	try:
		template = Template.objects.get(pk=id)
	except Template.DoesNotExist:
		return HttpResponse(status=404)

	if request.method == 'GET':
		try:
			inputdescs = InputDesc.objects.filter(templateId=template)
		except InputDesc.DoesNotExist:
			return HttpResponse(status=404)
		try:
			outputdescs = OutputDesc.objects.filter(templateId=template)
		except OutputDesc.DoesNotExist:
			return HttpResponse(status=404)
		input_lists = [desc.description for desc in inputdescs]
		output_lists = [desc.description for desc in outputdescs]
		return JsonResponse({'input_lists': input_lists, 'output_lists': output_lists})