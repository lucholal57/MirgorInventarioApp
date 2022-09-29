from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view , permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Falla,Accion,Semaforo
from .serializer import (FallaSerializer,AccionSerializer,SemaforoSerializer)

# Create your views here.
@api_view(['GET', 'POST'])
def FallaListado(request):
    #Lsitado
    if request.method == 'GET':
        falla = Falla.objects.all().order_by('id')
        serializer = FallaSerializer(falla,many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    #Create
    if request.method == 'POST':
        serializer = FallaSerializer(data=request.data)
        #Validacion
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Create your views here.
@api_view(['GET', 'POST'])
def AccionListado(request):
    #Lsitado
    if request.method == 'GET':
        accion = Accion.objects.all().order_by('id')
        serializer = AccionSerializer(accion,many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    #Create
    if request.method == 'POST':
        serializer = AccionSerializer(data=request.data)
        #Validacion
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Create your views here.
@api_view(['GET', 'POST'])
def SemaforoListado(request):
    #Lsitado
    if request.method == 'GET':
        semaforo = Semaforo.objects.all().order_by('id')
        serializer = SemaforoSerializer(semaforo,many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    #Create
    if request.method == 'POST':
        serializer = SemaforoSerializer(data=request.data)
        #Validacion
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

