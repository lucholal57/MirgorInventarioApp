from .base import *
# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = ['192.168.52.230','192.168.52.0', 'mirgorit.com','www.mirgorit.com']

DATABASES ={
    'default':{
        'ENGINE' : 'django.db.backends.postgresql_psycopg2',
        'NAME' : 'it_inventario',
        'USER' : 'mirgor',
        'PASSWORD' : 'mirgor.2022',
        'HOST' : 'localhost',
       'PORT' : '5432',
    }
}

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')



