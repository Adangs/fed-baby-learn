## 引用 
```vue
<x-countdown v-slot="{day, hour, minute, second}" :end="after.invalidTime" auto @finish="onTimeFinish">
  还剩{{day}}天{{hour}}小时{{minute}}分{{second}}秒
</x-countdown>
```
### 配置
```
end [String] 结束时间 2020-01-01 00:00:00
time [Number] 倒计时的毫秒数
auto [Boolean] 是否自动启动倒计时
```

### slot数据
```
day 天
hour 小时
minute 分钟
second 秒
remain 剩余毫秒数
```
   
### 事件

```
finish 倒计时结束事件
```

### 组件可调用方法

```
start 开始倒计时
pause 暂停倒计时
reset 重置倒计时
```