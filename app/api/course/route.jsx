import { NextResponse } from "next/server";
import { getCourses } from "@/lib/data";

export async function GET(request){
    const {searchParams} = new URL(request.url);
    const id = parseInt(searchParams.get('courseId'));
    if(!id){
        return NextResponse.json({valid:false});
    }
    const courses = await getCourses();
    const selected = courses.find(course=>course.id===id);
    if(selected===undefined){
        return NextResponse.json({valid:false});
    }
    console.log(id)
    return NextResponse.json({valid:true,course:selected});
}
