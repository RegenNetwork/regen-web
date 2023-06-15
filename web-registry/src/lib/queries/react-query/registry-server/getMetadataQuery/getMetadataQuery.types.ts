import { QueryClientImpl as DataQueryClientImpl } from '@regen-network/api/lib/generated/regen/data/v1/query';
import { QueryObserverOptions } from '@tanstack/react-query';

import { AnchoredProjectMetadataLD } from 'lib/db/types/json-ld';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryMetadataResponse =
  QueryObserverOptions<AnchoredProjectMetadataLD>;

export type ReactQueryMetadataProps = {
  iri?: string;
  dataClient?: DataQueryClientImpl;
} & ReactQueryBuilderResponse<ReactQueryMetadataResponse>;
