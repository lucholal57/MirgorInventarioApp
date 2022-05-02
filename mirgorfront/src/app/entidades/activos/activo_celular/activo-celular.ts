import { LineaTelefonica } from "../../linea_telefonica/linea-telefonica";

export class ActivoCelular {
  id=0;
  inventario ="";
  imei = "";
  marca = "";
  modelo = "";
  estado = "";
  linea_telefonica : LineaTelefonica;
}
