import * as databaseJS from "database-js";
import * as csv from "csv/lib/sync"
import * as _fs from "fs";
const fs = _fs.promises;

function hasData(arr: Array<any>): boolean {
    for(const item of arr) {
        if(item != "") return true;
    }
}

function isMeaningfulData(arr: Array<any>): boolean {
    const nonZeroIndexes = [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15];

    for(const index of nonZeroIndexes) {
        if(arr[index] != 0) return true;
    }

    if(arr[4] != 1) return true;

    if(arr[12] != 193) return true;

    return false;
}

function trimRow(arr: Array<any>): Array<any> {
    return arr.slice(0, 16);
}

function test(a, b, c) {
    console.log(a);
    console.log(b);
    console.log(c);
}

const connection = new databaseJS.Connection({
    DriverName: "mysql",
    Username: "",
    Password: "",
    Hostname: "localhost",
    Database: "tacturbine_dashboard_dev"
});

const insertData = connection.prepareStatement("insert into dashboard_data values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

let rawRowNumber = 1;
let meaningfulRowCount = 0;
const insertProms = Array<Promise<any>>();

function queryWrapper(data: Array<any>, rowNumRaw: number) {
    insertProms.push(
        insertData.query.apply(insertData, trimRow(data)).catch( (err) => {
            console.log(data);
            console.log(`error with row ${rowNumRaw}`);
            console.log(err);
            console.log("");
        })
    );
}

async function go() {
    const rawData = await fs.readFile("tempdata.csv");
    const csvOptions = {
        cast: true
    };
    const data = csv.parse(rawData, csvOptions) as Array<any>;

    const processedData = new Array<any>();

    

    for(let i = 1; i < data.length; i++) {
        rawRowNumber++;
        const item = data[i];
        if(hasData(item)) {
            if(isMeaningfulData(item)) meaningfulRowCount++;
            queryWrapper(item, rawRowNumber);
        }
    }

    for(const prom of insertProms) {
        await prom.catch((reason) => {
            console.log(reason);
        });
    }

    console.log(`Got ${meaningfulRowCount} meaningful rows`);
    console.log(`This file is ${((meaningfulRowCount / rawRowNumber)* 100).toFixed(2)}% meaningful data`);
}

go();