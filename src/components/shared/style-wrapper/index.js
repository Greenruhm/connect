import React from 'react';

const styles = {
  page: {
    color: '#fff',
    fontFamily: 'Work Sans, sans-serif',
    margin: '24px auto 0',
    maxWidth: '800px',
    padding: '10px 40px 64px',
    position: 'relative',
  },
  wrapper: {
    margin: '0 auto',
    maxWidth: '650px',
    position: 'relative',
  },
};

const withStyleWrapper = (Component) => {
  return function StyleWrapper(props) {
    return (
      <div className="box-format font-format" style={styles.page}>
        <div className="wrapper" style={styles.wrapper}>
          <Component {...props} />
        </div>
      </div>
    );
  };
};

export default withStyleWrapper;
