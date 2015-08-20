// File:js/mesh.js

/**
 * @author ebbs
 */
var ebbs = ebbs || {};
ebbs.mesh = ebbs.mesh || {};

ebbs.mesh.createMesh = function(width,height,material,offset) 
{
	var geometry = new THREE.Geometry();
	material.side = THREE.FrontSide;
	
	// Create mesh vertices
	for(var i = 0; i < width; i++){
		for(var j = 0; j < height; j++){
			geometry.vertices.push( new THREE.Vector3(i+offset.x,offset.y,j+offset.z) );
		}
	}
	
	// Index mesh faces
    geometry.faceVertexUvs[0] = [];
	for(i = 0; i < (width-1)*(height-1); i++){
		var column = Math.floor(i/(height-1));
		geometry.faces.push( new THREE.Face3(i+column, i+column+1, i+column+height+1) );
		geometry.faces.push( new THREE.Face3(i+column, i+column+height+1, i+column+height) );

        geometry.faceVertexUvs[0].push([
            new THREE.Vector2(0.0, 1.0),
            new THREE.Vector2(0.0, 0.0),
            new THREE.Vector2(1.0, 0.0)
        ]);
        geometry.faceVertexUvs[0].push([
            new THREE.Vector2(0.0, 1.0),
            new THREE.Vector2(1.0, 0.0),
            new THREE.Vector2(1.0, 1.0)
        ]);
	}
	
	geometry.computeFaceNormals();
	geometry.computeVertexNormals();

	var mesh = new THREE.Mesh( geometry, material );
	return mesh;
}

// Taken from http://stackoverflow.com/questions/20774648/three-js-generate-uv-coordinate
ebbs.mesh.assignUVs = function( geometry ){

    geometry.computeBoundingBox();

    var max     = geometry.boundingBox.max;
    var min     = geometry.boundingBox.min;

    var offset  = new THREE.Vector2(0 - min.x, 0 - min.z);
    var range   = new THREE.Vector2(max.x - min.x, max.z - min.z);

    geometry.faceVertexUvs[0] = [];
    var faces = geometry.faces;

    for (i = 0; i < geometry.faces.length/2; i++) {
      var v1 = geometry.vertices[faces[i].a];
      var v2 = geometry.vertices[faces[i].b];
      var v3 = geometry.vertices[faces[i].c];

      geometry.faceVertexUvs[0].push([
        new THREE.Vector2( ( v1.x + offset.x ) / range.x , ( v1.z + offset.y ) / range.y ),
        new THREE.Vector2( ( v2.x + offset.x ) / range.x , ( v2.z + offset.y ) / range.y ),
        new THREE.Vector2( ( v3.x + offset.x ) / range.x , ( v3.z + offset.y ) / range.y )
      ]);
    }

    geometry.uvsNeedUpdate = true;

}
