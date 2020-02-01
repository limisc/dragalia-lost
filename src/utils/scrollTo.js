import { createRef } from 'react';

export const refs = {
  col1: createRef(),
  col2: createRef(),
  col3: createRef(),
};

export const scrollTo = ref => {
  setTimeout(() => {
    let top = 0;
    if (ref && ref.current) {
      top = ref.current.offsetTop - 48;
    }

    window.scrollTo({ top, behavior: 'smooth' });
  }, 0);
};
