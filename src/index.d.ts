import { ComponentType } from 'react';
import { WebViewProps } from 'react-native-webview';

export interface SslErrorEvent {
    errorCode: number;
    url: string;
}

export interface SecureWebViewProps extends WebViewProps {
    autoProceedDomains?: string[];
    onReceivedSslError?: (event: SslErrorEvent) => void;
}

export declare const SecureWebView: ComponentType<SecureWebViewProps>;

export declare function proceedSslError(proceed: boolean): Promise<boolean>;

export default SecureWebView;