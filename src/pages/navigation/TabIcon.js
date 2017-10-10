import React, {
  PropTypes,
} from 'react';
import {
  Text,Image
} from 'react-native';
import {Images} from '../../Themes';

const propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string,
};

const TabIcon = (props) => {
  return <Image source={Images.icon_spot}/>
};

TabIcon.propTypes = propTypes;

export default TabIcon;
