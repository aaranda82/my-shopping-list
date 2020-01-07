import React from 'react';

function header(props) {
  return (
    <div className="row">
      <h1 className="col-9">Student Grade Table</h1>
      <h5 className="col-3">Average Grade:  <span className="badge badge-primary">{props.average}</span></h5>
    </div>
  );
}

export default header;
