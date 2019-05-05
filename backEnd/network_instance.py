# coding=utf-8

import imp
import os
import sys

__all__ = ["runModel","initModels","addModel"]

_g = None

class _NetWork():
	"""docstring for _NetWork"""
	def __init__(self):
		self.models = []
		self.isInit = False

	def runModel(self, index, img_lists):
		print('running model...')
		print(index)
		return self.models[index].runModel(img_lists)

	def initModels(self, templates):
		print('loading networks...')
		if self.isInit:
			return True
		for template in templates:
			path = template.path
			name = template.text
			if path not in sys.path:
				sys.path.append(path)
			mod = imp.load_source(name + '.pkg',path + '/predict.py')
			model = mod.Predict()
			self.models.append(model)
		self.isInit = True
		return True

	def addModel(self, path, name):
		print('adding networks...')
		if path not in sys.path:
			sys.path.append(path)
		print(sys.path)
		mod = imp.load_source(name + '.pkg',path + '/predict.py')
		model = mod.Predict()
		self.models.append(model)


if _g is None:
	_g = _NetWork()

def runModel(index,img_lists):
	return _g.runModel(index, img_lists)

def initModels(templates):
	return _g.initModels(templates)

def addModel(path, name):
	return _g.addModel(path, name)