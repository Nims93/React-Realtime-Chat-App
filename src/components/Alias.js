import React, { useState } from 'react';

const yesNoTemplate = (
  <div className="alias-selector">
    <form></form>
  </div>
);

export default function Alias({ alias }) {
  const [wantsToUseAlias, setWantsToUseAlias] = useState(null);

  return <div className="alias-selector"></div>;
}
