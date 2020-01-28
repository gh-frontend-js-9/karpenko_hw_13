// import * as path from 'path';
// import * as fs from 'fs';
// // const path = require('path');
// // const fs = require('fs');
// class Config{
//     constructor(){
//         this.path = './store.json';
//         this.json = new Utils()._readJson(this.path);
//     }
// } 
// class Utils{
//     constructor(){}
//     _readJson(path){
//         try {
//             let file_content = '';
//             file_content = fs.readFileSync(path, {encoding: 'utf8'});
//             return file_content;
//         } catch (error) {
//             throw new Error(`Error reading ${path}`)
//         }
//     }
// }
// class Redux{
//     constructor(){
//         this.config = new Config()
//     }
//     writeToJson(data){
//         try {
//             let file_data = new Utils()._readJson(this.config.path);
//             console.log(file_data)
//             Object.entries(data).forEach(([key, value]) => {
//                 file_data[key] = value
//             })
//             fs.writeFileSync(this.config.path, file_data)
//         } catch (error) {
//             console.log(error)
//             throw new Error(`Error writing data to ${this.config.path}`);
//         }
//     }
//     clearStorage(){

//     }
//     get(key){
//         Object.entries(this.config.json).filter(([_key, value]) => {
//             return _key == key
//         })
//     }
// }
// let test = {
//     pass: 'oksud22@gmail.com'
// }
// new Redux().writeToJson(test)