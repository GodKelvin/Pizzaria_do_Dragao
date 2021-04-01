const Config = {
    database: {
        user: "hpgbrjyf",
        host: "ziggy.db.elephantsql.com",
        password: "htZAdZcpvMxR8f1D_kpTIf5GsYCxFuDR",
        database: "hpgbrjyf"
    },

    database_for_knex: {
        client: 'pg',
        connection: 'postgres://hpgbrjyf:htZAdZcpvMxR8f1D_kpTIf5GsYCxFuDR@ziggy.db.elephantsql.com:5432/hpgbrjyf'
    },

    token: {
        key_secret: "kelvinlehrbackhenriquebastosbacharelsistemasinformacaodevweb",
        duration: {
            expiresIn: "1d"
        }
    },
}

export default Config;