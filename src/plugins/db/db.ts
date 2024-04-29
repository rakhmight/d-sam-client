import Dexie, { Table } from 'dexie';

export class SAESchedulerDB extends Dexie {
  sessions!: Table<SessionsTable>

  constructor() {
    super('DSam');

    this.version(1).stores({
      sessions: '++id, files, counter, lists, name, dateOfCreation, dateOfLastModified'
    })

    this.open()
    .then(data => console.log('[DSam] DB is opened', data))
    .catch(err => console.error(err.message))

  }
}

export const db = new SAESchedulerDB()