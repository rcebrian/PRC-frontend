import { Component, OnInit } from '@angular/core';
import {MailService} from '../../../services/contact/mail.service';
import {MarkersService} from '../../../services/markers.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  /*declaro las variables disponibles, seran las propiedades de la clase*/
  name: string;
  email: string;
  message: string;
  isActive: boolean;
  uemMap: any;

  constructor(private mailService: MailService, private markers: MarkersService) { }

  ngOnInit(): void {
    this.mapUEM();
    //this.getMarkers();
  }

  submitForm() {
    /*obtener los datos de los campos de texto del formulario*/
    const name = this.name;
    const email = this.email;
    const message = this.message;
    // alert(`The email has been sent by: ${name}!`);

    /*A continuacion hariamos las llamadas a la API, en nuestro caso, enviaremos el correo*/
    this.sendMail(name, email, message);
  }
  sendMail(n, e, m) {
    this.mailService.sendMail(n, e, m).subscribe(
      data => {
        alert(data.msg);
      },
      error => {
        alert(error.error.error);
      }
    );
  }
  private mapUEM() {
    this.uemMap = L.map('map', {
      center: [40.373102, -3.919083], // coord uem
      zoom: 15
    });
    const marker = L.marker([40.373102, -3.919083]).addTo(this.uemMap);
  }
}
