import React from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import DateTime from './DateTime';
import apiInstance from '../../configs/apiInstance';
type Props = {
  id: string;
  city: any;
  destination: string;
  image: string;
  created_at: string;
  description: string;
  verify: boolean;
  navigation: any;
};

const Destination = (props: Props) => {
  const [seen, setSeen] = React.useState<boolean>(props.verify);
  const handleVerify = async (id: string) => {
    try {
      const res = await apiInstance.post(`/admin/verify/destination/${id}`);
      if (res.status !== 200) {
        throw new Error('Error');
      }
      setSeen(true);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View className="flex-1 flex-row items-start justify-around bg-white gap-2 mt-1.5 pb-2">
      <View className="flex flex-col items-start justify-between w-11/12">
        <View className="flex flex-row items-center justify-start w-full gap-2">
          <Text className="text-lg font-bold text-start text-black">
            {props.destination}
          </Text>
          <Text className="text-lg font-normal text-start text-black">tại</Text>
          <Text className="text-lg font-bold text-start text-black">
            {props.city.name}
          </Text>
        </View>
        <View className="flex-1 flex-row items-center justify-between gap-2 mb-2">
          <Text className="text-sm text-start text-black">
            {props.description}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {}}
          className="rounded-lg bg-gray-300 flex items-center justify-center w-full max-h-60 mb-2">
          <Image
            source={
              props.image !== ''
                ? {uri: props.image}
                : require('../../assets/image.png')
            }
            width={24}
            height={24}
            className="w-full h-full rounded-lg"
          />
        </TouchableOpacity>
        <View className="flex flex-row items-center justify-start w-full gap-4">
          <TouchableOpacity
            onPress={() => {}}
            className="flex items-center justify-center">
            <Image
              source={require('../../assets/time.png')}
              width={24}
              height={24}
              className="w-7 h-7"
            />
            <Text className="text-sm text-start text-black">
              <DateTime date={props.created_at} navigation={props.navigation} />
            </Text>
          </TouchableOpacity>
          {seen ? (
            <TouchableOpacity
              onPress={() => {}}
              className="flex items-center justify-center">
              <Image
                source={require('../../assets/verify.png')}
                width={24}
                height={24}
                className="w-7 h-7"
              />
              <Text className="text-sm mr-4 text-end text-black">
                Đã xác minh
              </Text>
            </TouchableOpacity>
          ) : (
            <View className="flex-row items-center justify-between w-3/4">
              <TouchableOpacity
                onPress={() => {
                  handleVerify(props.id);
                }}
                className="flex items-center justify-center">
                <Image
                  source={require('../../assets/verify.png')}
                  width={24}
                  height={24}
                  className="w-7 h-7"
                />
                <Text className="text-sm mr-4 text-end text-black">
                  Chờ xác minh
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleVerify(props.id);
                }}
                className="p-1 border-2 border-gray-200 rounded-lg bg-blue-200">
                <Text className="text-lg font-bold text-start text-black">
                  Xác nhận địa điểm
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Destination;
