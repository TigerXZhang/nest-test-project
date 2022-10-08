import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { Response } from 'express'
import { zip } from 'compressing'
import { ApiTags,ApiBearerAuth, ApiQuery, ApiResponse, ApiOperation,ApiParam } from '@nestjs/swagger';

@Controller('upload')
@ApiTags('Upload Api')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  // 上传图片
  @Post('album')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file){
    console.log('file', file)
    return 'upload success'
  }

  // 下载图片
  @Get('export')
  download(@Res() res:Response){
    const url = join(__dirname, '../images/1664846250885.png')
    res.download(url)
  }

  @Get('stream')
  async downloadSteam(@Res() res:Response) {  
    const url = join(__dirname, '../images/1664846250885.png')
    const tarSteam = new zip.Stream()
    await tarSteam.addEntry(url)
    res.setHeader('Content-Type','aplication/octet-stream')
    res.setHeader('Content-Disposition','attachment;filename=tiger')
    tarSteam.pipe(res)
  }


  @Post()
  create(@Body() createUploadDto: CreateUploadDto) {
    return this.uploadService.create(createUploadDto);
  }

  @Get()
  findAll() {
    return this.uploadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uploadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUploadDto: UpdateUploadDto) {
    return this.uploadService.update(+id, updateUploadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadService.remove(+id);
  }
}
