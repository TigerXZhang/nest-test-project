import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsService {
    constructor(@InjectRepository(Cat) private readonly cat: Repository<Cat>) { }
    // 新增
    create(createCatDto: CreateCatDto) {
        const data = new Cat()
        data.name = createCatDto.name
        data.age = createCatDto.age
        return this.cat.save(data)
    }
      
    // 列表，查询，分页
    async getAllCats(query: { keyWord: string, page: number, pageSize: number }) {
        const data = await this.cat.find({
            where: {
                name: Like(`%${query.keyWord}%`)
            },
            order: {
                create_time: "DESC"
            },
            skip: (query.page - 1)* query.pageSize,
            take:query.pageSize,
        })
        const total = await this.cat.count({
            where: {
                name: Like(`%${query.keyWord}%`)
            },
        })
        return {
            data,
            total
        }
    }

    // 删除
    remove(id: string) {
        return this.cat.delete(id)
    }

    // 详情
    getCats(id: string) {
        // findOneBy
        return this.cat.findBy({id})
    }
    // 更新
    update(id: string, createCatDto: CreateCatDto) {
        return this.cat.update(id, createCatDto)
    }
}