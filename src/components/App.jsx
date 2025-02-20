import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { RiContactsBook2Line } from "react-icons/ri";
import { IoIosContacts } from "react-icons/io";

import './App.module.css';

const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = localStorage.getItem('contact');
    if (savedContacts) {
      try {
        setContacts(JSON.parse(savedContacts));
      } catch (error) {
        console.error("Error parsing contacts from localStorage:", error);
        setContacts([]); // Resetare în caz de eroare
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contact', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const contactWithSameName = contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase());
    const contactWithSameNumber = contacts.find(contact => contact.number === number);

    if (contactWithSameName && contactWithSameNumber) {
      Notiflix.Notify.failure(`A contact with the name ${name} and the number ${number} already exists!`);
      return;
    } else if (contactWithSameName) {
      Notiflix.Notify.failure(`A contact with the name ${name} already exists!`);
      return;
    } else if (contactWithSameNumber) {
      Notiflix.Notify.failure(`A contact with the number ${number} already exists!`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(prevContacts => [...prevContacts, newContact]);
    Notiflix.Notify.success(`Contact ${name} added successfully!`);
  };

  const deleteContact = id => {
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(normalizedFilter) ||
        contact.number.includes(filter)
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <div className='container'>
      <h1 className='phonebook'>Phonebook <RiContactsBook2Line/></h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts <IoIosContacts /></h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <ContactList contacts={filteredContacts} onDelete={deleteContact} />
    </div>
  );
};

export default App;
