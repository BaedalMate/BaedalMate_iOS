import React, {useEffect, useState} from 'react';
import WebView from 'react-native-webview';
import {LocationI} from 'components/pages/Setting/GPS';

export const Map = ({
  location,
  handleModal,
}: {
  location: LocationI;
  handleModal;
}) => {
  const [url, setUrl] = useState('');
  const placeUrl =
    'https://map.kakao.com/link/map/' +
    '현위치' +
    ',' +
    location.latitude +
    ',' +
    location.longitude;

  useEffect(() => {
    console.log(placeUrl);
    setUrl(placeUrl);
  }, [location]);
  return (
    <WebView
      originWhitelist={['*']}
      source={{
        uri: placeUrl,
      }}
      // cacheEnabled={false}
      geolocationEnabled={true}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      startInLoadingState={false}
      onLoadStart={handleModal}
      onLoadEnd={handleModal}
      incognito={true}
      cacheEnabled={false}
      cacheMode={'LOAD_NO_CACHE'}
      // onNavigationStateChange={navState => {
      //   // Linking.openURL(navState.url);
      //   return false;
      // }}
      // onShouldStartLoadWithRequest={event => {
      //   // Linking.openURL(event.url);
      //   return false;
      // }}
    />
  );
};
