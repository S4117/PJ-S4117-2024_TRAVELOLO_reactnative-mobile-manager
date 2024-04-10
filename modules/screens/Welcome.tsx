import React from 'react';
import {View, Text} from 'react-native';

const WelcomeScreen = () => {
  return (
    <View className="flex-[1] items-center justify-center mt-2">
      <Text className="text-5xl font-bold text-center text-blue-400">
        Travelolo
      </Text>
      <Text className="text-2xl font-bold text-center text-blue-400">
        Manage application
      </Text>
    </View>
  );
};

export default WelcomeScreen;
