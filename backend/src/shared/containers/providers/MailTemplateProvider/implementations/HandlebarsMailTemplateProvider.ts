import handlebars from 'handlebars';
import fs from 'fs';

import IMailTemplateProvider from '../models/IMailTemplateProvider';
import IMailTemplateDTO from '../dtos/IMailTemplateDTO';

class HandleBarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse({ file, variables }: IMailTemplateDTO): Promise<string> {
    const template = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });
    const templateParsed = handlebars.compile(template);
    return templateParsed(variables);
  }
}

export default HandleBarsMailTemplateProvider;
