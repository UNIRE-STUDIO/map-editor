{
    saveToLocal();
    let map_container = document.getElementById('map_content');
    map_container.style.maxWidth = '50%';
    map_container.style.width = '50%';
    map_container.style.display = 'inline-block';

    if (!document.getElementById('game')) {

        let elem = document.createElement('iframe');
        elem.id = 'game';
        const target = document.getElementById('display');
        target.appendChild(elem);
        target.style.display = 'flex';
        elem.style.display = 'inline-block';
        elem.style.maxWidth = '50%';
        elem.style.width = '50%';
        elem.style.height = '700px';
        elem.setAttribute('src', 'https://unire-studio.github.io/copter/');
    } else {
        let elem = document.getElementById('game');

        elem.style.display = 'inline-block';
        elem.style.maxWidth = '50%';
        elem.style.width = '50%';
        elem.style.height = '700px';
        elem.setAttribute('src', 'https://unire-studio.github.io/copter/');
    }
}