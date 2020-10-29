import app from './app';
import 'reflect-metadata';
const port = process.env.PORT || 3030;

app.listen(port, () => console.log(`Server listening on port: ${port}`));
