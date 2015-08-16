// File:js/mesh.js

/**
 * @author ebbs
 */
var ebbs = ebbs || {};
ebbs.mesh = ebbs.mesh || {};

ebbs.mesh.createMesh = function(width,height,material) 
{
	var geometry = new THREE.Geometry();
	material.side = THREE.FrontSide;
	
	// Create mesh vertices
	for(var i = 0; i < width; i++){
		for(var j = 0; j < height; j++){
			geometry.vertices.push( new THREE.Vector3(i,0,j) );
		}
	}
	
	// Index mesh faces
	for(i = 0; i < (width-1)*(height-1); i++){
		var column = Math.floor(i/(height-1));
		geometry.faces.push( new THREE.Face3(i+column, i+column+1, i+column+height+1) );
		geometry.faces.push( new THREE.Face3(i+column, i+column+height+1, i+column+height) );
	}
	
	geometry.computeFaceNormals();
	geometry.computeVertexNormals();

	var mesh = new THREE.Mesh( geometry, material );
	return mesh;
}
