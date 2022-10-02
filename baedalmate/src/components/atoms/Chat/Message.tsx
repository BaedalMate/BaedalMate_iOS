import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {PRIMARY_COLOR} from 'themes/theme';

const MessageOrange = ({text}: {text: string}) => {
  return (
    <View style={styles.messageOrangeWrapper}>
      <Text>{text}</Text>
    </View>
  );
};

const MessgaeGray = ({text}: {text: string}) => {
  return (
    <View style={styles.messgaeGrayWrapper}>
      <Text>{text}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  message: {},
  messageOrangeWrapper: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: PRIMARY_COLOR,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messgaeGrayWrapper: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#F7F8FA',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {MessageOrange, MessgaeGray};
