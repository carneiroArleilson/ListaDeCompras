import {StyleSheet} from 'react-native';
import {getResponsiveValue} from '../../Services/utils';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    position: 'absolute',
    width: '100%',
    height: getResponsiveValue(50),
    bottom: getResponsiveValue(0),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TotalText: {
    fontSize: getResponsiveValue(20),
    fontWeight: '700',
    color: 'black',
  },
});

export default styles;
