import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './Filter.module.css';

const Filter = ({ value, onChange }) => {
  const [filterValue, setFilterValue] = useState(value);

  const handleChange = (event) => {
    setFilterValue(event.target.value);
    onChange(event);
  };

  return (
    <input
      type="text"
      value={filterValue}
      onChange={handleChange}
      placeholder="Search contacts..."
    />
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
