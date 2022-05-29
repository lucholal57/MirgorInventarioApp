from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from login.views import Registracion_View ,LogoutView 
#Url que son llamadas desde la URL del proyecto base
urlpatterns = [
    #Se crea la url la cual al enviar el ususario y pass nos devuelve el token que tiene asignado ese usuario
    path('login/', obtain_auth_token, name='login'),
    #Utilizamos el pad para poder hacer la registracion, apuntando a la funcion del view
    path('register/', Registracion_View, name='register'),
    #Path para logout de usuario
    path('logout/', LogoutView, name='register')
]