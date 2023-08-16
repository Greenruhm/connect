import React from 'react';
import { Meter } from 'grommet';
import { number } from 'prop-types';

const ProgressBar = ({ percentComplete, ...props }) => {
  return (
    <Meter
      {...props}
      value={percentComplete}
      round={true}
      thickness="small"
      type="bar"
    />
  );
};

ProgressBar.propTypes = {
  percentComplete: number,
};

export default ProgressBar;
