from rest_framework import serializers
from templates.models import *

class SimpleTemplateSerializer(serializers.ModelSerializer):
	class Meta:
		model = Template
		fields = ('templateId','text')

class InputDescSerializer(serializers.ModelSerializer):
	class Meta:
		model = InputDesc
		fields = ('description',)

class OutputDescSerializer(serializers.ModelSerializer):
	class Meta:
		model = OutputDesc
		fields = ('description',)