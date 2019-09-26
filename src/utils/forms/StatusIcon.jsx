import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { STATES } from '../services/references';

export default function getStatusIcon(type, status, element) {
  let icon;
  let title;
  const placement = 'top';

  if (STATES.accepted === status) {
    icon = (
      <i key="accept-icon" className="fa fa-check action successText">
        &nbsp;
      </i>
    );
    title = `El ${type} ha aceptado la ${element}`;
  } else if (STATES.rejected === status) {
    icon = (
      <i key="reject-icon" className="fa fa-times-circle action dangerText">
        &nbsp;
      </i>
    );

    title = `El ${type} ha rechazado la ${element}`;
  } else if (STATES.pending === status) {
    icon = (
      <i key="pending-icon" className="fa fa-clock-o action warningText">
        &nbsp;
      </i>
    );
    title = `El ${type} todavía no ha aceptado la ${element}`;
  }

  return (
    <OverlayTrigger
      key={`placement-${element}`}
      placement={placement}
      overlay={<Tooltip id={placement}>{title}</Tooltip>}
    >
      {icon}
    </OverlayTrigger>
  );
}
