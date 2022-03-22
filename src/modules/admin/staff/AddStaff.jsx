import {useTranslation} from 'react-i18next';
import {useMemo, useState, useEffect} from 'react';
import Main from '../../../components/main/Main';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import {createStaff} from '../../../store/reducers/staff';

const AddStaff = (props) => {

    const dispatch = useDispatch();
    const rooms = useSelector((state) => state.rooms.rooms);
    const staffs = useSelector((state) => state.staffs.staffs);
    const navigate = useNavigate();

    const initialStaffState = {
        id: null,
        firstName: "",
        lastName: "",
        email: "",
        role: ""
    };

    const [staff, setStaff] = useState(initialStaffState);

    const submitHandle = (e) => {
        var maxId = 0;
        
        for(var i = 0; i < staffs.length; i++)
        {
            if(staffs[i].id > maxId)
             maxId = staffs[i].id;
        }
        maxId++;

        const data = {
            id: maxId,
            firstName: staff.firstName,
            lastName: staff.lastName,
            email: staff.email,
            role: staff.role
        };

        console.log(data);

        dispatch(createStaff(data));
        navigate('/admin/staff');
    }

    const handleInputChange = event => {
        const { name, value } = event.target;
        setStaff({ ...staff, [name]: value });
    };

    return (
        <Main>
            <div className="container-fluid">
                <div className="row text-center">
                    <h5 className="text-center display-4">Add Staff</h5>
                </div>
                <div className="row">
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" className="form-control" value={staff.firstName} onChange={handleInputChange} name="firstName" required placeholder="Enter FirstName"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" className="form-control" value={staff.lastName} onChange={handleInputChange} name="lastName" required placeholder="Enter LastName"></input>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="lastName">Email</label>
                            <input type="email" className="form-control" value={staff.email} onChange={handleInputChange} name="email" required placeholder="Enter Email"></input>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="lastName">Role</label>
                            <select className="form-control" value={staff.role} name="role" onChange={handleInputChange}>
                                <option value="admin">Admin</option>
                                <option value="staff">Staff</option>
                                <option value="teacher">Teacher</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <Button onClick={(e) => submitHandle()}>
                                <i className="fa fa-plus"> Submit</i>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Main>
    );
};

export default AddStaff;
