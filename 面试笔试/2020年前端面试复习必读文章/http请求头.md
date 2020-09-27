#### 你知道哪些http头部

Content-Length

表示传输的请求／响应的Body的长度。GET请求因为没有Body，所以不需要这个头。携带Body的并且可以提前知道Body长度的请求／响应必须带上这个字段，以便对方可以方便的分辨出报文的边界，也就是Body数据何时结束。如果Body太大，需要边计算边传输，不到最后计算结束是无法知道整个Body大小的，这个时候可以使用http分块传输，这个时候也是不需要Content-Length字段的。

# Content-Type

Content-Type是服务器向客户端发送的头，代表内容的媒体类型和编码格式，是对Accept头和Accept-Charset头的统一应答。

```
Content-Type: text/html; charset=utf8
```

# Accept

表示客户端期望服务器返回的媒体格式。客户端期望的资源类型服务器可能没有，所以客户端会期望多种类型，并且设置优先级，服务器根据优先级寻找相应的资源返回给客户端。

```
# 注意：先逗号分割类型，再分号分割属性
Accept: audio/*; q=0.2, audio/basic
```

# Transfer-Encoding

传送Body信息时需要对Body数据采取何种变换。当HTTP对Body进行分块传送时，需要增加下面的头部信息才可以进行分块传送。其它类型目前没有遇到过。

```
Transfer-Encoding: chunked
复制代码
```

# Upgrade

服务器建议客户端升级传输协议。比如当客户端使用HTTP/1.0发送请求时，服务器就可以建议客户端升级到HTTP/1.1。 这个时候就可以使用Upgrade头。客户端收到这个Upgrade后就会将后续请求转成HTTP/1.1格式继续进行交流。可以支持多个参数，使用逗号分割即可。

```
Upgrade: HTTP/1.1
复制代码
```

当客户端要和服务器进行Websocket进行通讯时，在握手阶段服务器也会向客户端发送Upgrade头部信息，提示客户端将协议切换到Websocket。

# Date

如果服务器没有缓存，那么Date就是响应的即时生成时间。如果服务器设有缓存，那么Date就是响应内容被缓存的时间。它必须符合规范里定义的特定格式，这种格式叫着HTTP-Date，不支持随意定义自己的时间格式。

```
Date: Tue, 15 Nov 1994 08:12:31 GMT
复制代码
```

# Age

表示资源缓存的年龄，也就是资源自缓存以来到现在已经过去了多少时间，单位是秒。

```
Age: 86400
复制代码
```

# Expires

服务器使用Expect头来告知对方资源何时失效。如果它的值等于Date头的值，就表示资源已经实效。

```
Expires: Thu, 01 Dec 1994 16:00:00 GMT
复制代码
```

# ETag

资源标签，每个资源可以提供多个标签信息。它一般用来和下面的If-Match和If-None-Match配合使用，用来判断缓存资源的有效性。比较常见的标签是资源的版本号，比如可以拿资源数据的md5校验码作为版本号。

# If-Match

If-Match的值一般是上面提到的ETag的值，它常用于HTTP的乐观锁。所谓HTTP乐观锁，是指客户端先GET这个资源得到ETag中的版本号，然后发起一个资源修改请求PUT|PATCH时通过If-Match头来指定资源的版本号，如果服务器资源满足If-Match中指定的版本号，请求就会被执行。如果不满足，说明资源被并发修改了，就需要返回状态码为412 Precondition failed 的错误。客户端可以选择放弃或者重试整个过程。

# If-None-Match

类似于If-Match，只是条件相反。



![img](https://user-gold-cdn.xitu.io/2018/3/24/162586e758846bfa?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



# Allow

表示资源支持访问的HTTP Method类型。它是服务器对客户端的建议，告知对方请使用Allow中提到的Method来访问资源。

```
Allow: GET, HEAD, PUT
复制代码
```

# Connection

当客户端和服务器需要协商连接的属性时，可以使用Connection头部。比较常用的一个值是close，用来通知对方在当前请求结束后关闭连接。

```
Connection: close
复制代码
```

# Expect

用于请求发送之前向服务器询问许可。譬如要向服务器发送一个很大的文件而不确定是否超出限制，就可以在请求头里携带一个Expect头部

```
Expect: 100-continue
复制代码
```

如果服务器说不行，就会返回417 Expectation Failed错误告知客户端放弃。如果可以那就返回100 continue状态码告知客户端放马过来吧，于是客户端就会继续上传Body内容。如果服务器提前收到Body内容就会放弃返回100 continue响应。

# From

该字段一般用来标记请求发起者的邮件地址，相当于给请求赋予一个责任人。如果服务器发现请求存在问题，就会通过此字段联系到发起人进行处理。因为邮件地址涉及到隐私信息，所以请求携带From头需要征得用户的同意。RFC协议建议所有的机器人代理发起的请求应该携带此头部，以免遇到问题时可以找到责任人。不过如果是恶意的机器人，估计这样的建议也只是耳边风而已。

# Host

RFC协议规定所有的HTTP请求必须携带Host头，即使Host没有值，也必须带上这个Host头附加一个空串，如果不满足，应用服务器应该抛出400 Bad Request。协议虽然这样规定，不过大部分网关或者服务器都比较仁慈，既然没有指定Host字段，那就给你默认加上一个。 网关代理可以根据不同的Host值转发到不同的upstream服务节点，它常用于虚拟主机服务业务。



![img](https://user-gold-cdn.xitu.io/2018/3/24/162586f22829c30a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



# Last-Modified

标记资源的最近修改时间，它和Date比较类似，区别是Last-Modified代表修改时间，而Date是创建时间。

# If-Modified-Since

浏览器向服务器请求静态资源时，如果浏览器本地已经有了缓存，就会携带If-Modified-Since头，值为资源的Last-Modified时间，询问服务器该资源自从这个Last-Modified时间之后有没有被修改。如果没有修改过，就会向浏览器返回304 Not Modified通知浏览器可以放心使用缓存内的资源。如果资源修改过，那就像正常的GET请求一样，携带资源的内容返回200 OK。

# If-Unmodified-Since

类似于If-Modified-Since，意义相反。区别是当服务器资源条件不满足时，不是返回304 Not Modified，而是返回412 Precondition Failed。



![img](https://user-gold-cdn.xitu.io/2018/3/24/162586fbf1ce6825?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



# Range

支持断点续传的服务器必须处理Range头，它表示客户端请求资源的一部分时指定的请求字节范围。它是客户端向服务器发送的请求头。

```
Range: bytes=500-999
复制代码
```

# Content-Range

针对上面的Range头，服务器响应客户端时也需提供相应的Content-Range头，表示传输的Body数据在整体资源块中的字节范围。比如下面的例子表示该资源总共有47022字节，当前响应的内容是21010-47021字节之间的内容。

```
Content-Range: bytes 21010-47021/47022
复制代码
```

之所以是47021而不是47022是因为offset是以0开始的，47021就是最后一个字节。

# If-Range

在断点续传时，为确保连续2个请求之间服务器资源本身没有发生变化，需要If-Range头带上ETag的资源版本号。服务器资源根据这个版本号来判定资源是否改变了。如果没变，就返回206 Partial Content将部分资源返回。如果资源变了，那就相当于一个普通的GET请求，返回200 OK和整个资源内容。



![img](https://user-gold-cdn.xitu.io/2018/3/24/16258703f0d9dbfe?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



# Location

服务器向客户端发送302跳转的时候，总会携带Location头信息，它的值为目标URL。

```
HTTP/1.1 302 Temporary Redirect
Location: https://www-temp.example.org/
```

# Authorization

对于某些需要特殊权限才能访问的资源需要客户端在请求里提供用户名密码的认证信息。它是对WWW-Authenticate的应答。

```
# value = base64(user_name:password)
Authorization: Basic YWRtaW46YWRtaW4xMjM=
```

# Via

该字段用来标识一个请求经过的网关路由节点。如果这个请求经过了多个代理层，Via头部就会有多个网关信息

# Cache-Control

这可能是HTTP头里面最复杂的一个头了。这个头既可以用于请求，也可以用于响应。在请求和响应的取值不一样，分别代表了不同的意思。

1. no-cache 如果no-cache没有指定值，那就表示不允许缓存。对于请求来说，服务器不得使用缓存内容直接返回。对于响应来说，客户端不得缓存响应的资源内容。如果no-cache指定了值，那就表示值对应的头信息不得使用缓存，其它的信息还是可以缓存的。告知对方我只要新鲜刚出浴的数据。
2. no-store 告知对方不要持久化请求/响应数据到其它地方，这种信息是敏感的，要保持它的易失性。告知对方记在心里(memory)就行，别写在纸上(disk)。
3. no-transform 告知对方不要转换数据。比如客户端上传了raw图像数据，服务器一般都会选择性压缩图像数据进行存储。no-transform告知对方保留原始数据信息，不要进行任何转换。告知对方不要乱动我发过来的东西。
4. only-if-cached 用于请求头，告知服务器只要那些已经缓存的内容，不要去reload。如果没有缓存内容就返回504 Gateway Timeout错误。表示客户端不想太麻烦服务器，有就给，没就算了。
5. max-age 用于请求头。限制缓存内容的年龄，如果超过max-age年龄的，需要服务器去reload内容资源。这叫客户端的年龄歧视。
6. max-stale 用于请求头。客户端允许服务器返回缓存已过期的资源内容，但是限定了最大过期时间。表示客户端虽然很宽容，那是也是有限度的。
7. min-fresh 用于请求头。客户端限制服务器不要那些即将过期的资源内容。就好比我们去超市买牛奶，如果牛奶快过期了虽然还在保质期内咱们也就不会考虑。
8. public 用于响应头。表示允许客户端缓存响应信息，并可以给别人使用。比如代理服务器缓存静态资源供所有代理用户使用。
9. private 用于响应头。表示仅允许客户端缓存响应信息给自己使用，不得分享给别人。这样是为了禁止代理服务器进行缓存，而允许客户端自己缓存资源内容。意思是你个人留着用就行，别借给别人用。