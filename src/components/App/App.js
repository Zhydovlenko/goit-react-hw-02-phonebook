import React, { Component } from "react";
import shortid from "shortid";
import ContactForm from "../ContactForm/ContactForm";
import ContactList from "../ContactList/ContactList";
import Filter from "../Filter/Filter";
import styles from "./App.module.css";

export default class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  changeFilter = (filter) => {
    this.setState({ filter });
  };

  addContact = (contact) => {
    const isUniqueContact = this.state.contacts.some(
      (savedContact) =>
        savedContact.name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isUniqueContact) {
      return alert(`${contact.name} is already in contacts.`);
    }

    const contactToAdd = {
      ...contact,
      id: shortid.generate(),
    };

    this.setState((state) => ({
      contacts: [...state.contacts, contactToAdd],
    }));

    return;
  };

  deleteContact = (id) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((contact) => contact.id !== id),
      filter: "",
    }));
  };

  filterContacts = (contacts, filter) => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = this.filterContacts(contacts, filter);

    return (
      <div className={styles.container}>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.addContact} />
        <h2>Contacts</h2>
        {contacts.length > 2 && (
          <Filter value={filter} onChangeFilter={this.changeFilter} />
        )}
        {contacts.length > 0 && (
          <ContactList
            contacts={filteredContacts}
            onDeleteContact={this.deleteContact}
          />
        )}
      </div>
    );
  }
}
