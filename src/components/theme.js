const brandColor = '#49ecbd';
const darkBackground = '#0A0C1F';
const darkBackgroundLighter = '#2C2F4A';
const lightBackground = '#f1f1f7';

const black = '#000';
const magicMint = '#97F2D8';
const white = '#FFF';
const selectedBackground = '#1a659e';

const Theme = {
  modalBackground: '#000000cc',
  primary: '#0A0C1F',
  secondary: '#5AE6C1',

  button: '#49ECBD',
  buttonDisabled: {
    opacity: 0.5,
  },
  edgeSize: {
    none: '0px',
    hair: '1px',
    xxsmall: '4px',
    xsmall: '6px',
    small: '12px',
    mediumSmall: '18px',
    medium: '24px',
    large: '48px',
    xlarge: '96px',
    responsiveBreakpoint: 'small',
  },
  colors: {
    brand: brandColor,
    dark: {
      text: {
        primary: white,
        lowContrast: '#cecece',
        faded: '#666',
        secondary: magicMint,
        secondaryLowContrast: brandColor,
        secondaryFaded: '#33a584',
      },
    },
    light: {
      text: {
        primary: black,
      },
    },
    primary: darkBackground,
    primary900: '#0A0036',
    primary800: '#11154B',
    primary700: '#191D57',
    primary600: '#212561',
    primary500: '#1E1676',
    primary400: '#43477C',
    primary300: '#616591',
    primary200: '#8B8FB0',
    primary100: '#B8BBD0',
    primary50: '#E3E4EB',
    primary25: lightBackground,

    secondary: magicMint,

    secondary900: '#006E40',
    secondary800: '#008C5D',
    secondary700: '#009C6B',
    secondary600: '#00AE7B',

    secondary400: '#00CA99',
    secondary300: '#0ED7AA',
    secondary200: '#5AE6C1',
    secondary100: magicMint,
    secondary50: '#D6FBF1',
    secondary25: '#EDF6F3',

    red: 'rgb(255, 58, 82)',
    red60: 'rgba(255, 58, 82, .8)',
    green: magicMint,
    white,
    black,
    darkBackgroundLighter,

    selected: selectedBackground,
    'selected-background': selectedBackground,
    'selected-text': white,

    'accent-1': '#9AC7BA',

    'background-back': {
      dark: black,
      light: white,
    },
    'background-front': {
      dark: darkBackground,
      light: lightBackground,
    },
  },
};

export default Theme;
