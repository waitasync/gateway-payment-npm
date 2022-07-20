# gateway-payment-npm

Componente Gerenciador de Pagamentos

# Mapa

    - gateway
        - setCredentials
        - creditPay
        - creditRefund
        - debitPay
        - debitRefund

# import lib

        import {
            creditPay,
            creditRefund,
            setCredentials,
            setCredentialsProps
        } from '@waitasync/wa-gateway-payment-npm';

# setCredentialsProps

    - Propriedades para payload da configuracao das credenciais

# setCredentials

    export interface TCreditPayReq {
        nameConnection: string;
        merchantOrderId: String;
        customer: TCustomer;
        payment: TPayment;
    }

    - nome da conexao que sera passada para localizar as credenciais
    nameConnection: string;

    - Para configurar as credenciais
    setCredentials(data: setCredentialsProps)

# creditPay

    - Para efetuar um pagamento de cartao de credito

# creditRefund

    - Para efetuar um estorno de um cartao de credito

# Tradução de campos

    {
        merchantOrderId: "Numero de identificação do Pedido.",
        customer: {
            Name: "Nome do Comprador",
            Email: "Email do Comprador",
            Birthdate: "Data de nascimento do Comprador",
            Address: {
                Street: "Endereço.",
                Number: "Número do endereço",
                Complement: "Complemento do endereço",
                ZipCode: "Código postal do endereço",
                City: "Cidade do endereço",
                State: "Estado do endereço",
                Country: "País do endereço de cobrança",
                Neighborhood: "Bairro do endereço"
            },
            DeliveryAddress: {
                Street: "Endereço.",
                Number: "Número do endereço",
                Complement: "Complemento do endereço",
                ZipCode: "Código postal do endereço",
                City: "Cidade do endereço",
                State: "Estado do endereço",
                Country: "País do endereço de cobrança",
                Neighborhood: "Bairro do endereço"
            },
            Billing: {
                Street: "Endereço.",
                Number: "Número do endereço",
                Complement: "Complemento do endereço",
                ZipCode: "Código postal do endereço",
                City: "Cidade do endereço",
                State: "Estado do endereço",
                Country: "País do endereço de cobrança",
                Neighborhood: "Bairro do endereço"
            }
        },
        payment: {
            Currency: "Moeda na qual o pagamento será feito (BRL). Enum = EnumCurrency.BRL",
            Country: "Pais na qual o pagamento será feito. Enum = EnumCountry.BRL",
            ServiceTaxAmount: "Aplicável apenas para empresas aéreas. Montante do valor da autorização que deve ser destinado à taxa de serviço. Obs.: Esse valor não é adicionado ao valor da autorização.",
            Installments: "Número de Parcelas",
            Interest: "Tipo de parcelamento - Loja (ByMerchant) ou Cartão (ByIssuer).",
            Capture: "Booleano que identifica que a autorização deve ser com captura automática (true) ou captura posterior (false).",
            Authenticate: "Define se o comprador será direcionado ao Banco emissor para autenticação do cartão",
            Recurrent: "Indica se a transação é do tipo recorrente (“true”) ou não (“false”). O valor “true” não originará uma nova recorrência, apenas permitirá a realização de uma transação sem a necessidade de envio do CVV. Authenticate deve ser “false” quando Recurrent é “true”.",
            SoftDescriptor: "O complemento do nome da loja que aparecerá na fatura do cartão. Não permite caracteres especiais.",
            CreditCard: {
                CardNumber: "Número do Cartão do Comprador.",
                Holder: "Nome do Comprador impresso no cartão. Não aceita caracteres especiais ou acentuação.",
                ExpirationDate: "Data de validade impressa no cartão. Ex. MM/AAAA.",
                SecurityCode: "Código de segurança impresso no verso do cartão.",
                SaveCard: "Booleano que identifica se o cartão será salvo para gerar o CardToken.",
                Brand: "Bandeira do cartão. Valores possíveis: Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover / Hipercard / Hiper. Enum = EnumBrand.Visa",

                CardOnFile: {
                    Usage: "First se o cartão foi armazenado e é seu primeiro uso. Used se o cartão foi armazenado e ele já foi utilizado anteriormente em outra transação,

                    Reason: "Indica o propósito de armazenamento de cartões, caso o campo “Usage” for “Used”. Recurring - Compra recorrente programada (ex. assinaturas) Unscheduled - Compra recorrente sem agendamento (ex. aplicativos de serviços) Installments - Parcelamento através da recorrência.
                }
            },
            IsCryptoCurrencyNegotiation: "Deve ser enviado com valor “true” caso se trate de uma transação de compra ou venda de Criptomoeda",
            Type: EnumTypeTransaction.CreditCard,
            Amount: "Valor do Pedido (ser enviado em centavos).",
            AirlineData: {
                TicketNumber: "Informar o número do principal bilhete aéreo da transação."
            }
        }
    }

# descrição dos campos

## MerchantId

    Tipo: Guid
    Tamanho: 36
    Obrigatório: Sim
    Descrição: Identificador da loja na Cielo.

## MerchantKey

    Texto
    40
    Sim
    Chave Publica para Autenticação Dupla na Cielo.

## Content-Type Header

    40
    Sim
    application/json (obrigatório o envio deste).

## RequestId

    Guid
    36
    Não	Identificador do Request, utilizado quando o lojista usa diferentes servidores para cada GET/POST/PUT.

## MerchantOrderId

    Texto
    50
    Sim
    Numero de identificação do Pedido.

## Customer.Name

    Texto
    255
    Não	Nome do Comprador.

## Customer.Status

    Texto	255
    Não	Status de cadastro do comprador na loja (NEW / EXISTING)

## Customer.Identity

    Texto
    14
    Não	Número do RG, CPF ou CNPJ do Cliente.

## Customer.IdentityType

    Texto
    255
    Não	Tipo de documento de identificação do comprador (CFP/CNPJ).

## Customer.Email

    Texto
    255
    Não	Email do Comprador.

## Customer.Birthdate

    Date
    10
    Não	Data de nascimento do Comprador.

## Customer.Address.Street

    Texto
    255
    Não	Endereço do Comprador.

## Customer.Address.Number

    Texto
    15
    Não
    Número do endereço do Comprador.

## Customer.Address.Complement

    Texto
    50
    Não	Complemento do endereço do Comprador.br

## Customer.Address.ZipCode

    Texto
    9
    Não	CEP do endereço do Comprador.

## Customer.Address.City

    Texto
    50
    Não	Cidade do endereço do Comprador.

## Customer.Address.State

    Texto
    2
    Não	Estado do endereço do Comprador.

## Customer.Address.Country

    Texto
    35
    Não	Pais do endereço do Comprador.

## Customer.DeliveryAddress.Street

    Texto
    255
    Não	Endereço do Comprador.

## Customer.Address.Number

    Texto
    15
    Não	Número do endereço do Comprador.

## Customer.DeliveryAddress.Complement

    Texto
    50
    Não	Complemento do endereço do Comprador.

## Customer.DeliveryAddress.ZipCode

    Texto
    9
    Não	CEP do endereço do Comprador.

## Customer.DeliveryAddress.City

    Texto
    50
    Não	Cidade do endereço do Comprador.

## Customer.DeliveryAddress.State

    Texto
    2
    Não Estado do endereço do Comprador.

## Customer.DeliveryAddress.Country

    Texto
    35
    Não
    País do endereço do Comprador.

## Payment.Type

    Texto
    100
    Sim
    Tipo do Meio de Pagamento.

## Payment.Amount

    Número
    15
    Sim
    Valor do Pedido (ser enviado em centavos).

## Payment.Currency

    Texto
    3
    Não Moeda na qual o pagamento será feito (BRL).

## Payment.Country

    Texto
    3
    Não Pais na qual o pagamento será feito.

## Payment.Provider

    Texto
    15
    —
    Define comportamento do meio de pagamento (ver Anexo)/NÃO OBRIGATÓRIO ## PARA CRÉDITO.

## Payment.ServiceTaxAmount

    Número
    15
    Não Aplicável apenas para empresas aéreas. Montante do valor da ## autorização que deve ser destinado à taxa de serviço. Obs.: Esse valor não é adicionado ao valor da ## autorização.

## Payment.SoftDescriptor

    Texto
    13
    Não
    O complemento do nome da loja que aparecerá na fatura do ## cartão. Não permite caracteres especiais.

## Payment.Installments

    Número
    2
    Sim
    Número de Parcelas.

## Payment.Interest

    Texto
    10
    Não
    Tipo de parcelamento - Loja (ByMerchant) ou Cartão (ByIssuer).

## Payment.Capture

    Booleano
    —
    Não (Default false) Booleano que identifica que a autorização deve ser com captura automática.

## Payment.Authenticate Booleano

    —
    Não (Default false)
    Define se o comprador será direcionado ao Banco emissor para autenticação do cartão

## Payment.Recurrent Booleano

    -
    Não Indica se a transação é do tipo recorrente (“true”) ou não (“false”). O valor “true” não originará uma nova recorrência, apenas permitirá a realização de uma transação sem a necessidade de envio do CVV. Authenticate deve ser “false” quando Recurrent é “true”.

## Payment.IsCryptocurrencyNegotiation

    Booleano
    -
    Não (default false)
    Deve ser enviado com valor “true” caso se trate de uma transação de compra ou venda de Criptomoeda

## Payment.AirlineData.TicketNumber

    alfanumérico
    13
    Não Informar o número do principal bilhete aéreo da transação.

## CreditCard.CardNumber

    Texto
    19
    Sim
    Número do Cartão do Comprador.

## CreditCard.Holder

    Texto
    25
    Não
    Nome do Comprador impresso no cartão. Não aceita caracteres especiais ou acentuação.

## CreditCard.ExpirationDate

    Texto
    7
    Sim
    Data de validade impressa no cartão. Ex. MM/AAAA.

## CreditCard.SecurityCode

    Texto
    4
    Não Código de segurança impresso no verso do cartão.

## CreditCard.SaveCard

    Booleano
    —
    Não (Default false)
    Booleano que identifica se o cartão será salvo para gerar o CardToken.

## CreditCard.Brand

    Texto
    10
    Sim
    Bandeira do cartão. Valores possíveis: Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover / Hipercard / Hiper.

## CreditCard.CardOnFile.Usage

    Texto
    -
    Não
    First se o cartão foi armazenado e é seu primeiro uso. Used se o cartão foi armazenado e ele já foi utilizado anteriormente em outra transação

## CreditCard.CardOnFile.Reason

    Texto
    -
    Condicional Indica o propósito de armazenamento de cartões, caso o campo “Usage” for “Used”. Recurring - Compra recorrente programada (ex. assinaturas),
    * Unscheduled - Compra recorrente sem agendamento (ex. aplicativos de serviços)
    * Installments - Parcelamento através da recorrência.

## TCard

    export type TCard = {
        CustomerName: String;
        CardNumber: String;
        Holder: String;
        ExpirationDate: String;
        Brand: EnumBrand;
    };

# TIPOS

# TPaymentConfigProps

    export type TPaymentConfigProps = {
        name: String;
        type: TTypeConnectionEnum;
        urlTransaction?: String;
        urlQuery?: String;
        id?: String;
        key?: String;
    };

# ENUMS

# EnumBrand

    export enum EnumBrand {
        Visa = "Visa",
        Master = "Master",
        Amex = "Amex",
        Elo = "Elo",
        Aura = "Aura",
        JCB = "JCB",
        Diners = "Diners",
        Discover = "Discover",
        Hipercard = "Hipercard",
        Hiper = "Hiper",
    }

# EnumCountry

    export enum EnumCountry {
        BRL = "BRL",
    }

# EnumCurrency

    export enum EnumCurrency {
        BRL = "BRL",
    }

# EnumTypeTransaction

    export enum EnumTypeTransaction {
        CreditCard = "CreditCard",
        DebitCard = "DebitCard",
    }
