const bodyParser = require('body-parser');
const express = require('express');
// const cors = require('cors');
const multiparty = require('connect-multiparty');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// cors por questões de segurança o JS não deixa domínios diferentes (portas diferentes) se comunicarem, se não poderíamos pegar APIs de sites e usar na nossa aplicação sem problemas.??
// portal 4200 localhost (angular) e porta do servidor 8000

// const corsOptions = {
//     origin: '*',
//     optionSuccessStatus: 200
// };

// app.use(cors(corsOptions));

// upload de arquivos - para armazenar o arquivo do angular
const multipartyMiddleware = multiparty({ uploadDir: './uploads' })
app.post('/upload', multipartyMiddleware, (req, res) => {
    const files = req.files;
    console.log(files);
    res.json({ message: files });
})

app.get('/downloadExcel', (req, res) => {
    res.download('./uploads/report.xlsx');
})
app.get('/downloadPdf', (req, res) => {
    res.download('./uploads/report.pdf');
})

app.use((err, req, res, next) => res.json({error: err.message}));

app.listen(8080, () => {
    console.log('servidor porta 8080')
})