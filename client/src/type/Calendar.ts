export interface DATE_TYPE {
  startDate: Date | undefined
  endDate: Date | undefined
  key: string
}

export interface OPTION {
  selection: any
  compare: DATE_TYPE
}
