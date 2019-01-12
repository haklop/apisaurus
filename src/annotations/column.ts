import 'reflect-metadata';

export enum ColumnType {
  text = 'text',
  number = 'number',
}

export function Column(nameOrType?: string | ColumnType, type?: ColumnType) {
  let columnType: ColumnType;
  let columnName: string;

  if (type) {
    columnType = type;
    columnName = nameOrType;
  } else if (typeof nameOrType === 'string' && nameOrType in ColumnType) {
    columnType = ColumnType[nameOrType];
  } else if (typeof nameOrType === 'string') {
    columnName = nameOrType;
  }

  return (object: any, propertyName: string) => {
    if (!columnName) {
      columnName = propertyName;
    }

    if (!columnType) {
      const t = Reflect.getMetadata('design:type', object, propertyName);
      if (t.name === 'Number') {
        columnType = ColumnType.number;
      } else {
        columnType = ColumnType.text;
      }
    }

    let columns = Reflect.getMetadata('db:columns', object);
    if (!columns) {
      columns = new Map<string, ColumnDescriptor>();
    }
    columns.set(propertyName, new ColumnDescriptor(columnType, columnName, propertyName));
    Reflect.defineMetadata('db:columns', columns, object);
  };
}

// TODO : move
export class ColumnDescriptor {
  public type: ColumnType;
  public sqlName: string;
  public propertyName: string;

  constructor(type: ColumnType, sqlName: string, propertyName: string) {
    this.type = type;
    this.sqlName = sqlName;
    this.propertyName = propertyName;

    Object.freeze(this);
  }
}
