from email import message
from urllib import request
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view , permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import ActivoGeneral, ActivoIndustrial, ActivoStandar, ActivoCelular, ActivoNotebook
from .serializer import (ActivoIndustrialSerializer, ActivoCelularSerializer,
ActivoCelularSerializer,ActivoNotebookSerializer,ActivoGeneralSerializer,
ActivoStandarSerializer)

# Create your views here.

# VIEW DE Activo insdustrial
@permission_classes((IsAuthenticated, ))
@api_view(['GET' , 'POST'])
def ActivoIndustrialListado(request):
    #Listado
    if request.method == 'GET':
        activo = ActivoIndustrial.objects.all().order_by('id')
        serializer = ActivoIndustrialSerializer(activo, many = True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    #Create
    elif request.method == 'POST':
        serializer = ActivoIndustrialSerializer(data = request.data)
        #Validacion
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#Funciones para la edicion y eliminacion, pasando el ID
@permission_classes((IsAuthenticated, ))
@api_view(['GET','PUT','DELETE'])
def ActivoIndustrialBuscarPorId(request, pk=None):
    
    #Consulta para obtener el listado sin FIRST
    activo = ActivoIndustrial.objects.filter(id=pk)
    #Validacion
    if activo:
        if request.method == 'GET':
            serializer = ActivoIndustrialSerializer(activo, many = True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        elif request.method == 'PUT':
            #Consulta para obtener el listado con FIRST
            activo_edicion = ActivoIndustrial.objects.filter(id=pk).first()
            serializer = ActivoIndustrialSerializer(activo_edicion, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        elif request.method == 'DELETE':
            activo.delete();
            return Response({'message':'ActivoIndustrial eliminado correctamente'}, status=status.HTTP_200_OK)
    #Validacion si no se encontro el ActivoIndustrial
    return Response({'message': 'No se encontro ActivoIndustrial'}, status=status.HTTP_400_BAD_REQUEST)

#Busqueda de ActivoIndustrial por inventario
@permission_classes((IsAuthenticated, ))
@api_view(['GET'])
def BusquedaActivoIndustrialInventario(request, buscar_activo):
    activo = ActivoIndustrial.objects.filter(inventario__icontains = buscar_activo)
    serializer = ActivoIndustrialSerializer(activo, many = True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@permission_classes((IsAuthenticated, ))
@api_view(['GET'])
def ValidacionPorInventarioIndustrial(request,validar_inventario):
    activo_industrial = ActivoIndustrial.objects.filter(inventario = validar_inventario)
    serializer = ActivoIndustrialSerializer(activo_industrial, many = True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# VIEW DE Activo Celular
@permission_classes((IsAuthenticated, ))
@api_view(['GET' , 'POST'])
def ActivoCelularListado(request):
    #Listado
    if request.method == 'GET':
        celular = ActivoCelular.objects.all().order_by('id')
        serializer = ActivoCelularSerializer(celular, many = True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    #Create
    elif request.method == 'POST':
        serializer = ActivoCelularSerializer(data = request.data)
        #Validacion
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#Funciones para la edicion y eliminacion, pasando el ID
@permission_classes((IsAuthenticated, ))
@api_view(['GET','PUT','DELETE'])
def ActivoCelularBuscarPorId(request, pk=None):
    
    #Consulta para obtener el listado sin FIRST
    celular = ActivoCelular.objects.filter(id=pk)
    #Validacion
    if celular:
        if request.method == 'GET':
            serializer = ActivoCelularSerializer(celular, many = True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        elif request.method == 'PUT':
            #Consulta para obtener el listado con FIRST
            celular_edicion = ActivoCelular.objects.filter(id=pk).first()
            serializer = ActivoCelularSerializer(celular_edicion, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        elif request.method == 'DELETE':
            celular.delete();
            return Response({'message':'Celular eliminado correctamente'}, status=status.HTTP_200_OK)
    #Validacion si no se encontro el ActivoIndustrial
    return Response({'message': 'No se encontro Celular'}, status=status.HTTP_400_BAD_REQUEST)

    #Busqueda de ActivoCelular por IMEI
@permission_classes((IsAuthenticated, ))
@api_view(['GET'])
def BusquedaActivoCelularImei(request, buscar_activo):
    activo = ActivoCelular.objects.filter(imei__icontains = buscar_activo)
    serializer = ActivoCelularSerializer(activo, many = True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@permission_classes((IsAuthenticated, ))
@api_view(['GET'])
def ValidacionPorInventarioCelular(request,validar_inventario):
    activo_celular = ActivoCelular.objects.filter(imei = validar_inventario)
    serializer = ActivoCelularSerializer(activo_celular, many = True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# VIEW DE Activo Notebook
@permission_classes((IsAuthenticated, ))
@api_view(['GET' , 'POST'])
def ActivoNotebookListado(request):
    #Listado
    if request.method == 'GET':
        notebook = ActivoNotebook.objects.all().order_by('id')
        serializer = ActivoNotebookSerializer(notebook, many = True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    #Create
    elif request.method == 'POST':
        serializer = ActivoNotebookSerializer(data = request.data)
        #Validacion
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#Funciones para la edicion y eliminacion, pasando el ID
@permission_classes((IsAuthenticated, ))
@api_view(['GET','PUT','DELETE'])
def ActivoNotebookBuscarPorId(request, pk=None):
    
    #Consulta para obtener el listado sin FIRST
    notebook = ActivoNotebook.objects.filter(id=pk)
    #Validacion
    if notebook:
        if request.method == 'GET':
            serializer = ActivoNotebookSerializer(notebook, many = True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        elif request.method == 'PUT':
            #Consulta para obtener el listado con FIRST
            notebook_edicion = ActivoNotebook.objects.filter(id=pk).first()
            serializer = ActivoNotebookSerializer(notebook_edicion, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        elif request.method == 'DELETE':
            notebook.delete();
            return Response({'message':'Notebook eliminado correctamente'}, status=status.HTTP_200_OK)
    #Validacion si no se encontro el ActivoIndustrial
    return Response({'message': 'No se encontro Notebook'}, status=status.HTTP_400_BAD_REQUEST)

     #Busqueda de ActivoNotebook por inventario
@permission_classes((IsAuthenticated, ))
@api_view(['GET'])
def BusquedaActivoNotebookInventario(request, buscar_activo):
    activo = ActivoNotebook.objects.filter(inventario__icontains = buscar_activo)
    serializer = ActivoNotebookSerializer(activo, many = True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@permission_classes((IsAuthenticated, ))
@api_view(['GET'])
def ValidacionPorInventarioNotebook(request,validar_inventario):
    activo_notebook = ActivoNotebook.objects.filter(inventario = validar_inventario)
    serializer = ActivoNotebookSerializer(activo_notebook, many = True)
    return Response(serializer.data, status=status.HTTP_200_OK)

      
# VIEW DE Activo General
@permission_classes((IsAuthenticated, ))
@api_view(['GET' , 'POST'])
def ActivoGeneralListado(request):
    #Listado
    if request.method == 'GET':
        activo_general = ActivoGeneral.objects.all().order_by('id')
        serializer = ActivoGeneralSerializer(activo_general, many = True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    #Create
    elif request.method == 'POST':
        serializer = ActivoGeneralSerializer(data = request.data)
        #Validacion
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#Funciones para la edicion y eliminacion, pasando el ID
@permission_classes((IsAuthenticated, ))
@api_view(['GET','PUT','DELETE'])
def ActivoGeneralBuscarPorId(request, pk=None):
    
    #Consulta para obtener el listado sin FIRST
    activo_general = ActivoGeneral.objects.filter(id=pk)
    #Validacion
    if activo_general:
        if request.method == 'GET':
            serializer = ActivoGeneralSerializer(activo_general, many = True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        elif request.method == 'PUT':
            #Consulta para obtener el listado con FIRST
            activo_general_edicion = ActivoGeneral.objects.filter(id=pk).first()
            serializer = ActivoGeneralSerializer(activo_general_edicion, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        elif request.method == 'DELETE':
            activo_general.delete();
            return Response({'message':'Activo eliminado correctamente'}, status=status.HTTP_200_OK)
    #Validacion si no se encontro el ActivoIndustrial
    return Response({'message': 'No se encontro Activo'}, status=status.HTTP_400_BAD_REQUEST)

    #Busqueda de ActivoGeneral por inventario
@permission_classes((IsAuthenticated, ))
@api_view(['GET'])
def BusquedaActivoGeneralInventario(request, buscar_activo):
    activo = ActivoGeneral.objects.filter(inventario__icontains = buscar_activo)
    serializer = ActivoGeneralSerializer(activo, many = True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@permission_classes((IsAuthenticated, ))
@api_view(['GET'])
def ValidacionPorInventarioGeneral(request,validar_inventario):
    activo_general = ActivoGeneral.objects.filter(inventario = validar_inventario)
    serializer = ActivoGeneralSerializer(activo_general, many = True)
    return Response(serializer.data, status=status.HTTP_200_OK)

# VIEW DE Activo Standar
@permission_classes((IsAuthenticated, ))
@api_view(['GET' , 'POST'])
def ActivoStandarListado(request):
    #Listado
    if request.method == 'GET':
        activo_standar = ActivoStandar.objects.all().order_by('id')
        serializer = ActivoStandarSerializer(activo_standar, many = True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    #Create
    elif request.method == 'POST':
        serializer = ActivoStandarSerializer(data = request.data)
        #Validacion
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#Funciones para la edicion y eliminacion, pasando el ID
@permission_classes((IsAuthenticated, ))
@api_view(['GET','PUT','DELETE'])
def ActivoStandarBuscarPorId(request, pk=None):
    
    #Consulta para obtener el listado sin FIRST
    activo_standar = ActivoStandar.objects.filter(id=pk)
    #Validacion
    if activo_standar:
        if request.method == 'GET':
            serializer = ActivoStandarSerializer(activo_standar, many = True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        elif request.method == 'PUT':
            #Consulta para obtener el listado con FIRST
            activo_standar_edicion = ActivoStandar.objects.filter(id=pk).first()
            serializer = ActivoStandarSerializer(activo_standar_edicion, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        elif request.method == 'DELETE':
            activo_standar.delete();
            return Response({'message':'Activo eliminado correctamente'}, status=status.HTTP_200_OK)
    #Validacion si no se encontro el ActivoIndustrial
    return Response({'message': 'No se encontro Activo'}, status=status.HTTP_400_BAD_REQUEST)

      #Busqueda de ActivoStandar por inventario
@permission_classes((IsAuthenticated, ))
@api_view(['GET'])
def BusquedaActivoStandarInventario(request, buscar_activo):
    activo = ActivoStandar.objects.filter(inventario__icontains = buscar_activo)
    serializer = ActivoStandarSerializer(activo, many = True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@permission_classes((IsAuthenticated, ))
@api_view(['GET'])
def ValidacionPorInventarioStandar(request,validar_inventario):
    activo_standar = ActivoStandar.objects.filter(inventario = validar_inventario)
    serializer = ActivoStandarSerializer(activo_standar, many = True)
    return Response(serializer.data, status=status.HTTP_200_OK)


      
