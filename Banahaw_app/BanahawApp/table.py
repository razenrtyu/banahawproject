from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from decimal import Decimal
import datetime
import uuid

Base = declarative_base()

class GenericBase(object):

    def as_dict(self):
        return ({c.name: getattr(self, c.name) for c in self.__table__.columns})

    def toJSONExcept(self,*except_fields):
        retval = {}
        tabledic = self.as_dict()
        for k in tabledic:
            if k in except_fields:
                continue

            if type(tabledic[k]) in [datetime.datetime,datetime.date]:
                tabledic[k] = tabledic[k].isoformat() + 'Z'
            elif type(tabledic[k]) is Decimal:
                tabledic[k] = float(tabledic[k])
            elif type(tabledic[k]) is uuid.UUID:
            	tabledic[k] = str(tabledic[k])

            retval[k] = tabledic[k]

        return retval

class Users_table(GenericBase,Base):
	__tablename__ = 'users'

	userid = Column(Integer,primary_key=True)
	username = Column(String(50))
	password = Column(String(50))
	role = Column(String(50))


class T_Regular_Services(GenericBase,Base):
    __tablename__ = 'regular_services'

    regular_services_id = Column(Integer,primary_key=True)
    service_name = Column(Integer)
    off_peak_price = Column(Integer)
    peak_price = Column(Integer)
    non_member_price = Column(Integer)


class T_Healing_Packages(GenericBase,Base):
    __tablename__ = 'healing_packages'

    healing_packages_id = Column(Integer,primary_key=True)
    package_name = Column(Integer)
    member_price = Column(Integer)
    non_member_price = Column(Integer)


class T_Add_Ons(GenericBase,Base):
    __tablename__ = 'add_ons'

    add_ons_id = Column(Integer,primary_key=True)
    add_ons_name = Column(Integer)
    member_price = Column(Integer)
    non_member_price = Column(Integer)


class T_Branch(GenericBase,Base):
    __tablename__ = 'branch'

    branchid = Column(Integer,primary_key=True)
    branch_name = Column(String(50))


class T_Attendants(GenericBase,Base):
    __tablename__ = 'attendant'

    attendantid = Column(Integer,primary_key=True)
    attendant_name = Column(String(50))


class T_Member00(GenericBase,Base):
    __tablename__ = 'member00'

    member00id = Column(Integer,primary_key=True)
    name = Column(String(50))
    address = Column(String(50))
    mobile_number = Column(String(50))
    landline_number = Column(String(50))
    email_address = Column(String(50))
    birthdate = Column(DateTime)
    membertype = Column(String(50))
    feedback = Column(String(100))
    datecreated = Column(DateTime)


class T_Member01(GenericBase,Base):
    __tablename__ = 'member01'

    member01id = Column(Integer, primary_key=True)
    member00id = Column(Integer, ForeignKey(T_Member00.member00id))
    name = Column(String(50))
    relationship = Column(String(50))
    datecreated = Column(DateTime)