import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import iziToast from 'izitoast';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  contactForm: FormGroup

  constructor(private fb: FormBuilder, private emailService: EmailService) {
    this.contactForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      message: ["", Validators.required],
    })
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.emailService.sendContact(this.contactForm.value).subscribe({
        next: () => {
          iziToast.success({
            title: '¡Genial!',
            message: 'Gracias por tu mensaje',
            position: 'topRight'
          });
          this.contactForm.reset();
        },
        error: (error) => {
          console.error("Error al enviar el mensaje", error);
          iziToast.error({
            title: 'Error',
            message: 'Hubo un problema al enviar tu mensaje',
            position: 'topRight'
          });
        }
      });
    }
  }
}