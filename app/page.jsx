
import { Suspense } from 'react';
import { DescCourseBanner, DescCourseBannerSkeleton } from '@/components/DescCourseBanner.jsx';
import { ListContainer } from '@/components/list.jsx';
export default async function Page() {

  return <>
    {[...Array(300).keys()].map(x=>{
      return (
        <Suspense fallback={<DescCourseBannerSkeleton/>}>
        <DescCourseBanner key={x} courseId={x+1}></DescCourseBanner>
      </Suspense>)
    })}
  </>;
}

