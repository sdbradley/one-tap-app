import React from 'react';
import classNames from 'classnames';

export default function Errors({ messages = [], className }) {
  return messages.length
    ? (
      <ul className={classNames('Errors', className)}>
        {messages.map((message, i) =>  <li key={i} className="Errors-error">{message}</li>)}
      </ul>
    )
    : null;
}
