import React from 'react';
import Main from '../../components/main/Main';
import {Button} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import {useMemo, useState} from 'react';
import StudentCard from '../../components/StudentCard/StudentCard';
import { useEffect } from 'react';
import {HubConnectionBuilder} from '@microsoft/signalr';
import {createDispatchedStudent} from '../../store/reducers/dispatchedstudents';

const Home = ({props}) => {

    const dispatch = useDispatch();
    const dispatchedstudents = useSelector((state) => state.dispatchedstudents.dispatchedstudents);
    const rooms = useSelector((state) => state.rooms.rooms);
    
    const [room, setRoom] = useState("");
    const [isUpdate, setIsUpdate] = useState(false);
    const [connection, setConnection] = useState(null);

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
                                .withUrl("http://localhost:7220/room")
                                .withAutomaticReconnect()
                                .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
          connection
            .start()
            .then((result) => {
              connection.on("broadcastStudent", (data) => {
                dispatch(createDispatchedStudent(data));
              });
            })
            .catch((e) => console.log("Connection failed: ", e));
        }
    }, [connection]);

    useEffect(() => {
        if(!isUpdate){
            setRoom(rooms[0].name);
            setIsUpdate(true)
        }
    })

    const handleSelectChange = (e) =>{
        var selectedroom = e.target.value;
        setRoom(selectedroom);
    }

    return (
        
        <Main>
            <div className="container-fluid">

                <div className="row">
                    <div className="form-group">
                        <select className="form-control form-control-lg" onChange={(e) => handleSelectChange(e)}>
                            {
                                rooms.map((room) => (
                                    <option value={room.name} key={room.id}>{room.name}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>    
                <div className="row">
                        
                        {
                            dispatchedstudents.filter(student=>student.room===room)
                                    .map((student, i) =>{
                                        return(    
                                            <div className="col-4" key={student.id}>
                                                <StudentCard  student={student}/>
                                            </div>
                                            )
                            })
                        }
                        
                </div>
                 
            </div>
        </Main>
    );
};

export default Home;
