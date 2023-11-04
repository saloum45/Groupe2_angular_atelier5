import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  // Attributs
  isForm=true;
  nom = "";
  prenom = "";
  numero = "";
  email = "";
  pass = "";
  // usersTmp:any=[];

  // Methodes
  constructor(private router:Router){

  }
  switchForm(){
    this.isForm=!this.isForm;
    this.nom="";
    this.prenom="";
    this.numero="";
    this.email="";
    this.pass="";
  }
  verifierLogin() {

    if (this.email == "" || this.pass == "") {
      this.showMessage("error","Sorry",'Veuillez saisir tous les champs');
    }else if(this.email == "" || this.pass.length<8){
        this.showMessage("error","Sorry",'Le password doit être > ou = à 8 caractère');
      }
      else {
          // this.showMessage('success','Thanks','Connexion faite avec succès');
          this.isUser(this.email,this.pass);
    }


  }


  verifierRegister() {

    if (this.nom == "" || this.prenom == "" || this.email == "" || this.pass == "" || this.numero == "") {
      Swal.fire({
        icon: 'error',
        title: 'Sorry',
        text: 'Veuillez saisir tous les champs',
      })
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Thanks',
        text: 'Inscription faite avec succès, veuillez maintenant vous connectez',
      })
      let user={
        nom:this.nom,
        prenom:this.prenom,
        numero:this.numero,
        email:this.email,
        pass:this.pass,
      }
      this.saveUser(user);
      this.switchForm()


    }

  }

  showMessage(icon:any,title:any,message:any){
    Swal.fire({
      icon: icon,
      title: title,
      text: message,
    })
  }

  // la fonction qui save le user
  saveUser(user:any){
    if (localStorage.getItem('users')==null ||localStorage.getItem('users')==undefined) {
      localStorage.setItem('users',JSON.stringify([user]));
    }else{
      let usersTmp;
      usersTmp=JSON.parse(localStorage.getItem('users')||'[]');
      usersTmp.push(user)
      localStorage.setItem('users',JSON.stringify(usersTmp));
    }
  }
  // la fonction qui verifie si l'utilisateur exite au niveau du localStorage
  isUser(email:any,pass:any){
    let isExisting=0;
    if (localStorage.getItem('users')!=null ||localStorage.getItem('users')!=undefined) {

      let usersTmp;
      usersTmp=JSON.parse(localStorage.getItem('users')||'[]');
      // alert(email+" "+pass)
      usersTmp.forEach((element:any) => {
        if (element.email==email && element.pass==pass) {
          isExisting=1;

        }

      });

      if (isExisting==1) {
        this.showMessage('success','Thanks','Connexion faite avec succès');
        localStorage.setItem('userOnline',JSON.stringify(email));
        this.router.navigate(['contact']);

      }else{

        this.showMessage("error","Sorry","vous n'avez pas de compte, veuillez vous inscrire");
      }
    }
  }



}
