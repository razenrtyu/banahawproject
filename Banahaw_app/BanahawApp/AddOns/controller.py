from flask_restful import Resource,reqparse
from .model import Add_Ons_data

class AddOns(Resource):

	def __init__(self):
		self.__reqparser = reqparse.RequestParser()
		self.__args = dict()

	def get(self):
		retval = dict()
		status = 200

		services = Add_Ons_data()
		services.get_add_ons_data()
		result = services.get_data()
		retval = result

		return retval,status

	def post(self):
		pass

	def put(self):
		status = 200

		update_args = dict()
		args_update_list = [
			('add_ons_id', int, 'json', None, True),
			('member_price', int, 'json', None, False),
			('non_member_price', int, 'json', None, False),
			('duration', int, 'json', None, False),
		]

		for args in args_update_list:
			self.__reqparser.add_argument(args[0],type=args[1],location=args[2],default=args[3],required=args[4])

		update_args = self.__reqparser.parse_args()
		services = Add_Ons_data()
		services.edit_add_ons_data(**update_args)

		return status

	def delete(self):
		pass