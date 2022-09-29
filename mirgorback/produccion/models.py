from django.db import models

# Create your models here.

class Falla(models.Model):
    imei = models.CharField(max_length=16)
    falla = models.CharField(max_length=20)
    subfalla = models.CharField(max_length=20)
    def __str__(self):
        return f'Falla-Imei : {self.imei} '

class Accion(models.Model):
    accion = models.CharField(max_length=100)
    def __str__(self):
        return f'Accion : {self.accion}'

class Semaforo(models.Model):
    semaforo = models.CharField(max_length=100)
    def __str__(self):
        return f'Semaforo : {self.semaforo}'