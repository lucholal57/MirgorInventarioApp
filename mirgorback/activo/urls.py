from django.urls import path
from .views import (ActivoIndustrialListado, ActivoIndustrialBuscarPorId,
BusquedaActivoIndustrialInventario,BusquedaActivoNotebookInventario,
ActivoCelularListado,ActivoCelularBuscarPorId,ActivoNotebookListado,
ActivoNotebookBuscarPorId,ActivoGeneralListado,ActivoGeneralBuscarPorId,
ActivoStandarListado,ActivoStandarBuscarPorId,BusquedaActivoCelularImei,BusquedaActivoGeneralInventario,BusquedaActivoStandarInventario, ValidacionPorInventarioCelular, ValidacionPorInventarioGeneral, ValidacionPorInventarioIndustrial, ValidacionPorInventarioNotebook, ValidacionPorInventarioStandar)

urlpatterns = [
    #Rutas Activos industriales
    path('activo', ActivoIndustrialListado),
    path('activo/<int:pk>', ActivoIndustrialBuscarPorId),
    path('activo/buscar/<str:buscar_activo>',BusquedaActivoIndustrialInventario),
    path('activo/validar/<str:validar_inventario>', ValidacionPorInventarioIndustrial),
    #Rutas Activos Celulares
    path('celular', ActivoCelularListado),
    path('celular/<int:pk>',ActivoCelularBuscarPorId),
    path('celular/buscar/<str:buscar_activo>',BusquedaActivoCelularImei),
    path('celular/validar/<str:validar_inventario>', ValidacionPorInventarioCelular),
    #Rutas para Activos Notebook
    path('notebook',ActivoNotebookListado),
    path('notebook/<int:pk>',ActivoNotebookBuscarPorId),
    path('notebook/buscar/<str:buscar_activo>',BusquedaActivoNotebookInventario),
    path('notebook/validar/<str:validar_inventario>', ValidacionPorInventarioNotebook),
    #Rutas Activo General
    path('activo_general',ActivoGeneralListado),
    path('activo_general/<int:pk>',ActivoGeneralBuscarPorId),
    path('activo_general/buscar/<str:buscar_activo>',BusquedaActivoGeneralInventario),
    path('activo_general/validar/<str:validar_inventario>', ValidacionPorInventarioGeneral),
    #Rutas Activo Standar
    path('activo_standar',ActivoStandarListado),
    path('activo_standar/<int:pk>',ActivoStandarBuscarPorId),
    path('activo_standar/buscar/<str:buscar_activo>',BusquedaActivoStandarInventario),
    path('activo_standar/validar/<str:validar_inventario>', ValidacionPorInventarioStandar),
    
]
