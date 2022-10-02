import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export type BtnWithoutTextProps = {
  onPress(): void;
};

const UserProfileImage = () =>
  // props: BtnWithoutTextProps
  {
    return (
      <View>
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM71blXA4QuOS8gTUSuO2B3IGGoLVQZrYNGQ&usqp=CAU',
          }}
          style={{
            width: 45,
            height: 45,
            backgroundColor: '#ffffff',
            borderRadius: 45 / 2,
          }}></Image>
      </View>
    );
  };

const styles = StyleSheet.create({});

export default UserProfileImage;
