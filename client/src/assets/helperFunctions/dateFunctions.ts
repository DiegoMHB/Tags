

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


export function formatDateTime(date : string) {
    const inputDate = new Date(date);
    const today = new Date();
  
    const isToday =
      inputDate.toDateString() === today.toDateString();
  
    if (isToday) {
      return inputDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } else {
      return inputDate.toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
      });
    }
  }