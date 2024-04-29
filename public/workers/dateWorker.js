self.onmessage = function(event) {

    console.log(event);
    
    if(event.data.type == 'handle'){
        const filesData = event.data.currentData.files

        event.data.stack.forEach(elm => {
            const fileTarget = filesData.find(file => file.name == elm.fileName )

            if(fileTarget){
                const fileIndex = filesData.indexOf(fileTarget)
                const fileData = fileTarget.data.map(dataElm => {
                    return {
                        ...dataElm,
                        [elm.fileKey]: new Date(validateExcelDate(dataElm[elm.fileKey])).toUTCString()
                    }
                })

                filesData[fileIndex].data = fileData
            }
        })

        self.postMessage({ type: 'handle-done', filesData })
    }
}

function validateExcelDate(item){
    if(typeof +item == 'number' && !isNaN(+item)){ 
        const date = new Date(+item)

        if(date.getFullYear() > 2000){
            return item
        } else {  
            if(item !== undefined && +item!=0) return Date.parse((ExcelDateToJSDate(+item).toString()))
            else return item
        }
    } else{
        if(typeof item == 'string'){
            return Date.parse(item)
        } else {
            return Date.parse(item.toString())
        }
    }
}

function ExcelDateToJSDate (serial) {
    var utc_days  = Math.floor(serial - 25569);
    var utc_value = utc_days * 86400;                                        
    var date_info = new Date(utc_value * 1000);
 
    var fractional_day = serial - Math.floor(serial) + 0.0000001;
 
    var total_seconds = Math.floor(86400 * fractional_day);
 
    var seconds = total_seconds % 60;
 
    total_seconds -= seconds;
 
    var hours = Math.floor(total_seconds / (60 * 60));
    var minutes = Math.floor(total_seconds / 60) % 60;
 
    return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
}