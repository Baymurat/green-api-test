import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import LoginPage from '@pages/login';
import PrivateRoutLayout from '@components/layout/PrivateRoutLayout';
import { AuthContextProvier } from '@context/AuthContextProvider';
import ErrorPage404 from '@pages/error404';
import WhatsApp from '@pages/whats-app';
import { Provider as ReduxProvider } from "react-redux";
import { store } from '@redux/store';
import './reset.css'

function App() {
  return (
    <AuthContextProvier>
      <ReduxProvider store={store}>
        <Router>
          <Routes>
            <Route path='/' element={<PrivateRoutLayout />}>
              <Route index element={<Navigate to={'/whats-app'} replace />} />
              <Route path='/whats-app' element={<WhatsApp />} />
            </Route>
            <Route path='/login' element={<LoginPage />} />
            <Route path='*' element={<ErrorPage404 />} />
          </Routes>
        </Router>
      </ReduxProvider>
    </AuthContextProvier>
  );
}

export default App;
