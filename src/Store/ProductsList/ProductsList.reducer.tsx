import {List} from '../../Interfaces/listIntefaces';

export default function (state: List[] = [], action: any) {
  switch (action.type) {
    case 'SELECT_PRODUCTS_LIST':
      console.log('reducer action:', JSON.stringify(action, null, 2));
      return (state = action.payload);
    default:
      return state;
  }
}
