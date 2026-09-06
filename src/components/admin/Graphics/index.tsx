import React from 'react'

/**
 * Payload ships its own logo on the login screen and its own icon in the nav sidebar.
 * Both are replaced here with the Heritage Jute Fibers marks so nobody signing in sees
 * someone else's branding.
 *
 * The artwork is inlined rather than pointed at `/logo.svg` because the admin panel is
 * dark: the wordmark has to invert with the theme, which only works when the text can
 * inherit `currentColor`, and the darkest brown in the woven mark (#774f2b) sits at
 * roughly 2.6:1 against Payload's near-black background, so it is lifted to a lighter
 * brown there. The rest of the palette clears 4:1 unchanged.
 */

const brandCSS = `
  .hjf-graphic__brown { fill: #774f2b; }
  [data-theme='dark'] .hjf-graphic__brown { fill: #a06a3c; }
`

const Mark: React.FC = () => (
  <g>
    <path
      className="hjf-graphic__brown"
      d="M115.194098,44.279319l19.704674-19.704674c4.376923-4.376925,11.473328-4.376925,15.85025,0l101.706833,101.706829-22.78302,22.78302c-2.676804,2.676804-7.016754,2.676804-9.693558,0L115.194098,44.279319Z"
    />
    <path
      d="M219.362151,84.822391l-27.629807-27.629799,38.988571-38.988571c4.297043-4.297038,11.263916-4.297038,15.560959,0l16.212555,16.212563c2.008514,2.008526,2.008514,5.264996,0,7.273521l-43.132294,43.132294.000015-.000008Z"
      fill="#929498"
    />
    <path
      d="M251.257094,116.717349l-27.629791-27.629799L298.851119,13.863754c2.691345-2.691345,7.054871-2.691345,9.746216,0l17.997375,17.997383c2.628479,2.62849,2.628479,6.890114,0,9.518604,0,0-75.337616,75.337601-75.337616,75.337608Z"
      fill="#d1d1d3"
    />
    <path
      d="M109.203925,110.279521l27.629799,27.629791-38.988571,38.988571c-4.297035,4.297043-11.263916,4.297043-15.560951,0l-16.212563-16.212555c-2.00853-2.00853-2.00853-5.264999,0-7.273514,0,0,43.132294-43.132294,43.132286-43.132294Z"
      fill="#929498"
    />
    <path
      d="M77.308966,78.384563l27.629799,27.629799L29.714972,181.238155c-2.691345,2.691345-7.054876,2.691345-9.746222,0L1.971367,163.240764c-2.62849-2.628494-2.62849-6.890121,0-9.5186l75.337599-75.337601Z"
      fill="#d1d1d3"
    />
    <path
      d="M75.813246,68.523456l19.635384-19.635384c4.415192-4.415192,11.573631-4.415192,15.988823,0l103.562943,103.562943-22.740646,22.740646c-2.700211,2.700211-7.07811,2.700211-9.778305,0,0,0-106.668205-106.668205-106.668198-106.668205Z"
      fill="#c59c6e"
    />
  </g>
)

export const Logo: React.FC = () => (
  <svg
    aria-label="Heritage Jute Fibers"
    className="graphic-logo"
    role="img"
    style={{ height: 'auto', maxWidth: '24rem', width: '100%' }}
    viewBox="0 0 1499.846 200.139"
    xmlns="http://www.w3.org/2000/svg"
  >
    <style>{brandCSS}</style>
    <Mark />
    <text
      fill="currentColor"
      fontFamily="Arial, Helvetica, sans-serif"
      fontSize="127.824654"
      transform="translate(348.925366 109.693237)"
    >
      Heritage Jute Fibers
    </text>
    <text
      fill="currentColor"
      fillOpacity="0.7"
      fontFamily="Arial, Helvetica, sans-serif"
      fontSize="52.3908"
      fontWeight="700"
      transform="translate(345.043042 180.414917)"
    >
      Uplifting the jute Legacy of Bangladesh
    </text>
  </svg>
)

/**
 * The mark alone, squared up: its bounding box is 328.19 x 172.12 starting at y 11.01,
 * so the viewBox pads it out to 360 on both axes to sit centred in Payload's square
 * nav slot.
 */
export const Icon: React.FC = () => (
  <svg
    aria-label="Heritage Jute Fibers"
    className="graphic-icon"
    height="100%"
    role="img"
    viewBox="-15.9 -82.93 360 360"
    width="100%"
    xmlns="http://www.w3.org/2000/svg"
  >
    <style>{brandCSS}</style>
    <Mark />
  </svg>
)
