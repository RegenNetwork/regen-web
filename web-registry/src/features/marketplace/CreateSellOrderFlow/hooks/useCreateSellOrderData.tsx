import { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import { useLedger } from 'ledger';

import useEcocreditsByProject from 'hooks/useEcocreditsByProject';

type Props = {
  projectId: string;
};

type ReponseType = {
  isSellFlowDisabled: boolean;
  credits: BatchInfoWithBalance[];
};

export const useCreateSellOrderData = ({ projectId }: Props): ReponseType => {
  const { wallet } = useLedger();

  const { credits, isLoadingCredits } = useEcocreditsByProject({
    address: wallet?.address,
    projectId,
    widthAdditionalData: false,
  });

  const hasTradeableCredits = credits.some(
    credit => Number(credit.balance?.tradableAmount ?? 0) > 0,
  );

  const isSellFlowDisabled =
    (isLoadingCredits || !hasTradeableCredits) && Boolean(wallet?.address);

  return {
    isSellFlowDisabled,
    credits,
  };
};