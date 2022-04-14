import { ActivoCelular } from "../activos/activo_celular/activo-celular";
import { ActivoGeneral } from "../activos/activo_general/activo-general";
import { Activo } from "../activos/activo_industrial/activo";
import { ActivoNotebook } from "../activos/activo_notebook/activo-notebook";
import { ActivoStandar } from "../activos/activo_standar/activo-standar";

export class Locacion {
    id=0;
    sitio="";
    area="";
    localizacion ="";
    activo_industrial: Activo;
    activo_standar: ActivoStandar;
    activo_general: ActivoGeneral;
    activo_notebook: ActivoNotebook;
    activo_celular: ActivoCelular;
    fecha=new Date();
}
