# 实现 HTML 解析

[「懒人必学小技巧」利用VSCode编写html和css时，一些便捷方法](https://zhuanlan.zhihu.com/p/383348496)
[VSCode编写HTML时的快捷键（笔记）](https://blog.csdn.net/dxnn520/article/details/122096520)

## HTML节点
[HTML DOM 节点](https://www.runoob.com/htmldom/htmldom-nodes.html)
[CDATA](https://www.runoob.com/xml/xml-cdata.html)

## 识别 起始标签、结束标签、文字
FSM 有限状态机  
每一个状态是个机器。机器有输入、输出和计算的逻辑。状态机相对于机器而言，还多一个状态的迁移。
状态机是一种编程思想  

每一个状态是一个函数

## reconsume
reconsume 输入给下一个用的时候，才调用


## 关于异步
设置属性，并没有执行，和状态机的执行是一样的，跟着 for 循环一起执行完  
异步代码，定义和执行是两回事，不要只看代码的执行顺序

## 小Tips
打印输出 node start.js >1.txt