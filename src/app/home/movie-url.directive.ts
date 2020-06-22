import { Directive, Input, ElementRef, AfterViewInit } from "@angular/core";

@Directive({
  selector: "[appMovieUrl]",
})
export class MovieUrlDirective implements AfterViewInit {
  @Input("appMovieUrl") partialUrl: any;

  constructor(private el: ElementRef) {
    console.log(el);
    console.log(this.partialUrl);
    // const partUrlHtml = this.getPartialUrl(this.partialUrl);
    //  console.log(partUrlHtml);
    //  el.nativeElement.innerHTML = partUrlHtml;
  }

  ngAfterViewInit(): void {
    console.log("######" + this.partialUrl);
    const partUrlHtml = this.getPartialUrl(this.partialUrl);
    // console.log(partUrlHtml);
    this.el.nativeElement.innerHTML = partUrlHtml;
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
}
