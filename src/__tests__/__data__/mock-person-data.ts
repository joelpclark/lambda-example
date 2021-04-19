import PersonData, { Person } from '../../data/person-data';

export default class MockPersonData implements PersonData {
  async getById(id: string): Promise<Person | undefined> {
    if (id === '1') {
      return {
        id: '1',
        firstName: 'John',
        lastName: 'Doe'
      };
    }
  }

  async searchByName(name: string): Promise<Person[]> {
    if (name.toLowerCase() === 'john') {
      return [
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe'
        },
        {
          id: '2',
          firstName: 'John',
          lastName: 'Smith'
        }
      ];
    }

    return [];
  }
}
