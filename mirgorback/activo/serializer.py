from rest_framework import serializers
from .models import ActivoCelular, ActivoGeneral, ActivoIndustrial, ActivoNotebook, ActivoStandar


class ActivoIndustrialSerializer(serializers.ModelSerializer):
    """Serializador de Activo"""
    class Meta:
        model = ActivoIndustrial
        fields = '__all__'


class ActivoCelularSerializer(serializers.ModelSerializer):
    """Serializador de Activo"""
    class Meta:
        model = ActivoCelular
        fields = '__all__'


class ActivoNotebookSerializer(serializers.ModelSerializer):
    """Serializador de Activo"""
    class Meta:
        model = ActivoNotebook
        fields = '__all__'


class ActivoGeneralSerializer(serializers.ModelSerializer):
    """Serializador de Activo"""
    class Meta:
        model = ActivoGeneral
        fields = '__all__'


class ActivoStandarSerializer(serializers.ModelSerializer):
    """Serializador de Activo"""
    class Meta:
        model = ActivoStandar
        fields = '__all__'
