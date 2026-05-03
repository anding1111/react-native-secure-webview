package com.securewebview;

import android.webkit.SslErrorHandler;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.HashMap;
import java.util.Map;

public class RNWebViewSSLModule extends ReactContextBaseJavaModule {

    private static SslErrorHandler pendingHandler = null;
    private static ReactApplicationContext reactContext;

    public RNWebViewSSLModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Override
    public String getName() {
        return "RNWebViewSSL";
    }

    public static void onSslErrorReceived(SslErrorHandler handler, int errorCode, String url) {
        pendingHandler = handler;

        WritableMap params = Arguments.createMap();
        params.putInt("errorCode", errorCode);
        params.putString("url", url != null ? url : "");

        if (reactContext != null) {
            reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("onReceivedSslError", params);
        }
    }

    @ReactMethod
    public void proceedSslError(boolean proceed, Promise promise) {
        if (pendingHandler != null) {
            if (proceed) {
                pendingHandler.proceed();
            } else {
                pendingHandler.cancel();
            }
            pendingHandler = null;
            promise.resolve(true);
        } else {
            promise.reject("NO_PENDING_SSL_ERROR", "No pending SSL error to handle");
        }
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("ERROR_UNTRUSTED_SSL_CERTIFICATE", android.net.http.SslError.SSL_UNTRUSTED);
        constants.put("ERROR_EXPIRED_SSL_CERTIFICATE", android.net.http.SslError.SSL_EXPIRED);
        constants.put("ERROR_ID_MISMATCH", android.net.http.SslError.SSL_IDMISMATCH);
        constants.put("ERROR_DATE_INVALID", android.net.http.SslError.SSL_DATE_INVALID);
        constants.put("ERROR_INVALID", android.net.http.SslError.SSL_INVALID);
        constants.put("ERROR_NOTYETVALID", android.net.http.SslError.SSL_NOTYETVALID);
        return constants;
    }
}