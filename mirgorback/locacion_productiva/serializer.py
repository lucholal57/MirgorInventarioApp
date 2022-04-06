from rest_framework import serializers
from locacion_productiva.models import  LocacionProductiva
from activo.serializer import ActivoIndustrialSerializer

class LocacionProductivaSerializer(serializers.ModelSerializer):
    """ Serializador de locaciones productivas """
    activo_industrial = ActivoIndustrialSerializer(read_only=True)
    class Meta:
        model = LocacionProductiva
        fields = '__all__'
        depth=2

class LocacionProductivaPostPutSerializer(serializers.ModelSerializer):
    """Serializador de locaciones productivas con activos"""
    class Meta:
        model= LocacionProductiva
        fields = '__all__'
