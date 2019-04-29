# Electron Titlebar Example Application

## Examples

### Multi-Level Submenu Example / Submenu Header Labels

![Default][winDefault]
![DarLinDefault][darDefault]

```js
<TitleBar
  icon={defaultIcon}
  app="Electron Title Bar"
  menu={defaultTemplate}
/>
```

### Stacked Menu Bar

![DefaultStacked][winDefaultStacked]

```js
<TitleBar
  icon={defaultIcon}
  app="Electron Title Bar"
  menu={defaultTemplate}
  theme={{
    menuStyle: 'stacked'
  }}
/>
```

### GitHub - Dark Theme Example

![Github][winGithub]
![DarGithub][darGithub]

```js
<TitleBar
  icon={gitIcon}
  title="Project Name"
  menu={githubTemplate}
  theme={{
    barTheme: 'dark',
    barShowBorder: true,
    menuDimItems: false,
    showIconDarwin: false
  }}
/>
```

### VSCode

![VSCode][winCode]
![DarCode][darCode]

```js
<TitleBar
  icon={codeIcon}
  app="Code"
  title="index.js - frameless-titlebar"
  menu={defaultTemplate}
  theme={{
    barTheme: 'dark',
    barBackgroundColor: 'rgb(36, 37, 38)',
    barColor: 'rgb(230, 230, 230)',
    menuHighlightColor: '#373277',
    menuDimItems: false,
    showIconDarwin: false
  }}
/>
```

### Signal

![Signal][winSignal]
![DarSignal][darSignal]

```js
<TitleBar
  icon={signalIcon}
  app="Signal"
  menu={signalTemplate}
  theme={{
    barTheme: 'dark',
    barBackgroundColor: '#2090ea',
    menuHighlightColor: '#2090ea',
    barShowBorder: true,
    barBorderBottom: '1px solid #1a70b7',
    menuDimItems: false
  }}
/>
```

### WhatsApp - Light Theme Example

![WhatsApp][winWhat]
![DarWhatsApp][darWhat]

```js
<TitleBar
  icon={whatIcon}
  app="WhatsApp"
  theme={{
    barTheme: 'light',
    barBackgroundColor: '#eaeaea',
    menuHighlightColor: '#33c151',
    menuDimItems: false
  }}
/>
```

### Slack - Vertical Menu Example

![Slack][winSlack]
![Slack][darSlack]

> Leaving the dynamic project title in the app property is fine in this case since the toolbar menu has a vertical style where the menu items are to the left of the title

If you see the example for [VSCode](#VSCode) you'll see the app name can be set to "Code" (shortened title to the left of the menu items) and changing the title property will only be reflected on mac applications for the currently selected tab

```js
<TitleBar
  icon={slackIcon}
  app="Slack - ElectronTitlebar"
  menu={slackTemplate}
  theme={{
    barTheme: 'dark',
    barBackgroundColor: '#251d24',
    menuStyle: 'vertical',
    menuHighlightColor: '#52a98c',
    menuDimItems: false
  }}
/>
```

[main]: ./src/assets/Main.png "Main"
[winDefault]: ./src/assets/win/Default.png "Default"
[winDefaultStacked]: ./src/assets/win/Default_Stacked.png "DefaultStacked"
[winGithub]: ./src/assets/win/Github.png "GitHub"
[winSlack]: ./src/assets/win/Slack.png "Slack"
[winSignal]: ./src/assets/win/Signal.png "Signal"
[winWhat]: ./src/assets/win/WhatsApp.png "WhatsApp"
[winCode]: ./src/assets/win/VSCode.png "VSCode"


[darDefault]: ./src/assets/dar-lin/Default.png "Default"
[darGithub]: ./src/assets/dar-lin/Github.png "GitHub"
[darSlack]: ./src/assets/dar-lin/Slack.png "Slack"
[darSignal]: ./src/assets/dar-lin/Signal.png "Signal"
[darWhat]: ./src/assets/dar-lin/WhatsApp.png "WhatsApp"
[darCode]: ./src/assets/dar-lin/VSCode.png "VSCode"