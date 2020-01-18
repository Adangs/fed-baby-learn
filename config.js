/*
* 默认配置文件
* */
module.exports = {
  // 需要上传至cdn的静态资源文件
  assets: 'src/assets/**',
  // oss配置信息
  oss: {
    connect: {
      region: 'oss-cn-hangzhou',
      accessKeyId: 'accessKeyId',
      accessKeySecret: 'accessKeySecret',
      bucket: 'bucket'
    },
    controls: {
      'headers': {
        'Cache-Control': 'no-cache'
      }
    },
    setting: {
      dir: 'dir', // 文件存储oss的对应路径
      noClean: false, // compare with the last cache file to decide if the file deletion is need
      force: true, // ignore cache file and force re-upload all the files
      quiet: true // quiet option for oss deleteMulti operation
    }
  }
}
