import React, { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../../context';

interface PrivateRouteProps {
    children: ReactNode;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
