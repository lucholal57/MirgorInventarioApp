from .base import *
# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = ['192.168.52.60','192.168.52.255', 'mirgorit.com','www.mirgorit.com']

DATABASES ={
    'default':{
        'ENGINE' : 'django.db.backends.postgresql_psycopg2',
        'NAME' : 'mirgordb_prod',
        'USER' : 'mirgor',
        'PASSWORD' : 'riogrande91',
        'HOST' : 'localhost',
       'PORT' : '5432',
    }
}

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')



