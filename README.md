<h2>Gerenciador de Patrimônios</h2>

<p>25/05/2024</p>

Esta é uma aplicação para o gerenciamento dos patrimônios da empresa Senai Shunji Nishimura. Nesta aplicação é possível a visualização dos patrimônios, o cadastro destes, o escaneamento com a câmera, a atualização, a importação por um arquivo XLSX, a exportação para este mesmo tipo de arquivo e também a impressão dos códigos QR, atribuídos a cada patrimônio, além do  gerenciamento dos registros dos usuários.

Esta aplicação foi feita com Node JS, Express e EJS. Usando um banco de dados MySQL. O banco de dados armazena informações sobre patrimônios com a finalidade de possuir uma maior organização sobre os mesmos. Esta aplicação também possui um cache local.

Nesta aplicação podemos cadastrar, atualizar, escanear, importar, exportar, imprimir e deletar os patrimônios do banco de dados.

Para acessar esta aplicação é necessário um e-mail e uma senha válida. Para isso o usuário pode efetuar a validação de seu e-mail e senha ou então ele pode efetuar o registro de seu e-mail.

Para o registro de um usuário é necessário o nome, o e-mail e uma senha. Efetuando o registro, estes dados serão enviados para o banco de dados. A senha possui criptografia hash. Portanto, o administrador da aplicação não consegue visualizar a senha de um usuário.

Para o cadastro de um patrimônio é necessário alguns dados deste. Estes serão: "Número de inventário", "Instituição", "Tag", "Descrição", "Data de incorporação", "Marca", "Série", "Valor", "Sala", "Local", "Ativo" e "Observação". Depois de preencher os dados e apertando no botão cadastrar, será criado um código QR com as informações: "Número de inventário" e "Descrição". Após isso, os dados do patrimônio serão enviados para o banco.

Na tela de listagem dos patrimônios, os patrimônios cadastrados anteriormente podem ser vistos em uma tabela. Nesta tabela é possível visualizar algumas informações dos patrimônios do banco de dados. Esta tabela também possui um botão de atualização de cada patrimônio.

Na tela de atualização do patrimônio é possível atualizar informações como: "Instituição", "Tag", "Descrição", "Data de incorporação", "Marca", "Série", "Valor", "Sala", "Local", "Ativo" e "Observação". Porém não é possível que se atualize o "Numero de inventário", pois este é o principal identificador.

O escaneamento dos patrimônios acontece através de um código QR que é referente a cada patrimônio cadastrado no banco de dados. Para o escaneamento de um patrimônio é necessário que o dispositivo utilizado possua uma camêra. Após isso é necessário apontar a câmera para o código QR. Então o usuário será redirecionado para a tela de atualização do patrimônio escaneado.

Para a importação de uma lista de patrimônios é necessário um arquivo XLSX, tipo este usado pelo excel. Os arquivos que serão importados não podem passar do tamanho limite que, por padrão, é 150 KB. Estes arquivos precisam seguir um padrão. Neste padrão o cabeçalho possuí: "NI", "INSTITUIÇÃO", "TAG", "DESCRIÇÃO", "INCORPORAÇÃO", "MARCA", "SERIE", "VALOR", "SALA", "LOCAL", "ATIVO/BAIXA" e "OBS". "NI", é o número de inventário, principal identificador. "INSTITUIÇÃO", é a instituição do patrimônio. "TAG", é a tag do patrimônio, a identificação do patrimônio pela empresa que o produziu. "DESCRIÇÃO", é o nome do patrimônio. "INCORPORAÇÃO", é a data de incorporação, cada linha deve conter a formatação padrão de data no arquivo XLSX, por exemplo o texto "25/05/2024" com a formatação "Data" ou com a formatação de texto, que segue o padrão "dia/mês/ano". "MARCA", é a marca do patrimônio. "SERIE", é a série do patrimônio. "VALOR", é o preço do patrimônio. "SALA", é a sala em está o patrimônio. "LOCAL", é o local do patrimônio. "ATIVO/BAIXA", é o campo que identifica se o patrimônio está ativo. "OBS", é alguma observação sobre o patrimônio. 

Exemplo de cabeçalho do arquivo de importação:

<table style="display: flex; justify-content: center;"><thead><tr><th><p>NI</p></th><th><p>INSTITUIÇÃO</p></th><th><p>TAG</p></th><th><p>DESCRIÇÃO</p></th><th><p>INCORPORAÇÃO</p></th><th><p>MARCA</p></th><th><p>SERIE</p></th><th><p>VALOR</p></th><th><p>SALA</p></th><th><p>LOCAL</p></th><th><p>ATIVO/BAIXA</p></th><th><p>OBS</p></th></tr></thead></table> 

Na exportação de patrimônios o usuário especifica os patrimônios a serem exportados. Apertando o botão exportar é criado um arquivo XLSX. Neste XLSX a tabela possuirá um padrão igual ao da tabela de importação. A tabela possuirá todos os patrimônios que foram especificados anteriormente. Após isso o arquivo XLSX será baixado automaticamente pelo navegador.

Na parte de impressão de patrimônios é gerada uma lista. Para a criação desta lista é necessário que o usuário coloque suas especificações na lista e aperte o botão de impressão. Após isso é gerado um arquivo PDF com todos os códigos QR especificados anteriormente.

Na tela de registro é possível cadastrar um novo usuário ou então editar os usuários criados anteriormente. Na edição de um usuário é possível editar o nome, o e-mail e a senha. Para a edição dos usuários é necessário que o usuário especifique a senha corrente deste usuário.

O cache desta aplicação é feito em javaScript. Ele armazena tokens de usuários que utilizam determinada rota da aplicação. Os tokens são armazenados para controlar requisições que podem ser vulneráveis a possíveis ataques de hackers. O cache não armazena informações como nome do usuário, email, ou senha deste. O cache é limpo, por padrão, a cada 15 minutos.

Autor: Mateus dos Santos Pereira.

GITHUB: <a href="https://github.com/mateussantospereira" target="_blank" rel="external">https://github.com/mateussantospereira</a>

<br>

<h2>Bibliotecas</h2>

- express - A primeira biblioteca usada foi o express. O express foi usado com finalidade de criar uma aplicação em node js. <a href="https://www.npmjs.com/package/express" target="_blank" rel="external">https://www.npmjs.com/package/express</a>.

- express-session - A biblioteca express-session foi usada com a finalidade de criar uma sessão para os usuário autenticados e bloqueando, portanto, os usuários não autenticados. <a href="https://www.npmjs.com/package/express-session" target="_blank" rel="external">https://www.npmjs.com/package/express-session</a>.

- cors - A biblioteca cors foi usada para restringir o acesso de servidores à esta aplicação e bloquear, portanto, os servidores não permitidos. <a href="https://www.npmjs.com/package/cors" target="_blank" rel="external">https://www.npmjs.com/package/cors</a>.

- dotenv - A biblioteca dotenv foi usada para que o servidor que hospeda a aplicação possa configurar as variáveis de ambiente. <a href="https://www.npmjs.com/package/dotenv" target="_blank" rel="external">https://www.npmjs.com/package/dotenv</a>.

- node-schedule - Esta biblioteca foi usada para configurar o período da de limpeza do Cache local desta aplicação. <a href="https://www.npmjs.com/package/node-schedule" target="_blank" rel="external">https://www.npmjs.com/package/node-schedule</a>.

- mysql - A biblioteca mysql foi usada para conectar a aplicação em node js com o banco de dados MySQL. Possibilitando assim que a aplicação execute comandos SQL no local do banco de dados MySQL. <a href="https://www.npmjs.com/package/mysql" target="_blank" rel="external">https://www.npmjs.com/package/mysql</a>

- jsonwebtoken - Esta biblioteca foi usada para gerar tokens de sessão para os usuários autenticados da aplicação. <a href="https://www.npmjs.com/package/jsonwebtoken" target="_blank" rel="external">https://www.npmjs.com/package/jsonwebtoken</a>.

- bcryptjs - Esta biblioteca foi usada para criptografar a senha com a função criptográfica hash e enviar assim a senha com criptografia para o banco de dados MySQL. <a href="https://www.npmjs.com/package/bcryptjs" target="_blank" rel="external">https://www.npmjs.com/package/bcryptjs</a>.

- qrcode - A biblioteca qrcode foi usada com a finalidade de criar um código QR para cada patrimônio cadastrado nesta aplicação. <a href="https://www.npmjs.com/package/qrcode" target="_blank" rel="external">https://www.npmjs.com/package/qrcode</a>.

- xlsx - A biblioteca xlsx foi usada para ler e escrever dados em arquivos XLSX. Esta biblioteca foi usada para a importação e a exportação de patrimônios por meio de arquivos XLSX. <a href="https://www.npmjs.com/package/xlsx" target="_blank" rel="external">https://www.npmjs.com/package/xlsx</a>.

- html-pdf - Esta biblioteca foi usada para a criação de arquivos PDF por meio de códigos HTML. Esta biblioteca foi usada especificamente na impressão dos códigos QR de patrimônios. <a href="https://www.npmjs.com/package/html-pdf" target="_blank" rel="external">https://www.npmjs.com/package/html-pdf</a>

- ejs - A biblioteca ejs foi usada para utilizar a view engine ejs. Esta linguagem foi utilizada no front-end da aplicação, tanto para a componentização deste, quanto para o envio de variáveis da própria API. <a href="https://www.npmjs.com/package/ejs" target="_blank" rel="external">https://www.npmjs.com/package/ejs</a>.

- instascan - Esta biblioteca foi utilizada para o controle do escaneamento dos patrimônios por meio dos códigos QR. Esta identifica o código QR e faz a leitura deste, redirecionando o usuário para a tela de atualização patrimônio. <a href="https://rawgit.com/schmich/instascan-builds/master/instascan.min.js" target="_blank" rel="external">https://rawgit.com/schmich/instascan-builds/master/instascan.min.js</a>.

- googleapis - Esta foi uma biblioteca usada para mudar a fonte da interface gráfica para a fonte roboto do google. <a href="https://fonts.googleapis.com" target="_blank" rel="external">https://fonts.googleapis.com</a>.
