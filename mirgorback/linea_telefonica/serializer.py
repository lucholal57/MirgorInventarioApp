from rest_framework import serializers
from .models import LineaTelefonica

class LineaTelefonicaSerializer(serializers.ModelSerializer):
    """Serializador de Linea Telefonica"""

    class Meta:
        model = LineaTelefonica
        fields = '__all__'