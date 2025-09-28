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
  contactForm: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder, private emailService: EmailService) {
    this.contactForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      message: ["", Validators.required],
    })
  }

  onSubmit() {
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
      this.emailService.sendContact(this.contactForm.value).subscribe({
        next: () => {
          iziToast.success({
            title: '¡Mensaje enviado!',
            message: 'Gracias por contactarme. Te responderé pronto.',
            position: 'topRight',
            backgroundColor: '#10B981',
            theme: 'dark'
          });
          this.contactForm.reset();
          this.isSubmitting = false;
        },
        error: (error) => {
          console.error("Error al enviar el mensaje", error);
          iziToast.error({
            title: 'Error al enviar',
            message: 'Hubo un problema al enviar tu mensaje. Inténtalo de nuevo.',
            position: 'topRight',
            backgroundColor: '#EF4444',
            theme: 'dark'
          });
          this.isSubmitting = false;
        }
      });
    }
  }
}