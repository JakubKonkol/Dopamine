import {UserService} from "../service/UserService";
import {IUser} from "../model/IUser";
import {ProfileOverview} from "../model/ProfileOverview";

export class ProfileOverviewBuilder implements ProfileOverview{
  user: IUser;
  watchTime?: number;
  moviesWatched?: number;
  seriesWatched?: number;
  favGenre?: string;
  constructor(user: IUser) {
    this.user = user;
  }
  withWatchTime(): ProfileOverviewBuilder{
    this.watchTime = 0;
    return this;
  }
  build(): ProfileOverview{
    return {
      watchTime: this.watchTime,
      moviesWatched: this.moviesWatched,
      seriesWatched: this.seriesWatched,
      favGenre: this.favGenre
    }
  }


}
