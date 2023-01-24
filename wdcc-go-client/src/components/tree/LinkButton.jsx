import React from 'react';

/**
 * A button with a link embedded in it.
 */
export function LinkButton({ label, hoverHint, bgColour, link }) {
  const style = {
    'background-color': bgColour
  }

  return (
    <a title={hoverHint} style={style} href={link}>
      <p>{label}</p>
    </a>
  );
}