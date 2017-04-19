from BanahawApp import Session,Mini_func
from BanahawApp.table import T_Facial_Services

class Facialmodel(Mini_func):
	def __init__(self, **kwargs):
		self.__session = Session()
		self.__args = kwargs

	def get_services(self):
		retval = None

		result = self.__session.query(T_Facial_Services).all()

		temp_list = list()
		for d in result:
			r = d.toJSONExcept()
			temp_list.append(r)

		if temp_list:
			retval = temp_list

		return retval
