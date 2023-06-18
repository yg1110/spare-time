import {
  findCalendarByDate,
  findCalendarById,
  findCalendarByRange,
} from './_query'
import {
  deleteDiaries,
  deleteSchedules,
  editDiary,
  editSchedules,
  insertDiary,
  insertSchedule,
} from './_mutation'

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
