import {useTranslation} from 'react-i18next';
import {useMemo, useState, useEffect} from 'react';
import Main from '../../../components/main/Main';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom'
import {Input, Checkbox, Button} from '../../../components/elements';
import {useFormik} from 'formik';
import {createStudent} from '../../../store/reducers/students';
import {faEnvelope, faUser, faLock, faUsers, faHouseUser} from '@fortawesome/free-solid-svg-icons';

import * as Yup from 'yup';

const AddStudent = (props) => {

    const [t] = useTranslation();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const students = useSelector((state) => state.students.students);
    const navigate = useNavigate();

    const submitHandle = (firstName, lastName, classroom, homeroomTeacher) => {
        var maxId = 0;
        
        for(var i = 0; i < students.length; i++)
        {
            if(students[i].id > maxId)
             maxId = students[i].id;
        }
        maxId++;

        var randomBarcode = Math.floor(Math.random() * 10000) + 10000;
        randomBarcode = randomBarcode.toString();

        const data = {
            id: maxId,
            firstName: firstName,
            lastName: lastName,
            classroom: classroom,
            homeroomTeacher: homeroomTeacher,
            barcodeNumber: randomBarcode 
        };

        dispatch(createStudent(data));
        navigate('/admin/students');
    }

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            classroom: '',
            homeroomTeacher: ''
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .required('Required'),
            lastName: Yup.string()
                .required('Required'),
            classroom: Yup.string()
                .required('Required'),
            homeroomTeacher: Yup.string()
                .required('Required'),
            
        }),
        onSubmit: (values) => {
            submitHandle(values.firstName, values.lastName, values.classroom, values.homeroomTeacher);
        }
    });

    return (
        <Main>
            <div className="container-fluid">
                <div className="row text-center">
                    <h5 className="text-center display-4">Add Student</h5>
                </div>
                <div className="row">
                    <div className="card-body">

                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-3">
                            <Input
                                icon={faUser}
                                placeholder="FirstName"
                                type="text"
                                formik={formik}
                                formikFieldProps={formik.getFieldProps('firstName')}
                            />
                        </div>
                        <div className="mb-3">
                            <Input
                                icon={faUser}
                                placeholder="LastName"
                                type="text"
                                formik={formik}
                                formikFieldProps={formik.getFieldProps(
                                    'lastName'
                                )}
                            />
                        </div>

                        <div className="mb-3">
                            <Input
                                icon={faUsers}
                                placeholder="Classroom"
                                type="text"
                                formik={formik}
                                formikFieldProps={formik.getFieldProps(
                                    'classroom'
                                )}
                            />
                        </div>

                        <div className="mb-3">
                            <Input
                                icon={faHouseUser}
                                placeholder="HomeroomTeacher"
                                type="text"
                                formik={formik}
                                formikFieldProps={formik.getFieldProps(
                                    'homeroomTeacher'
                                )}
                            />
                        </div>


                        <div className="row">
                                <Button
                                    block="true"
                                    type="submit"
                                    isLoading={isLoading}
                                >
                                    Submit
                                </Button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </Main>
    );
};

export default AddStudent;
