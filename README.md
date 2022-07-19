# gateway-payment-npm

Componente Gerenciador de Pagamentos

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

    - Para configurar as credenciais
    setCredentials(data: setCredentialsProps)

# creditPay

    - Para efetuar um pagamento de cartao de credito

# creditRefund

    - Para efetuar um estorno de um cartao de credito
