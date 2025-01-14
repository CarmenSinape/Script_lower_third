"object"!=typeof JSON&&(JSON={}),function(){"use strict";var rx_one=/^[\],:{}\s]*$/,rx_two=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,rx_three=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,rx_four=/(?:^|:|,)(?:\s*\[)+/g,rx_escapable=/[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,rx_dangerous=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta,rep;function f(t){return t<10?"0"+t:t}function this_value(){return this.valueOf()}function quote(t){return rx_escapable.lastIndex=0,rx_escapable.test(t)?'"'+t.replace(rx_escapable,function(t){var e=meta[t];return"string"==typeof e?e:"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+t+'"'}function str(t,e){var r,n,o,u,f,a=gap,i=e[t];switch(i&&"object"==typeof i&&"function"==typeof i.toJSON&&(i=i.toJSON(t)),"function"==typeof rep&&(i=rep.call(e,t,i)),typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";if(gap+=indent,f=[],"[object Array]"===Object.prototype.toString.apply(i)){for(u=i.length,r=0;r<u;r+=1)f[r]=str(r,i)||"null";return o=0===f.length?"[]":gap?"[\n"+gap+f.join(",\n"+gap)+"\n"+a+"]":"["+f.join(",")+"]",gap=a,o}if(rep&&"object"==typeof rep)for(u=rep.length,r=0;r<u;r+=1)"string"==typeof rep[r]&&(o=str(n=rep[r],i))&&f.push(quote(n)+(gap?": ":":")+o);else for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(o=str(n,i))&&f.push(quote(n)+(gap?": ":":")+o);return o=0===f.length?"{}":gap?"{\n"+gap+f.join(",\n"+gap)+"\n"+a+"}":"{"+f.join(",")+"}",gap=a,o}}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},Boolean.prototype.toJSON=this_value,Number.prototype.toJSON=this_value,String.prototype.toJSON=this_value),"function"!=typeof JSON.stringify&&(meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},JSON.stringify=function(t,e,r){var n;if(indent=gap="","number"==typeof r)for(n=0;n<r;n+=1)indent+=" ";else"string"==typeof r&&(indent=r);if((rep=e)&&"function"!=typeof e&&("object"!=typeof e||"number"!=typeof e.length))throw new Error("JSON.stringify");return str("",{"":t})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){var j;function walk(t,e){var r,n,o=t[e];if(o&&"object"==typeof o)for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(void 0!==(n=walk(o,r))?o[r]=n:delete o[r]);return reviver.call(t,e,o)}if(text=String(text),rx_dangerous.lastIndex=0,rx_dangerous.test(text)&&(text=text.replace(rx_dangerous,function(t){return"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})),rx_one.test(text.replace(rx_two,"@").replace(rx_three,"]").replace(rx_four,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}();

//variables globales

var file = new File;
var check = 0;

var missingFonts = app.fonts.missingOrSubstitutedFonts;
var allMyFonts = app.fonts.allFonts;

//UI

var myWindow = new Window("palette", "Rótulos DePRISA", undefined);
myWindow.orientation = "column";

var title = myWindow.add("statictext", undefined, "El Script de PRISA");

//UI Rotulación

var groupOne = myWindow.add("group", undefined,"");
groupOne.orientation = "row";

var panelLowerThird = groupOne.add("panel", undefined, "Rotulación", {borderStyle: "black"})
panelLowerThird.orientation = "column";
var panelOneGroupOne = panelLowerThird.add("group", undefined, "panelGroupOne");
panelOneGroupOne.orientation = "row";
var fileTextBox = panelOneGroupOne.add("edittext", undefined, "Selecciona un archivo .json o .csv");
fileTextBox.size = [200, 20];
var getFileButton = panelOneGroupOne.add("button", undefined, "Seleccionar...");

var groupTwo = panelLowerThird.add("group", undefined,"");
groupTwo.orientation = "row";
var cancelButton = groupTwo.add("button", undefined, "Cancelar");
var ApplyButton = groupTwo.add("button", undefined, "Ejecutar");

//UI cierre composiciones

var groupThree = myWindow.add("group", undefined, "");
groupThree.orientation = "row";

var panelCloseComps = groupThree.add("panel", undefined, "Cerrar composiciones abiertas", {borderStyle: "black"});
var closeCompButton = panelCloseComps.add("button", undefined, "Cerrar");

//UI sustitución de missing fonts

var panelMissingFonts = myWindow.add("panel", undefined, "Sustituir missing fonts", { borderStyle: "black" });
panelMissingFonts.orientation = "column";

var groupFirstRow = panelMissingFonts.add("group", undefined, "");
groupFirstRow.orientation = "row";

var missingFontsList = groupFirstRow.add("listbox", undefined, [], { multiselect: false, scrollable: true });
missingFontsList.preferredSize = [200, 150];

var dropdownGroup = groupFirstRow.add("group", undefined, "");
dropdownGroup.orientation = "column";

var fontFamiliesDropdown = dropdownGroup.add("dropdownlist", undefined, []);
fontFamiliesDropdown.preferredSize = [200, 30];

var fontStylesDropdown = dropdownGroup.add("dropdownlist", undefined, []);
fontStylesDropdown.preferredSize = [200, 30];

var groupSecondRow = panelMissingFonts.add("group", undefined, "");
groupSecondRow.orientation = "row";
groupSecondRow.alignChildren = "center";

// Botones missing fonts script
var searchMissingFontsButton = groupSecondRow.add("button", undefined, "Buscar fuentes perdidas");
var changeFontButton = groupSecondRow.add("button", undefined, "Cambiar fuente");

myWindow.center();
myWindow.show();

//Funcionalidades

//SCRIPT CERRAR COMPOSICIONES

closeCompButton.onClick = function () {
    app.beginUndoGroup("Deshacer cerrado de composiciones");

    var projectItems = app.project.items;
var activeItem = app.project.activeItem;
    for (var i = 1; i <= projectItems.length; i++) {
    if (app.project.item(i) instanceof CompItem && app.project.item(i) != activeItem) {
            app.project.item(i).openInViewer();
            app.executeCommand(4);
        }
    }

    app.endUndoGroup();
};

//SCRIPT ROTULACIÓN

//botón selección archivo

getFileButton.onClick = function() {

    file = File.openDialog("Selecciona un archivo .json o .csv", "Archivos válidos: *.json, *.csv");
    fileTextBox.text = file.fsName;
    check = 1;
    if (!file) {
        alert("No se seleccionó ningún archivo.");
        return;
    }
};

//botón cancelar

cancelButton.onClick = function() {
    myWindow.close();
};

//botón ejecutar

ApplyButton.onClick = function() {
   app.beginUndoGroup("Deshacer la generacion automatica de rotulación");

    if (check == 0) {
        alert("Por favor, selecciona un archivo");
        return false;
    } else {
        var fileExtension = fileTextBox.text;
        var fileData;

        if (fileExtension.substring(fileExtension.length - 4, fileExtension.length) == "json") {
                fileData = readJson();
            } else if (fileExtension.substring(fileExtension.length - 3, fileExtension.length) == "csv") {
                fileData = readCsv();
            } else {
                 alert("Formato no soportado. Selecciona un archivo .json o .csv");
                return;
            }

        changeComp(fileData);
    }
   app.endUndoGroup();
    //alert("Listo!");
};

//función para leer archivos JSON

function readJson() {
    var currentLine;
    var jsonStuff = [];
    file.open("r");
       while (!file.eof) {
            currentLine = file.readln();
            jsonStuff.push(currentLine);
        }
    file.close();
    jsonStuff = jsonStuff.join("");

    var parsedJson = JSON.parse(jsonStuff);
   // alert(jsonStuff);
    return parsedJson;
}

//función para leer archivos CSV

function readCsv() {
    var data = [];  // Aquí almacenaremos los objetos procesados
    var headers = [];  // Aquí almacenaremos los encabezados

    // Asegúrate de que el archivo exista antes de procesarlo
    if (!file.exists) {
        alert("El archivo no existe.");
        return [];
    }

    try {
        file.open("r"); 
        // Lee la primera línea del archivo como encabezados
        if (!file.eof) {
            var headerLine = file.readln();
            headers = headerLine.split(",");  // Divide los encabezados por comas
        }
        // Lee el resto del archivo línea por línea
        while (!file.eof) {
            var currentLine = file.readln();  // Lee una línea
             
            var columns = currentLine.split(",");  // Divide las columnas
            var rowObject = {};  // Crea un objeto para esta fila

            // Asigna los valores de las columnas a los encabezados
            for (var i = 0; i < headers.length; i++) {
                rowObject[headers[i]] = columns[i] || "";  // Si no hay valor, usa una cadena vacía
            }

            data.push(rowObject);  // Agrega el objeto al array
        }
    
        file.close(); 

        return data;  // Devuelve el array de objetos
   
    } catch (e) {
        alert("Error al procesar el archivo CSV: " + e.message);
        return [];
    }
}

//función para duplicar las composiciones

function changeComp(data) {
    var comp = app.project.activeItem;
    //comp.name = data.index + "_Rotulacion_" + data.nombre;

    if(!(comp instanceof CompItem)) {
        alert("Selecciona una composición");
        return;
    }

    var compositionFolder = app.project.items.addFolder("000_Rotulacion_final");
    var precompositionFolder = app.project.items.addFolder("___Precomposiciones_rotulacion");


    for(var i = 0; i < data.length; i++){
        var duplicatedComp = comp.duplicate();

        if(duplicatedComp instanceof CompItem) {
            duplicatedComp.name = data[i].index + "_Rotulacion_" + data[i].nombre;
            changeTextLayer(duplicatedComp, data[i]);

            duplicatedComp.parentFolder = compositionFolder; //mover las compos a la carpeta
            duplicatePrecompositions(duplicatedComp, precompositionFolder); //llama a la función de duplicados de precompos y las mete en las carpetas de precompos

        } else {
            alert("Error al duplicar la composición en la iteración" + i);
        }
    
    }
  
};

//función para duplicar precomposiciones

function duplicatePrecompositions(comp, precompositionFolder){
    for(var i = 1; i <= comp.numLayers; i++){
        var layer = comp.layer(i);

        if (layer.source instanceof CompItem){
            var duplicatedPrecomp = layer.source.duplicate();
            duplicatedPrecomp.name = comp.name + "_Precomp_" + i;

            //mover la precompo duplicada a la carpeta de precompos
            duplicatedPrecomp.parentFolder = precompositionFolder;

            //reemplazar la fuente de la capa de la precompo duplicada
            layer.replaceSource(duplicatedPrecomp, false);

            //recursión
            duplicatePrecompositions(duplicatedPrecomp, precompositionFolder);
        }
    }
}


//función para cambiar el texto de las placas de nombre y cargo

function changeTextLayer(duplicatedComp, dataItem){
    for (var i = 1; i <= duplicatedComp.numLayers; i++){
        var layer = duplicatedComp.layer(i); 
       
        if (layer instanceof TextLayer){
        if(layer.name === "nombre"){
            layer.property("Source Text").setValue(dataItem.nombre);
            }
         if(layer.name === "cargo"){
            layer.property("Source Text").setValue(dataItem.cargo.toUpperCase());
            }
        } else if (layer.source instanceof CompItem){
            var nestedComp = layer.source;
            changeTextLayer(nestedComp, dataItem); //función recursiva para ejecutar la función si lo que detecta es una composición y no una capa de texto
        }
    }
}

//SCRIPT SUSTITUCIÓN DE MISSING FONTS

// Llenar el dropdown con todas las familias de fuentes instaladas
function instaledFonts() {
    fontFamiliesDropdown.removeAll();

    if (allMyFonts.length > 0) {
        for (var i = 0; i < allMyFonts.length; i++) {
            var fontGroup = allMyFonts[i]; 
            if (fontGroup.length > 0) {
                var familyName = fontGroup[0].familyName;
                var familyItem = fontFamiliesDropdown.add("item", familyName);
                familyItem.fontGroup = fontGroup; 
            }
        }
        fontFamiliesDropdown.selection = 0; // Seleccionar la primera familia por defecto
        updateFontStyles(); 
    } else {
        alert("No se encontraron fuentes instaladas.");
    }
}

// Llenar el dropdown con los estilos únicos de la familia seleccionada
function updateFontStyles() {
    fontStylesDropdown.removeAll(); 

    var selectedFamily = fontFamiliesDropdown.selection;
    if (!selectedFamily) {
        alert("Por favor selecciona una familia de fuentes.");
        return;
    }

    var fontGroup = selectedFamily.fontGroup; 
    var uniqueStyles = {}; // Objeto para rastrear estilos únicos

    for (var i = 0; i < fontGroup.length; i++) {
        var font = fontGroup[i];
        if (!uniqueStyles[font.styleName]) {
            var styleItem = fontStylesDropdown.add("item", font.styleName);
            styleItem.font = font; 
            uniqueStyles[font.styleName] = true; 
        }
    }

    fontStylesDropdown.selection = 0; 
}

// Buscar la lista de fuentes perdidas
searchMissingFontsButton.onClick = function () {
    missingFontsList.removeAll(); 

    if (missingFonts.length > 0) {
        for (var i = 0; i < missingFonts.length; i++) {
            var missingFont = missingFonts[i];
            var listItem = missingFontsList.add("item", missingFont.familyName);
            listItem.font = missingFont; // Asociar el objeto Font con el item
        }
    } else {
        alert("No hay fuentes perdidas.");
    }
};

// Actualizar estilos cuando se selecciona una familia
fontFamiliesDropdown.onChange = function () {
    updateFontStyles(); 
};

// Reemplazar la fuente perdida con la fuente seleccionada
changeFontButton.onClick = function () {
    app.beginUndoGroup("Reestablecer fuentes sustituidas");

    if (!missingFontsList.selection) {
        alert("Por favor, selecciona una fuente perdida de la lista.");
        return;
    }

    if (!fontFamiliesDropdown.selection || !fontStylesDropdown.selection) {
        alert("Por favor, selecciona una familia y un estilo de fuente.");
        return;
    }

    // Obtener la fuente perdida seleccionada
    var fromFont = missingFontsList.selection.font;
    if (!fromFont) {
        alert("No se pudo encontrar la fuente perdida seleccionada.");
        return;
    }

    // Obtener la fuente de destino seleccionada
    var toFont = fontStylesDropdown.selection.font;
    if (!toFont) {
        alert("No se pudo encontrar la fuente de destino seleccionada.");
        return;
    }

    // Reemplazar la fuente
    try {
        var layerChanged = app.project.replaceFont(fromFont, toFont);
        if (layerChanged) {
            alert("Fuente reemplazada exitosamente.");
        } else {
            alert("No se encontraron capas afectadas.");
        }
    } catch (e) {
        alert("Ocurrió un error al reemplazar la fuente: " + e.message);
    }

     app.endUndoGroup();
};

// Llenar la lista de fuentes instaladas al cargar la interfaz
instaledFonts();
