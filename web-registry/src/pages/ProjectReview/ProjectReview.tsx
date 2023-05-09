import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import { DeliverTxResponse } from '@cosmjs/stargate';
import { Box } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import ErrorBanner from 'web-components/lib/components/banner/ErrorBanner';
import { ReviewCard } from 'web-components/lib/components/cards/ReviewCard/ReviewCard';
import { ItemDisplay } from 'web-components/lib/components/cards/ReviewCard/ReviewCard.ItemDisplay';
import { Photo } from 'web-components/lib/components/cards/ReviewCard/ReviewCard.Photo';
import { ProcessingModal } from 'web-components/lib/components/modal/ProcessingModal';
import { TxErrorModal } from 'web-components/lib/components/modal/TxErrorModal';

import { ProjectMetadataLD } from 'lib/db/types/json-ld';
import { getProjectByIdQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectByIdQuery/getProjectByIdQuery';
import { getProjectByIdKey } from 'lib/queries/react-query/registry-server/graphql/getProjectByIdQuery/getProjectByIdQuery.constants';
import {
  getAnchoredProjectMetadata,
  getUnanchoredProjectMetadata,
  QUDT_UNIT_MAP,
  qudtUnit,
} from 'lib/rdf';

import {
  STORY_LABEL,
  STORY_TITLE_LABEL,
  SUMMARY_LABEL,
} from 'components/organisms/DescriptionForm/DescriptionForm.constants';

import { Link } from '../../components/atoms';
import { ProjectPageFooter } from '../../components/molecules';
import { OnboardingFormTemplate } from '../../components/templates';
import { useUpdateProjectByIdMutation } from '../../generated/graphql';
import useMsgClient from '../../hooks/useMsgClient';
import { getHashUrl } from '../../lib/block-explorer';
import { isVCSCreditClass } from '../../lib/ecocredit/api';
import { useCreateProjectContext } from '../ProjectCreate';
import { useGetJurisdiction } from './hooks/useGetJurisdiction';
import { useProjectCreateSubmit } from './hooks/useProjectCreateSubmit';
import {
  getOnChainProjectId,
  getProjectReferenceID,
} from './ProjectReview.util';
import { VCSMetadata } from './ProjectReview.VCSMetadata';

export const ProjectReview: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { setDeliverTxResponse } = useCreateProjectContext();
  const graphqlClient = useApolloClient();
  const reactQueryClient = useQueryClient();

  const { data, isLoading } = useQuery(
    getProjectByIdQuery({
      client: graphqlClient,
      id: projectId,
    }),
  );
  const [txModalTitle, setTxModalTitle] = useState<string | undefined>();
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [bannerError, setBannerError] = useState('');
  const [updateProject] = useUpdateProjectByIdMutation();

  const closeSubmitModal = (): void => setIsSubmitModalOpen(false);

  const handleTxQueued = (): void => {
    setIsSubmitModalOpen(true);
  };

  const handleTxModalClose = (): void => {
    setTxModalTitle(undefined);
    setDeliverTxResponse(undefined);
    setError(undefined);
  };

  const handleError = (): void => {
    closeSubmitModal();
    setTxModalTitle('MsgCreateProject Error');
  };

  const handleTxDelivered = async (
    _deliverTxResponse: DeliverTxResponse,
  ): Promise<void> => {
    setDeliverTxResponse(_deliverTxResponse);
    const projectOnChainId = getOnChainProjectId(_deliverTxResponse);
    if (projectId) {
      await updateProject({
        variables: {
          input: {
            id: projectId,
            projectPatch: {
              onChainId: projectOnChainId,
              metadata: getUnanchoredProjectMetadata(
                metadata,
                projectOnChainId,
              ),
            },
          },
        },
      });
      await reactQueryClient.invalidateQueries({
        queryKey: getProjectByIdKey(projectId),
      });
      navigate(`${editPath}/finished`);
    }
  };

  const { signAndBroadcast, wallet, error, setError, deliverTxResponse } =
    useMsgClient(handleTxQueued, handleTxDelivered, handleError);
  const { projectCreateSubmit } = useProjectCreateSubmit({ signAndBroadcast });
  const project = data?.data?.projectById;
  const editPath = `/project-pages/${projectId}`;
  const metadata = project?.metadata as ProjectMetadataLD;
  const jurisdiction = useGetJurisdiction({ metadata });

  const creditClassId = metadata?.['regen:creditClassId'];
  const isVCS = isVCSCreditClass(creditClassId);

  const txHash = deliverTxResponse?.transactionHash;
  const txHashUrl = getHashUrl(txHash);
  const referenceId = getProjectReferenceID(metadata, creditClassId);

  const submit = async (): Promise<void> => {
    if (!jurisdiction) {
      setBannerError(
        `Error getting ISO string for jurisdiction. Please edit your location.`,
      );
      return;
    }
    await projectCreateSubmit({
      classId: creditClassId || '',
      admin: wallet?.address || '',
      metadata: getAnchoredProjectMetadata(metadata, creditClassId),
      jurisdiction: jurisdiction || '',
      referenceId,
    });
  };

  return (
    <OnboardingFormTemplate activeStep={1} title="Review" loading={isLoading}>
      <ReviewCard
        title="Basic Info"
        onEditClick={() => navigate(`${editPath}/basic-info`)}
        sx={{ mt: [8, 10] }}
      >
        <ItemDisplay name="Name">{metadata?.['schema:name']}</ItemDisplay>
        <ItemDisplay name="Size">
          {metadata?.['regen:projectSize']?.['qudt:numericValue'] || '-'}{' '}
          {
            QUDT_UNIT_MAP[
              metadata?.['regen:projectSize']?.['qudt:unit'] as qudtUnit
            ]
          }
        </ItemDisplay>
      </ReviewCard>
      <ReviewCard
        title="Location"
        onEditClick={() => navigate(`${editPath}/location`)}
      >
        <ItemDisplay>
          {metadata?.['schema:location']?.['place_name']}
        </ItemDisplay>
        <ItemDisplay name="Jurisdiction">{jurisdiction}</ItemDisplay>
      </ReviewCard>
      <ReviewCard
        title="Description"
        onEditClick={() => navigate(`${editPath}/description`)}
      >
        <ItemDisplay name={SUMMARY_LABEL}>
          {metadata?.['schema:description']}
        </ItemDisplay>
        <ItemDisplay name={STORY_LABEL}>
          {metadata?.['regen:story']}
        </ItemDisplay>
        <ItemDisplay name={STORY_TITLE_LABEL}>
          {metadata?.['regen:storyTitle']}
        </ItemDisplay>
      </ReviewCard>
      <ReviewCard
        title={'Media'}
        onEditClick={() => navigate(`${editPath}/media`)}
      >
        {metadata?.['regen:previewPhoto'] && (
          <Photo src={metadata?.['regen:previewPhoto']['schema:url']} />
        )}
        {metadata?.['regen:galleryPhotos']?.map(
          photo => photo && <Photo src={photo['schema:url']} />,
        )}
        {/* TODO: display story image or video https://github.com/regen-network/regen-registry/issues/1615 */}
        {/* {metadata?.['regen:storyMedia'] && (
          <Card>
            <CardMedia
              component={ReactPlayerLazy}
              url={videoUrl}
              fallback={<div>Loading video player...</div>}
              height={isMobile ? 216 : 293}
              width="100%"
            />
          </Card>
        )} */}
      </ReviewCard>
      <ReviewCard
        title="Roles"
        onEditClick={() => navigate(`${editPath}/roles`)}
      >
        {metadata?.['regen:projectDeveloper'] && (
          <>
            <ItemDisplay name="Project Developer">
              {metadata?.['regen:projectDeveloper']?.['schema:name']}
            </ItemDisplay>
            <ItemDisplay>
              {metadata?.['regen:projectDeveloper']?.['schema:description']}
            </ItemDisplay>
          </>
        )}
      </ReviewCard>
      <ReviewCard
        title="Metadata"
        onEditClick={() => navigate(`${editPath}/metadata`)}
      >
        {isVCS ? (
          <VCSMetadata metadata={metadata} />
        ) : (
          <Box
            sx={theme => ({
              backgroundColor: theme.palette.primary.main,
              maxHeight: theme.spacing(88),
              fontSize: theme.spacing(3.5),
              padding: theme.spacing(4),
              marginTop: theme.spacing(3.5),
              border: `1px solid ${theme.palette.grey[600]}`,
              overflowX: 'scroll',
              overflowY: 'scroll',
            })}
          >
            <pre>{!!metadata && JSON.stringify(metadata, null, 2)}</pre>
          </Box>
        )}
      </ReviewCard>
      <ProjectPageFooter
        onSave={submit}
        onPrev={() => navigate(`${editPath}/metadata`)}
        isSubmitting={isSubmitModalOpen}
      />
      <ProcessingModal open={isSubmitModalOpen} onClose={closeSubmitModal} />
      {error && txModalTitle && (
        <TxErrorModal
          error={error}
          open={!!error && (!!txModalTitle || !!deliverTxResponse)}
          onClose={handleTxModalClose}
          txHash={txHash || ''}
          txHashUrl={txHashUrl}
          cardTitle={txModalTitle}
          linkComponent={Link}
          onButtonClick={handleTxModalClose}
          buttonTitle="close"
        />
      )}
      {bannerError && <ErrorBanner text={bannerError} />}
    </OnboardingFormTemplate>
  );
};
