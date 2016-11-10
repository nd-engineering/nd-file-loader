# nd-file-loader for webpack

## 使用

usePath:是否使用路径编码


## 例子

```
{
  test: /\.(png|jpg|gif|svg|woff2?|eot|ttf)(\?.*)?$/,
  loader: `file?name=images/[name]_[hash:7].[ext]&usePath=true`
},
```
hash 是基于文件路径而不是文件内容

## 安装

```npm install nd-file-loader --save-dev```

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
