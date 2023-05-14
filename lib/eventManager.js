class EventManager{
    constructor(){
        this.listeners=[];
        this.id_seq=1;
    }
    emit(event,...params){
        if(params===undefined){
            params=[];
        }
        this.listeners.forEach((listener)=>{
            if(listener.event===event)     
            {
                listener.callback(...params);
            }
            
        });
        return this;
    }
    register(event,callback){
        this.listeners.push(
            {
                id:this.id_seq++,
                event:event,
                callback:callback
            });
        return this.id_seq-1;
    }

    remove(listenerId){
        this.listeners = this.listeners.filter((listener)=>{
            return listener.id!==listenerId;
        });
        return this;
    }
};

export const eventManager=new EventManager();