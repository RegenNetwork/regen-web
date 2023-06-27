/* parseMethodologies */
import { ImageType } from 'web-components/lib/types/shared/imageType';

import { Maybe, ProjectFieldsFragment } from 'generated/graphql';
import {
  AllProjectActivityQuery,
  AllProjectEcosystemQuery,
  Sdg,
} from 'generated/sanity-graphql';
import {
  AnchoredProjectMetadataLD,
  CreditClassMetadataLD,
  LegacyProjectMetadataLD,
  ProjectPageMetadataLD,
  ProjectQuote,
} from 'lib/db/types/json-ld';
import { CFCCreditClassMetadataLD } from 'lib/db/types/json-ld/cfc-credit-class-metadata';
import { ApprovedMethodologies } from 'lib/db/types/json-ld/methodology';
import { getSanityImgSrc } from 'lib/imgSrc';
import { getAreaUnit, qudtUnit } from 'lib/rdf';

import { SEE_ALL_METHODOLOGIES } from './ProjectTopSection.constants';

type GetSdgsImagesParams = {
  sdgs?: Maybe<Maybe<Sdg>[]>;
};

export const getSdgsImages = ({ sdgs }: GetSdgsImagesParams) => {
  const sdgsImages: ImageType[] =
    sdgs?.map(sdg => ({
      src: getSanityImgSrc(sdg?.image),
      alt: String(sdg?.title ?? ''),
    })) ?? [];

  return sdgsImages;
};
type ParseMethodologiesParams = {
  methodologies?: ApprovedMethodologies;
};

export const parseMethodologies = ({
  methodologies,
}: ParseMethodologiesParams) => {
  if (
    methodologies?.['schema:url'] &&
    methodologies?.['schema:itemListElement'].length > 1
  ) {
    return {
      'schema:name': SEE_ALL_METHODOLOGIES,
      'schema:url': methodologies?.['schema:url'],
    };
  }

  return methodologies?.['schema:itemListElement'][0];
};

/* parseProjectMetadata */

type ParseProjectMetadataReturn = {
  projectName?: string;
  area?: number;
  areaUnit?: string;
  placeName?: string;
  projectMethodology?: ProjectMethodology;
};

export type ProjectMethodology = {
  'schema:name': string;
  'schema:url'?: string;
};

export const parseProjectMetadata = (
  projectMetadata?: AnchoredProjectMetadataLD | LegacyProjectMetadataLD,
): ParseProjectMetadataReturn => {
  const projectName = projectMetadata?.['schema:name'];
  const projectSize = projectMetadata?.['regen:projectSize'];
  const area = projectSize?.['qudt:numericValue'];
  const unit = projectSize?.['qudt:unit'];
  const areaUnit = getAreaUnit(unit as qudtUnit);
  const placeName = projectMetadata?.['schema:location']?.['place_name'];
  let projectMethodology;
  if (isAnchoredProjectMetadata(projectMetadata)) {
    projectMethodology =
      projectMetadata?.['regen:vcsMethodology'] ??
      projectMetadata?.['regen:offsetProtocol'] ??
      parseMethodologies({
        methodologies: projectMetadata['regen:approvedMethodologies'],
      });
  }
  // projectMetadata?.['schema:location']?.['geojson:place_name'];

  return { projectName, area, areaUnit, placeName, projectMethodology };
};

/* parseProjectPageMetadata */

type ParseProjectPageMetadataReturn = {
  glanceText?: string[];
  primaryDescription?: string;
  quote?: ProjectQuote;
};

export const parseProjectPageMetadata = (
  projectPageMetadata?: Partial<ProjectPageMetadataLD>,
): ParseProjectPageMetadataReturn => {
  const glanceText = projectPageMetadata?.['regen:glanceText'];
  const primaryDescription =
    projectPageMetadata?.['regen:landStory'] ||
    projectPageMetadata?.['schema:description'];
  const quote = projectPageMetadata?.['regen:projectQuote'];

  return {
    glanceText,
    primaryDescription,
    quote,
  };
};

/* parseOffChainProject  */

export const parseOffChainProject = (
  project?: Maybe<ProjectFieldsFragment>,
) => {
  const creditClass = project?.creditClassByCreditClassId;
  const creditClassVersion = creditClass?.creditClassVersionsById?.nodes?.[0];
  const sdgIris = creditClassVersion?.metadata?.['regen:SDGs']?.map(
    (sdg: { '@id': string }) => sdg['@id'],
  );
  const offsetGenerationMethod =
    creditClassVersion?.metadata?.['regen:offsetGenerationMethod'];
  const coBenefitsIRIs =
    creditClassVersion?.metadata?.['regen:coBenefits']?.map(
      (impact: { '@id': string }) => impact['@id'],
    ) || [];
  const primaryImpactIRI =
    creditClassVersion?.metadata?.['regen:indicator']?.['@id'];

  return {
    creditClassVersion,
    sdgIris,
    offsetGenerationMethod,
    primaryImpactIRI,
    coBenefitsIRIs,
  };
};

export const isAnchoredProjectMetadata = (
  projectMetadata?: AnchoredProjectMetadataLD | LegacyProjectMetadataLD,
  onChainProjectId?: string,
): projectMetadata is AnchoredProjectMetadataLD => {
  return !!onChainProjectId;
};

const isCFCCreditClassMetadata = (
  creditClassMetadata?: CreditClassMetadataLD | CFCCreditClassMetadataLD,
): creditClassMetadata is CFCCreditClassMetadataLD => {
  return (
    !!creditClassMetadata &&
    typeof creditClassMetadata?.['regen:offsetGenerationMethod']?.[0] !==
      'string'
  );
};

export const getOffsetGenerationMethod = (metadata?: CreditClassMetadataLD) => {
  if (isCFCCreditClassMetadata(metadata)) {
    return metadata?.['regen:offsetGenerationMethod']?.[0]['@value'];
  }

  return metadata?.['regen:offsetGenerationMethod']?.[0];
};

/* getProjectActivityIconsMapping */

type GetProjectActivityIconsMappingParams = {
  allProjectActivityData?: AllProjectActivityQuery;
};

export const getProjectActivityIconsMapping = ({
  allProjectActivityData,
}: GetProjectActivityIconsMappingParams) => {
  return allProjectActivityData?.allProjectActivity.reduce((acc, activity) => {
    acc[String(activity.name)] = String(activity.icon?.asset?.url);
    return acc;
  }, {} as Record<string, string | undefined>);
};

/* getProjectEcosystemIconsMapping */

type GetProjectEcosystemIconsMappingParams = {
  allProjectEcosystemData?: AllProjectEcosystemQuery;
};

export const getProjectEcosystemIconsMapping = ({
  allProjectEcosystemData,
}: GetProjectEcosystemIconsMappingParams) => {
  return allProjectEcosystemData?.allProjectEcosystem.reduce(
    (acc, ecosystem) => {
      acc[String(ecosystem.name)] = String(ecosystem.icon?.asset?.url);
      return acc;
    },
    {} as Record<string, string | undefined>,
  );
};
