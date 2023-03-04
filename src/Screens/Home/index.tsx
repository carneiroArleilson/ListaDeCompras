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
import {ItemList} from '../../Interfaces/List';
import styles from './styles';
import {selectProductsList} from '../../Store/ProductsList/ProductsList.selectors';
import {setProductsList} from '../../Store/ProductsList/ProductsList.actions';

const Home = () => {
  const ProductsFromRedux = useSelector(selectProductsList);
  const dispatch = useDispatch();
  const [Product, setProduct] = useState<ItemList[]>(ProductsFromRedux);
  console.log('Home:', {ProductsFromRedux});

  useState(() => {
    console.log({ProductsFromRedux});
  }, [ProductsFromRedux]);

  const alteration = (id: number, value: any, type: string) => {
    if (type === 'value') {
      value = value.replace(',', '.');
    }
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
    dispatch(setProductsList(aux));
  };

  const AddProduct = () => {
    let temp = Product;
    temp = [
      ...temp,
      {
        id: temp.length === 0 ? 0 : temp[temp.length - 1].id + 1,
        check: false,
        qtd: 0,
        description: '',
        value: '',
      },
    ];
    setProduct(temp);
    dispatch(setProductsList(temp));
  };

  const excluir = (id: number) => {
    const aux = Product.filter(item => item.id !== id);
    setProduct(aux);
    dispatch(setProductsList(aux));
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
                alteration(item.id, item.qtd === 0 ? 0 : item.qtd - 1, 'qtd')
              }
              style={styles.subtract}>
              <View style={styles.subtractText} />
            </TouchableOpacity>
            <Text style={styles.Number}>{item.qtd}</Text>
            <TouchableOpacity
              onPress={() => alteration(item.id, item.qtd + 1, 'qtd')}
              style={styles.ADD}>
              <View style={styles.ADDText} />
              <View style={styles.ADDTextV} />
            </TouchableOpacity>
          </View>
          <Text style={styles.valorUnd}>Valor un:</Text>
          <View style={styles.priceioncomp}>
            <Text style={styles.priceionValueRS}>R$</Text>
            <TextInput
              style={styles.priceionValue}
              keyboardType="numeric"
              placeholder="0,00"
              placeholderTextColor={'black'}
              value={item.value.replace('.', ',')}
              onChangeText={value => alteration(item.id, value, 'value')}
            />
          </View>
        </View>
        <View style={styles.line3}>
          <Text style={styles.valorUnd}>Valor total:</Text>
          <Text style={styles.priceioncomp}>
            {(item.qtd * Number(item.value)).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
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
              style={styles.AddTouch}>
              <Text style={styles.Add}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <TotalCalc price={Product} />
    </View>
  );
};

export default Home;
