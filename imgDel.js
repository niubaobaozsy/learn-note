const execSync = require('child_process').execSync
const fs = require('fs')
var glob = require("glob")

glob("**/imge/*.png", function (er, files) {
  console.log(files)
  files.forEach(file => {
    let img = file.split('/').pop()
    // git grep 命令会执行 perl 的正则匹配所有满足冲突条件的文件
    try {
      results = execSync(`git grep -n "${img}"`, { encoding: 'utf-8' })
    } catch (e) {
      fs.unlinkSync(`./${file}`);
      console.log(file)
    }
  })
})