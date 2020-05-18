import IMailTemplateDTO from '../dtos/IMailTemplateDTO';

export default interface ImailTemplateProvider {
  parse(data: IMailTemplateDTO): Promise<string>;
}
