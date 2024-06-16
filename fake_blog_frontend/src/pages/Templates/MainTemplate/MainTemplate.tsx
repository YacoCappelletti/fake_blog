import React, { ReactNode } from 'react';
import { Navbar, Footer } from '../../../components/index';

interface MainTemplateProps {
    children: ReactNode;
}

const MainTemplate: React.FC<MainTemplateProps> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar></Navbar>
            <div className="flex flex-col min-h-screen">{children}</div>
            <Footer></Footer>
        </div>
    );
};

export default MainTemplate;
