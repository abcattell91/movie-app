import React from "react";
import Placeholder from 'react-bootstrap/Placeholder';

export const Loader = () => (
  <div style={{margin: '20px 0', textAlign: 'center'}}>
    <Placeholder as="p" animation="glow">
      <Placeholder sm={12} />
    </Placeholder>
  </div>
)
