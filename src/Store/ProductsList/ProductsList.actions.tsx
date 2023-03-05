import {List} from '../../Interfaces/listIntefaces';

export function setProductsList(productsList: List[]) {
  return {
    type: 'SELECT_PRODUCTS_LIST',
    payload: productsList,
  };
}
