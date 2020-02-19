"use strict";

function _typeof2(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof2(exports)) === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'], factory) : (global = global || self, factory(global.IMask = {}));
})(void 0, function (exports) {
  'use strict';

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
    return module = {
      exports: {}
    }, fn(module, module.exports), module.exports;
  }

  var check = function check(it) {
    return it && it.Math == Math && it;
  }; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


  var global_1 = // eslint-disable-next-line no-undef
  check((typeof globalThis === "undefined" ? "undefined" : _typeof2(globalThis)) == 'object' && globalThis) || check((typeof window === "undefined" ? "undefined" : _typeof2(window)) == 'object' && window) || check((typeof self === "undefined" ? "undefined" : _typeof2(self)) == 'object' && self) || check(_typeof2(commonjsGlobal) == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func
  Function('return this')();

  var fails = function fails(exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  }; // Thank's IE8 for his funny defineProperty


  var descriptors = !fails(function () {
    return Object.defineProperty({}, 1, {
      get: function get() {
        return 7;
      }
    })[1] != 7;
  });
  var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

  var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({
    1: 2
  }, 1); // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable

  var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor(this, V);
    return !!descriptor && descriptor.enumerable;
  } : nativePropertyIsEnumerable;
  var objectPropertyIsEnumerable = {
    f: f
  };

  var createPropertyDescriptor = function createPropertyDescriptor(bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var toString = {}.toString;

  var classofRaw = function classofRaw(it) {
    return toString.call(it).slice(8, -1);
  };

  var split = ''.split; // fallback for non-array-like ES3 and non-enumerable old V8 strings

  var indexedObject = fails(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins
    return !Object('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
  } : Object; // `RequireObjectCoercible` abstract operation
  // https://tc39.github.io/ecma262/#sec-requireobjectcoercible

  var requireObjectCoercible = function requireObjectCoercible(it) {
    if (it == undefined) throw TypeError("Can't call method on " + it);
    return it;
  }; // toObject with fallback for non-array-like ES3 strings


  var toIndexedObject = function toIndexedObject(it) {
    return indexedObject(requireObjectCoercible(it));
  };

  var isObject = function isObject(it) {
    return _typeof2(it) === 'object' ? it !== null : typeof it === 'function';
  }; // `ToPrimitive` abstract operation
  // https://tc39.github.io/ecma262/#sec-toprimitive
  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string


  var toPrimitive = function toPrimitive(input, PREFERRED_STRING) {
    if (!isObject(input)) return input;
    var fn, val;
    if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
    if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
    if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var hasOwnProperty = {}.hasOwnProperty;

  var has = function has(it, key) {
    return hasOwnProperty.call(it, key);
  };

  var document$1 = global_1.document; // typeof document.createElement is 'object' in old IE

  var EXISTS = isObject(document$1) && isObject(document$1.createElement);

  var documentCreateElement = function documentCreateElement(it) {
    return EXISTS ? document$1.createElement(it) : {};
  }; // Thank's IE8 for his funny defineProperty


  var ie8DomDefine = !descriptors && !fails(function () {
    return Object.defineProperty(documentCreateElement('div'), 'a', {
      get: function get() {
        return 7;
      }
    }).a != 7;
  });
  var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor

  var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject(O);
    P = toPrimitive(P, true);
    if (ie8DomDefine) try {
      return nativeGetOwnPropertyDescriptor(O, P);
    } catch (error) {
      /* empty */
    }
    if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
  };
  var objectGetOwnPropertyDescriptor = {
    f: f$1
  };

  var anObject = function anObject(it) {
    if (!isObject(it)) {
      throw TypeError(String(it) + ' is not an object');
    }

    return it;
  };

  var nativeDefineProperty = Object.defineProperty; // `Object.defineProperty` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperty

  var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
    anObject(O);
    P = toPrimitive(P, true);
    anObject(Attributes);
    if (ie8DomDefine) try {
      return nativeDefineProperty(O, P, Attributes);
    } catch (error) {
      /* empty */
    }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };
  var objectDefineProperty = {
    f: f$2
  };
  var createNonEnumerableProperty = descriptors ? function (object, key, value) {
    return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var setGlobal = function setGlobal(key, value) {
    try {
      createNonEnumerableProperty(global_1, key, value);
    } catch (error) {
      global_1[key] = value;
    }

    return value;
  };

  var SHARED = '__core-js_shared__';
  var store = global_1[SHARED] || setGlobal(SHARED, {});
  var sharedStore = store;
  var functionToString = Function.toString; // this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper

  if (typeof sharedStore.inspectSource != 'function') {
    sharedStore.inspectSource = function (it) {
      return functionToString.call(it);
    };
  }

  var inspectSource = sharedStore.inspectSource;
  var WeakMap = global_1.WeakMap;
  var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));
  var shared = createCommonjsModule(function (module) {
    (module.exports = function (key, value) {
      return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
    })('versions', []).push({
      version: '3.6.4',
      mode: 'global',
      copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
    });
  });
  var id = 0;
  var postfix = Math.random();

  var uid = function uid(key) {
    return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
  };

  var keys = shared('keys');

  var sharedKey = function sharedKey(key) {
    return keys[key] || (keys[key] = uid(key));
  };

  var hiddenKeys = {};
  var WeakMap$1 = global_1.WeakMap;
  var set, get, has$1;

  var enforce = function enforce(it) {
    return has$1(it) ? get(it) : set(it, {});
  };

  var getterFor = function getterFor(TYPE) {
    return function (it) {
      var state;

      if (!isObject(it) || (state = get(it)).type !== TYPE) {
        throw TypeError('Incompatible receiver, ' + TYPE + ' required');
      }

      return state;
    };
  };

  if (nativeWeakMap) {
    var store$1 = new WeakMap$1();
    var wmget = store$1.get;
    var wmhas = store$1.has;
    var wmset = store$1.set;

    set = function set(it, metadata) {
      wmset.call(store$1, it, metadata);
      return metadata;
    };

    get = function get(it) {
      return wmget.call(store$1, it) || {};
    };

    has$1 = function has$1(it) {
      return wmhas.call(store$1, it);
    };
  } else {
    var STATE = sharedKey('state');
    hiddenKeys[STATE] = true;

    set = function set(it, metadata) {
      createNonEnumerableProperty(it, STATE, metadata);
      return metadata;
    };

    get = function get(it) {
      return has(it, STATE) ? it[STATE] : {};
    };

    has$1 = function has$1(it) {
      return has(it, STATE);
    };
  }

  var internalState = {
    set: set,
    get: get,
    has: has$1,
    enforce: enforce,
    getterFor: getterFor
  };
  var redefine = createCommonjsModule(function (module) {
    var getInternalState = internalState.get;
    var enforceInternalState = internalState.enforce;
    var TEMPLATE = String(String).split('String');
    (module.exports = function (O, key, value, options) {
      var unsafe = options ? !!options.unsafe : false;
      var simple = options ? !!options.enumerable : false;
      var noTargetGet = options ? !!options.noTargetGet : false;

      if (typeof value == 'function') {
        if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
        enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
      }

      if (O === global_1) {
        if (simple) O[key] = value;else setGlobal(key, value);
        return;
      } else if (!unsafe) {
        delete O[key];
      } else if (!noTargetGet && O[key]) {
        simple = true;
      }

      if (simple) O[key] = value;else createNonEnumerableProperty(O, key, value); // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
    })(Function.prototype, 'toString', function toString() {
      return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
    });
  });
  var path = global_1;

  var aFunction = function aFunction(variable) {
    return typeof variable == 'function' ? variable : undefined;
  };

  var getBuiltIn = function getBuiltIn(namespace, method) {
    return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace]) : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
  };

  var ceil = Math.ceil;
  var floor = Math.floor; // `ToInteger` abstract operation
  // https://tc39.github.io/ecma262/#sec-tointeger

  var toInteger = function toInteger(argument) {
    return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
  };

  var min = Math.min; // `ToLength` abstract operation
  // https://tc39.github.io/ecma262/#sec-tolength

  var toLength = function toLength(argument) {
    return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var max = Math.max;
  var min$1 = Math.min; // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

  var toAbsoluteIndex = function toAbsoluteIndex(index, length) {
    var integer = toInteger(index);
    return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
  }; // `Array.prototype.{ indexOf, includes }` methods implementation


  var createMethod = function createMethod(IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject($this);
      var length = toLength(O.length);
      var index = toAbsoluteIndex(fromIndex, length);
      var value; // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare

      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++]; // eslint-disable-next-line no-self-compare

        if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
      } else for (; length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
      }
      return !IS_INCLUDES && -1;
    };
  };

  var arrayIncludes = {
    // `Array.prototype.includes` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.includes
    includes: createMethod(true),
    // `Array.prototype.indexOf` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod(false)
  };
  var indexOf = arrayIncludes.indexOf;

  var objectKeysInternal = function objectKeysInternal(object, names) {
    var O = toIndexedObject(object);
    var i = 0;
    var result = [];
    var key;

    for (key in O) {
      !has(hiddenKeys, key) && has(O, key) && result.push(key);
    } // Don't enum bug & hidden keys


    while (names.length > i) {
      if (has(O, key = names[i++])) {
        ~indexOf(result, key) || result.push(key);
      }
    }

    return result;
  }; // IE8- don't enum bug keys


  var enumBugKeys = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];
  var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype'); // `Object.getOwnPropertyNames` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames

  var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return objectKeysInternal(O, hiddenKeys$1);
  };

  var objectGetOwnPropertyNames = {
    f: f$3
  };
  var f$4 = Object.getOwnPropertySymbols;
  var objectGetOwnPropertySymbols = {
    f: f$4
  }; // all object keys, includes non-enumerable and symbols

  var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = objectGetOwnPropertyNames.f(anObject(it));
    var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
    return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
  };

  var copyConstructorProperties = function copyConstructorProperties(target, source) {
    var keys = ownKeys(source);
    var defineProperty = objectDefineProperty.f;
    var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  };

  var replacement = /#|\.prototype\./;

  var isForced = function isForced(feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == 'function' ? fails(detection) : !!detection;
  };

  var normalize = isForced.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data = isForced.data = {};
  var NATIVE = isForced.NATIVE = 'N';
  var POLYFILL = isForced.POLYFILL = 'P';
  var isForced_1 = isForced;
  var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
  /*
    options.target      - name of the target object
    options.global      - target is the global object
    options.stat        - export as static methods of target
    options.proto       - export as prototype methods of target
    options.real        - real prototype method for the `pure` version
    options.forced      - export even if the native feature is available
    options.bind        - bind methods to the target, required for the `pure` version
    options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
    options.unsafe      - use the simple assignment of property instead of delete + defineProperty
    options.sham        - add a flag to not completely full polyfills
    options.enumerable  - export as enumerable property
    options.noTargetGet - prevent calling a getter on target
  */

  var _export = function _export(options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;

    if (GLOBAL) {
      target = global_1;
    } else if (STATIC) {
      target = global_1[TARGET] || setGlobal(TARGET, {});
    } else {
      target = (global_1[TARGET] || {}).prototype;
    }

    if (target) for (key in source) {
      sourceProperty = source[key];

      if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor$1(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];

      FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contained in target

      if (!FORCED && targetProperty !== undefined) {
        if (_typeof2(sourceProperty) === _typeof2(targetProperty)) continue;
        copyConstructorProperties(sourceProperty, targetProperty);
      } // add a flag to not completely full polyfills


      if (options.sham || targetProperty && targetProperty.sham) {
        createNonEnumerableProperty(sourceProperty, 'sham', true);
      } // extend global


      redefine(target, key, sourceProperty, options);
    }
  }; // `Object.keys` method
  // https://tc39.github.io/ecma262/#sec-object.keys


  var objectKeys = Object.keys || function keys(O) {
    return objectKeysInternal(O, enumBugKeys);
  }; // `ToObject` abstract operation
  // https://tc39.github.io/ecma262/#sec-toobject


  var toObject = function toObject(argument) {
    return Object(requireObjectCoercible(argument));
  };

  var nativeAssign = Object.assign;
  var defineProperty = Object.defineProperty; // `Object.assign` method
  // https://tc39.github.io/ecma262/#sec-object.assign

  var objectAssign = !nativeAssign || fails(function () {
    // should have correct order of operations (Edge bug)
    if (descriptors && nativeAssign({
      b: 1
    }, nativeAssign(defineProperty({}, 'a', {
      enumerable: true,
      get: function get() {
        defineProperty(this, 'b', {
          value: 3,
          enumerable: false
        });
      }
    }), {
      b: 2
    })).b !== 1) return true; // should work with symbols and should have deterministic property order (V8 bug)

    var A = {};
    var B = {}; // eslint-disable-next-line no-undef

    var symbol = Symbol();
    var alphabet = 'abcdefghijklmnopqrst';
    A[symbol] = 7;
    alphabet.split('').forEach(function (chr) {
      B[chr] = chr;
    });
    return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
  }) ? function assign(target, source) {
    // eslint-disable-line no-unused-vars
    var T = toObject(target);
    var argumentsLength = arguments.length;
    var index = 1;
    var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
    var propertyIsEnumerable = objectPropertyIsEnumerable.f;

    while (argumentsLength > index) {
      var S = indexedObject(arguments[index++]);
      var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
      var length = keys.length;
      var j = 0;
      var key;

      while (length > j) {
        key = keys[j++];
        if (!descriptors || propertyIsEnumerable.call(S, key)) T[key] = S[key];
      }
    }

    return T;
  } : nativeAssign; // `Object.assign` method
  // https://tc39.github.io/ecma262/#sec-object.assign

  _export({
    target: 'Object',
    stat: true,
    forced: Object.assign !== objectAssign
  }, {
    assign: objectAssign
  }); // `String.prototype.repeat` method implementation
  // https://tc39.github.io/ecma262/#sec-string.prototype.repeat


  var stringRepeat = ''.repeat || function repeat(count) {
    var str = String(requireObjectCoercible(this));
    var result = '';
    var n = toInteger(count);
    if (n < 0 || n == Infinity) throw RangeError('Wrong number of repetitions');

    for (; n > 0; (n >>>= 1) && (str += str)) {
      if (n & 1) result += str;
    }

    return result;
  }; // https://github.com/tc39/proposal-string-pad-start-end


  var ceil$1 = Math.ceil; // `String.prototype.{ padStart, padEnd }` methods implementation

  var createMethod$1 = function createMethod$1(IS_END) {
    return function ($this, maxLength, fillString) {
      var S = String(requireObjectCoercible($this));
      var stringLength = S.length;
      var fillStr = fillString === undefined ? ' ' : String(fillString);
      var intMaxLength = toLength(maxLength);
      var fillLen, stringFiller;
      if (intMaxLength <= stringLength || fillStr == '') return S;
      fillLen = intMaxLength - stringLength;
      stringFiller = stringRepeat.call(fillStr, ceil$1(fillLen / fillStr.length));
      if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
      return IS_END ? S + stringFiller : stringFiller + S;
    };
  };

  var stringPad = {
    // `String.prototype.padStart` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.padstart
    start: createMethod$1(false),
    // `String.prototype.padEnd` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.padend
    end: createMethod$1(true)
  };
  var engineUserAgent = getBuiltIn('navigator', 'userAgent') || ''; // https://github.com/zloirock/core-js/issues/280
  // eslint-disable-next-line unicorn/no-unsafe-regex

  var stringPadWebkitBug = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(engineUserAgent);
  var $padEnd = stringPad.end; // `String.prototype.padEnd` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.padend

  _export({
    target: 'String',
    proto: true,
    forced: stringPadWebkitBug
  }, {
    padEnd: function padEnd(maxLength
    /* , fillString = ' ' */
    ) {
      return $padEnd(this, maxLength, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var $padStart = stringPad.start; // `String.prototype.padStart` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.padstart

  _export({
    target: 'String',
    proto: true,
    forced: stringPadWebkitBug
  }, {
    padStart: function padStart(maxLength
    /* , fillString = ' ' */
    ) {
      return $padStart(this, maxLength, arguments.length > 1 ? arguments[1] : undefined);
    }
  }); // `String.prototype.repeat` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.repeat


  _export({
    target: 'String',
    proto: true
  }, {
    repeat: stringRepeat
  }); // `globalThis` object
  // https://github.com/tc39/proposal-global


  _export({
    global: true
  }, {
    globalThis: global_1
  });

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};

    var target = _objectWithoutPropertiesLoose(source, excluded);

    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof2(call) === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  function set$1(target, property, value, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.set) {
      set$1 = Reflect.set;
    } else {
      set$1 = function set(target, property, value, receiver) {
        var base = _superPropBase(target, property);

        var desc;

        if (base) {
          desc = Object.getOwnPropertyDescriptor(base, property);

          if (desc.set) {
            desc.set.call(receiver, value);
            return true;
          } else if (!desc.writable) {
            return false;
          }
        }

        desc = Object.getOwnPropertyDescriptor(receiver, property);

        if (desc) {
          if (!desc.writable) {
            return false;
          }

          desc.value = value;
          Object.defineProperty(receiver, property, desc);
        } else {
          _defineProperty(receiver, property, value);
        }

        return true;
      };
    }

    return set$1(target, property, value, receiver);
  }

  function _set(target, property, value, receiver, isStrict) {
    var s = set$1(target, property, value, receiver || target);

    if (!s && isStrict) {
      throw new Error('failed to set property');
    }

    return value;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
      return;
    }

    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }
  /** Checks if value is string */


  function isString(str) {
    return typeof str === 'string' || str instanceof String;
  }
  /**
    Direction
    @prop {string} NONE
    @prop {string} LEFT
    @prop {string} FORCE_LEFT
    @prop {string} RIGHT
    @prop {string} FORCE_RIGHT
  */


  var DIRECTION = {
    NONE: 'NONE',
    LEFT: 'LEFT',
    FORCE_LEFT: 'FORCE_LEFT',
    RIGHT: 'RIGHT',
    FORCE_RIGHT: 'FORCE_RIGHT'
  };
  /** */

  function forceDirection(direction) {
    switch (direction) {
      case DIRECTION.LEFT:
        return DIRECTION.FORCE_LEFT;

      case DIRECTION.RIGHT:
        return DIRECTION.FORCE_RIGHT;

      default:
        return direction;
    }
  }
  /** Escapes regular expression control chars */


  function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1');
  } // cloned from https://github.com/epoberezkin/fast-deep-equal with small changes


  function objectIncludes(b, a) {
    if (a === b) return true;
    var arrA = Array.isArray(a),
        arrB = Array.isArray(b),
        i;

    if (arrA && arrB) {
      if (a.length != b.length) return false;

      for (i = 0; i < a.length; i++) {
        if (!objectIncludes(a[i], b[i])) return false;
      }

      return true;
    }

    if (arrA != arrB) return false;

    if (a && b && _typeof(a) === 'object' && _typeof(b) === 'object') {
      var dateA = a instanceof Date,
          dateB = b instanceof Date;
      if (dateA && dateB) return a.getTime() == b.getTime();
      if (dateA != dateB) return false;
      var regexpA = a instanceof RegExp,
          regexpB = b instanceof RegExp;
      if (regexpA && regexpB) return a.toString() == b.toString();
      if (regexpA != regexpB) return false;
      var keys = Object.keys(a); // if (keys.length !== Object.keys(b).length) return false;

      for (i = 0; i < keys.length; i++) {
        if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
      }

      for (i = 0; i < keys.length; i++) {
        if (!objectIncludes(b[keys[i]], a[keys[i]])) return false;
      }

      return true;
    } else if (a && b && typeof a === 'function' && typeof b === 'function') {
      return a.toString() === b.toString();
    }

    return false;
  }
  /** Selection range */

  /** Provides details of changing input */


  var ActionDetails =
  /*#__PURE__*/
  function () {
    /** Current input value */

    /** Current cursor position */

    /** Old input value */

    /** Old selection */
    function ActionDetails(value, cursorPos, oldValue, oldSelection) {
      _classCallCheck(this, ActionDetails);

      this.value = value;
      this.cursorPos = cursorPos;
      this.oldValue = oldValue;
      this.oldSelection = oldSelection; // double check if left part was changed (autofilling, other non-standard input triggers)

      while (this.value.slice(0, this.startChangePos) !== this.oldValue.slice(0, this.startChangePos)) {
        --this.oldSelection.start;
      }
    }
    /**
      Start changing position
      @readonly
    */


    _createClass(ActionDetails, [{
      key: "startChangePos",
      get: function get() {
        return Math.min(this.cursorPos, this.oldSelection.start);
      }
      /**
        Inserted symbols count
        @readonly
      */

    }, {
      key: "insertedCount",
      get: function get() {
        return this.cursorPos - this.startChangePos;
      }
      /**
        Inserted symbols
        @readonly
      */

    }, {
      key: "inserted",
      get: function get() {
        return this.value.substr(this.startChangePos, this.insertedCount);
      }
      /**
        Removed symbols count
        @readonly
      */

    }, {
      key: "removedCount",
      get: function get() {
        // Math.max for opposite operation
        return Math.max(this.oldSelection.end - this.startChangePos || // for Delete
        this.oldValue.length - this.value.length, 0);
      }
      /**
        Removed symbols
        @readonly
      */

    }, {
      key: "removed",
      get: function get() {
        return this.oldValue.substr(this.startChangePos, this.removedCount);
      }
      /**
        Unchanged head symbols
        @readonly
      */

    }, {
      key: "head",
      get: function get() {
        return this.value.substring(0, this.startChangePos);
      }
      /**
        Unchanged tail symbols
        @readonly
      */

    }, {
      key: "tail",
      get: function get() {
        return this.value.substring(this.startChangePos + this.insertedCount);
      }
      /**
        Remove direction
        @readonly
      */

    }, {
      key: "removeDirection",
      get: function get() {
        if (!this.removedCount || this.insertedCount) return DIRECTION.NONE; // align right if delete at right or if range removed (event with backspace)

        return this.oldSelection.end === this.cursorPos || this.oldSelection.start === this.cursorPos ? DIRECTION.RIGHT : DIRECTION.LEFT;
      }
    }]);

    return ActionDetails;
  }();
  /**
    Provides details of changing model value
    @param {Object} [details]
    @param {string} [details.inserted] - Inserted symbols
    @param {boolean} [details.skip] - Can skip chars
    @param {number} [details.removeCount] - Removed symbols count
    @param {number} [details.tailShift] - Additional offset if any changes occurred before tail
  */


  var ChangeDetails =
  /*#__PURE__*/
  function () {
    /** Inserted symbols */

    /** Can skip chars */

    /** Additional offset if any changes occurred before tail */

    /** Raw inserted is used by dynamic mask */
    function ChangeDetails(details) {
      _classCallCheck(this, ChangeDetails);

      Object.assign(this, {
        inserted: '',
        rawInserted: '',
        skip: false,
        tailShift: 0
      }, details);
    }
    /**
      Aggregate changes
      @returns {ChangeDetails} `this`
    */


    _createClass(ChangeDetails, [{
      key: "aggregate",
      value: function aggregate(details) {
        this.rawInserted += details.rawInserted;
        this.skip = this.skip || details.skip;
        this.inserted += details.inserted;
        this.tailShift += details.tailShift;
        return this;
      }
      /** Total offset considering all changes */

    }, {
      key: "offset",
      get: function get() {
        return this.tailShift + this.inserted.length;
      }
    }]);

    return ChangeDetails;
  }();
  /** Provides details of continuous extracted tail */


  var ContinuousTailDetails =
  /*#__PURE__*/
  function () {
    /** Tail value as string */

    /** Tail start position */

    /** Start position */
    function ContinuousTailDetails() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var stop = arguments.length > 2 ? arguments[2] : undefined;

      _classCallCheck(this, ContinuousTailDetails);

      this.value = value;
      this.from = from;
      this.stop = stop;
    }

    _createClass(ContinuousTailDetails, [{
      key: "toString",
      value: function toString() {
        return this.value;
      }
    }, {
      key: "extend",
      value: function extend(tail) {
        this.value += String(tail);
      }
    }, {
      key: "appendTo",
      value: function appendTo(masked) {
        return masked.append(this.toString(), {
          tail: true
        }).aggregate(masked._appendPlaceholder());
      }
    }, {
      key: "shiftBefore",
      value: function shiftBefore(pos) {
        if (this.from >= pos || !this.value.length) return '';
        var shiftChar = this.value[0];
        this.value = this.value.slice(1);
        return shiftChar;
      }
    }, {
      key: "state",
      get: function get() {
        return {
          value: this.value,
          from: this.from,
          stop: this.stop
        };
      },
      set: function set(state) {
        Object.assign(this, state);
      }
    }]);

    return ContinuousTailDetails;
  }();
  /**
   * Applies mask on element.
   * @constructor
   * @param {HTMLInputElement|HTMLTextAreaElement|MaskElement} el - Element to apply mask
   * @param {Object} opts - Custom mask options
   * @return {InputMask}
   */


  function IMask(el) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}; // currently available only for input-like elements

    return new IMask.InputMask(el, opts);
  }
  /** Supported mask type */

  /** Provides common masking stuff */


  var Masked =
  /*#__PURE__*/
  function () {
    // $Shape<MaskedOptions>; TODO after fix https://github.com/facebook/flow/issues/4773

    /** @type {Mask} */

    /** */
    // $FlowFixMe no ideas

    /** Transforms value before mask processing */

    /** Validates if value is acceptable */

    /** Does additional processing in the end of editing */

    /** Format typed value to string */

    /** Parse strgin to get typed value */

    /** Enable characters overwriting */

    /** */
    function Masked(opts) {
      _classCallCheck(this, Masked);

      this._value = '';

      this._update(Object.assign({}, Masked.DEFAULTS, {}, opts));

      this.isInitialized = true;
    }
    /** Sets and applies new options */


    _createClass(Masked, [{
      key: "updateOptions",
      value: function updateOptions(opts) {
        if (!Object.keys(opts).length) return;
        this.withValueRefresh(this._update.bind(this, opts));
      }
      /**
        Sets new options
        @protected
      */

    }, {
      key: "_update",
      value: function _update(opts) {
        Object.assign(this, opts);
      }
      /** Mask state */

    }, {
      key: "reset",

      /** Resets value */
      value: function reset() {
        this._value = '';
      }
      /** */

    }, {
      key: "resolve",

      /** Resolve new value */
      value: function resolve(value) {
        this.reset();
        this.append(value, {
          input: true
        }, '');
        this.doCommit();
        return this.value;
      }
      /** */

    }, {
      key: "nearestInputPos",

      /** Finds nearest input position in direction */
      value: function nearestInputPos(cursorPos, direction) {
        return cursorPos;
      }
      /** Extracts value in range considering flags */

    }, {
      key: "extractInput",
      value: function extractInput() {
        var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
        return this.value.slice(fromPos, toPos);
      }
      /** Extracts tail in range */

    }, {
      key: "extractTail",
      value: function extractTail() {
        var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
        return new ContinuousTailDetails(this.extractInput(fromPos, toPos), fromPos);
      }
      /** Appends tail */
      // $FlowFixMe no ideas

    }, {
      key: "appendTail",
      value: function appendTail(tail) {
        if (isString(tail)) tail = new ContinuousTailDetails(String(tail));
        return tail.appendTo(this);
      }
      /** Appends char */

    }, {
      key: "_appendCharRaw",
      value: function _appendCharRaw(ch) {
        var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        ch = this.doPrepare(ch, flags);
        if (!ch) return new ChangeDetails();
        this._value += ch;
        return new ChangeDetails({
          inserted: ch,
          rawInserted: ch
        });
      }
      /** Appends char */

    }, {
      key: "_appendChar",
      value: function _appendChar(ch) {
        var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var checkTail = arguments.length > 2 ? arguments[2] : undefined;
        var consistentState = this.state;

        var details = this._appendCharRaw(ch, flags);

        if (details.inserted) {
          var consistentTail;
          var appended = this.doValidate(flags) !== false;

          if (appended && checkTail != null) {
            // validation ok, check tail
            var beforeTailState = this.state;

            if (this.overwrite) {
              consistentTail = checkTail.state;
              checkTail.shiftBefore(this.value.length);
            }

            var tailDetails = this.appendTail(checkTail);
            appended = tailDetails.rawInserted === checkTail.toString(); // if ok, rollback state after tail

            if (appended && tailDetails.inserted) this.state = beforeTailState;
          } // revert all if something went wrong


          if (!appended) {
            details = new ChangeDetails();
            this.state = consistentState;
            if (checkTail && consistentTail) checkTail.state = consistentTail;
          }
        }

        return details;
      }
      /** Appends optional placeholder at end */

    }, {
      key: "_appendPlaceholder",
      value: function _appendPlaceholder() {
        return new ChangeDetails();
      }
      /** Appends symbols considering flags */
      // $FlowFixMe no ideas

    }, {
      key: "append",
      value: function append(str, flags, tail) {
        if (!isString(str)) throw new Error('value should be string');
        var details = new ChangeDetails();
        var checkTail = isString(tail) ? new ContinuousTailDetails(String(tail)) : tail;
        if (flags.tail) flags._beforeTailState = this.state;

        for (var ci = 0; ci < str.length; ++ci) {
          details.aggregate(this._appendChar(str[ci], flags, checkTail));
        } // append tail but aggregate only tailShift


        if (checkTail != null) {
          details.tailShift += this.appendTail(checkTail).tailShift; // TODO it's a good idea to clear state after appending ends
          // but it causes bugs when one append calls another (when dynamic dispatch set rawInputValue)
          // this._resetBeforeTailState();
        }

        return details;
      }
      /** */

    }, {
      key: "remove",
      value: function remove() {
        var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
        this._value = this.value.slice(0, fromPos) + this.value.slice(toPos);
        return new ChangeDetails();
      }
      /** Calls function and reapplies current value */

    }, {
      key: "withValueRefresh",
      value: function withValueRefresh(fn) {
        if (this._refreshing || !this.isInitialized) return fn();
        this._refreshing = true;
        var rawInput = this.rawInputValue;
        var value = this.value;
        var ret = fn();
        this.rawInputValue = rawInput; // append lost trailing chars at end

        if (this.value !== value && value.indexOf(this._value) === 0) {
          this.append(value.slice(this._value.length), {}, '');
        }

        delete this._refreshing;
        return ret;
      }
      /** */

    }, {
      key: "runIsolated",
      value: function runIsolated(fn) {
        if (this._isolated || !this.isInitialized) return fn(this);
        this._isolated = true;
        var state = this.state;
        var ret = fn(this);
        this.state = state;
        delete this._isolated;
        return ret;
      }
      /**
        Prepares string before mask processing
        @protected
      */

    }, {
      key: "doPrepare",
      value: function doPrepare(str) {
        var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return this.prepare ? this.prepare(str, this, flags) : str;
      }
      /**
        Validates if value is acceptable
        @protected
      */

    }, {
      key: "doValidate",
      value: function doValidate(flags) {
        return (!this.validate || this.validate(this.value, this, flags)) && (!this.parent || this.parent.doValidate(flags));
      }
      /**
        Does additional processing in the end of editing
        @protected
      */

    }, {
      key: "doCommit",
      value: function doCommit() {
        if (this.commit) this.commit(this.value, this);
      }
      /** */

    }, {
      key: "doFormat",
      value: function doFormat(value) {
        return this.format ? this.format(value, this) : value;
      }
      /** */

    }, {
      key: "doParse",
      value: function doParse(str) {
        return this.parse ? this.parse(str, this) : str;
      }
      /** */

    }, {
      key: "splice",
      value: function splice(start, deleteCount, inserted, removeDirection) {
        var tailPos = start + deleteCount;
        var tail = this.extractTail(tailPos);
        var startChangePos = this.nearestInputPos(start, removeDirection);
        var changeDetails = new ChangeDetails({
          tailShift: startChangePos - start // adjust tailShift if start was aligned

        }).aggregate(this.remove(startChangePos)).aggregate(this.append(inserted, {
          input: true
        }, tail));
        return changeDetails;
      }
    }, {
      key: "state",
      get: function get() {
        return {
          _value: this.value
        };
      },
      set: function set(state) {
        this._value = state._value;
      }
    }, {
      key: "value",
      get: function get() {
        return this._value;
      },
      set: function set(value) {
        this.resolve(value);
      }
    }, {
      key: "unmaskedValue",
      get: function get() {
        return this.value;
      },
      set: function set(value) {
        this.reset();
        this.append(value, {}, '');
        this.doCommit();
      }
      /** */

    }, {
      key: "typedValue",
      get: function get() {
        return this.doParse(this.value);
      },
      set: function set(value) {
        this.value = this.doFormat(value);
      }
      /** Value that includes raw user input */

    }, {
      key: "rawInputValue",
      get: function get() {
        return this.extractInput(0, this.value.length, {
          raw: true
        });
      },
      set: function set(value) {
        this.reset();
        this.append(value, {
          raw: true
        }, '');
        this.doCommit();
      }
      /** */

    }, {
      key: "isComplete",
      get: function get() {
        return true;
      }
    }]);

    return Masked;
  }();

  Masked.DEFAULTS = {
    format: function format(v) {
      return v;
    },
    parse: function parse(v) {
      return v;
    }
  };
  IMask.Masked = Masked;
  /** Get Masked class by mask type */

  function maskedClass(mask) {
    if (mask == null) {
      throw new Error('mask property should be defined');
    } // $FlowFixMe


    if (mask instanceof RegExp) return IMask.MaskedRegExp; // $FlowFixMe

    if (isString(mask)) return IMask.MaskedPattern; // $FlowFixMe

    if (mask instanceof Date || mask === Date) return IMask.MaskedDate; // $FlowFixMe

    if (mask instanceof Number || typeof mask === 'number' || mask === Number) return IMask.MaskedNumber; // $FlowFixMe

    if (Array.isArray(mask) || mask === Array) return IMask.MaskedDynamic; // $FlowFixMe

    if (IMask.Masked && mask.prototype instanceof IMask.Masked) return mask; // $FlowFixMe

    if (mask instanceof Function) return IMask.MaskedFunction;
    console.warn('Mask not found for mask', mask); // eslint-disable-line no-console
    // $FlowFixMe

    return IMask.Masked;
  }
  /** Creates new {@link Masked} depending on mask type */


  function createMask(opts) {
    // $FlowFixMe
    if (IMask.Masked && opts instanceof IMask.Masked) return opts;
    opts = Object.assign({}, opts);
    var mask = opts.mask; // $FlowFixMe

    if (IMask.Masked && mask instanceof IMask.Masked) return mask;
    var MaskedClass = maskedClass(mask);
    if (!MaskedClass) throw new Error('Masked class is not found for provided mask, appropriate module needs to be import manually before creating mask.');
    return new MaskedClass(opts);
  }

  IMask.createMask = createMask;
  var DEFAULT_INPUT_DEFINITIONS = {
    '0': /\d/,
    'a': /[\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
    // http://stackoverflow.com/a/22075070
    '*': /./
  };
  /** */

  var PatternInputDefinition =
  /*#__PURE__*/
  function () {
    /** */

    /** */

    /** */

    /** */

    /** */

    /** */
    function PatternInputDefinition(opts) {
      _classCallCheck(this, PatternInputDefinition);

      var mask = opts.mask,
          blockOpts = _objectWithoutProperties(opts, ["mask"]);

      this.masked = createMask({
        mask: mask
      });
      Object.assign(this, blockOpts);
    }

    _createClass(PatternInputDefinition, [{
      key: "reset",
      value: function reset() {
        this._isFilled = false;
        this.masked.reset();
      }
    }, {
      key: "remove",
      value: function remove() {
        var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;

        if (fromPos === 0 && toPos >= 1) {
          this._isFilled = false;
          return this.masked.remove(fromPos, toPos);
        }

        return new ChangeDetails();
      }
    }, {
      key: "_appendChar",
      value: function _appendChar(str) {
        var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        if (this._isFilled) return new ChangeDetails();
        var state = this.masked.state; // simulate input

        var details = this.masked._appendChar(str, flags);

        if (details.inserted && this.doValidate(flags) === false) {
          details.inserted = details.rawInserted = '';
          this.masked.state = state;
        }

        if (!details.inserted && !this.isOptional && !this.lazy && !flags.input) {
          details.inserted = this.placeholderChar;
        }

        details.skip = !details.inserted && !this.isOptional;
        this._isFilled = Boolean(details.inserted);
        return details;
      }
    }, {
      key: "append",
      value: function append() {
        var _this$masked;

        return (_this$masked = this.masked).append.apply(_this$masked, arguments);
      }
    }, {
      key: "_appendPlaceholder",
      value: function _appendPlaceholder() {
        var details = new ChangeDetails();
        if (this._isFilled || this.isOptional) return details;
        this._isFilled = true;
        details.inserted = this.placeholderChar;
        return details;
      }
    }, {
      key: "extractTail",
      value: function extractTail() {
        var _this$masked2;

        return (_this$masked2 = this.masked).extractTail.apply(_this$masked2, arguments);
      }
    }, {
      key: "appendTail",
      value: function appendTail() {
        var _this$masked3;

        return (_this$masked3 = this.masked).appendTail.apply(_this$masked3, arguments);
      }
    }, {
      key: "extractInput",
      value: function extractInput() {
        var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
        var flags = arguments.length > 2 ? arguments[2] : undefined;
        return this.masked.extractInput(fromPos, toPos, flags);
      }
    }, {
      key: "nearestInputPos",
      value: function nearestInputPos(cursorPos) {
        var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DIRECTION.NONE;
        var minPos = 0;
        var maxPos = this.value.length;
        var boundPos = Math.min(Math.max(cursorPos, minPos), maxPos);

        switch (direction) {
          case DIRECTION.LEFT:
          case DIRECTION.FORCE_LEFT:
            return this.isComplete ? boundPos : minPos;

          case DIRECTION.RIGHT:
          case DIRECTION.FORCE_RIGHT:
            return this.isComplete ? boundPos : maxPos;

          case DIRECTION.NONE:
          default:
            return boundPos;
        }
      }
    }, {
      key: "doValidate",
      value: function doValidate() {
        var _this$masked4, _this$parent;

        return (_this$masked4 = this.masked).doValidate.apply(_this$masked4, arguments) && (!this.parent || (_this$parent = this.parent).doValidate.apply(_this$parent, arguments));
      }
    }, {
      key: "doCommit",
      value: function doCommit() {
        this.masked.doCommit();
      }
    }, {
      key: "value",
      get: function get() {
        return this.masked.value || (this._isFilled && !this.isOptional ? this.placeholderChar : '');
      }
    }, {
      key: "unmaskedValue",
      get: function get() {
        return this.masked.unmaskedValue;
      }
    }, {
      key: "isComplete",
      get: function get() {
        return Boolean(this.masked.value) || this.isOptional;
      }
    }, {
      key: "state",
      get: function get() {
        return {
          masked: this.masked.state,
          _isFilled: this._isFilled
        };
      },
      set: function set(state) {
        this.masked.state = state.masked;
        this._isFilled = state._isFilled;
      }
    }]);

    return PatternInputDefinition;
  }();

  var PatternFixedDefinition =
  /*#__PURE__*/
  function () {
    /** */

    /** */

    /** */

    /** */
    function PatternFixedDefinition(opts) {
      _classCallCheck(this, PatternFixedDefinition);

      Object.assign(this, opts);
      this._value = '';
    }

    _createClass(PatternFixedDefinition, [{
      key: "reset",
      value: function reset() {
        this._isRawInput = false;
        this._value = '';
      }
    }, {
      key: "remove",
      value: function remove() {
        var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._value.length;
        this._value = this._value.slice(0, fromPos) + this._value.slice(toPos);
        if (!this._value) this._isRawInput = false;
        return new ChangeDetails();
      }
    }, {
      key: "nearestInputPos",
      value: function nearestInputPos(cursorPos) {
        var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DIRECTION.NONE;
        var minPos = 0;
        var maxPos = this._value.length;

        switch (direction) {
          case DIRECTION.LEFT:
          case DIRECTION.FORCE_LEFT:
            return minPos;

          case DIRECTION.NONE:
          case DIRECTION.RIGHT:
          case DIRECTION.FORCE_RIGHT:
          default:
            return maxPos;
        }
      }
    }, {
      key: "extractInput",
      value: function extractInput() {
        var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._value.length;
        var flags = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        return flags.raw && this._isRawInput && this._value.slice(fromPos, toPos) || '';
      }
    }, {
      key: "_appendChar",
      value: function _appendChar(str) {
        var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var details = new ChangeDetails();
        if (this._value) return details;
        var appended = this.char === str[0];
        var isResolved = appended && (this.isUnmasking || flags.input || flags.raw) && !flags.tail;
        if (isResolved) details.rawInserted = this.char;
        this._value = details.inserted = this.char;
        this._isRawInput = isResolved && (flags.raw || flags.input);
        return details;
      }
    }, {
      key: "_appendPlaceholder",
      value: function _appendPlaceholder() {
        var details = new ChangeDetails();
        if (this._value) return details;
        this._value = details.inserted = this.char;
        return details;
      }
    }, {
      key: "extractTail",
      value: function extractTail() {
        var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
        return new ContinuousTailDetails('');
      } // $FlowFixMe no ideas

    }, {
      key: "appendTail",
      value: function appendTail(tail) {
        if (isString(tail)) tail = new ContinuousTailDetails(String(tail));
        return tail.appendTo(this);
      }
    }, {
      key: "append",
      value: function append(str, flags, tail) {
        var details = this._appendChar(str, flags);

        if (tail != null) {
          details.tailShift += this.appendTail(tail).tailShift;
        }

        return details;
      }
    }, {
      key: "doCommit",
      value: function doCommit() {}
    }, {
      key: "value",
      get: function get() {
        return this._value;
      }
    }, {
      key: "unmaskedValue",
      get: function get() {
        return this.isUnmasking ? this.value : '';
      }
    }, {
      key: "isComplete",
      get: function get() {
        return true;
      }
    }, {
      key: "state",
      get: function get() {
        return {
          _value: this._value,
          _isRawInput: this._isRawInput
        };
      },
      set: function set(state) {
        Object.assign(this, state);
      }
    }]);

    return PatternFixedDefinition;
  }();

  var ChunksTailDetails =
  /*#__PURE__*/
  function () {
    /** */
    function ChunksTailDetails() {
      var chunks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      _classCallCheck(this, ChunksTailDetails);

      this.chunks = chunks;
      this.from = from;
    }

    _createClass(ChunksTailDetails, [{
      key: "toString",
      value: function toString() {
        return this.chunks.map(String).join('');
      } // $FlowFixMe no ideas

    }, {
      key: "extend",
      value: function extend(tailChunk) {
        if (!String(tailChunk)) return;
        if (isString(tailChunk)) tailChunk = new ContinuousTailDetails(String(tailChunk));
        var lastChunk = this.chunks[this.chunks.length - 1];
        var extendLast = lastChunk && ( // if stops are same or tail has no stop
        lastChunk.stop === tailChunk.stop || tailChunk.stop == null) && // if tail chunk goes just after last chunk
        tailChunk.from === lastChunk.from + lastChunk.toString().length;

        if (tailChunk instanceof ContinuousTailDetails) {
          // check the ability to extend previous chunk
          if (extendLast) {
            // extend previous chunk
            lastChunk.extend(tailChunk.toString());
          } else {
            // append new chunk
            this.chunks.push(tailChunk);
          }
        } else if (tailChunk instanceof ChunksTailDetails) {
          if (tailChunk.stop == null) {
            // unwrap floating chunks to parent, keeping `from` pos
            var firstTailChunk;

            while (tailChunk.chunks.length && tailChunk.chunks[0].stop == null) {
              firstTailChunk = tailChunk.chunks.shift();
              firstTailChunk.from += tailChunk.from;
              this.extend(firstTailChunk);
            }
          } // if tail chunk still has value


          if (tailChunk.toString()) {
            // if chunks contains stops, then popup stop to container
            tailChunk.stop = tailChunk.blockIndex;
            this.chunks.push(tailChunk);
          }
        }
      }
    }, {
      key: "appendTo",
      value: function appendTo(masked) {
        // $FlowFixMe
        if (!(masked instanceof IMask.MaskedPattern)) {
          var tail = new ContinuousTailDetails(this.toString());
          return tail.appendTo(masked);
        }

        var details = new ChangeDetails();

        for (var ci = 0; ci < this.chunks.length && !details.skip; ++ci) {
          var chunk = this.chunks[ci];

          var lastBlockIter = masked._mapPosToBlock(masked.value.length);

          var stop = chunk.stop;
          var chunkBlock = void 0;

          if (stop && ( // if block not found or stop is behind lastBlock
          !lastBlockIter || lastBlockIter.index <= stop)) {
            if (chunk instanceof ChunksTailDetails || // for continuous block also check if stop is exist
            masked._stops.indexOf(stop) >= 0) {
              details.aggregate(masked._appendPlaceholder(stop));
            }

            chunkBlock = chunk instanceof ChunksTailDetails && masked._blocks[stop];
          }

          if (chunkBlock) {
            var tailDetails = chunkBlock.appendTail(chunk);
            tailDetails.skip = false; // always ignore skip, it will be set on last

            details.aggregate(tailDetails);
            masked._value += tailDetails.inserted; // get not inserted chars

            var remainChars = chunk.toString().slice(tailDetails.rawInserted.length);
            if (remainChars) details.aggregate(masked.append(remainChars, {
              tail: true
            }));
          } else {
            details.aggregate(masked.append(chunk.toString(), {
              tail: true
            }));
          }
        }

        return details;
      }
    }, {
      key: "shiftBefore",
      value: function shiftBefore(pos) {
        if (this.from >= pos || !this.chunks.length) return '';
        var chunkShiftPos = pos - this.from;
        var ci = 0;

        while (ci < this.chunks.length) {
          var chunk = this.chunks[ci];
          var shiftChar = chunk.shiftBefore(chunkShiftPos);

          if (chunk.toString()) {
            // chunk still contains value
            // but not shifted - means no more available chars to shift
            if (!shiftChar) break;
            ++ci;
          } else {
            // clean if chunk has no value
            this.chunks.splice(ci, 1);
          }

          if (shiftChar) return shiftChar;
        }

        return '';
      }
    }, {
      key: "state",
      get: function get() {
        return {
          chunks: this.chunks.map(function (c) {
            return c.state;
          }),
          from: this.from,
          stop: this.stop,
          blockIndex: this.blockIndex
        };
      },
      set: function set(state) {
        var chunks = state.chunks,
            props = _objectWithoutProperties(state, ["chunks"]);

        Object.assign(this, props);
        this.chunks = chunks.map(function (cstate) {
          var chunk = "chunks" in cstate ? new ChunksTailDetails() : new ContinuousTailDetails(); // $FlowFixMe already checked above

          chunk.state = cstate;
          return chunk;
        });
      }
    }]);

    return ChunksTailDetails;
  }();
  /**
    Pattern mask
    @param {Object} opts
    @param {Object} opts.blocks
    @param {Object} opts.definitions
    @param {string} opts.placeholderChar
    @param {boolean} opts.lazy
  */


  var MaskedPattern =
  /*#__PURE__*/
  function (_Masked) {
    _inherits(MaskedPattern, _Masked);
    /** */

    /** */

    /** Single char for empty input */

    /** Show placeholder only when needed */


    function MaskedPattern() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, MaskedPattern); // TODO type $Shape<MaskedPatternOptions>={} does not work


      opts.definitions = Object.assign({}, DEFAULT_INPUT_DEFINITIONS, opts.definitions);
      return _possibleConstructorReturn(this, _getPrototypeOf(MaskedPattern).call(this, Object.assign({}, MaskedPattern.DEFAULTS, {}, opts)));
    }
    /**
      @override
      @param {Object} opts
    */


    _createClass(MaskedPattern, [{
      key: "_update",
      value: function _update() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        opts.definitions = Object.assign({}, this.definitions, opts.definitions);

        _get(_getPrototypeOf(MaskedPattern.prototype), "_update", this).call(this, opts);

        this._rebuildMask();
      }
      /** */

    }, {
      key: "_rebuildMask",
      value: function _rebuildMask() {
        var _this = this;

        var defs = this.definitions;
        this._blocks = [];
        this._stops = [];
        this._maskedBlocks = {};
        var pattern = this.mask;
        if (!pattern || !defs) return;
        var unmaskingBlock = false;
        var optionalBlock = false;

        for (var i = 0; i < pattern.length; ++i) {
          if (this.blocks) {
            var _ret = function () {
              var p = pattern.slice(i);
              var bNames = Object.keys(_this.blocks).filter(function (bName) {
                return p.indexOf(bName) === 0;
              }); // order by key length

              bNames.sort(function (a, b) {
                return b.length - a.length;
              }); // use block name with max length

              var bName = bNames[0];

              if (bName) {
                var maskedBlock = createMask(Object.assign({
                  parent: _this,
                  lazy: _this.lazy,
                  placeholderChar: _this.placeholderChar,
                  overwrite: _this.overwrite
                }, _this.blocks[bName]));

                if (maskedBlock) {
                  _this._blocks.push(maskedBlock); // store block index


                  if (!_this._maskedBlocks[bName]) _this._maskedBlocks[bName] = [];

                  _this._maskedBlocks[bName].push(_this._blocks.length - 1);
                }

                i += bName.length - 1;
                return "continue";
              }
            }();

            if (_ret === "continue") continue;
          }

          var char = pattern[i];

          var _isInput = char in defs;

          if (char === MaskedPattern.STOP_CHAR) {
            this._stops.push(this._blocks.length);

            continue;
          }

          if (char === '{' || char === '}') {
            unmaskingBlock = !unmaskingBlock;
            continue;
          }

          if (char === '[' || char === ']') {
            optionalBlock = !optionalBlock;
            continue;
          }

          if (char === MaskedPattern.ESCAPE_CHAR) {
            ++i;
            char = pattern[i];
            if (!char) break;
            _isInput = false;
          }

          var def = _isInput ? new PatternInputDefinition({
            parent: this,
            lazy: this.lazy,
            placeholderChar: this.placeholderChar,
            mask: defs[char],
            isOptional: optionalBlock
          }) : new PatternFixedDefinition({
            char: char,
            isUnmasking: unmaskingBlock
          });

          this._blocks.push(def);
        }
      }
      /**
        @override
      */

    }, {
      key: "reset",

      /**
        @override
      */
      value: function reset() {
        _get(_getPrototypeOf(MaskedPattern.prototype), "reset", this).call(this);

        this._blocks.forEach(function (b) {
          return b.reset();
        });
      }
      /**
        @override
      */

    }, {
      key: "doCommit",

      /**
        @override
      */
      value: function doCommit() {
        this._blocks.forEach(function (b) {
          return b.doCommit();
        });

        _get(_getPrototypeOf(MaskedPattern.prototype), "doCommit", this).call(this);
      }
      /**
        @override
      */

    }, {
      key: "appendTail",

      /**
        @override
      */
      value: function appendTail(tail) {
        return _get(_getPrototypeOf(MaskedPattern.prototype), "appendTail", this).call(this, tail).aggregate(this._appendPlaceholder());
      }
      /**
        @override
      */

    }, {
      key: "_appendCharRaw",
      value: function _appendCharRaw(ch) {
        var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        ch = this.doPrepare(ch, flags);

        var blockIter = this._mapPosToBlock(this.value.length);

        var details = new ChangeDetails();
        if (!blockIter) return details;

        for (var bi = blockIter.index;; ++bi) {
          var _block = this._blocks[bi];
          if (!_block) break;

          var blockDetails = _block._appendChar(ch, flags);

          var skip = blockDetails.skip;
          details.aggregate(blockDetails);
          if (skip || blockDetails.rawInserted) break; // go next char
        }

        return details;
      }
      /**
        @override
      */

    }, {
      key: "extractTail",
      value: function extractTail() {
        var _this2 = this;

        var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
        var chunkTail = new ChunksTailDetails();
        if (fromPos === toPos) return chunkTail;

        this._forEachBlocksInRange(fromPos, toPos, function (b, bi, bFromPos, bToPos) {
          var blockChunk = b.extractTail(bFromPos, bToPos);
          blockChunk.stop = _this2._findStopBefore(bi);
          blockChunk.from = _this2._blockStartPos(bi);
          if (blockChunk instanceof ChunksTailDetails) blockChunk.blockIndex = bi;
          chunkTail.extend(blockChunk);
        });

        return chunkTail;
      }
      /**
        @override
      */

    }, {
      key: "extractInput",
      value: function extractInput() {
        var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
        var flags = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        if (fromPos === toPos) return '';
        var input = '';

        this._forEachBlocksInRange(fromPos, toPos, function (b, _, fromPos, toPos) {
          input += b.extractInput(fromPos, toPos, flags);
        });

        return input;
      }
    }, {
      key: "_findStopBefore",
      value: function _findStopBefore(blockIndex) {
        var stopBefore;

        for (var si = 0; si < this._stops.length; ++si) {
          var stop = this._stops[si];
          if (stop <= blockIndex) stopBefore = stop;else break;
        }

        return stopBefore;
      }
      /** Appends placeholder depending on laziness */

    }, {
      key: "_appendPlaceholder",
      value: function _appendPlaceholder(toBlockIndex) {
        var _this3 = this;

        var details = new ChangeDetails();
        if (this.lazy && toBlockIndex == null) return details;

        var startBlockIter = this._mapPosToBlock(this.value.length);

        if (!startBlockIter) return details;
        var startBlockIndex = startBlockIter.index;
        var endBlockIndex = toBlockIndex != null ? toBlockIndex : this._blocks.length;

        this._blocks.slice(startBlockIndex, endBlockIndex).forEach(function (b) {
          if (!b.lazy || toBlockIndex != null) {
            // $FlowFixMe `_blocks` may not be present
            var args = b._blocks != null ? [b._blocks.length] : [];

            var bDetails = b._appendPlaceholder.apply(b, args);

            _this3._value += bDetails.inserted;
            details.aggregate(bDetails);
          }
        });

        return details;
      }
      /** Finds block in pos */

    }, {
      key: "_mapPosToBlock",
      value: function _mapPosToBlock(pos) {
        var accVal = '';

        for (var bi = 0; bi < this._blocks.length; ++bi) {
          var _block2 = this._blocks[bi];
          var blockStartPos = accVal.length;
          accVal += _block2.value;

          if (pos <= accVal.length) {
            return {
              index: bi,
              offset: pos - blockStartPos
            };
          }
        }
      }
      /** */

    }, {
      key: "_blockStartPos",
      value: function _blockStartPos(blockIndex) {
        return this._blocks.slice(0, blockIndex).reduce(function (pos, b) {
          return pos += b.value.length;
        }, 0);
      }
      /** */

    }, {
      key: "_forEachBlocksInRange",
      value: function _forEachBlocksInRange(fromPos) {
        var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
        var fn = arguments.length > 2 ? arguments[2] : undefined;

        var fromBlockIter = this._mapPosToBlock(fromPos);

        if (fromBlockIter) {
          var toBlockIter = this._mapPosToBlock(toPos); // process first block


          var isSameBlock = toBlockIter && fromBlockIter.index === toBlockIter.index;
          var fromBlockStartPos = fromBlockIter.offset;
          var fromBlockEndPos = toBlockIter && isSameBlock ? toBlockIter.offset : this._blocks[fromBlockIter.index].value.length;
          fn(this._blocks[fromBlockIter.index], fromBlockIter.index, fromBlockStartPos, fromBlockEndPos);

          if (toBlockIter && !isSameBlock) {
            // process intermediate blocks
            for (var bi = fromBlockIter.index + 1; bi < toBlockIter.index; ++bi) {
              fn(this._blocks[bi], bi, 0, this._blocks[bi].value.length);
            } // process last block


            fn(this._blocks[toBlockIter.index], toBlockIter.index, 0, toBlockIter.offset);
          }
        }
      }
      /**
        @override
      */

    }, {
      key: "remove",
      value: function remove() {
        var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;

        var removeDetails = _get(_getPrototypeOf(MaskedPattern.prototype), "remove", this).call(this, fromPos, toPos);

        this._forEachBlocksInRange(fromPos, toPos, function (b, _, bFromPos, bToPos) {
          removeDetails.aggregate(b.remove(bFromPos, bToPos));
        });

        return removeDetails;
      }
      /**
        @override
      */

    }, {
      key: "nearestInputPos",
      value: function nearestInputPos(cursorPos) {
        var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DIRECTION.NONE; // TODO refactor - extract alignblock

        var beginBlockData = this._mapPosToBlock(cursorPos) || {
          index: 0,
          offset: 0
        };
        var beginBlockOffset = beginBlockData.offset,
            beginBlockIndex = beginBlockData.index;
        var beginBlock = this._blocks[beginBlockIndex];
        if (!beginBlock) return cursorPos;
        var beginBlockCursorPos = beginBlockOffset; // if position inside block - try to adjust it

        if (beginBlockCursorPos !== 0 && beginBlockCursorPos < beginBlock.value.length) {
          beginBlockCursorPos = beginBlock.nearestInputPos(beginBlockOffset, forceDirection(direction));
        }

        var cursorAtRight = beginBlockCursorPos === beginBlock.value.length;
        var cursorAtLeft = beginBlockCursorPos === 0; //  cursor is INSIDE first block (not at bounds)

        if (!cursorAtLeft && !cursorAtRight) return this._blockStartPos(beginBlockIndex) + beginBlockCursorPos;
        var searchBlockIndex = cursorAtRight ? beginBlockIndex + 1 : beginBlockIndex;

        if (direction === DIRECTION.NONE) {
          // NONE direction used to calculate start input position if no chars were removed
          // FOR NONE:
          // -
          // input|any
          // ->
          //  any|input
          // <-
          //  filled-input|any
          // check if first block at left is input
          if (searchBlockIndex > 0) {
            var blockIndexAtLeft = searchBlockIndex - 1;
            var blockAtLeft = this._blocks[blockIndexAtLeft];
            var blockInputPos = blockAtLeft.nearestInputPos(0, DIRECTION.NONE); // is input

            if (!blockAtLeft.value.length || blockInputPos !== blockAtLeft.value.length) {
              return this._blockStartPos(searchBlockIndex);
            }
          } // ->


          var firstInputAtRight = searchBlockIndex;

          for (var bi = firstInputAtRight; bi < this._blocks.length; ++bi) {
            var blockAtRight = this._blocks[bi];

            var _blockInputPos = blockAtRight.nearestInputPos(0, DIRECTION.NONE);

            if (!blockAtRight.value.length || _blockInputPos !== blockAtRight.value.length) {
              return this._blockStartPos(bi) + _blockInputPos;
            }
          } // <-
          // find first non-fixed symbol


          for (var _bi = searchBlockIndex - 1; _bi >= 0; --_bi) {
            var _block3 = this._blocks[_bi];

            var _blockInputPos2 = _block3.nearestInputPos(0, DIRECTION.NONE); // is input


            if (!_block3.value.length || _blockInputPos2 !== _block3.value.length) {
              return this._blockStartPos(_bi) + _block3.value.length;
            }
          }

          return cursorPos;
        }

        if (direction === DIRECTION.LEFT || direction === DIRECTION.FORCE_LEFT) {
          // -
          //  any|filled-input
          // <-
          //  any|first not empty is not-len-aligned
          //  not-0-aligned|any
          // ->
          //  any|not-len-aligned or end
          // check if first block at right is filled input
          var firstFilledBlockIndexAtRight;

          for (var _bi2 = searchBlockIndex; _bi2 < this._blocks.length; ++_bi2) {
            if (this._blocks[_bi2].value) {
              firstFilledBlockIndexAtRight = _bi2;
              break;
            }
          }

          if (firstFilledBlockIndexAtRight != null) {
            var filledBlock = this._blocks[firstFilledBlockIndexAtRight];

            var _blockInputPos3 = filledBlock.nearestInputPos(0, DIRECTION.RIGHT);

            if (_blockInputPos3 === 0 && filledBlock.unmaskedValue.length) {
              // filled block is input
              return this._blockStartPos(firstFilledBlockIndexAtRight) + _blockInputPos3;
            }
          } // <-
          // find this vars


          var firstFilledInputBlockIndex = -1;
          var firstEmptyInputBlockIndex; // TODO consider nested empty inputs

          for (var _bi3 = searchBlockIndex - 1; _bi3 >= 0; --_bi3) {
            var _block4 = this._blocks[_bi3];

            var _blockInputPos4 = _block4.nearestInputPos(_block4.value.length, DIRECTION.FORCE_LEFT);

            if (!_block4.value || _blockInputPos4 !== 0) firstEmptyInputBlockIndex = _bi3;

            if (_blockInputPos4 !== 0) {
              if (_blockInputPos4 !== _block4.value.length) {
                // aligned inside block - return immediately
                return this._blockStartPos(_bi3) + _blockInputPos4;
              } else {
                // found filled
                firstFilledInputBlockIndex = _bi3;
                break;
              }
            }
          }

          if (direction === DIRECTION.LEFT) {
            // try find first empty input before start searching position only when not forced
            for (var _bi4 = firstFilledInputBlockIndex + 1; _bi4 <= Math.min(searchBlockIndex, this._blocks.length - 1); ++_bi4) {
              var _block5 = this._blocks[_bi4];

              var _blockInputPos5 = _block5.nearestInputPos(0, DIRECTION.NONE);

              var blockAlignedPos = this._blockStartPos(_bi4) + _blockInputPos5;

              if (blockAlignedPos > cursorPos) break; // if block is not lazy input

              if (_blockInputPos5 !== _block5.value.length) return blockAlignedPos;
            }
          } // process overflow


          if (firstFilledInputBlockIndex >= 0) {
            return this._blockStartPos(firstFilledInputBlockIndex) + this._blocks[firstFilledInputBlockIndex].value.length;
          } // for lazy if has aligned left inside fixed and has came to the start - use start position


          if (direction === DIRECTION.FORCE_LEFT || this.lazy && !this.extractInput() && !isInput(this._blocks[searchBlockIndex])) {
            return 0;
          }

          if (firstEmptyInputBlockIndex != null) {
            return this._blockStartPos(firstEmptyInputBlockIndex);
          } // find first input


          for (var _bi5 = searchBlockIndex; _bi5 < this._blocks.length; ++_bi5) {
            var _block6 = this._blocks[_bi5];

            var _blockInputPos6 = _block6.nearestInputPos(0, DIRECTION.NONE); // is input


            if (!_block6.value.length || _blockInputPos6 !== _block6.value.length) {
              return this._blockStartPos(_bi5) + _blockInputPos6;
            }
          }

          return 0;
        }

        if (direction === DIRECTION.RIGHT || direction === DIRECTION.FORCE_RIGHT) {
          // ->
          //  any|not-len-aligned and filled
          //  any|not-len-aligned
          // <-
          //  not-0-aligned or start|any
          var firstInputBlockAlignedIndex;
          var firstInputBlockAlignedPos;

          for (var _bi6 = searchBlockIndex; _bi6 < this._blocks.length; ++_bi6) {
            var _block7 = this._blocks[_bi6];

            var _blockInputPos7 = _block7.nearestInputPos(0, DIRECTION.NONE);

            if (_blockInputPos7 !== _block7.value.length) {
              firstInputBlockAlignedPos = this._blockStartPos(_bi6) + _blockInputPos7;
              firstInputBlockAlignedIndex = _bi6;
              break;
            }
          }

          if (firstInputBlockAlignedIndex != null && firstInputBlockAlignedPos != null) {
            for (var _bi7 = firstInputBlockAlignedIndex; _bi7 < this._blocks.length; ++_bi7) {
              var _block8 = this._blocks[_bi7];

              var _blockInputPos8 = _block8.nearestInputPos(0, DIRECTION.FORCE_RIGHT);

              if (_blockInputPos8 !== _block8.value.length) {
                return this._blockStartPos(_bi7) + _blockInputPos8;
              }
            }

            return direction === DIRECTION.FORCE_RIGHT ? this.value.length : firstInputBlockAlignedPos;
          }

          for (var _bi8 = Math.min(searchBlockIndex, this._blocks.length - 1); _bi8 >= 0; --_bi8) {
            var _block9 = this._blocks[_bi8];

            var _blockInputPos9 = _block9.nearestInputPos(_block9.value.length, DIRECTION.LEFT);

            if (_blockInputPos9 !== 0) {
              var alignedPos = this._blockStartPos(_bi8) + _blockInputPos9;

              if (alignedPos >= cursorPos) return alignedPos;
              break;
            }
          }
        }

        return cursorPos;
      }
      /** Get block by name */

    }, {
      key: "maskedBlock",
      value: function maskedBlock(name) {
        return this.maskedBlocks(name)[0];
      }
      /** Get all blocks by name */

    }, {
      key: "maskedBlocks",
      value: function maskedBlocks(name) {
        var _this4 = this;

        var indices = this._maskedBlocks[name];
        if (!indices) return [];
        return indices.map(function (gi) {
          return _this4._blocks[gi];
        });
      }
    }, {
      key: "state",
      get: function get() {
        return Object.assign({}, _get(_getPrototypeOf(MaskedPattern.prototype), "state", this), {
          _blocks: this._blocks.map(function (b) {
            return b.state;
          })
        });
      },
      set: function set(state) {
        var _blocks = state._blocks,
            maskedState = _objectWithoutProperties(state, ["_blocks"]);

        this._blocks.forEach(function (b, bi) {
          return b.state = _blocks[bi];
        });

        _set(_getPrototypeOf(MaskedPattern.prototype), "state", maskedState, this, true);
      }
    }, {
      key: "isComplete",
      get: function get() {
        return this._blocks.every(function (b) {
          return b.isComplete;
        });
      }
    }, {
      key: "unmaskedValue",
      get: function get() {
        return this._blocks.reduce(function (str, b) {
          return str += b.unmaskedValue;
        }, '');
      },
      set: function set(unmaskedValue) {
        _set(_getPrototypeOf(MaskedPattern.prototype), "unmaskedValue", unmaskedValue, this, true);
      }
      /**
        @override
      */

    }, {
      key: "value",
      get: function get() {
        // TODO return _value when not in change?
        return this._blocks.reduce(function (str, b) {
          return str += b.value;
        }, '');
      },
      set: function set(value) {
        _set(_getPrototypeOf(MaskedPattern.prototype), "value", value, this, true);
      }
    }]);

    return MaskedPattern;
  }(Masked);

  MaskedPattern.DEFAULTS = {
    lazy: true,
    placeholderChar: '_'
  };
  MaskedPattern.STOP_CHAR = '`';
  MaskedPattern.ESCAPE_CHAR = '\\';
  MaskedPattern.InputDefinition = PatternInputDefinition;
  MaskedPattern.FixedDefinition = PatternFixedDefinition;

  function isInput(block) {
    if (!block) return false;
    var value = block.value;
    return !value || block.nearestInputPos(0, DIRECTION.NONE) !== value.length;
  }

  IMask.MaskedPattern = MaskedPattern;
  /** Pattern which accepts ranges */

  var MaskedRange =
  /*#__PURE__*/
  function (_MaskedPattern) {
    _inherits(MaskedRange, _MaskedPattern);

    function MaskedRange() {
      _classCallCheck(this, MaskedRange);

      return _possibleConstructorReturn(this, _getPrototypeOf(MaskedRange).apply(this, arguments));
    }

    _createClass(MaskedRange, [{
      key: "_update",

      /**
        @override
      */
      value: function _update(opts) {
        // TODO type
        opts = Object.assign({
          to: this.to || 0,
          from: this.from || 0
        }, opts);
        var maxLength = String(opts.to).length;
        if (opts.maxLength != null) maxLength = Math.max(maxLength, opts.maxLength);
        opts.maxLength = maxLength;
        var fromStr = String(opts.from).padStart(maxLength, '0');
        var toStr = String(opts.to).padStart(maxLength, '0');
        var sameCharsCount = 0;

        while (sameCharsCount < toStr.length && toStr[sameCharsCount] === fromStr[sameCharsCount]) {
          ++sameCharsCount;
        }

        opts.mask = toStr.slice(0, sameCharsCount).replace(/0/g, '\\0') + '0'.repeat(maxLength - sameCharsCount);

        _get(_getPrototypeOf(MaskedRange.prototype), "_update", this).call(this, opts);
      }
      /**
        @override
      */

    }, {
      key: "boundaries",
      value: function boundaries(str) {
        var minstr = '';
        var maxstr = '';

        var _ref = str.match(/^(\D*)(\d*)(\D*)/) || [],
            _ref2 = _slicedToArray(_ref, 3),
            placeholder = _ref2[1],
            num = _ref2[2];

        if (num) {
          minstr = '0'.repeat(placeholder.length) + num;
          maxstr = '9'.repeat(placeholder.length) + num;
        }

        minstr = minstr.padEnd(this.maxLength, '0');
        maxstr = maxstr.padEnd(this.maxLength, '9');
        return [minstr, maxstr];
      }
      /**
        @override
      */

    }, {
      key: "doPrepare",
      value: function doPrepare(str) {
        var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        str = _get(_getPrototypeOf(MaskedRange.prototype), "doPrepare", this).call(this, str, flags).replace(/\D/g, '');
        if (!this.autofix) return str;
        var fromStr = String(this.from).padStart(this.maxLength, '0');
        var toStr = String(this.to).padStart(this.maxLength, '0');
        var val = this.value;
        var prepStr = '';

        for (var ci = 0; ci < str.length; ++ci) {
          var nextVal = val + prepStr + str[ci];

          var _this$boundaries = this.boundaries(nextVal),
              _this$boundaries2 = _slicedToArray(_this$boundaries, 2),
              minstr = _this$boundaries2[0],
              maxstr = _this$boundaries2[1];

          if (Number(maxstr) < this.from) prepStr += fromStr[nextVal.length - 1];else if (Number(minstr) > this.to) prepStr += toStr[nextVal.length - 1];else prepStr += str[ci];
        }

        return prepStr;
      }
      /**
        @override
      */

    }, {
      key: "doValidate",
      value: function doValidate() {
        var _get2;

        var str = this.value;
        var firstNonZero = str.search(/[^0]/);
        if (firstNonZero === -1 && str.length <= this._matchFrom) return true;

        var _this$boundaries3 = this.boundaries(str),
            _this$boundaries4 = _slicedToArray(_this$boundaries3, 2),
            minstr = _this$boundaries4[0],
            maxstr = _this$boundaries4[1];

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return this.from <= Number(maxstr) && Number(minstr) <= this.to && (_get2 = _get(_getPrototypeOf(MaskedRange.prototype), "doValidate", this)).call.apply(_get2, [this].concat(args));
      }
    }, {
      key: "_matchFrom",

      /**
        Optionally sets max length of pattern.
        Used when pattern length is longer then `to` param length. Pads zeros at start in this case.
      */

      /** Min bound */

      /** Max bound */

      /** */
      get: function get() {
        return this.maxLength - String(this.from).length;
      }
    }, {
      key: "isComplete",
      get: function get() {
        return _get(_getPrototypeOf(MaskedRange.prototype), "isComplete", this) && Boolean(this.value);
      }
    }]);

    return MaskedRange;
  }(MaskedPattern);

  IMask.MaskedRange = MaskedRange;
  /** Date mask */

  var MaskedDate =
  /*#__PURE__*/
  function (_MaskedPattern) {
    _inherits(MaskedDate, _MaskedPattern);
    /** Pattern mask for date according to {@link MaskedDate#format} */

    /** Start date */

    /** End date */

    /** */

    /**
      @param {Object} opts
    */


    function MaskedDate(opts) {
      _classCallCheck(this, MaskedDate);

      return _possibleConstructorReturn(this, _getPrototypeOf(MaskedDate).call(this, Object.assign({}, MaskedDate.DEFAULTS, {}, opts)));
    }
    /**
      @override
    */


    _createClass(MaskedDate, [{
      key: "_update",
      value: function _update(opts) {
        if (opts.mask === Date) delete opts.mask;
        if (opts.pattern) opts.mask = opts.pattern;
        var blocks = opts.blocks;
        opts.blocks = Object.assign({}, MaskedDate.GET_DEFAULT_BLOCKS()); // adjust year block

        if (opts.min) opts.blocks.Y.from = opts.min.getFullYear();
        if (opts.max) opts.blocks.Y.to = opts.max.getFullYear();

        if (opts.min && opts.max && opts.blocks.Y.from === opts.blocks.Y.to) {
          opts.blocks.m.from = opts.min.getMonth() + 1;
          opts.blocks.m.to = opts.max.getMonth() + 1;

          if (opts.blocks.m.from === opts.blocks.m.to) {
            opts.blocks.d.from = opts.min.getDate();
            opts.blocks.d.to = opts.max.getDate();
          }
        }

        Object.assign(opts.blocks, blocks); // add autofix

        Object.keys(opts.blocks).forEach(function (bk) {
          var b = opts.blocks[bk];
          if (!('autofix' in b)) b.autofix = opts.autofix;
        });

        _get(_getPrototypeOf(MaskedDate.prototype), "_update", this).call(this, opts);
      }
      /**
        @override
      */

    }, {
      key: "doValidate",
      value: function doValidate() {
        var _get2;

        var date = this.date;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return (_get2 = _get(_getPrototypeOf(MaskedDate.prototype), "doValidate", this)).call.apply(_get2, [this].concat(args)) && (!this.isComplete || this.isDateExist(this.value) && date != null && (this.min == null || this.min <= date) && (this.max == null || date <= this.max));
      }
      /** Checks if date is exists */

    }, {
      key: "isDateExist",
      value: function isDateExist(str) {
        return this.format(this.parse(str, this), this).indexOf(str) >= 0;
      }
      /** Parsed Date */

    }, {
      key: "date",
      get: function get() {
        return this.typedValue;
      },
      set: function set(date) {
        this.typedValue = date;
      }
      /**
        @override
      */

    }, {
      key: "typedValue",
      get: function get() {
        return this.isComplete ? _get(_getPrototypeOf(MaskedDate.prototype), "typedValue", this) : null;
      },
      set: function set(value) {
        _set(_getPrototypeOf(MaskedDate.prototype), "typedValue", value, this, true);
      }
    }]);

    return MaskedDate;
  }(MaskedPattern);

  MaskedDate.DEFAULTS = {
    pattern: 'd{.}`m{.}`Y',
    format: function format(date) {
      var day = String(date.getDate()).padStart(2, '0');
      var month = String(date.getMonth() + 1).padStart(2, '0');
      var year = date.getFullYear();
      return [day, month, year].join('.');
    },
    parse: function parse(str) {
      var _str$split = str.split('.'),
          _str$split2 = _slicedToArray(_str$split, 3),
          day = _str$split2[0],
          month = _str$split2[1],
          year = _str$split2[2];

      return new Date(year, month - 1, day);
    }
  };

  MaskedDate.GET_DEFAULT_BLOCKS = function () {
    return {
      d: {
        mask: MaskedRange,
        from: 1,
        to: 31,
        maxLength: 2
      },
      m: {
        mask: MaskedRange,
        from: 1,
        to: 12,
        maxLength: 2
      },
      Y: {
        mask: MaskedRange,
        from: 1900,
        to: 9999
      }
    };
  };

  IMask.MaskedDate = MaskedDate;
  /**
    Generic element API to use with mask
    @interface
  */

  var MaskElement =
  /*#__PURE__*/
  function () {
    function MaskElement() {
      _classCallCheck(this, MaskElement);
    }

    _createClass(MaskElement, [{
      key: "select",

      /** Safely sets element selection */
      value: function select(start, end) {
        if (start == null || end == null || start === this.selectionStart && end === this.selectionEnd) return;

        try {
          this._unsafeSelect(start, end);
        } catch (e) {}
      }
      /** Should be overriden in subclasses */

    }, {
      key: "_unsafeSelect",
      value: function _unsafeSelect(start, end) {}
      /** Should be overriden in subclasses */

    }, {
      key: "bindEvents",

      /** Should be overriden in subclasses */
      value: function bindEvents(handlers) {}
      /** Should be overriden in subclasses */

    }, {
      key: "unbindEvents",
      value: function unbindEvents() {}
    }, {
      key: "selectionStart",

      /** */

      /** */

      /** */

      /** Safely returns selection start */
      get: function get() {
        var start;

        try {
          start = this._unsafeSelectionStart;
        } catch (e) {}

        return start != null ? start : this.value.length;
      }
      /** Safely returns selection end */

    }, {
      key: "selectionEnd",
      get: function get() {
        var end;

        try {
          end = this._unsafeSelectionEnd;
        } catch (e) {}

        return end != null ? end : this.value.length;
      }
    }, {
      key: "isActive",
      get: function get() {
        return false;
      }
    }]);

    return MaskElement;
  }();

  IMask.MaskElement = MaskElement;
  /** Bridge between HTMLElement and {@link Masked} */

  var HTMLMaskElement =
  /*#__PURE__*/
  function (_MaskElement) {
    _inherits(HTMLMaskElement, _MaskElement);
    /** Mapping between HTMLElement events and mask internal events */

    /** HTMLElement to use mask on */

    /**
      @param {HTMLInputElement|HTMLTextAreaElement} input
    */


    function HTMLMaskElement(input) {
      var _this;

      _classCallCheck(this, HTMLMaskElement);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(HTMLMaskElement).call(this));
      _this.input = input;
      _this._handlers = {};
      return _this;
    }
    /** */
    // $FlowFixMe https://github.com/facebook/flow/issues/2839


    _createClass(HTMLMaskElement, [{
      key: "_unsafeSelect",

      /**
        Sets HTMLElement selection
        @override
      */
      value: function _unsafeSelect(start, end) {
        this.input.setSelectionRange(start, end);
      }
      /**
        HTMLElement value
        @override
      */

    }, {
      key: "bindEvents",

      /**
        Binds HTMLElement events to mask internal events
        @override
      */
      value: function bindEvents(handlers) {
        var _this2 = this;

        Object.keys(handlers).forEach(function (event) {
          return _this2._toggleEventHandler(HTMLMaskElement.EVENTS_MAP[event], handlers[event]);
        });
      }
      /**
        Unbinds HTMLElement events to mask internal events
        @override
      */

    }, {
      key: "unbindEvents",
      value: function unbindEvents() {
        var _this3 = this;

        Object.keys(this._handlers).forEach(function (event) {
          return _this3._toggleEventHandler(event);
        });
      }
      /** */

    }, {
      key: "_toggleEventHandler",
      value: function _toggleEventHandler(event, handler) {
        if (this._handlers[event]) {
          this.input.removeEventListener(event, this._handlers[event]);
          delete this._handlers[event];
        }

        if (handler) {
          this.input.addEventListener(event, handler);
          this._handlers[event] = handler;
        }
      }
    }, {
      key: "rootElement",
      get: function get() {
        return this.input.getRootNode ? this.input.getRootNode() : document;
      }
      /**
        Is element in focus
        @readonly
      */

    }, {
      key: "isActive",
      get: function get() {
        //$FlowFixMe
        return this.input === this.rootElement.activeElement;
      }
      /**
        Returns HTMLElement selection start
        @override
      */

    }, {
      key: "_unsafeSelectionStart",
      get: function get() {
        return this.input.selectionStart;
      }
      /**
        Returns HTMLElement selection end
        @override
      */

    }, {
      key: "_unsafeSelectionEnd",
      get: function get() {
        return this.input.selectionEnd;
      }
    }, {
      key: "value",
      get: function get() {
        return this.input.value;
      },
      set: function set(value) {
        this.input.value = value;
      }
    }]);

    return HTMLMaskElement;
  }(MaskElement);

  HTMLMaskElement.EVENTS_MAP = {
    selectionChange: 'keydown',
    input: 'input',
    drop: 'drop',
    click: 'click',
    focus: 'focus',
    commit: 'blur'
  };
  IMask.HTMLMaskElement = HTMLMaskElement;

  var HTMLContenteditableMaskElement =
  /*#__PURE__*/
  function (_HTMLMaskElement) {
    _inherits(HTMLContenteditableMaskElement, _HTMLMaskElement);

    function HTMLContenteditableMaskElement() {
      _classCallCheck(this, HTMLContenteditableMaskElement);

      return _possibleConstructorReturn(this, _getPrototypeOf(HTMLContenteditableMaskElement).apply(this, arguments));
    }

    _createClass(HTMLContenteditableMaskElement, [{
      key: "_unsafeSelect",

      /**
        Sets HTMLElement selection
        @override
      */
      value: function _unsafeSelect(start, end) {
        if (!this.rootElement.createRange) return;
        var range = this.rootElement.createRange();
        range.setStart(this.input.firstChild || this.input, start);
        range.setEnd(this.input.lastChild || this.input, end);
        var root = this.rootElement;
        var selection = root.getSelection && root.getSelection();

        if (selection) {
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
      /**
        HTMLElement value
        @override
      */

    }, {
      key: "_unsafeSelectionStart",

      /**
        Returns HTMLElement selection start
        @override
      */
      get: function get() {
        var root = this.rootElement;
        var selection = root.getSelection && root.getSelection();
        return selection && selection.anchorOffset;
      }
      /**
        Returns HTMLElement selection end
        @override
      */

    }, {
      key: "_unsafeSelectionEnd",
      get: function get() {
        var root = this.rootElement;
        var selection = root.getSelection && root.getSelection();
        return selection && this._unsafeSelectionStart + String(selection).length;
      }
    }, {
      key: "value",
      get: function get() {
        // $FlowFixMe
        return this.input.textContent;
      },
      set: function set(value) {
        this.input.textContent = value;
      }
    }]);

    return HTMLContenteditableMaskElement;
  }(HTMLMaskElement);

  IMask.HTMLContenteditableMaskElement = HTMLContenteditableMaskElement;
  /** Listens to element events and controls changes between element and {@link Masked} */

  var InputMask =
  /*#__PURE__*/
  function () {
    /**
      View element
      @readonly
    */

    /**
      Internal {@link Masked} model
      @readonly
    */

    /**
      @param {MaskElement|HTMLInputElement|HTMLTextAreaElement} el
      @param {Object} opts
    */
    function InputMask(el, opts) {
      _classCallCheck(this, InputMask);

      this.el = el instanceof MaskElement ? el : el.isContentEditable && el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA' ? new HTMLContenteditableMaskElement(el) : new HTMLMaskElement(el);
      this.masked = createMask(opts);
      this._listeners = {};
      this._value = '';
      this._unmaskedValue = '';
      this._saveSelection = this._saveSelection.bind(this);
      this._onInput = this._onInput.bind(this);
      this._onChange = this._onChange.bind(this);
      this._onDrop = this._onDrop.bind(this);
      this._onFocus = this._onFocus.bind(this);
      this._onClick = this._onClick.bind(this);
      this.alignCursor = this.alignCursor.bind(this);
      this.alignCursorFriendly = this.alignCursorFriendly.bind(this);

      this._bindEvents(); // refresh


      this.updateValue();

      this._onChange();
    }
    /** Read or update mask */


    _createClass(InputMask, [{
      key: "maskEquals",
      value: function maskEquals(mask) {
        return mask == null || mask === this.masked.mask || mask === Date && this.masked instanceof MaskedDate;
      }
    }, {
      key: "_bindEvents",

      /**
        Starts listening to element events
        @protected
      */
      value: function _bindEvents() {
        this.el.bindEvents({
          selectionChange: this._saveSelection,
          input: this._onInput,
          drop: this._onDrop,
          click: this._onClick,
          focus: this._onFocus,
          commit: this._onChange
        });
      }
      /**
        Stops listening to element events
        @protected
       */

    }, {
      key: "_unbindEvents",
      value: function _unbindEvents() {
        if (this.el) this.el.unbindEvents();
      }
      /**
        Fires custom event
        @protected
       */

    }, {
      key: "_fireEvent",
      value: function _fireEvent(ev) {
        var listeners = this._listeners[ev];
        if (!listeners) return;
        listeners.forEach(function (l) {
          return l();
        });
      }
      /**
        Current selection start
        @readonly
      */

    }, {
      key: "_saveSelection",

      /**
        Stores current selection
        @protected
      */
      value: function _saveSelection()
      /* ev */
      {
        if (this.value !== this.el.value) {
          console.warn('Element value was changed outside of mask. Syncronize mask using `mask.updateValue()` to work properly.'); // eslint-disable-line no-console
        }

        this._selection = {
          start: this.selectionStart,
          end: this.cursorPos
        };
      }
      /** Syncronizes model value from view */

    }, {
      key: "updateValue",
      value: function updateValue() {
        this.masked.value = this.el.value;
        this._value = this.masked.value;
      }
      /** Syncronizes view from model value, fires change events */

    }, {
      key: "updateControl",
      value: function updateControl() {
        var newUnmaskedValue = this.masked.unmaskedValue;
        var newValue = this.masked.value;
        var isChanged = this.unmaskedValue !== newUnmaskedValue || this.value !== newValue;
        this._unmaskedValue = newUnmaskedValue;
        this._value = newValue;
        if (this.el.value !== newValue) this.el.value = newValue;
        if (isChanged) this._fireChangeEvents();
      }
      /** Updates options with deep equal check, recreates @{link Masked} model if mask type changes */

    }, {
      key: "updateOptions",
      value: function updateOptions(opts) {
        var mask = opts.mask,
            restOpts = _objectWithoutProperties(opts, ["mask"]);

        var updateMask = !this.maskEquals(mask);
        var updateOpts = !objectIncludes(this.masked, restOpts);
        if (updateMask) this.mask = mask;
        if (updateOpts) this.masked.updateOptions(restOpts);
        if (updateMask || updateOpts) this.updateControl();
      }
      /** Updates cursor */

    }, {
      key: "updateCursor",
      value: function updateCursor(cursorPos) {
        if (cursorPos == null) return;
        this.cursorPos = cursorPos; // also queue change cursor for mobile browsers

        this._delayUpdateCursor(cursorPos);
      }
      /**
        Delays cursor update to support mobile browsers
        @private
      */

    }, {
      key: "_delayUpdateCursor",
      value: function _delayUpdateCursor(cursorPos) {
        var _this = this;

        this._abortUpdateCursor();

        this._changingCursorPos = cursorPos;
        this._cursorChanging = setTimeout(function () {
          if (!_this.el) return; // if was destroyed

          _this.cursorPos = _this._changingCursorPos;

          _this._abortUpdateCursor();
        }, 10);
      }
      /**
        Fires custom events
        @protected
      */

    }, {
      key: "_fireChangeEvents",
      value: function _fireChangeEvents() {
        this._fireEvent('accept');

        if (this.masked.isComplete) this._fireEvent('complete');
      }
      /**
        Aborts delayed cursor update
        @private
      */

    }, {
      key: "_abortUpdateCursor",
      value: function _abortUpdateCursor() {
        if (this._cursorChanging) {
          clearTimeout(this._cursorChanging);
          delete this._cursorChanging;
        }
      }
      /** Aligns cursor to nearest available position */

    }, {
      key: "alignCursor",
      value: function alignCursor() {
        this.cursorPos = this.masked.nearestInputPos(this.cursorPos, DIRECTION.LEFT);
      }
      /** Aligns cursor only if selection is empty */

    }, {
      key: "alignCursorFriendly",
      value: function alignCursorFriendly() {
        if (this.selectionStart !== this.cursorPos) return; // skip if range is selected

        this.alignCursor();
      }
      /** Adds listener on custom event */

    }, {
      key: "on",
      value: function on(ev, handler) {
        if (!this._listeners[ev]) this._listeners[ev] = [];

        this._listeners[ev].push(handler);

        return this;
      }
      /** Removes custom event listener */

    }, {
      key: "off",
      value: function off(ev, handler) {
        if (!this._listeners[ev]) return this;

        if (!handler) {
          delete this._listeners[ev];
          return this;
        }

        var hIndex = this._listeners[ev].indexOf(handler);

        if (hIndex >= 0) this._listeners[ev].splice(hIndex, 1);
        return this;
      }
      /** Handles view input event */

    }, {
      key: "_onInput",
      value: function _onInput() {
        this._abortUpdateCursor(); // fix strange IE behavior


        if (!this._selection) return this.updateValue();
        var details = new ActionDetails( // new state
        this.el.value, this.cursorPos, // old state
        this.value, this._selection);
        var oldRawValue = this.masked.rawInputValue;
        var offset = this.masked.splice(details.startChangePos, details.removed.length, details.inserted, details.removeDirection).offset; // force align in remove direction only if no input chars were removed
        // otherwise we still need to align with NONE (to get out from fixed symbols for instance)

        var removeDirection = oldRawValue === this.masked.rawInputValue ? details.removeDirection : DIRECTION.NONE;
        var cursorPos = this.masked.nearestInputPos(details.startChangePos + offset, removeDirection);
        this.updateControl();
        this.updateCursor(cursorPos);
      }
      /** Handles view change event and commits model value */

    }, {
      key: "_onChange",
      value: function _onChange() {
        if (this.value !== this.el.value) {
          this.updateValue();
        }

        this.masked.doCommit();
        this.updateControl();

        this._saveSelection();
      }
      /** Handles view drop event, prevents by default */

    }, {
      key: "_onDrop",
      value: function _onDrop(ev) {
        ev.preventDefault();
        ev.stopPropagation();
      }
      /** Restore last selection on focus */

    }, {
      key: "_onFocus",
      value: function _onFocus(ev) {
        this.alignCursorFriendly();
      }
      /** Restore last selection on focus */

    }, {
      key: "_onClick",
      value: function _onClick(ev) {
        this.alignCursorFriendly();
      }
      /** Unbind view events and removes element reference */

    }, {
      key: "destroy",
      value: function destroy() {
        this._unbindEvents(); // $FlowFixMe why not do so?


        this._listeners.length = 0; // $FlowFixMe

        delete this.el;
      }
    }, {
      key: "mask",
      get: function get() {
        return this.masked.mask;
      },
      set: function set(mask) {
        if (this.maskEquals(mask)) return;

        if (this.masked.constructor === maskedClass(mask)) {
          this.masked.updateOptions({
            mask: mask
          });
          return;
        }

        var masked = createMask({
          mask: mask
        });
        masked.unmaskedValue = this.masked.unmaskedValue;
        this.masked = masked;
      }
      /** Raw value */

    }, {
      key: "value",
      get: function get() {
        return this._value;
      },
      set: function set(str) {
        this.masked.value = str;
        this.updateControl();
        this.alignCursor();
      }
      /** Unmasked value */

    }, {
      key: "unmaskedValue",
      get: function get() {
        return this._unmaskedValue;
      },
      set: function set(str) {
        this.masked.unmaskedValue = str;
        this.updateControl();
        this.alignCursor();
      }
      /** Typed unmasked value */

    }, {
      key: "typedValue",
      get: function get() {
        return this.masked.typedValue;
      },
      set: function set(val) {
        this.masked.typedValue = val;
        this.updateControl();
        this.alignCursor();
      }
    }, {
      key: "selectionStart",
      get: function get() {
        return this._cursorChanging ? this._changingCursorPos : this.el.selectionStart;
      }
      /** Current cursor position */

    }, {
      key: "cursorPos",
      get: function get() {
        return this._cursorChanging ? this._changingCursorPos : this.el.selectionEnd;
      },
      set: function set(pos) {
        if (!this.el.isActive) return;
        this.el.select(pos, pos);

        this._saveSelection();
      }
    }]);

    return InputMask;
  }();

  IMask.InputMask = InputMask;
  /** Pattern which validates enum values */

  var MaskedEnum =
  /*#__PURE__*/
  function (_MaskedPattern) {
    _inherits(MaskedEnum, _MaskedPattern);

    function MaskedEnum() {
      _classCallCheck(this, MaskedEnum);

      return _possibleConstructorReturn(this, _getPrototypeOf(MaskedEnum).apply(this, arguments));
    }

    _createClass(MaskedEnum, [{
      key: "_update",

      /**
        @override
        @param {Object} opts
      */
      value: function _update(opts) {
        // TODO type
        if (opts.enum) opts.mask = '*'.repeat(opts.enum[0].length);

        _get(_getPrototypeOf(MaskedEnum.prototype), "_update", this).call(this, opts);
      }
      /**
        @override
      */

    }, {
      key: "doValidate",
      value: function doValidate() {
        var _this = this,
            _get2;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return this.enum.some(function (e) {
          return e.indexOf(_this.unmaskedValue) >= 0;
        }) && (_get2 = _get(_getPrototypeOf(MaskedEnum.prototype), "doValidate", this)).call.apply(_get2, [this].concat(args));
      }
    }]);

    return MaskedEnum;
  }(MaskedPattern);

  IMask.MaskedEnum = MaskedEnum;
  /**
    Number mask
    @param {Object} opts
    @param {string} opts.radix - Single char
    @param {string} opts.thousandsSeparator - Single char
    @param {Array<string>} opts.mapToRadix - Array of single chars
    @param {number} opts.min
    @param {number} opts.max
    @param {number} opts.scale - Digits after point
    @param {boolean} opts.signed - Allow negative
    @param {boolean} opts.normalizeZeros - Flag to remove leading and trailing zeros in the end of editing
    @param {boolean} opts.padFractionalZeros - Flag to pad trailing zeros after point in the end of editing
  */

  var MaskedNumber =
  /*#__PURE__*/
  function (_Masked) {
    _inherits(MaskedNumber, _Masked);
    /** Single char */

    /** Single char */

    /** Array of single chars */

    /** */

    /** */

    /** Digits after point */

    /** */

    /** Flag to remove leading and trailing zeros in the end of editing */

    /** Flag to pad trailing zeros after point in the end of editing */


    function MaskedNumber(opts) {
      _classCallCheck(this, MaskedNumber);

      return _possibleConstructorReturn(this, _getPrototypeOf(MaskedNumber).call(this, Object.assign({}, MaskedNumber.DEFAULTS, {}, opts)));
    }
    /**
      @override
    */


    _createClass(MaskedNumber, [{
      key: "_update",
      value: function _update(opts) {
        _get(_getPrototypeOf(MaskedNumber.prototype), "_update", this).call(this, opts);

        this._updateRegExps();
      }
      /** */

    }, {
      key: "_updateRegExps",
      value: function _updateRegExps() {
        // use different regexp to process user input (more strict, input suffix) and tail shifting
        var start = '^' + (this.allowNegative ? '[+|\\-]?' : '');
        var midInput = '(0|([1-9]+\\d*))?';
        var mid = '\\d*';
        var end = (this.scale ? '(' + escapeRegExp(this.radix) + '\\d{0,' + this.scale + '})?' : '') + '$';
        this._numberRegExpInput = new RegExp(start + midInput + end);
        this._numberRegExp = new RegExp(start + mid + end);
        this._mapToRadixRegExp = new RegExp('[' + this.mapToRadix.map(escapeRegExp).join('') + ']', 'g');
        this._thousandsSeparatorRegExp = new RegExp(escapeRegExp(this.thousandsSeparator), 'g');
      }
      /** */

    }, {
      key: "_removeThousandsSeparators",
      value: function _removeThousandsSeparators(value) {
        return value.replace(this._thousandsSeparatorRegExp, '');
      }
      /** */

    }, {
      key: "_insertThousandsSeparators",
      value: function _insertThousandsSeparators(value) {
        // https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
        var parts = value.split(this.radix);
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, this.thousandsSeparator);
        return parts.join(this.radix);
      }
      /**
        @override
      */

    }, {
      key: "doPrepare",
      value: function doPrepare(str) {
        var _get2;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        return (_get2 = _get(_getPrototypeOf(MaskedNumber.prototype), "doPrepare", this)).call.apply(_get2, [this, this._removeThousandsSeparators(str.replace(this._mapToRadixRegExp, this.radix))].concat(args));
      }
      /** */

    }, {
      key: "_separatorsCount",
      value: function _separatorsCount(to) {
        var extendOnSeparators = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var count = 0;

        for (var pos = 0; pos < to; ++pos) {
          if (this._value.indexOf(this.thousandsSeparator, pos) === pos) {
            ++count;
            if (extendOnSeparators) to += this.thousandsSeparator.length;
          }
        }

        return count;
      }
      /** */

    }, {
      key: "_separatorsCountFromSlice",
      value: function _separatorsCountFromSlice() {
        var slice = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._value;
        return this._separatorsCount(this._removeThousandsSeparators(slice).length, true);
      }
      /**
        @override
      */

    }, {
      key: "extractInput",
      value: function extractInput() {
        var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
        var flags = arguments.length > 2 ? arguments[2] : undefined;

        var _this$_adjustRangeWit = this._adjustRangeWithSeparators(fromPos, toPos);

        var _this$_adjustRangeWit2 = _slicedToArray(_this$_adjustRangeWit, 2);

        fromPos = _this$_adjustRangeWit2[0];
        toPos = _this$_adjustRangeWit2[1];
        return this._removeThousandsSeparators(_get(_getPrototypeOf(MaskedNumber.prototype), "extractInput", this).call(this, fromPos, toPos, flags));
      }
      /**
        @override
      */

    }, {
      key: "_appendCharRaw",
      value: function _appendCharRaw(ch) {
        var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        if (!this.thousandsSeparator) return _get(_getPrototypeOf(MaskedNumber.prototype), "_appendCharRaw", this).call(this, ch, flags);
        var prevBeforeTailValue = flags.tail && flags._beforeTailState ? flags._beforeTailState._value : this._value;

        var prevBeforeTailSeparatorsCount = this._separatorsCountFromSlice(prevBeforeTailValue);

        this._value = this._removeThousandsSeparators(this.value);

        var appendDetails = _get(_getPrototypeOf(MaskedNumber.prototype), "_appendCharRaw", this).call(this, ch, flags);

        this._value = this._insertThousandsSeparators(this._value);
        var beforeTailValue = flags.tail && flags._beforeTailState ? flags._beforeTailState._value : this._value;

        var beforeTailSeparatorsCount = this._separatorsCountFromSlice(beforeTailValue);

        appendDetails.tailShift += (beforeTailSeparatorsCount - prevBeforeTailSeparatorsCount) * this.thousandsSeparator.length;
        return appendDetails;
      }
      /** */

    }, {
      key: "_findSeparatorAround",
      value: function _findSeparatorAround(pos) {
        if (this.thousandsSeparator) {
          var searchFrom = pos - this.thousandsSeparator.length + 1;
          var separatorPos = this.value.indexOf(this.thousandsSeparator, searchFrom);
          if (separatorPos <= pos) return separatorPos;
        }

        return -1;
      }
    }, {
      key: "_adjustRangeWithSeparators",
      value: function _adjustRangeWithSeparators(from, to) {
        var separatorAroundFromPos = this._findSeparatorAround(from);

        if (separatorAroundFromPos >= 0) from = separatorAroundFromPos;

        var separatorAroundToPos = this._findSeparatorAround(to);

        if (separatorAroundToPos >= 0) to = separatorAroundToPos + this.thousandsSeparator.length;
        return [from, to];
      }
      /**
        @override
      */

    }, {
      key: "remove",
      value: function remove() {
        var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;

        var _this$_adjustRangeWit3 = this._adjustRangeWithSeparators(fromPos, toPos);

        var _this$_adjustRangeWit4 = _slicedToArray(_this$_adjustRangeWit3, 2);

        fromPos = _this$_adjustRangeWit4[0];
        toPos = _this$_adjustRangeWit4[1];
        var valueBeforePos = this.value.slice(0, fromPos);
        var valueAfterPos = this.value.slice(toPos);

        var prevBeforeTailSeparatorsCount = this._separatorsCount(valueBeforePos.length);

        this._value = this._insertThousandsSeparators(this._removeThousandsSeparators(valueBeforePos + valueAfterPos));

        var beforeTailSeparatorsCount = this._separatorsCountFromSlice(valueBeforePos);

        return new ChangeDetails({
          tailShift: (beforeTailSeparatorsCount - prevBeforeTailSeparatorsCount) * this.thousandsSeparator.length
        });
      }
      /**
        @override
      */

    }, {
      key: "nearestInputPos",
      value: function nearestInputPos(cursorPos, direction) {
        if (!this.thousandsSeparator) return cursorPos;

        switch (direction) {
          case DIRECTION.NONE:
          case DIRECTION.LEFT:
          case DIRECTION.FORCE_LEFT:
            {
              var separatorAtLeftPos = this._findSeparatorAround(cursorPos - 1);

              if (separatorAtLeftPos >= 0) {
                var separatorAtLeftEndPos = separatorAtLeftPos + this.thousandsSeparator.length;

                if (cursorPos < separatorAtLeftEndPos || this.value.length <= separatorAtLeftEndPos || direction === DIRECTION.FORCE_LEFT) {
                  return separatorAtLeftPos;
                }
              }

              break;
            }

          case DIRECTION.RIGHT:
          case DIRECTION.FORCE_RIGHT:
            {
              var separatorAtRightPos = this._findSeparatorAround(cursorPos);

              if (separatorAtRightPos >= 0) {
                return separatorAtRightPos + this.thousandsSeparator.length;
              }
            }
        }

        return cursorPos;
      }
      /**
        @override
      */

    }, {
      key: "doValidate",
      value: function doValidate(flags) {
        var regexp = flags.input ? this._numberRegExpInput : this._numberRegExp; // validate as string

        var valid = regexp.test(this._removeThousandsSeparators(this.value));

        if (valid) {
          // validate as number
          var number = this.number;
          valid = valid && !isNaN(number) && ( // check min bound for negative values
          this.min == null || this.min >= 0 || this.min <= this.number) && ( // check max bound for positive values
          this.max == null || this.max <= 0 || this.number <= this.max);
        }

        return valid && _get(_getPrototypeOf(MaskedNumber.prototype), "doValidate", this).call(this, flags);
      }
      /**
        @override
      */

    }, {
      key: "doCommit",
      value: function doCommit() {
        if (this.value) {
          var number = this.number;
          var validnum = number; // check bounds

          if (this.min != null) validnum = Math.max(validnum, this.min);
          if (this.max != null) validnum = Math.min(validnum, this.max);
          if (validnum !== number) this.unmaskedValue = String(validnum);
          var formatted = this.value;
          if (this.normalizeZeros) formatted = this._normalizeZeros(formatted);
          if (this.padFractionalZeros) formatted = this._padFractionalZeros(formatted);
          this._value = formatted;
        }

        _get(_getPrototypeOf(MaskedNumber.prototype), "doCommit", this).call(this);
      }
      /** */

    }, {
      key: "_normalizeZeros",
      value: function _normalizeZeros(value) {
        var parts = this._removeThousandsSeparators(value).split(this.radix); // remove leading zeros


        parts[0] = parts[0].replace(/^(\D*)(0*)(\d*)/, function (match, sign, zeros, num) {
          return sign + num;
        }); // add leading zero

        if (value.length && !/\d$/.test(parts[0])) parts[0] = parts[0] + '0';

        if (parts.length > 1) {
          parts[1] = parts[1].replace(/0*$/, ''); // remove trailing zeros

          if (!parts[1].length) parts.length = 1; // remove fractional
        }

        return this._insertThousandsSeparators(parts.join(this.radix));
      }
      /** */

    }, {
      key: "_padFractionalZeros",
      value: function _padFractionalZeros(value) {
        if (!value) return value;
        var parts = value.split(this.radix);
        if (parts.length < 2) parts.push('');
        parts[1] = parts[1].padEnd(this.scale, '0');
        return parts.join(this.radix);
      }
      /**
        @override
      */

    }, {
      key: "unmaskedValue",
      get: function get() {
        return this._removeThousandsSeparators(this._normalizeZeros(this.value)).replace(this.radix, '.');
      },
      set: function set(unmaskedValue) {
        _set(_getPrototypeOf(MaskedNumber.prototype), "unmaskedValue", unmaskedValue.replace('.', this.radix), this, true);
      }
      /**
        @override
      */

    }, {
      key: "typedValue",
      get: function get() {
        return Number(this.unmaskedValue);
      },
      set: function set(n) {
        _set(_getPrototypeOf(MaskedNumber.prototype), "unmaskedValue", String(n), this, true);
      }
      /** Parsed Number */

    }, {
      key: "number",
      get: function get() {
        return this.typedValue;
      },
      set: function set(number) {
        this.typedValue = number;
      }
      /**
        Is negative allowed
        @readonly
      */

    }, {
      key: "allowNegative",
      get: function get() {
        return this.signed || this.min != null && this.min < 0 || this.max != null && this.max < 0;
      }
    }]);

    return MaskedNumber;
  }(Masked);

  MaskedNumber.DEFAULTS = {
    radix: ',',
    thousandsSeparator: '',
    mapToRadix: ['.'],
    scale: 2,
    signed: false,
    normalizeZeros: true,
    padFractionalZeros: false
  };
  IMask.MaskedNumber = MaskedNumber;
  /** Masking by RegExp */

  var MaskedRegExp =
  /*#__PURE__*/
  function (_Masked) {
    _inherits(MaskedRegExp, _Masked);

    function MaskedRegExp() {
      _classCallCheck(this, MaskedRegExp);

      return _possibleConstructorReturn(this, _getPrototypeOf(MaskedRegExp).apply(this, arguments));
    }

    _createClass(MaskedRegExp, [{
      key: "_update",

      /**
        @override
        @param {Object} opts
      */
      value: function _update(opts) {
        if (opts.mask) opts.validate = function (value) {
          return value.search(opts.mask) >= 0;
        };

        _get(_getPrototypeOf(MaskedRegExp.prototype), "_update", this).call(this, opts);
      }
    }]);

    return MaskedRegExp;
  }(Masked);

  IMask.MaskedRegExp = MaskedRegExp;
  /** Masking by custom Function */

  var MaskedFunction =
  /*#__PURE__*/
  function (_Masked) {
    _inherits(MaskedFunction, _Masked);

    function MaskedFunction() {
      _classCallCheck(this, MaskedFunction);

      return _possibleConstructorReturn(this, _getPrototypeOf(MaskedFunction).apply(this, arguments));
    }

    _createClass(MaskedFunction, [{
      key: "_update",

      /**
        @override
        @param {Object} opts
      */
      value: function _update(opts) {
        if (opts.mask) opts.validate = opts.mask;

        _get(_getPrototypeOf(MaskedFunction.prototype), "_update", this).call(this, opts);
      }
    }]);

    return MaskedFunction;
  }(Masked);

  IMask.MaskedFunction = MaskedFunction;
  /** Dynamic mask for choosing apropriate mask in run-time */

  var MaskedDynamic =
  /*#__PURE__*/
  function (_Masked) {
    _inherits(MaskedDynamic, _Masked);
    /** Currently chosen mask */

    /** Compliled {@link Masked} options */

    /** Chooses {@link Masked} depending on input value */

    /**
      @param {Object} opts
    */


    function MaskedDynamic(opts) {
      var _this;

      _classCallCheck(this, MaskedDynamic);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(MaskedDynamic).call(this, Object.assign({}, MaskedDynamic.DEFAULTS, {}, opts)));
      _this.currentMask = null;
      return _this;
    }
    /**
      @override
    */


    _createClass(MaskedDynamic, [{
      key: "_update",
      value: function _update(opts) {
        _get(_getPrototypeOf(MaskedDynamic.prototype), "_update", this).call(this, opts);

        if ('mask' in opts) {
          // mask could be totally dynamic with only `dispatch` option
          this.compiledMasks = Array.isArray(opts.mask) ? opts.mask.map(function (m) {
            return createMask(m);
          }) : [];
        }
      }
      /**
        @override
      */

    }, {
      key: "_appendCharRaw",
      value: function _appendCharRaw() {
        var details = this._applyDispatch.apply(this, arguments);

        if (this.currentMask) {
          var _this$currentMask;

          details.aggregate((_this$currentMask = this.currentMask)._appendChar.apply(_this$currentMask, arguments));
        }

        return details;
      }
    }, {
      key: "_applyDispatch",
      value: function _applyDispatch() {
        var appended = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var prevValueBeforeTail = flags.tail && flags._beforeTailState != null ? flags._beforeTailState._value : this.value;
        var inputValue = this.rawInputValue;
        var insertValue = flags.tail && flags._beforeTailState != null ? // $FlowFixMe - tired to fight with type system
        flags._beforeTailState._rawInputValue : inputValue;
        var tailValue = inputValue.slice(insertValue.length);
        var prevMask = this.currentMask;
        var details = new ChangeDetails();
        var prevMaskState = prevMask && prevMask.state; // clone flags to prevent overwriting `_beforeTailState`

        this.currentMask = this.doDispatch(appended, Object.assign({}, flags)); // restore state after dispatch

        if (this.currentMask) {
          if (this.currentMask !== prevMask) {
            // if mask changed reapply input
            this.currentMask.reset(); // $FlowFixMe - it's ok, we don't change current mask above

            var d = this.currentMask.append(insertValue, {
              raw: true
            });
            details.tailShift = d.inserted.length - prevValueBeforeTail.length;

            if (tailValue) {
              // $FlowFixMe - it's ok, we don't change current mask above
              details.tailShift += this.currentMask.append(tailValue, {
                raw: true,
                tail: true
              }).tailShift;
            }
          } else {
            // Dispatch can do something bad with state, so
            // restore prev mask state
            this.currentMask.state = prevMaskState;
          }
        }

        return details;
      }
    }, {
      key: "_appendPlaceholder",
      value: function _appendPlaceholder() {
        var details = this._applyDispatch.apply(this, arguments);

        if (this.currentMask) {
          details.aggregate(this.currentMask._appendPlaceholder());
        }

        return details;
      }
      /**
        @override
      */

    }, {
      key: "doDispatch",
      value: function doDispatch(appended) {
        var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return this.dispatch(appended, this, flags);
      }
      /**
        @override
      */

    }, {
      key: "doValidate",
      value: function doValidate() {
        var _get2, _this$currentMask2;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return (_get2 = _get(_getPrototypeOf(MaskedDynamic.prototype), "doValidate", this)).call.apply(_get2, [this].concat(args)) && (!this.currentMask || (_this$currentMask2 = this.currentMask).doValidate.apply(_this$currentMask2, args));
      }
      /**
        @override
      */

    }, {
      key: "reset",
      value: function reset() {
        if (this.currentMask) this.currentMask.reset();
        this.compiledMasks.forEach(function (m) {
          return m.reset();
        });
      }
      /**
        @override
      */

    }, {
      key: "remove",

      /**
        @override
      */
      value: function remove() {
        var details = new ChangeDetails();

        if (this.currentMask) {
          var _this$currentMask3;

          details.aggregate((_this$currentMask3 = this.currentMask).remove.apply(_this$currentMask3, arguments)) // update with dispatch
          .aggregate(this._applyDispatch());
        }

        return details;
      }
      /**
        @override
      */

    }, {
      key: "extractInput",

      /**
        @override
      */
      value: function extractInput() {
        var _this$currentMask4;

        return this.currentMask ? (_this$currentMask4 = this.currentMask).extractInput.apply(_this$currentMask4, arguments) : '';
      }
      /**
        @override
      */

    }, {
      key: "extractTail",
      value: function extractTail() {
        var _this$currentMask5, _get3;

        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return this.currentMask ? (_this$currentMask5 = this.currentMask).extractTail.apply(_this$currentMask5, args) : (_get3 = _get(_getPrototypeOf(MaskedDynamic.prototype), "extractTail", this)).call.apply(_get3, [this].concat(args));
      }
      /**
        @override
      */

    }, {
      key: "doCommit",
      value: function doCommit() {
        if (this.currentMask) this.currentMask.doCommit();

        _get(_getPrototypeOf(MaskedDynamic.prototype), "doCommit", this).call(this);
      }
      /**
        @override
      */

    }, {
      key: "nearestInputPos",
      value: function nearestInputPos() {
        var _this$currentMask6, _get4;

        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        return this.currentMask ? (_this$currentMask6 = this.currentMask).nearestInputPos.apply(_this$currentMask6, args) : (_get4 = _get(_getPrototypeOf(MaskedDynamic.prototype), "nearestInputPos", this)).call.apply(_get4, [this].concat(args));
      }
    }, {
      key: "value",
      get: function get() {
        return this.currentMask ? this.currentMask.value : '';
      },
      set: function set(value) {
        _set(_getPrototypeOf(MaskedDynamic.prototype), "value", value, this, true);
      }
      /**
        @override
      */

    }, {
      key: "unmaskedValue",
      get: function get() {
        return this.currentMask ? this.currentMask.unmaskedValue : '';
      },
      set: function set(unmaskedValue) {
        _set(_getPrototypeOf(MaskedDynamic.prototype), "unmaskedValue", unmaskedValue, this, true);
      }
      /**
        @override
      */

    }, {
      key: "typedValue",
      get: function get() {
        return this.currentMask ? this.currentMask.typedValue : '';
      } // probably typedValue should not be used with dynamic
      ,
      set: function set(value) {
        var unmaskedValue = String(value); // double check it

        if (this.currentMask) {
          this.currentMask.typedValue = value;
          unmaskedValue = this.currentMask.unmaskedValue;
        }

        this.unmaskedValue = unmaskedValue;
      }
      /**
        @override
      */

    }, {
      key: "isComplete",
      get: function get() {
        return !!this.currentMask && this.currentMask.isComplete;
      }
    }, {
      key: "state",
      get: function get() {
        return Object.assign({}, _get(_getPrototypeOf(MaskedDynamic.prototype), "state", this), {
          _rawInputValue: this.rawInputValue,
          compiledMasks: this.compiledMasks.map(function (m) {
            return m.state;
          }),
          currentMaskRef: this.currentMask,
          currentMask: this.currentMask && this.currentMask.state
        });
      },
      set: function set(state) {
        var compiledMasks = state.compiledMasks,
            currentMaskRef = state.currentMaskRef,
            currentMask = state.currentMask,
            maskedState = _objectWithoutProperties(state, ["compiledMasks", "currentMaskRef", "currentMask"]);

        this.compiledMasks.forEach(function (m, mi) {
          return m.state = compiledMasks[mi];
        });

        if (currentMaskRef != null) {
          this.currentMask = currentMaskRef;
          this.currentMask.state = currentMask;
        }

        _set(_getPrototypeOf(MaskedDynamic.prototype), "state", maskedState, this, true);
      }
    }, {
      key: "overwrite",
      get: function get() {
        return this.currentMask ? this.currentMask.overwrite : _get(_getPrototypeOf(MaskedDynamic.prototype), "overwrite", this);
      },
      set: function set(overwrite) {
        console.warn('"overwrite" option is not available in dynamic mask, use this option in siblings');
      }
    }]);

    return MaskedDynamic;
  }(Masked);

  MaskedDynamic.DEFAULTS = {
    dispatch: function dispatch(appended, masked, flags) {
      if (!masked.compiledMasks.length) return;
      var inputValue = masked.rawInputValue; // simulate input

      var inputs = masked.compiledMasks.map(function (m, index) {
        m.reset();
        m.append(inputValue, {
          raw: true
        });
        m.append(appended, flags);
        var weight = m.rawInputValue.length;
        return {
          weight: weight,
          index: index
        };
      }); // pop masks with longer values first

      inputs.sort(function (i1, i2) {
        return i2.weight - i1.weight;
      });
      return masked.compiledMasks[inputs[0].index];
    }
  };
  IMask.MaskedDynamic = MaskedDynamic;
  /** Mask pipe source and destination types */

  var PIPE_TYPE = {
    MASKED: 'value',
    UNMASKED: 'unmaskedValue',
    TYPED: 'typedValue'
  };
  /** Creates new pipe function depending on mask type, source and destination options */

  function createPipe(mask) {
    var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : PIPE_TYPE.MASKED;
    var to = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : PIPE_TYPE.MASKED;
    var masked = createMask(mask);
    return function (value) {
      return masked.runIsolated(function (m) {
        m[from] = value;
        return m[to];
      });
    };
  }
  /** Pipes value through mask depending on mask type, source and destination options */


  function pipe(value) {
    for (var _len = arguments.length, pipeArgs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      pipeArgs[_key - 1] = arguments[_key];
    }

    return createPipe.apply(void 0, pipeArgs)(value);
  }

  IMask.PIPE_TYPE = PIPE_TYPE;
  IMask.createPipe = createPipe;
  IMask.pipe = pipe;
  globalThis.IMask = IMask;
  exports.HTMLContenteditableMaskElement = HTMLContenteditableMaskElement;
  exports.HTMLMaskElement = HTMLMaskElement;
  exports.InputMask = InputMask;
  exports.MaskElement = MaskElement;
  exports.Masked = Masked;
  exports.MaskedDate = MaskedDate;
  exports.MaskedDynamic = MaskedDynamic;
  exports.MaskedEnum = MaskedEnum;
  exports.MaskedFunction = MaskedFunction;
  exports.MaskedNumber = MaskedNumber;
  exports.MaskedPattern = MaskedPattern;
  exports.MaskedRange = MaskedRange;
  exports.MaskedRegExp = MaskedRegExp;
  exports.PIPE_TYPE = PIPE_TYPE;
  exports.createMask = createMask;
  exports.createPipe = createPipe;
  exports.default = IMask;
  exports.pipe = pipe;
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
});
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (window, factory) {
  var lazySizes = factory(window, window.document, Date);
  window.lazySizes = lazySizes;

  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module.exports) {
    module.exports = lazySizes;
  }
})(typeof window != 'undefined' ? window : {}, function l(window, document, Date) {
  // Pass in the windoe Date function also for SSR because the Date class can be lost
  'use strict';
  /*jshint eqnull:true */

  var lazysizes, lazySizesCfg;

  (function () {
    var prop;
    var lazySizesDefaults = {
      lazyClass: 'lazyload',
      loadedClass: 'lazyloaded',
      loadingClass: 'lazyloading',
      preloadClass: 'lazypreload',
      errorClass: 'lazyerror',
      //strictClass: 'lazystrict',
      autosizesClass: 'lazyautosizes',
      srcAttr: 'data-src',
      srcsetAttr: 'data-srcset',
      sizesAttr: 'data-sizes',
      //preloadAfterLoad: false,
      minSize: 40,
      customMedia: {},
      init: true,
      expFactor: 1.5,
      hFac: 0.8,
      loadMode: 2,
      loadHidden: true,
      ricTimeout: 0,
      throttleDelay: 125
    };
    lazySizesCfg = window.lazySizesConfig || window.lazysizesConfig || {};

    for (prop in lazySizesDefaults) {
      if (!(prop in lazySizesCfg)) {
        lazySizesCfg[prop] = lazySizesDefaults[prop];
      }
    }
  })();

  if (!document || !document.getElementsByClassName) {
    return {
      init: function init() {},
      cfg: lazySizesCfg,
      noSupport: true
    };
  }

  var docElem = document.documentElement;
  var supportPicture = window.HTMLPictureElement;
  var _addEventListener = 'addEventListener';
  var _getAttribute = 'getAttribute';
  /**
   * Update to bind to window because 'this' becomes null during SSR
   * builds.
   */

  var addEventListener = window[_addEventListener].bind(window);

  var setTimeout = window.setTimeout;
  var requestAnimationFrame = window.requestAnimationFrame || setTimeout;
  var requestIdleCallback = window.requestIdleCallback;
  var regPicture = /^picture$/i;
  var loadEvents = ['load', 'error', 'lazyincluded', '_lazyloaded'];
  var regClassCache = {};
  var forEach = Array.prototype.forEach;

  var hasClass = function hasClass(ele, cls) {
    if (!regClassCache[cls]) {
      regClassCache[cls] = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    }

    return regClassCache[cls].test(ele[_getAttribute]('class') || '') && regClassCache[cls];
  };

  var addClass = function addClass(ele, cls) {
    if (!hasClass(ele, cls)) {
      ele.setAttribute('class', (ele[_getAttribute]('class') || '').trim() + ' ' + cls);
    }
  };

  var removeClass = function removeClass(ele, cls) {
    var reg;

    if (reg = hasClass(ele, cls)) {
      ele.setAttribute('class', (ele[_getAttribute]('class') || '').replace(reg, ' '));
    }
  };

  var addRemoveLoadEvents = function addRemoveLoadEvents(dom, fn, add) {
    var action = add ? _addEventListener : 'removeEventListener';

    if (add) {
      addRemoveLoadEvents(dom, fn);
    }

    loadEvents.forEach(function (evt) {
      dom[action](evt, fn);
    });
  };

  var triggerEvent = function triggerEvent(elem, name, detail, noBubbles, noCancelable) {
    var event = document.createEvent('Event');

    if (!detail) {
      detail = {};
    }

    detail.instance = lazysizes;
    event.initEvent(name, !noBubbles, !noCancelable);
    event.detail = detail;
    elem.dispatchEvent(event);
    return event;
  };

  var updatePolyfill = function updatePolyfill(el, full) {
    var polyfill;

    if (!supportPicture && (polyfill = window.picturefill || lazySizesCfg.pf)) {
      if (full && full.src && !el[_getAttribute]('srcset')) {
        el.setAttribute('srcset', full.src);
      }

      polyfill({
        reevaluate: true,
        elements: [el]
      });
    } else if (full && full.src) {
      el.src = full.src;
    }
  };

  var getCSS = function getCSS(elem, style) {
    return (getComputedStyle(elem, null) || {})[style];
  };

  var getWidth = function getWidth(elem, parent, width) {
    width = width || elem.offsetWidth;

    while (width < lazySizesCfg.minSize && parent && !elem._lazysizesWidth) {
      width = parent.offsetWidth;
      parent = parent.parentNode;
    }

    return width;
  };

  var rAF = function () {
    var running, waiting;
    var firstFns = [];
    var secondFns = [];
    var fns = firstFns;

    var run = function run() {
      var runFns = fns;
      fns = firstFns.length ? secondFns : firstFns;
      running = true;
      waiting = false;

      while (runFns.length) {
        runFns.shift()();
      }

      running = false;
    };

    var rafBatch = function rafBatch(fn, queue) {
      if (running && !queue) {
        fn.apply(this, arguments);
      } else {
        fns.push(fn);

        if (!waiting) {
          waiting = true;
          (document.hidden ? setTimeout : requestAnimationFrame)(run);
        }
      }
    };

    rafBatch._lsFlush = run;
    return rafBatch;
  }();

  var rAFIt = function rAFIt(fn, simple) {
    return simple ? function () {
      rAF(fn);
    } : function () {
      var that = this;
      var args = arguments;
      rAF(function () {
        fn.apply(that, args);
      });
    };
  };

  var throttle = function throttle(fn) {
    var running;
    var lastTime = 0;
    var gDelay = lazySizesCfg.throttleDelay;
    var rICTimeout = lazySizesCfg.ricTimeout;

    var run = function run() {
      running = false;
      lastTime = Date.now();
      fn();
    };

    var idleCallback = requestIdleCallback && rICTimeout > 49 ? function () {
      requestIdleCallback(run, {
        timeout: rICTimeout
      });

      if (rICTimeout !== lazySizesCfg.ricTimeout) {
        rICTimeout = lazySizesCfg.ricTimeout;
      }
    } : rAFIt(function () {
      setTimeout(run);
    }, true);
    return function (isPriority) {
      var delay;

      if (isPriority = isPriority === true) {
        rICTimeout = 33;
      }

      if (running) {
        return;
      }

      running = true;
      delay = gDelay - (Date.now() - lastTime);

      if (delay < 0) {
        delay = 0;
      }

      if (isPriority || delay < 9) {
        idleCallback();
      } else {
        setTimeout(idleCallback, delay);
      }
    };
  }; //based on http://modernjavascript.blogspot.de/2013/08/building-better-debounce.html


  var debounce = function debounce(func) {
    var timeout, timestamp;
    var wait = 99;

    var run = function run() {
      timeout = null;
      func();
    };

    var later = function later() {
      var last = Date.now() - timestamp;

      if (last < wait) {
        setTimeout(later, wait - last);
      } else {
        (requestIdleCallback || run)(run);
      }
    };

    return function () {
      timestamp = Date.now();

      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
    };
  };

  var loader = function () {
    var preloadElems, isCompleted, resetPreloadingTimer, loadMode, started;
    var eLvW, elvH, eLtop, eLleft, eLright, eLbottom, isBodyHidden;
    var regImg = /^img$/i;
    var regIframe = /^iframe$/i;
    var supportScroll = 'onscroll' in window && !/(gle|ing)bot/.test(navigator.userAgent);
    var shrinkExpand = 0;
    var currentExpand = 0;
    var isLoading = 0;
    var lowRuns = -1;

    var resetPreloading = function resetPreloading(e) {
      isLoading--;

      if (!e || isLoading < 0 || !e.target) {
        isLoading = 0;
      }
    };

    var isVisible = function isVisible(elem) {
      if (isBodyHidden == null) {
        isBodyHidden = getCSS(document.body, 'visibility') == 'hidden';
      }

      return isBodyHidden || !(getCSS(elem.parentNode, 'visibility') == 'hidden' && getCSS(elem, 'visibility') == 'hidden');
    };

    var isNestedVisible = function isNestedVisible(elem, elemExpand) {
      var outerRect;
      var parent = elem;
      var visible = isVisible(elem);
      eLtop -= elemExpand;
      eLbottom += elemExpand;
      eLleft -= elemExpand;
      eLright += elemExpand;

      while (visible && (parent = parent.offsetParent) && parent != document.body && parent != docElem) {
        visible = (getCSS(parent, 'opacity') || 1) > 0;

        if (visible && getCSS(parent, 'overflow') != 'visible') {
          outerRect = parent.getBoundingClientRect();
          visible = eLright > outerRect.left && eLleft < outerRect.right && eLbottom > outerRect.top - 1 && eLtop < outerRect.bottom + 1;
        }
      }

      return visible;
    };

    var checkElements = function checkElements() {
      var eLlen, i, rect, autoLoadElem, loadedSomething, elemExpand, elemNegativeExpand, elemExpandVal, beforeExpandVal, defaultExpand, preloadExpand, hFac;
      var lazyloadElems = lazysizes.elements;

      if ((loadMode = lazySizesCfg.loadMode) && isLoading < 8 && (eLlen = lazyloadElems.length)) {
        i = 0;
        lowRuns++;

        for (; i < eLlen; i++) {
          if (!lazyloadElems[i] || lazyloadElems[i]._lazyRace) {
            continue;
          }

          if (!supportScroll || lazysizes.prematureUnveil && lazysizes.prematureUnveil(lazyloadElems[i])) {
            unveilElement(lazyloadElems[i]);
            continue;
          }

          if (!(elemExpandVal = lazyloadElems[i][_getAttribute]('data-expand')) || !(elemExpand = elemExpandVal * 1)) {
            elemExpand = currentExpand;
          }

          if (!defaultExpand) {
            defaultExpand = !lazySizesCfg.expand || lazySizesCfg.expand < 1 ? docElem.clientHeight > 500 && docElem.clientWidth > 500 ? 500 : 370 : lazySizesCfg.expand;
            lazysizes._defEx = defaultExpand;
            preloadExpand = defaultExpand * lazySizesCfg.expFactor;
            hFac = lazySizesCfg.hFac;
            isBodyHidden = null;

            if (currentExpand < preloadExpand && isLoading < 1 && lowRuns > 2 && loadMode > 2 && !document.hidden) {
              currentExpand = preloadExpand;
              lowRuns = 0;
            } else if (loadMode > 1 && lowRuns > 1 && isLoading < 6) {
              currentExpand = defaultExpand;
            } else {
              currentExpand = shrinkExpand;
            }
          }

          if (beforeExpandVal !== elemExpand) {
            eLvW = innerWidth + elemExpand * hFac;
            elvH = innerHeight + elemExpand;
            elemNegativeExpand = elemExpand * -1;
            beforeExpandVal = elemExpand;
          }

          rect = lazyloadElems[i].getBoundingClientRect();

          if ((eLbottom = rect.bottom) >= elemNegativeExpand && (eLtop = rect.top) <= elvH && (eLright = rect.right) >= elemNegativeExpand * hFac && (eLleft = rect.left) <= eLvW && (eLbottom || eLright || eLleft || eLtop) && (lazySizesCfg.loadHidden || isVisible(lazyloadElems[i])) && (isCompleted && isLoading < 3 && !elemExpandVal && (loadMode < 3 || lowRuns < 4) || isNestedVisible(lazyloadElems[i], elemExpand))) {
            unveilElement(lazyloadElems[i]);
            loadedSomething = true;

            if (isLoading > 9) {
              break;
            }
          } else if (!loadedSomething && isCompleted && !autoLoadElem && isLoading < 4 && lowRuns < 4 && loadMode > 2 && (preloadElems[0] || lazySizesCfg.preloadAfterLoad) && (preloadElems[0] || !elemExpandVal && (eLbottom || eLright || eLleft || eLtop || lazyloadElems[i][_getAttribute](lazySizesCfg.sizesAttr) != 'auto'))) {
            autoLoadElem = preloadElems[0] || lazyloadElems[i];
          }
        }

        if (autoLoadElem && !loadedSomething) {
          unveilElement(autoLoadElem);
        }
      }
    };

    var throttledCheckElements = throttle(checkElements);

    var switchLoadingClass = function switchLoadingClass(e) {
      var elem = e.target;

      if (elem._lazyCache) {
        delete elem._lazyCache;
        return;
      }

      resetPreloading(e);
      addClass(elem, lazySizesCfg.loadedClass);
      removeClass(elem, lazySizesCfg.loadingClass);
      addRemoveLoadEvents(elem, rafSwitchLoadingClass);
      triggerEvent(elem, 'lazyloaded');
    };

    var rafedSwitchLoadingClass = rAFIt(switchLoadingClass);

    var rafSwitchLoadingClass = function rafSwitchLoadingClass(e) {
      rafedSwitchLoadingClass({
        target: e.target
      });
    };

    var changeIframeSrc = function changeIframeSrc(elem, src) {
      try {
        elem.contentWindow.location.replace(src);
      } catch (e) {
        elem.src = src;
      }
    };

    var handleSources = function handleSources(source) {
      var customMedia;

      var sourceSrcset = source[_getAttribute](lazySizesCfg.srcsetAttr);

      if (customMedia = lazySizesCfg.customMedia[source[_getAttribute]('data-media') || source[_getAttribute]('media')]) {
        source.setAttribute('media', customMedia);
      }

      if (sourceSrcset) {
        source.setAttribute('srcset', sourceSrcset);
      }
    };

    var lazyUnveil = rAFIt(function (elem, detail, isAuto, sizes, isImg) {
      var src, srcset, parent, isPicture, event, firesLoad;

      if (!(event = triggerEvent(elem, 'lazybeforeunveil', detail)).defaultPrevented) {
        if (sizes) {
          if (isAuto) {
            addClass(elem, lazySizesCfg.autosizesClass);
          } else {
            elem.setAttribute('sizes', sizes);
          }
        }

        srcset = elem[_getAttribute](lazySizesCfg.srcsetAttr);
        src = elem[_getAttribute](lazySizesCfg.srcAttr);

        if (isImg) {
          parent = elem.parentNode;
          isPicture = parent && regPicture.test(parent.nodeName || '');
        }

        firesLoad = detail.firesLoad || 'src' in elem && (srcset || src || isPicture);
        event = {
          target: elem
        };
        addClass(elem, lazySizesCfg.loadingClass);

        if (firesLoad) {
          clearTimeout(resetPreloadingTimer);
          resetPreloadingTimer = setTimeout(resetPreloading, 2500);
          addRemoveLoadEvents(elem, rafSwitchLoadingClass, true);
        }

        if (isPicture) {
          forEach.call(parent.getElementsByTagName('source'), handleSources);
        }

        if (srcset) {
          elem.setAttribute('srcset', srcset);
        } else if (src && !isPicture) {
          if (regIframe.test(elem.nodeName)) {
            changeIframeSrc(elem, src);
          } else {
            elem.src = src;
          }
        }

        if (isImg && (srcset || isPicture)) {
          updatePolyfill(elem, {
            src: src
          });
        }
      }

      if (elem._lazyRace) {
        delete elem._lazyRace;
      }

      removeClass(elem, lazySizesCfg.lazyClass);
      rAF(function () {
        // Part of this can be removed as soon as this fix is older: https://bugs.chromium.org/p/chromium/issues/detail?id=7731 (2015)
        var isLoaded = elem.complete && elem.naturalWidth > 1;

        if (!firesLoad || isLoaded) {
          if (isLoaded) {
            addClass(elem, 'ls-is-cached');
          }

          switchLoadingClass(event);
          elem._lazyCache = true;
          setTimeout(function () {
            if ('_lazyCache' in elem) {
              delete elem._lazyCache;
            }
          }, 9);
        }

        if (elem.loading == 'lazy') {
          isLoading--;
        }
      }, true);
    });

    var unveilElement = function unveilElement(elem) {
      if (elem._lazyRace) {
        return;
      }

      var detail;
      var isImg = regImg.test(elem.nodeName); //allow using sizes="auto", but don't use. it's invalid. Use data-sizes="auto" or a valid value for sizes instead (i.e.: sizes="80vw")

      var sizes = isImg && (elem[_getAttribute](lazySizesCfg.sizesAttr) || elem[_getAttribute]('sizes'));

      var isAuto = sizes == 'auto';

      if ((isAuto || !isCompleted) && isImg && (elem[_getAttribute]('src') || elem.srcset) && !elem.complete && !hasClass(elem, lazySizesCfg.errorClass) && hasClass(elem, lazySizesCfg.lazyClass)) {
        return;
      }

      detail = triggerEvent(elem, 'lazyunveilread').detail;

      if (isAuto) {
        autoSizer.updateElem(elem, true, elem.offsetWidth);
      }

      elem._lazyRace = true;
      isLoading++;
      lazyUnveil(elem, detail, isAuto, sizes, isImg);
    };

    var afterScroll = debounce(function () {
      lazySizesCfg.loadMode = 3;
      throttledCheckElements();
    });

    var altLoadmodeScrollListner = function altLoadmodeScrollListner() {
      if (lazySizesCfg.loadMode == 3) {
        lazySizesCfg.loadMode = 2;
      }

      afterScroll();
    };

    var onload = function onload() {
      if (isCompleted) {
        return;
      }

      if (Date.now() - started < 999) {
        setTimeout(onload, 999);
        return;
      }

      isCompleted = true;
      lazySizesCfg.loadMode = 3;
      throttledCheckElements();
      addEventListener('scroll', altLoadmodeScrollListner, true);
    };

    return {
      _: function _() {
        started = Date.now();
        lazysizes.elements = document.getElementsByClassName(lazySizesCfg.lazyClass);
        preloadElems = document.getElementsByClassName(lazySizesCfg.lazyClass + ' ' + lazySizesCfg.preloadClass);
        addEventListener('scroll', throttledCheckElements, true);
        addEventListener('resize', throttledCheckElements, true);
        addEventListener('pageshow', function (e) {
          if (e.persisted) {
            var loadingElements = document.querySelectorAll('.' + lazySizesCfg.loadingClass);

            if (loadingElements.length && loadingElements.forEach) {
              requestAnimationFrame(function () {
                loadingElements.forEach(function (img) {
                  if (img.complete) {
                    unveilElement(img);
                  }
                });
              });
            }
          }
        });

        if (window.MutationObserver) {
          new MutationObserver(throttledCheckElements).observe(docElem, {
            childList: true,
            subtree: true,
            attributes: true
          });
        } else {
          docElem[_addEventListener]('DOMNodeInserted', throttledCheckElements, true);

          docElem[_addEventListener]('DOMAttrModified', throttledCheckElements, true);

          setInterval(throttledCheckElements, 999);
        }

        addEventListener('hashchange', throttledCheckElements, true); //, 'fullscreenchange'

        ['focus', 'mouseover', 'click', 'load', 'transitionend', 'animationend'].forEach(function (name) {
          document[_addEventListener](name, throttledCheckElements, true);
        });

        if (/d$|^c/.test(document.readyState)) {
          onload();
        } else {
          addEventListener('load', onload);

          document[_addEventListener]('DOMContentLoaded', throttledCheckElements);

          setTimeout(onload, 20000);
        }

        if (lazysizes.elements.length) {
          checkElements();

          rAF._lsFlush();
        } else {
          throttledCheckElements();
        }
      },
      checkElems: throttledCheckElements,
      unveil: unveilElement,
      _aLSL: altLoadmodeScrollListner
    };
  }();

  var autoSizer = function () {
    var autosizesElems;
    var sizeElement = rAFIt(function (elem, parent, event, width) {
      var sources, i, len;
      elem._lazysizesWidth = width;
      width += 'px';
      elem.setAttribute('sizes', width);

      if (regPicture.test(parent.nodeName || '')) {
        sources = parent.getElementsByTagName('source');

        for (i = 0, len = sources.length; i < len; i++) {
          sources[i].setAttribute('sizes', width);
        }
      }

      if (!event.detail.dataAttr) {
        updatePolyfill(elem, event.detail);
      }
    });

    var getSizeElement = function getSizeElement(elem, dataAttr, width) {
      var event;
      var parent = elem.parentNode;

      if (parent) {
        width = getWidth(elem, parent, width);
        event = triggerEvent(elem, 'lazybeforesizes', {
          width: width,
          dataAttr: !!dataAttr
        });

        if (!event.defaultPrevented) {
          width = event.detail.width;

          if (width && width !== elem._lazysizesWidth) {
            sizeElement(elem, parent, event, width);
          }
        }
      }
    };

    var updateElementsSizes = function updateElementsSizes() {
      var i;
      var len = autosizesElems.length;

      if (len) {
        i = 0;

        for (; i < len; i++) {
          getSizeElement(autosizesElems[i]);
        }
      }
    };

    var debouncedUpdateElementsSizes = debounce(updateElementsSizes);
    return {
      _: function _() {
        autosizesElems = document.getElementsByClassName(lazySizesCfg.autosizesClass);
        addEventListener('resize', debouncedUpdateElementsSizes);
      },
      checkElems: debouncedUpdateElementsSizes,
      updateElem: getSizeElement
    };
  }();

  var init = function init() {
    if (!init.i && document.getElementsByClassName) {
      init.i = true;

      autoSizer._();

      loader._();
    }
  };

  setTimeout(function () {
    if (lazySizesCfg.init) {
      init();
    }
  });
  lazysizes = {
    cfg: lazySizesCfg,
    autoSizer: autoSizer,
    loader: loader,
    init: init,
    uP: updatePolyfill,
    aC: addClass,
    rC: removeClass,
    hC: hasClass,
    fire: triggerEvent,
    gW: getWidth,
    rAF: rAF
  };
  return lazysizes;
});
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Swiper 3.4.2
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * 
 * http://www.idangero.us/swiper/
 * 
 * Copyright 2017, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 * 
 * Licensed under MIT
 * 
 * Released on: March 10, 2017
 */
(function () {
  'use strict';

  var $;
  /*===========================
  Swiper
  ===========================*/

  var Swiper = function Swiper(container, params) {
    if (!(this instanceof Swiper)) return new Swiper(container, params);
    var defaults = {
      direction: 'horizontal',
      touchEventsTarget: 'container',
      initialSlide: 0,
      speed: 300,
      // autoplay
      autoplay: false,
      autoplayDisableOnInteraction: true,
      autoplayStopOnLast: false,
      // To support iOS's swipe-to-go-back gesture (when being used in-app, with UIWebView).
      iOSEdgeSwipeDetection: false,
      iOSEdgeSwipeThreshold: 20,
      // Free mode
      freeMode: false,
      freeModeMomentum: true,
      freeModeMomentumRatio: 1,
      freeModeMomentumBounce: true,
      freeModeMomentumBounceRatio: 1,
      freeModeMomentumVelocityRatio: 1,
      freeModeSticky: false,
      freeModeMinimumVelocity: 0.02,
      // Autoheight
      autoHeight: false,
      // Set wrapper width
      setWrapperSize: false,
      // Virtual Translate
      virtualTranslate: false,
      // Effects
      effect: 'slide',
      // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
      coverflow: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true
      },
      flip: {
        slideShadows: true,
        limitRotation: true
      },
      cube: {
        slideShadows: true,
        shadow: true,
        shadowOffset: 20,
        shadowScale: 0.94
      },
      fade: {
        crossFade: false
      },
      // Parallax
      parallax: false,
      // Zoom
      zoom: false,
      zoomMax: 3,
      zoomMin: 1,
      zoomToggle: true,
      // Scrollbar
      scrollbar: null,
      scrollbarHide: true,
      scrollbarDraggable: false,
      scrollbarSnapOnRelease: false,
      // Keyboard Mousewheel
      keyboardControl: false,
      mousewheelControl: false,
      mousewheelReleaseOnEdges: false,
      mousewheelInvert: false,
      mousewheelForceToAxis: false,
      mousewheelSensitivity: 1,
      mousewheelEventsTarged: 'container',
      // Hash Navigation
      hashnav: false,
      hashnavWatchState: false,
      // History
      history: false,
      // Commong Nav State
      replaceState: false,
      // Breakpoints
      breakpoints: undefined,
      // Slides grid
      spaceBetween: 0,
      slidesPerView: 1,
      slidesPerColumn: 1,
      slidesPerColumnFill: 'column',
      slidesPerGroup: 1,
      centeredSlides: false,
      slidesOffsetBefore: 0,
      // in px
      slidesOffsetAfter: 0,
      // in px
      // Round length
      roundLengths: false,
      // Touches
      touchRatio: 1,
      touchAngle: 45,
      simulateTouch: true,
      shortSwipes: true,
      longSwipes: true,
      longSwipesRatio: 0.5,
      longSwipesMs: 300,
      followFinger: true,
      onlyExternal: false,
      threshold: 0,
      touchMoveStopPropagation: true,
      touchReleaseOnEdges: false,
      // Unique Navigation Elements
      uniqueNavElements: true,
      // Pagination
      pagination: null,
      paginationElement: 'span',
      paginationClickable: false,
      paginationHide: false,
      paginationBulletRender: null,
      paginationProgressRender: null,
      paginationFractionRender: null,
      paginationCustomRender: null,
      paginationType: 'bullets',
      // 'bullets' or 'progress' or 'fraction' or 'custom'
      // Resistance
      resistance: true,
      resistanceRatio: 0.85,
      // Next/prev buttons
      nextButton: null,
      prevButton: null,
      // Progress
      watchSlidesProgress: false,
      watchSlidesVisibility: false,
      // Cursor
      grabCursor: false,
      // Clicks
      preventClicks: true,
      preventClicksPropagation: true,
      slideToClickedSlide: false,
      // Lazy Loading
      lazyLoading: false,
      lazyLoadingInPrevNext: false,
      lazyLoadingInPrevNextAmount: 1,
      lazyLoadingOnTransitionStart: false,
      // Images
      preloadImages: true,
      updateOnImagesReady: true,
      // loop
      loop: false,
      loopAdditionalSlides: 0,
      loopedSlides: null,
      // Control
      control: undefined,
      controlInverse: false,
      controlBy: 'slide',
      //or 'container'
      normalizeSlideIndex: true,
      // Swiping/no swiping
      allowSwipeToPrev: true,
      allowSwipeToNext: true,
      swipeHandler: null,
      //'.swipe-handler',
      noSwiping: true,
      noSwipingClass: 'swiper-no-swiping',
      // Passive Listeners
      passiveListeners: true,
      // NS
      containerModifierClass: 'swiper-container-',
      // NEW
      slideClass: 'swiper-slide',
      slideActiveClass: 'swiper-slide-active',
      slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
      slideVisibleClass: 'swiper-slide-visible',
      slideDuplicateClass: 'swiper-slide-duplicate',
      slideNextClass: 'swiper-slide-next',
      slideDuplicateNextClass: 'swiper-slide-duplicate-next',
      slidePrevClass: 'swiper-slide-prev',
      slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',
      wrapperClass: 'swiper-wrapper',
      bulletClass: 'swiper-pagination-bullet',
      bulletActiveClass: 'swiper-pagination-bullet-active',
      buttonDisabledClass: 'swiper-button-disabled',
      paginationCurrentClass: 'swiper-pagination-current',
      paginationTotalClass: 'swiper-pagination-total',
      paginationHiddenClass: 'swiper-pagination-hidden',
      paginationProgressbarClass: 'swiper-pagination-progressbar',
      paginationClickableClass: 'swiper-pagination-clickable',
      // NEW
      paginationModifierClass: 'swiper-pagination-',
      // NEW
      lazyLoadingClass: 'swiper-lazy',
      lazyStatusLoadingClass: 'swiper-lazy-loading',
      lazyStatusLoadedClass: 'swiper-lazy-loaded',
      lazyPreloaderClass: 'swiper-lazy-preloader',
      notificationClass: 'swiper-notification',
      preloaderClass: 'preloader',
      zoomContainerClass: 'swiper-zoom-container',
      // Observer
      observer: false,
      observeParents: false,
      // Accessibility
      a11y: false,
      prevSlideMessage: 'Previous slide',
      nextSlideMessage: 'Next slide',
      firstSlideMessage: 'This is the first slide',
      lastSlideMessage: 'This is the last slide',
      paginationBulletMessage: 'Go to slide {{index}}',
      // Callbacks
      runCallbacksOnInit: true
      /*
      Callbacks:
      onInit: function (swiper)
      onDestroy: function (swiper)
      onBeforeResize: function (swiper)
      onAfterResize: function (swiper)
      onClick: function (swiper, e)
      onTap: function (swiper, e)
      onDoubleTap: function (swiper, e)
      onSliderMove: function (swiper, e)
      onSlideChangeStart: function (swiper)
      onSlideChangeEnd: function (swiper)
      onTransitionStart: function (swiper)
      onTransitionEnd: function (swiper)
      onImagesReady: function (swiper)
      onProgress: function (swiper, progress)
      onTouchStart: function (swiper, e)
      onTouchMove: function (swiper, e)
      onTouchMoveOpposite: function (swiper, e)
      onTouchEnd: function (swiper, e)
      onReachBeginning: function (swiper)
      onReachEnd: function (swiper)
      onSetTransition: function (swiper, duration)
      onSetTranslate: function (swiper, translate)
      onAutoplayStart: function (swiper)
      onAutoplayStop: function (swiper),
      onLazyImageLoad: function (swiper, slide, image)
      onLazyImageReady: function (swiper, slide, image)
      onKeyPress: function (swiper, keyCode)
      */

    };
    var initialVirtualTranslate = params && params.virtualTranslate;
    params = params || {};
    var originalParams = {};

    for (var param in params) {
      if (_typeof(params[param]) === 'object' && params[param] !== null && !(params[param].nodeType || params[param] === window || params[param] === document || typeof Dom7 !== 'undefined' && params[param] instanceof Dom7 || typeof jQuery !== 'undefined' && params[param] instanceof jQuery)) {
        originalParams[param] = {};

        for (var deepParam in params[param]) {
          originalParams[param][deepParam] = params[param][deepParam];
        }
      } else {
        originalParams[param] = params[param];
      }
    }

    for (var def in defaults) {
      if (typeof params[def] === 'undefined') {
        params[def] = defaults[def];
      } else if (_typeof(params[def]) === 'object') {
        for (var deepDef in defaults[def]) {
          if (typeof params[def][deepDef] === 'undefined') {
            params[def][deepDef] = defaults[def][deepDef];
          }
        }
      }
    } // Swiper


    var s = this; // Params

    s.params = params;
    s.originalParams = originalParams; // Classname

    s.classNames = [];
    /*=========================
      Dom Library and plugins
      ===========================*/

    if (typeof $ !== 'undefined' && typeof Dom7 !== 'undefined') {
      $ = Dom7;
    }

    if (typeof $ === 'undefined') {
      if (typeof Dom7 === 'undefined') {
        $ = window.Dom7 || window.Zepto || window.jQuery;
      } else {
        $ = Dom7;
      }

      if (!$) return;
    } // Export it to Swiper instance


    s.$ = $;
    /*=========================
      Breakpoints
      ===========================*/

    s.currentBreakpoint = undefined;

    s.getActiveBreakpoint = function () {
      //Get breakpoint for window width
      if (!s.params.breakpoints) return false;
      var breakpoint = false;
      var points = [],
          point;

      for (point in s.params.breakpoints) {
        if (s.params.breakpoints.hasOwnProperty(point)) {
          points.push(point);
        }
      }

      points.sort(function (a, b) {
        return parseInt(a, 10) > parseInt(b, 10);
      });

      for (var i = 0; i < points.length; i++) {
        point = points[i];

        if (point >= window.innerWidth && !breakpoint) {
          breakpoint = point;
        }
      }

      return breakpoint || 'max';
    };

    s.setBreakpoint = function () {
      //Set breakpoint for window width and update parameters
      var breakpoint = s.getActiveBreakpoint();

      if (breakpoint && s.currentBreakpoint !== breakpoint) {
        var breakPointsParams = breakpoint in s.params.breakpoints ? s.params.breakpoints[breakpoint] : s.originalParams;
        var needsReLoop = s.params.loop && breakPointsParams.slidesPerView !== s.params.slidesPerView;

        for (var param in breakPointsParams) {
          s.params[param] = breakPointsParams[param];
        }

        s.currentBreakpoint = breakpoint;

        if (needsReLoop && s.destroyLoop) {
          s.reLoop(true);
        }
      }
    }; // Set breakpoint on load


    if (s.params.breakpoints) {
      s.setBreakpoint();
    }
    /*=========================
      Preparation - Define Container, Wrapper and Pagination
      ===========================*/


    s.container = $(container);
    if (s.container.length === 0) return;

    if (s.container.length > 1) {
      var swipers = [];
      s.container.each(function () {
        var container = this;
        swipers.push(new Swiper(this, params));
      });
      return swipers;
    } // Save instance in container HTML Element and in data


    s.container[0].swiper = s;
    s.container.data('swiper', s);
    s.classNames.push(s.params.containerModifierClass + s.params.direction);

    if (s.params.freeMode) {
      s.classNames.push(s.params.containerModifierClass + 'free-mode');
    }

    if (!s.support.flexbox) {
      s.classNames.push(s.params.containerModifierClass + 'no-flexbox');
      s.params.slidesPerColumn = 1;
    }

    if (s.params.autoHeight) {
      s.classNames.push(s.params.containerModifierClass + 'autoheight');
    } // Enable slides progress when required


    if (s.params.parallax || s.params.watchSlidesVisibility) {
      s.params.watchSlidesProgress = true;
    } // Max resistance when touchReleaseOnEdges


    if (s.params.touchReleaseOnEdges) {
      s.params.resistanceRatio = 0;
    } // Coverflow / 3D


    if (['cube', 'coverflow', 'flip'].indexOf(s.params.effect) >= 0) {
      if (s.support.transforms3d) {
        s.params.watchSlidesProgress = true;
        s.classNames.push(s.params.containerModifierClass + '3d');
      } else {
        s.params.effect = 'slide';
      }
    }

    if (s.params.effect !== 'slide') {
      s.classNames.push(s.params.containerModifierClass + s.params.effect);
    }

    if (s.params.effect === 'cube') {
      s.params.resistanceRatio = 0;
      s.params.slidesPerView = 1;
      s.params.slidesPerColumn = 1;
      s.params.slidesPerGroup = 1;
      s.params.centeredSlides = false;
      s.params.spaceBetween = 0;
      s.params.virtualTranslate = true;
    }

    if (s.params.effect === 'fade' || s.params.effect === 'flip') {
      s.params.slidesPerView = 1;
      s.params.slidesPerColumn = 1;
      s.params.slidesPerGroup = 1;
      s.params.watchSlidesProgress = true;
      s.params.spaceBetween = 0;

      if (typeof initialVirtualTranslate === 'undefined') {
        s.params.virtualTranslate = true;
      }
    } // Grab Cursor


    if (s.params.grabCursor && s.support.touch) {
      s.params.grabCursor = false;
    } // Wrapper


    s.wrapper = s.container.children('.' + s.params.wrapperClass); // Pagination

    if (s.params.pagination) {
      s.paginationContainer = $(s.params.pagination);

      if (s.params.uniqueNavElements && typeof s.params.pagination === 'string' && s.paginationContainer.length > 1 && s.container.find(s.params.pagination).length === 1) {
        s.paginationContainer = s.container.find(s.params.pagination);
      }

      if (s.params.paginationType === 'bullets' && s.params.paginationClickable) {
        s.paginationContainer.addClass(s.params.paginationModifierClass + 'clickable');
      } else {
        s.params.paginationClickable = false;
      }

      s.paginationContainer.addClass(s.params.paginationModifierClass + s.params.paginationType);
    } // Next/Prev Buttons


    if (s.params.nextButton || s.params.prevButton) {
      if (s.params.nextButton) {
        s.nextButton = $(s.params.nextButton);

        if (s.params.uniqueNavElements && typeof s.params.nextButton === 'string' && s.nextButton.length > 1 && s.container.find(s.params.nextButton).length === 1) {
          s.nextButton = s.container.find(s.params.nextButton);
        }
      }

      if (s.params.prevButton) {
        s.prevButton = $(s.params.prevButton);

        if (s.params.uniqueNavElements && typeof s.params.prevButton === 'string' && s.prevButton.length > 1 && s.container.find(s.params.prevButton).length === 1) {
          s.prevButton = s.container.find(s.params.prevButton);
        }
      }
    } // Is Horizontal


    s.isHorizontal = function () {
      return s.params.direction === 'horizontal';
    }; // s.isH = isH;
    // RTL


    s.rtl = s.isHorizontal() && (s.container[0].dir.toLowerCase() === 'rtl' || s.container.css('direction') === 'rtl');

    if (s.rtl) {
      s.classNames.push(s.params.containerModifierClass + 'rtl');
    } // Wrong RTL support


    if (s.rtl) {
      s.wrongRTL = s.wrapper.css('display') === '-webkit-box';
    } // Columns


    if (s.params.slidesPerColumn > 1) {
      s.classNames.push(s.params.containerModifierClass + 'multirow');
    } // Check for Android


    if (s.device.android) {
      s.classNames.push(s.params.containerModifierClass + 'android');
    } // Add classes


    s.container.addClass(s.classNames.join(' ')); // Translate

    s.translate = 0; // Progress

    s.progress = 0; // Velocity

    s.velocity = 0;
    /*=========================
      Locks, unlocks
      ===========================*/

    s.lockSwipeToNext = function () {
      s.params.allowSwipeToNext = false;

      if (s.params.allowSwipeToPrev === false && s.params.grabCursor) {
        s.unsetGrabCursor();
      }
    };

    s.lockSwipeToPrev = function () {
      s.params.allowSwipeToPrev = false;

      if (s.params.allowSwipeToNext === false && s.params.grabCursor) {
        s.unsetGrabCursor();
      }
    };

    s.lockSwipes = function () {
      s.params.allowSwipeToNext = s.params.allowSwipeToPrev = false;
      if (s.params.grabCursor) s.unsetGrabCursor();
    };

    s.unlockSwipeToNext = function () {
      s.params.allowSwipeToNext = true;

      if (s.params.allowSwipeToPrev === true && s.params.grabCursor) {
        s.setGrabCursor();
      }
    };

    s.unlockSwipeToPrev = function () {
      s.params.allowSwipeToPrev = true;

      if (s.params.allowSwipeToNext === true && s.params.grabCursor) {
        s.setGrabCursor();
      }
    };

    s.unlockSwipes = function () {
      s.params.allowSwipeToNext = s.params.allowSwipeToPrev = true;
      if (s.params.grabCursor) s.setGrabCursor();
    };
    /*=========================
      Round helper
      ===========================*/


    function round(a) {
      return Math.floor(a);
    }
    /*=========================
      Set grab cursor
      ===========================*/


    s.setGrabCursor = function (moving) {
      s.container[0].style.cursor = 'move';
      s.container[0].style.cursor = moving ? '-webkit-grabbing' : '-webkit-grab';
      s.container[0].style.cursor = moving ? '-moz-grabbin' : '-moz-grab';
      s.container[0].style.cursor = moving ? 'grabbing' : 'grab';
    };

    s.unsetGrabCursor = function () {
      s.container[0].style.cursor = '';
    };

    if (s.params.grabCursor) {
      s.setGrabCursor();
    }
    /*=========================
      Update on Images Ready
      ===========================*/


    s.imagesToLoad = [];
    s.imagesLoaded = 0;

    s.loadImage = function (imgElement, src, srcset, sizes, checkForComplete, callback) {
      var image;

      function onReady() {
        if (callback) callback();
      }

      if (!imgElement.complete || !checkForComplete) {
        if (src) {
          image = new window.Image();
          image.onload = onReady;
          image.onerror = onReady;

          if (sizes) {
            image.sizes = sizes;
          }

          if (srcset) {
            image.srcset = srcset;
          }

          if (src) {
            image.src = src;
          }
        } else {
          onReady();
        }
      } else {
        //image already loaded...
        onReady();
      }
    };

    s.preloadImages = function () {
      s.imagesToLoad = s.container.find('img');

      function _onReady() {
        if (typeof s === 'undefined' || s === null || !s) return;
        if (s.imagesLoaded !== undefined) s.imagesLoaded++;

        if (s.imagesLoaded === s.imagesToLoad.length) {
          if (s.params.updateOnImagesReady) s.update();
          s.emit('onImagesReady', s);
        }
      }

      for (var i = 0; i < s.imagesToLoad.length; i++) {
        s.loadImage(s.imagesToLoad[i], s.imagesToLoad[i].currentSrc || s.imagesToLoad[i].getAttribute('src'), s.imagesToLoad[i].srcset || s.imagesToLoad[i].getAttribute('srcset'), s.imagesToLoad[i].sizes || s.imagesToLoad[i].getAttribute('sizes'), true, _onReady);
      }
    };
    /*=========================
      Autoplay
      ===========================*/


    s.autoplayTimeoutId = undefined;
    s.autoplaying = false;
    s.autoplayPaused = false;

    function autoplay() {
      var autoplayDelay = s.params.autoplay;
      var activeSlide = s.slides.eq(s.activeIndex);

      if (activeSlide.attr('data-swiper-autoplay')) {
        autoplayDelay = activeSlide.attr('data-swiper-autoplay') || s.params.autoplay;
      }

      s.autoplayTimeoutId = setTimeout(function () {
        if (s.params.loop) {
          s.fixLoop();

          s._slideNext();

          s.emit('onAutoplay', s);
        } else {
          if (!s.isEnd) {
            s._slideNext();

            s.emit('onAutoplay', s);
          } else {
            if (!params.autoplayStopOnLast) {
              s._slideTo(0);

              s.emit('onAutoplay', s);
            } else {
              s.stopAutoplay();
            }
          }
        }
      }, autoplayDelay);
    }

    s.startAutoplay = function () {
      if (typeof s.autoplayTimeoutId !== 'undefined') return false;
      if (!s.params.autoplay) return false;
      if (s.autoplaying) return false;
      s.autoplaying = true;
      s.emit('onAutoplayStart', s);
      autoplay();
    };

    s.stopAutoplay = function (internal) {
      if (!s.autoplayTimeoutId) return;
      if (s.autoplayTimeoutId) clearTimeout(s.autoplayTimeoutId);
      s.autoplaying = false;
      s.autoplayTimeoutId = undefined;
      s.emit('onAutoplayStop', s);
    };

    s.pauseAutoplay = function (speed) {
      if (s.autoplayPaused) return;
      if (s.autoplayTimeoutId) clearTimeout(s.autoplayTimeoutId);
      s.autoplayPaused = true;

      if (speed === 0) {
        s.autoplayPaused = false;
        autoplay();
      } else {
        s.wrapper.transitionEnd(function () {
          if (!s) return;
          s.autoplayPaused = false;

          if (!s.autoplaying) {
            s.stopAutoplay();
          } else {
            autoplay();
          }
        });
      }
    };
    /*=========================
      Min/Max Translate
      ===========================*/


    s.minTranslate = function () {
      return -s.snapGrid[0];
    };

    s.maxTranslate = function () {
      return -s.snapGrid[s.snapGrid.length - 1];
    };
    /*=========================
      Slider/slides sizes
      ===========================*/


    s.updateAutoHeight = function () {
      var activeSlides = [];
      var newHeight = 0;
      var i; // Find slides currently in view

      if (s.params.slidesPerView !== 'auto' && s.params.slidesPerView > 1) {
        for (i = 0; i < Math.ceil(s.params.slidesPerView); i++) {
          var index = s.activeIndex + i;
          if (index > s.slides.length) break;
          activeSlides.push(s.slides.eq(index)[0]);
        }
      } else {
        activeSlides.push(s.slides.eq(s.activeIndex)[0]);
      } // Find new height from heighest slide in view


      for (i = 0; i < activeSlides.length; i++) {
        if (typeof activeSlides[i] !== 'undefined') {
          var height = activeSlides[i].offsetHeight;
          newHeight = height > newHeight ? height : newHeight;
        }
      } // Update Height


      if (newHeight) s.wrapper.css('height', newHeight + 'px');
    };

    s.updateContainerSize = function () {
      var width, height;

      if (typeof s.params.width !== 'undefined') {
        width = s.params.width;
      } else {
        width = s.container[0].clientWidth;
      }

      if (typeof s.params.height !== 'undefined') {
        height = s.params.height;
      } else {
        height = s.container[0].clientHeight;
      }

      if (width === 0 && s.isHorizontal() || height === 0 && !s.isHorizontal()) {
        return;
      } //Subtract paddings


      width = width - parseInt(s.container.css('padding-left'), 10) - parseInt(s.container.css('padding-right'), 10);
      height = height - parseInt(s.container.css('padding-top'), 10) - parseInt(s.container.css('padding-bottom'), 10); // Store values

      s.width = width;
      s.height = height;
      s.size = s.isHorizontal() ? s.width : s.height;
    };

    s.updateSlidesSize = function () {
      s.slides = s.wrapper.children('.' + s.params.slideClass);
      s.snapGrid = [];
      s.slidesGrid = [];
      s.slidesSizesGrid = [];
      var spaceBetween = s.params.spaceBetween,
          slidePosition = -s.params.slidesOffsetBefore,
          i,
          prevSlideSize = 0,
          index = 0;
      if (typeof s.size === 'undefined') return;

      if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
        spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * s.size;
      }

      s.virtualSize = -spaceBetween; // reset margins

      if (s.rtl) s.slides.css({
        marginLeft: '',
        marginTop: ''
      });else s.slides.css({
        marginRight: '',
        marginBottom: ''
      });
      var slidesNumberEvenToRows;

      if (s.params.slidesPerColumn > 1) {
        if (Math.floor(s.slides.length / s.params.slidesPerColumn) === s.slides.length / s.params.slidesPerColumn) {
          slidesNumberEvenToRows = s.slides.length;
        } else {
          slidesNumberEvenToRows = Math.ceil(s.slides.length / s.params.slidesPerColumn) * s.params.slidesPerColumn;
        }

        if (s.params.slidesPerView !== 'auto' && s.params.slidesPerColumnFill === 'row') {
          slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, s.params.slidesPerView * s.params.slidesPerColumn);
        }
      } // Calc slides


      var slideSize;
      var slidesPerColumn = s.params.slidesPerColumn;
      var slidesPerRow = slidesNumberEvenToRows / slidesPerColumn;
      var numFullColumns = slidesPerRow - (s.params.slidesPerColumn * slidesPerRow - s.slides.length);

      for (i = 0; i < s.slides.length; i++) {
        slideSize = 0;
        var slide = s.slides.eq(i);

        if (s.params.slidesPerColumn > 1) {
          // Set slides order
          var newSlideOrderIndex;
          var column, row;

          if (s.params.slidesPerColumnFill === 'column') {
            column = Math.floor(i / slidesPerColumn);
            row = i - column * slidesPerColumn;

            if (column > numFullColumns || column === numFullColumns && row === slidesPerColumn - 1) {
              if (++row >= slidesPerColumn) {
                row = 0;
                column++;
              }
            }

            newSlideOrderIndex = column + row * slidesNumberEvenToRows / slidesPerColumn;
            slide.css({
              '-webkit-box-ordinal-group': newSlideOrderIndex,
              '-moz-box-ordinal-group': newSlideOrderIndex,
              '-ms-flex-order': newSlideOrderIndex,
              '-webkit-order': newSlideOrderIndex,
              'order': newSlideOrderIndex
            });
          } else {
            row = Math.floor(i / slidesPerRow);
            column = i - row * slidesPerRow;
          }

          slide.css('margin-' + (s.isHorizontal() ? 'top' : 'left'), row !== 0 && s.params.spaceBetween && s.params.spaceBetween + 'px').attr('data-swiper-column', column).attr('data-swiper-row', row);
        }

        if (slide.css('display') === 'none') continue;

        if (s.params.slidesPerView === 'auto') {
          slideSize = s.isHorizontal() ? slide.outerWidth(true) : slide.outerHeight(true);
          if (s.params.roundLengths) slideSize = round(slideSize);
        } else {
          slideSize = (s.size - (s.params.slidesPerView - 1) * spaceBetween) / s.params.slidesPerView;
          if (s.params.roundLengths) slideSize = round(slideSize);

          if (s.isHorizontal()) {
            s.slides[i].style.width = slideSize + 'px';
          } else {
            s.slides[i].style.height = slideSize + 'px';
          }
        }

        s.slides[i].swiperSlideSize = slideSize;
        s.slidesSizesGrid.push(slideSize);

        if (s.params.centeredSlides) {
          slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
          if (prevSlideSize === 0 && i !== 0) slidePosition = slidePosition - s.size / 2 - spaceBetween;
          if (i === 0) slidePosition = slidePosition - s.size / 2 - spaceBetween;
          if (Math.abs(slidePosition) < 1 / 1000) slidePosition = 0;
          if (index % s.params.slidesPerGroup === 0) s.snapGrid.push(slidePosition);
          s.slidesGrid.push(slidePosition);
        } else {
          if (index % s.params.slidesPerGroup === 0) s.snapGrid.push(slidePosition);
          s.slidesGrid.push(slidePosition);
          slidePosition = slidePosition + slideSize + spaceBetween;
        }

        s.virtualSize += slideSize + spaceBetween;
        prevSlideSize = slideSize;
        index++;
      }

      s.virtualSize = Math.max(s.virtualSize, s.size) + s.params.slidesOffsetAfter;
      var newSlidesGrid;

      if (s.rtl && s.wrongRTL && (s.params.effect === 'slide' || s.params.effect === 'coverflow')) {
        s.wrapper.css({
          width: s.virtualSize + s.params.spaceBetween + 'px'
        });
      }

      if (!s.support.flexbox || s.params.setWrapperSize) {
        if (s.isHorizontal()) s.wrapper.css({
          width: s.virtualSize + s.params.spaceBetween + 'px'
        });else s.wrapper.css({
          height: s.virtualSize + s.params.spaceBetween + 'px'
        });
      }

      if (s.params.slidesPerColumn > 1) {
        s.virtualSize = (slideSize + s.params.spaceBetween) * slidesNumberEvenToRows;
        s.virtualSize = Math.ceil(s.virtualSize / s.params.slidesPerColumn) - s.params.spaceBetween;
        if (s.isHorizontal()) s.wrapper.css({
          width: s.virtualSize + s.params.spaceBetween + 'px'
        });else s.wrapper.css({
          height: s.virtualSize + s.params.spaceBetween + 'px'
        });

        if (s.params.centeredSlides) {
          newSlidesGrid = [];

          for (i = 0; i < s.snapGrid.length; i++) {
            if (s.snapGrid[i] < s.virtualSize + s.snapGrid[0]) newSlidesGrid.push(s.snapGrid[i]);
          }

          s.snapGrid = newSlidesGrid;
        }
      } // Remove last grid elements depending on width


      if (!s.params.centeredSlides) {
        newSlidesGrid = [];

        for (i = 0; i < s.snapGrid.length; i++) {
          if (s.snapGrid[i] <= s.virtualSize - s.size) {
            newSlidesGrid.push(s.snapGrid[i]);
          }
        }

        s.snapGrid = newSlidesGrid;

        if (Math.floor(s.virtualSize - s.size) - Math.floor(s.snapGrid[s.snapGrid.length - 1]) > 1) {
          s.snapGrid.push(s.virtualSize - s.size);
        }
      }

      if (s.snapGrid.length === 0) s.snapGrid = [0];

      if (s.params.spaceBetween !== 0) {
        if (s.isHorizontal()) {
          if (s.rtl) s.slides.css({
            marginLeft: spaceBetween + 'px'
          });else s.slides.css({
            marginRight: spaceBetween + 'px'
          });
        } else s.slides.css({
          marginBottom: spaceBetween + 'px'
        });
      }

      if (s.params.watchSlidesProgress) {
        s.updateSlidesOffset();
      }
    };

    s.updateSlidesOffset = function () {
      for (var i = 0; i < s.slides.length; i++) {
        s.slides[i].swiperSlideOffset = s.isHorizontal() ? s.slides[i].offsetLeft : s.slides[i].offsetTop;
      }
    };
    /*=========================
      Dynamic Slides Per View
      ===========================*/


    s.currentSlidesPerView = function () {
      var spv = 1,
          i,
          j;

      if (s.params.centeredSlides) {
        var size = s.slides[s.activeIndex].swiperSlideSize;
        var breakLoop;

        for (i = s.activeIndex + 1; i < s.slides.length; i++) {
          if (s.slides[i] && !breakLoop) {
            size += s.slides[i].swiperSlideSize;
            spv++;
            if (size > s.size) breakLoop = true;
          }
        }

        for (j = s.activeIndex - 1; j >= 0; j--) {
          if (s.slides[j] && !breakLoop) {
            size += s.slides[j].swiperSlideSize;
            spv++;
            if (size > s.size) breakLoop = true;
          }
        }
      } else {
        for (i = s.activeIndex + 1; i < s.slides.length; i++) {
          if (s.slidesGrid[i] - s.slidesGrid[s.activeIndex] < s.size) {
            spv++;
          }
        }
      }

      return spv;
    };
    /*=========================
      Slider/slides progress
      ===========================*/


    s.updateSlidesProgress = function (translate) {
      if (typeof translate === 'undefined') {
        translate = s.translate || 0;
      }

      if (s.slides.length === 0) return;
      if (typeof s.slides[0].swiperSlideOffset === 'undefined') s.updateSlidesOffset();
      var offsetCenter = -translate;
      if (s.rtl) offsetCenter = translate; // Visible Slides

      s.slides.removeClass(s.params.slideVisibleClass);

      for (var i = 0; i < s.slides.length; i++) {
        var slide = s.slides[i];
        var slideProgress = (offsetCenter + (s.params.centeredSlides ? s.minTranslate() : 0) - slide.swiperSlideOffset) / (slide.swiperSlideSize + s.params.spaceBetween);

        if (s.params.watchSlidesVisibility) {
          var slideBefore = -(offsetCenter - slide.swiperSlideOffset);
          var slideAfter = slideBefore + s.slidesSizesGrid[i];
          var isVisible = slideBefore >= 0 && slideBefore < s.size || slideAfter > 0 && slideAfter <= s.size || slideBefore <= 0 && slideAfter >= s.size;

          if (isVisible) {
            s.slides.eq(i).addClass(s.params.slideVisibleClass);
          }
        }

        slide.progress = s.rtl ? -slideProgress : slideProgress;
      }
    };

    s.updateProgress = function (translate) {
      if (typeof translate === 'undefined') {
        translate = s.translate || 0;
      }

      var translatesDiff = s.maxTranslate() - s.minTranslate();
      var wasBeginning = s.isBeginning;
      var wasEnd = s.isEnd;

      if (translatesDiff === 0) {
        s.progress = 0;
        s.isBeginning = s.isEnd = true;
      } else {
        s.progress = (translate - s.minTranslate()) / translatesDiff;
        s.isBeginning = s.progress <= 0;
        s.isEnd = s.progress >= 1;
      }

      if (s.isBeginning && !wasBeginning) s.emit('onReachBeginning', s);
      if (s.isEnd && !wasEnd) s.emit('onReachEnd', s);
      if (s.params.watchSlidesProgress) s.updateSlidesProgress(translate);
      s.emit('onProgress', s, s.progress);
    };

    s.updateActiveIndex = function () {
      var translate = s.rtl ? s.translate : -s.translate;
      var newActiveIndex, i, snapIndex;

      for (i = 0; i < s.slidesGrid.length; i++) {
        if (typeof s.slidesGrid[i + 1] !== 'undefined') {
          if (translate >= s.slidesGrid[i] && translate < s.slidesGrid[i + 1] - (s.slidesGrid[i + 1] - s.slidesGrid[i]) / 2) {
            newActiveIndex = i;
          } else if (translate >= s.slidesGrid[i] && translate < s.slidesGrid[i + 1]) {
            newActiveIndex = i + 1;
          }
        } else {
          if (translate >= s.slidesGrid[i]) {
            newActiveIndex = i;
          }
        }
      } // Normalize slideIndex


      if (s.params.normalizeSlideIndex) {
        if (newActiveIndex < 0 || typeof newActiveIndex === 'undefined') newActiveIndex = 0;
      } // for (i = 0; i < s.slidesGrid.length; i++) {
      // if (- translate >= s.slidesGrid[i]) {
      // newActiveIndex = i;
      // }
      // }


      snapIndex = Math.floor(newActiveIndex / s.params.slidesPerGroup);
      if (snapIndex >= s.snapGrid.length) snapIndex = s.snapGrid.length - 1;

      if (newActiveIndex === s.activeIndex) {
        return;
      }

      s.snapIndex = snapIndex;
      s.previousIndex = s.activeIndex;
      s.activeIndex = newActiveIndex;
      s.updateClasses();
      s.updateRealIndex();
    };

    s.updateRealIndex = function () {
      s.realIndex = parseInt(s.slides.eq(s.activeIndex).attr('data-swiper-slide-index') || s.activeIndex, 10);
    };
    /*=========================
      Classes
      ===========================*/


    s.updateClasses = function () {
      s.slides.removeClass(s.params.slideActiveClass + ' ' + s.params.slideNextClass + ' ' + s.params.slidePrevClass + ' ' + s.params.slideDuplicateActiveClass + ' ' + s.params.slideDuplicateNextClass + ' ' + s.params.slideDuplicatePrevClass);
      var activeSlide = s.slides.eq(s.activeIndex); // Active classes

      activeSlide.addClass(s.params.slideActiveClass);

      if (params.loop) {
        // Duplicate to all looped slides
        if (activeSlide.hasClass(s.params.slideDuplicateClass)) {
          s.wrapper.children('.' + s.params.slideClass + ':not(.' + s.params.slideDuplicateClass + ')[data-swiper-slide-index="' + s.realIndex + '"]').addClass(s.params.slideDuplicateActiveClass);
        } else {
          s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + s.realIndex + '"]').addClass(s.params.slideDuplicateActiveClass);
        }
      } // Next Slide


      var nextSlide = activeSlide.next('.' + s.params.slideClass).addClass(s.params.slideNextClass);

      if (s.params.loop && nextSlide.length === 0) {
        nextSlide = s.slides.eq(0);
        nextSlide.addClass(s.params.slideNextClass);
      } // Prev Slide


      var prevSlide = activeSlide.prev('.' + s.params.slideClass).addClass(s.params.slidePrevClass);

      if (s.params.loop && prevSlide.length === 0) {
        prevSlide = s.slides.eq(-1);
        prevSlide.addClass(s.params.slidePrevClass);
      }

      if (params.loop) {
        // Duplicate to all looped slides
        if (nextSlide.hasClass(s.params.slideDuplicateClass)) {
          s.wrapper.children('.' + s.params.slideClass + ':not(.' + s.params.slideDuplicateClass + ')[data-swiper-slide-index="' + nextSlide.attr('data-swiper-slide-index') + '"]').addClass(s.params.slideDuplicateNextClass);
        } else {
          s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + nextSlide.attr('data-swiper-slide-index') + '"]').addClass(s.params.slideDuplicateNextClass);
        }

        if (prevSlide.hasClass(s.params.slideDuplicateClass)) {
          s.wrapper.children('.' + s.params.slideClass + ':not(.' + s.params.slideDuplicateClass + ')[data-swiper-slide-index="' + prevSlide.attr('data-swiper-slide-index') + '"]').addClass(s.params.slideDuplicatePrevClass);
        } else {
          s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + prevSlide.attr('data-swiper-slide-index') + '"]').addClass(s.params.slideDuplicatePrevClass);
        }
      } // Pagination


      if (s.paginationContainer && s.paginationContainer.length > 0) {
        // Current/Total
        var current,
            total = s.params.loop ? Math.ceil((s.slides.length - s.loopedSlides * 2) / s.params.slidesPerGroup) : s.snapGrid.length;

        if (s.params.loop) {
          current = Math.ceil((s.activeIndex - s.loopedSlides) / s.params.slidesPerGroup);

          if (current > s.slides.length - 1 - s.loopedSlides * 2) {
            current = current - (s.slides.length - s.loopedSlides * 2);
          }

          if (current > total - 1) current = current - total;
          if (current < 0 && s.params.paginationType !== 'bullets') current = total + current;
        } else {
          if (typeof s.snapIndex !== 'undefined') {
            current = s.snapIndex;
          } else {
            current = s.activeIndex || 0;
          }
        } // Types


        if (s.params.paginationType === 'bullets' && s.bullets && s.bullets.length > 0) {
          s.bullets.removeClass(s.params.bulletActiveClass);

          if (s.paginationContainer.length > 1) {
            s.bullets.each(function () {
              if ($(this).index() === current) $(this).addClass(s.params.bulletActiveClass);
            });
          } else {
            s.bullets.eq(current).addClass(s.params.bulletActiveClass);
          }
        }

        if (s.params.paginationType === 'fraction') {
          s.paginationContainer.find('.' + s.params.paginationCurrentClass).text(current + 1);
          s.paginationContainer.find('.' + s.params.paginationTotalClass).text(total);
        }

        if (s.params.paginationType === 'progress') {
          var scale = (current + 1) / total,
              scaleX = scale,
              scaleY = 1;

          if (!s.isHorizontal()) {
            scaleY = scale;
            scaleX = 1;
          }

          s.paginationContainer.find('.' + s.params.paginationProgressbarClass).transform('translate3d(0,0,0) scaleX(' + scaleX + ') scaleY(' + scaleY + ')').transition(s.params.speed);
        }

        if (s.params.paginationType === 'custom' && s.params.paginationCustomRender) {
          s.paginationContainer.html(s.params.paginationCustomRender(s, current + 1, total));
          s.emit('onPaginationRendered', s, s.paginationContainer[0]);
        }
      } // Next/active buttons


      if (!s.params.loop) {
        if (s.params.prevButton && s.prevButton && s.prevButton.length > 0) {
          if (s.isBeginning) {
            s.prevButton.addClass(s.params.buttonDisabledClass);
            if (s.params.a11y && s.a11y) s.a11y.disable(s.prevButton);
          } else {
            s.prevButton.removeClass(s.params.buttonDisabledClass);
            if (s.params.a11y && s.a11y) s.a11y.enable(s.prevButton);
          }
        }

        if (s.params.nextButton && s.nextButton && s.nextButton.length > 0) {
          if (s.isEnd) {
            s.nextButton.addClass(s.params.buttonDisabledClass);
            if (s.params.a11y && s.a11y) s.a11y.disable(s.nextButton);
          } else {
            s.nextButton.removeClass(s.params.buttonDisabledClass);
            if (s.params.a11y && s.a11y) s.a11y.enable(s.nextButton);
          }
        }
      }
    };
    /*=========================
      Pagination
      ===========================*/


    s.updatePagination = function () {
      if (!s.params.pagination) return;

      if (s.paginationContainer && s.paginationContainer.length > 0) {
        var paginationHTML = '';

        if (s.params.paginationType === 'bullets') {
          var numberOfBullets = s.params.loop ? Math.ceil((s.slides.length - s.loopedSlides * 2) / s.params.slidesPerGroup) : s.snapGrid.length;

          for (var i = 0; i < numberOfBullets; i++) {
            if (s.params.paginationBulletRender) {
              paginationHTML += s.params.paginationBulletRender(s, i, s.params.bulletClass);
            } else {
              paginationHTML += '<' + s.params.paginationElement + ' class="' + s.params.bulletClass + '"></' + s.params.paginationElement + '>';
            }
          }

          s.paginationContainer.html(paginationHTML);
          s.bullets = s.paginationContainer.find('.' + s.params.bulletClass);

          if (s.params.paginationClickable && s.params.a11y && s.a11y) {
            s.a11y.initPagination();
          }
        }

        if (s.params.paginationType === 'fraction') {
          if (s.params.paginationFractionRender) {
            paginationHTML = s.params.paginationFractionRender(s, s.params.paginationCurrentClass, s.params.paginationTotalClass);
          } else {
            paginationHTML = '<span class="' + s.params.paginationCurrentClass + '"></span>' + ' / ' + '<span class="' + s.params.paginationTotalClass + '"></span>';
          }

          s.paginationContainer.html(paginationHTML);
        }

        if (s.params.paginationType === 'progress') {
          if (s.params.paginationProgressRender) {
            paginationHTML = s.params.paginationProgressRender(s, s.params.paginationProgressbarClass);
          } else {
            paginationHTML = '<span class="' + s.params.paginationProgressbarClass + '"></span>';
          }

          s.paginationContainer.html(paginationHTML);
        }

        if (s.params.paginationType !== 'custom') {
          s.emit('onPaginationRendered', s, s.paginationContainer[0]);
        }
      }
    };
    /*=========================
      Common update method
      ===========================*/


    s.update = function (updateTranslate) {
      if (!s) return;
      s.updateContainerSize();
      s.updateSlidesSize();
      s.updateProgress();
      s.updatePagination();
      s.updateClasses();

      if (s.params.scrollbar && s.scrollbar) {
        s.scrollbar.set();
      }

      var newTranslate;

      function forceSetTranslate() {
        var translate = s.rtl ? -s.translate : s.translate;
        newTranslate = Math.min(Math.max(s.translate, s.maxTranslate()), s.minTranslate());
        s.setWrapperTranslate(newTranslate);
        s.updateActiveIndex();
        s.updateClasses();
      }

      if (updateTranslate) {
        var translated;

        if (s.controller && s.controller.spline) {
          s.controller.spline = undefined;
        }

        if (s.params.freeMode) {
          forceSetTranslate();

          if (s.params.autoHeight) {
            s.updateAutoHeight();
          }
        } else {
          if ((s.params.slidesPerView === 'auto' || s.params.slidesPerView > 1) && s.isEnd && !s.params.centeredSlides) {
            translated = s.slideTo(s.slides.length - 1, 0, false, true);
          } else {
            translated = s.slideTo(s.activeIndex, 0, false, true);
          }

          if (!translated) {
            forceSetTranslate();
          }
        }
      } else if (s.params.autoHeight) {
        s.updateAutoHeight();
      }
    };
    /*=========================
      Resize Handler
      ===========================*/


    s.onResize = function (forceUpdatePagination) {
      if (s.params.onBeforeResize) s.params.onBeforeResize(s); //Breakpoints

      if (s.params.breakpoints) {
        s.setBreakpoint();
      } // Disable locks on resize


      var allowSwipeToPrev = s.params.allowSwipeToPrev;
      var allowSwipeToNext = s.params.allowSwipeToNext;
      s.params.allowSwipeToPrev = s.params.allowSwipeToNext = true;
      s.updateContainerSize();
      s.updateSlidesSize();
      if (s.params.slidesPerView === 'auto' || s.params.freeMode || forceUpdatePagination) s.updatePagination();

      if (s.params.scrollbar && s.scrollbar) {
        s.scrollbar.set();
      }

      if (s.controller && s.controller.spline) {
        s.controller.spline = undefined;
      }

      var slideChangedBySlideTo = false;

      if (s.params.freeMode) {
        var newTranslate = Math.min(Math.max(s.translate, s.maxTranslate()), s.minTranslate());
        s.setWrapperTranslate(newTranslate);
        s.updateActiveIndex();
        s.updateClasses();

        if (s.params.autoHeight) {
          s.updateAutoHeight();
        }
      } else {
        s.updateClasses();

        if ((s.params.slidesPerView === 'auto' || s.params.slidesPerView > 1) && s.isEnd && !s.params.centeredSlides) {
          slideChangedBySlideTo = s.slideTo(s.slides.length - 1, 0, false, true);
        } else {
          slideChangedBySlideTo = s.slideTo(s.activeIndex, 0, false, true);
        }
      }

      if (s.params.lazyLoading && !slideChangedBySlideTo && s.lazy) {
        s.lazy.load();
      } // Return locks after resize


      s.params.allowSwipeToPrev = allowSwipeToPrev;
      s.params.allowSwipeToNext = allowSwipeToNext;
      if (s.params.onAfterResize) s.params.onAfterResize(s);
    };
    /*=========================
      Events
      ===========================*/
    //Define Touch Events


    s.touchEventsDesktop = {
      start: 'mousedown',
      move: 'mousemove',
      end: 'mouseup'
    };
    if (window.navigator.pointerEnabled) s.touchEventsDesktop = {
      start: 'pointerdown',
      move: 'pointermove',
      end: 'pointerup'
    };else if (window.navigator.msPointerEnabled) s.touchEventsDesktop = {
      start: 'MSPointerDown',
      move: 'MSPointerMove',
      end: 'MSPointerUp'
    };
    s.touchEvents = {
      start: s.support.touch || !s.params.simulateTouch ? 'touchstart' : s.touchEventsDesktop.start,
      move: s.support.touch || !s.params.simulateTouch ? 'touchmove' : s.touchEventsDesktop.move,
      end: s.support.touch || !s.params.simulateTouch ? 'touchend' : s.touchEventsDesktop.end
    }; // WP8 Touch Events Fix

    if (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) {
      (s.params.touchEventsTarget === 'container' ? s.container : s.wrapper).addClass('swiper-wp8-' + s.params.direction);
    } // Attach/detach events


    s.initEvents = function (detach) {
      var actionDom = detach ? 'off' : 'on';
      var action = detach ? 'removeEventListener' : 'addEventListener';
      var touchEventsTarget = s.params.touchEventsTarget === 'container' ? s.container[0] : s.wrapper[0];
      var target = s.support.touch ? touchEventsTarget : document;
      var moveCapture = s.params.nested ? true : false; //Touch Events

      if (s.browser.ie) {
        touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, false);
        target[action](s.touchEvents.move, s.onTouchMove, moveCapture);
        target[action](s.touchEvents.end, s.onTouchEnd, false);
      } else {
        if (s.support.touch) {
          var passiveListener = s.touchEvents.start === 'touchstart' && s.support.passiveListener && s.params.passiveListeners ? {
            passive: true,
            capture: false
          } : false;
          touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, passiveListener);
          touchEventsTarget[action](s.touchEvents.move, s.onTouchMove, moveCapture);
          touchEventsTarget[action](s.touchEvents.end, s.onTouchEnd, passiveListener);
        }

        if (params.simulateTouch && !s.device.ios && !s.device.android || params.simulateTouch && !s.support.touch && s.device.ios) {
          touchEventsTarget[action]('mousedown', s.onTouchStart, false);
          document[action]('mousemove', s.onTouchMove, moveCapture);
          document[action]('mouseup', s.onTouchEnd, false);
        }
      }

      window[action]('resize', s.onResize); // Next, Prev, Index

      if (s.params.nextButton && s.nextButton && s.nextButton.length > 0) {
        s.nextButton[actionDom]('click', s.onClickNext);
        if (s.params.a11y && s.a11y) s.nextButton[actionDom]('keydown', s.a11y.onEnterKey);
      }

      if (s.params.prevButton && s.prevButton && s.prevButton.length > 0) {
        s.prevButton[actionDom]('click', s.onClickPrev);
        if (s.params.a11y && s.a11y) s.prevButton[actionDom]('keydown', s.a11y.onEnterKey);
      }

      if (s.params.pagination && s.params.paginationClickable) {
        s.paginationContainer[actionDom]('click', '.' + s.params.bulletClass, s.onClickIndex);
        if (s.params.a11y && s.a11y) s.paginationContainer[actionDom]('keydown', '.' + s.params.bulletClass, s.a11y.onEnterKey);
      } // Prevent Links Clicks


      if (s.params.preventClicks || s.params.preventClicksPropagation) touchEventsTarget[action]('click', s.preventClicks, true);
    };

    s.attachEvents = function () {
      s.initEvents();
    };

    s.detachEvents = function () {
      s.initEvents(true);
    };
    /*=========================
      Handle Clicks
      ===========================*/
    // Prevent Clicks


    s.allowClick = true;

    s.preventClicks = function (e) {
      if (!s.allowClick) {
        if (s.params.preventClicks) e.preventDefault();

        if (s.params.preventClicksPropagation && s.animating) {
          e.stopPropagation();
          e.stopImmediatePropagation();
        }
      }
    }; // Clicks


    s.onClickNext = function (e) {
      e.preventDefault();
      if (s.isEnd && !s.params.loop) return;
      s.slideNext();
    };

    s.onClickPrev = function (e) {
      e.preventDefault();
      if (s.isBeginning && !s.params.loop) return;
      s.slidePrev();
    };

    s.onClickIndex = function (e) {
      e.preventDefault();
      var index = $(this).index() * s.params.slidesPerGroup;
      if (s.params.loop) index = index + s.loopedSlides;
      s.slideTo(index);
    };
    /*=========================
      Handle Touches
      ===========================*/


    function findElementInEvent(e, selector) {
      var el = $(e.target);

      if (!el.is(selector)) {
        if (typeof selector === 'string') {
          el = el.parents(selector);
        } else if (selector.nodeType) {
          var found;
          el.parents().each(function (index, _el) {
            if (_el === selector) found = selector;
          });
          if (!found) return undefined;else return selector;
        }
      }

      if (el.length === 0) {
        return undefined;
      }

      return el[0];
    }

    s.updateClickedSlide = function (e) {
      var slide = findElementInEvent(e, '.' + s.params.slideClass);
      var slideFound = false;

      if (slide) {
        for (var i = 0; i < s.slides.length; i++) {
          if (s.slides[i] === slide) slideFound = true;
        }
      }

      if (slide && slideFound) {
        s.clickedSlide = slide;
        s.clickedIndex = $(slide).index();
      } else {
        s.clickedSlide = undefined;
        s.clickedIndex = undefined;
        return;
      }

      if (s.params.slideToClickedSlide && s.clickedIndex !== undefined && s.clickedIndex !== s.activeIndex) {
        var slideToIndex = s.clickedIndex,
            realIndex,
            duplicatedSlides,
            slidesPerView = s.params.slidesPerView === 'auto' ? s.currentSlidesPerView() : s.params.slidesPerView;

        if (s.params.loop) {
          if (s.animating) return;
          realIndex = parseInt($(s.clickedSlide).attr('data-swiper-slide-index'), 10);

          if (s.params.centeredSlides) {
            if (slideToIndex < s.loopedSlides - slidesPerView / 2 || slideToIndex > s.slides.length - s.loopedSlides + slidesPerView / 2) {
              s.fixLoop();
              slideToIndex = s.wrapper.children('.' + s.params.slideClass + '[data-swiper-slide-index="' + realIndex + '"]:not(.' + s.params.slideDuplicateClass + ')').eq(0).index();
              setTimeout(function () {
                s.slideTo(slideToIndex);
              }, 0);
            } else {
              s.slideTo(slideToIndex);
            }
          } else {
            if (slideToIndex > s.slides.length - slidesPerView) {
              s.fixLoop();
              slideToIndex = s.wrapper.children('.' + s.params.slideClass + '[data-swiper-slide-index="' + realIndex + '"]:not(.' + s.params.slideDuplicateClass + ')').eq(0).index();
              setTimeout(function () {
                s.slideTo(slideToIndex);
              }, 0);
            } else {
              s.slideTo(slideToIndex);
            }
          }
        } else {
          s.slideTo(slideToIndex);
        }
      }
    };

    var isTouched,
        isMoved,
        allowTouchCallbacks,
        touchStartTime,
        isScrolling,
        currentTranslate,
        startTranslate,
        allowThresholdMove,
        // Form elements to match
    formElements = 'input, select, textarea, button, video',
        // Last click time
    lastClickTime = Date.now(),
        clickTimeout,
        //Velocities
    velocities = [],
        allowMomentumBounce; // Animating Flag

    s.animating = false; // Touches information

    s.touches = {
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
      diff: 0
    }; // Touch handlers

    var isTouchEvent, startMoving;

    s.onTouchStart = function (e) {
      if (e.originalEvent) e = e.originalEvent;
      isTouchEvent = e.type === 'touchstart';
      if (!isTouchEvent && 'which' in e && e.which === 3) return;

      if (s.params.noSwiping && findElementInEvent(e, '.' + s.params.noSwipingClass)) {
        s.allowClick = true;
        return;
      }

      if (s.params.swipeHandler) {
        if (!findElementInEvent(e, s.params.swipeHandler)) return;
      }

      var startX = s.touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
      var startY = s.touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY; // Do NOT start if iOS edge swipe is detected. Otherwise iOS app (UIWebView) cannot swipe-to-go-back anymore

      if (s.device.ios && s.params.iOSEdgeSwipeDetection && startX <= s.params.iOSEdgeSwipeThreshold) {
        return;
      }

      isTouched = true;
      isMoved = false;
      allowTouchCallbacks = true;
      isScrolling = undefined;
      startMoving = undefined;
      s.touches.startX = startX;
      s.touches.startY = startY;
      touchStartTime = Date.now();
      s.allowClick = true;
      s.updateContainerSize();
      s.swipeDirection = undefined;
      if (s.params.threshold > 0) allowThresholdMove = false;

      if (e.type !== 'touchstart') {
        var preventDefault = true;
        if ($(e.target).is(formElements)) preventDefault = false;

        if (document.activeElement && $(document.activeElement).is(formElements)) {
          document.activeElement.blur();
        }

        if (preventDefault) {
          e.preventDefault();
        }
      }

      s.emit('onTouchStart', s, e);
    };

    s.onTouchMove = function (e) {
      if (e.originalEvent) e = e.originalEvent;
      if (isTouchEvent && e.type === 'mousemove') return;

      if (e.preventedByNestedSwiper) {
        s.touches.startX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
        s.touches.startY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
        return;
      }

      if (s.params.onlyExternal) {
        // isMoved = true;
        s.allowClick = false;

        if (isTouched) {
          s.touches.startX = s.touches.currentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
          s.touches.startY = s.touches.currentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
          touchStartTime = Date.now();
        }

        return;
      }

      if (isTouchEvent && s.params.touchReleaseOnEdges && !s.params.loop) {
        if (!s.isHorizontal()) {
          // Vertical
          if (s.touches.currentY < s.touches.startY && s.translate <= s.maxTranslate() || s.touches.currentY > s.touches.startY && s.translate >= s.minTranslate()) {
            return;
          }
        } else {
          if (s.touches.currentX < s.touches.startX && s.translate <= s.maxTranslate() || s.touches.currentX > s.touches.startX && s.translate >= s.minTranslate()) {
            return;
          }
        }
      }

      if (isTouchEvent && document.activeElement) {
        if (e.target === document.activeElement && $(e.target).is(formElements)) {
          isMoved = true;
          s.allowClick = false;
          return;
        }
      }

      if (allowTouchCallbacks) {
        s.emit('onTouchMove', s, e);
      }

      if (e.targetTouches && e.targetTouches.length > 1) return;
      s.touches.currentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
      s.touches.currentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

      if (typeof isScrolling === 'undefined') {
        var touchAngle;

        if (s.isHorizontal() && s.touches.currentY === s.touches.startY || !s.isHorizontal() && s.touches.currentX === s.touches.startX) {
          isScrolling = false;
        } else {
          touchAngle = Math.atan2(Math.abs(s.touches.currentY - s.touches.startY), Math.abs(s.touches.currentX - s.touches.startX)) * 180 / Math.PI;
          isScrolling = s.isHorizontal() ? touchAngle > s.params.touchAngle : 90 - touchAngle > s.params.touchAngle;
        }
      }

      if (isScrolling) {
        s.emit('onTouchMoveOpposite', s, e);
      }

      if (typeof startMoving === 'undefined') {
        if (s.touches.currentX !== s.touches.startX || s.touches.currentY !== s.touches.startY) {
          startMoving = true;
        }
      }

      if (!isTouched) return;

      if (isScrolling) {
        isTouched = false;
        return;
      }

      if (!startMoving) {
        return;
      }

      s.allowClick = false;
      s.emit('onSliderMove', s, e);
      e.preventDefault();

      if (s.params.touchMoveStopPropagation && !s.params.nested) {
        e.stopPropagation();
      }

      if (!isMoved) {
        if (params.loop) {
          s.fixLoop();
        }

        startTranslate = s.getWrapperTranslate();
        s.setWrapperTransition(0);

        if (s.animating) {
          s.wrapper.trigger('webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd');
        }

        if (s.params.autoplay && s.autoplaying) {
          if (s.params.autoplayDisableOnInteraction) {
            s.stopAutoplay();
          } else {
            s.pauseAutoplay();
          }
        }

        allowMomentumBounce = false; //Grab Cursor

        if (s.params.grabCursor && (s.params.allowSwipeToNext === true || s.params.allowSwipeToPrev === true)) {
          s.setGrabCursor(true);
        }
      }

      isMoved = true;
      var diff = s.touches.diff = s.isHorizontal() ? s.touches.currentX - s.touches.startX : s.touches.currentY - s.touches.startY;
      diff = diff * s.params.touchRatio;
      if (s.rtl) diff = -diff;
      s.swipeDirection = diff > 0 ? 'prev' : 'next';
      currentTranslate = diff + startTranslate;
      var disableParentSwiper = true;

      if (diff > 0 && currentTranslate > s.minTranslate()) {
        disableParentSwiper = false;
        if (s.params.resistance) currentTranslate = s.minTranslate() - 1 + Math.pow(-s.minTranslate() + startTranslate + diff, s.params.resistanceRatio);
      } else if (diff < 0 && currentTranslate < s.maxTranslate()) {
        disableParentSwiper = false;
        if (s.params.resistance) currentTranslate = s.maxTranslate() + 1 - Math.pow(s.maxTranslate() - startTranslate - diff, s.params.resistanceRatio);
      }

      if (disableParentSwiper) {
        e.preventedByNestedSwiper = true;
      } // Directions locks


      if (!s.params.allowSwipeToNext && s.swipeDirection === 'next' && currentTranslate < startTranslate) {
        currentTranslate = startTranslate;
      }

      if (!s.params.allowSwipeToPrev && s.swipeDirection === 'prev' && currentTranslate > startTranslate) {
        currentTranslate = startTranslate;
      } // Threshold


      if (s.params.threshold > 0) {
        if (Math.abs(diff) > s.params.threshold || allowThresholdMove) {
          if (!allowThresholdMove) {
            allowThresholdMove = true;
            s.touches.startX = s.touches.currentX;
            s.touches.startY = s.touches.currentY;
            currentTranslate = startTranslate;
            s.touches.diff = s.isHorizontal() ? s.touches.currentX - s.touches.startX : s.touches.currentY - s.touches.startY;
            return;
          }
        } else {
          currentTranslate = startTranslate;
          return;
        }
      }

      if (!s.params.followFinger) return; // Update active index in free mode

      if (s.params.freeMode || s.params.watchSlidesProgress) {
        s.updateActiveIndex();
      }

      if (s.params.freeMode) {
        //Velocity
        if (velocities.length === 0) {
          velocities.push({
            position: s.touches[s.isHorizontal() ? 'startX' : 'startY'],
            time: touchStartTime
          });
        }

        velocities.push({
          position: s.touches[s.isHorizontal() ? 'currentX' : 'currentY'],
          time: new window.Date().getTime()
        });
      } // Update progress


      s.updateProgress(currentTranslate); // Update translate

      s.setWrapperTranslate(currentTranslate);
    };

    s.onTouchEnd = function (e) {
      if (e.originalEvent) e = e.originalEvent;

      if (allowTouchCallbacks) {
        s.emit('onTouchEnd', s, e);
      }

      allowTouchCallbacks = false;
      if (!isTouched) return; //Return Grab Cursor

      if (s.params.grabCursor && isMoved && isTouched && (s.params.allowSwipeToNext === true || s.params.allowSwipeToPrev === true)) {
        s.setGrabCursor(false);
      } // Time diff


      var touchEndTime = Date.now();
      var timeDiff = touchEndTime - touchStartTime; // Tap, doubleTap, Click

      if (s.allowClick) {
        s.updateClickedSlide(e);
        s.emit('onTap', s, e);

        if (timeDiff < 300 && touchEndTime - lastClickTime > 300) {
          if (clickTimeout) clearTimeout(clickTimeout);
          clickTimeout = setTimeout(function () {
            if (!s) return;

            if (s.params.paginationHide && s.paginationContainer.length > 0 && !$(e.target).hasClass(s.params.bulletClass)) {
              s.paginationContainer.toggleClass(s.params.paginationHiddenClass);
            }

            s.emit('onClick', s, e);
          }, 300);
        }

        if (timeDiff < 300 && touchEndTime - lastClickTime < 300) {
          if (clickTimeout) clearTimeout(clickTimeout);
          s.emit('onDoubleTap', s, e);
        }
      }

      lastClickTime = Date.now();
      setTimeout(function () {
        if (s) s.allowClick = true;
      }, 0);

      if (!isTouched || !isMoved || !s.swipeDirection || s.touches.diff === 0 || currentTranslate === startTranslate) {
        isTouched = isMoved = false;
        return;
      }

      isTouched = isMoved = false;
      var currentPos;

      if (s.params.followFinger) {
        currentPos = s.rtl ? s.translate : -s.translate;
      } else {
        currentPos = -currentTranslate;
      }

      if (s.params.freeMode) {
        if (currentPos < -s.minTranslate()) {
          s.slideTo(s.activeIndex);
          return;
        } else if (currentPos > -s.maxTranslate()) {
          if (s.slides.length < s.snapGrid.length) {
            s.slideTo(s.snapGrid.length - 1);
          } else {
            s.slideTo(s.slides.length - 1);
          }

          return;
        }

        if (s.params.freeModeMomentum) {
          if (velocities.length > 1) {
            var lastMoveEvent = velocities.pop(),
                velocityEvent = velocities.pop();
            var distance = lastMoveEvent.position - velocityEvent.position;
            var time = lastMoveEvent.time - velocityEvent.time;
            s.velocity = distance / time;
            s.velocity = s.velocity / 2;

            if (Math.abs(s.velocity) < s.params.freeModeMinimumVelocity) {
              s.velocity = 0;
            } // this implies that the user stopped moving a finger then released.
            // There would be no events with distance zero, so the last event is stale.


            if (time > 150 || new window.Date().getTime() - lastMoveEvent.time > 300) {
              s.velocity = 0;
            }
          } else {
            s.velocity = 0;
          }

          s.velocity = s.velocity * s.params.freeModeMomentumVelocityRatio;
          velocities.length = 0;
          var momentumDuration = 1000 * s.params.freeModeMomentumRatio;
          var momentumDistance = s.velocity * momentumDuration;
          var newPosition = s.translate + momentumDistance;
          if (s.rtl) newPosition = -newPosition;
          var doBounce = false;
          var afterBouncePosition;
          var bounceAmount = Math.abs(s.velocity) * 20 * s.params.freeModeMomentumBounceRatio;

          if (newPosition < s.maxTranslate()) {
            if (s.params.freeModeMomentumBounce) {
              if (newPosition + s.maxTranslate() < -bounceAmount) {
                newPosition = s.maxTranslate() - bounceAmount;
              }

              afterBouncePosition = s.maxTranslate();
              doBounce = true;
              allowMomentumBounce = true;
            } else {
              newPosition = s.maxTranslate();
            }
          } else if (newPosition > s.minTranslate()) {
            if (s.params.freeModeMomentumBounce) {
              if (newPosition - s.minTranslate() > bounceAmount) {
                newPosition = s.minTranslate() + bounceAmount;
              }

              afterBouncePosition = s.minTranslate();
              doBounce = true;
              allowMomentumBounce = true;
            } else {
              newPosition = s.minTranslate();
            }
          } else if (s.params.freeModeSticky) {
            var j = 0,
                nextSlide;

            for (j = 0; j < s.snapGrid.length; j += 1) {
              if (s.snapGrid[j] > -newPosition) {
                nextSlide = j;
                break;
              }
            }

            if (Math.abs(s.snapGrid[nextSlide] - newPosition) < Math.abs(s.snapGrid[nextSlide - 1] - newPosition) || s.swipeDirection === 'next') {
              newPosition = s.snapGrid[nextSlide];
            } else {
              newPosition = s.snapGrid[nextSlide - 1];
            }

            if (!s.rtl) newPosition = -newPosition;
          } //Fix duration


          if (s.velocity !== 0) {
            if (s.rtl) {
              momentumDuration = Math.abs((-newPosition - s.translate) / s.velocity);
            } else {
              momentumDuration = Math.abs((newPosition - s.translate) / s.velocity);
            }
          } else if (s.params.freeModeSticky) {
            s.slideReset();
            return;
          }

          if (s.params.freeModeMomentumBounce && doBounce) {
            s.updateProgress(afterBouncePosition);
            s.setWrapperTransition(momentumDuration);
            s.setWrapperTranslate(newPosition);
            s.onTransitionStart();
            s.animating = true;
            s.wrapper.transitionEnd(function () {
              if (!s || !allowMomentumBounce) return;
              s.emit('onMomentumBounce', s);
              s.setWrapperTransition(s.params.speed);
              s.setWrapperTranslate(afterBouncePosition);
              s.wrapper.transitionEnd(function () {
                if (!s) return;
                s.onTransitionEnd();
              });
            });
          } else if (s.velocity) {
            s.updateProgress(newPosition);
            s.setWrapperTransition(momentumDuration);
            s.setWrapperTranslate(newPosition);
            s.onTransitionStart();

            if (!s.animating) {
              s.animating = true;
              s.wrapper.transitionEnd(function () {
                if (!s) return;
                s.onTransitionEnd();
              });
            }
          } else {
            s.updateProgress(newPosition);
          }

          s.updateActiveIndex();
        }

        if (!s.params.freeModeMomentum || timeDiff >= s.params.longSwipesMs) {
          s.updateProgress();
          s.updateActiveIndex();
        }

        return;
      } // Find current slide


      var i,
          stopIndex = 0,
          groupSize = s.slidesSizesGrid[0];

      for (i = 0; i < s.slidesGrid.length; i += s.params.slidesPerGroup) {
        if (typeof s.slidesGrid[i + s.params.slidesPerGroup] !== 'undefined') {
          if (currentPos >= s.slidesGrid[i] && currentPos < s.slidesGrid[i + s.params.slidesPerGroup]) {
            stopIndex = i;
            groupSize = s.slidesGrid[i + s.params.slidesPerGroup] - s.slidesGrid[i];
          }
        } else {
          if (currentPos >= s.slidesGrid[i]) {
            stopIndex = i;
            groupSize = s.slidesGrid[s.slidesGrid.length - 1] - s.slidesGrid[s.slidesGrid.length - 2];
          }
        }
      } // Find current slide size


      var ratio = (currentPos - s.slidesGrid[stopIndex]) / groupSize;

      if (timeDiff > s.params.longSwipesMs) {
        // Long touches
        if (!s.params.longSwipes) {
          s.slideTo(s.activeIndex);
          return;
        }

        if (s.swipeDirection === 'next') {
          if (ratio >= s.params.longSwipesRatio) s.slideTo(stopIndex + s.params.slidesPerGroup);else s.slideTo(stopIndex);
        }

        if (s.swipeDirection === 'prev') {
          if (ratio > 1 - s.params.longSwipesRatio) s.slideTo(stopIndex + s.params.slidesPerGroup);else s.slideTo(stopIndex);
        }
      } else {
        // Short swipes
        if (!s.params.shortSwipes) {
          s.slideTo(s.activeIndex);
          return;
        }

        if (s.swipeDirection === 'next') {
          s.slideTo(stopIndex + s.params.slidesPerGroup);
        }

        if (s.swipeDirection === 'prev') {
          s.slideTo(stopIndex);
        }
      }
    };
    /*=========================
      Transitions
      ===========================*/


    s._slideTo = function (slideIndex, speed) {
      return s.slideTo(slideIndex, speed, true, true);
    };

    s.slideTo = function (slideIndex, speed, runCallbacks, internal) {
      if (typeof runCallbacks === 'undefined') runCallbacks = true;
      if (typeof slideIndex === 'undefined') slideIndex = 0;
      if (slideIndex < 0) slideIndex = 0;
      s.snapIndex = Math.floor(slideIndex / s.params.slidesPerGroup);
      if (s.snapIndex >= s.snapGrid.length) s.snapIndex = s.snapGrid.length - 1;
      var translate = -s.snapGrid[s.snapIndex]; // Stop autoplay

      if (s.params.autoplay && s.autoplaying) {
        if (internal || !s.params.autoplayDisableOnInteraction) {
          s.pauseAutoplay(speed);
        } else {
          s.stopAutoplay();
        }
      } // Update progress


      s.updateProgress(translate); // Normalize slideIndex

      if (s.params.normalizeSlideIndex) {
        for (var i = 0; i < s.slidesGrid.length; i++) {
          if (-Math.floor(translate * 100) >= Math.floor(s.slidesGrid[i] * 100)) {
            slideIndex = i;
          }
        }
      } // Directions locks


      if (!s.params.allowSwipeToNext && translate < s.translate && translate < s.minTranslate()) {
        return false;
      }

      if (!s.params.allowSwipeToPrev && translate > s.translate && translate > s.maxTranslate()) {
        if ((s.activeIndex || 0) !== slideIndex) return false;
      } // Update Index


      if (typeof speed === 'undefined') speed = s.params.speed;
      s.previousIndex = s.activeIndex || 0;
      s.activeIndex = slideIndex;
      s.updateRealIndex();

      if (s.rtl && -translate === s.translate || !s.rtl && translate === s.translate) {
        // Update Height
        if (s.params.autoHeight) {
          s.updateAutoHeight();
        }

        s.updateClasses();

        if (s.params.effect !== 'slide') {
          s.setWrapperTranslate(translate);
        }

        return false;
      }

      s.updateClasses();
      s.onTransitionStart(runCallbacks);

      if (speed === 0 || s.browser.lteIE9) {
        s.setWrapperTranslate(translate);
        s.setWrapperTransition(0);
        s.onTransitionEnd(runCallbacks);
      } else {
        s.setWrapperTranslate(translate);
        s.setWrapperTransition(speed);

        if (!s.animating) {
          s.animating = true;
          s.wrapper.transitionEnd(function () {
            if (!s) return;
            s.onTransitionEnd(runCallbacks);
          });
        }
      }

      return true;
    };

    s.onTransitionStart = function (runCallbacks) {
      if (typeof runCallbacks === 'undefined') runCallbacks = true;

      if (s.params.autoHeight) {
        s.updateAutoHeight();
      }

      if (s.lazy) s.lazy.onTransitionStart();

      if (runCallbacks) {
        s.emit('onTransitionStart', s);

        if (s.activeIndex !== s.previousIndex) {
          s.emit('onSlideChangeStart', s);

          if (s.activeIndex > s.previousIndex) {
            s.emit('onSlideNextStart', s);
          } else {
            s.emit('onSlidePrevStart', s);
          }
        }
      }
    };

    s.onTransitionEnd = function (runCallbacks) {
      s.animating = false;
      s.setWrapperTransition(0);
      if (typeof runCallbacks === 'undefined') runCallbacks = true;
      if (s.lazy) s.lazy.onTransitionEnd();

      if (runCallbacks) {
        s.emit('onTransitionEnd', s);

        if (s.activeIndex !== s.previousIndex) {
          s.emit('onSlideChangeEnd', s);

          if (s.activeIndex > s.previousIndex) {
            s.emit('onSlideNextEnd', s);
          } else {
            s.emit('onSlidePrevEnd', s);
          }
        }
      }

      if (s.params.history && s.history) {
        s.history.setHistory(s.params.history, s.activeIndex);
      }

      if (s.params.hashnav && s.hashnav) {
        s.hashnav.setHash();
      }
    };

    s.slideNext = function (runCallbacks, speed, internal) {
      if (s.params.loop) {
        if (s.animating) return false;
        s.fixLoop();
        var clientLeft = s.container[0].clientLeft;
        return s.slideTo(s.activeIndex + s.params.slidesPerGroup, speed, runCallbacks, internal);
      } else return s.slideTo(s.activeIndex + s.params.slidesPerGroup, speed, runCallbacks, internal);
    };

    s._slideNext = function (speed) {
      return s.slideNext(true, speed, true);
    };

    s.slidePrev = function (runCallbacks, speed, internal) {
      if (s.params.loop) {
        if (s.animating) return false;
        s.fixLoop();
        var clientLeft = s.container[0].clientLeft;
        return s.slideTo(s.activeIndex - 1, speed, runCallbacks, internal);
      } else return s.slideTo(s.activeIndex - 1, speed, runCallbacks, internal);
    };

    s._slidePrev = function (speed) {
      return s.slidePrev(true, speed, true);
    };

    s.slideReset = function (runCallbacks, speed, internal) {
      return s.slideTo(s.activeIndex, speed, runCallbacks);
    };

    s.disableTouchControl = function () {
      s.params.onlyExternal = true;
      return true;
    };

    s.enableTouchControl = function () {
      s.params.onlyExternal = false;
      return true;
    };
    /*=========================
      Translate/transition helpers
      ===========================*/


    s.setWrapperTransition = function (duration, byController) {
      s.wrapper.transition(duration);

      if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
        s.effects[s.params.effect].setTransition(duration);
      }

      if (s.params.parallax && s.parallax) {
        s.parallax.setTransition(duration);
      }

      if (s.params.scrollbar && s.scrollbar) {
        s.scrollbar.setTransition(duration);
      }

      if (s.params.control && s.controller) {
        s.controller.setTransition(duration, byController);
      }

      s.emit('onSetTransition', s, duration);
    };

    s.setWrapperTranslate = function (translate, updateActiveIndex, byController) {
      var x = 0,
          y = 0,
          z = 0;

      if (s.isHorizontal()) {
        x = s.rtl ? -translate : translate;
      } else {
        y = translate;
      }

      if (s.params.roundLengths) {
        x = round(x);
        y = round(y);
      }

      if (!s.params.virtualTranslate) {
        if (s.support.transforms3d) s.wrapper.transform('translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)');else s.wrapper.transform('translate(' + x + 'px, ' + y + 'px)');
      }

      s.translate = s.isHorizontal() ? x : y; // Check if we need to update progress

      var progress;
      var translatesDiff = s.maxTranslate() - s.minTranslate();

      if (translatesDiff === 0) {
        progress = 0;
      } else {
        progress = (translate - s.minTranslate()) / translatesDiff;
      }

      if (progress !== s.progress) {
        s.updateProgress(translate);
      }

      if (updateActiveIndex) s.updateActiveIndex();

      if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
        s.effects[s.params.effect].setTranslate(s.translate);
      }

      if (s.params.parallax && s.parallax) {
        s.parallax.setTranslate(s.translate);
      }

      if (s.params.scrollbar && s.scrollbar) {
        s.scrollbar.setTranslate(s.translate);
      }

      if (s.params.control && s.controller) {
        s.controller.setTranslate(s.translate, byController);
      }

      s.emit('onSetTranslate', s, s.translate);
    };

    s.getTranslate = function (el, axis) {
      var matrix, curTransform, curStyle, transformMatrix; // automatic axis detection

      if (typeof axis === 'undefined') {
        axis = 'x';
      }

      if (s.params.virtualTranslate) {
        return s.rtl ? -s.translate : s.translate;
      }

      curStyle = window.getComputedStyle(el, null);

      if (window.WebKitCSSMatrix) {
        curTransform = curStyle.transform || curStyle.webkitTransform;

        if (curTransform.split(',').length > 6) {
          curTransform = curTransform.split(', ').map(function (a) {
            return a.replace(',', '.');
          }).join(', ');
        } // Some old versions of Webkit choke when 'none' is passed; pass
        // empty string instead in this case


        transformMatrix = new window.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
      } else {
        transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
        matrix = transformMatrix.toString().split(',');
      }

      if (axis === 'x') {
        //Latest Chrome and webkits Fix
        if (window.WebKitCSSMatrix) curTransform = transformMatrix.m41; //Crazy IE10 Matrix
        else if (matrix.length === 16) curTransform = parseFloat(matrix[12]); //Normal Browsers
          else curTransform = parseFloat(matrix[4]);
      }

      if (axis === 'y') {
        //Latest Chrome and webkits Fix
        if (window.WebKitCSSMatrix) curTransform = transformMatrix.m42; //Crazy IE10 Matrix
        else if (matrix.length === 16) curTransform = parseFloat(matrix[13]); //Normal Browsers
          else curTransform = parseFloat(matrix[5]);
      }

      if (s.rtl && curTransform) curTransform = -curTransform;
      return curTransform || 0;
    };

    s.getWrapperTranslate = function (axis) {
      if (typeof axis === 'undefined') {
        axis = s.isHorizontal() ? 'x' : 'y';
      }

      return s.getTranslate(s.wrapper[0], axis);
    };
    /*=========================
      Observer
      ===========================*/


    s.observers = [];

    function initObserver(target, options) {
      options = options || {}; // create an observer instance

      var ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
      var observer = new ObserverFunc(function (mutations) {
        mutations.forEach(function (mutation) {
          s.onResize(true);
          s.emit('onObserverUpdate', s, mutation);
        });
      });
      observer.observe(target, {
        attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
        childList: typeof options.childList === 'undefined' ? true : options.childList,
        characterData: typeof options.characterData === 'undefined' ? true : options.characterData
      });
      s.observers.push(observer);
    }

    s.initObservers = function () {
      if (s.params.observeParents) {
        var containerParents = s.container.parents();

        for (var i = 0; i < containerParents.length; i++) {
          initObserver(containerParents[i]);
        }
      } // Observe container


      initObserver(s.container[0], {
        childList: false
      }); // Observe wrapper

      initObserver(s.wrapper[0], {
        attributes: false
      });
    };

    s.disconnectObservers = function () {
      for (var i = 0; i < s.observers.length; i++) {
        s.observers[i].disconnect();
      }

      s.observers = [];
    };
    /*=========================
      Loop
      ===========================*/
    // Create looped slides


    s.createLoop = function () {
      // Remove duplicated slides
      s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass).remove();
      var slides = s.wrapper.children('.' + s.params.slideClass);
      if (s.params.slidesPerView === 'auto' && !s.params.loopedSlides) s.params.loopedSlides = slides.length;
      s.loopedSlides = parseInt(s.params.loopedSlides || s.params.slidesPerView, 10);
      s.loopedSlides = s.loopedSlides + s.params.loopAdditionalSlides;

      if (s.loopedSlides > slides.length) {
        s.loopedSlides = slides.length;
      }

      var prependSlides = [],
          appendSlides = [],
          i;
      slides.each(function (index, el) {
        var slide = $(this);
        if (index < s.loopedSlides) appendSlides.push(el);
        if (index < slides.length && index >= slides.length - s.loopedSlides) prependSlides.push(el);
        slide.attr('data-swiper-slide-index', index);
      });

      for (i = 0; i < appendSlides.length; i++) {
        s.wrapper.append($(appendSlides[i].cloneNode(true)).addClass(s.params.slideDuplicateClass));
      }

      for (i = prependSlides.length - 1; i >= 0; i--) {
        s.wrapper.prepend($(prependSlides[i].cloneNode(true)).addClass(s.params.slideDuplicateClass));
      }
    };

    s.destroyLoop = function () {
      s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass).remove();
      s.slides.removeAttr('data-swiper-slide-index');
    };

    s.reLoop = function (updatePosition) {
      var oldIndex = s.activeIndex - s.loopedSlides;
      s.destroyLoop();
      s.createLoop();
      s.updateSlidesSize();

      if (updatePosition) {
        s.slideTo(oldIndex + s.loopedSlides, 0, false);
      }
    };

    s.fixLoop = function () {
      var newIndex; //Fix For Negative Oversliding

      if (s.activeIndex < s.loopedSlides) {
        newIndex = s.slides.length - s.loopedSlides * 3 + s.activeIndex;
        newIndex = newIndex + s.loopedSlides;
        s.slideTo(newIndex, 0, false, true);
      } //Fix For Positive Oversliding
      else if (s.params.slidesPerView === 'auto' && s.activeIndex >= s.loopedSlides * 2 || s.activeIndex > s.slides.length - s.params.slidesPerView * 2) {
          newIndex = -s.slides.length + s.activeIndex + s.loopedSlides;
          newIndex = newIndex + s.loopedSlides;
          s.slideTo(newIndex, 0, false, true);
        }
    };
    /*=========================
      Append/Prepend/Remove Slides
      ===========================*/


    s.appendSlide = function (slides) {
      if (s.params.loop) {
        s.destroyLoop();
      }

      if (_typeof(slides) === 'object' && slides.length) {
        for (var i = 0; i < slides.length; i++) {
          if (slides[i]) s.wrapper.append(slides[i]);
        }
      } else {
        s.wrapper.append(slides);
      }

      if (s.params.loop) {
        s.createLoop();
      }

      if (!(s.params.observer && s.support.observer)) {
        s.update(true);
      }
    };

    s.prependSlide = function (slides) {
      if (s.params.loop) {
        s.destroyLoop();
      }

      var newActiveIndex = s.activeIndex + 1;

      if (_typeof(slides) === 'object' && slides.length) {
        for (var i = 0; i < slides.length; i++) {
          if (slides[i]) s.wrapper.prepend(slides[i]);
        }

        newActiveIndex = s.activeIndex + slides.length;
      } else {
        s.wrapper.prepend(slides);
      }

      if (s.params.loop) {
        s.createLoop();
      }

      if (!(s.params.observer && s.support.observer)) {
        s.update(true);
      }

      s.slideTo(newActiveIndex, 0, false);
    };

    s.removeSlide = function (slidesIndexes) {
      if (s.params.loop) {
        s.destroyLoop();
        s.slides = s.wrapper.children('.' + s.params.slideClass);
      }

      var newActiveIndex = s.activeIndex,
          indexToRemove;

      if (_typeof(slidesIndexes) === 'object' && slidesIndexes.length) {
        for (var i = 0; i < slidesIndexes.length; i++) {
          indexToRemove = slidesIndexes[i];
          if (s.slides[indexToRemove]) s.slides.eq(indexToRemove).remove();
          if (indexToRemove < newActiveIndex) newActiveIndex--;
        }

        newActiveIndex = Math.max(newActiveIndex, 0);
      } else {
        indexToRemove = slidesIndexes;
        if (s.slides[indexToRemove]) s.slides.eq(indexToRemove).remove();
        if (indexToRemove < newActiveIndex) newActiveIndex--;
        newActiveIndex = Math.max(newActiveIndex, 0);
      }

      if (s.params.loop) {
        s.createLoop();
      }

      if (!(s.params.observer && s.support.observer)) {
        s.update(true);
      }

      if (s.params.loop) {
        s.slideTo(newActiveIndex + s.loopedSlides, 0, false);
      } else {
        s.slideTo(newActiveIndex, 0, false);
      }
    };

    s.removeAllSlides = function () {
      var slidesIndexes = [];

      for (var i = 0; i < s.slides.length; i++) {
        slidesIndexes.push(i);
      }

      s.removeSlide(slidesIndexes);
    };
    /*=========================
      Effects
      ===========================*/


    s.effects = {
      fade: {
        setTranslate: function setTranslate() {
          for (var i = 0; i < s.slides.length; i++) {
            var slide = s.slides.eq(i);
            var offset = slide[0].swiperSlideOffset;
            var tx = -offset;
            if (!s.params.virtualTranslate) tx = tx - s.translate;
            var ty = 0;

            if (!s.isHorizontal()) {
              ty = tx;
              tx = 0;
            }

            var slideOpacity = s.params.fade.crossFade ? Math.max(1 - Math.abs(slide[0].progress), 0) : 1 + Math.min(Math.max(slide[0].progress, -1), 0);
            slide.css({
              opacity: slideOpacity
            }).transform('translate3d(' + tx + 'px, ' + ty + 'px, 0px)');
          }
        },
        setTransition: function setTransition(duration) {
          s.slides.transition(duration);

          if (s.params.virtualTranslate && duration !== 0) {
            var eventTriggered = false;
            s.slides.transitionEnd(function () {
              if (eventTriggered) return;
              if (!s) return;
              eventTriggered = true;
              s.animating = false;
              var triggerEvents = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'];

              for (var i = 0; i < triggerEvents.length; i++) {
                s.wrapper.trigger(triggerEvents[i]);
              }
            });
          }
        }
      },
      flip: {
        setTranslate: function setTranslate() {
          for (var i = 0; i < s.slides.length; i++) {
            var slide = s.slides.eq(i);
            var progress = slide[0].progress;

            if (s.params.flip.limitRotation) {
              progress = Math.max(Math.min(slide[0].progress, 1), -1);
            }

            var offset = slide[0].swiperSlideOffset;
            var rotate = -180 * progress,
                rotateY = rotate,
                rotateX = 0,
                tx = -offset,
                ty = 0;

            if (!s.isHorizontal()) {
              ty = tx;
              tx = 0;
              rotateX = -rotateY;
              rotateY = 0;
            } else if (s.rtl) {
              rotateY = -rotateY;
            }

            slide[0].style.zIndex = -Math.abs(Math.round(progress)) + s.slides.length;

            if (s.params.flip.slideShadows) {
              //Set shadows
              var shadowBefore = s.isHorizontal() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
              var shadowAfter = s.isHorizontal() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');

              if (shadowBefore.length === 0) {
                shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'left' : 'top') + '"></div>');
                slide.append(shadowBefore);
              }

              if (shadowAfter.length === 0) {
                shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'right' : 'bottom') + '"></div>');
                slide.append(shadowAfter);
              }

              if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
              if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
            }

            slide.transform('translate3d(' + tx + 'px, ' + ty + 'px, 0px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)');
          }
        },
        setTransition: function setTransition(duration) {
          s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);

          if (s.params.virtualTranslate && duration !== 0) {
            var eventTriggered = false;
            s.slides.eq(s.activeIndex).transitionEnd(function () {
              if (eventTriggered) return;
              if (!s) return;
              if (!$(this).hasClass(s.params.slideActiveClass)) return;
              eventTriggered = true;
              s.animating = false;
              var triggerEvents = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'];

              for (var i = 0; i < triggerEvents.length; i++) {
                s.wrapper.trigger(triggerEvents[i]);
              }
            });
          }
        }
      },
      cube: {
        setTranslate: function setTranslate() {
          var wrapperRotate = 0,
              cubeShadow;

          if (s.params.cube.shadow) {
            if (s.isHorizontal()) {
              cubeShadow = s.wrapper.find('.swiper-cube-shadow');

              if (cubeShadow.length === 0) {
                cubeShadow = $('<div class="swiper-cube-shadow"></div>');
                s.wrapper.append(cubeShadow);
              }

              cubeShadow.css({
                height: s.width + 'px'
              });
            } else {
              cubeShadow = s.container.find('.swiper-cube-shadow');

              if (cubeShadow.length === 0) {
                cubeShadow = $('<div class="swiper-cube-shadow"></div>');
                s.container.append(cubeShadow);
              }
            }
          }

          for (var i = 0; i < s.slides.length; i++) {
            var slide = s.slides.eq(i);
            var slideAngle = i * 90;
            var round = Math.floor(slideAngle / 360);

            if (s.rtl) {
              slideAngle = -slideAngle;
              round = Math.floor(-slideAngle / 360);
            }

            var progress = Math.max(Math.min(slide[0].progress, 1), -1);
            var tx = 0,
                ty = 0,
                tz = 0;

            if (i % 4 === 0) {
              tx = -round * 4 * s.size;
              tz = 0;
            } else if ((i - 1) % 4 === 0) {
              tx = 0;
              tz = -round * 4 * s.size;
            } else if ((i - 2) % 4 === 0) {
              tx = s.size + round * 4 * s.size;
              tz = s.size;
            } else if ((i - 3) % 4 === 0) {
              tx = -s.size;
              tz = 3 * s.size + s.size * 4 * round;
            }

            if (s.rtl) {
              tx = -tx;
            }

            if (!s.isHorizontal()) {
              ty = tx;
              tx = 0;
            }

            var transform = 'rotateX(' + (s.isHorizontal() ? 0 : -slideAngle) + 'deg) rotateY(' + (s.isHorizontal() ? slideAngle : 0) + 'deg) translate3d(' + tx + 'px, ' + ty + 'px, ' + tz + 'px)';

            if (progress <= 1 && progress > -1) {
              wrapperRotate = i * 90 + progress * 90;
              if (s.rtl) wrapperRotate = -i * 90 - progress * 90;
            }

            slide.transform(transform);

            if (s.params.cube.slideShadows) {
              //Set shadows
              var shadowBefore = s.isHorizontal() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
              var shadowAfter = s.isHorizontal() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');

              if (shadowBefore.length === 0) {
                shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'left' : 'top') + '"></div>');
                slide.append(shadowBefore);
              }

              if (shadowAfter.length === 0) {
                shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'right' : 'bottom') + '"></div>');
                slide.append(shadowAfter);
              }

              if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
              if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
            }
          }

          s.wrapper.css({
            '-webkit-transform-origin': '50% 50% -' + s.size / 2 + 'px',
            '-moz-transform-origin': '50% 50% -' + s.size / 2 + 'px',
            '-ms-transform-origin': '50% 50% -' + s.size / 2 + 'px',
            'transform-origin': '50% 50% -' + s.size / 2 + 'px'
          });

          if (s.params.cube.shadow) {
            if (s.isHorizontal()) {
              cubeShadow.transform('translate3d(0px, ' + (s.width / 2 + s.params.cube.shadowOffset) + 'px, ' + -s.width / 2 + 'px) rotateX(90deg) rotateZ(0deg) scale(' + s.params.cube.shadowScale + ')');
            } else {
              var shadowAngle = Math.abs(wrapperRotate) - Math.floor(Math.abs(wrapperRotate) / 90) * 90;
              var multiplier = 1.5 - (Math.sin(shadowAngle * 2 * Math.PI / 360) / 2 + Math.cos(shadowAngle * 2 * Math.PI / 360) / 2);
              var scale1 = s.params.cube.shadowScale,
                  scale2 = s.params.cube.shadowScale / multiplier,
                  offset = s.params.cube.shadowOffset;
              cubeShadow.transform('scale3d(' + scale1 + ', 1, ' + scale2 + ') translate3d(0px, ' + (s.height / 2 + offset) + 'px, ' + -s.height / 2 / scale2 + 'px) rotateX(-90deg)');
            }
          }

          var zFactor = s.isSafari || s.isUiWebView ? -s.size / 2 : 0;
          s.wrapper.transform('translate3d(0px,0,' + zFactor + 'px) rotateX(' + (s.isHorizontal() ? 0 : wrapperRotate) + 'deg) rotateY(' + (s.isHorizontal() ? -wrapperRotate : 0) + 'deg)');
        },
        setTransition: function setTransition(duration) {
          s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);

          if (s.params.cube.shadow && !s.isHorizontal()) {
            s.container.find('.swiper-cube-shadow').transition(duration);
          }
        }
      },
      coverflow: {
        setTranslate: function setTranslate() {
          var transform = s.translate;
          var center = s.isHorizontal() ? -transform + s.width / 2 : -transform + s.height / 2;
          var rotate = s.isHorizontal() ? s.params.coverflow.rotate : -s.params.coverflow.rotate;
          var translate = s.params.coverflow.depth; //Each slide offset from center

          for (var i = 0, length = s.slides.length; i < length; i++) {
            var slide = s.slides.eq(i);
            var slideSize = s.slidesSizesGrid[i];
            var slideOffset = slide[0].swiperSlideOffset;
            var offsetMultiplier = (center - slideOffset - slideSize / 2) / slideSize * s.params.coverflow.modifier;
            var rotateY = s.isHorizontal() ? rotate * offsetMultiplier : 0;
            var rotateX = s.isHorizontal() ? 0 : rotate * offsetMultiplier; // var rotateZ = 0

            var translateZ = -translate * Math.abs(offsetMultiplier);
            var translateY = s.isHorizontal() ? 0 : s.params.coverflow.stretch * offsetMultiplier;
            var translateX = s.isHorizontal() ? s.params.coverflow.stretch * offsetMultiplier : 0; //Fix for ultra small values

            if (Math.abs(translateX) < 0.001) translateX = 0;
            if (Math.abs(translateY) < 0.001) translateY = 0;
            if (Math.abs(translateZ) < 0.001) translateZ = 0;
            if (Math.abs(rotateY) < 0.001) rotateY = 0;
            if (Math.abs(rotateX) < 0.001) rotateX = 0;
            var slideTransform = 'translate3d(' + translateX + 'px,' + translateY + 'px,' + translateZ + 'px)  rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
            slide.transform(slideTransform);
            slide[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;

            if (s.params.coverflow.slideShadows) {
              //Set shadows
              var shadowBefore = s.isHorizontal() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
              var shadowAfter = s.isHorizontal() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');

              if (shadowBefore.length === 0) {
                shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'left' : 'top') + '"></div>');
                slide.append(shadowBefore);
              }

              if (shadowAfter.length === 0) {
                shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'right' : 'bottom') + '"></div>');
                slide.append(shadowAfter);
              }

              if (shadowBefore.length) shadowBefore[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
              if (shadowAfter.length) shadowAfter[0].style.opacity = -offsetMultiplier > 0 ? -offsetMultiplier : 0;
            }
          } //Set correct perspective for IE10


          if (s.browser.ie) {
            var ws = s.wrapper[0].style;
            ws.perspectiveOrigin = center + 'px 50%';
          }
        },
        setTransition: function setTransition(duration) {
          s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
        }
      }
    };
    /*=========================
      Images Lazy Loading
      ===========================*/

    s.lazy = {
      initialImageLoaded: false,
      loadImageInSlide: function loadImageInSlide(index, loadInDuplicate) {
        if (typeof index === 'undefined') return;
        if (typeof loadInDuplicate === 'undefined') loadInDuplicate = true;
        if (s.slides.length === 0) return;
        var slide = s.slides.eq(index);
        var img = slide.find('.' + s.params.lazyLoadingClass + ':not(.' + s.params.lazyStatusLoadedClass + '):not(.' + s.params.lazyStatusLoadingClass + ')');

        if (slide.hasClass(s.params.lazyLoadingClass) && !slide.hasClass(s.params.lazyStatusLoadedClass) && !slide.hasClass(s.params.lazyStatusLoadingClass)) {
          img = img.add(slide[0]);
        }

        if (img.length === 0) return;
        img.each(function () {
          var _img = $(this);

          _img.addClass(s.params.lazyStatusLoadingClass);

          var background = _img.attr('data-background');

          var src = _img.attr('data-src'),
              srcset = _img.attr('data-srcset'),
              sizes = _img.attr('data-sizes');

          s.loadImage(_img[0], src || background, srcset, sizes, false, function () {
            if (typeof s === 'undefined' || s === null || !s) return;

            if (background) {
              _img.css('background-image', 'url("' + background + '")');

              _img.removeAttr('data-background');
            } else {
              if (srcset) {
                _img.attr('srcset', srcset);

                _img.removeAttr('data-srcset');
              }

              if (sizes) {
                _img.attr('sizes', sizes);

                _img.removeAttr('data-sizes');
              }

              if (src) {
                _img.attr('src', src);

                _img.removeAttr('data-src');
              }
            }

            _img.addClass(s.params.lazyStatusLoadedClass).removeClass(s.params.lazyStatusLoadingClass);

            slide.find('.' + s.params.lazyPreloaderClass + ', .' + s.params.preloaderClass).remove();

            if (s.params.loop && loadInDuplicate) {
              var slideOriginalIndex = slide.attr('data-swiper-slide-index');

              if (slide.hasClass(s.params.slideDuplicateClass)) {
                var originalSlide = s.wrapper.children('[data-swiper-slide-index="' + slideOriginalIndex + '"]:not(.' + s.params.slideDuplicateClass + ')');
                s.lazy.loadImageInSlide(originalSlide.index(), false);
              } else {
                var duplicatedSlide = s.wrapper.children('.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + slideOriginalIndex + '"]');
                s.lazy.loadImageInSlide(duplicatedSlide.index(), false);
              }
            }

            s.emit('onLazyImageReady', s, slide[0], _img[0]);
          });
          s.emit('onLazyImageLoad', s, slide[0], _img[0]);
        });
      },
      load: function load() {
        var i;
        var slidesPerView = s.params.slidesPerView;

        if (slidesPerView === 'auto') {
          slidesPerView = 0;
        }

        if (!s.lazy.initialImageLoaded) s.lazy.initialImageLoaded = true;

        if (s.params.watchSlidesVisibility) {
          s.wrapper.children('.' + s.params.slideVisibleClass).each(function () {
            s.lazy.loadImageInSlide($(this).index());
          });
        } else {
          if (slidesPerView > 1) {
            for (i = s.activeIndex; i < s.activeIndex + slidesPerView; i++) {
              if (s.slides[i]) s.lazy.loadImageInSlide(i);
            }
          } else {
            s.lazy.loadImageInSlide(s.activeIndex);
          }
        }

        if (s.params.lazyLoadingInPrevNext) {
          if (slidesPerView > 1 || s.params.lazyLoadingInPrevNextAmount && s.params.lazyLoadingInPrevNextAmount > 1) {
            var amount = s.params.lazyLoadingInPrevNextAmount;
            var spv = slidesPerView;
            var maxIndex = Math.min(s.activeIndex + spv + Math.max(amount, spv), s.slides.length);
            var minIndex = Math.max(s.activeIndex - Math.max(spv, amount), 0); // Next Slides

            for (i = s.activeIndex + slidesPerView; i < maxIndex; i++) {
              if (s.slides[i]) s.lazy.loadImageInSlide(i);
            } // Prev Slides


            for (i = minIndex; i < s.activeIndex; i++) {
              if (s.slides[i]) s.lazy.loadImageInSlide(i);
            }
          } else {
            var nextSlide = s.wrapper.children('.' + s.params.slideNextClass);
            if (nextSlide.length > 0) s.lazy.loadImageInSlide(nextSlide.index());
            var prevSlide = s.wrapper.children('.' + s.params.slidePrevClass);
            if (prevSlide.length > 0) s.lazy.loadImageInSlide(prevSlide.index());
          }
        }
      },
      onTransitionStart: function onTransitionStart() {
        if (s.params.lazyLoading) {
          if (s.params.lazyLoadingOnTransitionStart || !s.params.lazyLoadingOnTransitionStart && !s.lazy.initialImageLoaded) {
            s.lazy.load();
          }
        }
      },
      onTransitionEnd: function onTransitionEnd() {
        if (s.params.lazyLoading && !s.params.lazyLoadingOnTransitionStart) {
          s.lazy.load();
        }
      }
    };
    /*=========================
      Scrollbar
      ===========================*/

    s.scrollbar = {
      isTouched: false,
      setDragPosition: function setDragPosition(e) {
        var sb = s.scrollbar;
        var x = 0,
            y = 0;
        var translate;
        var pointerPosition = s.isHorizontal() ? e.type === 'touchstart' || e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX || e.clientX : e.type === 'touchstart' || e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY || e.clientY;
        var position = pointerPosition - sb.track.offset()[s.isHorizontal() ? 'left' : 'top'] - sb.dragSize / 2;
        var positionMin = -s.minTranslate() * sb.moveDivider;
        var positionMax = -s.maxTranslate() * sb.moveDivider;

        if (position < positionMin) {
          position = positionMin;
        } else if (position > positionMax) {
          position = positionMax;
        }

        position = -position / sb.moveDivider;
        s.updateProgress(position);
        s.setWrapperTranslate(position, true);
      },
      dragStart: function dragStart(e) {
        var sb = s.scrollbar;
        sb.isTouched = true;
        e.preventDefault();
        e.stopPropagation();
        sb.setDragPosition(e);
        clearTimeout(sb.dragTimeout);
        sb.track.transition(0);

        if (s.params.scrollbarHide) {
          sb.track.css('opacity', 1);
        }

        s.wrapper.transition(100);
        sb.drag.transition(100);
        s.emit('onScrollbarDragStart', s);
      },
      dragMove: function dragMove(e) {
        var sb = s.scrollbar;
        if (!sb.isTouched) return;
        if (e.preventDefault) e.preventDefault();else e.returnValue = false;
        sb.setDragPosition(e);
        s.wrapper.transition(0);
        sb.track.transition(0);
        sb.drag.transition(0);
        s.emit('onScrollbarDragMove', s);
      },
      dragEnd: function dragEnd(e) {
        var sb = s.scrollbar;
        if (!sb.isTouched) return;
        sb.isTouched = false;

        if (s.params.scrollbarHide) {
          clearTimeout(sb.dragTimeout);
          sb.dragTimeout = setTimeout(function () {
            sb.track.css('opacity', 0);
            sb.track.transition(400);
          }, 1000);
        }

        s.emit('onScrollbarDragEnd', s);

        if (s.params.scrollbarSnapOnRelease) {
          s.slideReset();
        }
      },
      draggableEvents: function () {
        if (s.params.simulateTouch === false && !s.support.touch) return s.touchEventsDesktop;else return s.touchEvents;
      }(),
      enableDraggable: function enableDraggable() {
        var sb = s.scrollbar;
        var target = s.support.touch ? sb.track : document;
        $(sb.track).on(sb.draggableEvents.start, sb.dragStart);
        $(target).on(sb.draggableEvents.move, sb.dragMove);
        $(target).on(sb.draggableEvents.end, sb.dragEnd);
      },
      disableDraggable: function disableDraggable() {
        var sb = s.scrollbar;
        var target = s.support.touch ? sb.track : document;
        $(sb.track).off(sb.draggableEvents.start, sb.dragStart);
        $(target).off(sb.draggableEvents.move, sb.dragMove);
        $(target).off(sb.draggableEvents.end, sb.dragEnd);
      },
      set: function set() {
        if (!s.params.scrollbar) return;
        var sb = s.scrollbar;
        sb.track = $(s.params.scrollbar);

        if (s.params.uniqueNavElements && typeof s.params.scrollbar === 'string' && sb.track.length > 1 && s.container.find(s.params.scrollbar).length === 1) {
          sb.track = s.container.find(s.params.scrollbar);
        }

        sb.drag = sb.track.find('.swiper-scrollbar-drag');

        if (sb.drag.length === 0) {
          sb.drag = $('<div class="swiper-scrollbar-drag"></div>');
          sb.track.append(sb.drag);
        }

        sb.drag[0].style.width = '';
        sb.drag[0].style.height = '';
        sb.trackSize = s.isHorizontal() ? sb.track[0].offsetWidth : sb.track[0].offsetHeight;
        sb.divider = s.size / s.virtualSize;
        sb.moveDivider = sb.divider * (sb.trackSize / s.size);
        sb.dragSize = sb.trackSize * sb.divider;

        if (s.isHorizontal()) {
          sb.drag[0].style.width = sb.dragSize + 'px';
        } else {
          sb.drag[0].style.height = sb.dragSize + 'px';
        }

        if (sb.divider >= 1) {
          sb.track[0].style.display = 'none';
        } else {
          sb.track[0].style.display = '';
        }

        if (s.params.scrollbarHide) {
          sb.track[0].style.opacity = 0;
        }
      },
      setTranslate: function setTranslate() {
        if (!s.params.scrollbar) return;
        var diff;
        var sb = s.scrollbar;
        var translate = s.translate || 0;
        var newPos;
        var newSize = sb.dragSize;
        newPos = (sb.trackSize - sb.dragSize) * s.progress;

        if (s.rtl && s.isHorizontal()) {
          newPos = -newPos;

          if (newPos > 0) {
            newSize = sb.dragSize - newPos;
            newPos = 0;
          } else if (-newPos + sb.dragSize > sb.trackSize) {
            newSize = sb.trackSize + newPos;
          }
        } else {
          if (newPos < 0) {
            newSize = sb.dragSize + newPos;
            newPos = 0;
          } else if (newPos + sb.dragSize > sb.trackSize) {
            newSize = sb.trackSize - newPos;
          }
        }

        if (s.isHorizontal()) {
          if (s.support.transforms3d) {
            sb.drag.transform('translate3d(' + newPos + 'px, 0, 0)');
          } else {
            sb.drag.transform('translateX(' + newPos + 'px)');
          }

          sb.drag[0].style.width = newSize + 'px';
        } else {
          if (s.support.transforms3d) {
            sb.drag.transform('translate3d(0px, ' + newPos + 'px, 0)');
          } else {
            sb.drag.transform('translateY(' + newPos + 'px)');
          }

          sb.drag[0].style.height = newSize + 'px';
        }

        if (s.params.scrollbarHide) {
          clearTimeout(sb.timeout);
          sb.track[0].style.opacity = 1;
          sb.timeout = setTimeout(function () {
            sb.track[0].style.opacity = 0;
            sb.track.transition(400);
          }, 1000);
        }
      },
      setTransition: function setTransition(duration) {
        if (!s.params.scrollbar) return;
        s.scrollbar.drag.transition(duration);
      }
    };
    /*=========================
      Controller
      ===========================*/

    s.controller = {
      LinearSpline: function LinearSpline(x, y) {
        var binarySearch = function () {
          var maxIndex, minIndex, guess;
          return function (array, val) {
            minIndex = -1;
            maxIndex = array.length;

            while (maxIndex - minIndex > 1) {
              if (array[guess = maxIndex + minIndex >> 1] <= val) {
                minIndex = guess;
              } else {
                maxIndex = guess;
              }
            }

            return maxIndex;
          };
        }();

        this.x = x;
        this.y = y;
        this.lastIndex = x.length - 1; // Given an x value (x2), return the expected y2 value:
        // (x1,y1) is the known point before given value,
        // (x3,y3) is the known point after given value.

        var i1, i3;
        var l = this.x.length;

        this.interpolate = function (x2) {
          if (!x2) return 0; // Get the indexes of x1 and x3 (the array indexes before and after given x2):

          i3 = binarySearch(this.x, x2);
          i1 = i3 - 1; // We have our indexes i1 & i3, so we can calculate already:
          // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1

          return (x2 - this.x[i1]) * (this.y[i3] - this.y[i1]) / (this.x[i3] - this.x[i1]) + this.y[i1];
        };
      },
      //xxx: for now i will just save one spline function to to
      getInterpolateFunction: function getInterpolateFunction(c) {
        if (!s.controller.spline) s.controller.spline = s.params.loop ? new s.controller.LinearSpline(s.slidesGrid, c.slidesGrid) : new s.controller.LinearSpline(s.snapGrid, c.snapGrid);
      },
      setTranslate: function setTranslate(translate, byController) {
        var controlled = s.params.control;
        var multiplier, controlledTranslate;

        function setControlledTranslate(c) {
          // this will create an Interpolate function based on the snapGrids
          // x is the Grid of the scrolled scroller and y will be the controlled scroller
          // it makes sense to create this only once and recall it for the interpolation
          // the function does a lot of value caching for performance
          translate = c.rtl && c.params.direction === 'horizontal' ? -s.translate : s.translate;

          if (s.params.controlBy === 'slide') {
            s.controller.getInterpolateFunction(c); // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
            // but it did not work out

            controlledTranslate = -s.controller.spline.interpolate(-translate);
          }

          if (!controlledTranslate || s.params.controlBy === 'container') {
            multiplier = (c.maxTranslate() - c.minTranslate()) / (s.maxTranslate() - s.minTranslate());
            controlledTranslate = (translate - s.minTranslate()) * multiplier + c.minTranslate();
          }

          if (s.params.controlInverse) {
            controlledTranslate = c.maxTranslate() - controlledTranslate;
          }

          c.updateProgress(controlledTranslate);
          c.setWrapperTranslate(controlledTranslate, false, s);
          c.updateActiveIndex();
        }

        if (Array.isArray(controlled)) {
          for (var i = 0; i < controlled.length; i++) {
            if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
              setControlledTranslate(controlled[i]);
            }
          }
        } else if (controlled instanceof Swiper && byController !== controlled) {
          setControlledTranslate(controlled);
        }
      },
      setTransition: function setTransition(duration, byController) {
        var controlled = s.params.control;
        var i;

        function setControlledTransition(c) {
          c.setWrapperTransition(duration, s);

          if (duration !== 0) {
            c.onTransitionStart();
            c.wrapper.transitionEnd(function () {
              if (!controlled) return;

              if (c.params.loop && s.params.controlBy === 'slide') {
                c.fixLoop();
              }

              c.onTransitionEnd();
            });
          }
        }

        if (Array.isArray(controlled)) {
          for (i = 0; i < controlled.length; i++) {
            if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
              setControlledTransition(controlled[i]);
            }
          }
        } else if (controlled instanceof Swiper && byController !== controlled) {
          setControlledTransition(controlled);
        }
      }
    };
    /*=========================
      Hash Navigation
      ===========================*/

    s.hashnav = {
      onHashCange: function onHashCange(e, a) {
        var newHash = document.location.hash.replace('#', '');
        var activeSlideHash = s.slides.eq(s.activeIndex).attr('data-hash');

        if (newHash !== activeSlideHash) {
          s.slideTo(s.wrapper.children('.' + s.params.slideClass + '[data-hash="' + newHash + '"]').index());
        }
      },
      attachEvents: function attachEvents(detach) {
        var action = detach ? 'off' : 'on';
        $(window)[action]('hashchange', s.hashnav.onHashCange);
      },
      setHash: function setHash() {
        if (!s.hashnav.initialized || !s.params.hashnav) return;

        if (s.params.replaceState && window.history && window.history.replaceState) {
          window.history.replaceState(null, null, '#' + s.slides.eq(s.activeIndex).attr('data-hash') || '');
        } else {
          var slide = s.slides.eq(s.activeIndex);
          var hash = slide.attr('data-hash') || slide.attr('data-history');
          document.location.hash = hash || '';
        }
      },
      init: function init() {
        if (!s.params.hashnav || s.params.history) return;
        s.hashnav.initialized = true;
        var hash = document.location.hash.replace('#', '');

        if (hash) {
          var speed = 0;

          for (var i = 0, length = s.slides.length; i < length; i++) {
            var slide = s.slides.eq(i);
            var slideHash = slide.attr('data-hash') || slide.attr('data-history');

            if (slideHash === hash && !slide.hasClass(s.params.slideDuplicateClass)) {
              var index = slide.index();
              s.slideTo(index, speed, s.params.runCallbacksOnInit, true);
            }
          }
        }

        if (s.params.hashnavWatchState) s.hashnav.attachEvents();
      },
      destroy: function destroy() {
        if (s.params.hashnavWatchState) s.hashnav.attachEvents(true);
      }
    };
    /*=========================
      History Api with fallback to Hashnav
      ===========================*/

    s.history = {
      init: function init() {
        if (!s.params.history) return;

        if (!window.history || !window.history.pushState) {
          s.params.history = false;
          s.params.hashnav = true;
          return;
        }

        s.history.initialized = true;
        this.paths = this.getPathValues();
        if (!this.paths.key && !this.paths.value) return;
        this.scrollToSlide(0, this.paths.value, s.params.runCallbacksOnInit);

        if (!s.params.replaceState) {
          window.addEventListener('popstate', this.setHistoryPopState);
        }
      },
      setHistoryPopState: function setHistoryPopState() {
        s.history.paths = s.history.getPathValues();
        s.history.scrollToSlide(s.params.speed, s.history.paths.value, false);
      },
      getPathValues: function getPathValues() {
        var pathArray = window.location.pathname.slice(1).split('/');
        var total = pathArray.length;
        var key = pathArray[total - 2];
        var value = pathArray[total - 1];
        return {
          key: key,
          value: value
        };
      },
      setHistory: function setHistory(key, index) {
        if (!s.history.initialized || !s.params.history) return;
        var slide = s.slides.eq(index);
        var value = this.slugify(slide.attr('data-history'));

        if (!window.location.pathname.includes(key)) {
          value = key + '/' + value;
        }

        if (s.params.replaceState) {
          window.history.replaceState(null, null, value);
        } else {
          window.history.pushState(null, null, value);
        }
      },
      slugify: function slugify(text) {
        return text.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
      },
      scrollToSlide: function scrollToSlide(speed, value, runCallbacks) {
        if (value) {
          for (var i = 0, length = s.slides.length; i < length; i++) {
            var slide = s.slides.eq(i);
            var slideHistory = this.slugify(slide.attr('data-history'));

            if (slideHistory === value && !slide.hasClass(s.params.slideDuplicateClass)) {
              var index = slide.index();
              s.slideTo(index, speed, runCallbacks);
            }
          }
        } else {
          s.slideTo(0, speed, runCallbacks);
        }
      }
    };
    /*=========================
      Keyboard Control
      ===========================*/

    function handleKeyboard(e) {
      if (e.originalEvent) e = e.originalEvent; //jquery fix

      var kc = e.keyCode || e.charCode; // Directions locks

      if (!s.params.allowSwipeToNext && (s.isHorizontal() && kc === 39 || !s.isHorizontal() && kc === 40)) {
        return false;
      }

      if (!s.params.allowSwipeToPrev && (s.isHorizontal() && kc === 37 || !s.isHorizontal() && kc === 38)) {
        return false;
      }

      if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
        return;
      }

      if (document.activeElement && document.activeElement.nodeName && (document.activeElement.nodeName.toLowerCase() === 'input' || document.activeElement.nodeName.toLowerCase() === 'textarea')) {
        return;
      }

      if (kc === 37 || kc === 39 || kc === 38 || kc === 40) {
        var inView = false; //Check that swiper should be inside of visible area of window

        if (s.container.parents('.' + s.params.slideClass).length > 0 && s.container.parents('.' + s.params.slideActiveClass).length === 0) {
          return;
        }

        var windowScroll = {
          left: window.pageXOffset,
          top: window.pageYOffset
        };
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var swiperOffset = s.container.offset();
        if (s.rtl) swiperOffset.left = swiperOffset.left - s.container[0].scrollLeft;
        var swiperCoord = [[swiperOffset.left, swiperOffset.top], [swiperOffset.left + s.width, swiperOffset.top], [swiperOffset.left, swiperOffset.top + s.height], [swiperOffset.left + s.width, swiperOffset.top + s.height]];

        for (var i = 0; i < swiperCoord.length; i++) {
          var point = swiperCoord[i];

          if (point[0] >= windowScroll.left && point[0] <= windowScroll.left + windowWidth && point[1] >= windowScroll.top && point[1] <= windowScroll.top + windowHeight) {
            inView = true;
          }
        }

        if (!inView) return;
      }

      if (s.isHorizontal()) {
        if (kc === 37 || kc === 39) {
          if (e.preventDefault) e.preventDefault();else e.returnValue = false;
        }

        if (kc === 39 && !s.rtl || kc === 37 && s.rtl) s.slideNext();
        if (kc === 37 && !s.rtl || kc === 39 && s.rtl) s.slidePrev();
      } else {
        if (kc === 38 || kc === 40) {
          if (e.preventDefault) e.preventDefault();else e.returnValue = false;
        }

        if (kc === 40) s.slideNext();
        if (kc === 38) s.slidePrev();
      }

      s.emit('onKeyPress', s, kc);
    }

    s.disableKeyboardControl = function () {
      s.params.keyboardControl = false;
      $(document).off('keydown', handleKeyboard);
    };

    s.enableKeyboardControl = function () {
      s.params.keyboardControl = true;
      $(document).on('keydown', handleKeyboard);
    };
    /*=========================
      Mousewheel Control
      ===========================*/


    s.mousewheel = {
      event: false,
      lastScrollTime: new window.Date().getTime()
    };

    function isEventSupported() {
      var eventName = 'onwheel';
      var isSupported = eventName in document;

      if (!isSupported) {
        var element = document.createElement('div');
        element.setAttribute(eventName, 'return;');
        isSupported = typeof element[eventName] === 'function';
      }

      if (!isSupported && document.implementation && document.implementation.hasFeature && // always returns true in newer browsers as per the standard.
      // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
      document.implementation.hasFeature('', '') !== true) {
        // This is the only way to test support for the `wheel` event in IE9+.
        isSupported = document.implementation.hasFeature('Events.wheel', '3.0');
      }

      return isSupported;
    }
    /**
     * Mouse wheel (and 2-finger trackpad) support on the web sucks.  It is
     * complicated, thus this doc is long and (hopefully) detailed enough to answer
     * your questions.
     *
     * If you need to react to the mouse wheel in a predictable way, this code is
     * like your bestest friend. * hugs *
     *
     * As of today, there are 4 DOM event types you can listen to:
     *
     *   'wheel'                -- Chrome(31+), FF(17+), IE(9+)
     *   'mousewheel'           -- Chrome, IE(6+), Opera, Safari
     *   'MozMousePixelScroll'  -- FF(3.5 only!) (2010-2013) -- don't bother!
     *   'DOMMouseScroll'       -- FF(0.9.7+) since 2003
     *
     * So what to do?  The is the best:
     *
     *   normalizeWheel.getEventType();
     *
     * In your event callback, use this code to get sane interpretation of the
     * deltas.  This code will return an object with properties:
     *
     *   spinX   -- normalized spin speed (use for zoom) - x plane
     *   spinY   -- " - y plane
     *   pixelX  -- normalized distance (to pixels) - x plane
     *   pixelY  -- " - y plane
     *
     * Wheel values are provided by the browser assuming you are using the wheel to
     * scroll a web page by a number of lines or pixels (or pages).  Values can vary
     * significantly on different platforms and browsers, forgetting that you can
     * scroll at different speeds.  Some devices (like trackpads) emit more events
     * at smaller increments with fine granularity, and some emit massive jumps with
     * linear speed or acceleration.
     *
     * This code does its best to normalize the deltas for you:
     *
     *   - spin is trying to normalize how far the wheel was spun (or trackpad
     *     dragged).  This is super useful for zoom support where you want to
     *     throw away the chunky scroll steps on the PC and make those equal to
     *     the slow and smooth tiny steps on the Mac. Key data: This code tries to
     *     resolve a single slow step on a wheel to 1.
     *
     *   - pixel is normalizing the desired scroll delta in pixel units.  You'll
     *     get the crazy differences between browsers, but at least it'll be in
     *     pixels!
     *
     *   - positive value indicates scrolling DOWN/RIGHT, negative UP/LEFT.  This
     *     should translate to positive value zooming IN, negative zooming OUT.
     *     This matches the newer 'wheel' event.
     *
     * Why are there spinX, spinY (or pixels)?
     *
     *   - spinX is a 2-finger side drag on the trackpad, and a shift + wheel turn
     *     with a mouse.  It results in side-scrolling in the browser by default.
     *
     *   - spinY is what you expect -- it's the classic axis of a mouse wheel.
     *
     *   - I dropped spinZ/pixelZ.  It is supported by the DOM 3 'wheel' event and
     *     probably is by browsers in conjunction with fancy 3D controllers .. but
     *     you know.
     *
     * Implementation info:
     *
     * Examples of 'wheel' event if you scroll slowly (down) by one step with an
     * average mouse:
     *
     *   OS X + Chrome  (mouse)     -    4   pixel delta  (wheelDelta -120)
     *   OS X + Safari  (mouse)     -  N/A   pixel delta  (wheelDelta  -12)
     *   OS X + Firefox (mouse)     -    0.1 line  delta  (wheelDelta  N/A)
     *   Win8 + Chrome  (mouse)     -  100   pixel delta  (wheelDelta -120)
     *   Win8 + Firefox (mouse)     -    3   line  delta  (wheelDelta -120)
     *
     * On the trackpad:
     *
     *   OS X + Chrome  (trackpad)  -    2   pixel delta  (wheelDelta   -6)
     *   OS X + Firefox (trackpad)  -    1   pixel delta  (wheelDelta  N/A)
     *
     * On other/older browsers.. it's more complicated as there can be multiple and
     * also missing delta values.
     *
     * The 'wheel' event is more standard:
     *
     * http://www.w3.org/TR/DOM-Level-3-Events/#events-wheelevents
     *
     * The basics is that it includes a unit, deltaMode (pixels, lines, pages), and
     * deltaX, deltaY and deltaZ.  Some browsers provide other values to maintain
     * backward compatibility with older events.  Those other values help us
     * better normalize spin speed.  Example of what the browsers provide:
     *
     *                          | event.wheelDelta | event.detail
     *        ------------------+------------------+--------------
     *          Safari v5/OS X  |       -120       |       0
     *          Safari v5/Win7  |       -120       |       0
     *         Chrome v17/OS X  |       -120       |       0
     *         Chrome v17/Win7  |       -120       |       0
     *                IE9/Win7  |       -120       |   undefined
     *         Firefox v4/OS X  |     undefined    |       1
     *         Firefox v4/Win7  |     undefined    |       3
     *
     */


    function normalizeWheel(
    /*object*/
    event)
    /*object*/
    {
      // Reasonable defaults
      var PIXEL_STEP = 10;
      var LINE_HEIGHT = 40;
      var PAGE_HEIGHT = 800;
      var sX = 0,
          sY = 0,
          // spinX, spinY
      pX = 0,
          pY = 0; // pixelX, pixelY
      // Legacy

      if ('detail' in event) {
        sY = event.detail;
      }

      if ('wheelDelta' in event) {
        sY = -event.wheelDelta / 120;
      }

      if ('wheelDeltaY' in event) {
        sY = -event.wheelDeltaY / 120;
      }

      if ('wheelDeltaX' in event) {
        sX = -event.wheelDeltaX / 120;
      } // side scrolling on FF with DOMMouseScroll


      if ('axis' in event && event.axis === event.HORIZONTAL_AXIS) {
        sX = sY;
        sY = 0;
      }

      pX = sX * PIXEL_STEP;
      pY = sY * PIXEL_STEP;

      if ('deltaY' in event) {
        pY = event.deltaY;
      }

      if ('deltaX' in event) {
        pX = event.deltaX;
      }

      if ((pX || pY) && event.deltaMode) {
        if (event.deltaMode === 1) {
          // delta in LINE units
          pX *= LINE_HEIGHT;
          pY *= LINE_HEIGHT;
        } else {
          // delta in PAGE units
          pX *= PAGE_HEIGHT;
          pY *= PAGE_HEIGHT;
        }
      } // Fall-back if spin cannot be determined


      if (pX && !sX) {
        sX = pX < 1 ? -1 : 1;
      }

      if (pY && !sY) {
        sY = pY < 1 ? -1 : 1;
      }

      return {
        spinX: sX,
        spinY: sY,
        pixelX: pX,
        pixelY: pY
      };
    }

    if (s.params.mousewheelControl) {
      /**
       * The best combination if you prefer spinX + spinY normalization.  It favors
       * the older DOMMouseScroll for Firefox, as FF does not include wheelDelta with
       * 'wheel' event, making spin speed determination impossible.
       */
      s.mousewheel.event = navigator.userAgent.indexOf('firefox') > -1 ? 'DOMMouseScroll' : isEventSupported() ? 'wheel' : 'mousewheel';
    }

    function handleMousewheel(e) {
      if (e.originalEvent) e = e.originalEvent; //jquery fix

      var delta = 0;
      var rtlFactor = s.rtl ? -1 : 1;
      var data = normalizeWheel(e);

      if (s.params.mousewheelForceToAxis) {
        if (s.isHorizontal()) {
          if (Math.abs(data.pixelX) > Math.abs(data.pixelY)) delta = data.pixelX * rtlFactor;else return;
        } else {
          if (Math.abs(data.pixelY) > Math.abs(data.pixelX)) delta = data.pixelY;else return;
        }
      } else {
        delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? -data.pixelX * rtlFactor : -data.pixelY;
      }

      if (delta === 0) return;
      if (s.params.mousewheelInvert) delta = -delta;

      if (!s.params.freeMode) {
        if (new window.Date().getTime() - s.mousewheel.lastScrollTime > 60) {
          if (delta < 0) {
            if ((!s.isEnd || s.params.loop) && !s.animating) {
              s.slideNext();
              s.emit('onScroll', s, e);
            } else if (s.params.mousewheelReleaseOnEdges) return true;
          } else {
            if ((!s.isBeginning || s.params.loop) && !s.animating) {
              s.slidePrev();
              s.emit('onScroll', s, e);
            } else if (s.params.mousewheelReleaseOnEdges) return true;
          }
        }

        s.mousewheel.lastScrollTime = new window.Date().getTime();
      } else {
        //Freemode or scrollContainer:
        var position = s.getWrapperTranslate() + delta * s.params.mousewheelSensitivity;
        var wasBeginning = s.isBeginning,
            wasEnd = s.isEnd;
        if (position >= s.minTranslate()) position = s.minTranslate();
        if (position <= s.maxTranslate()) position = s.maxTranslate();
        s.setWrapperTransition(0);
        s.setWrapperTranslate(position);
        s.updateProgress();
        s.updateActiveIndex();

        if (!wasBeginning && s.isBeginning || !wasEnd && s.isEnd) {
          s.updateClasses();
        }

        if (s.params.freeModeSticky) {
          clearTimeout(s.mousewheel.timeout);
          s.mousewheel.timeout = setTimeout(function () {
            s.slideReset();
          }, 300);
        } else {
          if (s.params.lazyLoading && s.lazy) {
            s.lazy.load();
          }
        } // Emit event


        s.emit('onScroll', s, e); // Stop autoplay

        if (s.params.autoplay && s.params.autoplayDisableOnInteraction) s.stopAutoplay(); // Return page scroll on edge positions

        if (position === 0 || position === s.maxTranslate()) return;
      }

      if (e.preventDefault) e.preventDefault();else e.returnValue = false;
      return false;
    }

    s.disableMousewheelControl = function () {
      if (!s.mousewheel.event) return false;
      var target = s.container;

      if (s.params.mousewheelEventsTarged !== 'container') {
        target = $(s.params.mousewheelEventsTarged);
      }

      target.off(s.mousewheel.event, handleMousewheel);
      s.params.mousewheelControl = false;
      return true;
    };

    s.enableMousewheelControl = function () {
      if (!s.mousewheel.event) return false;
      var target = s.container;

      if (s.params.mousewheelEventsTarged !== 'container') {
        target = $(s.params.mousewheelEventsTarged);
      }

      target.on(s.mousewheel.event, handleMousewheel);
      s.params.mousewheelControl = true;
      return true;
    };
    /*=========================
      Parallax
      ===========================*/


    function setParallaxTransform(el, progress) {
      el = $(el);
      var p, pX, pY;
      var rtlFactor = s.rtl ? -1 : 1;
      p = el.attr('data-swiper-parallax') || '0';
      pX = el.attr('data-swiper-parallax-x');
      pY = el.attr('data-swiper-parallax-y');

      if (pX || pY) {
        pX = pX || '0';
        pY = pY || '0';
      } else {
        if (s.isHorizontal()) {
          pX = p;
          pY = '0';
        } else {
          pY = p;
          pX = '0';
        }
      }

      if (pX.indexOf('%') >= 0) {
        pX = parseInt(pX, 10) * progress * rtlFactor + '%';
      } else {
        pX = pX * progress * rtlFactor + 'px';
      }

      if (pY.indexOf('%') >= 0) {
        pY = parseInt(pY, 10) * progress + '%';
      } else {
        pY = pY * progress + 'px';
      }

      el.transform('translate3d(' + pX + ', ' + pY + ',0px)');
    }

    s.parallax = {
      setTranslate: function setTranslate() {
        s.container.children('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function () {
          setParallaxTransform(this, s.progress);
        });
        s.slides.each(function () {
          var slide = $(this);
          slide.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function () {
            var progress = Math.min(Math.max(slide[0].progress, -1), 1);
            setParallaxTransform(this, progress);
          });
        });
      },
      setTransition: function setTransition(duration) {
        if (typeof duration === 'undefined') duration = s.params.speed;
        s.container.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function () {
          var el = $(this);
          var parallaxDuration = parseInt(el.attr('data-swiper-parallax-duration'), 10) || duration;
          if (duration === 0) parallaxDuration = 0;
          el.transition(parallaxDuration);
        });
      }
    };
    /*=========================
      Zoom
      ===========================*/

    s.zoom = {
      // "Global" Props
      scale: 1,
      currentScale: 1,
      isScaling: false,
      gesture: {
        slide: undefined,
        slideWidth: undefined,
        slideHeight: undefined,
        image: undefined,
        imageWrap: undefined,
        zoomMax: s.params.zoomMax
      },
      image: {
        isTouched: undefined,
        isMoved: undefined,
        currentX: undefined,
        currentY: undefined,
        minX: undefined,
        minY: undefined,
        maxX: undefined,
        maxY: undefined,
        width: undefined,
        height: undefined,
        startX: undefined,
        startY: undefined,
        touchesStart: {},
        touchesCurrent: {}
      },
      velocity: {
        x: undefined,
        y: undefined,
        prevPositionX: undefined,
        prevPositionY: undefined,
        prevTime: undefined
      },
      // Calc Scale From Multi-touches
      getDistanceBetweenTouches: function getDistanceBetweenTouches(e) {
        if (e.targetTouches.length < 2) return 1;
        var x1 = e.targetTouches[0].pageX,
            y1 = e.targetTouches[0].pageY,
            x2 = e.targetTouches[1].pageX,
            y2 = e.targetTouches[1].pageY;
        var distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        return distance;
      },
      // Events
      onGestureStart: function onGestureStart(e) {
        var z = s.zoom;

        if (!s.support.gestures) {
          if (e.type !== 'touchstart' || e.type === 'touchstart' && e.targetTouches.length < 2) {
            return;
          }

          z.gesture.scaleStart = z.getDistanceBetweenTouches(e);
        }

        if (!z.gesture.slide || !z.gesture.slide.length) {
          z.gesture.slide = $(this);
          if (z.gesture.slide.length === 0) z.gesture.slide = s.slides.eq(s.activeIndex);
          z.gesture.image = z.gesture.slide.find('img, svg, canvas');
          z.gesture.imageWrap = z.gesture.image.parent('.' + s.params.zoomContainerClass);
          z.gesture.zoomMax = z.gesture.imageWrap.attr('data-swiper-zoom') || s.params.zoomMax;

          if (z.gesture.imageWrap.length === 0) {
            z.gesture.image = undefined;
            return;
          }
        }

        z.gesture.image.transition(0);
        z.isScaling = true;
      },
      onGestureChange: function onGestureChange(e) {
        var z = s.zoom;

        if (!s.support.gestures) {
          if (e.type !== 'touchmove' || e.type === 'touchmove' && e.targetTouches.length < 2) {
            return;
          }

          z.gesture.scaleMove = z.getDistanceBetweenTouches(e);
        }

        if (!z.gesture.image || z.gesture.image.length === 0) return;

        if (s.support.gestures) {
          z.scale = e.scale * z.currentScale;
        } else {
          z.scale = z.gesture.scaleMove / z.gesture.scaleStart * z.currentScale;
        }

        if (z.scale > z.gesture.zoomMax) {
          z.scale = z.gesture.zoomMax - 1 + Math.pow(z.scale - z.gesture.zoomMax + 1, 0.5);
        }

        if (z.scale < s.params.zoomMin) {
          z.scale = s.params.zoomMin + 1 - Math.pow(s.params.zoomMin - z.scale + 1, 0.5);
        }

        z.gesture.image.transform('translate3d(0,0,0) scale(' + z.scale + ')');
      },
      onGestureEnd: function onGestureEnd(e) {
        var z = s.zoom;

        if (!s.support.gestures) {
          if (e.type !== 'touchend' || e.type === 'touchend' && e.changedTouches.length < 2) {
            return;
          }
        }

        if (!z.gesture.image || z.gesture.image.length === 0) return;
        z.scale = Math.max(Math.min(z.scale, z.gesture.zoomMax), s.params.zoomMin);
        z.gesture.image.transition(s.params.speed).transform('translate3d(0,0,0) scale(' + z.scale + ')');
        z.currentScale = z.scale;
        z.isScaling = false;
        if (z.scale === 1) z.gesture.slide = undefined;
      },
      onTouchStart: function onTouchStart(s, e) {
        var z = s.zoom;
        if (!z.gesture.image || z.gesture.image.length === 0) return;
        if (z.image.isTouched) return;
        if (s.device.os === 'android') e.preventDefault();
        z.image.isTouched = true;
        z.image.touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
        z.image.touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
      },
      onTouchMove: function onTouchMove(e) {
        var z = s.zoom;
        if (!z.gesture.image || z.gesture.image.length === 0) return;
        s.allowClick = false;
        if (!z.image.isTouched || !z.gesture.slide) return;

        if (!z.image.isMoved) {
          z.image.width = z.gesture.image[0].offsetWidth;
          z.image.height = z.gesture.image[0].offsetHeight;
          z.image.startX = s.getTranslate(z.gesture.imageWrap[0], 'x') || 0;
          z.image.startY = s.getTranslate(z.gesture.imageWrap[0], 'y') || 0;
          z.gesture.slideWidth = z.gesture.slide[0].offsetWidth;
          z.gesture.slideHeight = z.gesture.slide[0].offsetHeight;
          z.gesture.imageWrap.transition(0);
          if (s.rtl) z.image.startX = -z.image.startX;
          if (s.rtl) z.image.startY = -z.image.startY;
        } // Define if we need image drag


        var scaledWidth = z.image.width * z.scale;
        var scaledHeight = z.image.height * z.scale;
        if (scaledWidth < z.gesture.slideWidth && scaledHeight < z.gesture.slideHeight) return;
        z.image.minX = Math.min(z.gesture.slideWidth / 2 - scaledWidth / 2, 0);
        z.image.maxX = -z.image.minX;
        z.image.minY = Math.min(z.gesture.slideHeight / 2 - scaledHeight / 2, 0);
        z.image.maxY = -z.image.minY;
        z.image.touchesCurrent.x = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
        z.image.touchesCurrent.y = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

        if (!z.image.isMoved && !z.isScaling) {
          if (s.isHorizontal() && Math.floor(z.image.minX) === Math.floor(z.image.startX) && z.image.touchesCurrent.x < z.image.touchesStart.x || Math.floor(z.image.maxX) === Math.floor(z.image.startX) && z.image.touchesCurrent.x > z.image.touchesStart.x) {
            z.image.isTouched = false;
            return;
          } else if (!s.isHorizontal() && Math.floor(z.image.minY) === Math.floor(z.image.startY) && z.image.touchesCurrent.y < z.image.touchesStart.y || Math.floor(z.image.maxY) === Math.floor(z.image.startY) && z.image.touchesCurrent.y > z.image.touchesStart.y) {
            z.image.isTouched = false;
            return;
          }
        }

        e.preventDefault();
        e.stopPropagation();
        z.image.isMoved = true;
        z.image.currentX = z.image.touchesCurrent.x - z.image.touchesStart.x + z.image.startX;
        z.image.currentY = z.image.touchesCurrent.y - z.image.touchesStart.y + z.image.startY;

        if (z.image.currentX < z.image.minX) {
          z.image.currentX = z.image.minX + 1 - Math.pow(z.image.minX - z.image.currentX + 1, 0.8);
        }

        if (z.image.currentX > z.image.maxX) {
          z.image.currentX = z.image.maxX - 1 + Math.pow(z.image.currentX - z.image.maxX + 1, 0.8);
        }

        if (z.image.currentY < z.image.minY) {
          z.image.currentY = z.image.minY + 1 - Math.pow(z.image.minY - z.image.currentY + 1, 0.8);
        }

        if (z.image.currentY > z.image.maxY) {
          z.image.currentY = z.image.maxY - 1 + Math.pow(z.image.currentY - z.image.maxY + 1, 0.8);
        } //Velocity


        if (!z.velocity.prevPositionX) z.velocity.prevPositionX = z.image.touchesCurrent.x;
        if (!z.velocity.prevPositionY) z.velocity.prevPositionY = z.image.touchesCurrent.y;
        if (!z.velocity.prevTime) z.velocity.prevTime = Date.now();
        z.velocity.x = (z.image.touchesCurrent.x - z.velocity.prevPositionX) / (Date.now() - z.velocity.prevTime) / 2;
        z.velocity.y = (z.image.touchesCurrent.y - z.velocity.prevPositionY) / (Date.now() - z.velocity.prevTime) / 2;
        if (Math.abs(z.image.touchesCurrent.x - z.velocity.prevPositionX) < 2) z.velocity.x = 0;
        if (Math.abs(z.image.touchesCurrent.y - z.velocity.prevPositionY) < 2) z.velocity.y = 0;
        z.velocity.prevPositionX = z.image.touchesCurrent.x;
        z.velocity.prevPositionY = z.image.touchesCurrent.y;
        z.velocity.prevTime = Date.now();
        z.gesture.imageWrap.transform('translate3d(' + z.image.currentX + 'px, ' + z.image.currentY + 'px,0)');
      },
      onTouchEnd: function onTouchEnd(s, e) {
        var z = s.zoom;
        if (!z.gesture.image || z.gesture.image.length === 0) return;

        if (!z.image.isTouched || !z.image.isMoved) {
          z.image.isTouched = false;
          z.image.isMoved = false;
          return;
        }

        z.image.isTouched = false;
        z.image.isMoved = false;
        var momentumDurationX = 300;
        var momentumDurationY = 300;
        var momentumDistanceX = z.velocity.x * momentumDurationX;
        var newPositionX = z.image.currentX + momentumDistanceX;
        var momentumDistanceY = z.velocity.y * momentumDurationY;
        var newPositionY = z.image.currentY + momentumDistanceY; //Fix duration

        if (z.velocity.x !== 0) momentumDurationX = Math.abs((newPositionX - z.image.currentX) / z.velocity.x);
        if (z.velocity.y !== 0) momentumDurationY = Math.abs((newPositionY - z.image.currentY) / z.velocity.y);
        var momentumDuration = Math.max(momentumDurationX, momentumDurationY);
        z.image.currentX = newPositionX;
        z.image.currentY = newPositionY; // Define if we need image drag

        var scaledWidth = z.image.width * z.scale;
        var scaledHeight = z.image.height * z.scale;
        z.image.minX = Math.min(z.gesture.slideWidth / 2 - scaledWidth / 2, 0);
        z.image.maxX = -z.image.minX;
        z.image.minY = Math.min(z.gesture.slideHeight / 2 - scaledHeight / 2, 0);
        z.image.maxY = -z.image.minY;
        z.image.currentX = Math.max(Math.min(z.image.currentX, z.image.maxX), z.image.minX);
        z.image.currentY = Math.max(Math.min(z.image.currentY, z.image.maxY), z.image.minY);
        z.gesture.imageWrap.transition(momentumDuration).transform('translate3d(' + z.image.currentX + 'px, ' + z.image.currentY + 'px,0)');
      },
      onTransitionEnd: function onTransitionEnd(s) {
        var z = s.zoom;

        if (z.gesture.slide && s.previousIndex !== s.activeIndex) {
          z.gesture.image.transform('translate3d(0,0,0) scale(1)');
          z.gesture.imageWrap.transform('translate3d(0,0,0)');
          z.gesture.slide = z.gesture.image = z.gesture.imageWrap = undefined;
          z.scale = z.currentScale = 1;
        }
      },
      // Toggle Zoom
      toggleZoom: function toggleZoom(s, e) {
        var z = s.zoom;

        if (!z.gesture.slide) {
          z.gesture.slide = s.clickedSlide ? $(s.clickedSlide) : s.slides.eq(s.activeIndex);
          z.gesture.image = z.gesture.slide.find('img, svg, canvas');
          z.gesture.imageWrap = z.gesture.image.parent('.' + s.params.zoomContainerClass);
        }

        if (!z.gesture.image || z.gesture.image.length === 0) return;
        var touchX, touchY, offsetX, offsetY, diffX, diffY, translateX, translateY, imageWidth, imageHeight, scaledWidth, scaledHeight, translateMinX, translateMinY, translateMaxX, translateMaxY, slideWidth, slideHeight;

        if (typeof z.image.touchesStart.x === 'undefined' && e) {
          touchX = e.type === 'touchend' ? e.changedTouches[0].pageX : e.pageX;
          touchY = e.type === 'touchend' ? e.changedTouches[0].pageY : e.pageY;
        } else {
          touchX = z.image.touchesStart.x;
          touchY = z.image.touchesStart.y;
        }

        if (z.scale && z.scale !== 1) {
          // Zoom Out
          z.scale = z.currentScale = 1;
          z.gesture.imageWrap.transition(300).transform('translate3d(0,0,0)');
          z.gesture.image.transition(300).transform('translate3d(0,0,0) scale(1)');
          z.gesture.slide = undefined;
        } else {
          // Zoom In
          z.scale = z.currentScale = z.gesture.imageWrap.attr('data-swiper-zoom') || s.params.zoomMax;

          if (e) {
            slideWidth = z.gesture.slide[0].offsetWidth;
            slideHeight = z.gesture.slide[0].offsetHeight;
            offsetX = z.gesture.slide.offset().left;
            offsetY = z.gesture.slide.offset().top;
            diffX = offsetX + slideWidth / 2 - touchX;
            diffY = offsetY + slideHeight / 2 - touchY;
            imageWidth = z.gesture.image[0].offsetWidth;
            imageHeight = z.gesture.image[0].offsetHeight;
            scaledWidth = imageWidth * z.scale;
            scaledHeight = imageHeight * z.scale;
            translateMinX = Math.min(slideWidth / 2 - scaledWidth / 2, 0);
            translateMinY = Math.min(slideHeight / 2 - scaledHeight / 2, 0);
            translateMaxX = -translateMinX;
            translateMaxY = -translateMinY;
            translateX = diffX * z.scale;
            translateY = diffY * z.scale;

            if (translateX < translateMinX) {
              translateX = translateMinX;
            }

            if (translateX > translateMaxX) {
              translateX = translateMaxX;
            }

            if (translateY < translateMinY) {
              translateY = translateMinY;
            }

            if (translateY > translateMaxY) {
              translateY = translateMaxY;
            }
          } else {
            translateX = 0;
            translateY = 0;
          }

          z.gesture.imageWrap.transition(300).transform('translate3d(' + translateX + 'px, ' + translateY + 'px,0)');
          z.gesture.image.transition(300).transform('translate3d(0,0,0) scale(' + z.scale + ')');
        }
      },
      // Attach/Detach Events
      attachEvents: function attachEvents(detach) {
        var action = detach ? 'off' : 'on';

        if (s.params.zoom) {
          var target = s.slides;
          var passiveListener = s.touchEvents.start === 'touchstart' && s.support.passiveListener && s.params.passiveListeners ? {
            passive: true,
            capture: false
          } : false; // Scale image

          if (s.support.gestures) {
            s.slides[action]('gesturestart', s.zoom.onGestureStart, passiveListener);
            s.slides[action]('gesturechange', s.zoom.onGestureChange, passiveListener);
            s.slides[action]('gestureend', s.zoom.onGestureEnd, passiveListener);
          } else if (s.touchEvents.start === 'touchstart') {
            s.slides[action](s.touchEvents.start, s.zoom.onGestureStart, passiveListener);
            s.slides[action](s.touchEvents.move, s.zoom.onGestureChange, passiveListener);
            s.slides[action](s.touchEvents.end, s.zoom.onGestureEnd, passiveListener);
          } // Move image


          s[action]('touchStart', s.zoom.onTouchStart);
          s.slides.each(function (index, slide) {
            if ($(slide).find('.' + s.params.zoomContainerClass).length > 0) {
              $(slide)[action](s.touchEvents.move, s.zoom.onTouchMove);
            }
          });
          s[action]('touchEnd', s.zoom.onTouchEnd); // Scale Out

          s[action]('transitionEnd', s.zoom.onTransitionEnd);

          if (s.params.zoomToggle) {
            s.on('doubleTap', s.zoom.toggleZoom);
          }
        }
      },
      init: function init() {
        s.zoom.attachEvents();
      },
      destroy: function destroy() {
        s.zoom.attachEvents(true);
      }
    };
    /*=========================
      Plugins API. Collect all and init all plugins
      ===========================*/

    s._plugins = [];

    for (var plugin in s.plugins) {
      var p = s.plugins[plugin](s, s.params[plugin]);
      if (p) s._plugins.push(p);
    } // Method to call all plugins event/method


    s.callPlugins = function (eventName) {
      for (var i = 0; i < s._plugins.length; i++) {
        if (eventName in s._plugins[i]) {
          s._plugins[i][eventName](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
        }
      }
    };
    /*=========================
      Events/Callbacks/Plugins Emitter
      ===========================*/


    function normalizeEventName(eventName) {
      if (eventName.indexOf('on') !== 0) {
        if (eventName[0] !== eventName[0].toUpperCase()) {
          eventName = 'on' + eventName[0].toUpperCase() + eventName.substring(1);
        } else {
          eventName = 'on' + eventName;
        }
      }

      return eventName;
    }

    s.emitterEventListeners = {};

    s.emit = function (eventName) {
      // Trigger callbacks
      if (s.params[eventName]) {
        s.params[eventName](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
      }

      var i; // Trigger events

      if (s.emitterEventListeners[eventName]) {
        for (i = 0; i < s.emitterEventListeners[eventName].length; i++) {
          s.emitterEventListeners[eventName][i](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
        }
      } // Trigger plugins


      if (s.callPlugins) s.callPlugins(eventName, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
    };

    s.on = function (eventName, handler) {
      eventName = normalizeEventName(eventName);
      if (!s.emitterEventListeners[eventName]) s.emitterEventListeners[eventName] = [];
      s.emitterEventListeners[eventName].push(handler);
      return s;
    };

    s.off = function (eventName, handler) {
      var i;
      eventName = normalizeEventName(eventName);

      if (typeof handler === 'undefined') {
        // Remove all handlers for such event
        s.emitterEventListeners[eventName] = [];
        return s;
      }

      if (!s.emitterEventListeners[eventName] || s.emitterEventListeners[eventName].length === 0) return;

      for (i = 0; i < s.emitterEventListeners[eventName].length; i++) {
        if (s.emitterEventListeners[eventName][i] === handler) s.emitterEventListeners[eventName].splice(i, 1);
      }

      return s;
    };

    s.once = function (eventName, handler) {
      eventName = normalizeEventName(eventName);

      var _handler = function _handler() {
        handler(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
        s.off(eventName, _handler);
      };

      s.on(eventName, _handler);
      return s;
    }; // Accessibility tools


    s.a11y = {
      makeFocusable: function makeFocusable($el) {
        $el.attr('tabIndex', '0');
        return $el;
      },
      addRole: function addRole($el, role) {
        $el.attr('role', role);
        return $el;
      },
      addLabel: function addLabel($el, label) {
        $el.attr('aria-label', label);
        return $el;
      },
      disable: function disable($el) {
        $el.attr('aria-disabled', true);
        return $el;
      },
      enable: function enable($el) {
        $el.attr('aria-disabled', false);
        return $el;
      },
      onEnterKey: function onEnterKey(event) {
        if (event.keyCode !== 13) return;

        if ($(event.target).is(s.params.nextButton)) {
          s.onClickNext(event);

          if (s.isEnd) {
            s.a11y.notify(s.params.lastSlideMessage);
          } else {
            s.a11y.notify(s.params.nextSlideMessage);
          }
        } else if ($(event.target).is(s.params.prevButton)) {
          s.onClickPrev(event);

          if (s.isBeginning) {
            s.a11y.notify(s.params.firstSlideMessage);
          } else {
            s.a11y.notify(s.params.prevSlideMessage);
          }
        }

        if ($(event.target).is('.' + s.params.bulletClass)) {
          $(event.target)[0].click();
        }
      },
      liveRegion: $('<span class="' + s.params.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>'),
      notify: function notify(message) {
        var notification = s.a11y.liveRegion;
        if (notification.length === 0) return;
        notification.html('');
        notification.html(message);
      },
      init: function init() {
        // Setup accessibility
        if (s.params.nextButton && s.nextButton && s.nextButton.length > 0) {
          s.a11y.makeFocusable(s.nextButton);
          s.a11y.addRole(s.nextButton, 'button');
          s.a11y.addLabel(s.nextButton, s.params.nextSlideMessage);
        }

        if (s.params.prevButton && s.prevButton && s.prevButton.length > 0) {
          s.a11y.makeFocusable(s.prevButton);
          s.a11y.addRole(s.prevButton, 'button');
          s.a11y.addLabel(s.prevButton, s.params.prevSlideMessage);
        }

        $(s.container).append(s.a11y.liveRegion);
      },
      initPagination: function initPagination() {
        if (s.params.pagination && s.params.paginationClickable && s.bullets && s.bullets.length) {
          s.bullets.each(function () {
            var bullet = $(this);
            s.a11y.makeFocusable(bullet);
            s.a11y.addRole(bullet, 'button');
            s.a11y.addLabel(bullet, s.params.paginationBulletMessage.replace(/{{index}}/, bullet.index() + 1));
          });
        }
      },
      destroy: function destroy() {
        if (s.a11y.liveRegion && s.a11y.liveRegion.length > 0) s.a11y.liveRegion.remove();
      }
    };
    /*=========================
      Init/Destroy
      ===========================*/

    s.init = function () {
      if (s.params.loop) s.createLoop();
      s.updateContainerSize();
      s.updateSlidesSize();
      s.updatePagination();

      if (s.params.scrollbar && s.scrollbar) {
        s.scrollbar.set();

        if (s.params.scrollbarDraggable) {
          s.scrollbar.enableDraggable();
        }
      }

      if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
        if (!s.params.loop) s.updateProgress();
        s.effects[s.params.effect].setTranslate();
      }

      if (s.params.loop) {
        s.slideTo(s.params.initialSlide + s.loopedSlides, 0, s.params.runCallbacksOnInit);
      } else {
        s.slideTo(s.params.initialSlide, 0, s.params.runCallbacksOnInit);

        if (s.params.initialSlide === 0) {
          if (s.parallax && s.params.parallax) s.parallax.setTranslate();

          if (s.lazy && s.params.lazyLoading) {
            s.lazy.load();
            s.lazy.initialImageLoaded = true;
          }
        }
      }

      s.attachEvents();

      if (s.params.observer && s.support.observer) {
        s.initObservers();
      }

      if (s.params.preloadImages && !s.params.lazyLoading) {
        s.preloadImages();
      }

      if (s.params.zoom && s.zoom) {
        s.zoom.init();
      }

      if (s.params.autoplay) {
        s.startAutoplay();
      }

      if (s.params.keyboardControl) {
        if (s.enableKeyboardControl) s.enableKeyboardControl();
      }

      if (s.params.mousewheelControl) {
        if (s.enableMousewheelControl) s.enableMousewheelControl();
      } // Deprecated hashnavReplaceState changed to replaceState for use in hashnav and history


      if (s.params.hashnavReplaceState) {
        s.params.replaceState = s.params.hashnavReplaceState;
      }

      if (s.params.history) {
        if (s.history) s.history.init();
      }

      if (s.params.hashnav) {
        if (s.hashnav) s.hashnav.init();
      }

      if (s.params.a11y && s.a11y) s.a11y.init();
      s.emit('onInit', s);
    }; // Cleanup dynamic styles


    s.cleanupStyles = function () {
      // Container
      s.container.removeClass(s.classNames.join(' ')).removeAttr('style'); // Wrapper

      s.wrapper.removeAttr('style'); // Slides

      if (s.slides && s.slides.length) {
        s.slides.removeClass([s.params.slideVisibleClass, s.params.slideActiveClass, s.params.slideNextClass, s.params.slidePrevClass].join(' ')).removeAttr('style').removeAttr('data-swiper-column').removeAttr('data-swiper-row');
      } // Pagination/Bullets


      if (s.paginationContainer && s.paginationContainer.length) {
        s.paginationContainer.removeClass(s.params.paginationHiddenClass);
      }

      if (s.bullets && s.bullets.length) {
        s.bullets.removeClass(s.params.bulletActiveClass);
      } // Buttons


      if (s.params.prevButton) $(s.params.prevButton).removeClass(s.params.buttonDisabledClass);
      if (s.params.nextButton) $(s.params.nextButton).removeClass(s.params.buttonDisabledClass); // Scrollbar

      if (s.params.scrollbar && s.scrollbar) {
        if (s.scrollbar.track && s.scrollbar.track.length) s.scrollbar.track.removeAttr('style');
        if (s.scrollbar.drag && s.scrollbar.drag.length) s.scrollbar.drag.removeAttr('style');
      }
    }; // Destroy


    s.destroy = function (deleteInstance, cleanupStyles) {
      // Detach evebts
      s.detachEvents(); // Stop autoplay

      s.stopAutoplay(); // Disable draggable

      if (s.params.scrollbar && s.scrollbar) {
        if (s.params.scrollbarDraggable) {
          s.scrollbar.disableDraggable();
        }
      } // Destroy loop


      if (s.params.loop) {
        s.destroyLoop();
      } // Cleanup styles


      if (cleanupStyles) {
        s.cleanupStyles();
      } // Disconnect observer


      s.disconnectObservers(); // Destroy zoom

      if (s.params.zoom && s.zoom) {
        s.zoom.destroy();
      } // Disable keyboard/mousewheel


      if (s.params.keyboardControl) {
        if (s.disableKeyboardControl) s.disableKeyboardControl();
      }

      if (s.params.mousewheelControl) {
        if (s.disableMousewheelControl) s.disableMousewheelControl();
      } // Disable a11y


      if (s.params.a11y && s.a11y) s.a11y.destroy(); // Delete history popstate

      if (s.params.history && !s.params.replaceState) {
        window.removeEventListener('popstate', s.history.setHistoryPopState);
      }

      if (s.params.hashnav && s.hashnav) {
        s.hashnav.destroy();
      } // Destroy callback


      s.emit('onDestroy'); // Delete instance

      if (deleteInstance !== false) s = null;
    };

    s.init(); // Return swiper instance

    return s;
  };
  /*==================================================
      Prototype
  ====================================================*/


  Swiper.prototype = {
    isSafari: function () {
      var ua = window.navigator.userAgent.toLowerCase();
      return ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0;
    }(),
    isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent),
    isArray: function isArray(arr) {
      return Object.prototype.toString.apply(arr) === '[object Array]';
    },

    /*==================================================
    Browser
    ====================================================*/
    browser: {
      ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
      ieTouch: window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1,
      lteIE9: function () {
        // create temporary DIV
        var div = document.createElement('div'); // add content to tmp DIV which is wrapped into the IE HTML conditional statement

        div.innerHTML = '<!--[if lte IE 9]><i></i><![endif]-->'; // return true / false value based on what will browser render

        return div.getElementsByTagName('i').length === 1;
      }()
    },

    /*==================================================
    Devices
    ====================================================*/
    device: function () {
      var ua = window.navigator.userAgent;
      var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
      var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
      var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
      var iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
      return {
        ios: ipad || iphone || ipod,
        android: android
      };
    }(),

    /*==================================================
    Feature Detection
    ====================================================*/
    support: {
      touch: window.Modernizr && Modernizr.touch === true || function () {
        return !!('ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch);
      }(),
      transforms3d: window.Modernizr && Modernizr.csstransforms3d === true || function () {
        var div = document.createElement('div').style;
        return 'webkitPerspective' in div || 'MozPerspective' in div || 'OPerspective' in div || 'MsPerspective' in div || 'perspective' in div;
      }(),
      flexbox: function () {
        var div = document.createElement('div').style;
        var styles = 'alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient'.split(' ');

        for (var i = 0; i < styles.length; i++) {
          if (styles[i] in div) return true;
        }
      }(),
      observer: function () {
        return 'MutationObserver' in window || 'WebkitMutationObserver' in window;
      }(),
      passiveListener: function () {
        var supportsPassive = false;

        try {
          var opts = Object.defineProperty({}, 'passive', {
            get: function get() {
              supportsPassive = true;
            }
          });
          window.addEventListener('testPassiveListener', null, opts);
        } catch (e) {}

        return supportsPassive;
      }(),
      gestures: function () {
        return 'ongesturestart' in window;
      }()
    },

    /*==================================================
    Plugins
    ====================================================*/
    plugins: {}
  };
  /*===========================
  Dom7 Library
  ===========================*/

  var Dom7 = function () {
    var Dom7 = function Dom7(arr) {
      var _this = this,
          i = 0; // Create array-like object


      for (i = 0; i < arr.length; i++) {
        _this[i] = arr[i];
      }

      _this.length = arr.length; // Return collection with methods

      return this;
    };

    var $ = function $(selector, context) {
      var arr = [],
          i = 0;

      if (selector && !context) {
        if (selector instanceof Dom7) {
          return selector;
        }
      }

      if (selector) {
        // String
        if (typeof selector === 'string') {
          var els,
              tempParent,
              html = selector.trim();

          if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
            var toCreate = 'div';
            if (html.indexOf('<li') === 0) toCreate = 'ul';
            if (html.indexOf('<tr') === 0) toCreate = 'tbody';
            if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) toCreate = 'tr';
            if (html.indexOf('<tbody') === 0) toCreate = 'table';
            if (html.indexOf('<option') === 0) toCreate = 'select';
            tempParent = document.createElement(toCreate);
            tempParent.innerHTML = selector;

            for (i = 0; i < tempParent.childNodes.length; i++) {
              arr.push(tempParent.childNodes[i]);
            }
          } else {
            if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
              // Pure ID selector
              els = [document.getElementById(selector.split('#')[1])];
            } else {
              // Other selectors
              els = (context || document).querySelectorAll(selector);
            }

            for (i = 0; i < els.length; i++) {
              if (els[i]) arr.push(els[i]);
            }
          }
        } // Node/element
        else if (selector.nodeType || selector === window || selector === document) {
            arr.push(selector);
          } //Array of elements or instance of Dom
          else if (selector.length > 0 && selector[0].nodeType) {
              for (i = 0; i < selector.length; i++) {
                arr.push(selector[i]);
              }
            }
      }

      return new Dom7(arr);
    };

    Dom7.prototype = {
      // Classes and attriutes
      addClass: function addClass(className) {
        if (typeof className === 'undefined') {
          return this;
        }

        var classes = className.split(' ');

        for (var i = 0; i < classes.length; i++) {
          for (var j = 0; j < this.length; j++) {
            this[j].classList.add(classes[i]);
          }
        }

        return this;
      },
      removeClass: function removeClass(className) {
        var classes = className.split(' ');

        for (var i = 0; i < classes.length; i++) {
          for (var j = 0; j < this.length; j++) {
            this[j].classList.remove(classes[i]);
          }
        }

        return this;
      },
      hasClass: function hasClass(className) {
        if (!this[0]) return false;else return this[0].classList.contains(className);
      },
      toggleClass: function toggleClass(className) {
        var classes = className.split(' ');

        for (var i = 0; i < classes.length; i++) {
          for (var j = 0; j < this.length; j++) {
            this[j].classList.toggle(classes[i]);
          }
        }

        return this;
      },
      attr: function attr(attrs, value) {
        if (arguments.length === 1 && typeof attrs === 'string') {
          // Get attr
          if (this[0]) return this[0].getAttribute(attrs);else return undefined;
        } else {
          // Set attrs
          for (var i = 0; i < this.length; i++) {
            if (arguments.length === 2) {
              // String
              this[i].setAttribute(attrs, value);
            } else {
              // Object
              for (var attrName in attrs) {
                this[i][attrName] = attrs[attrName];
                this[i].setAttribute(attrName, attrs[attrName]);
              }
            }
          }

          return this;
        }
      },
      removeAttr: function removeAttr(attr) {
        for (var i = 0; i < this.length; i++) {
          this[i].removeAttribute(attr);
        }

        return this;
      },
      data: function data(key, value) {
        if (typeof value === 'undefined') {
          // Get value
          if (this[0]) {
            var dataKey = this[0].getAttribute('data-' + key);
            if (dataKey) return dataKey;else if (this[0].dom7ElementDataStorage && key in this[0].dom7ElementDataStorage) return this[0].dom7ElementDataStorage[key];else return undefined;
          } else return undefined;
        } else {
          // Set value
          for (var i = 0; i < this.length; i++) {
            var el = this[i];
            if (!el.dom7ElementDataStorage) el.dom7ElementDataStorage = {};
            el.dom7ElementDataStorage[key] = value;
          }

          return this;
        }
      },
      // Transforms
      transform: function transform(_transform) {
        for (var i = 0; i < this.length; i++) {
          var elStyle = this[i].style;
          elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = _transform;
        }

        return this;
      },
      transition: function transition(duration) {
        if (typeof duration !== 'string') {
          duration = duration + 'ms';
        }

        for (var i = 0; i < this.length; i++) {
          var elStyle = this[i].style;
          elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
        }

        return this;
      },
      //Events
      on: function on(eventName, targetSelector, listener, capture) {
        function handleLiveEvent(e) {
          var target = e.target;
          if ($(target).is(targetSelector)) listener.call(target, e);else {
            var parents = $(target).parents();

            for (var k = 0; k < parents.length; k++) {
              if ($(parents[k]).is(targetSelector)) listener.call(parents[k], e);
            }
          }
        }

        var events = eventName.split(' ');
        var i, j;

        for (i = 0; i < this.length; i++) {
          if (typeof targetSelector === 'function' || targetSelector === false) {
            // Usual events
            if (typeof targetSelector === 'function') {
              listener = arguments[1];
              capture = arguments[2] || false;
            }

            for (j = 0; j < events.length; j++) {
              this[i].addEventListener(events[j], listener, capture);
            }
          } else {
            //Live events
            for (j = 0; j < events.length; j++) {
              if (!this[i].dom7LiveListeners) this[i].dom7LiveListeners = [];
              this[i].dom7LiveListeners.push({
                listener: listener,
                liveListener: handleLiveEvent
              });
              this[i].addEventListener(events[j], handleLiveEvent, capture);
            }
          }
        }

        return this;
      },
      off: function off(eventName, targetSelector, listener, capture) {
        var events = eventName.split(' ');

        for (var i = 0; i < events.length; i++) {
          for (var j = 0; j < this.length; j++) {
            if (typeof targetSelector === 'function' || targetSelector === false) {
              // Usual events
              if (typeof targetSelector === 'function') {
                listener = arguments[1];
                capture = arguments[2] || false;
              }

              this[j].removeEventListener(events[i], listener, capture);
            } else {
              // Live event
              if (this[j].dom7LiveListeners) {
                for (var k = 0; k < this[j].dom7LiveListeners.length; k++) {
                  if (this[j].dom7LiveListeners[k].listener === listener) {
                    this[j].removeEventListener(events[i], this[j].dom7LiveListeners[k].liveListener, capture);
                  }
                }
              }
            }
          }
        }

        return this;
      },
      once: function once(eventName, targetSelector, listener, capture) {
        var dom = this;

        if (typeof targetSelector === 'function') {
          targetSelector = false;
          listener = arguments[1];
          capture = arguments[2];
        }

        function proxy(e) {
          listener(e);
          dom.off(eventName, targetSelector, proxy, capture);
        }

        dom.on(eventName, targetSelector, proxy, capture);
      },
      trigger: function trigger(eventName, eventData) {
        for (var i = 0; i < this.length; i++) {
          var evt;

          try {
            evt = new window.CustomEvent(eventName, {
              detail: eventData,
              bubbles: true,
              cancelable: true
            });
          } catch (e) {
            evt = document.createEvent('Event');
            evt.initEvent(eventName, true, true);
            evt.detail = eventData;
          }

          this[i].dispatchEvent(evt);
        }

        return this;
      },
      transitionEnd: function transitionEnd(callback) {
        var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
            i,
            j,
            dom = this;

        function fireCallBack(e) {
          /*jshint validthis:true */
          if (e.target !== this) return;
          callback.call(this, e);

          for (i = 0; i < events.length; i++) {
            dom.off(events[i], fireCallBack);
          }
        }

        if (callback) {
          for (i = 0; i < events.length; i++) {
            dom.on(events[i], fireCallBack);
          }
        }

        return this;
      },
      // Sizing/Styles
      width: function width() {
        if (this[0] === window) {
          return window.innerWidth;
        } else {
          if (this.length > 0) {
            return parseFloat(this.css('width'));
          } else {
            return null;
          }
        }
      },
      outerWidth: function outerWidth(includeMargins) {
        if (this.length > 0) {
          if (includeMargins) return this[0].offsetWidth + parseFloat(this.css('margin-right')) + parseFloat(this.css('margin-left'));else return this[0].offsetWidth;
        } else return null;
      },
      height: function height() {
        if (this[0] === window) {
          return window.innerHeight;
        } else {
          if (this.length > 0) {
            return parseFloat(this.css('height'));
          } else {
            return null;
          }
        }
      },
      outerHeight: function outerHeight(includeMargins) {
        if (this.length > 0) {
          if (includeMargins) return this[0].offsetHeight + parseFloat(this.css('margin-top')) + parseFloat(this.css('margin-bottom'));else return this[0].offsetHeight;
        } else return null;
      },
      offset: function offset() {
        if (this.length > 0) {
          var el = this[0];
          var box = el.getBoundingClientRect();
          var body = document.body;
          var clientTop = el.clientTop || body.clientTop || 0;
          var clientLeft = el.clientLeft || body.clientLeft || 0;
          var scrollTop = window.pageYOffset || el.scrollTop;
          var scrollLeft = window.pageXOffset || el.scrollLeft;
          return {
            top: box.top + scrollTop - clientTop,
            left: box.left + scrollLeft - clientLeft
          };
        } else {
          return null;
        }
      },
      css: function css(props, value) {
        var i;

        if (arguments.length === 1) {
          if (typeof props === 'string') {
            if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
          } else {
            for (i = 0; i < this.length; i++) {
              for (var prop in props) {
                this[i].style[prop] = props[prop];
              }
            }

            return this;
          }
        }

        if (arguments.length === 2 && typeof props === 'string') {
          for (i = 0; i < this.length; i++) {
            this[i].style[props] = value;
          }

          return this;
        }

        return this;
      },
      //Dom manipulation
      each: function each(callback) {
        for (var i = 0; i < this.length; i++) {
          callback.call(this[i], i, this[i]);
        }

        return this;
      },
      html: function html(_html) {
        if (typeof _html === 'undefined') {
          return this[0] ? this[0].innerHTML : undefined;
        } else {
          for (var i = 0; i < this.length; i++) {
            this[i].innerHTML = _html;
          }

          return this;
        }
      },
      text: function text(_text) {
        if (typeof _text === 'undefined') {
          if (this[0]) {
            return this[0].textContent.trim();
          } else return null;
        } else {
          for (var i = 0; i < this.length; i++) {
            this[i].textContent = _text;
          }

          return this;
        }
      },
      is: function is(selector) {
        if (!this[0]) return false;
        var compareWith, i;

        if (typeof selector === 'string') {
          var el = this[0];
          if (el === document) return selector === document;
          if (el === window) return selector === window;
          if (el.matches) return el.matches(selector);else if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);else if (el.mozMatchesSelector) return el.mozMatchesSelector(selector);else if (el.msMatchesSelector) return el.msMatchesSelector(selector);else {
            compareWith = $(selector);

            for (i = 0; i < compareWith.length; i++) {
              if (compareWith[i] === this[0]) return true;
            }

            return false;
          }
        } else if (selector === document) return this[0] === document;else if (selector === window) return this[0] === window;else {
          if (selector.nodeType || selector instanceof Dom7) {
            compareWith = selector.nodeType ? [selector] : selector;

            for (i = 0; i < compareWith.length; i++) {
              if (compareWith[i] === this[0]) return true;
            }

            return false;
          }

          return false;
        }
      },
      index: function index() {
        if (this[0]) {
          var child = this[0];
          var i = 0;

          while ((child = child.previousSibling) !== null) {
            if (child.nodeType === 1) i++;
          }

          return i;
        } else return undefined;
      },
      eq: function eq(index) {
        if (typeof index === 'undefined') return this;
        var length = this.length;
        var returnIndex;

        if (index > length - 1) {
          return new Dom7([]);
        }

        if (index < 0) {
          returnIndex = length + index;
          if (returnIndex < 0) return new Dom7([]);else return new Dom7([this[returnIndex]]);
        }

        return new Dom7([this[index]]);
      },
      append: function append(newChild) {
        var i, j;

        for (i = 0; i < this.length; i++) {
          if (typeof newChild === 'string') {
            var tempDiv = document.createElement('div');
            tempDiv.innerHTML = newChild;

            while (tempDiv.firstChild) {
              this[i].appendChild(tempDiv.firstChild);
            }
          } else if (newChild instanceof Dom7) {
            for (j = 0; j < newChild.length; j++) {
              this[i].appendChild(newChild[j]);
            }
          } else {
            this[i].appendChild(newChild);
          }
        }

        return this;
      },
      prepend: function prepend(newChild) {
        var i, j;

        for (i = 0; i < this.length; i++) {
          if (typeof newChild === 'string') {
            var tempDiv = document.createElement('div');
            tempDiv.innerHTML = newChild;

            for (j = tempDiv.childNodes.length - 1; j >= 0; j--) {
              this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
            } // this[i].insertAdjacentHTML('afterbegin', newChild);

          } else if (newChild instanceof Dom7) {
            for (j = 0; j < newChild.length; j++) {
              this[i].insertBefore(newChild[j], this[i].childNodes[0]);
            }
          } else {
            this[i].insertBefore(newChild, this[i].childNodes[0]);
          }
        }

        return this;
      },
      insertBefore: function insertBefore(selector) {
        var before = $(selector);

        for (var i = 0; i < this.length; i++) {
          if (before.length === 1) {
            before[0].parentNode.insertBefore(this[i], before[0]);
          } else if (before.length > 1) {
            for (var j = 0; j < before.length; j++) {
              before[j].parentNode.insertBefore(this[i].cloneNode(true), before[j]);
            }
          }
        }
      },
      insertAfter: function insertAfter(selector) {
        var after = $(selector);

        for (var i = 0; i < this.length; i++) {
          if (after.length === 1) {
            after[0].parentNode.insertBefore(this[i], after[0].nextSibling);
          } else if (after.length > 1) {
            for (var j = 0; j < after.length; j++) {
              after[j].parentNode.insertBefore(this[i].cloneNode(true), after[j].nextSibling);
            }
          }
        }
      },
      next: function next(selector) {
        if (this.length > 0) {
          if (selector) {
            if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) return new Dom7([this[0].nextElementSibling]);else return new Dom7([]);
          } else {
            if (this[0].nextElementSibling) return new Dom7([this[0].nextElementSibling]);else return new Dom7([]);
          }
        } else return new Dom7([]);
      },
      nextAll: function nextAll(selector) {
        var nextEls = [];
        var el = this[0];
        if (!el) return new Dom7([]);

        while (el.nextElementSibling) {
          var next = el.nextElementSibling;

          if (selector) {
            if ($(next).is(selector)) nextEls.push(next);
          } else nextEls.push(next);

          el = next;
        }

        return new Dom7(nextEls);
      },
      prev: function prev(selector) {
        if (this.length > 0) {
          if (selector) {
            if (this[0].previousElementSibling && $(this[0].previousElementSibling).is(selector)) return new Dom7([this[0].previousElementSibling]);else return new Dom7([]);
          } else {
            if (this[0].previousElementSibling) return new Dom7([this[0].previousElementSibling]);else return new Dom7([]);
          }
        } else return new Dom7([]);
      },
      prevAll: function prevAll(selector) {
        var prevEls = [];
        var el = this[0];
        if (!el) return new Dom7([]);

        while (el.previousElementSibling) {
          var prev = el.previousElementSibling;

          if (selector) {
            if ($(prev).is(selector)) prevEls.push(prev);
          } else prevEls.push(prev);

          el = prev;
        }

        return new Dom7(prevEls);
      },
      parent: function parent(selector) {
        var parents = [];

        for (var i = 0; i < this.length; i++) {
          if (selector) {
            if ($(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
          } else {
            parents.push(this[i].parentNode);
          }
        }

        return $($.unique(parents));
      },
      parents: function parents(selector) {
        var parents = [];

        for (var i = 0; i < this.length; i++) {
          var parent = this[i].parentNode;

          while (parent) {
            if (selector) {
              if ($(parent).is(selector)) parents.push(parent);
            } else {
              parents.push(parent);
            }

            parent = parent.parentNode;
          }
        }

        return $($.unique(parents));
      },
      find: function find(selector) {
        var foundElements = [];

        for (var i = 0; i < this.length; i++) {
          var found = this[i].querySelectorAll(selector);

          for (var j = 0; j < found.length; j++) {
            foundElements.push(found[j]);
          }
        }

        return new Dom7(foundElements);
      },
      children: function children(selector) {
        var children = [];

        for (var i = 0; i < this.length; i++) {
          var childNodes = this[i].childNodes;

          for (var j = 0; j < childNodes.length; j++) {
            if (!selector) {
              if (childNodes[j].nodeType === 1) children.push(childNodes[j]);
            } else {
              if (childNodes[j].nodeType === 1 && $(childNodes[j]).is(selector)) children.push(childNodes[j]);
            }
          }
        }

        return new Dom7($.unique(children));
      },
      remove: function remove() {
        for (var i = 0; i < this.length; i++) {
          if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
        }

        return this;
      },
      add: function add() {
        var dom = this;
        var i, j;

        for (i = 0; i < arguments.length; i++) {
          var toAdd = $(arguments[i]);

          for (j = 0; j < toAdd.length; j++) {
            dom[dom.length] = toAdd[j];
            dom.length++;
          }
        }

        return dom;
      }
    };
    $.fn = Dom7.prototype;

    $.unique = function (arr) {
      var unique = [];

      for (var i = 0; i < arr.length; i++) {
        if (unique.indexOf(arr[i]) === -1) unique.push(arr[i]);
      }

      return unique;
    };

    return $;
  }();
  /*===========================
   Get Dom libraries
   ===========================*/


  var swiperDomPlugins = ['jQuery', 'Zepto', 'Dom7'];

  for (var i = 0; i < swiperDomPlugins.length; i++) {
    if (window[swiperDomPlugins[i]]) {
      addLibraryPlugin(window[swiperDomPlugins[i]]);
    }
  } // Required DOM Plugins


  var domLib;

  if (typeof Dom7 === 'undefined') {
    domLib = window.Dom7 || window.Zepto || window.jQuery;
  } else {
    domLib = Dom7;
  }
  /*===========================
  Add .swiper plugin from Dom libraries
  ===========================*/


  function addLibraryPlugin(lib) {
    lib.fn.swiper = function (params) {
      var firstInstance;
      lib(this).each(function () {
        var s = new Swiper(this, params);
        if (!firstInstance) firstInstance = s;
      });
      return firstInstance;
    };
  }

  if (domLib) {
    if (!('transitionEnd' in domLib.fn)) {
      domLib.fn.transitionEnd = function (callback) {
        var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
            i,
            j,
            dom = this;

        function fireCallBack(e) {
          /*jshint validthis:true */
          if (e.target !== this) return;
          callback.call(this, e);

          for (i = 0; i < events.length; i++) {
            dom.off(events[i], fireCallBack);
          }
        }

        if (callback) {
          for (i = 0; i < events.length; i++) {
            dom.on(events[i], fireCallBack);
          }
        }

        return this;
      };
    }

    if (!('transform' in domLib.fn)) {
      domLib.fn.transform = function (transform) {
        for (var i = 0; i < this.length; i++) {
          var elStyle = this[i].style;
          elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
        }

        return this;
      };
    }

    if (!('transition' in domLib.fn)) {
      domLib.fn.transition = function (duration) {
        if (typeof duration !== 'string') {
          duration = duration + 'ms';
        }

        for (var i = 0; i < this.length; i++) {
          var elStyle = this[i].style;
          elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
        }

        return this;
      };
    }

    if (!('outerWidth' in domLib.fn)) {
      domLib.fn.outerWidth = function (includeMargins) {
        if (this.length > 0) {
          if (includeMargins) return this[0].offsetWidth + parseFloat(this.css('margin-right')) + parseFloat(this.css('margin-left'));else return this[0].offsetWidth;
        } else return null;
      };
    }
  }

  window.Swiper = Swiper;
})();
/*===========================
Swiper AMD Export
===========================*/


if (typeof module !== 'undefined') {
  module.exports = window.Swiper;
} else if (typeof define === 'function' && define.amd) {
  define([], function () {
    'use strict';

    return window.Swiper;
  });
}
//# sourceMappingURL=vendor.js.map
