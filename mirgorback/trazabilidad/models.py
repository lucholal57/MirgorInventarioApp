from django.db import models

from locacion.models import Locacion
from locacion_productiva.models import LocacionProductiva

# Create your models here.

class Trazabilidad(models.Model):
    locacion = models.ForeignKey(Locacion, on_delete=models.CASCADE, null=True, blank=True)
    locacion_productiva = models.ForeignKey(LocacionProductiva, on_delete=models.CASCADE, null=True, blank=True)
    sitio = models.CharField(max_length=50)
    area = models.CharField(max_length=50)
    localizacion = models.CharField(max_length=50)
    unidad_negocio = models.CharField(null=True, blank=True,max_length=50)
    nave = models.CharField(null=True, blank=True,max_length=50)
    fecha = models.DateField(null=True, blank=True)

    def __str__(self):
        return f'Trazabilidad {self.locacion} - {self.locacion_productiva}'
