import React from 'react';
import Main from '../../components/main/Main';
import {Button} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import {useMemo, useState} from 'react';
import StudentCard from '../../components/StudentCard/StudentCard';
import {signalR} from '@microsoft/signalr';


const Home = ({props}) => {

    const dispatch = useDispatch();
    const students = useSelector((state) => state.students.students);
    const [student, setStudent] = useState({});
    const [filterText, setFilterText] = useState('');
    const filterStudents = students.filter(
        (item) => (item.firstName &&
                    item.firstName
                        .toLowerCase() == (filterText.toLowerCase()))||
                (item.lastName &&
                    item.lastName
                        .toLowerCase() == (filterText.toLowerCase()))||
                (item.barcodeNumber &&
                    item.barcodeNumber
                        .toLowerCase() == (filterText.toLowerCase()))                
    );

    let columns = !students.length
        ? []
        : Object.getOwnPropertyNames(students[0]).map((c) => ({
              name: c.toLocaleUpperCase(),
              selector: (row) => row[c],
              sortable: true
          }));


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
            setStudent(filterStudents[0]);
        else
            setStudent({});
    }
    return (
        <Main>
            <div className="container-fluid">
                <h2 className="text-center display-4">Dispatch</h2>
                <div className="row" style={{marginBottom: 30}}>
                    <div className="col-md-8 offset-md-2">
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
                    student.firstName ?
                    <div className="row">
                        <div className="col-4"></div>
                        <div className="col-4">
                            <StudentCard student={student}/>
                        </div>
                        <div className="col-4"></div>
                    </div>
                    : 
                        <p>
                            
                        </p>
                }
            </div>
        </Main>
    );
};

export default Home;
