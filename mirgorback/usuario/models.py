from django.db import models
from activo.models import ActivoCelular,ActivoNotebook

# Create your models here.
class Usuario(models.Model):
    nombre = models.CharField(max_length=50)
    correo = models.CharField(max_length=50)
    area = models.CharField(max_length=50)
    posicion = models.CharField(max_length=50)
    fecha_entrega = models.DateField(null=True)

    #ForeignKey
    activo_celular = models.ForeignKey(ActivoCelular, on_delete=models.CASCADE, null=True)
    activo_notebook = models.ForeignKey(ActivoNotebook, on_delete=models.CASCADE, null=True)

def __str__(self):
    return f'Usuario: {self.nombre} - {self.area} - {self.posicion}'
    
