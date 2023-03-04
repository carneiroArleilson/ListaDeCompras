import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers, createStore} from 'redux';
import ProductsListReducer from './ProductsList/ProductsList.reducer';
import {persistStore, persistReducer} from 'redux-persist';

const rootReducer = combineReducers({
  productsList: ProductsListReducer,
});

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: AsyncStorage,
  },
  rootReducer,
);

export const store = createStore(persistedReducer);
export const persistedStore = persistStore(store);
