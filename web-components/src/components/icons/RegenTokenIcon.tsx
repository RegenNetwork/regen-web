import React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

interface IconProps extends SvgIconProps {
  className?: string;
}

function RegenTokenIcon({ className, sx = [] }: IconProps): JSX.Element {
  return (
    <SvgIcon
      className={className}
      width="70"
      height="70"
      viewBox="0 0 70 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      sx={[...(Array.isArray(sx) ? sx : [sx])]}
    >
      <circle cx="35" cy="35" r="35" fill="url(#paint0_linear)" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M35 67.2626C52.8181 67.2626 67.2626 52.7307 67.2626 34.8045C67.2626 16.8784 52.8181 2.34644 35 2.34644C17.1819 2.34644 2.73743 16.8784 2.73743 34.8045C2.73743 52.7307 17.1819 67.2626 35 67.2626ZM35 64.5252C51.3063 64.5252 64.5251 51.2188 64.5251 34.8045C64.5251 18.3903 51.3063 5.08387 35 5.08387C18.6937 5.08387 5.47486 18.3903 5.47486 34.8045C5.47486 51.2188 18.6937 64.5252 35 64.5252Z"
        fill="white"
      />
      <path
        d="M32.015 27.6349V27.661L29.5643 14.7299L27.5308 14.0781L26.2534 15.7988L32.015 27.6349Z"
        fill="white"
      />
      <path
        d="M33.3445 22.2384L34.3873 27.244L35.5084 22.1602L34.4134 21.4302L33.3445 22.2384Z"
        fill="white"
      />
      <path
        d="M41.0875 23.1248L39.7579 23.2551L38.1937 28.2086L41.635 24.324L41.0875 23.1248Z"
        fill="white"
      />
      <path
        d="M52.4544 24.1676V22.0558L50.3948 21.4041L40.7486 30.4506L52.4544 24.1676Z"
        fill="white"
      />
      <path
        d="M28.8864 29.5121L26.0186 25.2104L26.0708 25.3147L26.0186 25.2104L24.7151 25.419L24.5065 26.7226L28.8864 29.5121Z"
        fill="white"
      />
      <path
        d="M47.3445 33.8918L42.2086 34.9086L47.3445 36.0297L48.1266 34.9607L47.3445 33.8918Z"
        fill="white"
      />
      <path
        d="M26.5922 34.9346L13.4004 33.2661L12.1229 34.9868L13.4004 36.7075L26.5922 34.9346Z"
        fill="white"
      />
      <path
        d="M21.7169 37.8026L21.3259 39.0279L22.3948 39.8101L26.9572 37.2551L21.7169 37.8026Z"
        fill="white"
      />
      <path
        d="M23.229 41.4262L23.1769 42.7298L24.4283 43.173L28.0782 39.3406L23.229 41.4262Z"
        fill="white"
      />
      <path
        d="M29.7988 41.1135L25.9143 44.5288L26.2532 45.7802L27.5828 45.8323L29.7988 41.1135Z"
        fill="white"
      />
      <path
        d="M34.4134 42.6255L33.3706 47.6832L34.4395 48.4393L35.5084 47.6571L34.4134 42.6255Z"
        fill="white"
      />
      <path
        d="M52.4804 45.7019L40.7486 39.4709L50.4469 48.4654L52.4804 47.8136V45.7019Z"
        fill="white"
      />
      <path
        d="M39.5494 46.6665L36.9163 42.2605L37.5159 47.3182L38.7673 47.7093L39.5494 46.6665Z"
        fill="white"
      />
      <path
        d="M32.041 42.2605L26.3315 54.1227L27.6089 55.8434L29.6425 55.1916L32.041 42.2605Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="18.3799"
          y1="65.6983"
          x2="45.1676"
          y2="-2.55798e-06"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3FAD6C" />
          <stop offset="1" stopColor="#6EC2B7" />
        </linearGradient>
      </defs>
    </SvgIcon>
  );
}

export { RegenTokenIcon };
