import { NextSeoProps } from 'next-seo';

import { BASE_URL } from '@/configs';

const defaultSeo: NextSeoProps = {
  defaultTitle: 'Next starter kit',
  titleTemplate: '%s | Next starter kit',
  description: 'A full starter kit for nextjs application',
  openGraph: {
    type: 'website',
    title: 'Next starter kit',
    description: 'A full starter kit for nextjs application',
    site_name: '',
    url: BASE_URL,
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      property: 'dc:creator',
      content: 'VHQ',
    },
  ],
};

export default defaultSeo;
