import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User } from '../../interfaces';
import { apiUsers } from '../../api';

interface UserContextType {
    user: User | null;
    updateUser: (id: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User | null>(null);
    const { getUserById } = apiUsers();

    const updateUser = async (id: string) => {
        const userData = await getUserById(id);
        setUser(userData);
    };

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within an UserProvider');
    }
    return context;
};
