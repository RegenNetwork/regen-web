import React from 'react';

import {
  NavLinkProps,
  useNavLinkStyles,
} from 'web-components/lib/components/header/components/NavLink';

import { Link } from './Link';

/**
 * @returns a registry `Link` with the navlink styles applied.
 */
export const RegistryNavLink: React.FC<NavLinkProps> = ({
  children,
  href,
  overrideClassname,
}) => {
  const isActive =
    window && window.location && window.location.pathname === href;
  const styles = useNavLinkStyles({ isActive: !!isActive });

  return (
    <Link href={href} className={overrideClassname ?? styles.navLink}>
      {children}
    </Link>
  );
};
