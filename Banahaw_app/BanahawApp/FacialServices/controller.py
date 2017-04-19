from flask_restful import Resource, reqparse
from .model import Facialmodel


class Facialhandler(Resource):
	def __init__(self):
		self.__reqparser = reqparse.RequestParser()
		self.__args = dict()

	def get(self):
		retval = dict()
		status = 200

		service = Facialmodel()
		result = service.get_services()

		if result:
			retval = result

		return retval, status
