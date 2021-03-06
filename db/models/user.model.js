const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  //Y asi por cada uno...
  user: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  avatar: {
    defaultValue: 'http://gabs.img/image/bruh',
    type: DataTypes.STRING
  },
  role: {
    alowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'Usuario del foro'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }

}

//Extiende este modelo -> POO
class User extends Model {
  //Metodos estáticos
  static associate(models){
    this.hasMany(models.Comment, {
      as: 'comments',
      foreignKey: 'userId'
    })
    this.hasMany(models.Fact, {
      as: 'facts',
      foreignKey: 'userId'
    })
  }

  static config(sequelize) {
    return{
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false
    }
  }
}

module.exports = { USER_TABLE, UserSchema, User };
