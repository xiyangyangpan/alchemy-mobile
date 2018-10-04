import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ArticleServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ArticleServiceProvider {
  url: string = 'http://52.79.203.178/drupalgap';
  //myNodeList: Node[] = [];

  constructor(public http: HttpClient) {
    console.log('Hello ArticleServiceProvider Provider');
  }

  get(endpoint: string, params?: any, reqOpts?: any): Promise<Node[]> {
    console.log('ArticleServiceProvider::get()');

    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k]);
      }
    }

    console.log('HTTP GET ' + this.url + '/' + endpoint + '?' + reqOpts.params);
    //console.log('reqOpts = ' + reqOpts.params);

    return this.http.get(this.url + '/' + endpoint + '?', reqOpts)
                    .toPromise()
                    .then(
                      data => {
                          console.log(data['nodes']);
                          let nodes = data['nodes'];
                          let count = (<Array<string>>nodes).length;
                          let myNodeList = new Array();
                          for (var i = 0; i < count; i++) {
                            //console.log(nodes[i].node)
                            myNodeList.push(nodes[i].node);
                          }
                          console.log('HTTP return ' + myNodeList.length + ' articles.');
                          return myNodeList;
                        }
                    )
                    .catch(this.handleError)
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Promise.reject(errMsg);
  }

}
