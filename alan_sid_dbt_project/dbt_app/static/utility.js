function positiveIntegerValidator(value, callback){
   // Check if the value is a positive integer
   var integerValue = Number(value);
   if (Number.isInteger(integerValue)){
       if(integerValue > 0){
           callback(true);
       } 
       else{
           callback(false);
       }
   }
   else{
       callback(false);
   }
}

       
function positiveNumberValidator(value, callback) {        
var numericValue = Number(value);
	if(numericValue > 0) {
		callback(true);
	} 
	else{
	callback(false);
}
}
       
function percentageValidator(value, callback) {          //percentage validator i.e 0-100
var numericValue = Number(value);
	if(numericValue >= 0 && numericValue<=100) {
		callback(true);
	} 
	else{
	callback(false);
}
}


function x(isValid, value, row, prop, source) {
    if (!isValid) {
        alert('ERROR : Invalid data entered in column ' + (prop + 1));
    }
}

