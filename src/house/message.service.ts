import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageEntity } from '../entities/message.entity';
import { ManagerEntity } from '../entities/manager.entity';

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(MessageEntity) private readonly messageEntity: Repository<MessageEntity>,
        @InjectRepository(ManagerEntity) private readonly managerEntity: Repository<ManagerEntity>
    ) { }

    async getManager(consumer_id: number): Promise<ManagerEntity[]> {
        let manager_id: number[] = (await this.messageEntity.find({ consumer_id: consumer_id })).map(value => value.manager_id);
        let res: ManagerEntity[] = [];
        for (const num of manager_id) {
            res.push(await this.managerEntity.findOne({ manager_id: num }));
        }
        // this.messageEntity.delete({})
        return res;
    }

    async getMessage(consumer_id: number, manager_id: number): Promise<MessageEntity[]> {
        let res = await this.messageEntity.find({ consumer_id, manager_id });
        console.log(res);
        return res;
    }

    async addMessage(consumer_id: number, manager_id: number, message_content: string, message_date: Date): Promise<MessageEntity> {
        let newMessage = new MessageEntity();
        newMessage.message_id = Date.now() % 1000;
        newMessage.consumer_id = consumer_id;
        newMessage.manager_id = manager_id;
        newMessage.message_content = message_content;
        newMessage.message_date = new Date();
        return newMessage.save();
    }
}