from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from locacion.models import Locacion
from locacion.serializer import LocacionSerializer,LocacionPostPutSerializer
 

# Create your views here.
@api_view(['GET','POST'])
@permission_classes((IsAuthenticated, ))
def LocacionListado(request):
    #List
    if request.method == 'GET':
        locacion = Locacion.objects.all().order_by('id')
        serializer = LocacionSerializer(locacion, many = True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    #Register
    elif request.method == 'POST':
         serializer = LocacionPostPutSerializer(data=request.data)
         #Validaciones
         if serializer.is_valid():
             serializer.save()
             return Response(serializer.data,status=status.HTTP_200_OK)
         else:
             return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
#Busqueda por id para la edicion y eliminacion
@api_view(['GET','PUT','DELETE'])
@permission_classes((IsAuthenticated, ))
def LocacionBuscarPorId(request,pk=None):
    #Busqueda sin FIRST
    locacion = Locacion.objects.filter(id=pk)
    #Validacion
    if locacion:
        if request.method == 'GET':
            serializer = LocacionSerializer(locacion,many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)
        #Update
        elif request.method == 'PUT':
            #Busqueda con FIRST
            locacion_edicion = Locacion.objects.filter(id=pk).first()
            serializer = LocacionPostPutSerializer(locacion_edicion,data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data,status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        #Delete
        elif request.method == 'DELETE':
            locacion.delete()
            return Response({'message' : 'Locacion eliminada con exito'},status=status.HTTP_200_OK)
    #Si El objeto no existe retornamos un mensaje
    return Response({'message' : 'No se ha encontrado un locacion con esos datos'},status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def BusquedaLocacionArea(request, buscar_locacion):
    locacion = Locacion.objects.filter(area__icontains = buscar_locacion)
    serializer = LocacionSerializer(locacion, many = True)
    return Response(serializer.data, status=status.HTTP_200_OK)