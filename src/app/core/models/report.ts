import { TimeEntry } from "./time-entry";

export interface Report {
    objectId: String,
    owner: String,
    from: String,
    to: String,
    timeEntries: TimeEntry[],
    totalHours: number
}
