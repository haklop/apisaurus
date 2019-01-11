import 'reflect-metadata';

export function Table(name: string) {

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