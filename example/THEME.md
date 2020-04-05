# frameless-titlebar Theme

> Example theme object. This can be passed into the titlebar's `theme` property.

```json
{
  "bar": {
    "palette": "dark",
    "height": "28px",
    "color": "#fff",
    "background": "rgb(36, 51, 65)",
    "borderBottom": "",
    "titleColor": "inherit",
    "titleAlign": "center",
    "titleFontFamily": "inherit",
    "titleFontWeight": "normal",
    "inActiveOpacity": 0.6,
    "button": {
      "color": "inherit",
      "background": {
        "default": "transparent",
        "hover": "rgba(255,255,255,0.3)"
      }
    }
  },
  "controls": {
    "color": "#fff",
    "border": "",
    "layout": "right",
    "borderRadius": 0,
    "default": {
      "color": "inherit",
      "hoverColor": "#fff",
      "hoverBackground": "rgba(255,255,255,0.3)"
    },
    "close": {
      "color": "inherit",
      "hoverColor": "#fff",
      "hoverBackground": "#e81123"
    }
  },
  "menu": {
    "palette": "dark",
    "style": "default",
    "disabled": {
      "opacity": 0.3
    },
    "button": {
      "color": {
        "active": "#fff"
      },
      "background": {
        "active": "#303030"
      }
    },
    "item": {
      "height": 30,
      "color": "inherit",
      "highlight": {
        "color": "#fff",
        "background": "rgb(241, 146, 95)"
      }
    },
    "separator": {
      "color": "#e1e4e8"
    },
    "header": {
      "show": true,
      "color": "#6a737d"
    },
    "accelerator": {
      "color": "#6a737d"
    },
    "icon": {
      "highlight": true
    },
    "list": {
      "minWidth": 200,
      "maxWidth": 400,
      "marginBottom": 10,
      "marginRight": 0,
      "background": "#303030",
      "boxShadow": "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
    },
    "overlay": {
      "background": "black",
      "opacity": 0.4
    }
  }
}
```
