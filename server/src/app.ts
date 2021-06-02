import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';

const router = express.Router();
const app = express();
const port = 3000;

const UPLOAD_PATH = 'uploads';
const upload = multer({ dest: `${UPLOAD_PATH}/` }); // multer configuration

// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//  Allow form-data parsing
app.use(upload.any());

router.all('/', (req, res) => {
  res.redirect('/upload');
});

router.post('/upload', (req, res) => {
  console.log(req.body);
  res.status(200).send('Hello there!');
});

router.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!');
});

app.use('/', router);

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
}).on('error', (err:any) => {
  if (err) {
    return console.error(err);
  }
});
