from email import message
from urllib import request
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view , permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import LineaTelefonica
from .serializer import LineaTelefonicaSerializer

# Create your views here.

@api_view(['GET','POST'])

def LineaTelefonicaListado(request):
    #List
    if request.method == 'GET':
        linea_telefonica = LineaTelefonica.objects.all().order_by('id')
        serializer  = LineaTelefonicaSerializer(linea_telefonica, many = True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    # Create
    elif request.method == 'POST':
        serializer = LineaTelefonicaSerializer(data = request.data)
        #Validacion
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#Funciones para la edicion y eliminacion pasando el ID
@api_view(['GET','PUT','DELETE'])
def LineaTelefonicaBuscarPorId(request,pk=None):
    #Consulta para obtener objeto del listado pasando ID sin First
    linea_telefonica = LineaTelefonica.objects.filter(id=pk)
    #Validacion
    if linea_telefonica:
        if request.method == 'GET':
            serializer = LineaTelefonicaSerializer(linea_telefonica, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        elif request.method == 'PUT':
            #Consulta para obtener el objeto con FIRST
            linea_telefonica_edicion = LineaTelefonica.objects.filter(id=pk).first()
            serializer = LineaTelefonicaSerializer(linea_telefonica_edicion, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        elif request.method == 'DELETE':
            linea_telefonica.delete()
            return Response({'message': 'Linea Telefonica eliminada correctamente'}, status=status.HTTP_200_OK)
    
    #Validacion si no se encontro la linea_telefonica
    return Response({'message':'No se encontro linea telefonica'},status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def BusquedaLineaTelefonicaNumero(request, buscar_linea_telefonica):
    locacion = LineaTelefonica.objects.filter(numero__icontains = buscar_linea_telefonica)
    serializer = LineaTelefonicaSerializer(locacion, many = True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def ValidacionLineaTelefonica(request, validar_linea_telefonica):
    linea_telefonica= LineaTelefonica.objects.filter(numero= validar_linea_telefonica)
    serializer = LineaTelefonicaSerializer(linea_telefonica, many = True)
    return Response(serializer.data, status=status.HTTP_200_OK)
