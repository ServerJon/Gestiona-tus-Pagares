export interface Pagare {
  id: string;
  banco: string;
  cliente: string;
  concepto: string;
  fecha_entrega: number;
  importe: number;
  vencimiento: number;
}
