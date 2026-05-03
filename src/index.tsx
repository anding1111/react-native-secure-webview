import React, { useEffect } from 'react';
import { NativeModules, NativeEventEmitter } from 'react-native';
import { WebView, WebViewProps } from 'react-native-webview';

const { RNWebViewSSL } = NativeModules;
const sslEmitter = new NativeEventEmitter(RNWebViewSSL);

export interface SslErrorEvent {
    errorCode: number;
    url: string;
}

export interface SecureWebViewProps extends WebViewProps {
    autoProceedDomains?: string[];
    onReceivedSslError?: (event: SslErrorEvent) => void;
}

export const SecureWebView: React.FC<SecureWebViewProps> = ({
    autoProceedDomains = [],
    onReceivedSslError,
    ...props
}) => {
    useEffect(() => {
        const subscription = sslEmitter.addListener('onReceivedSslError', (event: SslErrorEvent) => {
            const shouldAutoProceed = autoProceedDomains.some(domain =>
                event.url.includes(domain)
            );

            if (shouldAutoProceed) {
                RNWebViewSSL.proceedSslError(true);
            } else if (onReceivedSslError) {
                onReceivedSslError(event);
            } else {
                RNWebViewSSL.proceedSslError(false);
            }
        });

        return () => subscription.remove();
    }, [autoProceedDomains, onReceivedSslError]);

    return <WebView { ...props } />;
};

export const proceedSslError = (proceed: boolean): Promise<boolean> => {
    return RNWebViewSSL.proceedSslError(proceed);
};

export default SecureWebView;