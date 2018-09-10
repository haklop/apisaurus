import { Column, ColumnType } from "../entities/column";

export class Step {

  @Column()
  uuid: string;

  @Column('title', ColumnType.number)
  name: string;

  @Column()
  start: number;

  @Column('end_date')
  end: number;

  @Column(ColumnType.number)
  receivedDate: number;
}
