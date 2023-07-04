import { Box, SxProps } from '@mui/material';

import { ProjectTag } from '../../../components/molecules/ProjectTag/ProjectTag';
import { Label } from '../../../components/typography';
import { Theme } from '../../../theme/muiTheme';
import { sxToArray } from '../../../utils/mui/sxToArray';
import { ProjectTagType } from '../../molecules/ProjectTag/ProjectTag.types';
import {
  ECOSYSTEM_LABEL,
  PROJECT_ACTIVITY_LABEL,
} from './ProjectTags.constants';

export interface Props {
  activities?: ProjectTagType[];
  ecosystems?: ProjectTagType[];
  sx?: SxProps<Theme>;
}

const ProjectTags = ({
  activities = [],
  ecosystems = [],
  sx = [],
}: Props): JSX.Element => {
  const hasActivities = activities.length > 0;
  const hasManyActivities = activities.length > 1;
  const hasEcosystems = ecosystems.length > 0;
  const hasManyEcosystems = ecosystems.length > 1;
  const hasManyTags = hasManyActivities || hasManyEcosystems;

  return (
    <Box
      sx={[
        {
          display: 'flex',
          flexDirection: { xs: 'column', sm: hasManyTags ? 'column' : 'row' },
        },
        ...sxToArray(sx),
      ]}
    >
      {hasActivities && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            mr: { sm: 3.25 },
            mb: { xs: 10, sm: hasManyTags ? 10 : 0 },
          }}
        >
          <Label sx={{ fontSize: { xs: 11 }, mb: 2 }}>
            {PROJECT_ACTIVITY_LABEL}
          </Label>
          <Box
            sx={{
              display: 'flex',
              flexDirection: {
                xs: 'row',
                sm: hasManyActivities ? 'row' : 'column',
              },
              flexWrap: 'wrap',
            }}
          >
            {activities.map(activity => (
              <ProjectTag
                tag={activity}
                key={activity?.name}
                sx={{ mb: 2, mr: { xs: 2, sm: hasManyActivities ? 2 : 0 } }}
              />
            ))}
          </Box>
        </Box>
      )}
      {hasEcosystems && (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Label sx={{ fontSize: { xs: 11 }, mb: 2 }}>{ECOSYSTEM_LABEL}</Label>
          <Box
            sx={{
              display: 'flex',
              flexDirection: {
                xs: 'row',
                sm: hasManyEcosystems ? 'row' : 'column',
              },
              flexWrap: 'wrap',
            }}
          >
            {ecosystems.map(ecosystem => (
              <ProjectTag
                tag={ecosystem}
                key={ecosystem.name}
                sx={{ mb: 2, mr: { xs: 2, sm: hasManyEcosystems ? 2 : 0 } }}
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export { ProjectTags };