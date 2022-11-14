import {url} from '../../../../App';
import React, {useEffect, useRef, useState} from 'react';
import WebView from 'react-native-webview';
import {LocationI} from 'components/pages/Setting/GPS';

export const Map = ({location}: {location: LocationI}) => {
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
      source={{
        uri: url,
      }}
    />
  );
};
