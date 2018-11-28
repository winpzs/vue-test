/*
  @desc: A modern JavaScript utility library delivering modularity, performance, & extras.
  @detail: https://github.com/lodash/lodash
*/

import { default as assign, default as assignIn } from 'lodash/assign';
import clone from 'lodash/clone';
import cloneDeep from 'lodash/cloneDeep';
import debounce from 'lodash/debounce';
import defaultTo from 'lodash/defaultTo';
import each from 'lodash/each';
import endsWith from 'lodash/endsWith';
import extend from 'lodash/extend';
import filter from 'lodash/filter';
import find from 'lodash/find';
import flatten from 'lodash/flatten';
import flattenDepth from 'lodash/flattenDepth';
import forEach from 'lodash/forEach';
import forIn from 'lodash/forIn';
import has from 'lodash/has';
import includes from 'lodash/includes';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import isFinite from 'lodash/isFinite';
import isFunction from 'lodash/isFunction';
import isInteger from 'lodash/isInteger';
import isNaN from 'lodash/isNaN';
import isNil from 'lodash/isNil';
import isNull from 'lodash/isNull';
import isNumber from 'lodash/isNumber';
import isPlainObject from 'lodash/isPlainObject';
import isString from 'lodash/isString';
import isUndefined from 'lodash/isUndefined';
import join from 'lodash/join';
import kebabCase from 'lodash/kebabCase';
import keyBy from 'lodash/keyBy';
import merge from 'lodash/merge';
import now from 'lodash/now';
import omit from 'lodash/omit';
import snakeCase from 'lodash/snakeCase';
import split from 'lodash/split';
import startsWith from 'lodash/startsWith';
import throttle from 'lodash/throttle';
import toNumber from 'lodash/toNumber';
import toSafeInteger from 'lodash/toSafeInteger';
import trim from 'lodash/trim';
import union from 'lodash/union';
import uniqueId from 'lodash/uniqueId';

let _lodash={
  clone,  cloneDeep,  endsWith,  debounce,  throttle,  find,
  isEmpty,  flatten,  flattenDepth,  merge,  startsWith,  includes,
  each,  isFunction,  forEach,  isNull,  isString,  toSafeInteger,  isUndefined,
  extend,  has,  toNumber,  isInteger,isNil,isFinite,isArray,uniqueId,assign,assignIn,
  isEqual,now,forIn,join,union,omit,keyBy,snakeCase,isNaN,trim,isPlainObject,
  filter,isNumber,defaultTo,split,kebabCase
};

export let lodash = _lodash;
