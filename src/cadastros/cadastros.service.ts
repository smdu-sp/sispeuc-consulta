import { BadRequestException, Injectable } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { BiService } from 'src/prisma/bi.service';

@Injectable()
export class CadastrosService {
  constructor(
    private bi: BiService,
    private app: AppService
  ) {}
  async buscarTudo(
    pagina: number = 1,
    limite: number = 10,
    busca?: string
  ) {
    [pagina, limite] = this.app.verificaPagina(pagina, limite);
    const searchParams = {
      ...(busca && busca !== "" &&
        { OR: [
            { sql_incra: { contains: this.app.formatarSql(busca)}},
        ] }),
    };
    const total = await this.bi.cadastros.count({ where: searchParams });
    if (total == 0) return { total: 0, pagina: 0, limite: 0, users: [] };
    [pagina, limite] = this.app.verificaLimite(pagina, limite, total);
    const cadastros = await this.bi.cadastros.findMany({
      where: searchParams,
      orderBy: {
        assunto: {
          dtInclusaoAssunto: 'desc'
        }
      },
      include: { 
        assunto: true,
        endereco: true
      },
      skip: (pagina - 1) * limite,
      take: limite,
    });
    return {
      total: +total,
      pagina: +pagina,
      limite: +limite,
      data: cadastros
    };
  }

  async buscarLista(
    listaSql: string[]
  ) {
    if (listaSql.length >= 0)
      throw new BadRequestException('Lista de SQL vazia.');
    const resposta = [];
    for (const sql of listaSql) {
      const cadastro = await this.bi.cadastros.findMany({
        where: {
          sql_incra: this.app.formatarSql(sql)
        },
        orderBy: {
          assunto: {
            dtInclusaoAssunto: 'desc'
          }
        },
        include: { 
          assunto: true,
          endereco: true
        },
      });
      resposta.push({
        sql,
        dadosEncontrados: cadastro || []
      });
    }
  }
}