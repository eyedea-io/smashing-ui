# Side Sheet

```sh
yarn add @smashing/side-sheet
```
#### Basic example

<!-- TODO: add pictures  -->

```jsx
    <Wrapper>
      {({setIsShown, isShown}) => (
        <SideSheet
              isShown={isShown}
              onCloseComplete={() => setIsShown(false)}
              containerProps={{
                display: 'flex',
                flex: '1',
                flexDirection: 'column'
              }}
            > Hello World!</SideSheet>
      )}
    </Wrapper>
```

#### Change position


```jsx
    <Wrapper>
      {({setIsShown, isShown}) => (
        <SideSheet
              isShown={isShown}
              onCloseComplete={() => setIsShown(false)}
              position='top'
              containerProps={{
                display: 'flex',
                flex: '1',
                flexDirection: 'column'
              }}
            > Hello World!</SideSheet>
      )}
    </Wrapper>
```

#### Hide closing button


```jsx
    <Wrapper>
      {({setIsShown, isShown}) => (
        <SideSheet
              isShown={isShown}
              onCloseComplete={() => setIsShown(false)}
              isClosingButtonVisible={false}
              containerProps={{
                display: 'flex',
                flex: '1',
                flexDirection: 'column'
              }}
            > Hello World!</SideSheet>
      )}
    </Wrapper>
```