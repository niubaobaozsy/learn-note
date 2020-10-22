const execSync = require('child_process').execSync
const fs = require('fs')
var glob = require("glob")

// glob("**/imge/*.png", function (er, files) {
//   files.forEach(file => {
//     let path = file.split('/')
//     let img = path.pop()
//     path.pop()
//     let url = path.join('/')
//     console.log(url)
//     console.log(file)
//     // git grep 命令会执行 perl 的正则匹配所有满足冲突条件的文件,  用node进程执行命令，返回的结果是0，1如何拿到git show里面打印的内容？
//     try {
//       results = execSync(`git grep -r "${img}" "${url}"`, { encoding: 'utf-8' })
//       // 0 1
//     } catch (e) {
//       fs.unlinkSync(`./${file}`);
//       console.log(file)
//     }
//   })
//   // git show
// })
// 
function checkImg(path) {
  glob(path +"/imge/*.png", function (er, files) {
  files.forEach(file => {
    let path = file.split('/')
    let img = path.pop()
    path.pop()
    let url = path.join('/')
    console.log(url)
    console.log(file)
    // git grep 命令会执行 perl 的正则匹配所有满足冲突条件的文件,  用node进程执行命令，返回的结果是0，1如何拿到git show里面打印的内容？
    try {
      results = execSync(`git grep -r "${img}" "${url}"`, { encoding: 'utf-8' })
      // 0 1
    } catch (e) {
      fs.unlinkSync(`./${file}`);
      console.log(file)
    }
  })
  // git show
})

}
let a = execSync('git diff --name-only HEAD~ HEAD')
let list = a.toString('utf-8')
list = list.split('\n')
console.log(list)
list.forEach(file => {
  var index= file.lastIndexOf(".");
  var ext = file.substr(index + 1);
  if (ext == 'md') {
    let tmp = file.split('/')
    tmp.pop()
    path = tmp.join('/')
    
  }
})
// 怎么把这些字符串转数组，然后再判断是不是md，是就把对应的img文件夹下所有的图片检查下。。