import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Field, Form, Formik, FormikErrors } from 'formik';

import AmountField from '../inputs/AmountField';
import CheckboxLabel from '../inputs/CheckboxLabel';
import NumberTextField from '../inputs/NumberTextField';
import SelectTextField, { Option } from '../inputs/SelectTextField';
import {
  requiredMessage,
  validateAmount,
  validatePrice,
} from '../inputs/validation';
import { RegenModalProps } from '../modal';
import { Label, Subtitle } from '../typography';
import Submit from './Submit';

export interface CreateSellOrderProps {
  batchDenoms: Option[];
  sellDenom: string;
  availableAmountByBatch: { [batchDenom: string]: number };
  onSubmit: (values: FormValues) => Promise<void>;
}

interface FormProps extends CreateSellOrderProps {
  onClose: RegenModalProps['onClose'];
}

export interface FormValues {
  batchDenom?: string;
  price?: number;
  amount?: number;
  disableAutoRetire?: boolean;
}

const CreateSellOrderForm: React.FC<FormProps> = ({
  sellDenom,
  batchDenoms,
  availableAmountByBatch,
  onClose,
  onSubmit,
}) => {
  const [options, setOptions] = useState<Option[]>([]);

  const initialValues = {
    batchDenom: batchDenoms[0].value,
    price: undefined,
    amount: undefined,
    disableAutoRetire: false,
  };

  useEffect(() => {
    setOptions(batchDenoms);
  }, [batchDenoms]);

  const validateHandler = (values: FormValues): FormikErrors<FormValues> => {
    let errors: FormikErrors<FormValues> = {};

    if (!values.batchDenom) {
      errors.batchDenom = requiredMessage;
    }
    const errAmount = validateAmount(
      availableAmountByBatch[values.batchDenom ?? ''],
      values.amount,
    );
    if (errAmount) errors.amount = errAmount;

    const errPrice = validatePrice(values.price);
    if (errPrice) errors.price = errPrice;

    return errors;
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validateHandler}
      onSubmit={onSubmit}
    >
      {({ values, submitForm, isSubmitting, isValid, submitCount, status }) => (
        <Form>
          <Field
            name="batchDenom"
            label="Batch denom"
            component={SelectTextField}
            options={options}
            sx={{ mb: 10.5 }}
          />
          <Box sx={{ display: 'flex', alignItems: 'end', mb: 0.5 }}>
            <Field
              component={NumberTextField}
              name="price"
              label="Price"
              increment={0.1}
              min={0.0}
              arrows={false}
              sx={{ maxWidth: '238px' }}
            />
            <Label size="sm" sx={{ mb: 5, ml: 5, color: 'info.dark' }}>
              {sellDenom}
            </Label>
          </Box>
          <AmountField
            name="amount"
            label="Amount to sell"
            availableAmount={availableAmountByBatch[values.batchDenom ?? '']}
            denom={values.batchDenom ?? ''}
          />
          <Field
            component={CheckboxLabel}
            type="checkbox"
            name="disableAutoRetire"
            label={
              <Subtitle size="lg" color="primary.contrastText">
                Disable auto-retire
              </Subtitle>
            }
            sx={{ mt: 12 }}
          />
          <Submit
            isSubmitting={isSubmitting}
            onClose={onClose}
            status={status}
            isValid={isValid}
            submitCount={submitCount}
            submitForm={submitForm}
            label="Create Sell Order"
          />
        </Form>
      )}
    </Formik>
  );
};

export { CreateSellOrderForm };