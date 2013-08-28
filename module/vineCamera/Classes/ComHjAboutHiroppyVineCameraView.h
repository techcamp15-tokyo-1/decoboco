/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2013年 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */
#import "TiUIView.h"
#import <AVFoundation/AVFoundation.h>
#import <AssetsLibrary/AssetsLibrary.h>
#import <CoreMedia/CoreMedia.h>


@interface ComHjAboutHiroppyVineCameraView : TiUIView<AVCaptureVideoDataOutputSampleBufferDelegate> {
    UIView * mainView;
    
}

- (void)stopRecording:(id)args;
- (void)stopButtonPressed:(id)args;
- (void)startPauseButtonPressed:(id)args;

@end
