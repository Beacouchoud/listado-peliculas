/* eslint-disable @typescript-eslint/naming-convention */
export interface Film {
  id: number;
  title: string;
  release_date: string;
  original_language: string;
  overview: string;
  poster_path?: string;
  vote_average?: number;
  genres: Array<Genre>;
}

export interface Genre {
  id: number;
  name: string;
}
