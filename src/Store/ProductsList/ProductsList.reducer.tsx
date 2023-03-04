import {ItemList} from '../../Interfaces/List';

export default function (state: ItemList[] = [], action: any) {
  switch (action.type) {
    case 'SELECT_PRODUCTS_LIST':
      console.log('reducer action:', action);
      return (state = action.payload);
    default:
      return state;
  }
}
