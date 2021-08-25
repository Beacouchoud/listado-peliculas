import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Film } from '../models/film.model';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private readonly url = 'https://api.themoviedb.org/3';
  private readonly apiKeyQueryParam = 'api_key=caff587bf7681f7e6b2729589b784ce6';
  private readonly langQueryParam = 'language=es';

  constructor(private http: HttpClient) { }


  getQuery(url: string): Observable<Film | any> {
    return this.http.get(url + `${this.apiKeyQueryParam}&${this.langQueryParam}`);
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  public getFilms(searchTerm: string, pageNumber: number): Observable<{total_pages: number; results: Film[]}> {
    const query = `${this.url}/search/movie?query=${searchTerm}/&sort_by=popularity.desc&page=${pageNumber}&`;
    return this.getQuery(query);
  }

  public getFilmById(id: number): Observable<Film> {
    return this.getQuery(`${this.url}/movie/${id}?`);
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  public getCurrentPopularFilms(pageNumber: number): Observable<{total_pages: number; results: Film[]}> {
    return this.getQuery(`${this.url}/movie/popular?page=${pageNumber}&`);
  }
}
