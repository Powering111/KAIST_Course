
import { Suspense } from 'react';
import { DescCourseBanner, DescCourseBannerSkeleton } from '@/components/DescCourseBanner.jsx';
import { ListContainer } from '@/components/list.jsx';
export default async function Page() {

  return <>
    <ListContainer></ListContainer>
    {[...Array(64).keys()].map(x=>x*5).map(x=>{
      return (
        <Suspense fallback={<DescCourseBannerSkeleton/>}>
        <DescCourseBanner key={x} courseId={x+1}></DescCourseBanner>
      </Suspense>)
    })}
  </>;
}

