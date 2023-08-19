import {Component, OnInit} from '@angular/core';
import {MovieService} from "../service/MovieService";
import {Movie} from "../model/Movie";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Escapix';
  ngOnInit(): void {

  }

}
