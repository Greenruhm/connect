import React, { useState, useLayoutEffect, useEffect } from 'react';
import Image from 'next/image';
import ProgressBar from '../shared/progress-bar/progress-bar-component';
import {
  TrashIcon,
  CheckIcon,
  PosterIcon,
  EmbedIcon,
  FilePosterIcon,
  TallVideoPosterIcon,
  WideVideoPosterIcon,
} from '../../icons.js';

const canUseDOM = typeof window !== 'undefined';
const useIsomorphicLayoutEffect = canUseDOM ? useLayoutEffect : useEffect;

const colors = {
  primary: '#49ecbd',
};
const styles = {
  h1: {
    color: '#ffffff',
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '24px',
    lineHeight: '150%',
    marginBottom: '32px',
    alignSelf: 'center',
  },
  uploadMediaWrapper: {
    margin: '8px 16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonAndDescriptionContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '140%',
    color: '#ffffff',
    margin: '4px',
  },
  inputLabel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0px',
    background: '#c1ffed',
    borderRadius: '4px',
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '26px',
    letterSpacing: '0.46px',
    textTransform: 'capitalize',
    color: '#000000',
  },
  uploadInput: {
    visibility: 'hidden',
    display: 'none',
  },
  uploadPreviewWrapper: {
    margin: '8px 16p',
    minWidth: '260px',
    maxWidth: '345px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: '32px',
  },
  thumbnailContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  thumbnail: {
    flex: ' 0 0 25%',
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '8px',
    lineHeight: '140%',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    maxWidth: '48px',
    maxHeight: '48px',
    color: '#000000',
  },
  nameContainer: {
    flex: '0 0 70%',
    marginLeft: '8px',
  },
  name: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '20px',
    lineHeight: '140%',
    color: '#ffffff',
    margin: '0px',
  },
  fileName: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '140%',
    alignItems: 'center',
    color: colors.primary,
    margin: '0px',
    marginLeft: '5px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '12rem',
    display: 'inline-block',
  },
  fileNameContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  deleteButton: {
    all: 'unset',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: `1px solid ${colors.primary}`,
    borderRadius: '5px',
    height: '32px',
    width: '32px',
    paddingTop: '0.25rem',
  },
  saveButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '8px 22px',
    gap: '8px',
    width: '328px',
    height: '42px',
    background: colors.primary,
    boxShadow:
      '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)',
    borderRadius: '4px',
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '26px',
    letterSpacing: '0.46px',
    textTransform: 'capitalize',
    color: '#000000',
  },
  hr: {
    height: '1px',
    backgroundColor: 'white',
    border: 'none',
    margin: 0,
    marginTop: '32px',
  },
  uploadInputWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    marginBottom: '32px',
  },
  save: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '8px 22px',
    gap: '8px',
    width: '328px',
    background: `${colors.primary}`,
    boxShadow:
      '0px 3px 1px -2px rgba(0, 0, 0, 0.2),0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)',
    borderRadius: '4px',
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '26px',
    letterSpacing: '0.46px',
    textTransform: 'capitalize',
    color: '#000000',
  },
};

export const inputs = [
  {
    Logo: PosterIcon,
    name: 'Poster Image',
    type: 'image',
    description:
      'Required. Image used to display the drop in the timeline. Preferred Format: 1080px by 1920px, 9:16',
  },
  {
    Logo: EmbedIcon,
    name: 'Embed Image',
    type: 'image',
    description:
      'Recommended. Image used to represent the drops on social networks. Preferred Format: 800px by 418px, 1.91:1',
  },
  {
    Logo: TallVideoPosterIcon,
    name: 'Tall Video',
    type: 'video',
    description: 'Optional. Preferred Format: 9:16, 1080 x 1920 pixels',
  },
  {
    Logo: WideVideoPosterIcon,
    name: 'Wide Video',
    type: 'video',
    description: 'Optional. Preferred Format: 16:9, 1920 x 1080',
  },
  {
    Logo: FilePosterIcon,
    name: 'Custom File',
    type: 'file',
    description: 'Optional. e.g. HTML, JavaScript',
  },
];

export const ButtonAndDescription = ({
  files,
  name,
  description,
  handleFileChange,
}) => {
  const descriptionStyle = {
    ...styles.description,
    ...(files[name]
      ? { width: '100%', alignSelf: 'center' }
      : { width: '260px' }),
  };
  const inputLabelStyle = {
    ...styles.inputLabel,
    ...(files[name] ? { width: '100%' } : { width: '260px' }),
    ...(files[name] ? { minHeight: '42px' } : { height: '42px' }),
  };
  return (
    <div id="description" style={styles.buttonAndDescriptionContainer}>
      {files[name] && <p style={descriptionStyle}>{description}</p>}
      <label id="input-label" htmlFor={name} style={inputLabelStyle}>
        {files[name] ? 'Replace' : 'Upload'} {name}
      </label>
      <input
        id={name}
        onChange={(e) => handleFileChange(e, name)}
        style={styles.uploadInput}
        type="file"
      />
      {!files[name] && <p style={descriptionStyle}>{description}</p>}
    </div>
  );
};

export const MediaPreview = ({
  name,
  handleFileChange,
  handleDelete,
  files,
  description,
}) => (
  <div key={name} style={styles.uploadPreviewWrapper}>
    <ProgressBar
      aria-label="upload progress bar"
      style={{ alignSelf: 'center', marginBottom: '1rem', width: '100%' }}
      color={colors.primary}
      percentComplete={100}
    />
    <div style={styles.thumbnailContainer}>
      <Image
        id="thumbnail"
        style={styles.thumbnail}
        src={files[name].thumbnail}
        width={48}
        height={48}
        alt="Preview"
      />
      <div style={styles.nameContainer}>
        <p id="name" style={styles.name}>
          {name}
        </p>
        <div style={styles.fileNameContainer}>
          <CheckIcon color={colors.primary} size={16} />
          <p style={styles.fileName}>{files[name].name}</p>
        </div>
      </div>
      <button style={styles.deleteButton} onClick={() => handleDelete(name)}>
        <TrashIcon size={'20px'} color={colors.primary} />
      </button>
    </div>
    <ButtonAndDescription
      name={name}
      files={files}
      description={description}
      handleFileChange={handleFileChange}
    />
    <hr style={styles.hr} />
  </div>
);

const UploadInput = ({
  files,
  name,
  description,
  Logo,
  handleDelete,
  handleFileChange,
}) => {
  return (
    <div key={name} id="upload-input-wrapper" style={styles.uploadInputWrapper}>
      <Logo color={colors.primary} aria-label={`Upload ${name}`} />
      <ButtonAndDescription
        files={files}
        name={name}
        handleDelete={handleDelete}
        handleFileChange={handleFileChange}
        description={description}
      />
    </div>
  );
};

const UploadMedia = ({
  files: propFiles = {},
  onFileChange = () => {},
  onFileDelete = () => {},
  onSubmit = () => {},
}) => {
  const [files, setFiles] = useState(propFiles);
  const [mql, setMQL] = useState(true);

  const handleFileChange = (e, inputName) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (file.type.includes('image')) {
      // Handling images
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFiles((prev) => ({
          ...prev,
          [inputName]: {
            file: reader.result,
            name: file.name,
            thumbnail: reader.result,
          },
        }));
      };
    } else if (file.type.includes('video')) {
      // Handling videos
      reader.readAsArrayBuffer(file);
      reader.onloadend = function (e) {
        // The file reader gives us an ArrayBuffer:
        let buffer = e.target.result;
        // We have to convert the buffer to a blob:
        let videoBlob = new Blob([new Uint8Array(buffer)], {
          type: file.type,
        });

        // The blob gives us a URL to the video file:
        let url = window.URL.createObjectURL(videoBlob);
        // Generating Thumbnail
        const video = document.createElement('video');
        video.src = url;
        video.onloadedmetadata = () => {
          video.currentTime = 1; // Capture thumbnail at 1 second
        };
        video.onseeked = () => {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const thumbnail = canvas.toDataURL();
          setFiles((prev) => ({
            ...prev,
            [inputName]: {
              file: reader.result,
              name: file.name,
              url,
              thumbnail,
            },
          }));
        };
      };
    } else {
      // Handling HTML/Other files
      reader.readAsText(file);
      reader.onloadend = () => {
        setFiles((prev) => ({
          ...prev,
          [inputName]: {
            file: reader.result,
            name: file.name,
            thumbnail: '/images/file-uploaded.png',
          },
        }));
      };
    }

    onFileChange({
      file,
      name: inputName,
    });
  };

  const handleDelete = (inputName) => {
    setFiles((prev) => {
      const newState = { ...prev };
      delete newState[inputName];
      return newState;
    });
    onFileDelete({ name: inputName });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(files);
  };

  useIsomorphicLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      setMQL(window.matchMedia('(max-width: 600px)').matches);
    }
  });

  return (
    <div id="upload-media-wrapper" style={styles.uploadMediaWrapper}>
      <h1
        style={{
          ...styles.h1,
          alignSelf: mql ? 'flex-start' : 'center',
        }}
      >
        Upload Media
      </h1>
      {inputs.map(({ name, type, description, Logo }) => {
        return files[name] ? (
          <MediaPreview
            key={name}
            type={type}
            description={description}
            handleFileChange={handleFileChange}
            name={name}
            files={files}
            handleDelete={handleDelete}
          />
        ) : (
          <UploadInput
            key={name}
            name={name}
            description={description}
            Logo={Logo}
            files={files}
            handleDelete={handleDelete}
            handleFileChange={handleFileChange}
          />
        );
      })}
      <button onClick={handleSubmit} id="save" style={styles.save}>
        Save And Continue
      </button>
    </div>
  );
};

export default UploadMedia;
