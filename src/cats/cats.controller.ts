import { Controller, Get, Post, Req, Param, Body, Inject} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Request } from 'express';
import { CreateCatDto } from './dot/create-cat.dto';
import { ApiTags,ApiBearerAuth, ApiQuery, ApiResponse, ApiOperation,ApiParam } from '@nestjs/swagger';


/* cats.controller.ts */
@Controller('cats')
@ApiTags('Cats Api')
export class CatsController {
  constructor(private readonly catService: CatsService,
  ) {}

  @Get('/')
  getAllCats(@Req() request: Request): object {
    const cats = this.catService.getAllCats()
    return cats;
  }

  @Get(':id')
  FindOne(@Param() params):string {
    console.log('params.id', params.id)
    return `find ${params.id} cat`
  }

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return this.catService.create(createCatDto)
  }
}