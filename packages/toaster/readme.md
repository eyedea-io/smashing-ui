```sh
yarn add @smashing/toaster
```

#### Default appearance

![](https://i.imgur.com/EKVBhP2.png)

```jsx
<Button onClick={() => toaster.success('Successful alert!')}>Success</Button>
```

#### With Description

![](https://i.imgur.com/tQVxSot.png)

```jsx
<Button
  onClick={() =>
    toaster.success('Successful alert!', {description: 'Hello World!'})
  }
/>
```

#### With custom duration

```jsx
<Button onClick={() => toaster.success('Successful alert!', {duration: 5})}>
  Success 5s
</Button>
```

#### Close all toasters

```jsx
<Button onClick={toaster.closeAll}>Close all</Button>
```

#### Unique toast

```jsx
<Button
  onClick={() =>
    toaster.success('Only one toaster will be shown', {id: 'forbidden-action'})
  }
>
  Success
</Button>
```
