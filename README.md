# mimall

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### 代理服务器需要在 nginx 配置文件加以下代码：

```
	location ^~/api/ {
	  proxy_pass http://mall-pre.springboot.cn/;
	}
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
