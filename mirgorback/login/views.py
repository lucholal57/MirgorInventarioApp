from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from login.serializers import RegistroSerializer
from rest_framework import status
from rest_framework.authtoken.models import Token
from login import models
# Create your views here.

# View de logout
@api_view(['POST'])
def LogoutView(request):
    if request.method == 'POST':
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)

# View de registro nuevos usuarios
@api_view(['POST', ])
def Registracion_View(request):
    if request.method == 'POST':
        serializer = RegistroSerializer(data=request.data)

        data = {}

        if serializer.is_valid():
            #Guarda los datos despues de guardarlos en la base de datos en la variable cuenta
            cuenta=serializer.save()
            data['response'] = 'El registro del usuario fue Exitoso!'
            data['username'] = cuenta.username
            data['email'] = cuenta.email
            #Generamos el token para el usuario
            token = Token.objects.get(user=cuenta).key
            data['token'] = token
        else :
            data = serializer.errors

        return Response(data)
