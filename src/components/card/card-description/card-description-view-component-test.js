import React from 'react';
import { describe } from 'riteway';
import match from 'riteway/match';
import render from 'riteway/render-component';
import CardDescriptionView from './card-description-view-component.js';

describe('Card Description Editable Component', async (assert) => {
  {
    const $ = render(<CardDescriptionView />);
    const contains = match($.html());
    const sampleCopy =
      'This is sample drop description copy. Tap the pencil icon above to add your own description here.';
    assert({
      given: 'no props',
      should: 'display the Description text',
      actual: contains('Description'),
      expected: 'Description',
    });
    assert({
      given: 'no props',
      should: 'display the edit icon',
      actual: $('.pencil-icon').length,
      expected: 1,
    });
    assert({
      given: 'no props',
      should: 'display the sample copy description',
      actual: contains(sampleCopy),
      expected: sampleCopy,
    });
  }
  {
    const description = 'My awesome description';
    const $ = render(<CardDescriptionView description={description} />);
    const contains = match($.html());
    assert({
      given: 'a description',
      should: 'display the right description',
      actual: contains(description),
      expected: description,
    });
  }
  {
    const $ = render(<CardDescriptionView editMode={true} />);
    assert({
      given: 'edit mode',
      should: 'display the component in edit mode',
      actual: $('.description-edit-field').length,
      expected: 1,
    });
    assert({
      given: 'edit mode',
      should: 'display the save button',
      actual: $('.save-button').length,
      expected: 1,
    });
  }
  {
    const $ = render(<CardDescriptionView editMode={true} isSaving />);
    assert({
      given: 'edit mode and saving state',
      should: 'display the loading spinner icon',
      actual: $('.load-spinner').length,
      expected: 1,
    });
  }
});
