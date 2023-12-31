import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

interface IconProps extends SvgIconProps {}

export default function AvatarOutlineIcon({
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
        d="m14.816 12.021-.614-.79a1 1 0 0 0 .227 1.712l.387-.922Zm-5.498 0 .388.922a1 1 0 0 0 .226-1.711l-.614.79Zm-4.782 6.015.978.21-.978-.21Zm15.063 0-.978.21.978-.21Zm-4.05-9.555a3.474 3.474 0 0 1-1.347 2.75l1.228 1.58a5.474 5.474 0 0 0 2.119-4.33h-2ZM12.067 5a3.481 3.481 0 0 1 3.482 3.481h2A5.481 5.481 0 0 0 12.067 3v2ZM8.586 8.481A3.481 3.481 0 0 1 12.067 5V3a5.481 5.481 0 0 0-5.481 5.481h2Zm1.346 2.75a3.474 3.474 0 0 1-1.346-2.75h-2c0 1.761.831 3.328 2.119 4.33l1.227-1.58Zm-4.418 7.015c.533-2.479 2.146-4.444 4.192-5.303L8.93 11.1c-2.699 1.134-4.714 3.665-5.372 6.726l1.955.42Zm.813.776a.917.917 0 0 1-.667-.272.538.538 0 0 1-.146-.504l-1.955-.42c-.398 1.85 1.186 3.195 2.768 3.195v-2Zm11.481 0H6.327v2h11.481v-2Zm.813-.776a.538.538 0 0 1-.146.504.917.917 0 0 1-.667.271v2c1.582 0 3.166-1.346 2.768-3.196l-1.955.42Zm-4.192-5.303c2.045.86 3.659 2.824 4.192 5.303l1.955-.42c-.658-3.062-2.673-5.593-5.373-6.727l-.774 1.844Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
}
