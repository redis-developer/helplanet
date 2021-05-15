export default class SocketService{
    _socket
    constructor(io){
        this._socket = io;
    }  
    async sendNewReport(data){
        this._socket.on('connection',(socket)=>{
            console.log('connection - io');
            
                 
          socket.emit('new-report',data);  
            
    
        });
               
        return;
    }       
}