'use client'

import { mapCourseType } from "@/lib/literals.mjs";
import { eventManager } from "@/lib/eventManager";
import { DescCourseDetail } from "@/components/DescCourseDetail";
export async function DescCourseBannerClient(params={}){
    const {course}= params;
    if(course===undefined){
        return <>ERR</>
    }

    function handleClick(e){
        console.log(`clicked ${course.id}`);
        eventManager.emit("showPopup",
            <DescCourseDetail courseId={course.id}/>
        );
    }

    return (
    <div className={`desc-course-banner${course.type?` type-${course.type}`:""}`} onClick={handleClick}>
        <DescCourseBannerProperty column="number" value={course.number}></DescCourseBannerProperty>
        <DescCourseBannerProperty column="title" value={course.title}></DescCourseBannerProperty>
        <DescCourseBannerProperty column="section" value={course.section}></DescCourseBannerProperty>
        <DescCourseBannerProperty column="instructor" value={course.instructor}></DescCourseBannerProperty>
        <DescCourseBannerProperty column="size" value={`${course.size}/${course.sizeLimit}`}></DescCourseBannerProperty>
        <DescCourseBannerProperty column="type" value={mapCourseType[course.type]}></DescCourseBannerProperty>
    </div>
    );
}

function DescCourseBannerProperty({column="DEF_COL", value="DEF_VAL"}){

    return (
        <div className={`desc-course-banner-property desc-course-banner-property-${column}`}>
            <span className="desc-course-banner-property-value">{value}</span>
        </div>
    )
}
