const express = require('express')
const app = express()
const mongoose = require('mongoose')
 var cors = require('cors')
 var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
  }
 app.use(cors(corsOptions))
 app.use(express.json());
 if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
DATABASE_URL=process.env.DATABASE_URL
mongoose.connect(DATABASE_URL,
  {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex: true,
  }).then(
    () => { console.log('Database is connected') },
    err => { console.log('Can not connect to the database' + err) }
  ).catch(err=>console.log(err));


//routes
const User = require('./routes/User');
const Provider = require('./routes/Provider');
const Admin = require('./routes/Admin');
const Index = require('./routes/Index');

app.use('/user',User);
app.use('/provider',Provider);
app.use('/admin',Admin);
app.use(Index)


app.listen(process.env.PORT || 3000, function () {
  console.log(`Express server listening on port ${process.env.PORT}` )
});

