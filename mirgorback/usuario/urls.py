from django.urls import path
from usuario.views import UsuarioListado, UsuarioBuscarPorId,BusquedaUsuarioPorNombre,ValidacionPorLegajo,BusquedaImeiPorUsuario

urlpatterns = [
    #rutas para los usuarios
    path('usuario',UsuarioListado),
    path('usuario/<int:pk>', UsuarioBuscarPorId),
    path('usuario/buscar/<str:buscar_usuario>', BusquedaUsuarioPorNombre),
    path('usuario/validar/<str:validar_legajo>', ValidacionPorLegajo),
    path('usuario/validar_imei/<str:validar_imei>', BusquedaImeiPorUsuario),

]