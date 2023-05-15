import { NextResponse } from 'next/server';
import { getCourses } from '@/lib/data';
export async function GET(request) {
    const {searchParams} = new URL(request.url);
    const reqType = searchParams.get('type');
    const reqFilter = JSON.parse(searchParams.get('filter'));
    const reqSort = JSON.parse(searchParams.get('sort'));
    console.log(reqFilter);
    let courses = await getCourses();
    
    return NextResponse.json({ courses });
}