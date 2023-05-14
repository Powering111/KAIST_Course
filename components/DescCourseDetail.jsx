'use client'
import { useAPI } from "@/lib/useAPI";
export function DescCourseDetail({courseId}){
    const {data, error, isLoading } = useAPI('/api/course?'+new URLSearchParams({courseId:courseId}));

    if(error){
        console.log("something wrong")
        throw new Error('fetching /api/course failure');
    }
    
    if(isLoading){
        return <>LOADING</>
    }
    if(!data.valid){
        return <div className="desc-course-detail">Course loading failure.</div>
    }
    const course = data.course;
    return (<div className="desc-course-detail">
        <div className="desc-course-detail-header">
            <div style={{flexGrow:1}}>
                <DescCourseDetailProperty column="number" value={course.number}/>
                <DescCourseDetailProperty column={`title${course.type?` type-${course.type}`:""}`} value={course.title}/>
            </div>
            {course.syllabus &&
                <DescCourseDetailProperty 
                    column="syllabus" 
                    value={<a href={`https://cais.kaist.ac.kr/syllabusInfo?year=${course.year}&term=${course.term}&subject_no=${course.code}&lecture_class=${course.section?.padEnd(2,' ') ?? "  "}&dept_id=${course.departmentCode}`} 
                            target="_blank">Syllabus</a>
                    } 
                />
            }
        </div>
        <DescCourseDetailProperty column="instructor" value={course.instructor}/>

        <DescCourseDetailProperty column="section" value={course.section}/>
        <DescCourseDetailProperty column="credits" value={course.credits}/>
        

    </div>)
}

function DescCourseDetailProperty({column="", value=""}){

    return (
        <div className={`desc-course-detail-property ${column!=="" && `desc-course-detail-property-${column}`}`}>
            {value}
        </div>
    )
}
