import app from './service';
import http from 'http';
import { normalizePort, onInitError, onInitListenSuccess } from '../shared/utils/server.utils';

export function ReportServiceInit(){
    var port = normalizePort(process.env.PORT_REPORT || '3003');
    app.set('port',port)
    var server = http.createServer(app);
    server.listen(port);
    server.on('error',onInitError(server));    
    server.on('listening',onInitListenSuccess('report-service'))
}

ReportServiceInit();
