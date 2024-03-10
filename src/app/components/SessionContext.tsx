'use client';
import React, { createContext, useState } from 'react';

// Define el contexto de sesión
export const SessionContext = createContext<{
    session: null | undefined;
    setSession: React.Dispatch<React.SetStateAction<null | undefined>>;
}>({
    session: null,
    setSession: () => null,
});

// Componente proveedor de sesión
export const SessionProvider = ({ children }: any) => {
    // Estado para almacenar la sesión
    const [session, setSession] = useState<null | undefined>(null);

    return (
        <SessionContext.Provider value={{ session, setSession }}>
            {children}
        </SessionContext.Provider>
    );
};
