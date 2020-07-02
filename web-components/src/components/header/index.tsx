import React from 'react';
import { makeStyles, Theme, MenuItem, MenuList, Link, useMediaQuery, useTheme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import RegenIcon from '../icons/RegenIcon';
import clsx from 'clsx';
import MenuHover from '../menu-hover';
import MobileMenu from '../mobile-menu';

// import {
//   Link,
//   useParams,
//   useRouteMatch
// } from 'react-router-dom';
// import SearchIcon from '@material-ui/icons/Search';
// import MenuIcon from '@material-ui/icons/Menu';

export interface node {
  [key: number]: React.ReactNode;
}

interface HeaderProps {
  absolute?: boolean;
  children?: any;
  transparent?: boolean;
  color?: string;
  menuItems?: HeaderMenuItem[];
}

interface HeaderMenuItem {
  title: string;
  href?: string;
  dropdownItems?: { title: string; href: string }[];
}

const useStyles = makeStyles((theme: Theme) => ({
  mobile: {
    [theme.breakpoints.down('xs')]: {
      display: 'inline-block',
      padding: theme.spacing(1),
      'align-items': 'unset',
    },
  },
  menuItem: {
    // [theme.breakpoints.down('xs')]: {
    //   'margin-right': '2em',
    // },
  },
  logoItem: {
    [theme.breakpoints.down('xs')]: {},
  },
  menuList: {
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
    '& li': {
      paddingRight: '29.5px',
      paddingLeft: '29.5px',
    },
    '& li.MuiListItem-button': {
      '& :hover': {
        borderBottom: '3px dashed #b0ddc0',
      },
      'background-color': 'inherit',
      'text-decoration': 'none',
    },
    position: 'unset',
    width: 'unset',
    zIndex: 0,
  },
  background: {
    backgroundColor: theme.palette.primary.main,
  },
  absolute: {
    position: 'absolute',
    width: '100%',
  },
  transparent: {
    backgroundColor: `rgba(0,0,0,0)`,
  },
  color: (props: any) => ({
    color: props.textColor || theme.palette.primary.contrastText,
    '& ul > li > a': {
      color: props.textColor || theme.palette.primary.contrastText,
      textDecoration: 'none',
      fontFamily: 'Muli',
      textTransform: 'uppercase',
      '&:link, &:visited, &:hover, &:active': {
        textDecoration: 'none',
      },
    },
    '& ul > li > div > span': {
      color: props.textColor || theme.palette.primary.contrastText,
      textDecoration: 'none',
      fontFamily: 'Muli',
      textTransform: 'uppercase',
      '&:link, &:visited, &:hover, &:active': {
        textDecoration: 'none',
      },
    },
  }),
  root: {
    '& .MuiMenuItem-root > a, .MuiMenuItem-root > div > span': {
      'font-size': '.87rem',
      letterSpacing: '1px',
    },
    [theme.breakpoints.up('md')]: {
      padding: `${theme.spacing(2.5)} ${theme.spacing(12)}`,
      'padding-right': `0px`,
    },
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(27.5),
      '& a > svg': {
        fontSize: '12rem',
        height: theme.spacing(20.75),
      },
    },
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing(2.5)} ${theme.spacing(10)}`,
    },
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing(2.5)} ${theme.spacing(3.75)}`,
      height: theme.spacing(15),
    },
    [theme.breakpoints.up('xl')]: {
      paddingRight: theme.spacing(5),
      paddingLeft: theme.spacing(5),
    },
    maxWidth: theme.breakpoints.values.lg,
    margin: '0 auto',
    position: 'relative',
    zIndex: 10,
  },
  searchIcon: {
    color: theme.palette.grey[100],
    marginRight: theme.spacing(6.25),
    marginBottom: theme.spacing(1),
  },
  menuIcon: {
    color: theme.palette.primary.contrastText,
  },
  regenIcon: {
    [theme.breakpoints.down('xs')]: {
      height: theme.spacing(10.25),
      width: theme.spacing(23),
    },
  },
}));

export default function Header({
  absolute = false,
  children,
  transparent,
  color,
  menuItems,
}: HeaderProps): JSX.Element {
  const classes = useStyles({ textColor: color });
  const headerClass = [];
  const rootClass = [];
  rootClass.push(transparent ? classes.transparent : classes.background);
  rootClass.push(absolute ? classes.absolute : '');
  headerClass.push(classes.color, classes.root);

  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('sm'));

  let menu;
  if (desktop) {
    menu = (
      <MenuList className={classes.menuList}>
        {menuItems?.map((item, index) => (
          <MenuItem key={index}>
            {item.dropdownItems ? (
              <MenuHover text={item.title}>
                {item.dropdownItems.map((dropdownItem, index) => (
                  <MenuItem key={index}>
                    <Link href={dropdownItem.href}>{dropdownItem.title}</Link>
                  </MenuItem>
                ))}
              </MenuHover>
            ) : (
              <Link href={item.href}>{item.title}</Link>
            )}
          </MenuItem>
        ))}
      </MenuList>
    );
  } else {
    menu = <MobileMenu className={classes.mobile}></MobileMenu>;
  }

  return (
    <div className={clsx(rootClass)}>
      <Grid
        className={clsx(headerClass)}
        container
        direction="row"
        alignItems="center"
        justify="space-between"
      >
        <Grid className={classes.logoItem} item>
          <a href="/">
            <RegenIcon className={classes.regenIcon} color={color} />
          </a>
        </Grid>
        <Grid className={classes.menuItem} item>
          {menu}
        </Grid>
        {children}
        {/*<Grid item alignItems="center">
          <SearchIcon className={classes.searchIcon} />
          <MenuIcon className={classes.menuIcon} fontSize="large" />
        </Grid>*/}
      </Grid>
    </div>
  );
}
