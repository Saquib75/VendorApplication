import React from 'react';
import {Image, View} from 'react-native';

import Imports from '../assets/imports.assets';

function Elippses() {
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        position: 'absolute',
        height: '100%',
        zIndex: 10,
      }}>
      <Image
        source={require('../assets/images/Ellipse1.png')}
        style={{
          position: 'absolute',
          width: 60,
          height: 60,
          bottom: 100,
          right: -20,
        }}
        resizeMode="contain"
      />
      <Image
        source={require('../assets/images/Ellipse2.png')}
        style={{
          position: 'absolute',
          width: 60,
          height: 60,
          left: -20,
          bottom: 120,
        }}
        resizeMode="contain"
      />
      <Image
        source={require('../assets/images/Ellipse3.png')}
        style={{
          position: 'absolute',
          width: 60,
          height: 60,
          bottom: -20,
          right: 20,
        }}
        resizeMode="contain"
      />
      <Image
        source={require('../assets/images/Ellipse4.png')}
        style={{
          position: 'absolute',
          width: 60,
          height: 60,
          left: 20,
          bottom: -20,
          transform: [{rotate: '90deg'}],
        }}
        resizeMode="contain"
      />
      <Image
        source={require('../assets/images/Ellipse6.png')}
        style={{
          position: 'absolute',
          width: 60,
          height: 60,
          left: -20,
          top: -20,
          transform: [{rotate: '180deg'}],
        }}
        resizeMode="contain"
      />
      <Imports.images.LoginBottom
        style={{
          right: -30,
          transform: [{rotate: '-50deg'}],
          position: 'absolute',
        }}
      />
    </View>
  );
}

export default Elippses;
