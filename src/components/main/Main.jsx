import React, {useCallback, useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {toggleSidebarMenu} from '../../store/reducers/ui';
import {getProfile} from '../../services/AuthService';
import {loadUser, logoutUser} from '../../store/reducers/auth';
import {PageLoading} from '../elements';
import Header from './header/Header';
import MenuSidebar from './menu-sidebar/MenuSidebar';
import Footer from './footer/Footer';

const Main = ({children}) => {
    const dispatch = useDispatch();
    const isSidebarCollapsed = useSelector(
        (state) => state.ui.isSidebarCollapsed
    );
    const screenSize = useSelector((state) => state.ui.screenSize);
    const [isAppLoaded, setIsAppLoaded] = useState(false);

    const handleToggleSidebar = () => {
        dispatch(toggleSidebarMenu());
    };

    const loadProfile = async () => {
        try {
            const user = await getProfile();
            dispatch(loadUser(user));
        } catch (error) {
            dispatch(logoutUser());
        } finally {
            setIsAppLoaded(true);
        }
    };

    useEffect(() => {
        document.getElementById('root').classList.remove('register-page');
        document.getElementById('root').classList.remove('login-page');
        document.getElementById('root').classList.remove('hold-transition');

        document.getElementById('root').classList.add('sidebar-mini');
        document.getElementById('root').classList.add('layout-fixed');

        loadProfile();
        return () => {
            document.getElementById('root').classList.remove('sidebar-mini');
            document.getElementById('root').classList.remove('layout-fixed');
        };
    }, []);

    useEffect(() => {
        document.getElementById('root').classList.remove('sidebar-closed');
        document.getElementById('root').classList.remove('sidebar-collapse');
        document.getElementById('root').classList.remove('sidebar-open');
        if (isSidebarCollapsed && screenSize === 'lg') {
            document.getElementById('root').classList.add('sidebar-collapse');
        } else if (isSidebarCollapsed && screenSize === 'xs') {
            document.getElementById('root').classList.add('sidebar-open');
        } else if (!isSidebarCollapsed && screenSize !== 'lg') {
            document.getElementById('root').classList.add('sidebar-closed');
            document.getElementById('root').classList.add('sidebar-collapse');
        }
    }, [screenSize, isSidebarCollapsed]);

    const getAppTemplate = useCallback(() => {
        if (!isAppLoaded) {
            return <PageLoading />;
        }
        return (
            <>
                <Header toggleMenuSidebar={handleToggleSidebar} />
                <MenuSidebar />
                <div className="content-wrapper">
                    <div className="pt-3" />
                    <section className="content">{children}</section>
                </div>
                <Footer />
            </>
        );
    }, [isAppLoaded, children]);

    return <div className="wrapper">{getAppTemplate()}</div>;
};

export default Main;
