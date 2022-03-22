import React from 'react';

const ActionButton = ({props}) => {
    return (
        <div>    
            <a className="btn btn-primary btn-sm" onClick={ () => props.handleGenerateBarcode(props.row)}>
                <i className="fas fa-barcode">
                </i>
            </a>
            <a className="btn btn-info btn-sm" onClick={ () => props.handleEdit(props.row)}>
                <i className="fas fa-pencil-alt">
                </i>
            </a>
            <a className="btn btn-danger btn-sm" onClick={ () => props.handleDelete(props.row) }>
                <i className="fas fa-trash">
                </i>
            </a>    
        </div>
    );
};

export default ActionButton;