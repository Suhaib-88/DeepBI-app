import React from "react";
import BigMessage from "../../BigMessage";

export default function LoadingState(props:any){
    return (
        <div className="text-center">
            <BigMessage icon="fa-spinner fa-2x fa-pulse" message={window.W_L.loading} {...props}/>
        </div>
    )
}
