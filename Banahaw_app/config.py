import os

BIND_IP = '127.0.0.1'
BIND_PORT = 5000

try:
	DB_USER = os.environ['user']
	DB_PASSWORD = os.environ['password']
	DB_SERVER = os.environ['server']
	DB_SCHEMA = os.environ['schema']
except:
	DB_USER = 'root'
	DB_PASSWORD = 'root'
	DB_SERVER = '127.0.0.1:8000'
	DB_SCHEMA = 'db_banahaw'