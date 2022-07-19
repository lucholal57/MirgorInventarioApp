import { LocacionProductiva } from "../locacion-productiva/locacion-productiva";
import { Locacion } from "../locacion/locacion";

export class Trazabilidad {
  id=0;
  locacion:Locacion;
  locacion_productiva:LocacionProductiva;
  sitio = "";
  area = "";
  localizacion = "";
  unidad_negocio = "";
  nave = "";
  fecha = new Date();
}
