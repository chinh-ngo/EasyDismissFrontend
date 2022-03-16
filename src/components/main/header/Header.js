import React from 'react';
import Messages from './messages-dropdown/MessagesDropdown';
import Notifications from './notifications-dropdown/NotificationsDropdown';
import Languages from './languages-dropdown/LanguagesDropdown';
import User from './user-dropdown/UserDropdown';

const Header = ({toggleMenuSidebar}) => {
    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            {/* Left navbar links */}
            <ul className="navbar-nav">
                <li className="nav-item">
                    <button
                        onClick={() => toggleMenuSidebar()}
                        type="button"
                        className="nav-link"
                    >
                        <i className="fas fa-bars" />
                    </button>
                </li>
            </ul>
            <ul className="navbar-nav ml-auto">
                <Messages />
                <Notifications />
                <Languages />
                <User />
            </ul>
        </nav>
    );
};

export default Header;
