import React from 'react';
import { Global, css } from '@emotion/react';

// Used in /guides/sdk/sdk_signature_verification/ to break long code strings in tables
const CodeBreakStyles = () => (
  <Global styles={css`
    td:last-of-type > code {
      word-break: break-all !important;
    }
  `}
  />
);

export default CodeBreakStyles;