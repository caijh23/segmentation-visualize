from rest_framework import serializers
from inputs.models import *

class ImgInputSerializer(serializers.ModelSerializer):
	class Meta:
		model = ImgInput
		fields = ('imgId','filename',)