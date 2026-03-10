
const moveSpeed = 5;          // Базовая скорость ходьбы
const gravityValue = -20;     // Ускорение свободного падения
const SPRINT_MULT = 2.0;      // Множитель спринта
const JUMP_VEL_START = 12;    // Начальная скорость прыжка
const JUMP_VEL_END = 3.6;     // Конечная скорость прыжка (SmoothStep-кривая)
const JUMP_TIME = 0.85;       // Длительность прыжка (сек)
const COYOTE = 0.08;          // «Койот-тайм» — можно прыгнуть после схода с платформы (сек)
const JUMP_BUF = 0.1;         // Буфер прыжка — нажатие до приземления (сек)
const AIR_STEER = 5.0;        // Скорость управления в воздухе
const MAX_HSPEED = 20;        // Ограничение горизонтальной скорости
const CAM_DIST = 5;           // Дистанция камеры от игрока
const CAM_LERP = 12;          // Скорость сглаживания камеры
const TURN_SPEED = 20;        // Скорость поворота персонажа
const COL_PLAYER = 1;         // Битовая маска: игрок
const COL_MAP = 2;            // Битовая маска: блоки карты
const colors = {
    sky: 0xADD8E6,   // Фон неба
    skin: 0xf3d607,  // Кожа персонажа (Roblox Noob)
    shirt: 0x0057a8, // Рубашка
    pants: 0xa4bd47, // Штаны
    death: 0xff0000, // Блоки смерти
    lava: 0xff4500   // Лава
};
var _modalEl = null;
function _ensureModal() {
    if (_modalEl) return;
    _modalEl = document.createElement('div');
    _modalEl.className = 'gm-overlay hidden';
    _modalEl.innerHTML =
        '<div class="gm-backdrop"></div>' +
        '<div class="gm-box">' +
            '<div class="gm-text"></div>' +
            '<div class="gm-spinner hidden"><div class="gm-spin"></div></div>' +
            '<div class="gm-btns"></div>' +
        '</div>';
    document.body.appendChild(_modalEl);
}
function _modalLabel(key, fallback) {
    return (typeof t === 'function') ? t(key) : fallback;
}
function gameAlert(message) {
    return new Promise(function(resolve) {
        _ensureModal();
        _modalEl.classList.remove('hidden');
        _modalEl.querySelector('.gm-text').textContent = message;
        _modalEl.querySelector('.gm-spinner').classList.add('hidden');
        var btns = _modalEl.querySelector('.gm-btns');
        btns.classList.remove('hidden');
        btns.innerHTML = '';
        var ok = document.createElement('button');
        ok.className = 'gm-btn gm-btn-ok';
        ok.textContent = _modalLabel('ok', 'OK');
        ok.addEventListener('click', function() {
            _modalEl.classList.add('hidden');
            resolve();
        });
        btns.appendChild(ok);
        ok.focus();
    });
}
function gameConfirm(message) {
    return new Promise(function(resolve) {
        _ensureModal();
        _modalEl.classList.remove('hidden');
        _modalEl.querySelector('.gm-text').textContent = message;
        _modalEl.querySelector('.gm-spinner').classList.add('hidden');
        var btns = _modalEl.querySelector('.gm-btns');
        btns.classList.remove('hidden');
        btns.innerHTML = '';
        var ok = document.createElement('button');
        ok.className = 'gm-btn gm-btn-ok';
        ok.textContent = _modalLabel('ok', 'OK');
        ok.addEventListener('click', function() {
            _modalEl.classList.add('hidden');
            resolve(true);
        });
        var cancel = document.createElement('button');
        cancel.className = 'gm-btn gm-btn-cancel';
        cancel.textContent = _modalLabel('cancel', 'Cancel');
        cancel.addEventListener('click', function() {
            _modalEl.classList.add('hidden');
            resolve(false);
        });
        btns.appendChild(ok);
        btns.appendChild(cancel);
        ok.focus();
    });
}
function gameLoading(message) {
    _ensureModal();
    _modalEl.classList.remove('hidden');
    _modalEl.querySelector('.gm-text').textContent = message || _modalLabel('loading', 'Loading...');
    _modalEl.querySelector('.gm-spinner').classList.remove('hidden');
    _modalEl.querySelector('.gm-btns').classList.add('hidden');
    return function() { _modalEl.classList.add('hidden'); };
}
;
const LANGS = {
    ru: {
        _name: 'Русский',
        title: 'ROBLOX OBBY',
        myMaps: 'Мои карты',
        mapEditor: 'Редактор карт',
        levelComplete: 'Уровень пройден!',
        nextLevel: 'Следующий уровень',
        toMenu: 'В меню',
        pause: 'Пауза',
        resume: 'Продолжить',
        toMainMenu: 'В главное меню',
        level: 'Уровень',
        mapDone: 'Карта пройдена!',
        noMaps: 'Пока нет карт',
        unnamed: 'Без имени',
        play: 'Играть',
        editShort: 'Редакт.',
        newMap: 'Новая карта',
        testMap: 'Тест карты',
        test: 'Тест',
        mapSaved: 'Карта "@" сохранена!',
        checkpoint: 'Чекпоинт',
        selectBlock: 'Выберите блок',
        spawnPoint: 'Точка спавна',
        position: 'Позиция',
        size: 'Размер',
        appearance: 'Внешний вид',
        color: 'Цвет',
        type: 'Тип',
        width: 'Ширина',
        height: 'Высота',
        depth: 'Глубина',
        spawnPos: 'Позиция спавна',
        properties: 'Свойства',
        explorer: 'Обозреватель',
        workspace: 'Рабочая область',
        tools: 'Инструменты',
        edit: 'Редактирование',
        file: 'Файл',
        blocks: 'Блоки',
        deathBlocks: 'Опасные блоки',
        move: 'Двигать',
        scale: 'Масштаб',
        copy: 'Копия',
        del: 'Удалить',
        undo: 'Отмена',
        save: 'Сохранить',
        exit: 'Выход',
        helpSelect: 'выбор',
        helpMove: 'двигать',
        helpScale: 'масштаб',
        helpDelete: 'удалить',
        helpDuplicate: 'копия',
        helpUndo: 'отмена',
        helpBack: 'назад',
        jump: 'ПРЫЖОК',
        run: 'БЕГ',
        playLevels: 'Играть',
        onlineMaps: 'Онлайн карты',
        back: 'Назад',
        search: 'Поиск...',
        sortNew: 'Новые',
        sortPopular: 'Популярные',
        loading: 'Загрузка...',
        noOnlineMaps: 'Карт пока нет',
        loadMore: 'Загрузить ещё',
        author: 'Автор',
        likes: 'Лайки',
        publish: 'Опубликовать',
        updatePublished: 'Обновить',
        unpublish: 'Снять',
        published: 'Карта опубликована!',
        updated: 'Карта обновлена!',
        unpublished: 'Карта снята с публикации',
        publishFail: 'Ошибка публикации',
        unpublishFail: 'Ошибка снятия с публикации',
        publishConfirm: 'Опубликовать карту "@"?',
        updateConfirm: 'Обновить карту "@" в онлайн-списке?',
        unpublishConfirm: 'Снять карту "@" с публикации?',
        onlineError: 'Ошибка загрузки карт',
        apiNotSet: 'API не настроен',
        bannedName: 'Название содержит запрещённые слова. Измените название.',
        mapBlocked: 'Эта карта заблокирована',
        ok: 'ОК',
        cancel: 'Отмена',
        delConfirm: 'Удалить эту карту?',
        publishing: 'Публикация...',
        unpublishing: 'Снятие с публикации...'
    },
    en: {
        _name: 'English',
        title: 'ROBLOX OBBY',
        myMaps: 'My Maps',
        mapEditor: 'Map Editor',
        levelComplete: 'Level Complete!',
        nextLevel: 'Next Level',
        toMenu: 'Menu',
        pause: 'Paused',
        resume: 'Resume',
        toMainMenu: 'Main Menu',
        level: 'Level',
        mapDone: 'Map Complete!',
        noMaps: 'No maps yet',
        unnamed: 'Unnamed',
        play: 'Play',
        editShort: 'Edit',
        newMap: 'New Map',
        testMap: 'Map Test',
        test: 'Test',
        mapSaved: 'Map "@" saved!',
        checkpoint: 'Checkpoint',
        selectBlock: 'Select a block',
        spawnPoint: 'Spawn Point',
        position: 'Position',
        size: 'Size',
        appearance: 'Appearance',
        color: 'Color',
        type: 'Type',
        width: 'Width',
        height: 'Height',
        depth: 'Depth',
        spawnPos: 'Spawn Position',
        properties: 'Properties',
        explorer: 'Explorer',
        workspace: 'Workspace',
        tools: 'Tools',
        edit: 'Edit',
        file: 'File',
        blocks: 'Blocks',
        deathBlocks: 'Death Blocks',
        move: 'Move',
        scale: 'Scale',
        copy: 'Copy',
        del: 'Delete',
        undo: 'Undo',
        save: 'Save',
        exit: 'Exit',
        helpSelect: 'select',
        helpMove: 'move',
        helpScale: 'scale',
        helpDelete: 'delete',
        helpDuplicate: 'duplicate',
        helpUndo: 'undo',
        helpBack: 'back',
        jump: 'JUMP',
        run: 'RUN',
        playLevels: 'Play',
        onlineMaps: 'Online Maps',
        back: 'Back',
        search: 'Search...',
        sortNew: 'New',
        sortPopular: 'Popular',
        loading: 'Loading...',
        noOnlineMaps: 'No maps yet',
        loadMore: 'Load more',
        author: 'Author',
        likes: 'Likes',
        publish: 'Publish',
        updatePublished: 'Update',
        unpublish: 'Unpublish',
        published: 'Map published!',
        updated: 'Map updated!',
        unpublished: 'Map unpublished',
        publishFail: 'Publish failed',
        unpublishFail: 'Unpublish failed',
        publishConfirm: 'Publish map "@"?',
        updateConfirm: 'Update map "@" online?',
        unpublishConfirm: 'Unpublish map "@"?',
        onlineError: 'Failed to load maps',
        apiNotSet: 'API not configured',
        bannedName: 'Name contains banned words. Please change it.',
        mapBlocked: 'This map is blocked',
        ok: 'OK',
        cancel: 'Cancel',
        delConfirm: 'Delete this map?',
        publishing: 'Publishing...',
        unpublishing: 'Unpublishing...'
    }
};
function detectLang() {
    const saved = uralprojs.getData('obby_lang');
    if (saved && LANGS[saved]) return saved;
    const sdkLang = uralprojs.uralpro.get('lang');
    if (sdkLang && LANGS[sdkLang]) return sdkLang;
    const browserLang = (navigator.language || '').slice(0, 2);
    if (LANGS[browserLang]) return browserLang;
    return 'ru';
}
let currentLang = detectLang();
function t(key) { return (LANGS[currentLang] && LANGS[currentLang][key]) || LANGS.en[key] || key; }
function setLang(lang) {
    currentLang = lang;
    uralprojs.setData('obby_lang', lang);
    uralprojs.saveDataUrgently();
    applyLang();
    if (typeof showMainMenu === 'function') showMainMenu();
}
function applyLang() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-value]').forEach(el => {
        el.value = t(el.dataset.i18nValue);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        el.placeholder = t(el.dataset.i18nPlaceholder);
    });
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });
    const helpEl = document.getElementById('ed-help');
    if (helpEl) {
        helpEl.innerHTML =
            '<span>Click</span> ' + t('helpSelect') + ' &nbsp;|&nbsp; <span>G</span> ' + t('helpMove') +
            ' &nbsp;|&nbsp; <span>S</span> ' + t('helpScale') + ' &nbsp;|&nbsp; <span>Del</span> ' + t('helpDelete') +
            ' &nbsp;|&nbsp; <span>Ctrl+D</span> ' + t('helpDuplicate') + ' &nbsp;|&nbsp; <span>Ctrl+Z</span> ' + t('helpUndo') +
            ' &nbsp;|&nbsp; <span>Esc</span> ' + t('helpBack');
    }
}
;
var ONLINE_API_URL = 'https://script.google.com/macros/s/AKfycbwQ5n5xfmFyDAjCQsJ5hvMbApKrnQKP4VMYoqJIvOZbRv3zez9c7P2m6eU_JYXmg6O_/exec';
var ONLINE_PAGE_SIZE = 20;
function sheetsSend(params) {
    return uralprojs.sheetsGoogleApi.send(ONLINE_API_URL, params)
        .then(function(result) {
            if (!result.success) throw new Error(result.error || 'Request failed');
            return result.data || {};
        });
}
function sheetsSendViaGet(params) {
    return uralprojs.sheetsGoogleApi.sendViaGet(ONLINE_API_URL, params)
        .then(function(result) {
            if (!result.success) throw new Error(result.error || 'Request failed');
            return result.data || {};
        });
}
function getPlayerId() {
    try {
        var id = uralprojs.uralpro.get('playerID') || uralprojs.uralpro.get('id') || '';
        if (!id) {
            id = uralprojs.getData('obby_player_id');
            if (!id) {
                id = 'p_' + Math.random().toString(36).slice(2, 10);
                uralprojs.setData('obby_player_id', id);
                uralprojs.saveDataUrgently();
            }
        }
        return id;
    } catch (e) {
        return 'anonymous';
    }
}
function getPlayerName() {
    try {
        return uralprojs.uralpro.get('playerName') || uralprojs.uralpro.get('name') || t('unnamed');
    } catch (e) {
        return t('unnamed');
    }
}
var onlineCurrentSort = 'new';
var onlineCurrentSearch = '';
var onlineCurrentPage = 0;
var onlineHasMore = false;
var onlineMapCache = [];
var onlineLoading = false;
function onlineFetchMaps(sort, search, page) {
    if (!ONLINE_API_URL) return Promise.resolve({ maps: [], hasMore: false });
    return sheetsSendViaGet({
        action: 'list',
        sort: sort,
        search: search,
        page: page,
        limit: ONLINE_PAGE_SIZE
    })
    .then(function(data) {
        return { maps: data.maps || [], hasMore: !!data.hasMore };
    })
    .catch(function(err) {
        console.error('onlineFetchMaps error:', err);
        return { maps: [], hasMore: false };
    });
}
function onlineGetMap(id) {
    if (!ONLINE_API_URL) return Promise.reject(new Error('API not set'));
    return sheetsSendViaGet({ action: 'get', id: id })
        .then(function(data) {
            if (data.error) throw new Error(data.error);
            if (typeof data.data === 'string') {
                try { data.data = JSON.parse(data.data); } catch (ex) {}
            }
            return data;
        });
}
function onlinePublishMap(uuid, name, mapData) {
    if (!ONLINE_API_URL) return Promise.reject(new Error('API not set'));
    return sheetsSend({
        action: 'publish',
        id: uuid,
        name: name,
        author: getPlayerName(),
        authorId: getPlayerId(),
        textData: JSON.stringify(mapData)
    })
    .then(function(data) {
        if (data.error) throw new Error(data.error);
        return data;
    });
}
function onlineUnpublishMap(onlineId) {
    if (!ONLINE_API_URL) return Promise.reject(new Error('API not set'));
    return sheetsSendViaGet({
        action: 'unpublish',
        id: onlineId,
        authorId: getPlayerId()
    })
    .then(function(data) {
        if (data.error) throw new Error(data.error);
        return data;
    });
}
function onlineLikeMap(id) {
    if (!ONLINE_API_URL) return Promise.reject(new Error('API not set'));
    return sheetsSendViaGet({
        action: 'like',
        id: id,
        playerId: getPlayerId()
    })
    .then(function(data) {
        if (data.error) throw new Error(data.error);
        return data;
    });
}
;
const scene = new THREE.Scene();
scene.background = new THREE.Color(colors.sky);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);
const dirLight = new THREE.DirectionalLight(0xffffff, 0.7);
dirLight.position.set(30, 60, 20);
dirLight.castShadow = true;
scene.add(dirLight);
const world = new CANNON.World();
world.gravity.set(0, gravityValue, 0);
world.broadphase = new CANNON.SAPBroadphase(world);
world.solver.iterations = 20;
world.solver.tolerance = 0.0001;
const physicsMaterial = new CANNON.Material("groundMaterial");
const physicsContactMaterial = new CANNON.ContactMaterial(
    physicsMaterial, physicsMaterial,
    { friction: 0.4, restitution: 0.0, contactEquationStiffness: 1e8, contactEquationRelaxation: 3 }
);
world.addContactMaterial(physicsContactMaterial);
;
const BEVEL = 0.045;
function roundedBoxGeo(w, h, d) {
    const r = Math.min(BEVEL, w / 3, h / 3, d / 3);
    const geo = new THREE.BoxGeometry(w, h, d, 10, 10, 10);
    const pos = geo.attributes.position;
    const hw = w / 2 - r, hh = h / 2 - r, hd = d / 2 - r;
    for (let i = 0; i < pos.count; i++) {
        let x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
        const ex = Math.max(0, Math.abs(x) - hw);
        const ey = Math.max(0, Math.abs(y) - hh);
        const ez = Math.max(0, Math.abs(z) - hd);
        const l = Math.sqrt(ex * ex + ey * ey + ez * ez);
        if (l > 1e-6) {
            const f = r / l;
            if (ex > 0) x = Math.sign(x) * (hw + ex * f);
            if (ey > 0) y = Math.sign(y) * (hh + ey * f);
            if (ez > 0) z = Math.sign(z) * (hd + ez * f);
        }
        pos.setXYZ(i, x, y, z);
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
    return geo;
}
function makeSegment(w, h, d, color, offsetY) {
    const geo = roundedBoxGeo(w, h, d);
    const mat = new THREE.MeshStandardMaterial({ color: color });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.y = offsetY;
    mesh.castShadow = true;
    return mesh;
}
function makeFaceTexture() {
    const c = document.createElement('canvas');
    c.width = 256; c.height = 256;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#f3d607';
    ctx.fillRect(0, 0, 256, 256);
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath(); ctx.arc(85, 105, 11, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(171, 105, 11, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(128, 148, 36, 0.2, Math.PI - 0.2);
    ctx.stroke();
    return new THREE.CanvasTexture(c);
}
function makeStudTexture() {
    const s = 64;
    const c = document.createElement('canvas');
    c.width = s; c.height = s;
    const g = c.getContext('2d');
    g.fillStyle = '#e6e6e6';
    g.fillRect(0, 0, s, s);
    const m = 16, sz = s - m * 2, r = 6;
    function rr(x, y, w, h, rad) {
        g.beginPath();
        g.moveTo(x + rad, y);
        g.lineTo(x + w - rad, y);
        g.quadraticCurveTo(x + w, y, x + w, y + rad);
        g.lineTo(x + w, y + h - rad);
        g.quadraticCurveTo(x + w, y + h, x + w - rad, y + h);
        g.lineTo(x + rad, y + h);
        g.quadraticCurveTo(x, y + h, x, y + h - rad);
        g.lineTo(x, y + rad);
        g.quadraticCurveTo(x, y, x + rad, y);
        g.closePath();
        g.fill();
    }
    g.fillStyle = '#d8d8d8';
    rr(m + 2, m + 2, sz, sz, r);
    g.fillStyle = '#f0f0f0';
    rr(m, m, sz, sz, r);
    g.save();
    g.beginPath();
    g.moveTo(m + r, m);
    g.lineTo(m + sz - r, m);
    g.quadraticCurveTo(m + sz, m, m + sz, m + r);
    g.lineTo(m + sz, m + sz - r);
    g.quadraticCurveTo(m + sz, m + sz, m + sz - r, m + sz);
    g.lineTo(m + r, m + sz);
    g.quadraticCurveTo(m, m + sz, m, m + sz - r);
    g.lineTo(m, m + r);
    g.quadraticCurveTo(m, m, m + r, m);
    g.closePath();
    g.clip();
    g.fillStyle = '#f6f6f6';
    g.fillRect(m, m, sz, sz * 0.22);
    g.fillStyle = '#f3f3f3';
    g.fillRect(m, m, sz * 0.22, sz);
    g.restore();
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    return tex;
}
const studMap = makeStudTexture();
function simplexNoise(x, y) {
    const ix = Math.floor(x), iy = Math.floor(y);
    const fx = x - ix, fy = y - iy;
    function hash(a, b) {
        let h = (a * 374761393 + b * 668265263 + 1013904223) & 0x7fffffff;
        h = ((h >> 13) ^ h) * 1274126177;
        return ((h >> 16) ^ h) / 0x7fffffff;
    }
    const n00 = hash(ix, iy), n10 = hash(ix + 1, iy);
    const n01 = hash(ix, iy + 1), n11 = hash(ix + 1, iy + 1);
    const sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
    return n00 * (1 - sx) * (1 - sy) + n10 * sx * (1 - sy) +
           n01 * (1 - sx) * sy + n11 * sx * sy;
}
function fbm(x, y, oct) {
    let v = 0, a = 0.5, f = 1;
    for (let i = 0; i < oct; i++) {
        v += a * simplexNoise(x * f, y * f);
        a *= 0.5; f *= 2;
    }
    return v;
}
function makeLavaTexture() {
    const s = 128, c = document.createElement('canvas');
    c.width = s; c.height = s;
    const g = c.getContext('2d');
    const img = g.createImageData(s, s);
    for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
            const nx = x / s * 4, ny = y / s * 4;
            const n = fbm(nx, ny, 5);
            const v = Math.pow(n, 0.8);
            const r = Math.min(255, 80 + v * 250);
            const gr = Math.min(255, v * v * 300);
            const b = v > 0.7 ? (v - 0.7) * 200 : 0;
            const i = (y * s + x) * 4;
            img.data[i] = r; img.data[i + 1] = gr;
            img.data[i + 2] = b; img.data[i + 3] = 255;
        }
    }
    g.putImageData(img, 0, 0);
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    return tex;
}
function makeLavaCrackTexture() {
    const s = 128, c = document.createElement('canvas');
    c.width = s; c.height = s;
    const g = c.getContext('2d');
    const img = g.createImageData(s, s);
    for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
            const nx = x / s * 5, ny = y / s * 5;
            const n1 = fbm(nx, ny, 4);
            const n2 = fbm(nx + 3.7, ny + 1.3, 4);
            const cell = Math.abs(n1 - n2);
            const crack = Math.pow(Math.max(0, 1 - cell * 4), 3);
            const base = 15 + n1 * 30;
            const r = Math.min(255, base + crack * 255);
            const gr = Math.min(255, base * 0.3 + crack * 180);
            const b = crack * 20;
            const i = (y * s + x) * 4;
            img.data[i] = r; img.data[i + 1] = gr;
            img.data[i + 2] = b; img.data[i + 3] = 255;
        }
    }
    g.putImageData(img, 0, 0);
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    return tex;
}
const lavaMap = makeLavaTexture();
const lavaCrackMap = makeLavaCrackTexture();
const DEATH_TYPES = ['death', 'lava', 'lava_crack'];
function isDeathType(t) { return DEATH_TYPES.includes(t); }
function scaleBoxUVs(geo, w, h, d) {
    const uv = geo.attributes.uv;
    const faceScales = [
        [d, h], [d, h],   // лево / право
        [w, d], [w, d],   // верх / низ
        [w, h], [w, h],   // перед / зад
    ];
    for (let f = 0; f < 6; f++) {
        const su = faceScales[f][0], sv = faceScales[f][1];
        for (let v = 0; v < 4; v++) {
            const i = f * 4 + v;
            uv.setXY(i, uv.getX(i) * su * 3, uv.getY(i) * sv * 3);
        }
    }
    uv.needsUpdate = true;
}
function createBlockMaterial(blockType, blockColor) {
    let mat;
    if (blockType === 'lava') {
        mat = new THREE.MeshStandardMaterial({
            map: lavaMap, emissive: new THREE.Color(0xff4400),
            emissiveMap: lavaMap, emissiveIntensity: 0.8
        });
    } else if (blockType === 'lava_crack') {
        mat = new THREE.MeshStandardMaterial({
            map: lavaCrackMap, emissive: new THREE.Color(0xff6600),
            emissiveMap: lavaCrackMap, emissiveIntensity: 0.6
        });
    } else {
        mat = new THREE.MeshStandardMaterial({
            color: blockColor || '#888888',
            map: studMap, bumpMap: studMap, bumpScale: 0.06
        });
    }
    if (blockType === 'death') mat.emissive = new THREE.Color(0x331100);
    if (blockType === 'checkpoint') mat.emissive = new THREE.Color(0x003311);
    if (blockType === 'finish') { mat.emissive = new THREE.Color(0x665500); mat.emissiveIntensity = 0.5; }
    return mat;
}
;
const playerGroup = new THREE.Group();
scene.add(playerGroup);
const faceTex = makeFaceTexture();
const skinMat = new THREE.MeshStandardMaterial({ color: colors.skin });
const headMats = [
    skinMat, skinMat, skinMat, skinMat,
    new THREE.MeshStandardMaterial({ map: faceTex }),
    skinMat,
];
const head = new THREE.Mesh(roundedBoxGeo(0.5, 0.55, 0.45), headMats);
head.position.set(0, 1.33, 0);
head.castShadow = true;
const torso = new THREE.Mesh(
    roundedBoxGeo(0.85, 0.8, 0.45),
    new THREE.MeshStandardMaterial({ color: colors.shirt })
);
torso.position.set(0, 0.65, 0);
torso.castShadow = true;
const leftArm = new THREE.Group();
leftArm.position.set(-0.6, 1.05, 0);
const lUpperArm = makeSegment(0.35, 0.4, 0.35, colors.skin, -0.2);
const lElbow = new THREE.Group();
lElbow.position.set(0, -0.4, 0);
const lForearm = makeSegment(0.3, 0.4, 0.3, colors.skin, -0.2);
lElbow.add(lForearm);
leftArm.add(lUpperArm, lElbow);
const rightArm = new THREE.Group();
rightArm.position.set(0.6, 1.05, 0);
const rUpperArm = makeSegment(0.35, 0.4, 0.35, colors.skin, -0.2);
const rElbow = new THREE.Group();
rElbow.position.set(0, -0.4, 0);
const rForearm = makeSegment(0.3, 0.4, 0.3, colors.skin, -0.2);
rElbow.add(rForearm);
rightArm.add(rUpperArm, rElbow);
const leftLeg = new THREE.Group();
leftLeg.position.set(-0.2, 0.25, 0);
const lThigh = makeSegment(0.38, 0.42, 0.38, colors.pants, -0.21);
const lKnee = new THREE.Group();
lKnee.position.set(0, -0.42, 0);
const lShin = makeSegment(0.36, 0.43, 0.36, colors.pants, -0.215);
lKnee.add(lShin);
leftLeg.add(lThigh, lKnee);
const rightLeg = new THREE.Group();
rightLeg.position.set(0.2, 0.25, 0);
const rThigh = makeSegment(0.38, 0.42, 0.38, colors.pants, -0.21);
const rKnee = new THREE.Group();
rKnee.position.set(0, -0.42, 0);
const rShin = makeSegment(0.36, 0.43, 0.36, colors.pants, -0.215);
rKnee.add(rShin);
rightLeg.add(rThigh, rKnee);
playerGroup.add(head, torso, leftArm, rightArm, leftLeg, rightLeg);
const PLAYER_R = 0.35;             // Радиус сферы
const CAPSULE_HALF = 0.55;         // Половина высоты капсулы
const PLAYER_FEET_OFFSET = CAPSULE_HALF + PLAYER_R; // Смещение до «ног»
const playerBody = new CANNON.Body({ mass: 5, material: physicsMaterial });
playerBody.addShape(new CANNON.Sphere(PLAYER_R), new CANNON.Vec3(0, -CAPSULE_HALF, 0)); // Нижняя сфера
playerBody.addShape(new CANNON.Sphere(PLAYER_R), new CANNON.Vec3(0, 0, 0));             // Средняя
playerBody.addShape(new CANNON.Sphere(PLAYER_R), new CANNON.Vec3(0, CAPSULE_HALF, 0));  // Верхняя
playerBody.position.set(0, 5, 0);
playerBody.linearDamping = 0;
playerBody.fixedRotation = true;           // Не вращаем физтело
playerBody.collisionFilterGroup = COL_PLAYER;
playerBody.collisionFilterMask = COL_MAP;
world.addBody(playerBody);
;
let currentLevel = 0;
let unlockedLevel = parseInt(uralprojs.getData('obby_unlocked') || '0'); // Сохранённый прогресс
let gameActive = false;    // Идёт ли геймплей
let editorMode = false;    // Режим редактора
let mapLowestY = -50;                     // Нижняя граница карты (для определения падения)
let spawnPos = new CANNON.Vec3(0, 5, 0);  // Точка возрождения
const deathBodies = [];     // Физические тела блоков смерти
const deathBoxes = [];      // AABB блоков смерти (для быстрого пересечения)
const checkpointBoxes = []; // AABB чекпоинтов
const finishBodies = [];    // Физические тела финиша
const finishBoxes = [];     // AABB финиша
const mapMeshes = [];       // THREE.js-меши карты
const mapBodies = [];       // CANNON.js-тела карты
function clearMap() {
    mapMeshes.forEach(m => scene.remove(m));
    mapBodies.forEach(b => world.removeBody(b));
    mapMeshes.length = 0;
    mapBodies.length = 0;
    deathBodies.length = 0;
    deathBoxes.length = 0;
    checkpointBoxes.length = 0;
    finishBodies.length = 0;
    finishBoxes.length = 0;
}
function buildMap(data) {
    clearMap();
    mapLowestY = Infinity;
    data.blocks.forEach(function(b) {
        const geo = new THREE.BoxGeometry(b.w, b.h, b.d);
        scaleBoxUVs(geo, b.w, b.h, b.d);
        const mat = createBlockMaterial(b.type, b.color);
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(b.x, b.y, b.z);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        scene.add(mesh);
        mapMeshes.push(mesh);
        const shape = new CANNON.Box(new CANNON.Vec3(b.w / 2, b.h / 2, b.d / 2));
        const body = new CANNON.Body({ mass: 0, material: physicsMaterial });
        body.addShape(shape);
        body.position.set(b.x, b.y, b.z);
        body.collisionFilterGroup = COL_MAP;
        body.collisionFilterMask = COL_PLAYER;
        world.addBody(body);
        mapBodies.push(body);
        if (isDeathType(b.type)) {
            deathBodies.push(body);
            deathBoxes.push({
                minX: b.x - b.w / 2, maxX: b.x + b.w / 2,
                minY: b.y - b.h / 2, maxY: b.y + b.h / 2 + 1.5,
                minZ: b.z - b.d / 2, maxZ: b.z + b.d / 2
            });
        }
        if (b.type === 'finish') {
            finishBodies.push(body);
            finishBoxes.push({
                minX: b.x - b.w / 2, maxX: b.x + b.w / 2,
                minY: b.y - b.h / 2, maxY: b.y + b.h / 2 + 2,
                minZ: b.z - b.d / 2, maxZ: b.z + b.d / 2
            });
        }
        if (b.type === 'checkpoint') {
            checkpointBoxes.push({
                minX: b.x - b.w / 2, maxX: b.x + b.w / 2,
                minY: b.y - b.h / 2, maxY: b.y + b.h / 2 + 2,
                minZ: b.z - b.d / 2, maxZ: b.z + b.d / 2,
                spawnY: b.y + b.h / 2 + 2
            });
        }
        const blockBottom = b.y - b.h / 2;
        if (blockBottom < mapLowestY) mapLowestY = blockBottom;
    });
    spawnPos.set(data.spawn.x, data.spawn.y, data.spawn.z);
    playerBody.position.copy(spawnPos);
    playerBody.velocity.set(0, 0, 0);
}
;
const confettiCanvas = document.getElementById('confetti-canvas');
const confettiCtx = confettiCanvas.getContext('2d');
let confettiParts = [];   // Массив частиц
let confettiAnim = 0;     // ID requestAnimationFrame
function launchConfetti() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    confettiCanvas.style.display = 'block';
    confettiParts = [];
    const confettiColors = ['#f1c40f','#e74c3c','#2ecc71','#3498db','#9b59b6','#e67e22','#1abc9c','#ff6b81'];
    for (let i = 0; i < 150; i++) {
        confettiParts.push({
            x: Math.random() * confettiCanvas.width,
            y: -20 - Math.random() * 300,
            w: 4 + Math.random() * 6,
            h: 8 + Math.random() * 10,
            vx: (Math.random() - 0.5) * 6,     // Горизонтальная скорость
            vy: 2 + Math.random() * 4,          // Вертикальная скорость
            rot: Math.random() * Math.PI * 2,   // Начальный угол
            rv: (Math.random() - 0.5) * 0.2,    // Угловая скорость
            color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
            wobble: Math.random() * Math.PI * 2  // Фаза покачивания
        });
    }
    confettiAnim = requestAnimationFrame(drawConfetti);
}
function drawConfetti() {
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    let alive = false;
    for (const p of confettiParts) {
        p.x += p.vx + Math.sin(p.wobble) * 0.5;
        p.y += p.vy;
        p.vy += 0.05;     // Гравитация
        p.rot += p.rv;
        p.wobble += 0.05;
        p.vx *= 0.99;     // Затухание
        if (p.y < confettiCanvas.height + 30) alive = true;
        confettiCtx.save();
        confettiCtx.translate(p.x, p.y);
        confettiCtx.rotate(p.rot);
        confettiCtx.fillStyle = p.color;
        confettiCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        confettiCtx.restore();
    }
    if (alive) {
        confettiAnim = requestAnimationFrame(drawConfetti);
    } else {
        stopConfetti();
    }
}
function stopConfetti() {
    cancelAnimationFrame(confettiAnim);
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiCanvas.style.display = 'none';
    confettiParts = [];
}
;
const mainMenu = document.getElementById('main-menu');
const playScreen = document.getElementById('play-screen');
const onlineScreen = document.getElementById('online-screen');
const myMapsScreen = document.getElementById('my-maps-screen');
const levelGrid = document.getElementById('level-grid');
const levelComplete = document.getElementById('level-complete');
const levelHud = document.getElementById('level-hud');
const ALL_SCREENS = [mainMenu, playScreen, onlineScreen, myMapsScreen];
function hideAllScreens() {
    ALL_SCREENS.forEach(function(s) { if (s) s.classList.add('hidden'); });
    levelComplete.classList.add('hidden');
    document.getElementById('pause-menu').classList.add('hidden');
    levelHud.style.display = 'none';
    document.getElementById('menu-btn').style.display = 'none';
    document.getElementById('editor-ui').style.display = 'none';
}
function showMainMenu() {
    gameActive = false;
    editorMode = false;
    if (typeof editorOnShowMenu === 'function') editorOnShowMenu();
    document.exitPointerLock();
    stopConfetti();
    hideAllScreens();
    mainMenu.classList.remove('hidden');
    applyLang();
}
function showMenu() { showMainMenu(); }
function showPlayScreen() {
    hideAllScreens();
    playScreen.classList.remove('hidden');
    renderLevelGrid();
}
function renderLevelGrid() {
    levelGrid.innerHTML = '';
    var totalSlots = Math.max(LEVELS.length, 10);
    for (var i = 0; i < totalSlots; i++) {
        var card = document.createElement('div');
        card.className = 'level-card';
        if (i >= LEVELS.length) {
            card.classList.add('locked');
            card.innerHTML = '<div class="num">' + (i + 1) + '</div><div class="lname">???</div>';
        } else if (i > unlockedLevel) {
            card.classList.add('locked');
            card.innerHTML = '<div class="num">' + (i + 1) + '</div><div class="lname">' + LEVELS[i].name + '</div>';
        } else {
            if (i < unlockedLevel) card.classList.add('completed');
            card.innerHTML = '<div class="num">' + (i + 1) + '</div><div class="lname">' + LEVELS[i].name + '</div>';
            (function(idx) {
                card.addEventListener('click', function() { startLevel(idx); });
            })(i);
        }
        levelGrid.appendChild(card);
    }
}
var onlineSearchTimer = null;
function showOnlineScreen() {
    hideAllScreens();
    onlineScreen.classList.remove('hidden');
    onlineCurrentPage = 0;
    onlineMapCache = [];
    document.getElementById('online-list').innerHTML = '';
    document.getElementById('online-search').value = onlineCurrentSearch;
    document.getElementById('sort-new').classList.toggle('active', onlineCurrentSort === 'new');
    document.getElementById('sort-popular').classList.toggle('active', onlineCurrentSort === 'popular');
    loadOnlineMaps(false);
}
function onlineSetSort(sort) {
    onlineCurrentSort = sort;
    document.getElementById('sort-new').classList.toggle('active', sort === 'new');
    document.getElementById('sort-popular').classList.toggle('active', sort === 'popular');
    onlineCurrentPage = 0;
    onlineMapCache = [];
    document.getElementById('online-list').innerHTML = '';
    loadOnlineMaps(false);
}
function onlineSearchDebounce() {
    clearTimeout(onlineSearchTimer);
    onlineSearchTimer = setTimeout(function() {
        onlineCurrentSearch = document.getElementById('online-search').value;
        onlineCurrentPage = 0;
        onlineMapCache = [];
        document.getElementById('online-list').innerHTML = '';
        loadOnlineMaps(false);
    }, 400);
}
function onlineLoadMore() {
    loadOnlineMaps(true);
}
function loadOnlineMaps(append) {
    if (onlineLoading) return;
    onlineLoading = true;
    var loadEl = document.getElementById('online-loading');
    var emptyEl = document.getElementById('online-empty');
    var moreBtn = document.getElementById('online-load-more');
    loadEl.classList.remove('hidden');
    emptyEl.classList.add('hidden');
    moreBtn.classList.add('hidden');
    if (!ONLINE_API_URL) {
        onlineLoading = false;
        loadEl.classList.add('hidden');
        emptyEl.textContent = t('apiNotSet');
        emptyEl.classList.remove('hidden');
        return;
    }
    onlineFetchMaps(onlineCurrentSort, onlineCurrentSearch, onlineCurrentPage)
        .then(function(result) {
            onlineLoading = false;
            loadEl.classList.add('hidden');
            onlineHasMore = result.hasMore;
            if (result.hasMore) moreBtn.classList.remove('hidden');
            if (!append) {
                onlineMapCache = result.maps;
            } else {
                onlineMapCache = onlineMapCache.concat(result.maps);
            }
            onlineCurrentPage++;
            if (onlineMapCache.length === 0) {
                emptyEl.textContent = t('noOnlineMaps');
                emptyEl.classList.remove('hidden');
                return;
            }
            renderOnlineMaps(result.maps, append);
        })
        .catch(function() {
            onlineLoading = false;
            loadEl.classList.add('hidden');
            emptyEl.textContent = t('onlineError');
            emptyEl.classList.remove('hidden');
        });
}
function renderOnlineMaps(maps, append) {
    var list = document.getElementById('online-list');
    if (!append) list.innerHTML = '';
    var pid = getPlayerId();
    maps.forEach(function(m) {
        var card = document.createElement('div');
        card.className = 'online-card';
        var displayName = m.mapNum ? '#' + m.mapNum + ' — ' + escapeHtml(m.name) : escapeHtml(m.name);
        card.innerHTML =
            '<div class="online-card-name">' + displayName + '</div>' +
            '<div class="online-card-author">' + t('author') + ': ' + formatAuthor(m.author) + '</div>' +
            '<div class="online-card-footer">' +
                '<button class="online-btn-play" data-id="' + m.id + '">' + t('play') + '</button>' +
                '<button class="online-btn-like" data-id="' + m.id + '">♥</button>' +
                '<span class="online-like-count">' + (m.likes || 0) + '</span>' +
            '</div>';
        var playBtn = card.querySelector('.online-btn-play');
        playBtn.addEventListener('click', function() { playOnlineMap(m.id); });
        var likeBtn = card.querySelector('.online-btn-like');
        likeBtn.addEventListener('click', function() { likeOnlineMap(m.id, card); });
        list.appendChild(card);
    });
}
function playOnlineMap(id) {
    var hideLoading = gameLoading(t('loading'));
    onlineGetMap(id)
        .then(function(result) {
            hideLoading();
            if (!result.data) { gameAlert(t('onlineError')); return; }
            currentLevel = -1;
            checkpointCount = 0;
            document.getElementById('cp-info').textContent = '';
            var cpMob = document.getElementById('cp-mobile');
            if (cpMob) cpMob.textContent = '';
            buildMap(result.data);
            hideAllScreens();
            levelHud.style.display = 'block';
            document.getElementById('level-hud-text').textContent = result.name || '';
            document.getElementById('menu-btn').style.display = 'block';
            gameActive = true;
            if (!isMobile) document.body.requestPointerLock?.()?.catch?.(() => {});
        })
        .catch(function(err) {
            hideLoading();
            console.error('playOnlineMap error:', err);
            gameAlert(t('onlineError'));
        });
}
function likeOnlineMap(id, cardEl) {
    var countEl = cardEl.querySelector('.online-like-count');
    var likeBtn = cardEl.querySelector('.online-btn-like');
    var wasLiked = likeBtn.classList.contains('liked');
    var oldCount = parseInt(countEl.textContent) || 0;
    likeBtn.classList.toggle('liked', !wasLiked);
    countEl.textContent = wasLiked ? Math.max(0, oldCount - 1) : oldCount + 1;
    onlineLikeMap(id)
        .then(function(result) {
            if (countEl) countEl.textContent = result.likes;
            if (likeBtn) likeBtn.classList.toggle('liked', result.liked);
        })
        .catch(function(err) {
            likeBtn.classList.toggle('liked', wasLiked);
            countEl.textContent = oldCount;
            console.error('likeOnlineMap error:', err);
        });
}
function showMyMapsScreen() {
    hideAllScreens();
    myMapsScreen.classList.remove('hidden');
    renderCustomMaps();
}
function getCustomMaps() {
    try {
        var raw = uralprojs.getData('obby_custom_maps');
        if (!raw) return [];
        if (typeof raw === 'string') return JSON.parse(raw);
        if (Array.isArray(raw)) return raw;
        return [];
    } catch (e) { return []; }
}
function saveCustomMaps(maps) {
    uralprojs.setData('obby_custom_maps', JSON.stringify(maps));
    uralprojs.saveDataUrgently();
}
function playCustomMap(idx) {
    var maps = getCustomMaps();
    if (idx < 0 || idx >= maps.length) return;
    currentLevel = -1;
    checkpointCount = 0;
    document.getElementById('cp-info').textContent = '';
    var cpMob = document.getElementById('cp-mobile');
    if (cpMob) cpMob.textContent = '';
    buildMap(maps[idx]);
    hideAllScreens();
    levelHud.style.display = 'block';
    document.getElementById('level-hud-text').textContent = maps[idx].name;
    document.getElementById('menu-btn').style.display = 'block';
    gameActive = true;
    if (!isMobile) document.body.requestPointerLock?.()?.catch?.(() => {});
}
function editCustomMap(idx) {
    var maps = getCustomMaps();
    if (idx < 0 || idx >= maps.length) return;
    enterEditor(maps[idx], idx);
}
function deleteCustomMap(idx) {
    gameConfirm(t('delConfirm')).then(function(ok) {
        if (!ok) return;
        var maps = getCustomMaps();
        var map = maps[idx];
        if (map && map.published && map.uuid && ONLINE_API_URL) {
            onlineUnpublishMap(map.uuid).catch(function(err) {
                console.warn('Не удалось снять с публикации:', err.message);
            });
        }
        maps.splice(idx, 1);
        saveCustomMaps(maps);
        renderCustomMaps();
    });
}
function renderCustomMaps() {
    var grid = document.getElementById('custom-grid');
    grid.innerHTML = '';
    var maps = getCustomMaps();
    if (maps.length === 0) {
        grid.innerHTML = '<div style="color:#666;font-size:14px;">' + t('noMaps') + '</div>';
        return;
    }
    maps.forEach(function(m, i) {
        var card = document.createElement('div');
        card.className = 'custom-card';
        var nameDiv = document.createElement('div');
        nameDiv.className = 'cname';
        nameDiv.textContent = m.name || t('unnamed');
        card.appendChild(nameDiv);
        var btnPlay = document.createElement('button');
        btnPlay.className = 'btn-play';
        btnPlay.textContent = t('play');
        btnPlay.onclick = function() { playCustomMap(i); };
        card.appendChild(btnPlay);
        var btnEdit = document.createElement('button');
        btnEdit.className = 'btn-edit';
        btnEdit.textContent = t('editShort');
        btnEdit.onclick = function() { editCustomMap(i); };
        card.appendChild(btnEdit);
        var btnDel = document.createElement('button');
        btnDel.className = 'btn-del';
        btnDel.textContent = '✕';
        btnDel.onclick = function() { deleteCustomMap(i); };
        card.appendChild(btnDel);
        grid.appendChild(card);
    });
}
var gamePaused = false;
function pauseGame() {
    if (!gameActive) return;
    gamePaused = true;
    gameActive = false;
    document.exitPointerLock();
    for (var k in keys) keys[k] = false;
    wantJump = false;
    document.getElementById('pause-menu').classList.remove('hidden');
}
function resumeGame() {
    gamePaused = false;
    gameActive = true;
    document.getElementById('pause-menu').classList.add('hidden');
    if (!isMobile) document.body.requestPointerLock?.()?.catch?.(() => {});
}
window.gamePause = pauseGame;
window.gameResume = resumeGame;
window.isGameActive = function() { return gameActive; };
window.isGamePaused = function() { return gamePaused; };
function startLevel(idx) {
    currentLevel = idx;
    checkpointCount = 0;
    document.getElementById('cp-info').textContent = '';
    var cpMob = document.getElementById('cp-mobile');
    if (cpMob) cpMob.textContent = '';
    buildMap(LEVELS[idx]);
    gamePaused = false;
    hideAllScreens();
    levelHud.style.display = 'block';
    document.getElementById('level-hud-text').textContent = t('level') + ' ' + (idx + 1) + ': ' + LEVELS[idx].name;
    document.getElementById('menu-btn').style.display = 'block';
    gameActive = true;
    if (!isMobile) document.body.requestPointerLock?.()?.catch?.(() => {});
}
function completeLevel() {
    gameActive = false;
    document.exitPointerLock();
    document.getElementById('menu-btn').style.display = 'none';
    if (currentLevel >= 0) {
        if (currentLevel + 1 > unlockedLevel) {
            unlockedLevel = currentLevel + 1;
            uralprojs.setData('obby_unlocked', unlockedLevel);
            uralprojs.saveDataUrgently();
        }
        document.getElementById('complete-name').textContent = LEVELS[currentLevel].name;
        var btnNext = document.getElementById('btn-next');
        btnNext.style.display = (currentLevel + 1 < LEVELS.length) ? 'inline-block' : 'none';
    } else {
        document.getElementById('complete-name').textContent = t('mapDone');
        document.getElementById('btn-next').style.display = 'none';
    }
    launchConfetti();
    setTimeout(function() {
        levelComplete.classList.remove('hidden');
    }, 1500);
}
document.getElementById('btn-next').addEventListener('click', function() {
    if (currentLevel + 1 < LEVELS.length) startLevel(currentLevel + 1);
});
document.getElementById('btn-to-menu').addEventListener('click', showMenu);
document.getElementById('btn-resume').addEventListener('click', resumeGame);
document.getElementById('btn-quit').addEventListener('click', function() {
    gamePaused = false;
    showMenu();
});
function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}
var UNNAMED_VARIANTS = ['без имени', 'unnamed', 'anonymous'];
function formatAuthor(name) {
    if (!name) return '—';
    if (UNNAMED_VARIANTS.indexOf(name.toLowerCase().trim()) !== -1) return t('unnamed');
    return escapeHtml(name);
}
applyLang();
var urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('test') === '1' && uralprojs.getData('obby_test_map')) {
    try {
        var rawTest = uralprojs.getData('obby_test_map');
        var testData = typeof rawTest === 'string' ? JSON.parse(rawTest) : rawTest;
        buildMap(testData);
        gameActive = true;
        hideAllScreens();
        levelHud.style.display = 'block';
        document.getElementById('level-hud-text').textContent = t('testMap');
        document.getElementById('menu-btn').style.display = 'block';
    } catch(e) {
        console.error('Failed to load test map:', e);
        showMainMenu();
    }
} else {
    showMainMenu();
}
;
const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
if (isMobile) document.body.classList.add('touch-device');
let moveInputX = 0, moveInputZ = 0; // Направление движения (джойстик / клавиатура)
let inputSprint = false;             // Бег активен
let wantJump = false;                // Запрос прыжка
let yaw = 0, pitch = -0.3;          // Углы камеры (горизонт / вертикаль)
let inputActive = false;             // Есть ли активный ввод
const keys = {};
document.addEventListener('keydown', (e) => {
    if (editorMode) {
        if (typeof editorKeydown === 'function') editorKeydown(e);
        return;
    }
    if (e.code === 'Escape' || e.code === 'Tab') {
        if (gameActive) { pauseGame(); }
        else if (gamePaused) { resumeGame(); }
        e.preventDefault();
        return;
    }
    keys[e.code] = true;
    if (e.code === 'Space' && !e.repeat) wantJump = true;
});
document.addEventListener('keyup', (e) => { keys[e.code] = false; });
document.addEventListener('pointerlockchange', () => {
    if (document.pointerLockElement !== document.body) {
        for (const k in keys) keys[k] = false;
        wantJump = false;
    }
});
if (!isMobile) {
    document.body.addEventListener('click', () => { if (gameActive) document.body.requestPointerLock?.()?.catch?.(() => {}); });
}
document.addEventListener('mousemove', (e) => {
    if (document.pointerLockElement !== document.body) return;
    yaw -= e.movementX * 0.002;
    pitch += e.movementY * 0.002;
    pitch = Math.max(-1.2, Math.min(0.8, pitch));
});
let joystickId = null;
let joyBaseX = 0, joyBaseY = 0;
const JOY_RADIUS = 50;
const joyZone = document.getElementById('joystick-zone');
const joyBase = document.getElementById('joystick-base');
const joyKnob = document.getElementById('joystick-knob');
if (joyZone) {
    joyZone.addEventListener('touchstart', (e) => {
        if (joystickId !== null) return;
        const t = e.changedTouches[0];
        joystickId = t.identifier;
        joyBaseX = t.clientX;
        joyBaseY = t.clientY;
        joyBase.style.left = joyBaseX + 'px';
        joyBase.style.top = joyBaseY + 'px';
        joyBase.style.display = 'block';
        joyKnob.style.left = joyBaseX + 'px';
        joyKnob.style.top = joyBaseY + 'px';
        joyKnob.style.display = 'block';
        e.preventDefault();
    }, { passive: false });
    joyZone.addEventListener('touchmove', (e) => {
        for (let i = 0; i < e.changedTouches.length; i++) {
            const t = e.changedTouches[i];
            if (t.identifier !== joystickId) continue;
            let dx = t.clientX - joyBaseX;
            let dy = t.clientY - joyBaseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > JOY_RADIUS) {
                dx = dx / dist * JOY_RADIUS;
                dy = dy / dist * JOY_RADIUS;
            }
            joyKnob.style.left = (joyBaseX + dx) + 'px';
            joyKnob.style.top = (joyBaseY + dy) + 'px';
            moveInputX = dx / JOY_RADIUS;
            moveInputZ = dy / JOY_RADIUS;
        }
        e.preventDefault();
    }, { passive: false });
    const endJoystick = (e) => {
        for (let i = 0; i < e.changedTouches.length; i++) {
            if (e.changedTouches[i].identifier === joystickId) {
                joystickId = null;
                moveInputX = 0;
                moveInputZ = 0;
                joyBase.style.display = 'none';
                joyKnob.style.display = 'none';
            }
        }
    };
    joyZone.addEventListener('touchend', endJoystick);
    joyZone.addEventListener('touchcancel', endJoystick);
}
let camTouchId = null;
let lastCamX = 0, lastCamY = 0;
renderer.domElement.addEventListener('touchstart', (e) => {
    for (let i = 0; i < e.changedTouches.length; i++) {
        const t = e.changedTouches[i];
        if (t.clientX > window.innerWidth * 0.45 && camTouchId === null) {
            camTouchId = t.identifier;
            lastCamX = t.clientX;
            lastCamY = t.clientY;
        }
    }
}, { passive: true });
renderer.domElement.addEventListener('touchmove', (e) => {
    for (let i = 0; i < e.changedTouches.length; i++) {
        const t = e.changedTouches[i];
        if (t.identifier !== camTouchId) continue;
        const dx = t.clientX - lastCamX;
        const dy = t.clientY - lastCamY;
        yaw -= dx * 0.004;
        pitch += dy * 0.004;
        pitch = Math.max(-1.2, Math.min(0.8, pitch));
        lastCamX = t.clientX;
        lastCamY = t.clientY;
    }
    e.preventDefault();
}, { passive: false });
const endCam = (e) => {
    for (let i = 0; i < e.changedTouches.length; i++) {
        if (e.changedTouches[i].identifier === camTouchId) camTouchId = null;
    }
};
renderer.domElement.addEventListener('touchend', endCam, { passive: true });
renderer.domElement.addEventListener('touchcancel', endCam, { passive: true });
const jumpBtn = document.getElementById('jump-btn');
if (jumpBtn) {
    jumpBtn.addEventListener('touchstart', (e) => { wantJump = true; e.preventDefault(); }, { passive: false });
}
let sprintToggle = false;
const sprintBtn = document.getElementById('sprint-btn');
if (sprintBtn) {
    sprintBtn.addEventListener('touchstart', (e) => {
        sprintToggle = !sprintToggle;
        sprintBtn.classList.toggle('active', sprintToggle);
        e.preventDefault();
    }, { passive: false });
}
;
let grounded = false;       // Игрок стоит на земле
let coyoteTimer = 0;        // Таймер «койот-тайма»
let jumpBufTimer = 0;       // Таймер буфера прыжка
let charYaw = 0;            // Текущий угол поворота модели персонажа
const smoothCam = new THREE.Vector3(0, 7, CAM_DIST); // Сглаженная позиция камеры
let isJumping = false;      // Прыжок в процессе
let jumpTimer = 0;          // Длительность текущего прыжка
let checkpointCount = 0;    // Количество достигнутых чекпоинтов
let celebrationMode = false; // Анимация победы запущена
let celebrationTimer = 0;
function resetPlayer() {
    playerBody.position.copy(spawnPos);
    playerBody.velocity.set(0, 0, 0);
    playerBody.angularVelocity.set(0, 0, 0);
    coyoteTimer = 0;
    jumpBufTimer = 0;
    wantJump = false;
    isJumping = false;
    jumpTimer = 0;
    celebrationMode = false;
    celebrationTimer = 0;
    yaw = 0;
    pitch = -0.3;
}
const clock = new THREE.Clock();
let animTime = 0;
function animate() {
    requestAnimationFrame(animate);
    const dt = Math.min(clock.getDelta(), 0.05); // Ограничение dt для стабильности
    animTime += dt;
    if (editorMode) {
        if (typeof editorAnimate === 'function') editorAnimate(dt, animTime);
        return;
    }
    if (!gameActive && !celebrationMode) { renderer.render(scene, camera); return; }
    world.step(1 / 60, dt, 5);
    grounded = false;
    
    for (let i = 0; i < world.contacts.length; i++) {
        const c = world.contacts[i];
        let ny;
        if (c.bi === playerBody) ny = -c.ni.y;
        else if (c.bj === playerBody) ny = c.ni.y;
        else continue;
        if (ny > 0.5) grounded = true; // Нормаль направлена вверх → стоим на поверхности
    }
    const _rayFrom = new CANNON.Vec3(
        playerBody.position.x,
        playerBody.position.y,
        playerBody.position.z
    );
    const _rayTo = new CANNON.Vec3(
        playerBody.position.x,
        playerBody.position.y - PLAYER_FEET_OFFSET - 0.5,
        playerBody.position.z
    );
    const _rayResult = new CANNON.RaycastResult();
    const _rayHit = world.raycastClosest(_rayFrom, _rayTo, {
        collisionFilterGroup: COL_PLAYER,
        collisionFilterMask: COL_MAP,
        skipBackfaces: true
    }, _rayResult);
    if (_rayHit) {
        const groundY = _rayResult.hitPointWorld.y;
        const feetY = playerBody.position.y - PLAYER_FEET_OFFSET;
        if (feetY < groundY - 0.01) {
            playerBody.position.y = groundY + PLAYER_FEET_OFFSET;
            if (playerBody.velocity.y < 0) playerBody.velocity.y = 0;
            grounded = true;
        }
    }
    coyoteTimer = grounded ? COYOTE : Math.max(0, coyoteTimer - dt);
    if (wantJump) {
        jumpBufTimer = JUMP_BUF;
        wantJump = false;
    } else {
        jumpBufTimer = Math.max(0, jumpBufTimer - dt);
    }
    let isMoving = false;
    inputActive = !celebrationMode && (isMobile || document.pointerLockElement === document.body);
    if (!isMobile) {
        const kx = (keys['KeyD'] ? 1 : 0) - (keys['KeyA'] ? 1 : 0);
        const kz = (keys['KeyS'] ? 1 : 0) - (keys['KeyW'] ? 1 : 0);
        moveInputX = kx;
        moveInputZ = kz;
        inputSprint = !!keys['ShiftLeft'] || !!keys['ShiftRight'];
    } else {
        inputSprint = sprintToggle;
    }
    if (inputActive) {
        const sprinting = inputSprint;
        const curSpeed = moveSpeed * (sprinting ? SPRINT_MULT : 1.0);
        let ix = moveInputX;
        let iz = moveInputZ;
        const ilen = Math.sqrt(ix * ix + iz * iz);
        const DEADZONE = 0.15;
        if (ilen > DEADZONE) {
            isMoving = true;
            const nx = ix / ilen;
            const nz = iz / ilen;
            const sy = Math.sin(yaw), cy = Math.cos(yaw);
            const wx = nx * cy + nz * sy;
            const wz = -nx * sy + nz * cy;
            if (grounded) {
                playerBody.velocity.x = wx * curSpeed;
                playerBody.velocity.z = wz * curSpeed;
        } else {
                const f = AIR_STEER * dt;
                playerBody.velocity.x += (wx * curSpeed - playerBody.velocity.x) * f;
                playerBody.velocity.z += (wz * curSpeed - playerBody.velocity.z) * f;
            }
            charYaw = Math.atan2(wx, wz);
        } else if (grounded) {
            playerBody.velocity.x = 0;
            playerBody.velocity.z = 0;
        }
        const hSpeedSq = playerBody.velocity.x * playerBody.velocity.x + playerBody.velocity.z * playerBody.velocity.z;
        if (hSpeedSq > MAX_HSPEED * MAX_HSPEED) {
            const scale = MAX_HSPEED / Math.sqrt(hSpeedSq);
            playerBody.velocity.x *= scale;
            playerBody.velocity.z *= scale;
        }
        let da = charYaw - playerGroup.rotation.y;
        while (da > Math.PI) da -= Math.PI * 2;
        while (da < -Math.PI) da += Math.PI * 2;
        playerGroup.rotation.y += da * Math.min(1, TURN_SPEED * dt);
        if (jumpBufTimer > 0 && coyoteTimer > 0) {
            isJumping = true;
            jumpTimer = 0;
            playerBody.velocity.y = JUMP_VEL_START;
            coyoteTimer = 0;
            jumpBufTimer = 0;
        }
        if (isJumping) {
            jumpTimer += dt;
            if (jumpTimer >= JUMP_TIME || (grounded && jumpTimer > 0.1)) {
                isJumping = false;
            } else {
                const t = jumpTimer / JUMP_TIME;
                const smoothT = t * t * (3 - 2 * t);
                const jumpVel = JUMP_VEL_START + (JUMP_VEL_END - JUMP_VEL_START) * smoothT;
                const gravDrag = Math.abs(gravityValue) * jumpTimer;
                playerBody.velocity.y = jumpVel - gravDrag;
            }
        }
        const vy = playerBody.velocity.y;
        const isSprinting = inputSprint && isMoving;
        const tgt = { lax: 0, laz: 0, rax: 0, raz: 0,
                      lex: 0, rex: 0,
                      llx: 0, llz: 0, rlx: 0, rlz: 0,
                      lkx: 0, rkx: 0 };
        if (!grounded && vy > 0.5) {
            const jt = Math.min(jumpTimer / JUMP_TIME, 1);
            tgt.lax = -0.4 - jt * 0.2;  tgt.rax = -0.4 - jt * 0.2;
            tgt.laz = 0.1;               tgt.raz = -0.1;
            tgt.lex = -0.3;              tgt.rex = -0.3;
            tgt.llx = -0.3;              tgt.rlx = 0.4;
            tgt.lkx = 0.2;               tgt.rkx = -0.6;
        } else if (!grounded && vy < -0.5) {
            const fv = Math.min(Math.abs(vy) / 15, 1);
            tgt.lax = -0.25 - fv * 0.3;  tgt.rax = -0.25 - fv * 0.3;
            tgt.laz = 0.15 + fv * 0.15;  tgt.raz = -0.15 - fv * 0.15;
            tgt.lex = -0.2 - fv * 0.2;   tgt.rex = -0.2 - fv * 0.2;
            tgt.llx = 0.05 + fv * 0.1;   tgt.rlx = 0.05 + fv * 0.1;
            tgt.lkx = 0.15 + fv * 0.15;  tgt.rkx = 0.15 + fv * 0.15;
        } else if (!grounded) {
            tgt.lax = -0.3;  tgt.rax = -0.3;
            tgt.laz = 0.12;  tgt.raz = -0.12;
            tgt.lex = -0.25; tgt.rex = -0.25;
            tgt.llx = 0.05;  tgt.rlx = 0.05;
            tgt.lkx = 0.1;   tgt.rkx = 0.1;
        } else if (isMoving) {
            const freq = isSprinting ? 11 : 7;
            const amp = isSprinting ? 0.9 : 0.55;
            const t = animTime * freq;
            const s = Math.sin(t);
            const c = Math.cos(t);
            tgt.lax = s * amp;            tgt.rax = -s * amp;
            tgt.laz = 0;                  tgt.raz = 0;
            tgt.lex = Math.min(0, -s) * amp * 0.7 - 0.1;
            tgt.rex = Math.min(0, s) * amp * 0.7 - 0.1;
            tgt.llx = -s * amp * 0.8;     tgt.rlx = s * amp * 0.8;
            tgt.lkx = Math.max(0, c) * amp * 0.6;
            tgt.rkx = Math.max(0, -c) * amp * 0.6;
        } else {
            const b = Math.sin(animTime * 1.8);
            tgt.lax = b * 0.02;    tgt.rax = b * 0.02;
            tgt.laz = 0.06;        tgt.raz = -0.06;
            tgt.lex = -0.06;       tgt.rex = -0.06;
            tgt.llx = 0;           tgt.rlx = 0;
            tgt.lkx = 0;           tgt.rkx = 0;
        }
        const blend = 1 - Math.exp(-12 * dt);
        function lr(cur, t) { return cur + (t - cur) * blend; }
        leftArm.rotation.x  = lr(leftArm.rotation.x, tgt.lax);
        leftArm.rotation.z  = lr(leftArm.rotation.z, tgt.laz);
        rightArm.rotation.x = lr(rightArm.rotation.x, tgt.rax);
        rightArm.rotation.z = lr(rightArm.rotation.z, tgt.raz);
        lElbow.rotation.x   = lr(lElbow.rotation.x, tgt.lex);
        rElbow.rotation.x   = lr(rElbow.rotation.x, tgt.rex);
        leftLeg.rotation.x  = lr(leftLeg.rotation.x, tgt.llx);
        leftLeg.rotation.z  = lr(leftLeg.rotation.z, tgt.llz);
        rightLeg.rotation.x = lr(rightLeg.rotation.x, tgt.rlx);
        rightLeg.rotation.z = lr(rightLeg.rotation.z, tgt.rlz);
        lKnee.rotation.x    = lr(lKnee.rotation.x, tgt.lkx);
        rKnee.rotation.x    = lr(rKnee.rotation.x, tgt.rkx);
    }
    if (celebrationMode) {
        celebrationTimer += dt;
        playerBody.velocity.x *= 0.9;
        playerBody.velocity.z *= 0.9;
        const faceYaw = yaw;
        let da = faceYaw - playerGroup.rotation.y;
        while (da > Math.PI) da -= Math.PI * 2;
        while (da < -Math.PI) da += Math.PI * 2;
        playerGroup.rotation.y += da * Math.min(1, 8 * dt);
        const ct = celebrationTimer;
        const bounce = Math.abs(Math.sin(ct * 6)) * 0.4;
        const wave = Math.sin(ct * 8);
        const blend2 = 1 - Math.exp(-10 * dt);
        function lr2(cur, t) { return cur + (t - cur) * blend2; }
        leftArm.rotation.x  = lr2(leftArm.rotation.x,  -2.8 + Math.sin(ct * 7) * 0.3);
        leftArm.rotation.z  = lr2(leftArm.rotation.z,  0.3 + Math.sin(ct * 5) * 0.2);
        rightArm.rotation.x = lr2(rightArm.rotation.x, -2.8 + Math.sin(ct * 7 + 1) * 0.3);
        rightArm.rotation.z = lr2(rightArm.rotation.z, -0.3 - Math.sin(ct * 5 + 1) * 0.2);
        lElbow.rotation.x   = lr2(lElbow.rotation.x,   -0.5 - Math.sin(ct * 9) * 0.3);
        rElbow.rotation.x   = lr2(rElbow.rotation.x,   -0.5 - Math.sin(ct * 9 + 1.5) * 0.3);
        leftLeg.rotation.x  = lr2(leftLeg.rotation.x,  wave * 0.3);
        rightLeg.rotation.x = lr2(rightLeg.rotation.x, -wave * 0.3);
        lKnee.rotation.x    = lr2(lKnee.rotation.x,    Math.max(0, wave) * 0.5);
        rKnee.rotation.x    = lr2(rKnee.rotation.x,    Math.max(0, -wave) * 0.5);
        const pp = playerBody.position;
        playerGroup.position.copy(pp);
        playerGroup.position.y -= PLAYER_FEET_OFFSET - 0.6 - bounce;
        const tx = pp.x + CAM_DIST * Math.sin(yaw) * Math.cos(pitch);
        const ty = pp.y + CAM_DIST * Math.sin(pitch) + 2;
        const tz = pp.z + CAM_DIST * Math.cos(yaw) * Math.cos(pitch);
        const cl = 1 - Math.exp(-CAM_LERP * dt);
        smoothCam.x += (tx - smoothCam.x) * cl;
        smoothCam.y += (ty - smoothCam.y) * cl;
        smoothCam.z += (tz - smoothCam.z) * cl;
        camera.position.copy(smoothCam);
        camera.lookAt(pp.x, pp.y + 1, pp.z);
        renderer.render(scene, camera);
        if (celebrationTimer > 2.5) {
            celebrationMode = false;
            completeLevel();
        }
        return;
    }
    const px = playerBody.position.x;
    const py = playerBody.position.y;
    const pz = playerBody.position.z;
    for (let di = 0; di < deathBoxes.length; di++) {
        const db = deathBoxes[di];
        if (px >= db.minX && px <= db.maxX &&
            py >= db.minY && py <= db.maxY &&
            pz >= db.minZ && pz <= db.maxZ) {
            resetPlayer();
            break;
        }
    }
    for (let ci = 0; ci < checkpointBoxes.length; ci++) {
        const cp = checkpointBoxes[ci];
        if (px >= cp.minX && px <= cp.maxX &&
            py >= cp.minY && py <= cp.maxY &&
            pz >= cp.minZ && pz <= cp.maxZ) {
            const newSpawnY = cp.spawnY;
            const newSpawnX = (cp.minX + cp.maxX) / 2;
            const newSpawnZ = (cp.minZ + cp.maxZ) / 2;
            if (Math.abs(spawnPos.x - newSpawnX) > 0.5 ||
                Math.abs(spawnPos.z - newSpawnZ) > 0.5) {
                spawnPos.set(newSpawnX, newSpawnY, newSpawnZ);
                checkpointCount++;
                const cpText = t('checkpoint') + ': #' + checkpointCount;
                document.getElementById('cp-info').textContent = cpText;
                const cpMob = document.getElementById('cp-mobile');
                if (cpMob) cpMob.textContent = cpText;
            }
        }
    }
    if (!celebrationMode) {
        for (let fi = 0; fi < finishBoxes.length; fi++) {
            const fb = finishBoxes[fi];
            if (px >= fb.minX && px <= fb.maxX &&
                py >= fb.minY && py <= fb.maxY &&
                pz >= fb.minZ && pz <= fb.maxZ) {
                celebrationMode = true;
                celebrationTimer = 0;
                document.exitPointerLock();
                document.getElementById('menu-btn').style.display = 'none';
                break;
            }
        }
    }
    const pp = playerBody.position;
    if (pp.y < mapLowestY - 20) {
        resetPlayer();
    }
    playerGroup.position.copy(pp);
    playerGroup.position.y -= PLAYER_FEET_OFFSET - 0.6;
    const tx = pp.x + CAM_DIST * Math.sin(yaw) * Math.cos(pitch);
    const ty = pp.y + CAM_DIST * Math.sin(pitch) + 2;
    const tz = pp.z + CAM_DIST * Math.cos(yaw) * Math.cos(pitch);
    const cl = 1 - Math.exp(-CAM_LERP * dt);
    smoothCam.x += (tx - smoothCam.x) * cl;
    smoothCam.y += (ty - smoothCam.y) * cl;
    smoothCam.z += (tz - smoothCam.z) * cl;
    camera.position.copy(smoothCam);
    camera.lookAt(pp.x, pp.y + 1, pp.z);
    renderer.render(scene, camera);
}
animate();
window.addEventListener('resize', () => {
    const w = window.innerWidth, h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    if (typeof editorResize === 'function') editorResize(w, h);
    renderer.setSize(w, h);
});
;
let edEditingIdx = -1;
const edScene = new THREE.Scene();
edScene.background = new THREE.Color(colors.sky);
const edCamera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
edCamera.position.set(15, 20, 30);
edScene.add(new THREE.AmbientLight(0xffffff, 0.6));
const edDirLight = new THREE.DirectionalLight(0xffffff, 0.7);
edDirLight.position.set(30, 60, 20);
edDirLight.castShadow = true;
edScene.add(edDirLight);
const edGridSize = 400, edGridDiv = 80, edCellSize = edGridSize / edGridDiv;
const edGrid = new THREE.GridHelper(edGridSize, edGridDiv, 0x88aacc, 0xa0c4e0);
edGrid.material.transparent = true;
edGrid.material.opacity = 0.6;
edScene.add(edGrid);
const orbitCtrl = new THREE.OrbitControls(edCamera, renderer.domElement);
orbitCtrl.enableDamping = true;
orbitCtrl.dampingFactor = 0.1;
orbitCtrl.enabled = false; // Включается при входе в редактор
const transformCtrl = new THREE.TransformControls(edCamera, renderer.domElement);
transformCtrl.setSize(0.8);
edScene.add(transformCtrl);
transformCtrl.addEventListener('dragging-changed', (e) => {
    if (editorMode) orbitCtrl.enabled = !e.value;
});
transformCtrl.addEventListener('objectChange', () => {
    if (!edSelected) return;
    if (edSelectedIsSpawn) {
        edSpawnData.x = parseFloat(edPlayerGroup.position.x.toFixed(2));
        edSpawnData.y = parseFloat(edPlayerGroup.position.y.toFixed(2));
        edSpawnData.z = parseFloat(edPlayerGroup.position.z.toFixed(2));
        document.getElementById('ed-sp-x').value = edSpawnData.x;
        document.getElementById('ed-sp-y').value = edSpawnData.y;
        document.getElementById('ed-sp-z').value = edSpawnData.z;
        return;
    }
    const b = edSelected.userData;
    if (transformCtrl.mode === 'translate') {
        b.x = parseFloat(edSelected.position.x.toFixed(2));
        b.y = parseFloat(edSelected.position.y.toFixed(2));
        b.z = parseFloat(edSelected.position.z.toFixed(2));
    } else if (transformCtrl.mode === 'scale') {
        b.w = parseFloat((b._origW * edSelected.scale.x).toFixed(2));
        b.h = parseFloat((b._origH * edSelected.scale.y).toFixed(2));
        b.d = parseFloat((b._origD * edSelected.scale.z).toFixed(2));
    }
    edUpdatePropsUI();
});
;
function makeEditorPlayer() {
    const g = new THREE.Group();
    const ft = makeFaceTexture();
    const sk = new THREE.MeshStandardMaterial({ color: colors.skin });
    const hm = [sk.clone(), sk.clone(), sk.clone(), sk.clone(),
                 new THREE.MeshStandardMaterial({ map: ft }), sk.clone()];
    const h = new THREE.Mesh(roundedBoxGeo(0.5, 0.55, 0.45), hm);
    h.position.set(0, 1.33, 0); h.castShadow = true;
    const t = new THREE.Mesh(roundedBoxGeo(0.85, 0.8, 0.45),
        new THREE.MeshStandardMaterial({ color: colors.shirt }));
    t.position.set(0, 0.65, 0); t.castShadow = true;
    const eLA = new THREE.Group(); eLA.position.set(-0.6, 1.05, 0);
    eLA.add(makeSegment(0.35, 0.4, 0.35, colors.skin, -0.2));
    const eLElb = new THREE.Group(); eLElb.position.set(0, -0.4, 0);
    eLElb.add(makeSegment(0.3, 0.4, 0.3, colors.skin, -0.2));
    eLA.add(eLElb);
    const eRA = new THREE.Group(); eRA.position.set(0.6, 1.05, 0);
    eRA.add(makeSegment(0.35, 0.4, 0.35, colors.skin, -0.2));
    const eRElb = new THREE.Group(); eRElb.position.set(0, -0.4, 0);
    eRElb.add(makeSegment(0.3, 0.4, 0.3, colors.skin, -0.2));
    eRA.add(eRElb);
    const eLL = new THREE.Group(); eLL.position.set(-0.2, 0.25, 0);
    eLL.add(makeSegment(0.38, 0.42, 0.38, colors.pants, -0.21));
    const eLKn = new THREE.Group(); eLKn.position.set(0, -0.42, 0);
    eLKn.add(makeSegment(0.36, 0.43, 0.36, colors.pants, -0.215));
    eLL.add(eLKn);
    const eRL = new THREE.Group(); eRL.position.set(0.2, 0.25, 0);
    eRL.add(makeSegment(0.38, 0.42, 0.38, colors.pants, -0.21));
    const eRKn = new THREE.Group(); eRKn.position.set(0, -0.42, 0);
    eRKn.add(makeSegment(0.36, 0.43, 0.36, colors.pants, -0.215));
    eRL.add(eRKn);
    g.add(h, t, eLA, eRA, eLL, eRL);
    return g;
}
const edPlayerGroup = makeEditorPlayer();
edPlayerGroup.position.set(0, 2, 0);
edScene.add(edPlayerGroup);
const edPlayerMeshes = [];
edPlayerGroup.traverse(c => { if (c.isMesh) edPlayerMeshes.push(c); });
const edSpawnArrow = new THREE.Mesh(
    new THREE.ConeGeometry(0.2, 0.5, 6),
    new THREE.MeshStandardMaterial({ color: 0x00ff88, emissive: 0x00ff88, emissiveIntensity: 0.5 })
);
edSpawnArrow.position.set(0, 2.0, 0);
edSpawnArrow.rotation.x = Math.PI; // Перевёрнута вниз (острием показывает на голову)
edPlayerGroup.add(edSpawnArrow);
let edSpawnData = { x: 0, y: 2, z: 0 };   // Координаты точки спавна
let edBlocks = [];         // Массив данных блоков [{x,y,z,w,h,d,type,color},...]
let edMeshes = [];         // Массив THREE.Mesh, соответствующих edBlocks
let edSelected = null;     // Текущий выделенный меш (или null)
let edSelectedIsSpawn = false; // Выделен спавн, а не блок
let edUndoStack = [];      // Стек отмены
let edLevelName = t('newMap'); // Имя карты
const ED_TYPE_COLORS = {
    platform: '#888888', death: '#ff4500', lava: '#ff6600', lava_crack: '#661100',
    checkpoint: '#2ecc71', finish: '#f1c40f'
};
;
function edSaveUndo() {
    edUndoStack.push(JSON.stringify(edGetMapData()));
    if (edUndoStack.length > 50) edUndoStack.shift();
}
function edUndo() {
    if (edUndoStack.length === 0) return;
    const data = JSON.parse(edUndoStack.pop());
    edSelectBlock(null);
    edClearScene();
    edLoadMapData(data);
}
function edCreateBlockMesh(b) {
    const geo = new THREE.BoxGeometry(b.w, b.h, b.d);
    scaleBoxUVs(geo, b.w, b.h, b.d);
    const mat = createBlockMaterial(b.type, b.color);
    if (b.type === 'checkpoint') mat.emissive = new THREE.Color(0x003311);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(b.x, b.y, b.z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    const edges = new THREE.EdgesGeometry(geo);
    mesh.add(new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x88aabb, transparent: true, opacity: 0.3 })));
    mesh.userData = b;
    b._origW = b.w; b._origH = b.h; b._origD = b.d;
    edScene.add(mesh);
    edMeshes.push(mesh);
    return mesh;
}
function edRebuildMesh(mesh) {
    const b = mesh.userData;
    mesh.geometry.dispose();
    const geo = new THREE.BoxGeometry(b.w, b.h, b.d);
    scaleBoxUVs(geo, b.w, b.h, b.d);
    mesh.geometry = geo;
    mesh.position.set(b.x, b.y, b.z);
    mesh.scale.set(1, 1, 1);
    mesh.material.dispose();
    mesh.material = createBlockMaterial(b.type, b.color);
    if (b.type === 'checkpoint') mesh.material.emissive.set(0x003311);
    b._origW = b.w; b._origH = b.h; b._origD = b.d;
    if (mesh.children.length > 0) {
        mesh.children[0].geometry.dispose();
        mesh.children[0].geometry = new THREE.EdgesGeometry(mesh.geometry);
    }
}
function edAddBlock(type) {
    edSaveUndo();
    const t = orbitCtrl.target;
    const b = {
        x: parseFloat(t.x.toFixed(1)),
        y: parseFloat(t.y.toFixed(1)),
        z: parseFloat(t.z.toFixed(1)),
        w: (type === 'checkpoint' || type === 'finish') ? 6 : 4,
        h: isDeathType(type) ? 0.3 : 0.5,
        d: (type === 'checkpoint' || type === 'finish') ? 6 : 4,
        color: ED_TYPE_COLORS[type], type: type
    };
    edBlocks.push(b);
    edSelectBlock(edCreateBlockMesh(b));
    edUpdateStats();
}
function edDuplicate() {
    if (!edSelected || edSelectedIsSpawn) return;
    edSaveUndo();
    const ob = edSelected.userData;
    const b = {
        x: ob.x + 2, y: ob.y, z: ob.z + 2,
        w: ob.w, h: ob.h, d: ob.d,
        color: ob.color, type: ob.type
    };
    edBlocks.push(b);
    edSelectBlock(edCreateBlockMesh(b));
    edUpdateStats();
}
function edDelete() {
    if (!edSelected || edSelectedIsSpawn) return;
    edSaveUndo();
    const idx = edBlocks.indexOf(edSelected.userData);
    if (idx !== -1) edBlocks.splice(idx, 1);
    transformCtrl.detach();
    edScene.remove(edSelected);
    edMeshes.splice(edMeshes.indexOf(edSelected), 1);
    edSelected.geometry.dispose();
    edSelected.material.dispose();
    edSelected = null;
    document.getElementById('ed-sel-props').style.display = 'none';
    document.getElementById('ed-spawn-props').style.display = 'none';
    document.getElementById('ed-no-sel').textContent = t('selectBlock');
    document.getElementById('ed-no-sel').style.display = 'block';
    document.getElementById('ed-props-header').textContent = t('properties');
    edUpdateStats();
}
;
function edSelectBlock(mesh) {
    if (edSelected && !edSelectedIsSpawn) {
        if (edSelected.children[0]) {
            edSelected.children[0].material.color.set(0x88aabb);
            edSelected.children[0].material.opacity = 0.3;
        }
    }
    edSelectedIsSpawn = false;
    edSelected = mesh;
    const spawnProps = document.getElementById('ed-spawn-props');
    const selProps = document.getElementById('ed-sel-props');
    const noSel = document.getElementById('ed-no-sel');
    if (mesh === edPlayerGroup) {
        edSelectedIsSpawn = true;
        transformCtrl.setMode('translate');
        document.getElementById('ed-btn-translate').classList.add('active');
        document.getElementById('ed-btn-scale').classList.remove('active');
        transformCtrl.attach(edPlayerGroup);
        selProps.style.display = 'none';
        noSel.style.display = 'none';
        spawnProps.style.display = 'block';
        document.getElementById('ed-props-header').textContent = t('spawnPoint');
    } else if (mesh) {
        if (mesh.children[0]) {
            mesh.children[0].material.color.set(0xffe030);
            mesh.children[0].material.opacity = 1.0;
        }
        transformCtrl.attach(mesh);
        selProps.style.display = 'block';
        noSel.style.display = 'none';
        spawnProps.style.display = 'none';
        const b = mesh.userData;
        const typeName = b.type.charAt(0).toUpperCase() + b.type.slice(1).replace('_', ' ');
        document.getElementById('ed-props-header').textContent = typeName;
        edUpdatePropsUI();
    } else {
        transformCtrl.detach();
        selProps.style.display = 'none';
        spawnProps.style.display = 'none';
        noSel.textContent = t('selectBlock');
        noSel.style.display = 'block';
        document.getElementById('ed-props-header').textContent = t('properties');
    }
    edUpdateStats();
}
function edUpdatePropsUI() {
    if (!edSelected) return;
    const b = edSelected.userData;
    document.getElementById('ep-x').value = b.x;
    document.getElementById('ep-y').value = b.y;
    document.getElementById('ep-z').value = b.z;
    document.getElementById('ep-w').value = b.w;
    document.getElementById('ep-h').value = b.h;
    document.getElementById('ep-d').value = b.d;
    document.getElementById('ep-color').value = b.color;
    document.getElementById('ep-type').value = b.type;
}
function edPropChanged() {
    if (!edSelected || edSelectedIsSpawn) return;
    edSaveUndo();
    const b = edSelected.userData;
    b.x = parseFloat(document.getElementById('ep-x').value) || 0;
    b.y = parseFloat(document.getElementById('ep-y').value) || 0;
    b.z = parseFloat(document.getElementById('ep-z').value) || 0;
    b.w = Math.max(0.1, parseFloat(document.getElementById('ep-w').value) || 1);
    b.h = Math.max(0.1, parseFloat(document.getElementById('ep-h').value) || 0.5);
    b.d = Math.max(0.1, parseFloat(document.getElementById('ep-d').value) || 1);
    b.color = document.getElementById('ep-color').value;
    b.type = document.getElementById('ep-type').value;
    edRebuildMesh(edSelected);
    const typeName = b.type.charAt(0).toUpperCase() + b.type.slice(1).replace('_', ' ');
    document.getElementById('ed-props-header').textContent = typeName;
    edUpdateStats();
}
function edSpawnChanged() {
    edSpawnData.x = parseFloat(document.getElementById('ed-sp-x').value) || 0;
    edSpawnData.y = parseFloat(document.getElementById('ed-sp-y').value) || 2;
    edSpawnData.z = parseFloat(document.getElementById('ed-sp-z').value) || 0;
    edPlayerGroup.position.set(edSpawnData.x, edSpawnData.y, edSpawnData.z);
}
function edSetMode(mode) {
    transformCtrl.setMode(mode);
    document.getElementById('ed-btn-translate').classList.toggle('active', mode === 'translate');
    document.getElementById('ed-btn-scale').classList.toggle('active', mode === 'scale');
}
function edSwitchTab(tab) {
    document.querySelectorAll('.ed-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
    document.querySelectorAll('.ed-ribbon-content').forEach(c => c.style.display = 'none');
    const ribbon = document.getElementById('ed-ribbon-' + tab);
    if (ribbon) ribbon.style.display = 'flex';
}
const ED_TYPE_ICONS = {
    platform: '🟫', death: '🟥', lava: '🔥', lava_crack: '🌋',
    checkpoint: '🟩', finish: '⭐'
};
function edUpdateStats() {
    const list = document.getElementById('ed-explorer-list');
    list.innerHTML = '<div class="ed-exp-workspace"><span>🌐</span> ' + t('workspace') + '</div>';
    const spawnItem = document.createElement('div');
    spawnItem.className = 'ed-exp-item ed-exp-spawn' + (edSelectedIsSpawn ? ' selected' : '');
    spawnItem.innerHTML = '<span class="ed-exp-icon">👤</span><span class="ed-exp-name">' + t('spawnPoint') + '</span>';
    spawnItem.onclick = () => edSelectBlock(edPlayerGroup);
    list.appendChild(spawnItem);
    edBlocks.forEach((b, i) => {
        const item = document.createElement('div');
        const isActive = edSelected && !edSelectedIsSpawn && edSelected.userData === b;
        item.className = 'ed-exp-item' + (isActive ? ' selected' : '');
        const icon = ED_TYPE_ICONS[b.type] || '📦';
        const typeName = b.type.charAt(0).toUpperCase() + b.type.slice(1).replace('_', ' ');
        item.innerHTML = '<span class="ed-exp-icon">' + icon + '</span>' +
            '<span class="ed-exp-name">' + typeName + ' [' + (i + 1) + ']</span>';
        item.onclick = () => { if (edMeshes[i]) edSelectBlock(edMeshes[i]); };
        list.appendChild(item);
    });
}
;
const edRaycaster = new THREE.Raycaster();
const edMouse = new THREE.Vector2();
let edMouseDown = new THREE.Vector2(); // Позиция мыши при нажатии (для фильтрации перетаскиваний)
renderer.domElement.addEventListener('pointerdown', (e) => {
    if (!editorMode) return;
    edMouseDown.set(e.clientX, e.clientY);
});
renderer.domElement.addEventListener('pointerup', (e) => {
    if (!editorMode) return;
    const dx = e.clientX - edMouseDown.x;
    const dy = e.clientY - edMouseDown.y;
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) return;
    if (transformCtrl.dragging) return;
    const rect = renderer.domElement.getBoundingClientRect();
    edMouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    edMouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    edRaycaster.setFromCamera(edMouse, edCamera);
    const playerHits = edRaycaster.intersectObjects(edPlayerMeshes, true);
    if (playerHits.length > 0) {
        edSelectBlock(edPlayerGroup);
        return;
    }
    const hits = edRaycaster.intersectObjects(edMeshes);
    if (hits.length > 0) {
        edSelectBlock(hits[0].object);
    } else {
        edSelectBlock(null);
    }
});
;
var edMapUuid = '';
var edPublished = false;
var edMapNum = 0;
function generateUUID4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0;
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
function enterEditor(mapData, editIdx) {
    editorMode = true;
    edEditingIdx = (editIdx !== undefined) ? editIdx : -1;
    gameActive = false;
    document.exitPointerLock();
    hideAllScreens();
    document.getElementById('editor-ui').style.display = 'block';
    orbitCtrl.enabled = true;
    edSwitchTab('home');
    edSelectBlock(null);
    edClearScene();
    edUndoStack.length = 0;
    if (mapData) {
        edLoadMapData(mapData);
        edMapUuid = mapData.uuid || generateUUID4();
        edPublished = !!mapData.published;
        edMapNum = mapData.mapNum || 0;
    } else {
        edLevelName = t('newMap');
        document.getElementById('ed-level-name').value = edLevelName;
        edSpawnData = { x: 0, y: 2, z: 0 };
        edPlayerGroup.position.set(0, 2, 0);
        document.getElementById('ed-sp-x').value = 0;
        document.getElementById('ed-sp-y').value = 2;
        document.getElementById('ed-sp-z').value = 0;
        edMapUuid = generateUUID4();
        edPublished = false;
        edMapNum = 0;
        edUpdateStats();
    }
    edUpdatePublishButtons();
    edVerifyOnlineStatus();
}
function edUpdatePublishButtons() {
    var btnPub = document.getElementById('ed-btn-publish');
    var btnUnpub = document.getElementById('ed-btn-unpublish');
    if (edPublished) {
        btnPub.querySelector('[data-i18n]').textContent = t('updatePublished');
        btnUnpub.classList.remove('hidden');
    } else {
        btnPub.querySelector('[data-i18n]').textContent = t('publish');
        btnUnpub.classList.add('hidden');
    }
}
function edVerifyOnlineStatus() {
    if (!edPublished || !ONLINE_API_URL) return;
    onlineGetMap(edMapUuid)
        .then(function(data) {
            if (data.error && data.error.indexOf('not found') !== -1) {
                console.log('[editor] Карта удалена с сервера, сброс published');
                edPublished = false;
                edMapNum = 0;
                edSaveQuiet();
                edUpdatePublishButtons();
            } else if (data.mapNum && !edMapNum) {
                edMapNum = data.mapNum;
                edSaveQuiet();
            }
        })
        .catch(function(err) {
            console.warn('[editor] Не удалось проверить статус:', err.message);
        });
}
function edSaveQuiet() {
    edLevelName = document.getElementById('ed-level-name').value || t('newMap');
    var data = edGetMapData();
    var maps = getCustomMaps();
    if (edEditingIdx >= 0 && edEditingIdx < maps.length) {
        maps[edEditingIdx] = data;
    } else {
        maps.push(data);
        edEditingIdx = maps.length - 1;
    }
    saveCustomMaps(maps);
}
function exitEditor() {
    editorMode = false;
    orbitCtrl.enabled = false;
    transformCtrl.detach();
    document.getElementById('editor-ui').style.display = 'none';
    showMenu();
}
function edSave() {
    edLevelName = document.getElementById('ed-level-name').value || t('newMap');
    const data = edGetMapData();
    const maps = getCustomMaps();
    if (edEditingIdx >= 0 && edEditingIdx < maps.length) {
        maps[edEditingIdx] = data;
    } else {
        maps.push(data);
        edEditingIdx = maps.length - 1;
    }
    saveCustomMaps(maps);
    gameAlert(t('mapSaved').replace('@', edLevelName));
}
function edTest() {
    edLevelName = document.getElementById('ed-level-name').value || t('newMap');
    const data = edGetMapData();
    editorMode = false;
    orbitCtrl.enabled = false;
    transformCtrl.detach();
    document.getElementById('editor-ui').style.display = 'none';
    currentLevel = -1;
    checkpointCount = 0;
    document.getElementById('cp-info').textContent = '';
    const cpMob = document.getElementById('cp-mobile');
    if (cpMob) cpMob.textContent = '';
    buildMap(data);
    hideAllScreens();
    levelHud.style.display = 'block';
    document.getElementById('level-hud-text').textContent = t('test') + ': ' + edLevelName;
    document.getElementById('menu-btn').style.display = 'block';
    gameActive = true;
    if (!isMobile) document.body.requestPointerLock?.()?.catch?.(() => {});
}
function edGetMapData() {
    edLevelName = document.getElementById('ed-level-name').value || t('newMap');
    return {
        uuid: edMapUuid,
        name: edLevelName,
        published: edPublished,
        mapNum: edMapNum,
        spawn: { ...edSpawnData },
        blocks: edBlocks.map(b => ({
            x: b.x, y: b.y, z: b.z,
            w: b.w, h: b.h, d: b.d,
            color: b.color, type: b.type
        }))
    };
}
function edClearScene() {
    edMeshes.forEach(m => {
        edScene.remove(m);
        m.geometry.dispose();
        m.material.dispose();
    });
    edMeshes.length = 0;
    edBlocks.length = 0;
}
function edLoadMapData(data) {
    edLevelName = data.name || t('newMap');
    document.getElementById('ed-level-name').value = edLevelName;
    edSpawnData = data.spawn || { x: 0, y: 2, z: 0 };
    edPlayerGroup.position.set(edSpawnData.x, edSpawnData.y, edSpawnData.z);
    document.getElementById('ed-sp-x').value = edSpawnData.x;
    document.getElementById('ed-sp-y').value = edSpawnData.y;
    document.getElementById('ed-sp-z').value = edSpawnData.z;
    data.blocks.forEach(b => {
        edBlocks.push(b);
        edCreateBlockMesh(b);
    });
    edUpdateStats();
}
function edPublish() {
    edLevelName = document.getElementById('ed-level-name').value || t('newMap');
    if (!ONLINE_API_URL) { gameAlert(t('apiNotSet')); return; }
    var confirmMsg = edPublished
        ? t('updateConfirm').replace('@', edLevelName)
        : t('publishConfirm').replace('@', edLevelName);
    gameConfirm(confirmMsg).then(function(ok) {
        if (!ok) return;
        var hideLoading = gameLoading(t('publishing'));
        var data = edGetMapData();
        onlinePublishMap(edMapUuid, edLevelName, data)
            .then(function(result) {
                hideLoading();
                edPublished = true;
                if (result.mapNum) edMapNum = result.mapNum;
                edSaveQuiet();
                edUpdatePublishButtons();
                var msg = result.updated ? t('updated') : t('published');
                if (edMapNum) msg += ' (#' + edMapNum + ')';
                gameAlert(msg);
            })
            .catch(function(err) {
                hideLoading();
                console.error('edPublish error:', err);
                var msg = err.message || '';
                if (msg.indexOf('banned') !== -1) {
                    gameAlert(t('bannedName'));
                } else {
                    gameAlert(t('publishFail') + '\n' + msg);
                }
            });
    });
}
function edUnpublish() {
    edLevelName = document.getElementById('ed-level-name').value || t('newMap');
    if (!ONLINE_API_URL || !edPublished) return;
    gameConfirm(t('unpublishConfirm').replace('@', edLevelName)).then(function(ok) {
        if (!ok) return;
        var hideLoading = gameLoading(t('unpublishing'));
        onlineUnpublishMap(edMapUuid)
            .then(function() {
                hideLoading();
                edPublished = false;
                edSaveQuiet();
                edUpdatePublishButtons();
                gameAlert(t('unpublished'));
            })
            .catch(function(err) {
                hideLoading();
                console.error('edUnpublish error:', err);
                if (err.message && err.message.indexOf('not found') !== -1) {
                    edPublished = false;
                    edSaveQuiet();
                    edUpdatePublishButtons();
                    gameAlert(t('unpublished'));
                } else {
                    gameAlert(t('unpublishFail'));
                }
            });
    });
}
var editorAnimate = function(dt, animTime) {
    edSpawnArrow.position.y = 2.0 + Math.sin(animTime * 3) * 0.15;
    const tgt = orbitCtrl.target;
    edGrid.position.x = Math.round(tgt.x / edCellSize) * edCellSize;
    edGrid.position.z = Math.round(tgt.z / edCellSize) * edCellSize;
    orbitCtrl.update();
    renderer.render(edScene, edCamera);
};
var editorKeydown = function(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
    if (e.code === 'KeyG') edSetMode('translate');
    if (e.code === 'KeyS' && !e.ctrlKey) edSetMode('scale');
    if (e.code === 'Delete' || e.code === 'Backspace') edDelete();
    if (e.code === 'KeyD' && e.ctrlKey) { e.preventDefault(); edDuplicate(); }
    if (e.code === 'KeyZ' && e.ctrlKey) { e.preventDefault(); edUndo(); }
    if (e.code === 'Escape') exitEditor();
};
var editorResize = function(w, h) {
    edCamera.aspect = w / h;
    edCamera.updateProjectionMatrix();
};
var editorOnShowMenu = function() {
    orbitCtrl.enabled = false;
};
;
