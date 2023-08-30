import {Component, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {Movie} from "../../model/Movie";
import {Router} from "@angular/router";

@Component({
  selector: 'app-movie-carousel',
  templateUrl: './movie-carousel.component.html',
  styleUrls: ['./movie-carousel.component.css']
})
export class MovieCarouselComponent implements OnInit{
  @Input() title!: string;
  @Input() iterableMovies!: Movie[];
  scrollValue: number = this.calculateScrollValue();
  constructor(private el: ElementRef, private router: Router)  { }
  ngOnInit(): void {
    window.addEventListener('resize', () => {
      this.scrollValue = this.calculateScrollValue();
    });
  }

  scrollLeft() {
    const box = this.el.nativeElement.querySelector('.box');
    box.scrollLeft -= this.scrollValue;
  }
  scrollRight() {
    const box = this.el.nativeElement.querySelector('.box');
    box.scrollLeft += this.scrollValue;
  }

  private calculateScrollValue() {
    const screenWidth = window.innerWidth;
    return screenWidth/2;
  }

  gotoMovie(id: number) {
    this.router.navigate(['/movie', id]);
  }
}
