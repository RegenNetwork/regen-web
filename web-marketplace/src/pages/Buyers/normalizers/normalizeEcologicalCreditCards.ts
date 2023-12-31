import { EcologicalCreditCardType } from 'web-components/lib/components/molecules/EcologicalCreditCard/EcologicalCreditCard.types';
import { Party } from 'web-components/lib/components/user/UserInfoCard';

import {
  AllBuyersPageQuery,
  AllCreditClassQuery,
} from 'generated/sanity-graphql';

import {
  OFFSET_GENERATION_METHOD,
  PROJECT_ACTIVITIES,
} from '../Buyers.constants';

type Params = {
  content: AllBuyersPageQuery['allBuyersPage'][0]['ecologicalCreditCardsSection'];
  creditClasses?: AllCreditClassQuery['allCreditClass'];
  creditClassesPrograms?: (Party | undefined)[];
};

export const normalizeEcologicalCreditCards = ({
  creditClasses,
  creditClassesPrograms,
  content,
}: Params): EcologicalCreditCardType[] => {
  return (
    content?.cards?.map(card => {
      const creditClassProgramIndex = creditClasses?.findIndex(
        creditClass => creditClass.path === card?.creditClass?.path,
      );
      const creditClassProgram = creditClassProgramIndex
        ? creditClassesPrograms?.[creditClassProgramIndex]
        : undefined;

      return {
        title: card?.title ?? '',
        description: card?.description ?? '',
        image: {
          src: card?.image?.image?.asset?.url ?? card?.image?.imageHref ?? '',
        },
        infos: {
          count: card?.creditInfos?.count ?? '',
          country: card?.creditInfos?.country ?? '',
          price: card?.creditInfos?.price ?? '',
        },
        type: {
          name: card?.type?.name ?? '',
          icon: {
            src: card?.type?.image?.asset?.url ?? '',
            alt: card?.type?.name ?? '',
          },
        },
        program: creditClassProgram,
        button: {
          text: card?.button?.buttonText ?? '',
          href: card?.button?.buttonLink?.buttonHref ?? '',
        },
        offsetMethodList: {
          label: OFFSET_GENERATION_METHOD,
          items:
            card?.offsetMethods?.map(method => ({
              name: method?.name ?? '',
              icon: {
                src: method?.icon?.asset?.url ?? '',
                alt: method?.name ?? '',
              },
            })) ?? [],
        },
        projectActivitesList: {
          label: PROJECT_ACTIVITIES,
          items:
            card?.projectActivities?.map(projectActivity => ({
              name: projectActivity?.name ?? '',
              icon: {
                src: projectActivity?.icon?.asset?.url ?? '',
                alt: projectActivity?.name ?? '',
              },
            })) ?? [],
        },
      };
    }) ?? []
  );
};
