import {StyleSheet} from 'react-native';
import {getResponsiveValue} from '../../Services/utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7a42d',
    paddingBottom: getResponsiveValue(50),
  },
  header: {
    marginTop: getResponsiveValue(20),
  },
  body: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: getResponsiveValue(20),
  },
  itens: {
    flexDirection: 'row',
    width: '90%',
    backgroundColor: '#43a7f5',
    padding: getResponsiveValue(10),
    borderRadius: getResponsiveValue(8),
    marginVertical: getResponsiveValue(10),
    marginHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  exclude: {
    backgroundColor: 'red',
    width: getResponsiveValue(20),
    height: getResponsiveValue(20),
    borderRadius: getResponsiveValue(10),
    alignItems: 'center',
    justifyContent: 'center',
    padding: getResponsiveValue(0),
  },
  excludeText: {
    color: '#FFF',
    fontSize: getResponsiveValue(16),
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: getResponsiveValue(16),
  },
  line2: {
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: getResponsiveValue(4),
  },
  title: {
    fontSize: getResponsiveValue(16),
    fontWeight: '700',
    textAlign: 'center',
    color: 'black',
  },
  AddTouch: {
    backgroundColor: '#43a7f5',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: getResponsiveValue(30),
    width: getResponsiveValue(60),
    height: getResponsiveValue(60),
  },
  Add: {
    fontSize: getResponsiveValue(40),
    fontWeight: '700',
    textAlign: 'center',
    color: 'black',
  },
  descriptionValue: {
    width: '100%',
    borderRadius: getResponsiveValue(8),
    backgroundColor: '#638DAF',
    padding: getResponsiveValue(5),
    fontSize: getResponsiveValue(16),
    fontWeight: '700',
    textAlign: 'center',
    color: 'black',
  },
});

export default styles;
