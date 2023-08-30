export class Movie{
  private _adult: boolean;
  private _backdrop_path: string;
  private _belongs_to_collection: string;
  private _budget: number;
  private _genres: Array<any>;
  private _homepage: string;
  private _id: number;
  private _imdb_id: string;
  private _original_language: string;
  private _original_title: string;
  private _overview: string;
  private _popularity: number;
  private _poster_path:string;
  private _production_companies: Array<any>;
  private _production_countries: Array<any>;
  private _release_date: string;
  private _revenue: number;
  private _runtime: number;
  private _spoken_languages: Array<any>;
  private _status: string;
  private _tagline: string;
  private _title: string;
  private _video: boolean;
  private _vote_average: number;
  private _vote_count: number;


  constructor(adult: boolean, backdrop_path: string, belongs_to_collection: string, budget: number, genres: Array<any>, homepage: string, id: number, imdb_id: string, original_language: string, original_title: string, overview: string, popularity: number, poster_path: string, production_companies: Array<any>, production_countries: Array<any>, release_date: string, revenue: number, runtime: number, spoken_languages: Array<any>, status: string, tagline: string, title: string, video: boolean, vote_average: number, vote_count: number) {
    this._adult = adult;
    this._backdrop_path = backdrop_path;
    this._belongs_to_collection = belongs_to_collection;
    this._budget = budget;
    this._genres = genres;
    this._homepage = homepage;
    this._id = id;
    this._imdb_id = imdb_id;
    this._original_language = original_language;
    this._original_title = original_title;
    this._overview = overview;
    this._popularity = popularity;
    this._poster_path = poster_path;
    this._production_companies = production_companies;
    this._production_countries = production_countries;
    this._release_date = release_date;
    this._revenue = revenue;
    this._runtime = runtime;
    this._spoken_languages = spoken_languages;
    this._status = status;
    this._tagline = tagline;
    this._title = title;
    this._video = video;
    this._vote_average = vote_average;
    this._vote_count = vote_count;

    this.backdrop_path = "https://image.tmdb.org/t/p/w500" + this.backdrop_path;
    this.poster_path = "https://image.tmdb.org/t/p/w500" + this.poster_path;
  }

  get adult(): boolean {
    return this._adult;
  }

  get backdrop_path(): string {
    return this._backdrop_path;
  }

  get belongs_to_collection(): string {
    return this._belongs_to_collection;
  }

  get budget(): number {
    return this._budget;
  }

  get genres(): Array<any> {
    return this._genres;
  }

  get homepage(): string {
    return this._homepage;
  }

  get id(): number {
    return this._id;
  }

  get imdb_id(): string {
    return this._imdb_id;
  }

  get original_language(): string {
    return this._original_language;
  }

  get original_title(): string {
    return this._original_title;
  }

  get overview(): string {
    return this._overview;
  }

  get popularity(): number {
    return this._popularity;
  }

  get poster_path(): string {
    return this._poster_path;
  }

  get production_companies(): Array<any> {
    return this._production_companies;
  }

  get production_countries(): Array<any> {
    return this._production_countries;
  }

  get release_date(): string {
    return this._release_date;
  }

  get revenue(): number {
    return this._revenue;
  }

  get runtime(): number {
    return this._runtime;
  }

  get spoken_languages(): Array<any> {
    return this._spoken_languages;
  }

  get status(): string {
    return this._status;
  }

  get tagline(): string {
    return this._tagline;
  }

  get title(): string {
    return this._title;
  }

  get video(): boolean {
    return this._video;
  }

  get vote_average(): number {
    return this._vote_average;
  }

  get vote_count(): number {
    return this._vote_count;
  }

  set adult(value: boolean) {
    this._adult = value;
  }

  set backdrop_path(value: string) {
    this._backdrop_path = value;
  }

  set belongs_to_collection(value: string) {
    this._belongs_to_collection = value;
  }

  set budget(value: number) {
    this._budget = value;
  }

  set genres(value: Array<any>) {
    this._genres = value;
  }

  set homepage(value: string) {
    this._homepage = value;
  }

  set id(value: number) {
    this._id = value;
  }

  set imdb_id(value: string) {
    this._imdb_id = value;
  }

  set original_language(value: string) {
    this._original_language = value;
  }

  set original_title(value: string) {
    this._original_title = value;
  }

  set overview(value: string) {
    this._overview = value;
  }

  set popularity(value: number) {
    this._popularity = value;
  }

  set poster_path(value: string) {
    this._poster_path = value;
  }

  set production_companies(value: Array<any>) {
    this._production_companies = value;
  }

  set production_countries(value: Array<any>) {
    this._production_countries = value;
  }

  set release_date(value: string) {
    this._release_date = value;
  }

  set revenue(value: number) {
    this._revenue = value;
  }

  set runtime(value: number) {
    this._runtime = value;
  }

  set spoken_languages(value: Array<any>) {
    this._spoken_languages = value;
  }

  set status(value: string) {
    this._status = value;
  }

  set tagline(value: string) {
    this._tagline = value;
  }

  set title(value: string) {
    this._title = value;
  }

  set video(value: boolean) {
    this._video = value;
  }

  set vote_average(value: number) {
    this._vote_average = value;
  }

  set vote_count(value: number) {
    this._vote_count = value;
  }
}
