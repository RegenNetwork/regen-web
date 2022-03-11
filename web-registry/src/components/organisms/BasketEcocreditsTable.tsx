import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material';

import {
  ActionsTable,
  RenderActionButtonsFunc,
} from 'web-components/lib/components/table/ActionsTable';

import { truncate } from '../../lib/wallet';
import { getAccountUrl } from '../../lib/block-explorer';
import { NoCredits } from '../molecules';
import type { BatchInfo } from '../../types/ledger/ecocredit';
import { formatNumber } from 'web-components/lib/components/table';
import { formatDate } from 'web-components/lib/utils/format';

const GreyText = styled('span')(({ theme }) => ({
  color: theme.palette.info.main,
}));

const BreakText = styled('div')({
  whiteSpace: 'normal',
  wordWrap: 'break-word',
});

export interface BasketEcocreditsTableProps {
  batches: BatchInfo[];
  renderActionButtons?: RenderActionButtonsFunc;
}

const BasketEcocreditsTable: React.FC<BasketEcocreditsTableProps> = ({
  batches,
  renderActionButtons,
}) => {
  if (!batches?.length) {
    return <NoCredits title="No credit batches to display" />;
  }

  return (
    <ActionsTable
      tableLabel="basket ecocredits table"
      renderActionButtons={renderActionButtons}
      headerRows={[
        // TODO: Project
        <Box sx={{ minWidth: { xs: '8rem', sm: '11rem', md: 'auto' } }}>
          Batch Denom
        </Box>,
        'Issuer',
        'Amount',
        <BreakText>Credit Class</BreakText>,
        <BreakText>Batch Start Date</BreakText>,
        <BreakText>Batch End Date</BreakText>,
        'Project Location',
      ]}
      rows={batches.map((item, i) => {
        return [
          <Box
            component="span"
            sx={{
              whiteSpace: {
                xs: 'wrap-word',
                md: 'nowrap',
              },
            }}
          >
            {item.batch_denom}
          </Box>,
          <a
            href={getAccountUrl(item.issuer as string)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {truncate(item.issuer as string)}
          </a>,
          formatNumber(item.total_amount),
          item.class_id,
          <GreyText>{formatDate(item.start_date)}</GreyText>,
          <GreyText>{formatDate(item.end_date)}</GreyText>,
          item.project_location,
        ];
      })}
    />
  );
};

export default BasketEcocreditsTable;
