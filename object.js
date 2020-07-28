
var gl;
var canvas;
var shaderProgram;
var pers_view = true;

function setup(){
    /*============== Creating a canvas ====================*/
    canvas = document.getElementById('my_Canvas');
    gl = canvas.getContext('experimental-webgl');

    gl.clearColor(0.0, 0.0, 0.0, 0.9);
    gl.clear(gl.cube_colors_buffer_BIT | gl.DEPTH_BUFFER_BIT);

    gl.enable(gl.DEPTH_TEST); //draw a pixel only if its closer to the virtual camera
    //gl.enable(gl.CULL_FACE); //get rid of faces
    //gl.cullFace(gl.BACK); //get rid of the back faces that are not facing camera 

    /*============== Initialise shaders ====================*/
    shaderProgram = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(shaderProgram);


}



/*============== Translation Declaration ====================*/
//Declare translation for triangle
var all_translations = {
    translate0 : [16,0,0],
    translate1 : [8,0,0],
    translate2 : [-1,0,0],
    translate3 : [-7.5,0,0],
    translate4 : [-18,1,0],
    translate5 : [0,-5,0],
    translateTest : [-20,0,0]
}

var axis_rotations = {
    cube_axis : [1,1,0],
    cuboid_axis : [1,0,0]
}

var cubeMaterial = {
    materialAmbient : [0.5,0.5,0.5],
    materialDiffuse : [0.6,0.4,0.7],
    materialSpecular : [0.5,0.5,0.5],
    materialShininess : 0.21794872
}

//Brass
var cuboidMaterial = {
    materialAmbient : [0.329412,0.223529,0.027451],
    materialDiffuse : [0.780392,0.568627,0.113725],
    materialSpecular : [0.992157,0.941176,0.807843],
    materialShininess : 21.0
}

//Ruby
var ruby = {
    materialAmbient : [0.1,0.18725,0.1745],
    materialDiffuse : [0.396,0.74151,0.69102],
    materialSpecular : [0.297254,0.30829,0.306678],
    materialShininess : 16.0
}


//Chrome
var triangle_prism_Material = {
    materialAmbient : [ 0.25,0.25, 0.25],
    materialDiffuse : [0.4,0.4,0.4],
    materialSpecular : [0.774597,0.774597,0.774597],
    materialShininess : 16.0
}

var pearl = {
    materialAmbient : [0.05, 0.05,0.0],
    materialDiffuse : [0.5,0.5,0.4],
    materialSpecular : [0.7, 0.7, 0.04],
    materialShininess : 7.8
}

var stageMaterial = {
        materialAmbient : [0.0, 0.0, 0.0],
        materialDiffuse : [0.55, 0.55, 0.55],
        materialSpecular : [0.7, 0.7, 0.7],
        materialShininess : 100
}

/*============== Scaling Declaration ====================*/
//Declare scaling for triangle
var tetrahedron_scale = [1,1,1];
var non_uniform_prism_scale = [1, 1, 1];
var stage_scale = [20,1,1];


var stage_buffer;
var stage_index;
var stage_color;

var cube_buffer;
var cube_index_buffer;
var cube_colors_buffer;

var cuboid_buffer;
var cuboid_index_buffer;
var cuboid_colors_buffer;

var butterfly_buffer;
var butterfly_index_buffer;
var butterfly_colors_buffer;

var triangle_prism;
var triangle_prism_index;
var triangle_prism_color;

var tetrahedron_buffer;
var tetrahedron_index;
var tetrahedron_color;



var normalsBuffer;
var normalsBuffer_cuboid;
var butterflyBuffer_normal;
var prismbuffer_normal;
var Tetarahedron_normal;
var stageNormalBuffer;




function initBuffers(){

    /*============== Stage Buffer ====================*/
    stage_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, stage_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(stage), gl.STATIC_DRAW);
    //console.log(stage);

    stage_index = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, stage_index);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(stage_indics), gl.STATIC_DRAW);
    

    stage_color = gl.createBuffer ();
    gl.bindBuffer(gl.ARRAY_BUFFER, stage_color);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(stagecolor), gl.STATIC_DRAW);

    /*============== Cube Buffer ====================*/
    // Create an empty buffer object to store vertex buffer
    cube_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cube_buffer); // Bind appropriate array buffer to it
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeVert), gl.STATIC_DRAW); // Pass the vertex data to the buffer

    // Create an empty buffer object to store Index buffer
    cube_index_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cube_index_buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), gl.STATIC_DRAW);
    

    // Create an empty buffer object and store color data
    cube_colors_buffer = gl.createBuffer ();
    gl.bindBuffer(gl.ARRAY_BUFFER, cube_colors_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubecolors), gl.STATIC_DRAW);



    /*============== Cuboid Buffer ====================*/
    cuboid_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cuboid_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cuboid), gl.STATIC_DRAW); 

    cuboid_index_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cuboid_index_buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cuboidVertexIndices), gl.STATIC_DRAW);
    
    cuboid_colors_buffer = gl.createBuffer ();
    gl.bindBuffer(gl.ARRAY_BUFFER, cuboid_colors_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cuboidcolors), gl.STATIC_DRAW);




    /*============== Butterfly Buffer ====================*/
    butterfly_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, butterfly_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(butterfly), gl.STATIC_DRAW);

    butterfly_index_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, butterfly_index_buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(butterflyVertexIndices), gl.STATIC_DRAW);
    

    butterfly_colors_buffer = gl.createBuffer ();
    gl.bindBuffer(gl.ARRAY_BUFFER, butterfly_colors_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(butterflycolors), gl.STATIC_DRAW);


    /*============== Triangle_prisim Buffer ====================*/
    triangle_prism = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangle_prism);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(prism), gl.STATIC_DRAW);

    triangle_prism_index = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangle_prism_index);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(prism_index), gl.STATIC_DRAW);
    

    triangle_prism_color = gl.createBuffer ();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangle_prism_color);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(prism_color), gl.STATIC_DRAW);


    /*============== Triangle_prisim Buffer ====================*/
    tetrahedron_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, tetrahedron_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tetrahedron), gl.STATIC_DRAW);

    tetrahedron_index = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, tetrahedron_index);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tetrahedronIndex), gl.STATIC_DRAW);
    

    tetrahedron_color = gl.createBuffer ();
    gl.bindBuffer(gl.ARRAY_BUFFER, tetrahedron_color);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tetrahedronColor), gl.STATIC_DRAW);


    /*============== Normal Buffer ====================*/
    normalsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeNormal),  gl.STATIC_DRAW);

    normalsBuffer_cuboid = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalsBuffer_cuboid);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cuboidNormal),  gl.STATIC_DRAW);

    butterflyBuffer_normal = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, butterflyBuffer_normal);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(butterfly_normal),  gl.STATIC_DRAW);

    
    prismbuffer_normal = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, prismbuffer_normal);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(prism_normal),  gl.STATIC_DRAW);

    
    Tetarahedron_normal = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, Tetarahedron_normal);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tetra_normals),  gl.STATIC_DRAW);

    stageNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, stageNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(stageNormal),  gl.STATIC_DRAW);

}

var forward_back = -40;
var forward_flag = false;
var backward_flag = false;

var left_right = 0;
var left_flag = false;
var right_flag = false;
var mouse_left_right = 0.0;
var mouse_up_down = 0.0;

var up_down = 0;
var up_flag = false;
var down_flag = false;

var LeftLight = false;
var rightLight = false;
var topMovingLight = false;
var headSpotLight = false;
var mouseSpotLight = false;



var L_Switch = 1;
var R_Switch = 1;
var top_switch =1;
var headSpotLight_switch = 1;
var mouseSpotLight_switch = 1;



var lightAmbient = 30;
var topLightX = 0;


function CreateMat4From(x,y,z){
    var result = mat4.create();
    result[3] = x;
    result[7] = y;
    result[11] = z;
    //console.log(result);
    return result;

}

function setUniformAttribute(translate, objectMaterial, deg_angle=0, rot_axis=[0,1,0] ,scale=[1,1,1]){

    /* ==========Set Matrix======================================*/
    var Pmatrix = gl.getUniformLocation(shaderProgram, 'Pmatrix'); //Orthographic or perspective
    var Vmatrix = gl.getUniformLocation(shaderProgram, 'Vmatrix'); //Camera or View
    var Mmatrix = gl.getUniformLocation(shaderProgram, 'Mmatrix'); //transformation
    var normalMatrix = gl.getUniformLocation(shaderProgram, 'normalMatrix');

    var eyePosition =  gl.getUniformLocation(shaderProgram, 'eyePosition');
    var u_movingPointLightPosition = gl.getUniformLocation(shaderProgram, 'u_movingPointLightPosition');

    var u_headSpotLightPosition = gl.getUniformLocation(shaderProgram, 'u_headSpotLightPosition');
    var u_headSpotLightDirection = gl.getUniformLocation(shaderProgram, 'u_headSpotLightDirection');
    var u_headSpotLightLimit = gl.getUniformLocation(shaderProgram, 'u_headSpotLightLimit');

    var u_mouseSpotLightPosition = gl.getUniformLocation(shaderProgram, 'u_mouseSpotLightPosition');
    var u_mouseSpotLightDirection = gl.getUniformLocation(shaderProgram, 'u_mouseSpotLightDirection');
    var u_mouseSpotLightLimit = gl.getUniformLocation(shaderProgram, 'u_mouseSpotLightLimit');

    var mode_ambient = gl.getUniformLocation(shaderProgram, 'mode_ambient');
    var mode_left = gl.getUniformLocation(shaderProgram, 'mode_left');
    var mode_right = gl.getUniformLocation(shaderProgram, 'mode_right');
    var mode_topMovingLight = gl.getUniformLocation(shaderProgram, 'mode_topMovingLight');
    var mode_headSpotLight = gl.getUniformLocation(shaderProgram, 'mode_headSpotLight');
    var mode_mouseSpotLight = gl.getUniformLocation(shaderProgram, 'mode_mouseSpotLight');
    var mode_shadow = gl.getUniformLocation(shaderProgram, 'mode_shadow');
    var mode_shadow2 = gl.getUniformLocation(shaderProgram, 'mode_shadow2');

    
    var Ka = gl.getUniformLocation(shaderProgram, 'Ka');
    var Kd = gl.getUniformLocation(shaderProgram, 'Kd');
    var Ks = gl.getUniformLocation(shaderProgram, 'Ks');
    var u_shininess = gl.getUniformLocation(shaderProgram, 'u_shininess');


    var identityMatrix = new Float32Array(16);
    var proj_matrix = new Float32Array(16);
    var view_matrix = new Float32Array(16);
    var mov_matrix = new Float32Array(16);
    

    var trans_matrix = new Float32Array(16);
    var rotate_matrix = new Float32Array(16);
    var scale_matrix = new Float32Array(16);
    var result_matrix = new Float32Array(16);

    mat4.identity(identityMatrix);
    if(pers_view){
        mat4.perspective(proj_matrix, glMatrix.toRadian(45), canvas.width/canvas.height, 0.1, 100); //Set the perspective view
    }else{
        mat4.ortho(proj_matrix, -canvas.width/85, canvas.width/85, -canvas.height/100, canvas.height/100, 0.1, 100 ); //Set orthogonal view
    }
    
    
    mat4.lookAt(view_matrix, [0,0,forward_back], [left_right,up_down,0], [0,1,0]); //Set the camera matrix
    


    mat4.translate(trans_matrix, identityMatrix, translate);      //Set the translation
    mat4.rotate(rotate_matrix, identityMatrix, deg_angle, rot_axis); //Set the rotation
    mat4.scale(scale_matrix, identityMatrix, scale); //Set the scale

    mat4.multiply(result_matrix, trans_matrix, rotate_matrix); //translate*rotate
    mat4.multiply(mov_matrix, result_matrix, scale_matrix);
    
    var modelView_matrix = new Float32Array(16);
    var normal_matrix = new Float32Array(9);
    mat4.multiply(modelView_matrix, view_matrix, mov_matrix);
    mat3.normalFromMat4(normal_matrix, modelView_matrix);
    
    

    

    gl.uniformMatrix4fv(Pmatrix, false, proj_matrix);
    gl.uniformMatrix4fv(Vmatrix, false, view_matrix);
    gl.uniformMatrix4fv(Mmatrix, false, mov_matrix);
    gl.uniformMatrix3fv(normalMatrix, false, normal_matrix);

    gl.uniform3fv(eyePosition, [0,0,forward_back]);
    
    if (LeftLight){
        L_Switch = 1.0;  
    }
    else if(!LeftLight){    
        L_Switch = 0.0;
    }

    if(rightLight){
        R_Switch =1.0;
    }else{
        R_Switch = 0.0;
    }

    if(topMovingLight){
        top_switch = 1.0;
    }
    else{
        top_switch = 0.0;
    }
         
    if(headSpotLight){
        headSpotLight_switch = 1.0;
    }
    else{
        headSpotLight_switch = 0.0;
    }

    if(mouseSpotLight){
        mouseSpotLight_switch = 1.0;
    }
    else{
        mouseSpotLight_switch = 0.0;
    }

    //Specify Material color
    gl.uniform3fv(Ka, objectMaterial.materialAmbient);
    gl.uniform3fv(Kd, objectMaterial.materialDiffuse);
    gl.uniform3fv(Ks, objectMaterial.materialSpecular);
    gl.uniform1f(u_shininess, objectMaterial.materialShininess);


    //Light switch for Fixed Left-point light, Right-point light and their total ambience
    gl.uniform1f(mode_ambient, lightAmbient/33.33);
    gl.uniform1f(mode_left, L_Switch);
    gl.uniform1f(mode_right, R_Switch);
    gl.uniform1f(mode_topMovingLight, top_switch);
    gl.uniform1f(mode_headSpotLight, headSpotLight_switch);
    gl.uniform1f(mode_mouseSpotLight, mouseSpotLight_switch);
    gl.uniform1f(mode_shadow, 0.0);
    gl.uniform1f(mode_shadow2, 0.0);
    
    
    

    //Specify position of moving point light 
    gl.uniform3fv(u_movingPointLightPosition, [topLightX, 20, 0]);

    //Specify position, direction and angle of Head point light
    gl.uniform3fv(u_headSpotLightPosition, [left_right,0,5]);
    gl.uniform3fv(u_headSpotLightDirection, [0,0,-1]);
    var radian = Math.PI * 10 / 180.0;
    gl.uniform1f(u_headSpotLightLimit, Math.cos(radian));

    //Specify position, direction and angle of mouse spot light
    gl.uniform3fv(u_mouseSpotLightPosition, [mouse_left_right,mouse_up_down,5]);
    gl.uniform3fv(u_mouseSpotLightDirection, [0,0,-1]);
    var mouse_radian = Math.PI * 15 / 180.0;
    gl.uniform1f(u_mouseSpotLightLimit, Math.cos(mouse_radian));

}

function setShadowUniformAttribute(translate,deg_angle=0, rot_axis=[0,1,0] ,scale=[1,1,1]){
    var Pmatrix = gl.getUniformLocation(shaderProgram, 'Pmatrix'); //Orthographic or perspective
    var Vmatrix = gl.getUniformLocation(shaderProgram, 'Vmatrix'); //Camera or View
    var Mmatrix = gl.getUniformLocation(shaderProgram, 'Mmatrix'); //transformation
    var shadowMVmatrix = gl.getUniformLocation(shaderProgram, 'shadowMVatrix'); 
    var mode_shadow = gl.getUniformLocation(shaderProgram, 'mode_shadow');
    var mode_shadow2 = gl.getUniformLocation(shaderProgram, 'mode_shadow2');

    


    var identityMatrix = new Float32Array(16);
    var proj_matrix = new Float32Array(16);
    var view_matrix = new Float32Array(16);
    var model_matrix = new Float32Array(16);

    var trans_matrix = new Float32Array(16);
    var rotate_matrix = new Float32Array(16);
    var scale_matrix = new Float32Array(16);
    var result_matrix = new Float32Array(16);

    //Set projection matrix
    mat4.identity(identityMatrix);
    if(pers_view){
        mat4.perspective(proj_matrix, glMatrix.toRadian(45), canvas.width/canvas.height, 0.1, 100); //Set the perspective view
    }else{
        mat4.ortho(proj_matrix, -canvas.width/85, canvas.width/85, -canvas.height/100, canvas.height/100, 0.1, 100 ); //Set orthogonal view
    }
    
    //Set View Matrix
    mat4.lookAt(view_matrix, [0,0,forward_back], [left_right,up_down,0], [0,1,0]); //Set the camera matrix

    //Set Model Matrix
    mat4.translate(trans_matrix, identityMatrix, translate);      //Set the translation
    mat4.rotate(rotate_matrix, identityMatrix, deg_angle, rot_axis); //Set the rotation
    mat4.scale(scale_matrix, identityMatrix, scale); //Set the scale

    mat4.multiply(result_matrix, trans_matrix, rotate_matrix); //translate*rotate
    mat4.multiply(model_matrix, result_matrix, scale_matrix);


    //Calculate Model View Matrix
    var modelView_matrix = new Float32Array(16);
    mat4.multiply(modelView_matrix, view_matrix, model_matrix);

    //Set shadow matrix
    var shadowPerspectiveMatrix = new Float32Array([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, (1/-20), 0, 0,
    ]);

    var shadowModelViewMatrix = new Float32Array(16);
    var result = CreateMat4From(topLightX,20,0);
    mat4.multiply(shadowModelViewMatrix, modelView_matrix, result);
    mat4.multiply(shadowModelViewMatrix, shadowModelViewMatrix, shadowPerspectiveMatrix);
    var result = CreateMat4From(-topLightX,-20,0);
    mat4.multiply(shadowModelViewMatrix, shadowModelViewMatrix,result);

    gl.uniformMatrix4fv(Pmatrix, false, proj_matrix);
    gl.uniformMatrix4fv(Vmatrix, false, view_matrix);
    gl.uniformMatrix4fv(Mmatrix, false, model_matrix);
    gl.uniformMatrix4fv(shadowMVmatrix, false, shadowModelViewMatrix);
    gl.uniform1f(mode_shadow, 1.0);
    gl.uniform1f(mode_shadow2, 1.0);
}




/* This function draw a shape by accepting three arguments .
args: primitives - primitive shape type 
        vertices   - the vertices that makes the points -               matrix
        translate  - the coordinate where the shape will be translated- matrix
        colors     - the color -                                        matrix
        angle      - the angle of rotation                              matrix
*/

var angle = 0;
var cube_angle = 0;
var butterfly_angle = 0;

var cuboid_translate = [];
var tetra_scale = [];
var prism_scale = [];

var cube_flag = true;
var butterfly_flag = true;
var cuboid_flag = true;
var prism_flag = true;
var tetra_flag = true;

function drawA(primitive, all_translate){

    /*======= Set View port and clear buffer =======*/
    gl.viewport(0,0,canvas.width,canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT| gl.DEPTH_BUFFER_BIT);

    /*=========Point to Stage Buffers===========*/
     gl.bindBuffer(gl.ARRAY_BUFFER, stage_buffer);
     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, stage_index);
     var coord = gl.getAttribLocation(shaderProgram, "coordinates");
     gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
     gl.enableVertexAttribArray(coord);

    gl.bindBuffer(gl.ARRAY_BUFFER, stageNormalBuffer);
    var normal = gl.getAttribLocation(shaderProgram, "normal");
    gl.vertexAttribPointer(normal, 3, gl.FLOAT, false, 0,0);
    gl.enableVertexAttribArray(normal);
 
    //  gl.bindBuffer(gl.ARRAY_BUFFER, stage_color);
    //  var color = gl.getAttribLocation(shaderProgram, "color")
    //  gl.vertexAttribPointer(color, 3, gl.FLOAT, false,0,0) ;
    //  gl.enableVertexAttribArray(color);

    /*=========Drawing Stage shape===========*/
    setUniformAttribute(all_translate.translate5, stageMaterial, 0, [0,1,0], stage_scale);
    gl.drawElements(primitive, stage_indics.length, gl.UNSIGNED_SHORT,0);





    /*======= Point to Cube Buffers =======*/
    gl.bindBuffer(gl.ARRAY_BUFFER, cube_buffer);// Bind vertex buffer object
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cube_index_buffer);// Bind index buffer object
    var coord = gl.getAttribLocation(shaderProgram, "coordinates");// Get the attribute location for position
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0); // Point an attribute to the currently bound VBO
    gl.enableVertexAttribArray(coord);// enable the attribute

    
    // gl.bindBuffer(gl.ARRAY_BUFFER, cube_colors_buffer);// bind the color buffer
    // var color = gl.getAttribLocation(shaderProgram, "color");// get the attribute location for color
    // gl.vertexAttribPointer(color, 3, gl.FLOAT, false,0,0) ;// point attribute to the volor buffer object
    // gl.enableVertexAttribArray(color);

    gl.bindBuffer(gl.ARRAY_BUFFER, normalsBuffer);
    var normal = gl.getAttribLocation(shaderProgram, "normal");
    gl.vertexAttribPointer(normal, 3, gl.FLOAT, false, 0,0);
    gl.enableVertexAttribArray(normal);

    /*=========Drawing Cube shape===========*/
    if(cube_flag){ cube_angle = angle; }
    setUniformAttribute(all_translate.translate0, cubeMaterial, cube_angle, axis_rotations.cube_axis);
    gl.drawElements(primitive, cubeVertexIndices.length, gl.UNSIGNED_SHORT,0);
    //draw cube shadow
    setShadowUniformAttribute(all_translate.translate0, cubeMaterial, cube_angle, axis_rotations.cube_axis);
    gl.drawElements(primitive, cubeVertexIndices.length, gl.UNSIGNED_SHORT,0);






    /*=========Point to Cuboid Buffers===========*/
    gl.bindBuffer(gl.ARRAY_BUFFER, cuboid_buffer);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cuboid_index_buffer);
    var coord = gl.getAttribLocation(shaderProgram, "coordinates");
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0); 
    gl.enableVertexAttribArray(coord);

    gl.bindBuffer(gl.ARRAY_BUFFER, normalsBuffer);
    var normal = gl.getAttribLocation(shaderProgram, "normal");
    gl.vertexAttribPointer(normal, 3, gl.FLOAT, false, 0,0);
    gl.enableVertexAttribArray(normal);

    // gl.bindBuffer(gl.ARRAY_BUFFER, cuboid_colors_buffer);
    // var color = gl.getAttribLocation(shaderProgram, "color");
    // gl.vertexAttribPointer(color, 3, gl.FLOAT, false,0,0) ;
    // gl.enableVertexAttribArray(color);

    /*=========Drawing Cuboid shape===========*/
    if(cuboid_flag){ 
        cuboid_translate[0] = all_translate.translate1[0];
        cuboid_translate[1] = all_translate.translate1[1];
        cuboid_translate[2] = all_translate.translate1[2];
    }
    setUniformAttribute(cuboid_translate, cuboidMaterial);
    gl.drawElements(primitive, cuboidVertexIndices.length, gl.UNSIGNED_SHORT,0);




    /*=========Point to Butterfly Buffers===========*/
    gl.bindBuffer(gl.ARRAY_BUFFER, butterfly_buffer);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, butterfly_index_buffer);
    var coord = gl.getAttribLocation(shaderProgram, "coordinates");
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coord);

    gl.bindBuffer(gl.ARRAY_BUFFER, butterflyBuffer_normal);
    var normal = gl.getAttribLocation(shaderProgram, "normal");
    gl.vertexAttribPointer(normal, 3, gl.FLOAT, false, 0,0);
    gl.enableVertexAttribArray(normal);

    // gl.bindBuffer(gl.ARRAY_BUFFER, butterfly_colors_buffer);
    // var color = gl.getAttribLocation(shaderProgram, "color")
    // gl.vertexAttribPointer(color, 3, gl.FLOAT, false,0,0) ;
    // gl.enableVertexAttribArray(color);

    /*=========Drawing Butterfly shape===========*/
    if(butterfly_flag){ butterfly_angle = angle; }
    setUniformAttribute(all_translate.translate2, ruby, butterfly_angle);
    gl.drawElements(primitive, butterflyVertexIndices.length, gl.UNSIGNED_SHORT,0);




     /*=========Point to Prism Buffers===========*/
     gl.bindBuffer(gl.ARRAY_BUFFER, triangle_prism);
     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangle_prism_index);
     var coord = gl.getAttribLocation(shaderProgram, "coordinates");
     gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
     gl.enableVertexAttribArray(coord);

    gl.bindBuffer(gl.ARRAY_BUFFER, prismbuffer_normal);
    var normal = gl.getAttribLocation(shaderProgram, "normal");
    gl.vertexAttribPointer(normal, 3, gl.FLOAT, false, 0,0);
    gl.enableVertexAttribArray(normal);
 
    //  gl.bindBuffer(gl.ARRAY_BUFFER, triangle_prism_color);
    //  var color = gl.getAttribLocation(shaderProgram, "color")
    //  gl.vertexAttribPointer(color, 3, gl.FLOAT, false,0,0) ;
    //  gl.enableVertexAttribArray(color);
 
     /*=========Drawing Prism shape===========*/
     if(prism_flag){
         prism_scale[0] = non_uniform_prism_scale[0];
         prism_scale[1] = non_uniform_prism_scale[1];
         prism_scale[2] = non_uniform_prism_scale[2];

     }
     setUniformAttribute(all_translate.translate3, triangle_prism_Material, 0, [0,1,0], prism_scale);
     gl.drawElements(primitive, prism_index.length, gl.UNSIGNED_SHORT,0);




     /*=========Point to Tetrahedron Buffers===========*/
     gl.bindBuffer(gl.ARRAY_BUFFER, tetrahedron_buffer);
     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, tetrahedron_index);
     var coord = gl.getAttribLocation(shaderProgram, "coordinates");
     gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
     gl.enableVertexAttribArray(coord);

    gl.bindBuffer(gl.ARRAY_BUFFER, Tetarahedron_normal);
    var normal = gl.getAttribLocation(shaderProgram, "normal");
    gl.vertexAttribPointer(normal, 3, gl.FLOAT, false, 0,0);
    gl.enableVertexAttribArray(normal);
 
    //  gl.bindBuffer(gl.ARRAY_BUFFER, tetrahedron_color);
    //  var color = gl.getAttribLocation(shaderProgram, "color")
    //  gl.vertexAttribPointer(color, 3, gl.FLOAT, false,0,0) ;
    //  gl.enableVertexAttribArray(color);
 
     /*=========Drawing Tetrahedron shape===========*/
     if(tetra_flag){ 
         tetra_scale[0] = tetrahedron_scale[0];
         tetra_scale[1] = tetrahedron_scale[1];
         tetra_scale[2] = tetrahedron_scale[2];
      }
     setUniformAttribute(all_translate.translate4, pearl, 0, [0,1,0], tetra_scale);
     gl.drawElements(primitive, tetrahedronIndex.length, gl.UNSIGNED_SHORT,0);

    animateShape();
    
}

var scale_step = 1;

var non_scale_stepX = 1;
var non_scale_stepY = 1;
var non_scale_stepZ = 1;

var cuboid_trans_step = 1;
var top_light_step = 1;


function AmbientLight(){
    lightAmbient = document.getElementById("myRange").value;
    console.log(lightAmbient)
}


function animateShape(){
    //Camera Movement
    if(forward_flag){
        forward_back += 0.3;
        forward_flag = false;
    }
    if (backward_flag){
        forward_back-=0.3;
        backward_flag= false
    }

    if (left_flag){
        left_right +=0.3;
        left_flag = false;
    }
    if(right_flag){
        left_right -=0.3;
        right_flag = false;
    }
    
    if(up_flag){
        up_down+=.3;
        up_flag = false
    }
    if(down_flag){
        up_down-=.3;
        down_flag = false
    }

    //Cube: Rotation on X and Z; Butterfly: Rotation on Y
    angle = performance.now() / 3000 / 4 * 2 * Math.PI;

    //Cuboid: Back and forth
    if(all_translations.translate1[1] >= 8){
        cuboid_trans_step = cuboid_trans_step * -1
    }

    if(all_translations.translate1[1] <= -3){
        cuboid_trans_step = cuboid_trans_step * -1
    }
    all_translations.translate1[1] += 0.2 * cuboid_trans_step;

    //Top-Light back and forth
    if(topLightX >= 25){
        top_light_step = top_light_step * -1;  
    }

    if(topLightX <= -25){
        top_light_step = top_light_step * -1;
    }

    topLightX += 0.2 * top_light_step;



    //Tetrahedron: Uniform scaling
    if(tetrahedron_scale[0] >= 4.3){
        scale_step = scale_step * -1;
    }

    if(tetrahedron_scale[0] <= 0.5){
        scale_step = scale_step * -1;
    }

    tetrahedron_scale[0] += 0.03 * scale_step;
    tetrahedron_scale[1] += 0.03 * scale_step;
    tetrahedron_scale[2] += 0.03 * scale_step;

    //Prism : Non-uniform scaling
    //<--------------- For X-Axis -------------------->
    if(non_uniform_prism_scale[0] >= 1.5){
        non_scale_stepX = non_scale_stepX * -1;
    }

    if(non_uniform_prism_scale[0] <= 0.5){
        non_scale_stepX = non_scale_stepX * -1;
    }
    non_uniform_prism_scale[0] += (1/100)* non_scale_stepX;

    //<--------------- For Y-Axis -------------------->
    if(non_uniform_prism_scale[1] >= 2.5){
        non_scale_stepY = non_scale_stepY * -1;
    }

    if(non_uniform_prism_scale[1] <= 0.5){
        non_scale_stepY = non_scale_stepY * -1;
    }

    non_uniform_prism_scale[1] += (3/100)* non_scale_stepY;
    

    //<--------------- For Z-Axis -------------------->
    if(non_uniform_prism_scale[2] >= 2.5){
        non_scale_stepZ = non_scale_stepZ * -1;
    }

    if(non_uniform_prism_scale[2] <= -1.5){
        non_scale_stepZ = non_scale_stepZ * -1;
    }

    non_uniform_prism_scale[2] += (2/100)* non_scale_stepZ;
    
}


function show() {
    requestAnimationFrame(show);
    drawA(gl.TRIANGLES, all_translations);
}


 /*============== Draw a 3D object ====================*/
 setup();
 initBuffers();
 show();

