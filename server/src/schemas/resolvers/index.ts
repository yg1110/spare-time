import {
  findCalendarByDate,
  findCalendarById,
  findCalendarByRange,
} from './_queries'
import {
  deleteDiaries,
  deleteSchedules,
  editDiary,
  editSchedules,
  insertDiary,
  insertSchedule,
} from './_mutations'

const resolvers = {
  Query: {
    findCalendarById,
    findCalendarByDate,
    findCalendarByRange,
  },
  Mutation: {
    insertDiary,
    editDiary,
    deleteDiaries,
    insertSchedule,
    editSchedules,
    deleteSchedules,
  },
}

export default resolvers
