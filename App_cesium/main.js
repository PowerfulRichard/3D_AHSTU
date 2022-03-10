// Construct the viewer with just what we need for this base application
var viewer = new Cesium.Viewer('cesiumContainer', {
	timeline:false,
	animation:false,
	vrButton:true,
	sceneModePicker:false,
	infoBox:true,
	scene3DOnly:true,
	terrainProvider: Cesium.createWorldTerrain()
});

// Add credit to Bentley
viewer.scene.frameState.creditDisplay.addDefaultCredit(new Cesium.Credit('<a href="https://www.bentley.com/" target="_blank"><img src="Resources/logoBentley.png"/></a>Cesium 3D Tiles produced by Bentley ContextCapture'));

// Create tileset. Do not forget to reduce the default screen space error to 1
var tileset = new Cesium.Cesium3DTileset({
	url: "../Scene/Production_2.json",
	maximumScreenSpaceError : 1
});

// Override behavior of home button
viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function(commandInfo) {
	// Fly to tileset
	viewer.flyTo(tileset);

	// Tell the home button not to do anything
	commandInfo.cancel = true;
});

// Add tileset to viewer and set initial camera position
viewer.scene.primitives.add(tileset);
viewer.zoomTo(tileset);
