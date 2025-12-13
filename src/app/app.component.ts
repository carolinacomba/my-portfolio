import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from './services/email.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  currentLang: string = 'es';
  
  constructor(private translate: TranslateService) {
    // Configurar idioma inicial
    this.translate.setDefaultLang('es');
    this.translate.use('es');
  }
  
  // Calcular edad automáticamente
  get edad(): number {
    const fechaNacimiento = new Date(2003, 4, 28); // Mayo es el mes 4 (0-indexed)
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();
    
    // Si aún no ha pasado el cumpleaños este año, restar 1
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
      edad--;
    }
    
    return edad;
  }
  
  // Cambiar idioma
  switchLanguage() {
    this.currentLang = this.currentLang === 'es' ? 'en' : 'es';
    this.translate.use(this.currentLang);
  }
  
  ngOnInit() {
    this.initScrollReveal();
    this.initTypingAnimation();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.updateScrollReveal();
  }


  initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((element, index) => {
      (element as HTMLElement).style.transitionDelay = (index * 0.1) + 's';
    });
  }

  updateScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    const elementVisible = 150;

    reveals.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < windowHeight - elementVisible) {
        element.classList.add('active');
      }
    });
  }

  initTypingAnimation() {
    const typingElement = document.querySelector('.typing');
    if (!typingElement) return;

    const texts = [
      'Desarrolladora Full Stack',
      'Estudiante de Programación',
      'Apasionada por la Tecnología',
      'Creadora de Soluciones'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeWriter = () => {
      const currentText = texts[textIndex];
      
      if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
      }

      let typeSpeed = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500;
      }

      setTimeout(typeWriter, typeSpeed);
    };

    typeWriter();
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  downloadCV() {
    // This would typically download a PDF file
    const link = document.createElement('a');
    link.href = 'assets/imagenes/entrada_253608-169338-44906594.pdf';
    link.download = 'Carolina_Comba_CV.pdf';
    link.click();
  }
}