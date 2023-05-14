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
    return (<div className="desc-course-detail">
        {JSON.stringify(data)}

    </div>)
}