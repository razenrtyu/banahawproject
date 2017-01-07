from BanahawApp import Session,Mini_func
from BanahawApp.table import T_Healing_Packages


class Healing_Packages_data(Mini_func):
	def __init__(self,**kwargs):
		self.__session = Session()
		self.__args = kwargs
		self._retval = list()
		self.__search_filter = list()
		self.__search_param = ['service_name']
		self.__data = None

		if not self.__args:
			self.__data = self.__session.query(T_Healing_Packages).order_by(T_Healing_Packages.healing_packages_id).all()

			for d in self.__data:
				r = d.toJSONExcept()
				self._retval.append(r)

		else:
			for key in self.__search_param:
				if key in self.__args and self.__args[key] not in (None,""):
					self.__search_filter.append(getattr(T_Healing_Packages,key)==self.__args[key])

			if len(self.__search_filter) != 0:
				self.__data = self.__session.query(T_Healing_Packages).filter(*self.__search_filter).order_by(
					T_Healing_Packages.healing_packages_id).all()

				for d in self.__data:
					r = d.toJSONExcept()
					self._retval.append(r)

	def __del__(self):
		if self.__session is not None:
			self.__session.close()