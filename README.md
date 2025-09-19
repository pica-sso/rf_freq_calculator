# 📡 RF Frequency ↔ Band/Channel Calculator

A simple, web-based calculator for converting between RF frequency (MHz) and band/channel numbers, focused on Bluetooth (BT) and Wifi.

---

## ✨ Features

- 🔄 **Frequency → Band/Channel:**  
  Enter a frequency in MHz to get the corresponding band and channel.
- 🔄 **Band/Channel → Frequency:**  
  Enter a band and channel to get the corresponding frequency in MHz.
- 📶 Supports Bluetooth (BT) and Wifi.

---

## 🚀 Usage

1. **Open** `index.html` in your web browser.
2. Use the **first section** to convert from frequency to band/channel.
3. Use the **second section** to convert from band/channel to frequency.

---

## 💡 Result & Notification Messages

When you enter values and click the **Calculate** button, the calculator will display messages such as:

- ✅ **Calculation Result:**  
  Shows the calculated band/channel or frequency based on your input.
- ⚠️ **Invalid Input:**  
  If you enter an invalid frequency, band, or channel, a message will appear indicating the input is out of range or not supported.
- ℹ️ **Missing Input:**  
  If required fields are empty, a message will prompt you to enter the necessary values.

These messages help guide you to enter correct values and understand the calculation results.

---

## 🗂️ Project Structure

```
index.html      # Main HTML file
style.css       # Stylesheet
script.js       # Calculator logic (JavaScript)
CNAME           # (Optional) Custom domain for GitHub Pages
```

---

## 📝 Example

- **Frequency → Band/Channel:**  
  Enter `2441` MHz (Bluetooth, DH5) → Band: `0`, Channel: `39`
- **Band/Channel → Frequency:**  
  Enter Band: `0`, Channel: `39` (Bluetooth, DH5) → Frequency: `2441` MHz
