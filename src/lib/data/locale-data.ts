export const frLocaleData = {
  months:
    "Janvier_Février_Mars_Avril_Mai_Juin_Juillet_Août_Septembre_Octobre_Novembre_Décembre".split(
      "_",
    ),
  monthsShort:
    "Janv._Févr._Mars_Avr._Mai_Juin_Juil._Août_Sept._Oct._Nov._Déc.".split("_"),
  monthsParseExact: true,
  weekdays: "Dimanche_Lundi_Mardi_Mercredi_Jeudi_Vendredi_Samedi".split("_"),
  weekdaysShort: "Dim._Lun._Mar._Mer._Jeu._Ven._Sam.".split("_"),
  weekdaysMin: "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD/MM/YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY HH:mm",
    LLLL: "dddd D MMMM YYYY HH:mm",
  },
  calendar: {
    sameDay: "[Aujourd’hui à] LT",
    nextDay: "[Demain à] LT",
    nextWeek: "dddd [à] LT",
    lastDay: "[Hier à] LT",
    lastWeek: "dddd [dernier à] LT",
    sameElse: "L",
  },
  relativeTime: {
    future: "Dans %s",
    past: "Il y a %s",
    s: "quelques secondes",
    m: "une minute",
    mm: "%d minutes",
    h: "une heure",
    hh: "%d heures",
    d: "un jour",
    dd: "%d jours",
    M: "un mois",
    MM: "%d mois",
    y: "un an",
    yy: "%d ans",
  },
  dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
  ordinal: function (number: number) {
    return number + (number === 1 ? "er" : "e");
  },
  meridiemParse: /PD|MD/,
  isPM: function (input: string) {
    return input.charAt(0) === "M";
  },
  // In case the meridiem units are not separated around 12, then implement
  // this function (look at locale/id.js for an example).
  // meridiemHour : function (hour, meridiem) {
  //     return /* 0-23 hour, given meridiem token and hour 1-12 */ ;
  // },
  // eslint-disable-next-line no-unused-vars
  meridiem: function (hours: number, _minutes: number, _isLower: boolean) {
    return hours < 12 ? "PD" : "MD";
  },
  week: {
    dow: 1, // Monday is the first day of the week.
    doy: 4, // Used to determine first week of the year.
  },
};
