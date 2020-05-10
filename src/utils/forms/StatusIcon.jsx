import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { STATES } from '../services/references';

export const getIconWithOverlay = (message, icon, placement = 'top') => {
  if (!message) {
    return null;
  }

  return (
    <OverlayTrigger
      key={`placement-${placement}`}
      placement={placement}
      overlay={<Tooltip id={placement}>{message}</Tooltip>}
    >
      {icon}
    </OverlayTrigger>
  );
};

const getIcon = (key, className) => (
  <i key={key} data-test-id="icon" className={className} />
);

export const getStatusIcon = (type, status, element) => {
  let icon;
  let title;

  if (STATES.accepted === status) {
    icon = getIcon('accept-icon', 'fa fa-check action successText');
    title = `El ${type} ha aceptado la ${element}`;
  } else if (STATES.rejected === status) {
    icon = getIcon('reject-icon', 'fa fa-times-circle action dangerText');
    title = `El ${type} ha rechazado la ${element}`;
  } else if (STATES.pending === status) {
    icon = getIcon('pending-icon', 'fa fa-clock-o action warningText');
    title = `El ${type} todavía no ha aceptado la ${element}`;
  }

  return getIconWithOverlay(title, icon);
};
