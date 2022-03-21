import React from 'react';
import Main from '../../components/main/Main';
import {Button} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import {useMemo, useState} from 'react';
import StudentCard from '../../components/StudentCard/StudentCard';

const Home = ({props}) => {

    const dispatch = useDispatch();
    const dispatchedstudents = useSelector((state) => state.dispatchedstudents.dispatchedstudents);
    return (
        <Main>
            <div className="container-fluid">
                {
                    <div className="row">
                            {
                                dispatchedstudents.map((student) => (
                                    <div className="col-3">
                                        <StudentCard student={student}/>
                                    </div>
                                ))
                            }
                    </div>
                 
                 }
            </div>
        </Main>
    );
};

export default Home;
