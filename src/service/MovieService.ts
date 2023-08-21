import {Injectable} from "@angular/core";
import tmdb from "../api/tmdb";
import {Movie} from "../model/Movie";
@Injectable(
  {
    providedIn: 'root'
  }
)
export class MovieService{

  getPopularMovies(): Movie[]{
    let movies: Movie[] = [];
    tmdb.get('/movie/popular').then(async (response) => {
      for (let item in response.data.results) {
        movies.push(await this.getMovieById(response.data.results[item].id))
      }
    })
    return movies;
  }
  async getMovieById(id: number): Promise<Movie> {
    try {
      const response = await tmdb.get('/movie/' + id);
      return new Movie(
        response.data.adult,
        response.data.backdrop_path,
        response.data.belongs_to_collection,
        response.data.budget,
        response.data.genres,
        response.data.homepage,
        response.data.id,
        response.data.imdb_id,
        response.data.original_language,
        response.data.original_title,
        response.data.overview,
        response.data.popularity,
        response.data.poster_path,
        response.data.production_companies,
        response.data.production_countries,
        response.data.release_date,
        response.data.revenue,
        response.data.runtime,
        response.data.spoken_languages,
        response.data.status,
        response.data.tagline,
        response.data.title,
        response.data.video,
        response.data.vote_average,
        response.data.vote_count
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  getTopRatedMovies(): Movie[]{
    let movies: Movie[] = [];
    tmdb.get('/movie/top_rated').then(async (response) => {
      for (let item in response.data.results) {
        movies.push(await this.getMovieById(response.data.results[item].id))
      }
    })
    return movies;
  }
  getUpcomingMovies(): Movie[]{
    let movies: Movie[] = [];
    tmdb.get('/movie/upcoming').then(async (response) => {
      for (let item in response.data.results) {
        movies.push(await this.getMovieById(response.data.results[item].id))
      }
    }).catch((error) => {
      console.log(error);
    })
    return movies;
  }
  searchMovie(query: string): Movie[]{
    let movies: Movie[] = [];
    tmdb.get('/search/movie', {
      params: {
        query: query,
        include_adult: false,
        language: 'en-US',
        page: 1
      }
    }).then(async (response) => {
      for (let item in response.data.results) {
        movies.push(await this.getMovieById(response.data.results[item].id))
      }
    })
    return movies;
  }
  getSimilarMovies(id: number): Movie[]{
    let movies: Movie[] = [];
    tmdb.get('/movie/' + id + '/similar').then(async (response) => {
      for (let item in response.data.results) {
        movies.push(await this.getMovieById(response.data.results[item].id))
      }
    })
    return movies;
  }

}
