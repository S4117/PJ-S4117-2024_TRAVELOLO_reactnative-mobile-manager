import React, {useEffect, useState} from 'react';
import {View, Text, RefreshControl, ScrollView} from 'react-native';
import apiInstance from '../../configs/apiInstance';
import Notify from '../views/Notify';

type Props = {
  navigation: any;
};
const CityScreen = (props: Props) => {
  const [data, setData] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    fetchNotify();
    setRefreshing(false);
  };
  useEffect(() => {
    fetchNotify();
  }, []);
  const fetchNotify = async () => {
    try {
      const response = await apiInstance.get('/admin/city');
      if (response.status !== 200) {
        throw new Error('Error');
      }
      setData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleScroll = (event: any) => {
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;
  };
  return (
    <View className="flex flex-col items-center justify-start w-full h-full bg-white">
      <View className="w-full bg-white flex flex-row items-center justify-start gap-2">
        <Text className="text-2xl font-bold p-4 text-start text-black">
          Thông báo
        </Text>
      </View>
      <ScrollView
        className="w-full h-full"
        onScroll={handleScroll}
        scrollEventThrottle={10}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View className="flex flex-col items-center justify-start w-full h-full bg-white">
          {data.length > 0 ? (
            data.map((item, index) => (
              <Notify
                key={index}
                id={item._id}
                name={item.name}
                country={item.country}
                avatar={item.avatar}
                verify={item.verify}
                created_at={item.created_at}
                navigation={props.navigation}
              />
            ))
          ) : (
            <View>
              <Text>No data</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default CityScreen;
