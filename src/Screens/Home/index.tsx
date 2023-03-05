import React, {useState} from 'react';
import {
  FlatList,
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {navigationInterface} from '../../Interfaces/globalInterfaces';
import {List} from '../../Interfaces/listIntefaces';
import {setProductsList} from '../../Store/ProductsList/ProductsList.actions';
import {selectProductsList} from '../../Store/ProductsList/ProductsList.selectors';
import styles from './styles';

const HomeScreen = ({navigation}: navigationInterface) => {
  const ProductsFromRedux = useSelector(selectProductsList);
  const dispatch = useDispatch();
  const [list, setList] = useState<List[]>(ProductsFromRedux);
  const [rename, setRename] = useState('');

  const AddList = () => {
    let temp = list;
    temp = [
      ...temp,
      {
        id: `list-${temp.length}`,
        type: 'list',
        name: `lista ${temp.length + 1}`,
        itens: [],
      },
    ];
    setList(temp);
    dispatch(setProductsList(temp));
  };

  const excluir = (id: string) => {
    const aux = list.filter(item => item.id !== id);
    setList(aux);
    dispatch(setProductsList(aux));
  };

  const alteration = (id: string, value: any, type: string) => {
    let aux = list;
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
    setList([...aux]);
    dispatch(setProductsList(aux));
  };

  const renderItem = ({item}: {item: List}) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('List', {list: item.id})}
          style={styles.itens}>
          <View style={styles.line2}>
            <Text style={styles.descriptionValue}>{item.name}</Text>
          </View>
          <TouchableOpacity
            // style={styles.exclude}
            onPress={() => {
              setRename(item.id);
            }}>
            <Image source={require('../../assets/icons/Edit2x.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.exclude}
            onPress={() => {
              excluir(item.id);
            }}>
            <Text style={styles.excludeText}>x</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <Modal transparent={true} visible={rename === item.id}>
          <View style={styles.modal}>
            <View style={styles.modalComp}>
              <TextInput
                style={styles.modalTextInput}
                placeholder="Nome da lista"
                value={item.name}
                onChangeText={value => alteration(item.id, value, 'name')}
              />
              <TouchableOpacity
                style={styles.modalTouch}
                onPress={() => {
                  setRename('');
                }}>
                <Text style={styles.modalTouchText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <View style={styles.header}>
            <Text style={styles.title}>Listas de compras</Text>
          </View>
          <View style={styles.body}>
            <FlatList
              style={{width: '100%'}}
              data={list}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
            />
            <TouchableOpacity onPress={() => AddList()} style={styles.AddTouch}>
              <Text style={styles.Add}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
