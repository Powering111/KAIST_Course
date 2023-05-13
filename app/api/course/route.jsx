import { NextResponse } from "next/server";
import { getCourses } from "@/lib/data";

export async function GET(request){
    const {searchParams} = new URL(request.url);
    const id = parseInt(searchParams.get('courseId'));
    if(!id){
        return NextResponse.json({valid:false});
    }
    const courses = await getCourses();
    const selected = courses.filter(course=>course.id===id);
    if(selected.length===0){
        return NextResponse.json({valid:false});
    }
    return NextResponse.json({valid:true,course:selected[0]});
}
