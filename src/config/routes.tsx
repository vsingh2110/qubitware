import { Route, Routes } from 'react-router-dom';

// Import public pages
import Home from '../pages/public/Home';
import RequestQuote from '../pages/public/RequestQuote';
import Login from '../pages/public/Login';
import Register from '../pages/public/Register';
import JobSearch from '../pages/public/JobSearch';
import JobApply from '../pages/public/JobApply';
import Profile from '../pages/public/Profile';

// Import protected pages
import AdminDashboard from '../pages/protected/admin/Dashboard';
import AdminJobs from '../pages/protected/admin/Jobs';
import AdminCandidates from '../pages/protected/admin/Candidates';
import AdminInterviews from '../pages/protected/admin/Interviews';
import AdminAnalytics from '../pages/protected/admin/Analytics';
import AdminReports from '../pages/protected/admin/Reports';
import AdminEmployees from '../pages/protected/admin/Employees';
import AdminTasks from '../pages/protected/admin/Tasks';
import AdminSettings from '../pages/protected/admin/Settings';

import CandidateDashboard from '../pages/protected/candidate/Dashboard';
import CandidateApplications from '../pages/protected/candidate/Applications';
import CandidateProfile from '../pages/protected/candidate/Profile';
import CandidateSettings from '../pages/protected/candidate/Settings';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/request-quote" element={<RequestQuote />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/job-search" element={<JobSearch />} />
            <Route path="/job-apply" element={<JobApply />} />
            <Route path="/profile" element={<Profile />} />

            {/* Protected Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/jobs" element={<AdminJobs />} />
            <Route path="/admin/candidates" element={<AdminCandidates />} />
            <Route path="/admin/interviews" element={<AdminInterviews />} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
            <Route path="/admin/reports" element={<AdminReports />} />
            <Route path="/admin/employees" element={<AdminEmployees />} />
            <Route path="/admin/tasks" element={<AdminTasks />} />
            <Route path="/admin/settings" element={<AdminSettings />} />

            {/* Protected Candidate Routes */}
            <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
            <Route path="/candidate/applications" element={<CandidateApplications />} />
            <Route path="/candidate/profile" element={<CandidateProfile />} />
            <Route path="/candidate/settings" element={<CandidateSettings />} />
        </Routes>
    );
};

export default AppRoutes;
