import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Section from 'web-components/lib/components/section';
import { TableActionButtons } from 'web-components/lib/components/buttons/TableActionButtons';
import { getAccountEcocreditsForBatch, getBatches } from '../lib/ecocredit';
import { ledgerRestUri } from '../ledger';
import { EcocreditsTable } from '../components/organisms';

import type { TableCredits } from '../components/organisms';

export const MyEcocredits: React.FC = () => {
  // const walletContext = useWallet();
  // const wallet = walletContext.wallet?.address;
  // TODO hard coded for now - the following should work for a user's data
  const wallet = 'regen1m5fecarvw0ltx2yvvru0kl4un03d3uca2kxggj';
  const [credits, setCredits] = useState<TableCredits[]>([]);

  const fetchData = async (): Promise<void> => {
    if (!wallet) return;
    const {
      data: { batches },
    } = await getBatches();
    const credits = await Promise.all(
      batches.map(async batch => {
        const {
          data: { retired_amount, tradable_amount },
        } = await getAccountEcocreditsForBatch(batch.batch_denom, wallet);
        return { ...batch, tradable_amount, retired_amount };
      }),
    );
    setCredits(credits);
  };

  useEffect(() => {
    if (!ledgerRestUri) return;
    fetchData();
  }, []);

  return (
    <Box sx={{ backgroundColor: 'grey.50' }}>
      <Section title="Portfolio" titleVariant="h3" titleAlign="left">
        <EcocreditsTable
          credits={credits}
          renderActionButtons={i => (
            <TableActionButtons
              buttons={[
                {
                  label: 'sell',
                  onClick: () => `TODO sell credit ${i}`,
                },
                {
                  label: 'Transfer',
                  onClick: () => `TODO transfer credit ${i}`,
                },
                {
                  label: 'Retire',
                  onClick: () => `TODO retire credit ${i}`,
                },
              ]}
            />
          )}
        />
      </Section>
    </Box>
  );
};
