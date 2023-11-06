function startAnimation(card) {
    var image = card.querySelector('img');
    image.src = image.src; // Reinicia a animação
}

function stopAnimation(card) {
    var image = card.querySelector('img');
    image.src = image.src; // Para a animação
}

window.addEventListener('resize', function () {
    engine.resize();
});

