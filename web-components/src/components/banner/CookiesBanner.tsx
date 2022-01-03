import React, { useCallback, useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import Cookies from 'js-cookie';

// TODO use Section component
// import Section from '../section';
import ContainedButton from '../buttons/ContainedButton';
import { Theme } from '../../theme/muiTheme';

interface CookiesBannerProps {
  privacyUrl: string;
}

const rejectCookieName: string = 'cookies-rejected';
const cookieName: string =
  'gatsby-plugin-google-analytics-gdpr_cookies-enabled';

function getCookieValue(name: string): string | undefined {
  let cookieValue = Cookies.get(name);

  if (cookieValue === undefined) {
    cookieValue = Cookies.get(getLegacyCookieName(name));
  }
  return cookieValue;
}

function getLegacyCookieName(name: string): string {
  return `${name}-legacy`;
}

function setCookie(name: string, cookieValue: string): void {
  // const secure: boolean = window.location ? window.location.protocol === 'https:' : true;

  // const cookieOptions: CookieAttributes = { expires: 365, sameSite: 'None', secure };

  // Fallback for older browsers that can not set SameSite=None
  // https://web.dev/samesite-cookie-recipes/#handling-incompatible-clients
  // Cookies.set(getLegacyCookieName(cookieName), cookieValue, cookieOptions);

  // set the regular cookie
  Cookies.set(name, cookieValue, { expires: 730 });
}

const useStyles = makeStyles((theme: Theme) => ({
  background: {
    position: 'fixed',
    top: '0px',
    left: '0px',
    zIndex: 1000,
    backgroundColor: theme.palette.info.light,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(19),
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
    },
    boxShadow: theme.shadows[7],
  },
  // section: {
  //   paddingTop: 0,
  //   height: '100%',
  // },
  root: {
    height: '100%',
    [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing(37.5),
      paddingLeft: theme.spacing(37.5),
    },
    [theme.breakpoints.down('md')]: {
      paddingRight: theme.spacing(10),
      paddingLeft: theme.spacing(10),
    },
    [theme.breakpoints.down('sm')]: {
      height: theme.spacing(19),
      paddingRight: theme.spacing(4),
      paddingLeft: theme.spacing(4),
    },
    [theme.breakpoints.up('xl')]: {
      paddingRight: theme.spacing(5),
      paddingLeft: theme.spacing(5),
    },
    maxWidth: theme.breakpoints.values.lg,
    margin: '0 auto',
    '& a': {
      textDecoration: 'none',
      '&:link, &:visited, &:hover, &:active': {
        textDecoration: 'none',
      },
    },
  },
  link: {
    color: theme.palette.secondary.main,
  },
  text: {
    color: theme.palette.info.dark,
    lineHeight: '150%',
    paddingRight: theme.spacing(5),
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(3),
    },
  },
  button: {
    fontSize: theme.spacing(3.5),
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(8.75),
      minWidth: theme.spacing(33.25),
    },
    [theme.breakpoints.down('sm')]: {
      height: theme.spacing(8.75),
      minWidth: theme.spacing(22),
    },
  },
  reject: {
    cursor: 'pointer',
    color: theme.palette.info.main,
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(8.5),
      fontSize: theme.spacing(3.5),
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(2.5),
      fontSize: theme.spacing(3),
      textAlign: 'center',
    },
  },
  grid: {
    display: 'flex',
    wrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  backdrop: {
    zIndex: 100,
  },
}));

export default function CookiesBanner({
  privacyUrl,
}: CookiesBannerProps): JSX.Element | null {
  const classes = useStyles();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (
      getCookieValue(rejectCookieName) !== 'true' &&
      (getCookieValue(cookieName) === undefined ||
        getCookieValue(cookieName) === 'false')
    ) {
      setVisible(true);
    }
  }, [setVisible]);

  const accept = useCallback(() => {
    setCookie(cookieName, 'true');
    setVisible(false);
  }, []);

  const reject = useCallback(() => {
    setCookie(rejectCookieName, 'true');
    setVisible(false);
  }, []);

  if (visible) {
    return (
      <Backdrop className={classes.backdrop} open>
        <div className={classes.background}>
          <Grid
            container
            wrap="nowrap"
            alignItems="center"
            justifyContent="space-between"
            className={classes.root}
          >
            <Typography className={classes.text}>
              We use cookies to provide you with a great user experience. By
              using this site, you accept our use of{' '}
              <Link className={classes.link} href={privacyUrl}>
                cookies policy
              </Link>
              .
            </Typography>
            <div className={classes.grid}>
              <ContainedButton className={classes.button} onClick={accept}>
                accept
              </ContainedButton>
              <div className={classes.reject} onClick={reject}>
                Reject
              </div>
            </div>
          </Grid>
        </div>
      </Backdrop>
    );
  }
  return null;
}
