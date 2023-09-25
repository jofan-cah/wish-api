import { DateTime } from 'luxon'
import { BaseModel, column ,  hasMany,
  HasMany
} from '@ioc:Adonis/Lucid/Orm'

import User from 'App/Models/User'



export default class Note extends BaseModel {

  @hasMany(() => User)
  public user: HasMany<typeof User>


  @column({ isPrimary: true })
  public id_note: number

  @column()
  public user_id: number 

  @column()
  public title: string

  @column()
  public content: string

  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  
}
