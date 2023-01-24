import React from "react";
import { getContrastColour } from "../../styles/colours.util";

/**
 * A button with a link embedded in it.
 */
export function LinkButton({ label, hoverHint, bgColour, link }) {
  const fgColour = getContrastColour(bgColour);

  const style = {
    backgroundColor: bgColour,
    color: fgColour,
  };

  return (
    <a
      className="py-3 rounded-lg my-2 hover:brightness-90 duration-300 shadow-md"
      title={hoverHint}
      style={style}
      href={link}
    >
      {label}
    </a>
  );
}
