import {Request, Response} from 'express'
import db from '../database/connetion'
import convertHourToMinutes from '../utils/convertHoursToMinutes'

interface ScheduleItem {
    week_day: number,
    from: string,
    to: string
}

export default class ClassesController {
    
    async Index (request: Request, response: Response) {
        const filters = request.query

        if (!filters.week_day || !filters.subject || !filters.time){
            return response.status(400).json({ error: 'Missing filters to search classes'})
        }

        const timeInMinutes = convertHourToMinutes(filters.time as string)

        const classes = await db('classes')
            .whereExists(function(){
                this.select('classes_schedule.*')
                    .from('classes_schedule')
                    .whereRaw('`classes_schedule`.`class_id` = `classes`.`id`')
                    .whereRaw('`classes_schedule`.`week_day` = ??', [Number(filters.week_day as string)])
                    .whereRaw('`classes_schedule`.`from` <= ??', [timeInMinutes])
                    .whereRaw('`classes_schedule`.`from` > ??', [timeInMinutes])

            })
            .where('classes.subject', '=', filters.subject as string)
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*', 'users.*'])

        return response.json(classes)
    }

    async Create (request: Request, response: Response) {
        const {name, avatar, whatsapp, bio, subject, cost, schedule} = request.body
    
        const trx = await db.transaction()
        
        try {
            const insertedUsersIds =  await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio,
            })
        
            const user_id = insertedUsersIds[0]
        
            const insertedClassesIds = await trx('classes').insert({
                subject,
                cost,
                user_id
            })
        
            const class_id = insertedClassesIds[0]
        
            const class_schedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to)
                }
            })
        
            await trx('classes_schedule').insert(class_schedule)
        
            await trx.commit()
            
            return response.status(201).send()
        } catch (err) {
            await trx.rollback()
    
            return response.status(400).json({ error: 'Unexpected error while creating new class'})
        }
    }
}