import "reflect-metadata";

export enum ColumnType {
  text = 'text',
  number = 'number'
}

export function Column(): Function;

export function Column(sqlName: string): Function;

export function Column(columnType: ColumnType): Function;

export function Column(sqlName: string, columnType: ColumnType): Function;

export function Column(nameOrType?: string | ColumnType, type?: ColumnType) {
  let columnType: ColumnType;
  let columnName: string;

  if (type) {
    columnType = type;
    columnName = nameOrType;
  } else if (typeof nameOrType === 'string' && nameOrType in ColumnType) {
    columnType = type;
  } else if (typeof nameOrType === 'string') {
    columnName = nameOrType;
  }
  return function(object: any, propertyName: string) {
    if (!columnName) {
      columnName = propertyName;
    }

    if (!columnType) {
      const t = Reflect.getMetadata("design:type", object, propertyName);
      if (t.name === 'Number') {
        columnType = ColumnType.number;
      } else {
        columnType = ColumnType.text;
      }
    }

    console.log(propertyName, columnName, columnType);
  }
}