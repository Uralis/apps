
let mapData = new Map();
let build_version = '1.0.0';
let gameManagerInstance = null;
const save_idArray = [
    ["ADYAShowADS", 1],
    ["Lang", ""],
    ["soundEnabled", "true"],
    ["musicEnabled", "true"],
    ["theme", "system"],
    ["obby_unlocked", 0],       // Прогресс: последний открытый уровень
    ["obby_lang", "ru"],        // Язык интерфейса
    ["obby_custom_maps", ""],   // JSON-массив пользовательских карт
    ["obby_test_map", ""],      // Данные карты для тестового режима
    ["obby_player_id", ""],     // Уникальный ID игрока для онлайн-карт
    ["version_start", "1.0.21"],
];
const afterSaveFunction = () => {};
const purchaseFunList = [];
const uralprojs = new UralProHelperJS({
    panelFPS: false,
    errorTracking: true,
    disableLoggingHtml: false,
    enableLoggingLib: true,
    saveIdArray: save_idArray,
    codeAfterSaving: afterSaveFunction,
    audioMuteDocumentVisibility: false,
    purchaseFunctionList: purchaseFunList,
    enableCompression: true,
    compressionThreshold: 200,
    enableCompressionLogging: false,
});
function setLoadingProgress(pct) {
    const fill = document.querySelector('.loading-fill');
    if (fill) {
        fill.classList.add('progress');
        fill.style.width = pct + '%';
    }
}
function hideLoadingScreen() {
    const screen = document.getElementById('loading-screen');
    if (screen) {
        screen.classList.add('hidden');
        setTimeout(() => { screen.remove(); }, 600);
    }
}
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = src;
        s.onload = resolve;
        s.onerror = () => reject(new Error('Failed to load ' + src));
        document.body.appendChild(s);
    });
}
setLoadingProgress(10);
uralprojs.onSdkReady(() => {
    uralprojs.setData('version_start', '1.0.21');
    uralprojs.uralpro.log("SDK ready.");
    try {
        uralprojs.audio.config.sound = uralprojs.getData("soundEnabled") === 'true';
        uralprojs.audio.config.backgroundAudio = uralprojs.getData("musicEnabled") === 'true';
        if (typeof uralprojs.audio.update === 'function') uralprojs.audio.update();
    } catch (e) {}
    setLoadingProgress(40);
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    function loadScripts(srcs) {
        return srcs.reduce((p, src, i) => p.then(() => {
            setLoadingProgress(40 + Math.round((i + 1) / srcs.length * 55));
            return loadScript(src);
        }), Promise.resolve());
    }
    loadScripts(['js/app.bundle.js']).then(() => {
        setLoadingProgress(100);
        setTimeout(() => {
            hideLoadingScreen();
            document.body.style.background = '#ADD8E6';
        }, 300);
    }).catch((err) => {
        console.error(err);
        console.error('Error loading game.');
    });
    window.addEventListener('beforeunload', () => {
        try { uralprojs.saveDataUrgently(); } catch (e) {}
    });
    window.onVisiblePause = () => {
        uralprojs.audio.unmuteAll();
    };
    window.onHiddenPause = () => {
        uralprojs.audio.muteAll();
        try { uralprojs.saveDataUrgently(); } catch (e) {}
        if (typeof window.gamePause === 'function' && typeof window.isGameActive === 'function' && window.isGameActive()) {
            window.gamePause();
        }
    };
    uralprojs.documentVisibility({
        onHidden: () => {
            if (typeof window.onHiddenPause === 'function') window.onHiddenPause();
        },
        onVisible: () => {
            if (typeof window.onVisiblePause === 'function') window.onVisiblePause();
        },
    });
    setTimeout(() => {
        if (Number(convertStringToIntIfNumberNull(uralprojs.getData("ADYAShowADS"))) == 1) {
            uralprojs.ad.showBannerAdv(true);
        } else {
            uralprojs.ad.showBannerAdv(false);
        }
    }, 1000);
});
