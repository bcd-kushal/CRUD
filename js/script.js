import axios from "axios";
import prettyBytes from "pretty-bytes";
import API_KEY from "./json/credentials.json";

//css custom variables
var rootStylesVariables = getComputedStyle( document.documentElement );

export const DB_DATA = {
    "allTableData": {
        0: {}
    },
    "tableColNames": [],
    "totalDataRows": 0,
    "totalDataCols": 0
};





const API_ENDPOINT = API_KEY["API_KEY"];
const downloadJSONTableData = document.querySelector(".jsonDownloadButton");
const downloadCSVTableData = document.querySelector(".csvDownloadButton");
const dropTableButton = document.querySelector(".dropTableButton");

function sureToDoThis( str ){
    if(!confirm( str ))
        return false;
    return true;
}



/* import setEditor from "./codeEditor";
import setResponseEditor from "./responseCodeEditor"; */

//const { reqJSONField, resJSONField } = setEditor();
//const { reqJSON } = setEditor();
//const { updateResponseJSONField } = setResponseEditor();
//import { Ace, InlineAutocomplete } from "ace-builds";
//let isTrue = false;
//let isSwitcherToggling = false;
//console.log("1.", currentThemeJSONField);


let currentThemeJSONField = "ace/theme/chrome";

const sendBtn = document.querySelector('[data-send-btn]');
/* 
if (sendBtn.style.color != ('#eb6d0d' || '#b0b3b8'))
    sendBtn.style.color = '#eb6d0d';

 */
// json editor field --------------------------------------------------

let text_input = "";
export let ace_editor;

(function jsonFieldAllTableData(){
    
    const ans = getAllTableData("JSON");

    setTimeout(() => {
/* 
        console.log(typeof(DB_DATA.allTableData));
        console.log(JSON.stringify(DB_DATA.allTableData));
        console.log(JSON.parse(DB_DATA.allTableData)); */



        // ALSO GET THE COL_NAMES INTO JS_OBJ
        fetchColNamesOfCurrDB();



        text_input = JSON.parse(DB_DATA.allTableData);

        
        text_input = JSON.stringify(text_input, null, 4).replace(/{\s*/g, '{\n\n');
        document.getElementById("editor").innerHTML = text_input;
        ace_editor = ace.edit("editor");
        ace_editor.getSession().setMode("ace/mode/json");
        ace_editor.setTheme("ace/theme/chrome");
        ace_editor.getSession().setTabSize(4);
        ace_editor.getSession().setUseWrapMode(true);

    }, 8*1000 );
        
})();

//fetch column names from DB
function fetchColNamesOfCurrDB(){
    DB_DATA.tableColNames = new Array();

    const ob = JSON.parse(DB_DATA.allTableData);
    console.log("ob is this --> ", ob);
    const rootLevelKeys = Object.keys( ob );
    const interiorLevelKeys = Object.keys( ob[1] );
    
    ///// GET ROW TOTAL //////////////////////////////////
    DB_DATA.totalDataCols = interiorLevelKeys.length;
    DB_DATA.totalDataRows = rootLevelKeys.length;

    console.table([DB_DATA.totalDataCols, DB_DATA.totalDataRows]);
    //////////////////////////////////////////////////////
    

    const entries = Object.entries(ob[1]);
    var i=0;

    for( const [key, val] of entries ){
        DB_DATA.tableColNames.push( key );
        i+=1;
        if( i==DB_DATA.totalDataCols )
            break;
    }
    /* 
    ob.forEach( (key,val) => {
        DB_DATA.tableColNames.push(key);
    }); */
    console.log("ALL COLS IN TABLE: ",DB_DATA.tableColNames);
}


function camelCaseToNormalCase( camelCase ){

    const normalText = camelCase.replace(/([a-z])([A-Z])/g, '$1 $2');
    return normalText.charAt(0).toUpperCase() + normalText.slice(1).trim();
            // ^ to capitalize first letter     // ^ remove trailing spaces
            
}

function createTableFromRowData(){
    const colLen = DB_DATA.totalDataCols;
    const DATA_OBJ = JSON.parse(DB_DATA.allTableData);

    const tableTag = document.createElement("table");
    const thead = tableTag.createTHead();
    const tbody = tableTag.createTBody();

    //add CSS to it
    tableTag.setAttribute("id", "db_table");
    tableTag.setAttribute("cellspacing", "0");
    tableTag.setAttribute("border", "0");


    //table header
    const headerRow = thead.insertRow();
    //headerRow.style.position = "fixed";

    for( var i=0; i<colLen; i++ ){
        const th = document.createElement("th");
        th.textContent = camelCaseToNormalCase( DB_DATA.tableColNames[i] );
        headerRow.appendChild(th);

        //add CSS
        th.setAttribute("class", "thDB");
        th.style.backgroundColor = rootStylesVariables.getPropertyValue("--tableHeaderCol");
        th.style.padding = "8.5px";
        th.style.fontSize = "1.2vw";
        th.style.overflow = "scroll";
        th.style.textAlign = "left";
        th.style.borderBottom = ".5px solid " + rootStylesVariables.getPropertyValue("--borderColor");
        if( i < colLen-1 )
            th.style.borderRight = ".5px solid " + rootStylesVariables.getPropertyValue("--borderColor");
        //document.getElementById("table_th").classList.add("thDB");
    }

    //table data rows
    console.log(DATA_OBJ);  // <---------- this much is correct JS object
    const obj = DATA_OBJ;

    console.log(obj.length);
    console.log(DB_DATA.totalDataRows);

    
    for( var k=0; k<DB_DATA.totalDataRows; k++){
        const bodyRow = tbody.insertRow();
        for( var i=0; i<colLen; i++ ){
            console.log( DATA_OBJ[k+1][DB_DATA.tableColNames[i]] );
            // ^ this thing works

            const cell = bodyRow.insertCell();
            cell.textContent = DATA_OBJ[k+1][DB_DATA.tableColNames[i]];
            cell.style.padding = "8.5px";
            cell.style.fontSize = "1.2vw";
            cell.style.overflow = "scroll";
            cell.style.fontFamily = rootStylesVariables.getPropertyValue("--fontFam");
            cell.style.borderBottom = ".5px solid " + rootStylesVariables.getPropertyValue("--borderColor");
            if( i < colLen-1 )
                cell.style.borderRight = ".5px solid " + rootStylesVariables.getPropertyValue("--borderColor");
            if( k%2 == 1 )
                cell.style.backgroundColor = "rgba(150,150,150,0.07)";

        }
    }
    /* 
    obj.forEach( item => {
        const bodyRow = tbody.insertRow();
        for( let val in item ){
            const cell = bodyRow.insertCell();
            cell.textContent = item[val];
        }
    }); */

    return tableTag;
}
//---------------------------------------------------------------------


//------ function to create table from DB data ------------------------
setTimeout(() => {
    const tableField = document.querySelector(".tableField");

    //remove all things inside first
    while(tableField.firstChild) {
        tableField.removeChild( tableField.firstChild );
    }
    tableField.innerHTML = "";


    const tableToAdd = createTableFromRowData();
    tableField.appendChild( tableToAdd );

    //add CSS to it
    document.getElementById("db_table").classList.add("tableDB");

}, 9*1000);
//---------------------------------------------------------------------







// functions to add key:value fields ----------------------------------
const field_index = {
    '[data-add-query-params-field-btn]': 0,
    '[data-add-header-field-btn]': 1
}

document.querySelector('[data-add-query-params-field-btn]').addEventListener('click', () => {
    const queryParamsContainer = document.getElementsByClassName('keyValueField')[field_index["[data-add-query-params-field-btn]"]];
    queryParamsContainer.appendChild(createKeyValuePair());
})
/* document.querySelector('[data-add-header-field-btn]').addEventListener('click', () => {
    const HeadersContainer = document.getElementsByClassName('keyValueField')[field_index["[data-add-header-field-btn]"]];
    HeadersContainer.appendChild(createKeyValuePair());
}) */
//---------------------------------------------------------------------




// functions to toggle b/w response box tabs --------------------------
/* const response_index = {
    "[data-body-response-tab]": 1,
    "[data-header-response-tab]": 2
}
document.querySelector('[data-body-response-tab]').addEventListener('click', () => {
    toggleResponseTabs(response_index['[data-body-response-tab]']);
});
document.querySelector('[data-header-response-tab]').addEventListener('click', () => {
    toggleResponseTabs(response_index['[data-header-response-tab]']);
}); */
//---------------------------------------------------------------------







// append new key:val pairs -------------------------------------------
function createKeyValuePair() {
    const element = document.querySelector('[data-key-value-template]').content.cloneNode(true);
    element.querySelector('[data-remove-btn]').addEventListener('click', e => {
        e.target.closest('[data-key-value-pair]').remove();
    });
    return element;
}
//---------------------------------------------------------------------
function checkValidURL(url) {
    const url_pattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return url_pattern.test(url);
}

function convertTime(time_in_ms) {
    if (time_in_ms < 1000)
        return String(time_in_ms) + "ms";
    else {
        const sec = parseInt(parseInt(time_in_ms) / 1000) || 0;
        const ms = parseInt(time_in_ms) % 1000;
        return ((sec == 0) ? "" : (sec + "s ")) + ms + "ms";
    }
}
//---------------------------------------------------------------------




sendBtn.addEventListener('click', () => {
    const requested_url = String(document.querySelector('[data-url]').value);
    const responseShow = document.getElementsByClassName('responseWrapper')[0];

    if (!checkValidURL(requested_url)) {
        responseShow.style.display = "none";
        alert("Malformed URL, cannot submit.");
        return;
    }

    if (!requested_url) {
        responseShow.style.display = "none";
        alert("Empty URL, cannot submit.");
        return;
    }



    //initialization
    const headerField = document.getElementsByClassName('headerAnswer')[0];
    const statusbar = document.querySelector('[data-status]');
    const timebar = document.querySelector('[data-time]');
    const sizebar = document.querySelector('[data-size]');
    const bodyAns = document.getElementsByClassName('bodyAnswer')[0];

    headerField.innerHTML = "";
    statusbar.innerHTML = "";
    timebar.innerHTML = "";
    sizebar.innerHTML = "";
    bodyAns.innerHTML = "";

    //const headerAns = document.getElementsByClassName('headerAnswer')[0];


    const http_request_type = String(document.querySelector('[data-req-type]').value);
    const params = toObjects(document.getElementsByClassName('keyValueField')[0]);
    const headers = toObjects(document.getElementsByClassName('keyValueField')[1]);

    let json_data = {};
    try {
        json_data = JSON.parse(ace_editor.getValue() || null);
    } catch {
        responseShow.style.display = "none";
        alert("JSON data is malformed.");
        return;
    }

    axios.interceptors.request.use(req => {
        req.customData = req.customData || {};
        req.customData.startTime = new Date().getTime();
        return req;
    });

    function endTime(res) {
        res.customData = res.customData || {};
        res.customData.time = new Date().getTime() - res.config.customData.startTime;
        return res;
    }

    axios.interceptors.response.use(endTime, e => {
        return Promise.reject(endTime(e.response));
    })

    //console.log(json_data);

    axios({
        url: requested_url,
        method: http_request_type,
        params: params,
        headers: headers,
        data: json_data
    })/* 
        .then((res) => {
            //console.log(res);
            responseShow.style.display = "block";


            statusbar.innerHTML = res.status || "429";
            if (statusbar.innerHTML == "429") {
                timebar.innerHTML = "nil";
                sizebar.innerHTML = "nil";
                bodyAns.innerHTML = JSON.stringify({}, null, 4);
            } else {
                timebar.innerHTML = convertTime(res.customData.time);
                sizebar.innerHTML = prettyBytes(
                    JSON.stringify(res.headers).length + JSON.stringify(res.data).length
                );

                bodyAns.innerHTML = JSON.stringify(res.data, null, 4);
            }

            createEditorField();
            //const api_response = "" || res_editor.getValue();
            //resJSONField(res.data);
            updateHeadersResponseField(res.headers);
        })
        .catch(err => {
            console.error("[ERROR]:", String(err));
        }); */
});


function createEditorField() {
    const res_editor = ace.edit("responseEditor");
    res_editor.getSession().setMode("ace/mode/json");
    res_editor.setTheme(currentThemeJSONField);
    res_editor.getSession().setTabSize(4);
    res_editor.getSession().setUseWrapMode(true);
}



function toObjects(container) {
    const pairs = container.querySelectorAll('[data-key-value-pair]');

    return [...pairs].reduce((data_obj, each_pair) => {
        const key = each_pair.querySelector('[data-key]').value;
        const val = each_pair.querySelector('[data-value]').value;

        if (key === "")
            return data_obj;

        return { ...data_obj, [key]: val };
    }, {});
}

function updateHeadersResponseField(header) {
    const headerField = document.getElementsByClassName('headerAnswer')[0];
    headerField.innerHTML = "";

    Object.entries(header).forEach(([key, value]) => {
        const keyField = document.createElement('div');
        keyField.textContent = String(key);
        headerField.append(keyField);

        const valField = document.createElement('div');
        valField.textContent = String(value);
        headerField.append(valField);
    });
}






//=========####################################=======================================================
//=========# API ACCESS AND DATA MANIPULATION #=======================================================
//=========####################################=======================================================




//=========== READ: download database as JSON data ==============================================

setTimeout(() => {

    function downloadButtonFunctionality( fileType ){

        if( sureToDoThis( `Table Data will be downloaded as ${fileType}... Proceed?` ) ){
            
            function downloadFileButton(content, fileName, contentType, extension) {
                
                const a = document.createElement("a");
                const file = new Blob([content], { type: contentType });
                a.href = URL.createObjectURL(file);
                a.download = fileName + extension;
                a.click();
                
            }
            
    
            var currentDate = new Date();
            currentDate = String(currentDate.toLocaleString());


            if( fileType == ".json" ){
                let json_data = JSON.parse(DB_DATA.allTableData);
                json_data = JSON.stringify(json_data,null,4);
    
                //download JSON data here now after all verifs are over
    
                downloadFileButton( json_data, "database"+currentDate, "application/json", ".json" );

                return;
            }
            

            if( fileType == ".csv" ){

                function convertToCSV( obj ){

                    var csvText = "", aux_arr=[];
                    csvText += DB_DATA.tableColNames.join(",") + "\n";

                    const DATA_OBJ = JSON.parse(DB_DATA.allTableData);

                    for( var k=0; k<DB_DATA.totalDataRows; k++){
                        
                        aux_arr = [];
                        for( var i=0; i<DB_DATA.totalDataCols; i++ ){

                            let cellData = DATA_OBJ[k+1][DB_DATA.tableColNames[i]];

                            if( cellData.indexOf(',') != -1 )
                                cellData = "'" + cellData + "'";
                            /* console.log( DATA_OBJ[k+1][DB_DATA.tableColNames[i]] );
                            // ^ this thing works */
                
                            aux_arr.push( cellData );
                
                        }

                        console.log("aux_arr: ", aux_arr);
                        csvText += aux_arr.join(",") + "\n";

                    }

                    console.log("csvText: ", csvText);
                    return csvText;

                }

                let json_obj = JSON.parse(DB_DATA.allTableData);
                let csv_data = convertToCSV( json_obj );
    
                //download JSON data here now after all verifs are over
    
                downloadFileButton( csv_data, "database"+currentDate, "text/csv", ".csv" );

                return;
            }
        }

    }


    downloadJSONTableData.addEventListener( "click", () => { downloadButtonFunctionality( ".json" ) });
    downloadCSVTableData.addEventListener( "click", () => { downloadButtonFunctionality( ".csv" ) });
    

}, 9.2*1000 );



//============== READ: get all table data ===========================================

function getAllTableData( returnType ){

    
    const http_request_type = "GET";
    
    axios({
        url: API_ENDPOINT,
        method: http_request_type,
        params: {
            "getWhatData": "ALL"
        }
    })
    .then((res) => {

        //clusterize those data
        const resJSObj = JSON.parse(res.data);
        
        console.log( "getAllTableData(): reqType = " + returnType );
        for( var i=0; i<resJSObj.length; i++ )
            console.log( resJSObj[i] );

        if( returnType=="JSON" ){
            console.log(res.data);
            DB_DATA.allTableData = res.data;
        } else if( returnType == "JS" ){
            console.log(resJSObj);
            return resJSObj;
        } else {}


    })
    .catch(err => {
        console.error("[ERROR]:", String(err));
    });


}






dropTableButton.addEventListener( "click", () => {

    if( sureToDoThis( "This will delete the Table... Be Sure of this action." ) ){
        const ans = getAllTableData("JSON");

        setTimeout(() => {

            console.log(JSON.parse(DB_DATA.allTableData));

        }, 8*1000 );
        
    }
    
});

