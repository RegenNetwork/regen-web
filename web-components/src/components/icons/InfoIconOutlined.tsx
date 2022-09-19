import React from 'react';
import { useTheme } from '@mui/material';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

interface IconProps extends SvgIconProps {
  className?: string;
}

function InfoIconOutlined({ className, sx = [] }: IconProps): JSX.Element {
  const theme = useTheme();

  return (
    <SvgIcon
      className={className}
      viewBox="0 0 25 26"
      width="25"
      height="26"
      xmlns="http://www.w3.org/2000/svg"
      sx={[...(Array.isArray(sx) ? sx : [sx])]}
    >
      <circle
        cx="12.5"
        cy="12.9669"
        r="12"
        fill={theme.palette.primary.main}
        stroke={theme.palette.secondary.main}
      />
      <path
        d="M13.172 7.6C13.172 7.408 13.0973 7.22667 12.948 7.056C12.7773 6.90667 12.596 6.832 12.404 6.832C12.212 6.832 12.0307 6.90667 11.86 7.056C11.7107 7.22667 11.636 7.41333 11.636 7.616C11.636 7.808 11.7107 7.98933 11.86 8.16C12.0307 8.30933 12.212 8.384 12.404 8.384C12.596 8.384 12.7773 8.30933 12.948 8.16C13.0973 7.98933 13.172 7.80267 13.172 7.6ZM14.468 18.128V17.152H13.172V10.304H10.756V11.28H12.084V17.408H12.1V18.128H14.468Z"
        fill={theme.palette.secondary.main}
      />
      <path
        d="M12.948 7.056L13.249 6.7926L13.2315 6.77253L13.2114 6.75497L12.948 7.056ZM11.86 7.056L11.5966 6.75497L11.5765 6.77253L11.559 6.7926L11.86 7.056ZM11.86 8.16L11.559 8.4234L11.5765 8.44347L11.5966 8.46103L11.86 8.16ZM12.948 8.16L13.2114 8.46103L13.2315 8.44347L13.249 8.4234L12.948 8.16ZM14.468 18.128V18.528H14.868V18.128H14.468ZM14.468 17.152H14.868V16.752H14.468V17.152ZM13.172 17.152H12.772V17.552H13.172V17.152ZM13.172 10.304H13.572V9.904H13.172V10.304ZM10.756 10.304V9.904H10.356V10.304H10.756ZM10.756 11.28H10.356V11.68H10.756V11.28ZM12.084 11.28H12.484V10.88H12.084V11.28ZM12.084 17.408H11.684V17.808H12.084V17.408ZM12.1 17.408H12.5V17.008H12.1V17.408ZM12.1 18.128H11.7V18.528H12.1V18.128ZM13.572 7.6C13.572 7.29408 13.45 7.02225 13.249 6.7926L12.647 7.3194C12.7447 7.43108 12.772 7.52192 12.772 7.6H13.572ZM13.2114 6.75497C12.9817 6.55402 12.7099 6.432 12.404 6.432V7.232C12.4821 7.232 12.5729 7.25931 12.6846 7.35703L13.2114 6.75497ZM12.404 6.432C12.0981 6.432 11.8263 6.55402 11.5966 6.75497L12.1234 7.35703C12.2351 7.25931 12.3259 7.232 12.404 7.232V6.432ZM11.559 6.7926C11.354 7.02688 11.236 7.30476 11.236 7.616H12.036C12.036 7.5219 12.0674 7.42645 12.161 7.3194L11.559 6.7926ZM11.236 7.616C11.236 7.92192 11.358 8.19374 11.559 8.4234L12.161 7.8966C12.0633 7.78492 12.036 7.69408 12.036 7.616H11.236ZM11.5966 8.46103C11.8263 8.66198 12.0981 8.784 12.404 8.784V7.984C12.3259 7.984 12.2351 7.95669 12.1234 7.85897L11.5966 8.46103ZM12.404 8.784C12.7099 8.784 12.9817 8.66198 13.2114 8.46103L12.6846 7.85897C12.5729 7.95669 12.4821 7.984 12.404 7.984V8.784ZM13.249 8.4234C13.454 8.18911 13.572 7.91123 13.572 7.6H12.772C12.772 7.6941 12.7406 7.78955 12.647 7.8966L13.249 8.4234ZM14.868 18.128V17.152H14.068V18.128H14.868ZM14.468 16.752H13.172V17.552H14.468V16.752ZM13.572 17.152V10.304H12.772V17.152H13.572ZM13.172 9.904H10.756V10.704H13.172V9.904ZM10.356 10.304V11.28H11.156V10.304H10.356ZM10.756 11.68H12.084V10.88H10.756V11.68ZM11.684 11.28V17.408H12.484V11.28H11.684ZM12.084 17.808H12.1V17.008H12.084V17.808ZM11.7 17.408V18.128H12.5V17.408H11.7ZM12.1 18.528H14.468V17.728H12.1V18.528Z"
        fill={theme.palette.secondary.main}
      />
    </SvgIcon>
  );
}

export default InfoIconOutlined;
