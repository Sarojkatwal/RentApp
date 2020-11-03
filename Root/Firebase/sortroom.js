function merge(A,lb,mid,ub)
{

    
    i=lb;
    j=mid+1;
    k=lb;
   var b=new Array(ub-lb+1)
   
    while(i<=mid && j<=ub)
    {
        if(priority(A[i])>priority(A[j]))
        {
            b[k]=A[i]
            i++;
        }
        else
        {
            b[k]=A[j];
            j++;
        }
        k++;
    }
    if(i>mid)
    {
        while(j<=ub)
        {
            b[k]=A[j];
            j++;
            k++;
        }
    }
    else{
        while(i<=mid)
        {
            b[k]=A[i];
            i++;
            k++;
        }
    }
    
    for(i=lb;i<=ub;i++)
    {
        A[i]=b[i];
    }
}
function mergesort(A,lb,ub)
{
    
    if(lb<ub)
    {
       
        
        mergesort(A,lb,Math.floor((lb+ub)/2))
        mergesort(A,Math.floor((lb+ub)/2)+1,ub)
        merge(A,lb,Math.floor((lb+ub)/2),ub)
        
    }
}
function priority(Room){

    return (Room.priority.price_rating+Room.priority.distance_rating)
}

function sort(Rooms)
{
    
    mergesort(Rooms,0,Rooms.length-1)
}

export default {sort};

