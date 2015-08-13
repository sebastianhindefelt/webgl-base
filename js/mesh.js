// File:js/mesh.js

/**
 * @author ebbs
 */
var ebbs = ebbs || {};
ebbs.watur = ebbs.watur || {};

ebbs.watur.createMesh = function(width,height) 
{
			var geometry = new THREE.Geometry();
			var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
			material.side = THREE.BothSide; // TODO: change to THREE.FrontSide
			
			// Create mesh vertices
			var WIDTH = 5;
			var HEIGHT = 5;
			for(var i = 0; i < WIDTH; i++){
				for(var j = 0; j < HEIGHT; j++){
					geometry.vertices.push( new THREE.Vector3(i,2,j) );
				}
			}
			
			// Index mesh faces
			for(i = 0; i < (WIDTH-1)*(HEIGHT-1); i++){
				var column = Math.floor(i/(HEIGHT-1));
				geometry.faces.push( new THREE.Face3(i+column, i+column+1, i+column+HEIGHT+1) );
				geometry.faces.push( new THREE.Face3(i+column, i+column+HEIGHT+1, i+column+HEIGHT) );
			}
			
			geometry.computeFaceNormals();
			geometry.computeVertexNormals();
			
			var mesh = new THREE.Mesh( geometry, material );
			return mesh;
}