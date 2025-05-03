import '@fontsource/heebo';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { UserProvider } from './contexts/userContext';

ReactDOM.render(
  <GoogleOAuthProvider clientId='741551853471-kt4abhesdo765k380sf8guh3ani1tfd7.apps.googleusercontent.com'>
    {/* <React.StrictMode> */}
    <BrowserRouter>
      <UserProvider>

          <App />

      </UserProvider>
    </BrowserRouter>
    {/* </React.StrictMode> */}
  </GoogleOAuthProvider>
  ,
  document.getElementById('root')
);
