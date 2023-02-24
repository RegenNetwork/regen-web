import React from 'react';
import { Variant } from '@mui/material/styles/createTypography';
import { SxProps } from '@mui/system';

import { Theme } from '../../theme/muiTheme';
import ImageItem, { ImageItemProps } from '../image-item';
import ResponsiveSlider from './ResponsiveSlider';

export interface ImageItemsProps {
  items: ImageItemProps[];
  titleVariant?: Variant;
  imageClassName?: string;
  arrows?: boolean;
  slidesToShow?: number;
  title?: string;
  className?: string;
  sx?: { title: SxProps<Theme> };
}

export default function ImageItems({
  items,
  imageClassName,
  titleVariant,
  slidesToShow,
  arrows = false,
  title,
  className,
  sx,
}: ImageItemsProps): JSX.Element {
  return (
    <ResponsiveSlider
      className={className}
      titleVariant={titleVariant}
      title={title}
      slidesToShow={slidesToShow}
      arrows={arrows}
      items={items.map(item => (
        <ImageItem
          classes={{ image: imageClassName }}
          img={item.img}
          title={item.title}
          titleVariant={titleVariant}
          description={item.description}
          sx={sx}
        />
      ))}
    />
  );
}
