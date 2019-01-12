import 'reflect-metadata';

import app from './app';
import { Step } from './models/step';

import { isNull } from 'util';
import { Query } from './query/query';
import { Pool } from 'pg';

/*const port = 4040;
app.listen(port, () => {
  console.log('Express server listening on port ' + port);
});*/

(async () => {
  const step = new Step();

  console.log(Reflect.getMetadata('db:columns', step));
  console.log(Reflect.getMetadata('db:id', step));
  console.log(Reflect.getMetadata('db:table', step.constructor));
  console.log(step);

  step.uuid = 'c80c433f-b766-4893-994e-0146ba976ded';

  const pool = new Pool({
    database: 'postgres',
    host: 'localhost',
    password: 'postres',
    port: 32768,
    user: 'postgres',
  });
  const query = new Query(pool);
  await query.save(step);
})().catch((e) => console.error(e.stack));
