from flask_restful import Resource, reqparse
from .model import Transactions_data

class Transactions(Resource):
	def __init__(self):
		self.__reqparser = reqparse.RequestParser()
		self.__args = dict()

	def get(self):
		retval = dict()
		status = 200

		args_list = [('active',bool,'args',None,False),
					 ('transaction_type',str,'json',None,False),
					 ('from',str,'json',None,False),
					 ('to',str,'json',None,False)]

		for args in args_list:
			self.__reqparser.add_argument(args[0],type=args[1],location=args[2],default=args[3],required=args[4])

		self.__args = self.__reqparser.parse_args()

		querytype = None

		transaction = Transactions_data(querytype,**self.__args)
		result = transaction.get_data()
		retval = result

		return retval, status

	def post(self):
		status = 201

		args_list = [('transaction_type',str,'json',None,False),
					 ('client_name',str,'json',None,False),
					 ('client_type',str,'json',None,False),
					 ('branch',str,'json',None,False),
					 ('service_type',str,'json',None,False),
					 ('service',str,'json',None,False),
					 ('add_ons',str,'json',None,False),
					 ('products',str,'json',None,False),
					 ('attendant_name',str,'json',None,False),
					 ('attendantid',str,'json',None,False),
					 ('estimated_time',int,'json',None,False),
					 ('time_spent',int,'json',None,False),
					 ('total_amount',int,'json',None,False),
					 ('payment_type',str,'json',None,False),
					 ('active',bool,'json',True,False),
					 ('datestart',str,'json',None,False),
					 ('dateend',str,'json',None,False)]

		for args in args_list:
			self.__reqparser.add_argument(args[0],type=args[1],location=args[2],default=args[3],required=args[4])

		self.__args = self.__reqparser.parse_args()

		querytype = None

		transaction = Transactions_data(querytype)

		transaction.insert_transaction(**self.__args)

		return status

	def put(self):
		retval = dict()
		status = 200

		update_args = dict()

		args_update_list = [('payment_type', str, 'json', 'None', True),
							('dateend', str, 'json', 'None', True),
							('time_spent', int, 'json', 'None', True),
							('active', bool, 'json', 'None', True),
							('transactionid', int, 'args', 'None', True)]

		for args in args_update_list:
			self.__reqparser.add_argument(args[0],type=args[1],location=args[2],default=args[3],required=args[4])

		update_args = self.__reqparser.parse_args()

		querytype = None

		transaction = Transactions_data(querytype)

		result = transaction.edit_transaction(**update_args)

		if result:
			retval['data'] = [{'Message':'Update Complete'}]
		else:
			retval['data'] = [{'Message':'Update Failed'}]

		return retval,status

	def delete(self):
		status = 204

		args_list = [('transactionid', int, 'args', 'None', True)]

		for args in args_list:
			self.__reqparser.add_argument(args[0],type=args[1],location=args[2],default=args[3],required=args[4])

		self.__args = self.__reqparser.parse_args()

		querytype = None

		transaction = Transactions_data(querytype,**self.__args)

		result = transaction.del_transaction()

		return status


