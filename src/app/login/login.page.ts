import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular'; 
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true, 
  imports: [
    CommonModule,
    FormsModule,
    IonicModule 
  ]
})
export class LoginPage implements OnInit {

  usuario: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  async ingresar() {
    
    if (this.usuario.trim().length < 3 || this.usuario.trim().length > 8) {
      this.presentarAlerta('Error', 'El usuario debe tener entre 3 y 8 caracteres.');
      return;
    }

    
    const esNumero = /^\d+$/.test(this.password);
    if (this.password.length !== 4 || !esNumero) {
      this.presentarAlerta('Error', 'La contraseña debe ser un número de 4 dígitos.');
      return;
    }

    
    const navigationExtras: NavigationExtras = {
      state: {
        username: this.usuario
      }
    };

    
    this.router.navigate(['/home'], navigationExtras);
  }

  
  async presentarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}