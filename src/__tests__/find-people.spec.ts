import { findPeople } from '../index';
import MockPersonData from './__data__/mock-person-data';

describe('findPeople handler', () => {
  it('will return an error if neither id or name is included in input', async () => {
    const mockDataService = new MockPersonData();

    await expect(async () => {
      await findPeople({}, mockDataService);
    }).rejects.toThrow('id or name required in input.');
  });

  it('will return an error if both id and name are included in input', async () => {
    const mockDataService = new MockPersonData();

    await expect(async () => {
      await findPeople({ id: '1000', name: 'John Doe' }, mockDataService);
    }).rejects.toThrow('Only one of id or name can be included in input.');
  });

  it('will return a single person object when it finds a match by id', async () => {
    const mockDataService = new MockPersonData();

    const person = await findPeople({ id: '1' }, mockDataService);

    expect(person).toEqual({
      id: '1',
      firstName: 'John',
      lastName: 'Doe'
    });
  });

  it('will return a undefined when it does not find a match by id', async () => {
    const mockDataService = new MockPersonData();

    const person = await findPeople({ id: '3' }, mockDataService);

    expect(person).toBe(undefined);
  });

  it('will return an array of person objects when it finds matches by name', async () => {
    const mockDataService = new MockPersonData();

    const people = await findPeople({ name: 'John' }, mockDataService);

    expect(people).toEqual([
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
    ]);
  });

  it('will return an empty array when it does not find any matches by name', async () => {
    const mockDataService = new MockPersonData();

    const people = await findPeople({ name: 'Bill' }, mockDataService);

    expect(people).toEqual([]);
  });
});
