import React, {
  PropTypes,
} from 'react';
import {
  Text,Image,View
} from 'react-native';


export const  TabIcon = (title,image,textStyle,bgStyle) => {
  return (
  <View style={{flexDirection:'column',alignItems:'center'}}>
    <Image style={bgStyle} source={image}/>
    <Text style={[textStyle,{fontSize:10,marginTop:2}]}>{title}</Text>
  </View>
  )
};

