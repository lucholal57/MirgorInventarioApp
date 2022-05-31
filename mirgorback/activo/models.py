from django.db import models
from django.forms import IntegerField

# Create your models here.
class ActivoIndustrial(models.Model):
    inventario = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=100)
    marca = models.CharField(max_length=50)
    modelo = models.CharField(max_length=50)
    serie = models.CharField(max_length=50)
    hostname = models.CharField(max_length=50)
    dpi = models.CharField(max_length=20,blank=True)
    ip = models.CharField(max_length=20,blank=True)
    estado = models.CharField(max_length=50)
 
    def __str__(self):
        return f'Activo : {self.inventario} - {self.marca} - {self.modelo}'

class ActivoNotebook(models.Model):
    inventario = models.CharField(max_length=50)
    marca = models.CharField(max_length=50)
    modelo = models.CharField(max_length=50)
    serie = models.CharField(max_length=50)
    hostname = models.CharField(max_length=50)
    estado = models.CharField(max_length=50)


    def __str__(self):
        return f'Notebook: {self.inventario} - {self.marca} - {self.modelo} '

class ActivoCelular(models.Model):
    imei = models.CharField(max_length=50)
    marca = models.CharField(max_length=50)
    modelo = models.CharField(max_length=50)
    estado = models.CharField(max_length=50)

    def __str__(self):
        return f'Celular: {self.imei} - {self.marca} - {self.modelo} - '

class ActivoGeneral(models.Model):
    inventario = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=50)
    marca = models.CharField(max_length=50)
    modelo = models.CharField(max_length=50)
    serie = models.CharField(max_length=50)
    estado = models.CharField(max_length=50)

    def __str__(self):
        return f'Activo General: {self.inventario} - {self.descripcion} - {self.marca} - {self.modelo}'


class ActivoStandar(models.Model):
    inventario = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=50)
    marca = models.CharField(max_length=50)
    modelo = models.CharField(max_length=50)
    serie = models.CharField(max_length=50)
    hostname = models.CharField(max_length=50)
    ip = models.CharField(max_length=50)
    mac = models.CharField(max_length=50)
    area = models.CharField(max_length=50)
    estado = models.CharField(max_length=50)

    def __str__(self):
        return f'Activo standar: {self.inventario} - {self.descripcion} - {self.marca} - {self.modelo}'




