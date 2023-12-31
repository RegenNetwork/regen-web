// This should be removed once we migrate
// the current queries to use regen-js instead of REST

export interface PageRequest {
  key: string | null;
  offset: string;
  limit: string;
  count_total: boolean;
  reverse: boolean;
}

export interface PageResponse {
  next_key: string | null;
  total: string;
}

export interface EventAttribute {
  key: string;
  value: string;
}

export interface EventTx {
  type: string;
  attributes: EventAttribute[];
}

export interface CreditItemEventTake {
  batch_denom: string;
  amount: string;
}
