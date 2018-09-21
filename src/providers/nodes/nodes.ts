import { Injectable } from '@angular/core';

import { Node } from '../../models/node';
import { DrupalApiProvider } from '../drupal-api/drupal-api';

@Injectable()
export class Nodes {
  drupalApi: DrupalApiProvider;
  myNodeList: Node[] = [];
  myNode: Node = null;
  errorMessage: string;

  defaultNode: any = {
    "name": "default node",
    "profilePic": "assets/img/speakers/bear.jpg",
    "about": "node article.",
  };

  constructor(public api: DrupalApiProvider) {
    this.drupalApi = api;
    console.log('Nodes::constructor(): ' + this.drupalApi.url)
  }

  getNodeList() {
    console.log('Nodes::getNodeList(): retrieve all nodes from drupal site.')
    //this.nodes.push(new Node(this.defaultNode))

    this.drupalApi.get('node',null,null)
                  .then(
                    nodes => this.myNodeList = nodes,
                    error => this.errorMessage = <any>error
                    );

    console.log('Nodes::getNodeList(): node list length=' + this.myNodeList.length)
    return this.myNodeList;
  }

  add(item: Node) {
  }

  delete(item: Node) {
  }

}
