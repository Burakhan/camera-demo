import { Component, OnInit } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { SqLiteService } from '../../providers/sqlite-service'
import { File } from '@ionic-native/file'
import { HttpProvider } from '../../providers/http/http'

/**
 * Generated class for the PhotosyncPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-photosync',
  templateUrl: 'photosync.html',
})
export class PhotosyncPage implements OnInit {
  public photosCount = 0
  private photos = []

  constructor (public navCtrl: NavController,
               public navParams: NavParams,
               private sqLiteService: SqLiteService,
               private file: File,
               private httpService: HttpProvider) {
  }

  ngOnInit (): void {
    this.sqLiteService.getPhotosCount().then(count => {
      this.photosCount = count;
    })
  }

  uploadPhoto () {
    this.sqLiteService.getPhotoNotUpload().then(res => {
      this.photos = res
      this.oneByOne()
    })
  }

  private oneByOne () {
    console.log(this.photos);
    if (this.photos.length === 0) {
      return false
    }
    console.log('oneByOne');
    let photo = this.photos[0]
    let photoId = photo['id']
    let path = photo['path']
    let p = path.substring(0, path.lastIndexOf('/') + 1)
    let filename = path.substring(path.lastIndexOf('/') + 1)

    this.file.readAsDataURL(p, filename).then(result => {
      this.httpService.send(result).subscribe(response => {
        this.sqLiteService.updatePhotoUpload(photoId).then((update) => {
          this.photos = this.photos.splice(0, 1);
          this.oneByOne();
        })
      })
    })

  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad PhotosyncPage')
  }

}
