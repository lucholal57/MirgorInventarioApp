from rest_framework import serializers
from .models import Usuario
from  activo.serializer import ActivoNotebookSerializer,ActivoCelularSerializer

class UsuarioSerializer(serializers.ModelSerializer):
    """Serializador de usuarios"""
    activo_notebook = ActivoNotebookSerializer(read_only=True)
    activo_celular = ActivoCelularSerializer(read_only=True)
    class Meta:
        model = Usuario
        fields = '__all__'
        depth = 2

class UsuarioPostPutSerializer(serializers.ModelSerializer):
    """Serializador de usuarios"""
    class Meta:
        model = Usuario
        fields = '__all__'