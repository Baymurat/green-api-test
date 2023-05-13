import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from '@pages/login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LoginPage />}>
          App
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
