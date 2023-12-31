import { ProjectCardProps } from 'web-components/lib/components/cards/ProjectCard';
import EditIcon from 'web-components/lib/components/icons/EditIcon';

export const DEFAULT_PROJECT: ProjectCardProps = {
  name: '',
  imgSrc: '/jpg/default-project.jpg',
  place: '',
  area: 0,
  areaUnit: 'ha',
  button: {
    text: 'Edit project',
    startIcon: <EditIcon sx={{ width: 20, height: 20 }} />,
    disabled: false,
  },
};
