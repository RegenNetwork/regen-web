/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';

import Header from 'web-components/lib/components/header';
import Footer, { FooterItemProps as FooterItem } from 'web-components/lib/components/footer';
import { useTheme } from '@material-ui/core/styles';
import './layout.css';

interface propTypes {
  children: Array<React.ReactElement>;
  location: Location;
}

interface HeaderColors {
  [key: string]: string;
}

interface BoolProps {
  [key: string]: boolean;
}

const Layout = ({ children, location }: propTypes): JSX.Element => {
  const theme = useTheme();

  const headerColors: HeaderColors = {
    '/': theme.palette.primary.main,
    '/land-stewards/': theme.palette.primary.main,
    '/buyers/': theme.palette.primary.light,
    '/resources/': theme.palette.primary.main,
    '/privacy-policy/': theme.palette.primary.light,
    '/terms-service/': theme.palette.primary.light,
  };

  const headerAbsolute: BoolProps = {
    '/faq/': false,
  };

  const headerTransparent: BoolProps = {
    '/faq/': false,
  };

  const footerPaddingBottom: BoolProps = {
    '/buyers/': true,
    '/land-stewards/': true,
  };

  // Links in rest of the site must use the trailing '/' in order for these to work appropriately
  const headerNoBorderBottomPages: Array<string> = ['/', '/buyers/', '/land-stewards/'];

  const menuItems = [
    { title: 'Buyers', href: '/buyers' },
    { title: 'Land Stewards', href: '/land-stewards' },
    {
      title: 'Learn More',
      dropdownItems: [
        { title: 'Case Studies', href: '/case-studies' },
        { title: 'FAQ', href: '/faq' },
        { title: 'Team', href: '/team' },
      ],
    },
  ];
  const desktopColor: string = headerColors[location.pathname]
    ? headerColors[location.pathname]
    : theme.palette.primary.light;

  const absolute: boolean =
    headerAbsolute[location.pathname] !== undefined ? headerAbsolute[location.pathname] : true;
  const transparent: boolean =
    headerTransparent[location.pathname] !== undefined ? headerTransparent[location.pathname] : true;

  const footerItems: [FooterItem, FooterItem, FooterItem] = [
    {
      title: 'get involved',
      items: [
        {
          title: 'Buyers',
          href: '/buyers/',
        },
        {
          title: 'Land Stewards',
          href: '/land-stewards/',
        },
        {
          title: 'Developers & Validators',
          href: '/developers/',
        },
        {
          title: 'Scientists & Verifiers',
          href: '/scientists/',
        },
        {
          title: 'Invest',
          href: '/invest/',
        },
      ],
    },
    {
      title: 'learn more',
      items: [
        {
          title: 'Case Studies',
          href: '/case-studies/',
        },
        {
          title: 'Resources',
          href: '/resources/',
        },
        {
          title: 'FAQ',
          href: '/faq/',
        },
        {
          title: 'Team',
          href: '/team/',
        },
        {
          title: 'Contact',
          href: '/contact/',
        },
      ],
    },
    {
      title: 'regen',
      items: [
        {
          title: 'Partners',
          href: '/partners/',
        },
        {
          title: 'Media',
          href: '/media/',
        },
        {
          title: 'Careers',
          href: '/careers/',
        },
        {
          title: 'Forum',
          href: '/forum/',
        },
        {
          title: 'Press Kit',
          href: '/press-kit/',
        },
      ],
    },
  ];

  return (
    <>
      <Header
        menuItems={menuItems}
        transparent={transparent}
        absolute={absolute}
        color={desktopColor}
        borderBottom={!headerNoBorderBottomPages.includes(location.pathname)}
      />
      <div>
        <main>{children}</main>
      </div>
      <Footer
        footerItems={footerItems}
        mailerLiteDataAccount={process.env.GATSBY_MAILERLITE_DATA_ACCOUNT}
        mailerLiteDataForm={process.env.GATSBY_MAILERLITE_DATA_FORM_FOOTER}
        privacyUrl="/privacy-policy"
        termsUrl="/terms-service"
        paddingBottom={footerPaddingBottom[location.pathname]}
      />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
