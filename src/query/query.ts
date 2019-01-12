import 'reflect-metadata';

import { isUndefined } from 'util';
import { Pool } from 'pg';

import { ColumnDescriptor } from '../annotations/column';
import { IdDescriptor } from '../annotations/id';

export class Query {

  private pool: Pool;

  public constructor(pool: Pool) {
    this.pool = pool;
  }

  public async save<T>(entity: T) {
    const tableName = Reflect.getMetadata('db:table', entity.constructor) as string;
    const columns = Reflect.getMetadata('db:columns', entity) as Map<string, ColumnDescriptor>;
    const idColumnName = Reflect.getMetadata('db:id', entity) as IdDescriptor;

    const idColumn = columns.get(idColumnName.propertyName);

    if (!entity[idColumn.propertyName]) {
      console.log('primary key is empty');
      // TODO exception
      return;
    }

    let i = 1;

    const insertIntoColumns = [];
    const insertIntoValues = [];
    const onConflictValues = [];
    const sqlParameters = [];

    columns.forEach((column) => {
      const value = entity[column.propertyName];

      if (!isUndefined(value)) {
        insertIntoColumns.push(column.sqlName);
        insertIntoValues.push(`$${i}`);

        if (column.propertyName !== idColumn.propertyName) {
          onConflictValues.push(`${column.sqlName} = $${i}`);
        }
        sqlParameters.push(value);
        i++;
      }
    });

    const sql = `INSERT INTO ${tableName} (${insertIntoColumns.reduce((res, value) => `${res}, ${value}`)})
                VALUES (${insertIntoValues.reduce((res, value) => `${res}, ${value}`)})
                ON CONFLICT (${idColumn.propertyName}) ${this.buildDoUpdate(onConflictValues)}`;
    console.log(sql, sqlParameters);

    await this.pool.query(sql, sqlParameters);
  }

  private buildDoUpdate(onConflictValues: string[]) {
    if (onConflictValues.length === 0) {
      return 'DO NOTHING';
    }
    return `DO UPDATE SET ${onConflictValues.reduce((res, value) => `${res}, ${value}`)}`;
  }
}
