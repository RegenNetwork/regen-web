import { useCallback, useEffect, useMemo, useState } from 'react';
import { State, WalletStatus } from '@cosmos-kit/core';
import { useManager } from '@cosmos-kit/react-lite';
import { useQuery } from '@tanstack/react-query';
import { REGEN_DENOM } from 'config/allowedBaseDenoms';
import { useAtom } from 'jotai';

import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import WalletModal from 'web-components/lib/components/modal/wallet-modal';
import { WalletModalState } from 'web-components/lib/components/modal/wallet-modal/WalletModal.types';

import { useLedger } from 'ledger';
import { isWaitingForSigningAtom } from 'lib/atoms/tx.atoms';
import { getBalanceQuery } from 'lib/queries/react-query/cosmos/bank/getBalanceQuery/getBalanceQuery';

import { chainId } from '../../../lib/ledger';
import { useWallet } from '../../../lib/wallet/wallet';
import { useConnectToWallet } from './hooks/useConnectToWallet';
import { useNavigateToMobileUrl } from './hooks/useNavigateToMobileUrl';
import { useResetModalOnConnect } from './hooks/useResetModalOnConnect';
import { MobileSigningModal } from './WalletButton.SigningModal';
import { useWalletButtonStyles } from './WalletButton.styles';
import { ButtonSize } from './WalletButton.types';
import { getMobileConnectUrl, getWalletsUiConfig } from './WalletButton.utils';

import Keplr from 'assets/keplr.png';

type Props = {
  size?: ButtonSize;
};

const WalletButton = ({ size = 'small' }: Props) => {
  const styles = useWalletButtonStyles();
  const { wallet, connect, loaded, walletConnectUri, isConnected } =
    useWallet();

  const { walletRepos } = useManager();
  const [qrState, setQRState] = useState<State>(State.Init); // state of QRCode

  const current = walletRepos[0]?.current;
  (current?.client as any)?.setActions?.({
    qrUrl: {
      state: setQRState,
    },
  });

  const walletStatus = current?.walletStatus;
  const message = current?.message;
  const qrUrl = current?.qrUrl;

  const { bankClient } = useLedger();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWaitingForSigning, setIsWaitingForSigningAtom] = useAtom(
    isWaitingForSigningAtom,
  );
  const [modalState, setModalState] =
    useState<WalletModalState>('wallet-select');
  const [connecting, setConnecting] = useState<boolean>(false);
  const [qrCodeUri, setQrCodeUri] = useState<string | undefined>();
  const isConnectedLoaded = loaded ? isConnected : null;

  useEffect(() => {
    if (isModalOpen) {
      setConnecting(
        walletStatus === WalletStatus.Connecting && qrState === State.Init,
      );
      setQrCodeUri(qrUrl?.data);
    }
  }, [isModalOpen, qrState, walletStatus, qrUrl?.data, message]);

  // Populate cache with user balance once connected
  useQuery(
    getBalanceQuery({
      request: { address: wallet?.address, denom: REGEN_DENOM },
      client: bankClient,
      enabled: !!bankClient && !!wallet?.address,
    }),
  );

  const onButtonClick = useCallback(
    (): void => setIsModalOpen(true),
    [setIsModalOpen],
  );

  const onModalClose = useCallback((): void => {
    setIsModalOpen(false);
    setModalState('wallet-select');
  }, [setIsModalOpen, setModalState]);

  const connectToWallet = useConnectToWallet({
    onModalClose,
    setModalState,
    connect,
    connectWalletConnect: walletRepos[0]?.connect, // only one walletRepos for regen
  });

  const walletsUiConfig = useMemo(
    () =>
      getWalletsUiConfig({
        connectToWallet,
      }),
    [connectToWallet],
  );
  const mobileConnectUrl = useMemo(
    () => getMobileConnectUrl({ uri: walletConnectUri }),
    [walletConnectUri],
  );

  useNavigateToMobileUrl({
    mobileConnectUrl,
    isWaitingForSigning,
    isConnected: isConnectedLoaded,
  });
  useResetModalOnConnect({ setIsModalOpen, setModalState, wallet });

  return chainId ? (
    <>
      <div className={styles.root}>
        <>
          {!isConnected && loaded && (
            <OutlinedButton onClick={onButtonClick} size={size}>
              <img className={styles.icon} src={Keplr} alt="keplr" />
              login
            </OutlinedButton>
          )}
        </>
      </div>
      <WalletModal
        open={isModalOpen}
        onClose={onModalClose}
        wallets={walletsUiConfig}
        state={modalState}
        qrCodeUri={qrCodeUri}
        connecting={connecting}
      />
      <MobileSigningModal
        isOpen={isWaitingForSigning && !!walletConnectUri}
        onClose={() => setIsWaitingForSigningAtom(false)}
      />
    </>
  ) : (
    <></>
  );
};

export { WalletButton };
