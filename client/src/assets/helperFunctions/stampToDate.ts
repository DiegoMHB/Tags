

export default function stampToDate(date: string): string {
    const dateType = new Date(date);
    
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    };

    const dateF = dateType.toLocaleDateString("es-ES", options);
    
    return dateF;
}

