import {url} from '../../../../App';
import {messageI} from 'components/utils/api/Chat';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {PRIMARY_COLOR, WHITE_COLOR} from 'themes/theme';

export const ChatProfileImage = ({image}: {image: string}) => {
  return (
    <View style={{width: 30, height: 30}}>
      <Image
        // source={{
        //   uri: image.includes('https') ? image : image.replace('http', 'https'),
        // }}
        source={{uri: url + '/images/' + image}}
        style={{
          width: 30,
          height: 30,
          backgroundColor: '#ffffff',
          borderRadius: 30 / 2,
        }}></Image>
    </View>
  );
};

const MessageOrange = ({text}: {text: string}) => {
  return (
    <View style={styles.messageOrangeWrapper}>
      <Text
        style={{
          color: WHITE_COLOR,
        }}>
        {text}
      </Text>
    </View>
  );
};

const MessageGray = ({text}: {text: string}) => {
  return (
    <View style={styles.messageGrayWrapper}>
      <Text>{text}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  message: {},
  messageOrangeWrapper: {
    maxWidth: 250,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: PRIMARY_COLOR,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // alignSelf: 'flex-end',
    borderRadius: 20,
    color: WHITE_COLOR,
  },
  messageGrayWrapper: {
    maxWidth: 250,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#F7F8FA',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
});

export {MessageOrange, MessageGray};
