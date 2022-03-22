import React from 'react';
import {useTranslation} from 'react-i18next';
import {SmallBox} from '../../components/elements';
import Main from '../../components/main/Main';
import {useDispatch, useSelector} from 'react-redux';
import Barcode from 'react-barcode';

const Dashboard = () => {
    const [t] = useTranslation();

    const students = useSelector((state) => state.students.students);
    const staffs = useSelector((state) => state.staffs.staffs);
    const carlines = useSelector((state) => state.carlines.carlines);
    const rooms = useSelector((state) => state.rooms.rooms);

    return (
        <Main>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-3 col-6">
                        <SmallBox
                            count={students.length}
                            title={t(
                                'administration.dashboard.topBoxes.totalStudents'
                            )}
                            type="info"
                            icon="ion-android-people"
                            navigateTo="/admin/students"
                        />
                    </div>
                    <div className="col-lg-3 col-6">
                        <SmallBox
                            count={staffs.length}
                            icon="ion-android-people"
                            title={t(
                                'administration.dashboard.topBoxes.totalStaffs'
                            )}
                            type="success"
                            navigateTo="/admin/staff"
                        />
                    </div>
                    <div className="col-lg-3 col-6">
                        <SmallBox
                            count={carlines.length}
                            icon="ion-ios-barcode-outline"
                            title={t(
                                'administration.dashboard.topBoxes.totalCarLines'
                            )}
                            type="warning"
                            navigateTo="/admin/carlines"
                        />
                    </div>
                    <div className="col-lg-3 col-6">
                        <SmallBox
                            count={rooms.length}
                            icon="ion-ios-monitor"
                            title={t(
                                'administration.dashboard.topBoxes.totalRooms'
                            )}
                            type="danger"
                            navigateTo="/admin/rooms"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="card col-6">
                        <div className="card-header">
                            <h3 className="card-title">Students</h3>
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Barcode</th>
                                </tr>
                            </thead>
                            <tbody>
                                { students.slice(0, 10).map((student) => (
                                    <tr key = {student.id}>
                                        <td>{student.firstName}</td>
                                        <td>{student.lastName}</td>
                                        <td>
                                            <Barcode value={student.barcodeNumber}/>
                                        </td>
                                    </tr>
                                ))} 
                            </tbody>
                            </table>
                        </div>
                        </div>
                    <div className="card col-6">
                        <div className="card-header">
                            <h3 className="card-title">Staffs</h3>
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {staffs.slice(0, 10).map((staff) => (
                                    <tr key={staff.id}>
                                        <td>{staff.firstName}</td>
                                        <td>{staff.lastName}</td>
                                    </tr>
                                ))} 
                            </tbody>
                            </table>
                        </div>
                        <div className="card-header">
                            <h3 className="card-title">Carlines</h3>
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {carlines.slice(0, 10).map((carline) => (
                                    <tr key = {carline.id}>
                                        <td>{carline.name}</td>
                                    </tr>
                                ))} 
                            </tbody>
                            </table>
                        </div>
                        <div className="card-header">
                            <h3 className="card-title">Rooms</h3>
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rooms.slice(0, 10).map((room) => (
                                    <tr key={room.id}>
                                        <td>{room.name}</td>
                                        <td>{room.description}</td>
                                    </tr>
                                ))} 
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Main>
    );
};

export default Dashboard;
