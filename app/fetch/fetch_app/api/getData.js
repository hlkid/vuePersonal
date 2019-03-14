import fetch from '../config/fetch'

/**
 * 获取列表
 */

export const getFoods = data => fetch('/standardBak/list', data,'POST');