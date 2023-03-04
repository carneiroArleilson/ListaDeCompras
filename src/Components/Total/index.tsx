import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {ItemList} from '../../Interfaces/List';
import styles from './styles';

const TotalCalc = (Product: any) => {
  const [price, setPrice] = useState(0);

  const calc = () => {
    let temp = 0;
    if (Product.price) {
      Product.price.map((item: ItemList) => {
        if (item.check) {
          temp = temp + item.qtd * Number(item.value);
        }
      });
    }
    setPrice(temp);
  };

  useEffect(() => {
    calc();
  }, [Product]);

  return (
    <View style={[styles.container]}>
      <Text style={styles.TotalText}>
        {' '}
        Total{' '}
        {price.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </Text>
    </View>
  );
};

export default TotalCalc;
