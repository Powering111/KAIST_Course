import { cache } from 'react'
import { promises as fs } from 'fs'

export const getCourses = cache(async ()=>{return await readData()});

async function readData(){
    console.log("Reading file.")
    const data = await fs.readFile('data/2023_1.json', {encoding:'utf-8'});
    // await (async ()=>{return new Promise((resolve,reject)=>{
    //     setTimeout(()=>{resolve()},3000)
    // })})();
    const result = JSON.parse(data);
    return result;
}