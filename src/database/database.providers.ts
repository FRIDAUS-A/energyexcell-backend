import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      // mongoose.connect('mongodb://localhost/nest')
      mongoose.connect('mongodb+srv://ayobamifridaus:okoya@cluster0.9uoprjg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  },
];
