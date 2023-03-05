import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
// import RNBootSplash from 'react-native-splash-screen';

/**
 * It's a workaround for any lib using the react-native-gesture-handler incorrectly.
 * We need to wait next RN upgrading to upgrade the other libs as well.
 */
import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistedStore, store} from './Store/Store';
import AppRoutes from './Routes/App.routes';
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AppRoutes />
      </PersistGate>
    </Provider>
  );
};

export default App;
