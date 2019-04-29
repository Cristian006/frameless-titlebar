import React from 'react';

const MenuIcon = (props) => (
  <svg version="1.1" width="24px" height="24px" viewBox="0 0 32 32">
    <path d="M 4 7 L 4 9 L 28 9 L 28 7 Z M 4 15 L 4 17 L 28 17 L 28 15 Z M 4 23 L 4 25 L 28 25 L 28 23 Z "/>
  </svg>
);


const MimimizeIcon = (props) => {
  return props.isWin ? (
    <svg
      version="1.1"
      aria-hidden="true"
      width="10"
      height="10"
    >
      <path d="M 0,5 10,5 10,6 0,6 Z" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16">
      <path d="M7 3v4H4l3.156 4H4v2h8v-2H8.844L12 7H9V3z" style={{marker: "none"}} overflow="visible"/>
      <text x="613.992" y="426.851" fontSize="14" fontWeight="400" opacity=".8" fontFamily="Bitstream Vera Sans" transform="translate(-293 -188)"/>
      <text x="-1401.69" y="1250.896" fontSize="14" fontWeight="400" opacity=".8" fontFamily="Bitstream Vera Sans" transform="translate(-293 -188)"/>
      <text x="-474.763" y="195.667" fontSize="14" fontWeight="400" opacity=".8" fontFamily="Bitstream Vera Sans" transform="translate(-293 -188)"/>
      <text x="417.863" y="-261.333" fontSize="14" fontWeight="400" opacity=".8" fontFamily="Bitstream Vera Sans" transform="translate(-293 -188)"/>
      <text x="444.346" y="-306.364" fontSize="14" fontWeight="400" opacity=".8" fontFamily="Bitstream Vera Sans" transform="translate(-293 -188)"/>
      <text x="-1204.137" y="-314.333" fontSize="14" fontWeight="400" opacity=".8" fontFamily="Bitstream Vera Sans" transform="translate(-293 -188)"/>
      <text x="410.171" y="-616.333" fontSize="14" fontWeight="400" opacity=".8" fontFamily="Bitstream Vera Sans" transform="translate(-293 -188)"/>
      <text x="2052.752" y="76.336" fontSize="14" fontWeight="400" opacity=".8" fontFamily="Bitstream Vera Sans" transform="translate(-293 -188)"/>
      <text x="2079.236" y="31.305" fontSize="14" fontWeight="400" opacity=".8" fontFamily="Bitstream Vera Sans" transform="translate(-293 -188)"/>
      <text x="430.752" y="23.336" fontSize="14" fontWeight="400" opacity=".8" fontFamily="Bitstream Vera Sans" transform="translate(-293 -188)"/>
      <text x="2045.06" y="-278.664" fontSize="14" fontWeight="400" opacity=".8" fontFamily="Bitstream Vera Sans" transform="translate(-293 -188)"/>
      <text x="-605.797" y="-29.818" fontSize="14" fontWeight="400" opacity=".8" fontFamily="Bitstream Vera Sans" transform="translate(-293 -188)"/>
      <text x="-2621.479" y="794.227" fontSize="14" fontWeight="400" opacity=".8" fontFamily="Bitstream Vera Sans" transform="translate(-293 -188)"/>
      <text x="-726.195" y="896.876" fontSize="14" fontWeight="400" opacity=".8" fontFamily="Bitstream Vera Sans" transform="translate(-293 -188)"/>
    </svg>
  );
};

const RestoreIcon = (props) => {
  return props.isWin ? (
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
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16">
      <g>
        <path d="M14 8l-2.25-2.223 1.714-1.715c.013-.012.015-.013.027-.026.38-.42.379-1.068-.027-1.474a1.07 1.07 0 0 0-1.473-.053l-.214.214-1.554 1.527L8 2v6zM8 14V8H2l2.25 2.25-1.714 1.714-.027.027c-.38.42-.379 1.068.027 1.473.405.406 1.08.434 1.5.054l.187-.214 1.554-1.554z" style={{marker: "none"}} overflow="visible"/>
      </g>
    </svg>
  )
};

const MaximizeIcon = (props) => {
  return props.isWin ? (
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
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16">
      <path d="M8 2l2.25 2.223-1.714 1.714-.027.027c-.38.42-.379 1.068.027 1.474a1.07 1.07 0 0 0 1.473.053l.214-.214 1.554-1.527L14 8V2zM2 8v6h6l-2.25-2.25 1.714-1.714.027-.027c.38-.42.379-1.068-.027-1.473-.405-.406-1.08-.434-1.5-.054l-.187.214-1.554 1.554z" style={{marker: "none"}} overflow="visible"/>
    </svg>
  );
};

const CloseIcon = (props) => {
  return props.isWin ? (
    <svg
      aria-hidden="true"
      version="1.1"
      width="10"
      height="10"
    >
      <path d="M 0,0 0,0.7 4.3,5 0,9.3 0,10 0.7,10 5,5.7 9.3,10 10,10 10,9.3 5.7,5 10,0.7 10,0 9.3,0 5,4.3 0.7,0 Z" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16">
      <path d="M7.97 6.556L10.5 4 12 5.5 9.401 7.987 12 10.5 10.5 12 7.987 9.401 5.5 12 4 10.5 6.586 8 4 5.5 5.5 4l2.47 2.556z" style={{marker: "none"}} overflow="visible"/>
    </svg>
  )
}

const checked = <svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1671 566q0 40-28 68l-724 724-136 136q-28 28-68 28t-68-28l-136-136-362-362q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 295 656-657q28-28 68-28t68 28l136 136q28 28 28 68z" /></svg>;
const unchecked = <span />;
const radioUnchecked = <svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M896 352q-148 0-273 73t-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273-73-273-198-198-273-73zm768 544q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z" /></svg>;
const radioChecked = <svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1152 896q0 106-75 181t-181 75-181-75-75-181 75-181 181-75 181 75 75 181zm-256-544q-148 0-273 73t-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273-73-273-198-198-273-73zm768 544q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z" /></svg>;
const arrow = <svg version="1.1" width="24px" height="24px"><g id="Rounded"><path d="M9.29,6.71L9.29,6.71c-0.39,0.39-0.39,1.02,0,1.41L13.17,12l-3.88,3.88c-0.39,0.39-0.39,1.02,0,1.41l0,0c0.39,0.39,1.02,0.39,1.41,0l4.59-4.59c0.39-0.39,0.39-1.02,0-1.41l-4.59-4.59C10.32,6.32,9.68,6.32,9.29,6.71z" /></g></svg>;

export {
  MenuIcon,
  MimimizeIcon,
  MaximizeIcon,
  RestoreIcon,
  CloseIcon,
  checked,
  unchecked,
  radioChecked,
  radioUnchecked,
  arrow
};
