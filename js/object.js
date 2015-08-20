// Prepare box :D
var loader = new THREE.OBJMTLLoader();
var childsToAdd = ["water", "floor"]; 
var childsToRemove = ["leftSphere", "rightSphere"]; 
loader.load(
    'res/CornellBox-Water.obj',
    'res/CornellBox-Water.mtl',
    function ( object ) {
        object.position = new THREE.Vector3(0.0, 0.0, 0.0);
        object.traverse(function (child) {
            if(child.geometry !== undefined){
                child.centroid = new THREE.Vector3();
                for (var i = 0, l = child.geometry.vertices.length; i < l; i++) {
                    child.centroid.add(child.geometry.vertices[i].clone());
                }
                child.centroid.divideScalar(child.geometry.vertices.length);
                var offset = child.centroid.clone();
                child.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-offset.x, -offset.y, -offset.z));
                child.position.copy(child.centroid);
                child.geometry.computeBoundingBox();
            }
        });
        console.log(childsToRemove.length);
        for(var i = 0; i < childsToRemove.length; i++){
            console.log("Removing: "+childsToRemove[i]);
            var child = object.getObjectByName(childsToRemove[i]);
            console.log(child);
            object.remove(child);
        }
        scene.add(object);
        //scene.add( object );
    },
    function ( xhr ) {
        console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
    },
    // Function called when downloads error
    function ( xhr ) {
        console.log( 'An error happened' );
    }
);
