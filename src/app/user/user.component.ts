import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  // Attributs
  isForm=true;

  // Methodes
  switchForm(){
    this.isForm=!this.isForm;
  }
}
