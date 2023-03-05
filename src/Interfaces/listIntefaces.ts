export interface ItemList {
  id: string;
  type: string;
  check: boolean;
  description: string;
  qtd: number;
  value: string;
}

export interface List {
  id: string;
  type: string;
  name: string;
  itens?: ItemList[];
}
