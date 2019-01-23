const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const path = require('path');

const schema = require('./schema');

const app = express();
app.use(cors());

app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		graphiql: true		// in-browser ide to test queries
	})
);

app.use(express.static('public'));

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

const port = process.env.PORT || 4000;

app.listen(port, () => console.log('server started on port: ', port));
