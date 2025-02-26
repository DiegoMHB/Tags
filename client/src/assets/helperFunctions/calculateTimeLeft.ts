

export default function calculateTimeLeft(destroyAt:string, created: string) : number{
 
    const timeToDestroy : number = new Date(destroyAt).getTime();
    const timeCreated : number = new Date(created).getTime();
    const now : number = Date.now();
    const timeLeft : number = timeToDestroy-now;
    const percentage : number = timeLeft*100 /(timeToDestroy-timeCreated)
    return  percentage.toFixed(2)
}
