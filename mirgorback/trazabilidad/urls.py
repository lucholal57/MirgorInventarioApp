from django.urls import path
from trazabilidad.views import TrazabilidadListado,TrazabilidadBuscarPorId

urlpatterns = [
    #Rutas para Trazabilidad
    path('trazabilidad', TrazabilidadListado),
    path('trazabilidad/<int:pk>', TrazabilidadBuscarPorId)
]