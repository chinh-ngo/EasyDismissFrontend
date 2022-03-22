import React from 'react';
import Main from '../../components/main/Main';
import {Button} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import {useMemo, useState} from 'react';
import StudentCard from '../../components/StudentCard/StudentCard';

const Home = ({props}) => {

    const dispatch = useDispatch();
    const dispatchedstudents = useSelector((state) => state.dispatchedstudents.dispatchedstudents);
    const rooms = useSelector((state) => state.rooms.rooms);
    
    const [room, setRoom] = useState("");
    const [studentsbyroom, setStudentsbyroom] = useState([]);

    const handleSelectChange = (e) =>{
        setRoom(e.target.value);
        var sts = dispatchedstudents.filter((item) => item.room === room);
        console.log(sts);
        setStudentsbyroom(sts);
    }

    return (
        <Main>
            <div className="container-fluid">

                <div className="row">
                    <div className="form-group">
                        <select className="form-control form-control-lg" onChange={(e) => handleSelectChange(e)}>
                            {
                                rooms.map((room) => (
                                    <option value={room.name}>{room.name}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>    
                <div className="row">
                        
                        {
                            studentsbyroom.map((student) => (
                                <div className="col-md-3">
                                    <StudentCard student={student}/>
                                </div>
                            ))
                        }
                        
                </div>
                 
            </div>
        </Main>
    );
};

export default Home;
