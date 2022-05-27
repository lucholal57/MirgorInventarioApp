from django.urls import path
from linea_telefonica.views import LineaTelefonicaListado, LineaTelefonicaBuscarPorId,BusquedaLineaTelefonicaNumero,ValidacionLineaTelefonica

urlpatterns = [
    #Rutas Linea Telefonica
    path('linea_telefonica', LineaTelefonicaListado),
    path('linea_telefonica/<int:pk>', LineaTelefonicaBuscarPorId),
    path('linea_telefonica/buscar/<str:buscar_linea_telefonica>',BusquedaLineaTelefonicaNumero),
    path('linea_telefonica/validar/<str:validar_linea_telefonica>',ValidacionLineaTelefonica)

]