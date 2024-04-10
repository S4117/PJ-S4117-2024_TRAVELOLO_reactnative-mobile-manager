import {Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../modules/screens/Homepage';
import CityScreen from '../modules/screens/City';
import AddressScreen from '../modules/screens/Address';
import MenuScreen from '../modules/screens/Menu';

type Props = {
  navigation: any;
};

const Tab = createBottomTabNavigator();

const Tabs = (props: Props) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={({route}) => ({
          tabBarIcon: ({focused}) => (
            <TouchableOpacity
              onPress={() => {
                if (props.navigation.isFocused()) {
                  props.navigation.navigate('Home', {refresh: true});
                } else {
                  props.navigation.navigate('Home');
                }
              }}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../assets/home.png')}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? '#0F9AFE' : '#666',
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Tab.Screen
        name="Address"
        component={AddressScreen}
        options={({route}) => ({
          tabBarIcon: ({focused}) => (
            <View className="flex-col items-center justify-center">
              <Image
                source={require('../assets/map.png')}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? '#0F9AFE' : '#666',
                }}
              />
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="City"
        component={CityScreen}
        options={({route}) => ({
          tabBarIcon: ({focused}) => (
            <View className="flex-col items-center justify-center align-middle">
              {/* Hiển thị số lượng thông báo trên biểu tượng thông báo */}
              <View style={{position: 'relative'}}>
                <Image
                  source={require('../assets/city.png')}
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: focused ? '#0F9AFE' : '#666',
                  }}
                />
              </View>
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={({route}) => ({
          tabBarIcon: ({focused}) => (
            <View className="flex-col items-center justify-center">
              <Image
                source={require('../assets/menu.png')}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? '#0F9AFE' : '#666',
                }}
              />
            </View>
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
