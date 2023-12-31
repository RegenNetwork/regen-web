import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

interface IconProps extends SvgIconProps {}

export default function FilterIcon({
  sx = [],
  ...props
}: IconProps): JSX.Element {
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 25 24"
      sx={[{ fill: 'none' }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M14.492 8.857a.852.852 0 0 0 0 .387c.086.488.492.857.98.857s.894-.369.98-.857a.852.852 0 0 0 0-.387C16.366 8.37 15.96 8 15.472 8s-.894.37-.98.857Zm.98 3.245c1.393 0 2.465-.927 2.846-2.102h1.932a.25.25 0 0 0 .25-.25v-1.5a.25.25 0 0 0-.25-.25h-1.967c-.409-1.127-1.458-2-2.81-2-1.354 0-2.403.873-2.812 2H5.75a.25.25 0 0 0-.25.25v1.5c0 .138.112.25.25.25h6.876c.381 1.175 1.453 2.101 2.846 2.101ZM5.75 14a.25.25 0 0 0-.25.25v1.5c0 .138.112.25.25.25h1.9c.382 1.175 1.454 2.102 2.847 2.102s2.465-.927 2.846-2.102h6.907a.25.25 0 0 0 .25-.25v-1.5a.25.25 0 0 0-.25-.25h-6.942c-.409-1.127-1.458-2-2.811-2s-2.402.873-2.811 2H5.75Zm3.744 1.05a.85.85 0 0 1 .023-.193c.086-.488.492-.857.98-.857s.894.37.98.857a.847.847 0 0 1 0 .387c-.086.488-.492.858-.98.858s-.894-.37-.98-.858a.85.85 0 0 1-.023-.193Z"
        clipRule="evenodd"
      />
    </SvgIcon>
  );
}
