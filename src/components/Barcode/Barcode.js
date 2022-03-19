import React from 'react';
import { useBarcode } from 'react-barcode';

const Barcode = (props) => {
    const { inputRef } = useBarcode({
      value: props.barcode,
      options: {
        background: '#ffff00',
      }
    });
  
    return <img ref={inputRef} />;
};
  
export default Barcode;