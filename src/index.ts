import MySQLPersonData from './data/mysql-person-data';
import PersonData, { Person } from './data/person-data';

export interface FindPersonEvent {
  id?: string;
  name?: string;
}

export const findPeople = async (event: FindPersonEvent, dataService: PersonData): Promise<Person | Person[] | undefined> => {
  if (!event.id && !event.name) {
    throw new Error('id or name required in input.');
  }

  if (event.id && event.name) {
    throw new Error('Only one of id or name can be included in input.');
  }

  if (event.id) {
    return dataService.getById(event.id);
  } else if (event.name) {
    return dataService.searchByName(event.name);
  }
};

export const handler = (event: FindPersonEvent): Promise<Person | Person[] | undefined> => {
  const dataService = new MySQLPersonData();
  return findPeople(event, dataService);
};
