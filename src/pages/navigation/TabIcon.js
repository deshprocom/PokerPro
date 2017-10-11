import React, {
  PropTypes,
} from 'react';
import {
  Text,Image,View
} from 'react-native';


export const  TabIcon = (title,image) => {
  return (
  <View style={{flexDirection:'column',alignItems:'center'}}>
    <Text>{title}</Text>
    <Image source={image}/>
  </View>
  )
};

