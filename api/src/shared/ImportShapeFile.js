//extracting zip file
import pool from "../../db.js";
import * as shapefile from 'shapefile';//shpjs rejects dueto url, shapefile is not reading reader==not working
import { rename } from 'fs';
import fs from 'fs';
import StreamZip from 'node-stream-zip';
import queries from "../park/quieries/queries.js";
import { Console } from "console";

import GISQueries from "../park/quieries/GISQueries.js";

let folderName='./imported_files';

//====================START SAVE SHAPE TO POSTGRES
const saveShapeToPostgre= (req,res,fileToConvert)=>{
  console.log("saving to postgre started...")
  const {shape_type}=req.body;
  let count=0;
  try{
    shapefile.open(fileToConvert)
    .then(source => source.read()
      .then(async function log(result) {
        if (result.done) return;
        count++;
        //SAVE EACH FEATURE
        let sqlval=[JSON.stringify(result.value.geometry),'001',shape_type,fileToConvert];

        if(shape_type==='PARK'){
          res.send({message: "Not possible at this time"});          
        }else if(shape_type==='BLOCK'){
          console.log('block entry');
          sqlval=[JSON.stringify(result.value.geometry)];
          await pool.query('START TRANSACTION');
          let res=await pool.query(
            queries.importBlock,
            sqlval);    
          await pool.query('COMMIT');
        }
        else if(shape_type==='PARCEL'){
          console.log('parcel entry');
          let local_shed_no=result?.value?.properties?.Shade_Numb;
          if(!local_shed_no){
            local_shed_no=result?.value?.properties?.Shed_No;
          }
          sqlval=[JSON.stringify(result?.value?.geometry), local_shed_no];
          await pool.query('START TRANSACTION');
          console.log(sqlval);
          let res=await pool.query( GISQueries.importParcel, sqlval);    
           // console.log(result);
          await pool.query('COMMIT');
          console.log('parcel import complete');
        }
        else if(shape_type==='INFRA'){
          console.log('infrastructure entry');
          sqlval=[JSON.stringify(result.value.geometry)];
          await pool.query('START TRANSACTION');
          let res=await pool.query( GISQueries.importInfra, sqlval);    
           // console.log(result);
          await pool.query('COMMIT');
        }
        else if(shape_type==='GREEN'){
          console.log('green entry');
          sqlval=[JSON.stringify(result.value.geometry)];
          await pool.query('START TRANSACTION');
          let res=await pool.query( GISQueries.importGreen, sqlval);    
           // console.log(result);
          await pool.query('COMMIT');
        }        
        return source.read().then(log);
      }))
    .catch(error => console.error(error.stack));
    console.log("importing completed!")
  }catch(err){
    console.log(err)
  };
}
//--------IMPORT PARK------
const importEachParkFeature=async (req,res)=>{
  console.log("importing new park started...")

}
const importInfrastructure=async (req,res)=>{
  console.log("importing new infrastructure started...")

}
const importGreen=async (req,res)=>{
  console.log("importing new green started...")

}
const importBlock=async (req,res)=>{
  console.log("importing new block started...")

}
const importParcel=async (req,res)=>{
  console.log("importing new parcel started...")

}

//--------END IMPORT PARK------
//============== END SAVE SHAPE TO POSTGRES========================
//==============UPLOAD ZIP FILES============================
const uploadZipFile=async (req,res)=>{
    try {
        console.log('loading file started...')
        const tempPath = req.file.path;
       
        let targetPath = `./imported_files/${req.file.originalname}`;
        const fileExists=fs.existsSync(targetPath);
        if(fileExists){
          //if file exists create new name with _
          const extensionIndex=targetPath.lastIndexOf('.')
          const fileWithOutExtension=targetPath.substring(0,extensionIndex);
          targetPath=fileWithOutExtension + '_'+ targetPath.substring(extensionIndex,targetPath.length) ;
//          console.log("new name"+ targetPath);
        }
        rename(tempPath, targetPath, err => {
          if (err) return handleError(err, res);
          res.status(200);
        });
      //===check if file is uploaded== works check if better alternative
        setTimeout(()=>{
            console.log('loading completed!');
            extractZipFile(targetPath); 
        },3000);  
        setTimeout(()=>{
            //get the folder extracted and use the file name + .shp
            let fileFinalName=targetPath.substring(targetPath.lastIndexOf('/')+1,targetPath.lastIndexOf('.'));
            const folderFinalName=fileFinalName;
            if(fileFinalName.substring(fileFinalName.length-1)=="_"){
                fileFinalName=fileFinalName.slice(0,-1);
            }
            const fileForPostgre=targetPath.substring(0,targetPath.lastIndexOf('/')) + "/"+ folderFinalName + "/"+ fileFinalName + ".shp";


            return saveShapeToPostgre(req,res,fileForPostgre);
//            delteExtractedFolder(targetPath.substring(0,targetPath.lastIndexOf('/')) + "/"+ folderFinalName); 


        },5000);
        console.log('loading finished!')
        res.send("Successful!");
        return;
      } catch (err) {
        console.log(err);
        res.send("Error");
        return;
      }
};
//====== EXTRACT ZIP FILE
const extractZipFile=(fileName)=>{
  console.log("extraction started....");
    try{
        let theShapeFile='';
        console.log('Extraction Started...')
        const folderName=fileName.substring(0,fileName.lastIndexOf('.'));
        const zip = new StreamZip({ file: fileName, storeEntries: true});
        zip.on('ready', () => {
            console.log(fileName);
            fs.mkdir(folderName,(err)=> {if(err){console.log(err)}});
            console.log('All entries read: ' + zip.entriesCount);
        });      
        zip.on('entry', (entry) => {
            if ('/' === entry.name[entry.name.length - 1]) {
                console.log('[DIR]', entry.name);
                return;
            }
            zip.stream(entry.name, async (err, stream) => {
                if (err) {
                    console.log('Error: ', err.toString());
                    return;
                }      
                stream.on('error', (err) => {
                    console.log('[ERROR]', err);
                    return;
                });
                stream.pipe(fs.createWriteStream(`${folderName}/${entry.name}`));
                if(entry.name.includes('.shp'))
                {
                    theShapeFile=`${folderName}/${entry.name}`;
                }    
            });
        });
        console.log('Extraction Completed!'); 
        return theShapeFile;     
    }catch(err){
      console.log(err);
    }
};

//========DELETE EXTRACTED FILE
const delteExtractedFolder=(folderToDelete)=>{
  console.log('removing folder started...')
  fs.rmSync(folderToDelete, { recursive: true, force: true },(err)=>{
      if(err){
        console.log(err)
      }else{
        console.log("folder deleted!");
      }
    })
    console.log('Removed successfully!')
    return;
}
export default {
    uploadZipFile,
};