import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from './services/email.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
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