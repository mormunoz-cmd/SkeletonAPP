import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonicModule, AnimationController } from '@ionic/angular';
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatNativeDateModule } from '@angular/material/core'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    IonicModule,
    MatDatepickerModule, 
    MatInputModule,
    MatNativeDateModule
  ]
})
export class HomePage implements OnInit {

  username: string = '';
  nombre: string = '';
  apellido: string = '';
  nivelEducacion: string = '';
  fechaNacimiento: any = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private animationCtrl: AnimationController 
  ) {
    const objetoNavegacion = this.router.getCurrentNavigation();
    if (objetoNavegacion && objetoNavegacion.extras.state) {
      this.username = objetoNavegacion.extras.state['username'];
    }
  }

  ngOnInit() {}

  
  ionViewDidEnter() {
    const titulo = document.querySelector('.titulo-bienvenida');
    if (titulo) {
      const animacionTitulo = this.animationCtrl.create()
        .addElement(titulo)
        .duration(800) 
        .iterations(1)
        .fromTo('opacity', '0', '1')
        .fromTo('transform', 'scale(0.9)', 'scale(1)');

      animacionTitulo.play();
    }
  }
  // ========================================================

  async mostrarInformacion() {
    if (!this.nombre.trim() || !this.apellido.trim()) {
      const alertaError = await this.alertController.create({
        header: 'Campos Vacíos',
        message: 'Por favor, ingresa Nombre y Apellido.',
        buttons: ['OK']
      });
      await alertaError.present();
      return;
    }

    const alert = await this.alertController.create({
      header: 'Usuario',
      message: `Su nombre es: ${this.nombre} ${this.apellido}`,
      buttons: ['Yes'] 
    });

    await alert.present();
  }

  limpiarCampos() {
    this.nombre = '';
    this.apellido = '';
    this.nivelEducacion = '';
    this.fechaNacimiento = '';

    this.ejecutarAnimacionLimpiar();
  }

  ejecutarAnimacionLimpiar() {
    const inputs = document.querySelectorAll('.animar-input');
    
    inputs.forEach(element => {
      const animacion = this.animationCtrl.create()
        .addElement(element)
        .duration(1000) 
        .iterations(1)  
        .fromTo('transform', 'translateX(-100px)', 'translateX(0px)')
        .fromTo('opacity', '0.3', '1');

      animacion.play();
    });
  }
}