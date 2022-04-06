export interface PeopleDTO {
    people: {
      name: string,
      age: number,
      url?: string,
      note?: string,
    }[]
}
