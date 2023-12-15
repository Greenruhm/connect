// src/features/card/card-description/card-description-editable.js

import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { noop } from '../../../lib/react-tools';
import CardDescriptionEditableComponent from './card-description-editable-component';

const CardDescriptionEditable = ({
  description,
  defaultEditMode = false,
  isSaving = false,
  onSaveDescription = noop,
} = {}) => {
  const [localDescription, setLocalDescription] = useState(description);
  const [editMode, setEditMode] = useState(defaultEditMode);
  const toggleEditMode = () => setEditMode(!editMode);
  const onSave = () => {
    onSaveDescription(localDescription.description);
    toggleEditMode();
  };

  return (
    <CardDescriptionEditableComponent
      description={description}
      editMode={editMode}
      toggleEditMode={toggleEditMode}
      localDescription={localDescription}
      setLocalDescription={setLocalDescription}
      isSaving={isSaving}
      onSave={onSave}
    />
  );
};

CardDescriptionEditable.propTypes = {
  description: PropTypes.string,
  defaultEditMode: PropTypes.bool,
  isSaving: PropTypes.bool,
  onSaveDescription: PropTypes.func,
};

export default CardDescriptionEditable;
