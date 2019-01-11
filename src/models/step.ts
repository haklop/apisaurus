import { Column, ColumnType } from '../entities/column';
import { Id } from '../entities/id';
import { Table } from '../entities/table';

@Table('steps')
export class Step {

  @Id()
  @Column()
  public uuid: string;

  @Column('title', ColumnType.number)
  public name: string;

  @Column()
  public start: number;

  @Column('end_date')
  public end: number;

  @Column(ColumnType.text)
  public receivedDate: number;
}
