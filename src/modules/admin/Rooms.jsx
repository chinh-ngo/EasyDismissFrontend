import {useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import DataTable from 'react-data-table-component';
import Main from '../../components/main/Main';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import {showConfirmDialog, hideConfirmDialog} from '../../store/reducers/ui';
import {Dropdown} from '../../components/elements';

const ActionButton = ({row}) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Dropdown
            isOpen={isOpen}
            menuContainerTag="ul"
            size="sm"
            buttonTemplate="..."
            menuTemplate={
                <>
                    {/* <li>
                        <a href="#">Edit</a>
                        <a href="#">Edit</a>
                        <a href="#">Edit</a>
                    </li> */}
                    <li>Edit</li>
                    <li>Delete</li>
                    <li>Generate Barcode</li>
                </>
            }
            className="user-menu"
        />
    );
};

const Rooms = ({props}) => {
    const [t] = useTranslation();
    const dispatch = useDispatch();
    const rooms = useSelector((state) => state.rooms.rooms);
    const sortIcon = <i className="fas fa-angle-up"></i>;
    const [filterText, setFilterText] = useState('');
    // const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    const handleEdit = (row) => {
        console.log(`Edit => ${row.id}`);
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
                    <DataTable
                        striped
                        subHeader
                        subHeaderComponent={subHeaderComponentMemo}
                        subHeaderAlign="right"
                        highlightOnHover
                        title="Rooms"
                        fixedHeader
                        fixedHeaderScrollHeight="300px"
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
