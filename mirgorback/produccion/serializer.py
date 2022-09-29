from dataclasses import field, fields
from rest_framework import serializers
from .models import Falla, Accion,Semaforo

class FallaSerializer(serializers.ModelSerializer):
    """Serializador de Fallas"""
    class Meta:
        model = Falla
        fields = '__all__'

class AccionSerializer(serializers.ModelSerializer):
    """Serializador de Acciones"""
    class Meta:
        model = Accion
        fields = '__all__'

class SemaforoSerializer(serializers.ModelSerializer):
    """Serializador de Semaforo"""
    class Meta:
        model = Semaforo
        fields = '__all__'