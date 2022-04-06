from django.urls import path
from locacion_productiva.views import LocacionProductivaListado,LocacionProductivaBuscarPorId

urlpatterns = [
    #Rutas locaciones Productivas
    path('locacion_productiva',LocacionProductivaListado),
    path('locacion_productiva/<int:pk>',LocacionProductivaBuscarPorId)
]