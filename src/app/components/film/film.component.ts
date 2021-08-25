import { Component, Input } from '@angular/core';
import { Film } from 'src/app/models/film.model';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss'],
})
export class FilmComponent{

  @Input() film: Film;

}
