import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Movie } from "./movie.model";
import { map } from "rxjs/operators";
import { JsonPipe } from "@angular/common";

@Injectable({
  providedIn: "root",
})
export class MovieService {
  private movies: Movie[];
  constructor(private http: HttpClient) {}

  getMovieList() {
    return this.http.get<Movie[]>("./../assets/data/Movie.json").pipe(
      map((resData) => {
        //console.log(resData);
        // console.log(resData[0].title);
        this.movies = resData;
        //console.log(JSON.parse(resData[0]));
        //this.movies = resData;
        // for (let i = 0; i < resData.length; i++) {
        //   let m: Movie = resData[i];
        //   let url = m.url;
        //   url = url.replace("\\", "<ion-text color='primary'>\</ion-text>");
        //   console.log(url);
        //   m.url = url;
        // }
        return resData;
      })
    );
  }

  filterItems(searchTerm) {
    return this.movies.filter((movie) => {
      return movie.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
}
