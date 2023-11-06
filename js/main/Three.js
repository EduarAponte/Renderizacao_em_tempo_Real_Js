document.addEventListener('DOMContentLoaded', function () {
    if (typeof Detector !== 'undefined' && !Detector.webgl) {
        // Lidar com a falta de suporte a WebGL de forma adequada
        // Exibir mensagem de erro ou fornecer uma experiência alternativa
        return;
    }
    // Função de inicialização do ambiente gráfico
    function init() {
        // Obtém as dimensões da janela do navegador
        const WIDTH = window.innerWidth;
        const HEIGHT = window.innerHeight;

        // Cria um renderizador WebGL com suporte a antialiasing (suavização de bordas)
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(WIDTH, HEIGHT);// Define o tamanho do renderizador para as dimensões da janela
        renderer.setClearColor(0x000018, 1); // Define a cor de fundo do renderizador
        // Adiciona o elemento do renderizador ao contêiner HTML com o ID 'canvas-container'
        document.getElementById('canvas-container').appendChild(renderer.domElement);

        // Cria uma cena tridimensional para conter os objetos
        const scene = new THREE.Scene();
        // Cria uma câmera de perspectiva para visualização tridimensional
        const camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 0.1, 10000);
        camera.position.z = 50;// Define a posição inicial da câmera ao longo do eixo z
        scene.add(camera);// Adiciona a câmera à cena

        // Função para criar um cubo e adicioná-lo à cena
        const createCube = () => {
            const boxGeometry = new THREE.BoxGeometry(10, 10, 10);// Cria uma geometria de cubo com dimensões 10x10x10
            // Cria um material básico para o cubo com uma cor específica (azul neste caso)
            const basicMaterial = new THREE.MeshBasicMaterial({ color: 0x0095DD });
            // Cria uma instância de Mesh (malha) usando a geometria e o material criados
            const cube = new THREE.Mesh(boxGeometry, basicMaterial);
            cube.position.x = -25;// Define a posição inicial do cubo ao longo do eixo x
            cube.rotation.set(0.4, 0.2, 0);// Define a rotação inicial do cubo nos eixos x, y, z
            scene.add(cube);// Adiciona o cubo à cena tridimensional
            return cube;// Retorna o cubo recém-criado
        };

        // Função para criar um torus (anel) e adicioná-lo à cena
        const createTorus = () => {
            // Cria uma geometria de torus com parâmetros: raio, raio do tubo, segmentos radiais, segmentos tubulares
            const torusGeometry = new THREE.TorusGeometry(7, 1, 6, 12);
            // Cria um material Phong para o torus com uma cor específica (laranja neste caso)
            const phongMaterial = new THREE.MeshPhongMaterial({ color: 0xffa400 });
            // Cria uma instância de Mesh (malha) usando a geometria e o material criados
            const torus = new THREE.Mesh(torusGeometry, phongMaterial);
            scene.add(torus);// Adiciona o torus à cena tridimensional
            return torus;// Retorna o torus recém-criado
        };

        // Função para criar um dodecaedro e adicioná-lo à cena
        const createDodecahedron = () => {
             // Cria uma geometria de dodecaedro com raio 7
            const strangeGeometry = new THREE.DodecahedronGeometry(7);
             // Cria um material básico para o dodecaedro com uma cor específica (verde)
            const lambertMaterial = new THREE.MeshBasicMaterial({ color: 0xC0C0C0 });
            // Cria uma instância de Mesh (malha) usando a geometria e o material criados
            const dodecahedron = new THREE.Mesh(strangeGeometry, lambertMaterial);
            // Define a posição inicial do dodecaedro ao longo do eixo x
            dodecahedron.position.x = 25;
            // Adiciona o dodecaedro à cena tridimensional
            scene.add(dodecahedron);
            return dodecahedron;// Retorna o dodecaedro recém-criado
        };

        // Chama a função createCube() para criar um cubo e atribui a instância resultante à variável 'cube'
        const cube = createCube();
        // Chama a função createTorus() para criar um torus e atribui a instância resultante à variável 'torus'
        const torus = createTorus();
        // Chama a função createDodecahedron() para criar um dodecaedro e atribui a instância resultante à variável 'dodecahedron'
        const dodecahedron = createDodecahedron();
        
        // Adiciona uma luz direcional para iluminar a cena
        // Cria uma luz direcional com cor branca (0xffffff) e intensidade 6
        const directionalLight = new THREE.DirectionalLight(0xffffff, 6);
        // Define a posição da luz direcional nos eixos x, y, z e normaliza o vetor de posição
        directionalLight.position.set(1, 1, 1).normalize();
        // Adiciona a luz direcional à cena tridimensional
        scene.add(directionalLight);

        // Função de animação responsável por atualizar e renderizar os objetos na cena
        const animate = () => {
             // Obtém o tempo atual em segundos e multiplica por 0.001 para suavizar a animação
            const t = Date.now() * 0.001; 
            // Rotaciona o cubo ao redor do eixo y
            cube.rotation.y += 0.01;
            // Modifica a escala do torus com base em uma função seno para criar uma animação de escala
            torus.scale.y = Math.abs(Math.sin(t));
            // Move o dodecaedro ao longo do eixo y com base em uma função seno para criar uma animação de translação vertical
            dodecahedron.position.y = -7 * Math.sin(t * 2);
            // Renderiza a cena com os objetos atualizados usando o renderizador
            renderer.render(scene, camera);
            // Solicita ao navegador que chame a função animate na próxima atualização de quadro
            requestAnimationFrame(animate);
        };
        // Chama a função animate para iniciar a animação
        animate();
    }
    // Inicia o ambiente gráfico chamando a função init, que por sua vez inicia a função de animação
    init();
});
