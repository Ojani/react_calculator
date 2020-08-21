import React from 'react';

export default function Button({ symbol, clickHandler }) {
    var btnClass = 'button'
    if(symbol === '') btnClass = 'button hidden';

    return(
        <div className={ btnClass } onClick={ clickHandler }
        dangerouslySetInnerHTML={{__html: symbol}}>
            
        </div>
    );
} 