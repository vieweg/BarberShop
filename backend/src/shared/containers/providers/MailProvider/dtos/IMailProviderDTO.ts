import IMailTemplateDTO from '../../MailTemplateProvider/dtos/IMailTemplateDTO';

interface IMailContact {
  name: string;
  email: string;
}

export default interface IMailProviderDTO {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IMailTemplateDTO;
}
