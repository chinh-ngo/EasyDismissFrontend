import {useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {useWindowSize} from './utils/useWindowSize';
import {calculateWindowSize} from './utils/helpers';
import {setWindowSize} from './store/reducers/ui';
import PrivateRoute from './routes/PrivateRoute';
import Login from './components/login/Login';
import Dashboard from './modules/admin/Dashboard';
import Students from './modules/admin/Students';
import Staff from './modules/admin/Staff';
import Rooms from './modules/admin/Rooms';
import Carlines from './modules/admin/Carlines';
import ConfirmDialog from './components/ConfirmDialog/ConfirmDialog';

function App() {
    const windowSize = useWindowSize();
    const screenSize = useSelector((state) => state.ui.screenSize);
    const dispatch = useDispatch();

    useEffect(() => {
        const size = calculateWindowSize(windowSize.width);
        if (screenSize !== size) dispatch(setWindowSize());
        // eslint-disable-next-line
    }, [windowSize]);

    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/admin" element={<PrivateRoute />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="students" element={<Students />} />
                    <Route path="staff" element={<Staff />} />
                    <Route path="rooms" element={<Rooms />} />
                    <Route path="carlines" element={<Carlines />} />
                </Route>
            </Routes>
            <ConfirmDialog />
        </Router>
    );
}

export default App;