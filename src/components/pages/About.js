import React from 'react';

export default function About(props) {
  return (
    <div>
      <h1 className="display-4">About Contact</h1>
      <h1 className="display-4">{props.match.params.id}</h1>
      <p className="lead">Simple app for contacts</p>
      <p>Version 1.0.0</p>
    </div>
  );
}
