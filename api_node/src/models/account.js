module.exports = (sequelize, DataTypes) => {

    const Account = sequelize.define('Account', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        jwtVersion: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    })//criando tabela,nao e preciso o id pois o sequelize cria id autoincrement automatico


    Account.associate = (models) => {
        Account.hasMany(models.Link, {foreignKey: 'accountId'})
    }//coluna accountId é chave estrangeira em Links


    Account.prototype.toJSON = function(){
        const values = { ...this.get() }
        delete values.password
        return values
    }//nao retorna mais a senha a senha no json

    return Account
}