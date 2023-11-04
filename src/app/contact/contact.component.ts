import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  // Attributs
  blocChoice=0;



  // Methodes

  changeBloc(choice:any){
    this.blocChoice=choice;
  }
}
