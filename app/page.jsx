
import { Suspense } from 'react';
import { DescCourseBanner, DescCourseBannerSkeleton } from '@/components/desc.jsx';
import { ListContainer } from '@/components/list.jsx';

export default async function Page() {

  return <>
    {[...Array(10).keys()].map(x=>{
      return (<Suspense fallback={<DescCourseBannerSkeleton/>}>
      <DescCourseBanner courseId={x+1}></DescCourseBanner>
    </Suspense>)
    })}
  </>;
}

