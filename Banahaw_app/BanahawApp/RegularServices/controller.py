from flask_restful import Resource,reqparse
from .model import Regular_Services_data

class RegularServices(Resource):

	def __init__(self):
		self.__reqparser = reqparse.RequestParser()
		self.__args = dict()

	def get(self):
		retval = dict()
		status = 200

		services = Regular_Services_data()
		result = services.get_data()
		retval = result

		return retval,status

	def post(self):
		pass

	def put(self):
		pass

	def delete(self):
		pass