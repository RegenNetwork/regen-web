import { SxProps } from '@mui/material';
import SvgIcon from '@mui/material/SvgIcon';

import { Theme } from '../../theme/muiTheme';
import { sxToArray } from '../../utils/mui/sxToArray';

interface IconProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export default function OutlinedCheckIcon({
  className,
  sx,
}: IconProps): JSX.Element {
  return (
    <SvgIcon
      className={className}
      sx={[...sxToArray(sx)]}
      width="23"
      height="18"
      viewBox="0 0 23 18"
      fill="none"
    >
      <mask
        id="path-1-outside-1_8447_24777"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0.866211"
        width="23"
        height="17"
        fill="black"
      >
        <rect fill="white" y="0.866211" width="23" height="17" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.5449 1.93943C20.4473 1.8418 20.289 1.8418 20.1914 1.93943L8.72066 13.4102L2.48744 7.17693C2.38981 7.0793 2.23151 7.0793 2.13388 7.17693L1.07322 8.23759C0.975592 8.33522 0.975592 8.49351 1.07322 8.59114L8.5386 16.0565C8.58876 16.1067 8.65493 16.1311 8.72066 16.1297C8.7864 16.1311 8.85257 16.1067 8.90273 16.0565L21.6056 3.35365C21.7032 3.25602 21.7032 3.09773 21.6056 3.00009L20.5449 1.93943Z"
        />
      </mask>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.5449 1.93943C20.4473 1.8418 20.289 1.8418 20.1914 1.93943L8.72066 13.4102L2.48744 7.17693C2.38981 7.0793 2.23151 7.0793 2.13388 7.17693L1.07322 8.23759C0.975592 8.33522 0.975592 8.49351 1.07322 8.59114L8.5386 16.0565C8.58876 16.1067 8.65493 16.1311 8.72066 16.1297C8.7864 16.1311 8.85257 16.1067 8.90273 16.0565L21.6056 3.35365C21.7032 3.25602 21.7032 3.09773 21.6056 3.00009L20.5449 1.93943Z"
        fill="url(#paint0_linear_8447_24777)"
      />
      <path
        d="M20.1914 1.93943L19.4843 1.23233L19.4843 1.23233L20.1914 1.93943ZM20.5449 1.93943L21.252 1.23233L21.252 1.23233L20.5449 1.93943ZM8.72066 13.4102L8.01356 14.1173L8.72066 14.8244L9.42777 14.1173L8.72066 13.4102ZM2.48744 7.17693L1.78033 7.88403L1.78033 7.88404L2.48744 7.17693ZM2.13388 7.17693L2.84099 7.88404L2.84099 7.88404L2.13388 7.17693ZM1.07322 8.23759L1.78033 8.9447H1.78033L1.07322 8.23759ZM1.07322 8.59114L1.78033 7.88404L1.78033 7.88404L1.07322 8.59114ZM8.5386 16.0565L9.2457 15.3494L8.5386 16.0565ZM8.72066 16.1297L8.74168 15.1299L8.72066 15.1295L8.69964 15.1299L8.72066 16.1297ZM8.90273 16.0565L9.60983 16.7636L9.60984 16.7636L8.90273 16.0565ZM21.6056 3.35365L20.8985 2.64654L20.8985 2.64654L21.6056 3.35365ZM21.6056 3.00009L20.8985 3.7072L20.8985 3.7072L21.6056 3.00009ZM20.8985 2.64654C20.6056 2.93943 20.1307 2.93943 19.8378 2.64654L21.252 1.23233C20.7639 0.744173 19.9724 0.744172 19.4843 1.23233L20.8985 2.64654ZM9.42777 14.1173L20.8985 2.64654L19.4843 1.23233L8.01356 12.703L9.42777 14.1173ZM9.42777 12.703L3.19454 6.46982L1.78033 7.88404L8.01356 14.1173L9.42777 12.703ZM3.19454 6.46982C2.70639 5.98166 1.91493 5.98167 1.42677 6.46982L2.84099 7.88404C2.5481 8.17693 2.07322 8.17693 1.78033 7.88403L3.19454 6.46982ZM1.42678 6.46982L0.366117 7.53048L1.78033 8.9447L2.84099 7.88404L1.42678 6.46982ZM0.366117 7.53048C-0.122039 8.01864 -0.122039 8.81009 0.366117 9.29825L1.78033 7.88404C2.07322 8.17693 2.07322 8.6518 1.78033 8.9447L0.366117 7.53048ZM0.366117 9.29825L7.83149 16.7636L9.2457 15.3494L1.78033 7.88404L0.366117 9.29825ZM7.83149 16.7636C8.0822 17.0143 8.41481 17.1363 8.74168 17.1295L8.69964 15.1299C8.89505 15.1258 9.09532 15.199 9.2457 15.3494L7.83149 16.7636ZM8.19563 15.3494C8.34601 15.199 8.54628 15.1258 8.74168 15.1299L8.69965 17.1295C9.02652 17.1363 9.35913 17.0143 9.60983 16.7636L8.19563 15.3494ZM20.8985 2.64654L8.19562 15.3494L9.60984 16.7636L22.3127 4.06075L20.8985 2.64654ZM20.8985 3.7072C20.6056 3.41431 20.6056 2.93943 20.8985 2.64654L22.3127 4.06076C22.8009 3.5726 22.8009 2.78114 22.3127 2.29299L20.8985 3.7072ZM19.8378 2.64654L20.8985 3.7072L22.3127 2.29299L21.252 1.23233L19.8378 2.64654Z"
        fill="url(#paint1_linear_8447_24777)"
        mask="url(#path-1-outside-1_8447_24777)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_8447_24777"
          x1="17.74"
          y1="1.86621"
          x2="12.3068"
          y2="19.2302"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#527984" />
          <stop offset="0.5" stopColor="#79C6AA" />
          <stop offset="1" stopColor="#C4DAB5" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_8447_24777"
          x1="17.74"
          y1="1.86621"
          x2="12.3068"
          y2="19.2302"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#527984" />
          <stop offset="0.5" stopColor="#79C6AA" />
          <stop offset="1" stopColor="#C4DAB5" />
        </linearGradient>
      </defs>
    </SvgIcon>
  );
}