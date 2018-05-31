import { Component, ViewChild } from '@angular/core'
import { Nav, Platform } from 'ionic-angular'
import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'
import { HomePage } from '../pages/home/home'
import { ListPage } from '../pages/list/list'
import { SqLiteService } from '../providers/sqlite-service'
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { PhotosyncPage } from '../pages/photosync/photosync'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav

  rootPage: any = HomePage

  pages: Array<{ title: string, component: any }>

  constructor (public platform: Platform,
               public statusBar: StatusBar,
               public splashScreen: SplashScreen,
               private sqLiteService: SqLiteService,
               private androidPermissions: AndroidPermissions
               ) {
    this.initializeApp()

    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'Home', component: HomePage},
      {title: 'List', component: ListPage},
      {title: 'Photo Sync', component: PhotosyncPage}
    ]

  }

  initializeApp () {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.androidPermissions.requestPermissions(
        [
          this.androidPermissions.PERMISSION.CAMERA,
          // this.androidPermissions.PERMISSION.CALL_PHONE,
          // this.androidPermissions.PERMISSION.GET_ACCOUNTS,
          this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
          this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
        ]
      );
      this.sqLiteService.openDB();
      this.statusBar.styleDefault()
      this.splashScreen.hide()
    })
  }

  openPage (page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component)
  }
}
