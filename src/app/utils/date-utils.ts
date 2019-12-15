import * as moment from 'moment';


export class DateUtils {

    /**
     * Converts a iso8601 to Date. It ignores time!
     * @param iso8601 source string
     */
    public static fromIso8601ToDate(iso8601: string): Date {
        return moment(iso8601, 'YYYY-MM-DD').toDate();
    }

}
