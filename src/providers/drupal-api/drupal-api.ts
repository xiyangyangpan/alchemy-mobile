import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the DrupalApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DrupalApiProvider {
  url: string = 'http://52.79.203.178/rest';
  myNodeList: Node[] = [];
  myNode: Node = null;

  constructor(public http: HttpClient) {
    console.log('Hello DrupalApiProvider Provider! url: ' + this.url);
  }

  get(endpoint: string, params?: any, reqOpts?: any): Promise<Node[]> {
    console.log('DrupalApiProvider::get(): endpoint: ' + endpoint + ' params: ' + params);

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
    console.log('DrupalApiProvider::get(): HTTP GET ');
    return this.http.get(this.url + '/' + endpoint)
                    .toPromise()
                    .then(
                      data => {
                          let count = (<Array<string>>data).length;
                          for (var i = 0; i < count; i++) {
                            console.log(data[i])
                            this.myNodeList.push(data[i]);
                          }
                          return this.myNodeList;
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

  post(endpoint: string, body: any, reqOpts?: any) {
    return this.http.post(this.url + '/' + endpoint, body, reqOpts);
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + '/' + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.patch(this.url + '/' + endpoint, body, reqOpts);
  }
}
