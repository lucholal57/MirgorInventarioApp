from .base import *
# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

DATABASES ={
    'default':{
        'ENGINE' : 'django.db.backends.postgresql_psycopg2',
        'NAME' : 'mirgor_dev',
        'USER' : 'postgres',
        'PASSWORD' : 'admin',
        'HOST' : 'localhost',
       'PORT' : '5432',
    }
}

