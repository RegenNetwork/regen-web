import { useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import { useTheme } from '@mui/styles';

import { Flex } from 'web-components/lib/components/box';
import BridgeIcon from 'web-components/lib/components/icons/BridgeIcon';
import { CreditBatchIcon } from 'web-components/lib/components/icons/CreditBatchIcon';
import { CreditClassIcon } from 'web-components/lib/components/icons/CreditClassIcon';
import CreditsIcon from 'web-components/lib/components/icons/CreditsIcon';
import { ProjectPageIcon } from 'web-components/lib/components/icons/ProjectPageIcon';
import { ProfileHeader } from 'web-components/lib/components/organisms/ProfileHeader/ProfileHeader';
import { SocialLink } from 'web-components/lib/components/organisms/ProfileHeader/ProfileHeader.types';
import { IconTabProps } from 'web-components/lib/components/tabs/IconTab';
import { IconTabs } from 'web-components/lib/components/tabs/IconTabs';
import { containerStyles } from 'web-components/lib/styles/container';
import { truncate } from 'web-components/lib/utils/truncate';

import { getAccountUrl } from 'lib/block-explorer';
import { isBridgeEnabled } from 'lib/ledger';
import { useWallet } from 'lib/wallet/wallet';

import { usePartyInfos } from 'pages/ProfileEdit/hooks/usePartyInfos';
import {
  DEFAULT_NAME,
  DEFAULT_PROFILE_BG,
  profileVariantMapping,
} from 'pages/ProfileEdit/ProfileEdit.constants';
import { Link } from 'components/atoms';
import { useQueryIfCreditClassCreator } from 'hooks/useQueryIfCreditClassCreator';
import { useQueryIfIssuer } from 'hooks/useQueryIfIssuer';
import { useQueryIfProjectAdmin } from 'hooks/useQueryIfProjectAdmin';

import { dashBoardStyles } from './Dashboard.styles';
import { getSocialsLinks } from './Dashboard.utils';

const Dashboard = (): JSX.Element => {
  const theme = useTheme();
  const isIssuer = useQueryIfIssuer();
  const isCreditClassCreator = useQueryIfCreditClassCreator();
  const isProjectAdmin = useQueryIfProjectAdmin();
  const showProjectTab = isIssuer || isProjectAdmin;
  const { wallet, accountId, partyByAddr } = useWallet();
  const location = useLocation();

  const { party, defaultAvatar } = usePartyInfos({ partyByAddr });

  const socialsLinks: SocialLink[] = useMemo(
    () => getSocialsLinks({ partyByAddr }),
    [partyByAddr],
  );

  const tabs: IconTabProps[] = useMemo(
    () => [
      {
        label: 'Portfolio',
        icon: (
          <CreditsIcon color={theme.palette.secondary.main} fontSize="small" />
        ),
        href: '/ecocredits/portfolio',
      },
      {
        label: 'Projects',
        icon: <ProjectPageIcon />,
        href: '/ecocredits/projects',
        hidden: !showProjectTab,
      },
      {
        label: 'Credit Classes',
        icon: <CreditClassIcon sx={{ opacity: '70%' }} />,
        href: '/ecocredits/credit-classes',
        hidden: true,
      },
      {
        label: 'Credit Batches',
        icon: (
          <CreditBatchIcon sx={{ color: 'secondary.dark', opacity: '70%' }} />
        ),
        href: '/ecocredits/credit-batches',
        hidden: !isIssuer,
      },
      {
        label: 'Bridge',
        icon: <BridgeIcon />,
        href: '/ecocredits/bridge',
        hidden: !isBridgeEnabled,
      },
    ],
    [isIssuer, showProjectTab, theme.palette.secondary.main],
  );

  const activeTab = Math.max(
    tabs
      .filter(tab => !tab.hidden)
      .findIndex(tab => location.pathname.includes(tab.href ?? '')),
    0,
  );

  return (
    <>
      <ProfileHeader
        name={party?.name ? party?.name : DEFAULT_NAME}
        backgroundImage={party?.bgImage ? party?.bgImage : DEFAULT_PROFILE_BG}
        avatar={party?.image ? party?.image : defaultAvatar}
        infos={{
          addressLink: {
            href: getAccountUrl(wallet?.address, true),
            text: truncate(wallet?.address),
          },
          description: party?.description?.trimEnd() ?? '',
          socialsLinks,
        }}
        editLink={accountId ? '/profile/edit' : ''}
        variant={party?.type ? profileVariantMapping[party.type] : 'individual'}
        LinkComponent={Link}
      />
      <Box sx={{ bgcolor: 'grey.50' }}>
        <Box sx={{ pt: 15, ...containerStyles, px: { xs: 5, sm: 10 } }}>
          <IconTabs
            aria-label="dashboard tabs"
            tabs={tabs}
            activeTab={activeTab}
            linkComponent={Link}
            mobileFullWidth
          />
          <Flex sx={{ ...dashBoardStyles.padTop }}>
            <Box sx={{ width: '100%' }}>
              <Outlet
                context={{
                  isCreditClassCreator,
                  isProjectAdmin,
                  isIssuer,
                }}
              />
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export { Dashboard };
