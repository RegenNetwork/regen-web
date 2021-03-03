import React, { useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Theme, makeStyles } from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import { Alert, AlertTitle } from '@material-ui/lab';

interface WalletConnectionButtonProps {
  isKeplrDetected: boolean;
}
interface Keplr {
  enable: (chainId: string) => Promise<any>;
  experimentalSuggestChain: (chainOptions: object) => Promise<void>;
}

declare global {
  interface Window {
    keplr?: Keplr;
  }
}

const useStyles = makeStyles((theme: Theme) => ({
  walletButton: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: theme.spacing(16),
  },
  alert: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  alertIcon: {
    justifyContent: 'center',
    paddingTop: theme.spacing(4),
    paddingBottom: 0,
  },
  alertMessage: {
    paddingTop: theme.spacing(1),
    '& a': {
      color: theme.palette.secondary.main,
    },
  },
}));

const WalletConnectionButton = ({ isKeplrDetected }: WalletConnectionButtonProps): JSX.Element => {
  const classes = useStyles();
  const [isChainDetected, setIsChainDetected] = useState(false);
  const data = useStaticQuery(graphql`
    query {
      text: walletAddressRegistrationYaml {
        wallet {
          buttonText
          walletFoundButtonText
          noWalletFoundMessage
        }
      }
    }
  `);
  const content = data?.text?.wallet;
  const chainId = 'regen-devnet-4';

  const connectToKeplr = async (): Promise<any> => {
    if (window.keplr) {
      window.keplr
        .experimentalSuggestChain({
          // Chain-id of the Regen chain.
          chainId,
          // The name of the chain to be displayed to the user.
          chainName: 'Regen Devnet',
          // RPC endpoint of the chain.
          rpc: 'http://devnet.regen.network:26657',
          // REST endpoint of the chain.
          rest: 'https://devnet.regen.network',
          // Staking coin information
          stakeCurrency: {
            // Coin denomination to be displayed to the user.
            coinDenom: 'REGEN',
            // Actual denom (i.e. uatom, uscrt) used by the blockchain.
            coinMinimalDenom: 'uregen',
            // # of decimal points to convert minimal denomination to user-facing denomination.
            coinDecimals: 6,
            // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
            // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
            // coinGeckoId: ""
          },
          // (Optional) If you have a wallet webpage used to stake the coin then provide the url to the website in `walletUrlForStaking`.
          // The 'stake' button in Keplr extension will link to the webpage.
          // walletUrlForStaking: "",
          // The BIP44 path.
          bip44: {
            // You can only set the coin type of BIP44.
            // 'Purpose' is fixed to 44.
            coinType: 118,
          },
          // Bech32 configuration to show the address to user.
          // This field is the interface of
          // {
          //   bech32PrefixAccAddr: string;
          //   bech32PrefixAccPub: string;
          //   bech32PrefixValAddr: string;
          //   bech32PrefixValPub: string;
          //   bech32PrefixConsAddr: string;
          //   bech32PrefixConsPub: string;
          // }
          bech32Config: {
            bech32PrefixAccAddr: 'regen:',
            bech32PrefixAccPub: 'regen:pub',
            bech32PrefixValAddr: 'regen:valoper',
            bech32PrefixValPub: 'regen:valoperpub',
            bech32PrefixConsAddr: 'regen:valcons',
            bech32PrefixConsPub: 'regen:valconspub',
          },
          // List of all coin/tokens used in this chain.
          currencies: [
            {
              // Coin denomination to be displayed to the user.
              coinDenom: 'REGEN',
              // Actual denom (i.e. uatom, uscrt) used by the blockchain.
              coinMinimalDenom: 'uregen',
              // # of decimal points to convert minimal denomination to user-facing denomination.
              coinDecimals: 6,
              // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
              // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
              // coinGeckoId: ""
            },
          ],
          // List of coin/tokens used as a fee token in this chain.
          feeCurrencies: [
            {
              // Coin denomination to be displayed to the user.
              coinDenom: 'REGEN',
              // Actual denom (i.e. uatom, uscrt) used by the blockchain.
              coinMinimalDenom: 'uregen',
              // # of decimal points to convert minimal denomination to user-facing denomination.
              coinDecimals: 6,
              // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
              // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
              // coinGeckoId: ""
            },
          ],
          // (Optional) The number of the coin type.
          // This field is only used to fetch the address from ENS.
          // Ideally, it is recommended to be the same with BIP44 path's coin type.
          // However, some early chains may choose to use the Cosmos Hub BIP44 path of '118'.
          // So, this is separated to support such chains.
          coinType: 118,
          // (Optional) This is used to set the fee of the transaction.
          // If this field is not provided, Keplr extension will set the default gas price as (low: 0.01, average: 0.025, high: 0.04).
          // Currently, Keplr doesn't support dynamic calculation of the gas prices based on on-chain data.
          // Make sure that the gas prices are higher than the minimum gas prices accepted by chain validators and RPC/REST endpoint.
          gasPriceStep: {
            low: 0.01,
            average: 0.025,
            high: 0.04,
          },
          features: ['stargate'],
        })
        .then(() => {
          setIsChainDetected(true);
        })
        .catch(() => {
          setIsChainDetected(false);
        });
    }
  };

  return (
    <div className={classes.walletButton}>
      {isKeplrDetected ? (
        <ContainedButton onClick={connectToKeplr} disabled={isChainDetected}>
          {isChainDetected ? content?.walletFoundButtonText : content?.buttonText}
        </ContainedButton>
      ) : (
        <Alert
          severity="error"
          classes={{
            root: classes.alert,
            icon: classes.alertIcon,
            message: classes.alertMessage,
          }}
        >
          <AlertTitle>{ReactHtmlParser(content?.noWalletFoundMessage)}</AlertTitle>
        </Alert>
      )}
    </div>
  );
};

export default WalletConnectionButton;
