export async function ListContainer(){
    const res = await fetch("http://localhost:3000/api/list");
    if(!res.ok){
        throw new Error("fetch api/link failure");
    }
    const CourseList = res.json();

    return (
        <div className="list-container">
            {CourseList.map((course)=>{
            return <ListCourse course={course}></ListCourse>
            })}
        </div>
    )
}

export function ListCourse({course}){
    return (
        <div className="list-course">{}</div>
    )
}