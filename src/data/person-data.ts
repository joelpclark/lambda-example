export interface Person {
  id: string;
  firstName: string;
  lastName: string;
}

export default interface PersonData {
  getById(id: string): Promise<Person | undefined>;
  searchByName(name: string): Promise<Person[]>;
}
