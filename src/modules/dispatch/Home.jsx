import React from 'react';
import Main from '../../components/main/Main';
import {Button} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import {useMemo, useState} from 'react';

import DataTable from 'react-data-table-component';

const Home = ({props}) => {

    const dispatch = useDispatch();
    const students = useSelector((state) => state.students.students);
    const [filterText, setFilterText] = useState('');
    const filterStudents = students.filter(
        (item) => (item.firstName &&
                    item.firstName
                        .toLowerCase()
                        .includes(filterText.toLowerCase()))||
                        (item.lastName &&
                            item.lastName
                                .toLowerCase()
                                .includes(filterText.toLowerCase()))||
                        (item.barcodeNumber &&
                            item.barcodeNumber
                                .toLowerCase()
                                .includes(filterText.toLowerCase()))
                
                        
    );

    let columns = !students.length
        ? []
        : Object.getOwnPropertyNames(students[0]).map((c) => ({
              name: c.toLocaleUpperCase(),
              selector: (row) => row[c],
              sortable: true
          }));
    return (
        <Main>
            <div className="container-fluid">
                <h2 className="text-center display-4">Search</h2>
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <div className="input-group">
                        <input type="search" onKeyPress={(e) => {if (e.key === 'Enter') setFilterText(e.target.value)} }  className="form-control form-control-lg" placeholder="Type your keywords here"></input>
                            <div className="input-group-append">
                                <Button>
                                    <i className="fa fa-search"></i>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <DataTable
                        striped
                        subHeader
                        subHeaderAlign="right"
                        highlightOnHover
                        title="Students"
                        fixedHeader
                        fixedHeaderScrollHeight="300px"
                        pagination
                        selectableRows
                        columns={columns}
                        data={filterStudents}
                    />
                </div>

            </div>

        </Main>
    );
};

export default Home;
