import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { SqLiteService } from '../providers/sqlite-service';
import { SQLite } from '@ionic-native/sqlite'
import { AndroidPermissions } from '@ionic-native/android-permissions'
import { PhotosyncPageModule } from '../pages/photosync/photosync.module'
import { HttpProvider } from '../providers/http/http';
import { File } from '@ionic-native/file'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
  ],
  imports: [
    BrowserModule,
    PhotosyncPageModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,

  ],
  providers: [
    File,
    StatusBar,
    SplashScreen,
    Camera,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SqLiteService,
    AndroidPermissions,
    HttpProvider
  ]
})
export class AppModule {}
