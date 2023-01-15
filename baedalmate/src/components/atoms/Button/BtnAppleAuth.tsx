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
import {url} from '../../../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

/**
 * Starts the Sign In flow.
 */
async function onAppleButtonPress(updateCredentialStateForUser) {
  console.log('Beginning Apple Authentication');

  // start a login request
  try {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    console.log('appleAuthRequestResponse', appleAuthRequestResponse);

    const {
      user: newUser,
      email,
      nonce,
      identityToken,
      realUserStatus /* etc */,
    } = appleAuthRequestResponse;

    user = newUser;

    fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(error =>
      updateCredentialStateForUser(`Error: ${error.code}`),
    );

    if (identityToken) {
      // e.g. sign in with Firebase Auth using `nonce` & `identityToken`
      console.log(nonce, identityToken);
    } else {
      // no token - failed sign-in?
    }

    if (realUserStatus === appleAuth.UserStatus.LIKELY_REAL) {
      console.log("I'm a real person!");
    }

    console.warn(`Apple Authentication Completed, ${user}, ${email}`);
  } catch (error: any) {
    if (error.code === appleAuth.Error.CANCELED) {
      console.warn('User canceled Apple Sign in.');
    } else {
      console.error(error);
    }
  }
}
const BtnAppleAuth = ({navigation}) => {
  // v1 - fail
  // const onAppleButtonPress = async () => {
  //   try {
  //     const responseObject = await appleAuth.performRequest({
  //       requestedOperation: AppleRequestOperation.LOGIN,
  //       requestedScopes: [AppleRequestScope.EMAIL],
  //     });
  //     console.log('responseObject:::', responseObject);
  //     const credentialState = await appleAuth.getCredentialStateForUser(
  //       responseObject.user,
  //     );
  //     if (credentialState === AppleCredentialState.AUTHORIZED) {
  //       console.log('user is authenticated');
  //     }
  //   } catch (error: any) {
  //     console.log(error);
  //     if (error.code === AppleError.CANCELED) {
  //       console.log('canceled');
  //     } else {
  //       console.log('error');
  //     }
  //   }
  // };
  //v2
  // const [credentialStateForUser, updateCredentialStateForUser] = useState(-1);
  // useEffect(() => {
  //   if (!appleAuth.isSupported) return;

  //   fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(
  //     (error: any) => updateCredentialStateForUser(error.code),
  //   );
  // }, []);

  // useEffect(() => {
  //   if (!appleAuth.isSupported) return;

  //   return appleAuth.onCredentialRevoked(async () => {
  //     console.warn('Credential Revoked');
  //     fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(error =>
  //       updateCredentialStateForUser(error.code),
  //     );
  //   });
  // }, []);

  // if (!appleAuth.isSupported) {
  //   return (
  //     <View style={[styles.container, styles.horizontal]}>
  //       <Text>Apple Authentication is not supported on this device.</Text>
  //     </View>
  //   );
  // }
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

  // 2021년 01월 30일 수정되었습니다.
  const appleLogin = async () => {
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

          const response = await axios.post(loginURL, appleLoginRequest);
          const tokens = await response.data;
          const token = tokens.accessToken;
          const refToken = tokens.refreshToken;

          AsyncStorage.multiSet([
            ['@BaedalMate_JWTAccessToken', token],
            ['@BaedalMate_JWTRefreshToken', refToken],
          ]);
          // const values = await AsyncStorage.multiGet([
          //   '@BaedalMate_JWTAccessToken',
          //   '@BaedalMate_JWTRefreshToken',
          // ]);
          if (token) {
            console.log(token);

            navigation.navigate('BoardStackComponent');
            navigation.reset({
              index: 0,
              routes: [{name: 'BoardStackComponent'}],
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
    // <SafeAreaView style={styles.container}>
    <AppleButton
      buttonStyle={AppleButton.Style.BLACK}
      buttonType={AppleButton.Type.SIGN_IN}
      style={styles.appleButton}
      onPress={() => appleLogin()}
      // onPress={() => onAppleButtonPress(updateCredentialStateForUser)}
    />
    // </SafeAreaView>
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
