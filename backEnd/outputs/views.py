from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from outputs.models import *
from inputs.models import ImgInput
from templates.models import Template
import io
import sys
from PIL import Image
from django.core.files.uploadedfile import InMemoryUploadedFile
import network_instance

format_table = {
	'JPEG': 'image/jpeg',
	'PNG': 'image/png'
}

@csrf_exempt
def output_list(request):
	'''all outputs'''
	if request.method == 'POST':
		data = JSONParser().parse(request)
		image_id_lists = data['image_id_lists']
		templateId = data['templateId']
		try:
			template = Template.objects.get(pk=templateId)

			input_filenames = list(map(lambda id : ImgInput.objects.get(pk=id).filename.split('.')[0],image_id_lists))
			input_imgs = list(map(lambda id : ImgInput.objects.get(pk=id).img.file.name, image_id_lists))

			output_imgs, out_format = network_instance.runModel(templateId - 1,input_imgs)
			output_prefix = '_'.join(input_filenames) + '_' + template.text + '_'
			imgUrl = []

			for index, matrix in enumerate(output_imgs):
				thumb_io = io.BytesIO()
				image = Image.fromarray(matrix)
				image.save(thumb_io,format=out_format)
				thumb_io.seek(0)
				format_str = format_table[out_format]
				filename = output_prefix + str(index) + '.' + format_str.split('/')[-1]
				thumb_file = InMemoryUploadedFile(thumb_io,None,filename,format_str,sys.getsizeof(thumb_io),None)
				outputimg = ImgOutput(img=thumb_file,filename=filename)
				outputimg.save()
				thumb_io.close()
				imgUrl.append('./api' + outputimg.img.url)
		except Template.DoesNotExist:
			return HttpResponse(status=404)
		except ImgInput.DoesNotExist:
			return HttpResponse(status=404)
		except BaseException:
			return HttpResponse(status=400)
		return JsonResponse({'imgUrl': imgUrl})
	return HttpResponse(status=404)
