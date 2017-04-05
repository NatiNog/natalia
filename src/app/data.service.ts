/**
 * Created by Natalia on 5/4/17.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

export class Flight{

  //Fill with all the needed attribute for a flight result

  Prueba: string;
  constructor() {
    this.Prueba = "Prueba";

  }

}

export class Airport{

  PlaceId:  string ;
  PlaceName:  string ;
  CountryId: string ;
  RegionId:  string ;
  CityId: string ;
  CountryName:  string ;

  constructor() {

      //datos de prueba para que tenga algo
      this.PlaceId = "PARI-sky";
      this.PlaceName = "Paris";
      this.CountryId = "FR-sky";
      this.RegionId = "";
      this.CityId = "PARI-sky";
      this.CountryName = "France";

  }
}


@Injectable()
export class DataService {
  flights: Observable<Flight[]>
  private _flights: BehaviorSubject<Flight[]>;
  airports: Observable<Airport[]>
  private _airports: BehaviorSubject<Airport[]>;
  private baseUrl: string;
  private apiKey: string;
  private sessionKey: string;
  private dataStore: {
    flights: Flight[]
    airports: Airport[];
  };

  constructor(private http: Http) {
    this.baseUrl = 'http://partners.api.skyscanner.net/apiservices/';
    this.apiKey = 'na557889249291875333828532662146';
    this.sessionKey = '';
    this.dataStore = { flights: [] , airports: []};
    this._flights = <BehaviorSubject<Flight[]>>new BehaviorSubject([]);
    this.flights = this._flights.asObservable();
    this._airports = <BehaviorSubject<Airport[]>>new BehaviorSubject([]);
    this.airports = this._airports.asObservable();
  }



  loadpost(country: string, currency: string, locale: string,locationSchema: string, originplace: string,  destinationplace: string, outbounddate: string,  inbounddate: string, adults: string, children: string, infants: string) {

    //for testing
    let body =  'cabinclass=Economy&country=UK&currency=GBP&locale=en-GB&locationSchema=iata&originplace=EDI&destinationplace=LHR&outbounddate=2017-05-30&inbounddate=2017-06-02&adults=1&children=0&infants=0&apikey='+this.sessionKey;

    this.http.post(`${this.baseUrl}/pricing/v1.0`, body)
      .map(response => response.json()).subscribe(data => {
        this.dataStore.flights = data;
        this._flights.next(Object.assign({}, this.dataStore).flights);
      }, error => console.log('loadpost - Could not load flights.'));
  }

  loadget() {
    this.http.get(`${this.baseUrl}/pricing/v1.0/${this.sessionKey}`).map(response => response.json()).subscribe(data => {
      this.dataStore.flights = data;
      this._flights.next(Object.assign({}, this.dataStore).flights);
    }, error => console.log('loadget - Could not load flights.'));
  }



  loadAirportNames(market: string, currency: string, locale: string) {
    this.http.get(`${this.baseUrl}/autosuggest/v1.0/${market}/${currency}/${locale}`).map(response => response.json()).subscribe(data => {
      this.dataStore.airports = data;
      this._airports.next(Object.assign({}, this.dataStore).airports);
    }, error => console.log('Could not load Airports.'));
  }

}
