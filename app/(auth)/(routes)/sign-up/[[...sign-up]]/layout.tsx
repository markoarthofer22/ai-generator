import React from 'react';

interface IAuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout = ({ children }: IAuthLayoutProps) => {
    return <div className="flex items-center justify-center h-full">{children}</div>;
};

export default AuthLayout;
