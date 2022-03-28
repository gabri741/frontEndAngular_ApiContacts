import { Component, OnInit } from '@angular/core';
import { ContactService } from './services/contact.service';
import { Contact } from './models/contact';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  contact = {} as Contact;
  contacts = [] as Contact[];

  constructor(private ContactService: ContactService) {}
  
  ngOnInit() {
    this.getContacts();
  }

  // defini se um Contactro será criado ou atualizado
  saveContact(form: NgForm) {
    if (this.contact.id !== undefined) {
      this.ContactService.updateContact(this.contact).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.ContactService.saveContact(this.contact).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // Chama o serviço para obtém todos os Contactros
  getContacts() {
    this.ContactService.getContacts().subscribe((Contacts: Contact[]) => {
      this.contacts = Contacts;
    });
  }

  // deleta um Contactro
  deleteContact(Contact: Contact) {
    this.ContactService.deleteContact(Contact).subscribe(() => {
      this.getContacts();
    });
  }

  // copia o Contactro para ser editado.
  editContact(Contact: Contact) {
    this.contact = { ...Contact };
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getContacts();
    form.resetForm();
    this.contact = {} as Contact;
  }

}