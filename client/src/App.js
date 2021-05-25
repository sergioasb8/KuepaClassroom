import './App.css';
import axios from 'axios';
import { Router } from './routes/Router';
import { AuthContextProvider } from './context/AuthContext';

axios.defaults.withCredentials = true;

function App() {
    return (
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    );
}

export default App;
