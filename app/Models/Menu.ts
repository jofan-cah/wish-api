import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Menu extends BaseModel {
  @column({ isPrimary: true })
  public id_menu: number

  @column()
  public nama_menu: string

  @column()
  public images: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
