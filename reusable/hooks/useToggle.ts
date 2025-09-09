'use client ';

import { useState } from 'react';

export default (value: any) => {
  const [state, setState] = useState(value);

  const toggle = setState((p: any) => !p);

  return [state, toggle];
};
