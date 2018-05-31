import { Component, OnInit } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular'
import { SqLiteService } from '../../providers/sqlite-service'
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage implements OnInit {
  //selectedItem: any
  //photo: string[]
  public photos: Array<{ id: string, path: string, _id: string }>

  constructor (public navCtrl: NavController, public navParams: NavParams, private sqLite: SqLiteService, private sanitizer: DomSanitizer) {
    // If we navigated to this page, we will have an item available as a nav param

  }

  ngOnInit (): void {
    this.sqLite.getPhotos().then((res) => {
      this.photos = res
      console.log(res)
    })
  }

  getPath (path) {
    path = path.replace('file://', '');
    return this.sanitizer.bypassSecurityTrustUrl(path);
  }

  itemTapped (event, item) {
    // That's right, we're pushing to ourselves!
    /*
    this.navCtrl.push(ListPage, {
      item: item
    })
    */
  }
}
