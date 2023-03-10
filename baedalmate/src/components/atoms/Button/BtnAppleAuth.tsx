import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  appleAuth,
  AppleButton,
  AppleRequestOperation,
  AppleRequestScope,
  AppleCredentialState,
  AppleError,
} from '@invertase/react-native-apple-authentication';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import {FCMURL, url} from '../../../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NotificationNoticeAllowState} from 'components/utils/recoil/atoms/FCMNotificationAllowList';
import {
  JWTAccessTokenState,
  JWTRefreshTokenState,
} from 'components/utils/recoil/atoms/User';
import {useRecoilState} from 'recoil';
import {callApiSubscribeTopic} from 'components/utils/FCMSubscribeTopic';
import {getFCMToken, getJWTToken} from 'components/utils/api/Recruit';
import {getUniqueId} from 'react-native-device-info';
const loginURL = url + '/login/oauth2/apple';

/**
 * You'd technically persist this somewhere for later use.
 */
let user;

/**
 * Fetches the credential state for the current user, if any, and updates state on completion.
 */
async function fetchAndUpdateCredentialState(updateCredentialStateForUser) {
  if (user === null) {
    updateCredentialStateForUser('N/A');
  } else {
    const credentialState = await appleAuth.getCredentialStateForUser(user);
    if (credentialState === appleAuth.State.AUTHORIZED) {
      updateCredentialStateForUser('AUTHORIZED');
    } else {
      updateCredentialStateForUser(credentialState);
    }
  }
}

// /**
//  * Starts the Sign In flow.
//  */
// async function onAppleButtonPress(updateCredentialStateForUser) {
//   console.log('Beginning Apple Authentication');

//   // start a login request
//   try {
//     const appleAuthRequestResponse = await appleAuth.performRequest({
//       requestedOperation: appleAuth.Operation.LOGIN,
//       requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
//     });

//     console.log('appleAuthRequestResponse', appleAuthRequestResponse);

//     const {
//       user: newUser,
//       email,
//       nonce,
//       identityToken,
//       realUserStatus /* etc */,
//     } = appleAuthRequestResponse;

//     user = newUser;

//     fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(error =>
//       updateCredentialStateForUser(`Error: ${error.code}`),
//     );

//     if (identityToken) {
//       // e.g. sign in with Firebase Auth using `nonce` & `identityToken`
//       console.log(nonce, identityToken);
//     } else {
//       // no token - failed sign-in?
//     }

//     if (realUserStatus === appleAuth.UserStatus.LIKELY_REAL) {
//       console.log("I'm a real person!");
//     }

//     console.warn(`Apple Authentication Completed, ${user}, ${email}`);
//   } catch (error: any) {
//     if (error.code === appleAuth.Error.CANCELED) {
//       console.warn('User canceled Apple Sign in.');
//     } else {
//       console.error(error);
//     }
//   }
// }
const BtnAppleAuth = ({navigation}) => {
  interface tokenType {
    aud: string;
    auth_time: number;
    c_hash: string;
    email: string;
    email_verified: string;
    exp: number;
    iat: number;
    is_private_email: string;
    iss: string;
    nonce: string;
    nonce_supported: boolean;
    sub: string;
  }

  const appleLogin = async () => {
    const [JWTAccessToken, setJWTAccessToken] =
      useRecoilState(JWTAccessTokenState);
    const [JWTRefreshToken, setJWTRefreshToken] =
      useRecoilState(JWTRefreshTokenState);

    const [isEnabledNotice, setIsEnabledNotice] = useRecoilState(
      NotificationNoticeAllowState,
    );
    useEffect(() => {
      if (isEnabledNotice) {
        callApiSubscribeTopic();
      }
    }, [isEnabledNotice]);
    const saveTokenToDatabase = async token => {
      const FCMToken = await getFCMToken();
      const uniqueId = await getUniqueId(); // 휴대폰마다 고유 id가 있음. ex) iOS: 59C63C5F-0776-4E4B-8AEF-D27AAF79BCFA
      // const JWTAccessToken = await getJWTToken();
      console.log('saveTokenToDatabase 호출');

      if (token && token !== '') {
        const result = await axios
          .post(
            FCMURL,
            {},
            {
              headers: {
                Authorization: 'Bearer ' + token,
                'Fcm-Token': FCMToken,
                'Device-Code': uniqueId,
              },
            },
          )
          .then(function (response) {
            console.log('FCM 등록', response);
            return response;
          })
          .catch(function (error) {
            console.log('FCM 등록 실패', error);
            return error;
          });

        if (result) {
          console.log('FCM 등록', result);
        }
        return result;
      }
    };
    try {
      // performs login request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      // get current authentication state for user
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        // user is authenticated
        const {identityToken, email, user, authorizationCode, fullName} =
          appleAuthRequestResponse;
        const userFullName = fullName?.familyName + '' + fullName?.givenName;
        const decodedToken: tokenType = jwtDecode(identityToken!);
        console.log('email_from_decodedToken', decodedToken.email);
        console.log('email', email);
        console.log('user', user);

        try {
          const appleLoginRequest = {
            appleIdentityToken: identityToken,
            appleAuthorizationCode: authorizationCode,
            userName: userFullName,
            email: email,
          };
          // const FCMToken = await getFCMToken();
          // const uniqueId = await getUniqueId();
          const response = await axios.post(loginURL, appleLoginRequest);
          const tokens = await response.data;
          const token = tokens.accessToken;
          const refToken = tokens.refreshToken;

          AsyncStorage.multiSet([
            ['@BaedalMate_JWTAccessToken', token],
            ['@BaedalMate_JWTRefreshToken', refToken],
          ]);

          if (token && token !== '') {
            console.log(token);
            const result = saveTokenToDatabase(token);
            result.then(res => {
              if (res.status == 200) {
                navigation.navigate('BoardStackComponent');
                navigation.reset({
                  index: 0,
                  routes: [{name: 'BoardStackComponent'}],
                });
              }
            });
          }
          return response;
        } catch (error) {
          console.log(error);

          return false;
        }
      }
    } catch (error: any) {
      if (error.code === appleAuth.Error.CANCELED) {
        // login canceled
      } else {
        // login error
      }
    }
  };
  return (
    <AppleButton
      buttonStyle={AppleButton.Style.BLACK}
      buttonType={AppleButton.Type.SIGN_IN}
      style={styles.appleButton}
      onPress={() => appleLogin()}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appleButton: {width: '85%', height: 45},
  horizontal: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});

export default BtnAppleAuth;
