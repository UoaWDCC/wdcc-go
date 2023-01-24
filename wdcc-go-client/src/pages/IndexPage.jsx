import React from 'react';
import { LinkButton } from '../components/tree/LinkButton';

export function IndexPage() {
  return (
    <>
      <h1>WDCC GO</h1>

      <LinkButton label={"Website"}
                  link={"https://wdcc.co.nz"}
                  hoverHint={"Click me to go to WDCC's home page"}
                  bgColour={"red"} />
    </>
  );
}