import React, {
  PropTypes,
} from 'react';
import {
  Text,Image,View
} from 'react-native';

export const  TabIcon = (title,image,textStyle,bgStyle,ifTure) => {
  return (
  <View>
    <View style={{flexDirection:'column',alignItems:'center'}}>
      <Image style={bgStyle} source={image}/>
      <Text style={[textStyle,{fontSize:10,marginTop:2}]}>{title}</Text>
    </View>
      {ifTure?<View style={{position:'absolute',width:8,height:8,borderRadius:4,backgroundColor:'red',marginBottom:20,marginLeft:21}}/>
          :null}
  </View>
  )
};

