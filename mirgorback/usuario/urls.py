from django.urls import path
from usuario.views import UsuarioListado, UsuarioBuscarPorId,BusquedaUsuarioPorNombre,ValidacionPorLegajo

urlpatterns = [
    #rutas para los usuarios
    path('usuario',UsuarioListado),
    path('usuario/<int:pk>', UsuarioBuscarPorId),
    path('usuario/buscar/<str:buscar_usuario>', BusquedaUsuarioPorNombre),
    path('usuario/validar/<str:validar_legajo>', ValidacionPorLegajo)

]