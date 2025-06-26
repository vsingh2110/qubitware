import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const useProtectedRoute = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login'); // Redirect to login if not authenticated
        }
    }, [isAuthenticated, navigate]);
};

export default useProtectedRoute;