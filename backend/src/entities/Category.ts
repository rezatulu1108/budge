import { CategoryModel } from '../schemas/category'
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, ManyToOne, OneToMany, Index } from 'typeorm'
import { CategoryGroup } from './CategoryGroup'
import { CategoryMonth } from './CategoryMonth'
import { Transaction } from './Transaction'
import { Budget } from '.'

@Entity('categories')
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'string', nullable: false })
  @Index()
  budgetId: string

  @Column({ type: 'string', nullable: false })
  categoryGroupId: string

  @Column()
  name: string

  @CreateDateColumn()
  created: Date

  @CreateDateColumn()
  updated: Date

  /**
   * Belongs to a budget
   */
  @ManyToOne(() => Budget, budget => budget.categories)
  budget: Budget

  /**
   * Belongs to a category group
   */
  @ManyToOne(() => CategoryGroup, categoryGroup => categoryGroup.categories)
  categoryGroup: CategoryGroup

  /**
   * Has many months
   */
  @OneToMany(() => CategoryMonth, categoryMonth => categoryMonth.category)
  categoryMonths: CategoryMonth[]

  /**
   * Has many transactions
   */
  @OneToMany(() => Transaction, transaction => transaction.category)
  transactions: Transaction[]

  public async sanitize(): Promise<CategoryModel> {
    return {
      id: this.id,
      categoryGroupId: this.categoryGroupId,
      name: this.name,
      created: this.created.toISOString(),
      updated: this.updated.toISOString(),
    }
  }
}