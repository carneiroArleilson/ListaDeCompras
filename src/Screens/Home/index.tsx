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
import {ItemList, List} from '../../Interfaces/listIntefaces';
import {setProductsList} from '../../Store/ProductsList/ProductsList.actions';
import {selectProductsList} from '../../Store/ProductsList/ProductsList.selectors';
import styles from './styles';

const HomeScreen = ({navigation}: navigationInterface) => {
  const ProductsFromRedux = useSelector(selectProductsList);
  const dispatch = useDispatch();
  const [list, setList] = useState<List[]>(ProductsFromRedux);
  const [rename, setRename] = useState('');
  const [modalRename, setModalRename] = useState(false);
  const [idRename, setIdRename] = useState('');
  const [modalEasyList, setModalEasyList] = useState(false);
  const [easyList, setEasyList] = useState('');
  const [nameEasyList, setNameEasyList] = useState('');

  const AddList = (
    name: string = `lista ${list.length + 1}`,
    itens: ItemList[] = [],
  ) => {
    let temp = list;
    temp = [
      ...temp,
      {
        id: `list-${temp.length}`,
        type: 'list',
        name,
        itens,
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

  const alteration = () => {
    const id = idRename;
    const value = rename;
    let aux = list;
    aux = aux.map(item => {
      if (item.id === id) {
        return {
          ...item,
          name: value,
        };
      } else {
        return {...item};
      }
    });
    setList([...aux]);
    dispatch(setProductsList(aux));
    setModalRename(false);
  };

  const getRename = (id: string, name: string) => {
    setModalRename(true);
    setRename(name);
    setIdRename(id);
  };

  const newListEasy = (name: string, listItens: string) => {
    let newList = listItens.split(/\n/);
    newList.splice(newList.indexOf(''), 1);
    let itens: ItemList[] = [];
    newList.forEach((item, index) =>
      itens.push({
        id: `item-list-${list.length + 1}.${index + 1}`,
        type: 'item',
        check: true,
        qtd: item.split('-')[0],
        description: item.split('-')[1],
        value: 0,
      }),
    );

    setEasyList('');
    AddList(name.length === 0 ? `lista ${list.length + 1}` : name, itens);
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
          <TouchableOpacity onPress={() => getRename(item.id, item.name)}>
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
          <TouchableOpacity
            onPress={() => setModalEasyList(!modalEasyList)}
            style={styles.buttonListEasy}>
            <Text style={styles.textListEasy}>Lista fácil</Text>
          </TouchableOpacity>
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
      <Modal
        transparent={true}
        visible={modalRename}
        onRequestClose={() => {
          setModalRename(!modalRename);
          setRename('');
        }}>
        <TouchableOpacity
          onPress={() => {
            setModalRename(!modalRename);
            setRename('');
          }}
          style={styles.modal}>
          <View style={styles.modalComp}>
            <TextInput
              style={styles.modalTextInput}
              placeholderTextColor={'rgba(0,0,0,0.25)'}
              placeholder="Nome da lista"
              value={rename}
              onChangeText={setRename}
            />
            <TouchableOpacity style={styles.modalTouch} onPress={alteration}>
              <Text style={styles.modalTouchText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
      <Modal
        transparent={true}
        visible={modalEasyList}
        onRequestClose={() => {
          setModalEasyList(!modalEasyList);
        }}>
        <TouchableOpacity
          onPress={() => {
            setModalEasyList(!modalEasyList);
          }}
          style={styles.modal}>
          <View style={styles.modalComp}>
            <TextInput
              style={styles.modalTextInput}
              placeholderTextColor={'rgba(0,0,0,0.25)'}
              placeholder="Nome da lista"
              value={nameEasyList}
              onChangeText={setNameEasyList}
            />
            <TextInput
              style={styles.modalTextInput}
              placeholder={`ex.: qtd-descrição${'\n'}1-leite${'\n'}2-mingau${'\n'}15-aveia`}
              placeholderTextColor={'rgba(0,0,0,0.25)'}
              value={easyList}
              onChangeText={setEasyList}
              multiline
            />
            <TouchableOpacity
              style={styles.modalTouch}
              onPress={() => {
                newListEasy(nameEasyList, easyList);
                setModalEasyList(!modalEasyList);
              }}>
              <Text style={styles.modalTouchText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default HomeScreen;
