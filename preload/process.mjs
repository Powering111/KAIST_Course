import { mapColumn, mapCourseType, mapTerm } from '../lib/literals.mjs';
import XLSX from 'xlsx';
import fs from 'fs'
class Courses{
    constructor(filePath){
        this.filePath= filePath;
        this.curr_sheet = this.readXlsx();
        this.data = this.parseXlsx();
    }

    // apply conversion function to the specified column of every row.
    applyConversion(key_names, conversion){
        if(!Array.isArray(key_names)){
            key_names = [key_names];
        }
        for(let row of this.data){
            for(let key_name of key_names){
                row[key_name] = conversion(row[key_name]);
            }
        }
    }

    modifyRows(mappingFn){
        for(let row of this.data){
            row=mappingFn(row);
        }
    }

    readXlsx(){
        
        const file = XLSX.readFile(this.filePath);
        return file.Sheets["Courses Offered"];
    }

    // parse Xlsx and return as Array of row Objects, which value consisted with each cell Strings.
    parseXlsx() {

        // Getting Keys
        this.keys = Array();

        const key_row=2;
        for(let col=1;true;col++){
            const key_name=this.getCell(col, key_row);
            if(key_name===""){
                this.col_count = col-1;
                break;
            }
            this.keys.push(key_name);
        }

        // Getting cell datas
        const data = Array();
        for (let row = key_row+1; true; row++) {
            if (this.getCell(1, row) === "") {
                this.row_count = row-key_row-1;
                break;
            }
            const one_row = {};
            let num = 0;
            for (let col = 1; col <= this.col_count; col++) {
                const cell_value = this.getCell(col, row);
                one_row[this.keys[num]] = cell_value;
                num++;
            }
            
            data.push(one_row);
        }

        console.log(`${this.col_count} cols, ${this.row_count} rows`)
        return data;
    }

    getCell(column,row){
        const cell = this.curr_sheet[this.toColumnName(column)+String(row)]
        if(!cell){
            return "";
        }
        
        let value = cell.v;
        if(cell.t=='s'){
            value = value.trim();
        }

        if(!value || cell.t==='u'){
            return "";
        }

        return value;
    }

    toColumnName(num){
        if(num<=26){
            return String.fromCharCode(64+num);
        }
        else{
            const a = num-27;
            return this.toColumnName(Math.floor(a/26)+1)+this.toColumnName(a%26+1);
        }
    }


    saveAsFile(filePath){
        const result_str=JSON.stringify(this.data);
        
        try{
            fs.writeFileSync(filePath,result_str);
        }
        catch(e){
            console.log(e);
        }
    }

    normalizeColumnName(){
        
        const res = Array();
        for(let [index, row] of this.data.entries()){
            const new_row = {};
            for(let [key,  value] of Object.entries(mapColumn)){
                if(row[value]){
                    new_row[key] = row[value];
                }
            }
            new_row['id']=index+1;
            res.push(new_row);
        }
        this.data = res;

    }
}


console.log("Processing started.")
const courses = new Courses("data/Courses Offered_2023_1_학사_연구제외.xls");
courses.normalizeColumnName();
console.log(courses.keys)
courses.applyConversion(['year','sizeLimit','size'],parseInt)
courses.applyConversion(['time','examTime'],(str)=>{
    if(str?.length){
        const arr = str.split("\r\n").map((x)=>{const y=x.split(" ");return {day:y[0],time:y[1]}});
        return arr;
    }
    else return [];
})
courses.applyConversion('type',(type)=>{
    return Object.keys(mapCourseType).find(key=>mapCourseType[key]===type)
});
courses.applyConversion('term',(term)=>{
    return Object.keys(mapTerm).find(key=>mapTerm[key]===term);
})

courses.modifyRows((row)=>{
    const LLC = row.LLC.split(':')


    const lecture_str = LLC[0] ?? '0';
    const lab_str = LLC[1] ?? '0';
    const credits_str = LLC[2] ?? '0';
    row["lecture"]=parseFloat(lecture_str);
    row["lab"]=parseFloat(lab_str);
    row["credits"]=parseFloat(credits_str);
    return row;

});

courses.saveAsFile("data/2023_1.json");
console.log("Processing ended.")