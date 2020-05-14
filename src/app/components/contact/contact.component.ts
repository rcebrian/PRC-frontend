import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  submitForm() {
    /*obtener los datos de los campos de texto del formulario*/
    const name = this.name;
    const email = this.email;
    const message = this.message;
    alert(`The email has been sent by: ${name}!`);

    /*A continuacion hariamos las llamadas a la API, en nuestro caso, enviaremos el correo*/

  }

}
