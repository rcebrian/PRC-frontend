import { Component, OnInit } from '@angular/core';
import {MailService} from '../../../services/contact/mail.service';
import {MarkersService} from '../../../services/markers.service';
import * as L from 'leaflet';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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
  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required]),
    isActive: new FormControl('', [Validators.required])
  });
  showSpinner: boolean = false;
  showText: boolean = true;

  constructor(private mailService: MailService, private markers: MarkersService) { }

  ngOnInit(): void {
    this.mapUEM();
  }

  toggleLoading = () => {
    this.showSpinner = true;
    this.showText = false;

    // Faking an API call
    setTimeout(() => {
      this.showSpinner = false;
      this.showText = true;
    }, 2000);
  }

  submitForm() {
    /*obtener los datos de los campos de texto del formulario*/
    const name = this.contactForm.value.name;
    const email = this.contactForm.value.email;
    const message = this.contactForm.value.message;

    /*A continuacion hariamos las llamadas a la API, en nuestro caso, enviaremos el correo*/
    this.sendMail(name, email, message);
  }
  sendMail(n, e, m) {
    this.mailService.sendMail(n, e, m).subscribe(
      data => {
        alert('Email sent correctly');
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
