import {Component, OnInit} from '@angular/core';
import {IUser} from "../../model/IUser";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../service/UserService";
import {Playlist} from "../../model/Playlist";

@Component({
  selector: 'app-playlist-view',
  templateUrl: './playlist-view.component.html',
  styleUrls: ['./playlist-view.component.css']
})
export class PlaylistViewComponent implements OnInit {
  playlistId!: number;
  user!: IUser;
  activePlaylist!: Playlist;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,


  ) {
  }
  ngOnInit(): void {
    this.playlistId = this.route.snapshot.params['playlist_id'];
    this.userService.getCurrentUser$().subscribe(value => {
      if(value == null){
        return;
      }
      this.user = value;
      this.getPlaylist();
    })

    }
  getPlaylist(){
    this.user.playlists?.forEach((value, index) => {
      if (value.id == this.playlistId){
        this.activePlaylist = value;
      }
    })
  }

  deletePlaylist(playlist: Playlist) {

  }
}
