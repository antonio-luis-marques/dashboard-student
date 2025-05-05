'use client'

import React from 'react'
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { NAVIGATION, useDemoRouter } from "@/Components/Navigation/Navigation";
import HomeCard from '@/Components/Home/HomeCard';
import Transaction from './courses/page';
import PaymentRoute from './certificate/page';
import Subscription from './marketplace/page';
import Catalog from './mycourses/page';
import MyCourses from './mycourses/page';
import Certificate from './certificate/page';
import Marketplace from './marketplace/page';
import Profile from './profile/page';
import Image from 'next/image';

export default function AppProviderComponent() {
  const router = useDemoRouter('/dashboard');

  const renderContent = () => {
    switch (router.pathname) {
      case '/dashboard':
        return <HomeCard />;
      case '/courses':
        return <Transaction />;
      case '/mycourses':
        return <MyCourses />;
      case '/certificate':
        return <Certificate/>;
      case '/marketplace':
        return <Marketplace />;
      case '/profile':
        return <Profile />
      default:
        return;
    }
  };
  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      branding={{
        title: 'Grupo Jungle',
        logo: <Image src="/logo.png" alt="Logo Jungle Midia" width={40} height={40} />,
      }}
    >
      <DashboardLayout>
        <PageContainer
          title=''>
          {renderContent()}
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  )
}