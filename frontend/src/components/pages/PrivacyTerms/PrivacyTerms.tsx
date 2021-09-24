import type { ReactElement } from 'react';
import { Page } from '../../organisms/Page/Page';
import { privacyHTML } from './static/privacy';
import { terms } from './static/terms';
import { cookiePolicy } from './static/cookie';
// import * as S from './PrivacyTerms.styles';

interface PrivacyTermsProps {
  type: 'privacy' | 'terms' | 'cookie';
  title: string;
}

export const PrivacyTerms = ({ type, title }: PrivacyTermsProps): ReactElement => {
  const data = {
    cookie: cookiePolicy,
    privacy: privacyHTML,
    terms,
  };
  return (
    <Page title={title}>
      <div dangerouslySetInnerHTML={{ __html: data[type] }} />
    </Page>
  );
};
