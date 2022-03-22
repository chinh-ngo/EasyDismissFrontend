import {useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import DataTable from 'react-data-table-component';
import Main from '../../../components/main/Main';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import {showConfirmDialog, hideConfirmDialog} from '../../../store/reducers/ui';
import {deleteStudent, generateBarcode} from '../../../store/reducers/students';
import {Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'

const Students = (props) => {
    const [t] = useTranslation();
    const dispatch = useDispatch();
    const students = useSelector((state) => state.students.students);
    const sortIcon = <i className="fas fa-angle-up"></i>;
    const [filterText, setFilterText] = useState('');
    const navigate = useNavigate();

    const addStudent = () => {
        navigate('/admin/students/add');
    }

    const handleEdit = (row) => {
        console.log(`Edit => ${row.id}`);
        navigate('/admin/students/' + row.id);
    };

    const handleGenerateBarcode = (row) => {
        console.log(`Edit => ${row.barcodeNumber}`);
        var randomBarcode = Math.floor(Math.random() * 10000) + 10000;
        randomBarcode = randomBarcode.toString();
        row = {...row, barcodeNumber:randomBarcode};
        dispatch(generateBarcode(row));
    };

    const handleDelete = (row) => {
        console.log(`Delete => ${row.id}`);
        dispatch(
            showConfirmDialog({
                message: `${row.firstName} ${row.lastName} will be deleted. This operation cannot be undone. Do you want to continue?`,
                confirmAction: () => deleteConfirmed(row),
                cancelAction: () => dispatch(hideConfirmDialog())
            })
        );
    };

    const deleteConfirmed = (row) => {
        toast.info(`${row.firstName} has been deleted successfully!`);
        dispatch(hideConfirmDialog());
        dispatch(deleteStudent(row));
    };

    const ActionButton = ({row}) => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <div>    
                <a className="btn btn-primary btn-sm" onClick={ (e) => handleGenerateBarcode(row)}>
                    <i className="fas fa-barcode">
                    </i>
                </a>
                <a className="btn btn-info btn-sm" onClick={ (e) => handleEdit(row)}>
                    <i className="fas fa-pencil-alt">
                    </i>
                </a>
                <a className="btn btn-danger btn-sm" onClick={ (e) => handleDelete(row) }>
                    <i className="fas fa-trash">
                    </i>
                </a>    
            </div>
        );
    };

    const ActionColumn = {
        name: 'Actions'.toLocaleUpperCase(),
        sortable: false,
        selector: (row) => row.id,
        button: true,

        cell: (row) => <ActionButton row={row}/>
    };

    let columns = !students.length
        ? []
        : Object.getOwnPropertyNames(students[0]).map((c) => ({
              name: c.toLocaleUpperCase(),
              selector: (row) => row[c],
              sortable: true
          }));
    columns = !columns.length ? [] : [...columns, ActionColumn];

    const filteredItems = students.filter(
        (item) =>
            (item.firstName &&
                item.firstName
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.lastName &&
                item.lastName
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.classroom &&
                item.classroom
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.homeroomTeacher &&
                item.homeroomTeacher
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

    return (
        <Main>
            <div className="container-fluid">
                <div className="row">
                    <Button>
                        <i onClick={(e) => addStudent()} className="fa fa-plus">Add Student</i>
                    </Button>

                    <DataTable
                        striped
                        subHeader
                        subHeaderComponent={subHeaderComponentMemo}
                        subHeaderAlign="right"
                        highlightOnHover
                        title="Students"
                        fixedHeader
                        fixedHeaderScrollHeight="700px"
                        pagination
                        selectableRows
                        sortIcon={sortIcon}
                        columns={columns}
                        data={filteredItems}
                    />
                </div>
            </div>
        </Main>
    );
};

export default Students;
