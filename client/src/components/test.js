import React, {useState} from 'react';
import API from '../utils/API'


function Test(){

    const [text, setText] = useState('start');

    API.getTest().then(r => setText(r.data));

    return (
        <div>
            {text}
        </div>
    )
}

export default Test;