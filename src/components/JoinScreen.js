import React from "react";

function JoinScreen({start}){    
    return (
        <div className="join-screen">
            <h2>Join Quiz</h2>
            <button onClick={start}> Start </button>
        </div>
    );
}

export default JoinScreen;