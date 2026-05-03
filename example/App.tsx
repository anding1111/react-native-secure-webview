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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    webview: {
        flex: 1,
    },
});