import React from 'react';
import { makeStyles } from '@mui/styles';
import Modal, { RegenModalProps } from '../modal';
import Title from '../title';
import Description from '../description';

const useStyles = makeStyles(theme => ({
  modal: {
    [theme.breakpoints.up('sm')]: {
      height: 'inherit',
      padding: `${theme.spacing(10.75)} ${theme.spacing(7.5)} ${theme.spacing(
        12.5,
      )}`,
      maxWidth: theme.spacing(140),
    },
  },
  mainTitle: {
    paddingBottom: theme.spacing(7.5),
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(12.5),
    },
  },
}));

interface FormModalTemplateProps extends RegenModalProps {
  title: string;
  subtitle?: string;
}

const FormModalTemplate: React.FC<FormModalTemplateProps> = ({
  title,
  subtitle,
  open,
  onClose,
  children,
}) => {
  const styles = useStyles();

  return (
    <Modal className={styles.modal} open={open} onClose={onClose}>
      <Title sx={{ pb: [7.5, 10] }} variant="h3" align="center">
        {title}
      </Title>
      {subtitle && (
        <Description sx={{ pb: [7.5, 10] }} align="center" variant="subtitle2">
          {subtitle}
        </Description>
      )}
      {children}
    </Modal>
  );
};

export { FormModalTemplate };
