import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

// 👉 Import Toaster
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      {/* 👉 Tambahkan Toaster di luar App */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#92400E', // oranye coklat khas lokal
            color: '#fff',
            fontFamily: 'serif',
            borderRadius: '12px',
            padding: '12px 16px',
            fontSize: '14px',
          },
          success: {
            iconTheme: {
              primary: '#FBBF24', // kuning keemasan
              secondary: '#92400E',
            },
          },
        }}
      />
    </BrowserRouter>
  </StrictMode>
)
