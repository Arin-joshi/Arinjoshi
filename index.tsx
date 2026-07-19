import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext';
import { AudioProvider } from './contexts/AudioContext';
import { DataProvider } from './contexts/DataContext';

// Clean up Google search text fragments from URL
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    if (window.location.hash && window.location.hash.includes(':~:')) {
      // Remove text fragment from URL without causing page reload
      const cleanHash = window.location.hash.split(':~:')[0];
      window.history.replaceState({}, document.title, cleanHash || window.location.pathname);
    }
  });
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <AudioProvider>
        <DataProvider>
          <App />
        </DataProvider>
      </AudioProvider>
    </ThemeProvider>
  </React.StrictMode>
);