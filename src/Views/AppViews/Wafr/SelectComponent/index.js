
import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';

const CustomSelectWrapper = styled('div')({
  position: 'relative',
  width: '100%',
});

const CustomDropdown = styled('div')(({ isOpen }) => ({
  position: 'absolute',
  top: '100%',
  left: 0,
  width: '100%',
  border: '1px solid #d1d5db',
  borderRadius: '0.375rem',
  backgroundColor: '#fff',
  zIndex: 10,
  maxHeight: isOpen ? '200px' : '0',
  overflowY: 'auto',
  transition: 'max-height 0.3s ease',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  opacity: isOpen ? 1 : 0,
  pointerEvents: isOpen ? 'auto' : 'none',
}));

const CustomLabel = styled('label')({
  display: 'block',
  fontSize: '1.125rem',
  fontWeight: 500,
  color: '#4b5563',
  marginBottom: '0.25rem',
});

const Arrow = styled('div')(({ isOpen }) => ({
  position: 'absolute',
  top: '50%',
  right: '1rem',
  transform: `translateY(-50%) ${isOpen ? 'rotate(180deg)' : ''}`,
  pointerEvents: 'none',
  width: '0',
  height: '0',
  borderLeft: '0.4rem solid transparent',
  borderRight: '0.4rem solid transparent',
  borderTop: isOpen ? '0.4rem solid #3b82f6' : '0.4rem solid #6b7280',
}));

const DropdownButton = styled('div')({
  width: '100%',
  backgroundColor: 'white',
  border: '1px solid #d1d5db',
  borderRadius: '0.375rem',
  padding: '0.75rem 1rem',
  fontSize: '1rem',
  lineHeight: '1.5',
  textAlign: 'left',
  cursor: 'pointer',
  position: 'relative',
});

const Checkbox = styled('input')({
  marginRight: '0.5rem',
});

const SelectComponent = ({ lenses, placeholder, label, onLensChange, checkbox }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLenses, setSelectedLenses] = useState([]);
  const dropdownRef = useRef(null); // Reference for the dropdown

  // Initialize with the first lens selected by default if selectedLenses is empty
  useEffect(() => {
    if (lenses.length > 0 && selectedLenses.length === 0) {
      const defaultLens = lenses[0];
      setSelectedLenses([defaultLens]);
      onLensChange([defaultLens]);
    }
  }, [lenses, onLensChange]);

  // Close the dropdown if clicking outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Toggle dropdown open/close
  const handleToggleDropdown = (event) => {
    event.preventDefault(); // Prevent any default action like form submission
    setIsOpen(!isOpen);
  };

  // Handle lens selection
  const handleLensSelect = (lens) => {
    if (!checkbox) {
      // If checkbox is not enabled, close the dropdown and set selected lens
      setSelectedLenses([lens]);
      onLensChange([lens]);
      setIsOpen(false);
    }
  };

  // Handle checkbox changes for multiple selection
  const handleCheckboxChange = (event, lens) => {
    const isChecked = event.target.checked;
    const updatedSelectedLenses = isChecked
      ? [...selectedLenses, lens]
      : selectedLenses.filter(item => item !== lens);

    setSelectedLenses(updatedSelectedLenses);
    onLensChange(updatedSelectedLenses);
  };

  return (
    <div className="mb-6" ref={dropdownRef}>
      <CustomLabel>{label}</CustomLabel>
      <CustomSelectWrapper>
        <DropdownButton onClick={handleToggleDropdown}>
          {selectedLenses.length > 0
            ? selectedLenses.join(', ')
            : placeholder}
          <Arrow isOpen={isOpen} />
        </DropdownButton>

        <CustomDropdown isOpen={isOpen}>
          {lenses.map((lens, index) => (
            <label key={index} style={{ display: 'block', padding: '0.5rem 1rem' }}>
              {checkbox && (
                <Checkbox
                  type="checkbox"
                  checked={selectedLenses.includes(lens)}
                  onChange={(event) => handleCheckboxChange(event, lens)}
                />
              )}
              {!checkbox && (
                <span onClick={() => handleLensSelect(lens)}>{lens}</span>
              )}
              {checkbox && lens}
            </label>
          ))}
        </CustomDropdown>
      </CustomSelectWrapper>
    </div>
  );
};

export default SelectComponent;



