import { Body, Controller, Get, Query } from '@nestjs/common';
import { CadastrosService } from './cadastros.service';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { ListaSql } from './dto/cadastros.dto';

@Controller('cadastros')
export class CadastrosController {
  constructor(private readonly cadastrosService: CadastrosService) {}

  @Get('buscar-tudo')
  buscarTudo(
    @Query('pagina') pagina?: string,
    @Query('limite') limite?: string,
    @Query('busca') busca?: string,
    @Query('sistema') sistema?: string,
  ) {
    return this.cadastrosService.buscarTudo(+pagina, +limite, busca, sistema);
  }

  @Get('buscar-lista-sql')
  buscarLista(
    @Body() listaSql: ListaSql
  ) {
    console.log(listaSql.sqls)
    return this.cadastrosService.buscarLista(listaSql.sqls);
  }

  @IsPublic()
  @Get('lista-sistemas')
  buscarListaSistemas() {
    return this.cadastrosService.buscaListaSistemas();
  }
}
