import { Controller, Get, Post, Req, Param, Body, Query,Delete, Patch} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Request } from 'express';
import { CreateCatDto } from './dto/create-cat.dto';
import { ApiTags,ApiBearerAuth, ApiQuery, ApiResponse, ApiOperation,ApiParam } from '@nestjs/swagger';


/* cats.controller.ts */
@Controller({
  path: 'cats',
  version: '1'
})
@ApiTags('Cats Api')

export class CatsController {
  constructor(private readonly catsService: CatsService,
  ) {}

  @Get('/')
  getAllCats(@Query() query:{keyWord:string,page:number,pageSize:number}) {
    const cats = this.catsService.getAllCats(query)
    return cats;
  }

  @Get(':id')
  FindOne(@Param('id') id: string) {
    return this.catsService.getCats(id);
  }

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catsService.remove(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() createCatDto: CreateCatDto) {
    return this.catsService.update(id, createCatDto);
  }

}