import 'reflect-metadata';

// type Constructor<T = {}> = new (...args: any[]) => T;

export function Table(name: string) {

  /*return function classDecorator<T extends Constructor>(Base: T) {
    return class extends Base {
      public toto: string = 'tata';

      public save() {
        console.log('save');
      }
    };
  };*/
  return (constructor) => {
    const id = Reflect.getMetadata('db:id', constructor.prototype);
    if (!id) {
      throw new InvalidDefinitionException(`id is mandatory`);
    }

    Reflect.defineMetadata('db:table', name, constructor);
  };
}

class InvalidDefinitionException {
  private message: string;

  constructor(message: string) {
    this.message = message;
  }
}
