;(function (global, factory) {
  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = factory()
  } else if (typeof define === 'function' && define.amd) {
    define(factory)
  } else {
    global.FlexUtil = factory()
  }
})(this, function () {

  var exports = {}
  var env = this.process && this.process.env && this.process.env.NODE_ENV

  /**
   * converts array to object
   * @param {Array} arr
   * @return {Object}
   */
  function arrToObj(arr) {
    return arr.reduce(function (memo, item) {
      memo[item.key] = item.value
      return memo
    }, {})
  }

  /**
   * flexGrow: when items width sum < container value
   * @param {Number} containerValue
   * @param {Array} data
   *    - key
   *    - value
   *    - flexGrow
   * @return {Object} { key: valFlexed }
   */
  function flexGrow(containerValue, data) {
    var valueLess
    var valueSum = 0
    var growSum = 0
    var obj
    var iZeroProp = 0

    for (var i = 0, ii = data.length; i < ii; i++) {
      obj = data[i]
      valueSum += obj.value
      growSum += obj.flexGrow
      if (!obj.flexGrow) iZeroProp++
    }

    if (iZeroProp >= data.length) {
      if (env !== 'production') {
        console.warn('[Flex.Util.flexGrow]: all values of flexGrow got 0')
      }
      return arrToObj(data)
    }

    valueLess = containerValue - valueSum
    if (valueLess < 0) {
      if (env !== 'production') {
        console.warn('[Flex.Util.flexGrow]: items width sum is bigger than container value')
      }
      return null
    }

    var ret = {}
    var key
    var percent
    var widthGrow
    for (var i = 0, ii = data.length; i < ii; i++) {
      obj = data[i]
      percent = obj.flexGrow / growSum
      widthGrow = valueLess * percent
      ret[obj.key] = obj.value + widthGrow
    }

    return ret
  }
  exports.flexGrow = flexGrow

  /**
   * flexShrink: when items width sum > container value
   * @param {Number} containerValue
   * @param {Array} data
   *    - key
   *    - value
   *    - flexShrink
   * @return {Object|Null} { key: valFlexed }
   */
  function flexShrink(containerValue, data) {
    var valueMore
    var valueSum = 0
    var valueShrinkSum = 0
    var obj
    var iZeroProp = 0

    for (var i = 0, ii = data.length; i < ii; i++) {
      obj = data[i]
      valueSum += obj.value
      valueShrinkSum += (obj.value * obj.flexShrink)
      if (!obj.flexShrink) iZeroProp++
    }

    if (iZeroProp >= data.length) {
      if (env !== 'production') {
        console.warn('[Flex.Util.flexShrink]: all values of flexShrink got 0')
      }
      return arrToObj(data)
    }

    valueMore = valueSum - containerValue
    if (valueMore < 0) {
      if (env !== 'production') {
        console.warn('[Flex.Util.flexShrink]: items width sum is smaller than container value')
      }
      return null
    }

    var ret = {}
    var key
    var percent
    var widthShrink
    for (var i = 0, ii = data.length; i < ii; i++) {
      obj = data[i]
      percent = (obj.flexShrink * obj.value) / valueShrinkSum
      widthShrink = valueMore * percent
      ret[obj.key] = obj.value - widthShrink
    }

    return ret
  }
  exports.flexShrink = flexShrink

  return exports
});
