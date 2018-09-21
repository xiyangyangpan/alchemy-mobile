import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { Item } from '../../models/item';
import { Items } from '../../providers';
import { Node } from '../../models/node';
import { Nodes } from '../../providers';

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
  currentItems: Item[];
  currentNodes: Node[] = [];

  constructor(public navCtrl: NavController, 
    public nodes: Nodes, public items: Items, 
    public modalCtrl: ModalController) {
    console.log('HomePage::constructor() data query...');
    this.currentItems = this.items.query();
    console.log('HomePage::constructor(): load ' + this.currentItems.length + ' items.')
    //this.currentNodes = this.nodes.getNodeList();
    //console.log('HomePage::constructor(): load ' + this.currentNodes.length + ' nodes.')
  }

  ngOnInit(): void {
    this.currentNodes = this.nodes.getNodeList();
    console.log('HomePage::ngOnInit(): load ' + this.currentNodes.length + ' nodes.')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    console.log('HomePage::ionViewDidLoad(): load ' + this.currentNodes.length + ' nodes.')
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }
}
