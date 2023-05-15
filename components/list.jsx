'use client'

import { useAPI } from "@/lib/useAPI";

export function ListContainer(){
    const {data,error,isLoading} = useAPI("/api/list");
    if(error){
        return <div className="list-container">Error!</div>
    }
    if(isLoading){
        return <div className="list-container skeleton">loading...</div>
    }
    console.log(data);
    return (
        <div className="list-container">
            {data.courses.map((course)=>{
                return <ListCourse key={course.id} course={course}></ListCourse>
            })}
        </div>
    )
}

export function ListCourse({course}){
    return (
        <div className="list-course">LIST{course.title}</div>
    )
}