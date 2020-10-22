const execSync = require('child_process').execSync
const fs = require('fs')
var glob = require("glob")

glob("**/imge/*.png", function (er, files) {
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