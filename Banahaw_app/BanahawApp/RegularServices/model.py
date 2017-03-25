from BanahawApp import Session,Mini_func
from BanahawApp.table import T_Regular_Services


class Regular_Services_data(Mini_func):
	def __init__(self,**kwargs):
		self.__session = Session()
		self.__args = kwargs
		self._retval = list()
		self.__search_filter = list()
		self.__search_param = ['service_name']
		self.__data = None

	def get_regular_services_data(self):
		for key in self.__search_param:
			if key in self.__args and self.__args[key] not in (None,""):
				self.__search_filter.append(getattr(T_Regular_Services,key)==self.__args[key])

		if len(self.__search_filter) != 0:
			self.__data = self.__session.query(T_Regular_Services).filter(*self.__search_filter).order_by(
				T_Regular_Services.peak_price).all()

			for d in self.__data:
				r = d.toJSONExcept()
				self._retval.append(r)
		else:
			self.__data = self.__session.query(T_Regular_Services).order_by(T_Regular_Services.peak_price).all()

			for d in self.__data:
				r = d.toJSONExcept()
				self._retval.append(r)

	def edit_regular_services_data(self, **kwargs):
		update_kwargs = kwargs
		search_param = ['regular_services_id']
		search_filter = list()

		for key in search_param:
			if key in update_kwargs and update_kwargs[key] not in (None,""):
				search_filter.append(getattr(T_Regular_Services, key) == update_kwargs[key])

		if search_filter:
			result = self.__session.query(T_Regular_Services).filter(*search_filter).all()
		else:
			return False

		update_param = ['off_peak_price', 'peak_price', 'non_member_price', 'duration']

		for obj in result:
			for key in update_param:
				if key in update_kwargs and update_kwargs[key] not in (None, ""):
					try:
						setattr(obj,key,update_kwargs[key])
					except TypeError:
						continue

		self.__session.commit()

	def __del__(self):
		if self.__session is not None:
			self.__session.close()