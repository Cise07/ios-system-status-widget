let widget = new ListWidget()

// --- NATIVE DYNAMIC COLORS (iOS changes them instantly) ---
let bgColorStart = Color.dynamic(new Color("#ffffff"), new Color("#2c2c2e"))
let bgColorEnd = Color.dynamic(new Color("#e5e5ea"), new Color("#0d0d0d"))

let textColor = Color.dynamic(Color.black(), Color.white())
let headerColor = Color.dynamic(new Color("#3c3c43", 0.8), new Color("#EBEBF5", 0.6))
let barBgColor = Color.dynamic(new Color("#000000", 0.12), new Color("#ffffff", 0.20))
let iosIconColor = Color.dynamic(Color.black(), Color.white())

// Dynamic status colors (Light Mode vs Dark Mode)
let colorGreen = Color.dynamic(new Color("#34C759"), new Color("#30D158"))
let colorYellow = Color.dynamic(new Color("#FFCC00"), new Color("#FFD60A"))
let colorRed = Color.dynamic(new Color("#FF3B30"), new Color("#FF453A"))
let colorOrange = Color.dynamic(new Color("#FF9500"), new Color("#FF9F0A"))

// --- GRADIENT BACKGROUND ---
let gradient = new LinearGradient()
gradient.colors = [bgColorStart, bgColorEnd]
gradient.locations = [0.0, 1.0]
gradient.startPoint = new Point(0, 0)
gradient.endPoint = new Point(1, 1)

widget.backgroundGradient = gradient
widget.setPadding(16, 16, 16, 16)

// --- DATA ---
let iosVersion = Device.systemVersion()
let batteryLevel = Math.round(Device.batteryLevel() * 100)
let isCharging = Device.isCharging()

// Assigning battery color based on percentage
let batteryColor = getDynamicBatteryColor(batteryLevel, colorGreen, colorYellow, colorRed)

// --- HEADER ---
let headerStack = widget.addStack()
let titleText = headerStack.addText("SYSTEM STATUS")
titleText.textColor = headerColor 
titleText.textOpacity = 1
titleText.font = Font.systemFont(11, "semibold")
headerStack.addSpacer()
widget.addSpacer(15)

// --- 1. IOS ROW ---
addModernRow(widget, "apple.logo", "iOS " + iosVersion, iosIconColor, textColor)
widget.addSpacer(12)

// --- 2. BATTERY ROW ---
let batteryMainStack = widget.addStack()
batteryMainStack.centerAlignContent()

// Battery Icon
let batteryIconName = isCharging ? "battery.100.bolt" : "battery.100"
let iconSymbol = SFSymbol.named(batteryIconName)
let iconImg = batteryMainStack.addImage(iconSymbol.image)
iconImg.imageSize = new Size(18, 18)
iconImg.tintColor = batteryColor

batteryMainStack.addSpacer(10)

// Vertical Stack (Percentage + Bar)
let batteryTextStack = batteryMainStack.addStack()
batteryTextStack.layoutVertically() 

// Percentage
let batteryPercent = batteryTextStack.addText(batteryLevel + "%")
batteryPercent.textColor = textColor
batteryPercent.font = Font.systemFont(13, "bold")

batteryTextStack.addSpacer(4)

// Progress Bar
let barWidth = 80
let barCanvas = batteryTextStack.addStack()
barCanvas.size = new Size(barWidth, 5)
barCanvas.cornerRadius = 2.5
barCanvas.backgroundColor = barBgColor 

let currentWidth = Math.max(4, (barWidth * (batteryLevel / 100)))
let progress = barCanvas.addStack()
progress.size = new Size(currentWidth, 5)
progress.cornerRadius = 2.5
progress.backgroundColor = batteryColor
barCanvas.addSpacer() 

widget.addSpacer(12)

// --- 3. STATUS ROW ---
let stateIcon = isCharging ? "bolt.fill" : "bolt.slash.fill" 
let stateText = isCharging ? "Charging" : "Discharging"
let stateColor = isCharging ? colorGreen : colorOrange

addModernRow(widget, stateIcon, stateText, stateColor, textColor)

widget.addSpacer()

// --- FUNCTION FOR STANDARD ROWS ---
function addModernRow(container, iconName, value, iconColor, txtColor) {
  let mainStack = container.addStack()
  mainStack.centerAlignContent()
  
  let iconSymbol = SFSymbol.named(iconName)
  if (iconSymbol == null) iconSymbol = SFSymbol.named("circle")
  
  let iconImg = mainStack.addImage(iconSymbol.image)
  iconImg.imageSize = new Size(18, 18)
  iconImg.tintColor = iconColor
  
  mainStack.addSpacer(10)
  
  let valTxt = mainStack.addText(value)
  valTxt.textColor = txtColor
  valTxt.font = Font.systemFont(13, "bold")
}

function getDynamicBatteryColor(level, g, y, r) {
  if (level > 60) return g
  if (level > 20) return y
  return r
}

if (config.runsInWidget) {
  Script.setWidget(widget)
} else {
  widget.presentSmall()
}
Script.complete()
