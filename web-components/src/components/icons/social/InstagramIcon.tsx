import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import { DefaultTheme as Theme } from '@mui/styles';
import { makeStyles } from 'tss-react/mui';

import withHoverColor, { Props } from '../withHoverColor';

const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    width: theme.spacing(9.25),
    height: theme.spacing(9.25),
  },
}));

function InstagramIcon({
  className,
  color,
  onMouseEnter,
  onMouseLeave,
}: Props): JSX.Element {
  const { classes, cx } = useStyles();

  return (
    <SvgIcon
      className={cx(classes.root, className)}
      viewBox="0 0 37 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <path
        d="M27.7491 22.2242C27.6726 23.7488 27.3244 25.0993 26.212 26.212C25.0997 27.3288 23.7498 27.677 22.2252 27.7493C20.6544 27.8385 15.9457 27.8385 14.3746 27.7493C12.8503 27.6728 11.5044 27.3246 10.3878 26.212C9.27124 25.0993 8.92296 23.7492 8.85075 22.2242C8.76166 20.6529 8.76166 15.9433 8.85075 14.3718C8.92724 12.8472 9.27112 11.4968 10.3878 10.3841C11.5045 9.27145 12.8548 8.92332 14.3749 8.8511C15.9457 8.76187 20.6544 8.76187 22.2255 8.8511C23.7498 8.92761 25.1 9.27573 26.2123 10.3884C27.329 11.5011 27.6771 12.8512 27.7493 14.3761C27.8382 15.9474 27.8382 20.6529 27.7491 22.2242Z"
        fill={color}
      />
      <path
        d="M25.2512 13.0439C24.9368 12.26 24.336 11.6592 23.5561 11.3488C22.3863 10.8872 19.597 10.9907 18.2999 10.9907C17.0028 10.9907 14.2174 10.8833 13.0437 11.3488C12.2598 11.663 11.6589 12.2636 11.3486 13.0439C10.887 14.2135 10.9908 17.0029 10.9908 18.3C10.9908 19.5971 10.8831 22.3824 11.3486 23.556C11.6629 24.3399 12.2637 24.9408 13.0437 25.2511C14.2135 25.7127 17.0027 25.6093 18.2999 25.6093C19.5971 25.6093 22.3823 25.7166 23.5561 25.2511C24.34 24.9368 24.9409 24.3359 25.2512 23.556C25.7167 22.3862 25.6093 19.5969 25.6093 18.2998C25.6093 17.0026 25.7165 14.2175 25.2512 13.0439ZM18.2999 22.8719C17.3957 22.8719 16.5117 22.6038 15.7599 22.1014C15.008 21.599 14.4221 20.885 14.076 20.0496C13.73 19.2142 13.6394 18.2949 13.8159 17.408C13.9923 16.5212 14.4277 15.7065 15.0671 15.0671C15.7065 14.4277 16.5211 13.9923 17.408 13.8159C18.2948 13.6395 19.2141 13.73 20.0495 14.0761C20.8849 14.4221 21.5989 15.0081 22.1013 15.76C22.6037 16.5118 22.8718 17.3957 22.8718 18.3C22.8727 18.9006 22.7551 19.4956 22.5257 20.0507C22.2963 20.6058 21.9596 21.1102 21.5348 21.5349C21.1101 21.9597 20.6057 22.2964 20.0506 22.5258C19.4955 22.7553 18.9006 22.8729 18.2999 22.8719ZM23.0587 14.6075C22.8478 14.6075 22.6416 14.545 22.4662 14.4278C22.2908 14.3106 22.1541 14.1441 22.0733 13.9492C21.9926 13.7543 21.9715 13.5399 22.0126 13.333C22.0538 13.1261 22.1554 12.936 22.3045 12.7869C22.4537 12.6377 22.6437 12.5362 22.8506 12.495C23.0575 12.4539 23.2719 12.475 23.4668 12.5557C23.6617 12.6365 23.8282 12.7732 23.9454 12.9486C24.0626 13.124 24.1251 13.3302 24.1251 13.5411C24.1254 13.6812 24.098 13.82 24.0445 13.9496C23.9911 14.0791 23.9125 14.1968 23.8134 14.2958C23.7144 14.3949 23.5967 14.4735 23.4672 14.5269C23.3377 14.5804 23.1989 14.6078 23.0587 14.6075Z"
        fill="#545555"
      />
      <path
        d="M18.2999 21.9601C20.3213 21.9601 21.9599 20.3215 21.9599 18.3001C21.9599 16.2788 20.3213 14.6401 18.2999 14.6401C16.2785 14.6401 14.6399 16.2788 14.6399 18.3001C14.6399 20.3215 16.2785 21.9601 18.2999 21.9601Z"
        fill="#545555"
      />
    </SvgIcon>
  );
}

export default withHoverColor(InstagramIcon);
