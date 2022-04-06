from django.contrib import admin
from activo.models import (ActivoIndustrial,ActivoCelular,ActivoNotebook,ActivoStandar,ActivoGeneral)

# Register your models here.
admin.site.register(ActivoIndustrial)
admin.site.register(ActivoCelular)
admin.site.register(ActivoNotebook)
admin.site.register(ActivoStandar)
admin.site.register(ActivoGeneral)


