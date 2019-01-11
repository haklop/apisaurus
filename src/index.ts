import app from './app';
import { Step } from './models/step';

import { isNull } from 'util';

/*const port = 4040;
app.listen(port, () => {
  console.log('Express server listening on port ' + port);
});*/

const step = new Step();
console.log('not set', step.uuid);

step.uuid = undefined;
console.log('undefined', isNull(step.uuid));

step.uuid = null;
console.log('null', isNull(step.uuid));

console.log(Reflect.getMetadata('db:columns', step));
console.log(Reflect.getMetadata('db:id', step));
console.log(Reflect.getMetadata('db:table', step.constructor));
