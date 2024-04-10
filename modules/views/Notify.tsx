import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import apiInstance from '../../configs/apiInstance';
import DateTime from './DateTime';
type Props = {
  id: string;
  name: string;
  country: string;
  avatar: string;
  verify: boolean;
  created_at: string;
  navigation: any;
};

const Notify = (props: Props) => {
  const [seen, setSeen] = React.useState<boolean>(props.verify);

  const handleVerify = async () => {
    try {
      const res = await apiInstance.post(`/admin/verify/city/${props.id}`);
      if (res.status !== 200) {
        throw new Error('Error');
      }
      setSeen(true);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <TouchableOpacity
      onPress={() => {
        handleVerify();
      }}
      className={
        seen
          ? 'flex flex-row items-center justify-evenly bg-gray-100 w-11/12 p-2 border-2 border-gray-200 rounded-xl mt-2'
          : 'flex flex-row items-center justify-evenly bg-blue-100 w-11/12 p-2 border-2 border-blue-200 rounded-xl mt-2'
      }>
      <TouchableOpacity
        onPress={() => {
          handleVerify();
        }}
        className="rounded-full flex items-center justify-center border-2 border-gray-300">
        <Image
          source={
            props.avatar !== undefined
              ? {uri: props.avatar}
              : require('../../assets/avatar.png')
          }
          width={16}
          height={16}
          className="w-12 h-12 rounded-full"
        />
      </TouchableOpacity>
      <View className="flex flex-col items-start justify-center w-3/4">
        <View className="flex flex-col items-start justify-center rounded-xl">
          <Text className="text-lg font-bold text-start text-black">
            {props.name}{' '}
            <Text className="text-sm text-start text-black font-normal">
              thành phố mới đã được thêm bởi người dùng tại{' '}
              <Text className="text-sm text-start text-black font-bold">
                {props.country.length > 40
                  ? props.country.slice(0, 40) + '...'
                  : props.country}
              </Text>
            </Text>
          </Text>
        </View>
        <View className="flex flex-row items-center justify-center">
          <DateTime date={props.created_at} navigation={props.navigation} />
          <TouchableOpacity onPress={() => {}}>
            <Text className="text-xs mr-4 text-end text-black font-bold">
              Xem chi tiết
            </Text>
          </TouchableOpacity>
          {seen ? null : (
            <TouchableOpacity
              onPress={() => {
                handleVerify();
              }}>
              <Text className="text-xs text-end text-black font-bold">
                Xác nhận địa điểm
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Notify;
