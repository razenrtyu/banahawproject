import datetime
from sqlalchemy import and_
from BanahawApp import Session,Mini_func
from BanahawApp.table import T_Transaction, T_Member00, T_Attendants01, T_Attendants


class Attendant_report(object):

	def __init__(self, **kwargs):
		self.__session = Session()
		self.__args = kwargs
		self.__retval = None
		self.__tempdict = dict()
		self.__total = 0

	def get_reports_data(self):
		"""."""
		ds = self.__args.get('from',None)
		de = self.__args.get('to',None)
		by_id = self.__args.get('attendantid', None)

		if all([ds,de,by_id]):
			transactionstotal, transsales = self.__get_transactions(ds, de, by_id)
			memberstotal, memsales = self.__get_members(ds, de, by_id)
			upgradestotal, upgradessales = self.__get_members_upg(ds, de, by_id)

		if self.__tempdict:
			self.__retval = self.__tempdict
			self.__retval['total_on_service'] = transactionstotal
			self.__retval['total_on_membership'] = memberstotal + upgradestotal
			self.__retval['total_sales'] = transsales + memsales + upgradessales

		return self.__retval

	def __get_transactions(self, ds, de, attid):
		search_filter = list()

		search_filter.append(getattr(T_Transaction, 'datecreated').between(ds,de))
		search_filter.append(getattr(T_Transaction, 'attendantid') == attid)
		search_filter.append(getattr(T_Transaction, 'active') == 0)

		result = self.__session.query(T_Transaction).filter(
			and_(*search_filter)).all()

		total = 0
		total2 = 0

		for data in result:
			key = data.datecreated.strftime('%B-%d-%Y')

			if key not in self.__tempdict:
				self.__tempdict[key] = list()

			comm = self.__get_commision_on_services(data.service,data.service_price,
											 		data.transaction_type,data.add_ons_price)

			total += comm
			total2 += data.total_amount

			data_dict = dict()
			data_dict = {
				'datecreated': key,
				'clientname': data.client_name,
				'services': data.service + ', ' + data.add_ons,
				'timespent': '{:02d}H:{:02d}M'.format(*divmod(data.time_spent, 60)),
				'amountpaid': data.total_amount,
				'commision_on_service': comm
			}

			self.__tempdict[key].append(data_dict)

		return total, total2

	def __get_commision_on_services(self, service, serviceprice, trantype, add_ons_price):
		ignore_list = ['5-in-1 Signature Massage', 'Relaxing Swedish Massage']
		retval = 0

		servicecomm = 0
		if service not in ignore_list:
			if serviceprice is None:
				serviceprice = 0

			servicecomm = int(serviceprice) * 0.10

		if not add_ons_price:
			return servicecomm

		addonsprices = add_ons_price.split(',')
		addonscomm = 0

		if trantype in ['Walk-In','Non-Member']:		
			for price in addonsprices:
				if int(price) <= 299:
					addonscomm += 25
				elif int(price) >= 300:
					addonscomm += 50

		elif trantype == 'Member':
			for price in addonsprices:
				if int(price) <= 149:
					addonscomm += 25
				elif int(price) >= 150:
					addonscomm += 50

		retval = addonscomm + servicecomm

		return retval

	def __get_members(self, ds, de, attid):
		retval = list()
		search_filter = list()

		search_filter.append(getattr(T_Member00, 'datecreated').between(ds, de))
		search_filter.append(getattr(T_Member00, 'attendantid') == attid)

		result = self.__session.query(T_Member00).filter(and_(*search_filter)).all()

		total = 0
		total2 = 0

		for data in result:
			key = data.datecreated.strftime('%B-%d-%Y')

			if key not in self.__tempdict:
				self.__tempdict[key] = list()

			if data.upgraded:
				total += 25
				total2 += 300

				data_dict = dict()
				data_dict = {
					'clientname': data.name,
					'services': 'Personalized',
					'amountpaid': 300,
					'commision_on_service': 25,
					'timespent': ''
				}
			else:

				comm = 25 if data.membertype == 'Personalized' else 50

				total += comm
				total2 += data.membershipcost

				data_dict = dict()
				data_dict = {
					'clientname': data.name,
					'services': data.membertype,
					'amountpaid': data.membershipcost,
					'commision_on_service': comm,
					'timespent': ''
				}

			self.__tempdict[key].append(data_dict)

		return total, total2

	def __get_members_upg(self, ds, de, attid):
		retval = list()
		search_filter = list()

		search_filter.append(getattr(T_Member00, 'upgraded').between(ds, de))
		search_filter.append(getattr(T_Member00, 'upgraded_by') == attid)

		result = self.__session.query(T_Member00).filter(and_(*search_filter)).all()

		total = 0
		total2 = 0

		for data in result:
			key = data.upgraded.strftime('%B-%d-%Y')

			if key not in self.__tempdict:
				self.__tempdict[key] = list()

			total += 25
			total2 += 300

			data_dict = dict()
			data_dict = {
				'clientname': data.name,
				'services': data.membertype + '[UPGRADED]',
				'amountpaid': 300,
				'commision_on_service': 25,
				'timespent': ''
			}

			self.__tempdict[key].append(data_dict)

		return total, total2


class Summary_report(object):
	def __init__(self, **kwargs):
		self.__session = Session()
		self.__args = kwargs
		self.__retval = dict()

	def get_reports_data(self):
		retval = dict()

		ds = self.__args.get('from',None)
		de = self.__args.get('to',None)

		self.__get_attendants(ds, de)
		self.__get_rawtime(ds, de)
		self.__get_transactions(ds, de)
		self.__get_members(ds, de)
		self.__get_members_upg(ds, de)

		if self.__retval:
			total_allowance = 0
			total_comm = 0
			total_incentives = 0

			for attid, data in self.__retval.items():
				self.__retval[attid]['total_per_att'] = data.get('service_comm') + data.get('mem_incentive')
				total_allowance += data.get('allowance', 0)
				total_comm += data.get('service_comm', 0)
				total_incentives += data.get('mem_incentive')

			retval['data'] = self.__retval
			retval['totals'] = {
				'total_allowance': total_allowance,
				'total_comm': total_comm,
				'total_incentives': total_incentives
			}


		return retval

	def __get_attendants(self, ds, de):
		result = self.__session.query(T_Attendants).all()

		for data in result:
			self.__retval[data.attendantid] = {
				'attendant_name': data.attendant_name,
				'service_comm': 0,
				'allowance':0,
				'mem_incentive': 0
			}

			datestart = datetime.datetime.strptime(ds, '%Y-%m-%d')
			dateend = datetime.datetime.strptime(de, '%Y-%m-%d')
			delta = datetime.timedelta(days=1)

			total_allwowance = 0
			while datestart <= dateend:
				key = datestart.strftime('%B-%d-%Y')
				self.__retval[data.attendantid][key] = 'No Time In - No Time Out'
				total_allwowance += data.allowance
				datestart += delta

			# assign total allowance
			self.__retval[data.attendantid]['allowance'] = total_allwowance

	def __get_rawtime(self, ds, de):
		search_filter = list()

		search_filter.append(getattr(T_Attendants01, 'trandate').between(ds,de))

		result = self.__session.query(T_Attendants01).filter(and_(*search_filter)).all()
		for data in result:
			if not data.timein:
				timein = 'No Time In'
			else:
				timein = data.timein

			if not data.timeout:
				timeout = 'No Time Out'
			else:
				timeout = data.timeout

			key = data.trandate.strftime('%B-%d-%Y')

			self.__retval[data.attendantid][key] = timein + ' - ' + timeout

	def __get_transactions(self, ds, de):
		search_filter = list()

		search_filter.append(getattr(T_Transaction, 'datecreated').between(ds,de))
		search_filter.append(getattr(T_Transaction, 'active') == 0)

		result = self.__session.query(T_Transaction).filter(
			and_(*search_filter)).order_by(T_Transaction.attendantid).all()

		total = 0

		for data in result:
			if data.attendantid not in self.__retval:
				total = 0
				total2 = 0

			comm = self.__get_commision_on_services(data.service,data.service_price,
											 		data.transaction_type,data.add_ons_price)
			total += comm

			# assign total commision
			self.__retval[data.attendantid]['service_comm'] = total


	def __get_commision_on_services(self, service, serviceprice, trantype, add_ons_price):
		ignore_list = ['5-in-1 Signature Massage', 'Relaxing Swedish Massage']
		retval = 0

		servicecomm = 0
		if service not in ignore_list:
			if serviceprice is None:
				serviceprice = 0

			servicecomm = int(serviceprice) * 0.10
		if not add_ons_price:
			return servicecomm

		addonsprices = add_ons_price.split(',')
		addonscomm = 0

		if trantype in ['Walk-In','Non-Member']:		
			for price in addonsprices:
				if int(price) <= 299:
					addonscomm += 25
				elif int(price) >= 300:
					addonscomm += 50

		elif trantype == 'Member':
			for price in addonsprices:
				if int(price) <= 149:
					addonscomm += 25
				elif int(price) >= 150:
					addonscomm += 50

		retval = addonscomm + servicecomm
		print(retval)

		return retval

	def __get_members(self, ds, de):
		retval = list()
		search_filter = list()

		search_filter.append(getattr(T_Member00, 'datecreated').between(ds, de))

		result = self.__session.query(T_Member00).filter(and_(*search_filter)).all()

		total = 0

		for data in result:
			if data.upgraded:
				total += 25

			else:
				comm = 25 if data.membertype == 'Personalized' else 50

				total += comm

			self.__retval[data.attendantid]['mem_incentive'] = total

	def __get_members_upg(self, ds, de):
		search_filter = list()

		search_filter.append(getattr(T_Member00, 'upgraded').between(ds, de))
		search_filter.append(getattr(T_Member00, 'upgraded_by') != None)

		result = self.__session.query(T_Member00).filter(and_(*search_filter)).all()

		total = 0
		total2 = 0

		for data in result:
			total += 25

			self.__retval[data.attendantid]['mem_incentive'] += total
