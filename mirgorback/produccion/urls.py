from django.urls import path
from .views import FallaListado, AccionListado, SemaforoListado

urlpatterns = [
    #Rutas para produccion
    path('falla', FallaListado),
    path('accion', AccionListado),
    path('semaforo',SemaforoListado)
]