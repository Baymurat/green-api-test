import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from '@pages/login';
import PrivateRoutLayout from '@components/layout/PrivateRoutLayout';
import { AuthContextProvier } from '@context/AuthContextProvider';
import ErrorPage404 from '@pages/error404';
import WhatsApp from '@pages/whats-app';
import './reset.css'

function App() {
  return (
    <AuthContextProvier>
      <Router>
        <Routes>
          <Route path='/' element={<PrivateRoutLayout />}>
            <Route path='/whats-app' element={<WhatsApp />} />
          </Route>
          <Route path='/login' element={<LoginPage />} />
          <Route path='*' element={<ErrorPage404 />} />
        </Routes>
      </Router>
    </AuthContextProvier>
  );
}

export default App;
