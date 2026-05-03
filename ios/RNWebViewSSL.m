#import "RNWebViewSSL.h"
#import <React/RCTBridge.h>
#import <React/RCTEventDispatcher.h>

static void (^pendingCompletionHandler)(NSURLSessionAuthChallengeDisposition, NSURLCredential *);
static NSString *pendingURL = nil;

@implementation RNWebViewSSL

RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents {
    return @[@"onReceivedSslError"];
}

+ (void)onSslErrorReceived:(NSURLAuthenticationChallenge *)challenge
                   handler:(void (^)(NSURLSessionAuthChallengeDisposition disposition, NSURLCredential *credential))completionHandler
                   forURL:(NSString *)url {
    
    pendingCompletionHandler = completionHandler;
    pendingURL = url;
    
    NSMutableDictionary *params = [NSMutableDictionary dictionary];
    params[@"errorCode"] = @(1000);
    params[@"url"] = url ?: @"";
    
    [[NSNotificationCenter defaultCenter] postNotificationName:@"RNWebViewSSLDidReceiveError"
                                                        object:nil
                                                      userInfo:params];
}

RCT_EXPORT_METHOD(proceedSslError:(BOOL)proceed
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    
    if (pendingCompletionHandler) {
        if (proceed) {
            NSURLCredential *credential = [NSURLCredential credentialForTrust:pendingCompletionHandler];
            pendingCompletionHandler(NSURLSessionAuthChallengeUseCredential, credential);
        } else {
            pendingCompletionHandler(NSURLSessionAuthChallengeCancelAuthenticationChallenge, nil);
        }
        pendingCompletionHandler = nil;
        pendingURL = nil;
        resolve(@(YES));
    } else {
        reject(@"NO_PENDING_SSL_ERROR", @"No pending SSL error to handle", nil);
    }
}

@end