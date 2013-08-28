/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2013年 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */

#import "ComHjAboutHiroppyVineCameraView.h"
#import "CameraEngine.h"
#import "ComHjAboutHiroppyVineCameraViewProxy.h"

@interface ComHjAboutHiroppyVineCameraView ()

- (void)startPreview;
- (IBAction)startRecording:(id)sender;
- (IBAction)pauseRecording:(id)sender;
//- (IBAction)stopRecording:(id)sender;
- (void)stopRecording:(id)args;
- (IBAction)resumeRecording:(id)sender;
- (IBAction)startPausePressed:(id)sender;
- (IBAction)stopPressed:(id)sender;

@end


@implementation ComHjAboutHiroppyVineCameraView

- (void)frameSizeChanged:(CGRect)frame bounds:(CGRect)bounds
{
    
    // start
    [self startPreview];
    
}

- (void)startPreview
{
    [[CameraEngine engine] startup];
    
    AVCaptureVideoPreviewLayer *preview = [[CameraEngine engine] getPreviewLayer];
    [preview removeFromSuperlayer];
    [preview setFrame:self.bounds];
    [preview.connection setVideoOrientation:UIInterfaceOrientationPortrait];
    
    [self.layer insertSublayer:preview atIndex:0];
}

- (IBAction)startRecording:(id)sender
{
    [[CameraEngine engine] startCapture];
}

- (IBAction)pauseRecording:(id)sender
{
    [[CameraEngine engine] pauseCapture];
}

//- (IBAction)stopRecording:(id)sender
//{
//    [[CameraEngine engine] stopCapture];
//}

- (void)stopRecording:(id)args
{
    [[CameraEngine engine] stopCapture];
}

- (IBAction)resumeRecording:(id)sender
{
    [[CameraEngine engine] resumeCapture];
}


- (IBAction)startPausePressed:(id)sender
{
    static BOOL isRecording = NO;
    static BOOL isFirstPress = YES;
    
    UIButton *button = (UIButton *)sender;
    
    if (isFirstPress) {
        isFirstPress = NO;
        isRecording  = YES;
        
        [self startRecording:nil];
        [button setTitle:@"Pause" forState:UIControlStateNormal];
        
    } else {
        if (isRecording) {
            [self pauseRecording:nil];
            [button setTitle:@"Start" forState:UIControlStateNormal];
            
        } else {
            [self resumeRecording:nil];
            [button setTitle:@"Pause" forState:UIControlStateNormal];
        }
        
        isRecording = !isRecording;
        
    }
}

- (IBAction)stopPressed:(id)sender
{
    [self stopRecording:nil];
}

- (void)stopButtonPressed:(id)args
{
    [[CameraEngine engine] stopCapture];
}

- (void)startPauseButtonPressed:(id)args
{
    
    static BOOL isRecording = NO;
    static BOOL isFirstPress = YES;
    
//    UIButton *button = (UIButton *)sender;
    
    if (isFirstPress) {
        NSLog(@"======================startPauseButton =============================");
        isFirstPress = NO;
        isRecording  = YES;
        
        [[CameraEngine engine] startCapture];
        
    } else {
        if (isRecording) {
            [[CameraEngine engine] pauseCapture];
            
        } else {
            [[CameraEngine engine] resumeCapture];
        }
        
        isRecording = !isRecording;
        
    }

}

@end
