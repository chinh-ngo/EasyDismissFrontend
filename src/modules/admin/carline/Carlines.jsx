import {useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import DataTable from 'react-data-table-component';
import Main from '../../../components/main/Main';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import {showConfirmDialog, hideConfirmDialog} from '../../../store/reducers/ui';
import {Dropdown} from '../../../components/elements';
import {deleteCarline} from '../../../store/reducers/carlines';
import {Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'


const Carlines = ({props}) => {
    const [t] = useTranslation();
    const dispatch = useDispatch();
    const carlines = useSelector((state) => state.carlines.carlines);
    const sortIcon = <i className="fas fa-angle-up"></i>;
    const [filterText, setFilterText] = useState('');
    const navigate = useNavigate();
    // const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    const addCarline = () => {
        navigate('/admin/carlines/add');
    }

    const handleEdit = (row) => {
        console.log(`Edit => ${row.id}`);
        navigate('/admin/carlines' + row.id);
    };

    const handleDelete = (row) => {
        console.log(`Delete => ${row.id}`);
        dispatch(
            showConfirmDialog({
                message: `${row.name}  will be deleted. This operation cannot be undone. Do you want to continue?`,
                confirmAction: () => deleteConfirmed(row),
                cancelAction: () => dispatch(hideConfirmDialog())
            })
        );
    };

    const deleteConfirmed = (row) => {
        toast.info(`${row.name} has been deleted successfully!`);
        dispatch(hideConfirmDialog());
        dispatch(deleteCarline(row));
    };

    const ActionButton = ({row}) => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <Dropdown
                isOpen={isOpen}
                menuContainerTag="ul"
                size="sm"
                buttonTemplate="Actions"
                menuTemplate={
                    <>
                        <li onClick={(e) => handleEdit(row)}>Edit</li>
                        <li onClick={(e) => handleDelete(row)}>Delete</li>
                    </>
                }
                className="user-menu"
            />
        );
    };

    const ActionColumn = {
        name: 'Actions'.toLocaleUpperCase(),
        sortable: false,
        selector: (row) => row.id,
        button: true,
        cell: (row) => <ActionButton row={row} />
    };

    let columns = !carlines.length
        ? []
        : Object.getOwnPropertyNames(carlines[0]).map((c) => ({
              name: c.toLocaleUpperCase(),
              selector: (row) => row[c],
              sortable: true
          }));
    columns = !columns.length ? [] : [...columns, ActionColumn];

    const filteredItems = carlines.filter(
        (item) =>
            (item.name &&
                item.name
                    .toLowerCase()
                    .includes(filterText.toLowerCase()))
    );

    const subHeaderComponentMemo = useMemo(() => {
        // const handleClear = () => {
        //     if (filterText) {
        //         setResetPaginationToggle(!resetPaginationToggle);
        //         setFilterText('');
        //     }
        // };

        return (
            <input
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
                        <i onClick={(e) => addCarline()} className="fa fa-plus">Add Carline</i>
                    </Button>
                    <DataTable
                        striped
                        subHeader
                        subHeaderComponent={subHeaderComponentMemo}
                        subHeaderAlign="right"
                        highlightOnHover
                        title="Carlines"
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

export default Carlines;
