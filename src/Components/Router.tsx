import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CandidatesDashboard from '../Pages/CandidatesDashboard';
import HomePage from '../Pages/HomePage';
import JobsPage from '../Pages/JobsPage';

export default function Routing(){
    return (
        <Router>
          <Routes>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/jobs" element={<JobsPage></JobsPage>}></Route>
            <Route path="/candidatesdashboard/:id" element={<CandidatesDashboard></CandidatesDashboard>}></Route>
          </Routes>
        </Router>
      );
}