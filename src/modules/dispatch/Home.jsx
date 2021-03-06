import React from 'react';
import Main from '../../components/main/Main';
import {Button} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import {useMemo, useState, useEffect} from 'react';
import StudentCard from '../../components/StudentCard/StudentCard';
import {toast} from 'react-toastify';
import {createDispatchedStudent} from '../../store/reducers/dispatchedstudents';
import {HubConnectionBuilder} from '@microsoft/signalr';
import AppSetting from '../../AppSetting';

const Home = ({props}) => {

    const dispatch = useDispatch();
    const students = useSelector((state) => state.students.students);
    const rooms = useSelector((state) => state.rooms.rooms);
    const dispatchedStudents = useSelector((state) => state.dispatchedstudents.dispatchedstudents);

    const [student, setStudent] = useState({});
    const [filterText, setFilterText] = useState(rooms[0].name);
    const [room, setRoom] = useState('');
    const [studentsbyroom, setStudentsbyroom] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [connection, setConnection] = useState(null);

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
                                .withUrl(AppSetting.serverBaseUrl + "/room")
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

    const sendDispatchedStudent = async(data) => {

        // if (connection.connectionStarted) {
            try {
              await connection.invoke("SendStudentData", data);
            } catch (e) {
              console.log(e);
            }
        //   } else {
            // alert("No connection to server yet.");
        //   }
    }

    useEffect(() => {
        if(!isUpdate){
            setRoom(rooms[0].name);
            setIsUpdate(true)
        }
    });

    const handleSelectChange = (e) =>{
        var selectedRoom = e.target.value;
        setRoom(selectedRoom);
    }

    const getStudent = () =>{
        var filterStudents = students.filter(
            (item) => (item.firstName &&
                        item.firstName
                            .toLowerCase()==(filterText.toLowerCase()))||
                            (item.lastName &&
                                item.lastName
                                    .toLowerCase()==(filterText.toLowerCase()))||
                            (item.barcodeNumber &&
                                item.barcodeNumber
                                    .toLowerCase()==(filterText.toLowerCase())));

        if(filterStudents.length>0)   
        {
            var maxId = 0;
        
            for(var i = 0; i < dispatchedStudents.length; i++)
            {
                if(dispatchedStudents[i].id > maxId)
                    maxId = dispatchedStudents[i].id;
            }

            maxId++;

            const data = {
                id: maxId,
                firstName: filterStudents[0].firstName,
                lastName: filterStudents[0].lastName,
                classroom: filterStudents[0].classroom,
                homeroomTeacher: filterStudents[0].homeroomTeacher,
                barcodeNumber: filterStudents[0].barcodeNumber,
                room: room
            };

            sendDispatchedStudent(data);
    
            // dispatch(createDispatchedStudent(data));

        }
        else
        {
            toast.error(`NOT FOUND`);
        }
            
    }
    return (
        <Main>
            <div className="container-fluid">
                <h2 className="text-center display-4">Dispatch</h2>
                <div className="row" style={{marginBottom: 30}}>
                    <div className="col-md-4">
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
                    <div className="col-md-8">
                        <div className="input-group">
                        <input type="search" onChange={(e) => setFilterText(e.target.value)} onKeyPress={(e) => {if (e.key === 'Enter') getStudent()} }  className="form-control form-control-lg" placeholder="Type your keywords here"></input>
                            <div className="input-group-append">
                                <Button onClick={(e) => getStudent()}>
                                    <i className="fa fa-search"></i>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    <div className="row">
                        {
                            dispatchedStudents.filter(student=>student.room===room)
                                    .map((student, i) =>{
                                        return(    
                                            <div className="col-4" key={student.id}>
                                                <StudentCard  student={student}/>
                                            </div>
                                            )
                            })
                        }                        
                    </div>
                 }
            </div>
        </Main>
    );
};

export default Home;
