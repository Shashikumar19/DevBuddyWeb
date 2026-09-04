import { io } from "socket.io-client";
import { baseUrl } from "./constants";

export function createSoketConnection(){
if(location.hostname === 'localhost'){
return io(baseUrl);
}

return io('/',{
    path : '/api/socket.io'
});
}
