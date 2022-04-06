from django.urls import path
from linea_telefonica.views import LineaTelefonicaListado, LineaTelefonicaBuscarPorId,BusquedaLineaTelefonicaNumero

urlpatterns = [
    #Rutas Linea Telefonica
    path('linea_telefonica', LineaTelefonicaListado),
    path('linea_telefonica/<int:pk>', LineaTelefonicaBuscarPorId),
    path('linea_telefonica/buscar/<str:buscar_linea_telefonica>',BusquedaLineaTelefonicaNumero)

]