import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelize';

interface InitialPostsAttributes {
  id: number;
  userid: number;
  title: string;
  body: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class InitialPost
  extends Model<InitialPostsAttributes>
  implements InitialPostsAttributes
{
  public id!: number;
  public userid!: number;
  public title!: string;
  public body!: string;
  public createdAt?: Date;
  public updatedAt?: Date;
}

InitialPost.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userid: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    body: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: 'initialposts',
    sequelize,
    timestamps: true,
    underscored: true,
    paranoid: true,
  },
);

export { InitialPost };
