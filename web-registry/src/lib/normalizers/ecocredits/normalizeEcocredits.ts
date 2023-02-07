import {
  BatchBalanceInfo,
  BatchInfo,
  ProjectInfo,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { AllCreditClassQuery } from 'generated/sanity-graphql';
import { BatchInfoWithBalance } from 'types/ledger/ecocredit';

import { normalizeClassProjectForBatch } from '../classProjectForBatch/normalizeClassProjectForBatch';
import { EMPTY_CLASS_PROJECT_INFO } from '../classProjectForBatch/normalizeClassProjectForBatch.constants';
import {
  EMPTY_BALANCE_INFO,
  EMPTY_BATCH_INFO,
} from './normalizeEcocredits.constants';

interface Params {
  balance?: BatchBalanceInfo;
  project?: ProjectInfo | null;
  metadata?: any | null;
  sanityCreditClassData?: AllCreditClassQuery;
  batch?: BatchInfo | null;
}

export const normalizeEcocredits = ({
  balance,
  batch,
  metadata,
  project,
  sanityCreditClassData,
}: Params): BatchInfoWithBalance => {
  const hasAllClassInfos =
    batch !== undefined &&
    metadata !== undefined &&
    project !== undefined &&
    !!sanityCreditClassData;

  const classProjectInfo = hasAllClassInfos
    ? normalizeClassProjectForBatch({
        batch,
        sanityCreditClassData,
        metadata,
        project,
      })
    : EMPTY_CLASS_PROJECT_INFO;

  return {
    ...(batch ?? EMPTY_BATCH_INFO),
    ...classProjectInfo,
    balance: { ...(balance ?? EMPTY_BALANCE_INFO) },
  };
};
