import { Body, Controller, Get, Query } from '@nestjs/common';
import { CadastrosService } from './cadastros.service';

@Controller('cadastros')
export class CadastrosController {
  constructor(private readonly cadastrosService: CadastrosService) {}

  @Get()
  buscarTudo(
    @Query('pagina') pagina?: string,
    @Query('limite') limite?: string,
    @Query('busca') busca?: string,
  ) {
    return this.cadastrosService.buscarTudo(+pagina, +limite, busca);
  }

  @Get()
  buscarLista(
    @Body() body: {
      listaSql: string[]
    }
  ) {
    return this.cadastrosService.buscarLista(body.listaSql);
  }
}
