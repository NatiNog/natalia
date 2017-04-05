import { Component , OnInit} from '@angular/core';
import {DataService, Airport} from './data.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
})
export class AppComponent   implements OnInit {
  airports: Observable<Airport[]>;


  constructor(
    private airportService: DataService){

  }

  ngOnInit() {
    this.airports = this.airportService.airports;
    this.airportService.loadAirportNames('', '', ''); //Get the Airports

  }


}
