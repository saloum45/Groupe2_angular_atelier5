import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  // Attributs
  blocChoice = 0;
  nom = "";
  prenom = "";
  email = "";
  telephone = "";
  image = "";
  description = "";
  contacts=JSON.parse(localStorage.getItem('contacts') || '[]');



  // Methodes

  changeBloc(choice: any) {
    this.blocChoice = choice;
  }

  verifierAjout() {

    if (this.nom == "" || this.prenom == "" || this.email == "" || this.image == "" || this.telephone == "" || this.description == "") {
      Swal.fire({
        icon: 'error',
        title: 'Sorry',
        text: 'Veuillez saisir tous les champs',
      })
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Thanks',
        text: 'Contact ajouté avec succès',
      })
      let contact = {
        nom: this.nom,
        prenom: this.prenom,
        telephone: this.telephone,
        email: this.email,
        image: this.image,
        description: this.description,
        createBy: JSON.parse(localStorage.getItem('userOnline') || '{}'),
        createAt: new Date()
      }
      this.saveContact(contact);

    }

  }

  saveContact(contact: any) {
    if (localStorage.getItem("contacts") == null || localStorage.getItem("contacts") == undefined) {
      localStorage.setItem("contacts", JSON.stringify([contact]));
    } else {
      let contactsTmp;
      contactsTmp = JSON.parse(localStorage.getItem('contacts') || '[]');
      contactsTmp.push(contact)
      localStorage.setItem('contacts', JSON.stringify(contactsTmp));
    }
    this.nom = "";
    this.prenom = "";
    this.email = "";
    this.telephone = "";
    this.image = "";
    this.description = "";
  }
}
