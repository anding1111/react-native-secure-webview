#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RNWebViewSSL : RCTEventEmitter <RCTBridgeModule>

+ (void)onSslErrorReceived:(NSURLAuthenticationChallenge *)challenge
                   handler:(void (^)(NSURLSessionAuthChallengeDisposition disposition, NSURLCredential *credential))completionHandler
                   forURL:(NSString *)url;

@end