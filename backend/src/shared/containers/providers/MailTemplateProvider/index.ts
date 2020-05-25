import { container } from 'tsyringe';

import IMailTemplateProvider from './models/IMailTemplateProvider';

import HandlesbarMailTemplateProvider from './implementations/HandlebarsMailTemplateProvider';

const providers = {
  handlesbar: HandlesbarMailTemplateProvider,
};

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlesbar,
);
