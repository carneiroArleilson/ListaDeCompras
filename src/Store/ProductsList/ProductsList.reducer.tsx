import {List} from '../../Interfaces/listIntefaces';

export default function (state: List[] = [], action: any) {
  switch (action.type) {
    case 'SELECT_PRODUCTS_LIST':
      return (state = action.payload);
    default:
      return state;
  }
}
