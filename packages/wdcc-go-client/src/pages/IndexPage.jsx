import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { LoadingIcon } from "../components/LoadingIcon";
import { LinkButton } from "../components/LinkButton";
import logo from "../resources/logo_white_512.png";
import { ClientDatastore } from "../adapters/client.datastore";

export function IndexPage() {
  const [links, setLinks] = useState(null);

  useEffect(() => {
    ClientDatastore.getInstance()
      .getLinks()
      .then((data) => setLinks(data));
  }, []);

  return (
    <div className="min-h-screen py-24 px-4 flex justify-center items-center bg-gradient-to-b from-wdcc-blue-100 to-wdcc-blue-200">
      <div className="flex-grow">
        <div className="flex flex-row m-auto justify-center items-center">
          <img className="w-36 text-center flex-shrink" src={logo} />
        </div>

        <div className="text-center flex flex-col max-w-md mx-auto my-4 font-display pb-28">
          <hr className="border-wdcc-white border-1 my-4" />
          {links?.map((it, idx) => (
            <LinkButton
              key={idx}
              label={it.label}
              link={it.link}
              hoverHint={it.hoverHint}
              bgColour={it.bgColour}
              iconUrl={it.iconUrl}
            />
          )) ?? <LoadingIcon />}
        </div>
      </div>
    </div>
  );
}
