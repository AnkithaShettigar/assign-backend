import express from 'express';
import cors from 'cors';
import mongoose, { Mongoose } from 'mongoose';

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.set('strictQuery', true);
var MONGOURL =
  'mongodb+srv://ankitha12345:0bTm11ECgbcd21CH@cluster0.pw5eemd.mongodb.net/data?retryWrites=true&w=majority';
mongoose.connect(
  MONGOURL,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  () => {
    console.log('db connected');
  }
);

//user schema

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmpassword: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = new mongoose.model('User', userSchema);

//routes

app.get('/', (req, res) => {
  res.send('Welcome');
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      if (password === user.password) {
        res.send({ message: 'Login Succesfull', user: user });
      } else {
        res.send({ message: "Password didn't match" });
      }
    } else {
      res.send({ message: 'User not registered' });
    }
  });
});

app.post('/register', (req, res) => {
  const {
    name,
    email,
    number,
    password,
    confirmpassword,
    address,
    city,
    country,
    pincode,
  } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: 'User already Registered' });
    } else {
      const user = new User({
        name,
        email,
        number,
        password,
        confirmpassword,
        address,
        city,
        country,
        pincode,
      });
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: 'Successfully Registered' });
        }
      });
    }
  });
});
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`app is running at ${PORT}`);
});
