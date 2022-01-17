import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { makeStyles } from '@mui/styles';
import { Theme } from 'web-components/lib/theme/muiTheme';
import Title from 'web-components/lib/components/title';
import Section from 'web-components/lib/components/section';
import Description from 'web-components/lib/components/description';
import { WalletAddrRegInstructionsSectionQuery } from '../../generated/graphql';
import { BlockContent } from 'web-components/src/components/block-content';

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(21.5),
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(3),
      paddingTop: theme.spacing(17),
    },
  },
  title: {
    marginBottom: theme.spacing(8.5),
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(6.75),
    },
  },
  body: {
    textAlign: 'center',
    marginBottom: theme.spacing(15),
    maxWidth: theme.spacing(225),
    margin: '0 auto',
    [theme.breakpoints.down('md')]: {
      fontSize: theme.spacing(4),
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(5.5),
    },
  },
}));

const query = graphql`
  query walletAddrRegInstructionsSection {
    sanityWalletAddressRegistrationPage {
      instructionSection {
        title
        _rawBody
      }
    }
  }
`;

const InstructionsSection = (): JSX.Element => {
  const { sanityWalletAddressRegistrationPage } = useStaticQuery<WalletAddrRegInstructionsSectionQuery>(
    query,
  );
  const data = sanityWalletAddressRegistrationPage?.instructionSection;
  const styles = useStyles();
  return (
    <Section className={styles.section}>
      <Title className={styles.title} variant="h3" align="center">
        {data?.title}
      </Title>
      <Description className={styles.body}>{<BlockContent content={data?._rawBody} />}</Description>
    </Section>
  );
};

export default InstructionsSection;
