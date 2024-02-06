function getColumnFormat_Raw_1() {         
    var columns;
                    //the validators can be used on the columns to validate the property of the cell
                    //It has been commented out to save the file easily for testing purposes
        columns = [
            {readOnly: true },{},{},
            {type: 'numeric', numericFormat: { pattern: '0' }, validator: positiveNumberValidator},
            {type: 'date',},{},{type: 'date',},
            {type: 'numeric', numericFormat: { pattern: '0' }, validator: percentageValidator},
            {type: 'numeric', numericFormat: { pattern: '0' }, validator: percentageValidator},
            {type: 'numeric', numericFormat: { pattern: '0' }, validator: positiveIntegerValidator },
            {type: 'numeric', numericFormat: { pattern: '0' }, validator: positiveIntegerValidator },
            {type: 'numeric', numericFormat: { pattern: '0' }, validator: positiveIntegerValidator },
            {type: 'numeric', numericFormat: { pattern: '0' }, validator: positiveIntegerValidator },
            {type: 'numeric', numericFormat: { pattern: '0' }, validator: positiveIntegerValidator },
            {},{type: 'date',},
            {type: 'numeric', numericFormat: { pattern: '0' }, validator: positiveNumberValidator},
            {},{type: 'checkbox'}
        ];
        return columns;
     }  
         //each '{}' indicates one column with default properties unless specified
   
function getColumnFormat_Raw_2() {         
    var columns;    
        columns = [
        {readOnly: false },
        {},
        {type: 'numeric', numericFormat: { pattern: '0' }, validator: positiveNumberValidator, allowInvalid: false},
        {type: 'date',},
        {},
        {type: 'date',},
        {type: 'numeric', numericFormat: { pattern: '0' }, validator: percentageValidator},
        {type: 'numeric', numericFormat: { pattern: '0' }, validator: positiveIntegerValidator },
        {},
        {type: 'date',},
        {type: 'numeric', numericFormat: { pattern: '0' }, validator: positiveNumberValidator},
        {},
        {type: 'checkbox'},
        ];
        return columns;
     } 
     
function getColumnFormat_Ingredient_1() {         
    var columns;
    
        columns = [
        {readOnly: true },{},{},
        {type: 'numeric', numericFormat: { pattern: '0' }, validator: positiveNumberValidator},
        {type: 'date',},{},{},{},{type: 'date',},
        {type: 'numeric', numericFormat: { pattern: '0' }, validator: percentageValidator},
        {type: 'numeric', numericFormat: { pattern: '0' }, validator: percentageValidator},
        {type: 'numeric', numericFormat: { pattern: '0' }, validator: percentageValidator},
        {type: 'numeric', numericFormat: { pattern: '0' }, validator: positiveIntegerValidator },
        {type: 'numeric', numericFormat: { pattern: '0' }, validator: positiveIntegerValidator },
        {type: 'numeric', numericFormat: { pattern: '0' }, validator: positiveIntegerValidator },
        {type: 'date',},{},{},{},{},{type: 'date',},
        {type: 'numeric', numericFormat: { pattern: '0' }, validator: positiveNumberValidator},
        {},{type: 'checkbox'},
        ];
        return columns;
     } 

function getColumnFormat_Ingredient_2() {         
    var columns;
    
        columns = [
        {readOnly: true },{},
        {type: 'numeric', numericFormat: { pattern: '0' }, validator: positiveNumberValidator},
        {type: 'date',},{},{type: 'date',},
        {type: 'numeric', numericFormat: { pattern: '0' }, validator: positiveNumberValidator},
        {type: 'numeric', numericFormat: { pattern: '0' }, validator: positiveNumberValidator},
        {type: 'numeric', numericFormat: { pattern: '0' }, validator: positiveIntegerValidator},
        {},{type: 'date',},
        {type: 'numeric', numericFormat: { pattern: '0' }, validator: positiveNumberValidator},
        {},{type: 'checkbox'},
        ];
        return columns;
     }  

function getColumnFormat_Ingredient_3() {         
    var columns;
    
        columns = [
        {readOnly: true },{},{},{},
        {type: 'numeric', numericFormat: { pattern: '0' }, validator: positiveNumberValidator},
        {type: 'date',},
        {type: 'numeric', numericFormat: { pattern: '0' }, validator: positiveIntegerValidator },
        {type: 'numeric', numericFormat: { pattern: '0' }, validator: positiveIntegerValidator },
        {type: 'numeric', numericFormat: { pattern: '0' }, validator: positiveIntegerValidator },
        {type: 'numeric', numericFormat: { pattern: '0' }, validator: positiveIntegerValidator },
        {type: 'numeric', numericFormat: { pattern: '0' }, validator: positiveIntegerValidator },
        {},{type: 'date',},
        {type: 'numeric', numericFormat: { pattern: '0' }, validator: positiveNumberValidator},
        {},{type: 'checkbox'},
        ];
        return columns;
     } 

function getColumnFormat_Materials() {         
    var columns;
    
        columns = [
        {readOnly: true },{},{},
        {type: 'numeric',},{},{type: 'date',},{},{type: 'date',},
        {type: 'numeric',},{},{type: 'date',},
        {type: 'numeric',},{},{type: 'checkbox'},
        ];
        return columns;
     } 

function getColumnFormat_Stage_1(sheets) {          //'sheets' is passed as a parameter
    var columns;
    var material_list = [];
    var sheetData = sheets['Materials']['sheet_data'];
    for (var i = 0; i < sheetData.length; i++) {        //for loop to get the value of the 
        var rowData = sheetData[i];                     //cell by accessing their index in an array of arrays logic
        var columnData = rowData[2]; 
        if (columnData.trim() !== "") {                 
            material_list.push(columnData);
        }
    }
    console.log(material_list)
  
    columns = [
      {readOnly: true },
      {type: 'date', readOnly: true },
      {readOnly: true },
      {readOnly: true },
      {readOnly: true },
      {},
      {
        
        type: "dropdown",
        source: material_list
        
      },
      {
        type: "dropdown",
        source: material_list
        
      },
      {
        type: "dropdown",
        source: material_list
        
      },
      {type: 'date',},{},{},{},{},{type: 'date',},{},{type: 'date',},{},{},{type: 'date',},
      {
        type: 'dropdown', 
        source: ['Accept','Reject'],
      },{},{type: 'checkbox'},
    ];
    return columns;
  }


function getColumnFormat_Stage_2(sheets) {         
    var columns;
    var material_list = [];
    var sheetData = sheets['Stage_1']['sheet_data'];
    for (var i = 0; i < sheetData.length; i++) {
        var rowData = sheetData[i];
        var columnData = rowData[6]; 
        if (columnData.trim() !== "") {
            material_list.push(columnData);
        }
    }
    columns = [
        {readOnly: true },{type: 'date',readOnly: true },{readOnly: true },{readOnly: true },{readOnly: true },{readOnly: true },
        { 
            type: "dropdown",
            source: material_list
        },
        {},{},{},{},{},{type: 'date',},
        {
            type: 'dropdown', 
            source: ['Accept','Reject'],},
        {},{type: 'checkbox'},
        ];
        return columns;
     } 

function getColumnFormat_Stage_3(sheets) {         
    var columns;
    var material_list = [];
    var sheetData = sheets['Stage_1']['sheet_data'];
    for (var i = 0; i < sheetData.length; i++) {
        var rowData = sheetData[i];
        var columnData = rowData[6]; 
        if (columnData.trim() !== "") {
            material_list.push(columnData);
        }
    }
    columns = [
        {readOnly: true },{type: 'date',readOnly: true },{readOnly: true },{readOnly: true },{readOnly: true },{readOnly: true },
        {
             type: "dropdown",
            source: material_list
        },
        {type: 'date',},{},{},{},{},{type: 'date',},
        {
            type: 'dropdown', 
            source: ['Accept','Reject'],},
        {},{type: 'checkbox'},
        ];
        return columns;
     }

function getColumnFormat_Stage_4(sheets) {         
    var columns;
    var material_list = [];
    var sheetData = sheets['Stage_1']['sheet_data'];
    for (var i = 0; i < sheetData.length; i++) {
        var rowData = sheetData[i];
        var columnData = rowData[6]; 
        if (columnData.trim() !== "") {
            material_list.push(columnData);
        }
    }
    
    columns = [
        {readOnly: true },{type: 'date',readOnly: true },{readOnly: true },{readOnly: true },{readOnly: true },{readOnly: true },
        {
            type: 'dropdown', 
            source: material_list },
        {type: 'date',},{},{},{},{},{type: 'date',},
        {
            type: 'dropdown', 
            source: ['Accept','Reject'],},
        {},{type: 'checkbox'},
        ];
        return columns;
     } 

function getColumnFormat_Stage_5(sheets) {         
    var columns;
    var material_list = [];
    var sheetData = sheets['Stage_1']['sheet_data'];
    for (var i = 0; i < sheetData.length; i++) {
        var rowData = sheetData[i];
        var columnData = rowData[6]; 
        if (columnData.trim() !== "") {
            material_list.push(columnData);
        }
    }
        columns = [
        {readOnly: true },{type: 'date',readOnly: true },{readOnly: true },{readOnly: true },{readOnly: true },{readOnly: true },
        {
            type: 'dropdown', 
            source: material_list,},
        {type: 'date',},{},{},{},{},{type: 'date',},
        {
            type: 'dropdown', 
            source: ['Accept','Reject'],
        },{},{type: 'checkbox'},
        ];
        return columns;
     } 

function getColumnFormat_Stage_6(sheets) {         
    var columns;
    var material_list = [];
    var sheetData = sheets['Stage_1']['sheet_data'];
    for (var i = 0; i < sheetData.length; i++) {
        var rowData = sheetData[i];
        var columnData = rowData[6]; 
        if (columnData.trim() !== "") {
            material_list.push(columnData);
        }
    }
        columns = [
        {readOnly: true },{type: 'date',readOnly: true },{readOnly: true },{readOnly: true },{readOnly: true },{readOnly: true },
        {
            type: 'dropdown', 
            source: material_list,},
        {type: 'date',},{},{},{},{},{},{},{},{type: 'date',},
        {
            type: 'dropdown', 
            source: ['Accept','Reject'],},
        {},{type: 'checkbox'},
        ];
        return columns;
     } 

function getColumnFormat_Stage_7(sheets) {         
    var columns;
    var material_list = [];
    var sheetData = sheets['Stage_1']['sheet_data'];
    for (var i = 0; i < sheetData.length; i++) {
        var rowData = sheetData[i];
        var columnData = rowData[6]; 
        if (columnData.trim() !== "") {
            material_list.push(columnData);
        }
    }
        columns = [
        {readOnly: true },{type: 'date',readOnly: true },{readOnly: true },{readOnly: true },{readOnly: true },{readOnly: true },
        {
            type: 'dropdown', 
            source: material_list},
        {},{},{},{},{type: 'date',},{},{},
        {type: 'numeric', numericFormat: { pattern: '0' }, validator: positiveNumberValidator},
        {type: 'numeric', numericFormat: { pattern: '0' }, validator: positiveNumberValidator},
        {type: 'numeric', numericFormat: { pattern: '0' }, validator: positiveNumberValidator},
        {type: 'numeric', numericFormat: { pattern: '0' }, validator: positiveNumberValidator},
        {type: 'numeric', numericFormat: { pattern: '0' }, validator: positiveNumberValidator},{},{},{type: 'date',},
        {
            type: 'dropdown', 
            source: ['Accept','Reject'],},{},{type: 'checkbox'},
        ];
        return columns;
     } 

function getColumnFormat_Stage_8(sheets) {         
    var columns;
    var material_list = [];
    var sheetData = sheets['Stage_1']['sheet_data'];
    for (var i = 0; i < sheetData.length; i++) {
        var rowData = sheetData[i];
        var columnData = rowData[6]; 
        if (columnData.trim() !== "") {
            material_list.push(columnData);
        }
    }
        columns = [
        {readOnly: true },{type: 'date',readOnly: true },{readOnly: true },{readOnly: true },{readOnly: true },{readOnly: true },
        {
            type: 'dropdown', 
            source: material_list,},
        {},{},{type: 'date',},{},{},{},{},{type: 'date',},
        {
            type: 'dropdown', 
            source: ['Accept','Reject'],},{},{type: 'checkbox'},
        ];
        return columns;
     } 

function getColumnFormat_Stage_9(sheets) {         
    var columns;
    var material_list = [];
    var sheetData = sheets['Stage_1']['sheet_data'];
    for (var i = 0; i < sheetData.length; i++) {
        var rowData = sheetData[i];
        var columnData = rowData[6]; 
        if (columnData.trim() !== "") {
            material_list.push(columnData);
        }
    }
        columns = [
        {readOnly: true },{type: 'date',readOnly: true },{readOnly: true },{readOnly: true },{readOnly: true },{readOnly: true },
        {
            type: 'dropdown', 
            source: material_list, },
        {readOnly: true },
        {readOnly: true },{type: 'date',},{},{},{},{},{type: 'date',},
        {
            type: 'dropdown', 
            source: ['Accept','Reject'],},{},{type: 'checkbox'},
        ];
        return columns;
     } 

function getColumnFormat_Stage_10(sheets) {         
    var columns;
    var material_list = [];
    var sheetData = sheets['Stage_1']['sheet_data'];
    for (var i = 0; i < sheetData.length; i++) {
        var rowData = sheetData[i];
        var columnData = rowData[6]; 
        if (columnData.trim() !== "") {
            material_list.push(columnData);
        }
    }
        columns = [
        {readOnly: true },{type: 'date',readOnly: true },{readOnly: true },{readOnly: true },{readOnly: true },{readOnly: true },
        {
            type: 'dropdown', 
            source: material_list,},
        {readOnly: true },
        {type: 'date',},{},{},{},{},{type: 'date',},
        {   
            type: 'dropdown', 
            source: ['Accept','Reject'],},{},{type: 'checkbox'},
        ];
        return columns;
     } 

function getColumnFormat_Stage_11(sheets) {         
    var columns;
    var material_list = [];
    var sheetData = sheets['Stage_1']['sheet_data'];
    for (var i = 0; i < sheetData.length; i++) {
        var rowData = sheetData[i];
        var columnData = rowData[6]; 
        if (columnData.trim() !== "") {
            material_list.push(columnData);
        }
    }
        columns = [
        {readOnly: true },{type: 'date',readOnly: true },{readOnly: true },{readOnly: true },{readOnly: true },{readOnly: true },
        {
            type: 'dropdown', 
            source: material_list, },
        {readOnly: true },{type: 'date',},{},{},
        {type: 'numeric', numericFormat: { pattern: '0' }, validator: positiveNumberValidator},{},{},{type: 'date',},
        {   
            type: 'dropdown', 
            source: ['Accept','Reject'],},
        {},{type: 'checkbox'},
        ];
        return columns;
     } 

function getColumnFormat_Stage_12(sheets) {         
    var columns;
    var material_list = [];
    var sheetData = sheets['Stage_1']['sheet_data'];
    for (var i = 0; i < sheetData.length; i++) {
        var rowData = sheetData[i];
        var columnData = rowData[6]; 
        if (columnData.trim() !== "") {
            material_list.push(columnData);
        }
    }
        columns = [
        {readOnly: true },{type: 'date',readOnly: true },{readOnly: true },{readOnly: true },{readOnly: true },{readOnly: true },
        {
            type: 'dropdown', 
            source: material_list,},
        {readOnly: true },{type: 'date',},{},{},
        {type: 'numeric', numericFormat: { pattern: '0' }, validator: positiveNumberValidator},
        {type: 'numeric', numericFormat: { pattern: '0' }, validator: positiveNumberValidator},{},{},{type: 'date',},
        { 
            type: 'dropdown', 
            source: ['Accept','Reject'],},
        {},{},{type: 'checkbox'},
        ];
        return columns;
     } 
function getColumnFormat_Stage_13(sheets) {         
    var columns;
    var material_list = [];
    var sheetData = sheets['Stage_1']['sheet_data'];
    for (var i = 0; i < sheetData.length; i++) {
        var rowData = sheetData[i];
        var columnData = rowData[6]; 
        if (columnData.trim() !== "") {
            material_list.push(columnData);
        }
    }
        columns = [
        {readOnly: true },{type: 'date',readOnly: true },{readOnly: true },{readOnly: true },{readOnly: true },{readOnly: true },
        {   
            type: 'dropdown', 
            source: material_list,},
        {readOnly: true },{type: 'date',},{},
        {type: 'numeric', numericFormat: { pattern: '0' }, validator: positiveNumberValidator},
        {type: 'numeric', numericFormat: { pattern: '0' }, validator: positiveNumberValidator},{type: 'date',},{},{},{},{type: 'date',},
        {   
            type: 'dropdown', 
            source: ['Accept','Reject'],},{},{type: 'checkbox'},
        ];
        return columns;
     } 

function getColumnFormat_Stage_14(sheets) {         
    var columns;
    var material_list = [];
    var sheetData = sheets['Stage_1']['sheet_data'];
    for (var i = 0; i < sheetData.length; i++) {
        var rowData = sheetData[i];
        var columnData = rowData[6]; 
        if (columnData.trim() !== "") {
            material_list.push(columnData);
        }
    }
        columns = [
        {readOnly: true },{type: 'date',readOnly: true },{readOnly: true },{readOnly: true },{readOnly: true },{readOnly: true },
        {   
            type: 'dropdown', 
            source: material_list },
        {readOnly: true },{type: 'date',},{},{},
        {type: 'numeric', numericFormat: { pattern: '0' }, validator: positiveNumberValidator},{},{},{type: 'date',},
        {   
            type: 'dropdown', 
            source: ['Accept','Reject'],},{},{type: 'checkbox'},
        ];
        return columns;
     } 

function getColumnFormat_Stage_15(sheets) {         
    var columns;
    var material_list = [];
    var sheetData = sheets['Stage_1']['sheet_data'];
    for (var i = 0; i < sheetData.length; i++) {
        var rowData = sheetData[i];
        var columnData = rowData[6]; 
        if (columnData.trim() !== "") {
            material_list.push(columnData);
        }
    }
        columns = [
        {readOnly: true },{type: 'date',readOnly: true },{readOnly: true },{readOnly: true },{readOnly: true },{readOnly: true },
        {   
            type: 'dropdown', 
            source:material_list, },
        {readOnly: true },{type: 'date',},{},{},
        {type: 'numeric', numericFormat: { pattern: '0' }, validator: positiveNumberValidator},
        {type: 'numeric', numericFormat: { pattern: '0' }, validator: positiveNumberValidator},{},{},{type: 'date',},
        {
            type: 'dropdown', 
            source: ['Accept','Reject'],},{},{type: 'checkbox'}
        ];
        return columns;
     } 

function getColumnFormat_Stage_16(sheets) {         
    var columns;
    var material_list = [];
    var sheetData = sheets['Stage_1']['sheet_data'];
    for (var i = 0; i < sheetData.length; i++) {
        var rowData = sheetData[i];
        var columnData = rowData[6]; 
        if (columnData.trim() !== "") {
            material_list.push(columnData);
        }
    }
        columns = [
        {readOnly: true },{type: 'date',readOnly: true },{readOnly: true },{readOnly: true },{readOnly: true },{readOnly: true },
        {
            type: 'dropdown', 
            source: material_list,},
        {readOnly: true },
        {},{type: 'date',},{},{},{},{},{type: 'date',},{},{type: 'date',},{},{},{type: 'date',},
        {
            type: 'dropdown', 
            source: ['Accept','Reject'],},{},{type: 'checkbox'},
        ];
        return columns;
     } 
function getColumnFormat_Stage_17(sheets) {         
    var columns;
    var material_list = [];
    var sheetData = sheets['Stage_1']['sheet_data'];
    for (var i = 0; i < sheetData.length; i++) {
        var rowData = sheetData[i];
        var columnData = rowData[6]; 
        if (columnData.trim() !== "") {
            material_list.push(columnData);
        }
    }
        columns = [
        {readOnly: true },{type: 'date',readOnly: true },{readOnly: true },{readOnly: true },{readOnly: true },{readOnly: true },
        {
            type: 'dropdown', 
            source: material_list,},
        {readOnly: true },
        {},{type: 'date',},{},{},{},{},{type: 'date',},{},{type: 'date',},{},{},{type: 'date',},
        {
            type: 'dropdown', 
            source: ['Accept','Reject'],},{},{type: 'checkbox'},
        ];
        return columns;
     } 
function getColumnFormat_Stage_18(sheets) {         
    var columns;
    var material_list = [];
    var sheetData = sheets['Stage_1']['sheet_data'];
    for (var i = 0; i < sheetData.length; i++) {
        var rowData = sheetData[i];
        var columnData = rowData[6]; 
        if (columnData.trim() !== "") {
            material_list.push(columnData);
        }
    }
        columns = [
        {readOnly: true },{type: 'date',readOnly: true },{readOnly: true },{readOnly: true },{readOnly: true },{readOnly: true },
        {
            type: 'dropdown', 
            source: material_list,},
        {readOnly: true },
        {},{type: 'date',},{},{},{},{},{type: 'date',},{},{type: 'date',},{},{},{type: 'date',},
        {
            type: 'dropdown', 
            source: ['Accept','Reject'],},{},{type: 'checkbox'},
        ];
        return columns;
     } 
function getColumnFormat_Stage_19(sheets) {         
    var columns;
    var material_list = [];
    var sheetData = sheets['Stage_1']['sheet_data'];
    for (var i = 0; i < sheetData.length; i++) {
        var rowData = sheetData[i];
        var columnData = rowData[6]; 
        if (columnData.trim() !== "") {
            material_list.push(columnData);
        }
    }
        columns = [
        {readOnly: true },{type: 'date',readOnly: true },{readOnly: true },{readOnly: true },{readOnly: true },{readOnly: true },
        {
            type: 'dropdown', 
            source: material_list,},
        {readOnly: true },
        {},{type: 'date',},{},{},{},{},{type: 'date',},{},{type: 'date',},{},{},{type: 'date',},
        {
            type: 'dropdown', 
            source: ['Accept','Reject'],},{},{type: 'checkbox'},
        ];
        return columns;
     } 
function getColumnFormat_Stage_20(sheets) {         
    var columns;
    var material_list = [];
    var sheetData = sheets['Stage_1']['sheet_data'];
    for (var i = 0; i < sheetData.length; i++) {
        var rowData = sheetData[i];
        var columnData = rowData[6]; 
        if (columnData.trim() !== "") {
            material_list.push(columnData);
        }
    }
        columns = [
        {readOnly: true },{type: 'date',readOnly: true },{readOnly: true },{readOnly: true },{readOnly: true },{readOnly: true },
        {
            type: 'dropdown', 
            source: material_list,},
        {readOnly: true },
        {},{type: 'date',},{},{},{},{},{type: 'date',},{},{type: 'date',},{},{},{type: 'date',},
        {
            type: 'dropdown', 
            source: ['Accept','Reject'],},{},{type: 'checkbox'},
        ];
        return columns;
     } 
function getColumnFormat_Stage_21(sheets) {         
    var columns;
    var material_list = [];
    var sheetData = sheets['Stage_1']['sheet_data'];
    for (var i = 0; i < sheetData.length; i++) {
        var rowData = sheetData[i];
        var columnData = rowData[6]; 
        if (columnData.trim() !== "") {
            material_list.push(columnData);
        }
    }
        columns = [
        {readOnly: true },{type: 'date',readOnly: true },{readOnly: true },{readOnly: true },{readOnly: true },{readOnly: true },
        {
            type: 'dropdown', 
            source: material_list,},
        {readOnly: true },
        {},{type: 'date',},{},{},{},{},{type: 'date',},{},{type: 'date',},{},{},{type: 'date',},
        {
            type: 'dropdown', 
            source: ['Accept','Reject'],},{},{type: 'checkbox'},
        ];
        return columns;
     }
function getColumnFormat_Stage_22(sheets) {         
    var columns;
    var material_list = [];
    var sheetData = sheets['Stage_1']['sheet_data'];
    for (var i = 0; i < sheetData.length; i++) {
        var rowData = sheetData[i];
        var columnData = rowData[6]; 
        if (columnData.trim() !== "") {
            material_list.push(columnData);
        }
    }
        columns = [
        {readOnly: true },{type: 'date',readOnly: true },{readOnly: true },{readOnly: true },{readOnly: true },{readOnly: true },
        {
            type: 'dropdown', 
            source: material_list,},
        {readOnly: true },
        {},{type: 'date',},{},{},{},{},{type: 'date',},{},{type: 'date',},{},{},{type: 'date',},
        {
            type: 'dropdown', 
            source: ['Accept','Reject'],},{},{type: 'checkbox'},
        ];
        return columns;
     } 
function getColumnFormat_Stage_23(sheets) {         
    var columns;
    var material_list = [];
    var sheetData = sheets['Stage_1']['sheet_data'];
    for (var i = 0; i < sheetData.length; i++) {
        var rowData = sheetData[i];
        var columnData = rowData[6]; 
        if (columnData.trim() !== "") {
            material_list.push(columnData);
        }
    }
        columns = [
        {readOnly: true },{type: 'date',readOnly: true },{readOnly: true },{readOnly: true },{readOnly: true },{readOnly: true },
        {
            type: 'dropdown', 
            source: material_list,},
        {readOnly: true },
        {},{type: 'date',},{},{},{},{},{type: 'date',},{},{type: 'date',},{},{},{type: 'date',},
        {
            type: 'dropdown', 
            source: ['Accept','Reject'],},{},{type: 'checkbox'},
        ];
        return columns;
     } 
     
      
     
     
     
     
     
     
