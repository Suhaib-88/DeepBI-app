import React from "react";
import BigMessage from "../../BigMessage";

export default function EmptyState(props){
    return (
        <div className="text-center">
            <BigMessage icon="fa-search" message={window.W_L.find_nothing} {...props}/>
        </div>
    )
}