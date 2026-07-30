# 📱 System Status Widget (Scriptable)

An iOS widget built with [Scriptable](https://scriptable.app) that shows your system status at a glance: iOS version, battery level (with a progress bar), and charging state. It fully supports Dark Mode out of the box thanks to iOS native dynamic colors.

## 🔍 Overview

The widget displays three info rows:

1. **iOS** — operating system version
2. **Battery** — battery icon, numeric percentage, and a colored progress bar
3. **Charging state** — "Charging" or "Discharging" with a lightning bolt icon

<img width="250" height="250" alt="IMG_5225" src="https://github.com/user-attachments/assets/4de3901a-f7b5-4910-848e-26b1e95d4c06" />   
<img width="250" height="250" alt="IMG_5226" src="https://github.com/user-attachments/assets/f3622a16-7425-4c94-bd06-05caee1cd907" />

## ✨ Features

- 🎨 **Dynamic colors**: background, text, and icons automatically adapt to Light Mode and Dark Mode via `Color.dynamic()`
- 🔋 **Smart battery color**:
  - Green when the level is above 60%
  - Yellow when it's between 21% and 60%
  - Red when it's 20% or below
- ⚡ **Different icon and color depending on charging state** (bolt.fill / bolt.slash.fill)
- 🌈 **Diagonal linear gradient background**
- 📐 Layout built with `WidgetStack` for clean element alignment

## 📋 Requirements

- iPhone or iPad running iOS/iPadOS
- The [Scriptable](https://apps.apple.com/app/scriptable/id1405459188) app installed (free)

## ⚙️ Installation

1. Open the **Scriptable** app.
2. Create a new script (tap the **+** in the top right corner).
3. Copy and paste the contents of [`widget.js`](./widget.js) into the script.
4. Rename the script, e.g. `System Status`.
5. Go back to your iPhone's Home Screen, long-press an empty area, and enter edit mode.
6. Tap **+** to add a widget, search for **Scriptable**, and choose the **small** size.
7. Tap the widget you just added, open its settings, and set:
   - **Script**: select the `System Status` script created in step 4
   - **When Interacting**: `Run Script` (optional)

## 🎛️ Customization

Some easy-to-tweak spots in the code:

| Element | Variable | Description |
|---|---|---|
| Background colors | `bgColorStart`, `bgColorEnd` | Start/end gradient colors (light/dark) |
| Text color | `textColor` | Main text color |
| Battery thresholds | `getDynamicBatteryColor()` | Percentages that determine green/yellow/red |
| Battery bar width | `barWidth` | Width in points of the progress bar |
| Widget padding | `widget.setPadding(...)` | Widget's internal margins |

## 🧩 Code structure

- `addModernRow()` — helper function that builds a standard row with an SF Symbol icon + text
- `getDynamicBatteryColor()` — returns the correct color based on battery percentage
- The gradient is set via `LinearGradient` with points from `(0,0)` to `(1,1)` (diagonal)

## 📝 Notes

- The SF Symbols used (`cpu`, `battery.100`, `battery.100.bolt`, `bolt.fill`, `bolt.slash.fill`) are built into iOS; if an icon isn't found, a fallback circle (`circle`) is shown instead.
- Tested for the **small** widget size (`presentSmall()` when previewed from the editor).

## 📄 License

Freely distributed for personal use. Modify and adapt as you like.
