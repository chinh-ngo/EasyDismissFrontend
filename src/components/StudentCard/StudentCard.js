import React from 'react';
import Barcode from 'react-barcode';

const StudentCard = (props) => {  
    return (
        <div className="card card-widget widget-user">
        <div className="widget-user-header bg-primary">
            <h3 className="widget-user-username">{props.student.firstName}</h3>
            <h5 className="widget-user-desc">{props.student.lastName}</h5>
        </div>
        <div className="widget-user-image">
            <img className="img-circle elevation-2" src={'/img/default-profile.png'} alt="User Avatar"></img>
        </div>
        <div className="card-footer">
            <div className="row">
                <div className="col-sm-4 border-right">
                    <div className="description-block">
                    <h5 className="description-header">{props.student.classroom}</h5>
                    </div>
                </div>
                <div className="col-sm-4 border-right">
                    <div className="description-block">
                    <h5 className="description-header">{props.student.homeroomTeacher}</h5>
                    </div>
                </div>
                <div className="col-sm-4 border-right">
                    <div className="description-block">
                    <h5 className="description-header">{props.student.barcodeNumber}</h5> 
                    </div>
                </div>
            </div>
        </div>
        </div>    
                    
    );
};
  
export default StudentCard;