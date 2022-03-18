import {useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import DataTable from 'react-data-table-component';
import Main from '../../../components/main/Main';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import {showConfirmDialog, hideConfirmDialog} from '../../../store/reducers/ui';
import {Dropdown} from '../../../components/elements';
import {deleteRoom} from '../../../store/reducers/rooms';
import {Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'


const Rooms = ({props}) => {
    const [t] = useTranslation();
    const dispatch = useDispatch();
    const rooms = useSelector((state) => state.rooms.rooms);
    const sortIcon = <i className="fas fa-angle-up"></i>;
    const [filterText, setFilterText] = useState('');
    const navigate = useNavigate();
    // const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    const addRoom = () => {
        navigate('/admin/rooms/add');
    }

    const handleEdit = (row) => {
        console.log(`Edit => ${row.id}`);
        navigate('/admin/rooms/' + row.id);
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
        dispatch(deleteRoom(row));
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
                        <li onClick={(e) => handleEdit(row)}><i className='fa fa-edit'></i>Edit</li>
                        <li onClick={(e) => handleDelete(row)}><i className='fa fa-trash'></i>Delete</li>
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

    let columns = !rooms.length
        ? []
        : Object.getOwnPropertyNames(rooms[0]).map((c) => ({
              name: c.toLocaleUpperCase(),
              selector: (row) => row[c],
              sortable: true
          }));
    columns = !columns.length ? [] : [...columns, ActionColumn];

    const filteredItems = rooms.filter(
        (item) =>
            (item.name &&
                item.name
                    .toLowerCase()
                    .includes(filterText.toLowerCase())) ||
            (item.description &&
                item.description
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
                        <i onClick={(e) => addRoom()} className="fa fa-plus">Add Room</i>
                    </Button>
                    <DataTable
                        striped
                        subHeader
                        subHeaderComponent={subHeaderComponentMemo}
                        subHeaderAlign="right"
                        highlightOnHover
                        title="Rooms"
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

export default Rooms;
