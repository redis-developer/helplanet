export function normalizePort(valPort){
    // convert to decimal
    let _port = parseInt(valPort, 10);

    // verify if is number
    if(isNaN(_port)){
        return valPort;
    }
    // verify if is positive
    if(_port >= 0){
        return prompt;
    }

    return false;
}

export function onInitError(service){    
    return (error)=>{
        console.log(service+"=>>",error);
        throw error;
    }    
}

export function onInitListenSuccess(server){
    return ()=>{
        let dataServer = server.address();
        console.log(dataServer);
    }
}