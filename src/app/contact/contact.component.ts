import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { elementAt } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  // Attributs
  blocChoice = 0;
  nom = "";
  prenom = "";
  email = "";
  telephone = "";
  image = "";
  description = "";
  contacts: any;
  contactsByUser: any[] = [];
  deletedContactsByUser: any[] = [];



  // Methodes
  constructor(private router: Router) {

  }
  ngOnInit() {
    this.getContactsByUser();
  }

  getContactsByUser() {
    this.contactsByUser = [];
    this.deletedContactsByUser = [];
    let tab: any[] = [];
    this.contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    this.contacts.forEach((element: any) => {
      if (element.createBy == JSON.parse(localStorage.getItem('userOnline') || "")) {
        tab.push(element);
      }
    });

    tab.forEach((element: any) => {
      if (element.etat == 0) {

        this.contactsByUser.push(element);
      } else if (element.etat == 1) {
        this.deletedContactsByUser.push(element);
      }
    });

  }


  changeBloc(choice: any) {
    this.blocChoice = choice;
  }

  verifierAjout() {
    // let id=0;
    if (this.nom == "" || this.prenom == "" || this.email == "" || this.image == "" || this.telephone == "" || this.description == "") {
      Swal.fire({
        icon: 'error',
        title: 'Sorry',
        text: 'Veuillez saisir tous les champs',
      });
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Thanks',
        text: 'Contact ajouté avec succès',
      });
      let id_iterator_getted: any = 0;
      if (localStorage.getItem('id_iterator') == null) {
        localStorage.setItem('id_iterator', JSON.stringify('1'));
      }
      id_iterator_getted = JSON.parse(localStorage.getItem('id_iterator') || '1');
      localStorage.setItem('id_iterator', JSON.stringify(parseInt(id_iterator_getted) + 1));
      let contact = {
        id: parseInt(id_iterator_getted) + 1,
        nom: this.nom,
        prenom: this.prenom,
        telephone: this.telephone,
        email: this.email,
        image: this.image,
        description: this.description,
        createBy: JSON.parse(localStorage.getItem('userOnline') || '{}'),
        createAt: new Date(),
        etat: 0
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
      contactsTmp.push(contact);
      localStorage.setItem('contacts', JSON.stringify(contactsTmp));
    }
    this.nom = "";
    this.prenom = "";
    this.email = "";
    this.telephone = "";
    this.image = "";
    this.description = "";
    this.getContactsByUser();
  }

  // la fonction qui gère la déconnexion
  deconnexion() {
    this.router.navigate(['user']);
  }
  // la fonction qui gère la suppression
  suppression(id_contact: any) {
    // alert('contact '+id_contact+' supprimé')
    let tab: any;
    tab = JSON.parse(localStorage.getItem('contacts') || '[]');

    tab.forEach((element: any) => {
      if (element.id == id_contact) {
        element.etat = 1;
        // this.contactsByUser.push(element);
        console.warn(element);
      }
    });
    localStorage.setItem('contacts', JSON.stringify(tab));
    this.getContactsByUser();

  }
  restaurer(id_contact: any) {
    // alert('contact '+id_contact+' supprimé')
    let tab: any;
    tab = JSON.parse(localStorage.getItem('contacts') || '[]');

    tab.forEach((element: any) => {
      if (element.id == id_contact) {
        element.etat = 0;
        // this.contactsByUser.push(element);
        console.warn(element);
      }
    });
    localStorage.setItem('contacts', JSON.stringify(tab));
    this.getContactsByUser();

  }


}
