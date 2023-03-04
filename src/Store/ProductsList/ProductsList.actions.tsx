import {ItemList} from '../../Interfaces/List';

export function setProductsList(productsList: ItemList[]) {
  return {
    type: 'SELECT_PRODUCTS_LIST',
    payload: productsList,
  };
}
