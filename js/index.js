var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) 
                descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function (Constructor, protoProps, staticProps) {
        if (protoProps) 
            defineProperties(Constructor.prototype, protoProps);
        if (staticProps) 
            defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function")
        ? call
        : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass) 
        Object.setPrototypeOf
            ? Object.setPrototypeOf(subClass, superClass)
            : subClass.__proto__ = superClass;
    }

/*
 * Using ES6 Syntax
 * https://facebook.github.io/react/docs/reusable-components.html#es6-classes
 */

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Component = function (_React$Component) {
    _inherits(Component, _React$Component);

    function Component(props) {
        _classCallCheck(this, Component);

        var _this = _possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).call(this, props));

        _this.state = {
            gameStarted: false,
            activeWord: [],
            activeLetters: [],
            wordsMastered: 0,
            timer: 0,
            wordList: [],
            font: 'sans'
        };
        _this.getWordList = _this
            .getWordList
            .bind(_this);
        _this.getRandomInt = _this
            .getRandomInt
            .bind(_this);
        _this.getWord = _this
            .getWord
            .bind(_this);
        _this.checkEqual = _this
            .checkEqual
            .bind(_this);
        _this.timer = _this
            .timer
            .bind(_this);
        _this.startGame = _this
            .startGame
            .bind(_this);
        _this.rating = _this
            .rating
            .bind(_this);
        _this.switchFonts = _this
            .switchFonts
            .bind(_this);
        _this.interval;
        return _this;
    }

    _createClass(Component, [
        {
            key: 'componentWillMount',
            value: function componentWillMount() {

                document
                    .addEventListener('keyup', function (e) {
                        e.preventDefault();

                        // handle backspace and delete
                        if (e.which == 46 || e.which == 8) {
                            this.setState({
                                activeLetters: this
                                    .state
                                    .activeLetters
                                    .slice(0, -1)
                            });
                            return true;
                        }

                        // otherwise add character to array
                        var char = String.fromCharCode(e.which);
                        var newActiveLetters = this.state.activeLetters;
                        newActiveLetters.push(char);
                        if (this.checkEqual(newActiveLetters, this.state.activeWord)) {
                            this.setState({
                                activeWord: this.getWord(),
                                activeLetters: [],
                                wordsMastered: this.state.wordsMastered + 1
                            });
                        } else {
                            this.setState({activeLetters: newActiveLetters});
                        }
                    }.bind(this));
            }
        }, {
            key: 'checkEqual',
            value: function checkEqual(arr1, arr2) {
                if (arr1.length !== arr2.length) 
                    return false;
                for (var i = arr1.length; i--;) {
                    if (arr1[i] !== arr2[i]) 
                        return false;
                    }
                
                return true;
            }
        }, {
            key: 'getRandomInt',
            value: function getRandomInt() {
                var min = arguments.length > 0 && arguments[0] !== undefined
                    ? arguments[0]
                    : 0;
                var max = arguments[1];

                return Math.floor(Math.random() * (max - min)) + min;
            }
        }, {
            key: 'timer',
            value: function timer() {
                var newTime = this.state.timer - 1;
                this.setState({timer: newTime});
                if (newTime === 0) {
                    window.clearInterval(this.interval);
                }
            }
        }, {
            key: 'rating',
            value: function rating() {
                if (this.state.wordsMastered < 15) {
                    return '😫 ojo guyu ae, diketik cuk';
                } else if (this.state.wordsMastered < 25) {
                    return '😐 welcome to surabaya';
                } else if (this.state.wordsMastered < 35) {
                    return '😊 fix arek warkop iki ';
                } else if (this.state.wordsMastered < 45) {
                    return '😃 iku cangkeme disekolahin neng ndi?';
                } else {
                    return '😎 master of jancok';
                }
            }
        }, {
            key: 'startGame',
            value: function startGame() {
                this
                    .setState({
                        wordList: this.getWordList()
                    }, function () {
                        var word = this.getWord();
                        this.setState({
                            activeWord: this.getWord(),
                            gameStarted: true,
                            wordsMastered: 0,
                            timer: 60
                        });
                    });
                ReactDOM
                    .findDOMNode(this)
                    .querySelector('.secret-input')
                    .focus();

                this.interval = setInterval(this.timer, 1000);
            }
        }, {
            key: 'getWord',
            value: function getWord() {
                var index = this.getRandomInt(0, this.state.wordList.length);
                var wordToUse = this.state.wordList[index];
                var newWordsList = this.state.wordList;
                newWordsList.splice(index, 1);
                this.setState({wordList: newWordsList});

                return wordToUse.split('');
            }
        }, {
            key: 'switchFonts',
            value: function switchFonts() {
                if (this.state.font === 'sans') {
                    document
                        .getElementById('app')
                        .classList
                        .add('serif');
                    this.setState({font: 'serif'});
                } else {
                    document
                        .getElementById('app')
                        .classList
                        .remove('serif');
                    this.setState({font: 'sans'});
                }
            }
        }, {
            key: 'getWordList',
            value: function getWordList() {
                var list = [
                    "ANJING",
                    "DIMANUSIAKAN",
                    "ANJRIT",
                    "ANJING",
                    "ANJROOT",
                    "ANJRIT",
                    "ANJING GEMBROT",
                    "ASEM",
                    "ASYENG",
                    "ASU",
                    "ASEM",
                    "ASU",
                    "ANJING",
                    "SEGAWON",
                    "BABI",
                    "ANJING",
                    "BADAK",
                    "ANJING",
                    "BABI",
                    "BAJIGUR",
                    "BAJINGAN",
                    "BAJINDAL",
                    "BAJIRUT",
                    "BAJIRUT",
                    "BAJINGAN",
                    "BAJINGPRET",
                    "BAJINGAN",
                    "FAAAAK",
                    "CANGKEMMU",
                    "COCOTE",
                    "COK",
                    "CUK",
                    "CANGKIRMU",
                    "CANGKEMMU",
                    "CERET",
                    "CIDUK",
                    "GAYUNG",
                    "COCOTE",
                    "COBROTE",
                    "COCOTE",
                    "CONGORE",
                    "CELO",
                    "DANCUK",
                    "DAPURMU",
                    "RAIMU",
                    "MATANE",
                    "MUKAMU",
                    "BAJIGUR",
                    "HAJINGUK",
                    "HUASYU",
                    "ASU",
                    "JANCOK",
                    "HANJRITO",
                    "ANJRIT",
                    "JAMPUT",
                    "JANCUK",
                    "DANCUK",
                    "JAMBU",
                    "JAMPUT",
                    "JINDAL",
                    "BAJINDAL",
                    "JINGUK",
                    "HAJINGUK",
                    "JIPANG",
                    "JINDAL",
                    "KAMPRET",
                    "KANTHAL",
                    "KEMPLU",
                    "KERE",
                    "KEPLE",
                    "KERE",
                    "KEWAN",
                    "MATAMU",
                    "DAGADU",
                    "MATANE",
                    "MATAMU",
                    "MODAR",
                    "MAMPUS",
                    "MODYAAAR",
                    "MODAR",
                    "MUNYUK",
                    "LONTHE",
                    "NDASMU",
                    "NGGATHELI",
                    "NDLOGHOK",
                    "OASUI",
                    "ASU",
                    "PANCI",
                    "PABU",
                    "ASU",
                    "PEKOK",
                    "PETHUK",
                    "RAIMU",
                    "MUKAMU",
                    "SONTOLOYO",
                    "GEMBALA BEBEK",
                    "MBAHMU KOPROL",
                    "MAKMU KIPER",
                    "SEMPRUL",
                    "TAIK KUCING",
                    "FECES",
                    "WAGU",
                    "WASYU",
                    "ASU",
                    "WASEW",
                    "WASYU",
                    "WEDHUS",
                    "BAJINGAN ASU",
                    "KERE KEMPLU",
                    "JAMPUT ASYU",
                    "HAJINGUK RAI MANUK",
                    "KANTHAL MARKONTHAL",
                    "BAJINGAN RAI JARAN",
                    "SAPI BERTATO RAMBO",
                    "KADAL NJENGKING"
                ]
                return list;
            }
        }, {
            key: 'render',
            value: function render() {
                var _this2 = this;

                var letters = [];
                var board = void 0;
                this
                    .state
                    .activeWord
                    .map(function (current, index) {
                        var correct = void 0;
                        if (_this2.state.activeLetters[index] === undefined) {
                            correct = 'undefined';
                        } else if (_this2.state.activeLetters[index] === current) {
                            correct = 'true';
                        } else {
                            correct = 'false';
                        }
                        letters.push(React.createElement('span', {
                            className: 'game-letter',
                            key: index,
                            'data-correct': correct
                        }, current));
                    });
                if (!this.state.gameStarted) {
                    board = React.createElement('div', {
                        className: 'game__board',
                        key: 'start'
                    }, React.createElement('p', null, 'Type as fast as you can, dengan kearifan lokal tentunya.'), React.createElement('button', {
                        className: 'button',
                        onClick: this.startGame
                    }, 'Start'), React.createElement('a', {
                        href: '#',
                        onClick: this.switchFonts
                    }, this.state.font === 'sans'
                        ? 'Serif font please'
                        : 'Sans font please'));
                } else if (this.state.timer && this.state.gameStarted) {
                    board = React.createElement('div', {
                        className: 'game__board',
                        key: 'inprogress'
                    }, React.createElement('div', {
                        className: 'game__score'
                    }, 'SCORE: ' + this.state.wordsMastered), React.createElement(ReactCSSTransitionGroup, {
                        transitionName: 'fade',
                        transitionEnterTimeout: 500,
                        transitionLeaveTimeout: 500
                    }, React.createElement('div', {
                        className: 'game__words',
                        key: this.state.activeWord
                    }, letters)), React.createElement('div', {
                        className: 'game__timer'
                    }, 'TIMELEFT: ' + this.state.timer));
                } else {
                    board = React.createElement('div', {
                        className: 'game__board',
                        key: 'timesup'
                    }, React.createElement('div', {
                        className: 'game__words'
                    }, React.createElement('p', null, 'TIME IS UP!'), React.createElement('p', null, 'FINAL SCORE: ' + this.state.wordsMastered, React.createElement('p', {
                        className: 'emoji'
                    }, this.rating())), React.createElement('button', {
                        className: 'button',
                        onClick: this.startGame
                    }, 'Play Again')));
                }

                return React.createElement('div', {
                    className: 'game'
                }, React.createElement(ReactCSSTransitionGroup, {
                    transitionName: 'scale',
                    transitionEnterTimeout: 500,
                    transitionLeaveTimeout: 500
                }, board), React.createElement('input', {
                    className: 'secret-input',
                    type: 'text'
                }));
            }
        }
    ]);

    return Component;
}(React.Component);

// Render the component in div#app

ReactDOM.render(React.createElement(Component, null), document.getElementById('app'));