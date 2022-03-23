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
    const sortIcon = <i className="fas fa-angle-up"></i>;
    const [filterText, setFilterText] = useState('');

    const BarcodeColumn = {
        name: 'Barcode'.toLocaleUpperCase(),
        sortable: false,
        selector: (row) => row.id,
        cell: (row) => <Barcode value = {row.barcodeNumber} />
    };

    const FirstNameColumn = {
        name: 'FirstName'.toLocaleUpperCase(),
        sortable: true,
        selector: (row) => row.firstName,

    }
    const LastNameColumn = {
        name: 'LastName'.toLocaleUpperCase(),
        sortable: true,
        selector: (row) => row.lastName,
    }

    let columns = !students.length ? [] : [FirstNameColumn, LastNameColumn, BarcodeColumn];

    const filteredItems = students.filter(
        (item) =>
            (item.firstName &&
                item.firstName
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.lastName &&
                item.lastName
                    .toLowerCase()
                    .includes(filterText.toLowerCase()))
    );

    const subHeaderComponentMemo = useMemo(() => {
    
        return (
            <input
                style={{width: "300px"}}
                className="form-control"
                onChange={(e) => setFilterText(e.target.value)}
                placeholder="Search..."
            />
        );
    }, [filterText]);


    console.log(students);
    return (

        <Main>
            <div className="container-fluid">
                <div className="row">
                    <DataTable
                        striped
                        subHeader
                        subHeaderComponent={subHeaderComponentMemo}
                        subHeaderAlign="right"
                        highlightOnHover
                        title="Barcodes"
                        fixedHeader
                        fixedHeaderScrollHeight="700px"
                        pagination
                        selectableRows
                        sortIcon={sortIcon}
                        columns={columns}
                        data={filteredItems}
                    />
                {/* <div className="card col-12">
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
                    </div> */}
                </div>
            </div>
        </Main>
    );
};

export default Barcodes;
