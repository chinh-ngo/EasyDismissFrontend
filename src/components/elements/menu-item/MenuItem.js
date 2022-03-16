/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, {useEffect, useState} from 'react';
import {NavLink, useNavigate, useLocation} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

const MenuItem = ({menuItem}) => {
    const [t] = useTranslation();
    const [isMenuExtended, setIsMenuExtended] = useState(false);
    const [isExpandable, setIsExpandable] = useState(false);
    const [isMainActive, setIsMainActive] = useState(false);
    const [isOneOfChildrenActive, setIsOneOfChildrenActive] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // eslint-disable-next-line no-unused-vars
    const toggleMenu = () => {
        setIsMenuExtended(!isMenuExtended);
    };

    const handleMainMenuAction = () => {
        if (isExpandable) {
            toggleMenu();
            return;
        }
        navigate(menuItem.path);
    };

    const calculateIsActive = (url) => {
        setIsMainActive(false);
        setIsOneOfChildrenActive(false);
        if (isExpandable) {
            menuItem.children.forEach((item) => {
                if (item.path === url) {
                    setIsOneOfChildrenActive(true);
                    setIsMenuExtended(true);
                }
            });
        } else if (menuItem.path === url) {
            setIsMainActive(true);
        }
    };

    useEffect(() => {
        if (!isMainActive && !isOneOfChildrenActive) {
            setIsMenuExtended(false);
        }
    }, [isMainActive, isOneOfChildrenActive]);

    useEffect(() => {
        setIsExpandable(
            menuItem && menuItem.children && menuItem.children.length > 0
        );
    }, [menuItem]);

    useEffect(() => {
        calculateIsActive(location.pathname);
        // return location.listen((loc) => {
        //     calculateIsActive(loc.pathname);
        // });
    }, [navigate, isExpandable, menuItem]);

    return (
        <li className={`nav-item${isMenuExtended ? ' menu-open' : ''}`}>
            <a
                className={`nav-link${
                    isMainActive || isOneOfChildrenActive ? ' active' : ''
                }`}
                role="link"
                onClick={handleMainMenuAction}
                style={{cursor: 'pointer'}}
            >
                <i className={`nav-icon ${menuItem.icon}`} />
                <p>{t(menuItem.name)}</p>
                {isExpandable ? (
                    <i className="right fas fa-angle-left" />
                ) : null}
            </a>

            {isExpandable &&
                menuItem.children.map((item) => (
                    <ul key={item.name} className="nav nav-treeview">
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                exact="true"
                                to={`${item.path}`}
                            >
                                <i className={`${item.icon} nav-icon`} />
                                <p>{t(item.name)}</p>
                            </NavLink>
                        </li>
                    </ul>
                ))}
        </li>
    );
};

export default MenuItem;
