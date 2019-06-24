<p align="center">
  <img src="https://i.imgur.com/bV99gA8.png" />
</p>

```sh
yarn add @smashing/dialog @smashing/button @smashing/portal
```

[![Edit @smashing/dialog](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/smashingdialog-inuzv?fontsize=14)

#### Basic example

```jsx
<Button onClick={() => setIsDialogVisible(true)}>Show dialog</Button>
<Dialog
  isShown={isDialogVisible}
  title="Example"
  onCloseComplete={() => setIsDialogVisible()}
>
  Hello world
</Dialog>
```

#### Header and Footer without borders

```jsx
<Button onClick={() => setIsDialogVisible(true)}>Show dialog</Button>
<Dialog
  isShown={isDialogVisible}
  title="Example"
  onCloseComplete={() => setIsDialogVisible()}
  isFooterSeparated={false}
  isHeaderSeparated={false}
>
  Hello world
</Dialog>
```

#### Without Header and Footer

```jsx
<Button onClick={() => setIsDialogVisible(true)}>Show dialog</Button>
<Dialog
  isShown={isDialogVisible}
  title="Example"
  onCloseComplete={() => setIsDialogVisible()}
  hasHeader={false}
  hasFooter={false}
>
  Hello world
</Dialog>
```

#### Without Cancel button

```jsx
<Button onClick={() => setIsDialogVisible(true)}>Show dialog</Button>
<Dialog
  isShown={isDialogVisible}
  title="Example"
  onCloseComplete={() => setIsDialogVisible()}
  hasCancel={false}
>
  Hello world
</Dialog>
```

#### Customized Cancel and Confirm buttons

```jsx
<Button onClick={() => setIsDialogVisible(true)}>Show dialog</Button>
<Dialog
  isShown={isDialogVisible}
  title="Example"
  onCloseComplete={() => setIsDialogVisible()}
  cancelAppearance="minimal"
  cancelLabel="Abort"
  confirmAppearance="flat"
  confirmLabel="Ok"
  intent="success"
>
  Hello world
</Dialog>

```

#### Disabled Confirm button

```jsx
<Button onClick={() => setIsDialogVisible(true)}>Show dialog</Button>
<Dialog
  isShown={isDialogVisible}
  title="Example"
  onCloseComplete={() => setIsDialogVisible()}
  isConfirmDisabled
>
  Hello world
</Dialog>
```

#### Custom max width

```jsx
<Button onClick={() => setIsDialogVisible(true)}>Show dialog</Button>
<Dialog
  isShown={isDialogVisible}
  title="Example"
  onCloseComplete={() => setIsDialogVisible()}
  width={700}
>
  Hello world
</Dialog>
```

#### Handle onCancel and onConfirm

```jsx
<Button onClick={() => setIsDialogVisible(true)}>Show dialog</Button>
<Dialog
  isShown={isDialogVisible}
  title="Example"
  onCloseComplete={() => setIsDialogVisible()}
  onCancel={close => {
    console.log('cancel')
    close()
  }}
  onConfirm={close => {
    console.log('confirm')
    close()
  }}
>
  Hello world
</Dialog>
```
