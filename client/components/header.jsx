import React from 'react';

function header(props) {
  return (
    <div className="row justify-content-center">
      <h1 className="col-lg-9 col-7 text-center">Student Grade Table</h1>
      <h5 className="col-lg-3 col-9 text-center text-right-not-sm">Average Grade:  <span className="badge badge-primary">{props.average}</span></h5>
    </div>
  );
}

export default header;
