// these aren't really private, but nor are they really useful to document
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
/**
 * @private
 */
class LuxonError extends Error {
}
/**
 * @private
 */
class InvalidDateTimeError extends LuxonError {
    constructor(reason) {
        super(`Invalid DateTime: ${reason.toMessage()}`);
    }
}
/**
 * @private
 */
class InvalidIntervalError extends LuxonError {
    constructor(reason) {
        super(`Invalid Interval: ${reason.toMessage()}`);
    }
}
/**
 * @private
 */
class InvalidDurationError extends LuxonError {
    constructor(reason) {
        super(`Invalid Duration: ${reason.toMessage()}`);
    }
}
/**
 * @private
 */
class ConflictingSpecificationError extends LuxonError {
}
/**
 * @private
 */
class InvalidUnitError extends LuxonError {
    constructor(unit) {
        super(`Invalid unit ${unit}`);
    }
}
/**
 * @private
 */
class InvalidArgumentError extends LuxonError {
}
/**
 * @private
 */
class ZoneIsAbstractError extends LuxonError {
    constructor() {
        super("Zone is an abstract class");
    }
}
/**
 * @private
 */
const n = "numeric", s = "short", l = "long";
const DATE_SHORT = {
    year: n,
    month: n,
    day: n,
};
const DATE_MED = {
    year: n,
    month: s,
    day: n,
};
const DATE_MED_WITH_WEEKDAY = {
    year: n,
    month: s,
    day: n,
    weekday: s,
};
const DATE_FULL = {
    year: n,
    month: l,
    day: n,
};
const DATE_HUGE = {
    year: n,
    month: l,
    day: n,
    weekday: l,
};
const TIME_SIMPLE = {
    hour: n,
    minute: n,
};
const TIME_WITH_SECONDS = {
    hour: n,
    minute: n,
    second: n,
};
const TIME_WITH_SHORT_OFFSET = {
    hour: n,
    minute: n,
    second: n,
    timeZoneName: s,
};
const TIME_WITH_LONG_OFFSET = {
    hour: n,
    minute: n,
    second: n,
    timeZoneName: l,
};
const TIME_24_SIMPLE = {
    hour: n,
    minute: n,
    hourCycle: "h23",
};
const TIME_24_WITH_SECONDS = {
    hour: n,
    minute: n,
    second: n,
    hourCycle: "h23",
};
const TIME_24_WITH_SHORT_OFFSET = {
    hour: n,
    minute: n,
    second: n,
    hourCycle: "h23",
    timeZoneName: s,
};
const TIME_24_WITH_LONG_OFFSET = {
    hour: n,
    minute: n,
    second: n,
    hourCycle: "h23",
    timeZoneName: l,
};
const DATETIME_SHORT = {
    year: n,
    month: n,
    day: n,
    hour: n,
    minute: n,
};
const DATETIME_SHORT_WITH_SECONDS = {
    year: n,
    month: n,
    day: n,
    hour: n,
    minute: n,
    second: n,
};
const DATETIME_MED = {
    year: n,
    month: s,
    day: n,
    hour: n,
    minute: n,
};
const DATETIME_MED_WITH_SECONDS = {
    year: n,
    month: s,
    day: n,
    hour: n,
    minute: n,
    second: n,
};
const DATETIME_MED_WITH_WEEKDAY = {
    year: n,
    month: s,
    day: n,
    weekday: s,
    hour: n,
    minute: n,
};
const DATETIME_FULL = {
    year: n,
    month: l,
    day: n,
    hour: n,
    minute: n,
    timeZoneName: s,
};
const DATETIME_FULL_WITH_SECONDS = {
    year: n,
    month: l,
    day: n,
    hour: n,
    minute: n,
    second: n,
    timeZoneName: s,
};
const DATETIME_HUGE = {
    year: n,
    month: l,
    day: n,
    weekday: l,
    hour: n,
    minute: n,
    timeZoneName: l,
};
const DATETIME_HUGE_WITH_SECONDS = {
    year: n,
    month: l,
    day: n,
    weekday: l,
    hour: n,
    minute: n,
    second: n,
    timeZoneName: l,
};
/*
  This is just a junk drawer, containing anything used across multiple classes.
  Because Luxon is small(ish), this should stay small and we won't worry about splitting
  it up into, say, parsingUtil.js and basicUtil.js and so on. But they are divided up by feature area.
*/
/**
 * @private
 */
// TYPES
function isUndefined(o) {
    return typeof o === "undefined";
}
function isNumber(o) {
    return typeof o === "number";
}
function isInteger(o) {
    return typeof o === "number" && o % 1 === 0;
}
function isString(o) {
    return typeof o === "string";
}
function isDate(o) {
    return Object.prototype.toString.call(o) === "[object Date]";
}
// CAPABILITIES
function hasRelative() {
    try {
        return typeof Intl !== "undefined" && !!Intl.RelativeTimeFormat;
    }
    catch (e) {
        return false;
    }
}
// OBJECTS AND ARRAYS
function maybeArray(thing) {
    return Array.isArray(thing) ? thing : [thing];
}
function bestBy(arr, by, compare) {
    if (arr.length === 0) {
        return undefined;
    }
    return arr.reduce((best, next) => {
        const pair = [by(next), next];
        if (!best) {
            return pair;
        }
        else if (compare(best[0], pair[0]) === best[0]) {
            return best;
        }
        else {
            return pair;
        }
    }, null)[1];
}
function pick(obj, keys) {
    return keys.reduce((a, k) => {
        a[k] = obj[k];
        return a;
    }, {});
}
function hasOwnProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
}
// NUMBERS AND STRINGS
function integerBetween(thing, bottom, top) {
    return isInteger(thing) && thing >= bottom && thing <= top;
}
// x % n but takes the sign of n instead of x
function floorMod(x, n) {
    return x - n * Math.floor(x / n);
}
function padStart(input, n = 2) {
    const isNeg = input < 0;
    let padded;
    if (isNeg) {
        padded = "-" + ("" + -input).padStart(n, "0");
    }
    else {
        padded = ("" + input).padStart(n, "0");
    }
    return padded;
}
function parseInteger(string) {
    if (isUndefined(string) || string === null || string === "") {
        return undefined;
    }
    else {
        return parseInt(string, 10);
    }
}
function parseFloating(string) {
    if (isUndefined(string) || string === null || string === "") {
        return undefined;
    }
    else {
        return parseFloat(string);
    }
}
function parseMillis(fraction) {
    // Return undefined (instead of 0) in these cases, where fraction is not set
    if (isUndefined(fraction) || fraction === null || fraction === "") {
        return undefined;
    }
    else {
        const f = parseFloat("0." + fraction) * 1000;
        return Math.floor(f);
    }
}
function roundTo(number, digits, towardZero = false) {
    const factor = Math.pow(10, digits), rounder = towardZero ? Math.trunc : Math.round;
    return rounder(number * factor) / factor;
}
// DATE BASICS
function isLeapYear(year) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
function daysInYear(year) {
    return isLeapYear(year) ? 366 : 365;
}
function daysInMonth(year, month) {
    const modMonth = floorMod(month - 1, 12) + 1, modYear = year + (month - modMonth) / 12;
    if (modMonth === 2) {
        return isLeapYear(modYear) ? 29 : 28;
    }
    else {
        return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][modMonth - 1];
    }
}
// covert a calendar object to a local timestamp (epoch, but with the offset baked in)
function objToLocalTS(obj) {
    let d = Date.UTC(obj.year, obj.month - 1, obj.day, obj.hour, obj.minute, obj.second, obj.millisecond);
    // for legacy reasons, years between 0 and 99 are interpreted as 19XX; revert that
    if (obj.year < 100 && obj.year >= 0) {
        d = new Date(d);
        d.setUTCFullYear(d.getUTCFullYear() - 1900);
    }
    return +d;
}
function weeksInWeekYear(weekYear) {
    const p1 = (weekYear +
        Math.floor(weekYear / 4) -
        Math.floor(weekYear / 100) +
        Math.floor(weekYear / 400)) %
        7, last = weekYear - 1, p2 = (last + Math.floor(last / 4) - Math.floor(last / 100) + Math.floor(last / 400)) % 7;
    return p1 === 4 || p2 === 3 ? 53 : 52;
}
function untruncateYear(year) {
    if (year > 99) {
        return year;
    }
    else
        return year > 60 ? 1900 + year : 2000 + year;
}
// PARSING
function parseZoneInfo(ts, offsetFormat, locale, timeZone = null) {
    const date = new Date(ts), intlOpts = {
        hourCycle: "h23",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    };
    if (timeZone) {
        intlOpts.timeZone = timeZone;
    }
    const modified = Object.assign({ timeZoneName: offsetFormat }, intlOpts);
    const parsed = new Intl.DateTimeFormat(locale, modified)
        .formatToParts(date)
        .find((m) => m.type.toLowerCase() === "timezonename");
    return parsed ? parsed.value : null;
}
// signedOffset('-5', '30') -> -330
function signedOffset(offHourStr, offMinuteStr) {
    let offHour = parseInt(offHourStr, 10);
    // don't || this because we want to preserve -0
    if (Number.isNaN(offHour)) {
        offHour = 0;
    }
    const offMin = parseInt(offMinuteStr, 10) || 0, offMinSigned = offHour < 0 || Object.is(offHour, -0) ? -offMin : offMin;
    return offHour * 60 + offMinSigned;
}
// COERCION
function asNumber(value) {
    const numericValue = Number(value);
    if (typeof value === "boolean" || value === "" || Number.isNaN(numericValue))
        throw new InvalidArgumentError(`Invalid unit value ${value}`);
    return numericValue;
}
function normalizeObject(obj, normalizer) {
    const normalized = {};
    for (const u in obj) {
        if (hasOwnProperty(obj, u)) {
            const v = obj[u];
            if (v === undefined || v === null)
                continue;
            normalized[normalizer(u)] = asNumber(v);
        }
    }
    return normalized;
}
function formatOffset(offset, format) {
    const hours = Math.trunc(Math.abs(offset / 60)), minutes = Math.trunc(Math.abs(offset % 60)), sign = offset >= 0 ? "+" : "-";
    switch (format) {
        case "short":
            return `${sign}${padStart(hours, 2)}:${padStart(minutes, 2)}`;
        case "narrow":
            return `${sign}${hours}${minutes > 0 ? `:${minutes}` : ""}`;
        case "techie":
            return `${sign}${padStart(hours, 2)}${padStart(minutes, 2)}`;
        default:
            throw new RangeError(`Value format ${format} is out of range for property format`);
    }
}
function timeObject(obj) {
    return pick(obj, ["hour", "minute", "second", "millisecond"]);
}
const ianaRegex = /[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;
/**
 * @private
 */
const monthsLong = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
const monthsShort = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];
const monthsNarrow = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
function months(length) {
    switch (length) {
        case "narrow":
            return [...monthsNarrow];
        case "short":
            return [...monthsShort];
        case "long":
            return [...monthsLong];
        case "numeric":
            return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
        case "2-digit":
            return ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
        default:
            return null;
    }
}
const weekdaysLong = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];
const weekdaysShort = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const weekdaysNarrow = ["M", "T", "W", "T", "F", "S", "S"];
function weekdays(length) {
    switch (length) {
        case "narrow":
            return [...weekdaysNarrow];
        case "short":
            return [...weekdaysShort];
        case "long":
            return [...weekdaysLong];
        case "numeric":
            return ["1", "2", "3", "4", "5", "6", "7"];
        default:
            return null;
    }
}
const meridiems = ["AM", "PM"];
const erasLong = ["Before Christ", "Anno Domini"];
const erasShort = ["BC", "AD"];
const erasNarrow = ["B", "A"];
function eras(length) {
    switch (length) {
        case "narrow":
            return [...erasNarrow];
        case "short":
            return [...erasShort];
        case "long":
            return [...erasLong];
        default:
            return null;
    }
}
function meridiemForDateTime(dt) {
    return meridiems[dt.hour < 12 ? 0 : 1];
}
function weekdayForDateTime(dt, length) {
    return weekdays(length)[dt.weekday - 1];
}
function monthForDateTime(dt, length) {
    return months(length)[dt.month - 1];
}
function eraForDateTime(dt, length) {
    return eras(length)[dt.year < 0 ? 0 : 1];
}
function formatRelativeTime(unit, count, numeric = "always", narrow = false) {
    const units = {
        years: ["year", "yr."],
        quarters: ["quarter", "qtr."],
        months: ["month", "mo."],
        weeks: ["week", "wk."],
        days: ["day", "day", "days"],
        hours: ["hour", "hr."],
        minutes: ["minute", "min."],
        seconds: ["second", "sec."],
    };
    const lastable = ["hours", "minutes", "seconds"].indexOf(unit) === -1;
    if (numeric === "auto" && lastable) {
        const isDay = unit === "days";
        switch (count) {
            case 1:
                return isDay ? "tomorrow" : `next ${units[unit][0]}`;
            case -1:
                return isDay ? "yesterday" : `last ${units[unit][0]}`;
            case 0:
                return isDay ? "today" : `this ${units[unit][0]}`;
        }
    }
    const isInPast = Object.is(count, -0) || count < 0, fmtValue = Math.abs(count), singular = fmtValue === 1, lilUnits = units[unit], fmtUnit = narrow
        ? singular
            ? lilUnits[1]
            : lilUnits[2] || lilUnits[1]
        : singular
            ? units[unit][0]
            : unit;
    return isInPast ? `${fmtValue} ${fmtUnit} ago` : `in ${fmtValue} ${fmtUnit}`;
}
function stringifyTokens(splits, tokenToString) {
    let s = "";
    for (const token of splits) {
        if (token.literal) {
            s += token.val;
        }
        else {
            s += tokenToString(token.val);
        }
    }
    return s;
}
const macroTokenToFormatOpts = {
    D: DATE_SHORT,
    DD: DATE_MED,
    DDD: DATE_FULL,
    DDDD: DATE_HUGE,
    t: TIME_SIMPLE,
    tt: TIME_WITH_SECONDS,
    ttt: TIME_WITH_SHORT_OFFSET,
    tttt: TIME_WITH_LONG_OFFSET,
    T: TIME_24_SIMPLE,
    TT: TIME_24_WITH_SECONDS,
    TTT: TIME_24_WITH_SHORT_OFFSET,
    TTTT: TIME_24_WITH_LONG_OFFSET,
    f: DATETIME_SHORT,
    ff: DATETIME_MED,
    fff: DATETIME_FULL,
    ffff: DATETIME_HUGE,
    F: DATETIME_SHORT_WITH_SECONDS,
    FF: DATETIME_MED_WITH_SECONDS,
    FFF: DATETIME_FULL_WITH_SECONDS,
    FFFF: DATETIME_HUGE_WITH_SECONDS,
};
/**
 * @private
 */
class Formatter {
    static create(locale, opts = {}) {
        return new Formatter(locale, opts);
    }
    static parseFormat(fmt) {
        let current = null, currentFull = "", bracketed = false;
        const splits = [];
        for (let i = 0; i < fmt.length; i++) {
            const c = fmt.charAt(i);
            if (c === "'") {
                if (currentFull.length > 0) {
                    splits.push({ literal: bracketed, val: currentFull });
                }
                current = null;
                currentFull = "";
                bracketed = !bracketed;
            }
            else if (bracketed) {
                currentFull += c;
            }
            else if (c === current) {
                currentFull += c;
            }
            else {
                if (currentFull.length > 0) {
                    splits.push({ literal: false, val: currentFull });
                }
                currentFull = c;
                current = c;
            }
        }
        if (currentFull.length > 0) {
            splits.push({ literal: bracketed, val: currentFull });
        }
        return splits;
    }
    static macroTokenToFormatOpts(token) {
        return macroTokenToFormatOpts[token];
    }
    constructor(locale, formatOpts) {
        this.opts = formatOpts;
        this.loc = locale;
        this.systemLoc = null;
    }
    formatWithSystemDefault(dt, opts) {
        if (this.systemLoc === null) {
            this.systemLoc = this.loc.redefaultToSystem();
        }
        const df = this.systemLoc.dtFormatter(dt, Object.assign(Object.assign({}, this.opts), opts));
        return df.format();
    }
    formatDateTime(dt, opts = {}) {
        const df = this.loc.dtFormatter(dt, Object.assign(Object.assign({}, this.opts), opts));
        return df.format();
    }
    formatDateTimeParts(dt, opts = {}) {
        const df = this.loc.dtFormatter(dt, Object.assign(Object.assign({}, this.opts), opts));
        return df.formatToParts();
    }
    resolvedOptions(dt, opts = {}) {
        const df = this.loc.dtFormatter(dt, Object.assign(Object.assign({}, this.opts), opts));
        return df.resolvedOptions();
    }
    num(n, p = 0) {
        // we get some perf out of doing this here, annoyingly
        if (this.opts.forceSimple) {
            return padStart(n, p);
        }
        const opts = Object.assign({}, this.opts);
        if (p > 0) {
            opts.padTo = p;
        }
        return this.loc.numberFormatter(opts).format(n);
    }
    formatDateTimeFromString(dt, fmt) {
        const knownEnglish = this.loc.listingMode() === "en", useDateTimeFormatter = this.loc.outputCalendar && this.loc.outputCalendar !== "gregory", string = (opts, extract) => this.loc.extract(dt, opts, extract), formatOffset = (opts) => {
            if (dt.isOffsetFixed && dt.offset === 0 && opts.allowZ) {
                return "Z";
            }
            return dt.isValid ? dt.zone.formatOffset(dt.ts, opts.format) : "";
        }, meridiem = () => knownEnglish
            ? meridiemForDateTime(dt)
            : string({ hour: "numeric", hourCycle: "h12" }, "dayperiod"), month = (length, standalone) => knownEnglish
            ? monthForDateTime(dt, length)
            : string(standalone ? { month: length } : { month: length, day: "numeric" }, "month"), weekday = (length, standalone) => knownEnglish
            ? weekdayForDateTime(dt, length)
            : string(standalone ? { weekday: length } : { weekday: length, month: "long", day: "numeric" }, "weekday"), maybeMacro = (token) => {
            const formatOpts = Formatter.macroTokenToFormatOpts(token);
            if (formatOpts) {
                return this.formatWithSystemDefault(dt, formatOpts);
            }
            else {
                return token;
            }
        }, era = (length) => knownEnglish ? eraForDateTime(dt, length) : string({ era: length }, "era"), tokenToString = (token) => {
            // Where possible: http://cldr.unicode.org/translation/date-time-1/date-time#TOC-Standalone-vs.-Format-Styles
            switch (token) {
                // ms
                case "S":
                    return this.num(dt.millisecond);
                case "u":
                // falls through
                case "SSS":
                    return this.num(dt.millisecond, 3);
                // seconds
                case "s":
                    return this.num(dt.second);
                case "ss":
                    return this.num(dt.second, 2);
                // fractional seconds
                case "uu":
                    return this.num(Math.floor(dt.millisecond / 10), 2);
                case "uuu":
                    return this.num(Math.floor(dt.millisecond / 100));
                // minutes
                case "m":
                    return this.num(dt.minute);
                case "mm":
                    return this.num(dt.minute, 2);
                // hours
                case "h":
                    return this.num(dt.hour % 12 === 0 ? 12 : dt.hour % 12);
                case "hh":
                    return this.num(dt.hour % 12 === 0 ? 12 : dt.hour % 12, 2);
                case "H":
                    return this.num(dt.hour);
                case "HH":
                    return this.num(dt.hour, 2);
                // offset
                case "Z":
                    // like +6
                    return formatOffset({ format: "narrow", allowZ: this.opts.allowZ });
                case "ZZ":
                    // like +06:00
                    return formatOffset({ format: "short", allowZ: this.opts.allowZ });
                case "ZZZ":
                    // like +0600
                    return formatOffset({ format: "techie", allowZ: this.opts.allowZ });
                case "ZZZZ":
                    // like EST
                    return dt.zone.offsetName(dt.ts, { format: "short", locale: this.loc.locale });
                case "ZZZZZ":
                    // like Eastern Standard Time
                    return dt.zone.offsetName(dt.ts, { format: "long", locale: this.loc.locale });
                // zone
                case "z":
                    // like America/New_York
                    return dt.zoneName;
                // meridiems
                case "a":
                    return meridiem();
                // dates
                case "d":
                    return useDateTimeFormatter ? string({ day: "numeric" }, "day") : this.num(dt.day);
                case "dd":
                    return useDateTimeFormatter ? string({ day: "2-digit" }, "day") : this.num(dt.day, 2);
                // weekdays - standalone
                case "c":
                    // like 1
                    return this.num(dt.weekday);
                case "ccc":
                    // like 'Tues'
                    return weekday("short", true);
                case "cccc":
                    // like 'Tuesday'
                    return weekday("long", true);
                case "ccccc":
                    // like 'T'
                    return weekday("narrow", true);
                // weekdays - format
                case "E":
                    // like 1
                    return this.num(dt.weekday);
                case "EEE":
                    // like 'Tues'
                    return weekday("short", false);
                case "EEEE":
                    // like 'Tuesday'
                    return weekday("long", false);
                case "EEEEE":
                    // like 'T'
                    return weekday("narrow", false);
                // months - standalone
                case "L":
                    // like 1
                    return useDateTimeFormatter
                        ? string({ month: "numeric", day: "numeric" }, "month")
                        : this.num(dt.month);
                case "LL":
                    // like 01, doesn't seem to work
                    return useDateTimeFormatter
                        ? string({ month: "2-digit", day: "numeric" }, "month")
                        : this.num(dt.month, 2);
                case "LLL":
                    // like Jan
                    return month("short", true);
                case "LLLL":
                    // like January
                    return month("long", true);
                case "LLLLL":
                    // like J
                    return month("narrow", true);
                // months - format
                case "M":
                    // like 1
                    return useDateTimeFormatter
                        ? string({ month: "numeric" }, "month")
                        : this.num(dt.month);
                case "MM":
                    // like 01
                    return useDateTimeFormatter
                        ? string({ month: "2-digit" }, "month")
                        : this.num(dt.month, 2);
                case "MMM":
                    // like Jan
                    return month("short", false);
                case "MMMM":
                    // like January
                    return month("long", false);
                case "MMMMM":
                    // like J
                    return month("narrow", false);
                // years
                case "y":
                    // like 2014
                    return useDateTimeFormatter ? string({ year: "numeric" }, "year") : this.num(dt.year);
                case "yy":
                    // like 14
                    return useDateTimeFormatter
                        ? string({ year: "2-digit" }, "year")
                        : this.num(dt.year.toString().slice(-2), 2);
                case "yyyy":
                    // like 0012
                    return useDateTimeFormatter
                        ? string({ year: "numeric" }, "year")
                        : this.num(dt.year, 4);
                case "yyyyyy":
                    // like 000012
                    return useDateTimeFormatter
                        ? string({ year: "numeric" }, "year")
                        : this.num(dt.year, 6);
                // eras
                case "G":
                    // like AD
                    return era("short");
                case "GG":
                    // like Anno Domini
                    return era("long");
                case "GGGGG":
                    return era("narrow");
                case "kk":
                    return this.num(dt.weekYear.toString().slice(-2), 2);
                case "kkkk":
                    return this.num(dt.weekYear, 4);
                case "W":
                    return this.num(dt.weekNumber);
                case "WW":
                    return this.num(dt.weekNumber, 2);
                case "o":
                    return this.num(dt.ordinal);
                case "ooo":
                    return this.num(dt.ordinal, 3);
                case "q":
                    // like 1
                    return this.num(dt.quarter);
                case "qq":
                    // like 01
                    return this.num(dt.quarter, 2);
                case "X":
                    return this.num(Math.floor(dt.ts / 1000));
                case "x":
                    return this.num(dt.ts);
                default:
                    return maybeMacro(token);
            }
        };
        return stringifyTokens(Formatter.parseFormat(fmt), tokenToString);
    }
    formatDurationFromString(dur, fmt) {
        const tokenToField = (token) => {
            switch (token[0]) {
                case "S":
                    return "millisecond";
                case "s":
                    return "second";
                case "m":
                    return "minute";
                case "h":
                    return "hour";
                case "d":
                    return "day";
                case "w":
                    return "week";
                case "M":
                    return "month";
                case "y":
                    return "year";
                default:
                    return null;
            }
        }, tokenToString = (lildur) => (token) => {
            const mapped = tokenToField(token);
            if (mapped) {
                return this.num(lildur.get(mapped), token.length);
            }
            else {
                return token;
            }
        }, tokens = Formatter.parseFormat(fmt), realTokens = tokens.reduce((found, { literal, val }) => (literal ? found : found.concat(val)), []), collapsed = dur.shiftTo(...realTokens.map(tokenToField).filter((t) => t));
        return stringifyTokens(tokens, tokenToString(collapsed));
    }
}
class Invalid {
    constructor(reason, explanation) {
        this.reason = reason;
        this.explanation = explanation;
    }
    toMessage() {
        if (this.explanation) {
            return `${this.reason}: ${this.explanation}`;
        }
        else {
            return this.reason;
        }
    }
}
/**
 * @interface
 */
class Zone {
    /**
     * The type of zone
     * @abstract
     * @type {string}
     */
    get type() {
        throw new ZoneIsAbstractError();
    }
    /**
     * The name of this zone.
     * @abstract
     * @type {string}
     */
    get name() {
        throw new ZoneIsAbstractError();
    }
    get ianaName() {
        return this.name;
    }
    /**
     * Returns whether the offset is known to be fixed for the whole year.
     * @abstract
     * @type {boolean}
     */
    get isUniversal() {
        throw new ZoneIsAbstractError();
    }
    /**
     * Returns the offset's common name (such as EST) at the specified timestamp
     * @abstract
     * @param {number} ts - Epoch milliseconds for which to get the name
     * @param {Object} opts - Options to affect the format
     * @param {string} opts.format - What style of offset to return. Accepts 'long' or 'short'.
     * @param {string} opts.locale - What locale to return the offset name in.
     * @return {string}
     */
    offsetName(ts, opts) {
        throw new ZoneIsAbstractError();
    }
    /**
     * Returns the offset's value as a string
     * @abstract
     * @param {number} ts - Epoch milliseconds for which to get the offset
     * @param {string} format - What style of offset to return.
     *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
     * @return {string}
     */
    formatOffset(ts, format) {
        throw new ZoneIsAbstractError();
    }
    /**
     * Return the offset in minutes for this zone at the specified timestamp.
     * @abstract
     * @param {number} ts - Epoch milliseconds for which to compute the offset
     * @return {number}
     */
    offset(ts) {
        throw new ZoneIsAbstractError();
    }
    /**
     * Return whether this Zone is equal to another zone
     * @abstract
     * @param {Zone} otherZone - the zone to compare
     * @return {boolean}
     */
    equals(otherZone) {
        throw new ZoneIsAbstractError();
    }
    /**
     * Return whether this Zone is valid.
     * @abstract
     * @type {boolean}
     */
    get isValid() {
        throw new ZoneIsAbstractError();
    }
}
let singleton$1 = null;
/**
 * Represents the local zone for this JavaScript environment.
 * @implements {Zone}
 */
class SystemZone extends Zone {
    /**
     * Get a singleton instance of the local zone
     * @return {SystemZone}
     */
    static get instance() {
        if (singleton$1 === null) {
            singleton$1 = new SystemZone();
        }
        return singleton$1;
    }
    /** @override **/
    get type() {
        return "system";
    }
    /** @override **/
    get name() {
        return new Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
    /** @override **/
    get isUniversal() {
        return false;
    }
    /** @override **/
    offsetName(ts, { format, locale }) {
        return parseZoneInfo(ts, format, locale);
    }
    /** @override **/
    formatOffset(ts, format) {
        return formatOffset(this.offset(ts), format);
    }
    /** @override **/
    offset(ts) {
        return -new Date(ts).getTimezoneOffset();
    }
    /** @override **/
    equals(otherZone) {
        return otherZone.type === "system";
    }
    /** @override **/
    get isValid() {
        return true;
    }
}
let dtfCache = {};
function makeDTF(zone) {
    if (!dtfCache[zone]) {
        dtfCache[zone] = new Intl.DateTimeFormat("en-US", {
            hour12: false,
            timeZone: zone,
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            era: "short",
        });
    }
    return dtfCache[zone];
}
const typeToPos = {
    year: 0,
    month: 1,
    day: 2,
    era: 3,
    hour: 4,
    minute: 5,
    second: 6,
};
function hackyOffset(dtf, date) {
    const formatted = dtf.format(date).replace(/\u200E/g, ""), parsed = /(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(formatted), [, fMonth, fDay, fYear, fadOrBc, fHour, fMinute, fSecond] = parsed;
    return [fYear, fMonth, fDay, fadOrBc, fHour, fMinute, fSecond];
}
function partsOffset(dtf, date) {
    const formatted = dtf.formatToParts(date);
    const filled = [];
    for (let i = 0; i < formatted.length; i++) {
        const { type, value } = formatted[i];
        const pos = typeToPos[type];
        if (type === "era") {
            filled[pos] = value;
        }
        else if (!isUndefined(pos)) {
            filled[pos] = parseInt(value, 10);
        }
    }
    return filled;
}
let ianaZoneCache = {};
/**
 * A zone identified by an IANA identifier, like America/New_York
 * @implements {Zone}
 */
class IANAZone extends Zone {
    /**
     * @param {string} name - Zone name
     * @return {IANAZone}
     */
    static create(name) {
        if (!ianaZoneCache[name]) {
            ianaZoneCache[name] = new IANAZone(name);
        }
        return ianaZoneCache[name];
    }
    /**
     * Reset local caches. Should only be necessary in testing scenarios.
     * @return {void}
     */
    static resetCache() {
        ianaZoneCache = {};
        dtfCache = {};
    }
    /**
     * Returns whether the provided string is a valid specifier. This only checks the string's format, not that the specifier identifies a known zone; see isValidZone for that.
     * @param {string} s - The string to check validity on
     * @example IANAZone.isValidSpecifier("America/New_York") //=> true
     * @example IANAZone.isValidSpecifier("Sport~~blorp") //=> false
     * @deprecated This method returns false for some valid IANA names. Use isValidZone instead.
     * @return {boolean}
     */
    static isValidSpecifier(s) {
        return this.isValidZone(s);
    }
    /**
     * Returns whether the provided string identifies a real zone
     * @param {string} zone - The string to check
     * @example IANAZone.isValidZone("America/New_York") //=> true
     * @example IANAZone.isValidZone("Fantasia/Castle") //=> false
     * @example IANAZone.isValidZone("Sport~~blorp") //=> false
     * @return {boolean}
     */
    static isValidZone(zone) {
        if (!zone) {
            return false;
        }
        try {
            new Intl.DateTimeFormat("en-US", { timeZone: zone }).format();
            return true;
        }
        catch (e) {
            return false;
        }
    }
    constructor(name) {
        super();
        /** @private **/
        this.zoneName = name;
        /** @private **/
        this.valid = IANAZone.isValidZone(name);
    }
    /** @override **/
    get type() {
        return "iana";
    }
    /** @override **/
    get name() {
        return this.zoneName;
    }
    /** @override **/
    get isUniversal() {
        return false;
    }
    /** @override **/
    offsetName(ts, { format, locale }) {
        return parseZoneInfo(ts, format, locale, this.name);
    }
    /** @override **/
    formatOffset(ts, format) {
        return formatOffset(this.offset(ts), format);
    }
    /** @override **/
    offset(ts) {
        const date = new Date(ts);
        if (isNaN(date))
            return NaN;
        const dtf = makeDTF(this.name);
        let [year, month, day, adOrBc, hour, minute, second] = dtf.formatToParts
            ? partsOffset(dtf, date)
            : hackyOffset(dtf, date);
        if (adOrBc === "BC") {
            year = -Math.abs(year) + 1;
        }
        // because we're using hour12 and https://bugs.chromium.org/p/chromium/issues/detail?id=1025564&can=2&q=%2224%3A00%22%20datetimeformat
        const adjustedHour = hour === 24 ? 0 : hour;
        const asUTC = objToLocalTS({
            year,
            month,
            day,
            hour: adjustedHour,
            minute,
            second,
            millisecond: 0,
        });
        let asTS = +date;
        const over = asTS % 1000;
        asTS -= over >= 0 ? over : 1000 + over;
        return (asUTC - asTS) / (60 * 1000);
    }
    /** @override **/
    equals(otherZone) {
        return otherZone.type === "iana" && otherZone.name === this.name;
    }
    /** @override **/
    get isValid() {
        return this.valid;
    }
}
let singleton = null;
/**
 * A zone with a fixed offset (meaning no DST)
 * @implements {Zone}
 */
class FixedOffsetZone extends Zone {
    /**
     * Get a singleton instance of UTC
     * @return {FixedOffsetZone}
     */
    static get utcInstance() {
        if (singleton === null) {
            singleton = new FixedOffsetZone(0);
        }
        return singleton;
    }
    /**
     * Get an instance with a specified offset
     * @param {number} offset - The offset in minutes
     * @return {FixedOffsetZone}
     */
    static instance(offset) {
        return offset === 0 ? FixedOffsetZone.utcInstance : new FixedOffsetZone(offset);
    }
    /**
     * Get an instance of FixedOffsetZone from a UTC offset string, like "UTC+6"
     * @param {string} s - The offset string to parse
     * @example FixedOffsetZone.parseSpecifier("UTC+6")
     * @example FixedOffsetZone.parseSpecifier("UTC+06")
     * @example FixedOffsetZone.parseSpecifier("UTC-6:00")
     * @return {FixedOffsetZone}
     */
    static parseSpecifier(s) {
        if (s) {
            const r = s.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);
            if (r) {
                return new FixedOffsetZone(signedOffset(r[1], r[2]));
            }
        }
        return null;
    }
    constructor(offset) {
        super();
        /** @private **/
        this.fixed = offset;
    }
    /** @override **/
    get type() {
        return "fixed";
    }
    /** @override **/
    get name() {
        return this.fixed === 0 ? "UTC" : `UTC${formatOffset(this.fixed, "narrow")}`;
    }
    get ianaName() {
        if (this.fixed === 0) {
            return "Etc/UTC";
        }
        else {
            return `Etc/GMT${formatOffset(-this.fixed, "narrow")}`;
        }
    }
    /** @override **/
    offsetName() {
        return this.name;
    }
    /** @override **/
    formatOffset(ts, format) {
        return formatOffset(this.fixed, format);
    }
    /** @override **/
    get isUniversal() {
        return true;
    }
    /** @override **/
    offset() {
        return this.fixed;
    }
    /** @override **/
    equals(otherZone) {
        return otherZone.type === "fixed" && otherZone.fixed === this.fixed;
    }
    /** @override **/
    get isValid() {
        return true;
    }
}
/**
 * A zone that failed to parse. You should never need to instantiate this.
 * @implements {Zone}
 */
class InvalidZone extends Zone {
    constructor(zoneName) {
        super();
        /**  @private */
        this.zoneName = zoneName;
    }
    /** @override **/
    get type() {
        return "invalid";
    }
    /** @override **/
    get name() {
        return this.zoneName;
    }
    /** @override **/
    get isUniversal() {
        return false;
    }
    /** @override **/
    offsetName() {
        return null;
    }
    /** @override **/
    formatOffset() {
        return "";
    }
    /** @override **/
    offset() {
        return NaN;
    }
    /** @override **/
    equals() {
        return false;
    }
    /** @override **/
    get isValid() {
        return false;
    }
}
/**
 * @private
 */
function normalizeZone(input, defaultZone) {
    if (isUndefined(input) || input === null) {
        return defaultZone;
    }
    else if (input instanceof Zone) {
        return input;
    }
    else if (isString(input)) {
        const lowered = input.toLowerCase();
        if (lowered === "local" || lowered === "system")
            return defaultZone;
        else if (lowered === "utc" || lowered === "gmt")
            return FixedOffsetZone.utcInstance;
        else
            return FixedOffsetZone.parseSpecifier(lowered) || IANAZone.create(input);
    }
    else if (isNumber(input)) {
        return FixedOffsetZone.instance(input);
    }
    else if (typeof input === "object" && input.offset && typeof input.offset === "number") {
        // This is dumb, but the instanceof check above doesn't seem to really work
        // so we're duck checking it
        return input;
    }
    else {
        return new InvalidZone(input);
    }
}
let now = () => Date.now(), defaultZone = "system", defaultLocale = null, defaultNumberingSystem = null, defaultOutputCalendar = null, throwOnInvalid;
/**
 * Settings contains static getters and setters that control Luxon's overall behavior. Luxon is a simple library with few options, but the ones it does have live here.
 */
class Settings {
    /**
     * Get the callback for returning the current timestamp.
     * @type {function}
     */
    static get now() {
        return now;
    }
    /**
     * Set the callback for returning the current timestamp.
     * The function should return a number, which will be interpreted as an Epoch millisecond count
     * @type {function}
     * @example Settings.now = () => Date.now() + 3000 // pretend it is 3 seconds in the future
     * @example Settings.now = () => 0 // always pretend it's Jan 1, 1970 at midnight in UTC time
     */
    static set now(n) {
        now = n;
    }
    /**
     * Set the default time zone to create DateTimes in. Does not affect existing instances.
     * Use the value "system" to reset this value to the system's time zone.
     * @type {string}
     */
    static set defaultZone(zone) {
        defaultZone = zone;
    }
    /**
     * Get the default time zone object currently used to create DateTimes. Does not affect existing instances.
     * The default value is the system's time zone (the one set on the machine that runs this code).
     * @type {Zone}
     */
    static get defaultZone() {
        return normalizeZone(defaultZone, SystemZone.instance);
    }
    /**
     * Get the default locale to create DateTimes with. Does not affect existing instances.
     * @type {string}
     */
    static get defaultLocale() {
        return defaultLocale;
    }
    /**
     * Set the default locale to create DateTimes with. Does not affect existing instances.
     * @type {string}
     */
    static set defaultLocale(locale) {
        defaultLocale = locale;
    }
    /**
     * Get the default numbering system to create DateTimes with. Does not affect existing instances.
     * @type {string}
     */
    static get defaultNumberingSystem() {
        return defaultNumberingSystem;
    }
    /**
     * Set the default numbering system to create DateTimes with. Does not affect existing instances.
     * @type {string}
     */
    static set defaultNumberingSystem(numberingSystem) {
        defaultNumberingSystem = numberingSystem;
    }
    /**
     * Get the default output calendar to create DateTimes with. Does not affect existing instances.
     * @type {string}
     */
    static get defaultOutputCalendar() {
        return defaultOutputCalendar;
    }
    /**
     * Set the default output calendar to create DateTimes with. Does not affect existing instances.
     * @type {string}
     */
    static set defaultOutputCalendar(outputCalendar) {
        defaultOutputCalendar = outputCalendar;
    }
    /**
     * Get whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
     * @type {boolean}
     */
    static get throwOnInvalid() {
        return throwOnInvalid;
    }
    /**
     * Set whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
     * @type {boolean}
     */
    static set throwOnInvalid(t) {
        throwOnInvalid = t;
    }
    /**
     * Reset Luxon's global caches. Should only be necessary in testing scenarios.
     * @return {void}
     */
    static resetCaches() {
        Locale.resetCache();
        IANAZone.resetCache();
    }
}
let intlLFCache = {};
function getCachedLF(locString, opts = {}) {
    const key = JSON.stringify([locString, opts]);
    let dtf = intlLFCache[key];
    if (!dtf) {
        dtf = new Intl.ListFormat(locString, opts);
        intlLFCache[key] = dtf;
    }
    return dtf;
}
let intlDTCache = {};
function getCachedDTF(locString, opts = {}) {
    const key = JSON.stringify([locString, opts]);
    let dtf = intlDTCache[key];
    if (!dtf) {
        dtf = new Intl.DateTimeFormat(locString, opts);
        intlDTCache[key] = dtf;
    }
    return dtf;
}
let intlNumCache = {};
function getCachedINF(locString, opts = {}) {
    const key = JSON.stringify([locString, opts]);
    let inf = intlNumCache[key];
    if (!inf) {
        inf = new Intl.NumberFormat(locString, opts);
        intlNumCache[key] = inf;
    }
    return inf;
}
let intlRelCache = {};
function getCachedRTF(locString, opts = {}) {
    const { base } = opts, cacheKeyOpts = __rest(opts, ["base"]); // exclude `base` from the options
    const key = JSON.stringify([locString, cacheKeyOpts]);
    let inf = intlRelCache[key];
    if (!inf) {
        inf = new Intl.RelativeTimeFormat(locString, opts);
        intlRelCache[key] = inf;
    }
    return inf;
}
let sysLocaleCache = null;
function systemLocale() {
    if (sysLocaleCache) {
        return sysLocaleCache;
    }
    else {
        sysLocaleCache = new Intl.DateTimeFormat().resolvedOptions().locale;
        return sysLocaleCache;
    }
}
function parseLocaleString(localeStr) {
    // I really want to avoid writing a BCP 47 parser
    // see, e.g. https://github.com/wooorm/bcp-47
    // Instead, we'll do this:
    // a) if the string has no -u extensions, just leave it alone
    // b) if it does, use Intl to resolve everything
    // c) if Intl fails, try again without the -u
    const uIndex = localeStr.indexOf("-u-");
    if (uIndex === -1) {
        return [localeStr];
    }
    else {
        let options;
        const smaller = localeStr.substring(0, uIndex);
        try {
            options = getCachedDTF(localeStr).resolvedOptions();
        }
        catch (e) {
            options = getCachedDTF(smaller).resolvedOptions();
        }
        const { numberingSystem, calendar } = options;
        // return the smaller one so that we can append the calendar and numbering overrides to it
        return [smaller, numberingSystem, calendar];
    }
}
function intlConfigString(localeStr, numberingSystem, outputCalendar) {
    if (outputCalendar || numberingSystem) {
        localeStr += "-u";
        if (outputCalendar) {
            localeStr += `-ca-${outputCalendar}`;
        }
        if (numberingSystem) {
            localeStr += `-nu-${numberingSystem}`;
        }
        return localeStr;
    }
    else {
        return localeStr;
    }
}
function mapMonths(f) {
    const ms = [];
    for (let i = 1; i <= 12; i++) {
        const dt = DateTime.utc(2016, i, 1);
        ms.push(f(dt));
    }
    return ms;
}
function mapWeekdays(f) {
    const ms = [];
    for (let i = 1; i <= 7; i++) {
        const dt = DateTime.utc(2016, 11, 13 + i);
        ms.push(f(dt));
    }
    return ms;
}
function listStuff(loc, length, defaultOK, englishFn, intlFn) {
    const mode = loc.listingMode(defaultOK);
    if (mode === "error") {
        return null;
    }
    else if (mode === "en") {
        return englishFn(length);
    }
    else {
        return intlFn(length);
    }
}
function supportsFastNumbers(loc) {
    if (loc.numberingSystem && loc.numberingSystem !== "latn") {
        return false;
    }
    else {
        return (loc.numberingSystem === "latn" ||
            !loc.locale ||
            loc.locale.startsWith("en") ||
            new Intl.DateTimeFormat(loc.intl).resolvedOptions().numberingSystem === "latn");
    }
}
/**
 * @private
 */
class PolyNumberFormatter {
    constructor(intl, forceSimple, opts) {
        this.padTo = opts.padTo || 0;
        this.floor = opts.floor || false;
        const { padTo, floor } = opts, otherOpts = __rest(opts, ["padTo", "floor"]);
        if (!forceSimple || Object.keys(otherOpts).length > 0) {
            const intlOpts = Object.assign({ useGrouping: false }, opts);
            if (opts.padTo > 0)
                intlOpts.minimumIntegerDigits = opts.padTo;
            this.inf = getCachedINF(intl, intlOpts);
        }
    }
    format(i) {
        if (this.inf) {
            const fixed = this.floor ? Math.floor(i) : i;
            return this.inf.format(fixed);
        }
        else {
            // to match the browser's numberformatter defaults
            const fixed = this.floor ? Math.floor(i) : roundTo(i, 3);
            return padStart(fixed, this.padTo);
        }
    }
}
/**
 * @private
 */
class PolyDateFormatter {
    constructor(dt, intl, opts) {
        this.opts = opts;
        let z;
        if (dt.zone.isUniversal) {
            // UTC-8 or Etc/UTC-8 are not part of tzdata, only Etc/GMT+8 and the like.
            // That is why fixed-offset TZ is set to that unless it is:
            // 1. Representing offset 0 when UTC is used to maintain previous behavior and does not become GMT.
            // 2. Unsupported by the browser:
            //    - some do not support Etc/
            //    - < Etc/GMT-14, > Etc/GMT+12, and 30-minute or 45-minute offsets are not part of tzdata
            const gmtOffset = -1 * (dt.offset / 60);
            const offsetZ = gmtOffset >= 0 ? `Etc/GMT+${gmtOffset}` : `Etc/GMT${gmtOffset}`;
            if (dt.offset !== 0 && IANAZone.create(offsetZ).valid) {
                z = offsetZ;
                this.dt = dt;
            }
            else {
                // Not all fixed-offset zones like Etc/+4:30 are present in tzdata.
                // So we have to make do. Two cases:
                // 1. The format options tell us to show the zone. We can't do that, so the best
                // we can do is format the date in UTC.
                // 2. The format options don't tell us to show the zone. Then we can adjust them
                // the time and tell the formatter to show it to us in UTC, so that the time is right
                // and the bad zone doesn't show up.
                z = "UTC";
                if (opts.timeZoneName) {
                    this.dt = dt;
                }
                else {
                    this.dt = dt.offset === 0 ? dt : DateTime.fromMillis(dt.ts + dt.offset * 60 * 1000);
                }
            }
        }
        else if (dt.zone.type === "system") {
            this.dt = dt;
        }
        else {
            this.dt = dt;
            z = dt.zone.name;
        }
        const intlOpts = Object.assign({}, this.opts);
        if (z) {
            intlOpts.timeZone = z;
        }
        this.dtf = getCachedDTF(intl, intlOpts);
    }
    format() {
        return this.dtf.format(this.dt.toJSDate());
    }
    formatToParts() {
        return this.dtf.formatToParts(this.dt.toJSDate());
    }
    resolvedOptions() {
        return this.dtf.resolvedOptions();
    }
}
/**
 * @private
 */
class PolyRelFormatter {
    constructor(intl, isEnglish, opts) {
        this.opts = Object.assign({ style: "long" }, opts);
        if (!isEnglish && hasRelative()) {
            this.rtf = getCachedRTF(intl, opts);
        }
    }
    format(count, unit) {
        if (this.rtf) {
            return this.rtf.format(count, unit);
        }
        else {
            return formatRelativeTime(unit, count, this.opts.numeric, this.opts.style !== "long");
        }
    }
    formatToParts(count, unit) {
        if (this.rtf) {
            return this.rtf.formatToParts(count, unit);
        }
        else {
            return [];
        }
    }
}
/**
 * @private
 */
class Locale {
    static fromOpts(opts) {
        return Locale.create(opts.locale, opts.numberingSystem, opts.outputCalendar, opts.defaultToEN);
    }
    static create(locale, numberingSystem, outputCalendar, defaultToEN = false) {
        const specifiedLocale = locale || Settings.defaultLocale;
        // the system locale is useful for human readable strings but annoying for parsing/formatting known formats
        const localeR = specifiedLocale || (defaultToEN ? "en-US" : systemLocale());
        const numberingSystemR = numberingSystem || Settings.defaultNumberingSystem;
        const outputCalendarR = outputCalendar || Settings.defaultOutputCalendar;
        return new Locale(localeR, numberingSystemR, outputCalendarR, specifiedLocale);
    }
    static resetCache() {
        sysLocaleCache = null;
        intlDTCache = {};
        intlNumCache = {};
        intlRelCache = {};
    }
    static fromObject({ locale, numberingSystem, outputCalendar } = {}) {
        return Locale.create(locale, numberingSystem, outputCalendar);
    }
    constructor(locale, numbering, outputCalendar, specifiedLocale) {
        const [parsedLocale, parsedNumberingSystem, parsedOutputCalendar] = parseLocaleString(locale);
        this.locale = parsedLocale;
        this.numberingSystem = numbering || parsedNumberingSystem || null;
        this.outputCalendar = outputCalendar || parsedOutputCalendar || null;
        this.intl = intlConfigString(this.locale, this.numberingSystem, this.outputCalendar);
        this.weekdaysCache = { format: {}, standalone: {} };
        this.monthsCache = { format: {}, standalone: {} };
        this.meridiemCache = null;
        this.eraCache = {};
        this.specifiedLocale = specifiedLocale;
        this.fastNumbersCached = null;
    }
    get fastNumbers() {
        if (this.fastNumbersCached == null) {
            this.fastNumbersCached = supportsFastNumbers(this);
        }
        return this.fastNumbersCached;
    }
    listingMode() {
        const isActuallyEn = this.isEnglish();
        const hasNoWeirdness = (this.numberingSystem === null || this.numberingSystem === "latn") &&
            (this.outputCalendar === null || this.outputCalendar === "gregory");
        return isActuallyEn && hasNoWeirdness ? "en" : "intl";
    }
    clone(alts) {
        if (!alts || Object.getOwnPropertyNames(alts).length === 0) {
            return this;
        }
        else {
            return Locale.create(alts.locale || this.specifiedLocale, alts.numberingSystem || this.numberingSystem, alts.outputCalendar || this.outputCalendar, alts.defaultToEN || false);
        }
    }
    redefaultToEN(alts = {}) {
        return this.clone(Object.assign(Object.assign({}, alts), { defaultToEN: true }));
    }
    redefaultToSystem(alts = {}) {
        return this.clone(Object.assign(Object.assign({}, alts), { defaultToEN: false }));
    }
    months(length, format = false, defaultOK = true) {
        return listStuff(this, length, defaultOK, months, () => {
            const intl = format ? { month: length, day: "numeric" } : { month: length }, formatStr = format ? "format" : "standalone";
            if (!this.monthsCache[formatStr][length]) {
                this.monthsCache[formatStr][length] = mapMonths((dt) => this.extract(dt, intl, "month"));
            }
            return this.monthsCache[formatStr][length];
        });
    }
    weekdays(length, format = false, defaultOK = true) {
        return listStuff(this, length, defaultOK, weekdays, () => {
            const intl = format
                ? { weekday: length, year: "numeric", month: "long", day: "numeric" }
                : { weekday: length }, formatStr = format ? "format" : "standalone";
            if (!this.weekdaysCache[formatStr][length]) {
                this.weekdaysCache[formatStr][length] = mapWeekdays((dt) => this.extract(dt, intl, "weekday"));
            }
            return this.weekdaysCache[formatStr][length];
        });
    }
    meridiems(defaultOK = true) {
        return listStuff(this, undefined, defaultOK, () => meridiems, () => {
            // In theory there could be aribitrary day periods. We're gonna assume there are exactly two
            // for AM and PM. This is probably wrong, but it's makes parsing way easier.
            if (!this.meridiemCache) {
                const intl = { hour: "numeric", hourCycle: "h12" };
                this.meridiemCache = [DateTime.utc(2016, 11, 13, 9), DateTime.utc(2016, 11, 13, 19)].map((dt) => this.extract(dt, intl, "dayperiod"));
            }
            return this.meridiemCache;
        });
    }
    eras(length, defaultOK = true) {
        return listStuff(this, length, defaultOK, eras, () => {
            const intl = { era: length };
            // This is problematic. Different calendars are going to define eras totally differently. What I need is the minimum set of dates
            // to definitely enumerate them.
            if (!this.eraCache[length]) {
                this.eraCache[length] = [DateTime.utc(-40, 1, 1), DateTime.utc(2017, 1, 1)].map((dt) => this.extract(dt, intl, "era"));
            }
            return this.eraCache[length];
        });
    }
    extract(dt, intlOpts, field) {
        const df = this.dtFormatter(dt, intlOpts), results = df.formatToParts(), matching = results.find((m) => m.type.toLowerCase() === field);
        return matching ? matching.value : null;
    }
    numberFormatter(opts = {}) {
        // this forcesimple option is never used (the only caller short-circuits on it, but it seems safer to leave)
        // (in contrast, the rest of the condition is used heavily)
        return new PolyNumberFormatter(this.intl, opts.forceSimple || this.fastNumbers, opts);
    }
    dtFormatter(dt, intlOpts = {}) {
        return new PolyDateFormatter(dt, this.intl, intlOpts);
    }
    relFormatter(opts = {}) {
        return new PolyRelFormatter(this.intl, this.isEnglish(), opts);
    }
    listFormatter(opts = {}) {
        return getCachedLF(this.intl, opts);
    }
    isEnglish() {
        return (this.locale === "en" ||
            this.locale.toLowerCase() === "en-us" ||
            new Intl.DateTimeFormat(this.intl).resolvedOptions().locale.startsWith("en-us"));
    }
    equals(other) {
        return (this.locale === other.locale &&
            this.numberingSystem === other.numberingSystem &&
            this.outputCalendar === other.outputCalendar);
    }
}
/*
 * This file handles parsing for well-specified formats. Here's how it works:
 * Two things go into parsing: a regex to match with and an extractor to take apart the groups in the match.
 * An extractor is just a function that takes a regex match array and returns a { year: ..., month: ... } object
 * parse() does the work of executing the regex and applying the extractor. It takes multiple regex/extractor pairs to try in sequence.
 * Extractors can take a "cursor" representing the offset in the match to look at. This makes it easy to combine extractors.
 * combineExtractors() does the work of combining them, keeping track of the cursor through multiple extractions.
 * Some extractions are super dumb and simpleParse and fromStrings help DRY them.
 */
function combineRegexes(...regexes) {
    const full = regexes.reduce((f, r) => f + r.source, "");
    return RegExp(`^${full}$`);
}
function combineExtractors(...extractors) {
    return m => extractors
        .reduce(([mergedVals, mergedZone, cursor], ex) => {
        const [val, zone, next] = ex(m, cursor);
        return [Object.assign(Object.assign({}, mergedVals), val), zone || mergedZone, next];
    }, [{}, null, 1])
        .slice(0, 2);
}
function parse(s, ...patterns) {
    if (s == null) {
        return [null, null];
    }
    for (const [regex, extractor] of patterns) {
        const m = regex.exec(s);
        if (m) {
            return extractor(m);
        }
    }
    return [null, null];
}
function simpleParse(...keys) {
    return (match, cursor) => {
        const ret = {};
        let i;
        for (i = 0; i < keys.length; i++) {
            ret[keys[i]] = parseInteger(match[cursor + i]);
        }
        return [ret, null, cursor + i];
    };
}
// ISO and SQL parsing
const offsetRegex = /(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/;
const isoExtendedZone = `(?:${offsetRegex.source}?(?:\\[(${ianaRegex.source})\\])?)?`;
const isoTimeBaseRegex = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/;
const isoTimeRegex = RegExp(`${isoTimeBaseRegex.source}${isoExtendedZone}`);
const isoTimeExtensionRegex = RegExp(`(?:T${isoTimeRegex.source})?`);
const isoYmdRegex = /([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/;
const isoWeekRegex = /(\d{4})-?W(\d\d)(?:-?(\d))?/;
const isoOrdinalRegex = /(\d{4})-?(\d{3})/;
const extractISOWeekData = simpleParse("weekYear", "weekNumber", "weekDay");
const extractISOOrdinalData = simpleParse("year", "ordinal");
const sqlYmdRegex = /(\d{4})-(\d\d)-(\d\d)/; // dumbed-down version of the ISO one
const sqlTimeRegex = RegExp(`${isoTimeBaseRegex.source} ?(?:${offsetRegex.source}|(${ianaRegex.source}))?`);
const sqlTimeExtensionRegex = RegExp(`(?: ${sqlTimeRegex.source})?`);
function int(match, pos, fallback) {
    const m = match[pos];
    return isUndefined(m) ? fallback : parseInteger(m);
}
function extractISOYmd(match, cursor) {
    const item = {
        year: int(match, cursor),
        month: int(match, cursor + 1, 1),
        day: int(match, cursor + 2, 1)
    };
    return [item, null, cursor + 3];
}
function extractISOTime(match, cursor) {
    const item = {
        hours: int(match, cursor, 0),
        minutes: int(match, cursor + 1, 0),
        seconds: int(match, cursor + 2, 0),
        milliseconds: parseMillis(match[cursor + 3])
    };
    return [item, null, cursor + 4];
}
function extractISOOffset(match, cursor) {
    const local = !match[cursor] && !match[cursor + 1], fullOffset = signedOffset(match[cursor + 1], match[cursor + 2]), zone = local ? null : FixedOffsetZone.instance(fullOffset);
    return [{}, zone, cursor + 3];
}
function extractIANAZone(match, cursor) {
    const zone = match[cursor] ? IANAZone.create(match[cursor]) : null;
    return [{}, zone, cursor + 1];
}
// ISO time parsing
const isoTimeOnly = RegExp(`^T?${isoTimeBaseRegex.source}$`);
// ISO duration parsing
const isoDuration = /^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;
function extractISODuration(match) {
    const [s, yearStr, monthStr, weekStr, dayStr, hourStr, minuteStr, secondStr, millisecondsStr] = match;
    const hasNegativePrefix = s[0] === "-";
    const negativeSeconds = secondStr && secondStr[0] === "-";
    const maybeNegate = (num, force = false) => num !== undefined && (force || (num && hasNegativePrefix)) ? -num : num;
    return [
        {
            years: maybeNegate(parseFloating(yearStr)),
            months: maybeNegate(parseFloating(monthStr)),
            weeks: maybeNegate(parseFloating(weekStr)),
            days: maybeNegate(parseFloating(dayStr)),
            hours: maybeNegate(parseFloating(hourStr)),
            minutes: maybeNegate(parseFloating(minuteStr)),
            seconds: maybeNegate(parseFloating(secondStr), secondStr === "-0"),
            milliseconds: maybeNegate(parseMillis(millisecondsStr), negativeSeconds)
        }
    ];
}
// These are a little braindead. EDT *should* tell us that we're in, say, America/New_York
// and not just that we're in -240 *right now*. But since I don't think these are used that often
// I'm just going to ignore that
const obsOffsets = {
    GMT: 0,
    EDT: -4 * 60,
    EST: -5 * 60,
    CDT: -5 * 60,
    CST: -6 * 60,
    MDT: -6 * 60,
    MST: -7 * 60,
    PDT: -7 * 60,
    PST: -8 * 60
};
function fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
    const result = {
        year: yearStr.length === 2 ? untruncateYear(parseInteger(yearStr)) : parseInteger(yearStr),
        month: monthsShort.indexOf(monthStr) + 1,
        day: parseInteger(dayStr),
        hour: parseInteger(hourStr),
        minute: parseInteger(minuteStr)
    };
    if (secondStr)
        result.second = parseInteger(secondStr);
    if (weekdayStr) {
        result.weekday =
            weekdayStr.length > 3
                ? weekdaysLong.indexOf(weekdayStr) + 1
                : weekdaysShort.indexOf(weekdayStr) + 1;
    }
    return result;
}
// RFC 2822/5322
const rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;
function extractRFC2822(match) {
    const [, weekdayStr, dayStr, monthStr, yearStr, hourStr, minuteStr, secondStr, obsOffset, milOffset, offHourStr, offMinuteStr] = match, result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
    let offset;
    if (obsOffset) {
        offset = obsOffsets[obsOffset];
    }
    else if (milOffset) {
        offset = 0;
    }
    else {
        offset = signedOffset(offHourStr, offMinuteStr);
    }
    return [result, new FixedOffsetZone(offset)];
}
function preprocessRFC2822(s) {
    // Remove comments and folding whitespace and replace multiple-spaces with a single space
    return s
        .replace(/\([^()]*\)|[\n\t]/g, " ")
        .replace(/(\s\s+)/g, " ")
        .trim();
}
// http date
const rfc1123 = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/, rfc850 = /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/, ascii = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;
function extractRFC1123Or850(match) {
    const [, weekdayStr, dayStr, monthStr, yearStr, hourStr, minuteStr, secondStr] = match, result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
    return [result, FixedOffsetZone.utcInstance];
}
function extractASCII(match) {
    const [, weekdayStr, monthStr, dayStr, hourStr, minuteStr, secondStr, yearStr] = match, result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
    return [result, FixedOffsetZone.utcInstance];
}
const isoYmdWithTimeExtensionRegex = combineRegexes(isoYmdRegex, isoTimeExtensionRegex);
const isoWeekWithTimeExtensionRegex = combineRegexes(isoWeekRegex, isoTimeExtensionRegex);
const isoOrdinalWithTimeExtensionRegex = combineRegexes(isoOrdinalRegex, isoTimeExtensionRegex);
const isoTimeCombinedRegex = combineRegexes(isoTimeRegex);
const extractISOYmdTimeAndOffset = combineExtractors(extractISOYmd, extractISOTime, extractISOOffset, extractIANAZone);
const extractISOWeekTimeAndOffset = combineExtractors(extractISOWeekData, extractISOTime, extractISOOffset, extractIANAZone);
const extractISOOrdinalDateAndTime = combineExtractors(extractISOOrdinalData, extractISOTime, extractISOOffset, extractIANAZone);
const extractISOTimeAndOffset = combineExtractors(extractISOTime, extractISOOffset, extractIANAZone);
/*
 * @private
 */
function parseISODate(s) {
    return parse(s, [isoYmdWithTimeExtensionRegex, extractISOYmdTimeAndOffset], [isoWeekWithTimeExtensionRegex, extractISOWeekTimeAndOffset], [isoOrdinalWithTimeExtensionRegex, extractISOOrdinalDateAndTime], [isoTimeCombinedRegex, extractISOTimeAndOffset]);
}
function parseRFC2822Date(s) {
    return parse(preprocessRFC2822(s), [rfc2822, extractRFC2822]);
}
function parseHTTPDate(s) {
    return parse(s, [rfc1123, extractRFC1123Or850], [rfc850, extractRFC1123Or850], [ascii, extractASCII]);
}
function parseISODuration(s) {
    return parse(s, [isoDuration, extractISODuration]);
}
const extractISOTimeOnly = combineExtractors(extractISOTime);
function parseISOTimeOnly(s) {
    return parse(s, [isoTimeOnly, extractISOTimeOnly]);
}
const sqlYmdWithTimeExtensionRegex = combineRegexes(sqlYmdRegex, sqlTimeExtensionRegex);
const sqlTimeCombinedRegex = combineRegexes(sqlTimeRegex);
const extractISOTimeOffsetAndIANAZone = combineExtractors(extractISOTime, extractISOOffset, extractIANAZone);
function parseSQL(s) {
    return parse(s, [sqlYmdWithTimeExtensionRegex, extractISOYmdTimeAndOffset], [sqlTimeCombinedRegex, extractISOTimeOffsetAndIANAZone]);
}
const INVALID$2 = "Invalid Duration";
// unit conversion constants
const lowOrderMatrix = {
    weeks: {
        days: 7,
        hours: 7 * 24,
        minutes: 7 * 24 * 60,
        seconds: 7 * 24 * 60 * 60,
        milliseconds: 7 * 24 * 60 * 60 * 1000,
    },
    days: {
        hours: 24,
        minutes: 24 * 60,
        seconds: 24 * 60 * 60,
        milliseconds: 24 * 60 * 60 * 1000,
    },
    hours: { minutes: 60, seconds: 60 * 60, milliseconds: 60 * 60 * 1000 },
    minutes: { seconds: 60, milliseconds: 60 * 1000 },
    seconds: { milliseconds: 1000 },
}, casualMatrix = Object.assign({ years: {
        quarters: 4,
        months: 12,
        weeks: 52,
        days: 365,
        hours: 365 * 24,
        minutes: 365 * 24 * 60,
        seconds: 365 * 24 * 60 * 60,
        milliseconds: 365 * 24 * 60 * 60 * 1000,
    }, quarters: {
        months: 3,
        weeks: 13,
        days: 91,
        hours: 91 * 24,
        minutes: 91 * 24 * 60,
        seconds: 91 * 24 * 60 * 60,
        milliseconds: 91 * 24 * 60 * 60 * 1000,
    }, months: {
        weeks: 4,
        days: 30,
        hours: 30 * 24,
        minutes: 30 * 24 * 60,
        seconds: 30 * 24 * 60 * 60,
        milliseconds: 30 * 24 * 60 * 60 * 1000,
    } }, lowOrderMatrix), daysInYearAccurate = 146097.0 / 400, daysInMonthAccurate = 146097.0 / 4800, accurateMatrix = Object.assign({ years: {
        quarters: 4,
        months: 12,
        weeks: daysInYearAccurate / 7,
        days: daysInYearAccurate,
        hours: daysInYearAccurate * 24,
        minutes: daysInYearAccurate * 24 * 60,
        seconds: daysInYearAccurate * 24 * 60 * 60,
        milliseconds: daysInYearAccurate * 24 * 60 * 60 * 1000,
    }, quarters: {
        months: 3,
        weeks: daysInYearAccurate / 28,
        days: daysInYearAccurate / 4,
        hours: (daysInYearAccurate * 24) / 4,
        minutes: (daysInYearAccurate * 24 * 60) / 4,
        seconds: (daysInYearAccurate * 24 * 60 * 60) / 4,
        milliseconds: (daysInYearAccurate * 24 * 60 * 60 * 1000) / 4,
    }, months: {
        weeks: daysInMonthAccurate / 7,
        days: daysInMonthAccurate,
        hours: daysInMonthAccurate * 24,
        minutes: daysInMonthAccurate * 24 * 60,
        seconds: daysInMonthAccurate * 24 * 60 * 60,
        milliseconds: daysInMonthAccurate * 24 * 60 * 60 * 1000,
    } }, lowOrderMatrix);
// units ordered by size
const orderedUnits$1 = [
    "years",
    "quarters",
    "months",
    "weeks",
    "days",
    "hours",
    "minutes",
    "seconds",
    "milliseconds",
];
const reverseUnits = orderedUnits$1.slice(0).reverse();
// clone really means "create another instance just like this one, but with these changes"
function clone$1(dur, alts, clear = false) {
    // deep merge for vals
    const conf = {
        values: clear ? alts.values : Object.assign(Object.assign({}, dur.values), (alts.values || {})),
        loc: dur.loc.clone(alts.loc),
        conversionAccuracy: alts.conversionAccuracy || dur.conversionAccuracy,
    };
    return new Duration(conf);
}
function antiTrunc(n) {
    return n < 0 ? Math.floor(n) : Math.ceil(n);
}
// NB: mutates parameters
function convert(matrix, fromMap, fromUnit, toMap, toUnit) {
    const conv = matrix[toUnit][fromUnit], raw = fromMap[fromUnit] / conv, sameSign = Math.sign(raw) === Math.sign(toMap[toUnit]), 
    // ok, so this is wild, but see the matrix in the tests
    added = !sameSign && toMap[toUnit] !== 0 && Math.abs(raw) <= 1 ? antiTrunc(raw) : Math.trunc(raw);
    toMap[toUnit] += added;
    fromMap[fromUnit] -= added * conv;
}
// NB: mutates parameters
function normalizeValues(matrix, vals) {
    reverseUnits.reduce((previous, current) => {
        if (!isUndefined(vals[current])) {
            if (previous) {
                convert(matrix, vals, previous, vals, current);
            }
            return current;
        }
        else {
            return previous;
        }
    }, null);
}
/**
 * A Duration object represents a period of time, like "2 months" or "1 day, 1 hour". Conceptually, it's just a map of units to their quantities, accompanied by some additional configuration and methods for creating, parsing, interrogating, transforming, and formatting them. They can be used on their own or in conjunction with other Luxon types; for example, you can use {@link DateTime#plus} to add a Duration object to a DateTime, producing another DateTime.
 *
 * Here is a brief overview of commonly used methods and getters in Duration:
 *
 * * **Creation** To create a Duration, use {@link Duration#fromMillis}, {@link Duration#fromObject}, or {@link Duration#fromISO}.
 * * **Unit values** See the {@link Duration#years}, {@link Duration#months}, {@link Duration#weeks}, {@link Duration#days}, {@link Duration#hours}, {@link Duration#minutes}, {@link Duration#seconds}, {@link Duration#milliseconds} accessors.
 * * **Configuration** See  {@link Duration#locale} and {@link Duration#numberingSystem} accessors.
 * * **Transformation** To create new Durations out of old ones use {@link Duration#plus}, {@link Duration#minus}, {@link Duration#normalize}, {@link Duration#set}, {@link Duration#reconfigure}, {@link Duration#shiftTo}, and {@link Duration#negate}.
 * * **Output** To convert the Duration into other representations, see {@link Duration#as}, {@link Duration#toISO}, {@link Duration#toFormat}, and {@link Duration#toJSON}
 *
 * There's are more methods documented below. In addition, for more information on subtler topics like internationalization and validity, see the external documentation.
 */
class Duration {
    /**
     * @private
     */
    constructor(config) {
        const accurate = config.conversionAccuracy === "longterm" || false;
        /**
         * @access private
         */
        this.values = config.values;
        /**
         * @access private
         */
        this.loc = config.loc || Locale.create();
        /**
         * @access private
         */
        this.conversionAccuracy = accurate ? "longterm" : "casual";
        /**
         * @access private
         */
        this.invalid = config.invalid || null;
        /**
         * @access private
         */
        this.matrix = accurate ? accurateMatrix : casualMatrix;
        /**
         * @access private
         */
        this.isLuxonDuration = true;
    }
    /**
     * Create Duration from a number of milliseconds.
     * @param {number} count of milliseconds
     * @param {Object} opts - options for parsing
     * @param {string} [opts.locale='en-US'] - the locale to use
     * @param {string} opts.numberingSystem - the numbering system to use
     * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
     * @return {Duration}
     */
    static fromMillis(count, opts) {
        return Duration.fromObject({ milliseconds: count }, opts);
    }
    /**
     * Create a Duration from a JavaScript object with keys like 'years' and 'hours'.
     * If this object is empty then a zero milliseconds duration is returned.
     * @param {Object} obj - the object to create the DateTime from
     * @param {number} obj.years
     * @param {number} obj.quarters
     * @param {number} obj.months
     * @param {number} obj.weeks
     * @param {number} obj.days
     * @param {number} obj.hours
     * @param {number} obj.minutes
     * @param {number} obj.seconds
     * @param {number} obj.milliseconds
     * @param {Object} [opts=[]] - options for creating this Duration
     * @param {string} [opts.locale='en-US'] - the locale to use
     * @param {string} opts.numberingSystem - the numbering system to use
     * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
     * @return {Duration}
     */
    static fromObject(obj, opts = {}) {
        if (obj == null || typeof obj !== "object") {
            throw new InvalidArgumentError(`Duration.fromObject: argument expected to be an object, got ${obj === null ? "null" : typeof obj}`);
        }
        return new Duration({
            values: normalizeObject(obj, Duration.normalizeUnit),
            loc: Locale.fromObject(opts),
            conversionAccuracy: opts.conversionAccuracy,
        });
    }
    /**
     * Create a Duration from DurationLike.
     *
     * @param {Object | number | Duration} durationLike
     * One of:
     * - object with keys like 'years' and 'hours'.
     * - number representing milliseconds
     * - Duration instance
     * @return {Duration}
     */
    static fromDurationLike(durationLike) {
        if (isNumber(durationLike)) {
            return Duration.fromMillis(durationLike);
        }
        else if (Duration.isDuration(durationLike)) {
            return durationLike;
        }
        else if (typeof durationLike === "object") {
            return Duration.fromObject(durationLike);
        }
        else {
            throw new InvalidArgumentError(`Unknown duration argument ${durationLike} of type ${typeof durationLike}`);
        }
    }
    /**
     * Create a Duration from an ISO 8601 duration string.
     * @param {string} text - text to parse
     * @param {Object} opts - options for parsing
     * @param {string} [opts.locale='en-US'] - the locale to use
     * @param {string} opts.numberingSystem - the numbering system to use
     * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
     * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
     * @example Duration.fromISO('P3Y6M1W4DT12H30M5S').toObject() //=> { years: 3, months: 6, weeks: 1, days: 4, hours: 12, minutes: 30, seconds: 5 }
     * @example Duration.fromISO('PT23H').toObject() //=> { hours: 23 }
     * @example Duration.fromISO('P5Y3M').toObject() //=> { years: 5, months: 3 }
     * @return {Duration}
     */
    static fromISO(text, opts) {
        const [parsed] = parseISODuration(text);
        if (parsed) {
            return Duration.fromObject(parsed, opts);
        }
        else {
            return Duration.invalid("unparsable", `the input "${text}" can't be parsed as ISO 8601`);
        }
    }
    /**
     * Create a Duration from an ISO 8601 time string.
     * @param {string} text - text to parse
     * @param {Object} opts - options for parsing
     * @param {string} [opts.locale='en-US'] - the locale to use
     * @param {string} opts.numberingSystem - the numbering system to use
     * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
     * @see https://en.wikipedia.org/wiki/ISO_8601#Times
     * @example Duration.fromISOTime('11:22:33.444').toObject() //=> { hours: 11, minutes: 22, seconds: 33, milliseconds: 444 }
     * @example Duration.fromISOTime('11:00').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
     * @example Duration.fromISOTime('T11:00').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
     * @example Duration.fromISOTime('1100').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
     * @example Duration.fromISOTime('T1100').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
     * @return {Duration}
     */
    static fromISOTime(text, opts) {
        const [parsed] = parseISOTimeOnly(text);
        if (parsed) {
            return Duration.fromObject(parsed, opts);
        }
        else {
            return Duration.invalid("unparsable", `the input "${text}" can't be parsed as ISO 8601`);
        }
    }
    /**
     * Create an invalid Duration.
     * @param {string} reason - simple string of why this datetime is invalid. Should not contain parameters or anything else data-dependent
     * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
     * @return {Duration}
     */
    static invalid(reason, explanation = null) {
        if (!reason) {
            throw new InvalidArgumentError("need to specify a reason the Duration is invalid");
        }
        const invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);
        if (Settings.throwOnInvalid) {
            throw new InvalidDurationError(invalid);
        }
        else {
            return new Duration({ invalid });
        }
    }
    /**
     * @private
     */
    static normalizeUnit(unit) {
        const normalized = {
            year: "years",
            years: "years",
            quarter: "quarters",
            quarters: "quarters",
            month: "months",
            months: "months",
            week: "weeks",
            weeks: "weeks",
            day: "days",
            days: "days",
            hour: "hours",
            hours: "hours",
            minute: "minutes",
            minutes: "minutes",
            second: "seconds",
            seconds: "seconds",
            millisecond: "milliseconds",
            milliseconds: "milliseconds",
        }[unit ? unit.toLowerCase() : unit];
        if (!normalized)
            throw new InvalidUnitError(unit);
        return normalized;
    }
    /**
     * Check if an object is a Duration. Works across context boundaries
     * @param {object} o
     * @return {boolean}
     */
    static isDuration(o) {
        return (o && o.isLuxonDuration) || false;
    }
    /**
     * Get  the locale of a Duration, such 'en-GB'
     * @type {string}
     */
    get locale() {
        return this.isValid ? this.loc.locale : null;
    }
    /**
     * Get the numbering system of a Duration, such 'beng'. The numbering system is used when formatting the Duration
     *
     * @type {string}
     */
    get numberingSystem() {
        return this.isValid ? this.loc.numberingSystem : null;
    }
    /**
     * Returns a string representation of this Duration formatted according to the specified format string. You may use these tokens:
     * * `S` for milliseconds
     * * `s` for seconds
     * * `m` for minutes
     * * `h` for hours
     * * `d` for days
     * * `w` for weeks
     * * `M` for months
     * * `y` for years
     * Notes:
     * * Add padding by repeating the token, e.g. "yy" pads the years to two digits, "hhhh" pads the hours out to four digits
     * * Tokens can be escaped by wrapping with single quotes.
     * * The duration will be converted to the set of units in the format string using {@link Duration#shiftTo} and the Durations's conversion accuracy setting.
     * @param {string} fmt - the format string
     * @param {Object} opts - options
     * @param {boolean} [opts.floor=true] - floor numerical values
     * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("y d s") //=> "1 6 2"
     * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("yy dd sss") //=> "01 06 002"
     * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("M S") //=> "12 518402000"
     * @return {string}
     */
    toFormat(fmt, opts = {}) {
        // reverse-compat since 1.2; we always round down now, never up, and we do it by default
        const fmtOpts = Object.assign(Object.assign({}, opts), { floor: opts.round !== false && opts.floor !== false });
        return this.isValid
            ? Formatter.create(this.loc, fmtOpts).formatDurationFromString(this, fmt)
            : INVALID$2;
    }
    /**
     * Returns a string representation of a Duration with all units included.
     * To modify its behavior use the `listStyle` and any Intl.NumberFormat option, though `unitDisplay` is especially relevant.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
     * @param opts - On option object to override the formatting. Accepts the same keys as the options parameter of the native `Int.NumberFormat` constructor, as well as `listStyle`.
     * @example
     * ```js
     * var dur = Duration.fromObject({ days: 1, hours: 5, minutes: 6 })
     * dur.toHuman() //=> '1 day, 5 hours, 6 minutes'
     * dur.toHuman({ listStyle: "long" }) //=> '1 day, 5 hours, and 6 minutes'
     * dur.toHuman({ unitDisplay: "short" }) //=> '1 day, 5 hr, 6 min'
     * ```
     */
    toHuman(opts = {}) {
        const l = orderedUnits$1
            .map((unit) => {
            const val = this.values[unit];
            if (isUndefined(val)) {
                return null;
            }
            return this.loc
                .numberFormatter(Object.assign(Object.assign({ style: "unit", unitDisplay: "long" }, opts), { unit: unit.slice(0, -1) }))
                .format(val);
        })
            .filter((n) => n);
        return this.loc
            .listFormatter(Object.assign({ type: "conjunction", style: opts.listStyle || "narrow" }, opts))
            .format(l);
    }
    /**
     * Returns a JavaScript object with this Duration's values.
     * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toObject() //=> { years: 1, days: 6, seconds: 2 }
     * @return {Object}
     */
    toObject() {
        if (!this.isValid)
            return {};
        return Object.assign({}, this.values);
    }
    /**
     * Returns an ISO 8601-compliant string representation of this Duration.
     * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
     * @example Duration.fromObject({ years: 3, seconds: 45 }).toISO() //=> 'P3YT45S'
     * @example Duration.fromObject({ months: 4, seconds: 45 }).toISO() //=> 'P4MT45S'
     * @example Duration.fromObject({ months: 5 }).toISO() //=> 'P5M'
     * @example Duration.fromObject({ minutes: 5 }).toISO() //=> 'PT5M'
     * @example Duration.fromObject({ milliseconds: 6 }).toISO() //=> 'PT0.006S'
     * @return {string}
     */
    toISO() {
        // we could use the formatter, but this is an easier way to get the minimum string
        if (!this.isValid)
            return null;
        let s = "P";
        if (this.years !== 0)
            s += this.years + "Y";
        if (this.months !== 0 || this.quarters !== 0)
            s += this.months + this.quarters * 3 + "M";
        if (this.weeks !== 0)
            s += this.weeks + "W";
        if (this.days !== 0)
            s += this.days + "D";
        if (this.hours !== 0 || this.minutes !== 0 || this.seconds !== 0 || this.milliseconds !== 0)
            s += "T";
        if (this.hours !== 0)
            s += this.hours + "H";
        if (this.minutes !== 0)
            s += this.minutes + "M";
        if (this.seconds !== 0 || this.milliseconds !== 0)
            // this will handle "floating point madness" by removing extra decimal places
            // https://stackoverflow.com/questions/588004/is-floating-point-math-broken
            s += roundTo(this.seconds + this.milliseconds / 1000, 3) + "S";
        if (s === "P")
            s += "T0S";
        return s;
    }
    /**
     * Returns an ISO 8601-compliant string representation of this Duration, formatted as a time of day.
     * Note that this will return null if the duration is invalid, negative, or equal to or greater than 24 hours.
     * @see https://en.wikipedia.org/wiki/ISO_8601#Times
     * @param {Object} opts - options
     * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
     * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
     * @param {boolean} [opts.includePrefix=false] - include the `T` prefix
     * @param {string} [opts.format='extended'] - choose between the basic and extended format
     * @example Duration.fromObject({ hours: 11 }).toISOTime() //=> '11:00:00.000'
     * @example Duration.fromObject({ hours: 11 }).toISOTime({ suppressMilliseconds: true }) //=> '11:00:00'
     * @example Duration.fromObject({ hours: 11 }).toISOTime({ suppressSeconds: true }) //=> '11:00'
     * @example Duration.fromObject({ hours: 11 }).toISOTime({ includePrefix: true }) //=> 'T11:00:00.000'
     * @example Duration.fromObject({ hours: 11 }).toISOTime({ format: 'basic' }) //=> '110000.000'
     * @return {string}
     */
    toISOTime(opts = {}) {
        if (!this.isValid)
            return null;
        const millis = this.toMillis();
        if (millis < 0 || millis >= 86400000)
            return null;
        opts = Object.assign({ suppressMilliseconds: false, suppressSeconds: false, includePrefix: false, format: "extended" }, opts);
        const value = this.shiftTo("hours", "minutes", "seconds", "milliseconds");
        let fmt = opts.format === "basic" ? "hhmm" : "hh:mm";
        if (!opts.suppressSeconds || value.seconds !== 0 || value.milliseconds !== 0) {
            fmt += opts.format === "basic" ? "ss" : ":ss";
            if (!opts.suppressMilliseconds || value.milliseconds !== 0) {
                fmt += ".SSS";
            }
        }
        let str = value.toFormat(fmt);
        if (opts.includePrefix) {
            str = "T" + str;
        }
        return str;
    }
    /**
     * Returns an ISO 8601 representation of this Duration appropriate for use in JSON.
     * @return {string}
     */
    toJSON() {
        return this.toISO();
    }
    /**
     * Returns an ISO 8601 representation of this Duration appropriate for use in debugging.
     * @return {string}
     */
    toString() {
        return this.toISO();
    }
    /**
     * Returns an milliseconds value of this Duration.
     * @return {number}
     */
    toMillis() {
        return this.as("milliseconds");
    }
    /**
     * Returns an milliseconds value of this Duration. Alias of {@link toMillis}
     * @return {number}
     */
    valueOf() {
        return this.toMillis();
    }
    /**
     * Make this Duration longer by the specified amount. Return a newly-constructed Duration.
     * @param {Duration|Object|number} duration - The amount to add. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
     * @return {Duration}
     */
    plus(duration) {
        if (!this.isValid)
            return this;
        const dur = Duration.fromDurationLike(duration), result = {};
        for (const k of orderedUnits$1) {
            if (hasOwnProperty(dur.values, k) || hasOwnProperty(this.values, k)) {
                result[k] = dur.get(k) + this.get(k);
            }
        }
        return clone$1(this, { values: result }, true);
    }
    /**
     * Make this Duration shorter by the specified amount. Return a newly-constructed Duration.
     * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
     * @return {Duration}
     */
    minus(duration) {
        if (!this.isValid)
            return this;
        const dur = Duration.fromDurationLike(duration);
        return this.plus(dur.negate());
    }
    /**
     * Scale this Duration by the specified amount. Return a newly-constructed Duration.
     * @param {function} fn - The function to apply to each unit. Arity is 1 or 2: the value of the unit and, optionally, the unit name. Must return a number.
     * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnits(x => x * 2) //=> { hours: 2, minutes: 60 }
     * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnits((x, u) => u === "hour" ? x * 2 : x) //=> { hours: 2, minutes: 30 }
     * @return {Duration}
     */
    mapUnits(fn) {
        if (!this.isValid)
            return this;
        const result = {};
        for (const k of Object.keys(this.values)) {
            result[k] = asNumber(fn(this.values[k], k));
        }
        return clone$1(this, { values: result }, true);
    }
    /**
     * Get the value of unit.
     * @param {string} unit - a unit such as 'minute' or 'day'
     * @example Duration.fromObject({years: 2, days: 3}).get('years') //=> 2
     * @example Duration.fromObject({years: 2, days: 3}).get('months') //=> 0
     * @example Duration.fromObject({years: 2, days: 3}).get('days') //=> 3
     * @return {number}
     */
    get(unit) {
        return this[Duration.normalizeUnit(unit)];
    }
    /**
     * "Set" the values of specified units. Return a newly-constructed Duration.
     * @param {Object} values - a mapping of units to numbers
     * @example dur.set({ years: 2017 })
     * @example dur.set({ hours: 8, minutes: 30 })
     * @return {Duration}
     */
    set(values) {
        if (!this.isValid)
            return this;
        const mixed = Object.assign(Object.assign({}, this.values), normalizeObject(values, Duration.normalizeUnit));
        return clone$1(this, { values: mixed });
    }
    /**
     * "Set" the locale and/or numberingSystem.  Returns a newly-constructed Duration.
     * @example dur.reconfigure({ locale: 'en-GB' })
     * @return {Duration}
     */
    reconfigure({ locale, numberingSystem, conversionAccuracy } = {}) {
        const loc = this.loc.clone({ locale, numberingSystem }), opts = { loc };
        if (conversionAccuracy) {
            opts.conversionAccuracy = conversionAccuracy;
        }
        return clone$1(this, opts);
    }
    /**
     * Return the length of the duration in the specified unit.
     * @param {string} unit - a unit such as 'minutes' or 'days'
     * @example Duration.fromObject({years: 1}).as('days') //=> 365
     * @example Duration.fromObject({years: 1}).as('months') //=> 12
     * @example Duration.fromObject({hours: 60}).as('days') //=> 2.5
     * @return {number}
     */
    as(unit) {
        return this.isValid ? this.shiftTo(unit).get(unit) : NaN;
    }
    /**
     * Reduce this Duration to its canonical representation in its current units.
     * @example Duration.fromObject({ years: 2, days: 5000 }).normalize().toObject() //=> { years: 15, days: 255 }
     * @example Duration.fromObject({ hours: 12, minutes: -45 }).normalize().toObject() //=> { hours: 11, minutes: 15 }
     * @return {Duration}
     */
    normalize() {
        if (!this.isValid)
            return this;
        const vals = this.toObject();
        normalizeValues(this.matrix, vals);
        return clone$1(this, { values: vals }, true);
    }
    /**
     * Convert this Duration into its representation in a different set of units.
     * @example Duration.fromObject({ hours: 1, seconds: 30 }).shiftTo('minutes', 'milliseconds').toObject() //=> { minutes: 60, milliseconds: 30000 }
     * @return {Duration}
     */
    shiftTo(...units) {
        if (!this.isValid)
            return this;
        if (units.length === 0) {
            return this;
        }
        units = units.map((u) => Duration.normalizeUnit(u));
        const built = {}, accumulated = {}, vals = this.toObject();
        let lastUnit;
        for (const k of orderedUnits$1) {
            if (units.indexOf(k) >= 0) {
                lastUnit = k;
                let own = 0;
                // anything we haven't boiled down yet should get boiled to this unit
                for (const ak in accumulated) {
                    own += this.matrix[ak][k] * accumulated[ak];
                    accumulated[ak] = 0;
                }
                // plus anything that's already in this unit
                if (isNumber(vals[k])) {
                    own += vals[k];
                }
                const i = Math.trunc(own);
                built[k] = i;
                accumulated[k] = (own * 1000 - i * 1000) / 1000;
                // plus anything further down the chain that should be rolled up in to this
                for (const down in vals) {
                    if (orderedUnits$1.indexOf(down) > orderedUnits$1.indexOf(k)) {
                        convert(this.matrix, vals, down, built, k);
                    }
                }
                // otherwise, keep it in the wings to boil it later
            }
            else if (isNumber(vals[k])) {
                accumulated[k] = vals[k];
            }
        }
        // anything leftover becomes the decimal for the last unit
        // lastUnit must be defined since units is not empty
        for (const key in accumulated) {
            if (accumulated[key] !== 0) {
                built[lastUnit] +=
                    key === lastUnit ? accumulated[key] : accumulated[key] / this.matrix[lastUnit][key];
            }
        }
        return clone$1(this, { values: built }, true).normalize();
    }
    /**
     * Return the negative of this Duration.
     * @example Duration.fromObject({ hours: 1, seconds: 30 }).negate().toObject() //=> { hours: -1, seconds: -30 }
     * @return {Duration}
     */
    negate() {
        if (!this.isValid)
            return this;
        const negated = {};
        for (const k of Object.keys(this.values)) {
            negated[k] = this.values[k] === 0 ? 0 : -this.values[k];
        }
        return clone$1(this, { values: negated }, true);
    }
    /**
     * Get the years.
     * @type {number}
     */
    get years() {
        return this.isValid ? this.values.years || 0 : NaN;
    }
    /**
     * Get the quarters.
     * @type {number}
     */
    get quarters() {
        return this.isValid ? this.values.quarters || 0 : NaN;
    }
    /**
     * Get the months.
     * @type {number}
     */
    get months() {
        return this.isValid ? this.values.months || 0 : NaN;
    }
    /**
     * Get the weeks
     * @type {number}
     */
    get weeks() {
        return this.isValid ? this.values.weeks || 0 : NaN;
    }
    /**
     * Get the days.
     * @type {number}
     */
    get days() {
        return this.isValid ? this.values.days || 0 : NaN;
    }
    /**
     * Get the hours.
     * @type {number}
     */
    get hours() {
        return this.isValid ? this.values.hours || 0 : NaN;
    }
    /**
     * Get the minutes.
     * @type {number}
     */
    get minutes() {
        return this.isValid ? this.values.minutes || 0 : NaN;
    }
    /**
     * Get the seconds.
     * @return {number}
     */
    get seconds() {
        return this.isValid ? this.values.seconds || 0 : NaN;
    }
    /**
     * Get the milliseconds.
     * @return {number}
     */
    get milliseconds() {
        return this.isValid ? this.values.milliseconds || 0 : NaN;
    }
    /**
     * Returns whether the Duration is invalid. Invalid durations are returned by diff operations
     * on invalid DateTimes or Intervals.
     * @return {boolean}
     */
    get isValid() {
        return this.invalid === null;
    }
    /**
     * Returns an error code if this Duration became invalid, or null if the Duration is valid
     * @return {string}
     */
    get invalidReason() {
        return this.invalid ? this.invalid.reason : null;
    }
    /**
     * Returns an explanation of why this Duration became invalid, or null if the Duration is valid
     * @type {string}
     */
    get invalidExplanation() {
        return this.invalid ? this.invalid.explanation : null;
    }
    /**
     * Equality check
     * Two Durations are equal iff they have the same units and the same values for each unit.
     * @param {Duration} other
     * @return {boolean}
     */
    equals(other) {
        if (!this.isValid || !other.isValid) {
            return false;
        }
        if (!this.loc.equals(other.loc)) {
            return false;
        }
        function eq(v1, v2) {
            // Consider 0 and undefined as equal
            if (v1 === undefined || v1 === 0)
                return v2 === undefined || v2 === 0;
            return v1 === v2;
        }
        for (const u of orderedUnits$1) {
            if (!eq(this.values[u], other.values[u])) {
                return false;
            }
        }
        return true;
    }
}
const INVALID$1 = "Invalid Interval";
// checks if the start is equal to or before the end
function validateStartEnd(start, end) {
    if (!start || !start.isValid) {
        return Interval.invalid("missing or invalid start");
    }
    else if (!end || !end.isValid) {
        return Interval.invalid("missing or invalid end");
    }
    else if (end < start) {
        return Interval.invalid("end before start", `The end of an interval must be after its start, but you had start=${start.toISO()} and end=${end.toISO()}`);
    }
    else {
        return null;
    }
}
/**
 * An Interval object represents a half-open interval of time, where each endpoint is a {@link DateTime}. Conceptually, it's a container for those two endpoints, accompanied by methods for creating, parsing, interrogating, comparing, transforming, and formatting them.
 *
 * Here is a brief overview of the most commonly used methods and getters in Interval:
 *
 * * **Creation** To create an Interval, use {@link Interval#fromDateTimes}, {@link Interval#after}, {@link Interval#before}, or {@link Interval#fromISO}.
 * * **Accessors** Use {@link Interval#start} and {@link Interval#end} to get the start and end.
 * * **Interrogation** To analyze the Interval, use {@link Interval#count}, {@link Interval#length}, {@link Interval#hasSame}, {@link Interval#contains}, {@link Interval#isAfter}, or {@link Interval#isBefore}.
 * * **Transformation** To create other Intervals out of this one, use {@link Interval#set}, {@link Interval#splitAt}, {@link Interval#splitBy}, {@link Interval#divideEqually}, {@link Interval#merge}, {@link Interval#xor}, {@link Interval#union}, {@link Interval#intersection}, or {@link Interval#difference}.
 * * **Comparison** To compare this Interval to another one, use {@link Interval#equals}, {@link Interval#overlaps}, {@link Interval#abutsStart}, {@link Interval#abutsEnd}, {@link Interval#engulfs}
 * * **Output** To convert the Interval into other representations, see {@link Interval#toString}, {@link Interval#toISO}, {@link Interval#toISODate}, {@link Interval#toISOTime}, {@link Interval#toFormat}, and {@link Interval#toDuration}.
 */
class Interval {
    /**
     * @private
     */
    constructor(config) {
        /**
         * @access private
         */
        this.s = config.start;
        /**
         * @access private
         */
        this.e = config.end;
        /**
         * @access private
         */
        this.invalid = config.invalid || null;
        /**
         * @access private
         */
        this.isLuxonInterval = true;
    }
    /**
     * Create an invalid Interval.
     * @param {string} reason - simple string of why this Interval is invalid. Should not contain parameters or anything else data-dependent
     * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
     * @return {Interval}
     */
    static invalid(reason, explanation = null) {
        if (!reason) {
            throw new InvalidArgumentError("need to specify a reason the Interval is invalid");
        }
        const invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);
        if (Settings.throwOnInvalid) {
            throw new InvalidIntervalError(invalid);
        }
        else {
            return new Interval({ invalid });
        }
    }
    /**
     * Create an Interval from a start DateTime and an end DateTime. Inclusive of the start but not the end.
     * @param {DateTime|Date|Object} start
     * @param {DateTime|Date|Object} end
     * @return {Interval}
     */
    static fromDateTimes(start, end) {
        const builtStart = friendlyDateTime(start), builtEnd = friendlyDateTime(end);
        const validateError = validateStartEnd(builtStart, builtEnd);
        if (validateError == null) {
            return new Interval({
                start: builtStart,
                end: builtEnd,
            });
        }
        else {
            return validateError;
        }
    }
    /**
     * Create an Interval from a start DateTime and a Duration to extend to.
     * @param {DateTime|Date|Object} start
     * @param {Duration|Object|number} duration - the length of the Interval.
     * @return {Interval}
     */
    static after(start, duration) {
        const dur = Duration.fromDurationLike(duration), dt = friendlyDateTime(start);
        return Interval.fromDateTimes(dt, dt.plus(dur));
    }
    /**
     * Create an Interval from an end DateTime and a Duration to extend backwards to.
     * @param {DateTime|Date|Object} end
     * @param {Duration|Object|number} duration - the length of the Interval.
     * @return {Interval}
     */
    static before(end, duration) {
        const dur = Duration.fromDurationLike(duration), dt = friendlyDateTime(end);
        return Interval.fromDateTimes(dt.minus(dur), dt);
    }
    /**
     * Create an Interval from an ISO 8601 string.
     * Accepts `<start>/<end>`, `<start>/<duration>`, and `<duration>/<end>` formats.
     * @param {string} text - the ISO string to parse
     * @param {Object} [opts] - options to pass {@link DateTime#fromISO} and optionally {@link Duration#fromISO}
     * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
     * @return {Interval}
     */
    static fromISO(text, opts) {
        const [s, e] = (text || "").split("/", 2);
        if (s && e) {
            let start, startIsValid;
            try {
                start = DateTime.fromISO(s, opts);
                startIsValid = start.isValid;
            }
            catch (e) {
                startIsValid = false;
            }
            let end, endIsValid;
            try {
                end = DateTime.fromISO(e, opts);
                endIsValid = end.isValid;
            }
            catch (e) {
                endIsValid = false;
            }
            if (startIsValid && endIsValid) {
                return Interval.fromDateTimes(start, end);
            }
            if (startIsValid) {
                const dur = Duration.fromISO(e, opts);
                if (dur.isValid) {
                    return Interval.after(start, dur);
                }
            }
            else if (endIsValid) {
                const dur = Duration.fromISO(s, opts);
                if (dur.isValid) {
                    return Interval.before(end, dur);
                }
            }
        }
        return Interval.invalid("unparsable", `the input "${text}" can't be parsed as ISO 8601`);
    }
    /**
     * Check if an object is an Interval. Works across context boundaries
     * @param {object} o
     * @return {boolean}
     */
    static isInterval(o) {
        return (o && o.isLuxonInterval) || false;
    }
    /**
     * Returns the start of the Interval
     * @type {DateTime}
     */
    get start() {
        return this.isValid ? this.s : null;
    }
    /**
     * Returns the end of the Interval
     * @type {DateTime}
     */
    get end() {
        return this.isValid ? this.e : null;
    }
    /**
     * Returns whether this Interval's end is at least its start, meaning that the Interval isn't 'backwards'.
     * @type {boolean}
     */
    get isValid() {
        return this.invalidReason === null;
    }
    /**
     * Returns an error code if this Interval is invalid, or null if the Interval is valid
     * @type {string}
     */
    get invalidReason() {
        return this.invalid ? this.invalid.reason : null;
    }
    /**
     * Returns an explanation of why this Interval became invalid, or null if the Interval is valid
     * @type {string}
     */
    get invalidExplanation() {
        return this.invalid ? this.invalid.explanation : null;
    }
    /**
     * Returns the length of the Interval in the specified unit.
     * @param {string} unit - the unit (such as 'hours' or 'days') to return the length in.
     * @return {number}
     */
    length(unit = "milliseconds") {
        return this.isValid ? this.toDuration(...[unit]).get(unit) : NaN;
    }
    /**
     * Returns the count of minutes, hours, days, months, or years included in the Interval, even in part.
     * Unlike {@link Interval#length} this counts sections of the calendar, not periods of time, e.g. specifying 'day'
     * asks 'what dates are included in this interval?', not 'how many days long is this interval?'
     * @param {string} [unit='milliseconds'] - the unit of time to count.
     * @return {number}
     */
    count(unit = "milliseconds") {
        if (!this.isValid)
            return NaN;
        const start = this.start.startOf(unit), end = this.end.startOf(unit);
        return Math.floor(end.diff(start, unit).get(unit)) + 1;
    }
    /**
     * Returns whether this Interval's start and end are both in the same unit of time
     * @param {string} unit - the unit of time to check sameness on
     * @return {boolean}
     */
    hasSame(unit) {
        return this.isValid ? this.isEmpty() || this.e.minus(1).hasSame(this.s, unit) : false;
    }
    /**
     * Return whether this Interval has the same start and end DateTimes.
     * @return {boolean}
     */
    isEmpty() {
        return this.s.valueOf() === this.e.valueOf();
    }
    /**
     * Return whether this Interval's start is after the specified DateTime.
     * @param {DateTime} dateTime
     * @return {boolean}
     */
    isAfter(dateTime) {
        if (!this.isValid)
            return false;
        return this.s > dateTime;
    }
    /**
     * Return whether this Interval's end is before the specified DateTime.
     * @param {DateTime} dateTime
     * @return {boolean}
     */
    isBefore(dateTime) {
        if (!this.isValid)
            return false;
        return this.e <= dateTime;
    }
    /**
     * Return whether this Interval contains the specified DateTime.
     * @param {DateTime} dateTime
     * @return {boolean}
     */
    contains(dateTime) {
        if (!this.isValid)
            return false;
        return this.s <= dateTime && this.e > dateTime;
    }
    /**
     * "Sets" the start and/or end dates. Returns a newly-constructed Interval.
     * @param {Object} values - the values to set
     * @param {DateTime} values.start - the starting DateTime
     * @param {DateTime} values.end - the ending DateTime
     * @return {Interval}
     */
    set({ start, end } = {}) {
        if (!this.isValid)
            return this;
        return Interval.fromDateTimes(start || this.s, end || this.e);
    }
    /**
     * Split this Interval at each of the specified DateTimes
     * @param {...DateTime} dateTimes - the unit of time to count.
     * @return {Array}
     */
    splitAt(...dateTimes) {
        if (!this.isValid)
            return [];
        const sorted = dateTimes
            .map(friendlyDateTime)
            .filter((d) => this.contains(d))
            .sort(), results = [];
        let { s } = this, i = 0;
        while (s < this.e) {
            const added = sorted[i] || this.e, next = +added > +this.e ? this.e : added;
            results.push(Interval.fromDateTimes(s, next));
            s = next;
            i += 1;
        }
        return results;
    }
    /**
     * Split this Interval into smaller Intervals, each of the specified length.
     * Left over time is grouped into a smaller interval
     * @param {Duration|Object|number} duration - The length of each resulting interval.
     * @return {Array}
     */
    splitBy(duration) {
        const dur = Duration.fromDurationLike(duration);
        if (!this.isValid || !dur.isValid || dur.as("milliseconds") === 0) {
            return [];
        }
        let { s } = this, idx = 1, next;
        const results = [];
        while (s < this.e) {
            const added = this.start.plus(dur.mapUnits((x) => x * idx));
            next = +added > +this.e ? this.e : added;
            results.push(Interval.fromDateTimes(s, next));
            s = next;
            idx += 1;
        }
        return results;
    }
    /**
     * Split this Interval into the specified number of smaller intervals.
     * @param {number} numberOfParts - The number of Intervals to divide the Interval into.
     * @return {Array}
     */
    divideEqually(numberOfParts) {
        if (!this.isValid)
            return [];
        return this.splitBy(this.length() / numberOfParts).slice(0, numberOfParts);
    }
    /**
     * Return whether this Interval overlaps with the specified Interval
     * @param {Interval} other
     * @return {boolean}
     */
    overlaps(other) {
        return this.e > other.s && this.s < other.e;
    }
    /**
     * Return whether this Interval's end is adjacent to the specified Interval's start.
     * @param {Interval} other
     * @return {boolean}
     */
    abutsStart(other) {
        if (!this.isValid)
            return false;
        return +this.e === +other.s;
    }
    /**
     * Return whether this Interval's start is adjacent to the specified Interval's end.
     * @param {Interval} other
     * @return {boolean}
     */
    abutsEnd(other) {
        if (!this.isValid)
            return false;
        return +other.e === +this.s;
    }
    /**
     * Return whether this Interval engulfs the start and end of the specified Interval.
     * @param {Interval} other
     * @return {boolean}
     */
    engulfs(other) {
        if (!this.isValid)
            return false;
        return this.s <= other.s && this.e >= other.e;
    }
    /**
     * Return whether this Interval has the same start and end as the specified Interval.
     * @param {Interval} other
     * @return {boolean}
     */
    equals(other) {
        if (!this.isValid || !other.isValid) {
            return false;
        }
        return this.s.equals(other.s) && this.e.equals(other.e);
    }
    /**
     * Return an Interval representing the intersection of this Interval and the specified Interval.
     * Specifically, the resulting Interval has the maximum start time and the minimum end time of the two Intervals.
     * Returns null if the intersection is empty, meaning, the intervals don't intersect.
     * @param {Interval} other
     * @return {Interval}
     */
    intersection(other) {
        if (!this.isValid)
            return this;
        const s = this.s > other.s ? this.s : other.s, e = this.e < other.e ? this.e : other.e;
        if (s >= e) {
            return null;
        }
        else {
            return Interval.fromDateTimes(s, e);
        }
    }
    /**
     * Return an Interval representing the union of this Interval and the specified Interval.
     * Specifically, the resulting Interval has the minimum start time and the maximum end time of the two Intervals.
     * @param {Interval} other
     * @return {Interval}
     */
    union(other) {
        if (!this.isValid)
            return this;
        const s = this.s < other.s ? this.s : other.s, e = this.e > other.e ? this.e : other.e;
        return Interval.fromDateTimes(s, e);
    }
    /**
     * Merge an array of Intervals into a equivalent minimal set of Intervals.
     * Combines overlapping and adjacent Intervals.
     * @param {Array} intervals
     * @return {Array}
     */
    static merge(intervals) {
        const [found, final] = intervals
            .sort((a, b) => a.s - b.s)
            .reduce(([sofar, current], item) => {
            if (!current) {
                return [sofar, item];
            }
            else if (current.overlaps(item) || current.abutsStart(item)) {
                return [sofar, current.union(item)];
            }
            else {
                return [sofar.concat([current]), item];
            }
        }, [[], null]);
        if (final) {
            found.push(final);
        }
        return found;
    }
    /**
     * Return an array of Intervals representing the spans of time that only appear in one of the specified Intervals.
     * @param {Array} intervals
     * @return {Array}
     */
    static xor(intervals) {
        let start = null, currentCount = 0;
        const results = [], ends = intervals.map((i) => [
            { time: i.s, type: "s" },
            { time: i.e, type: "e" },
        ]), flattened = Array.prototype.concat(...ends), arr = flattened.sort((a, b) => a.time - b.time);
        for (const i of arr) {
            currentCount += i.type === "s" ? 1 : -1;
            if (currentCount === 1) {
                start = i.time;
            }
            else {
                if (start && +start !== +i.time) {
                    results.push(Interval.fromDateTimes(start, i.time));
                }
                start = null;
            }
        }
        return Interval.merge(results);
    }
    /**
     * Return an Interval representing the span of time in this Interval that doesn't overlap with any of the specified Intervals.
     * @param {...Interval} intervals
     * @return {Array}
     */
    difference(...intervals) {
        return Interval.xor([this].concat(intervals))
            .map((i) => this.intersection(i))
            .filter((i) => i && !i.isEmpty());
    }
    /**
     * Returns a string representation of this Interval appropriate for debugging.
     * @return {string}
     */
    toString() {
        if (!this.isValid)
            return INVALID$1;
        return `[${this.s.toISO()} – ${this.e.toISO()})`;
    }
    /**
     * Returns an ISO 8601-compliant string representation of this Interval.
     * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
     * @param {Object} opts - The same options as {@link DateTime#toISO}
     * @return {string}
     */
    toISO(opts) {
        if (!this.isValid)
            return INVALID$1;
        return `${this.s.toISO(opts)}/${this.e.toISO(opts)}`;
    }
    /**
     * Returns an ISO 8601-compliant string representation of date of this Interval.
     * The time components are ignored.
     * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
     * @return {string}
     */
    toISODate() {
        if (!this.isValid)
            return INVALID$1;
        return `${this.s.toISODate()}/${this.e.toISODate()}`;
    }
    /**
     * Returns an ISO 8601-compliant string representation of time of this Interval.
     * The date components are ignored.
     * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
     * @param {Object} opts - The same options as {@link DateTime#toISO}
     * @return {string}
     */
    toISOTime(opts) {
        if (!this.isValid)
            return INVALID$1;
        return `${this.s.toISOTime(opts)}/${this.e.toISOTime(opts)}`;
    }
    /**
     * Returns a string representation of this Interval formatted according to the specified format string.
     * @param {string} dateFormat - the format string. This string formats the start and end time. See {@link DateTime#toFormat} for details.
     * @param {Object} opts - options
     * @param {string} [opts.separator =  ' – '] - a separator to place between the start and end representations
     * @return {string}
     */
    toFormat(dateFormat, { separator = " – " } = {}) {
        if (!this.isValid)
            return INVALID$1;
        return `${this.s.toFormat(dateFormat)}${separator}${this.e.toFormat(dateFormat)}`;
    }
    /**
     * Return a Duration representing the time spanned by this interval.
     * @param {string|string[]} [unit=['milliseconds']] - the unit or units (such as 'hours' or 'days') to include in the duration.
     * @param {Object} opts - options that affect the creation of the Duration
     * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
     * @example Interval.fromDateTimes(dt1, dt2).toDuration().toObject() //=> { milliseconds: 88489257 }
     * @example Interval.fromDateTimes(dt1, dt2).toDuration('days').toObject() //=> { days: 1.0241812152777778 }
     * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes']).toObject() //=> { hours: 24, minutes: 34.82095 }
     * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes', 'seconds']).toObject() //=> { hours: 24, minutes: 34, seconds: 49.257 }
     * @example Interval.fromDateTimes(dt1, dt2).toDuration('seconds').toObject() //=> { seconds: 88489.257 }
     * @return {Duration}
     */
    toDuration(unit, opts) {
        if (!this.isValid) {
            return Duration.invalid(this.invalidReason);
        }
        return this.e.diff(this.s, unit, opts);
    }
    /**
     * Run mapFn on the interval start and end, returning a new Interval from the resulting DateTimes
     * @param {function} mapFn
     * @return {Interval}
     * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.toUTC())
     * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.plus({ hours: 2 }))
     */
    mapEndpoints(mapFn) {
        return Interval.fromDateTimes(mapFn(this.s), mapFn(this.e));
    }
}
/**
 * The Info class contains static methods for retrieving general time and date related data. For example, it has methods for finding out if a time zone has a DST, for listing the months in any supported locale, and for discovering which of Luxon features are available in the current environment.
 */
class Info {
    /**
     * Return whether the specified zone contains a DST.
     * @param {string|Zone} [zone='local'] - Zone to check. Defaults to the environment's local zone.
     * @return {boolean}
     */
    static hasDST(zone = Settings.defaultZone) {
        const proto = DateTime.now().setZone(zone).set({ month: 12 });
        return !zone.isUniversal && proto.offset !== proto.set({ month: 6 }).offset;
    }
    /**
     * Return whether the specified zone is a valid IANA specifier.
     * @param {string} zone - Zone to check
     * @return {boolean}
     */
    static isValidIANAZone(zone) {
        return IANAZone.isValidZone(zone);
    }
    /**
     * Converts the input into a {@link Zone} instance.
     *
     * * If `input` is already a Zone instance, it is returned unchanged.
     * * If `input` is a string containing a valid time zone name, a Zone instance
     *   with that name is returned.
     * * If `input` is a string that doesn't refer to a known time zone, a Zone
     *   instance with {@link Zone#isValid} == false is returned.
     * * If `input is a number, a Zone instance with the specified fixed offset
     *   in minutes is returned.
     * * If `input` is `null` or `undefined`, the default zone is returned.
     * @param {string|Zone|number} [input] - the value to be converted
     * @return {Zone}
     */
    static normalizeZone(input) {
        return normalizeZone(input, Settings.defaultZone);
    }
    /**
     * Return an array of standalone month names.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
     * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
     * @param {Object} opts - options
     * @param {string} [opts.locale] - the locale code
     * @param {string} [opts.numberingSystem=null] - the numbering system
     * @param {string} [opts.locObj=null] - an existing locale object to use
     * @param {string} [opts.outputCalendar='gregory'] - the calendar
     * @example Info.months()[0] //=> 'January'
     * @example Info.months('short')[0] //=> 'Jan'
     * @example Info.months('numeric')[0] //=> '1'
     * @example Info.months('short', { locale: 'fr-CA' } )[0] //=> 'janv.'
     * @example Info.months('numeric', { locale: 'ar' })[0] //=> '١'
     * @example Info.months('long', { outputCalendar: 'islamic' })[0] //=> 'Rabiʻ I'
     * @return {Array}
     */
    static months(length = "long", { locale = null, numberingSystem = null, locObj = null, outputCalendar = "gregory" } = {}) {
        return (locObj || Locale.create(locale, numberingSystem, outputCalendar)).months(length);
    }
    /**
     * Return an array of format month names.
     * Format months differ from standalone months in that they're meant to appear next to the day of the month. In some languages, that
     * changes the string.
     * See {@link Info#months}
     * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
     * @param {Object} opts - options
     * @param {string} [opts.locale] - the locale code
     * @param {string} [opts.numberingSystem=null] - the numbering system
     * @param {string} [opts.locObj=null] - an existing locale object to use
     * @param {string} [opts.outputCalendar='gregory'] - the calendar
     * @return {Array}
     */
    static monthsFormat(length = "long", { locale = null, numberingSystem = null, locObj = null, outputCalendar = "gregory" } = {}) {
        return (locObj || Locale.create(locale, numberingSystem, outputCalendar)).months(length, true);
    }
    /**
     * Return an array of standalone week names.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
     * @param {string} [length='long'] - the length of the weekday representation, such as "narrow", "short", "long".
     * @param {Object} opts - options
     * @param {string} [opts.locale] - the locale code
     * @param {string} [opts.numberingSystem=null] - the numbering system
     * @param {string} [opts.locObj=null] - an existing locale object to use
     * @example Info.weekdays()[0] //=> 'Monday'
     * @example Info.weekdays('short')[0] //=> 'Mon'
     * @example Info.weekdays('short', { locale: 'fr-CA' })[0] //=> 'lun.'
     * @example Info.weekdays('short', { locale: 'ar' })[0] //=> 'الاثنين'
     * @return {Array}
     */
    static weekdays(length = "long", { locale = null, numberingSystem = null, locObj = null } = {}) {
        return (locObj || Locale.create(locale, numberingSystem, null)).weekdays(length);
    }
    /**
     * Return an array of format week names.
     * Format weekdays differ from standalone weekdays in that they're meant to appear next to more date information. In some languages, that
     * changes the string.
     * See {@link Info#weekdays}
     * @param {string} [length='long'] - the length of the month representation, such as "narrow", "short", "long".
     * @param {Object} opts - options
     * @param {string} [opts.locale=null] - the locale code
     * @param {string} [opts.numberingSystem=null] - the numbering system
     * @param {string} [opts.locObj=null] - an existing locale object to use
     * @return {Array}
     */
    static weekdaysFormat(length = "long", { locale = null, numberingSystem = null, locObj = null } = {}) {
        return (locObj || Locale.create(locale, numberingSystem, null)).weekdays(length, true);
    }
    /**
     * Return an array of meridiems.
     * @param {Object} opts - options
     * @param {string} [opts.locale] - the locale code
     * @example Info.meridiems() //=> [ 'AM', 'PM' ]
     * @example Info.meridiems({ locale: 'my' }) //=> [ 'နံနက်', 'ညနေ' ]
     * @return {Array}
     */
    static meridiems({ locale = null } = {}) {
        return Locale.create(locale).meridiems();
    }
    /**
     * Return an array of eras, such as ['BC', 'AD']. The locale can be specified, but the calendar system is always Gregorian.
     * @param {string} [length='short'] - the length of the era representation, such as "short" or "long".
     * @param {Object} opts - options
     * @param {string} [opts.locale] - the locale code
     * @example Info.eras() //=> [ 'BC', 'AD' ]
     * @example Info.eras('long') //=> [ 'Before Christ', 'Anno Domini' ]
     * @example Info.eras('long', { locale: 'fr' }) //=> [ 'avant Jésus-Christ', 'après Jésus-Christ' ]
     * @return {Array}
     */
    static eras(length = "short", { locale = null } = {}) {
        return Locale.create(locale, null, "gregory").eras(length);
    }
    /**
     * Return the set of available features in this environment.
     * Some features of Luxon are not available in all environments. For example, on older browsers, relative time formatting support is not available. Use this function to figure out if that's the case.
     * Keys:
     * * `relative`: whether this environment supports relative time formatting
     * @example Info.features() //=> { relative: false }
     * @return {Object}
     */
    static features() {
        return { relative: hasRelative() };
    }
}
function dayDiff(earlier, later) {
    const utcDayStart = (dt) => dt.toUTC(0, { keepLocalTime: true }).startOf("day").valueOf(), ms = utcDayStart(later) - utcDayStart(earlier);
    return Math.floor(Duration.fromMillis(ms).as("days"));
}
function highOrderDiffs(cursor, later, units) {
    const differs = [
        ["years", (a, b) => b.year - a.year],
        ["quarters", (a, b) => b.quarter - a.quarter],
        ["months", (a, b) => b.month - a.month + (b.year - a.year) * 12],
        [
            "weeks",
            (a, b) => {
                const days = dayDiff(a, b);
                return (days - (days % 7)) / 7;
            },
        ],
        ["days", dayDiff],
    ];
    const results = {};
    let lowestOrder, highWater;
    for (const [unit, differ] of differs) {
        if (units.indexOf(unit) >= 0) {
            lowestOrder = unit;
            let delta = differ(cursor, later);
            highWater = cursor.plus({ [unit]: delta });
            if (highWater > later) {
                cursor = cursor.plus({ [unit]: delta - 1 });
                delta -= 1;
            }
            else {
                cursor = highWater;
            }
            results[unit] = delta;
        }
    }
    return [cursor, results, highWater, lowestOrder];
}
function diff(earlier, later, units, opts) {
    let [cursor, results, highWater, lowestOrder] = highOrderDiffs(earlier, later, units);
    const remainingMillis = later - cursor;
    const lowerOrderUnits = units.filter((u) => ["hours", "minutes", "seconds", "milliseconds"].indexOf(u) >= 0);
    if (lowerOrderUnits.length === 0) {
        if (highWater < later) {
            highWater = cursor.plus({ [lowestOrder]: 1 });
        }
        if (highWater !== cursor) {
            results[lowestOrder] = (results[lowestOrder] || 0) + remainingMillis / (highWater - cursor);
        }
    }
    const duration = Duration.fromObject(results, opts);
    if (lowerOrderUnits.length > 0) {
        return Duration.fromMillis(remainingMillis, opts)
            .shiftTo(...lowerOrderUnits)
            .plus(duration);
    }
    else {
        return duration;
    }
}
const numberingSystems = {
    arab: "[\u0660-\u0669]",
    arabext: "[\u06F0-\u06F9]",
    bali: "[\u1B50-\u1B59]",
    beng: "[\u09E6-\u09EF]",
    deva: "[\u0966-\u096F]",
    fullwide: "[\uFF10-\uFF19]",
    gujr: "[\u0AE6-\u0AEF]",
    hanidec: "[〇|一|二|三|四|五|六|七|八|九]",
    khmr: "[\u17E0-\u17E9]",
    knda: "[\u0CE6-\u0CEF]",
    laoo: "[\u0ED0-\u0ED9]",
    limb: "[\u1946-\u194F]",
    mlym: "[\u0D66-\u0D6F]",
    mong: "[\u1810-\u1819]",
    mymr: "[\u1040-\u1049]",
    orya: "[\u0B66-\u0B6F]",
    tamldec: "[\u0BE6-\u0BEF]",
    telu: "[\u0C66-\u0C6F]",
    thai: "[\u0E50-\u0E59]",
    tibt: "[\u0F20-\u0F29]",
    latn: "\\d",
};
const numberingSystemsUTF16 = {
    arab: [1632, 1641],
    arabext: [1776, 1785],
    bali: [6992, 7001],
    beng: [2534, 2543],
    deva: [2406, 2415],
    fullwide: [65296, 65303],
    gujr: [2790, 2799],
    khmr: [6112, 6121],
    knda: [3302, 3311],
    laoo: [3792, 3801],
    limb: [6470, 6479],
    mlym: [3430, 3439],
    mong: [6160, 6169],
    mymr: [4160, 4169],
    orya: [2918, 2927],
    tamldec: [3046, 3055],
    telu: [3174, 3183],
    thai: [3664, 3673],
    tibt: [3872, 3881],
};
const hanidecChars = numberingSystems.hanidec.replace(/[\[|\]]/g, "").split("");
function parseDigits(str) {
    let value = parseInt(str, 10);
    if (isNaN(value)) {
        value = "";
        for (let i = 0; i < str.length; i++) {
            const code = str.charCodeAt(i);
            if (str[i].search(numberingSystems.hanidec) !== -1) {
                value += hanidecChars.indexOf(str[i]);
            }
            else {
                for (const key in numberingSystemsUTF16) {
                    const [min, max] = numberingSystemsUTF16[key];
                    if (code >= min && code <= max) {
                        value += code - min;
                    }
                }
            }
        }
        return parseInt(value, 10);
    }
    else {
        return value;
    }
}
function digitRegex({ numberingSystem }, append = "") {
    return new RegExp(`${numberingSystems[numberingSystem || "latn"]}${append}`);
}
const MISSING_FTP = "missing Intl.DateTimeFormat.formatToParts support";
function intUnit(regex, post = (i) => i) {
    return { regex, deser: ([s]) => post(parseDigits(s)) };
}
const NBSP = String.fromCharCode(160);
const spaceOrNBSP = `[ ${NBSP}]`;
const spaceOrNBSPRegExp = new RegExp(spaceOrNBSP, "g");
function fixListRegex(s) {
    // make dots optional and also make them literal
    // make space and non breakable space characters interchangeable
    return s.replace(/\./g, "\\.?").replace(spaceOrNBSPRegExp, spaceOrNBSP);
}
function stripInsensitivities(s) {
    return s
        .replace(/\./g, "") // ignore dots that were made optional
        .replace(spaceOrNBSPRegExp, " ") // interchange space and nbsp
        .toLowerCase();
}
function oneOf(strings, startIndex) {
    if (strings === null) {
        return null;
    }
    else {
        return {
            regex: RegExp(strings.map(fixListRegex).join("|")),
            deser: ([s]) => strings.findIndex((i) => stripInsensitivities(s) === stripInsensitivities(i)) + startIndex,
        };
    }
}
function offset(regex, groups) {
    return { regex, deser: ([, h, m]) => signedOffset(h, m), groups };
}
function simple(regex) {
    return { regex, deser: ([s]) => s };
}
function escapeToken(value) {
    return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
}
function unitForToken(token, loc) {
    const one = digitRegex(loc), two = digitRegex(loc, "{2}"), three = digitRegex(loc, "{3}"), four = digitRegex(loc, "{4}"), six = digitRegex(loc, "{6}"), oneOrTwo = digitRegex(loc, "{1,2}"), oneToThree = digitRegex(loc, "{1,3}"), oneToSix = digitRegex(loc, "{1,6}"), oneToNine = digitRegex(loc, "{1,9}"), twoToFour = digitRegex(loc, "{2,4}"), fourToSix = digitRegex(loc, "{4,6}"), literal = (t) => ({ regex: RegExp(escapeToken(t.val)), deser: ([s]) => s, literal: true }), unitate = (t) => {
        if (token.literal) {
            return literal(t);
        }
        switch (t.val) {
            // era
            case "G":
                return oneOf(loc.eras("short", false), 0);
            case "GG":
                return oneOf(loc.eras("long", false), 0);
            // years
            case "y":
                return intUnit(oneToSix);
            case "yy":
                return intUnit(twoToFour, untruncateYear);
            case "yyyy":
                return intUnit(four);
            case "yyyyy":
                return intUnit(fourToSix);
            case "yyyyyy":
                return intUnit(six);
            // months
            case "M":
                return intUnit(oneOrTwo);
            case "MM":
                return intUnit(two);
            case "MMM":
                return oneOf(loc.months("short", true, false), 1);
            case "MMMM":
                return oneOf(loc.months("long", true, false), 1);
            case "L":
                return intUnit(oneOrTwo);
            case "LL":
                return intUnit(two);
            case "LLL":
                return oneOf(loc.months("short", false, false), 1);
            case "LLLL":
                return oneOf(loc.months("long", false, false), 1);
            // dates
            case "d":
                return intUnit(oneOrTwo);
            case "dd":
                return intUnit(two);
            // ordinals
            case "o":
                return intUnit(oneToThree);
            case "ooo":
                return intUnit(three);
            // time
            case "HH":
                return intUnit(two);
            case "H":
                return intUnit(oneOrTwo);
            case "hh":
                return intUnit(two);
            case "h":
                return intUnit(oneOrTwo);
            case "mm":
                return intUnit(two);
            case "m":
                return intUnit(oneOrTwo);
            case "q":
                return intUnit(oneOrTwo);
            case "qq":
                return intUnit(two);
            case "s":
                return intUnit(oneOrTwo);
            case "ss":
                return intUnit(two);
            case "S":
                return intUnit(oneToThree);
            case "SSS":
                return intUnit(three);
            case "u":
                return simple(oneToNine);
            case "uu":
                return simple(oneOrTwo);
            case "uuu":
                return intUnit(one);
            // meridiem
            case "a":
                return oneOf(loc.meridiems(), 0);
            // weekYear (k)
            case "kkkk":
                return intUnit(four);
            case "kk":
                return intUnit(twoToFour, untruncateYear);
            // weekNumber (W)
            case "W":
                return intUnit(oneOrTwo);
            case "WW":
                return intUnit(two);
            // weekdays
            case "E":
            case "c":
                return intUnit(one);
            case "EEE":
                return oneOf(loc.weekdays("short", false, false), 1);
            case "EEEE":
                return oneOf(loc.weekdays("long", false, false), 1);
            case "ccc":
                return oneOf(loc.weekdays("short", true, false), 1);
            case "cccc":
                return oneOf(loc.weekdays("long", true, false), 1);
            // offset/zone
            case "Z":
            case "ZZ":
                return offset(new RegExp(`([+-]${oneOrTwo.source})(?::(${two.source}))?`), 2);
            case "ZZZ":
                return offset(new RegExp(`([+-]${oneOrTwo.source})(${two.source})?`), 2);
            // we don't support ZZZZ (PST) or ZZZZZ (Pacific Standard Time) in parsing
            // because we don't have any way to figure out what they are
            case "z":
                return simple(/[a-z_+-/]{1,256}?/i);
            default:
                return literal(t);
        }
    };
    const unit = unitate(token) || {
        invalidReason: MISSING_FTP,
    };
    unit.token = token;
    return unit;
}
const partTypeStyleToTokenVal = {
    year: {
        "2-digit": "yy",
        numeric: "yyyyy",
    },
    month: {
        numeric: "M",
        "2-digit": "MM",
        short: "MMM",
        long: "MMMM",
    },
    day: {
        numeric: "d",
        "2-digit": "dd",
    },
    weekday: {
        short: "EEE",
        long: "EEEE",
    },
    dayperiod: "a",
    dayPeriod: "a",
    hour: {
        numeric: "h",
        "2-digit": "hh",
    },
    minute: {
        numeric: "m",
        "2-digit": "mm",
    },
    second: {
        numeric: "s",
        "2-digit": "ss",
    },
};
function tokenForPart(part, locale, formatOpts) {
    const { type, value } = part;
    if (type === "literal") {
        return {
            literal: true,
            val: value,
        };
    }
    const style = formatOpts[type];
    let val = partTypeStyleToTokenVal[type];
    if (typeof val === "object") {
        val = val[style];
    }
    if (val) {
        return {
            literal: false,
            val,
        };
    }
    return undefined;
}
function buildRegex(units) {
    const re = units.map((u) => u.regex).reduce((f, r) => `${f}(${r.source})`, "");
    return [`^${re}$`, units];
}
function match(input, regex, handlers) {
    const matches = input.match(regex);
    if (matches) {
        const all = {};
        let matchIndex = 1;
        for (const i in handlers) {
            if (hasOwnProperty(handlers, i)) {
                const h = handlers[i], groups = h.groups ? h.groups + 1 : 1;
                if (!h.literal && h.token) {
                    all[h.token.val[0]] = h.deser(matches.slice(matchIndex, matchIndex + groups));
                }
                matchIndex += groups;
            }
        }
        return [matches, all];
    }
    else {
        return [matches, {}];
    }
}
function dateTimeFromMatches(matches) {
    const toField = (token) => {
        switch (token) {
            case "S":
                return "millisecond";
            case "s":
                return "second";
            case "m":
                return "minute";
            case "h":
            case "H":
                return "hour";
            case "d":
                return "day";
            case "o":
                return "ordinal";
            case "L":
            case "M":
                return "month";
            case "y":
                return "year";
            case "E":
            case "c":
                return "weekday";
            case "W":
                return "weekNumber";
            case "k":
                return "weekYear";
            case "q":
                return "quarter";
            default:
                return null;
        }
    };
    let zone = null;
    let specificOffset;
    if (!isUndefined(matches.z)) {
        zone = IANAZone.create(matches.z);
    }
    if (!isUndefined(matches.Z)) {
        if (!zone) {
            zone = new FixedOffsetZone(matches.Z);
        }
        specificOffset = matches.Z;
    }
    if (!isUndefined(matches.q)) {
        matches.M = (matches.q - 1) * 3 + 1;
    }
    if (!isUndefined(matches.h)) {
        if (matches.h < 12 && matches.a === 1) {
            matches.h += 12;
        }
        else if (matches.h === 12 && matches.a === 0) {
            matches.h = 0;
        }
    }
    if (matches.G === 0 && matches.y) {
        matches.y = -matches.y;
    }
    if (!isUndefined(matches.u)) {
        matches.S = parseMillis(matches.u);
    }
    const vals = Object.keys(matches).reduce((r, k) => {
        const f = toField(k);
        if (f) {
            r[f] = matches[k];
        }
        return r;
    }, {});
    return [vals, zone, specificOffset];
}
let dummyDateTimeCache = null;
function getDummyDateTime() {
    if (!dummyDateTimeCache) {
        dummyDateTimeCache = DateTime.fromMillis(1555555555555);
    }
    return dummyDateTimeCache;
}
function maybeExpandMacroToken(token, locale) {
    if (token.literal) {
        return token;
    }
    const formatOpts = Formatter.macroTokenToFormatOpts(token.val);
    if (!formatOpts) {
        return token;
    }
    const formatter = Formatter.create(locale, formatOpts);
    const parts = formatter.formatDateTimeParts(getDummyDateTime());
    const tokens = parts.map((p) => tokenForPart(p, locale, formatOpts));
    if (tokens.includes(undefined)) {
        return token;
    }
    return tokens;
}
function expandMacroTokens(tokens, locale) {
    return Array.prototype.concat(...tokens.map((t) => maybeExpandMacroToken(t, locale)));
}
/**
 * @private
 */
function explainFromTokens(locale, input, format) {
    const tokens = expandMacroTokens(Formatter.parseFormat(format), locale), units = tokens.map((t) => unitForToken(t, locale)), disqualifyingUnit = units.find((t) => t.invalidReason);
    if (disqualifyingUnit) {
        return { input, tokens, invalidReason: disqualifyingUnit.invalidReason };
    }
    else {
        const [regexString, handlers] = buildRegex(units), regex = RegExp(regexString, "i"), [rawMatches, matches] = match(input, regex, handlers), [result, zone, specificOffset] = matches
            ? dateTimeFromMatches(matches)
            : [null, null, undefined];
        if (hasOwnProperty(matches, "a") && hasOwnProperty(matches, "H")) {
            throw new ConflictingSpecificationError("Can't include meridiem when specifying 24-hour format");
        }
        return { input, tokens, regex, rawMatches, matches, result, zone, specificOffset };
    }
}
function parseFromTokens(locale, input, format) {
    const { result, zone, specificOffset, invalidReason } = explainFromTokens(locale, input, format);
    return [result, zone, specificOffset, invalidReason];
}
const nonLeapLadder = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], leapLadder = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
function unitOutOfRange(unit, value) {
    return new Invalid("unit out of range", `you specified ${value} (of type ${typeof value}) as a ${unit}, which is invalid`);
}
function dayOfWeek(year, month, day) {
    const d = new Date(Date.UTC(year, month - 1, day));
    if (year < 100 && year >= 0) {
        d.setUTCFullYear(d.getUTCFullYear() - 1900);
    }
    const js = d.getUTCDay();
    return js === 0 ? 7 : js;
}
function computeOrdinal(year, month, day) {
    return day + (isLeapYear(year) ? leapLadder : nonLeapLadder)[month - 1];
}
function uncomputeOrdinal(year, ordinal) {
    const table = isLeapYear(year) ? leapLadder : nonLeapLadder, month0 = table.findIndex((i) => i < ordinal), day = ordinal - table[month0];
    return { month: month0 + 1, day };
}
/**
 * @private
 */
function gregorianToWeek(gregObj) {
    const { year, month, day } = gregObj, ordinal = computeOrdinal(year, month, day), weekday = dayOfWeek(year, month, day);
    let weekNumber = Math.floor((ordinal - weekday + 10) / 7), weekYear;
    if (weekNumber < 1) {
        weekYear = year - 1;
        weekNumber = weeksInWeekYear(weekYear);
    }
    else if (weekNumber > weeksInWeekYear(year)) {
        weekYear = year + 1;
        weekNumber = 1;
    }
    else {
        weekYear = year;
    }
    return Object.assign({ weekYear, weekNumber, weekday }, timeObject(gregObj));
}
function weekToGregorian(weekData) {
    const { weekYear, weekNumber, weekday } = weekData, weekdayOfJan4 = dayOfWeek(weekYear, 1, 4), yearInDays = daysInYear(weekYear);
    let ordinal = weekNumber * 7 + weekday - weekdayOfJan4 - 3, year;
    if (ordinal < 1) {
        year = weekYear - 1;
        ordinal += daysInYear(year);
    }
    else if (ordinal > yearInDays) {
        year = weekYear + 1;
        ordinal -= daysInYear(weekYear);
    }
    else {
        year = weekYear;
    }
    const { month, day } = uncomputeOrdinal(year, ordinal);
    return Object.assign({ year, month, day }, timeObject(weekData));
}
function gregorianToOrdinal(gregData) {
    const { year, month, day } = gregData;
    const ordinal = computeOrdinal(year, month, day);
    return Object.assign({ year, ordinal }, timeObject(gregData));
}
function ordinalToGregorian(ordinalData) {
    const { year, ordinal } = ordinalData;
    const { month, day } = uncomputeOrdinal(year, ordinal);
    return Object.assign({ year, month, day }, timeObject(ordinalData));
}
function hasInvalidWeekData(obj) {
    const validYear = isInteger(obj.weekYear), validWeek = integerBetween(obj.weekNumber, 1, weeksInWeekYear(obj.weekYear)), validWeekday = integerBetween(obj.weekday, 1, 7);
    if (!validYear) {
        return unitOutOfRange("weekYear", obj.weekYear);
    }
    else if (!validWeek) {
        return unitOutOfRange("week", obj.week);
    }
    else if (!validWeekday) {
        return unitOutOfRange("weekday", obj.weekday);
    }
    else
        return false;
}
function hasInvalidOrdinalData(obj) {
    const validYear = isInteger(obj.year), validOrdinal = integerBetween(obj.ordinal, 1, daysInYear(obj.year));
    if (!validYear) {
        return unitOutOfRange("year", obj.year);
    }
    else if (!validOrdinal) {
        return unitOutOfRange("ordinal", obj.ordinal);
    }
    else
        return false;
}
function hasInvalidGregorianData(obj) {
    const validYear = isInteger(obj.year), validMonth = integerBetween(obj.month, 1, 12), validDay = integerBetween(obj.day, 1, daysInMonth(obj.year, obj.month));
    if (!validYear) {
        return unitOutOfRange("year", obj.year);
    }
    else if (!validMonth) {
        return unitOutOfRange("month", obj.month);
    }
    else if (!validDay) {
        return unitOutOfRange("day", obj.day);
    }
    else
        return false;
}
function hasInvalidTimeData(obj) {
    const { hour, minute, second, millisecond } = obj;
    const validHour = integerBetween(hour, 0, 23) ||
        (hour === 24 && minute === 0 && second === 0 && millisecond === 0), validMinute = integerBetween(minute, 0, 59), validSecond = integerBetween(second, 0, 59), validMillisecond = integerBetween(millisecond, 0, 999);
    if (!validHour) {
        return unitOutOfRange("hour", hour);
    }
    else if (!validMinute) {
        return unitOutOfRange("minute", minute);
    }
    else if (!validSecond) {
        return unitOutOfRange("second", second);
    }
    else if (!validMillisecond) {
        return unitOutOfRange("millisecond", millisecond);
    }
    else
        return false;
}
const INVALID = "Invalid DateTime";
const MAX_DATE = 8.64e15;
function unsupportedZone(zone) {
    return new Invalid("unsupported zone", `the zone "${zone.name}" is not supported`);
}
// we cache week data on the DT object and this intermediates the cache
function possiblyCachedWeekData(dt) {
    if (dt.weekData === null) {
        dt.weekData = gregorianToWeek(dt.c);
    }
    return dt.weekData;
}
// clone really means, "make a new object with these modifications". all "setters" really use this
// to create a new object while only changing some of the properties
function clone(inst, alts) {
    const current = {
        ts: inst.ts,
        zone: inst.zone,
        c: inst.c,
        o: inst.o,
        loc: inst.loc,
        invalid: inst.invalid,
    };
    return new DateTime(Object.assign(Object.assign(Object.assign({}, current), alts), { old: current }));
}
// find the right offset a given local time. The o input is our guess, which determines which
// offset we'll pick in ambiguous cases (e.g. there are two 3 AMs b/c Fallback DST)
function fixOffset(localTS, o, tz) {
    // Our UTC time is just a guess because our offset is just a guess
    let utcGuess = localTS - o * 60 * 1000;
    // Test whether the zone matches the offset for this ts
    const o2 = tz.offset(utcGuess);
    // If so, offset didn't change and we're done
    if (o === o2) {
        return [utcGuess, o];
    }
    // If not, change the ts by the difference in the offset
    utcGuess -= (o2 - o) * 60 * 1000;
    // If that gives us the local time we want, we're done
    const o3 = tz.offset(utcGuess);
    if (o2 === o3) {
        return [utcGuess, o2];
    }
    // If it's different, we're in a hole time. The offset has changed, but the we don't adjust the time
    return [localTS - Math.min(o2, o3) * 60 * 1000, Math.max(o2, o3)];
}
// convert an epoch timestamp into a calendar object with the given offset
function tsToObj(ts, offset) {
    ts += offset * 60 * 1000;
    const d = new Date(ts);
    return {
        year: d.getUTCFullYear(),
        month: d.getUTCMonth() + 1,
        day: d.getUTCDate(),
        hour: d.getUTCHours(),
        minute: d.getUTCMinutes(),
        second: d.getUTCSeconds(),
        millisecond: d.getUTCMilliseconds(),
    };
}
// convert a calendar object to a epoch timestamp
function objToTS(obj, offset, zone) {
    return fixOffset(objToLocalTS(obj), offset, zone);
}
// create a new DT instance by adding a duration, adjusting for DSTs
function adjustTime(inst, dur) {
    const oPre = inst.o, year = inst.c.year + Math.trunc(dur.years), month = inst.c.month + Math.trunc(dur.months) + Math.trunc(dur.quarters) * 3, c = Object.assign(Object.assign({}, inst.c), { year,
        month, day: Math.min(inst.c.day, daysInMonth(year, month)) +
            Math.trunc(dur.days) +
            Math.trunc(dur.weeks) * 7 }), millisToAdd = Duration.fromObject({
        years: dur.years - Math.trunc(dur.years),
        quarters: dur.quarters - Math.trunc(dur.quarters),
        months: dur.months - Math.trunc(dur.months),
        weeks: dur.weeks - Math.trunc(dur.weeks),
        days: dur.days - Math.trunc(dur.days),
        hours: dur.hours,
        minutes: dur.minutes,
        seconds: dur.seconds,
        milliseconds: dur.milliseconds,
    }).as("milliseconds"), localTS = objToLocalTS(c);
    let [ts, o] = fixOffset(localTS, oPre, inst.zone);
    if (millisToAdd !== 0) {
        ts += millisToAdd;
        // that could have changed the offset by going over a DST, but we want to keep the ts the same
        o = inst.zone.offset(ts);
    }
    return { ts, o };
}
// helper useful in turning the results of parsing into real dates
// by handling the zone options
function parseDataToDateTime(parsed, parsedZone, opts, format, text, specificOffset) {
    const { setZone, zone } = opts;
    if (parsed && Object.keys(parsed).length !== 0) {
        const interpretationZone = parsedZone || zone, inst = DateTime.fromObject(parsed, Object.assign(Object.assign({}, opts), { zone: interpretationZone, specificOffset }));
        return setZone ? inst : inst.setZone(zone);
    }
    else {
        return DateTime.invalid(new Invalid("unparsable", `the input "${text}" can't be parsed as ${format}`));
    }
}
// if you want to output a technical format (e.g. RFC 2822), this helper
// helps handle the details
function toTechFormat(dt, format, allowZ = true) {
    return dt.isValid
        ? Formatter.create(Locale.create("en-US"), {
            allowZ,
            forceSimple: true,
        }).formatDateTimeFromString(dt, format)
        : null;
}
function toISODate(o, extended) {
    const longFormat = o.c.year > 9999 || o.c.year < 0;
    let c = "";
    if (longFormat && o.c.year >= 0)
        c += "+";
    c += padStart(o.c.year, longFormat ? 6 : 4);
    if (extended) {
        c += "-";
        c += padStart(o.c.month);
        c += "-";
        c += padStart(o.c.day);
    }
    else {
        c += padStart(o.c.month);
        c += padStart(o.c.day);
    }
    return c;
}
function toISOTime(o, extended, suppressSeconds, suppressMilliseconds, includeOffset, extendedZone) {
    let c = padStart(o.c.hour);
    if (extended) {
        c += ":";
        c += padStart(o.c.minute);
        if (o.c.second !== 0 || !suppressSeconds) {
            c += ":";
        }
    }
    else {
        c += padStart(o.c.minute);
    }
    if (o.c.second !== 0 || !suppressSeconds) {
        c += padStart(o.c.second);
        if (o.c.millisecond !== 0 || !suppressMilliseconds) {
            c += ".";
            c += padStart(o.c.millisecond, 3);
        }
    }
    if (includeOffset) {
        if (o.isOffsetFixed && o.offset === 0 && !extendedZone) {
            c += "Z";
        }
        else if (o.o < 0) {
            c += "-";
            c += padStart(Math.trunc(-o.o / 60));
            c += ":";
            c += padStart(Math.trunc(-o.o % 60));
        }
        else {
            c += "+";
            c += padStart(Math.trunc(o.o / 60));
            c += ":";
            c += padStart(Math.trunc(o.o % 60));
        }
    }
    if (extendedZone) {
        c += "[" + o.zone.ianaName + "]";
    }
    return c;
}
// defaults for unspecified units in the supported calendars
const defaultUnitValues = {
    month: 1,
    day: 1,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
}, defaultWeekUnitValues = {
    weekNumber: 1,
    weekday: 1,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
}, defaultOrdinalUnitValues = {
    ordinal: 1,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
};
// Units in the supported calendars, sorted by bigness
const orderedUnits = ["year", "month", "day", "hour", "minute", "second", "millisecond"], orderedWeekUnits = [
    "weekYear",
    "weekNumber",
    "weekday",
    "hour",
    "minute",
    "second",
    "millisecond",
], orderedOrdinalUnits = ["year", "ordinal", "hour", "minute", "second", "millisecond"];
// standardize case and plurality in units
function normalizeUnit(unit) {
    const normalized = {
        year: "year",
        years: "year",
        month: "month",
        months: "month",
        day: "day",
        days: "day",
        hour: "hour",
        hours: "hour",
        minute: "minute",
        minutes: "minute",
        quarter: "quarter",
        quarters: "quarter",
        second: "second",
        seconds: "second",
        millisecond: "millisecond",
        milliseconds: "millisecond",
        weekday: "weekday",
        weekdays: "weekday",
        weeknumber: "weekNumber",
        weeksnumber: "weekNumber",
        weeknumbers: "weekNumber",
        weekyear: "weekYear",
        weekyears: "weekYear",
        ordinal: "ordinal",
    }[unit.toLowerCase()];
    if (!normalized)
        throw new InvalidUnitError(unit);
    return normalized;
}
// this is a dumbed down version of fromObject() that runs about 60% faster
// but doesn't do any validation, makes a bunch of assumptions about what units
// are present, and so on.
function quickDT(obj, opts) {
    const zone = normalizeZone(opts.zone, Settings.defaultZone), loc = Locale.fromObject(opts), tsNow = Settings.now();
    let ts, o;
    // assume we have the higher-order units
    if (!isUndefined(obj.year)) {
        for (const u of orderedUnits) {
            if (isUndefined(obj[u])) {
                obj[u] = defaultUnitValues[u];
            }
        }
        const invalid = hasInvalidGregorianData(obj) || hasInvalidTimeData(obj);
        if (invalid) {
            return DateTime.invalid(invalid);
        }
        const offsetProvis = zone.offset(tsNow);
        [ts, o] = objToTS(obj, offsetProvis, zone);
    }
    else {
        ts = tsNow;
    }
    return new DateTime({ ts, zone, loc, o });
}
function diffRelative(start, end, opts) {
    const round = isUndefined(opts.round) ? true : opts.round, format = (c, unit) => {
        c = roundTo(c, round || opts.calendary ? 0 : 2, true);
        const formatter = end.loc.clone(opts).relFormatter(opts);
        return formatter.format(c, unit);
    }, differ = (unit) => {
        if (opts.calendary) {
            if (!end.hasSame(start, unit)) {
                return end.startOf(unit).diff(start.startOf(unit), unit).get(unit);
            }
            else
                return 0;
        }
        else {
            return end.diff(start, unit).get(unit);
        }
    };
    if (opts.unit) {
        return format(differ(opts.unit), opts.unit);
    }
    for (const unit of opts.units) {
        const count = differ(unit);
        if (Math.abs(count) >= 1) {
            return format(count, unit);
        }
    }
    return format(start > end ? -0 : 0, opts.units[opts.units.length - 1]);
}
function lastOpts(argList) {
    let opts = {}, args;
    if (argList.length > 0 && typeof argList[argList.length - 1] === "object") {
        opts = argList[argList.length - 1];
        args = Array.from(argList).slice(0, argList.length - 1);
    }
    else {
        args = Array.from(argList);
    }
    return [opts, args];
}
/**
 * A DateTime is an immutable data structure representing a specific date and time and accompanying methods. It contains class and instance methods for creating, parsing, interrogating, transforming, and formatting them.
 *
 * A DateTime comprises of:
 * * A timestamp. Each DateTime instance refers to a specific millisecond of the Unix epoch.
 * * A time zone. Each instance is considered in the context of a specific zone (by default the local system's zone).
 * * Configuration properties that effect how output strings are formatted, such as `locale`, `numberingSystem`, and `outputCalendar`.
 *
 * Here is a brief overview of the most commonly used functionality it provides:
 *
 * * **Creation**: To create a DateTime from its components, use one of its factory class methods: {@link DateTime#local}, {@link DateTime#utc}, and (most flexibly) {@link DateTime#fromObject}. To create one from a standard string format, use {@link DateTime#fromISO}, {@link DateTime#fromHTTP}, and {@link DateTime#fromRFC2822}. To create one from a custom string format, use {@link DateTime#fromFormat}. To create one from a native JS date, use {@link DateTime#fromJSDate}.
 * * **Gregorian calendar and time**: To examine the Gregorian properties of a DateTime individually (i.e as opposed to collectively through {@link DateTime#toObject}), use the {@link DateTime#year}, {@link DateTime#month},
 * {@link DateTime#day}, {@link DateTime#hour}, {@link DateTime#minute}, {@link DateTime#second}, {@link DateTime#millisecond} accessors.
 * * **Week calendar**: For ISO week calendar attributes, see the {@link DateTime#weekYear}, {@link DateTime#weekNumber}, and {@link DateTime#weekday} accessors.
 * * **Configuration** See the {@link DateTime#locale} and {@link DateTime#numberingSystem} accessors.
 * * **Transformation**: To transform the DateTime into other DateTimes, use {@link DateTime#set}, {@link DateTime#reconfigure}, {@link DateTime#setZone}, {@link DateTime#setLocale}, {@link DateTime.plus}, {@link DateTime#minus}, {@link DateTime#endOf}, {@link DateTime#startOf}, {@link DateTime#toUTC}, and {@link DateTime#toLocal}.
 * * **Output**: To convert the DateTime to other representations, use the {@link DateTime#toRelative}, {@link DateTime#toRelativeCalendar}, {@link DateTime#toJSON}, {@link DateTime#toISO}, {@link DateTime#toHTTP}, {@link DateTime#toObject}, {@link DateTime#toRFC2822}, {@link DateTime#toString}, {@link DateTime#toLocaleString}, {@link DateTime#toFormat}, {@link DateTime#toMillis} and {@link DateTime#toJSDate}.
 *
 * There's plenty others documented below. In addition, for more information on subtler topics like internationalization, time zones, alternative calendars, validity, and so on, see the external documentation.
 */
class DateTime {
    /**
     * @access private
     */
    constructor(config) {
        const zone = config.zone || Settings.defaultZone;
        let invalid = config.invalid ||
            (Number.isNaN(config.ts) ? new Invalid("invalid input") : null) ||
            (!zone.isValid ? unsupportedZone(zone) : null);
        /**
         * @access private
         */
        this.ts = isUndefined(config.ts) ? Settings.now() : config.ts;
        let c = null, o = null;
        if (!invalid) {
            const unchanged = config.old && config.old.ts === this.ts && config.old.zone.equals(zone);
            if (unchanged) {
                [c, o] = [config.old.c, config.old.o];
            }
            else {
                const ot = zone.offset(this.ts);
                c = tsToObj(this.ts, ot);
                invalid = Number.isNaN(c.year) ? new Invalid("invalid input") : null;
                c = invalid ? null : c;
                o = invalid ? null : ot;
            }
        }
        /**
         * @access private
         */
        this._zone = zone;
        /**
         * @access private
         */
        this.loc = config.loc || Locale.create();
        /**
         * @access private
         */
        this.invalid = invalid;
        /**
         * @access private
         */
        this.weekData = null;
        /**
         * @access private
         */
        this.c = c;
        /**
         * @access private
         */
        this.o = o;
        /**
         * @access private
         */
        this.isLuxonDateTime = true;
    }
    // CONSTRUCT
    /**
     * Create a DateTime for the current instant, in the system's time zone.
     *
     * Use Settings to override these default values if needed.
     * @example DateTime.now().toISO() //~> now in the ISO format
     * @return {DateTime}
     */
    static now() {
        return new DateTime({});
    }
    /**
     * Create a local DateTime
     * @param {number} [year] - The calendar year. If omitted (as in, call `local()` with no arguments), the current time will be used
     * @param {number} [month=1] - The month, 1-indexed
     * @param {number} [day=1] - The day of the month, 1-indexed
     * @param {number} [hour=0] - The hour of the day, in 24-hour time
     * @param {number} [minute=0] - The minute of the hour, meaning a number between 0 and 59
     * @param {number} [second=0] - The second of the minute, meaning a number between 0 and 59
     * @param {number} [millisecond=0] - The millisecond of the second, meaning a number between 0 and 999
     * @example DateTime.local()                                  //~> now
     * @example DateTime.local({ zone: "America/New_York" })      //~> now, in US east coast time
     * @example DateTime.local(2017)                              //~> 2017-01-01T00:00:00
     * @example DateTime.local(2017, 3)                           //~> 2017-03-01T00:00:00
     * @example DateTime.local(2017, 3, 12, { locale: "fr" })     //~> 2017-03-12T00:00:00, with a French locale
     * @example DateTime.local(2017, 3, 12, 5)                    //~> 2017-03-12T05:00:00
     * @example DateTime.local(2017, 3, 12, 5, { zone: "utc" })   //~> 2017-03-12T05:00:00, in UTC
     * @example DateTime.local(2017, 3, 12, 5, 45)                //~> 2017-03-12T05:45:00
     * @example DateTime.local(2017, 3, 12, 5, 45, 10)            //~> 2017-03-12T05:45:10
     * @example DateTime.local(2017, 3, 12, 5, 45, 10, 765)       //~> 2017-03-12T05:45:10.765
     * @return {DateTime}
     */
    static local() {
        const [opts, args] = lastOpts(arguments), [year, month, day, hour, minute, second, millisecond] = args;
        return quickDT({ year, month, day, hour, minute, second, millisecond }, opts);
    }
    /**
     * Create a DateTime in UTC
     * @param {number} [year] - The calendar year. If omitted (as in, call `utc()` with no arguments), the current time will be used
     * @param {number} [month=1] - The month, 1-indexed
     * @param {number} [day=1] - The day of the month
     * @param {number} [hour=0] - The hour of the day, in 24-hour time
     * @param {number} [minute=0] - The minute of the hour, meaning a number between 0 and 59
     * @param {number} [second=0] - The second of the minute, meaning a number between 0 and 59
     * @param {number} [millisecond=0] - The millisecond of the second, meaning a number between 0 and 999
     * @param {Object} options - configuration options for the DateTime
     * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
     * @param {string} [options.outputCalendar] - the output calendar to set on the resulting DateTime instance
     * @param {string} [options.numberingSystem] - the numbering system to set on the resulting DateTime instance
     * @example DateTime.utc()                                              //~> now
     * @example DateTime.utc(2017)                                          //~> 2017-01-01T00:00:00Z
     * @example DateTime.utc(2017, 3)                                       //~> 2017-03-01T00:00:00Z
     * @example DateTime.utc(2017, 3, 12)                                   //~> 2017-03-12T00:00:00Z
     * @example DateTime.utc(2017, 3, 12, 5)                                //~> 2017-03-12T05:00:00Z
     * @example DateTime.utc(2017, 3, 12, 5, 45)                            //~> 2017-03-12T05:45:00Z
     * @example DateTime.utc(2017, 3, 12, 5, 45, { locale: "fr" })          //~> 2017-03-12T05:45:00Z with a French locale
     * @example DateTime.utc(2017, 3, 12, 5, 45, 10)                        //~> 2017-03-12T05:45:10Z
     * @example DateTime.utc(2017, 3, 12, 5, 45, 10, 765, { locale: "fr" }) //~> 2017-03-12T05:45:10.765Z with a French locale
     * @return {DateTime}
     */
    static utc() {
        const [opts, args] = lastOpts(arguments), [year, month, day, hour, minute, second, millisecond] = args;
        opts.zone = FixedOffsetZone.utcInstance;
        return quickDT({ year, month, day, hour, minute, second, millisecond }, opts);
    }
    /**
     * Create a DateTime from a JavaScript Date object. Uses the default zone.
     * @param {Date} date - a JavaScript Date object
     * @param {Object} options - configuration options for the DateTime
     * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
     * @return {DateTime}
     */
    static fromJSDate(date, options = {}) {
        const ts = isDate(date) ? date.valueOf() : NaN;
        if (Number.isNaN(ts)) {
            return DateTime.invalid("invalid input");
        }
        const zoneToUse = normalizeZone(options.zone, Settings.defaultZone);
        if (!zoneToUse.isValid) {
            return DateTime.invalid(unsupportedZone(zoneToUse));
        }
        return new DateTime({
            ts: ts,
            zone: zoneToUse,
            loc: Locale.fromObject(options),
        });
    }
    /**
     * Create a DateTime from a number of milliseconds since the epoch (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
     * @param {number} milliseconds - a number of milliseconds since 1970 UTC
     * @param {Object} options - configuration options for the DateTime
     * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
     * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
     * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
     * @param {string} options.numberingSystem - the numbering system to set on the resulting DateTime instance
     * @return {DateTime}
     */
    static fromMillis(milliseconds, options = {}) {
        if (!isNumber(milliseconds)) {
            throw new InvalidArgumentError(`fromMillis requires a numerical input, but received a ${typeof milliseconds} with value ${milliseconds}`);
        }
        else if (milliseconds < -MAX_DATE || milliseconds > MAX_DATE) {
            // this isn't perfect because because we can still end up out of range because of additional shifting, but it's a start
            return DateTime.invalid("Timestamp out of range");
        }
        else {
            return new DateTime({
                ts: milliseconds,
                zone: normalizeZone(options.zone, Settings.defaultZone),
                loc: Locale.fromObject(options),
            });
        }
    }
    /**
     * Create a DateTime from a number of seconds since the epoch (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
     * @param {number} seconds - a number of seconds since 1970 UTC
     * @param {Object} options - configuration options for the DateTime
     * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
     * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
     * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
     * @param {string} options.numberingSystem - the numbering system to set on the resulting DateTime instance
     * @return {DateTime}
     */
    static fromSeconds(seconds, options = {}) {
        if (!isNumber(seconds)) {
            throw new InvalidArgumentError("fromSeconds requires a numerical input");
        }
        else {
            return new DateTime({
                ts: seconds * 1000,
                zone: normalizeZone(options.zone, Settings.defaultZone),
                loc: Locale.fromObject(options),
            });
        }
    }
    /**
     * Create a DateTime from a JavaScript object with keys like 'year' and 'hour' with reasonable defaults.
     * @param {Object} obj - the object to create the DateTime from
     * @param {number} obj.year - a year, such as 1987
     * @param {number} obj.month - a month, 1-12
     * @param {number} obj.day - a day of the month, 1-31, depending on the month
     * @param {number} obj.ordinal - day of the year, 1-365 or 366
     * @param {number} obj.weekYear - an ISO week year
     * @param {number} obj.weekNumber - an ISO week number, between 1 and 52 or 53, depending on the year
     * @param {number} obj.weekday - an ISO weekday, 1-7, where 1 is Monday and 7 is Sunday
     * @param {number} obj.hour - hour of the day, 0-23
     * @param {number} obj.minute - minute of the hour, 0-59
     * @param {number} obj.second - second of the minute, 0-59
     * @param {number} obj.millisecond - millisecond of the second, 0-999
     * @param {Object} opts - options for creating this DateTime
     * @param {string|Zone} [opts.zone='local'] - interpret the numbers in the context of a particular zone. Can take any value taken as the first argument to setZone()
     * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
     * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
     * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
     * @example DateTime.fromObject({ year: 1982, month: 5, day: 25}).toISODate() //=> '1982-05-25'
     * @example DateTime.fromObject({ year: 1982 }).toISODate() //=> '1982-01-01'
     * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }) //~> today at 10:26:06
     * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'utc' }),
     * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'local' })
     * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'America/New_York' })
     * @example DateTime.fromObject({ weekYear: 2016, weekNumber: 2, weekday: 3 }).toISODate() //=> '2016-01-13'
     * @return {DateTime}
     */
    static fromObject(obj, opts = {}) {
        obj = obj || {};
        const zoneToUse = normalizeZone(opts.zone, Settings.defaultZone);
        if (!zoneToUse.isValid) {
            return DateTime.invalid(unsupportedZone(zoneToUse));
        }
        const tsNow = Settings.now(), offsetProvis = !isUndefined(opts.specificOffset)
            ? opts.specificOffset
            : zoneToUse.offset(tsNow), normalized = normalizeObject(obj, normalizeUnit), containsOrdinal = !isUndefined(normalized.ordinal), containsGregorYear = !isUndefined(normalized.year), containsGregorMD = !isUndefined(normalized.month) || !isUndefined(normalized.day), containsGregor = containsGregorYear || containsGregorMD, definiteWeekDef = normalized.weekYear || normalized.weekNumber, loc = Locale.fromObject(opts);
        // cases:
        // just a weekday -> this week's instance of that weekday, no worries
        // (gregorian data or ordinal) + (weekYear or weekNumber) -> error
        // (gregorian month or day) + ordinal -> error
        // otherwise just use weeks or ordinals or gregorian, depending on what's specified
        if ((containsGregor || containsOrdinal) && definiteWeekDef) {
            throw new ConflictingSpecificationError("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
        }
        if (containsGregorMD && containsOrdinal) {
            throw new ConflictingSpecificationError("Can't mix ordinal dates with month/day");
        }
        const useWeekData = definiteWeekDef || (normalized.weekday && !containsGregor);
        // configure ourselves to deal with gregorian dates or week stuff
        let units, defaultValues, objNow = tsToObj(tsNow, offsetProvis);
        if (useWeekData) {
            units = orderedWeekUnits;
            defaultValues = defaultWeekUnitValues;
            objNow = gregorianToWeek(objNow);
        }
        else if (containsOrdinal) {
            units = orderedOrdinalUnits;
            defaultValues = defaultOrdinalUnitValues;
            objNow = gregorianToOrdinal(objNow);
        }
        else {
            units = orderedUnits;
            defaultValues = defaultUnitValues;
        }
        // set default values for missing stuff
        let foundFirst = false;
        for (const u of units) {
            const v = normalized[u];
            if (!isUndefined(v)) {
                foundFirst = true;
            }
            else if (foundFirst) {
                normalized[u] = defaultValues[u];
            }
            else {
                normalized[u] = objNow[u];
            }
        }
        // make sure the values we have are in range
        const higherOrderInvalid = useWeekData
            ? hasInvalidWeekData(normalized)
            : containsOrdinal
                ? hasInvalidOrdinalData(normalized)
                : hasInvalidGregorianData(normalized), invalid = higherOrderInvalid || hasInvalidTimeData(normalized);
        if (invalid) {
            return DateTime.invalid(invalid);
        }
        // compute the actual time
        const gregorian = useWeekData
            ? weekToGregorian(normalized)
            : containsOrdinal
                ? ordinalToGregorian(normalized)
                : normalized, [tsFinal, offsetFinal] = objToTS(gregorian, offsetProvis, zoneToUse), inst = new DateTime({
            ts: tsFinal,
            zone: zoneToUse,
            o: offsetFinal,
            loc,
        });
        // gregorian data + weekday serves only to validate
        if (normalized.weekday && containsGregor && obj.weekday !== inst.weekday) {
            return DateTime.invalid("mismatched weekday", `you can't specify both a weekday of ${normalized.weekday} and a date of ${inst.toISO()}`);
        }
        return inst;
    }
    /**
     * Create a DateTime from an ISO 8601 string
     * @param {string} text - the ISO string
     * @param {Object} opts - options to affect the creation
     * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the time to this zone
     * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
     * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
     * @param {string} [opts.outputCalendar] - the output calendar to set on the resulting DateTime instance
     * @param {string} [opts.numberingSystem] - the numbering system to set on the resulting DateTime instance
     * @example DateTime.fromISO('2016-05-25T09:08:34.123')
     * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00')
     * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00', {setZone: true})
     * @example DateTime.fromISO('2016-05-25T09:08:34.123', {zone: 'utc'})
     * @example DateTime.fromISO('2016-W05-4')
     * @return {DateTime}
     */
    static fromISO(text, opts = {}) {
        const [vals, parsedZone] = parseISODate(text);
        return parseDataToDateTime(vals, parsedZone, opts, "ISO 8601", text);
    }
    /**
     * Create a DateTime from an RFC 2822 string
     * @param {string} text - the RFC 2822 string
     * @param {Object} opts - options to affect the creation
     * @param {string|Zone} [opts.zone='local'] - convert the time to this zone. Since the offset is always specified in the string itself, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
     * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
     * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
     * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
     * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
     * @example DateTime.fromRFC2822('25 Nov 2016 13:23:12 GMT')
     * @example DateTime.fromRFC2822('Fri, 25 Nov 2016 13:23:12 +0600')
     * @example DateTime.fromRFC2822('25 Nov 2016 13:23 Z')
     * @return {DateTime}
     */
    static fromRFC2822(text, opts = {}) {
        const [vals, parsedZone] = parseRFC2822Date(text);
        return parseDataToDateTime(vals, parsedZone, opts, "RFC 2822", text);
    }
    /**
     * Create a DateTime from an HTTP header date
     * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
     * @param {string} text - the HTTP header date
     * @param {Object} opts - options to affect the creation
     * @param {string|Zone} [opts.zone='local'] - convert the time to this zone. Since HTTP dates are always in UTC, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
     * @param {boolean} [opts.setZone=false] - override the zone with the fixed-offset zone specified in the string. For HTTP dates, this is always UTC, so this option is equivalent to setting the `zone` option to 'utc', but this option is included for consistency with similar methods.
     * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
     * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
     * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
     * @example DateTime.fromHTTP('Sun, 06 Nov 1994 08:49:37 GMT')
     * @example DateTime.fromHTTP('Sunday, 06-Nov-94 08:49:37 GMT')
     * @example DateTime.fromHTTP('Sun Nov  6 08:49:37 1994')
     * @return {DateTime}
     */
    static fromHTTP(text, opts = {}) {
        const [vals, parsedZone] = parseHTTPDate(text);
        return parseDataToDateTime(vals, parsedZone, opts, "HTTP", opts);
    }
    /**
     * Create a DateTime from an input string and format string.
     * Defaults to en-US if no locale has been specified, regardless of the system's locale. For a table of tokens and their interpretations, see [here](https://moment.github.io/luxon/#/parsing?id=table-of-tokens).
     * @param {string} text - the string to parse
     * @param {string} fmt - the format the string is expected to be in (see the link below for the formats)
     * @param {Object} opts - options to affect the creation
     * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
     * @param {boolean} [opts.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
     * @param {string} [opts.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
     * @param {string} opts.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
     * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
     * @return {DateTime}
     */
    static fromFormat(text, fmt, opts = {}) {
        if (isUndefined(text) || isUndefined(fmt)) {
            throw new InvalidArgumentError("fromFormat requires an input string and a format");
        }
        const { locale = null, numberingSystem = null } = opts, localeToUse = Locale.fromOpts({
            locale,
            numberingSystem,
            defaultToEN: true,
        }), [vals, parsedZone, specificOffset, invalid] = parseFromTokens(localeToUse, text, fmt);
        if (invalid) {
            return DateTime.invalid(invalid);
        }
        else {
            return parseDataToDateTime(vals, parsedZone, opts, `format ${fmt}`, text, specificOffset);
        }
    }
    /**
     * @deprecated use fromFormat instead
     */
    static fromString(text, fmt, opts = {}) {
        return DateTime.fromFormat(text, fmt, opts);
    }
    /**
     * Create a DateTime from a SQL date, time, or datetime
     * Defaults to en-US if no locale has been specified, regardless of the system's locale
     * @param {string} text - the string to parse
     * @param {Object} opts - options to affect the creation
     * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
     * @param {boolean} [opts.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
     * @param {string} [opts.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
     * @param {string} opts.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
     * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
     * @example DateTime.fromSQL('2017-05-15')
     * @example DateTime.fromSQL('2017-05-15 09:12:34')
     * @example DateTime.fromSQL('2017-05-15 09:12:34.342')
     * @example DateTime.fromSQL('2017-05-15 09:12:34.342+06:00')
     * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles')
     * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles', { setZone: true })
     * @example DateTime.fromSQL('2017-05-15 09:12:34.342', { zone: 'America/Los_Angeles' })
     * @example DateTime.fromSQL('09:12:34.342')
     * @return {DateTime}
     */
    static fromSQL(text, opts = {}) {
        const [vals, parsedZone] = parseSQL(text);
        return parseDataToDateTime(vals, parsedZone, opts, "SQL", text);
    }
    /**
     * Create an invalid DateTime.
     * @param {string} reason - simple string of why this DateTime is invalid. Should not contain parameters or anything else data-dependent
     * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
     * @return {DateTime}
     */
    static invalid(reason, explanation = null) {
        if (!reason) {
            throw new InvalidArgumentError("need to specify a reason the DateTime is invalid");
        }
        const invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);
        if (Settings.throwOnInvalid) {
            throw new InvalidDateTimeError(invalid);
        }
        else {
            return new DateTime({ invalid });
        }
    }
    /**
     * Check if an object is an instance of DateTime. Works across context boundaries
     * @param {object} o
     * @return {boolean}
     */
    static isDateTime(o) {
        return (o && o.isLuxonDateTime) || false;
    }
    // INFO
    /**
     * Get the value of unit.
     * @param {string} unit - a unit such as 'minute' or 'day'
     * @example DateTime.local(2017, 7, 4).get('month'); //=> 7
     * @example DateTime.local(2017, 7, 4).get('day'); //=> 4
     * @return {number}
     */
    get(unit) {
        return this[unit];
    }
    /**
     * Returns whether the DateTime is valid. Invalid DateTimes occur when:
     * * The DateTime was created from invalid calendar information, such as the 13th month or February 30
     * * The DateTime was created by an operation on another invalid date
     * @type {boolean}
     */
    get isValid() {
        return this.invalid === null;
    }
    /**
     * Returns an error code if this DateTime is invalid, or null if the DateTime is valid
     * @type {string}
     */
    get invalidReason() {
        return this.invalid ? this.invalid.reason : null;
    }
    /**
     * Returns an explanation of why this DateTime became invalid, or null if the DateTime is valid
     * @type {string}
     */
    get invalidExplanation() {
        return this.invalid ? this.invalid.explanation : null;
    }
    /**
     * Get the locale of a DateTime, such 'en-GB'. The locale is used when formatting the DateTime
     *
     * @type {string}
     */
    get locale() {
        return this.isValid ? this.loc.locale : null;
    }
    /**
     * Get the numbering system of a DateTime, such 'beng'. The numbering system is used when formatting the DateTime
     *
     * @type {string}
     */
    get numberingSystem() {
        return this.isValid ? this.loc.numberingSystem : null;
    }
    /**
     * Get the output calendar of a DateTime, such 'islamic'. The output calendar is used when formatting the DateTime
     *
     * @type {string}
     */
    get outputCalendar() {
        return this.isValid ? this.loc.outputCalendar : null;
    }
    /**
     * Get the time zone associated with this DateTime.
     * @type {Zone}
     */
    get zone() {
        return this._zone;
    }
    /**
     * Get the name of the time zone.
     * @type {string}
     */
    get zoneName() {
        return this.isValid ? this.zone.name : null;
    }
    /**
     * Get the year
     * @example DateTime.local(2017, 5, 25).year //=> 2017
     * @type {number}
     */
    get year() {
        return this.isValid ? this.c.year : NaN;
    }
    /**
     * Get the quarter
     * @example DateTime.local(2017, 5, 25).quarter //=> 2
     * @type {number}
     */
    get quarter() {
        return this.isValid ? Math.ceil(this.c.month / 3) : NaN;
    }
    /**
     * Get the month (1-12).
     * @example DateTime.local(2017, 5, 25).month //=> 5
     * @type {number}
     */
    get month() {
        return this.isValid ? this.c.month : NaN;
    }
    /**
     * Get the day of the month (1-30ish).
     * @example DateTime.local(2017, 5, 25).day //=> 25
     * @type {number}
     */
    get day() {
        return this.isValid ? this.c.day : NaN;
    }
    /**
     * Get the hour of the day (0-23).
     * @example DateTime.local(2017, 5, 25, 9).hour //=> 9
     * @type {number}
     */
    get hour() {
        return this.isValid ? this.c.hour : NaN;
    }
    /**
     * Get the minute of the hour (0-59).
     * @example DateTime.local(2017, 5, 25, 9, 30).minute //=> 30
     * @type {number}
     */
    get minute() {
        return this.isValid ? this.c.minute : NaN;
    }
    /**
     * Get the second of the minute (0-59).
     * @example DateTime.local(2017, 5, 25, 9, 30, 52).second //=> 52
     * @type {number}
     */
    get second() {
        return this.isValid ? this.c.second : NaN;
    }
    /**
     * Get the millisecond of the second (0-999).
     * @example DateTime.local(2017, 5, 25, 9, 30, 52, 654).millisecond //=> 654
     * @type {number}
     */
    get millisecond() {
        return this.isValid ? this.c.millisecond : NaN;
    }
    /**
     * Get the week year
     * @see https://en.wikipedia.org/wiki/ISO_week_date
     * @example DateTime.local(2014, 12, 31).weekYear //=> 2015
     * @type {number}
     */
    get weekYear() {
        return this.isValid ? possiblyCachedWeekData(this).weekYear : NaN;
    }
    /**
     * Get the week number of the week year (1-52ish).
     * @see https://en.wikipedia.org/wiki/ISO_week_date
     * @example DateTime.local(2017, 5, 25).weekNumber //=> 21
     * @type {number}
     */
    get weekNumber() {
        return this.isValid ? possiblyCachedWeekData(this).weekNumber : NaN;
    }
    /**
     * Get the day of the week.
     * 1 is Monday and 7 is Sunday
     * @see https://en.wikipedia.org/wiki/ISO_week_date
     * @example DateTime.local(2014, 11, 31).weekday //=> 4
     * @type {number}
     */
    get weekday() {
        return this.isValid ? possiblyCachedWeekData(this).weekday : NaN;
    }
    /**
     * Get the ordinal (meaning the day of the year)
     * @example DateTime.local(2017, 5, 25).ordinal //=> 145
     * @type {number|DateTime}
     */
    get ordinal() {
        return this.isValid ? gregorianToOrdinal(this.c).ordinal : NaN;
    }
    /**
     * Get the human readable short month name, such as 'Oct'.
     * Defaults to the system's locale if no locale has been specified
     * @example DateTime.local(2017, 10, 30).monthShort //=> Oct
     * @type {string}
     */
    get monthShort() {
        return this.isValid ? Info.months("short", { locObj: this.loc })[this.month - 1] : null;
    }
    /**
     * Get the human readable long month name, such as 'October'.
     * Defaults to the system's locale if no locale has been specified
     * @example DateTime.local(2017, 10, 30).monthLong //=> October
     * @type {string}
     */
    get monthLong() {
        return this.isValid ? Info.months("long", { locObj: this.loc })[this.month - 1] : null;
    }
    /**
     * Get the human readable short weekday, such as 'Mon'.
     * Defaults to the system's locale if no locale has been specified
     * @example DateTime.local(2017, 10, 30).weekdayShort //=> Mon
     * @type {string}
     */
    get weekdayShort() {
        return this.isValid ? Info.weekdays("short", { locObj: this.loc })[this.weekday - 1] : null;
    }
    /**
     * Get the human readable long weekday, such as 'Monday'.
     * Defaults to the system's locale if no locale has been specified
     * @example DateTime.local(2017, 10, 30).weekdayLong //=> Monday
     * @type {string}
     */
    get weekdayLong() {
        return this.isValid ? Info.weekdays("long", { locObj: this.loc })[this.weekday - 1] : null;
    }
    /**
     * Get the UTC offset of this DateTime in minutes
     * @example DateTime.now().offset //=> -240
     * @example DateTime.utc().offset //=> 0
     * @type {number}
     */
    get offset() {
        return this.isValid ? +this.o : NaN;
    }
    /**
     * Get the short human name for the zone's current offset, for example "EST" or "EDT".
     * Defaults to the system's locale if no locale has been specified
     * @type {string}
     */
    get offsetNameShort() {
        if (this.isValid) {
            return this.zone.offsetName(this.ts, {
                format: "short",
                locale: this.locale,
            });
        }
        else {
            return null;
        }
    }
    /**
     * Get the long human name for the zone's current offset, for example "Eastern Standard Time" or "Eastern Daylight Time".
     * Defaults to the system's locale if no locale has been specified
     * @type {string}
     */
    get offsetNameLong() {
        if (this.isValid) {
            return this.zone.offsetName(this.ts, {
                format: "long",
                locale: this.locale,
            });
        }
        else {
            return null;
        }
    }
    /**
     * Get whether this zone's offset ever changes, as in a DST.
     * @type {boolean}
     */
    get isOffsetFixed() {
        return this.isValid ? this.zone.isUniversal : null;
    }
    /**
     * Get whether the DateTime is in a DST.
     * @type {boolean}
     */
    get isInDST() {
        if (this.isOffsetFixed) {
            return false;
        }
        else {
            return (this.offset > this.set({ month: 1, day: 1 }).offset ||
                this.offset > this.set({ month: 5 }).offset);
        }
    }
    /**
     * Returns true if this DateTime is in a leap year, false otherwise
     * @example DateTime.local(2016).isInLeapYear //=> true
     * @example DateTime.local(2013).isInLeapYear //=> false
     * @type {boolean}
     */
    get isInLeapYear() {
        return isLeapYear(this.year);
    }
    /**
     * Returns the number of days in this DateTime's month
     * @example DateTime.local(2016, 2).daysInMonth //=> 29
     * @example DateTime.local(2016, 3).daysInMonth //=> 31
     * @type {number}
     */
    get daysInMonth() {
        return daysInMonth(this.year, this.month);
    }
    /**
     * Returns the number of days in this DateTime's year
     * @example DateTime.local(2016).daysInYear //=> 366
     * @example DateTime.local(2013).daysInYear //=> 365
     * @type {number}
     */
    get daysInYear() {
        return this.isValid ? daysInYear(this.year) : NaN;
    }
    /**
     * Returns the number of weeks in this DateTime's year
     * @see https://en.wikipedia.org/wiki/ISO_week_date
     * @example DateTime.local(2004).weeksInWeekYear //=> 53
     * @example DateTime.local(2013).weeksInWeekYear //=> 52
     * @type {number}
     */
    get weeksInWeekYear() {
        return this.isValid ? weeksInWeekYear(this.weekYear) : NaN;
    }
    /**
     * Returns the resolved Intl options for this DateTime.
     * This is useful in understanding the behavior of formatting methods
     * @param {Object} opts - the same options as toLocaleString
     * @return {Object}
     */
    resolvedLocaleOptions(opts = {}) {
        const { locale, numberingSystem, calendar } = Formatter.create(this.loc.clone(opts), opts).resolvedOptions(this);
        return { locale, numberingSystem, outputCalendar: calendar };
    }
    // TRANSFORM
    /**
     * "Set" the DateTime's zone to UTC. Returns a newly-constructed DateTime.
     *
     * Equivalent to {@link DateTime#setZone}('utc')
     * @param {number} [offset=0] - optionally, an offset from UTC in minutes
     * @param {Object} [opts={}] - options to pass to `setZone()`
     * @return {DateTime}
     */
    toUTC(offset = 0, opts = {}) {
        return this.setZone(FixedOffsetZone.instance(offset), opts);
    }
    /**
     * "Set" the DateTime's zone to the host's local zone. Returns a newly-constructed DateTime.
     *
     * Equivalent to `setZone('local')`
     * @return {DateTime}
     */
    toLocal() {
        return this.setZone(Settings.defaultZone);
    }
    /**
     * "Set" the DateTime's zone to specified zone. Returns a newly-constructed DateTime.
     *
     * By default, the setter keeps the underlying time the same (as in, the same timestamp), but the new instance will report different local times and consider DSTs when making computations, as with {@link DateTime#plus}. You may wish to use {@link DateTime#toLocal} and {@link DateTime#toUTC} which provide simple convenience wrappers for commonly used zones.
     * @param {string|Zone} [zone='local'] - a zone identifier. As a string, that can be any IANA zone supported by the host environment, or a fixed-offset name of the form 'UTC+3', or the strings 'local' or 'utc'. You may also supply an instance of a {@link DateTime#Zone} class.
     * @param {Object} opts - options
     * @param {boolean} [opts.keepLocalTime=false] - If true, adjust the underlying time so that the local time stays the same, but in the target zone. You should rarely need this.
     * @return {DateTime}
     */
    setZone(zone, { keepLocalTime = false, keepCalendarTime = false } = {}) {
        zone = normalizeZone(zone, Settings.defaultZone);
        if (zone.equals(this.zone)) {
            return this;
        }
        else if (!zone.isValid) {
            return DateTime.invalid(unsupportedZone(zone));
        }
        else {
            let newTS = this.ts;
            if (keepLocalTime || keepCalendarTime) {
                const offsetGuess = zone.offset(this.ts);
                const asObj = this.toObject();
                [newTS] = objToTS(asObj, offsetGuess, zone);
            }
            return clone(this, { ts: newTS, zone });
        }
    }
    /**
     * "Set" the locale, numberingSystem, or outputCalendar. Returns a newly-constructed DateTime.
     * @param {Object} properties - the properties to set
     * @example DateTime.local(2017, 5, 25).reconfigure({ locale: 'en-GB' })
     * @return {DateTime}
     */
    reconfigure({ locale, numberingSystem, outputCalendar } = {}) {
        const loc = this.loc.clone({ locale, numberingSystem, outputCalendar });
        return clone(this, { loc });
    }
    /**
     * "Set" the locale. Returns a newly-constructed DateTime.
     * Just a convenient alias for reconfigure({ locale })
     * @example DateTime.local(2017, 5, 25).setLocale('en-GB')
     * @return {DateTime}
     */
    setLocale(locale) {
        return this.reconfigure({ locale });
    }
    /**
     * "Set" the values of specified units. Returns a newly-constructed DateTime.
     * You can only set units with this method; for "setting" metadata, see {@link DateTime#reconfigure} and {@link DateTime#setZone}.
     * @param {Object} values - a mapping of units to numbers
     * @example dt.set({ year: 2017 })
     * @example dt.set({ hour: 8, minute: 30 })
     * @example dt.set({ weekday: 5 })
     * @example dt.set({ year: 2005, ordinal: 234 })
     * @return {DateTime}
     */
    set(values) {
        if (!this.isValid)
            return this;
        const normalized = normalizeObject(values, normalizeUnit), settingWeekStuff = !isUndefined(normalized.weekYear) ||
            !isUndefined(normalized.weekNumber) ||
            !isUndefined(normalized.weekday), containsOrdinal = !isUndefined(normalized.ordinal), containsGregorYear = !isUndefined(normalized.year), containsGregorMD = !isUndefined(normalized.month) || !isUndefined(normalized.day), containsGregor = containsGregorYear || containsGregorMD, definiteWeekDef = normalized.weekYear || normalized.weekNumber;
        if ((containsGregor || containsOrdinal) && definiteWeekDef) {
            throw new ConflictingSpecificationError("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
        }
        if (containsGregorMD && containsOrdinal) {
            throw new ConflictingSpecificationError("Can't mix ordinal dates with month/day");
        }
        let mixed;
        if (settingWeekStuff) {
            mixed = weekToGregorian(Object.assign(Object.assign({}, gregorianToWeek(this.c)), normalized));
        }
        else if (!isUndefined(normalized.ordinal)) {
            mixed = ordinalToGregorian(Object.assign(Object.assign({}, gregorianToOrdinal(this.c)), normalized));
        }
        else {
            mixed = Object.assign(Object.assign({}, this.toObject()), normalized);
            // if we didn't set the day but we ended up on an overflow date,
            // use the last day of the right month
            if (isUndefined(normalized.day)) {
                mixed.day = Math.min(daysInMonth(mixed.year, mixed.month), mixed.day);
            }
        }
        const [ts, o] = objToTS(mixed, this.o, this.zone);
        return clone(this, { ts, o });
    }
    /**
     * Add a period of time to this DateTime and return the resulting DateTime
     *
     * Adding hours, minutes, seconds, or milliseconds increases the timestamp by the right number of milliseconds. Adding days, months, or years shifts the calendar, accounting for DSTs and leap years along the way. Thus, `dt.plus({ hours: 24 })` may result in a different time than `dt.plus({ days: 1 })` if there's a DST shift in between.
     * @param {Duration|Object|number} duration - The amount to add. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
     * @example DateTime.now().plus(123) //~> in 123 milliseconds
     * @example DateTime.now().plus({ minutes: 15 }) //~> in 15 minutes
     * @example DateTime.now().plus({ days: 1 }) //~> this time tomorrow
     * @example DateTime.now().plus({ days: -1 }) //~> this time yesterday
     * @example DateTime.now().plus({ hours: 3, minutes: 13 }) //~> in 3 hr, 13 min
     * @example DateTime.now().plus(Duration.fromObject({ hours: 3, minutes: 13 })) //~> in 3 hr, 13 min
     * @return {DateTime}
     */
    plus(duration) {
        if (!this.isValid)
            return this;
        const dur = Duration.fromDurationLike(duration);
        return clone(this, adjustTime(this, dur));
    }
    /**
     * Subtract a period of time to this DateTime and return the resulting DateTime
     * See {@link DateTime#plus}
     * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
     @return {DateTime}
     */
    minus(duration) {
        if (!this.isValid)
            return this;
        const dur = Duration.fromDurationLike(duration).negate();
        return clone(this, adjustTime(this, dur));
    }
    /**
     * "Set" this DateTime to the beginning of a unit of time.
     * @param {string} unit - The unit to go to the beginning of. Can be 'year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', or 'millisecond'.
     * @example DateTime.local(2014, 3, 3).startOf('month').toISODate(); //=> '2014-03-01'
     * @example DateTime.local(2014, 3, 3).startOf('year').toISODate(); //=> '2014-01-01'
     * @example DateTime.local(2014, 3, 3).startOf('week').toISODate(); //=> '2014-03-03', weeks always start on Mondays
     * @example DateTime.local(2014, 3, 3, 5, 30).startOf('day').toISOTime(); //=> '00:00.000-05:00'
     * @example DateTime.local(2014, 3, 3, 5, 30).startOf('hour').toISOTime(); //=> '05:00:00.000-05:00'
     * @return {DateTime}
     */
    startOf(unit) {
        if (!this.isValid)
            return this;
        const o = {}, normalizedUnit = Duration.normalizeUnit(unit);
        switch (normalizedUnit) {
            case "years":
                o.month = 1;
            // falls through
            case "quarters":
            case "months":
                o.day = 1;
            // falls through
            case "weeks":
            case "days":
                o.hour = 0;
            // falls through
            case "hours":
                o.minute = 0;
            // falls through
            case "minutes":
                o.second = 0;
            // falls through
            case "seconds":
                o.millisecond = 0;
                break;
            // no default, invalid units throw in normalizeUnit()
        }
        if (normalizedUnit === "weeks") {
            o.weekday = 1;
        }
        if (normalizedUnit === "quarters") {
            const q = Math.ceil(this.month / 3);
            o.month = (q - 1) * 3 + 1;
        }
        return this.set(o);
    }
    /**
     * "Set" this DateTime to the end (meaning the last millisecond) of a unit of time
     * @param {string} unit - The unit to go to the end of. Can be 'year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', or 'millisecond'.
     * @example DateTime.local(2014, 3, 3).endOf('month').toISO(); //=> '2014-03-31T23:59:59.999-05:00'
     * @example DateTime.local(2014, 3, 3).endOf('year').toISO(); //=> '2014-12-31T23:59:59.999-05:00'
     * @example DateTime.local(2014, 3, 3).endOf('week').toISO(); // => '2014-03-09T23:59:59.999-05:00', weeks start on Mondays
     * @example DateTime.local(2014, 3, 3, 5, 30).endOf('day').toISO(); //=> '2014-03-03T23:59:59.999-05:00'
     * @example DateTime.local(2014, 3, 3, 5, 30).endOf('hour').toISO(); //=> '2014-03-03T05:59:59.999-05:00'
     * @return {DateTime}
     */
    endOf(unit) {
        return this.isValid
            ? this.plus({ [unit]: 1 })
                .startOf(unit)
                .minus(1)
            : this;
    }
    // OUTPUT
    /**
     * Returns a string representation of this DateTime formatted according to the specified format string.
     * **You may not want this.** See {@link DateTime#toLocaleString} for a more flexible formatting tool. For a table of tokens and their interpretations, see [here](https://moment.github.io/luxon/#/formatting?id=table-of-tokens).
     * Defaults to en-US if no locale has been specified, regardless of the system's locale.
     * @param {string} fmt - the format string
     * @param {Object} opts - opts to override the configuration options on this DateTime
     * @example DateTime.now().toFormat('yyyy LLL dd') //=> '2017 Apr 22'
     * @example DateTime.now().setLocale('fr').toFormat('yyyy LLL dd') //=> '2017 avr. 22'
     * @example DateTime.now().toFormat('yyyy LLL dd', { locale: "fr" }) //=> '2017 avr. 22'
     * @example DateTime.now().toFormat("HH 'hours and' mm 'minutes'") //=> '20 hours and 55 minutes'
     * @return {string}
     */
    toFormat(fmt, opts = {}) {
        return this.isValid
            ? Formatter.create(this.loc.redefaultToEN(opts)).formatDateTimeFromString(this, fmt)
            : INVALID;
    }
    /**
     * Returns a localized string representing this date. Accepts the same options as the Intl.DateTimeFormat constructor and any presets defined by Luxon, such as `DateTime.DATE_FULL` or `DateTime.TIME_SIMPLE`.
     * The exact behavior of this method is browser-specific, but in general it will return an appropriate representation
     * of the DateTime in the assigned locale.
     * Defaults to the system's locale if no locale has been specified
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
     * @param formatOpts {Object} - Intl.DateTimeFormat constructor options and configuration options
     * @param {Object} opts - opts to override the configuration options on this DateTime
     * @example DateTime.now().toLocaleString(); //=> 4/20/2017
     * @example DateTime.now().setLocale('en-gb').toLocaleString(); //=> '20/04/2017'
     * @example DateTime.now().toLocaleString({ locale: 'en-gb' }); //=> '20/04/2017'
     * @example DateTime.now().toLocaleString(DateTime.DATE_FULL); //=> 'April 20, 2017'
     * @example DateTime.now().toLocaleString(DateTime.TIME_SIMPLE); //=> '11:32 AM'
     * @example DateTime.now().toLocaleString(DateTime.DATETIME_SHORT); //=> '4/20/2017, 11:32 AM'
     * @example DateTime.now().toLocaleString({ weekday: 'long', month: 'long', day: '2-digit' }); //=> 'Thursday, April 20'
     * @example DateTime.now().toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }); //=> 'Thu, Apr 20, 11:27 AM'
     * @example DateTime.now().toLocaleString({ hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }); //=> '11:32'
     * @return {string}
     */
    toLocaleString(formatOpts = DATE_SHORT, opts = {}) {
        return this.isValid
            ? Formatter.create(this.loc.clone(opts), formatOpts).formatDateTime(this)
            : INVALID;
    }
    /**
     * Returns an array of format "parts", meaning individual tokens along with metadata. This is allows callers to post-process individual sections of the formatted output.
     * Defaults to the system's locale if no locale has been specified
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat/formatToParts
     * @param opts {Object} - Intl.DateTimeFormat constructor options, same as `toLocaleString`.
     * @example DateTime.now().toLocaleParts(); //=> [
     *                                   //=>   { type: 'day', value: '25' },
     *                                   //=>   { type: 'literal', value: '/' },
     *                                   //=>   { type: 'month', value: '05' },
     *                                   //=>   { type: 'literal', value: '/' },
     *                                   //=>   { type: 'year', value: '1982' }
     *                                   //=> ]
     */
    toLocaleParts(opts = {}) {
        return this.isValid
            ? Formatter.create(this.loc.clone(opts), opts).formatDateTimeParts(this)
            : [];
    }
    /**
     * Returns an ISO 8601-compliant string representation of this DateTime
     * @param {Object} opts - options
     * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
     * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
     * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
     * @param {boolean} [opts.extendedZone=true] - add the time zone format extension
     * @param {string} [opts.format='extended'] - choose between the basic and extended format
     * @example DateTime.utc(1983, 5, 25).toISO() //=> '1982-05-25T00:00:00.000Z'
     * @example DateTime.now().toISO() //=> '2017-04-22T20:47:05.335-04:00'
     * @example DateTime.now().toISO({ includeOffset: false }) //=> '2017-04-22T20:47:05.335'
     * @example DateTime.now().toISO({ format: 'basic' }) //=> '20170422T204705.335-0400'
     * @return {string}
     */
    toISO({ format = "extended", suppressSeconds = false, suppressMilliseconds = false, includeOffset = true, extendedZone = false, } = {}) {
        if (!this.isValid) {
            return null;
        }
        const ext = format === "extended";
        let c = toISODate(this, ext);
        c += "T";
        c += toISOTime(this, ext, suppressSeconds, suppressMilliseconds, includeOffset, extendedZone);
        return c;
    }
    /**
     * Returns an ISO 8601-compliant string representation of this DateTime's date component
     * @param {Object} opts - options
     * @param {string} [opts.format='extended'] - choose between the basic and extended format
     * @example DateTime.utc(1982, 5, 25).toISODate() //=> '1982-05-25'
     * @example DateTime.utc(1982, 5, 25).toISODate({ format: 'basic' }) //=> '19820525'
     * @return {string}
     */
    toISODate({ format = "extended" } = {}) {
        if (!this.isValid) {
            return null;
        }
        return toISODate(this, format === "extended");
    }
    /**
     * Returns an ISO 8601-compliant string representation of this DateTime's week date
     * @example DateTime.utc(1982, 5, 25).toISOWeekDate() //=> '1982-W21-2'
     * @return {string}
     */
    toISOWeekDate() {
        return toTechFormat(this, "kkkk-'W'WW-c");
    }
    /**
     * Returns an ISO 8601-compliant string representation of this DateTime's time component
     * @param {Object} opts - options
     * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
     * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
     * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
     * @param {boolean} [opts.extendedZone=true] - add the time zone format extension
     * @param {boolean} [opts.includePrefix=false] - include the `T` prefix
     * @param {string} [opts.format='extended'] - choose between the basic and extended format
     * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime() //=> '07:34:19.361Z'
     * @example DateTime.utc().set({ hour: 7, minute: 34, seconds: 0, milliseconds: 0 }).toISOTime({ suppressSeconds: true }) //=> '07:34Z'
     * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime({ format: 'basic' }) //=> '073419.361Z'
     * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime({ includePrefix: true }) //=> 'T07:34:19.361Z'
     * @return {string}
     */
    toISOTime({ suppressMilliseconds = false, suppressSeconds = false, includeOffset = true, includePrefix = false, extendedZone = false, format = "extended", } = {}) {
        if (!this.isValid) {
            return null;
        }
        let c = includePrefix ? "T" : "";
        return (c +
            toISOTime(this, format === "extended", suppressSeconds, suppressMilliseconds, includeOffset, extendedZone));
    }
    /**
     * Returns an RFC 2822-compatible string representation of this DateTime
     * @example DateTime.utc(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 +0000'
     * @example DateTime.local(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 -0400'
     * @return {string}
     */
    toRFC2822() {
        return toTechFormat(this, "EEE, dd LLL yyyy HH:mm:ss ZZZ", false);
    }
    /**
     * Returns a string representation of this DateTime appropriate for use in HTTP headers. The output is always expressed in GMT.
     * Specifically, the string conforms to RFC 1123.
     * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
     * @example DateTime.utc(2014, 7, 13).toHTTP() //=> 'Sun, 13 Jul 2014 00:00:00 GMT'
     * @example DateTime.utc(2014, 7, 13, 19).toHTTP() //=> 'Sun, 13 Jul 2014 19:00:00 GMT'
     * @return {string}
     */
    toHTTP() {
        return toTechFormat(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
    }
    /**
     * Returns a string representation of this DateTime appropriate for use in SQL Date
     * @example DateTime.utc(2014, 7, 13).toSQLDate() //=> '2014-07-13'
     * @return {string}
     */
    toSQLDate() {
        if (!this.isValid) {
            return null;
        }
        return toISODate(this, true);
    }
    /**
     * Returns a string representation of this DateTime appropriate for use in SQL Time
     * @param {Object} opts - options
     * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
     * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
     * @param {boolean} [opts.includeOffsetSpace=true] - include the space between the time and the offset, such as '05:15:16.345 -04:00'
     * @example DateTime.utc().toSQL() //=> '05:15:16.345'
     * @example DateTime.now().toSQL() //=> '05:15:16.345 -04:00'
     * @example DateTime.now().toSQL({ includeOffset: false }) //=> '05:15:16.345'
     * @example DateTime.now().toSQL({ includeZone: false }) //=> '05:15:16.345 America/New_York'
     * @return {string}
     */
    toSQLTime({ includeOffset = true, includeZone = false, includeOffsetSpace = true } = {}) {
        let fmt = "HH:mm:ss.SSS";
        if (includeZone || includeOffset) {
            if (includeOffsetSpace) {
                fmt += " ";
            }
            if (includeZone) {
                fmt += "z";
            }
            else if (includeOffset) {
                fmt += "ZZ";
            }
        }
        return toTechFormat(this, fmt, true);
    }
    /**
     * Returns a string representation of this DateTime appropriate for use in SQL DateTime
     * @param {Object} opts - options
     * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
     * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
     * @param {boolean} [opts.includeOffsetSpace=true] - include the space between the time and the offset, such as '05:15:16.345 -04:00'
     * @example DateTime.utc(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 Z'
     * @example DateTime.local(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 -04:00'
     * @example DateTime.local(2014, 7, 13).toSQL({ includeOffset: false }) //=> '2014-07-13 00:00:00.000'
     * @example DateTime.local(2014, 7, 13).toSQL({ includeZone: true }) //=> '2014-07-13 00:00:00.000 America/New_York'
     * @return {string}
     */
    toSQL(opts = {}) {
        if (!this.isValid) {
            return null;
        }
        return `${this.toSQLDate()} ${this.toSQLTime(opts)}`;
    }
    /**
     * Returns a string representation of this DateTime appropriate for debugging
     * @return {string}
     */
    toString() {
        return this.isValid ? this.toISO() : INVALID;
    }
    /**
     * Returns the epoch milliseconds of this DateTime. Alias of {@link DateTime#toMillis}
     * @return {number}
     */
    valueOf() {
        return this.toMillis();
    }
    /**
     * Returns the epoch milliseconds of this DateTime.
     * @return {number}
     */
    toMillis() {
        return this.isValid ? this.ts : NaN;
    }
    /**
     * Returns the epoch seconds of this DateTime.
     * @return {number}
     */
    toSeconds() {
        return this.isValid ? this.ts / 1000 : NaN;
    }
    /**
     * Returns the epoch seconds (as a whole number) of this DateTime.
     * @return {number}
     */
    toUnixInteger() {
        return this.isValid ? Math.floor(this.ts / 1000) : NaN;
    }
    /**
     * Returns an ISO 8601 representation of this DateTime appropriate for use in JSON.
     * @return {string}
     */
    toJSON() {
        return this.toISO();
    }
    /**
     * Returns a BSON serializable equivalent to this DateTime.
     * @return {Date}
     */
    toBSON() {
        return this.toJSDate();
    }
    /**
     * Returns a JavaScript object with this DateTime's year, month, day, and so on.
     * @param opts - options for generating the object
     * @param {boolean} [opts.includeConfig=false] - include configuration attributes in the output
     * @example DateTime.now().toObject() //=> { year: 2017, month: 4, day: 22, hour: 20, minute: 49, second: 42, millisecond: 268 }
     * @return {Object}
     */
    toObject(opts = {}) {
        if (!this.isValid)
            return {};
        const base = Object.assign({}, this.c);
        if (opts.includeConfig) {
            base.outputCalendar = this.outputCalendar;
            base.numberingSystem = this.loc.numberingSystem;
            base.locale = this.loc.locale;
        }
        return base;
    }
    /**
     * Returns a JavaScript Date equivalent to this DateTime.
     * @return {Date}
     */
    toJSDate() {
        return new Date(this.isValid ? this.ts : NaN);
    }
    // COMPARE
    /**
     * Return the difference between two DateTimes as a Duration.
     * @param {DateTime} otherDateTime - the DateTime to compare this one to
     * @param {string|string[]} [unit=['milliseconds']] - the unit or array of units (such as 'hours' or 'days') to include in the duration.
     * @param {Object} opts - options that affect the creation of the Duration
     * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
     * @example
     * var i1 = DateTime.fromISO('1982-05-25T09:45'),
     *     i2 = DateTime.fromISO('1983-10-14T10:30');
     * i2.diff(i1).toObject() //=> { milliseconds: 43807500000 }
     * i2.diff(i1, 'hours').toObject() //=> { hours: 12168.75 }
     * i2.diff(i1, ['months', 'days']).toObject() //=> { months: 16, days: 19.03125 }
     * i2.diff(i1, ['months', 'days', 'hours']).toObject() //=> { months: 16, days: 19, hours: 0.75 }
     * @return {Duration}
     */
    diff(otherDateTime, unit = "milliseconds", opts = {}) {
        if (!this.isValid || !otherDateTime.isValid) {
            return Duration.invalid("created by diffing an invalid DateTime");
        }
        const durOpts = Object.assign({ locale: this.locale, numberingSystem: this.numberingSystem }, opts);
        const units = maybeArray(unit).map(Duration.normalizeUnit), otherIsLater = otherDateTime.valueOf() > this.valueOf(), earlier = otherIsLater ? this : otherDateTime, later = otherIsLater ? otherDateTime : this, diffed = diff(earlier, later, units, durOpts);
        return otherIsLater ? diffed.negate() : diffed;
    }
    /**
     * Return the difference between this DateTime and right now.
     * See {@link DateTime#diff}
     * @param {string|string[]} [unit=['milliseconds']] - the unit or units units (such as 'hours' or 'days') to include in the duration
     * @param {Object} opts - options that affect the creation of the Duration
     * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
     * @return {Duration}
     */
    diffNow(unit = "milliseconds", opts = {}) {
        return this.diff(DateTime.now(), unit, opts);
    }
    /**
     * Return an Interval spanning between this DateTime and another DateTime
     * @param {DateTime} otherDateTime - the other end point of the Interval
     * @return {Interval}
     */
    until(otherDateTime) {
        return this.isValid ? Interval.fromDateTimes(this, otherDateTime) : this;
    }
    /**
     * Return whether this DateTime is in the same unit of time as another DateTime.
     * Higher-order units must also be identical for this function to return `true`.
     * Note that time zones are **ignored** in this comparison, which compares the **local** calendar time. Use {@link DateTime#setZone} to convert one of the dates if needed.
     * @param {DateTime} otherDateTime - the other DateTime
     * @param {string} unit - the unit of time to check sameness on
     * @example DateTime.now().hasSame(otherDT, 'day'); //~> true if otherDT is in the same current calendar day
     * @return {boolean}
     */
    hasSame(otherDateTime, unit) {
        if (!this.isValid)
            return false;
        const inputMs = otherDateTime.valueOf();
        const adjustedToZone = this.setZone(otherDateTime.zone, { keepLocalTime: true });
        return adjustedToZone.startOf(unit) <= inputMs && inputMs <= adjustedToZone.endOf(unit);
    }
    /**
     * Equality check
     * Two DateTimes are equal iff they represent the same millisecond, have the same zone and location, and are both valid.
     * To compare just the millisecond values, use `+dt1 === +dt2`.
     * @param {DateTime} other - the other DateTime
     * @return {boolean}
     */
    equals(other) {
        return (this.isValid &&
            other.isValid &&
            this.valueOf() === other.valueOf() &&
            this.zone.equals(other.zone) &&
            this.loc.equals(other.loc));
    }
    /**
     * Returns a string representation of a this time relative to now, such as "in two days". Can only internationalize if your
     * platform supports Intl.RelativeTimeFormat. Rounds down by default.
     * @param {Object} options - options that affect the output
     * @param {DateTime} [options.base=DateTime.now()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
     * @param {string} [options.style="long"] - the style of units, must be "long", "short", or "narrow"
     * @param {string|string[]} options.unit - use a specific unit or array of units; if omitted, or an array, the method will pick the best unit. Use an array or one of "years", "quarters", "months", "weeks", "days", "hours", "minutes", or "seconds"
     * @param {boolean} [options.round=true] - whether to round the numbers in the output.
     * @param {number} [options.padding=0] - padding in milliseconds. This allows you to round up the result if it fits inside the threshold. Don't use in combination with {round: false} because the decimal output will include the padding.
     * @param {string} options.locale - override the locale of this DateTime
     * @param {string} options.numberingSystem - override the numberingSystem of this DateTime. The Intl system may choose not to honor this
     * @example DateTime.now().plus({ days: 1 }).toRelative() //=> "in 1 day"
     * @example DateTime.now().setLocale("es").toRelative({ days: 1 }) //=> "dentro de 1 día"
     * @example DateTime.now().plus({ days: 1 }).toRelative({ locale: "fr" }) //=> "dans 23 heures"
     * @example DateTime.now().minus({ days: 2 }).toRelative() //=> "2 days ago"
     * @example DateTime.now().minus({ days: 2 }).toRelative({ unit: "hours" }) //=> "48 hours ago"
     * @example DateTime.now().minus({ hours: 36 }).toRelative({ round: false }) //=> "1.5 days ago"
     */
    toRelative(options = {}) {
        if (!this.isValid)
            return null;
        const base = options.base || DateTime.fromObject({}, { zone: this.zone }), padding = options.padding ? (this < base ? -options.padding : options.padding) : 0;
        let units = ["years", "months", "days", "hours", "minutes", "seconds"];
        let unit = options.unit;
        if (Array.isArray(options.unit)) {
            units = options.unit;
            unit = undefined;
        }
        return diffRelative(base, this.plus(padding), Object.assign(Object.assign({}, options), { numeric: "always", units,
            unit }));
    }
    /**
     * Returns a string representation of this date relative to today, such as "yesterday" or "next month".
     * Only internationalizes on platforms that supports Intl.RelativeTimeFormat.
     * @param {Object} options - options that affect the output
     * @param {DateTime} [options.base=DateTime.now()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
     * @param {string} options.locale - override the locale of this DateTime
     * @param {string} options.unit - use a specific unit; if omitted, the method will pick the unit. Use one of "years", "quarters", "months", "weeks", or "days"
     * @param {string} options.numberingSystem - override the numberingSystem of this DateTime. The Intl system may choose not to honor this
     * @example DateTime.now().plus({ days: 1 }).toRelativeCalendar() //=> "tomorrow"
     * @example DateTime.now().setLocale("es").plus({ days: 1 }).toRelative() //=> ""mañana"
     * @example DateTime.now().plus({ days: 1 }).toRelativeCalendar({ locale: "fr" }) //=> "demain"
     * @example DateTime.now().minus({ days: 2 }).toRelativeCalendar() //=> "2 days ago"
     */
    toRelativeCalendar(options = {}) {
        if (!this.isValid)
            return null;
        return diffRelative(options.base || DateTime.fromObject({}, { zone: this.zone }), this, Object.assign(Object.assign({}, options), { numeric: "auto", units: ["years", "months", "days"], calendary: true }));
    }
    /**
     * Return the min of several date times
     * @param {...DateTime} dateTimes - the DateTimes from which to choose the minimum
     * @return {DateTime} the min DateTime, or undefined if called with no argument
     */
    static min(...dateTimes) {
        if (!dateTimes.every(DateTime.isDateTime)) {
            throw new InvalidArgumentError("min requires all arguments be DateTimes");
        }
        return bestBy(dateTimes, (i) => i.valueOf(), Math.min);
    }
    /**
     * Return the max of several date times
     * @param {...DateTime} dateTimes - the DateTimes from which to choose the maximum
     * @return {DateTime} the max DateTime, or undefined if called with no argument
     */
    static max(...dateTimes) {
        if (!dateTimes.every(DateTime.isDateTime)) {
            throw new InvalidArgumentError("max requires all arguments be DateTimes");
        }
        return bestBy(dateTimes, (i) => i.valueOf(), Math.max);
    }
    // MISC
    /**
     * Explain how a string would be parsed by fromFormat()
     * @param {string} text - the string to parse
     * @param {string} fmt - the format the string is expected to be in (see description)
     * @param {Object} options - options taken by fromFormat()
     * @return {Object}
     */
    static fromFormatExplain(text, fmt, options = {}) {
        const { locale = null, numberingSystem = null } = options, localeToUse = Locale.fromOpts({
            locale,
            numberingSystem,
            defaultToEN: true,
        });
        return explainFromTokens(localeToUse, text, fmt);
    }
    /**
     * @deprecated use fromFormatExplain instead
     */
    static fromStringExplain(text, fmt, options = {}) {
        return DateTime.fromFormatExplain(text, fmt, options);
    }
    // FORMAT PRESETS
    /**
     * {@link DateTime#toLocaleString} format like 10/14/1983
     * @type {Object}
     */
    static get DATE_SHORT() {
        return DATE_SHORT;
    }
    /**
     * {@link DateTime#toLocaleString} format like 'Oct 14, 1983'
     * @type {Object}
     */
    static get DATE_MED() {
        return DATE_MED;
    }
    /**
     * {@link DateTime#toLocaleString} format like 'Fri, Oct 14, 1983'
     * @type {Object}
     */
    static get DATE_MED_WITH_WEEKDAY() {
        return DATE_MED_WITH_WEEKDAY;
    }
    /**
     * {@link DateTime#toLocaleString} format like 'October 14, 1983'
     * @type {Object}
     */
    static get DATE_FULL() {
        return DATE_FULL;
    }
    /**
     * {@link DateTime#toLocaleString} format like 'Tuesday, October 14, 1983'
     * @type {Object}
     */
    static get DATE_HUGE() {
        return DATE_HUGE;
    }
    /**
     * {@link DateTime#toLocaleString} format like '09:30 AM'. Only 12-hour if the locale is.
     * @type {Object}
     */
    static get TIME_SIMPLE() {
        return TIME_SIMPLE;
    }
    /**
     * {@link DateTime#toLocaleString} format like '09:30:23 AM'. Only 12-hour if the locale is.
     * @type {Object}
     */
    static get TIME_WITH_SECONDS() {
        return TIME_WITH_SECONDS;
    }
    /**
     * {@link DateTime#toLocaleString} format like '09:30:23 AM EDT'. Only 12-hour if the locale is.
     * @type {Object}
     */
    static get TIME_WITH_SHORT_OFFSET() {
        return TIME_WITH_SHORT_OFFSET;
    }
    /**
     * {@link DateTime#toLocaleString} format like '09:30:23 AM Eastern Daylight Time'. Only 12-hour if the locale is.
     * @type {Object}
     */
    static get TIME_WITH_LONG_OFFSET() {
        return TIME_WITH_LONG_OFFSET;
    }
    /**
     * {@link DateTime#toLocaleString} format like '09:30', always 24-hour.
     * @type {Object}
     */
    static get TIME_24_SIMPLE() {
        return TIME_24_SIMPLE;
    }
    /**
     * {@link DateTime#toLocaleString} format like '09:30:23', always 24-hour.
     * @type {Object}
     */
    static get TIME_24_WITH_SECONDS() {
        return TIME_24_WITH_SECONDS;
    }
    /**
     * {@link DateTime#toLocaleString} format like '09:30:23 EDT', always 24-hour.
     * @type {Object}
     */
    static get TIME_24_WITH_SHORT_OFFSET() {
        return TIME_24_WITH_SHORT_OFFSET;
    }
    /**
     * {@link DateTime#toLocaleString} format like '09:30:23 Eastern Daylight Time', always 24-hour.
     * @type {Object}
     */
    static get TIME_24_WITH_LONG_OFFSET() {
        return TIME_24_WITH_LONG_OFFSET;
    }
    /**
     * {@link DateTime#toLocaleString} format like '10/14/1983, 9:30 AM'. Only 12-hour if the locale is.
     * @type {Object}
     */
    static get DATETIME_SHORT() {
        return DATETIME_SHORT;
    }
    /**
     * {@link DateTime#toLocaleString} format like '10/14/1983, 9:30:33 AM'. Only 12-hour if the locale is.
     * @type {Object}
     */
    static get DATETIME_SHORT_WITH_SECONDS() {
        return DATETIME_SHORT_WITH_SECONDS;
    }
    /**
     * {@link DateTime#toLocaleString} format like 'Oct 14, 1983, 9:30 AM'. Only 12-hour if the locale is.
     * @type {Object}
     */
    static get DATETIME_MED() {
        return DATETIME_MED;
    }
    /**
     * {@link DateTime#toLocaleString} format like 'Oct 14, 1983, 9:30:33 AM'. Only 12-hour if the locale is.
     * @type {Object}
     */
    static get DATETIME_MED_WITH_SECONDS() {
        return DATETIME_MED_WITH_SECONDS;
    }
    /**
     * {@link DateTime#toLocaleString} format like 'Fri, 14 Oct 1983, 9:30 AM'. Only 12-hour if the locale is.
     * @type {Object}
     */
    static get DATETIME_MED_WITH_WEEKDAY() {
        return DATETIME_MED_WITH_WEEKDAY;
    }
    /**
     * {@link DateTime#toLocaleString} format like 'October 14, 1983, 9:30 AM EDT'. Only 12-hour if the locale is.
     * @type {Object}
     */
    static get DATETIME_FULL() {
        return DATETIME_FULL;
    }
    /**
     * {@link DateTime#toLocaleString} format like 'October 14, 1983, 9:30:33 AM EDT'. Only 12-hour if the locale is.
     * @type {Object}
     */
    static get DATETIME_FULL_WITH_SECONDS() {
        return DATETIME_FULL_WITH_SECONDS;
    }
    /**
     * {@link DateTime#toLocaleString} format like 'Friday, October 14, 1983, 9:30 AM Eastern Daylight Time'. Only 12-hour if the locale is.
     * @type {Object}
     */
    static get DATETIME_HUGE() {
        return DATETIME_HUGE;
    }
    /**
     * {@link DateTime#toLocaleString} format like 'Friday, October 14, 1983, 9:30:33 AM Eastern Daylight Time'. Only 12-hour if the locale is.
     * @type {Object}
     */
    static get DATETIME_HUGE_WITH_SECONDS() {
        return DATETIME_HUGE_WITH_SECONDS;
    }
}
/**
 * @private
 */
function friendlyDateTime(dateTimeish) {
    if (DateTime.isDateTime(dateTimeish)) {
        return dateTimeish;
    }
    else if (dateTimeish && dateTimeish.valueOf && isNumber(dateTimeish.valueOf())) {
        return DateTime.fromJSDate(dateTimeish);
    }
    else if (dateTimeish && typeof dateTimeish === "object") {
        return DateTime.fromObject(dateTimeish);
    }
    else {
        throw new InvalidArgumentError(`Unknown datetime argument: ${dateTimeish}, of type ${typeof dateTimeish}`);
    }
}
const VERSION = "2.5.2";
export { DateTime, Duration, FixedOffsetZone, IANAZone, Info, Interval, InvalidZone, Settings, SystemZone, VERSION, Zone };
//# sourceMappingURL=luxon.js.map
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHV4b24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbHV4b24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMEVBQTBFOzs7Ozs7Ozs7Ozs7QUFFMUU7O0dBRUc7QUFDSCxNQUFNLFVBQVcsU0FBUSxLQUFLO0NBQUc7QUFFakM7O0dBRUc7QUFDSCxNQUFNLG9CQUFxQixTQUFRLFVBQVU7SUFDM0MsWUFBWSxNQUFNO1FBQ2hCLEtBQUssQ0FBQyxxQkFBcUIsTUFBTSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNuRCxDQUFDO0NBQ0Y7QUFFRDs7R0FFRztBQUNILE1BQU0sb0JBQXFCLFNBQVEsVUFBVTtJQUMzQyxZQUFZLE1BQU07UUFDaEIsS0FBSyxDQUFDLHFCQUFxQixNQUFNLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ25ELENBQUM7Q0FDRjtBQUVEOztHQUVHO0FBQ0gsTUFBTSxvQkFBcUIsU0FBUSxVQUFVO0lBQzNDLFlBQVksTUFBTTtRQUNoQixLQUFLLENBQUMscUJBQXFCLE1BQU0sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDbkQsQ0FBQztDQUNGO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLDZCQUE4QixTQUFRLFVBQVU7Q0FBRztBQUV6RDs7R0FFRztBQUNILE1BQU0sZ0JBQWlCLFNBQVEsVUFBVTtJQUN2QyxZQUFZLElBQUk7UUFDZCxLQUFLLENBQUMsZ0JBQWdCLElBQUksRUFBRSxDQUFDLENBQUM7SUFDaEMsQ0FBQztDQUNGO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLG9CQUFxQixTQUFRLFVBQVU7Q0FBRztBQUVoRDs7R0FFRztBQUNILE1BQU0sbUJBQW9CLFNBQVEsVUFBVTtJQUMxQztRQUNFLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Q0FDRjtBQUVEOztHQUVHO0FBRUgsTUFBTSxDQUFDLEdBQUcsU0FBUyxFQUNqQixDQUFDLEdBQUcsT0FB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LENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUN0RCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUNyRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsSUFBSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUNwRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUNyRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUN2RCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUN2RCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUM1RCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILElBQUksT0FBTztRQUNULE9B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QUM7SUFDM0MsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxJQUFJLEdBQUc7UUFDTCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDekMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDMUMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDNUMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDNUMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxJQUFJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDakQsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUNwRSxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxJQUFJLFVBQVU7UUFDWixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FB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R0FBRyxPQUFPLENBQUM7QUFFeEIsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQztBQUMzSCxpQ0FBaUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0aGVzZSBhcmVuJ3QgcmVhbGx5IHByaXZhdGUsIGJ1dCBub3IgYXJlIHRoZXkgcmVhbGx5IHVzZWZ1bCB0byBkb2N1bWVudFxuXG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbmNsYXNzIEx1eG9uRXJyb3IgZXh0ZW5kcyBFcnJvciB7fVxuXG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbmNsYXNzIEludmFsaWREYXRlVGltZUVycm9yIGV4dGVuZHMgTHV4b25FcnJvciB7XG4gIGNvbnN0cnVjdG9yKHJlYXNvbikge1xuICAgIHN1cGVyKGBJbnZhbGlkIERhdGVUaW1lOiAke3JlYXNvbi50b01lc3NhZ2UoKX1gKTtcbiAgfVxufVxuXG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbmNsYXNzIEludmFsaWRJbnRlcnZhbEVycm9yIGV4dGVuZHMgTHV4b25FcnJvciB7XG4gIGNvbnN0cnVjdG9yKHJlYXNvbikge1xuICAgIHN1cGVyKGBJbnZhbGlkIEludGVydmFsOiAke3JlYXNvbi50b01lc3NhZ2UoKX1gKTtcbiAgfVxufVxuXG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbmNsYXNzIEludmFsaWREdXJhdGlvbkVycm9yIGV4dGVuZHMgTHV4b25FcnJvciB7XG4gIGNvbnN0cnVjdG9yKHJlYXNvbikge1xuICAgIHN1cGVyKGBJbnZhbGlkIER1cmF0aW9uOiAke3JlYXNvbi50b01lc3NhZ2UoKX1gKTtcbiAgfVxufVxuXG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbmNsYXNzIENvbmZsaWN0aW5nU3BlY2lmaWNhdGlvbkVycm9yIGV4dGVuZHMgTHV4b25FcnJvciB7fVxuXG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbmNsYXNzIEludmFsaWRVbml0RXJyb3IgZXh0ZW5kcyBMdXhvbkVycm9yIHtcbiAgY29uc3RydWN0b3IodW5pdCkge1xuICAgIHN1cGVyKGBJbnZhbGlkIHVuaXQgJHt1bml0fWApO1xuICB9XG59XG5cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuY2xhc3MgSW52YWxpZEFyZ3VtZW50RXJyb3IgZXh0ZW5kcyBMdXhvbkVycm9yIHt9XG5cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuY2xhc3MgWm9uZUlzQWJzdHJhY3RFcnJvciBleHRlbmRzIEx1eG9uRXJyb3Ige1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihcIlpvbmUgaXMgYW4gYWJzdHJhY3QgY2xhc3NcIik7XG4gIH1cbn1cblxuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5cbmNvbnN0IG4gPSBcIm51bWVyaWNcIixcbiAgcyA9IFwic2hvcnRcIixcbiAgbCA9IFwibG9uZ1wiO1xuXG5jb25zdCBEQVRFX1NIT1JUID0ge1xuICB5ZWFyOiBuLFxuICBtb250aDogbixcbiAgZGF5OiBuLFxufTtcblxuY29uc3QgREFURV9NRUQgPSB7XG4gIHllYXI6IG4sXG4gIG1vbnRoOiBzLFxuICBkYXk6IG4sXG59O1xuXG5jb25zdCBEQVRFX01FRF9XSVRIX1dFRUtEQVkgPSB7XG4gIHllYXI6IG4sXG4gIG1vbnRoOiBzLFxuICBkYXk6IG4sXG4gIHdlZWtkYXk6IHMsXG59O1xuXG5jb25zdCBEQVRFX0ZVTEwgPSB7XG4gIHllYXI6IG4sXG4gIG1vbnRoOiBsLFxuICBkYXk6IG4sXG59O1xuXG5jb25zdCBEQVRFX0hVR0UgPSB7XG4gIHllYXI6IG4sXG4gIG1vbnRoOiBsLFxuICBkYXk6IG4sXG4gIHdlZWtkYXk6IGwsXG59O1xuXG5jb25zdCBUSU1FX1NJTVBMRSA9IHtcbiAgaG91cjogbixcbiAgbWludXRlOiBuLFxufTtcblxuY29uc3QgVElNRV9XSVRIX1NFQ09ORFMgPSB7XG4gIGhvdXI6IG4sXG4gIG1pbnV0ZTogbixcbiAgc2Vjb25kOiBuLFxufTtcblxuY29uc3QgVElNRV9XSVRIX1NIT1JUX09GRlNFVCA9IHtcbiAgaG91cjogbixcbiAgbWludXRlOiBuLFxuICBzZWNvbmQ6IG4sXG4gIHRpbWVab25lTmFtZTogcyxcbn07XG5cbmNvbnN0IFRJTUVfV0lUSF9MT05HX09GRlNFVCA9IHtcbiAgaG91cjogbixcbiAgbWludXRlOiBuLFxuICBzZWNvbmQ6IG4sXG4gIHRpbWVab25lTmFtZTogbCxcbn07XG5cbmNvbnN0IFRJTUVfMjRfU0lNUExFID0ge1xuICBob3VyOiBuLFxuICBtaW51dGU6IG4sXG4gIGhvdXJDeWNsZTogXCJoMjNcIixcbn07XG5cbmNvbnN0IFRJTUVfMjRfV0lUSF9TRUNPTkRTID0ge1xuICBob3VyOiBuLFxuICBtaW51dGU6IG4sXG4gIHNlY29uZDogbixcbiAgaG91ckN5Y2xlOiBcImgyM1wiLFxufTtcblxuY29uc3QgVElNRV8yNF9XSVRIX1NIT1JUX09GRlNFVCA9IHtcbiAgaG91cjogbixcbiAgbWludXRlOiBuLFxuICBzZWNvbmQ6IG4sXG4gIGhvdXJDeWNsZTogXCJoMjNcIixcbiAgdGltZVpvbmVOYW1lOiBzLFxufTtcblxuY29uc3QgVElNRV8yNF9XSVRIX0xPTkdfT0ZGU0VUID0ge1xuICBob3VyOiBuLFxuICBtaW51dGU6IG4sXG4gIHNlY29uZDogbixcbiAgaG91ckN5Y2xlOiBcImgyM1wiLFxuICB0aW1lWm9uZU5hbWU6IGwsXG59O1xuXG5jb25zdCBEQVRFVElNRV9TSE9SVCA9IHtcbiAgeWVhcjogbixcbiAgbW9udGg6IG4sXG4gIGRheTogbixcbiAgaG91cjogbixcbiAgbWludXRlOiBuLFxufTtcblxuY29uc3QgREFURVRJTUVfU0hPUlRfV0lUSF9TRUNPTkRTID0ge1xuICB5ZWFyOiBuLFxuICBtb250aDogbixcbiAgZGF5OiBuLFxuICBob3VyOiBuLFxuICBtaW51dGU6IG4sXG4gIHNlY29uZDogbixcbn07XG5cbmNvbnN0IERBVEVUSU1FX01FRCA9IHtcbiAgeWVhcjogbixcbiAgbW9udGg6IHMsXG4gIGRheTogbixcbiAgaG91cjogbixcbiAgbWludXRlOiBuLFxufTtcblxuY29uc3QgREFURVRJTUVfTUVEX1dJVEhfU0VDT05EUyA9IHtcbiAgeWVhcjogbixcbiAgbW9udGg6IHMsXG4gIGRheTogbixcbiAgaG91cjogbixcbiAgbWludXRlOiBuLFxuICBzZWNvbmQ6IG4sXG59O1xuXG5jb25zdCBEQVRFVElNRV9NRURfV0lUSF9XRUVLREFZID0ge1xuICB5ZWFyOiBuLFxuICBtb250aDogcyxcbiAgZGF5OiBuLFxuICB3ZWVrZGF5OiBzLFxuICBob3VyOiBuLFxuICBtaW51dGU6IG4sXG59O1xuXG5jb25zdCBEQVRFVElNRV9GVUxMID0ge1xuICB5ZWFyOiBuLFxuICBtb250aDogbCxcbiAgZGF5OiBuLFxuICBob3VyOiBuLFxuICBtaW51dGU6IG4sXG4gIHRpbWVab25lTmFtZTogcyxcbn07XG5cbmNvbnN0IERBVEVUSU1FX0ZVTExfV0lUSF9TRUNPTkRTID0ge1xuICB5ZWFyOiBuLFxuICBtb250aDogbCxcbiAgZGF5OiBuLFxuICBob3VyOiBuLFxuICBtaW51dGU6IG4sXG4gIHNlY29uZDogbixcbiAgdGltZVpvbmVOYW1lOiBzLFxufTtcblxuY29uc3QgREFURVRJTUVfSFVHRSA9IHtcbiAgeWVhcjogbixcbiAgbW9udGg6IGwsXG4gIGRheTogbixcbiAgd2Vla2RheTogbCxcbiAgaG91cjogbixcbiAgbWludXRlOiBuLFxuICB0aW1lWm9uZU5hbWU6IGwsXG59O1xuXG5jb25zdCBEQVRFVElNRV9IVUdFX1dJVEhfU0VDT05EUyA9IHtcbiAgeWVhcjogbixcbiAgbW9udGg6IGwsXG4gIGRheTogbixcbiAgd2Vla2RheTogbCxcbiAgaG91cjogbixcbiAgbWludXRlOiBuLFxuICBzZWNvbmQ6IG4sXG4gIHRpbWVab25lTmFtZTogbCxcbn07XG5cbi8qXG4gIFRoaXMgaXMganVzdCBhIGp1bmsgZHJhd2VyLCBjb250YWluaW5nIGFueXRoaW5nIHVzZWQgYWNyb3NzIG11bHRpcGxlIGNsYXNzZXMuXG4gIEJlY2F1c2UgTHV4b24gaXMgc21hbGwoaXNoKSwgdGhpcyBzaG91bGQgc3RheSBzbWFsbCBhbmQgd2Ugd29uJ3Qgd29ycnkgYWJvdXQgc3BsaXR0aW5nXG4gIGl0IHVwIGludG8sIHNheSwgcGFyc2luZ1V0aWwuanMgYW5kIGJhc2ljVXRpbC5qcyBhbmQgc28gb24uIEJ1dCB0aGV5IGFyZSBkaXZpZGVkIHVwIGJ5IGZlYXR1cmUgYXJlYS5cbiovXG5cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuXG4vLyBUWVBFU1xuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChvKSB7XG4gIHJldHVybiB0eXBlb2YgbyA9PT0gXCJ1bmRlZmluZWRcIjtcbn1cblxuZnVuY3Rpb24gaXNOdW1iZXIobykge1xuICByZXR1cm4gdHlwZW9mIG8gPT09IFwibnVtYmVyXCI7XG59XG5cbmZ1bmN0aW9uIGlzSW50ZWdlcihvKSB7XG4gIHJldHVybiB0eXBlb2YgbyA9PT0gXCJudW1iZXJcIiAmJiBvICUgMSA9PT0gMDtcbn1cblxuZnVuY3Rpb24gaXNTdHJpbmcobykge1xuICByZXR1cm4gdHlwZW9mIG8gPT09IFwic3RyaW5nXCI7XG59XG5cbmZ1bmN0aW9uIGlzRGF0ZShvKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykgPT09IFwiW29iamVjdCBEYXRlXVwiO1xufVxuXG4vLyBDQVBBQklMSVRJRVNcblxuZnVuY3Rpb24gaGFzUmVsYXRpdmUoKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHR5cGVvZiBJbnRsICE9PSBcInVuZGVmaW5lZFwiICYmICEhSW50bC5SZWxhdGl2ZVRpbWVGb3JtYXQ7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLy8gT0JKRUNUUyBBTkQgQVJSQVlTXG5cbmZ1bmN0aW9uIG1heWJlQXJyYXkodGhpbmcpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkodGhpbmcpID8gdGhpbmcgOiBbdGhpbmddO1xufVxuXG5mdW5jdGlvbiBiZXN0QnkoYXJyLCBieSwgY29tcGFyZSkge1xuICBpZiAoYXJyLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgcmV0dXJuIGFyci5yZWR1Y2UoKGJlc3QsIG5leHQpID0+IHtcbiAgICBjb25zdCBwYWlyID0gW2J5KG5leHQpLCBuZXh0XTtcbiAgICBpZiAoIWJlc3QpIHtcbiAgICAgIHJldHVybiBwYWlyO1xuICAgIH0gZWxzZSBpZiAoY29tcGFyZShiZXN0WzBdLCBwYWlyWzBdKSA9PT0gYmVzdFswXSkge1xuICAgICAgcmV0dXJuIGJlc3Q7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBwYWlyO1xuICAgIH1cbiAgfSwgbnVsbClbMV07XG59XG5cbmZ1bmN0aW9uIHBpY2sob2JqLCBrZXlzKSB7XG4gIHJldHVybiBrZXlzLnJlZHVjZSgoYSwgaykgPT4ge1xuICAgIGFba10gPSBvYmpba107XG4gICAgcmV0dXJuIGE7XG4gIH0sIHt9KTtcbn1cblxuZnVuY3Rpb24gaGFzT3duUHJvcGVydHkob2JqLCBwcm9wKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTtcbn1cblxuLy8gTlVNQkVSUyBBTkQgU1RSSU5HU1xuXG5mdW5jdGlvbiBpbnRlZ2VyQmV0d2Vlbih0aGluZywgYm90dG9tLCB0b3ApIHtcbiAgcmV0dXJuIGlzSW50ZWdlcih0aGluZykgJiYgdGhpbmcgPj0gYm90dG9tICYmIHRoaW5nIDw9IHRvcDtcbn1cblxuLy8geCAlIG4gYnV0IHRha2VzIHRoZSBzaWduIG9mIG4gaW5zdGVhZCBvZiB4XG5mdW5jdGlvbiBmbG9vck1vZCh4LCBuKSB7XG4gIHJldHVybiB4IC0gbiAqIE1hdGguZmxvb3IoeCAvIG4pO1xufVxuXG5mdW5jdGlvbiBwYWRTdGFydChpbnB1dCwgbiA9IDIpIHtcbiAgY29uc3QgaXNOZWcgPSBpbnB1dCA8IDA7XG4gIGxldCBwYWRkZWQ7XG4gIGlmIChpc05lZykge1xuICAgIHBhZGRlZCA9IFwiLVwiICsgKFwiXCIgKyAtaW5wdXQpLnBhZFN0YXJ0KG4sIFwiMFwiKTtcbiAgfSBlbHNlIHtcbiAgICBwYWRkZWQgPSAoXCJcIiArIGlucHV0KS5wYWRTdGFydChuLCBcIjBcIik7XG4gIH1cbiAgcmV0dXJuIHBhZGRlZDtcbn1cblxuZnVuY3Rpb24gcGFyc2VJbnRlZ2VyKHN0cmluZykge1xuICBpZiAoaXNVbmRlZmluZWQoc3RyaW5nKSB8fCBzdHJpbmcgPT09IG51bGwgfHwgc3RyaW5nID09PSBcIlwiKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcGFyc2VJbnQoc3RyaW5nLCAxMCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VGbG9hdGluZyhzdHJpbmcpIHtcbiAgaWYgKGlzVW5kZWZpbmVkKHN0cmluZykgfHwgc3RyaW5nID09PSBudWxsIHx8IHN0cmluZyA9PT0gXCJcIikge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHBhcnNlRmxvYXQoc3RyaW5nKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwYXJzZU1pbGxpcyhmcmFjdGlvbikge1xuICAvLyBSZXR1cm4gdW5kZWZpbmVkIChpbnN0ZWFkIG9mIDApIGluIHRoZXNlIGNhc2VzLCB3aGVyZSBmcmFjdGlvbiBpcyBub3Qgc2V0XG4gIGlmIChpc1VuZGVmaW5lZChmcmFjdGlvbikgfHwgZnJhY3Rpb24gPT09IG51bGwgfHwgZnJhY3Rpb24gPT09IFwiXCIpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IGYgPSBwYXJzZUZsb2F0KFwiMC5cIiArIGZyYWN0aW9uKSAqIDEwMDA7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoZik7XG4gIH1cbn1cblxuZnVuY3Rpb24gcm91bmRUbyhudW1iZXIsIGRpZ2l0cywgdG93YXJkWmVybyA9IGZhbHNlKSB7XG4gIGNvbnN0IGZhY3RvciA9IDEwICoqIGRpZ2l0cyxcbiAgICByb3VuZGVyID0gdG93YXJkWmVybyA/IE1hdGgudHJ1bmMgOiBNYXRoLnJvdW5kO1xuICByZXR1cm4gcm91bmRlcihudW1iZXIgKiBmYWN0b3IpIC8gZmFjdG9yO1xufVxuXG4vLyBEQVRFIEJBU0lDU1xuXG5mdW5jdGlvbiBpc0xlYXBZZWFyKHllYXIpIHtcbiAgcmV0dXJuIHllYXIgJSA0ID09PSAwICYmICh5ZWFyICUgMTAwICE9PSAwIHx8IHllYXIgJSA0MDAgPT09IDApO1xufVxuXG5mdW5jdGlvbiBkYXlzSW5ZZWFyKHllYXIpIHtcbiAgcmV0dXJuIGlzTGVhcFllYXIoeWVhcikgPyAzNjYgOiAzNjU7XG59XG5cbmZ1bmN0aW9uIGRheXNJbk1vbnRoKHllYXIsIG1vbnRoKSB7XG4gIGNvbnN0IG1vZE1vbnRoID0gZmxvb3JNb2QobW9udGggLSAxLCAxMikgKyAxLFxuICAgIG1vZFllYXIgPSB5ZWFyICsgKG1vbnRoIC0gbW9kTW9udGgpIC8gMTI7XG5cbiAgaWYgKG1vZE1vbnRoID09PSAyKSB7XG4gICAgcmV0dXJuIGlzTGVhcFllYXIobW9kWWVhcikgPyAyOSA6IDI4O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBbMzEsIG51bGwsIDMxLCAzMCwgMzEsIDMwLCAzMSwgMzEsIDMwLCAzMSwgMzAsIDMxXVttb2RNb250aCAtIDFdO1xuICB9XG59XG5cbi8vIGNvdmVydCBhIGNhbGVuZGFyIG9iamVjdCB0byBhIGxvY2FsIHRpbWVzdGFtcCAoZXBvY2gsIGJ1dCB3aXRoIHRoZSBvZmZzZXQgYmFrZWQgaW4pXG5mdW5jdGlvbiBvYmpUb0xvY2FsVFMob2JqKSB7XG4gIGxldCBkID0gRGF0ZS5VVEMoXG4gICAgb2JqLnllYXIsXG4gICAgb2JqLm1vbnRoIC0gMSxcbiAgICBvYmouZGF5LFxuICAgIG9iai5ob3VyLFxuICAgIG9iai5taW51dGUsXG4gICAgb2JqLnNlY29uZCxcbiAgICBvYmoubWlsbGlzZWNvbmRcbiAgKTtcblxuICAvLyBmb3IgbGVnYWN5IHJlYXNvbnMsIHllYXJzIGJldHdlZW4gMCBhbmQgOTkgYXJlIGludGVycHJldGVkIGFzIDE5WFg7IHJldmVydCB0aGF0XG4gIGlmIChvYmoueWVhciA8IDEwMCAmJiBvYmoueWVhciA+PSAwKSB7XG4gICAgZCA9IG5ldyBEYXRlKGQpO1xuICAgIGQuc2V0VVRDRnVsbFllYXIoZC5nZXRVVENGdWxsWWVhcigpIC0gMTkwMCk7XG4gIH1cbiAgcmV0dXJuICtkO1xufVxuXG5mdW5jdGlvbiB3ZWVrc0luV2Vla1llYXIod2Vla1llYXIpIHtcbiAgY29uc3QgcDEgPVxuICAgICAgKHdlZWtZZWFyICtcbiAgICAgICAgTWF0aC5mbG9vcih3ZWVrWWVhciAvIDQpIC1cbiAgICAgICAgTWF0aC5mbG9vcih3ZWVrWWVhciAvIDEwMCkgK1xuICAgICAgICBNYXRoLmZsb29yKHdlZWtZZWFyIC8gNDAwKSkgJVxuICAgICAgNyxcbiAgICBsYXN0ID0gd2Vla1llYXIgLSAxLFxuICAgIHAyID0gKGxhc3QgKyBNYXRoLmZsb29yKGxhc3QgLyA0KSAtIE1hdGguZmxvb3IobGFzdCAvIDEwMCkgKyBNYXRoLmZsb29yKGxhc3QgLyA0MDApKSAlIDc7XG4gIHJldHVybiBwMSA9PT0gNCB8fCBwMiA9PT0gMyA/IDUzIDogNTI7XG59XG5cbmZ1bmN0aW9uIHVudHJ1bmNhdGVZZWFyKHllYXIpIHtcbiAgaWYgKHllYXIgPiA5OSkge1xuICAgIHJldHVybiB5ZWFyO1xuICB9IGVsc2UgcmV0dXJuIHllYXIgPiA2MCA/IDE5MDAgKyB5ZWFyIDogMjAwMCArIHllYXI7XG59XG5cbi8vIFBBUlNJTkdcblxuZnVuY3Rpb24gcGFyc2Vab25lSW5mbyh0cywgb2Zmc2V0Rm9ybWF0LCBsb2NhbGUsIHRpbWVab25lID0gbnVsbCkge1xuICBjb25zdCBkYXRlID0gbmV3IERhdGUodHMpLFxuICAgIGludGxPcHRzID0ge1xuICAgICAgaG91ckN5Y2xlOiBcImgyM1wiLFxuICAgICAgeWVhcjogXCJudW1lcmljXCIsXG4gICAgICBtb250aDogXCIyLWRpZ2l0XCIsXG4gICAgICBkYXk6IFwiMi1kaWdpdFwiLFxuICAgICAgaG91cjogXCIyLWRpZ2l0XCIsXG4gICAgICBtaW51dGU6IFwiMi1kaWdpdFwiLFxuICAgIH07XG5cbiAgaWYgKHRpbWVab25lKSB7XG4gICAgaW50bE9wdHMudGltZVpvbmUgPSB0aW1lWm9uZTtcbiAgfVxuXG4gIGNvbnN0IG1vZGlmaWVkID0geyB0aW1lWm9uZU5hbWU6IG9mZnNldEZvcm1hdCwgLi4uaW50bE9wdHMgfTtcblxuICBjb25zdCBwYXJzZWQgPSBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChsb2NhbGUsIG1vZGlmaWVkKVxuICAgIC5mb3JtYXRUb1BhcnRzKGRhdGUpXG4gICAgLmZpbmQoKG0pID0+IG0udHlwZS50b0xvd2VyQ2FzZSgpID09PSBcInRpbWV6b25lbmFtZVwiKTtcbiAgcmV0dXJuIHBhcnNlZCA/IHBhcnNlZC52YWx1ZSA6IG51bGw7XG59XG5cbi8vIHNpZ25lZE9mZnNldCgnLTUnLCAnMzAnKSAtPiAtMzMwXG5mdW5jdGlvbiBzaWduZWRPZmZzZXQob2ZmSG91clN0ciwgb2ZmTWludXRlU3RyKSB7XG4gIGxldCBvZmZIb3VyID0gcGFyc2VJbnQob2ZmSG91clN0ciwgMTApO1xuXG4gIC8vIGRvbid0IHx8IHRoaXMgYmVjYXVzZSB3ZSB3YW50IHRvIHByZXNlcnZlIC0wXG4gIGlmIChOdW1iZXIuaXNOYU4ob2ZmSG91cikpIHtcbiAgICBvZmZIb3VyID0gMDtcbiAgfVxuXG4gIGNvbnN0IG9mZk1pbiA9IHBhcnNlSW50KG9mZk1pbnV0ZVN0ciwgMTApIHx8IDAsXG4gICAgb2ZmTWluU2lnbmVkID0gb2ZmSG91ciA8IDAgfHwgT2JqZWN0LmlzKG9mZkhvdXIsIC0wKSA/IC1vZmZNaW4gOiBvZmZNaW47XG4gIHJldHVybiBvZmZIb3VyICogNjAgKyBvZmZNaW5TaWduZWQ7XG59XG5cbi8vIENPRVJDSU9OXG5cbmZ1bmN0aW9uIGFzTnVtYmVyKHZhbHVlKSB7XG4gIGNvbnN0IG51bWVyaWNWYWx1ZSA9IE51bWJlcih2YWx1ZSk7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiIHx8IHZhbHVlID09PSBcIlwiIHx8IE51bWJlci5pc05hTihudW1lcmljVmFsdWUpKVxuICAgIHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFcnJvcihgSW52YWxpZCB1bml0IHZhbHVlICR7dmFsdWV9YCk7XG4gIHJldHVybiBudW1lcmljVmFsdWU7XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZU9iamVjdChvYmosIG5vcm1hbGl6ZXIpIHtcbiAgY29uc3Qgbm9ybWFsaXplZCA9IHt9O1xuICBmb3IgKGNvbnN0IHUgaW4gb2JqKSB7XG4gICAgaWYgKGhhc093blByb3BlcnR5KG9iaiwgdSkpIHtcbiAgICAgIGNvbnN0IHYgPSBvYmpbdV07XG4gICAgICBpZiAodiA9PT0gdW5kZWZpbmVkIHx8IHYgPT09IG51bGwpIGNvbnRpbnVlO1xuICAgICAgbm9ybWFsaXplZFtub3JtYWxpemVyKHUpXSA9IGFzTnVtYmVyKHYpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbm9ybWFsaXplZDtcbn1cblxuZnVuY3Rpb24gZm9ybWF0T2Zmc2V0KG9mZnNldCwgZm9ybWF0KSB7XG4gIGNvbnN0IGhvdXJzID0gTWF0aC50cnVuYyhNYXRoLmFicyhvZmZzZXQgLyA2MCkpLFxuICAgIG1pbnV0ZXMgPSBNYXRoLnRydW5jKE1hdGguYWJzKG9mZnNldCAlIDYwKSksXG4gICAgc2lnbiA9IG9mZnNldCA+PSAwID8gXCIrXCIgOiBcIi1cIjtcblxuICBzd2l0Y2ggKGZvcm1hdCkge1xuICAgIGNhc2UgXCJzaG9ydFwiOlxuICAgICAgcmV0dXJuIGAke3NpZ259JHtwYWRTdGFydChob3VycywgMil9OiR7cGFkU3RhcnQobWludXRlcywgMil9YDtcbiAgICBjYXNlIFwibmFycm93XCI6XG4gICAgICByZXR1cm4gYCR7c2lnbn0ke2hvdXJzfSR7bWludXRlcyA+IDAgPyBgOiR7bWludXRlc31gIDogXCJcIn1gO1xuICAgIGNhc2UgXCJ0ZWNoaWVcIjpcbiAgICAgIHJldHVybiBgJHtzaWdufSR7cGFkU3RhcnQoaG91cnMsIDIpfSR7cGFkU3RhcnQobWludXRlcywgMil9YDtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoYFZhbHVlIGZvcm1hdCAke2Zvcm1hdH0gaXMgb3V0IG9mIHJhbmdlIGZvciBwcm9wZXJ0eSBmb3JtYXRgKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB0aW1lT2JqZWN0KG9iaikge1xuICByZXR1cm4gcGljayhvYmosIFtcImhvdXJcIiwgXCJtaW51dGVcIiwgXCJzZWNvbmRcIiwgXCJtaWxsaXNlY29uZFwiXSk7XG59XG5cbmNvbnN0IGlhbmFSZWdleCA9XG4gIC9bQS1aYS16XystXXsxLDI1Nn0oPzo6P1xcL1tBLVphLXowLTlfKy1dezEsMjU2fSg/OlxcL1tBLVphLXowLTlfKy1dezEsMjU2fSk/KT8vO1xuXG4vKipcbiAqIEBwcml2YXRlXG4gKi9cblxuY29uc3QgbW9udGhzTG9uZyA9IFtcbiAgXCJKYW51YXJ5XCIsXG4gIFwiRmVicnVhcnlcIixcbiAgXCJNYXJjaFwiLFxuICBcIkFwcmlsXCIsXG4gIFwiTWF5XCIsXG4gIFwiSnVuZVwiLFxuICBcIkp1bHlcIixcbiAgXCJBdWd1c3RcIixcbiAgXCJTZXB0ZW1iZXJcIixcbiAgXCJPY3RvYmVyXCIsXG4gIFwiTm92ZW1iZXJcIixcbiAgXCJEZWNlbWJlclwiLFxuXTtcblxuY29uc3QgbW9udGhzU2hvcnQgPSBbXG4gIFwiSmFuXCIsXG4gIFwiRmViXCIsXG4gIFwiTWFyXCIsXG4gIFwiQXByXCIsXG4gIFwiTWF5XCIsXG4gIFwiSnVuXCIsXG4gIFwiSnVsXCIsXG4gIFwiQXVnXCIsXG4gIFwiU2VwXCIsXG4gIFwiT2N0XCIsXG4gIFwiTm92XCIsXG4gIFwiRGVjXCIsXG5dO1xuXG5jb25zdCBtb250aHNOYXJyb3cgPSBbXCJKXCIsIFwiRlwiLCBcIk1cIiwgXCJBXCIsIFwiTVwiLCBcIkpcIiwgXCJKXCIsIFwiQVwiLCBcIlNcIiwgXCJPXCIsIFwiTlwiLCBcIkRcIl07XG5cbmZ1bmN0aW9uIG1vbnRocyhsZW5ndGgpIHtcbiAgc3dpdGNoIChsZW5ndGgpIHtcbiAgICBjYXNlIFwibmFycm93XCI6XG4gICAgICByZXR1cm4gWy4uLm1vbnRoc05hcnJvd107XG4gICAgY2FzZSBcInNob3J0XCI6XG4gICAgICByZXR1cm4gWy4uLm1vbnRoc1Nob3J0XTtcbiAgICBjYXNlIFwibG9uZ1wiOlxuICAgICAgcmV0dXJuIFsuLi5tb250aHNMb25nXTtcbiAgICBjYXNlIFwibnVtZXJpY1wiOlxuICAgICAgcmV0dXJuIFtcIjFcIiwgXCIyXCIsIFwiM1wiLCBcIjRcIiwgXCI1XCIsIFwiNlwiLCBcIjdcIiwgXCI4XCIsIFwiOVwiLCBcIjEwXCIsIFwiMTFcIiwgXCIxMlwiXTtcbiAgICBjYXNlIFwiMi1kaWdpdFwiOlxuICAgICAgcmV0dXJuIFtcIjAxXCIsIFwiMDJcIiwgXCIwM1wiLCBcIjA0XCIsIFwiMDVcIiwgXCIwNlwiLCBcIjA3XCIsIFwiMDhcIiwgXCIwOVwiLCBcIjEwXCIsIFwiMTFcIiwgXCIxMlwiXTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuY29uc3Qgd2Vla2RheXNMb25nID0gW1xuICBcIk1vbmRheVwiLFxuICBcIlR1ZXNkYXlcIixcbiAgXCJXZWRuZXNkYXlcIixcbiAgXCJUaHVyc2RheVwiLFxuICBcIkZyaWRheVwiLFxuICBcIlNhdHVyZGF5XCIsXG4gIFwiU3VuZGF5XCIsXG5dO1xuXG5jb25zdCB3ZWVrZGF5c1Nob3J0ID0gW1wiTW9uXCIsIFwiVHVlXCIsIFwiV2VkXCIsIFwiVGh1XCIsIFwiRnJpXCIsIFwiU2F0XCIsIFwiU3VuXCJdO1xuXG5jb25zdCB3ZWVrZGF5c05hcnJvdyA9IFtcIk1cIiwgXCJUXCIsIFwiV1wiLCBcIlRcIiwgXCJGXCIsIFwiU1wiLCBcIlNcIl07XG5cbmZ1bmN0aW9uIHdlZWtkYXlzKGxlbmd0aCkge1xuICBzd2l0Y2ggKGxlbmd0aCkge1xuICAgIGNhc2UgXCJuYXJyb3dcIjpcbiAgICAgIHJldHVybiBbLi4ud2Vla2RheXNOYXJyb3ddO1xuICAgIGNhc2UgXCJzaG9ydFwiOlxuICAgICAgcmV0dXJuIFsuLi53ZWVrZGF5c1Nob3J0XTtcbiAgICBjYXNlIFwibG9uZ1wiOlxuICAgICAgcmV0dXJuIFsuLi53ZWVrZGF5c0xvbmddO1xuICAgIGNhc2UgXCJudW1lcmljXCI6XG4gICAgICByZXR1cm4gW1wiMVwiLCBcIjJcIiwgXCIzXCIsIFwiNFwiLCBcIjVcIiwgXCI2XCIsIFwiN1wiXTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuY29uc3QgbWVyaWRpZW1zID0gW1wiQU1cIiwgXCJQTVwiXTtcblxuY29uc3QgZXJhc0xvbmcgPSBbXCJCZWZvcmUgQ2hyaXN0XCIsIFwiQW5ubyBEb21pbmlcIl07XG5cbmNvbnN0IGVyYXNTaG9ydCA9IFtcIkJDXCIsIFwiQURcIl07XG5cbmNvbnN0IGVyYXNOYXJyb3cgPSBbXCJCXCIsIFwiQVwiXTtcblxuZnVuY3Rpb24gZXJhcyhsZW5ndGgpIHtcbiAgc3dpdGNoIChsZW5ndGgpIHtcbiAgICBjYXNlIFwibmFycm93XCI6XG4gICAgICByZXR1cm4gWy4uLmVyYXNOYXJyb3ddO1xuICAgIGNhc2UgXCJzaG9ydFwiOlxuICAgICAgcmV0dXJuIFsuLi5lcmFzU2hvcnRdO1xuICAgIGNhc2UgXCJsb25nXCI6XG4gICAgICByZXR1cm4gWy4uLmVyYXNMb25nXTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuZnVuY3Rpb24gbWVyaWRpZW1Gb3JEYXRlVGltZShkdCkge1xuICByZXR1cm4gbWVyaWRpZW1zW2R0LmhvdXIgPCAxMiA/IDAgOiAxXTtcbn1cblxuZnVuY3Rpb24gd2Vla2RheUZvckRhdGVUaW1lKGR0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIHdlZWtkYXlzKGxlbmd0aClbZHQud2Vla2RheSAtIDFdO1xufVxuXG5mdW5jdGlvbiBtb250aEZvckRhdGVUaW1lKGR0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIG1vbnRocyhsZW5ndGgpW2R0Lm1vbnRoIC0gMV07XG59XG5cbmZ1bmN0aW9uIGVyYUZvckRhdGVUaW1lKGR0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGVyYXMobGVuZ3RoKVtkdC55ZWFyIDwgMCA/IDAgOiAxXTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0UmVsYXRpdmVUaW1lKHVuaXQsIGNvdW50LCBudW1lcmljID0gXCJhbHdheXNcIiwgbmFycm93ID0gZmFsc2UpIHtcbiAgY29uc3QgdW5pdHMgPSB7XG4gICAgeWVhcnM6IFtcInllYXJcIiwgXCJ5ci5cIl0sXG4gICAgcXVhcnRlcnM6IFtcInF1YXJ0ZXJcIiwgXCJxdHIuXCJdLFxuICAgIG1vbnRoczogW1wibW9udGhcIiwgXCJtby5cIl0sXG4gICAgd2Vla3M6IFtcIndlZWtcIiwgXCJ3ay5cIl0sXG4gICAgZGF5czogW1wiZGF5XCIsIFwiZGF5XCIsIFwiZGF5c1wiXSxcbiAgICBob3VyczogW1wiaG91clwiLCBcImhyLlwiXSxcbiAgICBtaW51dGVzOiBbXCJtaW51dGVcIiwgXCJtaW4uXCJdLFxuICAgIHNlY29uZHM6IFtcInNlY29uZFwiLCBcInNlYy5cIl0sXG4gIH07XG5cbiAgY29uc3QgbGFzdGFibGUgPSBbXCJob3Vyc1wiLCBcIm1pbnV0ZXNcIiwgXCJzZWNvbmRzXCJdLmluZGV4T2YodW5pdCkgPT09IC0xO1xuXG4gIGlmIChudW1lcmljID09PSBcImF1dG9cIiAmJiBsYXN0YWJsZSkge1xuICAgIGNvbnN0IGlzRGF5ID0gdW5pdCA9PT0gXCJkYXlzXCI7XG4gICAgc3dpdGNoIChjb3VudCkge1xuICAgICAgY2FzZSAxOlxuICAgICAgICByZXR1cm4gaXNEYXkgPyBcInRvbW9ycm93XCIgOiBgbmV4dCAke3VuaXRzW3VuaXRdWzBdfWA7XG4gICAgICBjYXNlIC0xOlxuICAgICAgICByZXR1cm4gaXNEYXkgPyBcInllc3RlcmRheVwiIDogYGxhc3QgJHt1bml0c1t1bml0XVswXX1gO1xuICAgICAgY2FzZSAwOlxuICAgICAgICByZXR1cm4gaXNEYXkgPyBcInRvZGF5XCIgOiBgdGhpcyAke3VuaXRzW3VuaXRdWzBdfWA7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgaXNJblBhc3QgPSBPYmplY3QuaXMoY291bnQsIC0wKSB8fCBjb3VudCA8IDAsXG4gICAgZm10VmFsdWUgPSBNYXRoLmFicyhjb3VudCksXG4gICAgc2luZ3VsYXIgPSBmbXRWYWx1ZSA9PT0gMSxcbiAgICBsaWxVbml0cyA9IHVuaXRzW3VuaXRdLFxuICAgIGZtdFVuaXQgPSBuYXJyb3dcbiAgICAgID8gc2luZ3VsYXJcbiAgICAgICAgPyBsaWxVbml0c1sxXVxuICAgICAgICA6IGxpbFVuaXRzWzJdIHx8IGxpbFVuaXRzWzFdXG4gICAgICA6IHNpbmd1bGFyXG4gICAgICAgID8gdW5pdHNbdW5pdF1bMF1cbiAgICAgICAgOiB1bml0O1xuICByZXR1cm4gaXNJblBhc3QgPyBgJHtmbXRWYWx1ZX0gJHtmbXRVbml0fSBhZ29gIDogYGluICR7Zm10VmFsdWV9ICR7Zm10VW5pdH1gO1xufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnlUb2tlbnMoc3BsaXRzLCB0b2tlblRvU3RyaW5nKSB7XG4gIGxldCBzID0gXCJcIjtcbiAgZm9yIChjb25zdCB0b2tlbiBvZiBzcGxpdHMpIHtcbiAgICBpZiAodG9rZW4ubGl0ZXJhbCkge1xuICAgICAgcyArPSB0b2tlbi52YWw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHMgKz0gdG9rZW5Ub1N0cmluZyh0b2tlbi52YWwpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcztcbn1cblxuY29uc3QgbWFjcm9Ub2tlblRvRm9ybWF0T3B0cyA9IHtcbiAgRDogREFURV9TSE9SVCxcbiAgREQ6IERBVEVfTUVELFxuICBEREQ6IERBVEVfRlVMTCxcbiAgRERERDogREFURV9IVUdFLFxuICB0OiBUSU1FX1NJTVBMRSxcbiAgdHQ6IFRJTUVfV0lUSF9TRUNPTkRTLFxuICB0dHQ6IFRJTUVfV0lUSF9TSE9SVF9PRkZTRVQsXG4gIHR0dHQ6IFRJTUVfV0lUSF9MT05HX09GRlNFVCxcbiAgVDogVElNRV8yNF9TSU1QTEUsXG4gIFRUOiBUSU1FXzI0X1dJVEhfU0VDT05EUyxcbiAgVFRUOiBUSU1FXzI0X1dJVEhfU0hPUlRfT0ZGU0VULFxuICBUVFRUOiBUSU1FXzI0X1dJVEhfTE9OR19PRkZTRVQsXG4gIGY6IERBVEVUSU1FX1NIT1JULFxuICBmZjogREFURVRJTUVfTUVELFxuICBmZmY6IERBVEVUSU1FX0ZVTEwsXG4gIGZmZmY6IERBVEVUSU1FX0hVR0UsXG4gIEY6IERBVEVUSU1FX1NIT1JUX1dJVEhfU0VDT05EUyxcbiAgRkY6IERBVEVUSU1FX01FRF9XSVRIX1NFQ09ORFMsXG4gIEZGRjogREFURVRJTUVfRlVMTF9XSVRIX1NFQ09ORFMsXG4gIEZGRkY6IERBVEVUSU1FX0hVR0VfV0lUSF9TRUNPTkRTLFxufTtcblxuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5cbmNsYXNzIEZvcm1hdHRlciB7XG4gIHN0YXRpYyBjcmVhdGUobG9jYWxlLCBvcHRzID0ge30pIHtcbiAgICByZXR1cm4gbmV3IEZvcm1hdHRlcihsb2NhbGUsIG9wdHMpO1xuICB9XG5cbiAgc3RhdGljIHBhcnNlRm9ybWF0KGZtdCkge1xuICAgIGxldCBjdXJyZW50ID0gbnVsbCxcbiAgICAgIGN1cnJlbnRGdWxsID0gXCJcIixcbiAgICAgIGJyYWNrZXRlZCA9IGZhbHNlO1xuICAgIGNvbnN0IHNwbGl0cyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZm10Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBjID0gZm10LmNoYXJBdChpKTtcbiAgICAgIGlmIChjID09PSBcIidcIikge1xuICAgICAgICBpZiAoY3VycmVudEZ1bGwubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHNwbGl0cy5wdXNoKHsgbGl0ZXJhbDogYnJhY2tldGVkLCB2YWw6IGN1cnJlbnRGdWxsIH0pO1xuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnQgPSBudWxsO1xuICAgICAgICBjdXJyZW50RnVsbCA9IFwiXCI7XG4gICAgICAgIGJyYWNrZXRlZCA9ICFicmFja2V0ZWQ7XG4gICAgICB9IGVsc2UgaWYgKGJyYWNrZXRlZCkge1xuICAgICAgICBjdXJyZW50RnVsbCArPSBjO1xuICAgICAgfSBlbHNlIGlmIChjID09PSBjdXJyZW50KSB7XG4gICAgICAgIGN1cnJlbnRGdWxsICs9IGM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoY3VycmVudEZ1bGwubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHNwbGl0cy5wdXNoKHsgbGl0ZXJhbDogZmFsc2UsIHZhbDogY3VycmVudEZ1bGwgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY3VycmVudEZ1bGwgPSBjO1xuICAgICAgICBjdXJyZW50ID0gYztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY3VycmVudEZ1bGwubGVuZ3RoID4gMCkge1xuICAgICAgc3BsaXRzLnB1c2goeyBsaXRlcmFsOiBicmFja2V0ZWQsIHZhbDogY3VycmVudEZ1bGwgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNwbGl0cztcbiAgfVxuXG4gIHN0YXRpYyBtYWNyb1Rva2VuVG9Gb3JtYXRPcHRzKHRva2VuKSB7XG4gICAgcmV0dXJuIG1hY3JvVG9rZW5Ub0Zvcm1hdE9wdHNbdG9rZW5dO1xuICB9XG5cbiAgY29uc3RydWN0b3IobG9jYWxlLCBmb3JtYXRPcHRzKSB7XG4gICAgdGhpcy5vcHRzID0gZm9ybWF0T3B0cztcbiAgICB0aGlzLmxvYyA9IGxvY2FsZTtcbiAgICB0aGlzLnN5c3RlbUxvYyA9IG51bGw7XG4gIH1cblxuICBmb3JtYXRXaXRoU3lzdGVtRGVmYXVsdChkdCwgb3B0cykge1xuICAgIGlmICh0aGlzLnN5c3RlbUxvYyA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5zeXN0ZW1Mb2MgPSB0aGlzLmxvYy5yZWRlZmF1bHRUb1N5c3RlbSgpO1xuICAgIH1cbiAgICBjb25zdCBkZiA9IHRoaXMuc3lzdGVtTG9jLmR0Rm9ybWF0dGVyKGR0LCB7IC4uLnRoaXMub3B0cywgLi4ub3B0cyB9KTtcbiAgICByZXR1cm4gZGYuZm9ybWF0KCk7XG4gIH1cblxuICBmb3JtYXREYXRlVGltZShkdCwgb3B0cyA9IHt9KSB7XG4gICAgY29uc3QgZGYgPSB0aGlzLmxvYy5kdEZvcm1hdHRlcihkdCwgeyAuLi50aGlzLm9wdHMsIC4uLm9wdHMgfSk7XG4gICAgcmV0dXJuIGRmLmZvcm1hdCgpO1xuICB9XG5cbiAgZm9ybWF0RGF0ZVRpbWVQYXJ0cyhkdCwgb3B0cyA9IHt9KSB7XG4gICAgY29uc3QgZGYgPSB0aGlzLmxvYy5kdEZvcm1hdHRlcihkdCwgeyAuLi50aGlzLm9wdHMsIC4uLm9wdHMgfSk7XG4gICAgcmV0dXJuIGRmLmZvcm1hdFRvUGFydHMoKTtcbiAgfVxuXG4gIHJlc29sdmVkT3B0aW9ucyhkdCwgb3B0cyA9IHt9KSB7XG4gICAgY29uc3QgZGYgPSB0aGlzLmxvYy5kdEZvcm1hdHRlcihkdCwgeyAuLi50aGlzLm9wdHMsIC4uLm9wdHMgfSk7XG4gICAgcmV0dXJuIGRmLnJlc29sdmVkT3B0aW9ucygpO1xuICB9XG5cbiAgbnVtKG4sIHAgPSAwKSB7XG4gICAgLy8gd2UgZ2V0IHNvbWUgcGVyZiBvdXQgb2YgZG9pbmcgdGhpcyBoZXJlLCBhbm5veWluZ2x5XG4gICAgaWYgKHRoaXMub3B0cy5mb3JjZVNpbXBsZSkge1xuICAgICAgcmV0dXJuIHBhZFN0YXJ0KG4sIHApO1xuICAgIH1cblxuICAgIGNvbnN0IG9wdHMgPSB7IC4uLnRoaXMub3B0cyB9O1xuXG4gICAgaWYgKHAgPiAwKSB7XG4gICAgICBvcHRzLnBhZFRvID0gcDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5sb2MubnVtYmVyRm9ybWF0dGVyKG9wdHMpLmZvcm1hdChuKTtcbiAgfVxuXG4gIGZvcm1hdERhdGVUaW1lRnJvbVN0cmluZyhkdCwgZm10KSB7XG4gICAgY29uc3Qga25vd25FbmdsaXNoID0gdGhpcy5sb2MubGlzdGluZ01vZGUoKSA9PT0gXCJlblwiLFxuICAgICAgdXNlRGF0ZVRpbWVGb3JtYXR0ZXIgPSB0aGlzLmxvYy5vdXRwdXRDYWxlbmRhciAmJiB0aGlzLmxvYy5vdXRwdXRDYWxlbmRhciAhPT0gXCJncmVnb3J5XCIsXG4gICAgICBzdHJpbmcgPSAob3B0cywgZXh0cmFjdCkgPT4gdGhpcy5sb2MuZXh0cmFjdChkdCwgb3B0cywgZXh0cmFjdCksXG4gICAgICBmb3JtYXRPZmZzZXQgPSAob3B0cykgPT4ge1xuICAgICAgICBpZiAoZHQuaXNPZmZzZXRGaXhlZCAmJiBkdC5vZmZzZXQgPT09IDAgJiYgb3B0cy5hbGxvd1opIHtcbiAgICAgICAgICByZXR1cm4gXCJaXCI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZHQuaXNWYWxpZCA/IGR0LnpvbmUuZm9ybWF0T2Zmc2V0KGR0LnRzLCBvcHRzLmZvcm1hdCkgOiBcIlwiO1xuICAgICAgfSxcbiAgICAgIG1lcmlkaWVtID0gKCkgPT5cbiAgICAgICAga25vd25FbmdsaXNoXG4gICAgICAgICAgPyBtZXJpZGllbUZvckRhdGVUaW1lKGR0KVxuICAgICAgICAgIDogc3RyaW5nKHsgaG91cjogXCJudW1lcmljXCIsIGhvdXJDeWNsZTogXCJoMTJcIiB9LCBcImRheXBlcmlvZFwiKSxcbiAgICAgIG1vbnRoID0gKGxlbmd0aCwgc3RhbmRhbG9uZSkgPT5cbiAgICAgICAga25vd25FbmdsaXNoXG4gICAgICAgICAgPyBtb250aEZvckRhdGVUaW1lKGR0LCBsZW5ndGgpXG4gICAgICAgICAgOiBzdHJpbmcoc3RhbmRhbG9uZSA/IHsgbW9udGg6IGxlbmd0aCB9IDogeyBtb250aDogbGVuZ3RoLCBkYXk6IFwibnVtZXJpY1wiIH0sIFwibW9udGhcIiksXG4gICAgICB3ZWVrZGF5ID0gKGxlbmd0aCwgc3RhbmRhbG9uZSkgPT5cbiAgICAgICAga25vd25FbmdsaXNoXG4gICAgICAgICAgPyB3ZWVrZGF5Rm9yRGF0ZVRpbWUoZHQsIGxlbmd0aClcbiAgICAgICAgICA6IHN0cmluZyhcbiAgICAgICAgICAgIHN0YW5kYWxvbmUgPyB7IHdlZWtkYXk6IGxlbmd0aCB9IDogeyB3ZWVrZGF5OiBsZW5ndGgsIG1vbnRoOiBcImxvbmdcIiwgZGF5OiBcIm51bWVyaWNcIiB9LFxuICAgICAgICAgICAgXCJ3ZWVrZGF5XCJcbiAgICAgICAgICApLFxuICAgICAgbWF5YmVNYWNybyA9ICh0b2tlbikgPT4ge1xuICAgICAgICBjb25zdCBmb3JtYXRPcHRzID0gRm9ybWF0dGVyLm1hY3JvVG9rZW5Ub0Zvcm1hdE9wdHModG9rZW4pO1xuICAgICAgICBpZiAoZm9ybWF0T3B0cykge1xuICAgICAgICAgIHJldHVybiB0aGlzLmZvcm1hdFdpdGhTeXN0ZW1EZWZhdWx0KGR0LCBmb3JtYXRPcHRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdG9rZW47XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBlcmEgPSAobGVuZ3RoKSA9PlxuICAgICAgICBrbm93bkVuZ2xpc2ggPyBlcmFGb3JEYXRlVGltZShkdCwgbGVuZ3RoKSA6IHN0cmluZyh7IGVyYTogbGVuZ3RoIH0sIFwiZXJhXCIpLFxuICAgICAgdG9rZW5Ub1N0cmluZyA9ICh0b2tlbikgPT4ge1xuICAgICAgICAvLyBXaGVyZSBwb3NzaWJsZTogaHR0cDovL2NsZHIudW5pY29kZS5vcmcvdHJhbnNsYXRpb24vZGF0ZS10aW1lLTEvZGF0ZS10aW1lI1RPQy1TdGFuZGFsb25lLXZzLi1Gb3JtYXQtU3R5bGVzXG4gICAgICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgICAgICAvLyBtc1xuICAgICAgICAgIGNhc2UgXCJTXCI6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5udW0oZHQubWlsbGlzZWNvbmQpO1xuICAgICAgICAgIGNhc2UgXCJ1XCI6XG4gICAgICAgICAgLy8gZmFsbHMgdGhyb3VnaFxuICAgICAgICAgIGNhc2UgXCJTU1NcIjpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm51bShkdC5taWxsaXNlY29uZCwgMyk7XG4gICAgICAgICAgLy8gc2Vjb25kc1xuICAgICAgICAgIGNhc2UgXCJzXCI6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5udW0oZHQuc2Vjb25kKTtcbiAgICAgICAgICBjYXNlIFwic3NcIjpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm51bShkdC5zZWNvbmQsIDIpO1xuICAgICAgICAgIC8vIGZyYWN0aW9uYWwgc2Vjb25kc1xuICAgICAgICAgIGNhc2UgXCJ1dVwiOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubnVtKE1hdGguZmxvb3IoZHQubWlsbGlzZWNvbmQgLyAxMCksIDIpO1xuICAgICAgICAgIGNhc2UgXCJ1dXVcIjpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm51bShNYXRoLmZsb29yKGR0Lm1pbGxpc2Vjb25kIC8gMTAwKSk7XG4gICAgICAgICAgLy8gbWludXRlc1xuICAgICAgICAgIGNhc2UgXCJtXCI6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5udW0oZHQubWludXRlKTtcbiAgICAgICAgICBjYXNlIFwibW1cIjpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm51bShkdC5taW51dGUsIDIpO1xuICAgICAgICAgIC8vIGhvdXJzXG4gICAgICAgICAgY2FzZSBcImhcIjpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm51bShkdC5ob3VyICUgMTIgPT09IDAgPyAxMiA6IGR0LmhvdXIgJSAxMik7XG4gICAgICAgICAgY2FzZSBcImhoXCI6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5udW0oZHQuaG91ciAlIDEyID09PSAwID8gMTIgOiBkdC5ob3VyICUgMTIsIDIpO1xuICAgICAgICAgIGNhc2UgXCJIXCI6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5udW0oZHQuaG91cik7XG4gICAgICAgICAgY2FzZSBcIkhIXCI6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5udW0oZHQuaG91ciwgMik7XG4gICAgICAgICAgLy8gb2Zmc2V0XG4gICAgICAgICAgY2FzZSBcIlpcIjpcbiAgICAgICAgICAgIC8vIGxpa2UgKzZcbiAgICAgICAgICAgIHJldHVybiBmb3JtYXRPZmZzZXQoeyBmb3JtYXQ6IFwibmFycm93XCIsIGFsbG93WjogdGhpcy5vcHRzLmFsbG93WiB9KTtcbiAgICAgICAgICBjYXNlIFwiWlpcIjpcbiAgICAgICAgICAgIC8vIGxpa2UgKzA2OjAwXG4gICAgICAgICAgICByZXR1cm4gZm9ybWF0T2Zmc2V0KHsgZm9ybWF0OiBcInNob3J0XCIsIGFsbG93WjogdGhpcy5vcHRzLmFsbG93WiB9KTtcbiAgICAgICAgICBjYXNlIFwiWlpaXCI6XG4gICAgICAgICAgICAvLyBsaWtlICswNjAwXG4gICAgICAgICAgICByZXR1cm4gZm9ybWF0T2Zmc2V0KHsgZm9ybWF0OiBcInRlY2hpZVwiLCBhbGxvd1o6IHRoaXMub3B0cy5hbGxvd1ogfSk7XG4gICAgICAgICAgY2FzZSBcIlpaWlpcIjpcbiAgICAgICAgICAgIC8vIGxpa2UgRVNUXG4gICAgICAgICAgICByZXR1cm4gZHQuem9uZS5vZmZzZXROYW1lKGR0LnRzLCB7IGZvcm1hdDogXCJzaG9ydFwiLCBsb2NhbGU6IHRoaXMubG9jLmxvY2FsZSB9KTtcbiAgICAgICAgICBjYXNlIFwiWlpaWlpcIjpcbiAgICAgICAgICAgIC8vIGxpa2UgRWFzdGVybiBTdGFuZGFyZCBUaW1lXG4gICAgICAgICAgICByZXR1cm4gZHQuem9uZS5vZmZzZXROYW1lKGR0LnRzLCB7IGZvcm1hdDogXCJsb25nXCIsIGxvY2FsZTogdGhpcy5sb2MubG9jYWxlIH0pO1xuICAgICAgICAgIC8vIHpvbmVcbiAgICAgICAgICBjYXNlIFwielwiOlxuICAgICAgICAgICAgLy8gbGlrZSBBbWVyaWNhL05ld19Zb3JrXG4gICAgICAgICAgICByZXR1cm4gZHQuem9uZU5hbWU7XG4gICAgICAgICAgLy8gbWVyaWRpZW1zXG4gICAgICAgICAgY2FzZSBcImFcIjpcbiAgICAgICAgICAgIHJldHVybiBtZXJpZGllbSgpO1xuICAgICAgICAgIC8vIGRhdGVzXG4gICAgICAgICAgY2FzZSBcImRcIjpcbiAgICAgICAgICAgIHJldHVybiB1c2VEYXRlVGltZUZvcm1hdHRlciA/IHN0cmluZyh7IGRheTogXCJudW1lcmljXCIgfSwgXCJkYXlcIikgOiB0aGlzLm51bShkdC5kYXkpO1xuICAgICAgICAgIGNhc2UgXCJkZFwiOlxuICAgICAgICAgICAgcmV0dXJuIHVzZURhdGVUaW1lRm9ybWF0dGVyID8gc3RyaW5nKHsgZGF5OiBcIjItZGlnaXRcIiB9LCBcImRheVwiKSA6IHRoaXMubnVtKGR0LmRheSwgMik7XG4gICAgICAgICAgLy8gd2Vla2RheXMgLSBzdGFuZGFsb25lXG4gICAgICAgICAgY2FzZSBcImNcIjpcbiAgICAgICAgICAgIC8vIGxpa2UgMVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubnVtKGR0LndlZWtkYXkpO1xuICAgICAgICAgIGNhc2UgXCJjY2NcIjpcbiAgICAgICAgICAgIC8vIGxpa2UgJ1R1ZXMnXG4gICAgICAgICAgICByZXR1cm4gd2Vla2RheShcInNob3J0XCIsIHRydWUpO1xuICAgICAgICAgIGNhc2UgXCJjY2NjXCI6XG4gICAgICAgICAgICAvLyBsaWtlICdUdWVzZGF5J1xuICAgICAgICAgICAgcmV0dXJuIHdlZWtkYXkoXCJsb25nXCIsIHRydWUpO1xuICAgICAgICAgIGNhc2UgXCJjY2NjY1wiOlxuICAgICAgICAgICAgLy8gbGlrZSAnVCdcbiAgICAgICAgICAgIHJldHVybiB3ZWVrZGF5KFwibmFycm93XCIsIHRydWUpO1xuICAgICAgICAgIC8vIHdlZWtkYXlzIC0gZm9ybWF0XG4gICAgICAgICAgY2FzZSBcIkVcIjpcbiAgICAgICAgICAgIC8vIGxpa2UgMVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubnVtKGR0LndlZWtkYXkpO1xuICAgICAgICAgIGNhc2UgXCJFRUVcIjpcbiAgICAgICAgICAgIC8vIGxpa2UgJ1R1ZXMnXG4gICAgICAgICAgICByZXR1cm4gd2Vla2RheShcInNob3J0XCIsIGZhbHNlKTtcbiAgICAgICAgICBjYXNlIFwiRUVFRVwiOlxuICAgICAgICAgICAgLy8gbGlrZSAnVHVlc2RheSdcbiAgICAgICAgICAgIHJldHVybiB3ZWVrZGF5KFwibG9uZ1wiLCBmYWxzZSk7XG4gICAgICAgICAgY2FzZSBcIkVFRUVFXCI6XG4gICAgICAgICAgICAvLyBsaWtlICdUJ1xuICAgICAgICAgICAgcmV0dXJuIHdlZWtkYXkoXCJuYXJyb3dcIiwgZmFsc2UpO1xuICAgICAgICAgIC8vIG1vbnRocyAtIHN0YW5kYWxvbmVcbiAgICAgICAgICBjYXNlIFwiTFwiOlxuICAgICAgICAgICAgLy8gbGlrZSAxXG4gICAgICAgICAgICByZXR1cm4gdXNlRGF0ZVRpbWVGb3JtYXR0ZXJcbiAgICAgICAgICAgICAgPyBzdHJpbmcoeyBtb250aDogXCJudW1lcmljXCIsIGRheTogXCJudW1lcmljXCIgfSwgXCJtb250aFwiKVxuICAgICAgICAgICAgICA6IHRoaXMubnVtKGR0Lm1vbnRoKTtcbiAgICAgICAgICBjYXNlIFwiTExcIjpcbiAgICAgICAgICAgIC8vIGxpa2UgMDEsIGRvZXNuJ3Qgc2VlbSB0byB3b3JrXG4gICAgICAgICAgICByZXR1cm4gdXNlRGF0ZVRpbWVGb3JtYXR0ZXJcbiAgICAgICAgICAgICAgPyBzdHJpbmcoeyBtb250aDogXCIyLWRpZ2l0XCIsIGRheTogXCJudW1lcmljXCIgfSwgXCJtb250aFwiKVxuICAgICAgICAgICAgICA6IHRoaXMubnVtKGR0Lm1vbnRoLCAyKTtcbiAgICAgICAgICBjYXNlIFwiTExMXCI6XG4gICAgICAgICAgICAvLyBsaWtlIEphblxuICAgICAgICAgICAgcmV0dXJuIG1vbnRoKFwic2hvcnRcIiwgdHJ1ZSk7XG4gICAgICAgICAgY2FzZSBcIkxMTExcIjpcbiAgICAgICAgICAgIC8vIGxpa2UgSmFudWFyeVxuICAgICAgICAgICAgcmV0dXJuIG1vbnRoKFwibG9uZ1wiLCB0cnVlKTtcbiAgICAgICAgICBjYXNlIFwiTExMTExcIjpcbiAgICAgICAgICAgIC8vIGxpa2UgSlxuICAgICAgICAgICAgcmV0dXJuIG1vbnRoKFwibmFycm93XCIsIHRydWUpO1xuICAgICAgICAgIC8vIG1vbnRocyAtIGZvcm1hdFxuICAgICAgICAgIGNhc2UgXCJNXCI6XG4gICAgICAgICAgICAvLyBsaWtlIDFcbiAgICAgICAgICAgIHJldHVybiB1c2VEYXRlVGltZUZvcm1hdHRlclxuICAgICAgICAgICAgICA/IHN0cmluZyh7IG1vbnRoOiBcIm51bWVyaWNcIiB9LCBcIm1vbnRoXCIpXG4gICAgICAgICAgICAgIDogdGhpcy5udW0oZHQubW9udGgpO1xuICAgICAgICAgIGNhc2UgXCJNTVwiOlxuICAgICAgICAgICAgLy8gbGlrZSAwMVxuICAgICAgICAgICAgcmV0dXJuIHVzZURhdGVUaW1lRm9ybWF0dGVyXG4gICAgICAgICAgICAgID8gc3RyaW5nKHsgbW9udGg6IFwiMi1kaWdpdFwiIH0sIFwibW9udGhcIilcbiAgICAgICAgICAgICAgOiB0aGlzLm51bShkdC5tb250aCwgMik7XG4gICAgICAgICAgY2FzZSBcIk1NTVwiOlxuICAgICAgICAgICAgLy8gbGlrZSBKYW5cbiAgICAgICAgICAgIHJldHVybiBtb250aChcInNob3J0XCIsIGZhbHNlKTtcbiAgICAgICAgICBjYXNlIFwiTU1NTVwiOlxuICAgICAgICAgICAgLy8gbGlrZSBKYW51YXJ5XG4gICAgICAgICAgICByZXR1cm4gbW9udGgoXCJsb25nXCIsIGZhbHNlKTtcbiAgICAgICAgICBjYXNlIFwiTU1NTU1cIjpcbiAgICAgICAgICAgIC8vIGxpa2UgSlxuICAgICAgICAgICAgcmV0dXJuIG1vbnRoKFwibmFycm93XCIsIGZhbHNlKTtcbiAgICAgICAgICAvLyB5ZWFyc1xuICAgICAgICAgIGNhc2UgXCJ5XCI6XG4gICAgICAgICAgICAvLyBsaWtlIDIwMTRcbiAgICAgICAgICAgIHJldHVybiB1c2VEYXRlVGltZUZvcm1hdHRlciA/IHN0cmluZyh7IHllYXI6IFwibnVtZXJpY1wiIH0sIFwieWVhclwiKSA6IHRoaXMubnVtKGR0LnllYXIpO1xuICAgICAgICAgIGNhc2UgXCJ5eVwiOlxuICAgICAgICAgICAgLy8gbGlrZSAxNFxuICAgICAgICAgICAgcmV0dXJuIHVzZURhdGVUaW1lRm9ybWF0dGVyXG4gICAgICAgICAgICAgID8gc3RyaW5nKHsgeWVhcjogXCIyLWRpZ2l0XCIgfSwgXCJ5ZWFyXCIpXG4gICAgICAgICAgICAgIDogdGhpcy5udW0oZHQueWVhci50b1N0cmluZygpLnNsaWNlKC0yKSwgMik7XG4gICAgICAgICAgY2FzZSBcInl5eXlcIjpcbiAgICAgICAgICAgIC8vIGxpa2UgMDAxMlxuICAgICAgICAgICAgcmV0dXJuIHVzZURhdGVUaW1lRm9ybWF0dGVyXG4gICAgICAgICAgICAgID8gc3RyaW5nKHsgeWVhcjogXCJudW1lcmljXCIgfSwgXCJ5ZWFyXCIpXG4gICAgICAgICAgICAgIDogdGhpcy5udW0oZHQueWVhciwgNCk7XG4gICAgICAgICAgY2FzZSBcInl5eXl5eVwiOlxuICAgICAgICAgICAgLy8gbGlrZSAwMDAwMTJcbiAgICAgICAgICAgIHJldHVybiB1c2VEYXRlVGltZUZvcm1hdHRlclxuICAgICAgICAgICAgICA/IHN0cmluZyh7IHllYXI6IFwibnVtZXJpY1wiIH0sIFwieWVhclwiKVxuICAgICAgICAgICAgICA6IHRoaXMubnVtKGR0LnllYXIsIDYpO1xuICAgICAgICAgIC8vIGVyYXNcbiAgICAgICAgICBjYXNlIFwiR1wiOlxuICAgICAgICAgICAgLy8gbGlrZSBBRFxuICAgICAgICAgICAgcmV0dXJuIGVyYShcInNob3J0XCIpO1xuICAgICAgICAgIGNhc2UgXCJHR1wiOlxuICAgICAgICAgICAgLy8gbGlrZSBBbm5vIERvbWluaVxuICAgICAgICAgICAgcmV0dXJuIGVyYShcImxvbmdcIik7XG4gICAgICAgICAgY2FzZSBcIkdHR0dHXCI6XG4gICAgICAgICAgICByZXR1cm4gZXJhKFwibmFycm93XCIpO1xuICAgICAgICAgIGNhc2UgXCJra1wiOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubnVtKGR0LndlZWtZZWFyLnRvU3RyaW5nKCkuc2xpY2UoLTIpLCAyKTtcbiAgICAgICAgICBjYXNlIFwia2tra1wiOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubnVtKGR0LndlZWtZZWFyLCA0KTtcbiAgICAgICAgICBjYXNlIFwiV1wiOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubnVtKGR0LndlZWtOdW1iZXIpO1xuICAgICAgICAgIGNhc2UgXCJXV1wiOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubnVtKGR0LndlZWtOdW1iZXIsIDIpO1xuICAgICAgICAgIGNhc2UgXCJvXCI6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5udW0oZHQub3JkaW5hbCk7XG4gICAgICAgICAgY2FzZSBcIm9vb1wiOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubnVtKGR0Lm9yZGluYWwsIDMpO1xuICAgICAgICAgIGNhc2UgXCJxXCI6XG4gICAgICAgICAgICAvLyBsaWtlIDFcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm51bShkdC5xdWFydGVyKTtcbiAgICAgICAgICBjYXNlIFwicXFcIjpcbiAgICAgICAgICAgIC8vIGxpa2UgMDFcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm51bShkdC5xdWFydGVyLCAyKTtcbiAgICAgICAgICBjYXNlIFwiWFwiOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubnVtKE1hdGguZmxvb3IoZHQudHMgLyAxMDAwKSk7XG4gICAgICAgICAgY2FzZSBcInhcIjpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm51bShkdC50cyk7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBtYXliZU1hY3JvKHRva2VuKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgIHJldHVybiBzdHJpbmdpZnlUb2tlbnMoRm9ybWF0dGVyLnBhcnNlRm9ybWF0KGZtdCksIHRva2VuVG9TdHJpbmcpO1xuICB9XG5cbiAgZm9ybWF0RHVyYXRpb25Gcm9tU3RyaW5nKGR1ciwgZm10KSB7XG4gICAgY29uc3QgdG9rZW5Ub0ZpZWxkID0gKHRva2VuKSA9PiB7XG4gICAgICAgIHN3aXRjaCAodG9rZW5bMF0pIHtcbiAgICAgICAgICBjYXNlIFwiU1wiOlxuICAgICAgICAgICAgcmV0dXJuIFwibWlsbGlzZWNvbmRcIjtcbiAgICAgICAgICBjYXNlIFwic1wiOlxuICAgICAgICAgICAgcmV0dXJuIFwic2Vjb25kXCI7XG4gICAgICAgICAgY2FzZSBcIm1cIjpcbiAgICAgICAgICAgIHJldHVybiBcIm1pbnV0ZVwiO1xuICAgICAgICAgIGNhc2UgXCJoXCI6XG4gICAgICAgICAgICByZXR1cm4gXCJob3VyXCI7XG4gICAgICAgICAgY2FzZSBcImRcIjpcbiAgICAgICAgICAgIHJldHVybiBcImRheVwiO1xuICAgICAgICAgIGNhc2UgXCJ3XCI6XG4gICAgICAgICAgICByZXR1cm4gXCJ3ZWVrXCI7XG4gICAgICAgICAgY2FzZSBcIk1cIjpcbiAgICAgICAgICAgIHJldHVybiBcIm1vbnRoXCI7XG4gICAgICAgICAgY2FzZSBcInlcIjpcbiAgICAgICAgICAgIHJldHVybiBcInllYXJcIjtcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB0b2tlblRvU3RyaW5nID0gKGxpbGR1cikgPT4gKHRva2VuKSA9PiB7XG4gICAgICAgIGNvbnN0IG1hcHBlZCA9IHRva2VuVG9GaWVsZCh0b2tlbik7XG4gICAgICAgIGlmIChtYXBwZWQpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5udW0obGlsZHVyLmdldChtYXBwZWQpLCB0b2tlbi5sZW5ndGgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0b2tlbjtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHRva2VucyA9IEZvcm1hdHRlci5wYXJzZUZvcm1hdChmbXQpLFxuICAgICAgcmVhbFRva2VucyA9IHRva2Vucy5yZWR1Y2UoXG4gICAgICAgIChmb3VuZCwgeyBsaXRlcmFsLCB2YWwgfSkgPT4gKGxpdGVyYWwgPyBmb3VuZCA6IGZvdW5kLmNvbmNhdCh2YWwpKSxcbiAgICAgICAgW11cbiAgICAgICksXG4gICAgICBjb2xsYXBzZWQgPSBkdXIuc2hpZnRUbyguLi5yZWFsVG9rZW5zLm1hcCh0b2tlblRvRmllbGQpLmZpbHRlcigodCkgPT4gdCkpO1xuICAgIHJldHVybiBzdHJpbmdpZnlUb2tlbnModG9rZW5zLCB0b2tlblRvU3RyaW5nKGNvbGxhcHNlZCkpO1xuICB9XG59XG5cbmNsYXNzIEludmFsaWQge1xuICBjb25zdHJ1Y3RvcihyZWFzb24sIGV4cGxhbmF0aW9uKSB7XG4gICAgdGhpcy5yZWFzb24gPSByZWFzb247XG4gICAgdGhpcy5leHBsYW5hdGlvbiA9IGV4cGxhbmF0aW9uO1xuICB9XG5cbiAgdG9NZXNzYWdlKCkge1xuICAgIGlmICh0aGlzLmV4cGxhbmF0aW9uKSB7XG4gICAgICByZXR1cm4gYCR7dGhpcy5yZWFzb259OiAke3RoaXMuZXhwbGFuYXRpb259YDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucmVhc29uO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEBpbnRlcmZhY2VcbiAqL1xuY2xhc3MgWm9uZSB7XG4gIC8qKlxuICAgKiBUaGUgdHlwZSBvZiB6b25lXG4gICAqIEBhYnN0cmFjdFxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgZ2V0IHR5cGUoKSB7XG4gICAgdGhyb3cgbmV3IFpvbmVJc0Fic3RyYWN0RXJyb3IoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGlzIHpvbmUuXG4gICAqIEBhYnN0cmFjdFxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgZ2V0IG5hbWUoKSB7XG4gICAgdGhyb3cgbmV3IFpvbmVJc0Fic3RyYWN0RXJyb3IoKTtcbiAgfVxuXG4gIGdldCBpYW5hTmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgd2hldGhlciB0aGUgb2Zmc2V0IGlzIGtub3duIHRvIGJlIGZpeGVkIGZvciB0aGUgd2hvbGUgeWVhci5cbiAgICogQGFic3RyYWN0XG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKi9cbiAgZ2V0IGlzVW5pdmVyc2FsKCkge1xuICAgIHRocm93IG5ldyBab25lSXNBYnN0cmFjdEVycm9yKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgb2Zmc2V0J3MgY29tbW9uIG5hbWUgKHN1Y2ggYXMgRVNUKSBhdCB0aGUgc3BlY2lmaWVkIHRpbWVzdGFtcFxuICAgKiBAYWJzdHJhY3RcbiAgICogQHBhcmFtIHtudW1iZXJ9IHRzIC0gRXBvY2ggbWlsbGlzZWNvbmRzIGZvciB3aGljaCB0byBnZXQgdGhlIG5hbWVcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdHMgLSBPcHRpb25zIHRvIGFmZmVjdCB0aGUgZm9ybWF0XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRzLmZvcm1hdCAtIFdoYXQgc3R5bGUgb2Ygb2Zmc2V0IHRvIHJldHVybi4gQWNjZXB0cyAnbG9uZycgb3IgJ3Nob3J0Jy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdHMubG9jYWxlIC0gV2hhdCBsb2NhbGUgdG8gcmV0dXJuIHRoZSBvZmZzZXQgbmFtZSBpbi5cbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cbiAgb2Zmc2V0TmFtZSh0cywgb3B0cykge1xuICAgIHRocm93IG5ldyBab25lSXNBYnN0cmFjdEVycm9yKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgb2Zmc2V0J3MgdmFsdWUgYXMgYSBzdHJpbmdcbiAgICogQGFic3RyYWN0XG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0cyAtIEVwb2NoIG1pbGxpc2Vjb25kcyBmb3Igd2hpY2ggdG8gZ2V0IHRoZSBvZmZzZXRcbiAgICogQHBhcmFtIHtzdHJpbmd9IGZvcm1hdCAtIFdoYXQgc3R5bGUgb2Ygb2Zmc2V0IHRvIHJldHVybi5cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgIEFjY2VwdHMgJ25hcnJvdycsICdzaG9ydCcsIG9yICd0ZWNoaWUnLiBSZXR1cm5pbmcgJys2JywgJyswNjowMCcsIG9yICcrMDYwMCcgcmVzcGVjdGl2ZWx5XG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICovXG4gIGZvcm1hdE9mZnNldCh0cywgZm9ybWF0KSB7XG4gICAgdGhyb3cgbmV3IFpvbmVJc0Fic3RyYWN0RXJyb3IoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIG9mZnNldCBpbiBtaW51dGVzIGZvciB0aGlzIHpvbmUgYXQgdGhlIHNwZWNpZmllZCB0aW1lc3RhbXAuXG4gICAqIEBhYnN0cmFjdFxuICAgKiBAcGFyYW0ge251bWJlcn0gdHMgLSBFcG9jaCBtaWxsaXNlY29uZHMgZm9yIHdoaWNoIHRvIGNvbXB1dGUgdGhlIG9mZnNldFxuICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAqL1xuICBvZmZzZXQodHMpIHtcbiAgICB0aHJvdyBuZXcgWm9uZUlzQWJzdHJhY3RFcnJvcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB3aGV0aGVyIHRoaXMgWm9uZSBpcyBlcXVhbCB0byBhbm90aGVyIHpvbmVcbiAgICogQGFic3RyYWN0XG4gICAqIEBwYXJhbSB7Wm9uZX0gb3RoZXJab25lIC0gdGhlIHpvbmUgdG8gY29tcGFyZVxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgZXF1YWxzKG90aGVyWm9uZSkge1xuICAgIHRocm93IG5ldyBab25lSXNBYnN0cmFjdEVycm9yKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHdoZXRoZXIgdGhpcyBab25lIGlzIHZhbGlkLlxuICAgKiBAYWJzdHJhY3RcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuICBnZXQgaXNWYWxpZCgpIHtcbiAgICB0aHJvdyBuZXcgWm9uZUlzQWJzdHJhY3RFcnJvcigpO1xuICB9XG59XG5cbmxldCBzaW5nbGV0b24kMSA9IG51bGw7XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgbG9jYWwgem9uZSBmb3IgdGhpcyBKYXZhU2NyaXB0IGVudmlyb25tZW50LlxuICogQGltcGxlbWVudHMge1pvbmV9XG4gKi9cbmNsYXNzIFN5c3RlbVpvbmUgZXh0ZW5kcyBab25lIHtcbiAgLyoqXG4gICAqIEdldCBhIHNpbmdsZXRvbiBpbnN0YW5jZSBvZiB0aGUgbG9jYWwgem9uZVxuICAgKiBAcmV0dXJuIHtTeXN0ZW1ab25lfVxuICAgKi9cbiAgc3RhdGljIGdldCBpbnN0YW5jZSgpIHtcbiAgICBpZiAoc2luZ2xldG9uJDEgPT09IG51bGwpIHtcbiAgICAgIHNpbmdsZXRvbiQxID0gbmV3IFN5c3RlbVpvbmUoKTtcbiAgICB9XG4gICAgcmV0dXJuIHNpbmdsZXRvbiQxO1xuICB9XG5cbiAgLyoqIEBvdmVycmlkZSAqKi9cbiAgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuIFwic3lzdGVtXCI7XG4gIH1cblxuICAvKiogQG92ZXJyaWRlICoqL1xuICBnZXQgbmFtZSgpIHtcbiAgICByZXR1cm4gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQoKS5yZXNvbHZlZE9wdGlvbnMoKS50aW1lWm9uZTtcbiAgfVxuXG4gIC8qKiBAb3ZlcnJpZGUgKiovXG4gIGdldCBpc1VuaXZlcnNhbCgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKiogQG92ZXJyaWRlICoqL1xuICBvZmZzZXROYW1lKHRzLCB7IGZvcm1hdCwgbG9jYWxlIH0pIHtcbiAgICByZXR1cm4gcGFyc2Vab25lSW5mbyh0cywgZm9ybWF0LCBsb2NhbGUpO1xuICB9XG5cbiAgLyoqIEBvdmVycmlkZSAqKi9cbiAgZm9ybWF0T2Zmc2V0KHRzLCBmb3JtYXQpIHtcbiAgICByZXR1cm4gZm9ybWF0T2Zmc2V0KHRoaXMub2Zmc2V0KHRzKSwgZm9ybWF0KTtcbiAgfVxuXG4gIC8qKiBAb3ZlcnJpZGUgKiovXG4gIG9mZnNldCh0cykge1xuICAgIHJldHVybiAtbmV3IERhdGUodHMpLmdldFRpbWV6b25lT2Zmc2V0KCk7XG4gIH1cblxuICAvKiogQG92ZXJyaWRlICoqL1xuICBlcXVhbHMob3RoZXJab25lKSB7XG4gICAgcmV0dXJuIG90aGVyWm9uZS50eXBlID09PSBcInN5c3RlbVwiO1xuICB9XG5cbiAgLyoqIEBvdmVycmlkZSAqKi9cbiAgZ2V0IGlzVmFsaWQoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cblxubGV0IGR0ZkNhY2hlID0ge307XG5mdW5jdGlvbiBtYWtlRFRGKHpvbmUpIHtcbiAgaWYgKCFkdGZDYWNoZVt6b25lXSkge1xuICAgIGR0ZkNhY2hlW3pvbmVdID0gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQoXCJlbi1VU1wiLCB7XG4gICAgICBob3VyMTI6IGZhbHNlLFxuICAgICAgdGltZVpvbmU6IHpvbmUsXG4gICAgICB5ZWFyOiBcIm51bWVyaWNcIixcbiAgICAgIG1vbnRoOiBcIjItZGlnaXRcIixcbiAgICAgIGRheTogXCIyLWRpZ2l0XCIsXG4gICAgICBob3VyOiBcIjItZGlnaXRcIixcbiAgICAgIG1pbnV0ZTogXCIyLWRpZ2l0XCIsXG4gICAgICBzZWNvbmQ6IFwiMi1kaWdpdFwiLFxuICAgICAgZXJhOiBcInNob3J0XCIsXG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIGR0ZkNhY2hlW3pvbmVdO1xufVxuXG5jb25zdCB0eXBlVG9Qb3MgPSB7XG4gIHllYXI6IDAsXG4gIG1vbnRoOiAxLFxuICBkYXk6IDIsXG4gIGVyYTogMyxcbiAgaG91cjogNCxcbiAgbWludXRlOiA1LFxuICBzZWNvbmQ6IDYsXG59O1xuXG5mdW5jdGlvbiBoYWNreU9mZnNldChkdGYsIGRhdGUpIHtcbiAgY29uc3QgZm9ybWF0dGVkID0gZHRmLmZvcm1hdChkYXRlKS5yZXBsYWNlKC9cXHUyMDBFL2csIFwiXCIpLFxuICAgIHBhcnNlZCA9IC8oXFxkKylcXC8oXFxkKylcXC8oXFxkKykgKEFEfEJDKSw/IChcXGQrKTooXFxkKyk6KFxcZCspLy5leGVjKGZvcm1hdHRlZCksXG4gICAgWywgZk1vbnRoLCBmRGF5LCBmWWVhciwgZmFkT3JCYywgZkhvdXIsIGZNaW51dGUsIGZTZWNvbmRdID0gcGFyc2VkO1xuICByZXR1cm4gW2ZZZWFyLCBmTW9udGgsIGZEYXksIGZhZE9yQmMsIGZIb3VyLCBmTWludXRlLCBmU2Vjb25kXTtcbn1cblxuZnVuY3Rpb24gcGFydHNPZmZzZXQoZHRmLCBkYXRlKSB7XG4gIGNvbnN0IGZvcm1hdHRlZCA9IGR0Zi5mb3JtYXRUb1BhcnRzKGRhdGUpO1xuICBjb25zdCBmaWxsZWQgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBmb3JtYXR0ZWQubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCB7IHR5cGUsIHZhbHVlIH0gPSBmb3JtYXR0ZWRbaV07XG4gICAgY29uc3QgcG9zID0gdHlwZVRvUG9zW3R5cGVdO1xuXG4gICAgaWYgKHR5cGUgPT09IFwiZXJhXCIpIHtcbiAgICAgIGZpbGxlZFtwb3NdID0gdmFsdWU7XG4gICAgfSBlbHNlIGlmICghaXNVbmRlZmluZWQocG9zKSkge1xuICAgICAgZmlsbGVkW3Bvc10gPSBwYXJzZUludCh2YWx1ZSwgMTApO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmlsbGVkO1xufVxuXG5sZXQgaWFuYVpvbmVDYWNoZSA9IHt9O1xuLyoqXG4gKiBBIHpvbmUgaWRlbnRpZmllZCBieSBhbiBJQU5BIGlkZW50aWZpZXIsIGxpa2UgQW1lcmljYS9OZXdfWW9ya1xuICogQGltcGxlbWVudHMge1pvbmV9XG4gKi9cbmNsYXNzIElBTkFab25lIGV4dGVuZHMgWm9uZSB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIFpvbmUgbmFtZVxuICAgKiBAcmV0dXJuIHtJQU5BWm9uZX1cbiAgICovXG4gIHN0YXRpYyBjcmVhdGUobmFtZSkge1xuICAgIGlmICghaWFuYVpvbmVDYWNoZVtuYW1lXSkge1xuICAgICAgaWFuYVpvbmVDYWNoZVtuYW1lXSA9IG5ldyBJQU5BWm9uZShuYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuIGlhbmFab25lQ2FjaGVbbmFtZV07XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgbG9jYWwgY2FjaGVzLiBTaG91bGQgb25seSBiZSBuZWNlc3NhcnkgaW4gdGVzdGluZyBzY2VuYXJpb3MuXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuICBzdGF0aWMgcmVzZXRDYWNoZSgpIHtcbiAgICBpYW5hWm9uZUNhY2hlID0ge307XG4gICAgZHRmQ2FjaGUgPSB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHN0cmluZyBpcyBhIHZhbGlkIHNwZWNpZmllci4gVGhpcyBvbmx5IGNoZWNrcyB0aGUgc3RyaW5nJ3MgZm9ybWF0LCBub3QgdGhhdCB0aGUgc3BlY2lmaWVyIGlkZW50aWZpZXMgYSBrbm93biB6b25lOyBzZWUgaXNWYWxpZFpvbmUgZm9yIHRoYXQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzIC0gVGhlIHN0cmluZyB0byBjaGVjayB2YWxpZGl0eSBvblxuICAgKiBAZXhhbXBsZSBJQU5BWm9uZS5pc1ZhbGlkU3BlY2lmaWVyKFwiQW1lcmljYS9OZXdfWW9ya1wiKSAvLz0+IHRydWVcbiAgICogQGV4YW1wbGUgSUFOQVpvbmUuaXNWYWxpZFNwZWNpZmllcihcIlNwb3J0fn5ibG9ycFwiKSAvLz0+IGZhbHNlXG4gICAqIEBkZXByZWNhdGVkIFRoaXMgbWV0aG9kIHJldHVybnMgZmFsc2UgZm9yIHNvbWUgdmFsaWQgSUFOQSBuYW1lcy4gVXNlIGlzVmFsaWRab25lIGluc3RlYWQuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBzdGF0aWMgaXNWYWxpZFNwZWNpZmllcihzKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNWYWxpZFpvbmUocyk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB3aGV0aGVyIHRoZSBwcm92aWRlZCBzdHJpbmcgaWRlbnRpZmllcyBhIHJlYWwgem9uZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gem9uZSAtIFRoZSBzdHJpbmcgdG8gY2hlY2tcbiAgICogQGV4YW1wbGUgSUFOQVpvbmUuaXNWYWxpZFpvbmUoXCJBbWVyaWNhL05ld19Zb3JrXCIpIC8vPT4gdHJ1ZVxuICAgKiBAZXhhbXBsZSBJQU5BWm9uZS5pc1ZhbGlkWm9uZShcIkZhbnRhc2lhL0Nhc3RsZVwiKSAvLz0+IGZhbHNlXG4gICAqIEBleGFtcGxlIElBTkFab25lLmlzVmFsaWRab25lKFwiU3BvcnR+fmJsb3JwXCIpIC8vPT4gZmFsc2VcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIHN0YXRpYyBpc1ZhbGlkWm9uZSh6b25lKSB7XG4gICAgaWYgKCF6b25lKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChcImVuLVVTXCIsIHsgdGltZVpvbmU6IHpvbmUgfSkuZm9ybWF0KCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IobmFtZSkge1xuICAgIHN1cGVyKCk7XG4gICAgLyoqIEBwcml2YXRlICoqL1xuICAgIHRoaXMuem9uZU5hbWUgPSBuYW1lO1xuICAgIC8qKiBAcHJpdmF0ZSAqKi9cbiAgICB0aGlzLnZhbGlkID0gSUFOQVpvbmUuaXNWYWxpZFpvbmUobmFtZSk7XG4gIH1cblxuICAvKiogQG92ZXJyaWRlICoqL1xuICBnZXQgdHlwZSgpIHtcbiAgICByZXR1cm4gXCJpYW5hXCI7XG4gIH1cblxuICAvKiogQG92ZXJyaWRlICoqL1xuICBnZXQgbmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy56b25lTmFtZTtcbiAgfVxuXG4gIC8qKiBAb3ZlcnJpZGUgKiovXG4gIGdldCBpc1VuaXZlcnNhbCgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKiogQG92ZXJyaWRlICoqL1xuICBvZmZzZXROYW1lKHRzLCB7IGZvcm1hdCwgbG9jYWxlIH0pIHtcbiAgICByZXR1cm4gcGFyc2Vab25lSW5mbyh0cywgZm9ybWF0LCBsb2NhbGUsIHRoaXMubmFtZSk7XG4gIH1cblxuICAvKiogQG92ZXJyaWRlICoqL1xuICBmb3JtYXRPZmZzZXQodHMsIGZvcm1hdCkge1xuICAgIHJldHVybiBmb3JtYXRPZmZzZXQodGhpcy5vZmZzZXQodHMpLCBmb3JtYXQpO1xuICB9XG5cbiAgLyoqIEBvdmVycmlkZSAqKi9cbiAgb2Zmc2V0KHRzKSB7XG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKHRzKTtcblxuICAgIGlmIChpc05hTihkYXRlKSkgcmV0dXJuIE5hTjtcblxuICAgIGNvbnN0IGR0ZiA9IG1ha2VEVEYodGhpcy5uYW1lKTtcbiAgICBsZXQgW3llYXIsIG1vbnRoLCBkYXksIGFkT3JCYywgaG91ciwgbWludXRlLCBzZWNvbmRdID0gZHRmLmZvcm1hdFRvUGFydHNcbiAgICAgID8gcGFydHNPZmZzZXQoZHRmLCBkYXRlKVxuICAgICAgOiBoYWNreU9mZnNldChkdGYsIGRhdGUpO1xuXG4gICAgaWYgKGFkT3JCYyA9PT0gXCJCQ1wiKSB7XG4gICAgICB5ZWFyID0gLU1hdGguYWJzKHllYXIpICsgMTtcbiAgICB9XG5cbiAgICAvLyBiZWNhdXNlIHdlJ3JlIHVzaW5nIGhvdXIxMiBhbmQgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9MTAyNTU2NCZjYW49MiZxPSUyMjI0JTNBMDAlMjIlMjBkYXRldGltZWZvcm1hdFxuICAgIGNvbnN0IGFkanVzdGVkSG91ciA9IGhvdXIgPT09IDI0ID8gMCA6IGhvdXI7XG5cbiAgICBjb25zdCBhc1VUQyA9IG9ialRvTG9jYWxUUyh7XG4gICAgICB5ZWFyLFxuICAgICAgbW9udGgsXG4gICAgICBkYXksXG4gICAgICBob3VyOiBhZGp1c3RlZEhvdXIsXG4gICAgICBtaW51dGUsXG4gICAgICBzZWNvbmQsXG4gICAgICBtaWxsaXNlY29uZDogMCxcbiAgICB9KTtcblxuICAgIGxldCBhc1RTID0gK2RhdGU7XG4gICAgY29uc3Qgb3ZlciA9IGFzVFMgJSAxMDAwO1xuICAgIGFzVFMgLT0gb3ZlciA+PSAwID8gb3ZlciA6IDEwMDAgKyBvdmVyO1xuICAgIHJldHVybiAoYXNVVEMgLSBhc1RTKSAvICg2MCAqIDEwMDApO1xuICB9XG5cbiAgLyoqIEBvdmVycmlkZSAqKi9cbiAgZXF1YWxzKG90aGVyWm9uZSkge1xuICAgIHJldHVybiBvdGhlclpvbmUudHlwZSA9PT0gXCJpYW5hXCIgJiYgb3RoZXJab25lLm5hbWUgPT09IHRoaXMubmFtZTtcbiAgfVxuXG4gIC8qKiBAb3ZlcnJpZGUgKiovXG4gIGdldCBpc1ZhbGlkKCkge1xuICAgIHJldHVybiB0aGlzLnZhbGlkO1xuICB9XG59XG5cbmxldCBzaW5nbGV0b24gPSBudWxsO1xuXG4vKipcbiAqIEEgem9uZSB3aXRoIGEgZml4ZWQgb2Zmc2V0IChtZWFuaW5nIG5vIERTVClcbiAqIEBpbXBsZW1lbnRzIHtab25lfVxuICovXG5jbGFzcyBGaXhlZE9mZnNldFpvbmUgZXh0ZW5kcyBab25lIHtcbiAgLyoqXG4gICAqIEdldCBhIHNpbmdsZXRvbiBpbnN0YW5jZSBvZiBVVENcbiAgICogQHJldHVybiB7Rml4ZWRPZmZzZXRab25lfVxuICAgKi9cbiAgc3RhdGljIGdldCB1dGNJbnN0YW5jZSgpIHtcbiAgICBpZiAoc2luZ2xldG9uID09PSBudWxsKSB7XG4gICAgICBzaW5nbGV0b24gPSBuZXcgRml4ZWRPZmZzZXRab25lKDApO1xuICAgIH1cbiAgICByZXR1cm4gc2luZ2xldG9uO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhbiBpbnN0YW5jZSB3aXRoIGEgc3BlY2lmaWVkIG9mZnNldFxuICAgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0IC0gVGhlIG9mZnNldCBpbiBtaW51dGVzXG4gICAqIEByZXR1cm4ge0ZpeGVkT2Zmc2V0Wm9uZX1cbiAgICovXG4gIHN0YXRpYyBpbnN0YW5jZShvZmZzZXQpIHtcbiAgICByZXR1cm4gb2Zmc2V0ID09PSAwID8gRml4ZWRPZmZzZXRab25lLnV0Y0luc3RhbmNlIDogbmV3IEZpeGVkT2Zmc2V0Wm9uZShvZmZzZXQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhbiBpbnN0YW5jZSBvZiBGaXhlZE9mZnNldFpvbmUgZnJvbSBhIFVUQyBvZmZzZXQgc3RyaW5nLCBsaWtlIFwiVVRDKzZcIlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcyAtIFRoZSBvZmZzZXQgc3RyaW5nIHRvIHBhcnNlXG4gICAqIEBleGFtcGxlIEZpeGVkT2Zmc2V0Wm9uZS5wYXJzZVNwZWNpZmllcihcIlVUQys2XCIpXG4gICAqIEBleGFtcGxlIEZpeGVkT2Zmc2V0Wm9uZS5wYXJzZVNwZWNpZmllcihcIlVUQyswNlwiKVxuICAgKiBAZXhhbXBsZSBGaXhlZE9mZnNldFpvbmUucGFyc2VTcGVjaWZpZXIoXCJVVEMtNjowMFwiKVxuICAgKiBAcmV0dXJuIHtGaXhlZE9mZnNldFpvbmV9XG4gICAqL1xuICBzdGF0aWMgcGFyc2VTcGVjaWZpZXIocykge1xuICAgIGlmIChzKSB7XG4gICAgICBjb25zdCByID0gcy5tYXRjaCgvXnV0Yyg/OihbKy1dXFxkezEsMn0pKD86OihcXGR7Mn0pKT8pPyQvaSk7XG4gICAgICBpZiAocikge1xuICAgICAgICByZXR1cm4gbmV3IEZpeGVkT2Zmc2V0Wm9uZShzaWduZWRPZmZzZXQoclsxXSwgclsyXSkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKG9mZnNldCkge1xuICAgIHN1cGVyKCk7XG4gICAgLyoqIEBwcml2YXRlICoqL1xuICAgIHRoaXMuZml4ZWQgPSBvZmZzZXQ7XG4gIH1cblxuICAvKiogQG92ZXJyaWRlICoqL1xuICBnZXQgdHlwZSgpIHtcbiAgICByZXR1cm4gXCJmaXhlZFwiO1xuICB9XG5cbiAgLyoqIEBvdmVycmlkZSAqKi9cbiAgZ2V0IG5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZml4ZWQgPT09IDAgPyBcIlVUQ1wiIDogYFVUQyR7Zm9ybWF0T2Zmc2V0KHRoaXMuZml4ZWQsIFwibmFycm93XCIpfWA7XG4gIH1cblxuICBnZXQgaWFuYU5hbWUoKSB7XG4gICAgaWYgKHRoaXMuZml4ZWQgPT09IDApIHtcbiAgICAgIHJldHVybiBcIkV0Yy9VVENcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGBFdGMvR01UJHtmb3JtYXRPZmZzZXQoLXRoaXMuZml4ZWQsIFwibmFycm93XCIpfWA7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBvdmVycmlkZSAqKi9cbiAgb2Zmc2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lO1xuICB9XG5cbiAgLyoqIEBvdmVycmlkZSAqKi9cbiAgZm9ybWF0T2Zmc2V0KHRzLCBmb3JtYXQpIHtcbiAgICByZXR1cm4gZm9ybWF0T2Zmc2V0KHRoaXMuZml4ZWQsIGZvcm1hdCk7XG4gIH1cblxuICAvKiogQG92ZXJyaWRlICoqL1xuICBnZXQgaXNVbml2ZXJzYWwoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKiogQG92ZXJyaWRlICoqL1xuICBvZmZzZXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZml4ZWQ7XG4gIH1cblxuICAvKiogQG92ZXJyaWRlICoqL1xuICBlcXVhbHMob3RoZXJab25lKSB7XG4gICAgcmV0dXJuIG90aGVyWm9uZS50eXBlID09PSBcImZpeGVkXCIgJiYgb3RoZXJab25lLmZpeGVkID09PSB0aGlzLmZpeGVkO1xuICB9XG5cbiAgLyoqIEBvdmVycmlkZSAqKi9cbiAgZ2V0IGlzVmFsaWQoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cblxuLyoqXG4gKiBBIHpvbmUgdGhhdCBmYWlsZWQgdG8gcGFyc2UuIFlvdSBzaG91bGQgbmV2ZXIgbmVlZCB0byBpbnN0YW50aWF0ZSB0aGlzLlxuICogQGltcGxlbWVudHMge1pvbmV9XG4gKi9cbmNsYXNzIEludmFsaWRab25lIGV4dGVuZHMgWm9uZSB7XG4gIGNvbnN0cnVjdG9yKHpvbmVOYW1lKSB7XG4gICAgc3VwZXIoKTtcbiAgICAvKiogIEBwcml2YXRlICovXG4gICAgdGhpcy56b25lTmFtZSA9IHpvbmVOYW1lO1xuICB9XG5cbiAgLyoqIEBvdmVycmlkZSAqKi9cbiAgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuIFwiaW52YWxpZFwiO1xuICB9XG5cbiAgLyoqIEBvdmVycmlkZSAqKi9cbiAgZ2V0IG5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZU5hbWU7XG4gIH1cblxuICAvKiogQG92ZXJyaWRlICoqL1xuICBnZXQgaXNVbml2ZXJzYWwoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqIEBvdmVycmlkZSAqKi9cbiAgb2Zmc2V0TmFtZSgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qKiBAb3ZlcnJpZGUgKiovXG4gIGZvcm1hdE9mZnNldCgpIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfVxuXG4gIC8qKiBAb3ZlcnJpZGUgKiovXG4gIG9mZnNldCgpIHtcbiAgICByZXR1cm4gTmFOO1xuICB9XG5cbiAgLyoqIEBvdmVycmlkZSAqKi9cbiAgZXF1YWxzKCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKiBAb3ZlcnJpZGUgKiovXG4gIGdldCBpc1ZhbGlkKCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vKipcbiAqIEBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbm9ybWFsaXplWm9uZShpbnB1dCwgZGVmYXVsdFpvbmUpIHtcbiAgaWYgKGlzVW5kZWZpbmVkKGlucHV0KSB8fCBpbnB1dCA9PT0gbnVsbCkge1xuICAgIHJldHVybiBkZWZhdWx0Wm9uZTtcbiAgfSBlbHNlIGlmIChpbnB1dCBpbnN0YW5jZW9mIFpvbmUpIHtcbiAgICByZXR1cm4gaW5wdXQ7XG4gIH0gZWxzZSBpZiAoaXNTdHJpbmcoaW5wdXQpKSB7XG4gICAgY29uc3QgbG93ZXJlZCA9IGlucHV0LnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKGxvd2VyZWQgPT09IFwibG9jYWxcIiB8fCBsb3dlcmVkID09PSBcInN5c3RlbVwiKSByZXR1cm4gZGVmYXVsdFpvbmU7XG4gICAgZWxzZSBpZiAobG93ZXJlZCA9PT0gXCJ1dGNcIiB8fCBsb3dlcmVkID09PSBcImdtdFwiKSByZXR1cm4gRml4ZWRPZmZzZXRab25lLnV0Y0luc3RhbmNlO1xuICAgIGVsc2UgcmV0dXJuIEZpeGVkT2Zmc2V0Wm9uZS5wYXJzZVNwZWNpZmllcihsb3dlcmVkKSB8fCBJQU5BWm9uZS5jcmVhdGUoaW5wdXQpO1xuICB9IGVsc2UgaWYgKGlzTnVtYmVyKGlucHV0KSkge1xuICAgIHJldHVybiBGaXhlZE9mZnNldFpvbmUuaW5zdGFuY2UoaW5wdXQpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBpbnB1dCA9PT0gXCJvYmplY3RcIiAmJiBpbnB1dC5vZmZzZXQgJiYgdHlwZW9mIGlucHV0Lm9mZnNldCA9PT0gXCJudW1iZXJcIikge1xuICAgIC8vIFRoaXMgaXMgZHVtYiwgYnV0IHRoZSBpbnN0YW5jZW9mIGNoZWNrIGFib3ZlIGRvZXNuJ3Qgc2VlbSB0byByZWFsbHkgd29ya1xuICAgIC8vIHNvIHdlJ3JlIGR1Y2sgY2hlY2tpbmcgaXRcbiAgICByZXR1cm4gaW5wdXQ7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBJbnZhbGlkWm9uZShpbnB1dCk7XG4gIH1cbn1cblxubGV0IG5vdyA9ICgpID0+IERhdGUubm93KCksXG4gIGRlZmF1bHRab25lID0gXCJzeXN0ZW1cIixcbiAgZGVmYXVsdExvY2FsZSA9IG51bGwsXG4gIGRlZmF1bHROdW1iZXJpbmdTeXN0ZW0gPSBudWxsLFxuICBkZWZhdWx0T3V0cHV0Q2FsZW5kYXIgPSBudWxsLFxuICB0aHJvd09uSW52YWxpZDtcblxuLyoqXG4gKiBTZXR0aW5ncyBjb250YWlucyBzdGF0aWMgZ2V0dGVycyBhbmQgc2V0dGVycyB0aGF0IGNvbnRyb2wgTHV4b24ncyBvdmVyYWxsIGJlaGF2aW9yLiBMdXhvbiBpcyBhIHNpbXBsZSBsaWJyYXJ5IHdpdGggZmV3IG9wdGlvbnMsIGJ1dCB0aGUgb25lcyBpdCBkb2VzIGhhdmUgbGl2ZSBoZXJlLlxuICovXG5jbGFzcyBTZXR0aW5ncyB7XG4gIC8qKlxuICAgKiBHZXQgdGhlIGNhbGxiYWNrIGZvciByZXR1cm5pbmcgdGhlIGN1cnJlbnQgdGltZXN0YW1wLlxuICAgKiBAdHlwZSB7ZnVuY3Rpb259XG4gICAqL1xuICBzdGF0aWMgZ2V0IG5vdygpIHtcbiAgICByZXR1cm4gbm93O1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgY2FsbGJhY2sgZm9yIHJldHVybmluZyB0aGUgY3VycmVudCB0aW1lc3RhbXAuXG4gICAqIFRoZSBmdW5jdGlvbiBzaG91bGQgcmV0dXJuIGEgbnVtYmVyLCB3aGljaCB3aWxsIGJlIGludGVycHJldGVkIGFzIGFuIEVwb2NoIG1pbGxpc2Vjb25kIGNvdW50XG4gICAqIEB0eXBlIHtmdW5jdGlvbn1cbiAgICogQGV4YW1wbGUgU2V0dGluZ3Mubm93ID0gKCkgPT4gRGF0ZS5ub3coKSArIDMwMDAgLy8gcHJldGVuZCBpdCBpcyAzIHNlY29uZHMgaW4gdGhlIGZ1dHVyZVxuICAgKiBAZXhhbXBsZSBTZXR0aW5ncy5ub3cgPSAoKSA9PiAwIC8vIGFsd2F5cyBwcmV0ZW5kIGl0J3MgSmFuIDEsIDE5NzAgYXQgbWlkbmlnaHQgaW4gVVRDIHRpbWVcbiAgICovXG4gIHN0YXRpYyBzZXQgbm93KG4pIHtcbiAgICBub3cgPSBuO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgZGVmYXVsdCB0aW1lIHpvbmUgdG8gY3JlYXRlIERhdGVUaW1lcyBpbi4gRG9lcyBub3QgYWZmZWN0IGV4aXN0aW5nIGluc3RhbmNlcy5cbiAgICogVXNlIHRoZSB2YWx1ZSBcInN5c3RlbVwiIHRvIHJlc2V0IHRoaXMgdmFsdWUgdG8gdGhlIHN5c3RlbSdzIHRpbWUgem9uZS5cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIHN0YXRpYyBzZXQgZGVmYXVsdFpvbmUoem9uZSkge1xuICAgIGRlZmF1bHRab25lID0gem9uZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGRlZmF1bHQgdGltZSB6b25lIG9iamVjdCBjdXJyZW50bHkgdXNlZCB0byBjcmVhdGUgRGF0ZVRpbWVzLiBEb2VzIG5vdCBhZmZlY3QgZXhpc3RpbmcgaW5zdGFuY2VzLlxuICAgKiBUaGUgZGVmYXVsdCB2YWx1ZSBpcyB0aGUgc3lzdGVtJ3MgdGltZSB6b25lICh0aGUgb25lIHNldCBvbiB0aGUgbWFjaGluZSB0aGF0IHJ1bnMgdGhpcyBjb2RlKS5cbiAgICogQHR5cGUge1pvbmV9XG4gICAqL1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRab25lKCkge1xuICAgIHJldHVybiBub3JtYWxpemVab25lKGRlZmF1bHRab25lLCBTeXN0ZW1ab25lLmluc3RhbmNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGRlZmF1bHQgbG9jYWxlIHRvIGNyZWF0ZSBEYXRlVGltZXMgd2l0aC4gRG9lcyBub3QgYWZmZWN0IGV4aXN0aW5nIGluc3RhbmNlcy5cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIHN0YXRpYyBnZXQgZGVmYXVsdExvY2FsZSgpIHtcbiAgICByZXR1cm4gZGVmYXVsdExvY2FsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGRlZmF1bHQgbG9jYWxlIHRvIGNyZWF0ZSBEYXRlVGltZXMgd2l0aC4gRG9lcyBub3QgYWZmZWN0IGV4aXN0aW5nIGluc3RhbmNlcy5cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIHN0YXRpYyBzZXQgZGVmYXVsdExvY2FsZShsb2NhbGUpIHtcbiAgICBkZWZhdWx0TG9jYWxlID0gbG9jYWxlO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZGVmYXVsdCBudW1iZXJpbmcgc3lzdGVtIHRvIGNyZWF0ZSBEYXRlVGltZXMgd2l0aC4gRG9lcyBub3QgYWZmZWN0IGV4aXN0aW5nIGluc3RhbmNlcy5cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIHN0YXRpYyBnZXQgZGVmYXVsdE51bWJlcmluZ1N5c3RlbSgpIHtcbiAgICByZXR1cm4gZGVmYXVsdE51bWJlcmluZ1N5c3RlbTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGRlZmF1bHQgbnVtYmVyaW5nIHN5c3RlbSB0byBjcmVhdGUgRGF0ZVRpbWVzIHdpdGguIERvZXMgbm90IGFmZmVjdCBleGlzdGluZyBpbnN0YW5jZXMuXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuICBzdGF0aWMgc2V0IGRlZmF1bHROdW1iZXJpbmdTeXN0ZW0obnVtYmVyaW5nU3lzdGVtKSB7XG4gICAgZGVmYXVsdE51bWJlcmluZ1N5c3RlbSA9IG51bWJlcmluZ1N5c3RlbTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGRlZmF1bHQgb3V0cHV0IGNhbGVuZGFyIHRvIGNyZWF0ZSBEYXRlVGltZXMgd2l0aC4gRG9lcyBub3QgYWZmZWN0IGV4aXN0aW5nIGluc3RhbmNlcy5cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIHN0YXRpYyBnZXQgZGVmYXVsdE91dHB1dENhbGVuZGFyKCkge1xuICAgIHJldHVybiBkZWZhdWx0T3V0cHV0Q2FsZW5kYXI7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBkZWZhdWx0IG91dHB1dCBjYWxlbmRhciB0byBjcmVhdGUgRGF0ZVRpbWVzIHdpdGguIERvZXMgbm90IGFmZmVjdCBleGlzdGluZyBpbnN0YW5jZXMuXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuICBzdGF0aWMgc2V0IGRlZmF1bHRPdXRwdXRDYWxlbmRhcihvdXRwdXRDYWxlbmRhcikge1xuICAgIGRlZmF1bHRPdXRwdXRDYWxlbmRhciA9IG91dHB1dENhbGVuZGFyO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB3aGV0aGVyIEx1eG9uIHdpbGwgdGhyb3cgd2hlbiBpdCBlbmNvdW50ZXJzIGludmFsaWQgRGF0ZVRpbWVzLCBEdXJhdGlvbnMsIG9yIEludGVydmFsc1xuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICovXG4gIHN0YXRpYyBnZXQgdGhyb3dPbkludmFsaWQoKSB7XG4gICAgcmV0dXJuIHRocm93T25JbnZhbGlkO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB3aGV0aGVyIEx1eG9uIHdpbGwgdGhyb3cgd2hlbiBpdCBlbmNvdW50ZXJzIGludmFsaWQgRGF0ZVRpbWVzLCBEdXJhdGlvbnMsIG9yIEludGVydmFsc1xuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICovXG4gIHN0YXRpYyBzZXQgdGhyb3dPbkludmFsaWQodCkge1xuICAgIHRocm93T25JbnZhbGlkID0gdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCBMdXhvbidzIGdsb2JhbCBjYWNoZXMuIFNob3VsZCBvbmx5IGJlIG5lY2Vzc2FyeSBpbiB0ZXN0aW5nIHNjZW5hcmlvcy5cbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIHN0YXRpYyByZXNldENhY2hlcygpIHtcbiAgICBMb2NhbGUucmVzZXRDYWNoZSgpO1xuICAgIElBTkFab25lLnJlc2V0Q2FjaGUoKTtcbiAgfVxufVxuXG5sZXQgaW50bExGQ2FjaGUgPSB7fTtcbmZ1bmN0aW9uIGdldENhY2hlZExGKGxvY1N0cmluZywgb3B0cyA9IHt9KSB7XG4gIGNvbnN0IGtleSA9IEpTT04uc3RyaW5naWZ5KFtsb2NTdHJpbmcsIG9wdHNdKTtcbiAgbGV0IGR0ZiA9IGludGxMRkNhY2hlW2tleV07XG4gIGlmICghZHRmKSB7XG4gICAgZHRmID0gbmV3IEludGwuTGlzdEZvcm1hdChsb2NTdHJpbmcsIG9wdHMpO1xuICAgIGludGxMRkNhY2hlW2tleV0gPSBkdGY7XG4gIH1cbiAgcmV0dXJuIGR0Zjtcbn1cblxubGV0IGludGxEVENhY2hlID0ge307XG5mdW5jdGlvbiBnZXRDYWNoZWREVEYobG9jU3RyaW5nLCBvcHRzID0ge30pIHtcbiAgY29uc3Qga2V5ID0gSlNPTi5zdHJpbmdpZnkoW2xvY1N0cmluZywgb3B0c10pO1xuICBsZXQgZHRmID0gaW50bERUQ2FjaGVba2V5XTtcbiAgaWYgKCFkdGYpIHtcbiAgICBkdGYgPSBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChsb2NTdHJpbmcsIG9wdHMpO1xuICAgIGludGxEVENhY2hlW2tleV0gPSBkdGY7XG4gIH1cbiAgcmV0dXJuIGR0Zjtcbn1cblxubGV0IGludGxOdW1DYWNoZSA9IHt9O1xuZnVuY3Rpb24gZ2V0Q2FjaGVkSU5GKGxvY1N0cmluZywgb3B0cyA9IHt9KSB7XG4gIGNvbnN0IGtleSA9IEpTT04uc3RyaW5naWZ5KFtsb2NTdHJpbmcsIG9wdHNdKTtcbiAgbGV0IGluZiA9IGludGxOdW1DYWNoZVtrZXldO1xuICBpZiAoIWluZikge1xuICAgIGluZiA9IG5ldyBJbnRsLk51bWJlckZvcm1hdChsb2NTdHJpbmcsIG9wdHMpO1xuICAgIGludGxOdW1DYWNoZVtrZXldID0gaW5mO1xuICB9XG4gIHJldHVybiBpbmY7XG59XG5cbmxldCBpbnRsUmVsQ2FjaGUgPSB7fTtcbmZ1bmN0aW9uIGdldENhY2hlZFJURihsb2NTdHJpbmcsIG9wdHMgPSB7fSkge1xuICBjb25zdCB7IGJhc2UsIC4uLmNhY2hlS2V5T3B0cyB9ID0gb3B0czsgLy8gZXhjbHVkZSBgYmFzZWAgZnJvbSB0aGUgb3B0aW9uc1xuICBjb25zdCBrZXkgPSBKU09OLnN0cmluZ2lmeShbbG9jU3RyaW5nLCBjYWNoZUtleU9wdHNdKTtcbiAgbGV0IGluZiA9IGludGxSZWxDYWNoZVtrZXldO1xuICBpZiAoIWluZikge1xuICAgIGluZiA9IG5ldyBJbnRsLlJlbGF0aXZlVGltZUZvcm1hdChsb2NTdHJpbmcsIG9wdHMpO1xuICAgIGludGxSZWxDYWNoZVtrZXldID0gaW5mO1xuICB9XG4gIHJldHVybiBpbmY7XG59XG5cbmxldCBzeXNMb2NhbGVDYWNoZSA9IG51bGw7XG5mdW5jdGlvbiBzeXN0ZW1Mb2NhbGUoKSB7XG4gIGlmIChzeXNMb2NhbGVDYWNoZSkge1xuICAgIHJldHVybiBzeXNMb2NhbGVDYWNoZTtcbiAgfSBlbHNlIHtcbiAgICBzeXNMb2NhbGVDYWNoZSA9IG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KCkucmVzb2x2ZWRPcHRpb25zKCkubG9jYWxlO1xuICAgIHJldHVybiBzeXNMb2NhbGVDYWNoZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwYXJzZUxvY2FsZVN0cmluZyhsb2NhbGVTdHIpIHtcbiAgLy8gSSByZWFsbHkgd2FudCB0byBhdm9pZCB3cml0aW5nIGEgQkNQIDQ3IHBhcnNlclxuICAvLyBzZWUsIGUuZy4gaHR0cHM6Ly9naXRodWIuY29tL3dvb29ybS9iY3AtNDdcbiAgLy8gSW5zdGVhZCwgd2UnbGwgZG8gdGhpczpcblxuICAvLyBhKSBpZiB0aGUgc3RyaW5nIGhhcyBubyAtdSBleHRlbnNpb25zLCBqdXN0IGxlYXZlIGl0IGFsb25lXG4gIC8vIGIpIGlmIGl0IGRvZXMsIHVzZSBJbnRsIHRvIHJlc29sdmUgZXZlcnl0aGluZ1xuICAvLyBjKSBpZiBJbnRsIGZhaWxzLCB0cnkgYWdhaW4gd2l0aG91dCB0aGUgLXVcblxuICBjb25zdCB1SW5kZXggPSBsb2NhbGVTdHIuaW5kZXhPZihcIi11LVwiKTtcbiAgaWYgKHVJbmRleCA9PT0gLTEpIHtcbiAgICByZXR1cm4gW2xvY2FsZVN0cl07XG4gIH0gZWxzZSB7XG4gICAgbGV0IG9wdGlvbnM7XG4gICAgY29uc3Qgc21hbGxlciA9IGxvY2FsZVN0ci5zdWJzdHJpbmcoMCwgdUluZGV4KTtcbiAgICB0cnkge1xuICAgICAgb3B0aW9ucyA9IGdldENhY2hlZERURihsb2NhbGVTdHIpLnJlc29sdmVkT3B0aW9ucygpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIG9wdGlvbnMgPSBnZXRDYWNoZWREVEYoc21hbGxlcikucmVzb2x2ZWRPcHRpb25zKCk7XG4gICAgfVxuXG4gICAgY29uc3QgeyBudW1iZXJpbmdTeXN0ZW0sIGNhbGVuZGFyIH0gPSBvcHRpb25zO1xuICAgIC8vIHJldHVybiB0aGUgc21hbGxlciBvbmUgc28gdGhhdCB3ZSBjYW4gYXBwZW5kIHRoZSBjYWxlbmRhciBhbmQgbnVtYmVyaW5nIG92ZXJyaWRlcyB0byBpdFxuICAgIHJldHVybiBbc21hbGxlciwgbnVtYmVyaW5nU3lzdGVtLCBjYWxlbmRhcl07XG4gIH1cbn1cblxuZnVuY3Rpb24gaW50bENvbmZpZ1N0cmluZyhsb2NhbGVTdHIsIG51bWJlcmluZ1N5c3RlbSwgb3V0cHV0Q2FsZW5kYXIpIHtcbiAgaWYgKG91dHB1dENhbGVuZGFyIHx8IG51bWJlcmluZ1N5c3RlbSkge1xuICAgIGxvY2FsZVN0ciArPSBcIi11XCI7XG5cbiAgICBpZiAob3V0cHV0Q2FsZW5kYXIpIHtcbiAgICAgIGxvY2FsZVN0ciArPSBgLWNhLSR7b3V0cHV0Q2FsZW5kYXJ9YDtcbiAgICB9XG5cbiAgICBpZiAobnVtYmVyaW5nU3lzdGVtKSB7XG4gICAgICBsb2NhbGVTdHIgKz0gYC1udS0ke251bWJlcmluZ1N5c3RlbX1gO1xuICAgIH1cbiAgICByZXR1cm4gbG9jYWxlU3RyO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBsb2NhbGVTdHI7XG4gIH1cbn1cblxuZnVuY3Rpb24gbWFwTW9udGhzKGYpIHtcbiAgY29uc3QgbXMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPD0gMTI7IGkrKykge1xuICAgIGNvbnN0IGR0ID0gRGF0ZVRpbWUudXRjKDIwMTYsIGksIDEpO1xuICAgIG1zLnB1c2goZihkdCkpO1xuICB9XG4gIHJldHVybiBtcztcbn1cblxuZnVuY3Rpb24gbWFwV2Vla2RheXMoZikge1xuICBjb25zdCBtcyA9IFtdO1xuICBmb3IgKGxldCBpID0gMTsgaSA8PSA3OyBpKyspIHtcbiAgICBjb25zdCBkdCA9IERhdGVUaW1lLnV0YygyMDE2LCAxMSwgMTMgKyBpKTtcbiAgICBtcy5wdXNoKGYoZHQpKTtcbiAgfVxuICByZXR1cm4gbXM7XG59XG5cbmZ1bmN0aW9uIGxpc3RTdHVmZihsb2MsIGxlbmd0aCwgZGVmYXVsdE9LLCBlbmdsaXNoRm4sIGludGxGbikge1xuICBjb25zdCBtb2RlID0gbG9jLmxpc3RpbmdNb2RlKGRlZmF1bHRPSyk7XG5cbiAgaWYgKG1vZGUgPT09IFwiZXJyb3JcIikge1xuICAgIHJldHVybiBudWxsO1xuICB9IGVsc2UgaWYgKG1vZGUgPT09IFwiZW5cIikge1xuICAgIHJldHVybiBlbmdsaXNoRm4obGVuZ3RoKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gaW50bEZuKGxlbmd0aCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc3VwcG9ydHNGYXN0TnVtYmVycyhsb2MpIHtcbiAgaWYgKGxvYy5udW1iZXJpbmdTeXN0ZW0gJiYgbG9jLm51bWJlcmluZ1N5c3RlbSAhPT0gXCJsYXRuXCIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIChcbiAgICAgIGxvYy5udW1iZXJpbmdTeXN0ZW0gPT09IFwibGF0blwiIHx8XG4gICAgICAhbG9jLmxvY2FsZSB8fFxuICAgICAgbG9jLmxvY2FsZS5zdGFydHNXaXRoKFwiZW5cIikgfHxcbiAgICAgIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KGxvYy5pbnRsKS5yZXNvbHZlZE9wdGlvbnMoKS5udW1iZXJpbmdTeXN0ZW0gPT09IFwibGF0blwiXG4gICAgKTtcbiAgfVxufVxuXG4vKipcbiAqIEBwcml2YXRlXG4gKi9cblxuY2xhc3MgUG9seU51bWJlckZvcm1hdHRlciB7XG4gIGNvbnN0cnVjdG9yKGludGwsIGZvcmNlU2ltcGxlLCBvcHRzKSB7XG4gICAgdGhpcy5wYWRUbyA9IG9wdHMucGFkVG8gfHwgMDtcbiAgICB0aGlzLmZsb29yID0gb3B0cy5mbG9vciB8fCBmYWxzZTtcblxuICAgIGNvbnN0IHsgcGFkVG8sIGZsb29yLCAuLi5vdGhlck9wdHMgfSA9IG9wdHM7XG5cbiAgICBpZiAoIWZvcmNlU2ltcGxlIHx8IE9iamVjdC5rZXlzKG90aGVyT3B0cykubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgaW50bE9wdHMgPSB7IHVzZUdyb3VwaW5nOiBmYWxzZSwgLi4ub3B0cyB9O1xuICAgICAgaWYgKG9wdHMucGFkVG8gPiAwKSBpbnRsT3B0cy5taW5pbXVtSW50ZWdlckRpZ2l0cyA9IG9wdHMucGFkVG87XG4gICAgICB0aGlzLmluZiA9IGdldENhY2hlZElORihpbnRsLCBpbnRsT3B0cyk7XG4gICAgfVxuICB9XG5cbiAgZm9ybWF0KGkpIHtcbiAgICBpZiAodGhpcy5pbmYpIHtcbiAgICAgIGNvbnN0IGZpeGVkID0gdGhpcy5mbG9vciA/IE1hdGguZmxvb3IoaSkgOiBpO1xuICAgICAgcmV0dXJuIHRoaXMuaW5mLmZvcm1hdChmaXhlZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHRvIG1hdGNoIHRoZSBicm93c2VyJ3MgbnVtYmVyZm9ybWF0dGVyIGRlZmF1bHRzXG4gICAgICBjb25zdCBmaXhlZCA9IHRoaXMuZmxvb3IgPyBNYXRoLmZsb29yKGkpIDogcm91bmRUbyhpLCAzKTtcbiAgICAgIHJldHVybiBwYWRTdGFydChmaXhlZCwgdGhpcy5wYWRUbyk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuXG5jbGFzcyBQb2x5RGF0ZUZvcm1hdHRlciB7XG4gIGNvbnN0cnVjdG9yKGR0LCBpbnRsLCBvcHRzKSB7XG4gICAgdGhpcy5vcHRzID0gb3B0cztcblxuICAgIGxldCB6O1xuICAgIGlmIChkdC56b25lLmlzVW5pdmVyc2FsKSB7XG4gICAgICAvLyBVVEMtOCBvciBFdGMvVVRDLTggYXJlIG5vdCBwYXJ0IG9mIHR6ZGF0YSwgb25seSBFdGMvR01UKzggYW5kIHRoZSBsaWtlLlxuICAgICAgLy8gVGhhdCBpcyB3aHkgZml4ZWQtb2Zmc2V0IFRaIGlzIHNldCB0byB0aGF0IHVubGVzcyBpdCBpczpcbiAgICAgIC8vIDEuIFJlcHJlc2VudGluZyBvZmZzZXQgMCB3aGVuIFVUQyBpcyB1c2VkIHRvIG1haW50YWluIHByZXZpb3VzIGJlaGF2aW9yIGFuZCBkb2VzIG5vdCBiZWNvbWUgR01ULlxuICAgICAgLy8gMi4gVW5zdXBwb3J0ZWQgYnkgdGhlIGJyb3dzZXI6XG4gICAgICAvLyAgICAtIHNvbWUgZG8gbm90IHN1cHBvcnQgRXRjL1xuICAgICAgLy8gICAgLSA8IEV0Yy9HTVQtMTQsID4gRXRjL0dNVCsxMiwgYW5kIDMwLW1pbnV0ZSBvciA0NS1taW51dGUgb2Zmc2V0cyBhcmUgbm90IHBhcnQgb2YgdHpkYXRhXG4gICAgICBjb25zdCBnbXRPZmZzZXQgPSAtMSAqIChkdC5vZmZzZXQgLyA2MCk7XG4gICAgICBjb25zdCBvZmZzZXRaID0gZ210T2Zmc2V0ID49IDAgPyBgRXRjL0dNVCske2dtdE9mZnNldH1gIDogYEV0Yy9HTVQke2dtdE9mZnNldH1gO1xuICAgICAgaWYgKGR0Lm9mZnNldCAhPT0gMCAmJiBJQU5BWm9uZS5jcmVhdGUob2Zmc2V0WikudmFsaWQpIHtcbiAgICAgICAgeiA9IG9mZnNldFo7XG4gICAgICAgIHRoaXMuZHQgPSBkdDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIE5vdCBhbGwgZml4ZWQtb2Zmc2V0IHpvbmVzIGxpa2UgRXRjLys0OjMwIGFyZSBwcmVzZW50IGluIHR6ZGF0YS5cbiAgICAgICAgLy8gU28gd2UgaGF2ZSB0byBtYWtlIGRvLiBUd28gY2FzZXM6XG4gICAgICAgIC8vIDEuIFRoZSBmb3JtYXQgb3B0aW9ucyB0ZWxsIHVzIHRvIHNob3cgdGhlIHpvbmUuIFdlIGNhbid0IGRvIHRoYXQsIHNvIHRoZSBiZXN0XG4gICAgICAgIC8vIHdlIGNhbiBkbyBpcyBmb3JtYXQgdGhlIGRhdGUgaW4gVVRDLlxuICAgICAgICAvLyAyLiBUaGUgZm9ybWF0IG9wdGlvbnMgZG9uJ3QgdGVsbCB1cyB0byBzaG93IHRoZSB6b25lLiBUaGVuIHdlIGNhbiBhZGp1c3QgdGhlbVxuICAgICAgICAvLyB0aGUgdGltZSBhbmQgdGVsbCB0aGUgZm9ybWF0dGVyIHRvIHNob3cgaXQgdG8gdXMgaW4gVVRDLCBzbyB0aGF0IHRoZSB0aW1lIGlzIHJpZ2h0XG4gICAgICAgIC8vIGFuZCB0aGUgYmFkIHpvbmUgZG9lc24ndCBzaG93IHVwLlxuICAgICAgICB6ID0gXCJVVENcIjtcbiAgICAgICAgaWYgKG9wdHMudGltZVpvbmVOYW1lKSB7XG4gICAgICAgICAgdGhpcy5kdCA9IGR0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZHQgPSBkdC5vZmZzZXQgPT09IDAgPyBkdCA6IERhdGVUaW1lLmZyb21NaWxsaXMoZHQudHMgKyBkdC5vZmZzZXQgKiA2MCAqIDEwMDApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChkdC56b25lLnR5cGUgPT09IFwic3lzdGVtXCIpIHtcbiAgICAgIHRoaXMuZHQgPSBkdDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kdCA9IGR0O1xuICAgICAgeiA9IGR0LnpvbmUubmFtZTtcbiAgICB9XG5cbiAgICBjb25zdCBpbnRsT3B0cyA9IHsgLi4udGhpcy5vcHRzIH07XG4gICAgaWYgKHopIHtcbiAgICAgIGludGxPcHRzLnRpbWVab25lID0gejtcbiAgICB9XG4gICAgdGhpcy5kdGYgPSBnZXRDYWNoZWREVEYoaW50bCwgaW50bE9wdHMpO1xuICB9XG5cbiAgZm9ybWF0KCkge1xuICAgIHJldHVybiB0aGlzLmR0Zi5mb3JtYXQodGhpcy5kdC50b0pTRGF0ZSgpKTtcbiAgfVxuXG4gIGZvcm1hdFRvUGFydHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZHRmLmZvcm1hdFRvUGFydHModGhpcy5kdC50b0pTRGF0ZSgpKTtcbiAgfVxuXG4gIHJlc29sdmVkT3B0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5kdGYucmVzb2x2ZWRPcHRpb25zKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5jbGFzcyBQb2x5UmVsRm9ybWF0dGVyIHtcbiAgY29uc3RydWN0b3IoaW50bCwgaXNFbmdsaXNoLCBvcHRzKSB7XG4gICAgdGhpcy5vcHRzID0geyBzdHlsZTogXCJsb25nXCIsIC4uLm9wdHMgfTtcbiAgICBpZiAoIWlzRW5nbGlzaCAmJiBoYXNSZWxhdGl2ZSgpKSB7XG4gICAgICB0aGlzLnJ0ZiA9IGdldENhY2hlZFJURihpbnRsLCBvcHRzKTtcbiAgICB9XG4gIH1cblxuICBmb3JtYXQoY291bnQsIHVuaXQpIHtcbiAgICBpZiAodGhpcy5ydGYpIHtcbiAgICAgIHJldHVybiB0aGlzLnJ0Zi5mb3JtYXQoY291bnQsIHVuaXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZm9ybWF0UmVsYXRpdmVUaW1lKHVuaXQsIGNvdW50LCB0aGlzLm9wdHMubnVtZXJpYywgdGhpcy5vcHRzLnN0eWxlICE9PSBcImxvbmdcIik7XG4gICAgfVxuICB9XG5cbiAgZm9ybWF0VG9QYXJ0cyhjb3VudCwgdW5pdCkge1xuICAgIGlmICh0aGlzLnJ0Zikge1xuICAgICAgcmV0dXJuIHRoaXMucnRmLmZvcm1hdFRvUGFydHMoY291bnQsIHVuaXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuXG5jbGFzcyBMb2NhbGUge1xuICBzdGF0aWMgZnJvbU9wdHMob3B0cykge1xuICAgIHJldHVybiBMb2NhbGUuY3JlYXRlKG9wdHMubG9jYWxlLCBvcHRzLm51bWJlcmluZ1N5c3RlbSwgb3B0cy5vdXRwdXRDYWxlbmRhciwgb3B0cy5kZWZhdWx0VG9FTik7XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlKGxvY2FsZSwgbnVtYmVyaW5nU3lzdGVtLCBvdXRwdXRDYWxlbmRhciwgZGVmYXVsdFRvRU4gPSBmYWxzZSkge1xuICAgIGNvbnN0IHNwZWNpZmllZExvY2FsZSA9IGxvY2FsZSB8fCBTZXR0aW5ncy5kZWZhdWx0TG9jYWxlO1xuICAgIC8vIHRoZSBzeXN0ZW0gbG9jYWxlIGlzIHVzZWZ1bCBmb3IgaHVtYW4gcmVhZGFibGUgc3RyaW5ncyBidXQgYW5ub3lpbmcgZm9yIHBhcnNpbmcvZm9ybWF0dGluZyBrbm93biBmb3JtYXRzXG4gICAgY29uc3QgbG9jYWxlUiA9IHNwZWNpZmllZExvY2FsZSB8fCAoZGVmYXVsdFRvRU4gPyBcImVuLVVTXCIgOiBzeXN0ZW1Mb2NhbGUoKSk7XG4gICAgY29uc3QgbnVtYmVyaW5nU3lzdGVtUiA9IG51bWJlcmluZ1N5c3RlbSB8fCBTZXR0aW5ncy5kZWZhdWx0TnVtYmVyaW5nU3lzdGVtO1xuICAgIGNvbnN0IG91dHB1dENhbGVuZGFyUiA9IG91dHB1dENhbGVuZGFyIHx8IFNldHRpbmdzLmRlZmF1bHRPdXRwdXRDYWxlbmRhcjtcbiAgICByZXR1cm4gbmV3IExvY2FsZShsb2NhbGVSLCBudW1iZXJpbmdTeXN0ZW1SLCBvdXRwdXRDYWxlbmRhclIsIHNwZWNpZmllZExvY2FsZSk7XG4gIH1cblxuICBzdGF0aWMgcmVzZXRDYWNoZSgpIHtcbiAgICBzeXNMb2NhbGVDYWNoZSA9IG51bGw7XG4gICAgaW50bERUQ2FjaGUgPSB7fTtcbiAgICBpbnRsTnVtQ2FjaGUgPSB7fTtcbiAgICBpbnRsUmVsQ2FjaGUgPSB7fTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tT2JqZWN0KHsgbG9jYWxlLCBudW1iZXJpbmdTeXN0ZW0sIG91dHB1dENhbGVuZGFyIH0gPSB7fSkge1xuICAgIHJldHVybiBMb2NhbGUuY3JlYXRlKGxvY2FsZSwgbnVtYmVyaW5nU3lzdGVtLCBvdXRwdXRDYWxlbmRhcik7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihsb2NhbGUsIG51bWJlcmluZywgb3V0cHV0Q2FsZW5kYXIsIHNwZWNpZmllZExvY2FsZSkge1xuICAgIGNvbnN0IFtwYXJzZWRMb2NhbGUsIHBhcnNlZE51bWJlcmluZ1N5c3RlbSwgcGFyc2VkT3V0cHV0Q2FsZW5kYXJdID0gcGFyc2VMb2NhbGVTdHJpbmcobG9jYWxlKTtcblxuICAgIHRoaXMubG9jYWxlID0gcGFyc2VkTG9jYWxlO1xuICAgIHRoaXMubnVtYmVyaW5nU3lzdGVtID0gbnVtYmVyaW5nIHx8IHBhcnNlZE51bWJlcmluZ1N5c3RlbSB8fCBudWxsO1xuICAgIHRoaXMub3V0cHV0Q2FsZW5kYXIgPSBvdXRwdXRDYWxlbmRhciB8fCBwYXJzZWRPdXRwdXRDYWxlbmRhciB8fCBudWxsO1xuICAgIHRoaXMuaW50bCA9IGludGxDb25maWdTdHJpbmcodGhpcy5sb2NhbGUsIHRoaXMubnVtYmVyaW5nU3lzdGVtLCB0aGlzLm91dHB1dENhbGVuZGFyKTtcblxuICAgIHRoaXMud2Vla2RheXNDYWNoZSA9IHsgZm9ybWF0OiB7fSwgc3RhbmRhbG9uZToge30gfTtcbiAgICB0aGlzLm1vbnRoc0NhY2hlID0geyBmb3JtYXQ6IHt9LCBzdGFuZGFsb25lOiB7fSB9O1xuICAgIHRoaXMubWVyaWRpZW1DYWNoZSA9IG51bGw7XG4gICAgdGhpcy5lcmFDYWNoZSA9IHt9O1xuXG4gICAgdGhpcy5zcGVjaWZpZWRMb2NhbGUgPSBzcGVjaWZpZWRMb2NhbGU7XG4gICAgdGhpcy5mYXN0TnVtYmVyc0NhY2hlZCA9IG51bGw7XG4gIH1cblxuICBnZXQgZmFzdE51bWJlcnMoKSB7XG4gICAgaWYgKHRoaXMuZmFzdE51bWJlcnNDYWNoZWQgPT0gbnVsbCkge1xuICAgICAgdGhpcy5mYXN0TnVtYmVyc0NhY2hlZCA9IHN1cHBvcnRzRmFzdE51bWJlcnModGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZmFzdE51bWJlcnNDYWNoZWQ7XG4gIH1cblxuICBsaXN0aW5nTW9kZSgpIHtcbiAgICBjb25zdCBpc0FjdHVhbGx5RW4gPSB0aGlzLmlzRW5nbGlzaCgpO1xuICAgIGNvbnN0IGhhc05vV2VpcmRuZXNzID1cbiAgICAgICh0aGlzLm51bWJlcmluZ1N5c3RlbSA9PT0gbnVsbCB8fCB0aGlzLm51bWJlcmluZ1N5c3RlbSA9PT0gXCJsYXRuXCIpICYmXG4gICAgICAodGhpcy5vdXRwdXRDYWxlbmRhciA9PT0gbnVsbCB8fCB0aGlzLm91dHB1dENhbGVuZGFyID09PSBcImdyZWdvcnlcIik7XG4gICAgcmV0dXJuIGlzQWN0dWFsbHlFbiAmJiBoYXNOb1dlaXJkbmVzcyA/IFwiZW5cIiA6IFwiaW50bFwiO1xuICB9XG5cbiAgY2xvbmUoYWx0cykge1xuICAgIGlmICghYWx0cyB8fCBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhhbHRzKS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gTG9jYWxlLmNyZWF0ZShcbiAgICAgICAgYWx0cy5sb2NhbGUgfHwgdGhpcy5zcGVjaWZpZWRMb2NhbGUsXG4gICAgICAgIGFsdHMubnVtYmVyaW5nU3lzdGVtIHx8IHRoaXMubnVtYmVyaW5nU3lzdGVtLFxuICAgICAgICBhbHRzLm91dHB1dENhbGVuZGFyIHx8IHRoaXMub3V0cHV0Q2FsZW5kYXIsXG4gICAgICAgIGFsdHMuZGVmYXVsdFRvRU4gfHwgZmFsc2VcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcmVkZWZhdWx0VG9FTihhbHRzID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5jbG9uZSh7IC4uLmFsdHMsIGRlZmF1bHRUb0VOOiB0cnVlIH0pO1xuICB9XG5cbiAgcmVkZWZhdWx0VG9TeXN0ZW0oYWx0cyA9IHt9KSB7XG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoeyAuLi5hbHRzLCBkZWZhdWx0VG9FTjogZmFsc2UgfSk7XG4gIH1cblxuICBtb250aHMobGVuZ3RoLCBmb3JtYXQgPSBmYWxzZSwgZGVmYXVsdE9LID0gdHJ1ZSkge1xuICAgIHJldHVybiBsaXN0U3R1ZmYodGhpcywgbGVuZ3RoLCBkZWZhdWx0T0ssIG1vbnRocywgKCkgPT4ge1xuICAgICAgY29uc3QgaW50bCA9IGZvcm1hdCA/IHsgbW9udGg6IGxlbmd0aCwgZGF5OiBcIm51bWVyaWNcIiB9IDogeyBtb250aDogbGVuZ3RoIH0sXG4gICAgICAgIGZvcm1hdFN0ciA9IGZvcm1hdCA/IFwiZm9ybWF0XCIgOiBcInN0YW5kYWxvbmVcIjtcbiAgICAgIGlmICghdGhpcy5tb250aHNDYWNoZVtmb3JtYXRTdHJdW2xlbmd0aF0pIHtcbiAgICAgICAgdGhpcy5tb250aHNDYWNoZVtmb3JtYXRTdHJdW2xlbmd0aF0gPSBtYXBNb250aHMoKGR0KSA9PiB0aGlzLmV4dHJhY3QoZHQsIGludGwsIFwibW9udGhcIikpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMubW9udGhzQ2FjaGVbZm9ybWF0U3RyXVtsZW5ndGhdO1xuICAgIH0pO1xuICB9XG5cbiAgd2Vla2RheXMobGVuZ3RoLCBmb3JtYXQgPSBmYWxzZSwgZGVmYXVsdE9LID0gdHJ1ZSkge1xuICAgIHJldHVybiBsaXN0U3R1ZmYodGhpcywgbGVuZ3RoLCBkZWZhdWx0T0ssIHdlZWtkYXlzLCAoKSA9PiB7XG4gICAgICBjb25zdCBpbnRsID0gZm9ybWF0XG4gICAgICAgICAgPyB7IHdlZWtkYXk6IGxlbmd0aCwgeWVhcjogXCJudW1lcmljXCIsIG1vbnRoOiBcImxvbmdcIiwgZGF5OiBcIm51bWVyaWNcIiB9XG4gICAgICAgICAgOiB7IHdlZWtkYXk6IGxlbmd0aCB9LFxuICAgICAgICBmb3JtYXRTdHIgPSBmb3JtYXQgPyBcImZvcm1hdFwiIDogXCJzdGFuZGFsb25lXCI7XG4gICAgICBpZiAoIXRoaXMud2Vla2RheXNDYWNoZVtmb3JtYXRTdHJdW2xlbmd0aF0pIHtcbiAgICAgICAgdGhpcy53ZWVrZGF5c0NhY2hlW2Zvcm1hdFN0cl1bbGVuZ3RoXSA9IG1hcFdlZWtkYXlzKChkdCkgPT5cbiAgICAgICAgICB0aGlzLmV4dHJhY3QoZHQsIGludGwsIFwid2Vla2RheVwiKVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMud2Vla2RheXNDYWNoZVtmb3JtYXRTdHJdW2xlbmd0aF07XG4gICAgfSk7XG4gIH1cblxuICBtZXJpZGllbXMoZGVmYXVsdE9LID0gdHJ1ZSkge1xuICAgIHJldHVybiBsaXN0U3R1ZmYoXG4gICAgICB0aGlzLFxuICAgICAgdW5kZWZpbmVkLFxuICAgICAgZGVmYXVsdE9LLFxuICAgICAgKCkgPT4gbWVyaWRpZW1zLFxuICAgICAgKCkgPT4ge1xuICAgICAgICAvLyBJbiB0aGVvcnkgdGhlcmUgY291bGQgYmUgYXJpYml0cmFyeSBkYXkgcGVyaW9kcy4gV2UncmUgZ29ubmEgYXNzdW1lIHRoZXJlIGFyZSBleGFjdGx5IHR3b1xuICAgICAgICAvLyBmb3IgQU0gYW5kIFBNLiBUaGlzIGlzIHByb2JhYmx5IHdyb25nLCBidXQgaXQncyBtYWtlcyBwYXJzaW5nIHdheSBlYXNpZXIuXG4gICAgICAgIGlmICghdGhpcy5tZXJpZGllbUNhY2hlKSB7XG4gICAgICAgICAgY29uc3QgaW50bCA9IHsgaG91cjogXCJudW1lcmljXCIsIGhvdXJDeWNsZTogXCJoMTJcIiB9O1xuICAgICAgICAgIHRoaXMubWVyaWRpZW1DYWNoZSA9IFtEYXRlVGltZS51dGMoMjAxNiwgMTEsIDEzLCA5KSwgRGF0ZVRpbWUudXRjKDIwMTYsIDExLCAxMywgMTkpXS5tYXAoXG4gICAgICAgICAgICAoZHQpID0+IHRoaXMuZXh0cmFjdChkdCwgaW50bCwgXCJkYXlwZXJpb2RcIilcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubWVyaWRpZW1DYWNoZTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgZXJhcyhsZW5ndGgsIGRlZmF1bHRPSyA9IHRydWUpIHtcbiAgICByZXR1cm4gbGlzdFN0dWZmKHRoaXMsIGxlbmd0aCwgZGVmYXVsdE9LLCBlcmFzLCAoKSA9PiB7XG4gICAgICBjb25zdCBpbnRsID0geyBlcmE6IGxlbmd0aCB9O1xuXG4gICAgICAvLyBUaGlzIGlzIHByb2JsZW1hdGljLiBEaWZmZXJlbnQgY2FsZW5kYXJzIGFyZSBnb2luZyB0byBkZWZpbmUgZXJhcyB0b3RhbGx5IGRpZmZlcmVudGx5LiBXaGF0IEkgbmVlZCBpcyB0aGUgbWluaW11bSBzZXQgb2YgZGF0ZXNcbiAgICAgIC8vIHRvIGRlZmluaXRlbHkgZW51bWVyYXRlIHRoZW0uXG4gICAgICBpZiAoIXRoaXMuZXJhQ2FjaGVbbGVuZ3RoXSkge1xuICAgICAgICB0aGlzLmVyYUNhY2hlW2xlbmd0aF0gPSBbRGF0ZVRpbWUudXRjKC00MCwgMSwgMSksIERhdGVUaW1lLnV0YygyMDE3LCAxLCAxKV0ubWFwKChkdCkgPT5cbiAgICAgICAgICB0aGlzLmV4dHJhY3QoZHQsIGludGwsIFwiZXJhXCIpXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmVyYUNhY2hlW2xlbmd0aF07XG4gICAgfSk7XG4gIH1cblxuICBleHRyYWN0KGR0LCBpbnRsT3B0cywgZmllbGQpIHtcbiAgICBjb25zdCBkZiA9IHRoaXMuZHRGb3JtYXR0ZXIoZHQsIGludGxPcHRzKSxcbiAgICAgIHJlc3VsdHMgPSBkZi5mb3JtYXRUb1BhcnRzKCksXG4gICAgICBtYXRjaGluZyA9IHJlc3VsdHMuZmluZCgobSkgPT4gbS50eXBlLnRvTG93ZXJDYXNlKCkgPT09IGZpZWxkKTtcbiAgICByZXR1cm4gbWF0Y2hpbmcgPyBtYXRjaGluZy52YWx1ZSA6IG51bGw7XG4gIH1cblxuICBudW1iZXJGb3JtYXR0ZXIob3B0cyA9IHt9KSB7XG4gICAgLy8gdGhpcyBmb3JjZXNpbXBsZSBvcHRpb24gaXMgbmV2ZXIgdXNlZCAodGhlIG9ubHkgY2FsbGVyIHNob3J0LWNpcmN1aXRzIG9uIGl0LCBidXQgaXQgc2VlbXMgc2FmZXIgdG8gbGVhdmUpXG4gICAgLy8gKGluIGNvbnRyYXN0LCB0aGUgcmVzdCBvZiB0aGUgY29uZGl0aW9uIGlzIHVzZWQgaGVhdmlseSlcbiAgICByZXR1cm4gbmV3IFBvbHlOdW1iZXJGb3JtYXR0ZXIodGhpcy5pbnRsLCBvcHRzLmZvcmNlU2ltcGxlIHx8IHRoaXMuZmFzdE51bWJlcnMsIG9wdHMpO1xuICB9XG5cbiAgZHRGb3JtYXR0ZXIoZHQsIGludGxPcHRzID0ge30pIHtcbiAgICByZXR1cm4gbmV3IFBvbHlEYXRlRm9ybWF0dGVyKGR0LCB0aGlzLmludGwsIGludGxPcHRzKTtcbiAgfVxuXG4gIHJlbEZvcm1hdHRlcihvcHRzID0ge30pIHtcbiAgICByZXR1cm4gbmV3IFBvbHlSZWxGb3JtYXR0ZXIodGhpcy5pbnRsLCB0aGlzLmlzRW5nbGlzaCgpLCBvcHRzKTtcbiAgfVxuXG4gIGxpc3RGb3JtYXR0ZXIob3B0cyA9IHt9KSB7XG4gICAgcmV0dXJuIGdldENhY2hlZExGKHRoaXMuaW50bCwgb3B0cyk7XG4gIH1cblxuICBpc0VuZ2xpc2goKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMubG9jYWxlID09PSBcImVuXCIgfHxcbiAgICAgIHRoaXMubG9jYWxlLnRvTG93ZXJDYXNlKCkgPT09IFwiZW4tdXNcIiB8fFxuICAgICAgbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQodGhpcy5pbnRsKS5yZXNvbHZlZE9wdGlvbnMoKS5sb2NhbGUuc3RhcnRzV2l0aChcImVuLXVzXCIpXG4gICAgKTtcbiAgfVxuXG4gIGVxdWFscyhvdGhlcikge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmxvY2FsZSA9PT0gb3RoZXIubG9jYWxlICYmXG4gICAgICB0aGlzLm51bWJlcmluZ1N5c3RlbSA9PT0gb3RoZXIubnVtYmVyaW5nU3lzdGVtICYmXG4gICAgICB0aGlzLm91dHB1dENhbGVuZGFyID09PSBvdGhlci5vdXRwdXRDYWxlbmRhclxuICAgICk7XG4gIH1cbn1cblxuLypcbiAqIFRoaXMgZmlsZSBoYW5kbGVzIHBhcnNpbmcgZm9yIHdlbGwtc3BlY2lmaWVkIGZvcm1hdHMuIEhlcmUncyBob3cgaXQgd29ya3M6XG4gKiBUd28gdGhpbmdzIGdvIGludG8gcGFyc2luZzogYSByZWdleCB0byBtYXRjaCB3aXRoIGFuZCBhbiBleHRyYWN0b3IgdG8gdGFrZSBhcGFydCB0aGUgZ3JvdXBzIGluIHRoZSBtYXRjaC5cbiAqIEFuIGV4dHJhY3RvciBpcyBqdXN0IGEgZnVuY3Rpb24gdGhhdCB0YWtlcyBhIHJlZ2V4IG1hdGNoIGFycmF5IGFuZCByZXR1cm5zIGEgeyB5ZWFyOiAuLi4sIG1vbnRoOiAuLi4gfSBvYmplY3RcbiAqIHBhcnNlKCkgZG9lcyB0aGUgd29yayBvZiBleGVjdXRpbmcgdGhlIHJlZ2V4IGFuZCBhcHBseWluZyB0aGUgZXh0cmFjdG9yLiBJdCB0YWtlcyBtdWx0aXBsZSByZWdleC9leHRyYWN0b3IgcGFpcnMgdG8gdHJ5IGluIHNlcXVlbmNlLlxuICogRXh0cmFjdG9ycyBjYW4gdGFrZSBhIFwiY3Vyc29yXCIgcmVwcmVzZW50aW5nIHRoZSBvZmZzZXQgaW4gdGhlIG1hdGNoIHRvIGxvb2sgYXQuIFRoaXMgbWFrZXMgaXQgZWFzeSB0byBjb21iaW5lIGV4dHJhY3RvcnMuXG4gKiBjb21iaW5lRXh0cmFjdG9ycygpIGRvZXMgdGhlIHdvcmsgb2YgY29tYmluaW5nIHRoZW0sIGtlZXBpbmcgdHJhY2sgb2YgdGhlIGN1cnNvciB0aHJvdWdoIG11bHRpcGxlIGV4dHJhY3Rpb25zLlxuICogU29tZSBleHRyYWN0aW9ucyBhcmUgc3VwZXIgZHVtYiBhbmQgc2ltcGxlUGFyc2UgYW5kIGZyb21TdHJpbmdzIGhlbHAgRFJZIHRoZW0uXG4gKi9cblxuZnVuY3Rpb24gY29tYmluZVJlZ2V4ZXMoLi4ucmVnZXhlcykge1xuICBjb25zdCBmdWxsID0gcmVnZXhlcy5yZWR1Y2UoKGYsIHIpID0+IGYgKyByLnNvdXJjZSwgXCJcIik7XG4gIHJldHVybiBSZWdFeHAoYF4ke2Z1bGx9JGApO1xufVxuXG5mdW5jdGlvbiBjb21iaW5lRXh0cmFjdG9ycyguLi5leHRyYWN0b3JzKSB7XG4gIHJldHVybiBtID0+XG4gICAgZXh0cmFjdG9yc1xuICAgICAgLnJlZHVjZShcbiAgICAgICAgKFttZXJnZWRWYWxzLCBtZXJnZWRab25lLCBjdXJzb3JdLCBleCkgPT4ge1xuICAgICAgICAgIGNvbnN0IFt2YWwsIHpvbmUsIG5leHRdID0gZXgobSwgY3Vyc29yKTtcbiAgICAgICAgICByZXR1cm4gW3sgLi4ubWVyZ2VkVmFscywgLi4udmFsIH0sIHpvbmUgfHwgbWVyZ2VkWm9uZSwgbmV4dF07XG4gICAgICAgIH0sXG4gICAgICAgIFt7fSwgbnVsbCwgMV1cbiAgICAgIClcbiAgICAgIC5zbGljZSgwLCAyKTtcbn1cblxuZnVuY3Rpb24gcGFyc2UocywgLi4ucGF0dGVybnMpIHtcbiAgaWYgKHMgPT0gbnVsbCkge1xuICAgIHJldHVybiBbbnVsbCwgbnVsbF07XG4gIH1cblxuICBmb3IgKGNvbnN0IFtyZWdleCwgZXh0cmFjdG9yXSBvZiBwYXR0ZXJucykge1xuICAgIGNvbnN0IG0gPSByZWdleC5leGVjKHMpO1xuICAgIGlmIChtKSB7XG4gICAgICByZXR1cm4gZXh0cmFjdG9yKG0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gW251bGwsIG51bGxdO1xufVxuXG5mdW5jdGlvbiBzaW1wbGVQYXJzZSguLi5rZXlzKSB7XG4gIHJldHVybiAobWF0Y2gsIGN1cnNvcikgPT4ge1xuICAgIGNvbnN0IHJldCA9IHt9O1xuICAgIGxldCBpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHJldFtrZXlzW2ldXSA9IHBhcnNlSW50ZWdlcihtYXRjaFtjdXJzb3IgKyBpXSk7XG4gICAgfVxuICAgIHJldHVybiBbcmV0LCBudWxsLCBjdXJzb3IgKyBpXTtcbiAgfTtcbn1cblxuLy8gSVNPIGFuZCBTUUwgcGFyc2luZ1xuY29uc3Qgb2Zmc2V0UmVnZXggPSAvKD86KFopfChbKy1dXFxkXFxkKSg/Ojo/KFxcZFxcZCkpPykvO1xuY29uc3QgaXNvRXh0ZW5kZWRab25lID0gYCg/OiR7b2Zmc2V0UmVnZXguc291cmNlfT8oPzpcXFxcWygke2lhbmFSZWdleC5zb3VyY2V9KVxcXFxdKT8pP2A7XG5jb25zdCBpc29UaW1lQmFzZVJlZ2V4ID0gLyhcXGRcXGQpKD86Oj8oXFxkXFxkKSg/Ojo/KFxcZFxcZCkoPzpbLixdKFxcZHsxLDMwfSkpPyk/KT8vO1xuY29uc3QgaXNvVGltZVJlZ2V4ID0gUmVnRXhwKGAke2lzb1RpbWVCYXNlUmVnZXguc291cmNlfSR7aXNvRXh0ZW5kZWRab25lfWApO1xuY29uc3QgaXNvVGltZUV4dGVuc2lvblJlZ2V4ID0gUmVnRXhwKGAoPzpUJHtpc29UaW1lUmVnZXguc291cmNlfSk/YCk7XG5jb25zdCBpc29ZbWRSZWdleCA9IC8oWystXVxcZHs2fXxcXGR7NH0pKD86LT8oXFxkXFxkKSg/Oi0/KFxcZFxcZCkpPyk/LztcbmNvbnN0IGlzb1dlZWtSZWdleCA9IC8oXFxkezR9KS0/VyhcXGRcXGQpKD86LT8oXFxkKSk/LztcbmNvbnN0IGlzb09yZGluYWxSZWdleCA9IC8oXFxkezR9KS0/KFxcZHszfSkvO1xuY29uc3QgZXh0cmFjdElTT1dlZWtEYXRhID0gc2ltcGxlUGFyc2UoXCJ3ZWVrWWVhclwiLCBcIndlZWtOdW1iZXJcIiwgXCJ3ZWVrRGF5XCIpO1xuY29uc3QgZXh0cmFjdElTT09yZGluYWxEYXRhID0gc2ltcGxlUGFyc2UoXCJ5ZWFyXCIsIFwib3JkaW5hbFwiKTtcbmNvbnN0IHNxbFltZFJlZ2V4ID0gLyhcXGR7NH0pLShcXGRcXGQpLShcXGRcXGQpLzsgLy8gZHVtYmVkLWRvd24gdmVyc2lvbiBvZiB0aGUgSVNPIG9uZVxuY29uc3Qgc3FsVGltZVJlZ2V4ID0gUmVnRXhwKFxuICBgJHtpc29UaW1lQmFzZVJlZ2V4LnNvdXJjZX0gPyg/OiR7b2Zmc2V0UmVnZXguc291cmNlfXwoJHtpYW5hUmVnZXguc291cmNlfSkpP2Bcbik7XG5jb25zdCBzcWxUaW1lRXh0ZW5zaW9uUmVnZXggPSBSZWdFeHAoYCg/OiAke3NxbFRpbWVSZWdleC5zb3VyY2V9KT9gKTtcblxuZnVuY3Rpb24gaW50KG1hdGNoLCBwb3MsIGZhbGxiYWNrKSB7XG4gIGNvbnN0IG0gPSBtYXRjaFtwb3NdO1xuICByZXR1cm4gaXNVbmRlZmluZWQobSkgPyBmYWxsYmFjayA6IHBhcnNlSW50ZWdlcihtKTtcbn1cblxuZnVuY3Rpb24gZXh0cmFjdElTT1ltZChtYXRjaCwgY3Vyc29yKSB7XG4gIGNvbnN0IGl0ZW0gPSB7XG4gICAgeWVhcjogaW50KG1hdGNoLCBjdXJzb3IpLFxuICAgIG1vbnRoOiBpbnQobWF0Y2gsIGN1cnNvciArIDEsIDEpLFxuICAgIGRheTogaW50KG1hdGNoLCBjdXJzb3IgKyAyLCAxKVxuICB9O1xuXG4gIHJldHVybiBbaXRlbSwgbnVsbCwgY3Vyc29yICsgM107XG59XG5cbmZ1bmN0aW9uIGV4dHJhY3RJU09UaW1lKG1hdGNoLCBjdXJzb3IpIHtcbiAgY29uc3QgaXRlbSA9IHtcbiAgICBob3VyczogaW50KG1hdGNoLCBjdXJzb3IsIDApLFxuICAgIG1pbnV0ZXM6IGludChtYXRjaCwgY3Vyc29yICsgMSwgMCksXG4gICAgc2Vjb25kczogaW50KG1hdGNoLCBjdXJzb3IgKyAyLCAwKSxcbiAgICBtaWxsaXNlY29uZHM6IHBhcnNlTWlsbGlzKG1hdGNoW2N1cnNvciArIDNdKVxuICB9O1xuXG4gIHJldHVybiBbaXRlbSwgbnVsbCwgY3Vyc29yICsgNF07XG59XG5cbmZ1bmN0aW9uIGV4dHJhY3RJU09PZmZzZXQobWF0Y2gsIGN1cnNvcikge1xuICBjb25zdCBsb2NhbCA9ICFtYXRjaFtjdXJzb3JdICYmICFtYXRjaFtjdXJzb3IgKyAxXSxcbiAgICBmdWxsT2Zmc2V0ID0gc2lnbmVkT2Zmc2V0KG1hdGNoW2N1cnNvciArIDFdLCBtYXRjaFtjdXJzb3IgKyAyXSksXG4gICAgem9uZSA9IGxvY2FsID8gbnVsbCA6IEZpeGVkT2Zmc2V0Wm9uZS5pbnN0YW5jZShmdWxsT2Zmc2V0KTtcbiAgcmV0dXJuIFt7fSwgem9uZSwgY3Vyc29yICsgM107XG59XG5cbmZ1bmN0aW9uIGV4dHJhY3RJQU5BWm9uZShtYXRjaCwgY3Vyc29yKSB7XG4gIGNvbnN0IHpvbmUgPSBtYXRjaFtjdXJzb3JdID8gSUFOQVpvbmUuY3JlYXRlKG1hdGNoW2N1cnNvcl0pIDogbnVsbDtcbiAgcmV0dXJuIFt7fSwgem9uZSwgY3Vyc29yICsgMV07XG59XG5cbi8vIElTTyB0aW1lIHBhcnNpbmdcblxuY29uc3QgaXNvVGltZU9ubHkgPSBSZWdFeHAoYF5UPyR7aXNvVGltZUJhc2VSZWdleC5zb3VyY2V9JGApO1xuXG4vLyBJU08gZHVyYXRpb24gcGFyc2luZ1xuXG5jb25zdCBpc29EdXJhdGlvbiA9IC9eLT9QKD86KD86KC0/XFxkezEsMjB9KD86XFwuXFxkezEsMjB9KT8pWSk/KD86KC0/XFxkezEsMjB9KD86XFwuXFxkezEsMjB9KT8pTSk/KD86KC0/XFxkezEsMjB9KD86XFwuXFxkezEsMjB9KT8pVyk/KD86KC0/XFxkezEsMjB9KD86XFwuXFxkezEsMjB9KT8pRCk/KD86VCg/OigtP1xcZHsxLDIwfSg/OlxcLlxcZHsxLDIwfSk/KUgpPyg/OigtP1xcZHsxLDIwfSg/OlxcLlxcZHsxLDIwfSk/KU0pPyg/OigtP1xcZHsxLDIwfSkoPzpbLixdKC0/XFxkezEsMjB9KSk/Uyk/KT8pJC87XG5cbmZ1bmN0aW9uIGV4dHJhY3RJU09EdXJhdGlvbihtYXRjaCkge1xuICBjb25zdCBbXG4gICAgcyxcbiAgICB5ZWFyU3RyLFxuICAgIG1vbnRoU3RyLFxuICAgIHdlZWtTdHIsXG4gICAgZGF5U3RyLFxuICAgIGhvdXJTdHIsXG4gICAgbWludXRlU3RyLFxuICAgIHNlY29uZFN0cixcbiAgICBtaWxsaXNlY29uZHNTdHJcbiAgXSA9IG1hdGNoO1xuXG4gIGNvbnN0IGhhc05lZ2F0aXZlUHJlZml4ID0gc1swXSA9PT0gXCItXCI7XG4gIGNvbnN0IG5lZ2F0aXZlU2Vjb25kcyA9IHNlY29uZFN0ciAmJiBzZWNvbmRTdHJbMF0gPT09IFwiLVwiO1xuXG4gIGNvbnN0IG1heWJlTmVnYXRlID0gKG51bSwgZm9yY2UgPSBmYWxzZSkgPT5cbiAgICBudW0gIT09IHVuZGVmaW5lZCAmJiAoZm9yY2UgfHwgKG51bSAmJiBoYXNOZWdhdGl2ZVByZWZpeCkpID8gLW51bSA6IG51bTtcblxuICByZXR1cm4gW1xuICAgIHtcbiAgICAgIHllYXJzOiBtYXliZU5lZ2F0ZShwYXJzZUZsb2F0aW5nKHllYXJTdHIpKSxcbiAgICAgIG1vbnRoczogbWF5YmVOZWdhdGUocGFyc2VGbG9hdGluZyhtb250aFN0cikpLFxuICAgICAgd2Vla3M6IG1heWJlTmVnYXRlKHBhcnNlRmxvYXRpbmcod2Vla1N0cikpLFxuICAgICAgZGF5czogbWF5YmVOZWdhdGUocGFyc2VGbG9hdGluZyhkYXlTdHIpKSxcbiAgICAgIGhvdXJzOiBtYXliZU5lZ2F0ZShwYXJzZUZsb2F0aW5nKGhvdXJTdHIpKSxcbiAgICAgIG1pbnV0ZXM6IG1heWJlTmVnYXRlKHBhcnNlRmxvYXRpbmcobWludXRlU3RyKSksXG4gICAgICBzZWNvbmRzOiBtYXliZU5lZ2F0ZShwYXJzZUZsb2F0aW5nKHNlY29uZFN0ciksIHNlY29uZFN0ciA9PT0gXCItMFwiKSxcbiAgICAgIG1pbGxpc2Vjb25kczogbWF5YmVOZWdhdGUocGFyc2VNaWxsaXMobWlsbGlzZWNvbmRzU3RyKSwgbmVnYXRpdmVTZWNvbmRzKVxuICAgIH1cbiAgXTtcbn1cblxuLy8gVGhlc2UgYXJlIGEgbGl0dGxlIGJyYWluZGVhZC4gRURUICpzaG91bGQqIHRlbGwgdXMgdGhhdCB3ZSdyZSBpbiwgc2F5LCBBbWVyaWNhL05ld19Zb3JrXG4vLyBhbmQgbm90IGp1c3QgdGhhdCB3ZSdyZSBpbiAtMjQwICpyaWdodCBub3cqLiBCdXQgc2luY2UgSSBkb24ndCB0aGluayB0aGVzZSBhcmUgdXNlZCB0aGF0IG9mdGVuXG4vLyBJJ20ganVzdCBnb2luZyB0byBpZ25vcmUgdGhhdFxuY29uc3Qgb2JzT2Zmc2V0cyA9IHtcbiAgR01UOiAwLFxuICBFRFQ6IC00ICogNjAsXG4gIEVTVDogLTUgKiA2MCxcbiAgQ0RUOiAtNSAqIDYwLFxuICBDU1Q6IC02ICogNjAsXG4gIE1EVDogLTYgKiA2MCxcbiAgTVNUOiAtNyAqIDYwLFxuICBQRFQ6IC03ICogNjAsXG4gIFBTVDogLTggKiA2MFxufTtcblxuZnVuY3Rpb24gZnJvbVN0cmluZ3Mod2Vla2RheVN0ciwgeWVhclN0ciwgbW9udGhTdHIsIGRheVN0ciwgaG91clN0ciwgbWludXRlU3RyLCBzZWNvbmRTdHIpIHtcbiAgY29uc3QgcmVzdWx0ID0ge1xuICAgIHllYXI6IHllYXJTdHIubGVuZ3RoID09PSAyID8gdW50cnVuY2F0ZVllYXIocGFyc2VJbnRlZ2VyKHllYXJTdHIpKSA6IHBhcnNlSW50ZWdlcih5ZWFyU3RyKSxcbiAgICBtb250aDogbW9udGhzU2hvcnQuaW5kZXhPZihtb250aFN0cikgKyAxLFxuICAgIGRheTogcGFyc2VJbnRlZ2VyKGRheVN0ciksXG4gICAgaG91cjogcGFyc2VJbnRlZ2VyKGhvdXJTdHIpLFxuICAgIG1pbnV0ZTogcGFyc2VJbnRlZ2VyKG1pbnV0ZVN0cilcbiAgfTtcblxuICBpZiAoc2Vjb25kU3RyKSByZXN1bHQuc2Vjb25kID0gcGFyc2VJbnRlZ2VyKHNlY29uZFN0cik7XG4gIGlmICh3ZWVrZGF5U3RyKSB7XG4gICAgcmVzdWx0LndlZWtkYXkgPVxuICAgICAgd2Vla2RheVN0ci5sZW5ndGggPiAzXG4gICAgICAgID8gd2Vla2RheXNMb25nLmluZGV4T2Yod2Vla2RheVN0cikgKyAxXG4gICAgICAgIDogd2Vla2RheXNTaG9ydC5pbmRleE9mKHdlZWtkYXlTdHIpICsgMTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8vIFJGQyAyODIyLzUzMjJcbmNvbnN0IHJmYzI4MjIgPSAvXig/OihNb258VHVlfFdlZHxUaHV8RnJpfFNhdHxTdW4pLFxccyk/KFxcZHsxLDJ9KVxccyhKYW58RmVifE1hcnxBcHJ8TWF5fEp1bnxKdWx8QXVnfFNlcHxPY3R8Tm92fERlYylcXHMoXFxkezIsNH0pXFxzKFxcZFxcZCk6KFxcZFxcZCkoPzo6KFxcZFxcZCkpP1xccyg/OihVVHxHTVR8W0VDTVBdW1NEXVQpfChbWnpdKXwoPzooWystXVxcZFxcZCkoXFxkXFxkKSkpJC87XG5cbmZ1bmN0aW9uIGV4dHJhY3RSRkMyODIyKG1hdGNoKSB7XG4gIGNvbnN0IFtcbiAgICAgICxcbiAgICAgIHdlZWtkYXlTdHIsXG4gICAgICBkYXlTdHIsXG4gICAgICBtb250aFN0cixcbiAgICAgIHllYXJTdHIsXG4gICAgICBob3VyU3RyLFxuICAgICAgbWludXRlU3RyLFxuICAgICAgc2Vjb25kU3RyLFxuICAgICAgb2JzT2Zmc2V0LFxuICAgICAgbWlsT2Zmc2V0LFxuICAgICAgb2ZmSG91clN0cixcbiAgICAgIG9mZk1pbnV0ZVN0clxuICAgIF0gPSBtYXRjaCxcbiAgICByZXN1bHQgPSBmcm9tU3RyaW5ncyh3ZWVrZGF5U3RyLCB5ZWFyU3RyLCBtb250aFN0ciwgZGF5U3RyLCBob3VyU3RyLCBtaW51dGVTdHIsIHNlY29uZFN0cik7XG5cbiAgbGV0IG9mZnNldDtcbiAgaWYgKG9ic09mZnNldCkge1xuICAgIG9mZnNldCA9IG9ic09mZnNldHNbb2JzT2Zmc2V0XTtcbiAgfSBlbHNlIGlmIChtaWxPZmZzZXQpIHtcbiAgICBvZmZzZXQgPSAwO1xuICB9IGVsc2Uge1xuICAgIG9mZnNldCA9IHNpZ25lZE9mZnNldChvZmZIb3VyU3RyLCBvZmZNaW51dGVTdHIpO1xuICB9XG5cbiAgcmV0dXJuIFtyZXN1bHQsIG5ldyBGaXhlZE9mZnNldFpvbmUob2Zmc2V0KV07XG59XG5cbmZ1bmN0aW9uIHByZXByb2Nlc3NSRkMyODIyKHMpIHtcbiAgLy8gUmVtb3ZlIGNvbW1lbnRzIGFuZCBmb2xkaW5nIHdoaXRlc3BhY2UgYW5kIHJlcGxhY2UgbXVsdGlwbGUtc3BhY2VzIHdpdGggYSBzaW5nbGUgc3BhY2VcbiAgcmV0dXJuIHNcbiAgICAucmVwbGFjZSgvXFwoW14oKV0qXFwpfFtcXG5cXHRdL2csIFwiIFwiKVxuICAgIC5yZXBsYWNlKC8oXFxzXFxzKykvZywgXCIgXCIpXG4gICAgLnRyaW0oKTtcbn1cblxuLy8gaHR0cCBkYXRlXG5cbmNvbnN0IHJmYzExMjMgPSAvXihNb258VHVlfFdlZHxUaHV8RnJpfFNhdHxTdW4pLCAoXFxkXFxkKSAoSmFufEZlYnxNYXJ8QXByfE1heXxKdW58SnVsfEF1Z3xTZXB8T2N0fE5vdnxEZWMpIChcXGR7NH0pIChcXGRcXGQpOihcXGRcXGQpOihcXGRcXGQpIEdNVCQvLFxuICByZmM4NTAgPSAvXihNb25kYXl8VHVlc2RheXxXZWRuZXNkYXl8VGh1cnNkYXl8RnJpZGF5fFNhdHVyZGF5fFN1bmRheSksIChcXGRcXGQpLShKYW58RmVifE1hcnxBcHJ8TWF5fEp1bnxKdWx8QXVnfFNlcHxPY3R8Tm92fERlYyktKFxcZFxcZCkgKFxcZFxcZCk6KFxcZFxcZCk6KFxcZFxcZCkgR01UJC8sXG4gIGFzY2lpID0gL14oTW9ufFR1ZXxXZWR8VGh1fEZyaXxTYXR8U3VuKSAoSmFufEZlYnxNYXJ8QXByfE1heXxKdW58SnVsfEF1Z3xTZXB8T2N0fE5vdnxEZWMpICggXFxkfFxcZFxcZCkgKFxcZFxcZCk6KFxcZFxcZCk6KFxcZFxcZCkgKFxcZHs0fSkkLztcblxuZnVuY3Rpb24gZXh0cmFjdFJGQzExMjNPcjg1MChtYXRjaCkge1xuICBjb25zdCBbLCB3ZWVrZGF5U3RyLCBkYXlTdHIsIG1vbnRoU3RyLCB5ZWFyU3RyLCBob3VyU3RyLCBtaW51dGVTdHIsIHNlY29uZFN0cl0gPSBtYXRjaCxcbiAgICByZXN1bHQgPSBmcm9tU3RyaW5ncyh3ZWVrZGF5U3RyLCB5ZWFyU3RyLCBtb250aFN0ciwgZGF5U3RyLCBob3VyU3RyLCBtaW51dGVTdHIsIHNlY29uZFN0cik7XG4gIHJldHVybiBbcmVzdWx0LCBGaXhlZE9mZnNldFpvbmUudXRjSW5zdGFuY2VdO1xufVxuXG5mdW5jdGlvbiBleHRyYWN0QVNDSUkobWF0Y2gpIHtcbiAgY29uc3QgWywgd2Vla2RheVN0ciwgbW9udGhTdHIsIGRheVN0ciwgaG91clN0ciwgbWludXRlU3RyLCBzZWNvbmRTdHIsIHllYXJTdHJdID0gbWF0Y2gsXG4gICAgcmVzdWx0ID0gZnJvbVN0cmluZ3Mod2Vla2RheVN0ciwgeWVhclN0ciwgbW9udGhTdHIsIGRheVN0ciwgaG91clN0ciwgbWludXRlU3RyLCBzZWNvbmRTdHIpO1xuICByZXR1cm4gW3Jlc3VsdCwgRml4ZWRPZmZzZXRab25lLnV0Y0luc3RhbmNlXTtcbn1cblxuY29uc3QgaXNvWW1kV2l0aFRpbWVFeHRlbnNpb25SZWdleCA9IGNvbWJpbmVSZWdleGVzKGlzb1ltZFJlZ2V4LCBpc29UaW1lRXh0ZW5zaW9uUmVnZXgpO1xuY29uc3QgaXNvV2Vla1dpdGhUaW1lRXh0ZW5zaW9uUmVnZXggPSBjb21iaW5lUmVnZXhlcyhpc29XZWVrUmVnZXgsIGlzb1RpbWVFeHRlbnNpb25SZWdleCk7XG5jb25zdCBpc29PcmRpbmFsV2l0aFRpbWVFeHRlbnNpb25SZWdleCA9IGNvbWJpbmVSZWdleGVzKGlzb09yZGluYWxSZWdleCwgaXNvVGltZUV4dGVuc2lvblJlZ2V4KTtcbmNvbnN0IGlzb1RpbWVDb21iaW5lZFJlZ2V4ID0gY29tYmluZVJlZ2V4ZXMoaXNvVGltZVJlZ2V4KTtcblxuY29uc3QgZXh0cmFjdElTT1ltZFRpbWVBbmRPZmZzZXQgPSBjb21iaW5lRXh0cmFjdG9ycyhcbiAgZXh0cmFjdElTT1ltZCxcbiAgZXh0cmFjdElTT1RpbWUsXG4gIGV4dHJhY3RJU09PZmZzZXQsXG4gIGV4dHJhY3RJQU5BWm9uZVxuKTtcbmNvbnN0IGV4dHJhY3RJU09XZWVrVGltZUFuZE9mZnNldCA9IGNvbWJpbmVFeHRyYWN0b3JzKFxuICBleHRyYWN0SVNPV2Vla0RhdGEsXG4gIGV4dHJhY3RJU09UaW1lLFxuICBleHRyYWN0SVNPT2Zmc2V0LFxuICBleHRyYWN0SUFOQVpvbmVcbik7XG5jb25zdCBleHRyYWN0SVNPT3JkaW5hbERhdGVBbmRUaW1lID0gY29tYmluZUV4dHJhY3RvcnMoXG4gIGV4dHJhY3RJU09PcmRpbmFsRGF0YSxcbiAgZXh0cmFjdElTT1RpbWUsXG4gIGV4dHJhY3RJU09PZmZzZXQsXG4gIGV4dHJhY3RJQU5BWm9uZVxuKTtcbmNvbnN0IGV4dHJhY3RJU09UaW1lQW5kT2Zmc2V0ID0gY29tYmluZUV4dHJhY3RvcnMoXG4gIGV4dHJhY3RJU09UaW1lLFxuICBleHRyYWN0SVNPT2Zmc2V0LFxuICBleHRyYWN0SUFOQVpvbmVcbik7XG5cbi8qXG4gKiBAcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHBhcnNlSVNPRGF0ZShzKSB7XG4gIHJldHVybiBwYXJzZShcbiAgICBzLFxuICAgIFtpc29ZbWRXaXRoVGltZUV4dGVuc2lvblJlZ2V4LCBleHRyYWN0SVNPWW1kVGltZUFuZE9mZnNldF0sXG4gICAgW2lzb1dlZWtXaXRoVGltZUV4dGVuc2lvblJlZ2V4LCBleHRyYWN0SVNPV2Vla1RpbWVBbmRPZmZzZXRdLFxuICAgIFtpc29PcmRpbmFsV2l0aFRpbWVFeHRlbnNpb25SZWdleCwgZXh0cmFjdElTT09yZGluYWxEYXRlQW5kVGltZV0sXG4gICAgW2lzb1RpbWVDb21iaW5lZFJlZ2V4LCBleHRyYWN0SVNPVGltZUFuZE9mZnNldF1cbiAgKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VSRkMyODIyRGF0ZShzKSB7XG4gIHJldHVybiBwYXJzZShwcmVwcm9jZXNzUkZDMjgyMihzKSwgW3JmYzI4MjIsIGV4dHJhY3RSRkMyODIyXSk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlSFRUUERhdGUocykge1xuICByZXR1cm4gcGFyc2UoXG4gICAgcyxcbiAgICBbcmZjMTEyMywgZXh0cmFjdFJGQzExMjNPcjg1MF0sXG4gICAgW3JmYzg1MCwgZXh0cmFjdFJGQzExMjNPcjg1MF0sXG4gICAgW2FzY2lpLCBleHRyYWN0QVNDSUldXG4gICk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlSVNPRHVyYXRpb24ocykge1xuICByZXR1cm4gcGFyc2UocywgW2lzb0R1cmF0aW9uLCBleHRyYWN0SVNPRHVyYXRpb25dKTtcbn1cblxuY29uc3QgZXh0cmFjdElTT1RpbWVPbmx5ID0gY29tYmluZUV4dHJhY3RvcnMoZXh0cmFjdElTT1RpbWUpO1xuXG5mdW5jdGlvbiBwYXJzZUlTT1RpbWVPbmx5KHMpIHtcbiAgcmV0dXJuIHBhcnNlKHMsIFtpc29UaW1lT25seSwgZXh0cmFjdElTT1RpbWVPbmx5XSk7XG59XG5cbmNvbnN0IHNxbFltZFdpdGhUaW1lRXh0ZW5zaW9uUmVnZXggPSBjb21iaW5lUmVnZXhlcyhzcWxZbWRSZWdleCwgc3FsVGltZUV4dGVuc2lvblJlZ2V4KTtcbmNvbnN0IHNxbFRpbWVDb21iaW5lZFJlZ2V4ID0gY29tYmluZVJlZ2V4ZXMoc3FsVGltZVJlZ2V4KTtcblxuY29uc3QgZXh0cmFjdElTT1RpbWVPZmZzZXRBbmRJQU5BWm9uZSA9IGNvbWJpbmVFeHRyYWN0b3JzKFxuICBleHRyYWN0SVNPVGltZSxcbiAgZXh0cmFjdElTT09mZnNldCxcbiAgZXh0cmFjdElBTkFab25lXG4pO1xuXG5mdW5jdGlvbiBwYXJzZVNRTChzKSB7XG4gIHJldHVybiBwYXJzZShcbiAgICBzLFxuICAgIFtzcWxZbWRXaXRoVGltZUV4dGVuc2lvblJlZ2V4LCBleHRyYWN0SVNPWW1kVGltZUFuZE9mZnNldF0sXG4gICAgW3NxbFRpbWVDb21iaW5lZFJlZ2V4LCBleHRyYWN0SVNPVGltZU9mZnNldEFuZElBTkFab25lXVxuICApO1xufVxuXG5jb25zdCBJTlZBTElEJDIgPSBcIkludmFsaWQgRHVyYXRpb25cIjtcblxuLy8gdW5pdCBjb252ZXJzaW9uIGNvbnN0YW50c1xuY29uc3QgbG93T3JkZXJNYXRyaXggPSB7XG4gICAgd2Vla3M6IHtcbiAgICAgIGRheXM6IDcsXG4gICAgICBob3VyczogNyAqIDI0LFxuICAgICAgbWludXRlczogNyAqIDI0ICogNjAsXG4gICAgICBzZWNvbmRzOiA3ICogMjQgKiA2MCAqIDYwLFxuICAgICAgbWlsbGlzZWNvbmRzOiA3ICogMjQgKiA2MCAqIDYwICogMTAwMCxcbiAgICB9LFxuICAgIGRheXM6IHtcbiAgICAgIGhvdXJzOiAyNCxcbiAgICAgIG1pbnV0ZXM6IDI0ICogNjAsXG4gICAgICBzZWNvbmRzOiAyNCAqIDYwICogNjAsXG4gICAgICBtaWxsaXNlY29uZHM6IDI0ICogNjAgKiA2MCAqIDEwMDAsXG4gICAgfSxcbiAgICBob3VyczogeyBtaW51dGVzOiA2MCwgc2Vjb25kczogNjAgKiA2MCwgbWlsbGlzZWNvbmRzOiA2MCAqIDYwICogMTAwMCB9LFxuICAgIG1pbnV0ZXM6IHsgc2Vjb25kczogNjAsIG1pbGxpc2Vjb25kczogNjAgKiAxMDAwIH0sXG4gICAgc2Vjb25kczogeyBtaWxsaXNlY29uZHM6IDEwMDAgfSxcbiAgfSxcbiAgY2FzdWFsTWF0cml4ID0ge1xuICAgIHllYXJzOiB7XG4gICAgICBxdWFydGVyczogNCxcbiAgICAgIG1vbnRoczogMTIsXG4gICAgICB3ZWVrczogNTIsXG4gICAgICBkYXlzOiAzNjUsXG4gICAgICBob3VyczogMzY1ICogMjQsXG4gICAgICBtaW51dGVzOiAzNjUgKiAyNCAqIDYwLFxuICAgICAgc2Vjb25kczogMzY1ICogMjQgKiA2MCAqIDYwLFxuICAgICAgbWlsbGlzZWNvbmRzOiAzNjUgKiAyNCAqIDYwICogNjAgKiAxMDAwLFxuICAgIH0sXG4gICAgcXVhcnRlcnM6IHtcbiAgICAgIG1vbnRoczogMyxcbiAgICAgIHdlZWtzOiAxMyxcbiAgICAgIGRheXM6IDkxLFxuICAgICAgaG91cnM6IDkxICogMjQsXG4gICAgICBtaW51dGVzOiA5MSAqIDI0ICogNjAsXG4gICAgICBzZWNvbmRzOiA5MSAqIDI0ICogNjAgKiA2MCxcbiAgICAgIG1pbGxpc2Vjb25kczogOTEgKiAyNCAqIDYwICogNjAgKiAxMDAwLFxuICAgIH0sXG4gICAgbW9udGhzOiB7XG4gICAgICB3ZWVrczogNCxcbiAgICAgIGRheXM6IDMwLFxuICAgICAgaG91cnM6IDMwICogMjQsXG4gICAgICBtaW51dGVzOiAzMCAqIDI0ICogNjAsXG4gICAgICBzZWNvbmRzOiAzMCAqIDI0ICogNjAgKiA2MCxcbiAgICAgIG1pbGxpc2Vjb25kczogMzAgKiAyNCAqIDYwICogNjAgKiAxMDAwLFxuICAgIH0sXG5cbiAgICAuLi5sb3dPcmRlck1hdHJpeCxcbiAgfSxcbiAgZGF5c0luWWVhckFjY3VyYXRlID0gMTQ2MDk3LjAgLyA0MDAsXG4gIGRheXNJbk1vbnRoQWNjdXJhdGUgPSAxNDYwOTcuMCAvIDQ4MDAsXG4gIGFjY3VyYXRlTWF0cml4ID0ge1xuICAgIHllYXJzOiB7XG4gICAgICBxdWFydGVyczogNCxcbiAgICAgIG1vbnRoczogMTIsXG4gICAgICB3ZWVrczogZGF5c0luWWVhckFjY3VyYXRlIC8gNyxcbiAgICAgIGRheXM6IGRheXNJblllYXJBY2N1cmF0ZSxcbiAgICAgIGhvdXJzOiBkYXlzSW5ZZWFyQWNjdXJhdGUgKiAyNCxcbiAgICAgIG1pbnV0ZXM6IGRheXNJblllYXJBY2N1cmF0ZSAqIDI0ICogNjAsXG4gICAgICBzZWNvbmRzOiBkYXlzSW5ZZWFyQWNjdXJhdGUgKiAyNCAqIDYwICogNjAsXG4gICAgICBtaWxsaXNlY29uZHM6IGRheXNJblllYXJBY2N1cmF0ZSAqIDI0ICogNjAgKiA2MCAqIDEwMDAsXG4gICAgfSxcbiAgICBxdWFydGVyczoge1xuICAgICAgbW9udGhzOiAzLFxuICAgICAgd2Vla3M6IGRheXNJblllYXJBY2N1cmF0ZSAvIDI4LFxuICAgICAgZGF5czogZGF5c0luWWVhckFjY3VyYXRlIC8gNCxcbiAgICAgIGhvdXJzOiAoZGF5c0luWWVhckFjY3VyYXRlICogMjQpIC8gNCxcbiAgICAgIG1pbnV0ZXM6IChkYXlzSW5ZZWFyQWNjdXJhdGUgKiAyNCAqIDYwKSAvIDQsXG4gICAgICBzZWNvbmRzOiAoZGF5c0luWWVhckFjY3VyYXRlICogMjQgKiA2MCAqIDYwKSAvIDQsXG4gICAgICBtaWxsaXNlY29uZHM6IChkYXlzSW5ZZWFyQWNjdXJhdGUgKiAyNCAqIDYwICogNjAgKiAxMDAwKSAvIDQsXG4gICAgfSxcbiAgICBtb250aHM6IHtcbiAgICAgIHdlZWtzOiBkYXlzSW5Nb250aEFjY3VyYXRlIC8gNyxcbiAgICAgIGRheXM6IGRheXNJbk1vbnRoQWNjdXJhdGUsXG4gICAgICBob3VyczogZGF5c0luTW9udGhBY2N1cmF0ZSAqIDI0LFxuICAgICAgbWludXRlczogZGF5c0luTW9udGhBY2N1cmF0ZSAqIDI0ICogNjAsXG4gICAgICBzZWNvbmRzOiBkYXlzSW5Nb250aEFjY3VyYXRlICogMjQgKiA2MCAqIDYwLFxuICAgICAgbWlsbGlzZWNvbmRzOiBkYXlzSW5Nb250aEFjY3VyYXRlICogMjQgKiA2MCAqIDYwICogMTAwMCxcbiAgICB9LFxuICAgIC4uLmxvd09yZGVyTWF0cml4LFxuICB9O1xuXG4vLyB1bml0cyBvcmRlcmVkIGJ5IHNpemVcbmNvbnN0IG9yZGVyZWRVbml0cyQxID0gW1xuICBcInllYXJzXCIsXG4gIFwicXVhcnRlcnNcIixcbiAgXCJtb250aHNcIixcbiAgXCJ3ZWVrc1wiLFxuICBcImRheXNcIixcbiAgXCJob3Vyc1wiLFxuICBcIm1pbnV0ZXNcIixcbiAgXCJzZWNvbmRzXCIsXG4gIFwibWlsbGlzZWNvbmRzXCIsXG5dO1xuXG5jb25zdCByZXZlcnNlVW5pdHMgPSBvcmRlcmVkVW5pdHMkMS5zbGljZSgwKS5yZXZlcnNlKCk7XG5cbi8vIGNsb25lIHJlYWxseSBtZWFucyBcImNyZWF0ZSBhbm90aGVyIGluc3RhbmNlIGp1c3QgbGlrZSB0aGlzIG9uZSwgYnV0IHdpdGggdGhlc2UgY2hhbmdlc1wiXG5mdW5jdGlvbiBjbG9uZSQxKGR1ciwgYWx0cywgY2xlYXIgPSBmYWxzZSkge1xuICAvLyBkZWVwIG1lcmdlIGZvciB2YWxzXG4gIGNvbnN0IGNvbmYgPSB7XG4gICAgdmFsdWVzOiBjbGVhciA/IGFsdHMudmFsdWVzIDogeyAuLi5kdXIudmFsdWVzLCAuLi4oYWx0cy52YWx1ZXMgfHwge30pIH0sXG4gICAgbG9jOiBkdXIubG9jLmNsb25lKGFsdHMubG9jKSxcbiAgICBjb252ZXJzaW9uQWNjdXJhY3k6IGFsdHMuY29udmVyc2lvbkFjY3VyYWN5IHx8IGR1ci5jb252ZXJzaW9uQWNjdXJhY3ksXG4gIH07XG4gIHJldHVybiBuZXcgRHVyYXRpb24oY29uZik7XG59XG5cbmZ1bmN0aW9uIGFudGlUcnVuYyhuKSB7XG4gIHJldHVybiBuIDwgMCA/IE1hdGguZmxvb3IobikgOiBNYXRoLmNlaWwobik7XG59XG5cbi8vIE5COiBtdXRhdGVzIHBhcmFtZXRlcnNcbmZ1bmN0aW9uIGNvbnZlcnQobWF0cml4LCBmcm9tTWFwLCBmcm9tVW5pdCwgdG9NYXAsIHRvVW5pdCkge1xuICBjb25zdCBjb252ID0gbWF0cml4W3RvVW5pdF1bZnJvbVVuaXRdLFxuICAgIHJhdyA9IGZyb21NYXBbZnJvbVVuaXRdIC8gY29udixcbiAgICBzYW1lU2lnbiA9IE1hdGguc2lnbihyYXcpID09PSBNYXRoLnNpZ24odG9NYXBbdG9Vbml0XSksXG4gICAgLy8gb2ssIHNvIHRoaXMgaXMgd2lsZCwgYnV0IHNlZSB0aGUgbWF0cml4IGluIHRoZSB0ZXN0c1xuICAgIGFkZGVkID1cbiAgICAgICFzYW1lU2lnbiAmJiB0b01hcFt0b1VuaXRdICE9PSAwICYmIE1hdGguYWJzKHJhdykgPD0gMSA/IGFudGlUcnVuYyhyYXcpIDogTWF0aC50cnVuYyhyYXcpO1xuICB0b01hcFt0b1VuaXRdICs9IGFkZGVkO1xuICBmcm9tTWFwW2Zyb21Vbml0XSAtPSBhZGRlZCAqIGNvbnY7XG59XG5cbi8vIE5COiBtdXRhdGVzIHBhcmFtZXRlcnNcbmZ1bmN0aW9uIG5vcm1hbGl6ZVZhbHVlcyhtYXRyaXgsIHZhbHMpIHtcbiAgcmV2ZXJzZVVuaXRzLnJlZHVjZSgocHJldmlvdXMsIGN1cnJlbnQpID0+IHtcbiAgICBpZiAoIWlzVW5kZWZpbmVkKHZhbHNbY3VycmVudF0pKSB7XG4gICAgICBpZiAocHJldmlvdXMpIHtcbiAgICAgICAgY29udmVydChtYXRyaXgsIHZhbHMsIHByZXZpb3VzLCB2YWxzLCBjdXJyZW50KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjdXJyZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcHJldmlvdXM7XG4gICAgfVxuICB9LCBudWxsKTtcbn1cblxuLyoqXG4gKiBBIER1cmF0aW9uIG9iamVjdCByZXByZXNlbnRzIGEgcGVyaW9kIG9mIHRpbWUsIGxpa2UgXCIyIG1vbnRoc1wiIG9yIFwiMSBkYXksIDEgaG91clwiLiBDb25jZXB0dWFsbHksIGl0J3MganVzdCBhIG1hcCBvZiB1bml0cyB0byB0aGVpciBxdWFudGl0aWVzLCBhY2NvbXBhbmllZCBieSBzb21lIGFkZGl0aW9uYWwgY29uZmlndXJhdGlvbiBhbmQgbWV0aG9kcyBmb3IgY3JlYXRpbmcsIHBhcnNpbmcsIGludGVycm9nYXRpbmcsIHRyYW5zZm9ybWluZywgYW5kIGZvcm1hdHRpbmcgdGhlbS4gVGhleSBjYW4gYmUgdXNlZCBvbiB0aGVpciBvd24gb3IgaW4gY29uanVuY3Rpb24gd2l0aCBvdGhlciBMdXhvbiB0eXBlczsgZm9yIGV4YW1wbGUsIHlvdSBjYW4gdXNlIHtAbGluayBEYXRlVGltZSNwbHVzfSB0byBhZGQgYSBEdXJhdGlvbiBvYmplY3QgdG8gYSBEYXRlVGltZSwgcHJvZHVjaW5nIGFub3RoZXIgRGF0ZVRpbWUuXG4gKlxuICogSGVyZSBpcyBhIGJyaWVmIG92ZXJ2aWV3IG9mIGNvbW1vbmx5IHVzZWQgbWV0aG9kcyBhbmQgZ2V0dGVycyBpbiBEdXJhdGlvbjpcbiAqXG4gKiAqICoqQ3JlYXRpb24qKiBUbyBjcmVhdGUgYSBEdXJhdGlvbiwgdXNlIHtAbGluayBEdXJhdGlvbiNmcm9tTWlsbGlzfSwge0BsaW5rIER1cmF0aW9uI2Zyb21PYmplY3R9LCBvciB7QGxpbmsgRHVyYXRpb24jZnJvbUlTT30uXG4gKiAqICoqVW5pdCB2YWx1ZXMqKiBTZWUgdGhlIHtAbGluayBEdXJhdGlvbiN5ZWFyc30sIHtAbGluayBEdXJhdGlvbiNtb250aHN9LCB7QGxpbmsgRHVyYXRpb24jd2Vla3N9LCB7QGxpbmsgRHVyYXRpb24jZGF5c30sIHtAbGluayBEdXJhdGlvbiNob3Vyc30sIHtAbGluayBEdXJhdGlvbiNtaW51dGVzfSwge0BsaW5rIER1cmF0aW9uI3NlY29uZHN9LCB7QGxpbmsgRHVyYXRpb24jbWlsbGlzZWNvbmRzfSBhY2Nlc3NvcnMuXG4gKiAqICoqQ29uZmlndXJhdGlvbioqIFNlZSAge0BsaW5rIER1cmF0aW9uI2xvY2FsZX0gYW5kIHtAbGluayBEdXJhdGlvbiNudW1iZXJpbmdTeXN0ZW19IGFjY2Vzc29ycy5cbiAqICogKipUcmFuc2Zvcm1hdGlvbioqIFRvIGNyZWF0ZSBuZXcgRHVyYXRpb25zIG91dCBvZiBvbGQgb25lcyB1c2Uge0BsaW5rIER1cmF0aW9uI3BsdXN9LCB7QGxpbmsgRHVyYXRpb24jbWludXN9LCB7QGxpbmsgRHVyYXRpb24jbm9ybWFsaXplfSwge0BsaW5rIER1cmF0aW9uI3NldH0sIHtAbGluayBEdXJhdGlvbiNyZWNvbmZpZ3VyZX0sIHtAbGluayBEdXJhdGlvbiNzaGlmdFRvfSwgYW5kIHtAbGluayBEdXJhdGlvbiNuZWdhdGV9LlxuICogKiAqKk91dHB1dCoqIFRvIGNvbnZlcnQgdGhlIER1cmF0aW9uIGludG8gb3RoZXIgcmVwcmVzZW50YXRpb25zLCBzZWUge0BsaW5rIER1cmF0aW9uI2FzfSwge0BsaW5rIER1cmF0aW9uI3RvSVNPfSwge0BsaW5rIER1cmF0aW9uI3RvRm9ybWF0fSwgYW5kIHtAbGluayBEdXJhdGlvbiN0b0pTT059XG4gKlxuICogVGhlcmUncyBhcmUgbW9yZSBtZXRob2RzIGRvY3VtZW50ZWQgYmVsb3cuIEluIGFkZGl0aW9uLCBmb3IgbW9yZSBpbmZvcm1hdGlvbiBvbiBzdWJ0bGVyIHRvcGljcyBsaWtlIGludGVybmF0aW9uYWxpemF0aW9uIGFuZCB2YWxpZGl0eSwgc2VlIHRoZSBleHRlcm5hbCBkb2N1bWVudGF0aW9uLlxuICovXG5jbGFzcyBEdXJhdGlvbiB7XG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgY29uc3QgYWNjdXJhdGUgPSBjb25maWcuY29udmVyc2lvbkFjY3VyYWN5ID09PSBcImxvbmd0ZXJtXCIgfHwgZmFsc2U7XG4gICAgLyoqXG4gICAgICogQGFjY2VzcyBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy52YWx1ZXMgPSBjb25maWcudmFsdWVzO1xuICAgIC8qKlxuICAgICAqIEBhY2Nlc3MgcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMubG9jID0gY29uZmlnLmxvYyB8fCBMb2NhbGUuY3JlYXRlKCk7XG4gICAgLyoqXG4gICAgICogQGFjY2VzcyBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5jb252ZXJzaW9uQWNjdXJhY3kgPSBhY2N1cmF0ZSA/IFwibG9uZ3Rlcm1cIiA6IFwiY2FzdWFsXCI7XG4gICAgLyoqXG4gICAgICogQGFjY2VzcyBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5pbnZhbGlkID0gY29uZmlnLmludmFsaWQgfHwgbnVsbDtcbiAgICAvKipcbiAgICAgKiBAYWNjZXNzIHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLm1hdHJpeCA9IGFjY3VyYXRlID8gYWNjdXJhdGVNYXRyaXggOiBjYXN1YWxNYXRyaXg7XG4gICAgLyoqXG4gICAgICogQGFjY2VzcyBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5pc0x1eG9uRHVyYXRpb24gPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBEdXJhdGlvbiBmcm9tIGEgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcy5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGNvdW50IG9mIG1pbGxpc2Vjb25kc1xuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0cyAtIG9wdGlvbnMgZm9yIHBhcnNpbmdcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRzLmxvY2FsZT0nZW4tVVMnXSAtIHRoZSBsb2NhbGUgdG8gdXNlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRzLm51bWJlcmluZ1N5c3RlbSAtIHRoZSBudW1iZXJpbmcgc3lzdGVtIHRvIHVzZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdHMuY29udmVyc2lvbkFjY3VyYWN5PSdjYXN1YWwnXSAtIHRoZSBjb252ZXJzaW9uIHN5c3RlbSB0byB1c2VcbiAgICogQHJldHVybiB7RHVyYXRpb259XG4gICAqL1xuICBzdGF0aWMgZnJvbU1pbGxpcyhjb3VudCwgb3B0cykge1xuICAgIHJldHVybiBEdXJhdGlvbi5mcm9tT2JqZWN0KHsgbWlsbGlzZWNvbmRzOiBjb3VudCB9LCBvcHRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBEdXJhdGlvbiBmcm9tIGEgSmF2YVNjcmlwdCBvYmplY3Qgd2l0aCBrZXlzIGxpa2UgJ3llYXJzJyBhbmQgJ2hvdXJzJy5cbiAgICogSWYgdGhpcyBvYmplY3QgaXMgZW1wdHkgdGhlbiBhIHplcm8gbWlsbGlzZWNvbmRzIGR1cmF0aW9uIGlzIHJldHVybmVkLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqIC0gdGhlIG9iamVjdCB0byBjcmVhdGUgdGhlIERhdGVUaW1lIGZyb21cbiAgICogQHBhcmFtIHtudW1iZXJ9IG9iai55ZWFyc1xuICAgKiBAcGFyYW0ge251bWJlcn0gb2JqLnF1YXJ0ZXJzXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvYmoubW9udGhzXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvYmoud2Vla3NcbiAgICogQHBhcmFtIHtudW1iZXJ9IG9iai5kYXlzXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvYmouaG91cnNcbiAgICogQHBhcmFtIHtudW1iZXJ9IG9iai5taW51dGVzXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvYmouc2Vjb25kc1xuICAgKiBAcGFyYW0ge251bWJlcn0gb2JqLm1pbGxpc2Vjb25kc1xuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdHM9W11dIC0gb3B0aW9ucyBmb3IgY3JlYXRpbmcgdGhpcyBEdXJhdGlvblxuICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdHMubG9jYWxlPSdlbi1VUyddIC0gdGhlIGxvY2FsZSB0byB1c2VcbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdHMubnVtYmVyaW5nU3lzdGVtIC0gdGhlIG51bWJlcmluZyBzeXN0ZW0gdG8gdXNlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0cy5jb252ZXJzaW9uQWNjdXJhY3k9J2Nhc3VhbCddIC0gdGhlIGNvbnZlcnNpb24gc3lzdGVtIHRvIHVzZVxuICAgKiBAcmV0dXJuIHtEdXJhdGlvbn1cbiAgICovXG4gIHN0YXRpYyBmcm9tT2JqZWN0KG9iaiwgb3B0cyA9IHt9KSB7XG4gICAgaWYgKG9iaiA9PSBudWxsIHx8IHR5cGVvZiBvYmogIT09IFwib2JqZWN0XCIpIHtcbiAgICAgIHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFcnJvcihcbiAgICAgICAgYER1cmF0aW9uLmZyb21PYmplY3Q6IGFyZ3VtZW50IGV4cGVjdGVkIHRvIGJlIGFuIG9iamVjdCwgZ290ICR7XG4gICAgICAgICAgb2JqID09PSBudWxsID8gXCJudWxsXCIgOiB0eXBlb2Ygb2JqXG4gICAgICAgIH1gXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgRHVyYXRpb24oe1xuICAgICAgdmFsdWVzOiBub3JtYWxpemVPYmplY3Qob2JqLCBEdXJhdGlvbi5ub3JtYWxpemVVbml0KSxcbiAgICAgIGxvYzogTG9jYWxlLmZyb21PYmplY3Qob3B0cyksXG4gICAgICBjb252ZXJzaW9uQWNjdXJhY3k6IG9wdHMuY29udmVyc2lvbkFjY3VyYWN5LFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIER1cmF0aW9uIGZyb20gRHVyYXRpb25MaWtlLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdCB8IG51bWJlciB8IER1cmF0aW9ufSBkdXJhdGlvbkxpa2VcbiAgICogT25lIG9mOlxuICAgKiAtIG9iamVjdCB3aXRoIGtleXMgbGlrZSAneWVhcnMnIGFuZCAnaG91cnMnLlxuICAgKiAtIG51bWJlciByZXByZXNlbnRpbmcgbWlsbGlzZWNvbmRzXG4gICAqIC0gRHVyYXRpb24gaW5zdGFuY2VcbiAgICogQHJldHVybiB7RHVyYXRpb259XG4gICAqL1xuICBzdGF0aWMgZnJvbUR1cmF0aW9uTGlrZShkdXJhdGlvbkxpa2UpIHtcbiAgICBpZiAoaXNOdW1iZXIoZHVyYXRpb25MaWtlKSkge1xuICAgICAgcmV0dXJuIER1cmF0aW9uLmZyb21NaWxsaXMoZHVyYXRpb25MaWtlKTtcbiAgICB9IGVsc2UgaWYgKER1cmF0aW9uLmlzRHVyYXRpb24oZHVyYXRpb25MaWtlKSkge1xuICAgICAgcmV0dXJuIGR1cmF0aW9uTGlrZTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBkdXJhdGlvbkxpa2UgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIHJldHVybiBEdXJhdGlvbi5mcm9tT2JqZWN0KGR1cmF0aW9uTGlrZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFcnJvcihcbiAgICAgICAgYFVua25vd24gZHVyYXRpb24gYXJndW1lbnQgJHtkdXJhdGlvbkxpa2V9IG9mIHR5cGUgJHt0eXBlb2YgZHVyYXRpb25MaWtlfWBcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIER1cmF0aW9uIGZyb20gYW4gSVNPIDg2MDEgZHVyYXRpb24gc3RyaW5nLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCAtIHRleHQgdG8gcGFyc2VcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdHMgLSBvcHRpb25zIGZvciBwYXJzaW5nXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0cy5sb2NhbGU9J2VuLVVTJ10gLSB0aGUgbG9jYWxlIHRvIHVzZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0cy5udW1iZXJpbmdTeXN0ZW0gLSB0aGUgbnVtYmVyaW5nIHN5c3RlbSB0byB1c2VcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRzLmNvbnZlcnNpb25BY2N1cmFjeT0nY2FzdWFsJ10gLSB0aGUgY29udmVyc2lvbiBzeXN0ZW0gdG8gdXNlXG4gICAqIEBzZWUgaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSVNPXzg2MDEjRHVyYXRpb25zXG4gICAqIEBleGFtcGxlIER1cmF0aW9uLmZyb21JU08oJ1AzWTZNMVc0RFQxMkgzME01UycpLnRvT2JqZWN0KCkgLy89PiB7IHllYXJzOiAzLCBtb250aHM6IDYsIHdlZWtzOiAxLCBkYXlzOiA0LCBob3VyczogMTIsIG1pbnV0ZXM6IDMwLCBzZWNvbmRzOiA1IH1cbiAgICogQGV4YW1wbGUgRHVyYXRpb24uZnJvbUlTTygnUFQyM0gnKS50b09iamVjdCgpIC8vPT4geyBob3VyczogMjMgfVxuICAgKiBAZXhhbXBsZSBEdXJhdGlvbi5mcm9tSVNPKCdQNVkzTScpLnRvT2JqZWN0KCkgLy89PiB7IHllYXJzOiA1LCBtb250aHM6IDMgfVxuICAgKiBAcmV0dXJuIHtEdXJhdGlvbn1cbiAgICovXG4gIHN0YXRpYyBmcm9tSVNPKHRleHQsIG9wdHMpIHtcbiAgICBjb25zdCBbcGFyc2VkXSA9IHBhcnNlSVNPRHVyYXRpb24odGV4dCk7XG4gICAgaWYgKHBhcnNlZCkge1xuICAgICAgcmV0dXJuIER1cmF0aW9uLmZyb21PYmplY3QocGFyc2VkLCBvcHRzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIER1cmF0aW9uLmludmFsaWQoXCJ1bnBhcnNhYmxlXCIsIGB0aGUgaW5wdXQgXCIke3RleHR9XCIgY2FuJ3QgYmUgcGFyc2VkIGFzIElTTyA4NjAxYCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIER1cmF0aW9uIGZyb20gYW4gSVNPIDg2MDEgdGltZSBzdHJpbmcuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IC0gdGV4dCB0byBwYXJzZVxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0cyAtIG9wdGlvbnMgZm9yIHBhcnNpbmdcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRzLmxvY2FsZT0nZW4tVVMnXSAtIHRoZSBsb2NhbGUgdG8gdXNlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRzLm51bWJlcmluZ1N5c3RlbSAtIHRoZSBudW1iZXJpbmcgc3lzdGVtIHRvIHVzZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdHMuY29udmVyc2lvbkFjY3VyYWN5PSdjYXN1YWwnXSAtIHRoZSBjb252ZXJzaW9uIHN5c3RlbSB0byB1c2VcbiAgICogQHNlZSBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fODYwMSNUaW1lc1xuICAgKiBAZXhhbXBsZSBEdXJhdGlvbi5mcm9tSVNPVGltZSgnMTE6MjI6MzMuNDQ0JykudG9PYmplY3QoKSAvLz0+IHsgaG91cnM6IDExLCBtaW51dGVzOiAyMiwgc2Vjb25kczogMzMsIG1pbGxpc2Vjb25kczogNDQ0IH1cbiAgICogQGV4YW1wbGUgRHVyYXRpb24uZnJvbUlTT1RpbWUoJzExOjAwJykudG9PYmplY3QoKSAvLz0+IHsgaG91cnM6IDExLCBtaW51dGVzOiAwLCBzZWNvbmRzOiAwIH1cbiAgICogQGV4YW1wbGUgRHVyYXRpb24uZnJvbUlTT1RpbWUoJ1QxMTowMCcpLnRvT2JqZWN0KCkgLy89PiB7IGhvdXJzOiAxMSwgbWludXRlczogMCwgc2Vjb25kczogMCB9XG4gICAqIEBleGFtcGxlIER1cmF0aW9uLmZyb21JU09UaW1lKCcxMTAwJykudG9PYmplY3QoKSAvLz0+IHsgaG91cnM6IDExLCBtaW51dGVzOiAwLCBzZWNvbmRzOiAwIH1cbiAgICogQGV4YW1wbGUgRHVyYXRpb24uZnJvbUlTT1RpbWUoJ1QxMTAwJykudG9PYmplY3QoKSAvLz0+IHsgaG91cnM6IDExLCBtaW51dGVzOiAwLCBzZWNvbmRzOiAwIH1cbiAgICogQHJldHVybiB7RHVyYXRpb259XG4gICAqL1xuICBzdGF0aWMgZnJvbUlTT1RpbWUodGV4dCwgb3B0cykge1xuICAgIGNvbnN0IFtwYXJzZWRdID0gcGFyc2VJU09UaW1lT25seSh0ZXh0KTtcbiAgICBpZiAocGFyc2VkKSB7XG4gICAgICByZXR1cm4gRHVyYXRpb24uZnJvbU9iamVjdChwYXJzZWQsIG9wdHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gRHVyYXRpb24uaW52YWxpZChcInVucGFyc2FibGVcIiwgYHRoZSBpbnB1dCBcIiR7dGV4dH1cIiBjYW4ndCBiZSBwYXJzZWQgYXMgSVNPIDg2MDFgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGFuIGludmFsaWQgRHVyYXRpb24uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWFzb24gLSBzaW1wbGUgc3RyaW5nIG9mIHdoeSB0aGlzIGRhdGV0aW1lIGlzIGludmFsaWQuIFNob3VsZCBub3QgY29udGFpbiBwYXJhbWV0ZXJzIG9yIGFueXRoaW5nIGVsc2UgZGF0YS1kZXBlbmRlbnRcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtleHBsYW5hdGlvbj1udWxsXSAtIGxvbmdlciBleHBsYW5hdGlvbiwgbWF5IGluY2x1ZGUgcGFyYW1ldGVycyBhbmQgb3RoZXIgdXNlZnVsIGRlYnVnZ2luZyBpbmZvcm1hdGlvblxuICAgKiBAcmV0dXJuIHtEdXJhdGlvbn1cbiAgICovXG4gIHN0YXRpYyBpbnZhbGlkKHJlYXNvbiwgZXhwbGFuYXRpb24gPSBudWxsKSB7XG4gICAgaWYgKCFyZWFzb24pIHtcbiAgICAgIHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFcnJvcihcIm5lZWQgdG8gc3BlY2lmeSBhIHJlYXNvbiB0aGUgRHVyYXRpb24gaXMgaW52YWxpZFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBpbnZhbGlkID0gcmVhc29uIGluc3RhbmNlb2YgSW52YWxpZCA/IHJlYXNvbiA6IG5ldyBJbnZhbGlkKHJlYXNvbiwgZXhwbGFuYXRpb24pO1xuXG4gICAgaWYgKFNldHRpbmdzLnRocm93T25JbnZhbGlkKSB7XG4gICAgICB0aHJvdyBuZXcgSW52YWxpZER1cmF0aW9uRXJyb3IoaW52YWxpZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgRHVyYXRpb24oeyBpbnZhbGlkIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgc3RhdGljIG5vcm1hbGl6ZVVuaXQodW5pdCkge1xuICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSB7XG4gICAgICB5ZWFyOiBcInllYXJzXCIsXG4gICAgICB5ZWFyczogXCJ5ZWFyc1wiLFxuICAgICAgcXVhcnRlcjogXCJxdWFydGVyc1wiLFxuICAgICAgcXVhcnRlcnM6IFwicXVhcnRlcnNcIixcbiAgICAgIG1vbnRoOiBcIm1vbnRoc1wiLFxuICAgICAgbW9udGhzOiBcIm1vbnRoc1wiLFxuICAgICAgd2VlazogXCJ3ZWVrc1wiLFxuICAgICAgd2Vla3M6IFwid2Vla3NcIixcbiAgICAgIGRheTogXCJkYXlzXCIsXG4gICAgICBkYXlzOiBcImRheXNcIixcbiAgICAgIGhvdXI6IFwiaG91cnNcIixcbiAgICAgIGhvdXJzOiBcImhvdXJzXCIsXG4gICAgICBtaW51dGU6IFwibWludXRlc1wiLFxuICAgICAgbWludXRlczogXCJtaW51dGVzXCIsXG4gICAgICBzZWNvbmQ6IFwic2Vjb25kc1wiLFxuICAgICAgc2Vjb25kczogXCJzZWNvbmRzXCIsXG4gICAgICBtaWxsaXNlY29uZDogXCJtaWxsaXNlY29uZHNcIixcbiAgICAgIG1pbGxpc2Vjb25kczogXCJtaWxsaXNlY29uZHNcIixcbiAgICB9W3VuaXQgPyB1bml0LnRvTG93ZXJDYXNlKCkgOiB1bml0XTtcblxuICAgIGlmICghbm9ybWFsaXplZCkgdGhyb3cgbmV3IEludmFsaWRVbml0RXJyb3IodW5pdCk7XG5cbiAgICByZXR1cm4gbm9ybWFsaXplZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhbiBvYmplY3QgaXMgYSBEdXJhdGlvbi4gV29ya3MgYWNyb3NzIGNvbnRleHQgYm91bmRhcmllc1xuICAgKiBAcGFyYW0ge29iamVjdH0gb1xuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgc3RhdGljIGlzRHVyYXRpb24obykge1xuICAgIHJldHVybiAobyAmJiBvLmlzTHV4b25EdXJhdGlvbikgfHwgZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogR2V0ICB0aGUgbG9jYWxlIG9mIGEgRHVyYXRpb24sIHN1Y2ggJ2VuLUdCJ1xuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgZ2V0IGxvY2FsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pc1ZhbGlkID8gdGhpcy5sb2MubG9jYWxlIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIG51bWJlcmluZyBzeXN0ZW0gb2YgYSBEdXJhdGlvbiwgc3VjaCAnYmVuZycuIFRoZSBudW1iZXJpbmcgc3lzdGVtIGlzIHVzZWQgd2hlbiBmb3JtYXR0aW5nIHRoZSBEdXJhdGlvblxuICAgKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgZ2V0IG51bWJlcmluZ1N5c3RlbSgpIHtcbiAgICByZXR1cm4gdGhpcy5pc1ZhbGlkID8gdGhpcy5sb2MubnVtYmVyaW5nU3lzdGVtIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgRHVyYXRpb24gZm9ybWF0dGVkIGFjY29yZGluZyB0byB0aGUgc3BlY2lmaWVkIGZvcm1hdCBzdHJpbmcuIFlvdSBtYXkgdXNlIHRoZXNlIHRva2VuczpcbiAgICogKiBgU2AgZm9yIG1pbGxpc2Vjb25kc1xuICAgKiAqIGBzYCBmb3Igc2Vjb25kc1xuICAgKiAqIGBtYCBmb3IgbWludXRlc1xuICAgKiAqIGBoYCBmb3IgaG91cnNcbiAgICogKiBgZGAgZm9yIGRheXNcbiAgICogKiBgd2AgZm9yIHdlZWtzXG4gICAqICogYE1gIGZvciBtb250aHNcbiAgICogKiBgeWAgZm9yIHllYXJzXG4gICAqIE5vdGVzOlxuICAgKiAqIEFkZCBwYWRkaW5nIGJ5IHJlcGVhdGluZyB0aGUgdG9rZW4sIGUuZy4gXCJ5eVwiIHBhZHMgdGhlIHllYXJzIHRvIHR3byBkaWdpdHMsIFwiaGhoaFwiIHBhZHMgdGhlIGhvdXJzIG91dCB0byBmb3VyIGRpZ2l0c1xuICAgKiAqIFRva2VucyBjYW4gYmUgZXNjYXBlZCBieSB3cmFwcGluZyB3aXRoIHNpbmdsZSBxdW90ZXMuXG4gICAqICogVGhlIGR1cmF0aW9uIHdpbGwgYmUgY29udmVydGVkIHRvIHRoZSBzZXQgb2YgdW5pdHMgaW4gdGhlIGZvcm1hdCBzdHJpbmcgdXNpbmcge0BsaW5rIER1cmF0aW9uI3NoaWZ0VG99IGFuZCB0aGUgRHVyYXRpb25zJ3MgY29udmVyc2lvbiBhY2N1cmFjeSBzZXR0aW5nLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZm10IC0gdGhlIGZvcm1hdCBzdHJpbmdcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdHMgLSBvcHRpb25zXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdHMuZmxvb3I9dHJ1ZV0gLSBmbG9vciBudW1lcmljYWwgdmFsdWVzXG4gICAqIEBleGFtcGxlIER1cmF0aW9uLmZyb21PYmplY3QoeyB5ZWFyczogMSwgZGF5czogNiwgc2Vjb25kczogMiB9KS50b0Zvcm1hdChcInkgZCBzXCIpIC8vPT4gXCIxIDYgMlwiXG4gICAqIEBleGFtcGxlIER1cmF0aW9uLmZyb21PYmplY3QoeyB5ZWFyczogMSwgZGF5czogNiwgc2Vjb25kczogMiB9KS50b0Zvcm1hdChcInl5IGRkIHNzc1wiKSAvLz0+IFwiMDEgMDYgMDAyXCJcbiAgICogQGV4YW1wbGUgRHVyYXRpb24uZnJvbU9iamVjdCh7IHllYXJzOiAxLCBkYXlzOiA2LCBzZWNvbmRzOiAyIH0pLnRvRm9ybWF0KFwiTSBTXCIpIC8vPT4gXCIxMiA1MTg0MDIwMDBcIlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuICB0b0Zvcm1hdChmbXQsIG9wdHMgPSB7fSkge1xuICAgIC8vIHJldmVyc2UtY29tcGF0IHNpbmNlIDEuMjsgd2UgYWx3YXlzIHJvdW5kIGRvd24gbm93LCBuZXZlciB1cCwgYW5kIHdlIGRvIGl0IGJ5IGRlZmF1bHRcbiAgICBjb25zdCBmbXRPcHRzID0ge1xuICAgICAgLi4ub3B0cyxcbiAgICAgIGZsb29yOiBvcHRzLnJvdW5kICE9PSBmYWxzZSAmJiBvcHRzLmZsb29yICE9PSBmYWxzZSxcbiAgICB9O1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWRcbiAgICAgID8gRm9ybWF0dGVyLmNyZWF0ZSh0aGlzLmxvYywgZm10T3B0cykuZm9ybWF0RHVyYXRpb25Gcm9tU3RyaW5nKHRoaXMsIGZtdClcbiAgICAgIDogSU5WQUxJRCQyO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSBEdXJhdGlvbiB3aXRoIGFsbCB1bml0cyBpbmNsdWRlZC5cbiAgICogVG8gbW9kaWZ5IGl0cyBiZWhhdmlvciB1c2UgdGhlIGBsaXN0U3R5bGVgIGFuZCBhbnkgSW50bC5OdW1iZXJGb3JtYXQgb3B0aW9uLCB0aG91Z2ggYHVuaXREaXNwbGF5YCBpcyBlc3BlY2lhbGx5IHJlbGV2YW50LlxuICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0ludGwvTnVtYmVyRm9ybWF0XG4gICAqIEBwYXJhbSBvcHRzIC0gT24gb3B0aW9uIG9iamVjdCB0byBvdmVycmlkZSB0aGUgZm9ybWF0dGluZy4gQWNjZXB0cyB0aGUgc2FtZSBrZXlzIGFzIHRoZSBvcHRpb25zIHBhcmFtZXRlciBvZiB0aGUgbmF0aXZlIGBJbnQuTnVtYmVyRm9ybWF0YCBjb25zdHJ1Y3RvciwgYXMgd2VsbCBhcyBgbGlzdFN0eWxlYC5cbiAgICogQGV4YW1wbGVcbiAgICogYGBganNcbiAgICogdmFyIGR1ciA9IER1cmF0aW9uLmZyb21PYmplY3QoeyBkYXlzOiAxLCBob3VyczogNSwgbWludXRlczogNiB9KVxuICAgKiBkdXIudG9IdW1hbigpIC8vPT4gJzEgZGF5LCA1IGhvdXJzLCA2IG1pbnV0ZXMnXG4gICAqIGR1ci50b0h1bWFuKHsgbGlzdFN0eWxlOiBcImxvbmdcIiB9KSAvLz0+ICcxIGRheSwgNSBob3VycywgYW5kIDYgbWludXRlcydcbiAgICogZHVyLnRvSHVtYW4oeyB1bml0RGlzcGxheTogXCJzaG9ydFwiIH0pIC8vPT4gJzEgZGF5LCA1IGhyLCA2IG1pbidcbiAgICogYGBgXG4gICAqL1xuICB0b0h1bWFuKG9wdHMgPSB7fSkge1xuICAgIGNvbnN0IGwgPSBvcmRlcmVkVW5pdHMkMVxuICAgICAgLm1hcCgodW5pdCkgPT4ge1xuICAgICAgICBjb25zdCB2YWwgPSB0aGlzLnZhbHVlc1t1bml0XTtcbiAgICAgICAgaWYgKGlzVW5kZWZpbmVkKHZhbCkpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5sb2NcbiAgICAgICAgICAubnVtYmVyRm9ybWF0dGVyKHsgc3R5bGU6IFwidW5pdFwiLCB1bml0RGlzcGxheTogXCJsb25nXCIsIC4uLm9wdHMsIHVuaXQ6IHVuaXQuc2xpY2UoMCwgLTEpIH0pXG4gICAgICAgICAgLmZvcm1hdCh2YWwpO1xuICAgICAgfSlcbiAgICAgIC5maWx0ZXIoKG4pID0+IG4pO1xuXG4gICAgcmV0dXJuIHRoaXMubG9jXG4gICAgICAubGlzdEZvcm1hdHRlcih7IHR5cGU6IFwiY29uanVuY3Rpb25cIiwgc3R5bGU6IG9wdHMubGlzdFN0eWxlIHx8IFwibmFycm93XCIsIC4uLm9wdHMgfSlcbiAgICAgIC5mb3JtYXQobCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIEphdmFTY3JpcHQgb2JqZWN0IHdpdGggdGhpcyBEdXJhdGlvbidzIHZhbHVlcy5cbiAgICogQGV4YW1wbGUgRHVyYXRpb24uZnJvbU9iamVjdCh7IHllYXJzOiAxLCBkYXlzOiA2LCBzZWNvbmRzOiAyIH0pLnRvT2JqZWN0KCkgLy89PiB7IHllYXJzOiAxLCBkYXlzOiA2LCBzZWNvbmRzOiAyIH1cbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgdG9PYmplY3QoKSB7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWQpIHJldHVybiB7fTtcbiAgICByZXR1cm4geyAuLi50aGlzLnZhbHVlcyB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gSVNPIDg2MDEtY29tcGxpYW50IHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIER1cmF0aW9uLlxuICAgKiBAc2VlIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0lTT184NjAxI0R1cmF0aW9uc1xuICAgKiBAZXhhbXBsZSBEdXJhdGlvbi5mcm9tT2JqZWN0KHsgeWVhcnM6IDMsIHNlY29uZHM6IDQ1IH0pLnRvSVNPKCkgLy89PiAnUDNZVDQ1UydcbiAgICogQGV4YW1wbGUgRHVyYXRpb24uZnJvbU9iamVjdCh7IG1vbnRoczogNCwgc2Vjb25kczogNDUgfSkudG9JU08oKSAvLz0+ICdQNE1UNDVTJ1xuICAgKiBAZXhhbXBsZSBEdXJhdGlvbi5mcm9tT2JqZWN0KHsgbW9udGhzOiA1IH0pLnRvSVNPKCkgLy89PiAnUDVNJ1xuICAgKiBAZXhhbXBsZSBEdXJhdGlvbi5mcm9tT2JqZWN0KHsgbWludXRlczogNSB9KS50b0lTTygpIC8vPT4gJ1BUNU0nXG4gICAqIEBleGFtcGxlIER1cmF0aW9uLmZyb21PYmplY3QoeyBtaWxsaXNlY29uZHM6IDYgfSkudG9JU08oKSAvLz0+ICdQVDAuMDA2UydcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cbiAgdG9JU08oKSB7XG4gICAgLy8gd2UgY291bGQgdXNlIHRoZSBmb3JtYXR0ZXIsIGJ1dCB0aGlzIGlzIGFuIGVhc2llciB3YXkgdG8gZ2V0IHRoZSBtaW5pbXVtIHN0cmluZ1xuICAgIGlmICghdGhpcy5pc1ZhbGlkKSByZXR1cm4gbnVsbDtcblxuICAgIGxldCBzID0gXCJQXCI7XG4gICAgaWYgKHRoaXMueWVhcnMgIT09IDApIHMgKz0gdGhpcy55ZWFycyArIFwiWVwiO1xuICAgIGlmICh0aGlzLm1vbnRocyAhPT0gMCB8fCB0aGlzLnF1YXJ0ZXJzICE9PSAwKSBzICs9IHRoaXMubW9udGhzICsgdGhpcy5xdWFydGVycyAqIDMgKyBcIk1cIjtcbiAgICBpZiAodGhpcy53ZWVrcyAhPT0gMCkgcyArPSB0aGlzLndlZWtzICsgXCJXXCI7XG4gICAgaWYgKHRoaXMuZGF5cyAhPT0gMCkgcyArPSB0aGlzLmRheXMgKyBcIkRcIjtcbiAgICBpZiAodGhpcy5ob3VycyAhPT0gMCB8fCB0aGlzLm1pbnV0ZXMgIT09IDAgfHwgdGhpcy5zZWNvbmRzICE9PSAwIHx8IHRoaXMubWlsbGlzZWNvbmRzICE9PSAwKVxuICAgICAgcyArPSBcIlRcIjtcbiAgICBpZiAodGhpcy5ob3VycyAhPT0gMCkgcyArPSB0aGlzLmhvdXJzICsgXCJIXCI7XG4gICAgaWYgKHRoaXMubWludXRlcyAhPT0gMCkgcyArPSB0aGlzLm1pbnV0ZXMgKyBcIk1cIjtcbiAgICBpZiAodGhpcy5zZWNvbmRzICE9PSAwIHx8IHRoaXMubWlsbGlzZWNvbmRzICE9PSAwKVxuICAgICAgLy8gdGhpcyB3aWxsIGhhbmRsZSBcImZsb2F0aW5nIHBvaW50IG1hZG5lc3NcIiBieSByZW1vdmluZyBleHRyYSBkZWNpbWFsIHBsYWNlc1xuICAgICAgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTg4MDA0L2lzLWZsb2F0aW5nLXBvaW50LW1hdGgtYnJva2VuXG4gICAgICBzICs9IHJvdW5kVG8odGhpcy5zZWNvbmRzICsgdGhpcy5taWxsaXNlY29uZHMgLyAxMDAwLCAzKSArIFwiU1wiO1xuICAgIGlmIChzID09PSBcIlBcIikgcyArPSBcIlQwU1wiO1xuICAgIHJldHVybiBzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gSVNPIDg2MDEtY29tcGxpYW50IHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIER1cmF0aW9uLCBmb3JtYXR0ZWQgYXMgYSB0aW1lIG9mIGRheS5cbiAgICogTm90ZSB0aGF0IHRoaXMgd2lsbCByZXR1cm4gbnVsbCBpZiB0aGUgZHVyYXRpb24gaXMgaW52YWxpZCwgbmVnYXRpdmUsIG9yIGVxdWFsIHRvIG9yIGdyZWF0ZXIgdGhhbiAyNCBob3Vycy5cbiAgICogQHNlZSBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fODYwMSNUaW1lc1xuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0cyAtIG9wdGlvbnNcbiAgICogQHBhcmFtIHtib29sZWFufSBbb3B0cy5zdXBwcmVzc01pbGxpc2Vjb25kcz1mYWxzZV0gLSBleGNsdWRlIG1pbGxpc2Vjb25kcyBmcm9tIHRoZSBmb3JtYXQgaWYgdGhleSdyZSAwXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdHMuc3VwcHJlc3NTZWNvbmRzPWZhbHNlXSAtIGV4Y2x1ZGUgc2Vjb25kcyBmcm9tIHRoZSBmb3JtYXQgaWYgdGhleSdyZSAwXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdHMuaW5jbHVkZVByZWZpeD1mYWxzZV0gLSBpbmNsdWRlIHRoZSBgVGAgcHJlZml4XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0cy5mb3JtYXQ9J2V4dGVuZGVkJ10gLSBjaG9vc2UgYmV0d2VlbiB0aGUgYmFzaWMgYW5kIGV4dGVuZGVkIGZvcm1hdFxuICAgKiBAZXhhbXBsZSBEdXJhdGlvbi5mcm9tT2JqZWN0KHsgaG91cnM6IDExIH0pLnRvSVNPVGltZSgpIC8vPT4gJzExOjAwOjAwLjAwMCdcbiAgICogQGV4YW1wbGUgRHVyYXRpb24uZnJvbU9iamVjdCh7IGhvdXJzOiAxMSB9KS50b0lTT1RpbWUoeyBzdXBwcmVzc01pbGxpc2Vjb25kczogdHJ1ZSB9KSAvLz0+ICcxMTowMDowMCdcbiAgICogQGV4YW1wbGUgRHVyYXRpb24uZnJvbU9iamVjdCh7IGhvdXJzOiAxMSB9KS50b0lTT1RpbWUoeyBzdXBwcmVzc1NlY29uZHM6IHRydWUgfSkgLy89PiAnMTE6MDAnXG4gICAqIEBleGFtcGxlIER1cmF0aW9uLmZyb21PYmplY3QoeyBob3VyczogMTEgfSkudG9JU09UaW1lKHsgaW5jbHVkZVByZWZpeDogdHJ1ZSB9KSAvLz0+ICdUMTE6MDA6MDAuMDAwJ1xuICAgKiBAZXhhbXBsZSBEdXJhdGlvbi5mcm9tT2JqZWN0KHsgaG91cnM6IDExIH0pLnRvSVNPVGltZSh7IGZvcm1hdDogJ2Jhc2ljJyB9KSAvLz0+ICcxMTAwMDAuMDAwJ1xuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuICB0b0lTT1RpbWUob3B0cyA9IHt9KSB7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWQpIHJldHVybiBudWxsO1xuXG4gICAgY29uc3QgbWlsbGlzID0gdGhpcy50b01pbGxpcygpO1xuICAgIGlmIChtaWxsaXMgPCAwIHx8IG1pbGxpcyA+PSA4NjQwMDAwMCkgcmV0dXJuIG51bGw7XG5cbiAgICBvcHRzID0ge1xuICAgICAgc3VwcHJlc3NNaWxsaXNlY29uZHM6IGZhbHNlLFxuICAgICAgc3VwcHJlc3NTZWNvbmRzOiBmYWxzZSxcbiAgICAgIGluY2x1ZGVQcmVmaXg6IGZhbHNlLFxuICAgICAgZm9ybWF0OiBcImV4dGVuZGVkXCIsXG4gICAgICAuLi5vcHRzLFxuICAgIH07XG5cbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuc2hpZnRUbyhcImhvdXJzXCIsIFwibWludXRlc1wiLCBcInNlY29uZHNcIiwgXCJtaWxsaXNlY29uZHNcIik7XG5cbiAgICBsZXQgZm10ID0gb3B0cy5mb3JtYXQgPT09IFwiYmFzaWNcIiA/IFwiaGhtbVwiIDogXCJoaDptbVwiO1xuXG4gICAgaWYgKCFvcHRzLnN1cHByZXNzU2Vjb25kcyB8fCB2YWx1ZS5zZWNvbmRzICE9PSAwIHx8IHZhbHVlLm1pbGxpc2Vjb25kcyAhPT0gMCkge1xuICAgICAgZm10ICs9IG9wdHMuZm9ybWF0ID09PSBcImJhc2ljXCIgPyBcInNzXCIgOiBcIjpzc1wiO1xuICAgICAgaWYgKCFvcHRzLnN1cHByZXNzTWlsbGlzZWNvbmRzIHx8IHZhbHVlLm1pbGxpc2Vjb25kcyAhPT0gMCkge1xuICAgICAgICBmbXQgKz0gXCIuU1NTXCI7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHN0ciA9IHZhbHVlLnRvRm9ybWF0KGZtdCk7XG5cbiAgICBpZiAob3B0cy5pbmNsdWRlUHJlZml4KSB7XG4gICAgICBzdHIgPSBcIlRcIiArIHN0cjtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RyO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gSVNPIDg2MDEgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBEdXJhdGlvbiBhcHByb3ByaWF0ZSBmb3IgdXNlIGluIEpTT04uXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICovXG4gIHRvSlNPTigpIHtcbiAgICByZXR1cm4gdGhpcy50b0lTTygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gSVNPIDg2MDEgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBEdXJhdGlvbiBhcHByb3ByaWF0ZSBmb3IgdXNlIGluIGRlYnVnZ2luZy5cbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMudG9JU08oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIG1pbGxpc2Vjb25kcyB2YWx1ZSBvZiB0aGlzIER1cmF0aW9uLlxuICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAqL1xuICB0b01pbGxpcygpIHtcbiAgICByZXR1cm4gdGhpcy5hcyhcIm1pbGxpc2Vjb25kc1wiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIG1pbGxpc2Vjb25kcyB2YWx1ZSBvZiB0aGlzIER1cmF0aW9uLiBBbGlhcyBvZiB7QGxpbmsgdG9NaWxsaXN9XG4gICAqIEByZXR1cm4ge251bWJlcn1cbiAgICovXG4gIHZhbHVlT2YoKSB7XG4gICAgcmV0dXJuIHRoaXMudG9NaWxsaXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYWtlIHRoaXMgRHVyYXRpb24gbG9uZ2VyIGJ5IHRoZSBzcGVjaWZpZWQgYW1vdW50LiBSZXR1cm4gYSBuZXdseS1jb25zdHJ1Y3RlZCBEdXJhdGlvbi5cbiAgICogQHBhcmFtIHtEdXJhdGlvbnxPYmplY3R8bnVtYmVyfSBkdXJhdGlvbiAtIFRoZSBhbW91bnQgdG8gYWRkLiBFaXRoZXIgYSBMdXhvbiBEdXJhdGlvbiwgYSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzLCB0aGUgb2JqZWN0IGFyZ3VtZW50IHRvIER1cmF0aW9uLmZyb21PYmplY3QoKVxuICAgKiBAcmV0dXJuIHtEdXJhdGlvbn1cbiAgICovXG4gIHBsdXMoZHVyYXRpb24pIHtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZCkgcmV0dXJuIHRoaXM7XG5cbiAgICBjb25zdCBkdXIgPSBEdXJhdGlvbi5mcm9tRHVyYXRpb25MaWtlKGR1cmF0aW9uKSxcbiAgICAgIHJlc3VsdCA9IHt9O1xuXG4gICAgZm9yIChjb25zdCBrIG9mIG9yZGVyZWRVbml0cyQxKSB7XG4gICAgICBpZiAoaGFzT3duUHJvcGVydHkoZHVyLnZhbHVlcywgaykgfHwgaGFzT3duUHJvcGVydHkodGhpcy52YWx1ZXMsIGspKSB7XG4gICAgICAgIHJlc3VsdFtrXSA9IGR1ci5nZXQoaykgKyB0aGlzLmdldChrKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY2xvbmUkMSh0aGlzLCB7IHZhbHVlczogcmVzdWx0IH0sIHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ha2UgdGhpcyBEdXJhdGlvbiBzaG9ydGVyIGJ5IHRoZSBzcGVjaWZpZWQgYW1vdW50LiBSZXR1cm4gYSBuZXdseS1jb25zdHJ1Y3RlZCBEdXJhdGlvbi5cbiAgICogQHBhcmFtIHtEdXJhdGlvbnxPYmplY3R8bnVtYmVyfSBkdXJhdGlvbiAtIFRoZSBhbW91bnQgdG8gc3VidHJhY3QuIEVpdGhlciBhIEx1eG9uIER1cmF0aW9uLCBhIG51bWJlciBvZiBtaWxsaXNlY29uZHMsIHRoZSBvYmplY3QgYXJndW1lbnQgdG8gRHVyYXRpb24uZnJvbU9iamVjdCgpXG4gICAqIEByZXR1cm4ge0R1cmF0aW9ufVxuICAgKi9cbiAgbWludXMoZHVyYXRpb24pIHtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZCkgcmV0dXJuIHRoaXM7XG5cbiAgICBjb25zdCBkdXIgPSBEdXJhdGlvbi5mcm9tRHVyYXRpb25MaWtlKGR1cmF0aW9uKTtcbiAgICByZXR1cm4gdGhpcy5wbHVzKGR1ci5uZWdhdGUoKSk7XG4gIH1cblxuICAvKipcbiAgICogU2NhbGUgdGhpcyBEdXJhdGlvbiBieSB0aGUgc3BlY2lmaWVkIGFtb3VudC4gUmV0dXJuIGEgbmV3bHktY29uc3RydWN0ZWQgRHVyYXRpb24uXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuIC0gVGhlIGZ1bmN0aW9uIHRvIGFwcGx5IHRvIGVhY2ggdW5pdC4gQXJpdHkgaXMgMSBvciAyOiB0aGUgdmFsdWUgb2YgdGhlIHVuaXQgYW5kLCBvcHRpb25hbGx5LCB0aGUgdW5pdCBuYW1lLiBNdXN0IHJldHVybiBhIG51bWJlci5cbiAgICogQGV4YW1wbGUgRHVyYXRpb24uZnJvbU9iamVjdCh7IGhvdXJzOiAxLCBtaW51dGVzOiAzMCB9KS5tYXBVbml0cyh4ID0+IHggKiAyKSAvLz0+IHsgaG91cnM6IDIsIG1pbnV0ZXM6IDYwIH1cbiAgICogQGV4YW1wbGUgRHVyYXRpb24uZnJvbU9iamVjdCh7IGhvdXJzOiAxLCBtaW51dGVzOiAzMCB9KS5tYXBVbml0cygoeCwgdSkgPT4gdSA9PT0gXCJob3VyXCIgPyB4ICogMiA6IHgpIC8vPT4geyBob3VyczogMiwgbWludXRlczogMzAgfVxuICAgKiBAcmV0dXJuIHtEdXJhdGlvbn1cbiAgICovXG4gIG1hcFVuaXRzKGZuKSB7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWQpIHJldHVybiB0aGlzO1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgIGZvciAoY29uc3QgayBvZiBPYmplY3Qua2V5cyh0aGlzLnZhbHVlcykpIHtcbiAgICAgIHJlc3VsdFtrXSA9IGFzTnVtYmVyKGZuKHRoaXMudmFsdWVzW2tdLCBrKSk7XG4gICAgfVxuICAgIHJldHVybiBjbG9uZSQxKHRoaXMsIHsgdmFsdWVzOiByZXN1bHQgfSwgdHJ1ZSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSB2YWx1ZSBvZiB1bml0LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdW5pdCAtIGEgdW5pdCBzdWNoIGFzICdtaW51dGUnIG9yICdkYXknXG4gICAqIEBleGFtcGxlIER1cmF0aW9uLmZyb21PYmplY3Qoe3llYXJzOiAyLCBkYXlzOiAzfSkuZ2V0KCd5ZWFycycpIC8vPT4gMlxuICAgKiBAZXhhbXBsZSBEdXJhdGlvbi5mcm9tT2JqZWN0KHt5ZWFyczogMiwgZGF5czogM30pLmdldCgnbW9udGhzJykgLy89PiAwXG4gICAqIEBleGFtcGxlIER1cmF0aW9uLmZyb21PYmplY3Qoe3llYXJzOiAyLCBkYXlzOiAzfSkuZ2V0KCdkYXlzJykgLy89PiAzXG4gICAqIEByZXR1cm4ge251bWJlcn1cbiAgICovXG4gIGdldCh1bml0KSB7XG4gICAgcmV0dXJuIHRoaXNbRHVyYXRpb24ubm9ybWFsaXplVW5pdCh1bml0KV07XG4gIH1cblxuICAvKipcbiAgICogXCJTZXRcIiB0aGUgdmFsdWVzIG9mIHNwZWNpZmllZCB1bml0cy4gUmV0dXJuIGEgbmV3bHktY29uc3RydWN0ZWQgRHVyYXRpb24uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZXMgLSBhIG1hcHBpbmcgb2YgdW5pdHMgdG8gbnVtYmVyc1xuICAgKiBAZXhhbXBsZSBkdXIuc2V0KHsgeWVhcnM6IDIwMTcgfSlcbiAgICogQGV4YW1wbGUgZHVyLnNldCh7IGhvdXJzOiA4LCBtaW51dGVzOiAzMCB9KVxuICAgKiBAcmV0dXJuIHtEdXJhdGlvbn1cbiAgICovXG4gIHNldCh2YWx1ZXMpIHtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZCkgcmV0dXJuIHRoaXM7XG5cbiAgICBjb25zdCBtaXhlZCA9IHsgLi4udGhpcy52YWx1ZXMsIC4uLm5vcm1hbGl6ZU9iamVjdCh2YWx1ZXMsIER1cmF0aW9uLm5vcm1hbGl6ZVVuaXQpIH07XG4gICAgcmV0dXJuIGNsb25lJDEodGhpcywgeyB2YWx1ZXM6IG1peGVkIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFwiU2V0XCIgdGhlIGxvY2FsZSBhbmQvb3IgbnVtYmVyaW5nU3lzdGVtLiAgUmV0dXJucyBhIG5ld2x5LWNvbnN0cnVjdGVkIER1cmF0aW9uLlxuICAgKiBAZXhhbXBsZSBkdXIucmVjb25maWd1cmUoeyBsb2NhbGU6ICdlbi1HQicgfSlcbiAgICogQHJldHVybiB7RHVyYXRpb259XG4gICAqL1xuICByZWNvbmZpZ3VyZSh7IGxvY2FsZSwgbnVtYmVyaW5nU3lzdGVtLCBjb252ZXJzaW9uQWNjdXJhY3kgfSA9IHt9KSB7XG4gICAgY29uc3QgbG9jID0gdGhpcy5sb2MuY2xvbmUoeyBsb2NhbGUsIG51bWJlcmluZ1N5c3RlbSB9KSxcbiAgICAgIG9wdHMgPSB7IGxvYyB9O1xuXG4gICAgaWYgKGNvbnZlcnNpb25BY2N1cmFjeSkge1xuICAgICAgb3B0cy5jb252ZXJzaW9uQWNjdXJhY3kgPSBjb252ZXJzaW9uQWNjdXJhY3k7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNsb25lJDEodGhpcywgb3B0cyk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBsZW5ndGggb2YgdGhlIGR1cmF0aW9uIGluIHRoZSBzcGVjaWZpZWQgdW5pdC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHVuaXQgLSBhIHVuaXQgc3VjaCBhcyAnbWludXRlcycgb3IgJ2RheXMnXG4gICAqIEBleGFtcGxlIER1cmF0aW9uLmZyb21PYmplY3Qoe3llYXJzOiAxfSkuYXMoJ2RheXMnKSAvLz0+IDM2NVxuICAgKiBAZXhhbXBsZSBEdXJhdGlvbi5mcm9tT2JqZWN0KHt5ZWFyczogMX0pLmFzKCdtb250aHMnKSAvLz0+IDEyXG4gICAqIEBleGFtcGxlIER1cmF0aW9uLmZyb21PYmplY3Qoe2hvdXJzOiA2MH0pLmFzKCdkYXlzJykgLy89PiAyLjVcbiAgICogQHJldHVybiB7bnVtYmVyfVxuICAgKi9cbiAgYXModW5pdCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyB0aGlzLnNoaWZ0VG8odW5pdCkuZ2V0KHVuaXQpIDogTmFOO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZHVjZSB0aGlzIER1cmF0aW9uIHRvIGl0cyBjYW5vbmljYWwgcmVwcmVzZW50YXRpb24gaW4gaXRzIGN1cnJlbnQgdW5pdHMuXG4gICAqIEBleGFtcGxlIER1cmF0aW9uLmZyb21PYmplY3QoeyB5ZWFyczogMiwgZGF5czogNTAwMCB9KS5ub3JtYWxpemUoKS50b09iamVjdCgpIC8vPT4geyB5ZWFyczogMTUsIGRheXM6IDI1NSB9XG4gICAqIEBleGFtcGxlIER1cmF0aW9uLmZyb21PYmplY3QoeyBob3VyczogMTIsIG1pbnV0ZXM6IC00NSB9KS5ub3JtYWxpemUoKS50b09iamVjdCgpIC8vPT4geyBob3VyczogMTEsIG1pbnV0ZXM6IDE1IH1cbiAgICogQHJldHVybiB7RHVyYXRpb259XG4gICAqL1xuICBub3JtYWxpemUoKSB7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWQpIHJldHVybiB0aGlzO1xuICAgIGNvbnN0IHZhbHMgPSB0aGlzLnRvT2JqZWN0KCk7XG4gICAgbm9ybWFsaXplVmFsdWVzKHRoaXMubWF0cml4LCB2YWxzKTtcbiAgICByZXR1cm4gY2xvbmUkMSh0aGlzLCB7IHZhbHVlczogdmFscyB9LCB0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0IHRoaXMgRHVyYXRpb24gaW50byBpdHMgcmVwcmVzZW50YXRpb24gaW4gYSBkaWZmZXJlbnQgc2V0IG9mIHVuaXRzLlxuICAgKiBAZXhhbXBsZSBEdXJhdGlvbi5mcm9tT2JqZWN0KHsgaG91cnM6IDEsIHNlY29uZHM6IDMwIH0pLnNoaWZ0VG8oJ21pbnV0ZXMnLCAnbWlsbGlzZWNvbmRzJykudG9PYmplY3QoKSAvLz0+IHsgbWludXRlczogNjAsIG1pbGxpc2Vjb25kczogMzAwMDAgfVxuICAgKiBAcmV0dXJuIHtEdXJhdGlvbn1cbiAgICovXG4gIHNoaWZ0VG8oLi4udW5pdHMpIHtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZCkgcmV0dXJuIHRoaXM7XG5cbiAgICBpZiAodW5pdHMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB1bml0cyA9IHVuaXRzLm1hcCgodSkgPT4gRHVyYXRpb24ubm9ybWFsaXplVW5pdCh1KSk7XG5cbiAgICBjb25zdCBidWlsdCA9IHt9LFxuICAgICAgYWNjdW11bGF0ZWQgPSB7fSxcbiAgICAgIHZhbHMgPSB0aGlzLnRvT2JqZWN0KCk7XG4gICAgbGV0IGxhc3RVbml0O1xuXG4gICAgZm9yIChjb25zdCBrIG9mIG9yZGVyZWRVbml0cyQxKSB7XG4gICAgICBpZiAodW5pdHMuaW5kZXhPZihrKSA+PSAwKSB7XG4gICAgICAgIGxhc3RVbml0ID0gaztcblxuICAgICAgICBsZXQgb3duID0gMDtcblxuICAgICAgICAvLyBhbnl0aGluZyB3ZSBoYXZlbid0IGJvaWxlZCBkb3duIHlldCBzaG91bGQgZ2V0IGJvaWxlZCB0byB0aGlzIHVuaXRcbiAgICAgICAgZm9yIChjb25zdCBhayBpbiBhY2N1bXVsYXRlZCkge1xuICAgICAgICAgIG93biArPSB0aGlzLm1hdHJpeFtha11ba10gKiBhY2N1bXVsYXRlZFtha107XG4gICAgICAgICAgYWNjdW11bGF0ZWRbYWtdID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHBsdXMgYW55dGhpbmcgdGhhdCdzIGFscmVhZHkgaW4gdGhpcyB1bml0XG4gICAgICAgIGlmIChpc051bWJlcih2YWxzW2tdKSkge1xuICAgICAgICAgIG93biArPSB2YWxzW2tdO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaSA9IE1hdGgudHJ1bmMob3duKTtcbiAgICAgICAgYnVpbHRba10gPSBpO1xuICAgICAgICBhY2N1bXVsYXRlZFtrXSA9IChvd24gKiAxMDAwIC0gaSAqIDEwMDApIC8gMTAwMDtcblxuICAgICAgICAvLyBwbHVzIGFueXRoaW5nIGZ1cnRoZXIgZG93biB0aGUgY2hhaW4gdGhhdCBzaG91bGQgYmUgcm9sbGVkIHVwIGluIHRvIHRoaXNcbiAgICAgICAgZm9yIChjb25zdCBkb3duIGluIHZhbHMpIHtcbiAgICAgICAgICBpZiAob3JkZXJlZFVuaXRzJDEuaW5kZXhPZihkb3duKSA+IG9yZGVyZWRVbml0cyQxLmluZGV4T2YoaykpIHtcbiAgICAgICAgICAgIGNvbnZlcnQodGhpcy5tYXRyaXgsIHZhbHMsIGRvd24sIGJ1aWx0LCBrKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gb3RoZXJ3aXNlLCBrZWVwIGl0IGluIHRoZSB3aW5ncyB0byBib2lsIGl0IGxhdGVyXG4gICAgICB9IGVsc2UgaWYgKGlzTnVtYmVyKHZhbHNba10pKSB7XG4gICAgICAgIGFjY3VtdWxhdGVkW2tdID0gdmFsc1trXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBhbnl0aGluZyBsZWZ0b3ZlciBiZWNvbWVzIHRoZSBkZWNpbWFsIGZvciB0aGUgbGFzdCB1bml0XG4gICAgLy8gbGFzdFVuaXQgbXVzdCBiZSBkZWZpbmVkIHNpbmNlIHVuaXRzIGlzIG5vdCBlbXB0eVxuICAgIGZvciAoY29uc3Qga2V5IGluIGFjY3VtdWxhdGVkKSB7XG4gICAgICBpZiAoYWNjdW11bGF0ZWRba2V5XSAhPT0gMCkge1xuICAgICAgICBidWlsdFtsYXN0VW5pdF0gKz1cbiAgICAgICAgICBrZXkgPT09IGxhc3RVbml0ID8gYWNjdW11bGF0ZWRba2V5XSA6IGFjY3VtdWxhdGVkW2tleV0gLyB0aGlzLm1hdHJpeFtsYXN0VW5pdF1ba2V5XTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY2xvbmUkMSh0aGlzLCB7IHZhbHVlczogYnVpbHQgfSwgdHJ1ZSkubm9ybWFsaXplKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBuZWdhdGl2ZSBvZiB0aGlzIER1cmF0aW9uLlxuICAgKiBAZXhhbXBsZSBEdXJhdGlvbi5mcm9tT2JqZWN0KHsgaG91cnM6IDEsIHNlY29uZHM6IDMwIH0pLm5lZ2F0ZSgpLnRvT2JqZWN0KCkgLy89PiB7IGhvdXJzOiAtMSwgc2Vjb25kczogLTMwIH1cbiAgICogQHJldHVybiB7RHVyYXRpb259XG4gICAqL1xuICBuZWdhdGUoKSB7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWQpIHJldHVybiB0aGlzO1xuICAgIGNvbnN0IG5lZ2F0ZWQgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGsgb2YgT2JqZWN0LmtleXModGhpcy52YWx1ZXMpKSB7XG4gICAgICBuZWdhdGVkW2tdID0gdGhpcy52YWx1ZXNba10gPT09IDAgPyAwIDogLXRoaXMudmFsdWVzW2tdO1xuICAgIH1cbiAgICByZXR1cm4gY2xvbmUkMSh0aGlzLCB7IHZhbHVlczogbmVnYXRlZCB9LCB0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHllYXJzLlxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKi9cbiAgZ2V0IHllYXJzKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyB0aGlzLnZhbHVlcy55ZWFycyB8fCAwIDogTmFOO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgcXVhcnRlcnMuXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqL1xuICBnZXQgcXVhcnRlcnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNWYWxpZCA/IHRoaXMudmFsdWVzLnF1YXJ0ZXJzIHx8IDAgOiBOYU47XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBtb250aHMuXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqL1xuICBnZXQgbW9udGhzKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyB0aGlzLnZhbHVlcy5tb250aHMgfHwgMCA6IE5hTjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHdlZWtzXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqL1xuICBnZXQgd2Vla3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNWYWxpZCA/IHRoaXMudmFsdWVzLndlZWtzIHx8IDAgOiBOYU47XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBkYXlzLlxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKi9cbiAgZ2V0IGRheXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNWYWxpZCA/IHRoaXMudmFsdWVzLmRheXMgfHwgMCA6IE5hTjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGhvdXJzLlxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKi9cbiAgZ2V0IGhvdXJzKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyB0aGlzLnZhbHVlcy5ob3VycyB8fCAwIDogTmFOO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbWludXRlcy5cbiAgICogQHR5cGUge251bWJlcn1cbiAgICovXG4gIGdldCBtaW51dGVzKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyB0aGlzLnZhbHVlcy5taW51dGVzIHx8IDAgOiBOYU47XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBzZWNvbmRzLlxuICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAqL1xuICBnZXQgc2Vjb25kcygpIHtcbiAgICByZXR1cm4gdGhpcy5pc1ZhbGlkID8gdGhpcy52YWx1ZXMuc2Vjb25kcyB8fCAwIDogTmFOO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbWlsbGlzZWNvbmRzLlxuICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAqL1xuICBnZXQgbWlsbGlzZWNvbmRzKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyB0aGlzLnZhbHVlcy5taWxsaXNlY29uZHMgfHwgMCA6IE5hTjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHdoZXRoZXIgdGhlIER1cmF0aW9uIGlzIGludmFsaWQuIEludmFsaWQgZHVyYXRpb25zIGFyZSByZXR1cm5lZCBieSBkaWZmIG9wZXJhdGlvbnNcbiAgICogb24gaW52YWxpZCBEYXRlVGltZXMgb3IgSW50ZXJ2YWxzLlxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgZ2V0IGlzVmFsaWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW52YWxpZCA9PT0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIGVycm9yIGNvZGUgaWYgdGhpcyBEdXJhdGlvbiBiZWNhbWUgaW52YWxpZCwgb3IgbnVsbCBpZiB0aGUgRHVyYXRpb24gaXMgdmFsaWRcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cbiAgZ2V0IGludmFsaWRSZWFzb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuaW52YWxpZCA/IHRoaXMuaW52YWxpZC5yZWFzb24gOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gZXhwbGFuYXRpb24gb2Ygd2h5IHRoaXMgRHVyYXRpb24gYmVjYW1lIGludmFsaWQsIG9yIG51bGwgaWYgdGhlIER1cmF0aW9uIGlzIHZhbGlkXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuICBnZXQgaW52YWxpZEV4cGxhbmF0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmludmFsaWQgPyB0aGlzLmludmFsaWQuZXhwbGFuYXRpb24gOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEVxdWFsaXR5IGNoZWNrXG4gICAqIFR3byBEdXJhdGlvbnMgYXJlIGVxdWFsIGlmZiB0aGV5IGhhdmUgdGhlIHNhbWUgdW5pdHMgYW5kIHRoZSBzYW1lIHZhbHVlcyBmb3IgZWFjaCB1bml0LlxuICAgKiBAcGFyYW0ge0R1cmF0aW9ufSBvdGhlclxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgZXF1YWxzKG90aGVyKSB7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWQgfHwgIW90aGVyLmlzVmFsaWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMubG9jLmVxdWFscyhvdGhlci5sb2MpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXEodjEsIHYyKSB7XG4gICAgICAvLyBDb25zaWRlciAwIGFuZCB1bmRlZmluZWQgYXMgZXF1YWxcbiAgICAgIGlmICh2MSA9PT0gdW5kZWZpbmVkIHx8IHYxID09PSAwKSByZXR1cm4gdjIgPT09IHVuZGVmaW5lZCB8fCB2MiA9PT0gMDtcbiAgICAgIHJldHVybiB2MSA9PT0gdjI7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCB1IG9mIG9yZGVyZWRVbml0cyQxKSB7XG4gICAgICBpZiAoIWVxKHRoaXMudmFsdWVzW3VdLCBvdGhlci52YWx1ZXNbdV0pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cblxuY29uc3QgSU5WQUxJRCQxID0gXCJJbnZhbGlkIEludGVydmFsXCI7XG5cbi8vIGNoZWNrcyBpZiB0aGUgc3RhcnQgaXMgZXF1YWwgdG8gb3IgYmVmb3JlIHRoZSBlbmRcbmZ1bmN0aW9uIHZhbGlkYXRlU3RhcnRFbmQoc3RhcnQsIGVuZCkge1xuICBpZiAoIXN0YXJ0IHx8ICFzdGFydC5pc1ZhbGlkKSB7XG4gICAgcmV0dXJuIEludGVydmFsLmludmFsaWQoXCJtaXNzaW5nIG9yIGludmFsaWQgc3RhcnRcIik7XG4gIH0gZWxzZSBpZiAoIWVuZCB8fCAhZW5kLmlzVmFsaWQpIHtcbiAgICByZXR1cm4gSW50ZXJ2YWwuaW52YWxpZChcIm1pc3Npbmcgb3IgaW52YWxpZCBlbmRcIik7XG4gIH0gZWxzZSBpZiAoZW5kIDwgc3RhcnQpIHtcbiAgICByZXR1cm4gSW50ZXJ2YWwuaW52YWxpZChcbiAgICAgIFwiZW5kIGJlZm9yZSBzdGFydFwiLFxuICAgICAgYFRoZSBlbmQgb2YgYW4gaW50ZXJ2YWwgbXVzdCBiZSBhZnRlciBpdHMgc3RhcnQsIGJ1dCB5b3UgaGFkIHN0YXJ0PSR7c3RhcnQudG9JU08oKX0gYW5kIGVuZD0ke2VuZC50b0lTTygpfWBcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbi8qKlxuICogQW4gSW50ZXJ2YWwgb2JqZWN0IHJlcHJlc2VudHMgYSBoYWxmLW9wZW4gaW50ZXJ2YWwgb2YgdGltZSwgd2hlcmUgZWFjaCBlbmRwb2ludCBpcyBhIHtAbGluayBEYXRlVGltZX0uIENvbmNlcHR1YWxseSwgaXQncyBhIGNvbnRhaW5lciBmb3IgdGhvc2UgdHdvIGVuZHBvaW50cywgYWNjb21wYW5pZWQgYnkgbWV0aG9kcyBmb3IgY3JlYXRpbmcsIHBhcnNpbmcsIGludGVycm9nYXRpbmcsIGNvbXBhcmluZywgdHJhbnNmb3JtaW5nLCBhbmQgZm9ybWF0dGluZyB0aGVtLlxuICpcbiAqIEhlcmUgaXMgYSBicmllZiBvdmVydmlldyBvZiB0aGUgbW9zdCBjb21tb25seSB1c2VkIG1ldGhvZHMgYW5kIGdldHRlcnMgaW4gSW50ZXJ2YWw6XG4gKlxuICogKiAqKkNyZWF0aW9uKiogVG8gY3JlYXRlIGFuIEludGVydmFsLCB1c2Uge0BsaW5rIEludGVydmFsI2Zyb21EYXRlVGltZXN9LCB7QGxpbmsgSW50ZXJ2YWwjYWZ0ZXJ9LCB7QGxpbmsgSW50ZXJ2YWwjYmVmb3JlfSwgb3Ige0BsaW5rIEludGVydmFsI2Zyb21JU099LlxuICogKiAqKkFjY2Vzc29ycyoqIFVzZSB7QGxpbmsgSW50ZXJ2YWwjc3RhcnR9IGFuZCB7QGxpbmsgSW50ZXJ2YWwjZW5kfSB0byBnZXQgdGhlIHN0YXJ0IGFuZCBlbmQuXG4gKiAqICoqSW50ZXJyb2dhdGlvbioqIFRvIGFuYWx5emUgdGhlIEludGVydmFsLCB1c2Uge0BsaW5rIEludGVydmFsI2NvdW50fSwge0BsaW5rIEludGVydmFsI2xlbmd0aH0sIHtAbGluayBJbnRlcnZhbCNoYXNTYW1lfSwge0BsaW5rIEludGVydmFsI2NvbnRhaW5zfSwge0BsaW5rIEludGVydmFsI2lzQWZ0ZXJ9LCBvciB7QGxpbmsgSW50ZXJ2YWwjaXNCZWZvcmV9LlxuICogKiAqKlRyYW5zZm9ybWF0aW9uKiogVG8gY3JlYXRlIG90aGVyIEludGVydmFscyBvdXQgb2YgdGhpcyBvbmUsIHVzZSB7QGxpbmsgSW50ZXJ2YWwjc2V0fSwge0BsaW5rIEludGVydmFsI3NwbGl0QXR9LCB7QGxpbmsgSW50ZXJ2YWwjc3BsaXRCeX0sIHtAbGluayBJbnRlcnZhbCNkaXZpZGVFcXVhbGx5fSwge0BsaW5rIEludGVydmFsI21lcmdlfSwge0BsaW5rIEludGVydmFsI3hvcn0sIHtAbGluayBJbnRlcnZhbCN1bmlvbn0sIHtAbGluayBJbnRlcnZhbCNpbnRlcnNlY3Rpb259LCBvciB7QGxpbmsgSW50ZXJ2YWwjZGlmZmVyZW5jZX0uXG4gKiAqICoqQ29tcGFyaXNvbioqIFRvIGNvbXBhcmUgdGhpcyBJbnRlcnZhbCB0byBhbm90aGVyIG9uZSwgdXNlIHtAbGluayBJbnRlcnZhbCNlcXVhbHN9LCB7QGxpbmsgSW50ZXJ2YWwjb3ZlcmxhcHN9LCB7QGxpbmsgSW50ZXJ2YWwjYWJ1dHNTdGFydH0sIHtAbGluayBJbnRlcnZhbCNhYnV0c0VuZH0sIHtAbGluayBJbnRlcnZhbCNlbmd1bGZzfVxuICogKiAqKk91dHB1dCoqIFRvIGNvbnZlcnQgdGhlIEludGVydmFsIGludG8gb3RoZXIgcmVwcmVzZW50YXRpb25zLCBzZWUge0BsaW5rIEludGVydmFsI3RvU3RyaW5nfSwge0BsaW5rIEludGVydmFsI3RvSVNPfSwge0BsaW5rIEludGVydmFsI3RvSVNPRGF0ZX0sIHtAbGluayBJbnRlcnZhbCN0b0lTT1RpbWV9LCB7QGxpbmsgSW50ZXJ2YWwjdG9Gb3JtYXR9LCBhbmQge0BsaW5rIEludGVydmFsI3RvRHVyYXRpb259LlxuICovXG5jbGFzcyBJbnRlcnZhbCB7XG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgLyoqXG4gICAgICogQGFjY2VzcyBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5zID0gY29uZmlnLnN0YXJ0O1xuICAgIC8qKlxuICAgICAqIEBhY2Nlc3MgcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMuZSA9IGNvbmZpZy5lbmQ7XG4gICAgLyoqXG4gICAgICogQGFjY2VzcyBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5pbnZhbGlkID0gY29uZmlnLmludmFsaWQgfHwgbnVsbDtcbiAgICAvKipcbiAgICAgKiBAYWNjZXNzIHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLmlzTHV4b25JbnRlcnZhbCA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGFuIGludmFsaWQgSW50ZXJ2YWwuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWFzb24gLSBzaW1wbGUgc3RyaW5nIG9mIHdoeSB0aGlzIEludGVydmFsIGlzIGludmFsaWQuIFNob3VsZCBub3QgY29udGFpbiBwYXJhbWV0ZXJzIG9yIGFueXRoaW5nIGVsc2UgZGF0YS1kZXBlbmRlbnRcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtleHBsYW5hdGlvbj1udWxsXSAtIGxvbmdlciBleHBsYW5hdGlvbiwgbWF5IGluY2x1ZGUgcGFyYW1ldGVycyBhbmQgb3RoZXIgdXNlZnVsIGRlYnVnZ2luZyBpbmZvcm1hdGlvblxuICAgKiBAcmV0dXJuIHtJbnRlcnZhbH1cbiAgICovXG4gIHN0YXRpYyBpbnZhbGlkKHJlYXNvbiwgZXhwbGFuYXRpb24gPSBudWxsKSB7XG4gICAgaWYgKCFyZWFzb24pIHtcbiAgICAgIHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFcnJvcihcIm5lZWQgdG8gc3BlY2lmeSBhIHJlYXNvbiB0aGUgSW50ZXJ2YWwgaXMgaW52YWxpZFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBpbnZhbGlkID0gcmVhc29uIGluc3RhbmNlb2YgSW52YWxpZCA/IHJlYXNvbiA6IG5ldyBJbnZhbGlkKHJlYXNvbiwgZXhwbGFuYXRpb24pO1xuXG4gICAgaWYgKFNldHRpbmdzLnRocm93T25JbnZhbGlkKSB7XG4gICAgICB0aHJvdyBuZXcgSW52YWxpZEludGVydmFsRXJyb3IoaW52YWxpZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgSW50ZXJ2YWwoeyBpbnZhbGlkIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYW4gSW50ZXJ2YWwgZnJvbSBhIHN0YXJ0IERhdGVUaW1lIGFuZCBhbiBlbmQgRGF0ZVRpbWUuIEluY2x1c2l2ZSBvZiB0aGUgc3RhcnQgYnV0IG5vdCB0aGUgZW5kLlxuICAgKiBAcGFyYW0ge0RhdGVUaW1lfERhdGV8T2JqZWN0fSBzdGFydFxuICAgKiBAcGFyYW0ge0RhdGVUaW1lfERhdGV8T2JqZWN0fSBlbmRcbiAgICogQHJldHVybiB7SW50ZXJ2YWx9XG4gICAqL1xuICBzdGF0aWMgZnJvbURhdGVUaW1lcyhzdGFydCwgZW5kKSB7XG4gICAgY29uc3QgYnVpbHRTdGFydCA9IGZyaWVuZGx5RGF0ZVRpbWUoc3RhcnQpLFxuICAgICAgYnVpbHRFbmQgPSBmcmllbmRseURhdGVUaW1lKGVuZCk7XG5cbiAgICBjb25zdCB2YWxpZGF0ZUVycm9yID0gdmFsaWRhdGVTdGFydEVuZChidWlsdFN0YXJ0LCBidWlsdEVuZCk7XG5cbiAgICBpZiAodmFsaWRhdGVFcnJvciA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gbmV3IEludGVydmFsKHtcbiAgICAgICAgc3RhcnQ6IGJ1aWx0U3RhcnQsXG4gICAgICAgIGVuZDogYnVpbHRFbmQsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHZhbGlkYXRlRXJyb3I7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhbiBJbnRlcnZhbCBmcm9tIGEgc3RhcnQgRGF0ZVRpbWUgYW5kIGEgRHVyYXRpb24gdG8gZXh0ZW5kIHRvLlxuICAgKiBAcGFyYW0ge0RhdGVUaW1lfERhdGV8T2JqZWN0fSBzdGFydFxuICAgKiBAcGFyYW0ge0R1cmF0aW9ufE9iamVjdHxudW1iZXJ9IGR1cmF0aW9uIC0gdGhlIGxlbmd0aCBvZiB0aGUgSW50ZXJ2YWwuXG4gICAqIEByZXR1cm4ge0ludGVydmFsfVxuICAgKi9cbiAgc3RhdGljIGFmdGVyKHN0YXJ0LCBkdXJhdGlvbikge1xuICAgIGNvbnN0IGR1ciA9IER1cmF0aW9uLmZyb21EdXJhdGlvbkxpa2UoZHVyYXRpb24pLFxuICAgICAgZHQgPSBmcmllbmRseURhdGVUaW1lKHN0YXJ0KTtcbiAgICByZXR1cm4gSW50ZXJ2YWwuZnJvbURhdGVUaW1lcyhkdCwgZHQucGx1cyhkdXIpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYW4gSW50ZXJ2YWwgZnJvbSBhbiBlbmQgRGF0ZVRpbWUgYW5kIGEgRHVyYXRpb24gdG8gZXh0ZW5kIGJhY2t3YXJkcyB0by5cbiAgICogQHBhcmFtIHtEYXRlVGltZXxEYXRlfE9iamVjdH0gZW5kXG4gICAqIEBwYXJhbSB7RHVyYXRpb258T2JqZWN0fG51bWJlcn0gZHVyYXRpb24gLSB0aGUgbGVuZ3RoIG9mIHRoZSBJbnRlcnZhbC5cbiAgICogQHJldHVybiB7SW50ZXJ2YWx9XG4gICAqL1xuICBzdGF0aWMgYmVmb3JlKGVuZCwgZHVyYXRpb24pIHtcbiAgICBjb25zdCBkdXIgPSBEdXJhdGlvbi5mcm9tRHVyYXRpb25MaWtlKGR1cmF0aW9uKSxcbiAgICAgIGR0ID0gZnJpZW5kbHlEYXRlVGltZShlbmQpO1xuICAgIHJldHVybiBJbnRlcnZhbC5mcm9tRGF0ZVRpbWVzKGR0Lm1pbnVzKGR1ciksIGR0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYW4gSW50ZXJ2YWwgZnJvbSBhbiBJU08gODYwMSBzdHJpbmcuXG4gICAqIEFjY2VwdHMgYDxzdGFydD4vPGVuZD5gLCBgPHN0YXJ0Pi88ZHVyYXRpb24+YCwgYW5kIGA8ZHVyYXRpb24+LzxlbmQ+YCBmb3JtYXRzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCAtIHRoZSBJU08gc3RyaW5nIHRvIHBhcnNlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0c10gLSBvcHRpb25zIHRvIHBhc3Mge0BsaW5rIERhdGVUaW1lI2Zyb21JU099IGFuZCBvcHRpb25hbGx5IHtAbGluayBEdXJhdGlvbiNmcm9tSVNPfVxuICAgKiBAc2VlIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0lTT184NjAxI1RpbWVfaW50ZXJ2YWxzXG4gICAqIEByZXR1cm4ge0ludGVydmFsfVxuICAgKi9cbiAgc3RhdGljIGZyb21JU08odGV4dCwgb3B0cykge1xuICAgIGNvbnN0IFtzLCBlXSA9ICh0ZXh0IHx8IFwiXCIpLnNwbGl0KFwiL1wiLCAyKTtcbiAgICBpZiAocyAmJiBlKSB7XG4gICAgICBsZXQgc3RhcnQsIHN0YXJ0SXNWYWxpZDtcbiAgICAgIHRyeSB7XG4gICAgICAgIHN0YXJ0ID0gRGF0ZVRpbWUuZnJvbUlTTyhzLCBvcHRzKTtcbiAgICAgICAgc3RhcnRJc1ZhbGlkID0gc3RhcnQuaXNWYWxpZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgc3RhcnRJc1ZhbGlkID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGxldCBlbmQsIGVuZElzVmFsaWQ7XG4gICAgICB0cnkge1xuICAgICAgICBlbmQgPSBEYXRlVGltZS5mcm9tSVNPKGUsIG9wdHMpO1xuICAgICAgICBlbmRJc1ZhbGlkID0gZW5kLmlzVmFsaWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGVuZElzVmFsaWQgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXJ0SXNWYWxpZCAmJiBlbmRJc1ZhbGlkKSB7XG4gICAgICAgIHJldHVybiBJbnRlcnZhbC5mcm9tRGF0ZVRpbWVzKHN0YXJ0LCBlbmQpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhcnRJc1ZhbGlkKSB7XG4gICAgICAgIGNvbnN0IGR1ciA9IER1cmF0aW9uLmZyb21JU08oZSwgb3B0cyk7XG4gICAgICAgIGlmIChkdXIuaXNWYWxpZCkge1xuICAgICAgICAgIHJldHVybiBJbnRlcnZhbC5hZnRlcihzdGFydCwgZHVyKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChlbmRJc1ZhbGlkKSB7XG4gICAgICAgIGNvbnN0IGR1ciA9IER1cmF0aW9uLmZyb21JU08ocywgb3B0cyk7XG4gICAgICAgIGlmIChkdXIuaXNWYWxpZCkge1xuICAgICAgICAgIHJldHVybiBJbnRlcnZhbC5iZWZvcmUoZW5kLCBkdXIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBJbnRlcnZhbC5pbnZhbGlkKFwidW5wYXJzYWJsZVwiLCBgdGhlIGlucHV0IFwiJHt0ZXh0fVwiIGNhbid0IGJlIHBhcnNlZCBhcyBJU08gODYwMWApO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGFuIG9iamVjdCBpcyBhbiBJbnRlcnZhbC4gV29ya3MgYWNyb3NzIGNvbnRleHQgYm91bmRhcmllc1xuICAgKiBAcGFyYW0ge29iamVjdH0gb1xuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgc3RhdGljIGlzSW50ZXJ2YWwobykge1xuICAgIHJldHVybiAobyAmJiBvLmlzTHV4b25JbnRlcnZhbCkgfHwgZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgc3RhcnQgb2YgdGhlIEludGVydmFsXG4gICAqIEB0eXBlIHtEYXRlVGltZX1cbiAgICovXG4gIGdldCBzdGFydCgpIHtcbiAgICByZXR1cm4gdGhpcy5pc1ZhbGlkID8gdGhpcy5zIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBlbmQgb2YgdGhlIEludGVydmFsXG4gICAqIEB0eXBlIHtEYXRlVGltZX1cbiAgICovXG4gIGdldCBlbmQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNWYWxpZCA/IHRoaXMuZSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB3aGV0aGVyIHRoaXMgSW50ZXJ2YWwncyBlbmQgaXMgYXQgbGVhc3QgaXRzIHN0YXJ0LCBtZWFuaW5nIHRoYXQgdGhlIEludGVydmFsIGlzbid0ICdiYWNrd2FyZHMnLlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICovXG4gIGdldCBpc1ZhbGlkKCkge1xuICAgIHJldHVybiB0aGlzLmludmFsaWRSZWFzb24gPT09IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBlcnJvciBjb2RlIGlmIHRoaXMgSW50ZXJ2YWwgaXMgaW52YWxpZCwgb3IgbnVsbCBpZiB0aGUgSW50ZXJ2YWwgaXMgdmFsaWRcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIGdldCBpbnZhbGlkUmVhc29uKCkge1xuICAgIHJldHVybiB0aGlzLmludmFsaWQgPyB0aGlzLmludmFsaWQucmVhc29uIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIGV4cGxhbmF0aW9uIG9mIHdoeSB0aGlzIEludGVydmFsIGJlY2FtZSBpbnZhbGlkLCBvciBudWxsIGlmIHRoZSBJbnRlcnZhbCBpcyB2YWxpZFxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgZ2V0IGludmFsaWRFeHBsYW5hdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5pbnZhbGlkID8gdGhpcy5pbnZhbGlkLmV4cGxhbmF0aW9uIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBsZW5ndGggb2YgdGhlIEludGVydmFsIGluIHRoZSBzcGVjaWZpZWQgdW5pdC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHVuaXQgLSB0aGUgdW5pdCAoc3VjaCBhcyAnaG91cnMnIG9yICdkYXlzJykgdG8gcmV0dXJuIHRoZSBsZW5ndGggaW4uXG4gICAqIEByZXR1cm4ge251bWJlcn1cbiAgICovXG4gIGxlbmd0aCh1bml0ID0gXCJtaWxsaXNlY29uZHNcIikge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyB0aGlzLnRvRHVyYXRpb24oLi4uW3VuaXRdKS5nZXQodW5pdCkgOiBOYU47XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY291bnQgb2YgbWludXRlcywgaG91cnMsIGRheXMsIG1vbnRocywgb3IgeWVhcnMgaW5jbHVkZWQgaW4gdGhlIEludGVydmFsLCBldmVuIGluIHBhcnQuXG4gICAqIFVubGlrZSB7QGxpbmsgSW50ZXJ2YWwjbGVuZ3RofSB0aGlzIGNvdW50cyBzZWN0aW9ucyBvZiB0aGUgY2FsZW5kYXIsIG5vdCBwZXJpb2RzIG9mIHRpbWUsIGUuZy4gc3BlY2lmeWluZyAnZGF5J1xuICAgKiBhc2tzICd3aGF0IGRhdGVzIGFyZSBpbmNsdWRlZCBpbiB0aGlzIGludGVydmFsPycsIG5vdCAnaG93IG1hbnkgZGF5cyBsb25nIGlzIHRoaXMgaW50ZXJ2YWw/J1xuICAgKiBAcGFyYW0ge3N0cmluZ30gW3VuaXQ9J21pbGxpc2Vjb25kcyddIC0gdGhlIHVuaXQgb2YgdGltZSB0byBjb3VudC5cbiAgICogQHJldHVybiB7bnVtYmVyfVxuICAgKi9cbiAgY291bnQodW5pdCA9IFwibWlsbGlzZWNvbmRzXCIpIHtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZCkgcmV0dXJuIE5hTjtcbiAgICBjb25zdCBzdGFydCA9IHRoaXMuc3RhcnQuc3RhcnRPZih1bml0KSxcbiAgICAgIGVuZCA9IHRoaXMuZW5kLnN0YXJ0T2YodW5pdCk7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoZW5kLmRpZmYoc3RhcnQsIHVuaXQpLmdldCh1bml0KSkgKyAxO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgd2hldGhlciB0aGlzIEludGVydmFsJ3Mgc3RhcnQgYW5kIGVuZCBhcmUgYm90aCBpbiB0aGUgc2FtZSB1bml0IG9mIHRpbWVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVuaXQgLSB0aGUgdW5pdCBvZiB0aW1lIHRvIGNoZWNrIHNhbWVuZXNzIG9uXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBoYXNTYW1lKHVuaXQpIHtcbiAgICByZXR1cm4gdGhpcy5pc1ZhbGlkID8gdGhpcy5pc0VtcHR5KCkgfHwgdGhpcy5lLm1pbnVzKDEpLmhhc1NhbWUodGhpcy5zLCB1bml0KSA6IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB3aGV0aGVyIHRoaXMgSW50ZXJ2YWwgaGFzIHRoZSBzYW1lIHN0YXJ0IGFuZCBlbmQgRGF0ZVRpbWVzLlxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgaXNFbXB0eSgpIHtcbiAgICByZXR1cm4gdGhpcy5zLnZhbHVlT2YoKSA9PT0gdGhpcy5lLnZhbHVlT2YoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gd2hldGhlciB0aGlzIEludGVydmFsJ3Mgc3RhcnQgaXMgYWZ0ZXIgdGhlIHNwZWNpZmllZCBEYXRlVGltZS5cbiAgICogQHBhcmFtIHtEYXRlVGltZX0gZGF0ZVRpbWVcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIGlzQWZ0ZXIoZGF0ZVRpbWUpIHtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiB0aGlzLnMgPiBkYXRlVGltZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gd2hldGhlciB0aGlzIEludGVydmFsJ3MgZW5kIGlzIGJlZm9yZSB0aGUgc3BlY2lmaWVkIERhdGVUaW1lLlxuICAgKiBAcGFyYW0ge0RhdGVUaW1lfSBkYXRlVGltZVxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgaXNCZWZvcmUoZGF0ZVRpbWUpIHtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiB0aGlzLmUgPD0gZGF0ZVRpbWU7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHdoZXRoZXIgdGhpcyBJbnRlcnZhbCBjb250YWlucyB0aGUgc3BlY2lmaWVkIERhdGVUaW1lLlxuICAgKiBAcGFyYW0ge0RhdGVUaW1lfSBkYXRlVGltZVxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgY29udGFpbnMoZGF0ZVRpbWUpIHtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiB0aGlzLnMgPD0gZGF0ZVRpbWUgJiYgdGhpcy5lID4gZGF0ZVRpbWU7XG4gIH1cblxuICAvKipcbiAgICogXCJTZXRzXCIgdGhlIHN0YXJ0IGFuZC9vciBlbmQgZGF0ZXMuIFJldHVybnMgYSBuZXdseS1jb25zdHJ1Y3RlZCBJbnRlcnZhbC5cbiAgICogQHBhcmFtIHtPYmplY3R9IHZhbHVlcyAtIHRoZSB2YWx1ZXMgdG8gc2V0XG4gICAqIEBwYXJhbSB7RGF0ZVRpbWV9IHZhbHVlcy5zdGFydCAtIHRoZSBzdGFydGluZyBEYXRlVGltZVxuICAgKiBAcGFyYW0ge0RhdGVUaW1lfSB2YWx1ZXMuZW5kIC0gdGhlIGVuZGluZyBEYXRlVGltZVxuICAgKiBAcmV0dXJuIHtJbnRlcnZhbH1cbiAgICovXG4gIHNldCh7IHN0YXJ0LCBlbmQgfSA9IHt9KSB7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWQpIHJldHVybiB0aGlzO1xuICAgIHJldHVybiBJbnRlcnZhbC5mcm9tRGF0ZVRpbWVzKHN0YXJ0IHx8IHRoaXMucywgZW5kIHx8IHRoaXMuZSk7XG4gIH1cblxuICAvKipcbiAgICogU3BsaXQgdGhpcyBJbnRlcnZhbCBhdCBlYWNoIG9mIHRoZSBzcGVjaWZpZWQgRGF0ZVRpbWVzXG4gICAqIEBwYXJhbSB7Li4uRGF0ZVRpbWV9IGRhdGVUaW1lcyAtIHRoZSB1bml0IG9mIHRpbWUgdG8gY291bnQuXG4gICAqIEByZXR1cm4ge0FycmF5fVxuICAgKi9cbiAgc3BsaXRBdCguLi5kYXRlVGltZXMpIHtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZCkgcmV0dXJuIFtdO1xuICAgIGNvbnN0IHNvcnRlZCA9IGRhdGVUaW1lc1xuICAgICAgICAubWFwKGZyaWVuZGx5RGF0ZVRpbWUpXG4gICAgICAgIC5maWx0ZXIoKGQpID0+IHRoaXMuY29udGFpbnMoZCkpXG4gICAgICAgIC5zb3J0KCksXG4gICAgICByZXN1bHRzID0gW107XG4gICAgbGV0IHsgcyB9ID0gdGhpcyxcbiAgICAgIGkgPSAwO1xuXG4gICAgd2hpbGUgKHMgPCB0aGlzLmUpIHtcbiAgICAgIGNvbnN0IGFkZGVkID0gc29ydGVkW2ldIHx8IHRoaXMuZSxcbiAgICAgICAgbmV4dCA9ICthZGRlZCA+ICt0aGlzLmUgPyB0aGlzLmUgOiBhZGRlZDtcbiAgICAgIHJlc3VsdHMucHVzaChJbnRlcnZhbC5mcm9tRGF0ZVRpbWVzKHMsIG5leHQpKTtcbiAgICAgIHMgPSBuZXh0O1xuICAgICAgaSArPSAxO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHRzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNwbGl0IHRoaXMgSW50ZXJ2YWwgaW50byBzbWFsbGVyIEludGVydmFscywgZWFjaCBvZiB0aGUgc3BlY2lmaWVkIGxlbmd0aC5cbiAgICogTGVmdCBvdmVyIHRpbWUgaXMgZ3JvdXBlZCBpbnRvIGEgc21hbGxlciBpbnRlcnZhbFxuICAgKiBAcGFyYW0ge0R1cmF0aW9ufE9iamVjdHxudW1iZXJ9IGR1cmF0aW9uIC0gVGhlIGxlbmd0aCBvZiBlYWNoIHJlc3VsdGluZyBpbnRlcnZhbC5cbiAgICogQHJldHVybiB7QXJyYXl9XG4gICAqL1xuICBzcGxpdEJ5KGR1cmF0aW9uKSB7XG4gICAgY29uc3QgZHVyID0gRHVyYXRpb24uZnJvbUR1cmF0aW9uTGlrZShkdXJhdGlvbik7XG5cbiAgICBpZiAoIXRoaXMuaXNWYWxpZCB8fCAhZHVyLmlzVmFsaWQgfHwgZHVyLmFzKFwibWlsbGlzZWNvbmRzXCIpID09PSAwKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgbGV0IHsgcyB9ID0gdGhpcyxcbiAgICAgIGlkeCA9IDEsXG4gICAgICBuZXh0O1xuXG4gICAgY29uc3QgcmVzdWx0cyA9IFtdO1xuICAgIHdoaWxlIChzIDwgdGhpcy5lKSB7XG4gICAgICBjb25zdCBhZGRlZCA9IHRoaXMuc3RhcnQucGx1cyhkdXIubWFwVW5pdHMoKHgpID0+IHggKiBpZHgpKTtcbiAgICAgIG5leHQgPSArYWRkZWQgPiArdGhpcy5lID8gdGhpcy5lIDogYWRkZWQ7XG4gICAgICByZXN1bHRzLnB1c2goSW50ZXJ2YWwuZnJvbURhdGVUaW1lcyhzLCBuZXh0KSk7XG4gICAgICBzID0gbmV4dDtcbiAgICAgIGlkeCArPSAxO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHRzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNwbGl0IHRoaXMgSW50ZXJ2YWwgaW50byB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBzbWFsbGVyIGludGVydmFscy5cbiAgICogQHBhcmFtIHtudW1iZXJ9IG51bWJlck9mUGFydHMgLSBUaGUgbnVtYmVyIG9mIEludGVydmFscyB0byBkaXZpZGUgdGhlIEludGVydmFsIGludG8uXG4gICAqIEByZXR1cm4ge0FycmF5fVxuICAgKi9cbiAgZGl2aWRlRXF1YWxseShudW1iZXJPZlBhcnRzKSB7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWQpIHJldHVybiBbXTtcbiAgICByZXR1cm4gdGhpcy5zcGxpdEJ5KHRoaXMubGVuZ3RoKCkgLyBudW1iZXJPZlBhcnRzKS5zbGljZSgwLCBudW1iZXJPZlBhcnRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gd2hldGhlciB0aGlzIEludGVydmFsIG92ZXJsYXBzIHdpdGggdGhlIHNwZWNpZmllZCBJbnRlcnZhbFxuICAgKiBAcGFyYW0ge0ludGVydmFsfSBvdGhlclxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgb3ZlcmxhcHMob3RoZXIpIHtcbiAgICByZXR1cm4gdGhpcy5lID4gb3RoZXIucyAmJiB0aGlzLnMgPCBvdGhlci5lO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB3aGV0aGVyIHRoaXMgSW50ZXJ2YWwncyBlbmQgaXMgYWRqYWNlbnQgdG8gdGhlIHNwZWNpZmllZCBJbnRlcnZhbCdzIHN0YXJ0LlxuICAgKiBAcGFyYW0ge0ludGVydmFsfSBvdGhlclxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgYWJ1dHNTdGFydChvdGhlcikge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuICt0aGlzLmUgPT09ICtvdGhlci5zO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB3aGV0aGVyIHRoaXMgSW50ZXJ2YWwncyBzdGFydCBpcyBhZGphY2VudCB0byB0aGUgc3BlY2lmaWVkIEludGVydmFsJ3MgZW5kLlxuICAgKiBAcGFyYW0ge0ludGVydmFsfSBvdGhlclxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgYWJ1dHNFbmQob3RoZXIpIHtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiArb3RoZXIuZSA9PT0gK3RoaXMucztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gd2hldGhlciB0aGlzIEludGVydmFsIGVuZ3VsZnMgdGhlIHN0YXJ0IGFuZCBlbmQgb2YgdGhlIHNwZWNpZmllZCBJbnRlcnZhbC5cbiAgICogQHBhcmFtIHtJbnRlcnZhbH0gb3RoZXJcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIGVuZ3VsZnMob3RoZXIpIHtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiB0aGlzLnMgPD0gb3RoZXIucyAmJiB0aGlzLmUgPj0gb3RoZXIuZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gd2hldGhlciB0aGlzIEludGVydmFsIGhhcyB0aGUgc2FtZSBzdGFydCBhbmQgZW5kIGFzIHRoZSBzcGVjaWZpZWQgSW50ZXJ2YWwuXG4gICAqIEBwYXJhbSB7SW50ZXJ2YWx9IG90aGVyXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBlcXVhbHMob3RoZXIpIHtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZCB8fCAhb3RoZXIuaXNWYWxpZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnMuZXF1YWxzKG90aGVyLnMpICYmIHRoaXMuZS5lcXVhbHMob3RoZXIuZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGFuIEludGVydmFsIHJlcHJlc2VudGluZyB0aGUgaW50ZXJzZWN0aW9uIG9mIHRoaXMgSW50ZXJ2YWwgYW5kIHRoZSBzcGVjaWZpZWQgSW50ZXJ2YWwuXG4gICAqIFNwZWNpZmljYWxseSwgdGhlIHJlc3VsdGluZyBJbnRlcnZhbCBoYXMgdGhlIG1heGltdW0gc3RhcnQgdGltZSBhbmQgdGhlIG1pbmltdW0gZW5kIHRpbWUgb2YgdGhlIHR3byBJbnRlcnZhbHMuXG4gICAqIFJldHVybnMgbnVsbCBpZiB0aGUgaW50ZXJzZWN0aW9uIGlzIGVtcHR5LCBtZWFuaW5nLCB0aGUgaW50ZXJ2YWxzIGRvbid0IGludGVyc2VjdC5cbiAgICogQHBhcmFtIHtJbnRlcnZhbH0gb3RoZXJcbiAgICogQHJldHVybiB7SW50ZXJ2YWx9XG4gICAqL1xuICBpbnRlcnNlY3Rpb24ob3RoZXIpIHtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZCkgcmV0dXJuIHRoaXM7XG4gICAgY29uc3QgcyA9IHRoaXMucyA+IG90aGVyLnMgPyB0aGlzLnMgOiBvdGhlci5zLFxuICAgICAgZSA9IHRoaXMuZSA8IG90aGVyLmUgPyB0aGlzLmUgOiBvdGhlci5lO1xuXG4gICAgaWYgKHMgPj0gZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBJbnRlcnZhbC5mcm9tRGF0ZVRpbWVzKHMsIGUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYW4gSW50ZXJ2YWwgcmVwcmVzZW50aW5nIHRoZSB1bmlvbiBvZiB0aGlzIEludGVydmFsIGFuZCB0aGUgc3BlY2lmaWVkIEludGVydmFsLlxuICAgKiBTcGVjaWZpY2FsbHksIHRoZSByZXN1bHRpbmcgSW50ZXJ2YWwgaGFzIHRoZSBtaW5pbXVtIHN0YXJ0IHRpbWUgYW5kIHRoZSBtYXhpbXVtIGVuZCB0aW1lIG9mIHRoZSB0d28gSW50ZXJ2YWxzLlxuICAgKiBAcGFyYW0ge0ludGVydmFsfSBvdGhlclxuICAgKiBAcmV0dXJuIHtJbnRlcnZhbH1cbiAgICovXG4gIHVuaW9uKG90aGVyKSB7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWQpIHJldHVybiB0aGlzO1xuICAgIGNvbnN0IHMgPSB0aGlzLnMgPCBvdGhlci5zID8gdGhpcy5zIDogb3RoZXIucyxcbiAgICAgIGUgPSB0aGlzLmUgPiBvdGhlci5lID8gdGhpcy5lIDogb3RoZXIuZTtcbiAgICByZXR1cm4gSW50ZXJ2YWwuZnJvbURhdGVUaW1lcyhzLCBlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXJnZSBhbiBhcnJheSBvZiBJbnRlcnZhbHMgaW50byBhIGVxdWl2YWxlbnQgbWluaW1hbCBzZXQgb2YgSW50ZXJ2YWxzLlxuICAgKiBDb21iaW5lcyBvdmVybGFwcGluZyBhbmQgYWRqYWNlbnQgSW50ZXJ2YWxzLlxuICAgKiBAcGFyYW0ge0FycmF5fSBpbnRlcnZhbHNcbiAgICogQHJldHVybiB7QXJyYXl9XG4gICAqL1xuICBzdGF0aWMgbWVyZ2UoaW50ZXJ2YWxzKSB7XG4gICAgY29uc3QgW2ZvdW5kLCBmaW5hbF0gPSBpbnRlcnZhbHNcbiAgICAgIC5zb3J0KChhLCBiKSA9PiBhLnMgLSBiLnMpXG4gICAgICAucmVkdWNlKFxuICAgICAgICAoW3NvZmFyLCBjdXJyZW50XSwgaXRlbSkgPT4ge1xuICAgICAgICAgIGlmICghY3VycmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIFtzb2ZhciwgaXRlbV07XG4gICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50Lm92ZXJsYXBzKGl0ZW0pIHx8IGN1cnJlbnQuYWJ1dHNTdGFydChpdGVtKSkge1xuICAgICAgICAgICAgcmV0dXJuIFtzb2ZhciwgY3VycmVudC51bmlvbihpdGVtKV07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBbc29mYXIuY29uY2F0KFtjdXJyZW50XSksIGl0ZW1dO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgW1tdLCBudWxsXVxuICAgICAgKTtcbiAgICBpZiAoZmluYWwpIHtcbiAgICAgIGZvdW5kLnB1c2goZmluYWwpO1xuICAgIH1cbiAgICByZXR1cm4gZm91bmQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGFuIGFycmF5IG9mIEludGVydmFscyByZXByZXNlbnRpbmcgdGhlIHNwYW5zIG9mIHRpbWUgdGhhdCBvbmx5IGFwcGVhciBpbiBvbmUgb2YgdGhlIHNwZWNpZmllZCBJbnRlcnZhbHMuXG4gICAqIEBwYXJhbSB7QXJyYXl9IGludGVydmFsc1xuICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICovXG4gIHN0YXRpYyB4b3IoaW50ZXJ2YWxzKSB7XG4gICAgbGV0IHN0YXJ0ID0gbnVsbCxcbiAgICAgIGN1cnJlbnRDb3VudCA9IDA7XG4gICAgY29uc3QgcmVzdWx0cyA9IFtdLFxuICAgICAgZW5kcyA9IGludGVydmFscy5tYXAoKGkpID0+IFtcbiAgICAgICAgeyB0aW1lOiBpLnMsIHR5cGU6IFwic1wiIH0sXG4gICAgICAgIHsgdGltZTogaS5lLCB0eXBlOiBcImVcIiB9LFxuICAgICAgXSksXG4gICAgICBmbGF0dGVuZWQgPSBBcnJheS5wcm90b3R5cGUuY29uY2F0KC4uLmVuZHMpLFxuICAgICAgYXJyID0gZmxhdHRlbmVkLnNvcnQoKGEsIGIpID0+IGEudGltZSAtIGIudGltZSk7XG5cbiAgICBmb3IgKGNvbnN0IGkgb2YgYXJyKSB7XG4gICAgICBjdXJyZW50Q291bnQgKz0gaS50eXBlID09PSBcInNcIiA/IDEgOiAtMTtcblxuICAgICAgaWYgKGN1cnJlbnRDb3VudCA9PT0gMSkge1xuICAgICAgICBzdGFydCA9IGkudGltZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChzdGFydCAmJiArc3RhcnQgIT09ICtpLnRpbWUpIHtcbiAgICAgICAgICByZXN1bHRzLnB1c2goSW50ZXJ2YWwuZnJvbURhdGVUaW1lcyhzdGFydCwgaS50aW1lKSk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGFydCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIEludGVydmFsLm1lcmdlKHJlc3VsdHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhbiBJbnRlcnZhbCByZXByZXNlbnRpbmcgdGhlIHNwYW4gb2YgdGltZSBpbiB0aGlzIEludGVydmFsIHRoYXQgZG9lc24ndCBvdmVybGFwIHdpdGggYW55IG9mIHRoZSBzcGVjaWZpZWQgSW50ZXJ2YWxzLlxuICAgKiBAcGFyYW0gey4uLkludGVydmFsfSBpbnRlcnZhbHNcbiAgICogQHJldHVybiB7QXJyYXl9XG4gICAqL1xuICBkaWZmZXJlbmNlKC4uLmludGVydmFscykge1xuICAgIHJldHVybiBJbnRlcnZhbC54b3IoW3RoaXNdLmNvbmNhdChpbnRlcnZhbHMpKVxuICAgICAgLm1hcCgoaSkgPT4gdGhpcy5pbnRlcnNlY3Rpb24oaSkpXG4gICAgICAuZmlsdGVyKChpKSA9PiBpICYmICFpLmlzRW1wdHkoKSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIEludGVydmFsIGFwcHJvcHJpYXRlIGZvciBkZWJ1Z2dpbmcuXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICovXG4gIHRvU3RyaW5nKCkge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkKSByZXR1cm4gSU5WQUxJRCQxO1xuICAgIHJldHVybiBgWyR7dGhpcy5zLnRvSVNPKCl9IOKAkyAke3RoaXMuZS50b0lTTygpfSlgO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gSVNPIDg2MDEtY29tcGxpYW50IHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIEludGVydmFsLlxuICAgKiBAc2VlIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0lTT184NjAxI1RpbWVfaW50ZXJ2YWxzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIC0gVGhlIHNhbWUgb3B0aW9ucyBhcyB7QGxpbmsgRGF0ZVRpbWUjdG9JU099XG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICovXG4gIHRvSVNPKG9wdHMpIHtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZCkgcmV0dXJuIElOVkFMSUQkMTtcbiAgICByZXR1cm4gYCR7dGhpcy5zLnRvSVNPKG9wdHMpfS8ke3RoaXMuZS50b0lTTyhvcHRzKX1gO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gSVNPIDg2MDEtY29tcGxpYW50IHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBkYXRlIG9mIHRoaXMgSW50ZXJ2YWwuXG4gICAqIFRoZSB0aW1lIGNvbXBvbmVudHMgYXJlIGlnbm9yZWQuXG4gICAqIEBzZWUgaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSVNPXzg2MDEjVGltZV9pbnRlcnZhbHNcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cbiAgdG9JU09EYXRlKCkge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkKSByZXR1cm4gSU5WQUxJRCQxO1xuICAgIHJldHVybiBgJHt0aGlzLnMudG9JU09EYXRlKCl9LyR7dGhpcy5lLnRvSVNPRGF0ZSgpfWA7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBJU08gODYwMS1jb21wbGlhbnQgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRpbWUgb2YgdGhpcyBJbnRlcnZhbC5cbiAgICogVGhlIGRhdGUgY29tcG9uZW50cyBhcmUgaWdub3JlZC5cbiAgICogQHNlZSBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fODYwMSNUaW1lX2ludGVydmFsc1xuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0cyAtIFRoZSBzYW1lIG9wdGlvbnMgYXMge0BsaW5rIERhdGVUaW1lI3RvSVNPfVxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuICB0b0lTT1RpbWUob3B0cykge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkKSByZXR1cm4gSU5WQUxJRCQxO1xuICAgIHJldHVybiBgJHt0aGlzLnMudG9JU09UaW1lKG9wdHMpfS8ke3RoaXMuZS50b0lTT1RpbWUob3B0cyl9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgSW50ZXJ2YWwgZm9ybWF0dGVkIGFjY29yZGluZyB0byB0aGUgc3BlY2lmaWVkIGZvcm1hdCBzdHJpbmcuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlRm9ybWF0IC0gdGhlIGZvcm1hdCBzdHJpbmcuIFRoaXMgc3RyaW5nIGZvcm1hdHMgdGhlIHN0YXJ0IGFuZCBlbmQgdGltZS4gU2VlIHtAbGluayBEYXRlVGltZSN0b0Zvcm1hdH0gZm9yIGRldGFpbHMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIC0gb3B0aW9uc1xuICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdHMuc2VwYXJhdG9yID0gICcg4oCTICddIC0gYSBzZXBhcmF0b3IgdG8gcGxhY2UgYmV0d2VlbiB0aGUgc3RhcnQgYW5kIGVuZCByZXByZXNlbnRhdGlvbnNcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cbiAgdG9Gb3JtYXQoZGF0ZUZvcm1hdCwgeyBzZXBhcmF0b3IgPSBcIiDigJMgXCIgfSA9IHt9KSB7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWQpIHJldHVybiBJTlZBTElEJDE7XG4gICAgcmV0dXJuIGAke3RoaXMucy50b0Zvcm1hdChkYXRlRm9ybWF0KX0ke3NlcGFyYXRvcn0ke3RoaXMuZS50b0Zvcm1hdChkYXRlRm9ybWF0KX1gO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhIER1cmF0aW9uIHJlcHJlc2VudGluZyB0aGUgdGltZSBzcGFubmVkIGJ5IHRoaXMgaW50ZXJ2YWwuXG4gICAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfSBbdW5pdD1bJ21pbGxpc2Vjb25kcyddXSAtIHRoZSB1bml0IG9yIHVuaXRzIChzdWNoIGFzICdob3Vycycgb3IgJ2RheXMnKSB0byBpbmNsdWRlIGluIHRoZSBkdXJhdGlvbi5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdHMgLSBvcHRpb25zIHRoYXQgYWZmZWN0IHRoZSBjcmVhdGlvbiBvZiB0aGUgRHVyYXRpb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRzLmNvbnZlcnNpb25BY2N1cmFjeT0nY2FzdWFsJ10gLSB0aGUgY29udmVyc2lvbiBzeXN0ZW0gdG8gdXNlXG4gICAqIEBleGFtcGxlIEludGVydmFsLmZyb21EYXRlVGltZXMoZHQxLCBkdDIpLnRvRHVyYXRpb24oKS50b09iamVjdCgpIC8vPT4geyBtaWxsaXNlY29uZHM6IDg4NDg5MjU3IH1cbiAgICogQGV4YW1wbGUgSW50ZXJ2YWwuZnJvbURhdGVUaW1lcyhkdDEsIGR0MikudG9EdXJhdGlvbignZGF5cycpLnRvT2JqZWN0KCkgLy89PiB7IGRheXM6IDEuMDI0MTgxMjE1Mjc3Nzc3OCB9XG4gICAqIEBleGFtcGxlIEludGVydmFsLmZyb21EYXRlVGltZXMoZHQxLCBkdDIpLnRvRHVyYXRpb24oWydob3VycycsICdtaW51dGVzJ10pLnRvT2JqZWN0KCkgLy89PiB7IGhvdXJzOiAyNCwgbWludXRlczogMzQuODIwOTUgfVxuICAgKiBAZXhhbXBsZSBJbnRlcnZhbC5mcm9tRGF0ZVRpbWVzKGR0MSwgZHQyKS50b0R1cmF0aW9uKFsnaG91cnMnLCAnbWludXRlcycsICdzZWNvbmRzJ10pLnRvT2JqZWN0KCkgLy89PiB7IGhvdXJzOiAyNCwgbWludXRlczogMzQsIHNlY29uZHM6IDQ5LjI1NyB9XG4gICAqIEBleGFtcGxlIEludGVydmFsLmZyb21EYXRlVGltZXMoZHQxLCBkdDIpLnRvRHVyYXRpb24oJ3NlY29uZHMnKS50b09iamVjdCgpIC8vPT4geyBzZWNvbmRzOiA4ODQ4OS4yNTcgfVxuICAgKiBAcmV0dXJuIHtEdXJhdGlvbn1cbiAgICovXG4gIHRvRHVyYXRpb24odW5pdCwgb3B0cykge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkKSB7XG4gICAgICByZXR1cm4gRHVyYXRpb24uaW52YWxpZCh0aGlzLmludmFsaWRSZWFzb24pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5lLmRpZmYodGhpcy5zLCB1bml0LCBvcHRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSdW4gbWFwRm4gb24gdGhlIGludGVydmFsIHN0YXJ0IGFuZCBlbmQsIHJldHVybmluZyBhIG5ldyBJbnRlcnZhbCBmcm9tIHRoZSByZXN1bHRpbmcgRGF0ZVRpbWVzXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG1hcEZuXG4gICAqIEByZXR1cm4ge0ludGVydmFsfVxuICAgKiBAZXhhbXBsZSBJbnRlcnZhbC5mcm9tRGF0ZVRpbWVzKGR0MSwgZHQyKS5tYXBFbmRwb2ludHMoZW5kcG9pbnQgPT4gZW5kcG9pbnQudG9VVEMoKSlcbiAgICogQGV4YW1wbGUgSW50ZXJ2YWwuZnJvbURhdGVUaW1lcyhkdDEsIGR0MikubWFwRW5kcG9pbnRzKGVuZHBvaW50ID0+IGVuZHBvaW50LnBsdXMoeyBob3VyczogMiB9KSlcbiAgICovXG4gIG1hcEVuZHBvaW50cyhtYXBGbikge1xuICAgIHJldHVybiBJbnRlcnZhbC5mcm9tRGF0ZVRpbWVzKG1hcEZuKHRoaXMucyksIG1hcEZuKHRoaXMuZSkpO1xuICB9XG59XG5cbi8qKlxuICogVGhlIEluZm8gY2xhc3MgY29udGFpbnMgc3RhdGljIG1ldGhvZHMgZm9yIHJldHJpZXZpbmcgZ2VuZXJhbCB0aW1lIGFuZCBkYXRlIHJlbGF0ZWQgZGF0YS4gRm9yIGV4YW1wbGUsIGl0IGhhcyBtZXRob2RzIGZvciBmaW5kaW5nIG91dCBpZiBhIHRpbWUgem9uZSBoYXMgYSBEU1QsIGZvciBsaXN0aW5nIHRoZSBtb250aHMgaW4gYW55IHN1cHBvcnRlZCBsb2NhbGUsIGFuZCBmb3IgZGlzY292ZXJpbmcgd2hpY2ggb2YgTHV4b24gZmVhdHVyZXMgYXJlIGF2YWlsYWJsZSBpbiB0aGUgY3VycmVudCBlbnZpcm9ubWVudC5cbiAqL1xuY2xhc3MgSW5mbyB7XG4gIC8qKlxuICAgKiBSZXR1cm4gd2hldGhlciB0aGUgc3BlY2lmaWVkIHpvbmUgY29udGFpbnMgYSBEU1QuXG4gICAqIEBwYXJhbSB7c3RyaW5nfFpvbmV9IFt6b25lPSdsb2NhbCddIC0gWm9uZSB0byBjaGVjay4gRGVmYXVsdHMgdG8gdGhlIGVudmlyb25tZW50J3MgbG9jYWwgem9uZS5cbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIHN0YXRpYyBoYXNEU1Qoem9uZSA9IFNldHRpbmdzLmRlZmF1bHRab25lKSB7XG4gICAgY29uc3QgcHJvdG8gPSBEYXRlVGltZS5ub3coKS5zZXRab25lKHpvbmUpLnNldCh7IG1vbnRoOiAxMiB9KTtcblxuICAgIHJldHVybiAhem9uZS5pc1VuaXZlcnNhbCAmJiBwcm90by5vZmZzZXQgIT09IHByb3RvLnNldCh7IG1vbnRoOiA2IH0pLm9mZnNldDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gd2hldGhlciB0aGUgc3BlY2lmaWVkIHpvbmUgaXMgYSB2YWxpZCBJQU5BIHNwZWNpZmllci5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHpvbmUgLSBab25lIHRvIGNoZWNrXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBzdGF0aWMgaXNWYWxpZElBTkFab25lKHpvbmUpIHtcbiAgICByZXR1cm4gSUFOQVpvbmUuaXNWYWxpZFpvbmUoem9uZSk7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgdGhlIGlucHV0IGludG8gYSB7QGxpbmsgWm9uZX0gaW5zdGFuY2UuXG4gICAqXG4gICAqICogSWYgYGlucHV0YCBpcyBhbHJlYWR5IGEgWm9uZSBpbnN0YW5jZSwgaXQgaXMgcmV0dXJuZWQgdW5jaGFuZ2VkLlxuICAgKiAqIElmIGBpbnB1dGAgaXMgYSBzdHJpbmcgY29udGFpbmluZyBhIHZhbGlkIHRpbWUgem9uZSBuYW1lLCBhIFpvbmUgaW5zdGFuY2VcbiAgICogICB3aXRoIHRoYXQgbmFtZSBpcyByZXR1cm5lZC5cbiAgICogKiBJZiBgaW5wdXRgIGlzIGEgc3RyaW5nIHRoYXQgZG9lc24ndCByZWZlciB0byBhIGtub3duIHRpbWUgem9uZSwgYSBab25lXG4gICAqICAgaW5zdGFuY2Ugd2l0aCB7QGxpbmsgWm9uZSNpc1ZhbGlkfSA9PSBmYWxzZSBpcyByZXR1cm5lZC5cbiAgICogKiBJZiBgaW5wdXQgaXMgYSBudW1iZXIsIGEgWm9uZSBpbnN0YW5jZSB3aXRoIHRoZSBzcGVjaWZpZWQgZml4ZWQgb2Zmc2V0XG4gICAqICAgaW4gbWludXRlcyBpcyByZXR1cm5lZC5cbiAgICogKiBJZiBgaW5wdXRgIGlzIGBudWxsYCBvciBgdW5kZWZpbmVkYCwgdGhlIGRlZmF1bHQgem9uZSBpcyByZXR1cm5lZC5cbiAgICogQHBhcmFtIHtzdHJpbmd8Wm9uZXxudW1iZXJ9IFtpbnB1dF0gLSB0aGUgdmFsdWUgdG8gYmUgY29udmVydGVkXG4gICAqIEByZXR1cm4ge1pvbmV9XG4gICAqL1xuICBzdGF0aWMgbm9ybWFsaXplWm9uZShpbnB1dCkge1xuICAgIHJldHVybiBub3JtYWxpemVab25lKGlucHV0LCBTZXR0aW5ncy5kZWZhdWx0Wm9uZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGFuIGFycmF5IG9mIHN0YW5kYWxvbmUgbW9udGggbmFtZXMuXG4gICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvRGF0ZVRpbWVGb3JtYXRcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtsZW5ndGg9J2xvbmcnXSAtIHRoZSBsZW5ndGggb2YgdGhlIG1vbnRoIHJlcHJlc2VudGF0aW9uLCBzdWNoIGFzIFwibnVtZXJpY1wiLCBcIjItZGlnaXRcIiwgXCJuYXJyb3dcIiwgXCJzaG9ydFwiLCBcImxvbmdcIlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0cyAtIG9wdGlvbnNcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRzLmxvY2FsZV0gLSB0aGUgbG9jYWxlIGNvZGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRzLm51bWJlcmluZ1N5c3RlbT1udWxsXSAtIHRoZSBudW1iZXJpbmcgc3lzdGVtXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0cy5sb2NPYmo9bnVsbF0gLSBhbiBleGlzdGluZyBsb2NhbGUgb2JqZWN0IHRvIHVzZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdHMub3V0cHV0Q2FsZW5kYXI9J2dyZWdvcnknXSAtIHRoZSBjYWxlbmRhclxuICAgKiBAZXhhbXBsZSBJbmZvLm1vbnRocygpWzBdIC8vPT4gJ0phbnVhcnknXG4gICAqIEBleGFtcGxlIEluZm8ubW9udGhzKCdzaG9ydCcpWzBdIC8vPT4gJ0phbidcbiAgICogQGV4YW1wbGUgSW5mby5tb250aHMoJ251bWVyaWMnKVswXSAvLz0+ICcxJ1xuICAgKiBAZXhhbXBsZSBJbmZvLm1vbnRocygnc2hvcnQnLCB7IGxvY2FsZTogJ2ZyLUNBJyB9IClbMF0gLy89PiAnamFudi4nXG4gICAqIEBleGFtcGxlIEluZm8ubW9udGhzKCdudW1lcmljJywgeyBsb2NhbGU6ICdhcicgfSlbMF0gLy89PiAn2aEnXG4gICAqIEBleGFtcGxlIEluZm8ubW9udGhzKCdsb25nJywgeyBvdXRwdXRDYWxlbmRhcjogJ2lzbGFtaWMnIH0pWzBdIC8vPT4gJ1JhYmnKuyBJJ1xuICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICovXG4gIHN0YXRpYyBtb250aHMoXG4gICAgbGVuZ3RoID0gXCJsb25nXCIsXG4gICAgeyBsb2NhbGUgPSBudWxsLCBudW1iZXJpbmdTeXN0ZW0gPSBudWxsLCBsb2NPYmogPSBudWxsLCBvdXRwdXRDYWxlbmRhciA9IFwiZ3JlZ29yeVwiIH0gPSB7fVxuICApIHtcbiAgICByZXR1cm4gKGxvY09iaiB8fCBMb2NhbGUuY3JlYXRlKGxvY2FsZSwgbnVtYmVyaW5nU3lzdGVtLCBvdXRwdXRDYWxlbmRhcikpLm1vbnRocyhsZW5ndGgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhbiBhcnJheSBvZiBmb3JtYXQgbW9udGggbmFtZXMuXG4gICAqIEZvcm1hdCBtb250aHMgZGlmZmVyIGZyb20gc3RhbmRhbG9uZSBtb250aHMgaW4gdGhhdCB0aGV5J3JlIG1lYW50IHRvIGFwcGVhciBuZXh0IHRvIHRoZSBkYXkgb2YgdGhlIG1vbnRoLiBJbiBzb21lIGxhbmd1YWdlcywgdGhhdFxuICAgKiBjaGFuZ2VzIHRoZSBzdHJpbmcuXG4gICAqIFNlZSB7QGxpbmsgSW5mbyNtb250aHN9XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbbGVuZ3RoPSdsb25nJ10gLSB0aGUgbGVuZ3RoIG9mIHRoZSBtb250aCByZXByZXNlbnRhdGlvbiwgc3VjaCBhcyBcIm51bWVyaWNcIiwgXCIyLWRpZ2l0XCIsIFwibmFycm93XCIsIFwic2hvcnRcIiwgXCJsb25nXCJcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdHMgLSBvcHRpb25zXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0cy5sb2NhbGVdIC0gdGhlIGxvY2FsZSBjb2RlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0cy5udW1iZXJpbmdTeXN0ZW09bnVsbF0gLSB0aGUgbnVtYmVyaW5nIHN5c3RlbVxuICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdHMubG9jT2JqPW51bGxdIC0gYW4gZXhpc3RpbmcgbG9jYWxlIG9iamVjdCB0byB1c2VcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRzLm91dHB1dENhbGVuZGFyPSdncmVnb3J5J10gLSB0aGUgY2FsZW5kYXJcbiAgICogQHJldHVybiB7QXJyYXl9XG4gICAqL1xuICBzdGF0aWMgbW9udGhzRm9ybWF0KFxuICAgIGxlbmd0aCA9IFwibG9uZ1wiLFxuICAgIHsgbG9jYWxlID0gbnVsbCwgbnVtYmVyaW5nU3lzdGVtID0gbnVsbCwgbG9jT2JqID0gbnVsbCwgb3V0cHV0Q2FsZW5kYXIgPSBcImdyZWdvcnlcIiB9ID0ge31cbiAgKSB7XG4gICAgcmV0dXJuIChsb2NPYmogfHwgTG9jYWxlLmNyZWF0ZShsb2NhbGUsIG51bWJlcmluZ1N5c3RlbSwgb3V0cHV0Q2FsZW5kYXIpKS5tb250aHMobGVuZ3RoLCB0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYW4gYXJyYXkgb2Ygc3RhbmRhbG9uZSB3ZWVrIG5hbWVzLlxuICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0RhdGVUaW1lRm9ybWF0XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbbGVuZ3RoPSdsb25nJ10gLSB0aGUgbGVuZ3RoIG9mIHRoZSB3ZWVrZGF5IHJlcHJlc2VudGF0aW9uLCBzdWNoIGFzIFwibmFycm93XCIsIFwic2hvcnRcIiwgXCJsb25nXCIuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIC0gb3B0aW9uc1xuICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdHMubG9jYWxlXSAtIHRoZSBsb2NhbGUgY29kZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdHMubnVtYmVyaW5nU3lzdGVtPW51bGxdIC0gdGhlIG51bWJlcmluZyBzeXN0ZW1cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRzLmxvY09iaj1udWxsXSAtIGFuIGV4aXN0aW5nIGxvY2FsZSBvYmplY3QgdG8gdXNlXG4gICAqIEBleGFtcGxlIEluZm8ud2Vla2RheXMoKVswXSAvLz0+ICdNb25kYXknXG4gICAqIEBleGFtcGxlIEluZm8ud2Vla2RheXMoJ3Nob3J0JylbMF0gLy89PiAnTW9uJ1xuICAgKiBAZXhhbXBsZSBJbmZvLndlZWtkYXlzKCdzaG9ydCcsIHsgbG9jYWxlOiAnZnItQ0EnIH0pWzBdIC8vPT4gJ2x1bi4nXG4gICAqIEBleGFtcGxlIEluZm8ud2Vla2RheXMoJ3Nob3J0JywgeyBsb2NhbGU6ICdhcicgfSlbMF0gLy89PiAn2KfZhNin2KvZhtmK2YYnXG4gICAqIEByZXR1cm4ge0FycmF5fVxuICAgKi9cbiAgc3RhdGljIHdlZWtkYXlzKGxlbmd0aCA9IFwibG9uZ1wiLCB7IGxvY2FsZSA9IG51bGwsIG51bWJlcmluZ1N5c3RlbSA9IG51bGwsIGxvY09iaiA9IG51bGwgfSA9IHt9KSB7XG4gICAgcmV0dXJuIChsb2NPYmogfHwgTG9jYWxlLmNyZWF0ZShsb2NhbGUsIG51bWJlcmluZ1N5c3RlbSwgbnVsbCkpLndlZWtkYXlzKGxlbmd0aCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGFuIGFycmF5IG9mIGZvcm1hdCB3ZWVrIG5hbWVzLlxuICAgKiBGb3JtYXQgd2Vla2RheXMgZGlmZmVyIGZyb20gc3RhbmRhbG9uZSB3ZWVrZGF5cyBpbiB0aGF0IHRoZXkncmUgbWVhbnQgdG8gYXBwZWFyIG5leHQgdG8gbW9yZSBkYXRlIGluZm9ybWF0aW9uLiBJbiBzb21lIGxhbmd1YWdlcywgdGhhdFxuICAgKiBjaGFuZ2VzIHRoZSBzdHJpbmcuXG4gICAqIFNlZSB7QGxpbmsgSW5mbyN3ZWVrZGF5c31cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtsZW5ndGg9J2xvbmcnXSAtIHRoZSBsZW5ndGggb2YgdGhlIG1vbnRoIHJlcHJlc2VudGF0aW9uLCBzdWNoIGFzIFwibmFycm93XCIsIFwic2hvcnRcIiwgXCJsb25nXCIuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIC0gb3B0aW9uc1xuICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdHMubG9jYWxlPW51bGxdIC0gdGhlIGxvY2FsZSBjb2RlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0cy5udW1iZXJpbmdTeXN0ZW09bnVsbF0gLSB0aGUgbnVtYmVyaW5nIHN5c3RlbVxuICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdHMubG9jT2JqPW51bGxdIC0gYW4gZXhpc3RpbmcgbG9jYWxlIG9iamVjdCB0byB1c2VcbiAgICogQHJldHVybiB7QXJyYXl9XG4gICAqL1xuICBzdGF0aWMgd2Vla2RheXNGb3JtYXQoXG4gICAgbGVuZ3RoID0gXCJsb25nXCIsXG4gICAgeyBsb2NhbGUgPSBudWxsLCBudW1iZXJpbmdTeXN0ZW0gPSBudWxsLCBsb2NPYmogPSBudWxsIH0gPSB7fVxuICApIHtcbiAgICByZXR1cm4gKGxvY09iaiB8fCBMb2NhbGUuY3JlYXRlKGxvY2FsZSwgbnVtYmVyaW5nU3lzdGVtLCBudWxsKSkud2Vla2RheXMobGVuZ3RoLCB0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYW4gYXJyYXkgb2YgbWVyaWRpZW1zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0cyAtIG9wdGlvbnNcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRzLmxvY2FsZV0gLSB0aGUgbG9jYWxlIGNvZGVcbiAgICogQGV4YW1wbGUgSW5mby5tZXJpZGllbXMoKSAvLz0+IFsgJ0FNJywgJ1BNJyBdXG4gICAqIEBleGFtcGxlIEluZm8ubWVyaWRpZW1zKHsgbG9jYWxlOiAnbXknIH0pIC8vPT4gWyAn4YCU4YC24YCU4YCA4YC6JywgJ+GAiuGAlOGAsScgXVxuICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICovXG4gIHN0YXRpYyBtZXJpZGllbXMoeyBsb2NhbGUgPSBudWxsIH0gPSB7fSkge1xuICAgIHJldHVybiBMb2NhbGUuY3JlYXRlKGxvY2FsZSkubWVyaWRpZW1zKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGFuIGFycmF5IG9mIGVyYXMsIHN1Y2ggYXMgWydCQycsICdBRCddLiBUaGUgbG9jYWxlIGNhbiBiZSBzcGVjaWZpZWQsIGJ1dCB0aGUgY2FsZW5kYXIgc3lzdGVtIGlzIGFsd2F5cyBHcmVnb3JpYW4uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbbGVuZ3RoPSdzaG9ydCddIC0gdGhlIGxlbmd0aCBvZiB0aGUgZXJhIHJlcHJlc2VudGF0aW9uLCBzdWNoIGFzIFwic2hvcnRcIiBvciBcImxvbmdcIi5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdHMgLSBvcHRpb25zXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0cy5sb2NhbGVdIC0gdGhlIGxvY2FsZSBjb2RlXG4gICAqIEBleGFtcGxlIEluZm8uZXJhcygpIC8vPT4gWyAnQkMnLCAnQUQnIF1cbiAgICogQGV4YW1wbGUgSW5mby5lcmFzKCdsb25nJykgLy89PiBbICdCZWZvcmUgQ2hyaXN0JywgJ0Fubm8gRG9taW5pJyBdXG4gICAqIEBleGFtcGxlIEluZm8uZXJhcygnbG9uZycsIHsgbG9jYWxlOiAnZnInIH0pIC8vPT4gWyAnYXZhbnQgSsOpc3VzLUNocmlzdCcsICdhcHLDqHMgSsOpc3VzLUNocmlzdCcgXVxuICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICovXG4gIHN0YXRpYyBlcmFzKGxlbmd0aCA9IFwic2hvcnRcIiwgeyBsb2NhbGUgPSBudWxsIH0gPSB7fSkge1xuICAgIHJldHVybiBMb2NhbGUuY3JlYXRlKGxvY2FsZSwgbnVsbCwgXCJncmVnb3J5XCIpLmVyYXMobGVuZ3RoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIHNldCBvZiBhdmFpbGFibGUgZmVhdHVyZXMgaW4gdGhpcyBlbnZpcm9ubWVudC5cbiAgICogU29tZSBmZWF0dXJlcyBvZiBMdXhvbiBhcmUgbm90IGF2YWlsYWJsZSBpbiBhbGwgZW52aXJvbm1lbnRzLiBGb3IgZXhhbXBsZSwgb24gb2xkZXIgYnJvd3NlcnMsIHJlbGF0aXZlIHRpbWUgZm9ybWF0dGluZyBzdXBwb3J0IGlzIG5vdCBhdmFpbGFibGUuIFVzZSB0aGlzIGZ1bmN0aW9uIHRvIGZpZ3VyZSBvdXQgaWYgdGhhdCdzIHRoZSBjYXNlLlxuICAgKiBLZXlzOlxuICAgKiAqIGByZWxhdGl2ZWA6IHdoZXRoZXIgdGhpcyBlbnZpcm9ubWVudCBzdXBwb3J0cyByZWxhdGl2ZSB0aW1lIGZvcm1hdHRpbmdcbiAgICogQGV4YW1wbGUgSW5mby5mZWF0dXJlcygpIC8vPT4geyByZWxhdGl2ZTogZmFsc2UgfVxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBzdGF0aWMgZmVhdHVyZXMoKSB7XG4gICAgcmV0dXJuIHsgcmVsYXRpdmU6IGhhc1JlbGF0aXZlKCkgfTtcbiAgfVxufVxuXG5mdW5jdGlvbiBkYXlEaWZmKGVhcmxpZXIsIGxhdGVyKSB7XG4gIGNvbnN0IHV0Y0RheVN0YXJ0ID0gKGR0KSA9PiBkdC50b1VUQygwLCB7IGtlZXBMb2NhbFRpbWU6IHRydWUgfSkuc3RhcnRPZihcImRheVwiKS52YWx1ZU9mKCksXG4gICAgbXMgPSB1dGNEYXlTdGFydChsYXRlcikgLSB1dGNEYXlTdGFydChlYXJsaWVyKTtcbiAgcmV0dXJuIE1hdGguZmxvb3IoRHVyYXRpb24uZnJvbU1pbGxpcyhtcykuYXMoXCJkYXlzXCIpKTtcbn1cblxuZnVuY3Rpb24gaGlnaE9yZGVyRGlmZnMoY3Vyc29yLCBsYXRlciwgdW5pdHMpIHtcbiAgY29uc3QgZGlmZmVycyA9IFtcbiAgICBbXCJ5ZWFyc1wiLCAoYSwgYikgPT4gYi55ZWFyIC0gYS55ZWFyXSxcbiAgICBbXCJxdWFydGVyc1wiLCAoYSwgYikgPT4gYi5xdWFydGVyIC0gYS5xdWFydGVyXSxcbiAgICBbXCJtb250aHNcIiwgKGEsIGIpID0+IGIubW9udGggLSBhLm1vbnRoICsgKGIueWVhciAtIGEueWVhcikgKiAxMl0sXG4gICAgW1xuICAgICAgXCJ3ZWVrc1wiLFxuICAgICAgKGEsIGIpID0+IHtcbiAgICAgICAgY29uc3QgZGF5cyA9IGRheURpZmYoYSwgYik7XG4gICAgICAgIHJldHVybiAoZGF5cyAtIChkYXlzICUgNykpIC8gNztcbiAgICAgIH0sXG4gICAgXSxcbiAgICBbXCJkYXlzXCIsIGRheURpZmZdLFxuICBdO1xuXG4gIGNvbnN0IHJlc3VsdHMgPSB7fTtcbiAgbGV0IGxvd2VzdE9yZGVyLCBoaWdoV2F0ZXI7XG5cbiAgZm9yIChjb25zdCBbdW5pdCwgZGlmZmVyXSBvZiBkaWZmZXJzKSB7XG4gICAgaWYgKHVuaXRzLmluZGV4T2YodW5pdCkgPj0gMCkge1xuICAgICAgbG93ZXN0T3JkZXIgPSB1bml0O1xuXG4gICAgICBsZXQgZGVsdGEgPSBkaWZmZXIoY3Vyc29yLCBsYXRlcik7XG4gICAgICBoaWdoV2F0ZXIgPSBjdXJzb3IucGx1cyh7IFt1bml0XTogZGVsdGEgfSk7XG5cbiAgICAgIGlmIChoaWdoV2F0ZXIgPiBsYXRlcikge1xuICAgICAgICBjdXJzb3IgPSBjdXJzb3IucGx1cyh7IFt1bml0XTogZGVsdGEgLSAxIH0pO1xuICAgICAgICBkZWx0YSAtPSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3Vyc29yID0gaGlnaFdhdGVyO1xuICAgICAgfVxuXG4gICAgICByZXN1bHRzW3VuaXRdID0gZGVsdGE7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIFtjdXJzb3IsIHJlc3VsdHMsIGhpZ2hXYXRlciwgbG93ZXN0T3JkZXJdO1xufVxuXG5mdW5jdGlvbiBkaWZmIChlYXJsaWVyLCBsYXRlciwgdW5pdHMsIG9wdHMpIHtcbiAgbGV0IFtjdXJzb3IsIHJlc3VsdHMsIGhpZ2hXYXRlciwgbG93ZXN0T3JkZXJdID0gaGlnaE9yZGVyRGlmZnMoZWFybGllciwgbGF0ZXIsIHVuaXRzKTtcblxuICBjb25zdCByZW1haW5pbmdNaWxsaXMgPSBsYXRlciAtIGN1cnNvcjtcblxuICBjb25zdCBsb3dlck9yZGVyVW5pdHMgPSB1bml0cy5maWx0ZXIoXG4gICAgKHUpID0+IFtcImhvdXJzXCIsIFwibWludXRlc1wiLCBcInNlY29uZHNcIiwgXCJtaWxsaXNlY29uZHNcIl0uaW5kZXhPZih1KSA+PSAwXG4gICk7XG5cbiAgaWYgKGxvd2VyT3JkZXJVbml0cy5sZW5ndGggPT09IDApIHtcbiAgICBpZiAoaGlnaFdhdGVyIDwgbGF0ZXIpIHtcbiAgICAgIGhpZ2hXYXRlciA9IGN1cnNvci5wbHVzKHsgW2xvd2VzdE9yZGVyXTogMSB9KTtcbiAgICB9XG5cbiAgICBpZiAoaGlnaFdhdGVyICE9PSBjdXJzb3IpIHtcbiAgICAgIHJlc3VsdHNbbG93ZXN0T3JkZXJdID0gKHJlc3VsdHNbbG93ZXN0T3JkZXJdIHx8IDApICsgcmVtYWluaW5nTWlsbGlzIC8gKGhpZ2hXYXRlciAtIGN1cnNvcik7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZHVyYXRpb24gPSBEdXJhdGlvbi5mcm9tT2JqZWN0KHJlc3VsdHMsIG9wdHMpO1xuXG4gIGlmIChsb3dlck9yZGVyVW5pdHMubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiBEdXJhdGlvbi5mcm9tTWlsbGlzKHJlbWFpbmluZ01pbGxpcywgb3B0cylcbiAgICAgIC5zaGlmdFRvKC4uLmxvd2VyT3JkZXJVbml0cylcbiAgICAgIC5wbHVzKGR1cmF0aW9uKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZHVyYXRpb247XG4gIH1cbn1cblxuY29uc3QgbnVtYmVyaW5nU3lzdGVtcyA9IHtcbiAgYXJhYjogXCJbXFx1MDY2MC1cXHUwNjY5XVwiLFxuICBhcmFiZXh0OiBcIltcXHUwNkYwLVxcdTA2RjldXCIsXG4gIGJhbGk6IFwiW1xcdTFCNTAtXFx1MUI1OV1cIixcbiAgYmVuZzogXCJbXFx1MDlFNi1cXHUwOUVGXVwiLFxuICBkZXZhOiBcIltcXHUwOTY2LVxcdTA5NkZdXCIsXG4gIGZ1bGx3aWRlOiBcIltcXHVGRjEwLVxcdUZGMTldXCIsXG4gIGd1anI6IFwiW1xcdTBBRTYtXFx1MEFFRl1cIixcbiAgaGFuaWRlYzogXCJb44CHfOS4gHzkuox85LiJfOWbm3zkupR85YWtfOS4g3zlhat85LmdXVwiLFxuICBraG1yOiBcIltcXHUxN0UwLVxcdTE3RTldXCIsXG4gIGtuZGE6IFwiW1xcdTBDRTYtXFx1MENFRl1cIixcbiAgbGFvbzogXCJbXFx1MEVEMC1cXHUwRUQ5XVwiLFxuICBsaW1iOiBcIltcXHUxOTQ2LVxcdTE5NEZdXCIsXG4gIG1seW06IFwiW1xcdTBENjYtXFx1MEQ2Rl1cIixcbiAgbW9uZzogXCJbXFx1MTgxMC1cXHUxODE5XVwiLFxuICBteW1yOiBcIltcXHUxMDQwLVxcdTEwNDldXCIsXG4gIG9yeWE6IFwiW1xcdTBCNjYtXFx1MEI2Rl1cIixcbiAgdGFtbGRlYzogXCJbXFx1MEJFNi1cXHUwQkVGXVwiLFxuICB0ZWx1OiBcIltcXHUwQzY2LVxcdTBDNkZdXCIsXG4gIHRoYWk6IFwiW1xcdTBFNTAtXFx1MEU1OV1cIixcbiAgdGlidDogXCJbXFx1MEYyMC1cXHUwRjI5XVwiLFxuICBsYXRuOiBcIlxcXFxkXCIsXG59O1xuXG5jb25zdCBudW1iZXJpbmdTeXN0ZW1zVVRGMTYgPSB7XG4gIGFyYWI6IFsxNjMyLCAxNjQxXSxcbiAgYXJhYmV4dDogWzE3NzYsIDE3ODVdLFxuICBiYWxpOiBbNjk5MiwgNzAwMV0sXG4gIGJlbmc6IFsyNTM0LCAyNTQzXSxcbiAgZGV2YTogWzI0MDYsIDI0MTVdLFxuICBmdWxsd2lkZTogWzY1Mjk2LCA2NTMwM10sXG4gIGd1anI6IFsyNzkwLCAyNzk5XSxcbiAga2htcjogWzYxMTIsIDYxMjFdLFxuICBrbmRhOiBbMzMwMiwgMzMxMV0sXG4gIGxhb286IFszNzkyLCAzODAxXSxcbiAgbGltYjogWzY0NzAsIDY0NzldLFxuICBtbHltOiBbMzQzMCwgMzQzOV0sXG4gIG1vbmc6IFs2MTYwLCA2MTY5XSxcbiAgbXltcjogWzQxNjAsIDQxNjldLFxuICBvcnlhOiBbMjkxOCwgMjkyN10sXG4gIHRhbWxkZWM6IFszMDQ2LCAzMDU1XSxcbiAgdGVsdTogWzMxNzQsIDMxODNdLFxuICB0aGFpOiBbMzY2NCwgMzY3M10sXG4gIHRpYnQ6IFszODcyLCAzODgxXSxcbn07XG5cbmNvbnN0IGhhbmlkZWNDaGFycyA9IG51bWJlcmluZ1N5c3RlbXMuaGFuaWRlYy5yZXBsYWNlKC9bXFxbfFxcXV0vZywgXCJcIikuc3BsaXQoXCJcIik7XG5cbmZ1bmN0aW9uIHBhcnNlRGlnaXRzKHN0cikge1xuICBsZXQgdmFsdWUgPSBwYXJzZUludChzdHIsIDEwKTtcbiAgaWYgKGlzTmFOKHZhbHVlKSkge1xuICAgIHZhbHVlID0gXCJcIjtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgY29kZSA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuXG4gICAgICBpZiAoc3RyW2ldLnNlYXJjaChudW1iZXJpbmdTeXN0ZW1zLmhhbmlkZWMpICE9PSAtMSkge1xuICAgICAgICB2YWx1ZSArPSBoYW5pZGVjQ2hhcnMuaW5kZXhPZihzdHJbaV0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gbnVtYmVyaW5nU3lzdGVtc1VURjE2KSB7XG4gICAgICAgICAgY29uc3QgW21pbiwgbWF4XSA9IG51bWJlcmluZ1N5c3RlbXNVVEYxNltrZXldO1xuICAgICAgICAgIGlmIChjb2RlID49IG1pbiAmJiBjb2RlIDw9IG1heCkge1xuICAgICAgICAgICAgdmFsdWUgKz0gY29kZSAtIG1pbjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHBhcnNlSW50KHZhbHVlLCAxMCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRpZ2l0UmVnZXgoeyBudW1iZXJpbmdTeXN0ZW0gfSwgYXBwZW5kID0gXCJcIikge1xuICByZXR1cm4gbmV3IFJlZ0V4cChgJHtudW1iZXJpbmdTeXN0ZW1zW251bWJlcmluZ1N5c3RlbSB8fCBcImxhdG5cIl19JHthcHBlbmR9YCk7XG59XG5cbmNvbnN0IE1JU1NJTkdfRlRQID0gXCJtaXNzaW5nIEludGwuRGF0ZVRpbWVGb3JtYXQuZm9ybWF0VG9QYXJ0cyBzdXBwb3J0XCI7XG5cbmZ1bmN0aW9uIGludFVuaXQocmVnZXgsIHBvc3QgPSAoaSkgPT4gaSkge1xuICByZXR1cm4geyByZWdleCwgZGVzZXI6IChbc10pID0+IHBvc3QocGFyc2VEaWdpdHMocykpIH07XG59XG5cbmNvbnN0IE5CU1AgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDE2MCk7XG5jb25zdCBzcGFjZU9yTkJTUCA9IGBbICR7TkJTUH1dYDtcbmNvbnN0IHNwYWNlT3JOQlNQUmVnRXhwID0gbmV3IFJlZ0V4cChzcGFjZU9yTkJTUCwgXCJnXCIpO1xuXG5mdW5jdGlvbiBmaXhMaXN0UmVnZXgocykge1xuICAvLyBtYWtlIGRvdHMgb3B0aW9uYWwgYW5kIGFsc28gbWFrZSB0aGVtIGxpdGVyYWxcbiAgLy8gbWFrZSBzcGFjZSBhbmQgbm9uIGJyZWFrYWJsZSBzcGFjZSBjaGFyYWN0ZXJzIGludGVyY2hhbmdlYWJsZVxuICByZXR1cm4gcy5yZXBsYWNlKC9cXC4vZywgXCJcXFxcLj9cIikucmVwbGFjZShzcGFjZU9yTkJTUFJlZ0V4cCwgc3BhY2VPck5CU1ApO1xufVxuXG5mdW5jdGlvbiBzdHJpcEluc2Vuc2l0aXZpdGllcyhzKSB7XG4gIHJldHVybiBzXG4gICAgLnJlcGxhY2UoL1xcLi9nLCBcIlwiKSAvLyBpZ25vcmUgZG90cyB0aGF0IHdlcmUgbWFkZSBvcHRpb25hbFxuICAgIC5yZXBsYWNlKHNwYWNlT3JOQlNQUmVnRXhwLCBcIiBcIikgLy8gaW50ZXJjaGFuZ2Ugc3BhY2UgYW5kIG5ic3BcbiAgICAudG9Mb3dlckNhc2UoKTtcbn1cblxuZnVuY3Rpb24gb25lT2Yoc3RyaW5ncywgc3RhcnRJbmRleCkge1xuICBpZiAoc3RyaW5ncyA9PT0gbnVsbCkge1xuICAgIHJldHVybiBudWxsO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB7XG4gICAgICByZWdleDogUmVnRXhwKHN0cmluZ3MubWFwKGZpeExpc3RSZWdleCkuam9pbihcInxcIikpLFxuICAgICAgZGVzZXI6IChbc10pID0+XG4gICAgICAgIHN0cmluZ3MuZmluZEluZGV4KChpKSA9PiBzdHJpcEluc2Vuc2l0aXZpdGllcyhzKSA9PT0gc3RyaXBJbnNlbnNpdGl2aXRpZXMoaSkpICsgc3RhcnRJbmRleCxcbiAgICB9O1xuICB9XG59XG5cbmZ1bmN0aW9uIG9mZnNldChyZWdleCwgZ3JvdXBzKSB7XG4gIHJldHVybiB7IHJlZ2V4LCBkZXNlcjogKFssIGgsIG1dKSA9PiBzaWduZWRPZmZzZXQoaCwgbSksIGdyb3VwcyB9O1xufVxuXG5mdW5jdGlvbiBzaW1wbGUocmVnZXgpIHtcbiAgcmV0dXJuIHsgcmVnZXgsIGRlc2VyOiAoW3NdKSA9PiBzIH07XG59XG5cbmZ1bmN0aW9uIGVzY2FwZVRva2VuKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZS5yZXBsYWNlKC9bXFwtXFxbXFxde30oKSorPy4sXFxcXFxcXiR8I1xcc10vZywgXCJcXFxcJCZcIik7XG59XG5cbmZ1bmN0aW9uIHVuaXRGb3JUb2tlbih0b2tlbiwgbG9jKSB7XG4gIGNvbnN0IG9uZSA9IGRpZ2l0UmVnZXgobG9jKSxcbiAgICB0d28gPSBkaWdpdFJlZ2V4KGxvYywgXCJ7Mn1cIiksXG4gICAgdGhyZWUgPSBkaWdpdFJlZ2V4KGxvYywgXCJ7M31cIiksXG4gICAgZm91ciA9IGRpZ2l0UmVnZXgobG9jLCBcIns0fVwiKSxcbiAgICBzaXggPSBkaWdpdFJlZ2V4KGxvYywgXCJ7Nn1cIiksXG4gICAgb25lT3JUd28gPSBkaWdpdFJlZ2V4KGxvYywgXCJ7MSwyfVwiKSxcbiAgICBvbmVUb1RocmVlID0gZGlnaXRSZWdleChsb2MsIFwiezEsM31cIiksXG4gICAgb25lVG9TaXggPSBkaWdpdFJlZ2V4KGxvYywgXCJ7MSw2fVwiKSxcbiAgICBvbmVUb05pbmUgPSBkaWdpdFJlZ2V4KGxvYywgXCJ7MSw5fVwiKSxcbiAgICB0d29Ub0ZvdXIgPSBkaWdpdFJlZ2V4KGxvYywgXCJ7Miw0fVwiKSxcbiAgICBmb3VyVG9TaXggPSBkaWdpdFJlZ2V4KGxvYywgXCJ7NCw2fVwiKSxcbiAgICBsaXRlcmFsID0gKHQpID0+ICh7IHJlZ2V4OiBSZWdFeHAoZXNjYXBlVG9rZW4odC52YWwpKSwgZGVzZXI6IChbc10pID0+IHMsIGxpdGVyYWw6IHRydWUgfSksXG4gICAgdW5pdGF0ZSA9ICh0KSA9PiB7XG4gICAgICBpZiAodG9rZW4ubGl0ZXJhbCkge1xuICAgICAgICByZXR1cm4gbGl0ZXJhbCh0KTtcbiAgICAgIH1cbiAgICAgIHN3aXRjaCAodC52YWwpIHtcbiAgICAgICAgLy8gZXJhXG4gICAgICAgIGNhc2UgXCJHXCI6XG4gICAgICAgICAgcmV0dXJuIG9uZU9mKGxvYy5lcmFzKFwic2hvcnRcIiwgZmFsc2UpLCAwKTtcbiAgICAgICAgY2FzZSBcIkdHXCI6XG4gICAgICAgICAgcmV0dXJuIG9uZU9mKGxvYy5lcmFzKFwibG9uZ1wiLCBmYWxzZSksIDApO1xuICAgICAgICAvLyB5ZWFyc1xuICAgICAgICBjYXNlIFwieVwiOlxuICAgICAgICAgIHJldHVybiBpbnRVbml0KG9uZVRvU2l4KTtcbiAgICAgICAgY2FzZSBcInl5XCI6XG4gICAgICAgICAgcmV0dXJuIGludFVuaXQodHdvVG9Gb3VyLCB1bnRydW5jYXRlWWVhcik7XG4gICAgICAgIGNhc2UgXCJ5eXl5XCI6XG4gICAgICAgICAgcmV0dXJuIGludFVuaXQoZm91cik7XG4gICAgICAgIGNhc2UgXCJ5eXl5eVwiOlxuICAgICAgICAgIHJldHVybiBpbnRVbml0KGZvdXJUb1NpeCk7XG4gICAgICAgIGNhc2UgXCJ5eXl5eXlcIjpcbiAgICAgICAgICByZXR1cm4gaW50VW5pdChzaXgpO1xuICAgICAgICAvLyBtb250aHNcbiAgICAgICAgY2FzZSBcIk1cIjpcbiAgICAgICAgICByZXR1cm4gaW50VW5pdChvbmVPclR3byk7XG4gICAgICAgIGNhc2UgXCJNTVwiOlxuICAgICAgICAgIHJldHVybiBpbnRVbml0KHR3byk7XG4gICAgICAgIGNhc2UgXCJNTU1cIjpcbiAgICAgICAgICByZXR1cm4gb25lT2YobG9jLm1vbnRocyhcInNob3J0XCIsIHRydWUsIGZhbHNlKSwgMSk7XG4gICAgICAgIGNhc2UgXCJNTU1NXCI6XG4gICAgICAgICAgcmV0dXJuIG9uZU9mKGxvYy5tb250aHMoXCJsb25nXCIsIHRydWUsIGZhbHNlKSwgMSk7XG4gICAgICAgIGNhc2UgXCJMXCI6XG4gICAgICAgICAgcmV0dXJuIGludFVuaXQob25lT3JUd28pO1xuICAgICAgICBjYXNlIFwiTExcIjpcbiAgICAgICAgICByZXR1cm4gaW50VW5pdCh0d28pO1xuICAgICAgICBjYXNlIFwiTExMXCI6XG4gICAgICAgICAgcmV0dXJuIG9uZU9mKGxvYy5tb250aHMoXCJzaG9ydFwiLCBmYWxzZSwgZmFsc2UpLCAxKTtcbiAgICAgICAgY2FzZSBcIkxMTExcIjpcbiAgICAgICAgICByZXR1cm4gb25lT2YobG9jLm1vbnRocyhcImxvbmdcIiwgZmFsc2UsIGZhbHNlKSwgMSk7XG4gICAgICAgIC8vIGRhdGVzXG4gICAgICAgIGNhc2UgXCJkXCI6XG4gICAgICAgICAgcmV0dXJuIGludFVuaXQob25lT3JUd28pO1xuICAgICAgICBjYXNlIFwiZGRcIjpcbiAgICAgICAgICByZXR1cm4gaW50VW5pdCh0d28pO1xuICAgICAgICAvLyBvcmRpbmFsc1xuICAgICAgICBjYXNlIFwib1wiOlxuICAgICAgICAgIHJldHVybiBpbnRVbml0KG9uZVRvVGhyZWUpO1xuICAgICAgICBjYXNlIFwib29vXCI6XG4gICAgICAgICAgcmV0dXJuIGludFVuaXQodGhyZWUpO1xuICAgICAgICAvLyB0aW1lXG4gICAgICAgIGNhc2UgXCJISFwiOlxuICAgICAgICAgIHJldHVybiBpbnRVbml0KHR3byk7XG4gICAgICAgIGNhc2UgXCJIXCI6XG4gICAgICAgICAgcmV0dXJuIGludFVuaXQob25lT3JUd28pO1xuICAgICAgICBjYXNlIFwiaGhcIjpcbiAgICAgICAgICByZXR1cm4gaW50VW5pdCh0d28pO1xuICAgICAgICBjYXNlIFwiaFwiOlxuICAgICAgICAgIHJldHVybiBpbnRVbml0KG9uZU9yVHdvKTtcbiAgICAgICAgY2FzZSBcIm1tXCI6XG4gICAgICAgICAgcmV0dXJuIGludFVuaXQodHdvKTtcbiAgICAgICAgY2FzZSBcIm1cIjpcbiAgICAgICAgICByZXR1cm4gaW50VW5pdChvbmVPclR3byk7XG4gICAgICAgIGNhc2UgXCJxXCI6XG4gICAgICAgICAgcmV0dXJuIGludFVuaXQob25lT3JUd28pO1xuICAgICAgICBjYXNlIFwicXFcIjpcbiAgICAgICAgICByZXR1cm4gaW50VW5pdCh0d28pO1xuICAgICAgICBjYXNlIFwic1wiOlxuICAgICAgICAgIHJldHVybiBpbnRVbml0KG9uZU9yVHdvKTtcbiAgICAgICAgY2FzZSBcInNzXCI6XG4gICAgICAgICAgcmV0dXJuIGludFVuaXQodHdvKTtcbiAgICAgICAgY2FzZSBcIlNcIjpcbiAgICAgICAgICByZXR1cm4gaW50VW5pdChvbmVUb1RocmVlKTtcbiAgICAgICAgY2FzZSBcIlNTU1wiOlxuICAgICAgICAgIHJldHVybiBpbnRVbml0KHRocmVlKTtcbiAgICAgICAgY2FzZSBcInVcIjpcbiAgICAgICAgICByZXR1cm4gc2ltcGxlKG9uZVRvTmluZSk7XG4gICAgICAgIGNhc2UgXCJ1dVwiOlxuICAgICAgICAgIHJldHVybiBzaW1wbGUob25lT3JUd28pO1xuICAgICAgICBjYXNlIFwidXV1XCI6XG4gICAgICAgICAgcmV0dXJuIGludFVuaXQob25lKTtcbiAgICAgICAgLy8gbWVyaWRpZW1cbiAgICAgICAgY2FzZSBcImFcIjpcbiAgICAgICAgICByZXR1cm4gb25lT2YobG9jLm1lcmlkaWVtcygpLCAwKTtcbiAgICAgICAgLy8gd2Vla1llYXIgKGspXG4gICAgICAgIGNhc2UgXCJra2trXCI6XG4gICAgICAgICAgcmV0dXJuIGludFVuaXQoZm91cik7XG4gICAgICAgIGNhc2UgXCJra1wiOlxuICAgICAgICAgIHJldHVybiBpbnRVbml0KHR3b1RvRm91ciwgdW50cnVuY2F0ZVllYXIpO1xuICAgICAgICAvLyB3ZWVrTnVtYmVyIChXKVxuICAgICAgICBjYXNlIFwiV1wiOlxuICAgICAgICAgIHJldHVybiBpbnRVbml0KG9uZU9yVHdvKTtcbiAgICAgICAgY2FzZSBcIldXXCI6XG4gICAgICAgICAgcmV0dXJuIGludFVuaXQodHdvKTtcbiAgICAgICAgLy8gd2Vla2RheXNcbiAgICAgICAgY2FzZSBcIkVcIjpcbiAgICAgICAgY2FzZSBcImNcIjpcbiAgICAgICAgICByZXR1cm4gaW50VW5pdChvbmUpO1xuICAgICAgICBjYXNlIFwiRUVFXCI6XG4gICAgICAgICAgcmV0dXJuIG9uZU9mKGxvYy53ZWVrZGF5cyhcInNob3J0XCIsIGZhbHNlLCBmYWxzZSksIDEpO1xuICAgICAgICBjYXNlIFwiRUVFRVwiOlxuICAgICAgICAgIHJldHVybiBvbmVPZihsb2Mud2Vla2RheXMoXCJsb25nXCIsIGZhbHNlLCBmYWxzZSksIDEpO1xuICAgICAgICBjYXNlIFwiY2NjXCI6XG4gICAgICAgICAgcmV0dXJuIG9uZU9mKGxvYy53ZWVrZGF5cyhcInNob3J0XCIsIHRydWUsIGZhbHNlKSwgMSk7XG4gICAgICAgIGNhc2UgXCJjY2NjXCI6XG4gICAgICAgICAgcmV0dXJuIG9uZU9mKGxvYy53ZWVrZGF5cyhcImxvbmdcIiwgdHJ1ZSwgZmFsc2UpLCAxKTtcbiAgICAgICAgLy8gb2Zmc2V0L3pvbmVcbiAgICAgICAgY2FzZSBcIlpcIjpcbiAgICAgICAgY2FzZSBcIlpaXCI6XG4gICAgICAgICAgcmV0dXJuIG9mZnNldChuZXcgUmVnRXhwKGAoWystXSR7b25lT3JUd28uc291cmNlfSkoPzo6KCR7dHdvLnNvdXJjZX0pKT9gKSwgMik7XG4gICAgICAgIGNhc2UgXCJaWlpcIjpcbiAgICAgICAgICByZXR1cm4gb2Zmc2V0KG5ldyBSZWdFeHAoYChbKy1dJHtvbmVPclR3by5zb3VyY2V9KSgke3R3by5zb3VyY2V9KT9gKSwgMik7XG4gICAgICAgIC8vIHdlIGRvbid0IHN1cHBvcnQgWlpaWiAoUFNUKSBvciBaWlpaWiAoUGFjaWZpYyBTdGFuZGFyZCBUaW1lKSBpbiBwYXJzaW5nXG4gICAgICAgIC8vIGJlY2F1c2Ugd2UgZG9uJ3QgaGF2ZSBhbnkgd2F5IHRvIGZpZ3VyZSBvdXQgd2hhdCB0aGV5IGFyZVxuICAgICAgICBjYXNlIFwielwiOlxuICAgICAgICAgIHJldHVybiBzaW1wbGUoL1thLXpfKy0vXXsxLDI1Nn0/L2kpO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJldHVybiBsaXRlcmFsKHQpO1xuICAgICAgfVxuICAgIH07XG5cbiAgY29uc3QgdW5pdCA9IHVuaXRhdGUodG9rZW4pIHx8IHtcbiAgICBpbnZhbGlkUmVhc29uOiBNSVNTSU5HX0ZUUCxcbiAgfTtcblxuICB1bml0LnRva2VuID0gdG9rZW47XG5cbiAgcmV0dXJuIHVuaXQ7XG59XG5cbmNvbnN0IHBhcnRUeXBlU3R5bGVUb1Rva2VuVmFsID0ge1xuICB5ZWFyOiB7XG4gICAgXCIyLWRpZ2l0XCI6IFwieXlcIixcbiAgICBudW1lcmljOiBcInl5eXl5XCIsXG4gIH0sXG4gIG1vbnRoOiB7XG4gICAgbnVtZXJpYzogXCJNXCIsXG4gICAgXCIyLWRpZ2l0XCI6IFwiTU1cIixcbiAgICBzaG9ydDogXCJNTU1cIixcbiAgICBsb25nOiBcIk1NTU1cIixcbiAgfSxcbiAgZGF5OiB7XG4gICAgbnVtZXJpYzogXCJkXCIsXG4gICAgXCIyLWRpZ2l0XCI6IFwiZGRcIixcbiAgfSxcbiAgd2Vla2RheToge1xuICAgIHNob3J0OiBcIkVFRVwiLFxuICAgIGxvbmc6IFwiRUVFRVwiLFxuICB9LFxuICBkYXlwZXJpb2Q6IFwiYVwiLFxuICBkYXlQZXJpb2Q6IFwiYVwiLFxuICBob3VyOiB7XG4gICAgbnVtZXJpYzogXCJoXCIsXG4gICAgXCIyLWRpZ2l0XCI6IFwiaGhcIixcbiAgfSxcbiAgbWludXRlOiB7XG4gICAgbnVtZXJpYzogXCJtXCIsXG4gICAgXCIyLWRpZ2l0XCI6IFwibW1cIixcbiAgfSxcbiAgc2Vjb25kOiB7XG4gICAgbnVtZXJpYzogXCJzXCIsXG4gICAgXCIyLWRpZ2l0XCI6IFwic3NcIixcbiAgfSxcbn07XG5cbmZ1bmN0aW9uIHRva2VuRm9yUGFydChwYXJ0LCBsb2NhbGUsIGZvcm1hdE9wdHMpIHtcbiAgY29uc3QgeyB0eXBlLCB2YWx1ZSB9ID0gcGFydDtcblxuICBpZiAodHlwZSA9PT0gXCJsaXRlcmFsXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbGl0ZXJhbDogdHJ1ZSxcbiAgICAgIHZhbDogdmFsdWUsXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0IHN0eWxlID0gZm9ybWF0T3B0c1t0eXBlXTtcblxuICBsZXQgdmFsID0gcGFydFR5cGVTdHlsZVRvVG9rZW5WYWxbdHlwZV07XG4gIGlmICh0eXBlb2YgdmFsID09PSBcIm9iamVjdFwiKSB7XG4gICAgdmFsID0gdmFsW3N0eWxlXTtcbiAgfVxuXG4gIGlmICh2YWwpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbGl0ZXJhbDogZmFsc2UsXG4gICAgICB2YWwsXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkUmVnZXgodW5pdHMpIHtcbiAgY29uc3QgcmUgPSB1bml0cy5tYXAoKHUpID0+IHUucmVnZXgpLnJlZHVjZSgoZiwgcikgPT4gYCR7Zn0oJHtyLnNvdXJjZX0pYCwgXCJcIik7XG4gIHJldHVybiBbYF4ke3JlfSRgLCB1bml0c107XG59XG5cbmZ1bmN0aW9uIG1hdGNoKGlucHV0LCByZWdleCwgaGFuZGxlcnMpIHtcbiAgY29uc3QgbWF0Y2hlcyA9IGlucHV0Lm1hdGNoKHJlZ2V4KTtcblxuICBpZiAobWF0Y2hlcykge1xuICAgIGNvbnN0IGFsbCA9IHt9O1xuICAgIGxldCBtYXRjaEluZGV4ID0gMTtcbiAgICBmb3IgKGNvbnN0IGkgaW4gaGFuZGxlcnMpIHtcbiAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eShoYW5kbGVycywgaSkpIHtcbiAgICAgICAgY29uc3QgaCA9IGhhbmRsZXJzW2ldLFxuICAgICAgICAgIGdyb3VwcyA9IGguZ3JvdXBzID8gaC5ncm91cHMgKyAxIDogMTtcbiAgICAgICAgaWYgKCFoLmxpdGVyYWwgJiYgaC50b2tlbikge1xuICAgICAgICAgIGFsbFtoLnRva2VuLnZhbFswXV0gPSBoLmRlc2VyKG1hdGNoZXMuc2xpY2UobWF0Y2hJbmRleCwgbWF0Y2hJbmRleCArIGdyb3VwcykpO1xuICAgICAgICB9XG4gICAgICAgIG1hdGNoSW5kZXggKz0gZ3JvdXBzO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gW21hdGNoZXMsIGFsbF07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFttYXRjaGVzLCB7fV07XG4gIH1cbn1cblxuZnVuY3Rpb24gZGF0ZVRpbWVGcm9tTWF0Y2hlcyhtYXRjaGVzKSB7XG4gIGNvbnN0IHRvRmllbGQgPSAodG9rZW4pID0+IHtcbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICBjYXNlIFwiU1wiOlxuICAgICAgICByZXR1cm4gXCJtaWxsaXNlY29uZFwiO1xuICAgICAgY2FzZSBcInNcIjpcbiAgICAgICAgcmV0dXJuIFwic2Vjb25kXCI7XG4gICAgICBjYXNlIFwibVwiOlxuICAgICAgICByZXR1cm4gXCJtaW51dGVcIjtcbiAgICAgIGNhc2UgXCJoXCI6XG4gICAgICBjYXNlIFwiSFwiOlxuICAgICAgICByZXR1cm4gXCJob3VyXCI7XG4gICAgICBjYXNlIFwiZFwiOlxuICAgICAgICByZXR1cm4gXCJkYXlcIjtcbiAgICAgIGNhc2UgXCJvXCI6XG4gICAgICAgIHJldHVybiBcIm9yZGluYWxcIjtcbiAgICAgIGNhc2UgXCJMXCI6XG4gICAgICBjYXNlIFwiTVwiOlxuICAgICAgICByZXR1cm4gXCJtb250aFwiO1xuICAgICAgY2FzZSBcInlcIjpcbiAgICAgICAgcmV0dXJuIFwieWVhclwiO1xuICAgICAgY2FzZSBcIkVcIjpcbiAgICAgIGNhc2UgXCJjXCI6XG4gICAgICAgIHJldHVybiBcIndlZWtkYXlcIjtcbiAgICAgIGNhc2UgXCJXXCI6XG4gICAgICAgIHJldHVybiBcIndlZWtOdW1iZXJcIjtcbiAgICAgIGNhc2UgXCJrXCI6XG4gICAgICAgIHJldHVybiBcIndlZWtZZWFyXCI7XG4gICAgICBjYXNlIFwicVwiOlxuICAgICAgICByZXR1cm4gXCJxdWFydGVyXCI7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH07XG5cbiAgbGV0IHpvbmUgPSBudWxsO1xuICBsZXQgc3BlY2lmaWNPZmZzZXQ7XG4gIGlmICghaXNVbmRlZmluZWQobWF0Y2hlcy56KSkge1xuICAgIHpvbmUgPSBJQU5BWm9uZS5jcmVhdGUobWF0Y2hlcy56KTtcbiAgfVxuXG4gIGlmICghaXNVbmRlZmluZWQobWF0Y2hlcy5aKSkge1xuICAgIGlmICghem9uZSkge1xuICAgICAgem9uZSA9IG5ldyBGaXhlZE9mZnNldFpvbmUobWF0Y2hlcy5aKTtcbiAgICB9XG4gICAgc3BlY2lmaWNPZmZzZXQgPSBtYXRjaGVzLlo7XG4gIH1cblxuICBpZiAoIWlzVW5kZWZpbmVkKG1hdGNoZXMucSkpIHtcbiAgICBtYXRjaGVzLk0gPSAobWF0Y2hlcy5xIC0gMSkgKiAzICsgMTtcbiAgfVxuXG4gIGlmICghaXNVbmRlZmluZWQobWF0Y2hlcy5oKSkge1xuICAgIGlmIChtYXRjaGVzLmggPCAxMiAmJiBtYXRjaGVzLmEgPT09IDEpIHtcbiAgICAgIG1hdGNoZXMuaCArPSAxMjtcbiAgICB9IGVsc2UgaWYgKG1hdGNoZXMuaCA9PT0gMTIgJiYgbWF0Y2hlcy5hID09PSAwKSB7XG4gICAgICBtYXRjaGVzLmggPSAwO1xuICAgIH1cbiAgfVxuXG4gIGlmIChtYXRjaGVzLkcgPT09IDAgJiYgbWF0Y2hlcy55KSB7XG4gICAgbWF0Y2hlcy55ID0gLW1hdGNoZXMueTtcbiAgfVxuXG4gIGlmICghaXNVbmRlZmluZWQobWF0Y2hlcy51KSkge1xuICAgIG1hdGNoZXMuUyA9IHBhcnNlTWlsbGlzKG1hdGNoZXMudSk7XG4gIH1cblxuICBjb25zdCB2YWxzID0gT2JqZWN0LmtleXMobWF0Y2hlcykucmVkdWNlKChyLCBrKSA9PiB7XG4gICAgY29uc3QgZiA9IHRvRmllbGQoayk7XG4gICAgaWYgKGYpIHtcbiAgICAgIHJbZl0gPSBtYXRjaGVzW2tdO1xuICAgIH1cblxuICAgIHJldHVybiByO1xuICB9LCB7fSk7XG5cbiAgcmV0dXJuIFt2YWxzLCB6b25lLCBzcGVjaWZpY09mZnNldF07XG59XG5cbmxldCBkdW1teURhdGVUaW1lQ2FjaGUgPSBudWxsO1xuXG5mdW5jdGlvbiBnZXREdW1teURhdGVUaW1lKCkge1xuICBpZiAoIWR1bW15RGF0ZVRpbWVDYWNoZSkge1xuICAgIGR1bW15RGF0ZVRpbWVDYWNoZSA9IERhdGVUaW1lLmZyb21NaWxsaXMoMTU1NTU1NTU1NTU1NSk7XG4gIH1cblxuICByZXR1cm4gZHVtbXlEYXRlVGltZUNhY2hlO1xufVxuXG5mdW5jdGlvbiBtYXliZUV4cGFuZE1hY3JvVG9rZW4odG9rZW4sIGxvY2FsZSkge1xuICBpZiAodG9rZW4ubGl0ZXJhbCkge1xuICAgIHJldHVybiB0b2tlbjtcbiAgfVxuXG4gIGNvbnN0IGZvcm1hdE9wdHMgPSBGb3JtYXR0ZXIubWFjcm9Ub2tlblRvRm9ybWF0T3B0cyh0b2tlbi52YWwpO1xuXG4gIGlmICghZm9ybWF0T3B0cykge1xuICAgIHJldHVybiB0b2tlbjtcbiAgfVxuXG4gIGNvbnN0IGZvcm1hdHRlciA9IEZvcm1hdHRlci5jcmVhdGUobG9jYWxlLCBmb3JtYXRPcHRzKTtcbiAgY29uc3QgcGFydHMgPSBmb3JtYXR0ZXIuZm9ybWF0RGF0ZVRpbWVQYXJ0cyhnZXREdW1teURhdGVUaW1lKCkpO1xuXG4gIGNvbnN0IHRva2VucyA9IHBhcnRzLm1hcCgocCkgPT4gdG9rZW5Gb3JQYXJ0KHAsIGxvY2FsZSwgZm9ybWF0T3B0cykpO1xuXG4gIGlmICh0b2tlbnMuaW5jbHVkZXModW5kZWZpbmVkKSkge1xuICAgIHJldHVybiB0b2tlbjtcbiAgfVxuXG4gIHJldHVybiB0b2tlbnM7XG59XG5cbmZ1bmN0aW9uIGV4cGFuZE1hY3JvVG9rZW5zKHRva2VucywgbG9jYWxlKSB7XG4gIHJldHVybiBBcnJheS5wcm90b3R5cGUuY29uY2F0KC4uLnRva2Vucy5tYXAoKHQpID0+IG1heWJlRXhwYW5kTWFjcm9Ub2tlbih0LCBsb2NhbGUpKSk7XG59XG5cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBleHBsYWluRnJvbVRva2Vucyhsb2NhbGUsIGlucHV0LCBmb3JtYXQpIHtcbiAgY29uc3QgdG9rZW5zID0gZXhwYW5kTWFjcm9Ub2tlbnMoRm9ybWF0dGVyLnBhcnNlRm9ybWF0KGZvcm1hdCksIGxvY2FsZSksXG4gICAgdW5pdHMgPSB0b2tlbnMubWFwKCh0KSA9PiB1bml0Rm9yVG9rZW4odCwgbG9jYWxlKSksXG4gICAgZGlzcXVhbGlmeWluZ1VuaXQgPSB1bml0cy5maW5kKCh0KSA9PiB0LmludmFsaWRSZWFzb24pO1xuXG4gIGlmIChkaXNxdWFsaWZ5aW5nVW5pdCkge1xuICAgIHJldHVybiB7IGlucHV0LCB0b2tlbnMsIGludmFsaWRSZWFzb246IGRpc3F1YWxpZnlpbmdVbml0LmludmFsaWRSZWFzb24gfTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBbcmVnZXhTdHJpbmcsIGhhbmRsZXJzXSA9IGJ1aWxkUmVnZXgodW5pdHMpLFxuICAgICAgcmVnZXggPSBSZWdFeHAocmVnZXhTdHJpbmcsIFwiaVwiKSxcbiAgICAgIFtyYXdNYXRjaGVzLCBtYXRjaGVzXSA9IG1hdGNoKGlucHV0LCByZWdleCwgaGFuZGxlcnMpLFxuICAgICAgW3Jlc3VsdCwgem9uZSwgc3BlY2lmaWNPZmZzZXRdID0gbWF0Y2hlc1xuICAgICAgICA/IGRhdGVUaW1lRnJvbU1hdGNoZXMobWF0Y2hlcylcbiAgICAgICAgOiBbbnVsbCwgbnVsbCwgdW5kZWZpbmVkXTtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkobWF0Y2hlcywgXCJhXCIpICYmIGhhc093blByb3BlcnR5KG1hdGNoZXMsIFwiSFwiKSkge1xuICAgICAgdGhyb3cgbmV3IENvbmZsaWN0aW5nU3BlY2lmaWNhdGlvbkVycm9yKFxuICAgICAgICBcIkNhbid0IGluY2x1ZGUgbWVyaWRpZW0gd2hlbiBzcGVjaWZ5aW5nIDI0LWhvdXIgZm9ybWF0XCJcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiB7IGlucHV0LCB0b2tlbnMsIHJlZ2V4LCByYXdNYXRjaGVzLCBtYXRjaGVzLCByZXN1bHQsIHpvbmUsIHNwZWNpZmljT2Zmc2V0IH07XG4gIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VGcm9tVG9rZW5zKGxvY2FsZSwgaW5wdXQsIGZvcm1hdCkge1xuICBjb25zdCB7IHJlc3VsdCwgem9uZSwgc3BlY2lmaWNPZmZzZXQsIGludmFsaWRSZWFzb24gfSA9IGV4cGxhaW5Gcm9tVG9rZW5zKGxvY2FsZSwgaW5wdXQsIGZvcm1hdCk7XG4gIHJldHVybiBbcmVzdWx0LCB6b25lLCBzcGVjaWZpY09mZnNldCwgaW52YWxpZFJlYXNvbl07XG59XG5cbmNvbnN0IG5vbkxlYXBMYWRkZXIgPSBbMCwgMzEsIDU5LCA5MCwgMTIwLCAxNTEsIDE4MSwgMjEyLCAyNDMsIDI3MywgMzA0LCAzMzRdLFxuICBsZWFwTGFkZGVyID0gWzAsIDMxLCA2MCwgOTEsIDEyMSwgMTUyLCAxODIsIDIxMywgMjQ0LCAyNzQsIDMwNSwgMzM1XTtcblxuZnVuY3Rpb24gdW5pdE91dE9mUmFuZ2UodW5pdCwgdmFsdWUpIHtcbiAgcmV0dXJuIG5ldyBJbnZhbGlkKFxuICAgIFwidW5pdCBvdXQgb2YgcmFuZ2VcIixcbiAgICBgeW91IHNwZWNpZmllZCAke3ZhbHVlfSAob2YgdHlwZSAke3R5cGVvZiB2YWx1ZX0pIGFzIGEgJHt1bml0fSwgd2hpY2ggaXMgaW52YWxpZGBcbiAgKTtcbn1cblxuZnVuY3Rpb24gZGF5T2ZXZWVrKHllYXIsIG1vbnRoLCBkYXkpIHtcbiAgY29uc3QgZCA9IG5ldyBEYXRlKERhdGUuVVRDKHllYXIsIG1vbnRoIC0gMSwgZGF5KSk7XG5cbiAgaWYgKHllYXIgPCAxMDAgJiYgeWVhciA+PSAwKSB7XG4gICAgZC5zZXRVVENGdWxsWWVhcihkLmdldFVUQ0Z1bGxZZWFyKCkgLSAxOTAwKTtcbiAgfVxuXG4gIGNvbnN0IGpzID0gZC5nZXRVVENEYXkoKTtcblxuICByZXR1cm4ganMgPT09IDAgPyA3IDoganM7XG59XG5cbmZ1bmN0aW9uIGNvbXB1dGVPcmRpbmFsKHllYXIsIG1vbnRoLCBkYXkpIHtcbiAgcmV0dXJuIGRheSArIChpc0xlYXBZZWFyKHllYXIpID8gbGVhcExhZGRlciA6IG5vbkxlYXBMYWRkZXIpW21vbnRoIC0gMV07XG59XG5cbmZ1bmN0aW9uIHVuY29tcHV0ZU9yZGluYWwoeWVhciwgb3JkaW5hbCkge1xuICBjb25zdCB0YWJsZSA9IGlzTGVhcFllYXIoeWVhcikgPyBsZWFwTGFkZGVyIDogbm9uTGVhcExhZGRlcixcbiAgICBtb250aDAgPSB0YWJsZS5maW5kSW5kZXgoKGkpID0+IGkgPCBvcmRpbmFsKSxcbiAgICBkYXkgPSBvcmRpbmFsIC0gdGFibGVbbW9udGgwXTtcbiAgcmV0dXJuIHsgbW9udGg6IG1vbnRoMCArIDEsIGRheSB9O1xufVxuXG4vKipcbiAqIEBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gZ3JlZ29yaWFuVG9XZWVrKGdyZWdPYmopIHtcbiAgY29uc3QgeyB5ZWFyLCBtb250aCwgZGF5IH0gPSBncmVnT2JqLFxuICAgIG9yZGluYWwgPSBjb21wdXRlT3JkaW5hbCh5ZWFyLCBtb250aCwgZGF5KSxcbiAgICB3ZWVrZGF5ID0gZGF5T2ZXZWVrKHllYXIsIG1vbnRoLCBkYXkpO1xuXG4gIGxldCB3ZWVrTnVtYmVyID0gTWF0aC5mbG9vcigob3JkaW5hbCAtIHdlZWtkYXkgKyAxMCkgLyA3KSxcbiAgICB3ZWVrWWVhcjtcblxuICBpZiAod2Vla051bWJlciA8IDEpIHtcbiAgICB3ZWVrWWVhciA9IHllYXIgLSAxO1xuICAgIHdlZWtOdW1iZXIgPSB3ZWVrc0luV2Vla1llYXIod2Vla1llYXIpO1xuICB9IGVsc2UgaWYgKHdlZWtOdW1iZXIgPiB3ZWVrc0luV2Vla1llYXIoeWVhcikpIHtcbiAgICB3ZWVrWWVhciA9IHllYXIgKyAxO1xuICAgIHdlZWtOdW1iZXIgPSAxO1xuICB9IGVsc2Uge1xuICAgIHdlZWtZZWFyID0geWVhcjtcbiAgfVxuXG4gIHJldHVybiB7IHdlZWtZZWFyLCB3ZWVrTnVtYmVyLCB3ZWVrZGF5LCAuLi50aW1lT2JqZWN0KGdyZWdPYmopIH07XG59XG5cbmZ1bmN0aW9uIHdlZWtUb0dyZWdvcmlhbih3ZWVrRGF0YSkge1xuICBjb25zdCB7IHdlZWtZZWFyLCB3ZWVrTnVtYmVyLCB3ZWVrZGF5IH0gPSB3ZWVrRGF0YSxcbiAgICB3ZWVrZGF5T2ZKYW40ID0gZGF5T2ZXZWVrKHdlZWtZZWFyLCAxLCA0KSxcbiAgICB5ZWFySW5EYXlzID0gZGF5c0luWWVhcih3ZWVrWWVhcik7XG5cbiAgbGV0IG9yZGluYWwgPSB3ZWVrTnVtYmVyICogNyArIHdlZWtkYXkgLSB3ZWVrZGF5T2ZKYW40IC0gMyxcbiAgICB5ZWFyO1xuXG4gIGlmIChvcmRpbmFsIDwgMSkge1xuICAgIHllYXIgPSB3ZWVrWWVhciAtIDE7XG4gICAgb3JkaW5hbCArPSBkYXlzSW5ZZWFyKHllYXIpO1xuICB9IGVsc2UgaWYgKG9yZGluYWwgPiB5ZWFySW5EYXlzKSB7XG4gICAgeWVhciA9IHdlZWtZZWFyICsgMTtcbiAgICBvcmRpbmFsIC09IGRheXNJblllYXIod2Vla1llYXIpO1xuICB9IGVsc2Uge1xuICAgIHllYXIgPSB3ZWVrWWVhcjtcbiAgfVxuXG4gIGNvbnN0IHsgbW9udGgsIGRheSB9ID0gdW5jb21wdXRlT3JkaW5hbCh5ZWFyLCBvcmRpbmFsKTtcbiAgcmV0dXJuIHsgeWVhciwgbW9udGgsIGRheSwgLi4udGltZU9iamVjdCh3ZWVrRGF0YSkgfTtcbn1cblxuZnVuY3Rpb24gZ3JlZ29yaWFuVG9PcmRpbmFsKGdyZWdEYXRhKSB7XG4gIGNvbnN0IHsgeWVhciwgbW9udGgsIGRheSB9ID0gZ3JlZ0RhdGE7XG4gIGNvbnN0IG9yZGluYWwgPSBjb21wdXRlT3JkaW5hbCh5ZWFyLCBtb250aCwgZGF5KTtcbiAgcmV0dXJuIHsgeWVhciwgb3JkaW5hbCwgLi4udGltZU9iamVjdChncmVnRGF0YSkgfTtcbn1cblxuZnVuY3Rpb24gb3JkaW5hbFRvR3JlZ29yaWFuKG9yZGluYWxEYXRhKSB7XG4gIGNvbnN0IHsgeWVhciwgb3JkaW5hbCB9ID0gb3JkaW5hbERhdGE7XG4gIGNvbnN0IHsgbW9udGgsIGRheSB9ID0gdW5jb21wdXRlT3JkaW5hbCh5ZWFyLCBvcmRpbmFsKTtcbiAgcmV0dXJuIHsgeWVhciwgbW9udGgsIGRheSwgLi4udGltZU9iamVjdChvcmRpbmFsRGF0YSkgfTtcbn1cblxuZnVuY3Rpb24gaGFzSW52YWxpZFdlZWtEYXRhKG9iaikge1xuICBjb25zdCB2YWxpZFllYXIgPSBpc0ludGVnZXIob2JqLndlZWtZZWFyKSxcbiAgICB2YWxpZFdlZWsgPSBpbnRlZ2VyQmV0d2VlbihvYmoud2Vla051bWJlciwgMSwgd2Vla3NJbldlZWtZZWFyKG9iai53ZWVrWWVhcikpLFxuICAgIHZhbGlkV2Vla2RheSA9IGludGVnZXJCZXR3ZWVuKG9iai53ZWVrZGF5LCAxLCA3KTtcblxuICBpZiAoIXZhbGlkWWVhcikge1xuICAgIHJldHVybiB1bml0T3V0T2ZSYW5nZShcIndlZWtZZWFyXCIsIG9iai53ZWVrWWVhcik7XG4gIH0gZWxzZSBpZiAoIXZhbGlkV2Vlaykge1xuICAgIHJldHVybiB1bml0T3V0T2ZSYW5nZShcIndlZWtcIiwgb2JqLndlZWspO1xuICB9IGVsc2UgaWYgKCF2YWxpZFdlZWtkYXkpIHtcbiAgICByZXR1cm4gdW5pdE91dE9mUmFuZ2UoXCJ3ZWVrZGF5XCIsIG9iai53ZWVrZGF5KTtcbiAgfSBlbHNlIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gaGFzSW52YWxpZE9yZGluYWxEYXRhKG9iaikge1xuICBjb25zdCB2YWxpZFllYXIgPSBpc0ludGVnZXIob2JqLnllYXIpLFxuICAgIHZhbGlkT3JkaW5hbCA9IGludGVnZXJCZXR3ZWVuKG9iai5vcmRpbmFsLCAxLCBkYXlzSW5ZZWFyKG9iai55ZWFyKSk7XG5cbiAgaWYgKCF2YWxpZFllYXIpIHtcbiAgICByZXR1cm4gdW5pdE91dE9mUmFuZ2UoXCJ5ZWFyXCIsIG9iai55ZWFyKTtcbiAgfSBlbHNlIGlmICghdmFsaWRPcmRpbmFsKSB7XG4gICAgcmV0dXJuIHVuaXRPdXRPZlJhbmdlKFwib3JkaW5hbFwiLCBvYmoub3JkaW5hbCk7XG4gIH0gZWxzZSByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGhhc0ludmFsaWRHcmVnb3JpYW5EYXRhKG9iaikge1xuICBjb25zdCB2YWxpZFllYXIgPSBpc0ludGVnZXIob2JqLnllYXIpLFxuICAgIHZhbGlkTW9udGggPSBpbnRlZ2VyQmV0d2VlbihvYmoubW9udGgsIDEsIDEyKSxcbiAgICB2YWxpZERheSA9IGludGVnZXJCZXR3ZWVuKG9iai5kYXksIDEsIGRheXNJbk1vbnRoKG9iai55ZWFyLCBvYmoubW9udGgpKTtcblxuICBpZiAoIXZhbGlkWWVhcikge1xuICAgIHJldHVybiB1bml0T3V0T2ZSYW5nZShcInllYXJcIiwgb2JqLnllYXIpO1xuICB9IGVsc2UgaWYgKCF2YWxpZE1vbnRoKSB7XG4gICAgcmV0dXJuIHVuaXRPdXRPZlJhbmdlKFwibW9udGhcIiwgb2JqLm1vbnRoKTtcbiAgfSBlbHNlIGlmICghdmFsaWREYXkpIHtcbiAgICByZXR1cm4gdW5pdE91dE9mUmFuZ2UoXCJkYXlcIiwgb2JqLmRheSk7XG4gIH0gZWxzZSByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGhhc0ludmFsaWRUaW1lRGF0YShvYmopIHtcbiAgY29uc3QgeyBob3VyLCBtaW51dGUsIHNlY29uZCwgbWlsbGlzZWNvbmQgfSA9IG9iajtcbiAgY29uc3QgdmFsaWRIb3VyID1cbiAgICAgIGludGVnZXJCZXR3ZWVuKGhvdXIsIDAsIDIzKSB8fFxuICAgICAgKGhvdXIgPT09IDI0ICYmIG1pbnV0ZSA9PT0gMCAmJiBzZWNvbmQgPT09IDAgJiYgbWlsbGlzZWNvbmQgPT09IDApLFxuICAgIHZhbGlkTWludXRlID0gaW50ZWdlckJldHdlZW4obWludXRlLCAwLCA1OSksXG4gICAgdmFsaWRTZWNvbmQgPSBpbnRlZ2VyQmV0d2VlbihzZWNvbmQsIDAsIDU5KSxcbiAgICB2YWxpZE1pbGxpc2Vjb25kID0gaW50ZWdlckJldHdlZW4obWlsbGlzZWNvbmQsIDAsIDk5OSk7XG5cbiAgaWYgKCF2YWxpZEhvdXIpIHtcbiAgICByZXR1cm4gdW5pdE91dE9mUmFuZ2UoXCJob3VyXCIsIGhvdXIpO1xuICB9IGVsc2UgaWYgKCF2YWxpZE1pbnV0ZSkge1xuICAgIHJldHVybiB1bml0T3V0T2ZSYW5nZShcIm1pbnV0ZVwiLCBtaW51dGUpO1xuICB9IGVsc2UgaWYgKCF2YWxpZFNlY29uZCkge1xuICAgIHJldHVybiB1bml0T3V0T2ZSYW5nZShcInNlY29uZFwiLCBzZWNvbmQpO1xuICB9IGVsc2UgaWYgKCF2YWxpZE1pbGxpc2Vjb25kKSB7XG4gICAgcmV0dXJuIHVuaXRPdXRPZlJhbmdlKFwibWlsbGlzZWNvbmRcIiwgbWlsbGlzZWNvbmQpO1xuICB9IGVsc2UgcmV0dXJuIGZhbHNlO1xufVxuXG5jb25zdCBJTlZBTElEID0gXCJJbnZhbGlkIERhdGVUaW1lXCI7XG5jb25zdCBNQVhfREFURSA9IDguNjRlMTU7XG5cbmZ1bmN0aW9uIHVuc3VwcG9ydGVkWm9uZSh6b25lKSB7XG4gIHJldHVybiBuZXcgSW52YWxpZChcInVuc3VwcG9ydGVkIHpvbmVcIiwgYHRoZSB6b25lIFwiJHt6b25lLm5hbWV9XCIgaXMgbm90IHN1cHBvcnRlZGApO1xufVxuXG4vLyB3ZSBjYWNoZSB3ZWVrIGRhdGEgb24gdGhlIERUIG9iamVjdCBhbmQgdGhpcyBpbnRlcm1lZGlhdGVzIHRoZSBjYWNoZVxuZnVuY3Rpb24gcG9zc2libHlDYWNoZWRXZWVrRGF0YShkdCkge1xuICBpZiAoZHQud2Vla0RhdGEgPT09IG51bGwpIHtcbiAgICBkdC53ZWVrRGF0YSA9IGdyZWdvcmlhblRvV2VlayhkdC5jKTtcbiAgfVxuICByZXR1cm4gZHQud2Vla0RhdGE7XG59XG5cbi8vIGNsb25lIHJlYWxseSBtZWFucywgXCJtYWtlIGEgbmV3IG9iamVjdCB3aXRoIHRoZXNlIG1vZGlmaWNhdGlvbnNcIi4gYWxsIFwic2V0dGVyc1wiIHJlYWxseSB1c2UgdGhpc1xuLy8gdG8gY3JlYXRlIGEgbmV3IG9iamVjdCB3aGlsZSBvbmx5IGNoYW5naW5nIHNvbWUgb2YgdGhlIHByb3BlcnRpZXNcbmZ1bmN0aW9uIGNsb25lKGluc3QsIGFsdHMpIHtcbiAgY29uc3QgY3VycmVudCA9IHtcbiAgICB0czogaW5zdC50cyxcbiAgICB6b25lOiBpbnN0LnpvbmUsXG4gICAgYzogaW5zdC5jLFxuICAgIG86IGluc3QubyxcbiAgICBsb2M6IGluc3QubG9jLFxuICAgIGludmFsaWQ6IGluc3QuaW52YWxpZCxcbiAgfTtcbiAgcmV0dXJuIG5ldyBEYXRlVGltZSh7IC4uLmN1cnJlbnQsIC4uLmFsdHMsIG9sZDogY3VycmVudCB9KTtcbn1cblxuLy8gZmluZCB0aGUgcmlnaHQgb2Zmc2V0IGEgZ2l2ZW4gbG9jYWwgdGltZS4gVGhlIG8gaW5wdXQgaXMgb3VyIGd1ZXNzLCB3aGljaCBkZXRlcm1pbmVzIHdoaWNoXG4vLyBvZmZzZXQgd2UnbGwgcGljayBpbiBhbWJpZ3VvdXMgY2FzZXMgKGUuZy4gdGhlcmUgYXJlIHR3byAzIEFNcyBiL2MgRmFsbGJhY2sgRFNUKVxuZnVuY3Rpb24gZml4T2Zmc2V0KGxvY2FsVFMsIG8sIHR6KSB7XG4gIC8vIE91ciBVVEMgdGltZSBpcyBqdXN0IGEgZ3Vlc3MgYmVjYXVzZSBvdXIgb2Zmc2V0IGlzIGp1c3QgYSBndWVzc1xuICBsZXQgdXRjR3Vlc3MgPSBsb2NhbFRTIC0gbyAqIDYwICogMTAwMDtcblxuICAvLyBUZXN0IHdoZXRoZXIgdGhlIHpvbmUgbWF0Y2hlcyB0aGUgb2Zmc2V0IGZvciB0aGlzIHRzXG4gIGNvbnN0IG8yID0gdHoub2Zmc2V0KHV0Y0d1ZXNzKTtcblxuICAvLyBJZiBzbywgb2Zmc2V0IGRpZG4ndCBjaGFuZ2UgYW5kIHdlJ3JlIGRvbmVcbiAgaWYgKG8gPT09IG8yKSB7XG4gICAgcmV0dXJuIFt1dGNHdWVzcywgb107XG4gIH1cblxuICAvLyBJZiBub3QsIGNoYW5nZSB0aGUgdHMgYnkgdGhlIGRpZmZlcmVuY2UgaW4gdGhlIG9mZnNldFxuICB1dGNHdWVzcyAtPSAobzIgLSBvKSAqIDYwICogMTAwMDtcblxuICAvLyBJZiB0aGF0IGdpdmVzIHVzIHRoZSBsb2NhbCB0aW1lIHdlIHdhbnQsIHdlJ3JlIGRvbmVcbiAgY29uc3QgbzMgPSB0ei5vZmZzZXQodXRjR3Vlc3MpO1xuICBpZiAobzIgPT09IG8zKSB7XG4gICAgcmV0dXJuIFt1dGNHdWVzcywgbzJdO1xuICB9XG5cbiAgLy8gSWYgaXQncyBkaWZmZXJlbnQsIHdlJ3JlIGluIGEgaG9sZSB0aW1lLiBUaGUgb2Zmc2V0IGhhcyBjaGFuZ2VkLCBidXQgdGhlIHdlIGRvbid0IGFkanVzdCB0aGUgdGltZVxuICByZXR1cm4gW2xvY2FsVFMgLSBNYXRoLm1pbihvMiwgbzMpICogNjAgKiAxMDAwLCBNYXRoLm1heChvMiwgbzMpXTtcbn1cblxuLy8gY29udmVydCBhbiBlcG9jaCB0aW1lc3RhbXAgaW50byBhIGNhbGVuZGFyIG9iamVjdCB3aXRoIHRoZSBnaXZlbiBvZmZzZXRcbmZ1bmN0aW9uIHRzVG9PYmoodHMsIG9mZnNldCkge1xuICB0cyArPSBvZmZzZXQgKiA2MCAqIDEwMDA7XG5cbiAgY29uc3QgZCA9IG5ldyBEYXRlKHRzKTtcblxuICByZXR1cm4ge1xuICAgIHllYXI6IGQuZ2V0VVRDRnVsbFllYXIoKSxcbiAgICBtb250aDogZC5nZXRVVENNb250aCgpICsgMSxcbiAgICBkYXk6IGQuZ2V0VVRDRGF0ZSgpLFxuICAgIGhvdXI6IGQuZ2V0VVRDSG91cnMoKSxcbiAgICBtaW51dGU6IGQuZ2V0VVRDTWludXRlcygpLFxuICAgIHNlY29uZDogZC5nZXRVVENTZWNvbmRzKCksXG4gICAgbWlsbGlzZWNvbmQ6IGQuZ2V0VVRDTWlsbGlzZWNvbmRzKCksXG4gIH07XG59XG5cbi8vIGNvbnZlcnQgYSBjYWxlbmRhciBvYmplY3QgdG8gYSBlcG9jaCB0aW1lc3RhbXBcbmZ1bmN0aW9uIG9ialRvVFMob2JqLCBvZmZzZXQsIHpvbmUpIHtcbiAgcmV0dXJuIGZpeE9mZnNldChvYmpUb0xvY2FsVFMob2JqKSwgb2Zmc2V0LCB6b25lKTtcbn1cblxuLy8gY3JlYXRlIGEgbmV3IERUIGluc3RhbmNlIGJ5IGFkZGluZyBhIGR1cmF0aW9uLCBhZGp1c3RpbmcgZm9yIERTVHNcbmZ1bmN0aW9uIGFkanVzdFRpbWUoaW5zdCwgZHVyKSB7XG4gIGNvbnN0IG9QcmUgPSBpbnN0Lm8sXG4gICAgeWVhciA9IGluc3QuYy55ZWFyICsgTWF0aC50cnVuYyhkdXIueWVhcnMpLFxuICAgIG1vbnRoID0gaW5zdC5jLm1vbnRoICsgTWF0aC50cnVuYyhkdXIubW9udGhzKSArIE1hdGgudHJ1bmMoZHVyLnF1YXJ0ZXJzKSAqIDMsXG4gICAgYyA9IHtcbiAgICAgIC4uLmluc3QuYyxcbiAgICAgIHllYXIsXG4gICAgICBtb250aCxcbiAgICAgIGRheTpcbiAgICAgICAgTWF0aC5taW4oaW5zdC5jLmRheSwgZGF5c0luTW9udGgoeWVhciwgbW9udGgpKSArXG4gICAgICAgIE1hdGgudHJ1bmMoZHVyLmRheXMpICtcbiAgICAgICAgTWF0aC50cnVuYyhkdXIud2Vla3MpICogNyxcbiAgICB9LFxuICAgIG1pbGxpc1RvQWRkID0gRHVyYXRpb24uZnJvbU9iamVjdCh7XG4gICAgICB5ZWFyczogZHVyLnllYXJzIC0gTWF0aC50cnVuYyhkdXIueWVhcnMpLFxuICAgICAgcXVhcnRlcnM6IGR1ci5xdWFydGVycyAtIE1hdGgudHJ1bmMoZHVyLnF1YXJ0ZXJzKSxcbiAgICAgIG1vbnRoczogZHVyLm1vbnRocyAtIE1hdGgudHJ1bmMoZHVyLm1vbnRocyksXG4gICAgICB3ZWVrczogZHVyLndlZWtzIC0gTWF0aC50cnVuYyhkdXIud2Vla3MpLFxuICAgICAgZGF5czogZHVyLmRheXMgLSBNYXRoLnRydW5jKGR1ci5kYXlzKSxcbiAgICAgIGhvdXJzOiBkdXIuaG91cnMsXG4gICAgICBtaW51dGVzOiBkdXIubWludXRlcyxcbiAgICAgIHNlY29uZHM6IGR1ci5zZWNvbmRzLFxuICAgICAgbWlsbGlzZWNvbmRzOiBkdXIubWlsbGlzZWNvbmRzLFxuICAgIH0pLmFzKFwibWlsbGlzZWNvbmRzXCIpLFxuICAgIGxvY2FsVFMgPSBvYmpUb0xvY2FsVFMoYyk7XG5cbiAgbGV0IFt0cywgb10gPSBmaXhPZmZzZXQobG9jYWxUUywgb1ByZSwgaW5zdC56b25lKTtcblxuICBpZiAobWlsbGlzVG9BZGQgIT09IDApIHtcbiAgICB0cyArPSBtaWxsaXNUb0FkZDtcbiAgICAvLyB0aGF0IGNvdWxkIGhhdmUgY2hhbmdlZCB0aGUgb2Zmc2V0IGJ5IGdvaW5nIG92ZXIgYSBEU1QsIGJ1dCB3ZSB3YW50IHRvIGtlZXAgdGhlIHRzIHRoZSBzYW1lXG4gICAgbyA9IGluc3Quem9uZS5vZmZzZXQodHMpO1xuICB9XG5cbiAgcmV0dXJuIHsgdHMsIG8gfTtcbn1cblxuLy8gaGVscGVyIHVzZWZ1bCBpbiB0dXJuaW5nIHRoZSByZXN1bHRzIG9mIHBhcnNpbmcgaW50byByZWFsIGRhdGVzXG4vLyBieSBoYW5kbGluZyB0aGUgem9uZSBvcHRpb25zXG5mdW5jdGlvbiBwYXJzZURhdGFUb0RhdGVUaW1lKHBhcnNlZCwgcGFyc2VkWm9uZSwgb3B0cywgZm9ybWF0LCB0ZXh0LCBzcGVjaWZpY09mZnNldCkge1xuICBjb25zdCB7IHNldFpvbmUsIHpvbmUgfSA9IG9wdHM7XG4gIGlmIChwYXJzZWQgJiYgT2JqZWN0LmtleXMocGFyc2VkKS5sZW5ndGggIT09IDApIHtcbiAgICBjb25zdCBpbnRlcnByZXRhdGlvblpvbmUgPSBwYXJzZWRab25lIHx8IHpvbmUsXG4gICAgICBpbnN0ID0gRGF0ZVRpbWUuZnJvbU9iamVjdChwYXJzZWQsIHtcbiAgICAgICAgLi4ub3B0cyxcbiAgICAgICAgem9uZTogaW50ZXJwcmV0YXRpb25ab25lLFxuICAgICAgICBzcGVjaWZpY09mZnNldCxcbiAgICAgIH0pO1xuICAgIHJldHVybiBzZXRab25lID8gaW5zdCA6IGluc3Quc2V0Wm9uZSh6b25lKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gRGF0ZVRpbWUuaW52YWxpZChcbiAgICAgIG5ldyBJbnZhbGlkKFwidW5wYXJzYWJsZVwiLCBgdGhlIGlucHV0IFwiJHt0ZXh0fVwiIGNhbid0IGJlIHBhcnNlZCBhcyAke2Zvcm1hdH1gKVxuICAgICk7XG4gIH1cbn1cblxuLy8gaWYgeW91IHdhbnQgdG8gb3V0cHV0IGEgdGVjaG5pY2FsIGZvcm1hdCAoZS5nLiBSRkMgMjgyMiksIHRoaXMgaGVscGVyXG4vLyBoZWxwcyBoYW5kbGUgdGhlIGRldGFpbHNcbmZ1bmN0aW9uIHRvVGVjaEZvcm1hdChkdCwgZm9ybWF0LCBhbGxvd1ogPSB0cnVlKSB7XG4gIHJldHVybiBkdC5pc1ZhbGlkXG4gICAgPyBGb3JtYXR0ZXIuY3JlYXRlKExvY2FsZS5jcmVhdGUoXCJlbi1VU1wiKSwge1xuICAgICAgYWxsb3daLFxuICAgICAgZm9yY2VTaW1wbGU6IHRydWUsXG4gICAgfSkuZm9ybWF0RGF0ZVRpbWVGcm9tU3RyaW5nKGR0LCBmb3JtYXQpXG4gICAgOiBudWxsO1xufVxuXG5mdW5jdGlvbiB0b0lTT0RhdGUobywgZXh0ZW5kZWQpIHtcbiAgY29uc3QgbG9uZ0Zvcm1hdCA9IG8uYy55ZWFyID4gOTk5OSB8fCBvLmMueWVhciA8IDA7XG4gIGxldCBjID0gXCJcIjtcbiAgaWYgKGxvbmdGb3JtYXQgJiYgby5jLnllYXIgPj0gMCkgYyArPSBcIitcIjtcbiAgYyArPSBwYWRTdGFydChvLmMueWVhciwgbG9uZ0Zvcm1hdCA/IDYgOiA0KTtcblxuICBpZiAoZXh0ZW5kZWQpIHtcbiAgICBjICs9IFwiLVwiO1xuICAgIGMgKz0gcGFkU3RhcnQoby5jLm1vbnRoKTtcbiAgICBjICs9IFwiLVwiO1xuICAgIGMgKz0gcGFkU3RhcnQoby5jLmRheSk7XG4gIH0gZWxzZSB7XG4gICAgYyArPSBwYWRTdGFydChvLmMubW9udGgpO1xuICAgIGMgKz0gcGFkU3RhcnQoby5jLmRheSk7XG4gIH1cbiAgcmV0dXJuIGM7XG59XG5cbmZ1bmN0aW9uIHRvSVNPVGltZShcbiAgbyxcbiAgZXh0ZW5kZWQsXG4gIHN1cHByZXNzU2Vjb25kcyxcbiAgc3VwcHJlc3NNaWxsaXNlY29uZHMsXG4gIGluY2x1ZGVPZmZzZXQsXG4gIGV4dGVuZGVkWm9uZVxuKSB7XG4gIGxldCBjID0gcGFkU3RhcnQoby5jLmhvdXIpO1xuICBpZiAoZXh0ZW5kZWQpIHtcbiAgICBjICs9IFwiOlwiO1xuICAgIGMgKz0gcGFkU3RhcnQoby5jLm1pbnV0ZSk7XG4gICAgaWYgKG8uYy5zZWNvbmQgIT09IDAgfHwgIXN1cHByZXNzU2Vjb25kcykge1xuICAgICAgYyArPSBcIjpcIjtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgYyArPSBwYWRTdGFydChvLmMubWludXRlKTtcbiAgfVxuXG4gIGlmIChvLmMuc2Vjb25kICE9PSAwIHx8ICFzdXBwcmVzc1NlY29uZHMpIHtcbiAgICBjICs9IHBhZFN0YXJ0KG8uYy5zZWNvbmQpO1xuXG4gICAgaWYgKG8uYy5taWxsaXNlY29uZCAhPT0gMCB8fCAhc3VwcHJlc3NNaWxsaXNlY29uZHMpIHtcbiAgICAgIGMgKz0gXCIuXCI7XG4gICAgICBjICs9IHBhZFN0YXJ0KG8uYy5taWxsaXNlY29uZCwgMyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGluY2x1ZGVPZmZzZXQpIHtcbiAgICBpZiAoby5pc09mZnNldEZpeGVkICYmIG8ub2Zmc2V0ID09PSAwICYmICFleHRlbmRlZFpvbmUpIHtcbiAgICAgIGMgKz0gXCJaXCI7XG4gICAgfSBlbHNlIGlmIChvLm8gPCAwKSB7XG4gICAgICBjICs9IFwiLVwiO1xuICAgICAgYyArPSBwYWRTdGFydChNYXRoLnRydW5jKC1vLm8gLyA2MCkpO1xuICAgICAgYyArPSBcIjpcIjtcbiAgICAgIGMgKz0gcGFkU3RhcnQoTWF0aC50cnVuYygtby5vICUgNjApKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYyArPSBcIitcIjtcbiAgICAgIGMgKz0gcGFkU3RhcnQoTWF0aC50cnVuYyhvLm8gLyA2MCkpO1xuICAgICAgYyArPSBcIjpcIjtcbiAgICAgIGMgKz0gcGFkU3RhcnQoTWF0aC50cnVuYyhvLm8gJSA2MCkpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChleHRlbmRlZFpvbmUpIHtcbiAgICBjICs9IFwiW1wiICsgby56b25lLmlhbmFOYW1lICsgXCJdXCI7XG4gIH1cbiAgcmV0dXJuIGM7XG59XG5cbi8vIGRlZmF1bHRzIGZvciB1bnNwZWNpZmllZCB1bml0cyBpbiB0aGUgc3VwcG9ydGVkIGNhbGVuZGFyc1xuY29uc3QgZGVmYXVsdFVuaXRWYWx1ZXMgPSB7XG4gICAgbW9udGg6IDEsXG4gICAgZGF5OiAxLFxuICAgIGhvdXI6IDAsXG4gICAgbWludXRlOiAwLFxuICAgIHNlY29uZDogMCxcbiAgICBtaWxsaXNlY29uZDogMCxcbiAgfSxcbiAgZGVmYXVsdFdlZWtVbml0VmFsdWVzID0ge1xuICAgIHdlZWtOdW1iZXI6IDEsXG4gICAgd2Vla2RheTogMSxcbiAgICBob3VyOiAwLFxuICAgIG1pbnV0ZTogMCxcbiAgICBzZWNvbmQ6IDAsXG4gICAgbWlsbGlzZWNvbmQ6IDAsXG4gIH0sXG4gIGRlZmF1bHRPcmRpbmFsVW5pdFZhbHVlcyA9IHtcbiAgICBvcmRpbmFsOiAxLFxuICAgIGhvdXI6IDAsXG4gICAgbWludXRlOiAwLFxuICAgIHNlY29uZDogMCxcbiAgICBtaWxsaXNlY29uZDogMCxcbiAgfTtcblxuLy8gVW5pdHMgaW4gdGhlIHN1cHBvcnRlZCBjYWxlbmRhcnMsIHNvcnRlZCBieSBiaWduZXNzXG5jb25zdCBvcmRlcmVkVW5pdHMgPSBbXCJ5ZWFyXCIsIFwibW9udGhcIiwgXCJkYXlcIiwgXCJob3VyXCIsIFwibWludXRlXCIsIFwic2Vjb25kXCIsIFwibWlsbGlzZWNvbmRcIl0sXG4gIG9yZGVyZWRXZWVrVW5pdHMgPSBbXG4gICAgXCJ3ZWVrWWVhclwiLFxuICAgIFwid2Vla051bWJlclwiLFxuICAgIFwid2Vla2RheVwiLFxuICAgIFwiaG91clwiLFxuICAgIFwibWludXRlXCIsXG4gICAgXCJzZWNvbmRcIixcbiAgICBcIm1pbGxpc2Vjb25kXCIsXG4gIF0sXG4gIG9yZGVyZWRPcmRpbmFsVW5pdHMgPSBbXCJ5ZWFyXCIsIFwib3JkaW5hbFwiLCBcImhvdXJcIiwgXCJtaW51dGVcIiwgXCJzZWNvbmRcIiwgXCJtaWxsaXNlY29uZFwiXTtcblxuLy8gc3RhbmRhcmRpemUgY2FzZSBhbmQgcGx1cmFsaXR5IGluIHVuaXRzXG5mdW5jdGlvbiBub3JtYWxpemVVbml0KHVuaXQpIHtcbiAgY29uc3Qgbm9ybWFsaXplZCA9IHtcbiAgICB5ZWFyOiBcInllYXJcIixcbiAgICB5ZWFyczogXCJ5ZWFyXCIsXG4gICAgbW9udGg6IFwibW9udGhcIixcbiAgICBtb250aHM6IFwibW9udGhcIixcbiAgICBkYXk6IFwiZGF5XCIsXG4gICAgZGF5czogXCJkYXlcIixcbiAgICBob3VyOiBcImhvdXJcIixcbiAgICBob3VyczogXCJob3VyXCIsXG4gICAgbWludXRlOiBcIm1pbnV0ZVwiLFxuICAgIG1pbnV0ZXM6IFwibWludXRlXCIsXG4gICAgcXVhcnRlcjogXCJxdWFydGVyXCIsXG4gICAgcXVhcnRlcnM6IFwicXVhcnRlclwiLFxuICAgIHNlY29uZDogXCJzZWNvbmRcIixcbiAgICBzZWNvbmRzOiBcInNlY29uZFwiLFxuICAgIG1pbGxpc2Vjb25kOiBcIm1pbGxpc2Vjb25kXCIsXG4gICAgbWlsbGlzZWNvbmRzOiBcIm1pbGxpc2Vjb25kXCIsXG4gICAgd2Vla2RheTogXCJ3ZWVrZGF5XCIsXG4gICAgd2Vla2RheXM6IFwid2Vla2RheVwiLFxuICAgIHdlZWtudW1iZXI6IFwid2Vla051bWJlclwiLFxuICAgIHdlZWtzbnVtYmVyOiBcIndlZWtOdW1iZXJcIixcbiAgICB3ZWVrbnVtYmVyczogXCJ3ZWVrTnVtYmVyXCIsXG4gICAgd2Vla3llYXI6IFwid2Vla1llYXJcIixcbiAgICB3ZWVreWVhcnM6IFwid2Vla1llYXJcIixcbiAgICBvcmRpbmFsOiBcIm9yZGluYWxcIixcbiAgfVt1bml0LnRvTG93ZXJDYXNlKCldO1xuXG4gIGlmICghbm9ybWFsaXplZCkgdGhyb3cgbmV3IEludmFsaWRVbml0RXJyb3IodW5pdCk7XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZWQ7XG59XG5cbi8vIHRoaXMgaXMgYSBkdW1iZWQgZG93biB2ZXJzaW9uIG9mIGZyb21PYmplY3QoKSB0aGF0IHJ1bnMgYWJvdXQgNjAlIGZhc3RlclxuLy8gYnV0IGRvZXNuJ3QgZG8gYW55IHZhbGlkYXRpb24sIG1ha2VzIGEgYnVuY2ggb2YgYXNzdW1wdGlvbnMgYWJvdXQgd2hhdCB1bml0c1xuLy8gYXJlIHByZXNlbnQsIGFuZCBzbyBvbi5cbmZ1bmN0aW9uIHF1aWNrRFQob2JqLCBvcHRzKSB7XG4gIGNvbnN0IHpvbmUgPSBub3JtYWxpemVab25lKG9wdHMuem9uZSwgU2V0dGluZ3MuZGVmYXVsdFpvbmUpLFxuICAgIGxvYyA9IExvY2FsZS5mcm9tT2JqZWN0KG9wdHMpLFxuICAgIHRzTm93ID0gU2V0dGluZ3Mubm93KCk7XG5cbiAgbGV0IHRzLCBvO1xuXG4gIC8vIGFzc3VtZSB3ZSBoYXZlIHRoZSBoaWdoZXItb3JkZXIgdW5pdHNcbiAgaWYgKCFpc1VuZGVmaW5lZChvYmoueWVhcikpIHtcbiAgICBmb3IgKGNvbnN0IHUgb2Ygb3JkZXJlZFVuaXRzKSB7XG4gICAgICBpZiAoaXNVbmRlZmluZWQob2JqW3VdKSkge1xuICAgICAgICBvYmpbdV0gPSBkZWZhdWx0VW5pdFZhbHVlc1t1XTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBpbnZhbGlkID0gaGFzSW52YWxpZEdyZWdvcmlhbkRhdGEob2JqKSB8fCBoYXNJbnZhbGlkVGltZURhdGEob2JqKTtcbiAgICBpZiAoaW52YWxpZCkge1xuICAgICAgcmV0dXJuIERhdGVUaW1lLmludmFsaWQoaW52YWxpZCk7XG4gICAgfVxuXG4gICAgY29uc3Qgb2Zmc2V0UHJvdmlzID0gem9uZS5vZmZzZXQodHNOb3cpO1xuICAgIFt0cywgb10gPSBvYmpUb1RTKG9iaiwgb2Zmc2V0UHJvdmlzLCB6b25lKTtcbiAgfSBlbHNlIHtcbiAgICB0cyA9IHRzTm93O1xuICB9XG5cbiAgcmV0dXJuIG5ldyBEYXRlVGltZSh7IHRzLCB6b25lLCBsb2MsIG8gfSk7XG59XG5cbmZ1bmN0aW9uIGRpZmZSZWxhdGl2ZShzdGFydCwgZW5kLCBvcHRzKSB7XG4gIGNvbnN0IHJvdW5kID0gaXNVbmRlZmluZWQob3B0cy5yb3VuZCkgPyB0cnVlIDogb3B0cy5yb3VuZCxcbiAgICBmb3JtYXQgPSAoYywgdW5pdCkgPT4ge1xuICAgICAgYyA9IHJvdW5kVG8oYywgcm91bmQgfHwgb3B0cy5jYWxlbmRhcnkgPyAwIDogMiwgdHJ1ZSk7XG4gICAgICBjb25zdCBmb3JtYXR0ZXIgPSBlbmQubG9jLmNsb25lKG9wdHMpLnJlbEZvcm1hdHRlcihvcHRzKTtcbiAgICAgIHJldHVybiBmb3JtYXR0ZXIuZm9ybWF0KGMsIHVuaXQpO1xuICAgIH0sXG4gICAgZGlmZmVyID0gKHVuaXQpID0+IHtcbiAgICAgIGlmIChvcHRzLmNhbGVuZGFyeSkge1xuICAgICAgICBpZiAoIWVuZC5oYXNTYW1lKHN0YXJ0LCB1bml0KSkge1xuICAgICAgICAgIHJldHVybiBlbmQuc3RhcnRPZih1bml0KS5kaWZmKHN0YXJ0LnN0YXJ0T2YodW5pdCksIHVuaXQpLmdldCh1bml0KTtcbiAgICAgICAgfSBlbHNlIHJldHVybiAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGVuZC5kaWZmKHN0YXJ0LCB1bml0KS5nZXQodW5pdCk7XG4gICAgICB9XG4gICAgfTtcblxuICBpZiAob3B0cy51bml0KSB7XG4gICAgcmV0dXJuIGZvcm1hdChkaWZmZXIob3B0cy51bml0KSwgb3B0cy51bml0KTtcbiAgfVxuXG4gIGZvciAoY29uc3QgdW5pdCBvZiBvcHRzLnVuaXRzKSB7XG4gICAgY29uc3QgY291bnQgPSBkaWZmZXIodW5pdCk7XG4gICAgaWYgKE1hdGguYWJzKGNvdW50KSA+PSAxKSB7XG4gICAgICByZXR1cm4gZm9ybWF0KGNvdW50LCB1bml0KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZvcm1hdChzdGFydCA+IGVuZCA/IC0wIDogMCwgb3B0cy51bml0c1tvcHRzLnVuaXRzLmxlbmd0aCAtIDFdKTtcbn1cblxuZnVuY3Rpb24gbGFzdE9wdHMoYXJnTGlzdCkge1xuICBsZXQgb3B0cyA9IHt9LFxuICAgIGFyZ3M7XG4gIGlmIChhcmdMaXN0Lmxlbmd0aCA+IDAgJiYgdHlwZW9mIGFyZ0xpc3RbYXJnTGlzdC5sZW5ndGggLSAxXSA9PT0gXCJvYmplY3RcIikge1xuICAgIG9wdHMgPSBhcmdMaXN0W2FyZ0xpc3QubGVuZ3RoIC0gMV07XG4gICAgYXJncyA9IEFycmF5LmZyb20oYXJnTGlzdCkuc2xpY2UoMCwgYXJnTGlzdC5sZW5ndGggLSAxKTtcbiAgfSBlbHNlIHtcbiAgICBhcmdzID0gQXJyYXkuZnJvbShhcmdMaXN0KTtcbiAgfVxuICByZXR1cm4gW29wdHMsIGFyZ3NdO1xufVxuXG4vKipcbiAqIEEgRGF0ZVRpbWUgaXMgYW4gaW1tdXRhYmxlIGRhdGEgc3RydWN0dXJlIHJlcHJlc2VudGluZyBhIHNwZWNpZmljIGRhdGUgYW5kIHRpbWUgYW5kIGFjY29tcGFueWluZyBtZXRob2RzLiBJdCBjb250YWlucyBjbGFzcyBhbmQgaW5zdGFuY2UgbWV0aG9kcyBmb3IgY3JlYXRpbmcsIHBhcnNpbmcsIGludGVycm9nYXRpbmcsIHRyYW5zZm9ybWluZywgYW5kIGZvcm1hdHRpbmcgdGhlbS5cbiAqXG4gKiBBIERhdGVUaW1lIGNvbXByaXNlcyBvZjpcbiAqICogQSB0aW1lc3RhbXAuIEVhY2ggRGF0ZVRpbWUgaW5zdGFuY2UgcmVmZXJzIHRvIGEgc3BlY2lmaWMgbWlsbGlzZWNvbmQgb2YgdGhlIFVuaXggZXBvY2guXG4gKiAqIEEgdGltZSB6b25lLiBFYWNoIGluc3RhbmNlIGlzIGNvbnNpZGVyZWQgaW4gdGhlIGNvbnRleHQgb2YgYSBzcGVjaWZpYyB6b25lIChieSBkZWZhdWx0IHRoZSBsb2NhbCBzeXN0ZW0ncyB6b25lKS5cbiAqICogQ29uZmlndXJhdGlvbiBwcm9wZXJ0aWVzIHRoYXQgZWZmZWN0IGhvdyBvdXRwdXQgc3RyaW5ncyBhcmUgZm9ybWF0dGVkLCBzdWNoIGFzIGBsb2NhbGVgLCBgbnVtYmVyaW5nU3lzdGVtYCwgYW5kIGBvdXRwdXRDYWxlbmRhcmAuXG4gKlxuICogSGVyZSBpcyBhIGJyaWVmIG92ZXJ2aWV3IG9mIHRoZSBtb3N0IGNvbW1vbmx5IHVzZWQgZnVuY3Rpb25hbGl0eSBpdCBwcm92aWRlczpcbiAqXG4gKiAqICoqQ3JlYXRpb24qKjogVG8gY3JlYXRlIGEgRGF0ZVRpbWUgZnJvbSBpdHMgY29tcG9uZW50cywgdXNlIG9uZSBvZiBpdHMgZmFjdG9yeSBjbGFzcyBtZXRob2RzOiB7QGxpbmsgRGF0ZVRpbWUjbG9jYWx9LCB7QGxpbmsgRGF0ZVRpbWUjdXRjfSwgYW5kIChtb3N0IGZsZXhpYmx5KSB7QGxpbmsgRGF0ZVRpbWUjZnJvbU9iamVjdH0uIFRvIGNyZWF0ZSBvbmUgZnJvbSBhIHN0YW5kYXJkIHN0cmluZyBmb3JtYXQsIHVzZSB7QGxpbmsgRGF0ZVRpbWUjZnJvbUlTT30sIHtAbGluayBEYXRlVGltZSNmcm9tSFRUUH0sIGFuZCB7QGxpbmsgRGF0ZVRpbWUjZnJvbVJGQzI4MjJ9LiBUbyBjcmVhdGUgb25lIGZyb20gYSBjdXN0b20gc3RyaW5nIGZvcm1hdCwgdXNlIHtAbGluayBEYXRlVGltZSNmcm9tRm9ybWF0fS4gVG8gY3JlYXRlIG9uZSBmcm9tIGEgbmF0aXZlIEpTIGRhdGUsIHVzZSB7QGxpbmsgRGF0ZVRpbWUjZnJvbUpTRGF0ZX0uXG4gKiAqICoqR3JlZ29yaWFuIGNhbGVuZGFyIGFuZCB0aW1lKio6IFRvIGV4YW1pbmUgdGhlIEdyZWdvcmlhbiBwcm9wZXJ0aWVzIG9mIGEgRGF0ZVRpbWUgaW5kaXZpZHVhbGx5IChpLmUgYXMgb3Bwb3NlZCB0byBjb2xsZWN0aXZlbHkgdGhyb3VnaCB7QGxpbmsgRGF0ZVRpbWUjdG9PYmplY3R9KSwgdXNlIHRoZSB7QGxpbmsgRGF0ZVRpbWUjeWVhcn0sIHtAbGluayBEYXRlVGltZSNtb250aH0sXG4gKiB7QGxpbmsgRGF0ZVRpbWUjZGF5fSwge0BsaW5rIERhdGVUaW1lI2hvdXJ9LCB7QGxpbmsgRGF0ZVRpbWUjbWludXRlfSwge0BsaW5rIERhdGVUaW1lI3NlY29uZH0sIHtAbGluayBEYXRlVGltZSNtaWxsaXNlY29uZH0gYWNjZXNzb3JzLlxuICogKiAqKldlZWsgY2FsZW5kYXIqKjogRm9yIElTTyB3ZWVrIGNhbGVuZGFyIGF0dHJpYnV0ZXMsIHNlZSB0aGUge0BsaW5rIERhdGVUaW1lI3dlZWtZZWFyfSwge0BsaW5rIERhdGVUaW1lI3dlZWtOdW1iZXJ9LCBhbmQge0BsaW5rIERhdGVUaW1lI3dlZWtkYXl9IGFjY2Vzc29ycy5cbiAqICogKipDb25maWd1cmF0aW9uKiogU2VlIHRoZSB7QGxpbmsgRGF0ZVRpbWUjbG9jYWxlfSBhbmQge0BsaW5rIERhdGVUaW1lI251bWJlcmluZ1N5c3RlbX0gYWNjZXNzb3JzLlxuICogKiAqKlRyYW5zZm9ybWF0aW9uKio6IFRvIHRyYW5zZm9ybSB0aGUgRGF0ZVRpbWUgaW50byBvdGhlciBEYXRlVGltZXMsIHVzZSB7QGxpbmsgRGF0ZVRpbWUjc2V0fSwge0BsaW5rIERhdGVUaW1lI3JlY29uZmlndXJlfSwge0BsaW5rIERhdGVUaW1lI3NldFpvbmV9LCB7QGxpbmsgRGF0ZVRpbWUjc2V0TG9jYWxlfSwge0BsaW5rIERhdGVUaW1lLnBsdXN9LCB7QGxpbmsgRGF0ZVRpbWUjbWludXN9LCB7QGxpbmsgRGF0ZVRpbWUjZW5kT2Z9LCB7QGxpbmsgRGF0ZVRpbWUjc3RhcnRPZn0sIHtAbGluayBEYXRlVGltZSN0b1VUQ30sIGFuZCB7QGxpbmsgRGF0ZVRpbWUjdG9Mb2NhbH0uXG4gKiAqICoqT3V0cHV0Kio6IFRvIGNvbnZlcnQgdGhlIERhdGVUaW1lIHRvIG90aGVyIHJlcHJlc2VudGF0aW9ucywgdXNlIHRoZSB7QGxpbmsgRGF0ZVRpbWUjdG9SZWxhdGl2ZX0sIHtAbGluayBEYXRlVGltZSN0b1JlbGF0aXZlQ2FsZW5kYXJ9LCB7QGxpbmsgRGF0ZVRpbWUjdG9KU09OfSwge0BsaW5rIERhdGVUaW1lI3RvSVNPfSwge0BsaW5rIERhdGVUaW1lI3RvSFRUUH0sIHtAbGluayBEYXRlVGltZSN0b09iamVjdH0sIHtAbGluayBEYXRlVGltZSN0b1JGQzI4MjJ9LCB7QGxpbmsgRGF0ZVRpbWUjdG9TdHJpbmd9LCB7QGxpbmsgRGF0ZVRpbWUjdG9Mb2NhbGVTdHJpbmd9LCB7QGxpbmsgRGF0ZVRpbWUjdG9Gb3JtYXR9LCB7QGxpbmsgRGF0ZVRpbWUjdG9NaWxsaXN9IGFuZCB7QGxpbmsgRGF0ZVRpbWUjdG9KU0RhdGV9LlxuICpcbiAqIFRoZXJlJ3MgcGxlbnR5IG90aGVycyBkb2N1bWVudGVkIGJlbG93LiBJbiBhZGRpdGlvbiwgZm9yIG1vcmUgaW5mb3JtYXRpb24gb24gc3VidGxlciB0b3BpY3MgbGlrZSBpbnRlcm5hdGlvbmFsaXphdGlvbiwgdGltZSB6b25lcywgYWx0ZXJuYXRpdmUgY2FsZW5kYXJzLCB2YWxpZGl0eSwgYW5kIHNvIG9uLCBzZWUgdGhlIGV4dGVybmFsIGRvY3VtZW50YXRpb24uXG4gKi9cbmNsYXNzIERhdGVUaW1lIHtcbiAgLyoqXG4gICAqIEBhY2Nlc3MgcHJpdmF0ZVxuICAgKi9cbiAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgY29uc3Qgem9uZSA9IGNvbmZpZy56b25lIHx8IFNldHRpbmdzLmRlZmF1bHRab25lO1xuXG4gICAgbGV0IGludmFsaWQgPVxuICAgICAgY29uZmlnLmludmFsaWQgfHxcbiAgICAgIChOdW1iZXIuaXNOYU4oY29uZmlnLnRzKSA/IG5ldyBJbnZhbGlkKFwiaW52YWxpZCBpbnB1dFwiKSA6IG51bGwpIHx8XG4gICAgICAoIXpvbmUuaXNWYWxpZCA/IHVuc3VwcG9ydGVkWm9uZSh6b25lKSA6IG51bGwpO1xuICAgIC8qKlxuICAgICAqIEBhY2Nlc3MgcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMudHMgPSBpc1VuZGVmaW5lZChjb25maWcudHMpID8gU2V0dGluZ3Mubm93KCkgOiBjb25maWcudHM7XG5cbiAgICBsZXQgYyA9IG51bGwsXG4gICAgICBvID0gbnVsbDtcbiAgICBpZiAoIWludmFsaWQpIHtcbiAgICAgIGNvbnN0IHVuY2hhbmdlZCA9IGNvbmZpZy5vbGQgJiYgY29uZmlnLm9sZC50cyA9PT0gdGhpcy50cyAmJiBjb25maWcub2xkLnpvbmUuZXF1YWxzKHpvbmUpO1xuXG4gICAgICBpZiAodW5jaGFuZ2VkKSB7XG4gICAgICAgIFtjLCBvXSA9IFtjb25maWcub2xkLmMsIGNvbmZpZy5vbGQub107XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBvdCA9IHpvbmUub2Zmc2V0KHRoaXMudHMpO1xuICAgICAgICBjID0gdHNUb09iaih0aGlzLnRzLCBvdCk7XG4gICAgICAgIGludmFsaWQgPSBOdW1iZXIuaXNOYU4oYy55ZWFyKSA/IG5ldyBJbnZhbGlkKFwiaW52YWxpZCBpbnB1dFwiKSA6IG51bGw7XG4gICAgICAgIGMgPSBpbnZhbGlkID8gbnVsbCA6IGM7XG4gICAgICAgIG8gPSBpbnZhbGlkID8gbnVsbCA6IG90O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBhY2Nlc3MgcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMuX3pvbmUgPSB6b25lO1xuICAgIC8qKlxuICAgICAqIEBhY2Nlc3MgcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMubG9jID0gY29uZmlnLmxvYyB8fCBMb2NhbGUuY3JlYXRlKCk7XG4gICAgLyoqXG4gICAgICogQGFjY2VzcyBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5pbnZhbGlkID0gaW52YWxpZDtcbiAgICAvKipcbiAgICAgKiBAYWNjZXNzIHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLndlZWtEYXRhID0gbnVsbDtcbiAgICAvKipcbiAgICAgKiBAYWNjZXNzIHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLmMgPSBjO1xuICAgIC8qKlxuICAgICAqIEBhY2Nlc3MgcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMubyA9IG87XG4gICAgLyoqXG4gICAgICogQGFjY2VzcyBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5pc0x1eG9uRGF0ZVRpbWUgPSB0cnVlO1xuICB9XG5cbiAgLy8gQ09OU1RSVUNUXG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIERhdGVUaW1lIGZvciB0aGUgY3VycmVudCBpbnN0YW50LCBpbiB0aGUgc3lzdGVtJ3MgdGltZSB6b25lLlxuICAgKlxuICAgKiBVc2UgU2V0dGluZ3MgdG8gb3ZlcnJpZGUgdGhlc2UgZGVmYXVsdCB2YWx1ZXMgaWYgbmVlZGVkLlxuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5ub3coKS50b0lTTygpIC8vfj4gbm93IGluIHRoZSBJU08gZm9ybWF0XG4gICAqIEByZXR1cm4ge0RhdGVUaW1lfVxuICAgKi9cbiAgc3RhdGljIG5vdygpIHtcbiAgICByZXR1cm4gbmV3IERhdGVUaW1lKHt9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBsb2NhbCBEYXRlVGltZVxuICAgKiBAcGFyYW0ge251bWJlcn0gW3llYXJdIC0gVGhlIGNhbGVuZGFyIHllYXIuIElmIG9taXR0ZWQgKGFzIGluLCBjYWxsIGBsb2NhbCgpYCB3aXRoIG5vIGFyZ3VtZW50cyksIHRoZSBjdXJyZW50IHRpbWUgd2lsbCBiZSB1c2VkXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbbW9udGg9MV0gLSBUaGUgbW9udGgsIDEtaW5kZXhlZFxuICAgKiBAcGFyYW0ge251bWJlcn0gW2RheT0xXSAtIFRoZSBkYXkgb2YgdGhlIG1vbnRoLCAxLWluZGV4ZWRcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtob3VyPTBdIC0gVGhlIGhvdXIgb2YgdGhlIGRheSwgaW4gMjQtaG91ciB0aW1lXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbbWludXRlPTBdIC0gVGhlIG1pbnV0ZSBvZiB0aGUgaG91ciwgbWVhbmluZyBhIG51bWJlciBiZXR3ZWVuIDAgYW5kIDU5XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbc2Vjb25kPTBdIC0gVGhlIHNlY29uZCBvZiB0aGUgbWludXRlLCBtZWFuaW5nIGEgbnVtYmVyIGJldHdlZW4gMCBhbmQgNTlcbiAgICogQHBhcmFtIHtudW1iZXJ9IFttaWxsaXNlY29uZD0wXSAtIFRoZSBtaWxsaXNlY29uZCBvZiB0aGUgc2Vjb25kLCBtZWFuaW5nIGEgbnVtYmVyIGJldHdlZW4gMCBhbmQgOTk5XG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9+PiBub3dcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoeyB6b25lOiBcIkFtZXJpY2EvTmV3X1lvcmtcIiB9KSAgICAgIC8vfj4gbm93LCBpbiBVUyBlYXN0IGNvYXN0IHRpbWVcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoMjAxNykgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL34+IDIwMTctMDEtMDFUMDA6MDA6MDBcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoMjAxNywgMykgICAgICAgICAgICAgICAgICAgICAgICAgICAvL34+IDIwMTctMDMtMDFUMDA6MDA6MDBcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoMjAxNywgMywgMTIsIHsgbG9jYWxlOiBcImZyXCIgfSkgICAgIC8vfj4gMjAxNy0wMy0xMlQwMDowMDowMCwgd2l0aCBhIEZyZW5jaCBsb2NhbGVcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoMjAxNywgMywgMTIsIDUpICAgICAgICAgICAgICAgICAgICAvL34+IDIwMTctMDMtMTJUMDU6MDA6MDBcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoMjAxNywgMywgMTIsIDUsIHsgem9uZTogXCJ1dGNcIiB9KSAgIC8vfj4gMjAxNy0wMy0xMlQwNTowMDowMCwgaW4gVVRDXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKDIwMTcsIDMsIDEyLCA1LCA0NSkgICAgICAgICAgICAgICAgLy9+PiAyMDE3LTAzLTEyVDA1OjQ1OjAwXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKDIwMTcsIDMsIDEyLCA1LCA0NSwgMTApICAgICAgICAgICAgLy9+PiAyMDE3LTAzLTEyVDA1OjQ1OjEwXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKDIwMTcsIDMsIDEyLCA1LCA0NSwgMTAsIDc2NSkgICAgICAgLy9+PiAyMDE3LTAzLTEyVDA1OjQ1OjEwLjc2NVxuICAgKiBAcmV0dXJuIHtEYXRlVGltZX1cbiAgICovXG4gIHN0YXRpYyBsb2NhbCgpIHtcbiAgICBjb25zdCBbb3B0cywgYXJnc10gPSBsYXN0T3B0cyhhcmd1bWVudHMpLFxuICAgICAgW3llYXIsIG1vbnRoLCBkYXksIGhvdXIsIG1pbnV0ZSwgc2Vjb25kLCBtaWxsaXNlY29uZF0gPSBhcmdzO1xuICAgIHJldHVybiBxdWlja0RUKHsgeWVhciwgbW9udGgsIGRheSwgaG91ciwgbWludXRlLCBzZWNvbmQsIG1pbGxpc2Vjb25kIH0sIG9wdHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIERhdGVUaW1lIGluIFVUQ1xuICAgKiBAcGFyYW0ge251bWJlcn0gW3llYXJdIC0gVGhlIGNhbGVuZGFyIHllYXIuIElmIG9taXR0ZWQgKGFzIGluLCBjYWxsIGB1dGMoKWAgd2l0aCBubyBhcmd1bWVudHMpLCB0aGUgY3VycmVudCB0aW1lIHdpbGwgYmUgdXNlZFxuICAgKiBAcGFyYW0ge251bWJlcn0gW21vbnRoPTFdIC0gVGhlIG1vbnRoLCAxLWluZGV4ZWRcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtkYXk9MV0gLSBUaGUgZGF5IG9mIHRoZSBtb250aFxuICAgKiBAcGFyYW0ge251bWJlcn0gW2hvdXI9MF0gLSBUaGUgaG91ciBvZiB0aGUgZGF5LCBpbiAyNC1ob3VyIHRpbWVcbiAgICogQHBhcmFtIHtudW1iZXJ9IFttaW51dGU9MF0gLSBUaGUgbWludXRlIG9mIHRoZSBob3VyLCBtZWFuaW5nIGEgbnVtYmVyIGJldHdlZW4gMCBhbmQgNTlcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtzZWNvbmQ9MF0gLSBUaGUgc2Vjb25kIG9mIHRoZSBtaW51dGUsIG1lYW5pbmcgYSBudW1iZXIgYmV0d2VlbiAwIGFuZCA1OVxuICAgKiBAcGFyYW0ge251bWJlcn0gW21pbGxpc2Vjb25kPTBdIC0gVGhlIG1pbGxpc2Vjb25kIG9mIHRoZSBzZWNvbmQsIG1lYW5pbmcgYSBudW1iZXIgYmV0d2VlbiAwIGFuZCA5OTlcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBjb25maWd1cmF0aW9uIG9wdGlvbnMgZm9yIHRoZSBEYXRlVGltZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMubG9jYWxlXSAtIGEgbG9jYWxlIHRvIHNldCBvbiB0aGUgcmVzdWx0aW5nIERhdGVUaW1lIGluc3RhbmNlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5vdXRwdXRDYWxlbmRhcl0gLSB0aGUgb3V0cHV0IGNhbGVuZGFyIHRvIHNldCBvbiB0aGUgcmVzdWx0aW5nIERhdGVUaW1lIGluc3RhbmNlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5udW1iZXJpbmdTeXN0ZW1dIC0gdGhlIG51bWJlcmluZyBzeXN0ZW0gdG8gc2V0IG9uIHRoZSByZXN1bHRpbmcgRGF0ZVRpbWUgaW5zdGFuY2VcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUudXRjKCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9+PiBub3dcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUudXRjKDIwMTcpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9+PiAyMDE3LTAxLTAxVDAwOjAwOjAwWlxuICAgKiBAZXhhbXBsZSBEYXRlVGltZS51dGMoMjAxNywgMykgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL34+IDIwMTctMDMtMDFUMDA6MDA6MDBaXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLnV0YygyMDE3LCAzLCAxMikgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfj4gMjAxNy0wMy0xMlQwMDowMDowMFpcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUudXRjKDIwMTcsIDMsIDEyLCA1KSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9+PiAyMDE3LTAzLTEyVDA1OjAwOjAwWlxuICAgKiBAZXhhbXBsZSBEYXRlVGltZS51dGMoMjAxNywgMywgMTIsIDUsIDQ1KSAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL34+IDIwMTctMDMtMTJUMDU6NDU6MDBaXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLnV0YygyMDE3LCAzLCAxMiwgNSwgNDUsIHsgbG9jYWxlOiBcImZyXCIgfSkgICAgICAgICAgLy9+PiAyMDE3LTAzLTEyVDA1OjQ1OjAwWiB3aXRoIGEgRnJlbmNoIGxvY2FsZVxuICAgKiBAZXhhbXBsZSBEYXRlVGltZS51dGMoMjAxNywgMywgMTIsIDUsIDQ1LCAxMCkgICAgICAgICAgICAgICAgICAgICAgICAvL34+IDIwMTctMDMtMTJUMDU6NDU6MTBaXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLnV0YygyMDE3LCAzLCAxMiwgNSwgNDUsIDEwLCA3NjUsIHsgbG9jYWxlOiBcImZyXCIgfSkgLy9+PiAyMDE3LTAzLTEyVDA1OjQ1OjEwLjc2NVogd2l0aCBhIEZyZW5jaCBsb2NhbGVcbiAgICogQHJldHVybiB7RGF0ZVRpbWV9XG4gICAqL1xuICBzdGF0aWMgdXRjKCkge1xuICAgIGNvbnN0IFtvcHRzLCBhcmdzXSA9IGxhc3RPcHRzKGFyZ3VtZW50cyksXG4gICAgICBbeWVhciwgbW9udGgsIGRheSwgaG91ciwgbWludXRlLCBzZWNvbmQsIG1pbGxpc2Vjb25kXSA9IGFyZ3M7XG5cbiAgICBvcHRzLnpvbmUgPSBGaXhlZE9mZnNldFpvbmUudXRjSW5zdGFuY2U7XG4gICAgcmV0dXJuIHF1aWNrRFQoeyB5ZWFyLCBtb250aCwgZGF5LCBob3VyLCBtaW51dGUsIHNlY29uZCwgbWlsbGlzZWNvbmQgfSwgb3B0cyk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgRGF0ZVRpbWUgZnJvbSBhIEphdmFTY3JpcHQgRGF0ZSBvYmplY3QuIFVzZXMgdGhlIGRlZmF1bHQgem9uZS5cbiAgICogQHBhcmFtIHtEYXRlfSBkYXRlIC0gYSBKYXZhU2NyaXB0IERhdGUgb2JqZWN0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gY29uZmlndXJhdGlvbiBvcHRpb25zIGZvciB0aGUgRGF0ZVRpbWVcbiAgICogQHBhcmFtIHtzdHJpbmd8Wm9uZX0gW29wdGlvbnMuem9uZT0nbG9jYWwnXSAtIHRoZSB6b25lIHRvIHBsYWNlIHRoZSBEYXRlVGltZSBpbnRvXG4gICAqIEByZXR1cm4ge0RhdGVUaW1lfVxuICAgKi9cbiAgc3RhdGljIGZyb21KU0RhdGUoZGF0ZSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3QgdHMgPSBpc0RhdGUoZGF0ZSkgPyBkYXRlLnZhbHVlT2YoKSA6IE5hTjtcbiAgICBpZiAoTnVtYmVyLmlzTmFOKHRzKSkge1xuICAgICAgcmV0dXJuIERhdGVUaW1lLmludmFsaWQoXCJpbnZhbGlkIGlucHV0XCIpO1xuICAgIH1cblxuICAgIGNvbnN0IHpvbmVUb1VzZSA9IG5vcm1hbGl6ZVpvbmUob3B0aW9ucy56b25lLCBTZXR0aW5ncy5kZWZhdWx0Wm9uZSk7XG4gICAgaWYgKCF6b25lVG9Vc2UuaXNWYWxpZCkge1xuICAgICAgcmV0dXJuIERhdGVUaW1lLmludmFsaWQodW5zdXBwb3J0ZWRab25lKHpvbmVUb1VzZSkpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgRGF0ZVRpbWUoe1xuICAgICAgdHM6IHRzLFxuICAgICAgem9uZTogem9uZVRvVXNlLFxuICAgICAgbG9jOiBMb2NhbGUuZnJvbU9iamVjdChvcHRpb25zKSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBEYXRlVGltZSBmcm9tIGEgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBzaW5jZSB0aGUgZXBvY2ggKG1lYW5pbmcgc2luY2UgMSBKYW51YXJ5IDE5NzAgMDA6MDA6MDAgVVRDKS4gVXNlcyB0aGUgZGVmYXVsdCB6b25lLlxuICAgKiBAcGFyYW0ge251bWJlcn0gbWlsbGlzZWNvbmRzIC0gYSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHNpbmNlIDE5NzAgVVRDXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gY29uZmlndXJhdGlvbiBvcHRpb25zIGZvciB0aGUgRGF0ZVRpbWVcbiAgICogQHBhcmFtIHtzdHJpbmd8Wm9uZX0gW29wdGlvbnMuem9uZT0nbG9jYWwnXSAtIHRoZSB6b25lIHRvIHBsYWNlIHRoZSBEYXRlVGltZSBpbnRvXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5sb2NhbGVdIC0gYSBsb2NhbGUgdG8gc2V0IG9uIHRoZSByZXN1bHRpbmcgRGF0ZVRpbWUgaW5zdGFuY2VcbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMub3V0cHV0Q2FsZW5kYXIgLSB0aGUgb3V0cHV0IGNhbGVuZGFyIHRvIHNldCBvbiB0aGUgcmVzdWx0aW5nIERhdGVUaW1lIGluc3RhbmNlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLm51bWJlcmluZ1N5c3RlbSAtIHRoZSBudW1iZXJpbmcgc3lzdGVtIHRvIHNldCBvbiB0aGUgcmVzdWx0aW5nIERhdGVUaW1lIGluc3RhbmNlXG4gICAqIEByZXR1cm4ge0RhdGVUaW1lfVxuICAgKi9cbiAgc3RhdGljIGZyb21NaWxsaXMobWlsbGlzZWNvbmRzLCBvcHRpb25zID0ge30pIHtcbiAgICBpZiAoIWlzTnVtYmVyKG1pbGxpc2Vjb25kcykpIHtcbiAgICAgIHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFcnJvcihcbiAgICAgICAgYGZyb21NaWxsaXMgcmVxdWlyZXMgYSBudW1lcmljYWwgaW5wdXQsIGJ1dCByZWNlaXZlZCBhICR7dHlwZW9mIG1pbGxpc2Vjb25kc30gd2l0aCB2YWx1ZSAke21pbGxpc2Vjb25kc31gXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAobWlsbGlzZWNvbmRzIDwgLU1BWF9EQVRFIHx8IG1pbGxpc2Vjb25kcyA+IE1BWF9EQVRFKSB7XG4gICAgICAvLyB0aGlzIGlzbid0IHBlcmZlY3QgYmVjYXVzZSBiZWNhdXNlIHdlIGNhbiBzdGlsbCBlbmQgdXAgb3V0IG9mIHJhbmdlIGJlY2F1c2Ugb2YgYWRkaXRpb25hbCBzaGlmdGluZywgYnV0IGl0J3MgYSBzdGFydFxuICAgICAgcmV0dXJuIERhdGVUaW1lLmludmFsaWQoXCJUaW1lc3RhbXAgb3V0IG9mIHJhbmdlXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IERhdGVUaW1lKHtcbiAgICAgICAgdHM6IG1pbGxpc2Vjb25kcyxcbiAgICAgICAgem9uZTogbm9ybWFsaXplWm9uZShvcHRpb25zLnpvbmUsIFNldHRpbmdzLmRlZmF1bHRab25lKSxcbiAgICAgICAgbG9jOiBMb2NhbGUuZnJvbU9iamVjdChvcHRpb25zKSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBEYXRlVGltZSBmcm9tIGEgbnVtYmVyIG9mIHNlY29uZHMgc2luY2UgdGhlIGVwb2NoIChtZWFuaW5nIHNpbmNlIDEgSmFudWFyeSAxOTcwIDAwOjAwOjAwIFVUQykuIFVzZXMgdGhlIGRlZmF1bHQgem9uZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHNlY29uZHMgLSBhIG51bWJlciBvZiBzZWNvbmRzIHNpbmNlIDE5NzAgVVRDXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gY29uZmlndXJhdGlvbiBvcHRpb25zIGZvciB0aGUgRGF0ZVRpbWVcbiAgICogQHBhcmFtIHtzdHJpbmd8Wm9uZX0gW29wdGlvbnMuem9uZT0nbG9jYWwnXSAtIHRoZSB6b25lIHRvIHBsYWNlIHRoZSBEYXRlVGltZSBpbnRvXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5sb2NhbGVdIC0gYSBsb2NhbGUgdG8gc2V0IG9uIHRoZSByZXN1bHRpbmcgRGF0ZVRpbWUgaW5zdGFuY2VcbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMub3V0cHV0Q2FsZW5kYXIgLSB0aGUgb3V0cHV0IGNhbGVuZGFyIHRvIHNldCBvbiB0aGUgcmVzdWx0aW5nIERhdGVUaW1lIGluc3RhbmNlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLm51bWJlcmluZ1N5c3RlbSAtIHRoZSBudW1iZXJpbmcgc3lzdGVtIHRvIHNldCBvbiB0aGUgcmVzdWx0aW5nIERhdGVUaW1lIGluc3RhbmNlXG4gICAqIEByZXR1cm4ge0RhdGVUaW1lfVxuICAgKi9cbiAgc3RhdGljIGZyb21TZWNvbmRzKHNlY29uZHMsIG9wdGlvbnMgPSB7fSkge1xuICAgIGlmICghaXNOdW1iZXIoc2Vjb25kcykpIHtcbiAgICAgIHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFcnJvcihcImZyb21TZWNvbmRzIHJlcXVpcmVzIGEgbnVtZXJpY2FsIGlucHV0XCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IERhdGVUaW1lKHtcbiAgICAgICAgdHM6IHNlY29uZHMgKiAxMDAwLFxuICAgICAgICB6b25lOiBub3JtYWxpemVab25lKG9wdGlvbnMuem9uZSwgU2V0dGluZ3MuZGVmYXVsdFpvbmUpLFxuICAgICAgICBsb2M6IExvY2FsZS5mcm9tT2JqZWN0KG9wdGlvbnMpLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIERhdGVUaW1lIGZyb20gYSBKYXZhU2NyaXB0IG9iamVjdCB3aXRoIGtleXMgbGlrZSAneWVhcicgYW5kICdob3VyJyB3aXRoIHJlYXNvbmFibGUgZGVmYXVsdHMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmogLSB0aGUgb2JqZWN0IHRvIGNyZWF0ZSB0aGUgRGF0ZVRpbWUgZnJvbVxuICAgKiBAcGFyYW0ge251bWJlcn0gb2JqLnllYXIgLSBhIHllYXIsIHN1Y2ggYXMgMTk4N1xuICAgKiBAcGFyYW0ge251bWJlcn0gb2JqLm1vbnRoIC0gYSBtb250aCwgMS0xMlxuICAgKiBAcGFyYW0ge251bWJlcn0gb2JqLmRheSAtIGEgZGF5IG9mIHRoZSBtb250aCwgMS0zMSwgZGVwZW5kaW5nIG9uIHRoZSBtb250aFxuICAgKiBAcGFyYW0ge251bWJlcn0gb2JqLm9yZGluYWwgLSBkYXkgb2YgdGhlIHllYXIsIDEtMzY1IG9yIDM2NlxuICAgKiBAcGFyYW0ge251bWJlcn0gb2JqLndlZWtZZWFyIC0gYW4gSVNPIHdlZWsgeWVhclxuICAgKiBAcGFyYW0ge251bWJlcn0gb2JqLndlZWtOdW1iZXIgLSBhbiBJU08gd2VlayBudW1iZXIsIGJldHdlZW4gMSBhbmQgNTIgb3IgNTMsIGRlcGVuZGluZyBvbiB0aGUgeWVhclxuICAgKiBAcGFyYW0ge251bWJlcn0gb2JqLndlZWtkYXkgLSBhbiBJU08gd2Vla2RheSwgMS03LCB3aGVyZSAxIGlzIE1vbmRheSBhbmQgNyBpcyBTdW5kYXlcbiAgICogQHBhcmFtIHtudW1iZXJ9IG9iai5ob3VyIC0gaG91ciBvZiB0aGUgZGF5LCAwLTIzXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvYmoubWludXRlIC0gbWludXRlIG9mIHRoZSBob3VyLCAwLTU5XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvYmouc2Vjb25kIC0gc2Vjb25kIG9mIHRoZSBtaW51dGUsIDAtNTlcbiAgICogQHBhcmFtIHtudW1iZXJ9IG9iai5taWxsaXNlY29uZCAtIG1pbGxpc2Vjb25kIG9mIHRoZSBzZWNvbmQsIDAtOTk5XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIC0gb3B0aW9ucyBmb3IgY3JlYXRpbmcgdGhpcyBEYXRlVGltZVxuICAgKiBAcGFyYW0ge3N0cmluZ3xab25lfSBbb3B0cy56b25lPSdsb2NhbCddIC0gaW50ZXJwcmV0IHRoZSBudW1iZXJzIGluIHRoZSBjb250ZXh0IG9mIGEgcGFydGljdWxhciB6b25lLiBDYW4gdGFrZSBhbnkgdmFsdWUgdGFrZW4gYXMgdGhlIGZpcnN0IGFyZ3VtZW50IHRvIHNldFpvbmUoKVxuICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdHMubG9jYWxlPSdzeXN0ZW0ncyBsb2NhbGUnXSAtIGEgbG9jYWxlIHRvIHNldCBvbiB0aGUgcmVzdWx0aW5nIERhdGVUaW1lIGluc3RhbmNlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRzLm91dHB1dENhbGVuZGFyIC0gdGhlIG91dHB1dCBjYWxlbmRhciB0byBzZXQgb24gdGhlIHJlc3VsdGluZyBEYXRlVGltZSBpbnN0YW5jZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0cy5udW1iZXJpbmdTeXN0ZW0gLSB0aGUgbnVtYmVyaW5nIHN5c3RlbSB0byBzZXQgb24gdGhlIHJlc3VsdGluZyBEYXRlVGltZSBpbnN0YW5jZVxuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5mcm9tT2JqZWN0KHsgeWVhcjogMTk4MiwgbW9udGg6IDUsIGRheTogMjV9KS50b0lTT0RhdGUoKSAvLz0+ICcxOTgyLTA1LTI1J1xuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5mcm9tT2JqZWN0KHsgeWVhcjogMTk4MiB9KS50b0lTT0RhdGUoKSAvLz0+ICcxOTgyLTAxLTAxJ1xuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5mcm9tT2JqZWN0KHsgaG91cjogMTAsIG1pbnV0ZTogMjYsIHNlY29uZDogNiB9KSAvL34+IHRvZGF5IGF0IDEwOjI2OjA2XG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmZyb21PYmplY3QoeyBob3VyOiAxMCwgbWludXRlOiAyNiwgc2Vjb25kOiA2IH0sIHsgem9uZTogJ3V0YycgfSksXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmZyb21PYmplY3QoeyBob3VyOiAxMCwgbWludXRlOiAyNiwgc2Vjb25kOiA2IH0sIHsgem9uZTogJ2xvY2FsJyB9KVxuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5mcm9tT2JqZWN0KHsgaG91cjogMTAsIG1pbnV0ZTogMjYsIHNlY29uZDogNiB9LCB7IHpvbmU6ICdBbWVyaWNhL05ld19Zb3JrJyB9KVxuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5mcm9tT2JqZWN0KHsgd2Vla1llYXI6IDIwMTYsIHdlZWtOdW1iZXI6IDIsIHdlZWtkYXk6IDMgfSkudG9JU09EYXRlKCkgLy89PiAnMjAxNi0wMS0xMydcbiAgICogQHJldHVybiB7RGF0ZVRpbWV9XG4gICAqL1xuICBzdGF0aWMgZnJvbU9iamVjdChvYmosIG9wdHMgPSB7fSkge1xuICAgIG9iaiA9IG9iaiB8fCB7fTtcbiAgICBjb25zdCB6b25lVG9Vc2UgPSBub3JtYWxpemVab25lKG9wdHMuem9uZSwgU2V0dGluZ3MuZGVmYXVsdFpvbmUpO1xuICAgIGlmICghem9uZVRvVXNlLmlzVmFsaWQpIHtcbiAgICAgIHJldHVybiBEYXRlVGltZS5pbnZhbGlkKHVuc3VwcG9ydGVkWm9uZSh6b25lVG9Vc2UpKTtcbiAgICB9XG5cbiAgICBjb25zdCB0c05vdyA9IFNldHRpbmdzLm5vdygpLFxuICAgICAgb2Zmc2V0UHJvdmlzID0gIWlzVW5kZWZpbmVkKG9wdHMuc3BlY2lmaWNPZmZzZXQpXG4gICAgICAgID8gb3B0cy5zcGVjaWZpY09mZnNldFxuICAgICAgICA6IHpvbmVUb1VzZS5vZmZzZXQodHNOb3cpLFxuICAgICAgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZU9iamVjdChvYmosIG5vcm1hbGl6ZVVuaXQpLFxuICAgICAgY29udGFpbnNPcmRpbmFsID0gIWlzVW5kZWZpbmVkKG5vcm1hbGl6ZWQub3JkaW5hbCksXG4gICAgICBjb250YWluc0dyZWdvclllYXIgPSAhaXNVbmRlZmluZWQobm9ybWFsaXplZC55ZWFyKSxcbiAgICAgIGNvbnRhaW5zR3JlZ29yTUQgPSAhaXNVbmRlZmluZWQobm9ybWFsaXplZC5tb250aCkgfHwgIWlzVW5kZWZpbmVkKG5vcm1hbGl6ZWQuZGF5KSxcbiAgICAgIGNvbnRhaW5zR3JlZ29yID0gY29udGFpbnNHcmVnb3JZZWFyIHx8IGNvbnRhaW5zR3JlZ29yTUQsXG4gICAgICBkZWZpbml0ZVdlZWtEZWYgPSBub3JtYWxpemVkLndlZWtZZWFyIHx8IG5vcm1hbGl6ZWQud2Vla051bWJlcixcbiAgICAgIGxvYyA9IExvY2FsZS5mcm9tT2JqZWN0KG9wdHMpO1xuXG4gICAgLy8gY2FzZXM6XG4gICAgLy8ganVzdCBhIHdlZWtkYXkgLT4gdGhpcyB3ZWVrJ3MgaW5zdGFuY2Ugb2YgdGhhdCB3ZWVrZGF5LCBubyB3b3JyaWVzXG4gICAgLy8gKGdyZWdvcmlhbiBkYXRhIG9yIG9yZGluYWwpICsgKHdlZWtZZWFyIG9yIHdlZWtOdW1iZXIpIC0+IGVycm9yXG4gICAgLy8gKGdyZWdvcmlhbiBtb250aCBvciBkYXkpICsgb3JkaW5hbCAtPiBlcnJvclxuICAgIC8vIG90aGVyd2lzZSBqdXN0IHVzZSB3ZWVrcyBvciBvcmRpbmFscyBvciBncmVnb3JpYW4sIGRlcGVuZGluZyBvbiB3aGF0J3Mgc3BlY2lmaWVkXG5cbiAgICBpZiAoKGNvbnRhaW5zR3JlZ29yIHx8IGNvbnRhaW5zT3JkaW5hbCkgJiYgZGVmaW5pdGVXZWVrRGVmKSB7XG4gICAgICB0aHJvdyBuZXcgQ29uZmxpY3RpbmdTcGVjaWZpY2F0aW9uRXJyb3IoXG4gICAgICAgIFwiQ2FuJ3QgbWl4IHdlZWtZZWFyL3dlZWtOdW1iZXIgdW5pdHMgd2l0aCB5ZWFyL21vbnRoL2RheSBvciBvcmRpbmFsc1wiXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChjb250YWluc0dyZWdvck1EICYmIGNvbnRhaW5zT3JkaW5hbCkge1xuICAgICAgdGhyb3cgbmV3IENvbmZsaWN0aW5nU3BlY2lmaWNhdGlvbkVycm9yKFwiQ2FuJ3QgbWl4IG9yZGluYWwgZGF0ZXMgd2l0aCBtb250aC9kYXlcIik7XG4gICAgfVxuXG4gICAgY29uc3QgdXNlV2Vla0RhdGEgPSBkZWZpbml0ZVdlZWtEZWYgfHwgKG5vcm1hbGl6ZWQud2Vla2RheSAmJiAhY29udGFpbnNHcmVnb3IpO1xuXG4gICAgLy8gY29uZmlndXJlIG91cnNlbHZlcyB0byBkZWFsIHdpdGggZ3JlZ29yaWFuIGRhdGVzIG9yIHdlZWsgc3R1ZmZcbiAgICBsZXQgdW5pdHMsXG4gICAgICBkZWZhdWx0VmFsdWVzLFxuICAgICAgb2JqTm93ID0gdHNUb09iaih0c05vdywgb2Zmc2V0UHJvdmlzKTtcbiAgICBpZiAodXNlV2Vla0RhdGEpIHtcbiAgICAgIHVuaXRzID0gb3JkZXJlZFdlZWtVbml0cztcbiAgICAgIGRlZmF1bHRWYWx1ZXMgPSBkZWZhdWx0V2Vla1VuaXRWYWx1ZXM7XG4gICAgICBvYmpOb3cgPSBncmVnb3JpYW5Ub1dlZWsob2JqTm93KTtcbiAgICB9IGVsc2UgaWYgKGNvbnRhaW5zT3JkaW5hbCkge1xuICAgICAgdW5pdHMgPSBvcmRlcmVkT3JkaW5hbFVuaXRzO1xuICAgICAgZGVmYXVsdFZhbHVlcyA9IGRlZmF1bHRPcmRpbmFsVW5pdFZhbHVlcztcbiAgICAgIG9iak5vdyA9IGdyZWdvcmlhblRvT3JkaW5hbChvYmpOb3cpO1xuICAgIH0gZWxzZSB7XG4gICAgICB1bml0cyA9IG9yZGVyZWRVbml0cztcbiAgICAgIGRlZmF1bHRWYWx1ZXMgPSBkZWZhdWx0VW5pdFZhbHVlcztcbiAgICB9XG5cbiAgICAvLyBzZXQgZGVmYXVsdCB2YWx1ZXMgZm9yIG1pc3Npbmcgc3R1ZmZcbiAgICBsZXQgZm91bmRGaXJzdCA9IGZhbHNlO1xuICAgIGZvciAoY29uc3QgdSBvZiB1bml0cykge1xuICAgICAgY29uc3QgdiA9IG5vcm1hbGl6ZWRbdV07XG4gICAgICBpZiAoIWlzVW5kZWZpbmVkKHYpKSB7XG4gICAgICAgIGZvdW5kRmlyc3QgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmIChmb3VuZEZpcnN0KSB7XG4gICAgICAgIG5vcm1hbGl6ZWRbdV0gPSBkZWZhdWx0VmFsdWVzW3VdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbm9ybWFsaXplZFt1XSA9IG9iak5vd1t1XTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBtYWtlIHN1cmUgdGhlIHZhbHVlcyB3ZSBoYXZlIGFyZSBpbiByYW5nZVxuICAgIGNvbnN0IGhpZ2hlck9yZGVySW52YWxpZCA9IHVzZVdlZWtEYXRhXG4gICAgICAgID8gaGFzSW52YWxpZFdlZWtEYXRhKG5vcm1hbGl6ZWQpXG4gICAgICAgIDogY29udGFpbnNPcmRpbmFsXG4gICAgICAgICAgPyBoYXNJbnZhbGlkT3JkaW5hbERhdGEobm9ybWFsaXplZClcbiAgICAgICAgICA6IGhhc0ludmFsaWRHcmVnb3JpYW5EYXRhKG5vcm1hbGl6ZWQpLFxuICAgICAgaW52YWxpZCA9IGhpZ2hlck9yZGVySW52YWxpZCB8fCBoYXNJbnZhbGlkVGltZURhdGEobm9ybWFsaXplZCk7XG5cbiAgICBpZiAoaW52YWxpZCkge1xuICAgICAgcmV0dXJuIERhdGVUaW1lLmludmFsaWQoaW52YWxpZCk7XG4gICAgfVxuXG4gICAgLy8gY29tcHV0ZSB0aGUgYWN0dWFsIHRpbWVcbiAgICBjb25zdCBncmVnb3JpYW4gPSB1c2VXZWVrRGF0YVxuICAgICAgICA/IHdlZWtUb0dyZWdvcmlhbihub3JtYWxpemVkKVxuICAgICAgICA6IGNvbnRhaW5zT3JkaW5hbFxuICAgICAgICAgID8gb3JkaW5hbFRvR3JlZ29yaWFuKG5vcm1hbGl6ZWQpXG4gICAgICAgICAgOiBub3JtYWxpemVkLFxuICAgICAgW3RzRmluYWwsIG9mZnNldEZpbmFsXSA9IG9ialRvVFMoZ3JlZ29yaWFuLCBvZmZzZXRQcm92aXMsIHpvbmVUb1VzZSksXG4gICAgICBpbnN0ID0gbmV3IERhdGVUaW1lKHtcbiAgICAgICAgdHM6IHRzRmluYWwsXG4gICAgICAgIHpvbmU6IHpvbmVUb1VzZSxcbiAgICAgICAgbzogb2Zmc2V0RmluYWwsXG4gICAgICAgIGxvYyxcbiAgICAgIH0pO1xuXG4gICAgLy8gZ3JlZ29yaWFuIGRhdGEgKyB3ZWVrZGF5IHNlcnZlcyBvbmx5IHRvIHZhbGlkYXRlXG4gICAgaWYgKG5vcm1hbGl6ZWQud2Vla2RheSAmJiBjb250YWluc0dyZWdvciAmJiBvYmoud2Vla2RheSAhPT0gaW5zdC53ZWVrZGF5KSB7XG4gICAgICByZXR1cm4gRGF0ZVRpbWUuaW52YWxpZChcbiAgICAgICAgXCJtaXNtYXRjaGVkIHdlZWtkYXlcIixcbiAgICAgICAgYHlvdSBjYW4ndCBzcGVjaWZ5IGJvdGggYSB3ZWVrZGF5IG9mICR7bm9ybWFsaXplZC53ZWVrZGF5fSBhbmQgYSBkYXRlIG9mICR7aW5zdC50b0lTTygpfWBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGluc3Q7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgRGF0ZVRpbWUgZnJvbSBhbiBJU08gODYwMSBzdHJpbmdcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHQgLSB0aGUgSVNPIHN0cmluZ1xuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0cyAtIG9wdGlvbnMgdG8gYWZmZWN0IHRoZSBjcmVhdGlvblxuICAgKiBAcGFyYW0ge3N0cmluZ3xab25lfSBbb3B0cy56b25lPSdsb2NhbCddIC0gdXNlIHRoaXMgem9uZSBpZiBubyBvZmZzZXQgaXMgc3BlY2lmaWVkIGluIHRoZSBpbnB1dCBzdHJpbmcgaXRzZWxmLiBXaWxsIGFsc28gY29udmVydCB0aGUgdGltZSB0byB0aGlzIHpvbmVcbiAgICogQHBhcmFtIHtib29sZWFufSBbb3B0cy5zZXRab25lPWZhbHNlXSAtIG92ZXJyaWRlIHRoZSB6b25lIHdpdGggYSBmaXhlZC1vZmZzZXQgem9uZSBzcGVjaWZpZWQgaW4gdGhlIHN0cmluZyBpdHNlbGYsIGlmIGl0IHNwZWNpZmllcyBvbmVcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRzLmxvY2FsZT0nc3lzdGVtJ3MgbG9jYWxlJ10gLSBhIGxvY2FsZSB0byBzZXQgb24gdGhlIHJlc3VsdGluZyBEYXRlVGltZSBpbnN0YW5jZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdHMub3V0cHV0Q2FsZW5kYXJdIC0gdGhlIG91dHB1dCBjYWxlbmRhciB0byBzZXQgb24gdGhlIHJlc3VsdGluZyBEYXRlVGltZSBpbnN0YW5jZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdHMubnVtYmVyaW5nU3lzdGVtXSAtIHRoZSBudW1iZXJpbmcgc3lzdGVtIHRvIHNldCBvbiB0aGUgcmVzdWx0aW5nIERhdGVUaW1lIGluc3RhbmNlXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmZyb21JU08oJzIwMTYtMDUtMjVUMDk6MDg6MzQuMTIzJylcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUuZnJvbUlTTygnMjAxNi0wNS0yNVQwOTowODozNC4xMjMrMDY6MDAnKVxuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5mcm9tSVNPKCcyMDE2LTA1LTI1VDA5OjA4OjM0LjEyMyswNjowMCcsIHtzZXRab25lOiB0cnVlfSlcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUuZnJvbUlTTygnMjAxNi0wNS0yNVQwOTowODozNC4xMjMnLCB7em9uZTogJ3V0Yyd9KVxuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5mcm9tSVNPKCcyMDE2LVcwNS00JylcbiAgICogQHJldHVybiB7RGF0ZVRpbWV9XG4gICAqL1xuICBzdGF0aWMgZnJvbUlTTyh0ZXh0LCBvcHRzID0ge30pIHtcbiAgICBjb25zdCBbdmFscywgcGFyc2VkWm9uZV0gPSBwYXJzZUlTT0RhdGUodGV4dCk7XG4gICAgcmV0dXJuIHBhcnNlRGF0YVRvRGF0ZVRpbWUodmFscywgcGFyc2VkWm9uZSwgb3B0cywgXCJJU08gODYwMVwiLCB0ZXh0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBEYXRlVGltZSBmcm9tIGFuIFJGQyAyODIyIHN0cmluZ1xuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCAtIHRoZSBSRkMgMjgyMiBzdHJpbmdcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdHMgLSBvcHRpb25zIHRvIGFmZmVjdCB0aGUgY3JlYXRpb25cbiAgICogQHBhcmFtIHtzdHJpbmd8Wm9uZX0gW29wdHMuem9uZT0nbG9jYWwnXSAtIGNvbnZlcnQgdGhlIHRpbWUgdG8gdGhpcyB6b25lLiBTaW5jZSB0aGUgb2Zmc2V0IGlzIGFsd2F5cyBzcGVjaWZpZWQgaW4gdGhlIHN0cmluZyBpdHNlbGYsIHRoaXMgaGFzIG5vIGVmZmVjdCBvbiB0aGUgaW50ZXJwcmV0YXRpb24gb2Ygc3RyaW5nLCBtZXJlbHkgdGhlIHpvbmUgdGhlIHJlc3VsdGluZyBEYXRlVGltZSBpcyBleHByZXNzZWQgaW4uXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdHMuc2V0Wm9uZT1mYWxzZV0gLSBvdmVycmlkZSB0aGUgem9uZSB3aXRoIGEgZml4ZWQtb2Zmc2V0IHpvbmUgc3BlY2lmaWVkIGluIHRoZSBzdHJpbmcgaXRzZWxmLCBpZiBpdCBzcGVjaWZpZXMgb25lXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0cy5sb2NhbGU9J3N5c3RlbSdzIGxvY2FsZSddIC0gYSBsb2NhbGUgdG8gc2V0IG9uIHRoZSByZXN1bHRpbmcgRGF0ZVRpbWUgaW5zdGFuY2VcbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdHMub3V0cHV0Q2FsZW5kYXIgLSB0aGUgb3V0cHV0IGNhbGVuZGFyIHRvIHNldCBvbiB0aGUgcmVzdWx0aW5nIERhdGVUaW1lIGluc3RhbmNlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRzLm51bWJlcmluZ1N5c3RlbSAtIHRoZSBudW1iZXJpbmcgc3lzdGVtIHRvIHNldCBvbiB0aGUgcmVzdWx0aW5nIERhdGVUaW1lIGluc3RhbmNlXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmZyb21SRkMyODIyKCcyNSBOb3YgMjAxNiAxMzoyMzoxMiBHTVQnKVxuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5mcm9tUkZDMjgyMignRnJpLCAyNSBOb3YgMjAxNiAxMzoyMzoxMiArMDYwMCcpXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmZyb21SRkMyODIyKCcyNSBOb3YgMjAxNiAxMzoyMyBaJylcbiAgICogQHJldHVybiB7RGF0ZVRpbWV9XG4gICAqL1xuICBzdGF0aWMgZnJvbVJGQzI4MjIodGV4dCwgb3B0cyA9IHt9KSB7XG4gICAgY29uc3QgW3ZhbHMsIHBhcnNlZFpvbmVdID0gcGFyc2VSRkMyODIyRGF0ZSh0ZXh0KTtcbiAgICByZXR1cm4gcGFyc2VEYXRhVG9EYXRlVGltZSh2YWxzLCBwYXJzZWRab25lLCBvcHRzLCBcIlJGQyAyODIyXCIsIHRleHQpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIERhdGVUaW1lIGZyb20gYW4gSFRUUCBoZWFkZXIgZGF0ZVxuICAgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9Qcm90b2NvbHMvcmZjMjYxNi9yZmMyNjE2LXNlYzMuaHRtbCNzZWMzLjMuMVxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCAtIHRoZSBIVFRQIGhlYWRlciBkYXRlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIC0gb3B0aW9ucyB0byBhZmZlY3QgdGhlIGNyZWF0aW9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfFpvbmV9IFtvcHRzLnpvbmU9J2xvY2FsJ10gLSBjb252ZXJ0IHRoZSB0aW1lIHRvIHRoaXMgem9uZS4gU2luY2UgSFRUUCBkYXRlcyBhcmUgYWx3YXlzIGluIFVUQywgdGhpcyBoYXMgbm8gZWZmZWN0IG9uIHRoZSBpbnRlcnByZXRhdGlvbiBvZiBzdHJpbmcsIG1lcmVseSB0aGUgem9uZSB0aGUgcmVzdWx0aW5nIERhdGVUaW1lIGlzIGV4cHJlc3NlZCBpbi5cbiAgICogQHBhcmFtIHtib29sZWFufSBbb3B0cy5zZXRab25lPWZhbHNlXSAtIG92ZXJyaWRlIHRoZSB6b25lIHdpdGggdGhlIGZpeGVkLW9mZnNldCB6b25lIHNwZWNpZmllZCBpbiB0aGUgc3RyaW5nLiBGb3IgSFRUUCBkYXRlcywgdGhpcyBpcyBhbHdheXMgVVRDLCBzbyB0aGlzIG9wdGlvbiBpcyBlcXVpdmFsZW50IHRvIHNldHRpbmcgdGhlIGB6b25lYCBvcHRpb24gdG8gJ3V0YycsIGJ1dCB0aGlzIG9wdGlvbiBpcyBpbmNsdWRlZCBmb3IgY29uc2lzdGVuY3kgd2l0aCBzaW1pbGFyIG1ldGhvZHMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0cy5sb2NhbGU9J3N5c3RlbSdzIGxvY2FsZSddIC0gYSBsb2NhbGUgdG8gc2V0IG9uIHRoZSByZXN1bHRpbmcgRGF0ZVRpbWUgaW5zdGFuY2VcbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdHMub3V0cHV0Q2FsZW5kYXIgLSB0aGUgb3V0cHV0IGNhbGVuZGFyIHRvIHNldCBvbiB0aGUgcmVzdWx0aW5nIERhdGVUaW1lIGluc3RhbmNlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRzLm51bWJlcmluZ1N5c3RlbSAtIHRoZSBudW1iZXJpbmcgc3lzdGVtIHRvIHNldCBvbiB0aGUgcmVzdWx0aW5nIERhdGVUaW1lIGluc3RhbmNlXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmZyb21IVFRQKCdTdW4sIDA2IE5vdiAxOTk0IDA4OjQ5OjM3IEdNVCcpXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmZyb21IVFRQKCdTdW5kYXksIDA2LU5vdi05NCAwODo0OTozNyBHTVQnKVxuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5mcm9tSFRUUCgnU3VuIE5vdiAgNiAwODo0OTozNyAxOTk0JylcbiAgICogQHJldHVybiB7RGF0ZVRpbWV9XG4gICAqL1xuICBzdGF0aWMgZnJvbUhUVFAodGV4dCwgb3B0cyA9IHt9KSB7XG4gICAgY29uc3QgW3ZhbHMsIHBhcnNlZFpvbmVdID0gcGFyc2VIVFRQRGF0ZSh0ZXh0KTtcbiAgICByZXR1cm4gcGFyc2VEYXRhVG9EYXRlVGltZSh2YWxzLCBwYXJzZWRab25lLCBvcHRzLCBcIkhUVFBcIiwgb3B0cyk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgRGF0ZVRpbWUgZnJvbSBhbiBpbnB1dCBzdHJpbmcgYW5kIGZvcm1hdCBzdHJpbmcuXG4gICAqIERlZmF1bHRzIHRvIGVuLVVTIGlmIG5vIGxvY2FsZSBoYXMgYmVlbiBzcGVjaWZpZWQsIHJlZ2FyZGxlc3Mgb2YgdGhlIHN5c3RlbSdzIGxvY2FsZS4gRm9yIGEgdGFibGUgb2YgdG9rZW5zIGFuZCB0aGVpciBpbnRlcnByZXRhdGlvbnMsIHNlZSBbaGVyZV0oaHR0cHM6Ly9tb21lbnQuZ2l0aHViLmlvL2x1eG9uLyMvcGFyc2luZz9pZD10YWJsZS1vZi10b2tlbnMpLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCAtIHRoZSBzdHJpbmcgdG8gcGFyc2VcbiAgICogQHBhcmFtIHtzdHJpbmd9IGZtdCAtIHRoZSBmb3JtYXQgdGhlIHN0cmluZyBpcyBleHBlY3RlZCB0byBiZSBpbiAoc2VlIHRoZSBsaW5rIGJlbG93IGZvciB0aGUgZm9ybWF0cylcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdHMgLSBvcHRpb25zIHRvIGFmZmVjdCB0aGUgY3JlYXRpb25cbiAgICogQHBhcmFtIHtzdHJpbmd8Wm9uZX0gW29wdHMuem9uZT0nbG9jYWwnXSAtIHVzZSB0aGlzIHpvbmUgaWYgbm8gb2Zmc2V0IGlzIHNwZWNpZmllZCBpbiB0aGUgaW5wdXQgc3RyaW5nIGl0c2VsZi4gV2lsbCBhbHNvIGNvbnZlcnQgdGhlIERhdGVUaW1lIHRvIHRoaXMgem9uZVxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRzLnNldFpvbmU9ZmFsc2VdIC0gb3ZlcnJpZGUgdGhlIHpvbmUgd2l0aCBhIHpvbmUgc3BlY2lmaWVkIGluIHRoZSBzdHJpbmcgaXRzZWxmLCBpZiBpdCBzcGVjaWZpZXMgb25lXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0cy5sb2NhbGU9J2VuLVVTJ10gLSBhIGxvY2FsZSBzdHJpbmcgdG8gdXNlIHdoZW4gcGFyc2luZy4gV2lsbCBhbHNvIHNldCB0aGUgRGF0ZVRpbWUgdG8gdGhpcyBsb2NhbGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdHMubnVtYmVyaW5nU3lzdGVtIC0gdGhlIG51bWJlcmluZyBzeXN0ZW0gdG8gdXNlIHdoZW4gcGFyc2luZy4gV2lsbCBhbHNvIHNldCB0aGUgcmVzdWx0aW5nIERhdGVUaW1lIHRvIHRoaXMgbnVtYmVyaW5nIHN5c3RlbVxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0cy5vdXRwdXRDYWxlbmRhciAtIHRoZSBvdXRwdXQgY2FsZW5kYXIgdG8gc2V0IG9uIHRoZSByZXN1bHRpbmcgRGF0ZVRpbWUgaW5zdGFuY2VcbiAgICogQHJldHVybiB7RGF0ZVRpbWV9XG4gICAqL1xuICBzdGF0aWMgZnJvbUZvcm1hdCh0ZXh0LCBmbXQsIG9wdHMgPSB7fSkge1xuICAgIGlmIChpc1VuZGVmaW5lZCh0ZXh0KSB8fCBpc1VuZGVmaW5lZChmbXQpKSB7XG4gICAgICB0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXJyb3IoXCJmcm9tRm9ybWF0IHJlcXVpcmVzIGFuIGlucHV0IHN0cmluZyBhbmQgYSBmb3JtYXRcIik7XG4gICAgfVxuXG4gICAgY29uc3QgeyBsb2NhbGUgPSBudWxsLCBudW1iZXJpbmdTeXN0ZW0gPSBudWxsIH0gPSBvcHRzLFxuICAgICAgbG9jYWxlVG9Vc2UgPSBMb2NhbGUuZnJvbU9wdHMoe1xuICAgICAgICBsb2NhbGUsXG4gICAgICAgIG51bWJlcmluZ1N5c3RlbSxcbiAgICAgICAgZGVmYXVsdFRvRU46IHRydWUsXG4gICAgICB9KSxcbiAgICAgIFt2YWxzLCBwYXJzZWRab25lLCBzcGVjaWZpY09mZnNldCwgaW52YWxpZF0gPSBwYXJzZUZyb21Ub2tlbnMobG9jYWxlVG9Vc2UsIHRleHQsIGZtdCk7XG4gICAgaWYgKGludmFsaWQpIHtcbiAgICAgIHJldHVybiBEYXRlVGltZS5pbnZhbGlkKGludmFsaWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcGFyc2VEYXRhVG9EYXRlVGltZSh2YWxzLCBwYXJzZWRab25lLCBvcHRzLCBgZm9ybWF0ICR7Zm10fWAsIHRleHQsIHNwZWNpZmljT2Zmc2V0KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgdXNlIGZyb21Gb3JtYXQgaW5zdGVhZFxuICAgKi9cbiAgc3RhdGljIGZyb21TdHJpbmcodGV4dCwgZm10LCBvcHRzID0ge30pIHtcbiAgICByZXR1cm4gRGF0ZVRpbWUuZnJvbUZvcm1hdCh0ZXh0LCBmbXQsIG9wdHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIERhdGVUaW1lIGZyb20gYSBTUUwgZGF0ZSwgdGltZSwgb3IgZGF0ZXRpbWVcbiAgICogRGVmYXVsdHMgdG8gZW4tVVMgaWYgbm8gbG9jYWxlIGhhcyBiZWVuIHNwZWNpZmllZCwgcmVnYXJkbGVzcyBvZiB0aGUgc3lzdGVtJ3MgbG9jYWxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IC0gdGhlIHN0cmluZyB0byBwYXJzZVxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0cyAtIG9wdGlvbnMgdG8gYWZmZWN0IHRoZSBjcmVhdGlvblxuICAgKiBAcGFyYW0ge3N0cmluZ3xab25lfSBbb3B0cy56b25lPSdsb2NhbCddIC0gdXNlIHRoaXMgem9uZSBpZiBubyBvZmZzZXQgaXMgc3BlY2lmaWVkIGluIHRoZSBpbnB1dCBzdHJpbmcgaXRzZWxmLiBXaWxsIGFsc28gY29udmVydCB0aGUgRGF0ZVRpbWUgdG8gdGhpcyB6b25lXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdHMuc2V0Wm9uZT1mYWxzZV0gLSBvdmVycmlkZSB0aGUgem9uZSB3aXRoIGEgem9uZSBzcGVjaWZpZWQgaW4gdGhlIHN0cmluZyBpdHNlbGYsIGlmIGl0IHNwZWNpZmllcyBvbmVcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRzLmxvY2FsZT0nZW4tVVMnXSAtIGEgbG9jYWxlIHN0cmluZyB0byB1c2Ugd2hlbiBwYXJzaW5nLiBXaWxsIGFsc28gc2V0IHRoZSBEYXRlVGltZSB0byB0aGlzIGxvY2FsZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0cy5udW1iZXJpbmdTeXN0ZW0gLSB0aGUgbnVtYmVyaW5nIHN5c3RlbSB0byB1c2Ugd2hlbiBwYXJzaW5nLiBXaWxsIGFsc28gc2V0IHRoZSByZXN1bHRpbmcgRGF0ZVRpbWUgdG8gdGhpcyBudW1iZXJpbmcgc3lzdGVtXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRzLm91dHB1dENhbGVuZGFyIC0gdGhlIG91dHB1dCBjYWxlbmRhciB0byBzZXQgb24gdGhlIHJlc3VsdGluZyBEYXRlVGltZSBpbnN0YW5jZVxuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5mcm9tU1FMKCcyMDE3LTA1LTE1JylcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUuZnJvbVNRTCgnMjAxNy0wNS0xNSAwOToxMjozNCcpXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmZyb21TUUwoJzIwMTctMDUtMTUgMDk6MTI6MzQuMzQyJylcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUuZnJvbVNRTCgnMjAxNy0wNS0xNSAwOToxMjozNC4zNDIrMDY6MDAnKVxuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5mcm9tU1FMKCcyMDE3LTA1LTE1IDA5OjEyOjM0LjM0MiBBbWVyaWNhL0xvc19BbmdlbGVzJylcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUuZnJvbVNRTCgnMjAxNy0wNS0xNSAwOToxMjozNC4zNDIgQW1lcmljYS9Mb3NfQW5nZWxlcycsIHsgc2V0Wm9uZTogdHJ1ZSB9KVxuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5mcm9tU1FMKCcyMDE3LTA1LTE1IDA5OjEyOjM0LjM0MicsIHsgem9uZTogJ0FtZXJpY2EvTG9zX0FuZ2VsZXMnIH0pXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmZyb21TUUwoJzA5OjEyOjM0LjM0MicpXG4gICAqIEByZXR1cm4ge0RhdGVUaW1lfVxuICAgKi9cbiAgc3RhdGljIGZyb21TUUwodGV4dCwgb3B0cyA9IHt9KSB7XG4gICAgY29uc3QgW3ZhbHMsIHBhcnNlZFpvbmVdID0gcGFyc2VTUUwodGV4dCk7XG4gICAgcmV0dXJuIHBhcnNlRGF0YVRvRGF0ZVRpbWUodmFscywgcGFyc2VkWm9uZSwgb3B0cywgXCJTUUxcIiwgdGV4dCk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGFuIGludmFsaWQgRGF0ZVRpbWUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWFzb24gLSBzaW1wbGUgc3RyaW5nIG9mIHdoeSB0aGlzIERhdGVUaW1lIGlzIGludmFsaWQuIFNob3VsZCBub3QgY29udGFpbiBwYXJhbWV0ZXJzIG9yIGFueXRoaW5nIGVsc2UgZGF0YS1kZXBlbmRlbnRcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtleHBsYW5hdGlvbj1udWxsXSAtIGxvbmdlciBleHBsYW5hdGlvbiwgbWF5IGluY2x1ZGUgcGFyYW1ldGVycyBhbmQgb3RoZXIgdXNlZnVsIGRlYnVnZ2luZyBpbmZvcm1hdGlvblxuICAgKiBAcmV0dXJuIHtEYXRlVGltZX1cbiAgICovXG4gIHN0YXRpYyBpbnZhbGlkKHJlYXNvbiwgZXhwbGFuYXRpb24gPSBudWxsKSB7XG4gICAgaWYgKCFyZWFzb24pIHtcbiAgICAgIHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFcnJvcihcIm5lZWQgdG8gc3BlY2lmeSBhIHJlYXNvbiB0aGUgRGF0ZVRpbWUgaXMgaW52YWxpZFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBpbnZhbGlkID0gcmVhc29uIGluc3RhbmNlb2YgSW52YWxpZCA/IHJlYXNvbiA6IG5ldyBJbnZhbGlkKHJlYXNvbiwgZXhwbGFuYXRpb24pO1xuXG4gICAgaWYgKFNldHRpbmdzLnRocm93T25JbnZhbGlkKSB7XG4gICAgICB0aHJvdyBuZXcgSW52YWxpZERhdGVUaW1lRXJyb3IoaW52YWxpZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgRGF0ZVRpbWUoeyBpbnZhbGlkIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhbiBvYmplY3QgaXMgYW4gaW5zdGFuY2Ugb2YgRGF0ZVRpbWUuIFdvcmtzIGFjcm9zcyBjb250ZXh0IGJvdW5kYXJpZXNcbiAgICogQHBhcmFtIHtvYmplY3R9IG9cbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIHN0YXRpYyBpc0RhdGVUaW1lKG8pIHtcbiAgICByZXR1cm4gKG8gJiYgby5pc0x1eG9uRGF0ZVRpbWUpIHx8IGZhbHNlO1xuICB9XG5cbiAgLy8gSU5GT1xuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHZhbHVlIG9mIHVuaXQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1bml0IC0gYSB1bml0IHN1Y2ggYXMgJ21pbnV0ZScgb3IgJ2RheSdcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoMjAxNywgNywgNCkuZ2V0KCdtb250aCcpOyAvLz0+IDdcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoMjAxNywgNywgNCkuZ2V0KCdkYXknKTsgLy89PiA0XG4gICAqIEByZXR1cm4ge251bWJlcn1cbiAgICovXG4gIGdldCh1bml0KSB7XG4gICAgcmV0dXJuIHRoaXNbdW5pdF07XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB3aGV0aGVyIHRoZSBEYXRlVGltZSBpcyB2YWxpZC4gSW52YWxpZCBEYXRlVGltZXMgb2NjdXIgd2hlbjpcbiAgICogKiBUaGUgRGF0ZVRpbWUgd2FzIGNyZWF0ZWQgZnJvbSBpbnZhbGlkIGNhbGVuZGFyIGluZm9ybWF0aW9uLCBzdWNoIGFzIHRoZSAxM3RoIG1vbnRoIG9yIEZlYnJ1YXJ5IDMwXG4gICAqICogVGhlIERhdGVUaW1lIHdhcyBjcmVhdGVkIGJ5IGFuIG9wZXJhdGlvbiBvbiBhbm90aGVyIGludmFsaWQgZGF0ZVxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICovXG4gIGdldCBpc1ZhbGlkKCkge1xuICAgIHJldHVybiB0aGlzLmludmFsaWQgPT09IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBlcnJvciBjb2RlIGlmIHRoaXMgRGF0ZVRpbWUgaXMgaW52YWxpZCwgb3IgbnVsbCBpZiB0aGUgRGF0ZVRpbWUgaXMgdmFsaWRcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIGdldCBpbnZhbGlkUmVhc29uKCkge1xuICAgIHJldHVybiB0aGlzLmludmFsaWQgPyB0aGlzLmludmFsaWQucmVhc29uIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIGV4cGxhbmF0aW9uIG9mIHdoeSB0aGlzIERhdGVUaW1lIGJlY2FtZSBpbnZhbGlkLCBvciBudWxsIGlmIHRoZSBEYXRlVGltZSBpcyB2YWxpZFxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgZ2V0IGludmFsaWRFeHBsYW5hdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5pbnZhbGlkID8gdGhpcy5pbnZhbGlkLmV4cGxhbmF0aW9uIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGxvY2FsZSBvZiBhIERhdGVUaW1lLCBzdWNoICdlbi1HQicuIFRoZSBsb2NhbGUgaXMgdXNlZCB3aGVuIGZvcm1hdHRpbmcgdGhlIERhdGVUaW1lXG4gICAqXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuICBnZXQgbG9jYWxlKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyB0aGlzLmxvYy5sb2NhbGUgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbnVtYmVyaW5nIHN5c3RlbSBvZiBhIERhdGVUaW1lLCBzdWNoICdiZW5nJy4gVGhlIG51bWJlcmluZyBzeXN0ZW0gaXMgdXNlZCB3aGVuIGZvcm1hdHRpbmcgdGhlIERhdGVUaW1lXG4gICAqXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuICBnZXQgbnVtYmVyaW5nU3lzdGVtKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyB0aGlzLmxvYy5udW1iZXJpbmdTeXN0ZW0gOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgb3V0cHV0IGNhbGVuZGFyIG9mIGEgRGF0ZVRpbWUsIHN1Y2ggJ2lzbGFtaWMnLiBUaGUgb3V0cHV0IGNhbGVuZGFyIGlzIHVzZWQgd2hlbiBmb3JtYXR0aW5nIHRoZSBEYXRlVGltZVxuICAgKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgZ2V0IG91dHB1dENhbGVuZGFyKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyB0aGlzLmxvYy5vdXRwdXRDYWxlbmRhciA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSB0aW1lIHpvbmUgYXNzb2NpYXRlZCB3aXRoIHRoaXMgRGF0ZVRpbWUuXG4gICAqIEB0eXBlIHtab25lfVxuICAgKi9cbiAgZ2V0IHpvbmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3pvbmU7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBuYW1lIG9mIHRoZSB0aW1lIHpvbmUuXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuICBnZXQgem9uZU5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNWYWxpZCA/IHRoaXMuem9uZS5uYW1lIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHllYXJcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoMjAxNywgNSwgMjUpLnllYXIgLy89PiAyMDE3XG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqL1xuICBnZXQgeWVhcigpIHtcbiAgICByZXR1cm4gdGhpcy5pc1ZhbGlkID8gdGhpcy5jLnllYXIgOiBOYU47XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBxdWFydGVyXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKDIwMTcsIDUsIDI1KS5xdWFydGVyIC8vPT4gMlxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKi9cbiAgZ2V0IHF1YXJ0ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNWYWxpZCA/IE1hdGguY2VpbCh0aGlzLmMubW9udGggLyAzKSA6IE5hTjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIG1vbnRoICgxLTEyKS5cbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoMjAxNywgNSwgMjUpLm1vbnRoIC8vPT4gNVxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKi9cbiAgZ2V0IG1vbnRoKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyB0aGlzLmMubW9udGggOiBOYU47XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBkYXkgb2YgdGhlIG1vbnRoICgxLTMwaXNoKS5cbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoMjAxNywgNSwgMjUpLmRheSAvLz0+IDI1XG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqL1xuICBnZXQgZGF5KCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyB0aGlzLmMuZGF5IDogTmFOO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgaG91ciBvZiB0aGUgZGF5ICgwLTIzKS5cbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoMjAxNywgNSwgMjUsIDkpLmhvdXIgLy89PiA5XG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqL1xuICBnZXQgaG91cigpIHtcbiAgICByZXR1cm4gdGhpcy5pc1ZhbGlkID8gdGhpcy5jLmhvdXIgOiBOYU47XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBtaW51dGUgb2YgdGhlIGhvdXIgKDAtNTkpLlxuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5sb2NhbCgyMDE3LCA1LCAyNSwgOSwgMzApLm1pbnV0ZSAvLz0+IDMwXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqL1xuICBnZXQgbWludXRlKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyB0aGlzLmMubWludXRlIDogTmFOO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgc2Vjb25kIG9mIHRoZSBtaW51dGUgKDAtNTkpLlxuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5sb2NhbCgyMDE3LCA1LCAyNSwgOSwgMzAsIDUyKS5zZWNvbmQgLy89PiA1MlxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKi9cbiAgZ2V0IHNlY29uZCgpIHtcbiAgICByZXR1cm4gdGhpcy5pc1ZhbGlkID8gdGhpcy5jLnNlY29uZCA6IE5hTjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIG1pbGxpc2Vjb25kIG9mIHRoZSBzZWNvbmQgKDAtOTk5KS5cbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoMjAxNywgNSwgMjUsIDksIDMwLCA1MiwgNjU0KS5taWxsaXNlY29uZCAvLz0+IDY1NFxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKi9cbiAgZ2V0IG1pbGxpc2Vjb25kKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyB0aGlzLmMubWlsbGlzZWNvbmQgOiBOYU47XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSB3ZWVrIHllYXJcbiAgICogQHNlZSBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fd2Vla19kYXRlXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKDIwMTQsIDEyLCAzMSkud2Vla1llYXIgLy89PiAyMDE1XG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqL1xuICBnZXQgd2Vla1llYXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNWYWxpZCA/IHBvc3NpYmx5Q2FjaGVkV2Vla0RhdGEodGhpcykud2Vla1llYXIgOiBOYU47XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSB3ZWVrIG51bWJlciBvZiB0aGUgd2VlayB5ZWFyICgxLTUyaXNoKS5cbiAgICogQHNlZSBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fd2Vla19kYXRlXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKDIwMTcsIDUsIDI1KS53ZWVrTnVtYmVyIC8vPT4gMjFcbiAgICogQHR5cGUge251bWJlcn1cbiAgICovXG4gIGdldCB3ZWVrTnVtYmVyKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyBwb3NzaWJseUNhY2hlZFdlZWtEYXRhKHRoaXMpLndlZWtOdW1iZXIgOiBOYU47XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBkYXkgb2YgdGhlIHdlZWsuXG4gICAqIDEgaXMgTW9uZGF5IGFuZCA3IGlzIFN1bmRheVxuICAgKiBAc2VlIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0lTT193ZWVrX2RhdGVcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoMjAxNCwgMTEsIDMxKS53ZWVrZGF5IC8vPT4gNFxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKi9cbiAgZ2V0IHdlZWtkYXkoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNWYWxpZCA/IHBvc3NpYmx5Q2FjaGVkV2Vla0RhdGEodGhpcykud2Vla2RheSA6IE5hTjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIG9yZGluYWwgKG1lYW5pbmcgdGhlIGRheSBvZiB0aGUgeWVhcilcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoMjAxNywgNSwgMjUpLm9yZGluYWwgLy89PiAxNDVcbiAgICogQHR5cGUge251bWJlcnxEYXRlVGltZX1cbiAgICovXG4gIGdldCBvcmRpbmFsKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyBncmVnb3JpYW5Ub09yZGluYWwodGhpcy5jKS5vcmRpbmFsIDogTmFOO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgaHVtYW4gcmVhZGFibGUgc2hvcnQgbW9udGggbmFtZSwgc3VjaCBhcyAnT2N0Jy5cbiAgICogRGVmYXVsdHMgdG8gdGhlIHN5c3RlbSdzIGxvY2FsZSBpZiBubyBsb2NhbGUgaGFzIGJlZW4gc3BlY2lmaWVkXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKDIwMTcsIDEwLCAzMCkubW9udGhTaG9ydCAvLz0+IE9jdFxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgZ2V0IG1vbnRoU2hvcnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNWYWxpZCA/IEluZm8ubW9udGhzKFwic2hvcnRcIiwgeyBsb2NPYmo6IHRoaXMubG9jIH0pW3RoaXMubW9udGggLSAxXSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBodW1hbiByZWFkYWJsZSBsb25nIG1vbnRoIG5hbWUsIHN1Y2ggYXMgJ09jdG9iZXInLlxuICAgKiBEZWZhdWx0cyB0byB0aGUgc3lzdGVtJ3MgbG9jYWxlIGlmIG5vIGxvY2FsZSBoYXMgYmVlbiBzcGVjaWZpZWRcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoMjAxNywgMTAsIDMwKS5tb250aExvbmcgLy89PiBPY3RvYmVyXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuICBnZXQgbW9udGhMb25nKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyBJbmZvLm1vbnRocyhcImxvbmdcIiwgeyBsb2NPYmo6IHRoaXMubG9jIH0pW3RoaXMubW9udGggLSAxXSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBodW1hbiByZWFkYWJsZSBzaG9ydCB3ZWVrZGF5LCBzdWNoIGFzICdNb24nLlxuICAgKiBEZWZhdWx0cyB0byB0aGUgc3lzdGVtJ3MgbG9jYWxlIGlmIG5vIGxvY2FsZSBoYXMgYmVlbiBzcGVjaWZpZWRcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoMjAxNywgMTAsIDMwKS53ZWVrZGF5U2hvcnQgLy89PiBNb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIGdldCB3ZWVrZGF5U2hvcnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNWYWxpZCA/IEluZm8ud2Vla2RheXMoXCJzaG9ydFwiLCB7IGxvY09iajogdGhpcy5sb2MgfSlbdGhpcy53ZWVrZGF5IC0gMV0gOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgaHVtYW4gcmVhZGFibGUgbG9uZyB3ZWVrZGF5LCBzdWNoIGFzICdNb25kYXknLlxuICAgKiBEZWZhdWx0cyB0byB0aGUgc3lzdGVtJ3MgbG9jYWxlIGlmIG5vIGxvY2FsZSBoYXMgYmVlbiBzcGVjaWZpZWRcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoMjAxNywgMTAsIDMwKS53ZWVrZGF5TG9uZyAvLz0+IE1vbmRheVxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgZ2V0IHdlZWtkYXlMb25nKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyBJbmZvLndlZWtkYXlzKFwibG9uZ1wiLCB7IGxvY09iajogdGhpcy5sb2MgfSlbdGhpcy53ZWVrZGF5IC0gMV0gOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgVVRDIG9mZnNldCBvZiB0aGlzIERhdGVUaW1lIGluIG1pbnV0ZXNcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubm93KCkub2Zmc2V0IC8vPT4gLTI0MFxuICAgKiBAZXhhbXBsZSBEYXRlVGltZS51dGMoKS5vZmZzZXQgLy89PiAwXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqL1xuICBnZXQgb2Zmc2V0KCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyArdGhpcy5vIDogTmFOO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgc2hvcnQgaHVtYW4gbmFtZSBmb3IgdGhlIHpvbmUncyBjdXJyZW50IG9mZnNldCwgZm9yIGV4YW1wbGUgXCJFU1RcIiBvciBcIkVEVFwiLlxuICAgKiBEZWZhdWx0cyB0byB0aGUgc3lzdGVtJ3MgbG9jYWxlIGlmIG5vIGxvY2FsZSBoYXMgYmVlbiBzcGVjaWZpZWRcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIGdldCBvZmZzZXROYW1lU2hvcnQoKSB7XG4gICAgaWYgKHRoaXMuaXNWYWxpZCkge1xuICAgICAgcmV0dXJuIHRoaXMuem9uZS5vZmZzZXROYW1lKHRoaXMudHMsIHtcbiAgICAgICAgZm9ybWF0OiBcInNob3J0XCIsXG4gICAgICAgIGxvY2FsZTogdGhpcy5sb2NhbGUsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbG9uZyBodW1hbiBuYW1lIGZvciB0aGUgem9uZSdzIGN1cnJlbnQgb2Zmc2V0LCBmb3IgZXhhbXBsZSBcIkVhc3Rlcm4gU3RhbmRhcmQgVGltZVwiIG9yIFwiRWFzdGVybiBEYXlsaWdodCBUaW1lXCIuXG4gICAqIERlZmF1bHRzIHRvIHRoZSBzeXN0ZW0ncyBsb2NhbGUgaWYgbm8gbG9jYWxlIGhhcyBiZWVuIHNwZWNpZmllZFxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgZ2V0IG9mZnNldE5hbWVMb25nKCkge1xuICAgIGlmICh0aGlzLmlzVmFsaWQpIHtcbiAgICAgIHJldHVybiB0aGlzLnpvbmUub2Zmc2V0TmFtZSh0aGlzLnRzLCB7XG4gICAgICAgIGZvcm1hdDogXCJsb25nXCIsXG4gICAgICAgIGxvY2FsZTogdGhpcy5sb2NhbGUsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB3aGV0aGVyIHRoaXMgem9uZSdzIG9mZnNldCBldmVyIGNoYW5nZXMsIGFzIGluIGEgRFNULlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICovXG4gIGdldCBpc09mZnNldEZpeGVkKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyB0aGlzLnpvbmUuaXNVbml2ZXJzYWwgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB3aGV0aGVyIHRoZSBEYXRlVGltZSBpcyBpbiBhIERTVC5cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuICBnZXQgaXNJbkRTVCgpIHtcbiAgICBpZiAodGhpcy5pc09mZnNldEZpeGVkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIHRoaXMub2Zmc2V0ID4gdGhpcy5zZXQoeyBtb250aDogMSwgZGF5OiAxIH0pLm9mZnNldCB8fFxuICAgICAgICB0aGlzLm9mZnNldCA+IHRoaXMuc2V0KHsgbW9udGg6IDUgfSkub2Zmc2V0XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyBEYXRlVGltZSBpcyBpbiBhIGxlYXAgeWVhciwgZmFsc2Ugb3RoZXJ3aXNlXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKDIwMTYpLmlzSW5MZWFwWWVhciAvLz0+IHRydWVcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoMjAxMykuaXNJbkxlYXBZZWFyIC8vPT4gZmFsc2VcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuICBnZXQgaXNJbkxlYXBZZWFyKCkge1xuICAgIHJldHVybiBpc0xlYXBZZWFyKHRoaXMueWVhcik7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGRheXMgaW4gdGhpcyBEYXRlVGltZSdzIG1vbnRoXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKDIwMTYsIDIpLmRheXNJbk1vbnRoIC8vPT4gMjlcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoMjAxNiwgMykuZGF5c0luTW9udGggLy89PiAzMVxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKi9cbiAgZ2V0IGRheXNJbk1vbnRoKCkge1xuICAgIHJldHVybiBkYXlzSW5Nb250aCh0aGlzLnllYXIsIHRoaXMubW9udGgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIG51bWJlciBvZiBkYXlzIGluIHRoaXMgRGF0ZVRpbWUncyB5ZWFyXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKDIwMTYpLmRheXNJblllYXIgLy89PiAzNjZcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoMjAxMykuZGF5c0luWWVhciAvLz0+IDM2NVxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKi9cbiAgZ2V0IGRheXNJblllYXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNWYWxpZCA/IGRheXNJblllYXIodGhpcy55ZWFyKSA6IE5hTjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2Ygd2Vla3MgaW4gdGhpcyBEYXRlVGltZSdzIHllYXJcbiAgICogQHNlZSBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fd2Vla19kYXRlXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKDIwMDQpLndlZWtzSW5XZWVrWWVhciAvLz0+IDUzXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKDIwMTMpLndlZWtzSW5XZWVrWWVhciAvLz0+IDUyXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqL1xuICBnZXQgd2Vla3NJbldlZWtZZWFyKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyB3ZWVrc0luV2Vla1llYXIodGhpcy53ZWVrWWVhcikgOiBOYU47XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcmVzb2x2ZWQgSW50bCBvcHRpb25zIGZvciB0aGlzIERhdGVUaW1lLlxuICAgKiBUaGlzIGlzIHVzZWZ1bCBpbiB1bmRlcnN0YW5kaW5nIHRoZSBiZWhhdmlvciBvZiBmb3JtYXR0aW5nIG1ldGhvZHNcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdHMgLSB0aGUgc2FtZSBvcHRpb25zIGFzIHRvTG9jYWxlU3RyaW5nXG4gICAqIEByZXR1cm4ge09iamVjdH1cbiAgICovXG4gIHJlc29sdmVkTG9jYWxlT3B0aW9ucyhvcHRzID0ge30pIHtcbiAgICBjb25zdCB7IGxvY2FsZSwgbnVtYmVyaW5nU3lzdGVtLCBjYWxlbmRhciB9ID0gRm9ybWF0dGVyLmNyZWF0ZShcbiAgICAgIHRoaXMubG9jLmNsb25lKG9wdHMpLFxuICAgICAgb3B0c1xuICAgICkucmVzb2x2ZWRPcHRpb25zKHRoaXMpO1xuICAgIHJldHVybiB7IGxvY2FsZSwgbnVtYmVyaW5nU3lzdGVtLCBvdXRwdXRDYWxlbmRhcjogY2FsZW5kYXIgfTtcbiAgfVxuXG4gIC8vIFRSQU5TRk9STVxuXG4gIC8qKlxuICAgKiBcIlNldFwiIHRoZSBEYXRlVGltZSdzIHpvbmUgdG8gVVRDLiBSZXR1cm5zIGEgbmV3bHktY29uc3RydWN0ZWQgRGF0ZVRpbWUuXG4gICAqXG4gICAqIEVxdWl2YWxlbnQgdG8ge0BsaW5rIERhdGVUaW1lI3NldFpvbmV9KCd1dGMnKVxuICAgKiBAcGFyYW0ge251bWJlcn0gW29mZnNldD0wXSAtIG9wdGlvbmFsbHksIGFuIG9mZnNldCBmcm9tIFVUQyBpbiBtaW51dGVzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0cz17fV0gLSBvcHRpb25zIHRvIHBhc3MgdG8gYHNldFpvbmUoKWBcbiAgICogQHJldHVybiB7RGF0ZVRpbWV9XG4gICAqL1xuICB0b1VUQyhvZmZzZXQgPSAwLCBvcHRzID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5zZXRab25lKEZpeGVkT2Zmc2V0Wm9uZS5pbnN0YW5jZShvZmZzZXQpLCBvcHRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBcIlNldFwiIHRoZSBEYXRlVGltZSdzIHpvbmUgdG8gdGhlIGhvc3QncyBsb2NhbCB6b25lLiBSZXR1cm5zIGEgbmV3bHktY29uc3RydWN0ZWQgRGF0ZVRpbWUuXG4gICAqXG4gICAqIEVxdWl2YWxlbnQgdG8gYHNldFpvbmUoJ2xvY2FsJylgXG4gICAqIEByZXR1cm4ge0RhdGVUaW1lfVxuICAgKi9cbiAgdG9Mb2NhbCgpIHtcbiAgICByZXR1cm4gdGhpcy5zZXRab25lKFNldHRpbmdzLmRlZmF1bHRab25lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBcIlNldFwiIHRoZSBEYXRlVGltZSdzIHpvbmUgdG8gc3BlY2lmaWVkIHpvbmUuIFJldHVybnMgYSBuZXdseS1jb25zdHJ1Y3RlZCBEYXRlVGltZS5cbiAgICpcbiAgICogQnkgZGVmYXVsdCwgdGhlIHNldHRlciBrZWVwcyB0aGUgdW5kZXJseWluZyB0aW1lIHRoZSBzYW1lIChhcyBpbiwgdGhlIHNhbWUgdGltZXN0YW1wKSwgYnV0IHRoZSBuZXcgaW5zdGFuY2Ugd2lsbCByZXBvcnQgZGlmZmVyZW50IGxvY2FsIHRpbWVzIGFuZCBjb25zaWRlciBEU1RzIHdoZW4gbWFraW5nIGNvbXB1dGF0aW9ucywgYXMgd2l0aCB7QGxpbmsgRGF0ZVRpbWUjcGx1c30uIFlvdSBtYXkgd2lzaCB0byB1c2Uge0BsaW5rIERhdGVUaW1lI3RvTG9jYWx9IGFuZCB7QGxpbmsgRGF0ZVRpbWUjdG9VVEN9IHdoaWNoIHByb3ZpZGUgc2ltcGxlIGNvbnZlbmllbmNlIHdyYXBwZXJzIGZvciBjb21tb25seSB1c2VkIHpvbmVzLlxuICAgKiBAcGFyYW0ge3N0cmluZ3xab25lfSBbem9uZT0nbG9jYWwnXSAtIGEgem9uZSBpZGVudGlmaWVyLiBBcyBhIHN0cmluZywgdGhhdCBjYW4gYmUgYW55IElBTkEgem9uZSBzdXBwb3J0ZWQgYnkgdGhlIGhvc3QgZW52aXJvbm1lbnQsIG9yIGEgZml4ZWQtb2Zmc2V0IG5hbWUgb2YgdGhlIGZvcm0gJ1VUQyszJywgb3IgdGhlIHN0cmluZ3MgJ2xvY2FsJyBvciAndXRjJy4gWW91IG1heSBhbHNvIHN1cHBseSBhbiBpbnN0YW5jZSBvZiBhIHtAbGluayBEYXRlVGltZSNab25lfSBjbGFzcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdHMgLSBvcHRpb25zXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdHMua2VlcExvY2FsVGltZT1mYWxzZV0gLSBJZiB0cnVlLCBhZGp1c3QgdGhlIHVuZGVybHlpbmcgdGltZSBzbyB0aGF0IHRoZSBsb2NhbCB0aW1lIHN0YXlzIHRoZSBzYW1lLCBidXQgaW4gdGhlIHRhcmdldCB6b25lLiBZb3Ugc2hvdWxkIHJhcmVseSBuZWVkIHRoaXMuXG4gICAqIEByZXR1cm4ge0RhdGVUaW1lfVxuICAgKi9cbiAgc2V0Wm9uZSh6b25lLCB7IGtlZXBMb2NhbFRpbWUgPSBmYWxzZSwga2VlcENhbGVuZGFyVGltZSA9IGZhbHNlIH0gPSB7fSkge1xuICAgIHpvbmUgPSBub3JtYWxpemVab25lKHpvbmUsIFNldHRpbmdzLmRlZmF1bHRab25lKTtcbiAgICBpZiAoem9uZS5lcXVhbHModGhpcy56b25lKSkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSBlbHNlIGlmICghem9uZS5pc1ZhbGlkKSB7XG4gICAgICByZXR1cm4gRGF0ZVRpbWUuaW52YWxpZCh1bnN1cHBvcnRlZFpvbmUoem9uZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgbmV3VFMgPSB0aGlzLnRzO1xuICAgICAgaWYgKGtlZXBMb2NhbFRpbWUgfHwga2VlcENhbGVuZGFyVGltZSkge1xuICAgICAgICBjb25zdCBvZmZzZXRHdWVzcyA9IHpvbmUub2Zmc2V0KHRoaXMudHMpO1xuICAgICAgICBjb25zdCBhc09iaiA9IHRoaXMudG9PYmplY3QoKTtcbiAgICAgICAgW25ld1RTXSA9IG9ialRvVFMoYXNPYmosIG9mZnNldEd1ZXNzLCB6b25lKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjbG9uZSh0aGlzLCB7IHRzOiBuZXdUUywgem9uZSB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogXCJTZXRcIiB0aGUgbG9jYWxlLCBudW1iZXJpbmdTeXN0ZW0sIG9yIG91dHB1dENhbGVuZGFyLiBSZXR1cm5zIGEgbmV3bHktY29uc3RydWN0ZWQgRGF0ZVRpbWUuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wZXJ0aWVzIC0gdGhlIHByb3BlcnRpZXMgdG8gc2V0XG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKDIwMTcsIDUsIDI1KS5yZWNvbmZpZ3VyZSh7IGxvY2FsZTogJ2VuLUdCJyB9KVxuICAgKiBAcmV0dXJuIHtEYXRlVGltZX1cbiAgICovXG4gIHJlY29uZmlndXJlKHsgbG9jYWxlLCBudW1iZXJpbmdTeXN0ZW0sIG91dHB1dENhbGVuZGFyIH0gPSB7fSkge1xuICAgIGNvbnN0IGxvYyA9IHRoaXMubG9jLmNsb25lKHsgbG9jYWxlLCBudW1iZXJpbmdTeXN0ZW0sIG91dHB1dENhbGVuZGFyIH0pO1xuICAgIHJldHVybiBjbG9uZSh0aGlzLCB7IGxvYyB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBcIlNldFwiIHRoZSBsb2NhbGUuIFJldHVybnMgYSBuZXdseS1jb25zdHJ1Y3RlZCBEYXRlVGltZS5cbiAgICogSnVzdCBhIGNvbnZlbmllbnQgYWxpYXMgZm9yIHJlY29uZmlndXJlKHsgbG9jYWxlIH0pXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKDIwMTcsIDUsIDI1KS5zZXRMb2NhbGUoJ2VuLUdCJylcbiAgICogQHJldHVybiB7RGF0ZVRpbWV9XG4gICAqL1xuICBzZXRMb2NhbGUobG9jYWxlKSB7XG4gICAgcmV0dXJuIHRoaXMucmVjb25maWd1cmUoeyBsb2NhbGUgfSk7XG4gIH1cblxuICAvKipcbiAgICogXCJTZXRcIiB0aGUgdmFsdWVzIG9mIHNwZWNpZmllZCB1bml0cy4gUmV0dXJucyBhIG5ld2x5LWNvbnN0cnVjdGVkIERhdGVUaW1lLlxuICAgKiBZb3UgY2FuIG9ubHkgc2V0IHVuaXRzIHdpdGggdGhpcyBtZXRob2Q7IGZvciBcInNldHRpbmdcIiBtZXRhZGF0YSwgc2VlIHtAbGluayBEYXRlVGltZSNyZWNvbmZpZ3VyZX0gYW5kIHtAbGluayBEYXRlVGltZSNzZXRab25lfS5cbiAgICogQHBhcmFtIHtPYmplY3R9IHZhbHVlcyAtIGEgbWFwcGluZyBvZiB1bml0cyB0byBudW1iZXJzXG4gICAqIEBleGFtcGxlIGR0LnNldCh7IHllYXI6IDIwMTcgfSlcbiAgICogQGV4YW1wbGUgZHQuc2V0KHsgaG91cjogOCwgbWludXRlOiAzMCB9KVxuICAgKiBAZXhhbXBsZSBkdC5zZXQoeyB3ZWVrZGF5OiA1IH0pXG4gICAqIEBleGFtcGxlIGR0LnNldCh7IHllYXI6IDIwMDUsIG9yZGluYWw6IDIzNCB9KVxuICAgKiBAcmV0dXJuIHtEYXRlVGltZX1cbiAgICovXG4gIHNldCh2YWx1ZXMpIHtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZCkgcmV0dXJuIHRoaXM7XG5cbiAgICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplT2JqZWN0KHZhbHVlcywgbm9ybWFsaXplVW5pdCksXG4gICAgICBzZXR0aW5nV2Vla1N0dWZmID1cbiAgICAgICAgIWlzVW5kZWZpbmVkKG5vcm1hbGl6ZWQud2Vla1llYXIpIHx8XG4gICAgICAgICFpc1VuZGVmaW5lZChub3JtYWxpemVkLndlZWtOdW1iZXIpIHx8XG4gICAgICAgICFpc1VuZGVmaW5lZChub3JtYWxpemVkLndlZWtkYXkpLFxuICAgICAgY29udGFpbnNPcmRpbmFsID0gIWlzVW5kZWZpbmVkKG5vcm1hbGl6ZWQub3JkaW5hbCksXG4gICAgICBjb250YWluc0dyZWdvclllYXIgPSAhaXNVbmRlZmluZWQobm9ybWFsaXplZC55ZWFyKSxcbiAgICAgIGNvbnRhaW5zR3JlZ29yTUQgPSAhaXNVbmRlZmluZWQobm9ybWFsaXplZC5tb250aCkgfHwgIWlzVW5kZWZpbmVkKG5vcm1hbGl6ZWQuZGF5KSxcbiAgICAgIGNvbnRhaW5zR3JlZ29yID0gY29udGFpbnNHcmVnb3JZZWFyIHx8IGNvbnRhaW5zR3JlZ29yTUQsXG4gICAgICBkZWZpbml0ZVdlZWtEZWYgPSBub3JtYWxpemVkLndlZWtZZWFyIHx8IG5vcm1hbGl6ZWQud2Vla051bWJlcjtcblxuICAgIGlmICgoY29udGFpbnNHcmVnb3IgfHwgY29udGFpbnNPcmRpbmFsKSAmJiBkZWZpbml0ZVdlZWtEZWYpIHtcbiAgICAgIHRocm93IG5ldyBDb25mbGljdGluZ1NwZWNpZmljYXRpb25FcnJvcihcbiAgICAgICAgXCJDYW4ndCBtaXggd2Vla1llYXIvd2Vla051bWJlciB1bml0cyB3aXRoIHllYXIvbW9udGgvZGF5IG9yIG9yZGluYWxzXCJcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKGNvbnRhaW5zR3JlZ29yTUQgJiYgY29udGFpbnNPcmRpbmFsKSB7XG4gICAgICB0aHJvdyBuZXcgQ29uZmxpY3RpbmdTcGVjaWZpY2F0aW9uRXJyb3IoXCJDYW4ndCBtaXggb3JkaW5hbCBkYXRlcyB3aXRoIG1vbnRoL2RheVwiKTtcbiAgICB9XG5cbiAgICBsZXQgbWl4ZWQ7XG4gICAgaWYgKHNldHRpbmdXZWVrU3R1ZmYpIHtcbiAgICAgIG1peGVkID0gd2Vla1RvR3JlZ29yaWFuKHsgLi4uZ3JlZ29yaWFuVG9XZWVrKHRoaXMuYyksIC4uLm5vcm1hbGl6ZWQgfSk7XG4gICAgfSBlbHNlIGlmICghaXNVbmRlZmluZWQobm9ybWFsaXplZC5vcmRpbmFsKSkge1xuICAgICAgbWl4ZWQgPSBvcmRpbmFsVG9HcmVnb3JpYW4oeyAuLi5ncmVnb3JpYW5Ub09yZGluYWwodGhpcy5jKSwgLi4ubm9ybWFsaXplZCB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWl4ZWQgPSB7IC4uLnRoaXMudG9PYmplY3QoKSwgLi4ubm9ybWFsaXplZCB9O1xuXG4gICAgICAvLyBpZiB3ZSBkaWRuJ3Qgc2V0IHRoZSBkYXkgYnV0IHdlIGVuZGVkIHVwIG9uIGFuIG92ZXJmbG93IGRhdGUsXG4gICAgICAvLyB1c2UgdGhlIGxhc3QgZGF5IG9mIHRoZSByaWdodCBtb250aFxuICAgICAgaWYgKGlzVW5kZWZpbmVkKG5vcm1hbGl6ZWQuZGF5KSkge1xuICAgICAgICBtaXhlZC5kYXkgPSBNYXRoLm1pbihkYXlzSW5Nb250aChtaXhlZC55ZWFyLCBtaXhlZC5tb250aCksIG1peGVkLmRheSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgW3RzLCBvXSA9IG9ialRvVFMobWl4ZWQsIHRoaXMubywgdGhpcy56b25lKTtcbiAgICByZXR1cm4gY2xvbmUodGhpcywgeyB0cywgbyB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYSBwZXJpb2Qgb2YgdGltZSB0byB0aGlzIERhdGVUaW1lIGFuZCByZXR1cm4gdGhlIHJlc3VsdGluZyBEYXRlVGltZVxuICAgKlxuICAgKiBBZGRpbmcgaG91cnMsIG1pbnV0ZXMsIHNlY29uZHMsIG9yIG1pbGxpc2Vjb25kcyBpbmNyZWFzZXMgdGhlIHRpbWVzdGFtcCBieSB0aGUgcmlnaHQgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcy4gQWRkaW5nIGRheXMsIG1vbnRocywgb3IgeWVhcnMgc2hpZnRzIHRoZSBjYWxlbmRhciwgYWNjb3VudGluZyBmb3IgRFNUcyBhbmQgbGVhcCB5ZWFycyBhbG9uZyB0aGUgd2F5LiBUaHVzLCBgZHQucGx1cyh7IGhvdXJzOiAyNCB9KWAgbWF5IHJlc3VsdCBpbiBhIGRpZmZlcmVudCB0aW1lIHRoYW4gYGR0LnBsdXMoeyBkYXlzOiAxIH0pYCBpZiB0aGVyZSdzIGEgRFNUIHNoaWZ0IGluIGJldHdlZW4uXG4gICAqIEBwYXJhbSB7RHVyYXRpb258T2JqZWN0fG51bWJlcn0gZHVyYXRpb24gLSBUaGUgYW1vdW50IHRvIGFkZC4gRWl0aGVyIGEgTHV4b24gRHVyYXRpb24sIGEgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcywgdGhlIG9iamVjdCBhcmd1bWVudCB0byBEdXJhdGlvbi5mcm9tT2JqZWN0KClcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubm93KCkucGx1cygxMjMpIC8vfj4gaW4gMTIzIG1pbGxpc2Vjb25kc1xuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5ub3coKS5wbHVzKHsgbWludXRlczogMTUgfSkgLy9+PiBpbiAxNSBtaW51dGVzXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLm5vdygpLnBsdXMoeyBkYXlzOiAxIH0pIC8vfj4gdGhpcyB0aW1lIHRvbW9ycm93XG4gICAqIEBleGFtcGxlIERhdGVUaW1lLm5vdygpLnBsdXMoeyBkYXlzOiAtMSB9KSAvL34+IHRoaXMgdGltZSB5ZXN0ZXJkYXlcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubm93KCkucGx1cyh7IGhvdXJzOiAzLCBtaW51dGVzOiAxMyB9KSAvL34+IGluIDMgaHIsIDEzIG1pblxuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5ub3coKS5wbHVzKER1cmF0aW9uLmZyb21PYmplY3QoeyBob3VyczogMywgbWludXRlczogMTMgfSkpIC8vfj4gaW4gMyBociwgMTMgbWluXG4gICAqIEByZXR1cm4ge0RhdGVUaW1lfVxuICAgKi9cbiAgcGx1cyhkdXJhdGlvbikge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkKSByZXR1cm4gdGhpcztcbiAgICBjb25zdCBkdXIgPSBEdXJhdGlvbi5mcm9tRHVyYXRpb25MaWtlKGR1cmF0aW9uKTtcbiAgICByZXR1cm4gY2xvbmUodGhpcywgYWRqdXN0VGltZSh0aGlzLCBkdXIpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJ0cmFjdCBhIHBlcmlvZCBvZiB0aW1lIHRvIHRoaXMgRGF0ZVRpbWUgYW5kIHJldHVybiB0aGUgcmVzdWx0aW5nIERhdGVUaW1lXG4gICAqIFNlZSB7QGxpbmsgRGF0ZVRpbWUjcGx1c31cbiAgICogQHBhcmFtIHtEdXJhdGlvbnxPYmplY3R8bnVtYmVyfSBkdXJhdGlvbiAtIFRoZSBhbW91bnQgdG8gc3VidHJhY3QuIEVpdGhlciBhIEx1eG9uIER1cmF0aW9uLCBhIG51bWJlciBvZiBtaWxsaXNlY29uZHMsIHRoZSBvYmplY3QgYXJndW1lbnQgdG8gRHVyYXRpb24uZnJvbU9iamVjdCgpXG4gICBAcmV0dXJuIHtEYXRlVGltZX1cbiAgICovXG4gIG1pbnVzKGR1cmF0aW9uKSB7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWQpIHJldHVybiB0aGlzO1xuICAgIGNvbnN0IGR1ciA9IER1cmF0aW9uLmZyb21EdXJhdGlvbkxpa2UoZHVyYXRpb24pLm5lZ2F0ZSgpO1xuICAgIHJldHVybiBjbG9uZSh0aGlzLCBhZGp1c3RUaW1lKHRoaXMsIGR1cikpO1xuICB9XG5cbiAgLyoqXG4gICAqIFwiU2V0XCIgdGhpcyBEYXRlVGltZSB0byB0aGUgYmVnaW5uaW5nIG9mIGEgdW5pdCBvZiB0aW1lLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdW5pdCAtIFRoZSB1bml0IHRvIGdvIHRvIHRoZSBiZWdpbm5pbmcgb2YuIENhbiBiZSAneWVhcicsICdxdWFydGVyJywgJ21vbnRoJywgJ3dlZWsnLCAnZGF5JywgJ2hvdXInLCAnbWludXRlJywgJ3NlY29uZCcsIG9yICdtaWxsaXNlY29uZCcuXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKDIwMTQsIDMsIDMpLnN0YXJ0T2YoJ21vbnRoJykudG9JU09EYXRlKCk7IC8vPT4gJzIwMTQtMDMtMDEnXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKDIwMTQsIDMsIDMpLnN0YXJ0T2YoJ3llYXInKS50b0lTT0RhdGUoKTsgLy89PiAnMjAxNC0wMS0wMSdcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoMjAxNCwgMywgMykuc3RhcnRPZignd2VlaycpLnRvSVNPRGF0ZSgpOyAvLz0+ICcyMDE0LTAzLTAzJywgd2Vla3MgYWx3YXlzIHN0YXJ0IG9uIE1vbmRheXNcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoMjAxNCwgMywgMywgNSwgMzApLnN0YXJ0T2YoJ2RheScpLnRvSVNPVGltZSgpOyAvLz0+ICcwMDowMC4wMDAtMDU6MDAnXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKDIwMTQsIDMsIDMsIDUsIDMwKS5zdGFydE9mKCdob3VyJykudG9JU09UaW1lKCk7IC8vPT4gJzA1OjAwOjAwLjAwMC0wNTowMCdcbiAgICogQHJldHVybiB7RGF0ZVRpbWV9XG4gICAqL1xuICBzdGFydE9mKHVuaXQpIHtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZCkgcmV0dXJuIHRoaXM7XG4gICAgY29uc3QgbyA9IHt9LFxuICAgICAgbm9ybWFsaXplZFVuaXQgPSBEdXJhdGlvbi5ub3JtYWxpemVVbml0KHVuaXQpO1xuICAgIHN3aXRjaCAobm9ybWFsaXplZFVuaXQpIHtcbiAgICAgIGNhc2UgXCJ5ZWFyc1wiOlxuICAgICAgICBvLm1vbnRoID0gMTtcbiAgICAgIC8vIGZhbGxzIHRocm91Z2hcbiAgICAgIGNhc2UgXCJxdWFydGVyc1wiOlxuICAgICAgY2FzZSBcIm1vbnRoc1wiOlxuICAgICAgICBvLmRheSA9IDE7XG4gICAgICAvLyBmYWxscyB0aHJvdWdoXG4gICAgICBjYXNlIFwid2Vla3NcIjpcbiAgICAgIGNhc2UgXCJkYXlzXCI6XG4gICAgICAgIG8uaG91ciA9IDA7XG4gICAgICAvLyBmYWxscyB0aHJvdWdoXG4gICAgICBjYXNlIFwiaG91cnNcIjpcbiAgICAgICAgby5taW51dGUgPSAwO1xuICAgICAgLy8gZmFsbHMgdGhyb3VnaFxuICAgICAgY2FzZSBcIm1pbnV0ZXNcIjpcbiAgICAgICAgby5zZWNvbmQgPSAwO1xuICAgICAgLy8gZmFsbHMgdGhyb3VnaFxuICAgICAgY2FzZSBcInNlY29uZHNcIjpcbiAgICAgICAgby5taWxsaXNlY29uZCA9IDA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gbm8gZGVmYXVsdCwgaW52YWxpZCB1bml0cyB0aHJvdyBpbiBub3JtYWxpemVVbml0KClcbiAgICB9XG5cbiAgICBpZiAobm9ybWFsaXplZFVuaXQgPT09IFwid2Vla3NcIikge1xuICAgICAgby53ZWVrZGF5ID0gMTtcbiAgICB9XG5cbiAgICBpZiAobm9ybWFsaXplZFVuaXQgPT09IFwicXVhcnRlcnNcIikge1xuICAgICAgY29uc3QgcSA9IE1hdGguY2VpbCh0aGlzLm1vbnRoIC8gMyk7XG4gICAgICBvLm1vbnRoID0gKHEgLSAxKSAqIDMgKyAxO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnNldChvKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBcIlNldFwiIHRoaXMgRGF0ZVRpbWUgdG8gdGhlIGVuZCAobWVhbmluZyB0aGUgbGFzdCBtaWxsaXNlY29uZCkgb2YgYSB1bml0IG9mIHRpbWVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVuaXQgLSBUaGUgdW5pdCB0byBnbyB0byB0aGUgZW5kIG9mLiBDYW4gYmUgJ3llYXInLCAncXVhcnRlcicsICdtb250aCcsICd3ZWVrJywgJ2RheScsICdob3VyJywgJ21pbnV0ZScsICdzZWNvbmQnLCBvciAnbWlsbGlzZWNvbmQnLlxuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5sb2NhbCgyMDE0LCAzLCAzKS5lbmRPZignbW9udGgnKS50b0lTTygpOyAvLz0+ICcyMDE0LTAzLTMxVDIzOjU5OjU5Ljk5OS0wNTowMCdcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoMjAxNCwgMywgMykuZW5kT2YoJ3llYXInKS50b0lTTygpOyAvLz0+ICcyMDE0LTEyLTMxVDIzOjU5OjU5Ljk5OS0wNTowMCdcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoMjAxNCwgMywgMykuZW5kT2YoJ3dlZWsnKS50b0lTTygpOyAvLyA9PiAnMjAxNC0wMy0wOVQyMzo1OTo1OS45OTktMDU6MDAnLCB3ZWVrcyBzdGFydCBvbiBNb25kYXlzXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKDIwMTQsIDMsIDMsIDUsIDMwKS5lbmRPZignZGF5JykudG9JU08oKTsgLy89PiAnMjAxNC0wMy0wM1QyMzo1OTo1OS45OTktMDU6MDAnXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKDIwMTQsIDMsIDMsIDUsIDMwKS5lbmRPZignaG91cicpLnRvSVNPKCk7IC8vPT4gJzIwMTQtMDMtMDNUMDU6NTk6NTkuOTk5LTA1OjAwJ1xuICAgKiBAcmV0dXJuIHtEYXRlVGltZX1cbiAgICovXG4gIGVuZE9mKHVuaXQpIHtcbiAgICByZXR1cm4gdGhpcy5pc1ZhbGlkXG4gICAgICA/IHRoaXMucGx1cyh7IFt1bml0XTogMSB9KVxuICAgICAgICAuc3RhcnRPZih1bml0KVxuICAgICAgICAubWludXMoMSlcbiAgICAgIDogdGhpcztcbiAgfVxuXG4gIC8vIE9VVFBVVFxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgRGF0ZVRpbWUgZm9ybWF0dGVkIGFjY29yZGluZyB0byB0aGUgc3BlY2lmaWVkIGZvcm1hdCBzdHJpbmcuXG4gICAqICoqWW91IG1heSBub3Qgd2FudCB0aGlzLioqIFNlZSB7QGxpbmsgRGF0ZVRpbWUjdG9Mb2NhbGVTdHJpbmd9IGZvciBhIG1vcmUgZmxleGlibGUgZm9ybWF0dGluZyB0b29sLiBGb3IgYSB0YWJsZSBvZiB0b2tlbnMgYW5kIHRoZWlyIGludGVycHJldGF0aW9ucywgc2VlIFtoZXJlXShodHRwczovL21vbWVudC5naXRodWIuaW8vbHV4b24vIy9mb3JtYXR0aW5nP2lkPXRhYmxlLW9mLXRva2VucykuXG4gICAqIERlZmF1bHRzIHRvIGVuLVVTIGlmIG5vIGxvY2FsZSBoYXMgYmVlbiBzcGVjaWZpZWQsIHJlZ2FyZGxlc3Mgb2YgdGhlIHN5c3RlbSdzIGxvY2FsZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGZtdCAtIHRoZSBmb3JtYXQgc3RyaW5nXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIC0gb3B0cyB0byBvdmVycmlkZSB0aGUgY29uZmlndXJhdGlvbiBvcHRpb25zIG9uIHRoaXMgRGF0ZVRpbWVcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubm93KCkudG9Gb3JtYXQoJ3l5eXkgTExMIGRkJykgLy89PiAnMjAxNyBBcHIgMjInXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLm5vdygpLnNldExvY2FsZSgnZnInKS50b0Zvcm1hdCgneXl5eSBMTEwgZGQnKSAvLz0+ICcyMDE3IGF2ci4gMjInXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLm5vdygpLnRvRm9ybWF0KCd5eXl5IExMTCBkZCcsIHsgbG9jYWxlOiBcImZyXCIgfSkgLy89PiAnMjAxNyBhdnIuIDIyJ1xuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5ub3coKS50b0Zvcm1hdChcIkhIICdob3VycyBhbmQnIG1tICdtaW51dGVzJ1wiKSAvLz0+ICcyMCBob3VycyBhbmQgNTUgbWludXRlcydcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cbiAgdG9Gb3JtYXQoZm10LCBvcHRzID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5pc1ZhbGlkXG4gICAgICA/IEZvcm1hdHRlci5jcmVhdGUodGhpcy5sb2MucmVkZWZhdWx0VG9FTihvcHRzKSkuZm9ybWF0RGF0ZVRpbWVGcm9tU3RyaW5nKHRoaXMsIGZtdClcbiAgICAgIDogSU5WQUxJRDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgbG9jYWxpemVkIHN0cmluZyByZXByZXNlbnRpbmcgdGhpcyBkYXRlLiBBY2NlcHRzIHRoZSBzYW1lIG9wdGlvbnMgYXMgdGhlIEludGwuRGF0ZVRpbWVGb3JtYXQgY29uc3RydWN0b3IgYW5kIGFueSBwcmVzZXRzIGRlZmluZWQgYnkgTHV4b24sIHN1Y2ggYXMgYERhdGVUaW1lLkRBVEVfRlVMTGAgb3IgYERhdGVUaW1lLlRJTUVfU0lNUExFYC5cbiAgICogVGhlIGV4YWN0IGJlaGF2aW9yIG9mIHRoaXMgbWV0aG9kIGlzIGJyb3dzZXItc3BlY2lmaWMsIGJ1dCBpbiBnZW5lcmFsIGl0IHdpbGwgcmV0dXJuIGFuIGFwcHJvcHJpYXRlIHJlcHJlc2VudGF0aW9uXG4gICAqIG9mIHRoZSBEYXRlVGltZSBpbiB0aGUgYXNzaWduZWQgbG9jYWxlLlxuICAgKiBEZWZhdWx0cyB0byB0aGUgc3lzdGVtJ3MgbG9jYWxlIGlmIG5vIGxvY2FsZSBoYXMgYmVlbiBzcGVjaWZpZWRcbiAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9EYXRlVGltZUZvcm1hdFxuICAgKiBAcGFyYW0gZm9ybWF0T3B0cyB7T2JqZWN0fSAtIEludGwuRGF0ZVRpbWVGb3JtYXQgY29uc3RydWN0b3Igb3B0aW9ucyBhbmQgY29uZmlndXJhdGlvbiBvcHRpb25zXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIC0gb3B0cyB0byBvdmVycmlkZSB0aGUgY29uZmlndXJhdGlvbiBvcHRpb25zIG9uIHRoaXMgRGF0ZVRpbWVcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubm93KCkudG9Mb2NhbGVTdHJpbmcoKTsgLy89PiA0LzIwLzIwMTdcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubm93KCkuc2V0TG9jYWxlKCdlbi1nYicpLnRvTG9jYWxlU3RyaW5nKCk7IC8vPT4gJzIwLzA0LzIwMTcnXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLm5vdygpLnRvTG9jYWxlU3RyaW5nKHsgbG9jYWxlOiAnZW4tZ2InIH0pOyAvLz0+ICcyMC8wNC8yMDE3J1xuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5ub3coKS50b0xvY2FsZVN0cmluZyhEYXRlVGltZS5EQVRFX0ZVTEwpOyAvLz0+ICdBcHJpbCAyMCwgMjAxNydcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubm93KCkudG9Mb2NhbGVTdHJpbmcoRGF0ZVRpbWUuVElNRV9TSU1QTEUpOyAvLz0+ICcxMTozMiBBTSdcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubm93KCkudG9Mb2NhbGVTdHJpbmcoRGF0ZVRpbWUuREFURVRJTUVfU0hPUlQpOyAvLz0+ICc0LzIwLzIwMTcsIDExOjMyIEFNJ1xuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5ub3coKS50b0xvY2FsZVN0cmluZyh7IHdlZWtkYXk6ICdsb25nJywgbW9udGg6ICdsb25nJywgZGF5OiAnMi1kaWdpdCcgfSk7IC8vPT4gJ1RodXJzZGF5LCBBcHJpbCAyMCdcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubm93KCkudG9Mb2NhbGVTdHJpbmcoeyB3ZWVrZGF5OiAnc2hvcnQnLCBtb250aDogJ3Nob3J0JywgZGF5OiAnMi1kaWdpdCcsIGhvdXI6ICcyLWRpZ2l0JywgbWludXRlOiAnMi1kaWdpdCcgfSk7IC8vPT4gJ1RodSwgQXByIDIwLCAxMToyNyBBTSdcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubm93KCkudG9Mb2NhbGVTdHJpbmcoeyBob3VyOiAnMi1kaWdpdCcsIG1pbnV0ZTogJzItZGlnaXQnLCBob3VyQ3ljbGU6ICdoMjMnIH0pOyAvLz0+ICcxMTozMidcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cbiAgdG9Mb2NhbGVTdHJpbmcoZm9ybWF0T3B0cyA9IERBVEVfU0hPUlQsIG9wdHMgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWRcbiAgICAgID8gRm9ybWF0dGVyLmNyZWF0ZSh0aGlzLmxvYy5jbG9uZShvcHRzKSwgZm9ybWF0T3B0cykuZm9ybWF0RGF0ZVRpbWUodGhpcylcbiAgICAgIDogSU5WQUxJRDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIGFycmF5IG9mIGZvcm1hdCBcInBhcnRzXCIsIG1lYW5pbmcgaW5kaXZpZHVhbCB0b2tlbnMgYWxvbmcgd2l0aCBtZXRhZGF0YS4gVGhpcyBpcyBhbGxvd3MgY2FsbGVycyB0byBwb3N0LXByb2Nlc3MgaW5kaXZpZHVhbCBzZWN0aW9ucyBvZiB0aGUgZm9ybWF0dGVkIG91dHB1dC5cbiAgICogRGVmYXVsdHMgdG8gdGhlIHN5c3RlbSdzIGxvY2FsZSBpZiBubyBsb2NhbGUgaGFzIGJlZW4gc3BlY2lmaWVkXG4gICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvRGF0ZVRpbWVGb3JtYXQvZm9ybWF0VG9QYXJ0c1xuICAgKiBAcGFyYW0gb3B0cyB7T2JqZWN0fSAtIEludGwuRGF0ZVRpbWVGb3JtYXQgY29uc3RydWN0b3Igb3B0aW9ucywgc2FtZSBhcyBgdG9Mb2NhbGVTdHJpbmdgLlxuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5ub3coKS50b0xvY2FsZVBhcnRzKCk7IC8vPT4gW1xuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy89PiAgIHsgdHlwZTogJ2RheScsIHZhbHVlOiAnMjUnIH0sXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLz0+ICAgeyB0eXBlOiAnbGl0ZXJhbCcsIHZhbHVlOiAnLycgfSxcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vPT4gICB7IHR5cGU6ICdtb250aCcsIHZhbHVlOiAnMDUnIH0sXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLz0+ICAgeyB0eXBlOiAnbGl0ZXJhbCcsIHZhbHVlOiAnLycgfSxcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vPT4gICB7IHR5cGU6ICd5ZWFyJywgdmFsdWU6ICcxOTgyJyB9XG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLz0+IF1cbiAgICovXG4gIHRvTG9jYWxlUGFydHMob3B0cyA9IHt9KSB7XG4gICAgcmV0dXJuIHRoaXMuaXNWYWxpZFxuICAgICAgPyBGb3JtYXR0ZXIuY3JlYXRlKHRoaXMubG9jLmNsb25lKG9wdHMpLCBvcHRzKS5mb3JtYXREYXRlVGltZVBhcnRzKHRoaXMpXG4gICAgICA6IFtdO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gSVNPIDg2MDEtY29tcGxpYW50IHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIERhdGVUaW1lXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIC0gb3B0aW9uc1xuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRzLnN1cHByZXNzTWlsbGlzZWNvbmRzPWZhbHNlXSAtIGV4Y2x1ZGUgbWlsbGlzZWNvbmRzIGZyb20gdGhlIGZvcm1hdCBpZiB0aGV5J3JlIDBcbiAgICogQHBhcmFtIHtib29sZWFufSBbb3B0cy5zdXBwcmVzc1NlY29uZHM9ZmFsc2VdIC0gZXhjbHVkZSBzZWNvbmRzIGZyb20gdGhlIGZvcm1hdCBpZiB0aGV5J3JlIDBcbiAgICogQHBhcmFtIHtib29sZWFufSBbb3B0cy5pbmNsdWRlT2Zmc2V0PXRydWVdIC0gaW5jbHVkZSB0aGUgb2Zmc2V0LCBzdWNoIGFzICdaJyBvciAnLTA0OjAwJ1xuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRzLmV4dGVuZGVkWm9uZT10cnVlXSAtIGFkZCB0aGUgdGltZSB6b25lIGZvcm1hdCBleHRlbnNpb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRzLmZvcm1hdD0nZXh0ZW5kZWQnXSAtIGNob29zZSBiZXR3ZWVuIHRoZSBiYXNpYyBhbmQgZXh0ZW5kZWQgZm9ybWF0XG4gICAqIEBleGFtcGxlIERhdGVUaW1lLnV0YygxOTgzLCA1LCAyNSkudG9JU08oKSAvLz0+ICcxOTgyLTA1LTI1VDAwOjAwOjAwLjAwMFonXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLm5vdygpLnRvSVNPKCkgLy89PiAnMjAxNy0wNC0yMlQyMDo0NzowNS4zMzUtMDQ6MDAnXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLm5vdygpLnRvSVNPKHsgaW5jbHVkZU9mZnNldDogZmFsc2UgfSkgLy89PiAnMjAxNy0wNC0yMlQyMDo0NzowNS4zMzUnXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLm5vdygpLnRvSVNPKHsgZm9ybWF0OiAnYmFzaWMnIH0pIC8vPT4gJzIwMTcwNDIyVDIwNDcwNS4zMzUtMDQwMCdcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cbiAgdG9JU08oe1xuICAgICAgICAgIGZvcm1hdCA9IFwiZXh0ZW5kZWRcIixcbiAgICAgICAgICBzdXBwcmVzc1NlY29uZHMgPSBmYWxzZSxcbiAgICAgICAgICBzdXBwcmVzc01pbGxpc2Vjb25kcyA9IGZhbHNlLFxuICAgICAgICAgIGluY2x1ZGVPZmZzZXQgPSB0cnVlLFxuICAgICAgICAgIGV4dGVuZGVkWm9uZSA9IGZhbHNlLFxuICAgICAgICB9ID0ge30pIHtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgZXh0ID0gZm9ybWF0ID09PSBcImV4dGVuZGVkXCI7XG5cbiAgICBsZXQgYyA9IHRvSVNPRGF0ZSh0aGlzLCBleHQpO1xuICAgIGMgKz0gXCJUXCI7XG4gICAgYyArPSB0b0lTT1RpbWUodGhpcywgZXh0LCBzdXBwcmVzc1NlY29uZHMsIHN1cHByZXNzTWlsbGlzZWNvbmRzLCBpbmNsdWRlT2Zmc2V0LCBleHRlbmRlZFpvbmUpO1xuICAgIHJldHVybiBjO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gSVNPIDg2MDEtY29tcGxpYW50IHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIERhdGVUaW1lJ3MgZGF0ZSBjb21wb25lbnRcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdHMgLSBvcHRpb25zXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0cy5mb3JtYXQ9J2V4dGVuZGVkJ10gLSBjaG9vc2UgYmV0d2VlbiB0aGUgYmFzaWMgYW5kIGV4dGVuZGVkIGZvcm1hdFxuICAgKiBAZXhhbXBsZSBEYXRlVGltZS51dGMoMTk4MiwgNSwgMjUpLnRvSVNPRGF0ZSgpIC8vPT4gJzE5ODItMDUtMjUnXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLnV0YygxOTgyLCA1LCAyNSkudG9JU09EYXRlKHsgZm9ybWF0OiAnYmFzaWMnIH0pIC8vPT4gJzE5ODIwNTI1J1xuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuICB0b0lTT0RhdGUoeyBmb3JtYXQgPSBcImV4dGVuZGVkXCIgfSA9IHt9KSB7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiB0b0lTT0RhdGUodGhpcywgZm9ybWF0ID09PSBcImV4dGVuZGVkXCIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gSVNPIDg2MDEtY29tcGxpYW50IHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIERhdGVUaW1lJ3Mgd2VlayBkYXRlXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLnV0YygxOTgyLCA1LCAyNSkudG9JU09XZWVrRGF0ZSgpIC8vPT4gJzE5ODItVzIxLTInXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICovXG4gIHRvSVNPV2Vla0RhdGUoKSB7XG4gICAgcmV0dXJuIHRvVGVjaEZvcm1hdCh0aGlzLCBcImtra2stJ1cnV1ctY1wiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIElTTyA4NjAxLWNvbXBsaWFudCBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBEYXRlVGltZSdzIHRpbWUgY29tcG9uZW50XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIC0gb3B0aW9uc1xuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRzLnN1cHByZXNzTWlsbGlzZWNvbmRzPWZhbHNlXSAtIGV4Y2x1ZGUgbWlsbGlzZWNvbmRzIGZyb20gdGhlIGZvcm1hdCBpZiB0aGV5J3JlIDBcbiAgICogQHBhcmFtIHtib29sZWFufSBbb3B0cy5zdXBwcmVzc1NlY29uZHM9ZmFsc2VdIC0gZXhjbHVkZSBzZWNvbmRzIGZyb20gdGhlIGZvcm1hdCBpZiB0aGV5J3JlIDBcbiAgICogQHBhcmFtIHtib29sZWFufSBbb3B0cy5pbmNsdWRlT2Zmc2V0PXRydWVdIC0gaW5jbHVkZSB0aGUgb2Zmc2V0LCBzdWNoIGFzICdaJyBvciAnLTA0OjAwJ1xuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRzLmV4dGVuZGVkWm9uZT10cnVlXSAtIGFkZCB0aGUgdGltZSB6b25lIGZvcm1hdCBleHRlbnNpb25cbiAgICogQHBhcmFtIHtib29sZWFufSBbb3B0cy5pbmNsdWRlUHJlZml4PWZhbHNlXSAtIGluY2x1ZGUgdGhlIGBUYCBwcmVmaXhcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRzLmZvcm1hdD0nZXh0ZW5kZWQnXSAtIGNob29zZSBiZXR3ZWVuIHRoZSBiYXNpYyBhbmQgZXh0ZW5kZWQgZm9ybWF0XG4gICAqIEBleGFtcGxlIERhdGVUaW1lLnV0YygpLnNldCh7IGhvdXI6IDcsIG1pbnV0ZTogMzQgfSkudG9JU09UaW1lKCkgLy89PiAnMDc6MzQ6MTkuMzYxWidcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUudXRjKCkuc2V0KHsgaG91cjogNywgbWludXRlOiAzNCwgc2Vjb25kczogMCwgbWlsbGlzZWNvbmRzOiAwIH0pLnRvSVNPVGltZSh7IHN1cHByZXNzU2Vjb25kczogdHJ1ZSB9KSAvLz0+ICcwNzozNFonXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLnV0YygpLnNldCh7IGhvdXI6IDcsIG1pbnV0ZTogMzQgfSkudG9JU09UaW1lKHsgZm9ybWF0OiAnYmFzaWMnIH0pIC8vPT4gJzA3MzQxOS4zNjFaJ1xuICAgKiBAZXhhbXBsZSBEYXRlVGltZS51dGMoKS5zZXQoeyBob3VyOiA3LCBtaW51dGU6IDM0IH0pLnRvSVNPVGltZSh7IGluY2x1ZGVQcmVmaXg6IHRydWUgfSkgLy89PiAnVDA3OjM0OjE5LjM2MVonXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICovXG4gIHRvSVNPVGltZSh7XG4gICAgICAgICAgICAgIHN1cHByZXNzTWlsbGlzZWNvbmRzID0gZmFsc2UsXG4gICAgICAgICAgICAgIHN1cHByZXNzU2Vjb25kcyA9IGZhbHNlLFxuICAgICAgICAgICAgICBpbmNsdWRlT2Zmc2V0ID0gdHJ1ZSxcbiAgICAgICAgICAgICAgaW5jbHVkZVByZWZpeCA9IGZhbHNlLFxuICAgICAgICAgICAgICBleHRlbmRlZFpvbmUgPSBmYWxzZSxcbiAgICAgICAgICAgICAgZm9ybWF0ID0gXCJleHRlbmRlZFwiLFxuICAgICAgICAgICAgfSA9IHt9KSB7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGxldCBjID0gaW5jbHVkZVByZWZpeCA/IFwiVFwiIDogXCJcIjtcbiAgICByZXR1cm4gKFxuICAgICAgYyArXG4gICAgICB0b0lTT1RpbWUoXG4gICAgICAgIHRoaXMsXG4gICAgICAgIGZvcm1hdCA9PT0gXCJleHRlbmRlZFwiLFxuICAgICAgICBzdXBwcmVzc1NlY29uZHMsXG4gICAgICAgIHN1cHByZXNzTWlsbGlzZWNvbmRzLFxuICAgICAgICBpbmNsdWRlT2Zmc2V0LFxuICAgICAgICBleHRlbmRlZFpvbmVcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gUkZDIDI4MjItY29tcGF0aWJsZSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBEYXRlVGltZVxuICAgKiBAZXhhbXBsZSBEYXRlVGltZS51dGMoMjAxNCwgNywgMTMpLnRvUkZDMjgyMigpIC8vPT4gJ1N1biwgMTMgSnVsIDIwMTQgMDA6MDA6MDAgKzAwMDAnXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKDIwMTQsIDcsIDEzKS50b1JGQzI4MjIoKSAvLz0+ICdTdW4sIDEzIEp1bCAyMDE0IDAwOjAwOjAwIC0wNDAwJ1xuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuICB0b1JGQzI4MjIoKSB7XG4gICAgcmV0dXJuIHRvVGVjaEZvcm1hdCh0aGlzLCBcIkVFRSwgZGQgTExMIHl5eXkgSEg6bW06c3MgWlpaXCIsIGZhbHNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgRGF0ZVRpbWUgYXBwcm9wcmlhdGUgZm9yIHVzZSBpbiBIVFRQIGhlYWRlcnMuIFRoZSBvdXRwdXQgaXMgYWx3YXlzIGV4cHJlc3NlZCBpbiBHTVQuXG4gICAqIFNwZWNpZmljYWxseSwgdGhlIHN0cmluZyBjb25mb3JtcyB0byBSRkMgMTEyMy5cbiAgICogQHNlZSBodHRwczovL3d3dy53My5vcmcvUHJvdG9jb2xzL3JmYzI2MTYvcmZjMjYxNi1zZWMzLmh0bWwjc2VjMy4zLjFcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUudXRjKDIwMTQsIDcsIDEzKS50b0hUVFAoKSAvLz0+ICdTdW4sIDEzIEp1bCAyMDE0IDAwOjAwOjAwIEdNVCdcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUudXRjKDIwMTQsIDcsIDEzLCAxOSkudG9IVFRQKCkgLy89PiAnU3VuLCAxMyBKdWwgMjAxNCAxOTowMDowMCBHTVQnXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICovXG4gIHRvSFRUUCgpIHtcbiAgICByZXR1cm4gdG9UZWNoRm9ybWF0KHRoaXMudG9VVEMoKSwgXCJFRUUsIGRkIExMTCB5eXl5IEhIOm1tOnNzICdHTVQnXCIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBEYXRlVGltZSBhcHByb3ByaWF0ZSBmb3IgdXNlIGluIFNRTCBEYXRlXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLnV0YygyMDE0LCA3LCAxMykudG9TUUxEYXRlKCkgLy89PiAnMjAxNC0wNy0xMydcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cbiAgdG9TUUxEYXRlKCkge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHRvSVNPRGF0ZSh0aGlzLCB0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgRGF0ZVRpbWUgYXBwcm9wcmlhdGUgZm9yIHVzZSBpbiBTUUwgVGltZVxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0cyAtIG9wdGlvbnNcbiAgICogQHBhcmFtIHtib29sZWFufSBbb3B0cy5pbmNsdWRlWm9uZT1mYWxzZV0gLSBpbmNsdWRlIHRoZSB6b25lLCBzdWNoIGFzICdBbWVyaWNhL05ld19Zb3JrJy4gT3ZlcnJpZGVzIGluY2x1ZGVPZmZzZXQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdHMuaW5jbHVkZU9mZnNldD10cnVlXSAtIGluY2x1ZGUgdGhlIG9mZnNldCwgc3VjaCBhcyAnWicgb3IgJy0wNDowMCdcbiAgICogQHBhcmFtIHtib29sZWFufSBbb3B0cy5pbmNsdWRlT2Zmc2V0U3BhY2U9dHJ1ZV0gLSBpbmNsdWRlIHRoZSBzcGFjZSBiZXR3ZWVuIHRoZSB0aW1lIGFuZCB0aGUgb2Zmc2V0LCBzdWNoIGFzICcwNToxNToxNi4zNDUgLTA0OjAwJ1xuICAgKiBAZXhhbXBsZSBEYXRlVGltZS51dGMoKS50b1NRTCgpIC8vPT4gJzA1OjE1OjE2LjM0NSdcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubm93KCkudG9TUUwoKSAvLz0+ICcwNToxNToxNi4zNDUgLTA0OjAwJ1xuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5ub3coKS50b1NRTCh7IGluY2x1ZGVPZmZzZXQ6IGZhbHNlIH0pIC8vPT4gJzA1OjE1OjE2LjM0NSdcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubm93KCkudG9TUUwoeyBpbmNsdWRlWm9uZTogZmFsc2UgfSkgLy89PiAnMDU6MTU6MTYuMzQ1IEFtZXJpY2EvTmV3X1lvcmsnXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICovXG4gIHRvU1FMVGltZSh7IGluY2x1ZGVPZmZzZXQgPSB0cnVlLCBpbmNsdWRlWm9uZSA9IGZhbHNlLCBpbmNsdWRlT2Zmc2V0U3BhY2UgPSB0cnVlIH0gPSB7fSkge1xuICAgIGxldCBmbXQgPSBcIkhIOm1tOnNzLlNTU1wiO1xuXG4gICAgaWYgKGluY2x1ZGVab25lIHx8IGluY2x1ZGVPZmZzZXQpIHtcbiAgICAgIGlmIChpbmNsdWRlT2Zmc2V0U3BhY2UpIHtcbiAgICAgICAgZm10ICs9IFwiIFwiO1xuICAgICAgfVxuICAgICAgaWYgKGluY2x1ZGVab25lKSB7XG4gICAgICAgIGZtdCArPSBcInpcIjtcbiAgICAgIH0gZWxzZSBpZiAoaW5jbHVkZU9mZnNldCkge1xuICAgICAgICBmbXQgKz0gXCJaWlwiO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0b1RlY2hGb3JtYXQodGhpcywgZm10LCB0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgRGF0ZVRpbWUgYXBwcm9wcmlhdGUgZm9yIHVzZSBpbiBTUUwgRGF0ZVRpbWVcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdHMgLSBvcHRpb25zXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdHMuaW5jbHVkZVpvbmU9ZmFsc2VdIC0gaW5jbHVkZSB0aGUgem9uZSwgc3VjaCBhcyAnQW1lcmljYS9OZXdfWW9yaycuIE92ZXJyaWRlcyBpbmNsdWRlT2Zmc2V0LlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRzLmluY2x1ZGVPZmZzZXQ9dHJ1ZV0gLSBpbmNsdWRlIHRoZSBvZmZzZXQsIHN1Y2ggYXMgJ1onIG9yICctMDQ6MDAnXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdHMuaW5jbHVkZU9mZnNldFNwYWNlPXRydWVdIC0gaW5jbHVkZSB0aGUgc3BhY2UgYmV0d2VlbiB0aGUgdGltZSBhbmQgdGhlIG9mZnNldCwgc3VjaCBhcyAnMDU6MTU6MTYuMzQ1IC0wNDowMCdcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUudXRjKDIwMTQsIDcsIDEzKS50b1NRTCgpIC8vPT4gJzIwMTQtMDctMTMgMDA6MDA6MDAuMDAwIFonXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKDIwMTQsIDcsIDEzKS50b1NRTCgpIC8vPT4gJzIwMTQtMDctMTMgMDA6MDA6MDAuMDAwIC0wNDowMCdcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubG9jYWwoMjAxNCwgNywgMTMpLnRvU1FMKHsgaW5jbHVkZU9mZnNldDogZmFsc2UgfSkgLy89PiAnMjAxNC0wNy0xMyAwMDowMDowMC4wMDAnXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLmxvY2FsKDIwMTQsIDcsIDEzKS50b1NRTCh7IGluY2x1ZGVab25lOiB0cnVlIH0pIC8vPT4gJzIwMTQtMDctMTMgMDA6MDA6MDAuMDAwIEFtZXJpY2EvTmV3X1lvcmsnXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICovXG4gIHRvU1FMKG9wdHMgPSB7fSkge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gYCR7dGhpcy50b1NRTERhdGUoKX0gJHt0aGlzLnRvU1FMVGltZShvcHRzKX1gO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBEYXRlVGltZSBhcHByb3ByaWF0ZSBmb3IgZGVidWdnaW5nXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICovXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyB0aGlzLnRvSVNPKCkgOiBJTlZBTElEO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGVwb2NoIG1pbGxpc2Vjb25kcyBvZiB0aGlzIERhdGVUaW1lLiBBbGlhcyBvZiB7QGxpbmsgRGF0ZVRpbWUjdG9NaWxsaXN9XG4gICAqIEByZXR1cm4ge251bWJlcn1cbiAgICovXG4gIHZhbHVlT2YoKSB7XG4gICAgcmV0dXJuIHRoaXMudG9NaWxsaXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBlcG9jaCBtaWxsaXNlY29uZHMgb2YgdGhpcyBEYXRlVGltZS5cbiAgICogQHJldHVybiB7bnVtYmVyfVxuICAgKi9cbiAgdG9NaWxsaXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNWYWxpZCA/IHRoaXMudHMgOiBOYU47XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZXBvY2ggc2Vjb25kcyBvZiB0aGlzIERhdGVUaW1lLlxuICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAqL1xuICB0b1NlY29uZHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNWYWxpZCA/IHRoaXMudHMgLyAxMDAwIDogTmFOO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGVwb2NoIHNlY29uZHMgKGFzIGEgd2hvbGUgbnVtYmVyKSBvZiB0aGlzIERhdGVUaW1lLlxuICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAqL1xuICB0b1VuaXhJbnRlZ2VyKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyBNYXRoLmZsb29yKHRoaXMudHMgLyAxMDAwKSA6IE5hTjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIElTTyA4NjAxIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgRGF0ZVRpbWUgYXBwcm9wcmlhdGUgZm9yIHVzZSBpbiBKU09OLlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuICB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHRoaXMudG9JU08oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgQlNPTiBzZXJpYWxpemFibGUgZXF1aXZhbGVudCB0byB0aGlzIERhdGVUaW1lLlxuICAgKiBAcmV0dXJuIHtEYXRlfVxuICAgKi9cbiAgdG9CU09OKCkge1xuICAgIHJldHVybiB0aGlzLnRvSlNEYXRlKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIEphdmFTY3JpcHQgb2JqZWN0IHdpdGggdGhpcyBEYXRlVGltZSdzIHllYXIsIG1vbnRoLCBkYXksIGFuZCBzbyBvbi5cbiAgICogQHBhcmFtIG9wdHMgLSBvcHRpb25zIGZvciBnZW5lcmF0aW5nIHRoZSBvYmplY3RcbiAgICogQHBhcmFtIHtib29sZWFufSBbb3B0cy5pbmNsdWRlQ29uZmlnPWZhbHNlXSAtIGluY2x1ZGUgY29uZmlndXJhdGlvbiBhdHRyaWJ1dGVzIGluIHRoZSBvdXRwdXRcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubm93KCkudG9PYmplY3QoKSAvLz0+IHsgeWVhcjogMjAxNywgbW9udGg6IDQsIGRheTogMjIsIGhvdXI6IDIwLCBtaW51dGU6IDQ5LCBzZWNvbmQ6IDQyLCBtaWxsaXNlY29uZDogMjY4IH1cbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgdG9PYmplY3Qob3B0cyA9IHt9KSB7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWQpIHJldHVybiB7fTtcblxuICAgIGNvbnN0IGJhc2UgPSB7IC4uLnRoaXMuYyB9O1xuXG4gICAgaWYgKG9wdHMuaW5jbHVkZUNvbmZpZykge1xuICAgICAgYmFzZS5vdXRwdXRDYWxlbmRhciA9IHRoaXMub3V0cHV0Q2FsZW5kYXI7XG4gICAgICBiYXNlLm51bWJlcmluZ1N5c3RlbSA9IHRoaXMubG9jLm51bWJlcmluZ1N5c3RlbTtcbiAgICAgIGJhc2UubG9jYWxlID0gdGhpcy5sb2MubG9jYWxlO1xuICAgIH1cbiAgICByZXR1cm4gYmFzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgSmF2YVNjcmlwdCBEYXRlIGVxdWl2YWxlbnQgdG8gdGhpcyBEYXRlVGltZS5cbiAgICogQHJldHVybiB7RGF0ZX1cbiAgICovXG4gIHRvSlNEYXRlKCkge1xuICAgIHJldHVybiBuZXcgRGF0ZSh0aGlzLmlzVmFsaWQgPyB0aGlzLnRzIDogTmFOKTtcbiAgfVxuXG4gIC8vIENPTVBBUkVcblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gdHdvIERhdGVUaW1lcyBhcyBhIER1cmF0aW9uLlxuICAgKiBAcGFyYW0ge0RhdGVUaW1lfSBvdGhlckRhdGVUaW1lIC0gdGhlIERhdGVUaW1lIHRvIGNvbXBhcmUgdGhpcyBvbmUgdG9cbiAgICogQHBhcmFtIHtzdHJpbmd8c3RyaW5nW119IFt1bml0PVsnbWlsbGlzZWNvbmRzJ11dIC0gdGhlIHVuaXQgb3IgYXJyYXkgb2YgdW5pdHMgKHN1Y2ggYXMgJ2hvdXJzJyBvciAnZGF5cycpIHRvIGluY2x1ZGUgaW4gdGhlIGR1cmF0aW9uLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0cyAtIG9wdGlvbnMgdGhhdCBhZmZlY3QgdGhlIGNyZWF0aW9uIG9mIHRoZSBEdXJhdGlvblxuICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdHMuY29udmVyc2lvbkFjY3VyYWN5PSdjYXN1YWwnXSAtIHRoZSBjb252ZXJzaW9uIHN5c3RlbSB0byB1c2VcbiAgICogQGV4YW1wbGVcbiAgICogdmFyIGkxID0gRGF0ZVRpbWUuZnJvbUlTTygnMTk4Mi0wNS0yNVQwOTo0NScpLFxuICAgKiAgICAgaTIgPSBEYXRlVGltZS5mcm9tSVNPKCcxOTgzLTEwLTE0VDEwOjMwJyk7XG4gICAqIGkyLmRpZmYoaTEpLnRvT2JqZWN0KCkgLy89PiB7IG1pbGxpc2Vjb25kczogNDM4MDc1MDAwMDAgfVxuICAgKiBpMi5kaWZmKGkxLCAnaG91cnMnKS50b09iamVjdCgpIC8vPT4geyBob3VyczogMTIxNjguNzUgfVxuICAgKiBpMi5kaWZmKGkxLCBbJ21vbnRocycsICdkYXlzJ10pLnRvT2JqZWN0KCkgLy89PiB7IG1vbnRoczogMTYsIGRheXM6IDE5LjAzMTI1IH1cbiAgICogaTIuZGlmZihpMSwgWydtb250aHMnLCAnZGF5cycsICdob3VycyddKS50b09iamVjdCgpIC8vPT4geyBtb250aHM6IDE2LCBkYXlzOiAxOSwgaG91cnM6IDAuNzUgfVxuICAgKiBAcmV0dXJuIHtEdXJhdGlvbn1cbiAgICovXG4gIGRpZmYob3RoZXJEYXRlVGltZSwgdW5pdCA9IFwibWlsbGlzZWNvbmRzXCIsIG9wdHMgPSB7fSkge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkIHx8ICFvdGhlckRhdGVUaW1lLmlzVmFsaWQpIHtcbiAgICAgIHJldHVybiBEdXJhdGlvbi5pbnZhbGlkKFwiY3JlYXRlZCBieSBkaWZmaW5nIGFuIGludmFsaWQgRGF0ZVRpbWVcIik7XG4gICAgfVxuXG4gICAgY29uc3QgZHVyT3B0cyA9IHsgbG9jYWxlOiB0aGlzLmxvY2FsZSwgbnVtYmVyaW5nU3lzdGVtOiB0aGlzLm51bWJlcmluZ1N5c3RlbSwgLi4ub3B0cyB9O1xuXG4gICAgY29uc3QgdW5pdHMgPSBtYXliZUFycmF5KHVuaXQpLm1hcChEdXJhdGlvbi5ub3JtYWxpemVVbml0KSxcbiAgICAgIG90aGVySXNMYXRlciA9IG90aGVyRGF0ZVRpbWUudmFsdWVPZigpID4gdGhpcy52YWx1ZU9mKCksXG4gICAgICBlYXJsaWVyID0gb3RoZXJJc0xhdGVyID8gdGhpcyA6IG90aGVyRGF0ZVRpbWUsXG4gICAgICBsYXRlciA9IG90aGVySXNMYXRlciA/IG90aGVyRGF0ZVRpbWUgOiB0aGlzLFxuICAgICAgZGlmZmVkID0gZGlmZihlYXJsaWVyLCBsYXRlciwgdW5pdHMsIGR1ck9wdHMpO1xuXG4gICAgcmV0dXJuIG90aGVySXNMYXRlciA/IGRpZmZlZC5uZWdhdGUoKSA6IGRpZmZlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGlzIERhdGVUaW1lIGFuZCByaWdodCBub3cuXG4gICAqIFNlZSB7QGxpbmsgRGF0ZVRpbWUjZGlmZn1cbiAgICogQHBhcmFtIHtzdHJpbmd8c3RyaW5nW119IFt1bml0PVsnbWlsbGlzZWNvbmRzJ11dIC0gdGhlIHVuaXQgb3IgdW5pdHMgdW5pdHMgKHN1Y2ggYXMgJ2hvdXJzJyBvciAnZGF5cycpIHRvIGluY2x1ZGUgaW4gdGhlIGR1cmF0aW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIC0gb3B0aW9ucyB0aGF0IGFmZmVjdCB0aGUgY3JlYXRpb24gb2YgdGhlIER1cmF0aW9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0cy5jb252ZXJzaW9uQWNjdXJhY3k9J2Nhc3VhbCddIC0gdGhlIGNvbnZlcnNpb24gc3lzdGVtIHRvIHVzZVxuICAgKiBAcmV0dXJuIHtEdXJhdGlvbn1cbiAgICovXG4gIGRpZmZOb3codW5pdCA9IFwibWlsbGlzZWNvbmRzXCIsIG9wdHMgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLmRpZmYoRGF0ZVRpbWUubm93KCksIHVuaXQsIG9wdHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhbiBJbnRlcnZhbCBzcGFubmluZyBiZXR3ZWVuIHRoaXMgRGF0ZVRpbWUgYW5kIGFub3RoZXIgRGF0ZVRpbWVcbiAgICogQHBhcmFtIHtEYXRlVGltZX0gb3RoZXJEYXRlVGltZSAtIHRoZSBvdGhlciBlbmQgcG9pbnQgb2YgdGhlIEludGVydmFsXG4gICAqIEByZXR1cm4ge0ludGVydmFsfVxuICAgKi9cbiAgdW50aWwob3RoZXJEYXRlVGltZSkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgPyBJbnRlcnZhbC5mcm9tRGF0ZVRpbWVzKHRoaXMsIG90aGVyRGF0ZVRpbWUpIDogdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gd2hldGhlciB0aGlzIERhdGVUaW1lIGlzIGluIHRoZSBzYW1lIHVuaXQgb2YgdGltZSBhcyBhbm90aGVyIERhdGVUaW1lLlxuICAgKiBIaWdoZXItb3JkZXIgdW5pdHMgbXVzdCBhbHNvIGJlIGlkZW50aWNhbCBmb3IgdGhpcyBmdW5jdGlvbiB0byByZXR1cm4gYHRydWVgLlxuICAgKiBOb3RlIHRoYXQgdGltZSB6b25lcyBhcmUgKippZ25vcmVkKiogaW4gdGhpcyBjb21wYXJpc29uLCB3aGljaCBjb21wYXJlcyB0aGUgKipsb2NhbCoqIGNhbGVuZGFyIHRpbWUuIFVzZSB7QGxpbmsgRGF0ZVRpbWUjc2V0Wm9uZX0gdG8gY29udmVydCBvbmUgb2YgdGhlIGRhdGVzIGlmIG5lZWRlZC5cbiAgICogQHBhcmFtIHtEYXRlVGltZX0gb3RoZXJEYXRlVGltZSAtIHRoZSBvdGhlciBEYXRlVGltZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gdW5pdCAtIHRoZSB1bml0IG9mIHRpbWUgdG8gY2hlY2sgc2FtZW5lc3Mgb25cbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubm93KCkuaGFzU2FtZShvdGhlckRULCAnZGF5Jyk7IC8vfj4gdHJ1ZSBpZiBvdGhlckRUIGlzIGluIHRoZSBzYW1lIGN1cnJlbnQgY2FsZW5kYXIgZGF5XG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBoYXNTYW1lKG90aGVyRGF0ZVRpbWUsIHVuaXQpIHtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgY29uc3QgaW5wdXRNcyA9IG90aGVyRGF0ZVRpbWUudmFsdWVPZigpO1xuICAgIGNvbnN0IGFkanVzdGVkVG9ab25lID0gdGhpcy5zZXRab25lKG90aGVyRGF0ZVRpbWUuem9uZSwgeyBrZWVwTG9jYWxUaW1lOiB0cnVlIH0pO1xuICAgIHJldHVybiBhZGp1c3RlZFRvWm9uZS5zdGFydE9mKHVuaXQpIDw9IGlucHV0TXMgJiYgaW5wdXRNcyA8PSBhZGp1c3RlZFRvWm9uZS5lbmRPZih1bml0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFcXVhbGl0eSBjaGVja1xuICAgKiBUd28gRGF0ZVRpbWVzIGFyZSBlcXVhbCBpZmYgdGhleSByZXByZXNlbnQgdGhlIHNhbWUgbWlsbGlzZWNvbmQsIGhhdmUgdGhlIHNhbWUgem9uZSBhbmQgbG9jYXRpb24sIGFuZCBhcmUgYm90aCB2YWxpZC5cbiAgICogVG8gY29tcGFyZSBqdXN0IHRoZSBtaWxsaXNlY29uZCB2YWx1ZXMsIHVzZSBgK2R0MSA9PT0gK2R0MmAuXG4gICAqIEBwYXJhbSB7RGF0ZVRpbWV9IG90aGVyIC0gdGhlIG90aGVyIERhdGVUaW1lXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBlcXVhbHMob3RoZXIpIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5pc1ZhbGlkICYmXG4gICAgICBvdGhlci5pc1ZhbGlkICYmXG4gICAgICB0aGlzLnZhbHVlT2YoKSA9PT0gb3RoZXIudmFsdWVPZigpICYmXG4gICAgICB0aGlzLnpvbmUuZXF1YWxzKG90aGVyLnpvbmUpICYmXG4gICAgICB0aGlzLmxvYy5lcXVhbHMob3RoZXIubG9jKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhIHRoaXMgdGltZSByZWxhdGl2ZSB0byBub3csIHN1Y2ggYXMgXCJpbiB0d28gZGF5c1wiLiBDYW4gb25seSBpbnRlcm5hdGlvbmFsaXplIGlmIHlvdXJcbiAgICogcGxhdGZvcm0gc3VwcG9ydHMgSW50bC5SZWxhdGl2ZVRpbWVGb3JtYXQuIFJvdW5kcyBkb3duIGJ5IGRlZmF1bHQuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gb3B0aW9ucyB0aGF0IGFmZmVjdCB0aGUgb3V0cHV0XG4gICAqIEBwYXJhbSB7RGF0ZVRpbWV9IFtvcHRpb25zLmJhc2U9RGF0ZVRpbWUubm93KCldIC0gdGhlIERhdGVUaW1lIHRvIHVzZSBhcyB0aGUgYmFzaXMgdG8gd2hpY2ggdGhpcyB0aW1lIGlzIGNvbXBhcmVkLiBEZWZhdWx0cyB0byBub3cuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5zdHlsZT1cImxvbmdcIl0gLSB0aGUgc3R5bGUgb2YgdW5pdHMsIG11c3QgYmUgXCJsb25nXCIsIFwic2hvcnRcIiwgb3IgXCJuYXJyb3dcIlxuICAgKiBAcGFyYW0ge3N0cmluZ3xzdHJpbmdbXX0gb3B0aW9ucy51bml0IC0gdXNlIGEgc3BlY2lmaWMgdW5pdCBvciBhcnJheSBvZiB1bml0czsgaWYgb21pdHRlZCwgb3IgYW4gYXJyYXksIHRoZSBtZXRob2Qgd2lsbCBwaWNrIHRoZSBiZXN0IHVuaXQuIFVzZSBhbiBhcnJheSBvciBvbmUgb2YgXCJ5ZWFyc1wiLCBcInF1YXJ0ZXJzXCIsIFwibW9udGhzXCIsIFwid2Vla3NcIiwgXCJkYXlzXCIsIFwiaG91cnNcIiwgXCJtaW51dGVzXCIsIG9yIFwic2Vjb25kc1wiXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMucm91bmQ9dHJ1ZV0gLSB3aGV0aGVyIHRvIHJvdW5kIHRoZSBudW1iZXJzIGluIHRoZSBvdXRwdXQuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5wYWRkaW5nPTBdIC0gcGFkZGluZyBpbiBtaWxsaXNlY29uZHMuIFRoaXMgYWxsb3dzIHlvdSB0byByb3VuZCB1cCB0aGUgcmVzdWx0IGlmIGl0IGZpdHMgaW5zaWRlIHRoZSB0aHJlc2hvbGQuIERvbid0IHVzZSBpbiBjb21iaW5hdGlvbiB3aXRoIHtyb3VuZDogZmFsc2V9IGJlY2F1c2UgdGhlIGRlY2ltYWwgb3V0cHV0IHdpbGwgaW5jbHVkZSB0aGUgcGFkZGluZy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMubG9jYWxlIC0gb3ZlcnJpZGUgdGhlIGxvY2FsZSBvZiB0aGlzIERhdGVUaW1lXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLm51bWJlcmluZ1N5c3RlbSAtIG92ZXJyaWRlIHRoZSBudW1iZXJpbmdTeXN0ZW0gb2YgdGhpcyBEYXRlVGltZS4gVGhlIEludGwgc3lzdGVtIG1heSBjaG9vc2Ugbm90IHRvIGhvbm9yIHRoaXNcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubm93KCkucGx1cyh7IGRheXM6IDEgfSkudG9SZWxhdGl2ZSgpIC8vPT4gXCJpbiAxIGRheVwiXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLm5vdygpLnNldExvY2FsZShcImVzXCIpLnRvUmVsYXRpdmUoeyBkYXlzOiAxIH0pIC8vPT4gXCJkZW50cm8gZGUgMSBkw61hXCJcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubm93KCkucGx1cyh7IGRheXM6IDEgfSkudG9SZWxhdGl2ZSh7IGxvY2FsZTogXCJmclwiIH0pIC8vPT4gXCJkYW5zIDIzIGhldXJlc1wiXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLm5vdygpLm1pbnVzKHsgZGF5czogMiB9KS50b1JlbGF0aXZlKCkgLy89PiBcIjIgZGF5cyBhZ29cIlxuICAgKiBAZXhhbXBsZSBEYXRlVGltZS5ub3coKS5taW51cyh7IGRheXM6IDIgfSkudG9SZWxhdGl2ZSh7IHVuaXQ6IFwiaG91cnNcIiB9KSAvLz0+IFwiNDggaG91cnMgYWdvXCJcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubm93KCkubWludXMoeyBob3VyczogMzYgfSkudG9SZWxhdGl2ZSh7IHJvdW5kOiBmYWxzZSB9KSAvLz0+IFwiMS41IGRheXMgYWdvXCJcbiAgICovXG4gIHRvUmVsYXRpdmUob3B0aW9ucyA9IHt9KSB7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWQpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IGJhc2UgPSBvcHRpb25zLmJhc2UgfHwgRGF0ZVRpbWUuZnJvbU9iamVjdCh7fSwgeyB6b25lOiB0aGlzLnpvbmUgfSksXG4gICAgICBwYWRkaW5nID0gb3B0aW9ucy5wYWRkaW5nID8gKHRoaXMgPCBiYXNlID8gLW9wdGlvbnMucGFkZGluZyA6IG9wdGlvbnMucGFkZGluZykgOiAwO1xuICAgIGxldCB1bml0cyA9IFtcInllYXJzXCIsIFwibW9udGhzXCIsIFwiZGF5c1wiLCBcImhvdXJzXCIsIFwibWludXRlc1wiLCBcInNlY29uZHNcIl07XG4gICAgbGV0IHVuaXQgPSBvcHRpb25zLnVuaXQ7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkob3B0aW9ucy51bml0KSkge1xuICAgICAgdW5pdHMgPSBvcHRpb25zLnVuaXQ7XG4gICAgICB1bml0ID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4gZGlmZlJlbGF0aXZlKGJhc2UsIHRoaXMucGx1cyhwYWRkaW5nKSwge1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIG51bWVyaWM6IFwiYWx3YXlzXCIsXG4gICAgICB1bml0cyxcbiAgICAgIHVuaXQsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIGRhdGUgcmVsYXRpdmUgdG8gdG9kYXksIHN1Y2ggYXMgXCJ5ZXN0ZXJkYXlcIiBvciBcIm5leHQgbW9udGhcIi5cbiAgICogT25seSBpbnRlcm5hdGlvbmFsaXplcyBvbiBwbGF0Zm9ybXMgdGhhdCBzdXBwb3J0cyBJbnRsLlJlbGF0aXZlVGltZUZvcm1hdC5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBvcHRpb25zIHRoYXQgYWZmZWN0IHRoZSBvdXRwdXRcbiAgICogQHBhcmFtIHtEYXRlVGltZX0gW29wdGlvbnMuYmFzZT1EYXRlVGltZS5ub3coKV0gLSB0aGUgRGF0ZVRpbWUgdG8gdXNlIGFzIHRoZSBiYXNpcyB0byB3aGljaCB0aGlzIHRpbWUgaXMgY29tcGFyZWQuIERlZmF1bHRzIHRvIG5vdy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMubG9jYWxlIC0gb3ZlcnJpZGUgdGhlIGxvY2FsZSBvZiB0aGlzIERhdGVUaW1lXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnVuaXQgLSB1c2UgYSBzcGVjaWZpYyB1bml0OyBpZiBvbWl0dGVkLCB0aGUgbWV0aG9kIHdpbGwgcGljayB0aGUgdW5pdC4gVXNlIG9uZSBvZiBcInllYXJzXCIsIFwicXVhcnRlcnNcIiwgXCJtb250aHNcIiwgXCJ3ZWVrc1wiLCBvciBcImRheXNcIlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5udW1iZXJpbmdTeXN0ZW0gLSBvdmVycmlkZSB0aGUgbnVtYmVyaW5nU3lzdGVtIG9mIHRoaXMgRGF0ZVRpbWUuIFRoZSBJbnRsIHN5c3RlbSBtYXkgY2hvb3NlIG5vdCB0byBob25vciB0aGlzXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLm5vdygpLnBsdXMoeyBkYXlzOiAxIH0pLnRvUmVsYXRpdmVDYWxlbmRhcigpIC8vPT4gXCJ0b21vcnJvd1wiXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLm5vdygpLnNldExvY2FsZShcImVzXCIpLnBsdXMoeyBkYXlzOiAxIH0pLnRvUmVsYXRpdmUoKSAvLz0+IFwiXCJtYcOxYW5hXCJcbiAgICogQGV4YW1wbGUgRGF0ZVRpbWUubm93KCkucGx1cyh7IGRheXM6IDEgfSkudG9SZWxhdGl2ZUNhbGVuZGFyKHsgbG9jYWxlOiBcImZyXCIgfSkgLy89PiBcImRlbWFpblwiXG4gICAqIEBleGFtcGxlIERhdGVUaW1lLm5vdygpLm1pbnVzKHsgZGF5czogMiB9KS50b1JlbGF0aXZlQ2FsZW5kYXIoKSAvLz0+IFwiMiBkYXlzIGFnb1wiXG4gICAqL1xuICB0b1JlbGF0aXZlQ2FsZW5kYXIob3B0aW9ucyA9IHt9KSB7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWQpIHJldHVybiBudWxsO1xuXG4gICAgcmV0dXJuIGRpZmZSZWxhdGl2ZShvcHRpb25zLmJhc2UgfHwgRGF0ZVRpbWUuZnJvbU9iamVjdCh7fSwgeyB6b25lOiB0aGlzLnpvbmUgfSksIHRoaXMsIHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBudW1lcmljOiBcImF1dG9cIixcbiAgICAgIHVuaXRzOiBbXCJ5ZWFyc1wiLCBcIm1vbnRoc1wiLCBcImRheXNcIl0sXG4gICAgICBjYWxlbmRhcnk6IHRydWUsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBtaW4gb2Ygc2V2ZXJhbCBkYXRlIHRpbWVzXG4gICAqIEBwYXJhbSB7Li4uRGF0ZVRpbWV9IGRhdGVUaW1lcyAtIHRoZSBEYXRlVGltZXMgZnJvbSB3aGljaCB0byBjaG9vc2UgdGhlIG1pbmltdW1cbiAgICogQHJldHVybiB7RGF0ZVRpbWV9IHRoZSBtaW4gRGF0ZVRpbWUsIG9yIHVuZGVmaW5lZCBpZiBjYWxsZWQgd2l0aCBubyBhcmd1bWVudFxuICAgKi9cbiAgc3RhdGljIG1pbiguLi5kYXRlVGltZXMpIHtcbiAgICBpZiAoIWRhdGVUaW1lcy5ldmVyeShEYXRlVGltZS5pc0RhdGVUaW1lKSkge1xuICAgICAgdGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEVycm9yKFwibWluIHJlcXVpcmVzIGFsbCBhcmd1bWVudHMgYmUgRGF0ZVRpbWVzXCIpO1xuICAgIH1cbiAgICByZXR1cm4gYmVzdEJ5KGRhdGVUaW1lcywgKGkpID0+IGkudmFsdWVPZigpLCBNYXRoLm1pbik7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBtYXggb2Ygc2V2ZXJhbCBkYXRlIHRpbWVzXG4gICAqIEBwYXJhbSB7Li4uRGF0ZVRpbWV9IGRhdGVUaW1lcyAtIHRoZSBEYXRlVGltZXMgZnJvbSB3aGljaCB0byBjaG9vc2UgdGhlIG1heGltdW1cbiAgICogQHJldHVybiB7RGF0ZVRpbWV9IHRoZSBtYXggRGF0ZVRpbWUsIG9yIHVuZGVmaW5lZCBpZiBjYWxsZWQgd2l0aCBubyBhcmd1bWVudFxuICAgKi9cbiAgc3RhdGljIG1heCguLi5kYXRlVGltZXMpIHtcbiAgICBpZiAoIWRhdGVUaW1lcy5ldmVyeShEYXRlVGltZS5pc0RhdGVUaW1lKSkge1xuICAgICAgdGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEVycm9yKFwibWF4IHJlcXVpcmVzIGFsbCBhcmd1bWVudHMgYmUgRGF0ZVRpbWVzXCIpO1xuICAgIH1cbiAgICByZXR1cm4gYmVzdEJ5KGRhdGVUaW1lcywgKGkpID0+IGkudmFsdWVPZigpLCBNYXRoLm1heCk7XG4gIH1cblxuICAvLyBNSVNDXG5cbiAgLyoqXG4gICAqIEV4cGxhaW4gaG93IGEgc3RyaW5nIHdvdWxkIGJlIHBhcnNlZCBieSBmcm9tRm9ybWF0KClcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHQgLSB0aGUgc3RyaW5nIHRvIHBhcnNlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBmbXQgLSB0aGUgZm9ybWF0IHRoZSBzdHJpbmcgaXMgZXhwZWN0ZWQgdG8gYmUgaW4gKHNlZSBkZXNjcmlwdGlvbilcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBvcHRpb25zIHRha2VuIGJ5IGZyb21Gb3JtYXQoKVxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBzdGF0aWMgZnJvbUZvcm1hdEV4cGxhaW4odGV4dCwgZm10LCBvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCB7IGxvY2FsZSA9IG51bGwsIG51bWJlcmluZ1N5c3RlbSA9IG51bGwgfSA9IG9wdGlvbnMsXG4gICAgICBsb2NhbGVUb1VzZSA9IExvY2FsZS5mcm9tT3B0cyh7XG4gICAgICAgIGxvY2FsZSxcbiAgICAgICAgbnVtYmVyaW5nU3lzdGVtLFxuICAgICAgICBkZWZhdWx0VG9FTjogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIHJldHVybiBleHBsYWluRnJvbVRva2Vucyhsb2NhbGVUb1VzZSwgdGV4dCwgZm10KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCB1c2UgZnJvbUZvcm1hdEV4cGxhaW4gaW5zdGVhZFxuICAgKi9cbiAgc3RhdGljIGZyb21TdHJpbmdFeHBsYWluKHRleHQsIGZtdCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgcmV0dXJuIERhdGVUaW1lLmZyb21Gb3JtYXRFeHBsYWluKHRleHQsIGZtdCwgb3B0aW9ucyk7XG4gIH1cblxuICAvLyBGT1JNQVQgUFJFU0VUU1xuXG4gIC8qKlxuICAgKiB7QGxpbmsgRGF0ZVRpbWUjdG9Mb2NhbGVTdHJpbmd9IGZvcm1hdCBsaWtlIDEwLzE0LzE5ODNcbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIHN0YXRpYyBnZXQgREFURV9TSE9SVCgpIHtcbiAgICByZXR1cm4gREFURV9TSE9SVDtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGxpbmsgRGF0ZVRpbWUjdG9Mb2NhbGVTdHJpbmd9IGZvcm1hdCBsaWtlICdPY3QgMTQsIDE5ODMnXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuICBzdGF0aWMgZ2V0IERBVEVfTUVEKCkge1xuICAgIHJldHVybiBEQVRFX01FRDtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGxpbmsgRGF0ZVRpbWUjdG9Mb2NhbGVTdHJpbmd9IGZvcm1hdCBsaWtlICdGcmksIE9jdCAxNCwgMTk4MydcbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIHN0YXRpYyBnZXQgREFURV9NRURfV0lUSF9XRUVLREFZKCkge1xuICAgIHJldHVybiBEQVRFX01FRF9XSVRIX1dFRUtEQVk7XG4gIH1cblxuICAvKipcbiAgICoge0BsaW5rIERhdGVUaW1lI3RvTG9jYWxlU3RyaW5nfSBmb3JtYXQgbGlrZSAnT2N0b2JlciAxNCwgMTk4MydcbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIHN0YXRpYyBnZXQgREFURV9GVUxMKCkge1xuICAgIHJldHVybiBEQVRFX0ZVTEw7XG4gIH1cblxuICAvKipcbiAgICoge0BsaW5rIERhdGVUaW1lI3RvTG9jYWxlU3RyaW5nfSBmb3JtYXQgbGlrZSAnVHVlc2RheSwgT2N0b2JlciAxNCwgMTk4MydcbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIHN0YXRpYyBnZXQgREFURV9IVUdFKCkge1xuICAgIHJldHVybiBEQVRFX0hVR0U7XG4gIH1cblxuICAvKipcbiAgICoge0BsaW5rIERhdGVUaW1lI3RvTG9jYWxlU3RyaW5nfSBmb3JtYXQgbGlrZSAnMDk6MzAgQU0nLiBPbmx5IDEyLWhvdXIgaWYgdGhlIGxvY2FsZSBpcy5cbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIHN0YXRpYyBnZXQgVElNRV9TSU1QTEUoKSB7XG4gICAgcmV0dXJuIFRJTUVfU0lNUExFO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAbGluayBEYXRlVGltZSN0b0xvY2FsZVN0cmluZ30gZm9ybWF0IGxpa2UgJzA5OjMwOjIzIEFNJy4gT25seSAxMi1ob3VyIGlmIHRoZSBsb2NhbGUgaXMuXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuICBzdGF0aWMgZ2V0IFRJTUVfV0lUSF9TRUNPTkRTKCkge1xuICAgIHJldHVybiBUSU1FX1dJVEhfU0VDT05EUztcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGxpbmsgRGF0ZVRpbWUjdG9Mb2NhbGVTdHJpbmd9IGZvcm1hdCBsaWtlICcwOTozMDoyMyBBTSBFRFQnLiBPbmx5IDEyLWhvdXIgaWYgdGhlIGxvY2FsZSBpcy5cbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIHN0YXRpYyBnZXQgVElNRV9XSVRIX1NIT1JUX09GRlNFVCgpIHtcbiAgICByZXR1cm4gVElNRV9XSVRIX1NIT1JUX09GRlNFVDtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGxpbmsgRGF0ZVRpbWUjdG9Mb2NhbGVTdHJpbmd9IGZvcm1hdCBsaWtlICcwOTozMDoyMyBBTSBFYXN0ZXJuIERheWxpZ2h0IFRpbWUnLiBPbmx5IDEyLWhvdXIgaWYgdGhlIGxvY2FsZSBpcy5cbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIHN0YXRpYyBnZXQgVElNRV9XSVRIX0xPTkdfT0ZGU0VUKCkge1xuICAgIHJldHVybiBUSU1FX1dJVEhfTE9OR19PRkZTRVQ7XG4gIH1cblxuICAvKipcbiAgICoge0BsaW5rIERhdGVUaW1lI3RvTG9jYWxlU3RyaW5nfSBmb3JtYXQgbGlrZSAnMDk6MzAnLCBhbHdheXMgMjQtaG91ci5cbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIHN0YXRpYyBnZXQgVElNRV8yNF9TSU1QTEUoKSB7XG4gICAgcmV0dXJuIFRJTUVfMjRfU0lNUExFO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAbGluayBEYXRlVGltZSN0b0xvY2FsZVN0cmluZ30gZm9ybWF0IGxpa2UgJzA5OjMwOjIzJywgYWx3YXlzIDI0LWhvdXIuXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuICBzdGF0aWMgZ2V0IFRJTUVfMjRfV0lUSF9TRUNPTkRTKCkge1xuICAgIHJldHVybiBUSU1FXzI0X1dJVEhfU0VDT05EUztcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGxpbmsgRGF0ZVRpbWUjdG9Mb2NhbGVTdHJpbmd9IGZvcm1hdCBsaWtlICcwOTozMDoyMyBFRFQnLCBhbHdheXMgMjQtaG91ci5cbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIHN0YXRpYyBnZXQgVElNRV8yNF9XSVRIX1NIT1JUX09GRlNFVCgpIHtcbiAgICByZXR1cm4gVElNRV8yNF9XSVRIX1NIT1JUX09GRlNFVDtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGxpbmsgRGF0ZVRpbWUjdG9Mb2NhbGVTdHJpbmd9IGZvcm1hdCBsaWtlICcwOTozMDoyMyBFYXN0ZXJuIERheWxpZ2h0IFRpbWUnLCBhbHdheXMgMjQtaG91ci5cbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIHN0YXRpYyBnZXQgVElNRV8yNF9XSVRIX0xPTkdfT0ZGU0VUKCkge1xuICAgIHJldHVybiBUSU1FXzI0X1dJVEhfTE9OR19PRkZTRVQ7XG4gIH1cblxuICAvKipcbiAgICoge0BsaW5rIERhdGVUaW1lI3RvTG9jYWxlU3RyaW5nfSBmb3JtYXQgbGlrZSAnMTAvMTQvMTk4MywgOTozMCBBTScuIE9ubHkgMTItaG91ciBpZiB0aGUgbG9jYWxlIGlzLlxuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKi9cbiAgc3RhdGljIGdldCBEQVRFVElNRV9TSE9SVCgpIHtcbiAgICByZXR1cm4gREFURVRJTUVfU0hPUlQ7XG4gIH1cblxuICAvKipcbiAgICoge0BsaW5rIERhdGVUaW1lI3RvTG9jYWxlU3RyaW5nfSBmb3JtYXQgbGlrZSAnMTAvMTQvMTk4MywgOTozMDozMyBBTScuIE9ubHkgMTItaG91ciBpZiB0aGUgbG9jYWxlIGlzLlxuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKi9cbiAgc3RhdGljIGdldCBEQVRFVElNRV9TSE9SVF9XSVRIX1NFQ09ORFMoKSB7XG4gICAgcmV0dXJuIERBVEVUSU1FX1NIT1JUX1dJVEhfU0VDT05EUztcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGxpbmsgRGF0ZVRpbWUjdG9Mb2NhbGVTdHJpbmd9IGZvcm1hdCBsaWtlICdPY3QgMTQsIDE5ODMsIDk6MzAgQU0nLiBPbmx5IDEyLWhvdXIgaWYgdGhlIGxvY2FsZSBpcy5cbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIHN0YXRpYyBnZXQgREFURVRJTUVfTUVEKCkge1xuICAgIHJldHVybiBEQVRFVElNRV9NRUQ7XG4gIH1cblxuICAvKipcbiAgICoge0BsaW5rIERhdGVUaW1lI3RvTG9jYWxlU3RyaW5nfSBmb3JtYXQgbGlrZSAnT2N0IDE0LCAxOTgzLCA5OjMwOjMzIEFNJy4gT25seSAxMi1ob3VyIGlmIHRoZSBsb2NhbGUgaXMuXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuICBzdGF0aWMgZ2V0IERBVEVUSU1FX01FRF9XSVRIX1NFQ09ORFMoKSB7XG4gICAgcmV0dXJuIERBVEVUSU1FX01FRF9XSVRIX1NFQ09ORFM7XG4gIH1cblxuICAvKipcbiAgICoge0BsaW5rIERhdGVUaW1lI3RvTG9jYWxlU3RyaW5nfSBmb3JtYXQgbGlrZSAnRnJpLCAxNCBPY3QgMTk4MywgOTozMCBBTScuIE9ubHkgMTItaG91ciBpZiB0aGUgbG9jYWxlIGlzLlxuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKi9cbiAgc3RhdGljIGdldCBEQVRFVElNRV9NRURfV0lUSF9XRUVLREFZKCkge1xuICAgIHJldHVybiBEQVRFVElNRV9NRURfV0lUSF9XRUVLREFZO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAbGluayBEYXRlVGltZSN0b0xvY2FsZVN0cmluZ30gZm9ybWF0IGxpa2UgJ09jdG9iZXIgMTQsIDE5ODMsIDk6MzAgQU0gRURUJy4gT25seSAxMi1ob3VyIGlmIHRoZSBsb2NhbGUgaXMuXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuICBzdGF0aWMgZ2V0IERBVEVUSU1FX0ZVTEwoKSB7XG4gICAgcmV0dXJuIERBVEVUSU1FX0ZVTEw7XG4gIH1cblxuICAvKipcbiAgICoge0BsaW5rIERhdGVUaW1lI3RvTG9jYWxlU3RyaW5nfSBmb3JtYXQgbGlrZSAnT2N0b2JlciAxNCwgMTk4MywgOTozMDozMyBBTSBFRFQnLiBPbmx5IDEyLWhvdXIgaWYgdGhlIGxvY2FsZSBpcy5cbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIHN0YXRpYyBnZXQgREFURVRJTUVfRlVMTF9XSVRIX1NFQ09ORFMoKSB7XG4gICAgcmV0dXJuIERBVEVUSU1FX0ZVTExfV0lUSF9TRUNPTkRTO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAbGluayBEYXRlVGltZSN0b0xvY2FsZVN0cmluZ30gZm9ybWF0IGxpa2UgJ0ZyaWRheSwgT2N0b2JlciAxNCwgMTk4MywgOTozMCBBTSBFYXN0ZXJuIERheWxpZ2h0IFRpbWUnLiBPbmx5IDEyLWhvdXIgaWYgdGhlIGxvY2FsZSBpcy5cbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIHN0YXRpYyBnZXQgREFURVRJTUVfSFVHRSgpIHtcbiAgICByZXR1cm4gREFURVRJTUVfSFVHRTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGxpbmsgRGF0ZVRpbWUjdG9Mb2NhbGVTdHJpbmd9IGZvcm1hdCBsaWtlICdGcmlkYXksIE9jdG9iZXIgMTQsIDE5ODMsIDk6MzA6MzMgQU0gRWFzdGVybiBEYXlsaWdodCBUaW1lJy4gT25seSAxMi1ob3VyIGlmIHRoZSBsb2NhbGUgaXMuXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuICBzdGF0aWMgZ2V0IERBVEVUSU1FX0hVR0VfV0lUSF9TRUNPTkRTKCkge1xuICAgIHJldHVybiBEQVRFVElNRV9IVUdFX1dJVEhfU0VDT05EUztcbiAgfVxufVxuXG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGZyaWVuZGx5RGF0ZVRpbWUoZGF0ZVRpbWVpc2gpIHtcbiAgaWYgKERhdGVUaW1lLmlzRGF0ZVRpbWUoZGF0ZVRpbWVpc2gpKSB7XG4gICAgcmV0dXJuIGRhdGVUaW1laXNoO1xuICB9IGVsc2UgaWYgKGRhdGVUaW1laXNoICYmIGRhdGVUaW1laXNoLnZhbHVlT2YgJiYgaXNOdW1iZXIoZGF0ZVRpbWVpc2gudmFsdWVPZigpKSkge1xuICAgIHJldHVybiBEYXRlVGltZS5mcm9tSlNEYXRlKGRhdGVUaW1laXNoKTtcbiAgfSBlbHNlIGlmIChkYXRlVGltZWlzaCAmJiB0eXBlb2YgZGF0ZVRpbWVpc2ggPT09IFwib2JqZWN0XCIpIHtcbiAgICByZXR1cm4gRGF0ZVRpbWUuZnJvbU9iamVjdChkYXRlVGltZWlzaCk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEludmFsaWRBcmd1bWVudEVycm9yKFxuICAgICAgYFVua25vd24gZGF0ZXRpbWUgYXJndW1lbnQ6ICR7ZGF0ZVRpbWVpc2h9LCBvZiB0eXBlICR7dHlwZW9mIGRhdGVUaW1laXNofWBcbiAgICApO1xuICB9XG59XG5cbmNvbnN0IFZFUlNJT04gPSBcIjIuNS4yXCI7XG5cbmV4cG9ydCB7IERhdGVUaW1lLCBEdXJhdGlvbiwgRml4ZWRPZmZzZXRab25lLCBJQU5BWm9uZSwgSW5mbywgSW50ZXJ2YWwsIEludmFsaWRab25lLCBTZXR0aW5ncywgU3lzdGVtWm9uZSwgVkVSU0lPTiwgWm9uZSB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bHV4b24uanMubWFwXG4iXX0=