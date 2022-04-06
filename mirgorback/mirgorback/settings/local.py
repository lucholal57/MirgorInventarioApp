from .base import *
# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

DATABASES ={
    'default':{
        'ENGINE' : 'django.db.backends.postgresql_psycopg2',
        'NAME' : 'mirgor_db',
        'USER' : 'postgres',
        'PASSWORD' : 'admin',
        'HOST' : 'localhost',
       'PORT' : '5432',
    }
}

