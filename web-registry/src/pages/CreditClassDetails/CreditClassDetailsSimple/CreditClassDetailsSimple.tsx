import React from 'react';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import { ClassInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { startCase } from 'lodash';

import SmallArrowIcon from 'web-components/lib/components/icons/SmallArrowIcon';
import ReadMore from 'web-components/lib/components/read-more';
import { Body, Label, Title } from 'web-components/lib/components/typography';
import type { Theme } from 'web-components/lib/theme/muiTheme';

import { CreditClassByOnChainIdQuery } from 'generated/graphql';
import {
  ApprovedMethodologies,
  CreditClassMetadataLD,
} from 'generated/json-ld';
import { getAccountUrl } from 'lib/block-explorer';

import { Link } from 'components/atoms';
import { AccountLink } from 'components/atoms/AccountLink';
import { EcocreditsSection, LineItemLabelAbove } from 'components/molecules';
import { CreditBatches, MoreProjectsSection } from 'components/organisms';

interface CreditDetailsProps {
  dbClass: CreditClassByOnChainIdQuery['creditClassByOnChainId'];
  onChainClass: ClassInfo;
  issuers?: string[];
  metadata?: CreditClassMetadataLD;
}

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  sectionPadding: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(30),
      paddingBottom: theme.spacing(30),
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(20),
      paddingBottom: theme.spacing(20),
    },
  },
  topSection: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(12),
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(20),
    },
  },
  label: {
    fontSize: theme.typography.pxToRem(12),
    color: theme.palette.primary.contrastText,
    marginBottom: theme.spacing(3),
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 5,
    border: `1px solid ${theme.palette.grey[100]}`,
    background: theme.palette.primary.main,
    padding: theme.spacing(11, 5),
    margin: theme.spacing(4, 0),
    [theme.breakpoints.up('sm')]: {
      minWidth: theme.spacing(91.75),
    },
  },
  link: {
    color: theme.palette.secondary.main,
    fontWeight: 700,
  },
  description: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(22),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(18),
    },
  },
  marginBottom: {
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(12),
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(8.75),
    },
  },
  sidebarItemMargin: {
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(8.75),
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(8),
    },
    '&:last-child': {
      marginBottom: 0,
    },
  },
  arrow: {
    fontSize: theme.typography.pxToRem(16),
  },
  title: {
    textAlign: 'left',
  },
  textContainer: {
    paddingTop: 0,
  },
}));

const CreditClassDetailsSimple: React.FC<CreditDetailsProps> = ({
  dbClass,
  onChainClass,
  issuers,
  metadata,
}) => {
  const styles = useStyles();
  const offsetGenerationMethods = metadata?.['regen:offsetGenerationMethod'];
  const sectoralScopes = metadata?.['regen:sectoralScope'];
  const verificationMethod = metadata?.['regen:verificationMethod'];
  const sourceRegistry = metadata?.['regen:sourceRegistry'];

  const getCreditType = (creditTypeAbbrev: string): string => {
    // TODO: add credit types as they come online, or fetch from ledger somehow
    return (
      {
        // eslint-disable-next-line prettier/prettier
        C: 'Carbon',
      }[creditTypeAbbrev] || creditTypeAbbrev
    );
  };

  const Projects: React.FC = () => {
    const projects = dbClass?.projectsByCreditClassId?.nodes;
    if (!projects || projects.length < 1) return null;
    return (
      <div className="topo-background-alternate">
        <MoreProjectsSection
          classes={{ root: styles.sectionPadding, title: styles.title }}
          title="Projects"
          projects={projects}
        />
      </div>
    );
  };

  const ApprovedMethodologies: React.FC<{
    methodologyList?: ApprovedMethodologies;
  }> = ({ methodologyList }) => {
    if (!methodologyList) return null;

    const methodologies = methodologyList?.['schema:itemListElement'];
    const count = methodologies?.length;
    const firstMethodology = methodologies?.[0];

    if (!count || count < 1) return null;
    return (
      <LineItemLabelAbove
        label="approved methodologies"
        data={
          <Box>
            <Body size="xl" key={firstMethodology?.['schema:name']}>
              {firstMethodology?.['schema:name']}
            </Body>
            {count > 1 && (
              <Link
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'secondary.main',
                }}
                href={methodologyList?.['schema:url']?.['@value']}
                target="_blank"
              >
                <Label sx={{ fontSize: [16], mr: 2 }}>{`+ ${
                  count - 1
                } more`}</Label>{' '}
                <SmallArrowIcon className={styles.arrow} />
              </Link>
            )}
          </Box>
        }
      />
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'primary.main',
      }}
    >
      <EcocreditsSection classes={{ root: styles.topSection }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              mr: { xs: 0, md: 12 },
            }}
          >
            <Box sx={{ mb: 6 }}>
              <Label size="sm" color="info.dark" mb={4}>
                credit class
              </Label>
              <Title variant="h1">
                {metadata?.['schema:name']} ({onChainClass.id})
              </Title>
            </Box>
            {metadata?.['schema:description'] && (
              <ReadMore
                classes={{
                  root: styles.marginBottom,
                  textContainer: styles.textContainer,
                  description: styles.description,
                }}
              >
                {metadata?.['schema:description']}
              </ReadMore>
            )}
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              <LineItemLabelAbove
                label="credit type"
                data={
                  <Body size="xl" sx={{ mr: 1 }}>
                    {getCreditType(onChainClass.creditTypeAbbrev)}
                  </Body>
                }
              />
              {sourceRegistry?.['schema:name'] && (
                <LineItemLabelAbove
                  label="registry"
                  data={
                    <Link
                      href={sourceRegistry?.['schema:url']?.['@value']}
                      target="_blank"
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Body size="xl" sx={{ mr: 1 }}>
                          {sourceRegistry?.['schema:name']}
                        </Body>
                        <SmallArrowIcon
                          sx={{ mt: '-2px' }}
                          className={styles.arrow}
                        />
                      </Box>
                    </Link>
                  }
                />
              )}
              <ApprovedMethodologies
                methodologyList={metadata?.['regen:approvedMethodologies']}
              />
              {offsetGenerationMethods && offsetGenerationMethods?.length > 0 && (
                <LineItemLabelAbove
                  label={`offset generation method${
                    offsetGenerationMethods.length > 1 ? 's' : ''
                  }`}
                  data={
                    <>
                      {offsetGenerationMethods.map((method, i) => (
                        <Body key={i} size="xl">
                          {startCase(method)}
                        </Body>
                      ))}
                    </>
                  }
                />
              )}
              {verificationMethod && (
                <LineItemLabelAbove
                  label="verification method"
                  data={<Body size="xl">{startCase(verificationMethod)}</Body>}
                />
              )}
              {sectoralScopes && sectoralScopes?.length > 0 && (
                <LineItemLabelAbove
                  label={`sectoral scope${
                    sectoralScopes.length > 1 ? 's' : ''
                  }`}
                  data={
                    <>
                      {sectoralScopes.map((sector, i) => (
                        <Body key={i} size="xl">
                          {sector}
                        </Body>
                      ))}
                    </>
                  }
                />
              )}
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box className={styles.box}>
              <div className={styles.sidebarItemMargin}>
                <Label size="xs" color="primary.contrastText" mb={3}>
                  admin
                </Label>
                <AccountLink
                  className={styles.link}
                  address={onChainClass.admin}
                />
              </div>
              <div className={styles.sidebarItemMargin}>
                <Label size="xs" color="primary.contrastText" mb={3}>
                  issuers
                </Label>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  {issuers?.map((issuer: string) => (
                    <AccountLink
                      key={issuer}
                      address={issuer}
                      className={styles.link}
                      href={getAccountUrl(issuer)}
                    />
                  ))}
                </Box>
              </div>
            </Box>
          </Box>
        </Box>
      </EcocreditsSection>
      <Projects />
      <div className="topo-background-alternate">
        <CreditBatches
          creditClassId={onChainClass.id}
          titleAlign="left"
          withSection
        />
      </div>
    </Box>
  );
};

export { CreditClassDetailsSimple };