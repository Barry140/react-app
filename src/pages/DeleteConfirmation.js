import React, { useState } from 'react';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';

function ConfirmationPopover({ onConfirm, onCancel }) {
    const [show, setShow] = useState(false);    

    // Popover content
    const popover = (
        <Popover id="popover-confirm">
            <Popover.Header as="h3">Are you sure?</Popover.Header>
            <Popover.Body>
                <div className="d-flex justify-content-between">
                    <Button variant="danger" onClick={() => { onConfirm(); setShow(false); }}>Yes</Button>
                    <Button variant="secondary" onClick={() => { onCancel(); setShow(false); }}>No</Button>
                </div>
            </Popover.Body>
        </Popover>
    );

    const handleClick = () => setShow(!show);

    return (
        <OverlayTrigger
            trigger="click"
            placement="right"
            overlay={popover}
            show={show}
            onToggle={handleClick}
        >
            <Button variant="outline-dark" onClick={handleClick}>
                🗑
            </Button>
        </OverlayTrigger>
    );
}

export default ConfirmationPopover;
