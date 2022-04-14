from rest_framework import serializers

from locacion.serializer import LocacionSerializer
from locacion_productiva.serializer import LocacionProductivaSerializer
from trazabilidad.models import Trazabilidad


class TrazabilidadSerializer(serializers.ModelSerializer):
    """Serializador de trazabilidad con locaciones"""
    locacion = LocacionSerializer(read_only=True)
    locacion_productiva = LocacionProductivaSerializer(read_only=True)
    class Meta:
        model = Trazabilidad
        fields = '__all__'
        depth = 5

class TrazabilidadPostPutSerializer(serializers.ModelSerializer):
    """Serializador de trazabilidad"""
    class Meta:
        model = Trazabilidad
        fields = '__all__'