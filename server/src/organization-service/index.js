import app from './service';
import http from 'http';
import { normalizePort, onInitError, onInitListenSuccess } from '../shared/utils/server.utils';

export function OrganizationServiceInit(){
    var port = normalizePort(process.env.PORT_ORGANIZATION || '3002');
    app.set('port',port)
    var server = http.createServer(app);
    server.listen(port);
    server.on('error',onInitError(server));    
    server.on('listening',onInitListenSuccess('organization-service'))
}

OrganizationServiceInit();
