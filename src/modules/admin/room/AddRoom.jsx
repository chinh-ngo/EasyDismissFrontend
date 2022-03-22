import {useTranslation} from 'react-i18next';
import {useMemo, useState, useEffect} from 'react';
import Main from '../../../components/main/Main';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import {createRoom} from '../../../store/reducers/rooms';

const AddRoom = (props) => {

    const dispatch = useDispatch();
    const rooms = useSelector((state) => state.rooms.rooms);
    const navigate = useNavigate();

    const initialRoomState = {
        id: null,
        name: "",
        description: ""
    };

    const [room, setRoom] = useState(initialRoomState);

    const submitHandle = (e) => {
        var maxId = 0;
        
        for(var i = 0; i < rooms.length; i++)
        {
            if(rooms[i].id > maxId)
             maxId = rooms[i].id;
        }
        maxId++;

        const data = {
            id: maxId,
            name: room.name,
            description: room.description
        };

        dispatch(createRoom(data));
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
                    <h5 className="text-center display-4">Add Room</h5>
                </div>
                <div className="row">
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="firstName">Name</label>
                            <input type="text" className="form-control" value={room.name} onChange={handleInputChange} name="name" required placeholder="Enter Name"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Description</label>
                            <input type="text" className="form-control" value={room.description} onChange={handleInputChange} name="description" required placeholder="Enter Description"></input>
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

export default AddRoom;
