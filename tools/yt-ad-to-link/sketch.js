// (c) 2020 Benjamin Aster  


let title;
let infoText;
let textBox;
let test1;
let test2;
let test3 = false;

let language = "English";
let languageSelect;

/*
let debugInfo;
let link;
let url;
let urlText;
*/

let urlInfoText = "error";
let urlInfo;
let url;

let buttonOpenNewTab;
let buttonOpenThisTab;
let buttonCopyUrl;

let linkTest;

let copyright;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  title = createElement('h2', "Loading...  If you can see this, an error occured.");
  title.position(20, 0);
  title.style("color", color(255, 255, 255));
  title.style("font-family", "Segoe UI");

  infoText = createDiv("Loading...  If you can see this, an error occured.");
  infoText.position(20, AUTO);
  infoText.style("color", color(255, 255, 255));
  infoText.style("font-family", "Segoe UI");

  textBox = createInput("");
  textBox.mousePressed(clearInput);
  textBox.value("Loading...  If you can see this, an error occured.");
  textBox.style("background-color", color(255, 255, 255));
  textBox.style("border-color", color(255, 50, 0));
  textBox.style("border-style", "solid");
  textBox.style("border-radius", "6px");
  textBox.style("font-family", "Segoe UI");
  textBox.size(null, 30);
  textBox.position(20, null)

  copyright = createP("© 2020 Benjamin Aster");
  copyright.style("color", color(255));
  copyright.style("font-family", "Segoe UI");

  //linkTest = createElement("p", '<meta http-equiv="refresh" content="0; url=http://example.com/" />')
  //linkTest.position(100, 100)

  buttonOpenNewTab = createElement("button", "Loading...  If you can see this, an error occured.");
  buttonOpenNewTab.mouseClicked(function () {
    window.open(url, "_blank");
  });
  buttonOpenNewTab.size(null, 40);
  buttonOpenNewTab.style("background-color", color(50, 50, 50));
  buttonOpenNewTab.style("border-color", color(255, 0, 0));
  buttonOpenNewTab.style("border-style", "solid");
  buttonOpenNewTab.style("border-radius", "6px");
  buttonOpenNewTab.style("color", color(255, 255, 255));
  buttonOpenNewTab.hide();

  buttonOpenThisTab = createElement("button", "Loading...  If you can see this, an error occured.");
  buttonOpenThisTab.mouseClicked(function () {
    window.open(url, "_self");
  });
  buttonOpenThisTab.size(null, 40);
  buttonOpenThisTab.style("background-color", color(50, 50, 50));
  buttonOpenThisTab.style("border-color", color(127, 127, 127));
  buttonOpenThisTab.style("border-style", "solid");
  buttonOpenThisTab.style("border-radius", "6px");
  buttonOpenThisTab.style("color", color(255, 255, 255));
  buttonOpenThisTab.hide();

  /*
  buttonCopyUrl = createElement("button", (language == "English") ? "Copy link" : "Link kopieren");
  buttonCopyUrl.position(320, 300);
  buttonCopyUrl.mousePressed(copyUrl);
  buttonCopyUrl.hide();
  */


  urlInfo = createDiv(urlInfoText)
  urlInfo.style("color", color(255, 255, 255));
  urlInfo.style("font-family", "Segoe UI");
  urlInfo.hide();

  languageSelect = createSelect();
  languageSelect.size(null, 30)
  languageSelect.style("color", color(255));
  languageSelect.style("background-color", color(50));
  languageSelect.style("border-color", color(255));
  languageSelect.option('English');
  languageSelect.option('Deutsch');
  languageSelect.selected('English');

  languageSelect.changed(function () {
    language = languageSelect.value();
    print(language);
    updateText();
  });

  updateText();
  windowResized();
  
  print(test3);
  

}


function draw() {
  background(0);
  
}


function createURL() {
  debugInfo = textBox.value();
  debugInfo = split(debugInfo, '"');

  url = "";
  urlInfoText = (language == "English") ? "ERROR - Not a valid debug info" : "ERROR - Keine gültige Debung-Information";

  for (let pos = 0; pos < debugInfo.length; pos++) {
    if (str(debugInfo[pos]) == "ad_docid" || str(debugInfo[pos]) == "ad_debug_videoId") {
      url = "https://www.youtube.com/watch?v=" + debugInfo[pos + 2];
      urlInfoText = ((language == "English") ? "The original URL of the video ad: " : "Die originale URL des Werbevideos: ") + url;
      break;
    }
  }
  /*
  if (linkThisTab != undefined) {
    urlInfo.remove();
  }*/

  if (url.length < 20) {  // no valid url
    buttonOpenNewTab.hide();
    buttonOpenThisTab.hide();
  } else {
    buttonOpenNewTab.show();
    buttonOpenThisTab.show();
  }
  urlInfo.show();
  urlInfo.html(urlInfoText);

  textBox.value((language == "English") ? "   Click here to paste another debug info" : "   Klicke hier, um eine weitere Debug-Information einzufügen");

  windowResized();


}

function keyPressed() {
  if (keyCode == ENTER || keyCode == RETURN) {
    createURL();
  }

  select("testtest");
  document.execCommand("copy");
}

function clearInput() {
  if (str(textBox.value).charAt(0) != 'K') {
    textBox.value("");
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  title.size(width - 40, null);

  infoText.size(width - 40);
  infoText.position(null, title.position().y + title.height + 10);

  textBox.size(width - 40);
  textBox.position(null, infoText.position().y + infoText.height + 15);

  copyright.position(20, height - 55);

  urlInfo.position(20, textBox.position().y + textBox.size().height + 10);

  buttonOpenNewTab.position(20, textBox.position().y + textBox.size().height + urlInfo.size().height + 20);
  buttonOpenThisTab.position(buttonOpenNewTab.size().width + 30, buttonOpenNewTab.position().y);

  languageSelect.position(width - 90, 20)

}

function updateText() {
  title.html((language == "English") ? "YouTube ad link generator" : "YouTube-Werbung-Link Generator");

  infoText.html((language == "English") ?
    'Right click on an ad and select "Copy debug info". Paste it into this Textbox and press enter to get the link of the original, mostly unlisted video of the ad.'
    :
    'Klicke mit rechtem Mausklick auf ein Werbevideo und wähle "Debug-Information kopieren" aus. Füge sie anschließen in dieser Textbox ein und drücke Enter, um den Link von dem originalen, meist ungelisteten Werbevideo zu erhalten.');

  textBox.value((language == "English") ? "   Click here to paste a debug info" : "   Klicke hier, um eine Debug-Information einzufügen");

  buttonOpenNewTab.html((language == "English") ? "Open in new Tab" : "Link in neuem Tab öffnen");
  buttonOpenThisTab.html((language == "English") ? "Open in this Tab" : "Link in diesem Tab öffnen");

  if (url == "") {
    urlInfoText = (language == "English") ? "ERROR - Not a valid debug info" : "ERROR - Keine gültige Debung-Information";
  } else {
    urlInfoText = ((language == "English") ? "The original URL of the video ad: " : "Die originale URL des Werbevideos: ") + url;
  }
  urlInfo.html(urlInfoText);

  windowResized();
}



















//