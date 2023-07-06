import React, { useRef } from 'react';
import { cs } from '../styles/common';
import { KeyboardAvoidingView, Linking, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { style } from './WebView.style';

export function WebViewScreen({ navigation }: any): JSX.Element {
  /** Refs */
  const webViewRef = useRef(null);
  /** Real web view URL */
  const webViewSource = {
    uri: 'https://spare-time.vercel.app/calendar',
  };

  const getDataFromWeb = (event: any) => {
    const dataFromWeb = JSON.parse(event.nativeEvent.data);
    if (!dataFromWeb || !dataFromWeb.eventType) {
      return;
    }
    if (dataFromWeb.eventType === 'open_link') {
      const path = dataFromWeb?.path ?? '';
      if (path) {
        Linking.openURL(path);
      }
    }
    if (dataFromWeb.eventType === 'go_back') {
      navigation.goBack();
    }
  };

  const sendDataToWeb = `
		window.ReactNativeWebView.initialData = ${JSON.stringify({})};
		true;
	`;

  return (
    <KeyboardAvoidingView
      style={cs.flexGrow_1}
      contentContainerStyle={cs.flex_1}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <WebView
        ref={webViewRef}
        style={style.webView}
        source={webViewSource}
        onMessage={getDataFromWeb}
        decelerationRate={'normal'}
        androidLayerType={'hardware'}
        injectedJavaScript={sendDataToWeb}
        automaticallyAdjustContentInsets={false}
        automaticallyAdjustsScrollIndicatorInsets={false}
        showsVerticalScrollIndicator={false}
        textZoom={100}
      />
    </KeyboardAvoidingView>
  );
}
