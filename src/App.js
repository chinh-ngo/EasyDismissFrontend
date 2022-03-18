import {useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {useWindowSize} from './utils/useWindowSize';
import {calculateWindowSize} from './utils/helpers';
import {setWindowSize} from './store/reducers/ui';
import PrivateRoute from './routes/PrivateRoute';
import Login from './components/login/Login';
import Dashboard from './modules/admin/Dashboard';
import Home from './modules/dispatch/Home';
import Students from './modules/admin/student/Students';
import AddStudent from './modules/admin/student/AddStudent';
import Staff from './modules/admin/staff/Staff';
import AddStaff from './modules/admin/staff/AddStaff';
import Rooms from './modules/admin/room/Rooms';
import AddRoom from './modules/admin/room/AddRoom';
import Carlines from './modules/admin/carline/Carlines';
import ConfirmDialog from './components/ConfirmDialog/ConfirmDialog';
import EditStudent from './modules/admin/student/EditStudent';
import EditStaff from './modules/admin/staff/EditStaff';
import EditRoom from './modules/admin/room/EditRoom';
import EditCarline from './modules/admin/carline/EditCarline';
import AddCarline from './modules/admin/carline/AddCarline';

function App() {
    const windowSize = useWindowSize();
    const screenSize = useSelector((state) => state.ui.screenSize);
    const dispatch = useDispatch();

    useEffect(() => {
        const size  = calculateWindowSize(windowSize.width);
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

                    <Route exact path="students" element={<Students/>}/>
                    <Route exact path="students/add" element={<AddStudent />} />
                    <Route exact path="students/:id" element={<EditStudent />} />
                    
                    <Route path="staff" element={<Staff />} />      
                    <Route path="staff/add" element={<AddStaff />} />
                    <Route exact path="staff/:id" element={<EditStaff />} />

                    <Route path="rooms" element={<Rooms />} />
                    <Route path="rooms/add" element={<AddRoom />} />
                    <Route exact path="rooms/:id" element={<EditRoom />} />

                    <Route path="carlines" element={<Carlines />} />
                    <Route path="carlines/add" element={<AddCarline />} />
                    <Route path="carlines/:id" element={<EditCarline />} />
                </Route>
                <Route exact path="/dispatch" element={<PrivateRoute />}>
                    <Route path="home" element={<Home />} />
                </Route>
            </Routes>
            <ConfirmDialog />
        </Router>
    );
}

export default App;
