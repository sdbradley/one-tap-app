import React from 'react';

export default function HiddenField({name, value, disabled}) {
  return <input type="hidden" name={name} value={value} disabled={disabled}/>
}

HiddenField.omitFieldGroup = true;
