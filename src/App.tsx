import './App.css'
import MarginCalculatorPage from './pages/MarginCalculatorPage.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppTheme from '../shared-theme/AppTheme';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/nav-bar/Navbar.tsx';

function App() {
  const queryClient = new QueryClient();

  return (
    <AppTheme>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <MarginCalculatorPage/>
      </QueryClientProvider>
    </AppTheme>
  )
}

export default App
