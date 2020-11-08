export function GetDate() {
    var DateCalendar = new Date();
    let year = DateCalendar.getFullYear();
    let month = DateCalendar.getMonth();
    let day = DateCalendar.getDate();
    var firstdd = new Date(year, month, 1);
    var lastdd = new Date(year, month + 1, 0);
    return { year, month, day, firstdd, lastdd };
};
