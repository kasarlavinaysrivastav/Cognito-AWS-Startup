import React from 'react'
import ReactDOM from 'react-dom'
import App from './AppContainer'
import './index.css'
import $ from 'jquery';
import { findDOMNode } from 'react-dom';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'

import reducers from './reducers'
import createSagaMiddleware from 'redux-saga'

import sagas from './sagas'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import { blue800, amber50 } from 'material-ui/styles/colors'

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: amber50
  },
  tabs: {
    backgroundColor: blue800
  }
})

const sagaMiddleware = createSagaMiddleware()

let composeEnhancers = compose

if (process.env.NODE_ENV === 'development') {
  const composeWithDevToolsExtension =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  if (typeof composeWithDevToolsExtension === 'function') {
    composeEnhancers = composeWithDevToolsExtension
  }
}

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(sagas)

injectTapEventPlugin()

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
)

var formAnim = {
    form: $('#form'),
    animClasses: ['face-up-left', 'face-up-right', 'face-down-left', 'face-down-right', 'form-complete', 'form-error'],
    resetClasses: function() {
        var $form = this.$form;

        $.each(this.animClasses, function(k, c) {
            $form.removeClass(c);
        });
    },
    faceDirection: function(d) {
        this.resetClasses();

        d = parseInt(d) < this.animClasses.length? d : -1;

        if(d >= 0) {
            this.$form.addClass(this.animClasses[d]);
        }
    }
}

var $input = $('#email, #password'),
    $submit = $('#submit'),
    focused = false,
    completed = false;


$input.focus(function() {
    focused = true;

    if(completed) {
        formAnim.faceDirection(1);
    } else {
        formAnim.faceDirection(0);
    }
});


$input.blur(function() {
    formAnim.resetClasses();
});

$input.on('input paste keyup', function() {
    completed = true;

    $input.each(function() {
        if(this.value == '') {
            completed = false;
        }
    });

    if(completed) {
        formAnim.faceDirection(1);
    } else {
        formAnim.faceDirection(0);
    }
});

$submit.click(function() {
    focused = true;
    formAnim.resetClasses();

    if(completed) {
        $submit.css('pointer-events', 'none');
        setTimeout(function() {
            formAnim.faceDirection(4);
            $input.val('');
            completed = false;

            setTimeout(function() {
                $submit.css('pointer-events', '');
                formAnim.resetClasses();
            }, 2000);
        }, 1000);
    } else {
        setTimeout(function() {
            formAnim.faceDirection(5);

            setTimeout(function() {
                formAnim.resetClasses();
            }, 2000);
        }, 1000);
    }
});

$(function() {
    setTimeout(function() {
        if(!focused) {
            $input.eq(0).focus();
        }
    }, 2000);
})