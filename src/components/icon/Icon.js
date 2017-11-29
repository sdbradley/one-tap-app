import React from 'react';
import * as types from './types';

export default function Icon ({ type, ...props }) {
  let Type = types[type];

  if (!Type) {
    throw new Error(`Missing Icon: No Icon with type ${type}`);
  }

  return <Type {...props} />;
}
