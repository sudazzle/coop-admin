import { ColorModeScript } from '@chakra-ui/react';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import { AppRoutes } from './AppRoutes';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider, theme, ThemeProvider, CSSReset } from '@chakra-ui/react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const container = document.getElementById("root")
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container)
const queryClient = new QueryClient()

root.render(
  <React.StrictMode>
    <ColorModeScript />
    <Auth0Provider
    
    
      domain={process.env.REACT_APP_AUTH0_DOMAIN || 'dev-ju0zj0ic.us.auth0.com'}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID || '3dIilDSbjSh6QDMAryDxR3HvHKdDQ4Lc'}
      authorizationParams={{
        redirect_uri: window.location.origin,
        scope: 'openid profile email read:stores write:stores',
        audience: process.env.REACT_APP_AUTH0_AUDIENCE || 'https://coop-api-gateway',
      }}
      cacheLocation="localstorage"
    >
      <ChakraProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <CSSReset />
          <QueryClientProvider client={queryClient}>
            <AppRoutes />
          </QueryClientProvider>
        </ThemeProvider>
      </ChakraProvider>
    </Auth0Provider>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()


