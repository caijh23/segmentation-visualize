from django.db import models

class ImgOutput(models.Model):
	img = models.ImageField(upload_to="output_img")
	filename = models.CharField(max_length=100,blank=True,default='')

	def __str__(self):
		return 'img_out_' + str(self.id)
	@property
	def imgId(self):
		return self.id