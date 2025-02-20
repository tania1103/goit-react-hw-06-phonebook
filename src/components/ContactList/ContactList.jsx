import css from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { remove, getContacts } from '../../redux/contactsSlice';
import { getFilter } from '../../redux/filterSlice';
import { MdOutlineDeleteForever } from "react-icons/md";
import { IconContext } from 'react-icons';
import Notiflix from 'notiflix';

function DeleteIcon() {
  return (
    <IconContext.Provider
      value={{ size: '25px' , align: 'center' }}
    >
      <div>
      <MdOutlineDeleteForever  />
      </div>
    </IconContext.Provider>
  );
}

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(remove(id));
    Notiflix.Notify.success('Contact was successfully deleted');
  };

  const filteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    if (contacts) {
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter)
      );
    }
    return [];
  };

  return filteredContacts().length > 0 ? (
    <ul className={css['contacts-list']}>
      {filteredContacts().map(({ id, name, number }) => (
        <li className={css['contacts-item']} key={id}>
          <p className={css['contacts-name']}>{name}</p>
          <p className={css['contacts-number']}>{number}</p>
          <button
            type="button"
            className={css['delete-btn']}
            onClick={() => handleDelete(id)}
          >
           <DeleteIcon />
          </button>
        </li>
      ))}
    </ul>
  ) : filter !== '' ? (
    <p className={css['contacts-text']}>
      There are no saved contacts with this name.
    </p>
  ) : (
    <p className={css['contacts-text']}>There are no contacts.</p>
  );
};

export default ContactList;
