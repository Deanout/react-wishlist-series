import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AppBar from './app/features/appbar/AppBar';
import Dashboard from './app/features/dashboard/Dashboard';
import PrivateRoute from './app/features/routes/PrivateRoute';
import PersistLogin from './app/features/sessions/PersistLogin';

function App() {
  return (
    <div className="App">
      <Router>
      <header className="App-header">
        <AppBar />
      </header>
      <main>
        <Routes>
          <Route element={<PersistLogin />}>
            <Route path="/" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
          </Route>
        </Routes>
      </main>
      </Router>
    </div>
  );
}

export default App;
