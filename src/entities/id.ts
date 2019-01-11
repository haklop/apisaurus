import 'reflect-metadata';

export function Id() {

  return (object: any, propertyName: string) => {
    const id = Reflect.getMetadata('db:id', object);
    if (id) {
      throw new IdAlreadyDefinedException(`primary key lready defined with property {id}`);
    }
    Reflect.defineMetadata('db:id', new IdDescriptor(propertyName), object);
  };
}

class IdAlreadyDefinedException {
  private message: string;

  constructor(message: string) {
    this.message = message;
  }
}

class IdDescriptor {
  private propertyName: string;

  constructor(propertyName: string) {
    this.propertyName = propertyName;
  }
}
