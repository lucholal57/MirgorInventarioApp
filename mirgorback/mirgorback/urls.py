"""mirgorback URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('activo.urls')),
    path('',include('locacion.urls')),
    path('',include('locacion_productiva.urls')),
    path('',include('usuario.urls')),
    path('',include('linea_telefonica.urls')),
    path('',include('trazabilidad.urls')),
    path('',include('produccion.urls')),
    #Path para administrar las URLS de app login, login logout etc
    path('',include('login.urls')),
]
