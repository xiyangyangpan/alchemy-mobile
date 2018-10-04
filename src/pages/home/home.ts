import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { Item } from '../../models/item';
import { Node } from '../../models/node';
import { DrupalApiProvider } from '../../providers/drupal-api/drupal-api';
import { ArticleServiceProvider} from '../../providers/article-service/article-service'


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
    public articleSrv: ArticleServiceProvider,
    public dp: DrupalApiProvider,
    public modalCtrl: ModalController)
  {
    console.log('HomePage::constructor() data query...');
  }

  ngOnInit(): void {
    this.articleSrv.get('article', {page: 0}, 0)
    .then(
      nodes => this.currentNodes = nodes
    ).catch(
      err => {
        this.morePagesAvailable = false;
        console.error(err);
      }
    )
    console.log('HomePage::ngOnInit(): load ' + this.currentNodes.length + ' nodes.')
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      let page_no = (Math.ceil(this.currentNodes.length/10));
      console.log('HomePage::doInfinite(): page='+page_no)
      this.articleSrv.get('article', {page: page_no}, 0).then(
        nodes => {
            console.log('load '+nodes.length+' nodes.');
            console.log(nodes);
            for(let node of nodes) {
              setTimeout(() => {
                  this.currentNodes.push(node);
                  console.log(node['nid']);
                }, 500);
            }
            console.log('Async operation has ended');
            infiniteScroll.complete();
          }
        ).catch(
          err => {
            this.morePagesAvailable = false;
            console.error(err);
          }
        )
    }, 2000)
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
