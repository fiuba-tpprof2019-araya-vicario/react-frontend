import React from 'react';
import { STATES } from '../services/references';

export default function getStatusIcon(type, status) {
  let icon;

  if (STATES.accepted === status) {
    icon = (
      <i
        key="accept-icon"
        className="fa fa-check action successText"
        title={`El ${type} ha aceptado la propuesta`}
      >
        &nbsp;
      </i>
    );
  }

  return icon;
}
