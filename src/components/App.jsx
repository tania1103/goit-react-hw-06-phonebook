import React from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { RiContactsBook2Line } from "react-icons/ri";
import { IoIosContacts } from "react-icons/io";

import './App.module.css';

const App = () => {



  return (
    <div className='container'>
      <h1 className='phonebook'>Phonebook <RiContactsBook2Line/></h1>
      <ContactForm />
      <h2>Contacts <IoIosContacts /></h2>
      <Filter  />
      <ContactList />
    </div>
  );
};

export default App;
