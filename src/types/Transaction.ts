export interface Transaction {
  id: string;
  'F. Operativa': string;
  Concepto: string;
  'F. Valor': string;
  Importe: number;
  Saldo: number;
  'Referencia 1'?: string;
  'Referencia 2'?: string;
  Category?: string;
}
