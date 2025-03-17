import React from "react";

export const Icons = {
  AI: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width="32"
      height="32"
      preserveAspectRatio="xMidYMid meet"
      style={{
        width: "100%",
        height: "100%",
        transform: "translate3d(0px, 0px, 0px)",
        contentVisibility: "visible",
      }}
    >
      <defs>
        <clipPath id="clip-path">
          <rect width="32" height="32" x="0" y="0"></rect>
        </clipPath>
        <g id="gradient-group">
          <g transform="matrix(-1,0,0,-1,16,16)" opacity="1">
            <g opacity="1" transform="matrix(1,0,0,1,0,0)">
              <path
                fill="url(#gradient1)"
                fillOpacity="1"
                d="M0.027,14C0.48,6.49,6.49,0.48,14,0.027V-0.027C6.49-0.48,0.48-6.49,0.027-14H-0.027C-0.48-6.49-6.49-0.48-14-0.027V0.027C-6.49,0.48-0.48,6.49-0.027,14H0.027z"
              ></path>
            </g>
          </g>
        </g>
        <linearGradient
          id="gradient1"
          x1="-9.223"
          y1="8.49"
          x2="10.462"
          y2="-8.212"
        >
          <stop offset="0%" stopColor="rgb(33,123,254)"></stop>
          <stop offset="14%" stopColor="rgb(20,133,252)"></stop>
          <stop offset="27%" stopColor="rgb(7,142,251)"></stop>
          <stop offset="52%" stopColor="rgb(84,143,253)"></stop>
          <stop offset="78%" stopColor="rgb(161,144,255)"></stop>
          <stop offset="89%" stopColor="rgb(175,148,254)"></stop>
          <stop offset="100%" stopColor="rgb(189,153,254)"></stop>
        </linearGradient>
        <linearGradient
          id="gradient2"
          x1="-4.003"
          y1="4.63"
          x2="8.092"
          y2="-7.886"
        >
          <stop offset="0%" stopColor="rgb(33,123,254)"></stop>
          <stop offset="14%" stopColor="rgb(20,133,252)"></stop>
          <stop offset="27%" stopColor="rgb(7,142,251)"></stop>
          <stop offset="52%" stopColor="rgb(84,143,253)"></stop>
          <stop offset="78%" stopColor="rgb(161,144,255)"></stop>
          <stop offset="89%" stopColor="rgb(175,148,254)"></stop>
          <stop offset="100%" stopColor="rgb(189,153,254)"></stop>
        </linearGradient>
        <mask id="mask1">
          <use href="#gradient-group"></use>
        </mask>
      </defs>
      <g clipPath="url(#clip-path)">
        <g mask="url(#mask1)">
          <g transform="matrix(1,0,0,1,16,16)" opacity="1">
            <g opacity="1" transform="matrix(1,0,0,1,0,0)">
              <path
                fill="url(#gradient2)"
                fillOpacity="1"
                d="M0,-16C8.83,-16,16,-8.83,16,0S8.83,16,0,16S-16,8.83-16,0S-8.83,-16,0,-16z"
              ></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  ),
};
