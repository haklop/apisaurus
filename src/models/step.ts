import { Column, ColumnType } from '../entities/column';

export class Step {

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
