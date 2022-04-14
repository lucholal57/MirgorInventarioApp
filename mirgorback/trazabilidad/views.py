from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from locacion.models import Locacion
from locacion_productiva.models import LocacionProductiva
from trazabilidad.models import Trazabilidad
from trazabilidad.serializer import TrazabilidadSerializer,TrazabilidadPostPutSerializer

# Create your views here.
@api_view(['GET','POST'])

# Get and Create
def TrazabilidadListado(request):
    #List
    if request.method == 'GET':
        trazabilidad = Trazabilidad.objects.all().order_by('id')
        serializer = TrazabilidadSerializer(trazabilidad, many = True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    #Register
    elif request.method == 'POST':
        serializer = TrazabilidadPostPutSerializer(data = request.data)
        #Valid
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#Search your Id: Get, Update, Delete
@api_view(['GET','PUT','DELETE'])

def TrazabilidadBuscarPorId(request, pk=None):
    #Search not First
    trazabilidad = Trazabilidad.objects.filter(id=pk)
    #valid
    if trazabilidad:
        #Get
        if request.method == 'GET':
            serializer = TrazabilidadPostPutSerializer(trazabilidad, many = True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        #Update
        elif request.method == 'PUT':
            #Search First
            trazabilidad_edicion = Trazabilidad.objects.filter(id=pk).first()
            serializer = TrazabilidadPostPutSerializer(trazabilidad_edicion, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
        #Delete
        elif request.method == 'DELETE':
            trazabilidad.delete()
            return Response({'message' : 'Trazabilidad eliminada con exito'},status=status.HTTP_200_OK)
    #Si no exixte trazabilidad
    return Response({'menssage': 'No se encontro trazabilidad cone sos datos'}, status=status.HTTP_400_BAD_REQUEST)

        