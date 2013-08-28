/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2013年 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */

// [self.view makeViewPerformSelector:@selector(methodname:) withObject:args createIfNeeded:YES waitUntilDone:NO];

#import "ComHjAboutHiroppyVineCameraViewProxy.h"
#import "ComHjAboutHiroppyVineCameraView.h"
#import "TiUtils.h"

@implementation ComHjAboutHiroppyVineCameraViewProxy

#ifndef USE_VIEW_FOR_UI_METHOD
#define USE_VIEW_FOR_UI_METHOD(methodname)\
-(void)methodname:(id)args\
{\
[self.view performSelectorOnMainThread:@selector(methodname:) withObject:nil waitUntilDone:NO];\
}
#endif

USE_VIEW_FOR_UI_METHOD(stopButtonPressed);
USE_VIEW_FOR_UI_METHOD(startPauseButtonPressed);


@end
