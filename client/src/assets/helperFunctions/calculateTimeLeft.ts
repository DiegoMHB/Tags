

export default function calculateTimeLeft(time:string) : number{
 
    const timeStamp : number = new Date(time).getTime();
    const now : number = Date.now();
    const timeLeft : number = timeStamp-now;
    return timeLeft
}
