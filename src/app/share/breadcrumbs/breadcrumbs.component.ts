import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html'
})
export class BreadcrumbsComponent implements OnDestroy {
  title : string = '';
  datasuscr: Subscription;

  constructor(private router : Router) { 
    this.datasuscr = this.getDataRoute().subscribe(({title}) => {
      this.title = title;
      document.title = `Admin -Pro ${title}`
  });

  }
  ngOnDestroy(): void {
    this.datasuscr.unsubscribe;
  }

  getDataRoute(){
    return this.router.events
    .pipe(
      filter( event => event instanceof ActivationEnd),
      filter ( event =>  (<ActivationEnd>event).snapshot.firstChild    === null),
      map (event=>(<ActivationEnd>event).snapshot.data)
      )
     
 
 
 //   .subscribe(data => this.title = data['title']);

  }

 

}
