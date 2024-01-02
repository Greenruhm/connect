/* eslint-disable react/react-in-jsx-scope */
// src/features/card/card-description/card-description-editable-component.js
// disable eslint to remove unused imports
import { bool, func, string } from 'prop-types';
import React from 'react';
import { PencilIcon } from '../../../icons/icons';
import InputWithLabel from '../../shared/input-with-label-component';
import SubmitButton from '../../shared/submit-button-component';
import Theme from '../../theme';

const placeholder =
  'This is sample drop description copy. Tap the pencil icon above to add your own description here.';

const CardDescriptionView = ({
  description = placeholder,
  editMode = false,
  toggleEditMode,
  localDescription,
  setLocalDescription,
  isSaving,
  onSave,
}) => {
  console.log({ editMode });
  return (
    <div
      id="drop-description"
      className="card-description-editable font-format"
    >
      {editMode ? (
        <div>
          <InputWithLabel
            className="description-edit-field"
            fieldProps={{
              label: 'Description',
              name: 'description',
              type: 'textarea',
            }}
            fieldState={localDescription}
            setFieldState={setLocalDescription}
            margin="0"
          />
          <SubmitButton
            className="save-button"
            disabled={false}
            label="Save"
            loading={isSaving}
            onClick={onSave}
          />
        </div>
      ) : (
        <>
          <div
            onClick={toggleEditMode}
            onKeyDown={(event) => {
              // Trigger toggleEditMode on Enter or Space key press
              if (event.key === 'Enter' || event.key === ' ') {
                toggleEditMode();
              }
            }}
            tabIndex={0}
            role="button"
            aria-pressed={editMode}
          >
            <div className="card-description-edit-field">
              <span>Description</span> <PencilIcon />
            </div>
          </div>
          <div>
            {description.split('\n').map((line, i) => (
              <p className="card-description-paragraph" key={i}>
                {line}
              </p>
            ))}
          </div>
        </>
      )}
      <style jsx>{`
        .card-description-editable {
          display: flex;
          flex-direction: column;
          gap: ${Theme.edgeSize.medium};
        }

        .card-description-edit-field {
          align-items: flex-end;
          display: flex;
          flex-direction: row;
          gap: 7px;
          min-width: 0;
        }

        .card-description-paragraph {
          margin-block-start: ${Theme.edgeSize.small};
          margin-block-end: ${Theme.edgeSize.small};
        }
      `}</style>
    </div>
  );
};

CardDescriptionView.propTypes = {
  description: string,
  editMode: bool,
  toggleEditMode: func,
  localDescription: string,
  setLocalDescription: func,
  isSaving: bool,
  onSave: func,
};

export default CardDescriptionView;
