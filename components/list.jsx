'use client'

import { useAPI } from "@/lib/useAPI";
import { IconButton } from "./UserInteraction";
import { useState, useRef } from "react";

export function ListContainer(){
    const [filters, setFilters] = useState(Array());
    const {data,error,isLoading} = useAPI("/api/list");
    if(error){
        return <div className="list-container">Error!</div>
    }
    if(isLoading){
        return <div className="list-container skeleton">loading...</div>
    }
    console.log(data);
    const courses = data.courses.filter((course)=>{
        let show=true;
        filters.forEach((filter)=>{
            if(! filter.values.includes(course[filter.column])){
                show=false;
            }
        });
        return show;
    });
    return (
        <div className="list-container">
            <ListMenu setFilters={setFilters}></ListMenu>
            {courses.length} Courses
            {courses.map((course)=>{
                return <ListCourse key={course.id} course={course}></ListCourse>
            })}
        </div>
    )
}

function ListCourse({course}){
    return (
        <div className="list-course">{course.title} {course.section ?? " "}</div>
    )
}

function ListMenu({setFilters}){
    return <div className="list-menu">
        <ListFilters setFilters={setFilters}/>
    </div>
}

function ListFilters({setFilters}){
    const [open, setOpen] = useState(false);
    const filters = useRef([
        {column:"section",values:["D","E","F"]}
    ]);
    const applyChange=()=>{

        setFilters(filters.current);
    }
    console.log(filters);
    return <>
        <IconButton onClick={(e)=>{setOpen(!open)}} src="/res/filter-icon.svg"/>
        {open && <>
            OPEN
            <div className="list-filter">
                {filters.current.map((filter,idx)=>{
                   return <ListFilter key={idx} filter={filter}></ListFilter>
                })}
            </div>
            <IconButton onClick={applyChange} src="/res/save-icon.svg"/>
        </>}
    </>
}

function ListFilter({filter}){
    return <>{filter.column} : {filter.values.map(value=>value+' ')}</>
}