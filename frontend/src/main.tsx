import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from "react-router";
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts';
import 'sweetalert2/dist/sweetalert2.js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProvider from './context/AuthContext.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Không fetch lại dữ liệu khi người dùng chuyển tab
    }
  }
})

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </AuthProvider>
  </Provider>,
)
