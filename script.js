function calculateFreq(testType, band, channel, standard = null) {
  let freq = -1;
  let bw = standard !== "BLE" ? 1 : 2;

  if (testType === "bt") {
    channel = parseInt(channel);
    band = parseInt(band);

    if (band === 0) {
      if (channel >= 0 && channel <= 78) freq = 2402 + bw * channel;
    } else if (band === 1 && channel <= 100) freq = 5150 + bw * channel;
    else if (band === 2 && channel <= 125) freq = 5725 + bw * channel;
    else if (band === 4 && channel <= 125) freq = 5925 + bw * channel;
    else if (band === 5 && channel <= 124) freq = 6051 + bw * channel;
    else if (band === 6 && channel <= 124) freq = 6176 + bw * channel;
    else if (band === 7 && channel <= 124) freq = 6301 + bw * channel;
    else throw new Error("Invalid band or channel");
  } else if (testType === "wifi") {
    channel = parseInt(channel);
    if (band === "2.4") {
      freq = 2407 + channel * 5;
    } else if (band === "5") {
      freq = 5000 + channel * 5;
    } else if (band === "6") {
      freq = 5950 + channel * 5;
    } else {
      throw new Error("Invalid WiFi band");
    }
  } else {
    throw new Error("Invalid test type");
  }

  return freq;
}

function calculateBandCh(testType, freq, standard = null) {
  let band = -1;
  let ch = -1;
  let bw = standard !== "BLE" ? 1 : 2;

  if (testType === "bt") {
    if (freq >= 2402 && freq <= 2480) {
      band = 0;
      ch = Math.floor((freq - 2402) / bw);
    } else if (freq >= 5150 && freq <= 5250) {
      band = 1;
      ch = Math.floor((freq - 5150) / bw);
    } else if (freq >= 5725 && freq <= 5850) {
      band = 2;
      ch = Math.floor((freq - 5725) / bw);
    } else if (freq >= 5925 && freq <= 6050) {
      band = 4;
      ch = Math.floor((freq - 5925) / bw);
    } else if (freq >= 6051 && freq <= 6175) {
      band = 5;
      ch = Math.floor((freq - 6051) / bw);
    } else if (freq >= 6176 && freq <= 6300) {
      band = 6;
      ch = Math.floor((freq - 6176) / bw);
    } else if (freq >= 6301 && freq <= 6425) {
      band = 7;
      ch = Math.floor((freq - 6301) / bw);
    }
  } else if (testType === "wifi") {
    freq = parseInt(freq);
    if (freq >= 2412 && freq <= 2484) {
      band = "2.4";
      ch = Math.round((freq - 2407) / 5);
    } else if (freq >= 5000 && freq <= 5900) {
      band = "5";
      ch = Math.round((freq - 5000) / 5);
    } else if (freq >= 5950 && freq <= 7050) {
      band = "6";
      ch = Math.round((freq - 5950) / 5);
    }
  }

  return { band, ch };
}

function calculateFromFreq() {
  const testType = document.getElementById("testTypeSelect").value;
  const standard = document.getElementById("standardSelect").value;
  const freqStr = document.getElementById("freqInput").value;

  if (!freqStr) {
    document.getElementById("freqResult").innerText =
      "❌ Please enter a frequency.";
    return;
  }

  const freq = parseInt(freqStr);
  if (isNaN(freq)) {
    document.getElementById("freqResult").innerText =
      "❌ Please enter a valid number.";
    return;
  }

  try {
    const { band, ch } = calculateBandCh(testType, freq, standard);
    if (band === -1 || ch === -1) {
      document.getElementById(
        "freqResult"
      ).innerText = `❌ Please enter a valid frequency.`;
    } else {
      document.getElementById(
        "freqResult"
      ).innerText = `📶 Band: ${band}, Channel: ${ch}`;
    }
  } catch (e) {
    document.getElementById("freqResult").innerText = `❌ Error: ${e.message}`;
  }
}

function calculateFromChannel() {
  const testType = document.getElementById("testTypeSelect2").value;
  const standard = document.getElementById("standardSelect2").value;
  const band = document.getElementById("bandInput").value.trim();
  const chStr = document.getElementById("channelInput").value;

  if (!band) {
    document.getElementById("channelResult").innerText =
      "❌ Please enter a band.";
    return;
  }
  if (!chStr) {
    document.getElementById("channelResult").innerText =
      "❌ Please enter a channel.";
    return;
  }

  const ch = parseInt(chStr);
  if (isNaN(ch)) {
    document.getElementById("channelResult").innerText =
      "❌ Please enter a valid channel number.";
    return;
  }

  try {
    const freq = calculateFreq(testType, band, ch, standard);
    document.getElementById(
      "channelResult"
    ).innerText = `📡 Frequency: ${freq} MHz`;
  } catch (e) {
    document.getElementById(
      "channelResult"
    ).innerText = `❌ Error: ${e.message}`;
  }
}

document.getElementById("freqInput").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    calculateFromFreq();
  }
});

document.getElementById("bandInput").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    calculateFromChannel();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const testTypeSelect = document.getElementById("testTypeSelect");
  const standardSelect = document.getElementById("standardSelect");

  function updateStandardSelect() {
    if (testTypeSelect.value === "wifi") {
      standardSelect.value = "WIFI";
      standardSelect.disabled = true;
    } else {
      standardSelect.value = "DH5";
      standardSelect.disabled = false;
    }
  }

  testTypeSelect.addEventListener("change", updateStandardSelect);
  updateStandardSelect();
});

document.addEventListener("DOMContentLoaded", function () {
  const testTypeSelect2 = document.getElementById("testTypeSelect2");
  const standardSelect2 = document.getElementById("standardSelect2");

  function updateStandardSelect2() {
    if (testTypeSelect2.value === "wifi") {
      standardSelect2.value = "WIFI";
      standardSelect2.disabled = true;
    } else {
      standardSelect2.value = "DH5";
      standardSelect2.disabled = false;
    }
  }

  testTypeSelect2.addEventListener("change", updateStandardSelect2);
  updateStandardSelect2();
});

document
  .getElementById("channelInput")
  .addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      calculateFromChannel();
    }
  });
