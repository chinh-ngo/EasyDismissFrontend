import {useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import DataTable from 'react-data-table-component';
import Main from '../../components/main/Main';
import {useDispatch, useSelector} from 'react-redux';
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
                </div>
            </div>
        </Main>
    );
};

export default Barcodes;
