import React from 'react';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';

function ConfirmationPopover({ onConfirm, onCancel }) {
    const popover = (
        <Popover id="popover-confirm">
        <Popover.Header as="h3">Confirm Action</Popover.Header>
        <Popover.Body>
            <div className="d-flex justify-content-between">
            <Button variant="danger" onClick={onConfirm}>Yes</Button>
            <Button variant="secondary" onClick={onCancel}>No</Button>
            </div>
        </Popover.Body>
        </Popover>
    );

  return (
    <OverlayTrigger trigger="click" placement="right" overlay={popover} >
      <Button variant="outline-dark">🗑</Button>
    </OverlayTrigger>
  );
}

export default ConfirmationPopover;
