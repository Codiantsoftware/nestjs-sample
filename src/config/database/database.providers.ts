import { Sequelize } from 'sequelize-typescript';
import { database } from '../../utils/environment';
import { ModelConnect } from '../model';


export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize(database);
            const models = Object.values(ModelConnect); 
            sequelize.addModels(models); 
            try {
                await sequelize.authenticate();
                await sequelize.sync();
            } catch (error) {
                throw error;
            }
            return sequelize; 
        },
    },
];
