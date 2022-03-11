import type { PageResponse } from './base';
import type { QueryBalanceResponse as BankQueryBalanceResponse } from '@regen-network/api/lib/generated/cosmos/bank/v1beta1/query';

/** Map keys from another type to values of number type */
type MapToNumber<T> = { [K in keyof T]: number };

// Response structure based on https://buf.build/regen/regen-ledger

/** combines the ledger `BatchInfo` with ledger `QuerySupplyResponse` */
export interface BatchInfoWithSupply extends BatchInfo, QuerySupplyResponse {}

/** combines the ledger `BatchInfo` with ledger `QueryBalanceResponse` */
export interface BatchInfoWithBalance extends BatchInfo, QueryBalanceResponse {}

export interface TableBaskets extends Basket, BankQueryBalanceResponse {
  display_denom: string;
}

/** `QueryBatchSupplyResponse` + `amount_cancelled` to display summed totals on project page */
export interface BatchTotalsForProject
  extends MapToNumber<QuerySupplyResponse> {
  amount_cancelled: number;
}

// The following interfaces should be removed once we migrate
// the current queries to use regen-js instead of REST

export interface BatchInfo {
  start_date: string | Date;
  end_date: string | Date;
  issuer: string;
  batch_denom: string;
  class_id: string;
  total_amount: number;
  amount_cancelled: number;
  project_location: string;
}

export interface QueryBatchesResponse {
  batches: BatchInfo[];
  pagination: PageResponse;
}

export interface QueryBatchInfoResponse {
  info: BatchInfo;
}

export interface QuerySupplyResponse {
  tradable_supply: string;
  retired_supply: string;
}

export interface QueryBalanceResponse {
  tradable_amount: string;
  retired_amount: string;
}

export interface Basket {
  id: string;
  basket_denom: string;
  name: string;
  disable_auto_retire: boolean;
  credit_type_abbrev: string;
  date_criteria: {
    min_start_date?: string;
    start_date_window?: string;
  };
  exponent: string;
}

export interface QueryBasketsResponse {
  baskets: Basket[];
  pagination?: PageResponse;
}

export interface IBasket {
  id: string;
  basketDenom: string;
  name: string;
  disableAutoRetire: boolean;
  creditTypeAbbrev: string;
  dateCriteria: {
    minStartDate?: string;
    startDateWindow?: string;
  };
  exponent: string;
}

export interface QueryBasketRequest {
  basketDenom: string;
}

export interface QueryBasketResponse {
  basket?: IBasket;
  classes: string[];
}

export interface QueryBasketBalancesRequest {
  basketDenom: string;
  // pagination?: PageRequest; // DISABLED
}

export interface QueryBasketBalancesResponse {
  balances: BasketBalance[];
  // pagination?: PageResponse; // DISABLED
}

// BasketBalance stores the amount of credits from a batch in a basket
export interface BasketBalance {
  basketId: string | Long;
  batchDenom: string;
  balance: string;
  batchStartDate?: string | Date;
}

/**
 * Ecocredits
 */

/** BatchInfo represents the high-level on-chain information for a credit batch. */
export interface IBatchInfo {
  classId: string;
  batchDenom: string;
  issuer: string;
  totalAmount: string;
  metadata: string | Uint8Array;
  amountCancelled: string;
  startDate?: string | Date;
  endDate?: string | Date;
  projectLocation: string;
}

/** QueryBatchInfoRequest is the Query/BatchInfo request type. */
export interface QueryBatchInfoRequest {
  batchDenom: string;
}

/** QueryBatchInfoResponse is the Query/BatchInfo response type. */
export interface IQueryBatchInfoResponse {
  info: IBatchInfo;
}

export interface ClassInfo {
  /**
   *  class_id is the unique ID of credit class.
   */
  class_id: string;
  /**
   *  admin is the designer of the credit class. In Hambach, this is identified as "designer"
   */
  admin?: string;
  designer?: string;
  /**
   *  issuers are the approved issuers of the credit class.
   */
  issuers: string[];
  /**
   *  metadata is a hashed IRI that can be used to fetch JSON-LD from the metadata-graph DB table
   */
  metadata: Uint8Array;
  credit_type: CreditType;
}

export interface QueryClassInfoResponse {
  info?: ClassInfo;
}

interface CreditType {
  abbreviation: string;
  name: string;
  precision: number;
  unit: string;
}

// TODO: pull these types from credit-class shacl schema
export interface ApprovedMethodologyList {
  '@type': 'schema:BreadcrumbList';
  'schema:itemListElement': ApprovedMethodology[];
  'schema:url': {
    '@type': string;
    '@value': string;
  };
}

interface ApprovedMethodology {
  '@type': 'regen:Methodology';
  'schema:name': string;
  'schema:url': {
    '@type': string;
    '@value': string;
  };
}
