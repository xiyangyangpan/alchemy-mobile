import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { Item } from '../../models/item';
import { Items } from '../../providers';
import { Node } from '../../models/node';
import { DrupalApiProvider } from '../../providers/drupal-api/drupal-api';


/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit {
  currentNodes: Node[] = [];
  morePagesAvailable: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public dp: DrupalApiProvider, 
    public items: Items, 
    public modalCtrl: ModalController)
  {
    console.log('HomePage::constructor() data query...');
    //this.currentItems = this.items.query();
    //console.log('HomePage::constructor(): load ' + this.currentItems.length + ' items.')
  }

  ngOnInit(): void {
    this.dp.get('node',null,null).then(
      nodes => this.currentNodes = nodes
      );
    console.log('HomePage::ngOnInit(): load ' + this.currentNodes.length + ' nodes.')
  }

  doInfinite(infiniteScroll) {
    let page = (Math.ceil(this.currentNodes.length/20)) + 1;
    let loading = true;

    this.dp.get('node?page=' + page, null, null).then(
      nodes => {
          for(let node of nodes) {
            if(!loading){
              infiniteScroll.complete();
            }
            //console.log(node);
            this.currentNodes.push(node);
            loading = false;
          }
        }
      ).catch(
        err => {
          this.morePagesAvailable = false;
          console.error(err);
        }
      );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    console.log('HomePage::ionViewDidLoad(): load ' + this.currentNodes.length + ' nodes.')
  }

  ionViewDidEnter() {
    this.morePagesAvailable = true;
  }
  
  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }

  openDetailNode(node: Node) {
    console.log('HomePage::openDetailNode(): nid=' + node.nid + ' title=' + node.title);
    this.navCtrl.push('ArticleDetailPage', { node: node });
  }
}
