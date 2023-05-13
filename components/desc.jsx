export async function DescCourseBanner({ courseId=0 }){
    const res = await fetch('http://localhost:3000/api/course?'+new URLSearchParams({courseId:courseId}));
    if(!res.ok){
        throw new Error('fetching /api/course failure');
    }
    const data = await res.json();

    if(data.valid){
        return (
            <div className="desc-course-banner">
                {data.course.number}
                {data.course.title}
            </div>
        );
    }
    else{
        throw new Error(`Course with given courseId ${courseId} does not exist.`);
    }
}

export function DescCourseBannerSkeleton(){
    return (
        <div className="desc-course-banner skeleton"></div>
    );
}