import {useTranslation} from 'react-i18next';
import {useMemo, useState, useEffect} from 'react';
import Main from '../../../components/main/Main';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import {updateStaff} from '../../../store/reducers/staff';

const EditStaff = (props) => {

    const {id} = useParams();

    const dispatch = useDispatch();
    const staffs = useSelector((state) => state.staffs.staffs);
    const navigate = useNavigate();

    const [staff, setStaff] = useState({});
    const [isUpdate, setIsUpdate] = useState(false);

    const getStaff = id => {
        const st = staffs.filter((item) => (item.id == id));
        setStaff(st[0]);
    }

    useEffect(() => {
        if(!isUpdate){
            getStaff(id);
            setIsUpdate(true);
        }
    });

    const updateHandle = (e) => {
        const data = {
            id: id,
            firstName: staff.firstName,
            lastName: staff.lastName,
            classroom: staff.classroom,
            homeroomTeacher: staff.homeroomTeacher,
        };

        dispatch(updateStaff(data));
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
                    <h5 className="text-center display-4">Edit Staff</h5>
                </div>
                <div className="row">
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" className="form-control" value={staff.firstName} onChange={handleInputChange} name="firstName" required placeholder="Enter FirstName"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">last Name</label>
                            <input type="text" className="form-control" value={staff.lastName} onChange={handleInputChange} name="lastName" required placeholder="Enter LastName"></input>
                        </div>
                        <div className="form-group">
                            <Button onClick={(e) => updateHandle()}>
                                <i className="fa fa-plus"> Update</i>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Main>
    );
};

export default EditStaff;
