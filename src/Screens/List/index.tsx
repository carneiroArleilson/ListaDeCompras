import React, {useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import TotalCalc from '../../Components/Total';
import {ItemList, List} from '../../Interfaces/listIntefaces';
import styles from './styles';
import {selectProductsList} from '../../Store/ProductsList/ProductsList.selectors';
import {setProductsList} from '../../Store/ProductsList/ProductsList.actions';
import {navigationInterface} from '../../Interfaces/globalInterfaces';
import {TextInputMask} from 'react-native-masked-text';

const ListScreen = ({route}: navigationInterface) => {
  const ProductsFromRedux: List[] = useSelector(selectProductsList);
  const dispatch = useDispatch();
  const [Product, setProduct] = useState<ItemList[]>([]);
  const [inputMoeda, setInputMoeda] = useState('0');

  useState(() => {
    const itemProductList = ProductsFromRedux.find(
      item => item.id === route?.params.list,
    );
    setProduct(itemProductList.itens);
  }, [ProductsFromRedux]);

  const alteration = (id: string, value: any, type: string) => {
    let aux = Product;
    aux = aux.map(item => {
      if (item.id === id) {
        return {
          ...item,
          [type]: value,
        };
      } else {
        return {...item};
      }
    });
    setProduct([...aux]);
    pullRedux(aux);
  };

  const AddProduct = () => {
    let aux = Product;
    aux = [
      ...aux,
      {
        id: `item-${route?.params.list}.${aux.length}`,
        type: 'item',
        check: true,
        qtd: 1,
        description: '',
        value: 0,
      },
    ];
    setProduct(aux);
    pullRedux(aux);
  };

  const pullRedux = (aux: ItemList[]) => {
    let aux2 = ProductsFromRedux.map((item: List) => {
      if (item.id === route?.params.list) {
        return {
          ...item,
          itens: aux,
        };
      } else {
        return item;
      }
    });
    dispatch(setProductsList(aux2));
  };

  const excluir = (id: string) => {
    const aux = Product.filter(item => item.id !== id);
    setProduct(aux);
    pullRedux(aux);
  };

  const renderItem = ({item}: {item: ItemList}) => {
    return (
      <View style={styles.itens}>
        <TouchableOpacity
          style={styles.exclude}
          onPress={() => {
            excluir(item.id);
          }}>
          <Text style={styles.excludeText}>x</Text>
        </TouchableOpacity>
        <View style={styles.line2}>
          <TextInput
            style={styles.descriptionValue}
            placeholder="produto"
            value={item.description}
            onChangeText={value => alteration(item.id, value, 'description')}
          />
        </View>
        <View style={styles.line1}>
          <TouchableOpacity
            onPress={() => alteration(item.id, !item.check, 'check')}
            style={[styles.check]}>
            {item.check && (
              <Image source={require('../../assets/icons/Ok1.png')} />
            )}
          </TouchableOpacity>
          <View style={styles.itensQtd}>
            <TouchableOpacity
              onPress={() =>
                alteration(item.id, item.qtd === 1 ? 1 : item.qtd - 1, 'qtd')
              }
              style={styles.subtract}>
              <View style={styles.subtractText} />
            </TouchableOpacity>
            <Text style={styles.Number}>{item.qtd}</Text>
            <TouchableOpacity
              onPress={() => alteration(item.id, item.qtd + 1, 'qtd')}
              style={styles.ADD}>
              <View style={styles.ADDTextHorizontal} />
              <View style={styles.ADDTextVertical} />
            </TouchableOpacity>
          </View>
          <Text style={styles.valorUn}>Valor un:</Text>
          <View style={styles.priceComp}>
            <TextInputMask
              style={styles.priceValue}
              type={'money'}
              placeholder="R$0,00"
              placeholderTextColor={'black'}
              value={inputMoeda}
              onChangeText={value => {
                setInputMoeda(value);
                value = value.replace('R$', '');
                value = value.replace('.', '');
                value = value.replace(',', '');
                alteration(item.id, Number(value), 'value');
              }}
            />
          </View>
        </View>
        <View style={styles.line3}>
          <Text style={styles.valorUn}>Valor total:</Text>
          <Text style={styles.priceComp}>
            R$
            {(item.qtd * Number(item.value / 100)).toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <View style={styles.header}>
            <Text style={styles.title}>Lista de compras</Text>
          </View>
          <View style={styles.body}>
            <FlatList
              style={{width: '100%'}}
              data={Product}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
            />
            <TouchableOpacity
              onPress={() => AddProduct()}
              style={styles.AddNewTouch}>
              <Text style={styles.AddNew}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <TotalCalc price={Product} />
    </View>
  );
};

export default ListScreen;
