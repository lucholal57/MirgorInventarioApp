import { Activo } from "../activos/activo_industrial/activo";
import { ActivoStandar } from "../activos/activo_standar/activo-standar";
import { ActivoGeneral } from "../activos/activo_general/activo-general";
export class LocacionProductiva {
  id=0;
  sitio="";
  linea="";
  puesto="";
  activo_industrial: Activo;
  fecha=new Date();
}
