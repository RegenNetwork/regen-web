import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import { DefaultTheme as Theme, makeStyles } from '@mui/styles';
import cx from 'clsx';

interface CurrentCreditsIconProps {
  className?: string;
  color?: string;
  height?: string;
  width?: string;
}

interface StyleProps {
  height?: string;
  width?: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: props => ({
    height: props.height || theme.spacing(13.5),
    width: props.width || theme.spacing(14.75),
  }),
}));

export default function CurrentCreditsIcon({
  className,
  color,
  height,
  width,
}: CurrentCreditsIconProps): JSX.Element {
  const classes = useStyles({ height, width });

  return (
    <SvgIcon viewBox="0 0 59 54" className={cx(className, classes.root)}>
      <path
        d="M38.14 19.1522L38.0889 19.1523C37.5366 19.1542 37.0905 19.6036 37.0925 20.1558C37.0945 20.7081 37.5438 21.1542 38.0961 21.1523L38.14 21.1522L38.184 21.1523C38.7362 21.1542 39.1856 20.7081 39.1875 20.1558C39.1895 19.6036 38.7434 19.1542 38.1911 19.1523L38.14 19.1522Z"
        fill={color || 'currentColor'}
      />
      <path
        d="M35.0746 21.547C35.6087 21.4063 35.9276 20.8594 35.787 20.3253C35.6463 19.7912 35.0993 19.4723 34.5652 19.613C34.5323 19.6216 34.4995 19.6304 34.4666 19.6393C33.9336 19.7839 33.6187 20.3332 33.7633 20.8662C33.9079 21.3992 34.4572 21.7141 34.9902 21.5696C35.0183 21.5619 35.0464 21.5544 35.0746 21.547Z"
        fill={color || 'currentColor'}
      />
      <path
        d="M41.7148 19.613C41.1807 19.4723 40.6337 19.7912 40.4931 20.3253C40.3524 20.8594 40.6713 21.4063 41.2054 21.547C41.2336 21.5544 41.2617 21.5619 41.2898 21.5696C41.8229 21.7141 42.3722 21.3992 42.5167 20.8662C42.6613 20.3332 42.3464 19.7839 41.8134 19.6393C41.7806 19.6304 41.7477 19.6216 41.7148 19.613Z"
        fill={color || 'currentColor'}
      />
      <path
        d="M45.0977 21.001C44.6187 20.7261 44.0076 20.8917 43.7327 21.3707C43.4579 21.8497 43.6234 22.4609 44.1024 22.7357C44.1157 22.7433 44.129 22.751 44.1422 22.7587C44.1542 22.7656 44.1661 22.7725 44.178 22.7794C44.655 23.0577 45.2673 22.8967 45.5456 22.4196C45.824 21.9426 45.6629 21.3303 45.1859 21.052C45.1704 21.0429 45.1549 21.0339 45.1394 21.025C45.1255 21.0169 45.1116 21.0089 45.0977 21.001Z"
        fill={color || 'currentColor'}
      />
      <path
        d="M32.1776 22.7357C32.6566 22.4609 32.8222 21.8497 32.5473 21.3707C32.2725 20.8917 31.6613 20.7261 31.1823 21.001C31.1638 21.0116 31.1453 21.0222 31.1269 21.0329C31.116 21.0392 31.1051 21.0456 31.0942 21.052C30.6171 21.3303 30.4561 21.9426 30.7344 22.4196C31.0127 22.8967 31.625 23.0577 32.1021 22.7794C32.1272 22.7648 32.1524 22.7502 32.1776 22.7357Z"
        fill={color || 'currentColor'}
      />
      <path
        d="M48.0035 23.2168C47.6115 22.8277 46.9784 22.8299 46.5893 23.2219C46.2001 23.6138 46.2024 24.247 46.5944 24.6361C46.615 24.6566 46.6356 24.6772 46.6561 24.6978C47.0452 25.0898 47.6784 25.092 48.0703 24.7029C48.4622 24.3138 48.4645 23.6807 48.0754 23.2887C48.0515 23.2647 48.0275 23.2407 48.0035 23.2168Z"
        fill={color || 'currentColor'}
      />
      <path
        d="M29.6857 24.6361C30.0776 24.247 30.0799 23.6138 29.6908 23.2219C29.3017 22.8299 28.6685 22.8277 28.2766 23.2168C28.2525 23.2407 28.2285 23.2647 28.2046 23.2887C27.8155 23.6807 27.8178 24.3138 28.2097 24.7029C28.6016 25.092 29.2348 25.0898 29.6239 24.6978C29.6444 24.6772 29.665 24.6566 29.6857 24.6361Z"
        fill={color || 'currentColor'}
      />
      <path
        d="M50.2402 26.1063C49.9619 25.6293 49.3496 25.4682 48.8726 25.7465C48.3955 26.0249 48.2344 26.6372 48.5128 27.1142C48.5274 27.1393 48.542 27.1645 48.5565 27.1897C48.8313 27.6688 49.4425 27.8343 49.9215 27.5595C50.4005 27.2846 50.5661 26.6735 50.2912 26.1944C50.2847 26.1831 50.2782 26.1718 50.2717 26.1605C50.2613 26.1424 50.2508 26.1244 50.2402 26.1063Z"
        fill={color || 'currentColor'}
      />
      <path
        d="M27.7673 27.1142C28.0456 26.6372 27.8845 26.0249 27.4075 25.7465C26.9305 25.4682 26.3181 25.6293 26.0398 26.1063C26.0227 26.1356 26.0057 26.165 25.9888 26.1944C25.714 26.6735 25.8795 27.2846 26.3585 27.5595C26.8376 27.8343 27.4487 27.6688 27.7236 27.1897C27.738 27.1645 27.7526 27.1393 27.7673 27.1142Z"
        fill={color || 'currentColor'}
      />
      <path
        d="M26.5574 30.0024C26.702 29.4693 26.3871 28.92 25.8541 28.7754C25.321 28.6309 24.7717 28.9458 24.6272 29.4788C24.6212 29.5006 24.6154 29.5224 24.6096 29.5442C24.6066 29.5553 24.6037 29.5663 24.6008 29.5774C24.4601 30.1115 24.7791 30.6585 25.3131 30.7991C25.8472 30.9398 26.3942 30.6209 26.5348 30.0868C26.5423 30.0586 26.5498 30.0305 26.5574 30.0024Z"
        fill={color || 'currentColor'}
      />
      <path
        d="M51.6529 29.4788C51.5083 28.9458 50.959 28.6309 50.426 28.7754C49.8929 28.92 49.578 29.4693 49.7226 30.0024C49.7302 30.0305 49.7378 30.0586 49.7452 30.0868C49.8858 30.6209 50.4328 30.9398 50.9669 30.7991C51.501 30.6585 51.8199 30.1115 51.6792 29.5774C51.6706 29.5445 51.6618 29.5116 51.6529 29.4788Z"
        fill={color || 'currentColor'}
      />
      <path
        d="M26.1401 33.1082C26.1421 32.5559 25.696 32.1066 25.1437 32.1047C24.5914 32.1027 24.1421 32.5488 24.1401 33.1011L24.14 33.1522L24.1401 33.2033C24.1421 33.7556 24.5914 34.2017 25.1437 34.1997C25.696 34.1977 26.1421 33.7484 26.1401 33.1961L26.14 33.1522L26.1401 33.1082Z"
        fill={color || 'currentColor'}
      />
      <path
        d="M52.1399 33.1011C52.1379 32.5488 51.6886 32.1027 51.1364 32.1047C50.5841 32.1066 50.138 32.5559 50.1399 33.1082L50.14 33.1522L50.1399 33.1961C50.138 33.7484 50.5841 34.1977 51.1364 34.1997C51.6886 34.2017 52.1379 33.7556 52.1399 33.2033L52.14 33.1522L52.1399 33.1011Z"
        fill={color || 'currentColor'}
      />
      <path
        d="M26.5348 36.2176C26.3942 35.6835 25.8472 35.3646 25.3131 35.5052C24.7791 35.6459 24.4601 36.1929 24.6008 36.7269C24.6095 36.7599 24.6183 36.7927 24.6272 36.8256C24.7717 37.3586 25.321 37.6735 25.8541 37.5289C26.3871 37.3843 26.702 36.835 26.5574 36.302C26.555 36.2931 26.5526 36.2842 26.5502 36.2753C26.545 36.2561 26.5399 36.2368 26.5348 36.2176Z"
        fill={color || 'currentColor'}
      />
      <path
        d="M51.6792 36.7269C51.8199 36.1929 51.501 35.6459 50.9669 35.5052C50.4328 35.3646 49.8858 35.6835 49.7452 36.2176C49.7378 36.2457 49.7302 36.2739 49.7226 36.302C49.578 36.835 49.8929 37.3843 50.426 37.5289C50.959 37.6735 51.5083 37.3586 51.6529 36.8256C51.6618 36.7927 51.6706 36.7599 51.6792 36.7269Z"
        fill={color || 'currentColor'}
      />
      <path
        d="M27.7236 39.1146C27.4487 38.6356 26.8376 38.47 26.3585 38.7449C25.8795 39.0197 25.714 39.6309 25.9888 40.1099C26.0057 40.1393 26.0227 40.1687 26.0398 40.198C26.3181 40.6751 26.9305 40.8361 27.4075 40.5578C27.8845 40.2795 28.0456 39.6672 27.7673 39.1901C27.7526 39.165 27.738 39.1398 27.7236 39.1146Z"
        fill={color || 'currentColor'}
      />
      <path
        d="M50.2912 40.1099C50.5661 39.6309 50.4005 39.0197 49.9215 38.7449C49.4425 38.47 48.8313 38.6356 48.5565 39.1146L48.537 39.1485L48.5128 39.1901C48.2344 39.6672 48.3955 40.2795 48.8726 40.5578C49.3496 40.8361 49.9619 40.6751 50.2402 40.198C50.2573 40.1687 50.2743 40.1393 50.2912 40.1099Z"
        fill={color || 'currentColor'}
      />
      <path
        d="M29.6239 41.6065C29.2348 41.2146 28.6016 41.2123 28.2097 41.6014C27.8178 41.9905 27.8155 42.6237 28.2046 43.0156C28.2285 43.0397 28.2525 43.0637 28.2766 43.0876C28.6685 43.4767 29.3017 43.4744 29.6908 43.0825C30.0799 42.6905 30.0776 42.0574 29.6857 41.6683C29.665 41.6478 29.6444 41.6272 29.6239 41.6065Z"
        fill={color || 'currentColor'}
      />
      <path
        d="M48.0754 43.0156C48.4645 42.6237 48.4622 41.9905 48.0703 41.6014C47.6784 41.2123 47.0452 41.2146 46.6561 41.6065C46.6356 41.6272 46.615 41.6478 46.5944 41.6683C46.2024 42.0574 46.2001 42.6905 46.5893 43.0825C46.9784 43.4744 47.6115 43.4767 48.0035 43.0876L48.0434 43.0478L48.0754 43.0156Z"
        fill={color || 'currentColor'}
      />
      <path
        d="M32.1021 43.5249C31.625 43.2466 31.0127 43.4077 30.7344 43.8847C30.4561 44.3617 30.6171 44.9741 31.0942 45.2524C31.1235 45.2695 31.1528 45.2865 31.1823 45.3034C31.6613 45.5782 32.2725 45.4127 32.5473 44.9337C32.8222 44.4546 32.6566 43.8435 32.1776 43.5686C32.1632 43.5604 32.1488 43.5521 32.1345 43.5438C32.1237 43.5375 32.1129 43.5312 32.1021 43.5249Z"
        fill={color || 'currentColor'}
      />
      <path
        d="M45.1859 45.2524C45.6629 44.9741 45.824 44.3617 45.5457 43.8847C45.2673 43.4077 44.655 43.2466 44.178 43.5249C44.1528 43.5396 44.1277 43.5541 44.1024 43.5686C43.6234 43.8435 43.4579 44.4546 43.7327 44.9337C44.0076 45.4127 44.6187 45.5782 45.0977 45.3034C45.1272 45.2865 45.1566 45.2695 45.1859 45.2524Z"
        fill={color || 'currentColor'}
      />
      <path
        d="M34.9902 44.7348C34.4572 44.5902 33.9079 44.9051 33.7633 45.4381C33.6187 45.9711 33.9336 46.5205 34.4666 46.665C34.4995 46.6739 34.5323 46.6827 34.5652 46.6914C35.0993 46.8321 35.6463 46.5131 35.787 45.9791C35.9276 45.445 35.6087 44.898 35.0746 44.7573C35.0593 44.7533 35.0439 44.7492 35.0286 44.7451C35.0158 44.7417 35.003 44.7383 34.9902 44.7348Z"
        fill={color || 'currentColor'}
      />
      <path
        d="M41.8134 46.665C42.3464 46.5205 42.6613 45.9711 42.5167 45.4381C42.3722 44.9051 41.8229 44.5902 41.2898 44.7348C41.2617 44.7424 41.2336 44.7499 41.2054 44.7573C40.6713 44.898 40.3524 45.445 40.4931 45.9791C40.6337 46.5131 41.1807 46.8321 41.7148 46.6914C41.7477 46.6827 41.7806 46.6739 41.8134 46.665Z"
        fill={color || 'currentColor'}
      />
      <path
        d="M38.0961 45.1521C37.5438 45.1501 37.0945 45.5962 37.0925 46.1485C37.0905 46.7008 37.5366 47.1501 38.0889 47.1521L38.14 47.1522L38.1911 47.1521C38.7434 47.1501 39.1895 46.7008 39.1875 46.1485C39.1856 45.5962 38.7362 45.1501 38.184 45.1521L38.14 45.1522L38.0961 45.1521Z"
        fill={color || 'currentColor'}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M36.04 10.8913C36.04 11.7667 35.8765 12.6032 35.5791 13.3927C36.3984 13.2913 37.2331 13.2391 38.08 13.2391C49.1589 13.2391 58.14 22.174 58.14 33.1957C58.14 44.2173 49.1589 53.1522 38.08 53.1522C33.4273 53.1522 29.1445 51.5763 25.7416 48.9319C23.3952 49.5917 20.7741 49.9565 18.02 49.9565C13.2467 49.9565 8.8515 48.8598 5.59729 47.0099C2.38699 45.1849 0 42.4331 0 39.0652V10.8913C0 7.52344 2.38699 4.77163 5.59729 2.94663C8.8515 1.09668 13.2467 0 18.02 0C22.7933 0 27.1885 1.09668 30.4427 2.94663C33.653 4.77163 36.04 7.52344 36.04 10.8913ZM3 10.8913C3 9.07249 4.31114 7.12866 7.07991 5.55467C9.80476 4.00564 13.6695 3 18.02 3C22.3705 3 26.2352 4.00564 28.9601 5.55467C31.7289 7.12866 33.04 9.07249 33.04 10.8913C33.04 12.0445 32.5264 13.2296 31.434 14.3605C29.2184 15.1341 27.1807 16.2838 25.3981 17.7324C23.2216 18.3982 20.7083 18.7826 18.02 18.7826C13.6695 18.7826 9.80476 17.777 7.07991 16.2279C4.31114 14.654 3 12.7101 3 10.8913ZM26.5804 45.5049L26.7028 45.8312C29.7194 48.5171 33.7048 50.1522 38.08 50.1522C47.5166 50.1522 55.14 42.5459 55.14 33.1957C55.14 23.8454 47.5166 16.2391 38.08 16.2391C28.6434 16.2391 21.02 23.8454 21.02 33.1957C21.02 38.0703 23.092 42.4709 26.4127 45.5669C26.4689 45.5464 26.5247 45.5257 26.5804 45.5049ZM18.02 46.9565C19.81 46.9565 21.5213 46.7861 23.1066 46.4762C21.9255 45.1592 20.9173 43.6853 20.1176 42.09C19.4299 42.1382 18.7299 42.163 18.02 42.163C13.3524 42.163 9.08981 41.0891 5.96794 39.3144C4.82663 38.6656 3.81841 37.91 3 37.0655V39.0652C3 40.884 4.31114 42.8279 7.07991 44.4019C9.80476 45.9509 13.6695 46.9565 18.02 46.9565ZM18.112 35.1194C18.2975 37.0487 18.7591 38.8977 19.457 40.6271C18.9838 40.6509 18.5045 40.663 18.02 40.663C13.5638 40.663 9.56644 39.6346 6.70925 38.0104C4.98925 37.0326 3.73286 35.8731 3 34.6276V30.022C3.81841 30.8665 4.82663 31.6221 5.96794 32.2709C9.08981 34.0457 13.3524 35.1196 18.02 35.1196L18.112 35.1194ZM18.02 33.1957C18.02 33.3373 18.0215 33.4786 18.0245 33.6196H18.02C13.5638 33.6196 9.56644 32.5912 6.70925 30.9669C4.98925 29.9891 3.73286 28.8296 3 27.5842V22.9785C3.81841 23.8231 4.82663 24.5786 5.96794 25.2274C9.08981 27.0022 13.3524 28.0761 18.02 28.0761C18.2437 28.0761 18.4665 28.0736 18.6882 28.0687C18.2523 29.7048 18.02 31.4232 18.02 33.1957ZM21.7882 21.5496C20.6873 23.0712 19.7964 24.7532 19.1579 26.5536C18.7821 26.5685 18.4027 26.5761 18.02 26.5761C13.5638 26.5761 9.56644 25.5477 6.70925 23.9234C4.98925 22.9456 3.73286 21.7862 3 20.5407V16.9767C3.76625 17.6725 4.64559 18.295 5.59729 18.836C8.8515 20.6859 13.2467 21.7826 18.02 21.7826C19.3106 21.7826 20.5714 21.7025 21.7882 21.5496Z"
        fill={color || 'currentColor'}
      />
    </SvgIcon>
  );
}
