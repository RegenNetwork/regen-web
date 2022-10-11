import { BatchInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { AllCreditClassQuery } from 'generated/sanity-graphql';

import { findSanityCreditClass } from 'components/templates/ProjectDetails/ProjectDetails.utils';
import { SellOrderInfoExtented } from 'hooks/useQuerySellOrders';

import { AllProjectsQuery } from '../../../generated/graphql';
import { ProjectInfoWithMetadata } from './hooks/useFetchMetadataProjects';
import { NormalizedSellOrder } from './Storefront.types';

/* normalizeprojectsInfosByHandleMap */

type NormalizeprojectsInfosByHandleMapProps = {
  offChainProjects: AllProjectsQuery['allProjects'];
  onChainProjects?: ProjectInfoWithMetadata[];
  sanityCreditClassData?: AllCreditClassQuery;
};

// eslint-disable-next-line
export const normalizeProjectsInfosByHandleMap = ({
  offChainProjects,
  onChainProjects = [],
  sanityCreditClassData,
}: NormalizeprojectsInfosByHandleMapProps) => {
  const projectsMap = new Map<
    string,
    { name: string; classIdName: string; classIdUrl: string }
  >();

  offChainProjects?.nodes?.forEach(project => {
    const isVCSProject = !!project?.metadata?.['regen:vcsProjectId'];
    const creditClass = project?.creditClassByCreditClassId;
    const creditClassVersion = creditClass?.creditClassVersionsById?.nodes[0];

    if (project?.handle) {
      const creditClassSanity = findSanityCreditClass({
        sanityCreditClassData,
        creditClassIdOrUrl:
          creditClassVersion?.metadata?.['http://schema.org/url']?.['@value'],
      });

      projectsMap.set(project?.handle, {
        name: project?.handle,
        classIdName: creditClassSanity?.nameRaw ?? '',
        classIdUrl: isVCSProject
          ? creditClass?.onChainId
          : creditClassVersion?.metadata?.['http://schema.org/url']?.['@value'],
      });
    }
  });

  onChainProjects.forEach(project => {
    const creditClassSanity = findSanityCreditClass({
      sanityCreditClassData,
      creditClassIdOrUrl: project?.classId,
    });

    projectsMap.set(project?.id, {
      name: project.metadata?.['schema:name'] || project.id,
      classIdName: creditClassSanity?.nameRaw ?? project?.classId,
      classIdUrl: project?.classId,
    });
  });

  return projectsMap;
};

/* normalizeSellOrders */

type NormalizedSellOrderProps = {
  sellOrders?: SellOrderInfoExtented[];
  batchInfos: BatchInfo[];
  projectsInfosByHandleMap: Map<
    string,
    { name: string; classIdName: string; classIdUrl: string }
  >;
  projectsWithMetadataMap: Map<string, ProjectInfoWithMetadata>;
};

export const normalizeSellOrders = ({
  batchInfos,
  sellOrders = [],
  projectsInfosByHandleMap,
  projectsWithMetadataMap,
}: NormalizedSellOrderProps): NormalizedSellOrder[] =>
  sellOrders.map(
    ({
      askAmount,
      askDenom,
      askBaseDenom,
      batchDenom,
      id,
      quantity,
      seller,
      expiration,
      disableAutoRetire,
    }) => {
      const currentBatch = batchInfos?.find(
        batch => batch?.denom === batchDenom,
      );
      const projectId = currentBatch?.projectId ?? '';
      const isLoading =
        currentBatch === undefined ||
        projectsInfosByHandleMap.size === 0 ||
        projectsWithMetadataMap.size === 0;

      return {
        id: String(id),
        expiration,
        project: {
          name: isLoading
            ? undefined
            : projectsInfosByHandleMap.get(projectId)?.name ?? null,
          id: projectId,
          classIdName: isLoading
            ? undefined
            : projectsInfosByHandleMap.get(projectId)?.classIdName ?? null,
          classIdUrl: isLoading
            ? undefined
            : projectsInfosByHandleMap.get(projectId)?.classIdUrl ?? null,
        },
        status: 'Partially filled',
        askAmount,
        askDenom,
        askBaseDenom,
        amountAvailable: quantity,
        amountSold: undefined,
        batchDenom,
        batchStartDate: isLoading ? undefined : currentBatch?.startDate ?? null,
        batchEndDate: isLoading ? undefined : currentBatch?.endDate ?? null,
        seller,
        disableAutoRetire,
      };
    },
  );
