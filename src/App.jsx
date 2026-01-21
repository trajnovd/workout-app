import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import CalendarPage from './pages/Calendar';
import Home from './pages/Home';
import WorkoutView from './pages/WorkoutView';

function App() {
  return (
    <BrowserRouter>
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
