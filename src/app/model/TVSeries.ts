import {TVSeriesCreator} from "./helpers/TVSeriesCreator";
import {Genre} from "./helpers/Genre";
import {TVSeriesEpisode} from "./helpers/TVSeriesEpisode";
import {TVSeriesNetwork} from "./helpers/TVSeriesNetwork";
import {TVSeriesProductionCompanies} from "./helpers/TVSeriesProductionCompanies";
import {TVSeriesProductionCountry} from "./helpers/TVSeriesProductionCountry";
import {TVSeriesSeason} from "./helpers/TVSeriesSeason";
import {TVSeriesSpokenLanguage} from "./helpers/TVSeriesSpokenLanguage";

export interface TVSeries{
  adult: boolean;
  backdrop_path: string;
  created_by: TVSeriesCreator[];
  episode_run_time: number[];
  first_air_date: string;
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: TVSeriesEpisode;
  name: string;
  next_episode_to_air: string;
  networks: TVSeriesNetwork[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: TVSeriesProductionCompanies[];
  production_countries: TVSeriesProductionCountry[];
  seasons: TVSeriesSeason[];
  spoken_languages: TVSeriesSpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}
