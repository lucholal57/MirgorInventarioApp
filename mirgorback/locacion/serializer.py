from rest_framework import serializers

from  activo.serializer import ActivoIndustrialSerializer,ActivoGeneralSerializer,ActivoStandarSerializer,ActivoNotebookSerializer,ActivoCelularSerializer
from .models import Locacion

class LocacionSerializer(serializers.ModelSerializer):
    """Serializador de locaciones"""
    activo_industrial = ActivoIndustrialSerializer(read_only=True)
    activo_general = ActivoGeneralSerializer(read_only=True)
    activo_standar = ActivoStandarSerializer(read_only=True)
    activo_notebook = ActivoNotebookSerializer(read_only=True)
    activo_celular = ActivoCelularSerializer(read_only=True)
    class Meta:
        model = Locacion
        fields = '__all__'
        depth = 5

class LocacionPostPutSerializer(serializers.ModelSerializer):
    """Serializador de locaciones"""
    
    class Meta:
        model = Locacion
        fields = '__all__'
      
        