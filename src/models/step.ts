import { Column, ColumnType } from '../annotations/column';
import { Id } from '../annotations/id';
import { Table } from '../annotations/table';

@Table('steps')
export class Step {

  @Id()
  @Column()
  public uuid: string;

  @Column('title')
  public name: string;

  @Column()
  public start: number;

  @Column('end_date')
  public end: number;

  @Column()
  public receivedDate: number;

}
