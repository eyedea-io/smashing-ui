<p align="center">
  <img src="https://i.imgur.com/dZGaYSr.png" />
</p>

```sh
yarn add @smashing/avatar
```

[![Edit avatar](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/smashingavatar-yov92?fontsize=14)

#### Subtle(default) appearance

![](https://i.imgur.com/YjcCils.png)

```jsx
<Avatar name="Sasha Ho" />
```

#### Solid appearance

![](https://i.imgur.com/C9R6lGt.png)

```jsx
<Avatar name="Sasha Ho" appearance="solid" />
```

#### With photo

![](https://i.imgur.com/m39Q4TY.png)

```jsx
<Avatar name="Sasha Ho" src="https://i.imgur.com/6EITnfO.png" />
```

#### Subtle colors

![](https://i.imgur.com/fuTL5xX.png)

```jsx
<Avatar name="Sasha Ho" color="blue" />
<Avatar name="Sasha Ho" color="green" />
<Avatar name="Sasha Ho" color="neutral" />
<Avatar name="Sasha Ho" color="orange" />
<Avatar name="Sasha Ho" color="purple" />
<Avatar name="Sasha Ho" color="red" />
<Avatar name="Sasha Ho" color="teal" />
<Avatar name="Sasha Ho" color="yellow" />
```

#### Solid colors

![](https://i.imgur.com/bGFCU8V.png)

```jsx
<Avatar name="Sasha Ho" color="blue" appearance="solid" />
<Avatar name="Sasha Ho" color="green" appearance="solid" />
<Avatar name="Sasha Ho" color="neutral" appearance="solid" />
<Avatar name="Sasha Ho" color="orange" appearance="solid" />
<Avatar name="Sasha Ho" color="purple" appearance="solid" />
<Avatar name="Sasha Ho" color="red" appearance="solid" />
<Avatar name="Sasha Ho" color="teal" appearance="solid" />
<Avatar name="Sasha Ho" color="yellow" appearance="solid" />
```

#### Colors based on hash value

![](https://i.imgur.com/eihWCEZ.png)

```jsx
<Avatar name="Anonymous User" hashValue="id-10" />
<Avatar name="Anonymous User" hashValue="id-20" />
<Avatar name="Anonymous User" hashValue="id-30" />
```

#### Stack

![](https://i.imgur.com/ph34WbX.png)

```jsx
<AvatarStack>
  <Avatar name="Anonymous User" hashValue="id-10" />
  <Avatar name="Anonymous User" hashValue="id-20" />
  <Avatar name="Anonymous User" hashValue="id-30" />
</AvatarStack>
```

#### Stack with limit

![](https://i.imgur.com/4yRQhfR.png)

```jsx
<AvatarStack limit={2}>
  <Avatar name="Anonymous User" hashValue="id-10" />
  <Avatar name="Anonymous User" hashValue="id-20" />
  <Avatar name="Anonymous User" hashValue="id-30" />
</AvatarStack>
```

#### Stack with limit and without show more

![](https://i.imgur.com/zScitHY.png)

```jsx
<AvatarStack limit={2} showMore={false}>
  <Avatar name="Anonymous User" hashValue="id-10" />
  <Avatar name="Anonymous User" hashValue="id-20" />
  <Avatar name="Anonymous User" hashValue="id-30" />
</AvatarStack>
```
