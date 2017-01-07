from flask_restful import Resource,reqparse
from .model import Member01_data

class Member01(Resource):

	def __init__(self):
		self.__reqparser = reqparse.RequestParser()
		self.__args = dict()

	def get(self):
		retval = dict()
		status = 200

		args_list = [('member00id',str,'args',None,True)]

		for args in args_list:
			self.__reqparser.add_argument(args[0],type=args[1],location=args[2],default=args[3],required=args[4])

		self.__args = self.__reqparser.parse_args()

		services = Member01_data(**self.__args)
		result = services.get_data()
		retval = result

		return retval,status

	def post(self):
		pass

	def put(self):
		pass

	def delete(self):
		pass