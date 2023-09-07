import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from "../../service/UserService";
import {IUser} from "../../model/IUser";
import {Playlist} from "../../model/Playlist";
import {HotToastService} from "@ngneat/hot-toast";
import {toastConfig} from "../../tools/toastConfig";

@Component({
  selector: 'app-playlist-modal',
  templateUrl: './playlist-modal.component.html',
  styleUrls: ['./playlist-modal.component.css']
})
export class PlaylistModalComponent implements OnInit {
  user!: IUser;
  addingNew: boolean = false;
  newPlaylistName: string = '';
  @Output() close = new EventEmitter<void>();
  @Input() type: string = 'unknown'
  @Input() id!: number
  constructor(
    private userService: UserService,
    private toast: HotToastService
  ) { }
  toggleAddingNew(){
    this.addingNew = !this.addingNew;
  }
  ngOnInit(): void {
    this.userService.getCurrentUser$().subscribe(value => {
      if(value == null){
        return;
      }
      this.user = value;
    })
  }
  emitClose(){
    this.close.emit();
  }
  createNewPlaylist(){
    if(this.newPlaylistName == '') return
    this.user.playlists?.push({
      name: this.newPlaylistName,
      movies: [],
      series: []
    });
    this.userService.updateUser(this.user).then(() => {
      this.toggleAddingNew();
    })
  }

  addToPlaylist(playlist: Playlist) {
    switch (this.type){
      case 'movie':
        this.addMovieToPlaylist(playlist);
        break;
      case 'series':
        this.addSeriesToPlaylist(playlist);
        break;
      default:
        console.error('Unknown type:', this.type);

    }
  }
  addMovieToPlaylist(playlist: Playlist){
    playlist.movies?.push(this.id)
    this.user.playlists?.splice(this.user.playlists.indexOf(playlist), 1, playlist);
    this.userService.updateUser(this.user).then(() => {
      this.toast.success('Added!', toastConfig)
      this.emitClose();
    })
  }
  addSeriesToPlaylist(playlist: Playlist){
    playlist.series?.push(this.id)
    this.user.playlists?.splice(this.user.playlists.indexOf(playlist), 1, playlist);
    this.userService.updateUser(this.user).then(() => {
      this.toast.success('Added!', toastConfig)
      this.emitClose();
    })
  }
}
