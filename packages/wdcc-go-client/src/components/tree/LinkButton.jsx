import React from "react";
import { getContrastColour } from "../../styles/colours.util";
import imageThing from "../../resources/logo_white_512.png";

/**
 * A button with a link embedded in it.
 */
export function LinkButton({ label, hoverHint, bgColour, link, iconUrl }) {
  const fgColour = getContrastColour(bgColour);

  const style = {
    backgroundColor: bgColour,
    color: fgColour,
  };

  const isStrUrl = (urlStr) => {
    try {
      new URL(urlStr);

      return true;
    } catch (e) {
      return false;
    }
  };

  const getIcon = (url) => {
    if (isStrUrl(url)) {
      return (
        <img
          src={iconUrl}
          className="block h-6 absolute left-3 aspect-square object-contain"
        />
      );
    } else if (!!url) {
      return <p className="absolute left-3">{url}</p>;
    }
  };

  return (
    <a
      className="py-3 rounded-lg my-2 hover:brightness-90 duration-300 shadow-md relative"
      title={hoverHint}
      style={style}
      href={link}
    >
      {getIcon(iconUrl)}
      {label}
    </a>
  );
}
