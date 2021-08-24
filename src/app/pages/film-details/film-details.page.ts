import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Film } from 'src/app/models/film.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.page.html',
  styleUrls: ['./film-details.page.scss'],
})
export class FilmDetailsPage implements OnInit {

  public film: Film;
  public readonly imagePath: string;

  constructor(
    private data: DataService,
    private activatedRoute: ActivatedRoute
  ) {
    this.imagePath = 'https://image.tmdb.org/t/p/original/';
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.film = this.data.getFilmById(parseInt(id, 10))
    .subscribe((data: any) => {
      console.log(data);
      this.film = data;
    });
  }

  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Películas' : '';
  }

}
