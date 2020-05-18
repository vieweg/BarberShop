# Recuperação de senha

**RF**

- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperção de senha;
- O usuário deve poder resetar sua senha;

**RNF**

- Utilizar Mailtrap para testar envios em ambiente de DEV;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano(Background job);

**RN**

- O link enviado por email para resetar a senha deve expirar em h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;

# Atualização do perfil

**RF**

- O usuário deve poder atualizar seu nome, email e senha;

**RN**

- O usuário não pode alterar seu email para um email já utilizado;
- Para atualizar sua senha o usuario deve informar sua senha antiga;
- Para atualizar sua senha o usuario deve confirmar a nova senha;

# Agendamento de serviços

**RF**

- O usuário deve poder listar todos os prestadores de serviços cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos 1 horário disponível de um prestador;
- O usuário deve poder listar horarios disponiveis de um dia especifico de um prestador;
- O usuário deve poder realizar um agendamento com um prestador.

**RNF**

- A listagem de prestadores deve ser armazenada em cache;

**RN**

- Cada agendamento deve durar exatamente 1h;
- Os agendamentos devem estar disponiveis entre 8hrs às 18hrs(primeiro as 8hrs e último as 17hrs.);
- O usuário não pode agendar em um horário ja ocupado;
- O Usuário não pode agendar em horário que já passou;
- O Usuario não pode agendar um horário consigo mesmo;

# Painel do prestador

**RF**

- O Usuario deve poder listar seus agendamentos de 1 dia especifico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificaçoes não lidas;

**RNF**

- O agendamento do prestador no dia devem ser armazenados em cache;
- As notificaçoes do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo real utilizando socket.io;

**RN**

- A notificação deve ter um status de lida ou não lida, para que o prestador possa controlar;
