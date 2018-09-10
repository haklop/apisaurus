function Property(sqlName: string) {
  return function(target: any, propertyKey: string) {
    console.log('a', sqlName, target, propertyKey);
    target._sqlData = () => {
      this.uuid = '123';
      console.log('plouf', sqlName);
    }
    console.log(target);
  }
}

export {Property};
