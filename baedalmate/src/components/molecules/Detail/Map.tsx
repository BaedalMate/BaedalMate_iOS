import React, {useEffect, useState} from 'react';
import WebView from 'react-native-webview';

export const Map = props => {
  console.log(props.route.params);
  const [url, setUrl] = useState('');
  const placeUrl =
    'https://map.kakao.com/link/map/' +
    props.route.params.name +
    ',' +
    props.route.params.y +
    ',' +
    props.route.params.x;
  console.log(url);
  useEffect(() => {
    setUrl(placeUrl);
  }, [props.route.params]);
  return (
    <WebView
      source={{
        uri: url,
      }}
    />
  );
};
