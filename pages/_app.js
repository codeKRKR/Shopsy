import { wrapper } from '../store';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default wrapper.withRedux(MyApp);


// Limitations :
// 1. There is no user Authentication/verification.
// 2. No error retry mechanism for failed API requests.
// 3. The UI is basic and can be made much better.
// 4. Search functionality is limited to product title and descriptiom only.