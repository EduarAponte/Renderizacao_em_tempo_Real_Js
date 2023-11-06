const canvas = document.getElementById("render-canvas");// Obtém a referência para o elemento canvas
        const app = new pc.Application(canvas);// Inicializa uma instância da aplicação PlayCanvas
        app.start();// Inicia a aplicação
        app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);// Configura o modo de preenchimento do canvas para preencher a janela
        app.setCanvasResolution(pc.RESOLUTION_AUTO);// Configura a resolução do canvas para automática
    
        const ROTATION_SPEED = 10;// Define a velocidade de rotação das entidades
        const BOX_POSITION = new pc.Vec3(-2, 0, 0);// Define a posição inicial da cubo
        const CONE_POSITION = new pc.Vec3(2, 0, 0);// Define a posição inicial do cone
        const BOX_ROTATION = new pc.Vec3(10, 15, 0);// Define a rotação inicial da cubo
        const CYLINDER_ROTATION = new pc.Vec3(15, 0, 0);// Define a rotação inicial do cilindro
        
        // Função para criar uma câmera
        function createCamera() {
            const camera = new pc.Entity();// Cria uma nova entidade para representar a câmera
            camera.addComponent("camera", { clearColor: new pc.Color(0, 0, 0.1) });// Adiciona um componente de câmera à entidade, configurando a cor de fundo para um cinza claro
            app.root.addChild(camera);// Adiciona a entidade da câmera à raiz da cena
            camera.setPosition(0, 0, 7);// Define a posição inicial da câmera no espaço 3D (x=0, y=0, z=7)
            return camera;// Retorna a entidade da câmera recém-criada
        }
        
        // Função para criar um cubo
        function createBox() {
            const box = new pc.Entity();// Cria uma nova entidade para representar o cubo
            box.addComponent("model", { type: "box" });// Adiciona um componente de modelo à entidade, configurando-o para ser do tipo "box"
            app.root.addChild(box);// Adiciona a entidade da caixa à raiz da cena

            // Rotaciona a caixa de acordo com os valores definidos em BOX_ROTATION (rotação inicial)
            box.rotate(BOX_ROTATION.x, BOX_ROTATION.y, BOX_ROTATION.z);
    
            // Cria um material para o cubo com uma cor específica (verde-azulado)
            const boxMaterial = createMaterial(0, 0.58, 0.86);
            // Associa o material criado à instância de malha do cubo
            box.model.model.meshInstances[0].material = boxMaterial;
            // Translada o cubo para a posição definida em BOX_POSITION (posição inicial)
            box.translate(BOX_POSITION.x, BOX_POSITION.y, BOX_POSITION.z);
    
            return box;// Retorna a entidade do cubo recém-criada
        }
    
         // Função para criar um cilindro
         function createCylinder() {
            const cylinder = new pc.Entity();// Cria uma nova entidade para representar o cilindro
            cylinder.addComponent("model", { type: "cylinder" });// Adiciona um componente de modelo à entidade, configurando-o para ser do tipo "cylinder"
            app.root.addChild(cylinder);// Adiciona a entidade do cilindro à raiz da cena
            // Rotaciona o cilindro de acordo com os valores definidos em CYLINDER_ROTATION (rotação inicial)
            cylinder.rotate(CYLINDER_ROTATION.x, CYLINDER_ROTATION.y, CYLINDER_ROTATION.z);
            
            // Cria um material para o cilindro com uma cor específica (laranja-avermelhado)
            const cylinderMaterial = createMaterial(1, 0.58, 0);
           // Associa o material criado à instância de malha do cilindro
            cylinder.model.model.meshInstances[0].material = cylinderMaterial;
    
            return cylinder;// Retorna a entidade do cilindro recém-criada
        }
    
        // Função para criar um cone
        function createCone() {
            const cone = new pc.Entity();// Cria uma nova entidade para representar o cone
            cone.addComponent("model", { type: "cone" }); // Adiciona um componente de modelo à entidade, configurando-o para ser do tipo "cone"
            app.root.addChild(cone);// Adiciona a entidade do cone à raiz da cena
            // Translada o cone para a posição definida em CONE_POSITION (posição inicial)
            cone.translate(CONE_POSITION.x, CONE_POSITION.y, CONE_POSITION.z);
    
            // Cria um material para o cone com uma cor específica (cinza claro)
            const coneMaterial = createMaterial(0.9, 0.9, 0.9);
            // Associa o material criado à instância de malha do cone
            cone.model.model.meshInstances[0].material = coneMaterial;
    
            return cone;// Retorna a entidade do cone recém-criada
        }

        // Função para criar um material com base nos valores de cor (r, g, b)
        function createMaterial(r, g, b) {
            const material = new pc.PhongMaterial();// Cria uma nova instância de material Phong
            material.diffuse.set(r, g, b);// Define a cor difusa do material com base nos parâmetros de entrada (r, g, b)
            material.update();// Atualiza o material para garantir que as alterações tenham efeito
            return material;// Retorna o material recém-criado
        }
    
        // Função para criar uma luz 
        function createLight() {
            const light = new pc.Entity();// Cria uma nova entidade para representar a luz
            light.addComponent('light');// Adiciona um componente de luz à entidade
            light.rotate(45, 0, 0);// Rotaciona a luz para uma posição específica (45 graus em torno do eixo x)
            app.root.addChild(light);// Adiciona a entidade da luz à raiz da cena
            app.scene.ambientLight = new pc.Color(0.2, 0.2, 0.2);// Configura a luz ambiente da cena com uma cor específica
            return light;// Retorna a entidade da luz recém-criada
        }

       
         // Criação de entidades (câmera, cubo, luz, cilindro, cone)
        const camera = createCamera();
        const box = createBox();
        const light = createLight();
        const cylinder = createCylinder();
        const cone = createCone();

        // Variável de controle de tempo para rotação
        let timer = 0;
    
        // Função para atualizar as entidades durante o evento de atualização da cena
        function updateEntities(deltaTime) {
            // Atualiza a rotação da cubo
            box.rotate(deltaTime * ROTATION_SPEED, deltaTime * ROTATION_SPEED * 2, deltaTime * ROTATION_SPEED / 3);
            // Atualiza a escala do cilindro com base no seno do tempo
            cylinder.setLocalScale(1, Math.abs(Math.sin(timer)), 1);
            // Atualiza a posição do cone com base no seno do dobro do tempo
            cone.setPosition(CONE_POSITION.x, Math.sin(timer * 2), CONE_POSITION.z);
        }
    
        // Adiciona um ouvinte para o evento de atualização da cena
        app.on("update", function (deltaTime) {
            // Incrementa o temporizador com o tempo decorrido desde a última atualização
            timer += deltaTime;
             // Chama a função para atualizar as entidades
            updateEntities(deltaTime);
        });
    