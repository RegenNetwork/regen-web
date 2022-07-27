import React, { useState } from 'react';
import { styled } from '@mui/material';
import Tabs, { TabsProps } from '@mui/material/Tabs';

import { a11yProps } from './';
import { IconTab, IconTabProps } from './IconTab';
import { TabPanel } from './TabPanel';

interface IconTabsProps {
  tabs: IconTabProps[];
}

const StyledTabs = styled(Tabs)<TabsProps>(({ theme }) => ({
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.secondary.main,
    height: '3px',
  },
}));

const IconTabs: React.FC<IconTabsProps> = ({ tabs }) => {
  const [value, setValue] = useState(0);

  const handleChange = (
    event: React.ChangeEvent<{}>,
    newValue: number,
  ): void => {
    setValue(newValue);
  };

  return (
    <div>
      <div>
        <StyledTabs value={value} onChange={handleChange} aria-label="tabs">
          {tabs.map((tab, index) => (
            <IconTab
              key={`tab-${index}`}
              label={tab.label}
              icon={tab?.icon}
              hidden={tab?.hidden}
              {...a11yProps(index)}
            />
          ))}
        </StyledTabs>
      </div>
      {tabs.map((tab, index) => (
        <TabPanel
          key={index}
          value={value}
          index={index}
          hidden={tab.hidden || value !== index}
        >
          {tab.content}
        </TabPanel>
      ))}
    </div>
  );
};

export { IconTabs };
