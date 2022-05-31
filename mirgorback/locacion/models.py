from django.db import models

from activo.models import ActivoIndustrial,ActivoCelular, ActivoGeneral, ActivoNotebook, ActivoStandar


# Create your models here.
class Locacion(models.Model):
    sitio = models.CharField(max_length=50)
    area = models.CharField(max_length=50)
    localizacion = models.CharField(max_length=50)
    unidad_negocio = models.CharField(max_length=50)
    nave = models.CharField(max_length=50)
    fecha = models.DateField(null=True, blank=True)
    
    #ForenKey
    activo_industrial = models.ForeignKey(ActivoIndustrial, on_delete=models.CASCADE, null=True,blank=True)
    activo_celular = models.ForeignKey(ActivoCelular, on_delete=models.CASCADE, null=True, blank=True)
    activo_notebook = models.ForeignKey(ActivoNotebook, on_delete=models.CASCADE, null=True,blank=True)
    activo_general = models.ForeignKey(ActivoGeneral, on_delete=models.CASCADE, null=True,blank=True)
    activo_standar = models.ForeignKey(ActivoStandar, on_delete=models.CASCADE, null=True,blank=True)
    
