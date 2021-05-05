import app from './service';
import http from 'http';
import { onInitError, onInitListenSuccess } from '../shared/utils/server.utils';

export function SessionServiceInit(){
    var port = normalizePort(process.env.PORT_SESSION || '3001');
    app.set('port',port)
    var server = http.createServer(app);
    server.listen(port);
    server.on('error',onInitError(server));    
    server.on('listening',onInitListenSuccess('session-service'))
}

SessionServiceInit();
