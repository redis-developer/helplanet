export default class SocketService{
    _socket
    constructor(socket){
        this._socket = socket;
    }  
    async sendNewReport(data){        
            
          console.log("EMMIT",data);       
          this._socket.emit('new-report',data);  
                    
               
        return;
    }       
}