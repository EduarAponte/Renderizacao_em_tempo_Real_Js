const canvas = document.getElementById("render-canvas");/*Obtenha o elemento canvas pelo ID para referência posterior.*/
    const engine = new BABYLON.Engine(canvas);/*Inicializa o motor Babylon.js, associando o elemento canvas.*/
    const scene = new BABYLON.Scene(engine);/*Cria uma cena 3D, associada ao motor Babylon.js.*/
    scene.clearColor = new BABYLON.Color3(0, 0, 0.1);/*Defina o cor de fundo da cena como um Azul Oscuro.*/
    const camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 0, -10), scene);/*Cria uma câmera livre na posição (0, 0, -10) e associa à cena.*/
    const light = new BABYLON.PointLight("light", new BABYLON.Vector3(10, 10, 0), scene);/*Cria uma luz pontual na posição (10, 10, 0) e associa à cena.*/

    /*==================CUBO==============================*/
    const box = BABYLON.Mesh.CreateBox("box", 2, scene);/*Crie um cubo chamado "box" com tamanho 2 e adicione à cena.*/
    box.rotation.x = -0.2;/*Rotaciona o cubo em torno do eixo x.*/
    box.rotation.y = -0.4;/*Rotaciona o cubo em torno do eixo y.*/

    const boxMaterial = new BABYLON.StandardMaterial("material", scene);/*Crie um material para o cubo.*/
    boxMaterial.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86);/*Define a cor emissiva do material do cubo.*/
    box.material = boxMaterial;/*Associar o material ao cubo.*/

    /*======================ANEL==========================*/
    const torus = BABYLON.Mesh.CreateTorus("torus", 2, 0.5, 15, scene);/*Crie um anel chamado "torus" com tamanho 2 e adicione à cena.*/
    torus.position.x = -5;/*Rotaciona o anel em torno do eixo x.*/
    torus.rotation.x = 1.5;/*Rotaciona o anel em torno do eixo y.*/

    const torusMaterial = new BABYLON.StandardMaterial("material", scene);/*Crie um material para o anel.*/
    torusMaterial.emissiveColor = new BABYLON.Color3(0.4, 0.4, 0.4);/*Define a cor emissiva do material do anel.*/
    torus.material = torusMaterial;/*Associar o material ao anel.*/

/*============CILINNDRO====================================*/

    const cylinder = BABYLON.Mesh.CreateCylinder("cylinder", 2, 2, 2, 12, 1, scene);/*Crie um cilindro chamado "cylinder" com tamanho 2 e adicione à cena.*/
    cylinder.position.x = 5;/*Rotaciona o cilindro em torno do eixo x.*/
    cylinder.rotation.x = -0.2;/*Rotaciona o cilindro em torno do eixo y.*/

    const cylinderMaterial = new BABYLON.StandardMaterial("material", scene);/*Crie um material para o cilindro.*/
    cylinderMaterial.emissiveColor = new BABYLON.Color3(1, 0.58, 0);/*Define a cor emissiva do material do cilindro.*/
    cylinder.material = cylinderMaterial;/*Associar o material ao cilindro.*/
/*
    window.addEventListener('resize', function () {
            engine.resize();
        });*/

    let t = 0;/* Inicializa uma variável tcom o valor 0. Sera o tempo*/

    /*Define uma função chamada renderLoopque será chamada a cada quadro da animação.*/
    const renderLoop = function () {
        scene.render();/*Renderiza a cena.*/
        t -= 0.01; /*Atualiza uma variável tdecrementando seu valor.*/
        box.rotation.y = t * 2;/*Rotaciona o cubo em torno do eixo e com base no valor de t.*/
        torus.scaling.z = Math.abs(Math.sin(t * 2)) + 0.5;/*Altera a escala do torus de acordo com a função seno.*/
        cylinder.position.y = Math.sin(t * 3);/*Altera a posição do cilindro ao longo do eixo e de acordo com a função seno.*/
    };
    engine.runRenderLoop(renderLoop);/*Inicia o loop de renderização, que chama a função renderLooprepetidamente para criar a animação.*/
