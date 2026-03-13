# language: pt

Funcionalidade: Cadastro de Usuário

  # ─── Fluxo Principal ─────────────────────────────────────────

  Cenário: Validar aceitação de cadastro com todos os dados obrigatórios preenchidos corretamente
    Dado que estou na página de cadastro
    E que dei consentimento nos checkboxes obrigatórios
    Quando submeto o formulário com todos os campos preenchidos com dados válidos
    Então devo ser redirecionada para a página de confirmação de cadastro

  # ─── Validações de E-mail ────────────────────────────────────

  Cenário: Validar rejeição de cadastro com e-mail já existente na base
    Dado que tenho salvo o e-mail de uma conta já cadastrada
    E que estou na página de cadastro
    E que dei consentimento nos checkboxes obrigatórios
    Quando preencho todos os campos obrigatórios com dados válidos
    E preencho o campo "E-mail" com o e-mail salvo
    E submeto o formulário
    Então devo visualizar a mensagem "Já existe um usuário cadastrado com este endereço de e-mail"

  Cenário: Validar rejeição de cadastro com e-mail em formato inválido
    Dado que estou na página de cadastro
    Quando preencho o campo "E-mail" com um e-mail em formato inválido
    E retiro o foco do campo "E-mail"
    Então devo visualizar uma mensagem informando que o campo "E-mail" está em formato inválido

  Cenário: Validar rejeição de cadastro com domínio de e-mail inexistente
    Dado que estou na página de cadastro
    E que dei consentimento nos checkboxes obrigatórios
    Quando preencho todos os campos obrigatórios com dados válidos
    E preencho os campos "E-mail" e "Confirmar e-mail" com um e-mail com domínio inexistente
    E submeto o formulário
    Então devo visualizar uma mensagem informando que o e-mail informado é inválido

  Cenário: Validar rejeição de cadastro com e-mail de confirmação divergente do e-mail informado
    Dado que estou na página de cadastro
    Quando preencho os campos "E-mail" e "Confirmar e-mail" com valores distintos
    E retiro o foco do campo "Confirmar e-mail"
    Então devo visualizar uma mensagem informando que os e-mails não coincidem

  # ─── Validações de Nome ──────────────────────────────────────

  Cenário: Validar rejeição de cadastro com campo nome esvaziado após interação
    Dado que estou na página de cadastro
    Quando preencho o campo "Nome" com valor válido
    E limpo o campo "Nome"
    Então devo visualizar uma mensagem informando a obrigatoriedade do campo "Nome"

  Cenário: Validar rejeição de cadastro com campo nome preenchido exclusivamente por espaços em branco
    Dado que estou na página de cadastro
    Quando preencho o campo "Nome" com espaços em branco
    E retiro o foco do campo "Nome"
    Então devo visualizar uma mensagem informando a obrigatoriedade do campo "Nome"

  Cenário: Validar rejeição de cadastro com campo nome preenchido com caracteres inválidos
    Dado que estou na página de cadastro
    Quando preencho o campo "Nome" com caracteres inválidos
    E retiro o foco do campo "Nome"
    Então devo visualizar uma mensagem informando que o campo "Nome" contém caracteres inválidos

  # ─── Validações de Sobrenome ─────────────────────────────────

  Cenário: Validar rejeição de cadastro com campo sobrenome esvaziado após interação
    Dado que estou na página de cadastro
    Quando preencho o campo "Sobrenome" com valor válido
    E limpo o campo "Sobrenome"
    Então devo visualizar uma mensagem informando a obrigatoriedade do campo "Sobrenome"

  Cenário: Validar rejeição de cadastro com campo sobrenome preenchido exclusivamente por espaços em branco
    Dado que estou na página de cadastro
    Quando preencho o campo "Sobrenome" com espaços em branco
    E retiro o foco do campo "Sobrenome"
    Então devo visualizar uma mensagem informando a obrigatoriedade do campo "Sobrenome"

  Cenário: Validar rejeição de cadastro com campo sobrenome preenchido com caracteres inválidos
    Dado que estou na página de cadastro
    Quando preencho o campo "Sobrenome" com caracteres inválidos
    E retiro o foco do campo "Sobrenome"
    Então devo visualizar uma mensagem informando que o campo "Sobrenome" contém caracteres inválidos

  # ─── Validações de Senha ─────────────────────────────────────

  Cenário: Validar que o indicador de comprimento permanece não atendido para senha com menos de 8 caracteres
    Dado que estou na página de cadastro
    Quando preencho o campo "Senha" com uma senha com menos de 8 caracteres
    Então o indicador de critério "MIN_LENGTH" deve permanecer não atendido

  Cenário: Validar que o indicador de letra maiúscula permanece não atendido para senha sem letra maiúscula
    Dado que estou na página de cadastro
    Quando preencho o campo "Senha" com uma senha sem letra maiúscula
    Então o indicador de critério "UPPERCASE" deve permanecer não atendido

  Cenário: Validar que o indicador de letra minúscula permanece não atendido para senha sem letra minúscula
    Dado que estou na página de cadastro
    Quando preencho o campo "Senha" com uma senha sem letra minúscula
    Então o indicador de critério "LOWERCASE" deve permanecer não atendido

  Cenário: Validar que o indicador de caractere numérico permanece não atendido para senha sem número
    Dado que estou na página de cadastro
    Quando preencho o campo "Senha" com uma senha sem caractere numérico
    Então o indicador de critério "NUMBER" deve permanecer não atendido

  Cenário: Validar que o indicador de caractere especial permanece não atendido para senha sem caractere especial
    Dado que estou na página de cadastro
    Quando preencho o campo "Senha" com uma senha sem caractere especial
    Então o indicador de critério "SPECIAL_CHAR" deve permanecer não atendido

  Cenário: Validar aceitação de senha com exatamente 8 caracteres atendendo todos os demais critérios
    Dado que estou na página de cadastro
    Quando preencho o campo "Senha" com uma senha de exatamente 8 caracteres atendendo todos os demais critérios
    Então todos os indicadores de critério devem estar marcados como atendidos

  # ─── Termos, Privacidade e Interface ─────────────────────────

  Cenário: Validar acesso ao documento de termos de uso a partir do link no checkbox
    Dado que estou na página de cadastro
    Quando acesso o link de termos de uso presente no checkbox
    Então devo visualizar o documento de termos de uso

  Cenário: Validar acesso ao documento de política de privacidade a partir do link no checkbox
    Dado que estou na página de cadastro
    Quando acesso o link de política de privacidade presente no checkbox
    Então devo visualizar o documento de política de privacidade

  Esquema do Cenário: Validar alternância de visibilidade dos campos de senha no cadastro
    Dado que estou na página de cadastro
    E preencho o campo "<campo>" com uma senha válida
    Quando aciono o botão de visualizar senha do campo "<campo>"
    Então o conteúdo do campo "<campo>" deve estar visível
    E o ícone do botão deve refletir o estado de senha visível
    Quando aciono novamente o botão de visualizar senha do campo "<campo>"
    Então o conteúdo do campo "<campo>" deve estar oculto
    E o ícone do botão deve refletir o estado de senha oculta

    Exemplos:
      | campo           |
      | Senha           |
      | Confirmar senha |

  Cenário: Validar que o botão de cadastro permanece desabilitado com o checkbox de aceite dos termos de uso e política de privacidade desmarcado
    Dado que estou na página de cadastro
    E que dei consentimento nos checkboxes obrigatórios
    Quando preencho todos os campos obrigatórios com dados válidos
    E desmarco o checkbox de aceite dos termos de uso e política de privacidade
    Então devo visualizar uma mensagem informando que o consentimento é obrigatório
    E o botão de cadastro deve permanecer desabilitado

  Cenário: Validar que o botão de cadastro permanece desabilitado com o checkbox de confirmação de idade mínima de 18 anos desmarcado
    Dado que estou na página de cadastro
    E que dei consentimento nos checkboxes obrigatórios
    Quando preencho todos os campos obrigatórios com dados válidos
    E desmarco o checkbox de confirmação de idade mínima de 18 anos
    Então devo visualizar uma mensagem informando que é obrigatório ter 18 anos ou mais
    E o botão de cadastro deve permanecer desabilitado