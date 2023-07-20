const generateMessage = (username, text)=>{

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes();
var dateTime = date+' '+time;
 
console.log(dateTime)

    return {
        username,
        text,
        createdAt: dateTime
    }

}

export default generateMessage; 