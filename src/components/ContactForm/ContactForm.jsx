import { useState } from 'react';
import Notiflix from 'notiflix';
import './ContactForm.module.css';
import { nanoid } from 'nanoid';
import { useSelector, useDispatch } from 'react-redux';
import { add, getContacts } from '../../redux/contactsSlice';

 const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const handleInputChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const checkNewName = name => {
    if (contacts) {
      const normalizeDataName = name.toLowerCase();
      return contacts.some(contact => contact.name.toLowerCase() === normalizeDataName);
    }
    return false;
  };

  const handleSubmitForm = e => {
    e.preventDefault();

    // Validate name
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{3,}$/;
    if (!nameRegex.test(name)) {
      Notiflix.Notify.failure("The name must contain only letters and spaces (minimum 3 characters).");
      return;
    }

    // Validate number
    const phoneRegex = /^\+\d{8,}$/;
    if (!phoneRegex.test(number)) {
      Notiflix.Notify.failure("The phone number must start with '+' and contain only digits (minimum 8).");
      return;
    }

    if (!checkNewName(name)) {
      const newContact = { id: nanoid(), name, number };
      dispatch(add(newContact));
      Notiflix.Notify.success(`Contact ${name} added successfully!`);
      reset();
    } else {
      Notiflix.Notify.failure(`${name} is already in contacts.`);
    }
    document.activeElement.blur();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <label>
        Name
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleInputChange}
          pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]{3,}"
          placeholder="Enter name"
          required
        />
      </label>
      <label>
        Number
        <input
          type="tel"
          name="number"
          value={number}
          onChange={handleInputChange}
          pattern="\+\d{8,}"
          placeholder="+12345678"
          required
        />
      </label>
      <button type="submit">Add Contact</button>
    </form>
  );
};

export default ContactForm;
