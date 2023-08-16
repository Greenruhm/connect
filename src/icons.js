import React from 'react';
import PropTypes from 'prop-types';

export const TrashIcon = ({
  className = '',
  color = '#49ecbd',
  fill = 'transparent',
  size = '24px',
}) => (
  <div className={`trash-icon ${className}`}>
    <svg
      width={size}
      height={size}
      viewBox="0 0 41 47"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.90216 42.0811C2.90216 43.2356 3.3608 44.3429 4.17719 45.1593C4.99358 45.9757 6.10085 46.4343 7.2554 46.4343H33.3748C34.5294 46.4343 35.6366 45.9757 36.453 45.1593C37.2694 44.3429 37.7281 43.2356 37.7281 42.0811V11.6084H2.90216V42.0811ZM27.5705 18.8638C27.5705 18.479 27.7234 18.1099 27.9955 17.8377C28.2677 17.5656 28.6367 17.4127 29.0216 17.4127C29.4064 17.4127 29.7755 17.5656 30.0477 17.8377C30.3198 18.1099 30.4727 18.479 30.4727 18.8638V39.1789C30.4727 39.5638 30.3198 39.9329 30.0477 40.205C29.7755 40.4771 29.4064 40.63 29.0216 40.63C28.6367 40.63 28.2677 40.4771 27.9955 40.205C27.7234 39.9329 27.5705 39.5638 27.5705 39.1789V18.8638ZM18.864 18.8638C18.864 18.479 19.0169 18.1099 19.289 17.8377C19.5612 17.5656 19.9303 17.4127 20.3151 17.4127C20.7 17.4127 21.0691 17.5656 21.3412 17.8377C21.6133 18.1099 21.7662 18.479 21.7662 18.8638V39.1789C21.7662 39.5638 21.6133 39.9329 21.3412 40.205C21.0691 40.4771 20.7 40.63 20.3151 40.63C19.9303 40.63 19.5612 40.4771 19.289 40.205C19.0169 39.9329 18.864 39.5638 18.864 39.1789V18.8638ZM10.1576 18.8638C10.1576 18.479 10.3104 18.1099 10.5826 17.8377C10.8547 17.5656 11.2238 17.4127 11.6086 17.4127C11.9935 17.4127 12.3626 17.5656 12.6347 17.8377C12.9068 18.1099 13.0597 18.479 13.0597 18.8638V39.1789C13.0597 39.5638 12.9068 39.9329 12.6347 40.205C12.3626 40.4771 11.9935 40.63 11.6086 40.63C11.2238 40.63 10.8547 40.4771 10.5826 40.205C10.3104 39.9329 10.1576 39.5638 10.1576 39.1789V18.8638ZM39.1791 2.90193H28.2961L27.4435 1.20598C27.263 0.843406 26.9848 0.538415 26.6403 0.32532C26.2958 0.112225 25.8987 -0.000518754 25.4937 -0.00022824H15.1275C14.7234 -0.00178185 14.327 0.110542 13.9837 0.323874C13.6404 0.537206 13.3642 0.842917 13.1867 1.20598L12.3342 2.90193H1.45108C1.06623 2.90193 0.697142 3.05481 0.425011 3.32694C0.152881 3.59907 0 3.96816 0 4.35301L0 7.25517C0 7.64002 0.152881 8.00911 0.425011 8.28124C0.697142 8.55337 1.06623 8.70625 1.45108 8.70625H39.1791C39.564 8.70625 39.9331 8.55337 40.2052 8.28124C40.4773 8.00911 40.6302 7.64002 40.6302 7.25517V4.35301C40.6302 3.96816 40.4773 3.59907 40.2052 3.32694C39.9331 3.05481 39.564 2.90193 39.1791 2.90193Z"
        fill={color}
      />
    </svg>
  </div>
);
TrashIcon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  fill: PropTypes.string,
  size: PropTypes.string,
};

export const CheckIcon = ({ color = 'white', className = '', size = 16 }) => (
  <div className={`check-icon ${className}`}>
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 0C3.582 0 0 3.582 0 8C0 12.418 3.582 16 8 16C12.418 16 16 12.418 16 8C16 3.582 12.418 0 8 0ZM12.4713 6.47133L7.43133 11.5113C7.306 11.6367 7.13667 11.7067 6.96 11.7067C6.78333 11.7067 6.61333 11.6367 6.48867 11.5113L4.18667 9.20933C3.926 8.94867 3.926 8.52733 4.18667 8.26667C4.44733 8.006 4.86867 8.006 5.12933 8.26667L6.96 10.0973L11.5287 5.52867C11.7893 5.268 12.2107 5.268 12.4713 5.52867C12.732 5.78933 12.732 6.21067 12.4713 6.47133Z"
        fill={color}
      />
    </svg>
  </div>
);
CheckIcon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
};
export const PosterIcon = ({
  color = 'white',
  className = '',
  height = '106.67',
  width = '60',
}) => (
  <div className={`poster-icon ${className}`}>
    <svg
      width={parseInt(width, 10) + 1}
      height={parseInt(height, 10) + 1}
      viewBox={`0 0 ${parseInt(width, 10) + 2} ${parseInt(height, 10) + 2}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" y="0.5" width={width} height={height} stroke={color} />
    </svg>
  </div>
);
PosterIcon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
};
export const EmbedIcon = ({
  color = 'white',
  className = '',
  height = '31.41',
  width = '60',
}) => (
  <div className={`embed-icon ${className}`}>
    <svg
      width={parseInt(width, 10) + 1}
      height={parseInt(height, 10) + 1}
      viewBox={`0 0 ${parseInt(width, 10) + 2} ${parseInt(height, 10) + 2}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" y="0.5" width={width} height={height} stroke={color} />
    </svg>
  </div>
);
EmbedIcon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
};

export const TallVideoPosterIcon = ({
  color = 'white',
  className = '',
  width = '60',
  height = '107',
}) => (
  <div className={`tall-video-poster-icon ${className}`}>
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M38 52.5L26.75 46.0048V58.9952L38 52.5Z" fill={color} />
      <rect x="0.5" y="0.5" width="59" height="105.667" stroke={color} />
    </svg>
  </div>
);
TallVideoPosterIcon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
};

export const WideVideoPosterIcon = ({
  color = 'white',
  className = '',
  width = '60',
  height = '34',
}) => (
  <div className={`wide-video-poster-icon ${className}`}>
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.5"
        y="33.25"
        width="32.75"
        height="59"
        transform="rotate(-90 0.5 33.25)"
        stroke={color}
      />
      <path d="M35 17L27.5 12.6699V21.3301L35 17Z" fill={color} />
    </svg>
  </div>
);
WideVideoPosterIcon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
};
export const FilePosterIcon = ({
  color = 'white',
  className = '',
  height = '84',
  width = '60',
}) => (
  <div className={`file-poster-icon ${className}`}>
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M59.5 21.2071V83.5H0.5V0.5H38.7929L59.5 21.2071Z"
        stroke={color}
      />
    </svg>
  </div>
);

FilePosterIcon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
};
