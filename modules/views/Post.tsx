import React, {useEffect, useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import DateTime from './DateTime';
import apiInstance from '../../configs/apiInstance';

type Props = {
  id: string;
  name: string;
  avatar: any;
  user_id: number;
  time: string;
  status: string;
  like: number;
  isLike: boolean;
  comment: number;
  image: string;
  destination: string;
  privacy: string;
  verify: boolean;
  navigation: any;
};

const Post = (props: Props) => {
  const [verify, setVerify] = useState(props.verify);
  const [report, setReport] = useState(false);

  useEffect(() => {
    setVerify(props.verify);
    setReport(false);
  }, [props.verify]);

  const handelVerify = async () => {
    try {
      const response = await apiInstance.post(`/admin/verify/post/${props.id}`);
      if (response.status !== 200) {
        throw new Error('Error');
      }
      setVerify(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReport = async () => {
    try {
      const response = await apiInstance.post(`/admin/report/post/${props.id}`);
      if (response.status !== 200) {
        throw new Error('Error');
      }
      setReport(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className="flex-1 flex-row items-start justify-around bg-white gap-2 mt-1.5 pb-2 pl-2">
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Login')}
        className="rounded-full flex items-center justify-center ml-2 border-2 border-gray-300">
        <Image
          source={props.avatar || require('../../assets/avatar.png')}
          width={10}
          height={10}
          className="w-10 h-10 rounded-full"
        />
      </TouchableOpacity>
      <View className="flex flex-col items-start justify-between w-10/12 mr-2">
        <View className="flex flex-row items-center justify-between w-full">
          <Text className="text-lg font-bold text-start text-black">
            {props.name}
          </Text>
          <View className="flex flex-row items-center justify-start">
            <DateTime date={props.time} navigation={props.navigation} />
          </View>
        </View>
        <View className="flex-1 flex-row items-center justify-between gap-2">
          <Text className="text-sm text-start text-black">{props.status}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {}}
          className="rounded-lg bg-gray-300 flex items-center justify-center w-full h-40 mb-2">
          <Image
            source={
              props.image !== ''
                ? {uri: props.image}
                : require('../../assets/avatar.png')
            }
            width={24}
            height={24}
            className="w-full h-40 rounded-lg"
          />
        </TouchableOpacity>
        <View className="flex flex-row items-center justify-between w-full">
          <View className="flex flex-row items-center justify-start gap-2">
            <TouchableOpacity
              onPress={() => {}}
              className="w-8 h-8 flex items-center justify-center">
              <Image
                source={require('../../assets/heart.png')}
                width={24}
                height={24}
                className="w-7 h-7"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Login')}
              className="w-8 h-8 flex items-center justify-center">
              <Image
                source={require('../../assets/comment.png')}
                width={24}
                height={24}
                className="w-7 h-7"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate('Login')}
              className="w-8 h-8 flex items-center justify-center">
              <Image
                source={require('../../assets/share.png')}
                width={24}
                height={24}
                className="w-7 h-7"
              />
            </TouchableOpacity>
          </View>

          <View className="flex flex-row items-center justify-center">
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Login')}
              className="w-8 h-8 flex items-center justify-center">
              <Image
                source={require('../../assets/address.png')}
                className="w-5 h-5"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Login')}
              className="h-8 flex items-end justify-center">
              <Text className="text-sm text-black font-bold text-end">
                {props.destination}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {verify ? (
          <View className="flex items-center justify-between w-full">
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Login')}
              className="rounded-full flex items-center justify-center bg-green-100 pl-4 pt-2 pb-2 pr-4">
              <Text className="text-sm text-black font-bold text-end">
                Đã xác thực bài viết
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="flex flex-row items-center justify-between w-full">
            <TouchableOpacity
              onPress={() => {
                handelVerify();
              }}
              className="rounded-full flex items-center justify-center bg-blue-300 pl-4 pt-2 pb-2 pr-4">
              <Text className="text-sm text-black font-bold text-end">
                Xác thực ngay
              </Text>
            </TouchableOpacity>
            {report ? (
              <TouchableOpacity
                onPress={() => {}}
                className="rounded-full flex items-center justify-center bg-red-100 pl-4 pt-2 pb-2 pr-4">
                <Text className="text-sm text-black font-bold text-end">
                  Đã báo cáo
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  handleReport();
                }}
                className="rounded-full flex items-center justify-center bg-red-300 pl-4 pt-2 pb-2 pr-4">
                <Text className="text-sm text-black font-bold text-end">
                  Báo cáo vi phạm
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default Post;
