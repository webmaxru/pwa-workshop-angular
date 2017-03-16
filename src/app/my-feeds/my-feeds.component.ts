import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-my-feeds',
  templateUrl: './my-feeds.component.html',
  styleUrls: ['./my-feeds.component.css']
})
export class MyFeedsComponent implements OnInit {

  private timelineUrl = 'http://localhost:3000/timeline/';
  private favoritesUrl = 'http://localhost:3000/favorites/';
  tweets;
  errorMessage;

  constructor(private http: Http) { }

  ngOnInit() {
  }

  loadTimeLine(handle: string = '') {

    this.tweets = [];
    this.getTweets(handle, this.timelineUrl)
      .subscribe(
      tweets => this.tweets = tweets,
      error => this.errorMessage = <any>error);

  }

  loadFavorites(handle: string = '') {

    this.tweets = [];
    this.getTweets(handle, this.favoritesUrl)
      .subscribe(
      tweets => this.tweets = tweets,
      error => this.errorMessage = <any>error);

  }

  getTweets(handle: string = '', url: string): Observable<any> {
    return this.http.get(url + handle)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }


}
