import React from 'react';

const Footer = () => {
    return (
        <footer className="footer text-center">
            <div className="container">
                <p>&copy; {new Date().getFullYear()} DiliGuard. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
