from .base import *
# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

CORS_ALLOWED_ORIGINS = [
    "https://www.mirgorit.com",
    "https://192.168.52.230:3000",
    "http://localhost:8000"
]


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

