import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { MovieService } from "./movie.service";
import { Movie } from "./movie.model";
import { FormControl } from "@angular/forms";
import { debounceTime } from "rxjs/operators";
import { Platform } from "@ionic/angular";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  @ViewChild("#partUrl", { static: false }) partUrlRef: ElementRef;

  isLoading: boolean = false;
  searchControl: FormControl;
  searchTerm: string = "";
  movies: Movie[];

  constructor(private movieService: MovieService, private platform: Platform) {
    this.searchControl = new FormControl();
  }

  ngOnInit(): void {
    this.loadMoives();
    this.searchControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe((search) => {
        this.isLoading = false;
        this.searchTerm = search;
        this.setFilteredMovies();
      });
  }

  ionViewDidLoad() {}

  loadMoives() {
    this.isLoading = true;
    this.movieService.getMovieList().subscribe((movies) => {
      this.movies = movies;
      this.isLoading = false;
    });
  }

  setFilteredMovies() {
    this.movies = this.movieService.filterItems(this.searchTerm);
  }

  getPartialUrl(partilaUrl: string[]) {
    let partUrlArr = new Array();
    if (partilaUrl.length > 1) {
      partUrlArr.push(partilaUrl[0]);
      for (let i = 1; i < partilaUrl.length; i++) {
        this.getArrowSeparator(partUrlArr);
        partUrlArr.push(partilaUrl[i]);
      }
    }
    return partUrlArr.join("");
  }

  private getArrowSeparator(partUrlArr) {
    partUrlArr.push("<ion-text color='secondary'>");
    partUrlArr.push("<ion-icon name='arrow-forward-outline'></ion-icon>");
    partUrlArr.push("</ion-text>");
  }

  exitApp() {
    if (navigator["app"]) {
      navigator["app"].exitApp();
    } else if (this.platform["exitApp"]) {
      eval(this.platform["exitApp"]);
    }
  }

  getPartialUrlExceptFirst(url: string[]) {
    let pUrl = [...url];
    pUrl.splice(pUrl.length - 1, 1);
    return pUrl;
  }

  onSearchInput() {
    this.isLoading = true;
  }
}
