"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.roundDecimals = void 0;

var roundDecimals = function roundDecimals(num, places) {
  return +parseFloat(num).toFixed(places);
};

exports.roundDecimals = roundDecimals;