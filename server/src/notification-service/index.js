import app from './service';
import socketIO from 'socket.io';
import http from 'http';
import { normalizePort, onInitError, onInitListenSuccess } from '../shared/utils/server.utils';
import { redisInstance, xreadTransformResult } from '../shared/utils/redis.utils';
import NotificationRepository from '../shared/repositories/notification.repository'
import * as NotificationController from './controllers'
import SocketService from '../shared/repositories/socket.service'
export async function NotificationServiceInit(){
    var port = normalizePort(process.env.PORT_NOTIFICATION || '3006');
    app.set('port',port)
    var server = http.createServer(app);

    //io app
    let io = socketIO(server, {
        cors: {
            origin: '*',
        }
    });
    server.listen(port);
    server.on('error',onInitError(server));    
    server.on('listening',onInitListenSuccess('notification-service'))

    io.on('connection',async (socket)=>{
        console.log('connection - io');        
        // io events
        while (true) {
            /* eslint-enable */

            /* eslint-disable no-await-in-loop */
            const response = await redisInstance.xread('COUNT', '1', 'BLOCK', '5000', 'STREAMS', 'hpa:report', '$');            
            if(response){
                socket.emit("test-ev","Hello from socket");
                let data = [];
                data = xreadTransformResult(response);
                console.log('res=>',data); 
                data.forEach(element => {                    
                    const  notificationPersistence = new NotificationRepository();
                    const ioSocketService = new SocketService(socket);       
                    NotificationController.SaveNotificationCtrl(notificationPersistence)(element);
                    NotificationController.SendNewReportCtrl(ioSocketService,notificationPersistence)(element);
                });
            }        

        } 
    });
       
}

NotificationServiceInit();