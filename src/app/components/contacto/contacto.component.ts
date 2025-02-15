import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
          alert("¡Gracias por tu mensaje!");
          this.contactForm.reset();
        },
        error: (error) => {
          console.error("Error al enviar el mensaje", error);
          alert("Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.");
        }
      });
    }
  }
}
