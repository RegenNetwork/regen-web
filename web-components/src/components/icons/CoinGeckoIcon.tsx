import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

interface IconProps extends SvgIconProps {}

export default function CoinGeckoIcon({
  sx = [],
  ...props
}: IconProps): JSX.Element {
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1044.28 276.04"
      sx={[{ fill: 'none' }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...props}
    >
      <defs>
        <style>
          {'.cls-1{fill:#fff}.cls-4{fill:#8bc53f}.cls-6{fill:#58595b}'}
        </style>
      </defs>
      <title>{'Coingecko'}</title>
      <g id="Coin_Gecko_Vector_Text" data-name="Coin Gecko Vector Text">
        <path
          className="cls-1"
          d="M465.66 154c-2.84-11.07-10-19.17-24-19.17-20.66 0-29.3 18.22-29.3 36.71s8.64 36.72 29.3 36.72c15 0 23.22-11.2 24.56-25.24h16.47c-1.35 23.08-17.68 39-41 39-28.89 0-46.17-22.95-46.17-50.49S412.74 121 441.63 121c21.73.13 38.87 12.15 40.9 32.94ZM492.66 184.72c0-21.33 12.82-36.71 35.23-36.71s35.23 15.38 35.23 36.71-12.82 36.86-35.23 36.86-35.23-15.39-35.23-36.86Zm55.07 0c0-12-6.07-24.56-19.84-24.56s-19.84 12.55-19.84 24.56 6.07 24.71 19.84 24.71 19.84-12.56 19.84-24.71ZM576.35 123.3h15.39v14.58h-15.39Zm0 26.6h15.39v69.79h-15.39ZM608.48 149.9h14.58v10.26l.27.27A25 25 0 0 1 645.07 148c15.12 0 24.7 8.1 24.7 23.75v47.93h-15.39v-43.87c-.27-10.93-4.59-15.65-13.63-15.65-10.26 0-16.88 8.09-16.88 18.35v41.18h-15.39ZM772.23 219.69h-10.8l-2.56-11.34c-9 10.26-17.28 13.63-29 13.63-28.87.02-46.19-22.98-46.19-50.49S701 121 729.85 121c21 0 38.74 11.2 41.3 32.94h-16.47c-1.62-12.69-12.68-19.17-24.83-19.17-20.66 0-29.3 18.22-29.3 36.71s8.64 36.72 29.3 36.72c17.27.27 26.72-10.12 27-26.46H731.2v-12.81h41ZM800.45 188.77c0 10.94 5.94 20.66 18.76 20.66 8.91 0 14.31-3.92 17-11.61h14.59c-3.37 15.25-16.33 23.76-31.59 23.76-21.86 0-34.15-15.26-34.15-36.72 0-19.85 13-36.85 33.75-36.85 22 0 35.5 19.84 32.94 40.76Zm35.91-10.12c-.54-9.72-7.16-18.49-17.55-18.49-10.67 0-17.95 8.09-18.36 18.49ZM910.61 173.25c-1.22-8.51-7.43-13.09-15.93-13.09-8 0-19.17 4.18-19.17 25.37 0 11.61 5.13 23.9 18.49 23.9 8.91 0 15.12-5.94 16.61-15.93H926c-2.84 18.09-14 28.08-32 28.08-21.87 0-33.88-15.53-33.88-36.05 0-21.06 11.48-37.52 34.42-37.52 16.2 0 30 8.1 31.46 25.24ZM939 123.3h15.39v54.81l27.81-28.21h18.9l-26.73 25.64 29.29 44.15h-18.8l-21.33-33.89-9.18 8.91v25H939ZM1007.81 184.72c0-21.33 12.82-36.71 35.23-36.71s35.24 15.38 35.24 36.71-12.83 36.86-35.24 36.86-35.23-15.39-35.23-36.86Zm55.08 0c0-12-6.08-24.56-19.85-24.56s-19.84 12.55-19.84 24.56 6.07 24.71 19.84 24.71 19.85-12.56 19.85-24.71Z"
          transform="translate(-34 -45.61)"
        />
      </g>
      <g id="Coin_Gecko_AI" data-name="Coin Gecko AI">
        <path
          d="M310 183A138 138 0 1 1 171.4 45.61 138 138 0 0 1 310 183Z"
          transform="translate(-34 -45.61)"
          style={{
            fill: '#8dc63f',
          }}
        />
        <path
          d="M299.65 183.05A127.63 127.63 0 1 1 171.45 56a127.64 127.64 0 0 1 128.2 127.05Z"
          transform="translate(-34 -45.61)"
          style={{
            fill: '#f9e988',
          }}
        />
        <path
          className="cls-1"
          d="M174.35 64.27a70.18 70.18 0 0 1 24.53 0 74.66 74.66 0 0 1 23.43 7.85c7.28 4 13.57 9.43 19.83 14.52s12.49 10.3 18.42 16a93.38 93.38 0 0 1 15.71 19 108.07 108.07 0 0 1 11 22.17c5.33 15.66 7.18 32.53 4.52 48.62H291c-2.67-15.95-6.29-31.15-12-45.61a178 178 0 0 0-9.44-21.25 208.8 208.8 0 0 0-12.42-19.93 72.3 72.3 0 0 0-16.64-16.8c-6.48-4.62-13.93-7.61-21.14-10.45s-14.36-5.78-21.88-7.94-15.16-3.78-23.14-5.35Z"
          transform="translate(-34 -45.61)"
        />
        <path
          className="cls-4"
          d="M236.74 138c-9.26-2.68-18.86-6.48-28.58-10.32-.56-2.44-2.72-5.48-7.09-9.19-6.35-5.51-18.28-5.37-28.59-2.93-11.38-2.68-22.62-3.63-33.41-1-88.25 24.31-38.21 83.62-70.61 143.24 4.61 9.78 54.3 66.84 126.2 51.53 0 0-24.59-59.09 30.9-87.45 45.01-23.09 77.53-65.81 11.18-83.88Z"
          transform="translate(-34 -45.61)"
        />
        <path
          className="cls-1"
          d="M247.64 176.81a5.35 5.35 0 1 1-5.38-5.32 5.36 5.36 0 0 1 5.38 5.32Z"
          transform="translate(-34 -45.61)"
        />
        <path
          d="M172.48 115.52c6.43.46 29.68 8 35.68 12.12-5-14.5-21.83-16.43-35.68-12.12Z"
          transform="translate(-34 -45.61)"
          style={{
            fill: '#009345',
          }}
        />
        <path
          className="cls-1"
          d="M178.6 152.19a24.68 24.68 0 1 1-24.68-24.67 24.67 24.67 0 0 1 24.68 24.67Z"
          transform="translate(-34 -45.61)"
        />
        <path
          className="cls-6"
          d="M171.28 152.41a17.36 17.36 0 1 1-17.36-17.36 17.36 17.36 0 0 1 17.36 17.36Z"
          transform="translate(-34 -45.61)"
        />
        <path
          className="cls-4"
          d="M267.63 187.69c-20 14.09-42.74 24.78-75 24.78-15.1 0-18.16-16-28.14-8.18-5.15 4.06-23.31 13.14-37.72 12.45S89 207.6 82.49 176.84c-2.58 30.76-3.9 53.42-15.45 79.39 23 36.83 77.84 65.24 127.62 53-5.35-37.35 27.29-73.93 45.68-92.65 7-7.09 20.3-18.66 27.29-28.91Z"
          transform="translate(-34 -45.61)"
        />
        <path
          className="cls-6"
          d="M266.85 188.61c-6.21 5.66-13.6 9.85-21.12 13.55a134.24 134.24 0 0 1-23.7 8.63c-8.16 2.11-16.67 3.7-25.29 2.92s-17.43-3.71-23.14-10.17l.27-.31c7 4.54 15.08 6.14 23.12 6.37a108.57 108.57 0 0 0 24.3-2 132.34 132.34 0 0 0 23.61-7.3c7.63-3.15 15.18-6.8 21.68-12Z"
          transform="translate(-34 -45.61)"
        />
      </g>
    </SvgIcon>
  );
}