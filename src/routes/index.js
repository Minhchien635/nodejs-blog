const accountRouter = require('./account');
const newsRouter = require('./news');
const coursesRouter = require('./courses');
const siteRouter = require('./site');
const meRouter = require('./me');


function route(app) {
    app.use('/account', accountRouter); 
    app.use('/news', newsRouter);
    app.use('/me', meRouter);
    app.use('/courses', coursesRouter);
    app.use('/', siteRouter);

    /* app.get('/', (req, res) => {
        res.render('home');
    });
       
       app.get('/news', (req, res) => {
         console.log(req.query.q);
         res.render('news');
        });
       
    app.get('/search', (req, res) => {
    res.render('search');
    });
    
    app.post('/search', (req, res) => {
        console.log(req.body);
        res.send('');
    });
    */
}

module.exports = route;
