import { Component, ViewChild, ElementRef } from '@angular/core';
 
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Router } from '@angular/router';
import { RestService } from '../services/rest.service';

declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('map',null) mapElement: ElementRef;
  map: any;
  address:string;
  latitude: any;
  longitude: any;
  marcadores: any;

  myStyles =[
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [
              { visibility: "off" }
        ]
    }
];

  constructor(private geolocation: Geolocation,
              private router: Router,
              private nativeGeocoder: NativeGeocoder,
              private rest: RestService) {}

    ngOnInit() {
      this.loadMap();
    }

    async reportar() {
      localStorage.setItem('latitude', this.latitude)
      localStorage.setItem('longitude',this.longitude)
      this.router.navigate(['report'])
    }
   
    loadMap() {
      this.geolocation.getCurrentPosition().then((resp) => {
        let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
        console.log(resp.coords.latitude + '-' + resp.coords.longitude);

        this.latitude = resp.coords.latitude
        this.longitude = resp.coords.longitude

        let mapOptions = {
          center: latLng,
          zoom: 17,
          mapTypeId: google.maps.MapTypeId.TERRAIN,
          disableDefaultUI: true,
          styles: this.myStyles 
        }
   
       
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
   
      }).finally(() => {
        this.addMarkersToMap();
        this.addHeatMap();

        /*this.rest.getDataNasa(this.latitude,this.longitude).subscribe(
        data => {
           console.log(data)
        })*/

      })
      .catch((error) => {
        console.log('Error getting location', error);
      });
    }
   
   

    addHeatMap(){
      let layers = new google.maps.KmlLayer('http://arthurhou.pps.eosdis.nasa.gov/THORonline/imergKML/realtimeIMERG.1day.kml',{preserveViewport: true, suppressInfoWindows: false});
      layers.setMap(this.map);
    }

    addMarkersToMap() {

      this.rest.listarMarcadores().subscribe(
        data => {
          this.marcadores = data
          for (let marcador of this.marcadores) {
            const position = new google.maps.LatLng(marcador.latitude, marcador.longitude);
            const marker = new google.maps.Marker({ position });
            marker.setMap(this.map);
          }
        }
      )
    }

}
