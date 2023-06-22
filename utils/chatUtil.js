

export const getIsOnline = (userId , data)=>{
    data = data && Object.keys(data).length > 0 ?  data[userId] : null;

   if(data && userId){
        return data?.isOnline;
    }

    return false;

}



export const getParticipants = (userId)=>{

}