import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(isBetween)
dayjs.tz.setDefault('Asia/Kolkata')

export function areVendorsOpen() {
    return dayjs
        .tz()
        .isBetween(
            dayjs.tz().set('hour', 10).set('minute', 0).set('second', 0),
            dayjs.tz().set('hour', 22).set('minute', 0).set('second', 0)
        )
}
