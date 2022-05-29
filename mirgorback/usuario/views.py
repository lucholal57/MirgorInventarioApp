from urllib import request
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from usuario.models import Usuario
from usuario.serializer import UsuarioSerializer,UsuarioPostPutSerializer

# Create your views here.
@api_view(['GET','POST'])
@permission_classes((IsAuthenticated,))
def UsuarioListado(request):
    #List
    if request.method == 'GET':
        usuario = Usuario.objects.all().order_by('id')
        serializer = UsuarioSerializer(usuario, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    #Create
    elif request.method == 'POST':
        serializer = UsuarioPostPutSerializer(data = request.data)
        #Validacion
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#Funciones de edicion y eliminacion pasando el ID
@api_view(['GET','PUT','DELETE'])
@permission_classes((IsAuthenticated, ))
def UsuarioBuscarPorId(request, pk=None):
    #Consulta para tener el listado sin FIRST
    usuario = Usuario.objects.filter(id=pk)
    #Validacion
    if usuario : 
        if request.method == 'GET':
            serializer = UsuarioPostPutSerializer(usuario, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        elif request.method == 'PUT':
            #Consulta para obtener el objeto con first
            usuario_edicion = Usuario.objects.filter(id=pk).first()
            serializer = UsuarioPostPutSerializer(usuario_edicion, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        elif request.method == 'DELETE':
            usuario.delete()
            return Response({'message':'Usuario eliminado correctamente'}, status=status.HTTP_200_OK)
 #Validacion si no se encontro el ActivoIndustrial
    return Response({'message': 'No se encontro ActivoIndustrial'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def BusquedaUsuarioPorNombre(request,buscar_usuario):
    usuario = Usuario.objects.filter(nombre__icontains = buscar_usuario)
    serializer = UsuarioSerializer(usuario, many = True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def ValidacionPorLegajo(request,validar_legajo):
    usuario = Usuario.objects.filter(legajo = validar_legajo)
    serializer = UsuarioSerializer(usuario, many = True)
    return Response(serializer.data, status=status.HTTP_200_OK)
            


