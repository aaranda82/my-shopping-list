import React from 'react';

function header(props) {
  return (
    <div className="row">
      <h1 className="col-lg-8 col-12 text-center display-3">Student Grade Table</h1>
      <h5 className="col-lg-4 col-12 text-center">Average Grade:  <span className="badge badge-primary">{props.average}</span></h5>
    </div>
  );
}

export default header;
