import {useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import DataTable from 'react-data-table-component';
import Main from '../../../components/main/Main';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import {showConfirmDialog, hideConfirmDialog} from '../../../store/reducers/ui';
import {Dropdown} from '../../../components/elements';
import {deleteStaff} from '../../../store/reducers/staff'
import {Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'

const Staffs = ({props}) => {
    const dispatch = useDispatch();
    const staffs = useSelector((state) => state.staffs.staffs);
    const sortIcon = <i className="fas fa-angle-up"></i>;
    const [filterText, setFilterText] = useState('');
    const navigate = useNavigate()
    // const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    const addStaff = () => {
        navigate('/admin/staff/add');
    }

    const handleEdit = (row) => {
        console.log(`Edit => ${row.id}`);
        navigate('/admin/staff/' + row.id);
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
        dispatch(deleteStaff(row));
    };

    const ActionButton = ({row}) => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <div>    
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
        cell: (row) => <ActionButton row={row} />
    };

    let columns = !staffs.length
        ? []
        : Object.getOwnPropertyNames(staffs[0]).map((c) => ({
              name: c.toLocaleUpperCase(),
              selector: (row) => row[c],
              sortable: true
          }));
    columns = !columns.length ? [] : [...columns, ActionColumn];

    const filteredItems = staffs.filter(
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

    return (
        <Main>
            <div className="container-fluid">
                <div className="row">
                    <Button>
                        <i onClick={(e) => addStaff()} className="fa fa-plus">Add Staff</i>
                    </Button>
                    <DataTable
                        striped
                        subHeader
                        subHeaderComponent={subHeaderComponentMemo}
                        subHeaderAlign="right"
                        highlightOnHover
                        title="Staffs"
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

export default Staffs;
