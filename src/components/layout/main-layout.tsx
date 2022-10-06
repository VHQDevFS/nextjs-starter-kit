import React from 'react';

import { DefaultSeo } from 'next-seo';
import Image from 'next/image';

import { IMAGES_URL } from '@/configs';
import defaultSeo from '@/libs/seo';

export interface MainLayoutProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

function MainLayout({ title, description, children }: MainLayoutProps) {
  return (
    <>
      <DefaultSeo {...defaultSeo} title={title} description={description} />

      <div style={{ display: 'flex' }}>
        <div>
          <Image src={IMAGES_URL.LOGO} width={200} height={200} objectFit="cover" />
        </div>
        {children}
      </div>
    </>
  );
}

export default MainLayout;
