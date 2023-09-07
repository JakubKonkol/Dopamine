import {Playlist} from "./Playlist";

export interface IUser{
  uid: string;
  username?: string,
  email?: string,
  movieHistory? :number[]
  movieWatchList?: number[],
  seriesHistory?: number[],
  seriesWatchList?: number[],
  playlists?: Playlist[];

}
