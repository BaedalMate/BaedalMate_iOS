import messaging from '@react-native-firebase/messaging';

// 구독하기
export function callApiSubscribeTopic(topic: string = 'notice') {
  //   return instance.post('/push');
  return messaging()
    .subscribeToTopic(topic)
    .then(() => {
      console.log(`${topic} 구독 성공!!`);
    })
    .catch(() => {
      console.log(`${topic} 구독 실패!!`);
    });
}
