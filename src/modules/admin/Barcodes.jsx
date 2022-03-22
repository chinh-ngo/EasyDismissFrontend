import {useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import DataTable from 'react-data-table-component';
import Main from '../../components/main/Main';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import {showConfirmDialog, hideConfirmDialog} from '../../store/reducers/ui';
import {deleteStudent, generateBarcode} from '../../store/reducers/students';
import {Dropdown} from '../../components/elements';
import {Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import Barcode from 'react-barcode';

const Barcodes = (props) => {
    const dispatch = useDispatch();
    const students = useSelector((state) => state.students.students);

    console.log(students);
    return (

        <Main>
            <div className="container-fluid">
                <div className="row">
                <div className="card col-12">
                    <div className="card-header">
                        <h3 className="card-title">Bordered Table</h3>
                    </div>
                    <div className="card-body">
                        <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Barcode</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.id}>
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
                    <div className="card-footer clearfix">
                        <ul className="pagination pagination-sm m-0 float-right">
                        <li className="page-item"><a className="page-link" href="#">&laquo;</a></li>
                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item"><a className="page-link" href="#">&raquo;</a></li>
                        </ul>
                    </div>
                    </div>
                </div>
            </div>
        </Main>
    );
};

export default Barcodes;
