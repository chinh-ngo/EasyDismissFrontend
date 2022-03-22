import {useTranslation} from 'react-i18next';
import {useMemo, useState, useEffect} from 'react';
import Main from '../../../components/main/Main';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import {updateStudent} from '../../../store/reducers/students';

const EditStudent = (props) => {

    const {id} = useParams();

    const dispatch = useDispatch();
    const students = useSelector((state) => state.students.students);
    const navigate = useNavigate();

    const [student, setStudent] = useState({});
    const [isUpdate, setIsUpdate] = useState(false);

    const getStudent = id => {
        const st = students.filter((item) => (item.id == id));
        setStudent(st[0]);
    }

    useEffect(() => {
        if(!isUpdate){
            getStudent(id);
            setIsUpdate(true);
        }
    });

    const updateHandle = (e) => {
        const data = {
            id: id,
            firstName: student.firstName,
            lastName: student.lastName,
            classroom: student.classroom,
            homeroomTeacher: student.homeroomTeacher,
            barcodeNumber: student.barcodeNumber
        };

        dispatch(updateStudent(data));
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
                    <h5 className="text-center display-4">Edit Student</h5>
                </div>
                <div className="row">
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" className="form-control" value={student.firstName} onChange={handleInputChange} name="firstName" required placeholder="Enter email"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">last Name</label>
                            <input type="text" className="form-control" value={student.lastName} onChange={handleInputChange} name="lastName" required placeholder="Enter Password"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="classroom">ClassName</label>
                            <input type="text" className="form-control" value={student.classroom} onChange={handleInputChange} name="classroom" required placeholder="Enter ClassName"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="homeroomTeacher">homeroomTeacher</label>
                            <input type="text" className="form-control" value={student.homeroomTeacher} onChange={handleInputChange} name="homeroomTeacher" required placeholder="Enter homeroomTeacher"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="barcodeNumber">BarcodeNumber</label>
                            <input type="text" className="form-control" value={student.barcodeNumber} onChange={handleInputChange} name="barcodeNumber" required placeholder="Enter homeroomTeacher"></input>
                        </div>
                        <div className="form-group">
                            <Button onClick={(e) => updateHandle()}>
                                <i className="fa fa-plus"> Submit</i>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Main>
    );
};

export default EditStudent;
