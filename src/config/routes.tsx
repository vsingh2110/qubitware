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
import AdminTasks from '../pages/protected/admin/Tasks';
import AdminSettings from '../pages/protected/admin/Settings';

import CandidateDashboard from '../pages/protected/candidate/Dashboard';
import CandidateApplications from '../pages/protected/candidate/Applications';
import CandidateProfile from '../pages/protected/candidate/Profile';
import CandidateSettings from '../pages/protected/candidate/Settings';

import EmployeesIndex from '../pages/protected/admin/employees/index';
import EmployeeDetails from '../pages/protected/admin/employees/details';
import EmployeeCreate from '../pages/protected/admin/employees/create';
import EmployeeEdit from '../pages/protected/admin/employees/edit';
import EmployeeDocuments from '../pages/protected/admin/employees/documents';
import DepartmentsList from '../pages/protected/admin/employees/departments';

import UsersIndex from '../pages/protected/admin/users/UsersIndex';
import UserDetails from '../pages/protected/admin/users/details';
import UserCreate from '../pages/protected/admin/users/create';
import UserEdit from '../pages/protected/admin/users/edit';
import UserPermissions from '../pages/protected/admin/users/permissions';

import {
  ApplicantsIndex,
  ApplicantDetails,
  ApplicantCreate,
  ApplicantEdit,
  ApplicantResume,
  ApplicantStatus,
  ApplicantsSources
} from '../pages/protected/admin/applicants';

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
            <Route path="/admin/tasks" element={<AdminTasks />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/admin/employees" element={<EmployeesIndex />} />
            <Route path="/admin/employees/create" element={<EmployeeCreate />} />
            <Route path="/admin/employees/:id" element={<EmployeeDetails />} />
            <Route path="/admin/employees/:id/edit" element={<EmployeeEdit />} />
            <Route path="/admin/employees/:id/documents" element={<EmployeeDocuments />} />
            <Route path="/admin/employees/departments" element={<DepartmentsList />} />

            {/* Users Management */}
            <Route path="/admin/users" element={<UsersIndex />} />
            <Route path="/admin/users/create" element={<UserCreate />} />
            <Route path="/admin/users/:id" element={<UserDetails />} />
            <Route path="/admin/users/:id/edit" element={<UserEdit />} />
            <Route path="/admin/users/:id/permissions" element={<UserPermissions />} />

            {/* Applicants Management */}
            <Route path="/admin/applicants" element={<ApplicantsIndex />} />
            <Route path="/admin/applicants/create" element={<ApplicantCreate />} />
            <Route path="/admin/applicants/:id" element={<ApplicantDetails />} />
            <Route path="/admin/applicants/:id/edit" element={<ApplicantEdit />} />
            <Route path="/admin/applicants/:id/resume" element={<ApplicantResume />} />
            <Route path="/admin/applicants/:id/status" element={<ApplicantStatus />} />
            <Route path="/admin/applicants/sources" element={<ApplicantsSources />} />

            {/* Protected Candidate Routes */}
            <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
            <Route path="/candidate/applications" element={<CandidateApplications />} />
            <Route path="/candidate/profile" element={<CandidateProfile />} />
            <Route path="/candidate/settings" element={<CandidateSettings />} />
        </Routes>
    );
};

export default AppRoutes;
