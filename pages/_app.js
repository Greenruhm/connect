import '../styles/globals.css';
import connect from '../src';

connect({
  apiKey: '<your-api-key>',
});

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
