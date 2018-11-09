/*
  @desc: A modern JavaScript utility library delivering modularity, performance, & extras.
  @detail: https://github.com/lodash/lodash
*/

import clone from 'lodash/clone'
import cloneDeep from 'lodash/cloneDeep'
import endsWith from 'lodash/endsWith'
import debounce from 'lodash/debounce'
import throttle from 'lodash/throttle'
import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'
import flatten from 'lodash/flatten'
import flattenDepth from 'lodash/flattenDepth'
import merge from 'lodash/merge'
import startsWith from 'lodash/startsWith'
import includes from 'lodash/includes'
import each from 'lodash/each'
import isFunction from 'lodash/isFunction'
import forEach from 'lodash/forEach'
import isNull from 'lodash/isNull'
import isString from 'lodash/isString'
import toSafeInteger from 'lodash/toSafeInteger'
import isUndefined from 'lodash/isUndefined'
import extend from 'lodash/extend'
import has from 'lodash/has'
import toNumber from 'lodash/toNumber'
import isInteger from 'lodash/isInteger'
import isFinite from 'lodash/isFinite'
import isNil from 'lodash/isNil'
import isArray from 'lodash/isArray'
import uniqueId from 'lodash/uniqueId'
import assign from 'lodash/assign'
import assignIn from 'lodash/assign'
import isEqual from 'lodash/isEqual'
import now from 'lodash/now'
import join from 'lodash/join'
import forIn from 'lodash/forIn'
import union from 'lodash/union'
import omit  from 'lodash/omit'
import keyBy  from 'lodash/keyBy'
import snakeCase  from 'lodash/snakeCase'
import isNaN  from 'lodash/isNaN'
import trim  from 'lodash/trim'
import isPlainObject   from 'lodash/isPlainObject'
import filter    from 'lodash/filter'
import isNumber     from 'lodash/isNumber'
import defaultTo     from 'lodash/defaultTo'
import split     from 'lodash/split'
import kebabCase     from 'lodash/kebabCase'

let _lodash={
  clone,  cloneDeep,  endsWith,  debounce,  throttle,  find,
  isEmpty,  flatten,  flattenDepth,  merge,  startsWith,  includes,
  each,  isFunction,  forEach,  isNull,  isString,  toSafeInteger,  isUndefined,
  extend,  has,  toNumber,  isInteger,isNil,isFinite,isArray,uniqueId,assign,assignIn,
  isEqual,now,forIn,join,union,omit,keyBy,snakeCase,isNaN,trim,isPlainObject,
  filter,isNumber,defaultTo,split,kebabCase
};

window._=_lodash;
export default _lodash;
