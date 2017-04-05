import { Component , OnInit} from '@angular/core';
import {DataService, Flight} from './data.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-results',
  templateUrl: './app.results.html',
})
export class AppResults implements OnInit {
  flights: Observable<Flight[]>;


  constructor(
    private flightsService: DataService){

  }

  ngOnInit() {
    this.flights = this.flightsService.flights;
    this.flightsService.loadpost('','','','','','','','','','','');

  }

  search(){
    this.flights = this.flightsService.flights;
    this.flightsService.loadpost('','','','','','','','','','',''); //Get the params from the form when submitted
  }

}
