import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import apiInstance from '../../configs/apiInstance';
import Destination from '../views/Destination';

type Props = {
  navigation: any;
};
const AddressScreen = (props: Props) => {
  const [data, setData] = useState<any[]>([]);
  const [destination, setDestination] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    fetchDestination();
    setPage(1);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchDestination();
  }, [page]);

  const fetchDestination = async () => {
    try {
      const response = await apiInstance.get(`/admin/destination`, {
        params: {
          page,
        },
      });
      if (response.status !== 200) {
        throw new Error('Error');
      }
      if (page === 1) {
        setDestination(response.data.data);
      } else {
        setDestination([...destination, ...response.data.data]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleScroll = (event: any) => {
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;
    if (isCloseToBottom) {
      setPage(page + 1);
    }
  };

  return (
    <View className="w-full h-full bg-gray-100">
      <View className="flex flex-row items-center justify-between bg-white">
        <View>
          <Text className="text-2xl font-bold m-4 text-start text-black">
            Địa danh du lịch
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Login')}
            className="w-8 h-8 rounded-full flex items-center justify-center mr-4">
            <Image
              source={require('../../assets/search.png')}
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        className="bg-blue-200 w-16 h-16 rounded-full flex items-center justify-center absolute bottom-5 right-5 z-10"
        onPress={() => props.navigation.navigate('NewDestination')}>
        <Image source={require('../../assets/add.png')} className="w-6 h-6" />
      </TouchableOpacity>
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={10}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {destination.map((item, index) => {
          return (
            <Destination
              key={index}
              id={item._id}
              city={item.city}
              destination={item.travel_destination}
              image={item.image}
              created_at={item.created_at}
              description={item.description}
              verify={item.verify}
              navigation={props.navigation}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default AddressScreen;
