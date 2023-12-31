import SvgIcon from '@mui/material/SvgIcon';
import { makeStyles } from 'tss-react/mui';

interface SpinIconProps {
  direction?: 'next' | 'prev' | 'down' | 'up';
}

interface DirectionRotate {
  up: string;
  down: string;
  prev: string;
  next: string;
}

const directionRotate: DirectionRotate = {
  up: '0deg',
  down: '180deg',
  prev: '90deg',
  next: '-90deg',
};

export interface StyleProps {
  rotate: string;
}

const useStyles = makeStyles<StyleProps>()((theme, { rotate }) => ({
  icon: {
    transform: `rotate(${rotate})`,
    fill: theme.palette.primary.main,
    fontSize: '0.5rem',
  },
}));

export default function SpinIcon({
  direction = 'up',
}: SpinIconProps): JSX.Element {
  const rotate: string = directionRotate[direction];
  const { classes } = useStyles({ rotate });
  return (
    <SvgIcon viewBox="0 0 8 5" className={classes.icon}>
      <path d="M0.5 4.5L4 1L7.5 4.5" stroke="#D2D5D9" />
    </SvgIcon>
  );
}
