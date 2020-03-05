import React from 'react';

function Modal(props) {
  const { content, primaryButton, title } = props.stateDotModal;
  return (
    <>
      <div className="shade"></div>
      <div className="modal-dialog myModal" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" onClick={props.cancelOperation}>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {content}
          </div>
          <div className="modal-footer">
            {primaryButton || null}
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
