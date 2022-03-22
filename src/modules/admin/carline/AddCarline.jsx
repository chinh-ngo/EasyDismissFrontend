import {useTranslation} from 'react-i18next';
import {useMemo, useState, useEffect} from 'react';
import Main from '../../../components/main/Main';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import {createCarline} from '../../../store/reducers/carlines';

const AddCarline = (props) => {

    const dispatch = useDispatch();
    const carlines = useSelector((state) => state.carlines.carlines);
    const navigate = useNavigate();

    const initialCarlineState = {
        id: null,
        name: "",
        isActive: ""
    };

    const [carline, setCarline] = useState(initialCarlineState);

    const submitHandle = (e) => {
        var maxId = 0;
        
        for(var i = 0; i < carlines.length; i++)
        {
            if(carlines[i].id > maxId)
             maxId = carlines[i].id;
        }
        maxId++;

        const data = {
            id: maxId,
            name: carline.name,
            isActive: carline.isActive
        };

        dispatch(createCarline(data));
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
                    <h5 className="text-center display-4">Add Carline</h5>
                </div>
                <div className="row">
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="firstName">Name</label>
                            <input type="text" className="form-control" value={carline.name} onChange={handleInputChange} name="name" required placeholder="Enter Name"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">IsActive</label>
                            <input type="text" className="form-control" value={carline.isActive} onChange={handleInputChange} name="isActive" required placeholder="Enter isActive"></input>
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

export default AddCarline;
