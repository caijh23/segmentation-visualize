from django.db import models

class Template(models.Model):
	path = models.CharField(max_length=100,blank=True,default='')
	text = models.CharField(max_length=100,blank=True,default='')

	def __str__(self):
		return self.text
	@property
	def templateId(self):
		return self.id

class InputDesc(models.Model):
	templateId = models.ForeignKey('Template',on_delete=models.CASCADE)
	description = models.CharField(max_length=100,blank=True,default='')

	def __str__(self):
		return self.description

class OutputDesc(models.Model):
	templateId = models.ForeignKey('Template',on_delete=models.CASCADE)
	description = models.CharField(max_length=100,blank=True,default='')

	def __str__(self):
		return self.description