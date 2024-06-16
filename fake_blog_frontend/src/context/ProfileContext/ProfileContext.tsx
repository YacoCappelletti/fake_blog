import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User } from '../../interfaces';
import { apiUsers } from '../../api';
import { useAuth } from '../index';

interface ProfileContextType {
    profile: User | null;
    updateProfile: () => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [profile, setProfile] = useState<User | null>(null);
    const { user, isAuthenticated } = useAuth();
    const { getUserById } = apiUsers();

    const updateProfile = async () => {
        if (isAuthenticated && user != null) {
            const userData = await getUserById(user?.id.toString());
            setProfile(userData);
        }
    };

    return (
        <ProfileContext.Provider value={{ profile, updateProfile }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = (): ProfileContextType => {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error('useProfile must be used within an ProfileProvider');
    }
    return context;
};
