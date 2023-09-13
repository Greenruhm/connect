import React from 'react';
import UploadMedia from '../../components/upload-media';

console.log('HERE', UploadMedia);
const TestMediaComponent = (props) => {
  return (
    <UploadMedia
      inputs={{ embedImage: { name: 'SOMETHING ELSE' } }}
      {...props}
    />
  );
};
export default TestMediaComponent;
