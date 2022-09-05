import { useMoreProjectsQuery } from '../../../../generated/graphql';

// TODO - just offchain projects, missing onchain

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function useOtherProjects(projectId: string) {
  const { data: projectsData } = useMoreProjectsQuery();
  const allProjects = projectsData?.allProjects?.nodes;
  return allProjects?.filter(p => p?.handle !== projectId);
}