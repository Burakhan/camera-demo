import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { PhotosyncPage } from './photosync'
import { File } from '@ionic-native/file'
import { HttpProvider } from '../../providers/http/http'
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [
    PhotosyncPage,
  ],
  imports: [
    IonicPageModule.forChild(PhotosyncPage),
    HttpClientModule
  ],
  providers: [
    File,
    HttpProvider
  ]
})
export class PhotosyncPageModule {}
