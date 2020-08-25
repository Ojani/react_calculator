import React from 'react';

export default function MemBtn({ memoryIndex, memoryLength, prevClickHandeler, nextClickHandeler }) {
    var upClass = 'mem-up';
    if(memoryIndex < 1) {
        upClass = 'mem-up hidden';
    }

    var downClass = 'mem-down';
    if(memoryIndex >= memoryLength -1) {
        downClass = 'mem-down hidden';
    }

    return(
        <div className='mem-btn'>
            <div className={ upClass } onClick={ prevClickHandeler }> &#9650; </div>
            <div className={ downClass } onClick={ nextClickHandeler }> &#9660; </div>
        </div>
    )
}
