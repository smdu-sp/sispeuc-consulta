import { Global, Injectable } from '@nestjs/common';

@Global()
@Injectable()
export class AppService {
  verificaPagina(pagina: number, limite: number) {
    if (!pagina) pagina = 1;
    if (!limite) limite = 10;
    if (pagina < 1) pagina = 1;
    if (limite < 1) limite = 10;
    return [pagina, limite];
  }

  verificaLimite(pagina: number, limite: number, total: number) {
    if ((pagina - 1) * limite >= total) pagina = Math.ceil(total / limite);
    return [pagina, limite];
  }

  formatarSql(value: string): string {
    //111.111.1111-1
    if (!value) return value;
    const onlyNumbers = value && value.toString().replace(/\D/g, '').substring(0, 11);
    if (onlyNumbers.length <= 3)
        return onlyNumbers.replace(/(\d{0,3})/, '$1');
    if (onlyNumbers.length <= 6)
        return onlyNumbers.replace(/(\d{0,3})(\d{0,3})/, '$1.$2');
    if (onlyNumbers.length <= 10)
        return onlyNumbers.replace(/(\d{0,3})(\d{0,3})(\d{0,4})/, '$1.$2.$3');
    return onlyNumbers.replace(/(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,1})/, '$1.$2.$3-$4');
  }

  formatarSqlCondominio(value: string): string {
    //1111111111-1
    if (!value) return value;
    const onlyNumbers = value && value.toString().replace(/\D/g, '').substring(0, 11);
    if (onlyNumbers.length <= 10)
        return onlyNumbers.replace(/(\d{0,10})/, '$1');
    return onlyNumbers.replace(/(\d{0,10})(\d{0,1})/, '$1-$2');
  }
}
