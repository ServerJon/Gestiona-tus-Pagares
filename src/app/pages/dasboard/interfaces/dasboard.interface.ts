export interface _Date {
	seconds: string;
}

export interface Pagare {
	id: string;
	cliente: string;
	importe: string;
	vencimiento: _Date;
	concepto: string;
	fecha_entrega: _Date;
	banco: string;
}

export interface DialogData {
	title: string;
	button: string;
	pagare: Pagare;
	editOrCreate: boolean;
}
