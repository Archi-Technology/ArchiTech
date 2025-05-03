import '@fontsource/heebo';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { UserProvider } from './contexts/userContext';
import { CanvasProvider } from './contexts/canvasContext';

ReactDOM.render(
  <GoogleOAuthProvider clientId='741551853471-kt4abhesdo765k380sf8guh3ani1tfd7.apps.googleusercontent.com'>
    {/* <React.StrictMode> */}
    <BrowserRouter>
      <UserProvider>
        <CanvasProvider>
          <App />
        </CanvasProvider>
      </UserProvider>
    </BrowserRouter>
    {/* </React.StrictMode> */}
  </GoogleOAuthProvider>
  ,
  document.getElementById('root')
);
