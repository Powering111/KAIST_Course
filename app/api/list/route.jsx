import { NextResponse } from 'next/server';
import { getCourses } from '@/lib/data';
export async function GET(request) {
    const {searchParams} = new URL(request.url);
    const reqType = searchParams.get('type');
    const reqFilter = JSON.parse(searchParams.get('filter'));
    const reqSort = JSON.parse(searchParams.get('sort'));
    console.log(reqFilter);
    let courses = await getCourses();
    courses = courses.filter((course)=>{
        let send=true;
        if(reqFilter && Array.isArray(reqFilter)){
            reqFilter.forEach((filter)=>{
                if(filter.column && filter.value && Array.isArray(filter.value)){
                    console.log(filter.value)
                    if(! filter.value.includes(course[filter.column])){
                        send=false;
                    }
                }
            });
        }
        return send;
    });
    return NextResponse.json({ courses });
}