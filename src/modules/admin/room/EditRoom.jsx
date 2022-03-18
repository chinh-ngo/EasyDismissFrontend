import {useTranslation} from 'react-i18next';
import {useMemo, useState, useEffect} from 'react';
import Main from '../../../components/main/Main';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import {updateRoom} from '../../../store/reducers/rooms';

const EditRoom = (props) => {

    const {id} = useParams();

    const dispatch = useDispatch();
    const rooms = useSelector((state) => state.rooms.rooms);
    const navigate = useNavigate();

    const [room, setRoom] = useState({});

    const getRoom = id => {
        const st = rooms.filter((item) => (item.id == id));
        setRoom(st[0]);
    }

    useEffect(() => {
        getRoom(id);
    });

    const updateHandle = (e) => {
        const data = {
            id: id,
            name: room.name,
            description: room.description
        };

        dispatch(updateRoom(data));
        navigate('/admin/rooms');
    }

    const handleInputChange = event => {
        const { name, value } = event.target;
        setRoom({ ...room, [name]: value });
    };

    return (
        <Main>
            <div className="container-fluid">
                <div className="row text-center">
                    <h5 className="text-center display-4">Edit Room</h5>
                </div>
                <div className="row">
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" value={room.name} onChange={handleInputChange} name="name" required placeholder="Enter email"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Description</label>
                            <input type="text" className="form-control" value={room.description} onChange={handleInputChange} name="description" required placeholder="Enter Password"></input>
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

export default EditRoom;
