import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Article } from '../../models/article';
import { DrupalApiProvider } from '../../providers/drupal-api/drupal-api';

/**
 * Generated class for the ArticleDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-article-detail',
  templateUrl: 'article-detail.html',
})
export class ArticleDetailPage implements OnInit {
  article: Article;
  body: any;
  node: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public dp: DrupalApiProvider
    )
  {
    this.node = this.navParams.get('node')
    console.log(this.node.nid);
  }

  ngOnInit(): void {
    this.dp.getNode('node/' + this.node.nid, null, null).then(
      node => {
          this.article = node;
          this.body = this.article.body.und[0].value;
          //this.body = "<p>无论你是寻求补充你的收入或寻找建立财富在很长一段时间内，股息股票，可以可靠地支付你多年，并逐步增加他们的支出可以是一个强大的一部分，你的投资组合。更好的是，当你可以以低价购买这些股票时，因为这通常意味着它们的收益率很高。</p>"
          //console.log(this.body);
        }
      );
    console.log('ArticleDetailPage::ngOnInit(): load ' + this.article)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticleDetailPage');
  }

}
