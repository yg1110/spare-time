export const LANG = 'ko'
export const MENUS = {
  TODAY: 'today',
  MONTH: 'month',
  WEEK: 'week',
  DAY: 'day',
  ADD: 'add',
}
export const CALENDAR_VIEW_MODE = {
  MONTH: 'dayGridMonth',
  WEEK: 'timeGridWeek',
  DAY: 'timeGridDay',
  LIST: 'listWeek',
}
export const SCHEDULE_MODE = {
  CREATE: 'create',
  MODIFY: 'modify',
}
export const CATEGORY = {
  TODO: {
    key: 'todo',
    name: '투두리스트',
  },
  DIARY: {
    key: 'diary',
    name: '일기',
  },
  SCHEDULE: {
    key: 'schedule',
    name: '스케쥴',
  },
}

export const CATEGORIES = Object.values(CATEGORY)
