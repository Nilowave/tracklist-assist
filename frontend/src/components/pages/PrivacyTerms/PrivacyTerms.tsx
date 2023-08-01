import type { ReactElement } from 'react';
import { cookiePolicy } from './static/cookie';
import { privacyHTML } from './static/privacy';
import { styles } from './static/static.styles';
import { terms } from './static/terms';
import { Page } from '../../organisms/Page/Page';

interface PrivacyTermsProps {
  type: 'privacy' | 'terms' | 'cookie';
  title: string;
  pageTitle: string;
}

export const PrivacyTerms = ({ type, title, pageTitle }: PrivacyTermsProps): ReactElement => {
  const data = {
    cookie: styles + cookiePolicy,
    privacy: styles + privacyHTML,
    terms: styles + terms,
  };
  return (
    <Page title={title} pageTitle={pageTitle}>
      <div dangerouslySetInnerHTML={{ __html: data[type] }} />
    </Page>
  );
};
