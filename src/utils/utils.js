import excel from '../libs/excel'
import lodash from 'lodash'

/**
 * @Description: 获取可用按钮数据
 * @date 2019/5/21  19:38
 * @param h {Function} 按钮数组
 * @param buttonList {Array} 按钮数组
 * @param available {Array} 可用按钮 标识数组
*/
export function getAvailableButton (h, buttonList, available) {
  let availableButtons = [] // 可用按钮数据列表
  buttonList.forEach(item => {
    if (available.indexOf(item.key) !== -1) {
      availableButtons.push(h('Button', item, item.name))
    }
  })
  return availableButtons
}

/**
 * @Description: 是否是可访问路由
 * @date 2019/5/21  20:40
 * @param addressableRouter {Array} 可访问路由列表
 * @param name {String} 当前需要访问的路由名称
*/
export function isAddressableRouter (addressableRouter, name) {
  for (let route of addressableRouter) {
    if (route.name === name) return false
  }
  return true
}

/**
 * @Description: 数据过滤器
 * @date 2019/5/20  10:53
 *@param data {Array} 处理数据
 * @param filter {Object} 需要过滤的数据
 *  filter: { // 示例数据
 *    sex: [{key: '0', name: '女'}, {key: '1': name: '男'}]
 *  }
*/
export function dataFilterReform (data, filter) {
  let keys = Object.keys(filter)
  if (keys.length === 0) return data
  // 1. 遍历源数据
  // 2. 遍历需要过滤数据的key
  // 3. 通过表达式[key]对应到 源数据item , 然后定位 需要过滤的数据的name 值
  data.forEach(item => {
    keys.forEach(key => {
      let filterVal = filter[key].find(i => item[key] == i.key)// eslint-disable-line
      if (filterVal) {
        item[key] = filterVal.name
      }
    })
  })
  return data
}

/**
 * @Description: 对象初始化值
 * @date 2019/5/10  9:35
 * @param _obj {Object} 需要初始化值的对象
 * @param not {Array} 不需要初始化的数据
 * @return {Object}
 */
export function resetObjParam (_obj, not = []) {
  if (!_obj) throw Error('Not obj Param ')
  let obj = copyObj(_obj)
  if (obj instanceof Array) {
    return []
  }

  Object.keys(obj).forEach(key => {
    if (not.indexOf(key) !== -1) return
    if (obj[key] instanceof Array) {
      obj[key] = []
      return
    } else if (obj[key] instanceof Object) {
      resetObjParam(obj[key])
      return
    }
    obj[key] = ''
  })
  return obj
}

/**
 * @Description: 复制一个新的对象，防止浅拷贝，更改到源数据
 * @date 2019/5/10  9:46
 * @param obj {Object} 需要复制的对象
 * @return  templateObj {Object} 模板对象，如果存在，则返回只模板有的数据
 */
export function copyObj (obj, templateObj) {
  if (!obj) throw Error('Not obj Param ')
  let _obj = lodash.cloneDeep(obj)
  // 如果存在
  if (templateObj) {
    Object.keys(templateObj).forEach(key => {
      templateObj[key] = _obj[key] || ''
    })
    return templateObj
  }
  return _obj
}

/**
 * @Description: 把数据转换为 number 类型
 * @date 2019/5/10  9:46
 * @param data {Object} 需要复制的对象
 * @return  {Object} 模板对象，如果存在，则返回只模板有的数据
 */
export function dataToFloat (data) {
  if (!data) throw Error('Not obj Param ')
  Object.keys(data).forEach(key => {
    if (data[key] && !isNaN(data[key])) {
      data[key] = parseFloat(data[key])
    }
  })
  return data
}

/**
 * @Description: 初始化 导出 export 文件格式
 * @date 2019/5/13  15:33
 */
export function exportExcel ({
  tableData, columns, fileName
}) {
  let titles = []
  let keys = []

  columns.forEach(item => {
    if (item.key) {
      titles.push(item.title)
      keys.push(item.key)
    }
  })

  const params = {
    title: titles,
    key: keys,
    data: tableData,
    autoWidth: true,
    filename: fileName || '数据列表'
  }
  excel.export_array_to_excel(params)
}

/**
 * @Description: 获取路由列表
 * @date 2019/5/16  10:40
 */
export function getRouterList (routers) {
  let routerList = []
  let pushRouter = (arr) => {
    arr.forEach(route => {
      if (!route.meta.hideInMenu) {
        if (route.children && route.children.length) {
          pushRouter(route.children)
        } else {
          routerList.push({
            title: route.meta.title,
            routerName: route.name,
            path: route.path
          })
        }
      }
    })
  }
  pushRouter(routers)
  return routerList
}

/**
 * @Description: 文件转 base 64 码
 * @date 2019/5/14  14:33
 * @param file {File}
 */
export async function fileToBase64 (file) {
  if (!file) throw Error('file 未传参')
  return new Promise((resolve, reject) => {
    let fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = (e) => {
      resolve(e.target.result)
    }
    fileReader.onerror = err => reject(err)
  })
}

/**
 * @Description: 初始化权限列表分类
 * @date 2019/5/16  13:37
 * @param authority {Array} 权限列表数据
 */
export function initAuthorityTree (authority) {
  let temp = {}
  let tree = []
  for (let i in authority) {
    authority[i].title = authority[i].name
    temp[authority[i].id] = authority[i]
  }
  for (let i in temp) {
    if (temp[i].pId && temp[i].pId !== '0') {
      if (!temp[temp[i].pId].children) {
        temp[temp[i].pId].children = []
      }
      temp[temp[i].pId].children.push(temp[i])
    } else {
      tree.push(temp[i])
    }
  }
  return tree
}
