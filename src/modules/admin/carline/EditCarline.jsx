import {useTranslation} from 'react-i18next';
import {useMemo, useState, useEffect} from 'react';
import Main from '../../../components/main/Main';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import {updateCarline} from '../../../store/reducers/carlines';

const EditCarline = (props) => {

    const {id} = useParams();

    const dispatch = useDispatch();
    const carlines = useSelector((state) => state.carlines.carlines);
    const navigate = useNavigate();

    const [carline, setCarline] = useState({});
    const [isUpdate, setIsUpdate] = useState(false);

    const getCarline = id => {
        const st = carlines.filter((item) => (item.id == id));
        setCarline(st[0]);
    }

    useEffect(() => {
        if(!isUpdate)
        {
            getCarline(id);
            setIsUpdate(true);
        }
    });

    const updateHandle = (e) => {
        const data = {
            id: id,
            name: carline.name,
            isActive: carline.isActive
        };

        dispatch(updateCarline(data));
        navigate('/admin/carlines');
    }

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCarline({ ...carline, [name]: value });
    };

    return (
        <Main>
            <div className="container-fluid">
                <div className="row text-center">
                    <h5 className="text-center display-4">Edit Carline</h5>
                </div>
                <div className="row">
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" value={carline.name} onChange={handleInputChange} name="name" required placeholder="Enter email"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">isActive</label>
                            <select className="form-control" value={carline.isActive} onChange={handleInputChange} name="isActive">
                                <option value="Active">Active</option>
                                <option value="InActive">InActive</option>
                            </select>
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

export default EditCarline;
