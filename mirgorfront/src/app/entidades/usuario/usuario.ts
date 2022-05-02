import { ActivoCelular } from "../activos/activo_celular/activo-celular";
import { ActivoNotebook } from "../activos/activo_notebook/activo-notebook";
import { LineaTelefonica } from "../linea_telefonica/linea-telefonica";

export class Usuario {
  id=0;
  nombre="";
  correo="";
  area="";
  posicion="";
  fecha_entrega =new Date();
  activo_celular: ActivoCelular;
  activo_notebook: ActivoNotebook;
  linea_telefonica: LineaTelefonica
}
