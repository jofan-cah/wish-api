import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Wish extends BaseModel {
  @column({ isPrimary: true })
  public id_wish: number


  @column()
  public no_hp : string

  @column()
  public berat_badan :number

  @column()
  public kolesterol:number

  @column()
  public suhu_tubuh:number
  @column()
  public bmi:number
  @column()
  public detak_jantung:number
  @column()
  public gula_darah:number
  @column()
  public asam_urat:number
  @column()
  public hemoglobin:number
  @column()
  public oksigen_darah:number
  @column()
  public tekanan_darah:number
  @column()
  public status:string

  @column.date({autoCreate:true})
  public tgl:DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
