export interface Pagare {
  id: string;
  cliente: string;
  importe: number;
  vencimiento: number;
  banco: string;
  concepto: string;
  fecha_entrega: number;
}

export interface IpcData {
  code: boolean;
  pagares: Pagare[];
}
