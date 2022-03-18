import {useTranslation} from 'react-i18next';
import {useMemo, useState} from 'react';
import Main from '../../../components/main/Main';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import {createStudent} from '../../../store/reducers/students';

const AddStudent = ({props}) => {
    const [t] = useTranslation();
    const dispatch = useDispatch();
    const students = useSelector((state) => state.students.students);
    const navigate = useNavigate();

    const initialStudentState = {
        id: null,
        firstName: "",
        lastName: "",
        classroom:"",
        homeroomTeacher: ""
    };
    
    const [student, setStudent] = useState(initialStudentState);


    const submitHandle = (e) => {
        const data = {
            firstName: student.firstName,
            lastName: student.lastName,
            classroom: student.classroom,
            homeroomTeacher: student.homeroomTeacher,
        };

        dispatch(createStudent(data));
        navigate('/admin/students');
    }

    const handleInputChange = event => {
        const { name, value } = event.target;
        setStudent({ ...student, [name]: value });
    };

    return (
        <Main>
            <div className="container-fluid">
                <div className="row text-center">
                    <h5 className="text-center display-4">Add Student</h5>
                </div>
                <div className="row">
                    <div className="card-body">
                        <div className="form-group">
                            <label for="firstName">First Name</label>
                            <input type="text" className="form-control" value={student.firstName} onChange={handleInputChange} name="firstName" required placeholder="Enter email"></input>
                        </div>
                        <div className="form-group">
                            <label for="lastName">last Name</label>
                            <input type="text" className="form-control" value={student.lastName} onChange={handleInputChange} name="lastName" required placeholder="Enter Password"></input>
                        </div>
                        <div className="form-group">
                            <label for="classroom">ClassName</label>
                            <input type="text" className="form-control" value={student.classroom} onChange={handleInputChange} name="classroom" required placeholder="Enter ClassName"></input>
                        </div>
                        <div className="form-group">
                            <label for="homeroomTeacher">homeroomTeacher</label>
                            <input type="text" className="form-control" value={student.homeroomTeacher} onChange={handleInputChange} name="homeroomTeacher" required placeholder="Enter homeroomTeacher"></input>
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

export default AddStudent;
