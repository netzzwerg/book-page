
// Select the source / destination folder.
var sourceFolder = Folder.selectDialog( 'Select the folder with Illustrator for files you want to convert to SVG', '~' );

// Open Files
var files = sourceFolder.getFiles('*.png');
var maxFiles = 34;//files.length;

for ( var i=31; i < maxFiles; i++ ) {

	// Returns the document object
	var sourceDoc = app.open(files[i], DocumentColorSpace.RGB); 

	// Fit document to image size
	var activeArtboardIndex = sourceDoc.artboards.getActiveArtboardIndex();
	sourceDoc.fitArtboardToSelectedArt(activeArtboardIndex);
	sourceDoc.selectObjectsOnActiveArtboard();

	// Trace current image
	var currentSelection = sourceDoc.selection[0];
	var myTrace = currentSelection.trace();
	var options = myTrace.tracing.tracingOptions;
		options.viewMode = ViewType.TRACINGVIEWVECTORTRACINGRESULT;
		options.tracingMode = TracingModeType.TRACINGMODEGRAY;
		options.tracingMethod = TracingMethodType.TRACINGMETHODABUTTING;
		options.tracingColorTypeValue = TracingColorType.TRACINGFULLCOLOR;
		options.tracingColors = 30;
		options.colorFidelity = 100;
		options.threshold = 128;
		options.grayLevels = 1;
		options.pathFidelity = 20;
		options.cornerFidelity = 7;
		options.noiseFidelity = 1;
		options.fills = true;
		options.strokes = false;
		options.maxStrokeWeight = 10;
		options.snapCurveToLines = true;
		options.ignoreWhite = true;

	//myTrace.tracing.expandTracing();

	// Save new file and close the current document
	var newFileName = getNewName();
	exportFileToSVG( sourceFolder + '/' + newFileName );

	sourceDoc.close();

}

/*********************************************************
getNewName: Function to get the new file name. The primary
name is the same as the source file.
**********************************************************/

function getNewName() {

	var docName = sourceDoc.name;
	var extension = '.svg';
	var newName = '';

	for ( var i=0; docName[i] !== '.' ; i++ ) {
		newName += docName[i];
	}

	newName += extension;

	return newName;
}

/*********************************************************
Exports current document to dest as an SVG file with specified
options, dest contains the full path including the file name.
**********************************************************/

function exportFileToSVG (dest) {

	if ( app.documents.length > 0 ) {
		var exportOptions = new ExportOptionsSVG();
		var type = ExportType.SVG;
		var fileSpec = new File(dest);
		exportOptions.embedRasterImages = true;
		exportOptions.embedAllFonts = false;
		exportOptions.fontSubsetting = SVGFontSubsetting.GLYPHSUSED;
		app.activeDocument.exportFile( fileSpec, type, exportOptions );
	}
}

/*********************************************************
Helper for debugging. Every object has a reflect property 
that returns a reflection object that reports the contents 
of the object. 
**********************************************************/
function printObjectProperties (obj) {
	var props = obj.reflect.properties;

	for (var i = 0; i < props.length; i++) {
		$.writeln( props[i].name + ' = ' + obj[props[i].name]);
	}
}