import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private readonly url: string;
  private readonly apiKeyQueryParam: string;
  private readonly langQueryParam: string;

  constructor(private http: HttpClient) {
    this.url = 'https://api.themoviedb.org/3';
    this.apiKeyQueryParam = 'api_key=caff587bf7681f7e6b2729589b784ce6';
    this.langQueryParam = 'language=es';
  }

  getQuery(url: string): Observable<any> {
    return this.http.get(url + `${this.apiKeyQueryParam}&${this.langQueryParam}`);
  }

  public getFilms(searchTerm: string, pageNumber: number): Observable<any> {
    const query = `${this.url}/search/movie?query=${searchTerm}/&sort_by=popularity.desc&page=${pageNumber}&`;
    return this.getQuery(query).pipe(map(data => data));
  }

  public getFilmById(id: number): any {
    return this.getQuery(`${this.url}/movie/${id}?`).pipe(map(data => data));
  }

  public getCurrentPopularFilms(pageNumber: number): Observable<any> {
    return this.getQuery(`${this.url}/movie/popular?page=${pageNumber}&`).pipe(map(data => data));
  }
}
