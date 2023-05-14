import { getCourses } from "@/lib/data";
import { DescCourseBannerClient } from "@/components/DescCourseBannerClient";
export async function DescCourseBanner({ courseId=0 }){

    const courses = await getCourses();
    const selected = courses.find(course=>course.id===courseId);
    if(selected===undefined){
        throw new Error(`Course with given courseId (${courseId}) does not exist.`);
    }
    else{
        return (
            <DescCourseBannerClient course={selected} />
        );
    }
}

export function DescCourseBannerSkeleton(){
    return (
        <div className="desc-course-banner skeleton"></div>
    );
}

