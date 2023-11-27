// React component for displaying information about a candidate
import * as React from 'react';

export default function Candidate({ id, name, voteCount }) {
  // Render candidate information
  return (
    <div>
      <p>
        {name} {voteCount && <strong>:{voteCount}</strong>}
      </p>
    </div>
  );
}
