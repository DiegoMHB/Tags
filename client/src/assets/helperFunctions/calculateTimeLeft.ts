import { TimeLeft } from "../../types/appTypes";


export default function calculateTimeLeft(destroyAt: string, created: string): TimeLeft {

    const timeToDestroy: number = new Date(destroyAt).getTime();
    const timeCreated: number = new Date(created).getTime();
    const now: number = Date.now();
    const timeLeft: number = (timeToDestroy - now)/60000;
    const percentage: number = timeLeft * 100 * 60000 / (timeToDestroy - timeCreated)
    return {minutes:+(Math.floor(+ timeLeft)+0.5).toFixed(0),percentage: Math.floor(+percentage.toFixed(0))
}
}
