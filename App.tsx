import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Tabs from './Navigation/Tabs';

import LoginScreen from './modules/screens/Login';
import store from './redux/store';
import WelcomeScreen from './modules/screens/Welcome';
import SearchScreen from './modules/screens/Search';

function App() {
  const isAuthenticated = store.getState().auth.isAuthenticated;
  const [isWelcome, setIsWelcome] = React.useState(true);
  React.useEffect(() => {
    console.log('store', store.getState().auth.isAuthenticated);
    setTimeout(() => {
      setIsWelcome(false);
    }, 3000);
  }, []);

  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {isWelcome ? (
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
          ) : isAuthenticated ? (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="HomePage" component={Tabs} />
              <Stack.Screen name="Search" component={SearchScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
