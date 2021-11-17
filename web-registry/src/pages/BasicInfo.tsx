import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { BasicInfoForm, BasicInfoFormValues } from '../components/organisms';
import { OnboardingFormTemplate } from '../components/templates';
import {
  useProjectByIdQuery,
  useUpdateProjectByIdMutation,
} from '../generated/graphql';

const BasicInfo: React.FC = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const [updateProject] = useUpdateProjectByIdMutation();
  const { data } = useProjectByIdQuery({
    variables: { id: projectId },
  });

  let initialFieldValues: BasicInfoFormValues | undefined;
  if (data?.projectById?.metadata) {
    const metadata = data.projectById.metadata;
    initialFieldValues = {
      'http://schema.org/name': metadata['http://schema.org/name'],
      'http://regen.network/size': metadata['http://regen.network/size'],
    };
  }

  async function saveAndExit(): Promise<void> {
    // TODO: functionality
  }

  async function submit(values: BasicInfoFormValues): Promise<void> {
    const metadata = { ...data?.projectById?.metadata, ...values };
    try {
      await updateProject({
        variables: {
          input: {
            id: projectId,
            projectPatch: {
              metadata,
            },
          },
        },
      });
      navigate(`/project-pages/${projectId}/location`);
    } catch (e) {
      // TODO: Should we display the error banner here?
      // https://github.com/regen-network/regen-registry/issues/554
      console.log(e);
    }
  }

  return (
    <OnboardingFormTemplate
      activeStep={0}
      title="Basic Info"
      saveAndExit={saveAndExit}
    >
      <BasicInfoForm submit={submit} initialValues={initialFieldValues} />
    </OnboardingFormTemplate>
  );
};

export { BasicInfo };
