import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import Section from 'web-components/lib/components/section';
import { TableActionButtons } from 'web-components/lib/components/buttons/TableActionButtons';
import { getAccountEcocreditsForBatch, getBatches } from '../lib/ecocredit';
import { ledgerRestUri } from '../ledger';
import { EcocreditsTable } from '../components/organisms';

import type { TableCredits } from '../components/organisms';
import Title from 'web-components/lib/components/title';

export const EcocreditsForAccount: React.FC = () => {
  const { accountId } = useParams<{ accountId: string }>();
  const [credits, setCredits] = useState<TableCredits[]>([]);

  useEffect(() => {
    if (!ledgerRestUri || !accountId) return;
    const fetchData = async (): Promise<void> => {
      const {
        data: { batches },
      } = await getBatches();
      const credits = await Promise.all(
        batches.map(async batch => {
          const {
            data: { retired_amount, tradable_amount },
          } = await getAccountEcocreditsForBatch(batch.batch_denom, accountId);
          return { ...batch, tradable_amount, retired_amount };
        }),
      );
      setCredits(credits);
    };
    fetchData();
  }, [accountId]);

  return (
    <Box sx={{ backgroundColor: 'grey.50' }}>
      <Section title="Ecocredits for" titleVariant="h3" titleAlign="left">
        <Title sx={{ fontSize: 16, color: 'info.main' }}>
          Account: {accountId}
        </Title>
        <Box
          sx={{
            border: 1,
            borderColor: 'info.light',
            borderRadius: '8px',
            marginTop: 8,
            marginBottom: 12,
            overflow: 'hidden',
          }}
        >
          <EcocreditsTable
            credits={credits}
            renderActionButtons={row => (
              <TableActionButtons
                buttons={[
                  {
                    label: 'sell',
                    onClick: () => `TODO sell credit for ${row}`,
                  },
                  {
                    label: 'Transfer',
                    onClick: () => 'TODO transfer credit',
                  },
                  {
                    label: 'Retire',
                    onClick: () => 'TODO retire credit',
                  },
                ]}
              />
            )}
          />
        </Box>
      </Section>
    </Box>
  );
};
