import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SecureWebView } from '../src';

export default function App() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>IMEI Colombia - Secure WebView Test</Text>

            <SecureWebView
                source={{ uri: 'https://www.imeicolombia.com.co' }}
                autoProceedDomains={['imeicolombia.com.co']}
                style={styles.webview}
                onReceivedSslError={(event) => {
                    console.log('SSL Error received:', event);
                }}
            />
        </View>
    );
}

const WHITE = '#fff';

const styles = StyleSheet.create({
    container: {
        backgroundColor: WHITE,
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 20,
        textAlign: 'center',
    },
    webview: {
        flex: 1,
    },
});
