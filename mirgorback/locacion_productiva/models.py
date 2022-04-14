from django.db import models
from activo.models import ActivoIndustrial

# Create your models here.
class LocacionProductiva(models.Model):
    sitio = models.CharField(max_length=50)
    linea = models.CharField(max_length=10)
    puesto = models.CharField(max_length=20)
    fecha = models.DateField(null=True, blank=True)

    #ForeignKey
    activo_industrial = models.ForeignKey(ActivoIndustrial, on_delete=models.CASCADE, null=True)

