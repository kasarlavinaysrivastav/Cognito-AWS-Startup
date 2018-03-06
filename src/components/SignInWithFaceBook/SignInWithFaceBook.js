import React from 'react';
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';

const responseFacebook = (response) => {
    console.log(response);
}

ReactDOM.render(
    <FacebookLogin
        appId="587439054938720"
        autoLoad={true}
        fields="name,email"
        onClick={componentClicked}
        callback={responseFacebook} />,
    document.getElementById('demo')
);