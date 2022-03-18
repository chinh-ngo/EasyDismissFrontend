import {useTranslation} from 'react-i18next';
import {useMemo, useState, useEffect} from 'react';
import Main from '../../../components/main/Main';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import {createStaff} from '../../../store/reducers/staff';

const AddStaff = (props) => {

    const dispatch = useDispatch();
    const students = useSelector((state) => state.staffs.staffs);
    const navigate = useNavigate();

    const initialStaffState = {
        id: null,
        firstName: "",
        lastName: ""
    };

    const [staff, setStaff] = useState(initialStaffState);

    const submitHandle = (e) => {
        const data = {
            firstName: staff.firstName,
            lastName: staff.lastName
        };

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
                            <label for="firstName">First Name</label>
                            <input type="text" className="form-control" value={staff.firstName} onChange={handleInputChange} name="firstName" required placeholder="Enter email"></input>
                        </div>
                        <div className="form-group">
                            <label for="lastName">last Name</label>
                            <input type="text" className="form-control" value={staff.lastName} onChange={handleInputChange} name="lastName" required placeholder="Enter Password"></input>
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
