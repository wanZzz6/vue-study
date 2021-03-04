import React from 'react';
import { Button, View, Text } from 'react-native';
import { WebView } from 'react-native-webview';

const INJECT_JS = (window, document) => {
    let ratedItems;
    function waitForRatedItems() {
        ratedItems = document.querySelectorAll('.movie-title');
        if (!ratedItems.length) {
            setTimeout(() => {
                waitForRatedItems;
            }, 2000);
        } else {
            const topRateList = [];
            ratedItems.forEach((m) => {
                topRateList.push(m.textContent);
                window.ReactNativeWebView.postMessage(topRateList.join(', '));
            });
        }
    }
    waitForRatedItems();
};
export default function App() {
    const url = 'https://m.maoyan.com/#movie';
    return (
        <WebView
            source={{ uri: url }}
            injectedJavaScript={`(${INJECT_JS.toString()})(window, document)`}
            onMessage={(event) => {
                alert('好评电影' + event.nativeEvent.data);
            }}
        />
    );
}
