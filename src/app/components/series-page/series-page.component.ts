import {Component, OnInit} from '@angular/core';
import {TVSeries} from "../../model/TVSeries";
import {ActivatedRoute} from "@angular/router";
import {TVSeriesService} from "../../service/TVSeriesService";
import {HotToastService} from "@ngneat/hot-toast";
import {CastMember} from "../../model/helpers/CastMember";
import {WatchProvider} from "../../model/helpers/WatchProvider";
import {UserService} from "../../service/UserService";
import {IUser} from "../../model/IUser";
import {toastConfig} from "../../tools/toastConfig";

@Component({
  selector: 'app-series-page',
  templateUrl: './series-page.component.html',
  styleUrls: ['./series-page.component.css']
})
export class SeriesPageComponent implements OnInit{
  tvSerieID!: number;
  serie!: TVSeries;
  serieCast!: CastMember[];
  filteredCast: CastMember[] = [];
  watchProviders!: WatchProvider[];
  isWatchProvider:boolean = false;
  user!: IUser;
  constructor(
    private route: ActivatedRoute,
    private tvSeriesService: TVSeriesService,
    private toast: HotToastService,
    private userService: UserService
  ) {}
  async ngOnInit(): Promise<void> {
    this.tvSerieID = this.route.snapshot.params['id'];
    try{
      this.serie = await this.tvSeriesService.getSeriesById(this.tvSerieID);
      this.serieCast = await this.tvSeriesService.getSeriesCast(this.tvSerieID);
      this.filterCast(this.serieCast);
      this.watchProviders = await this.tvSeriesService.getWatchProviders(this.tvSerieID);
    } catch(error){
      console.error('Error fetching movie data:', error);
    }
    if (this.watchProviders){
      this.isWatchProvider = true;
    }
    this.userService.getCurrentUser$().subscribe(value => {
      if(value == null){
        return;
      }
      this.user = value;
    })
  }
  addToWatchList(){
    this.user.seriesWatchList?.push(this.tvSerieID);
    this.userService.updateUser(this.user).then(() => {
        this.toast.success('Added!',
          toastConfig)
      }
    );
  }
  seriesAlreadyInWatchList(){
    return this.user.seriesWatchList?.includes(this.tvSerieID);
  }
  removeFromWatchList(){
    this.user.seriesWatchList?.splice(this.user.seriesWatchList.indexOf(this.tvSerieID), 1);
    this.userService.updateUser(this.user).then(() => {
        this.toast.success('Removed!',
          toastConfig)
      })
    }
    seriesAlreadyInHistory(){
      return this.user.seriesHistory?.includes(this.tvSerieID);
    }
    markAsWatched(){
      this.user.seriesHistory?.push(this.tvSerieID);
      this.userService.updateUser(this.user).then(() => {
          this.toast.success('Added!',
            toastConfig)
        }
      );
    }
    removeFromHistory(){
      this.user.seriesHistory?.splice(this.user.seriesHistory.indexOf(this.tvSerieID), 1);
      this.userService.updateUser(this.user).then(
        () => this.toast.success('Removed!',
          toastConfig)
      );
    }
  getProviderLogo(provider: WatchProvider): string{
    return "https://image.tmdb.org/t/p/w500" + provider.logo_path;
  }
  filterCast(cast: CastMember[]): CastMember[]{
    cast = cast.sort((a, b) => (a.order > b.order) ? 1 : -1);
    this.filteredCast = cast.filter((item, index) => index < 10);
    return this.filteredCast;
  }
  getActorImage(actor: CastMember): string{
    return "https://image.tmdb.org/t/p/w500" + actor.profile_path;
  }
  getPosterImage(): string{
    return "https://image.tmdb.org/t/p/w500" + this.serie.poster_path;
  }
  roundRating(rating: number): number{
    return Math.round(rating * 10) / 10;
  }
  formatDateToLocale(date: string, type?: string): string{
    if (type === 'full'){
      return new Date(date).toLocaleDateString();
    }
    return new Date(date).getFullYear().toString();
  }
  roundToMillion(number: number): string{
    if(number > 1000000000){
      return (number / 1000000000).toFixed(1)+' B';
    }
    if(number > 1000000){
      return (number / 1000000).toFixed(1)+' M';
    }
    return number.toString();
  }

}
