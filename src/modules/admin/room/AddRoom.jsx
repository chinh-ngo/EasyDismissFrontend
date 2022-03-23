import {useTranslation} from 'react-i18next';
import {useMemo, useState, useEffect} from 'react';
import Main from '../../../components/main/Main';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom'
import {createRoom} from '../../../store/reducers/rooms';
import {Input, Checkbox, Button} from '../../../components/elements';
import { faRestroom, faTextHeight, faSchool, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import {useFormik} from 'formik';
import * as Yup from 'yup';

const AddRoom = (props) => {

    const dispatch = useDispatch();
    const rooms = useSelector((state) => state.rooms.rooms);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const submitHandle = (name, description) => {
        var maxId = 0;
        
        for(var i = 0; i < rooms.length; i++)
        {
            if(rooms[i].id > maxId)
             maxId = rooms[i].id;
        }
        maxId++;

        const data = {
            id: maxId,
            name: name,
            description: description
        };

        dispatch(createRoom(data));
        navigate('/admin/rooms');
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Required'),
            description: Yup.string()
                .required('Required')
        }),
        onSubmit: (values) => {
            submitHandle(values.name, values.description);
        }
    });


    return (
        <Main>
            <div className="container-fluid">
                <div className="row text-center">
                    <h5 className="text-center display-4">Add Room</h5>
                </div>
                <div className="row">
                    <div className="card-body">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="mb-3">
                                <Input
                                    icon={faSchool}
                                    placeholder="Name"
                                    type="text"
                                    formik={formik}
                                    formikFieldProps={formik.getFieldProps('name')}
                                />
                            </div>
                            <div className="mb-3">
                                <Input
                                    icon={faAddressCard}
                                    placeholder="Description"
                                    type="text"
                                    formik={formik}
                                    formikFieldProps={formik.getFieldProps(
                                        'description'
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
                        {/* <div className="form-group">
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
                        </div> */}
                    </div>
                </div>
            </div>
        </Main>
    );
};

export default AddRoom;
