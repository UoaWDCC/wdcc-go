import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getLinks } from "../adapters/GetLinksAdapter";
import { LoadingIcon } from "../components/LoadingIcon";
import { LinkButton } from "../components/tree/LinkButton";
import logo from "../resources/logo_white_512.png";

export function IndexPage() {
  
  const [links, setLinks] = useState(null);

  useEffect(() => {
    getLinks().then(data => setLinks(data));
  }, []);

  return (
    <div className="bg-wdcc-blue h-screen py-24 px-4">
      <div>
        <div className="flex flex-row m-auto justify-center items-center">
          <img className="w-28 text-center flex-shrink" src={logo} />
          <h1 className="text-center pl-4 font-bold text-3xl text-wdcc-white font-display flex-shrink">
            Go Links
          </h1>
        </div>

        <div className="text-center flex flex-col max-w-md mx-auto my-4 font-body">
          {links?.map((it, idx) => (
            <LinkButton
              key={idx}
              label={it.label}
              link={it.link}
              hoverHint={it.hoverHint}
              bgColour={it.bgColour}
            />
          )) ?? <LoadingIcon />}
        </div>
      </div>
    </div>
  );
}
