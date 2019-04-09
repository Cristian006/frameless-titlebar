import React from 'react';

const MenuIcon = (props) => (
  <svg version="1.1" width="24px" height="24px" viewBox="0 0 32 32">
    <path d="M 4 7 L 4 9 L 28 9 L 28 7 Z M 4 15 L 4 17 L 28 17 L 28 15 Z M 4 23 L 4 25 L 28 25 L 28 23 Z "/>
  </svg>
);


const MimimizeIcon = (props) => (
  <svg
    version="1.1"
    aria-hidden="true"
    width="10"
    height="10"
  >
    <path d="M 0,5 10,5 10,6 0,6 Z" />
  </svg>
);

const RestoreIcon = (props) => (
  <svg
    version="1.1"
    aria-hidden="true"
    width="10"
    height="10"
  >
    <path
      d="m 2,1e-5 0,2 -2,0 0,8 8,0 0,-2 2,0 0,-8 z m 1,1 6,0 0,6 -1,0 0,-5 -5,0 z m -2,2 6,0 0,6 -6,0 z"
    />
  </svg>
);

const MaximizeIcon = (props) => (
  <svg
    version="1.1"
    aria-hidden="true"
    width="10"
    height="10"
  >
    <path
      d="M 0,0 0,10 10,10 10,0 Z M 1,1 9,1 9,9 1,9 Z"
    />
  </svg>
);

const CloseIcon = (props) => (
  <svg
    aria-hidden="true"
    version="1.1"
    width="10"
    height="10"
  >
    <path d="M 0,0 0,0.7 4.3,5 0,9.3 0,10 0.7,10 5,5.7 9.3,10 10,10 10,9.3 5.7,5 10,0.7 10,0 9.3,0 5,4.3 0.7,0 Z" />
  </svg>
);

export {
  MenuIcon,
  MimimizeIcon,
  MaximizeIcon,
  RestoreIcon,
  CloseIcon
};
