const fs = require("fs")
const express = require("express")


const fs_taslar_list = async function fs_taslar_list() {
    try {
        let tas_ozellikler = fs.readFileSync("json/taslar.json", 'utf-8')
        let tas_ozellikler_parse = JSON.parse(tas_ozellikler)
        const data_array = new Array()
        await tas_ozellikler_parse.forEach(v => {
            data_array.push(v)
        });
        return data_array
    } catch (error) {
        console.log(error, "fs_process fs_taslar_list")
    }
}

module.exports = {
    fs_taslar_list
}