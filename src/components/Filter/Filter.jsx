import { useDispatch } from 'react-redux';
import { update } from '../../redux/filterSlice';

import './Filter.module.css';

const Filter = () => {
  const dispatch = useDispatch();

  const onChangeFilter = e => {
    const filter = e.currentTarget.value.trim();
    dispatch(update(filter));
  };

  return (
    <input
    type="text"
    name="filter"
    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    required
    onChange={onChangeFilter}
    placeholder="Search contact by name "
    />
  );
};

export default Filter;
