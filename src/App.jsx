import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import CalendarPage from './pages/Calendar';
import Home from './pages/Home';
import WorkoutView from './pages/WorkoutView';

function RedirectHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const search = location.search;
    if (search.startsWith('?/')) {
      const path = search.slice(2).replace(/~and~/g, '&');
      navigate(path, { replace: true });
    }
  }, [location, navigate]);

  return null;
}

function App() {
  return (
    <BrowserRouter basename="/workout-app">
      <RedirectHandler />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workout/:id" element={<WorkoutView />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
