import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from '@pages/login';
import PrivateRoutLayout from '@components/layout/PrivateRoutLayout';
import { AuthContextProvier } from '@context/AuthContextProvider';

function App() {
  return (
    <AuthContextProvier>
      <Router>
        <Routes>
          <Route path='/' element={<PrivateRoutLayout />}>
            <Route path='/whats-app' element={<>WHATS APP PAGE</>} />
          </Route>
          <Route path='/login' element={<LoginPage />}>
            App
          </Route>
        </Routes>
      </Router>
    </AuthContextProvier>
  );
}

export default App;
