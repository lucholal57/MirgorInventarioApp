from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from locacion_productiva.models import LocacionProductiva
from locacion_productiva.serializer import LocacionProductivaSerializer,LocacionProductivaPostPutSerializer

# Create your views here.
@api_view(['GET','POST'])
@permission_classes((IsAuthenticated, ))
def LocacionProductivaListado(request):
    #Listado
    if request.method == 'GET':
        locacion_productiva = LocacionProductiva.objects.all().order_by('id')
        serializer = LocacionProductivaSerializer(locacion_productiva, many = True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    #Rgistro
    elif request.method == 'POST':
        serializer = LocacionProductivaPostPutSerializer(data = request.data)
        #Validacion
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#Busqueda por id para la edicion y eliminacion
@api_view(['GET','PUT','DELETE'])
@permission_classes((IsAuthenticated, ))
def LocacionProductivaBuscarPorId(request, pk=None):
    #Busqueda sin FIRST
    locacion_productiva = LocacionProductiva.objects.filter(id=pk)
    #Validacion
    if locacion_productiva:
        if request.method == 'GET':
            serializer = LocacionProductivaPostPutSerializer(locacion_productiva, many = True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        #Update
        elif request.method == 'PUT':
            #Busqueda con FIRST
            locacion_productiva_edicion = LocacionProductiva.objects.filter(id=pk).first()
            serializer = LocacionProductivaSerializer(locacion_productiva_edicion, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        #Delete
        elif request.method == 'DELETE':
            locacion_productiva.delete()
            return Response({'message' : 'Locacion productiva eliminada con exito'},status=status.HTTP_200_OK)
    #Si El objeto no existe retornamos un mensaje
    return Response({'message' : 'No se ha encontrado un locacion con esos datos'},status=status.HTTP_400_BAD_REQUEST)