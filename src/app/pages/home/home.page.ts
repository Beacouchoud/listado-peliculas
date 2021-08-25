import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Film } from 'src/app/models/film.model';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  public films: Film[] = [];
  public page: number;
  private totalPages: number;

  constructor(private data: DataService) {}

  ngOnInit() {
    this.page = 1;
    this.search(null);
  }

  public searchMore(searchTerm: string, event: any) {
    if (this.page < this.totalPages) {
      ++this.page;
      this.search(searchTerm, event);
    } else {
      this.infiniteScroll.disabled = true;
    }
  }

  public newSearch(searchTerm: string) {
    this.infiniteScroll.disabled = false;
    this.page = 1;
    this.films = [];
    this.search(searchTerm);
  }

  private search(searchTerm: string, event?: any) {
    if (!!searchTerm) {
      this.data.getFilms(searchTerm, this.page)
        .subscribe(
        (data: any) => {
          this.films = this.films.concat(data.results);
          this.totalPages = data.total_pages;
          event?.target.complete();
        },
        (error: any) => {
          console.log(error);
        });
    } else {
      this.popularFilms(event);
    }
  }

  private popularFilms(event?: any) {
    this.data.getCurrentPopularFilms(this.page)
      .subscribe(
        (data: any) => {
          this.films = this.films.concat(data.results);
          this.totalPages = data.total_pages;
          event?.target.complete();
        },
        (error: any) => {
          console.log(error);
        });
  }

}
