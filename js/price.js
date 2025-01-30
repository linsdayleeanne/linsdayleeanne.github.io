/**
 * 显示加载中的估价提示
 */
function showLoadingPrice() {
    const priceDisplay = document.getElementById('priceDisplay');
    priceDisplay.innerHTML = '思考中.';
    priceDisplay.className = 'highlight-price loading'; // 添加加载样式
}

/**
 * 设置估价高亮显示颜色
 * @param {number} price - 估价
 */
function setPriceHighlight(price) {
    const priceDisplay = document.getElementById('priceDisplay');
    priceDisplay.className = 'highlight-price'; // 重置类名

    if (price >= 3000) {
        priceDisplay.classList.add('very-high');
    } else if (price > 2000) {
        priceDisplay.classList.add('high');
    } else if (price > 700) {
        priceDisplay.classList.add('mid');
    } else {
        priceDisplay.classList.add('low');
    }

    priceDisplay.innerHTML = `&#165;${price.toLocaleString()}`; // 使用HTML实体表示货币符号
}

// 读取 JSON 配置文件
function loadPriceConfig(callback) {
    fetch('/data/price_config.json')
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => console.error('Error loading JSON file:', error));
}

// 使用配置文件中的数据
function fetchPrice(phoneTail) {
    loadPriceConfig(config => {
        let basePrice = 100;

        // 特殊号码的价格调整
        if (config.specialNumbers[phoneTail]) {
            basePrice += config.specialNumbers[phoneTail];
        }

        // 四连号
        if (/^(\d)\1\1\1$/.test(phoneTail)) {
            basePrice += config.consecutiveFour;
        }

        // 三连号的估价更新
        if (/^(\d)\1\1\d$/.test(phoneTail)) {
            basePrice += config.threeConsecutive.ABBB;
        } else if (/^\d(\d)\2\2$/.test(phoneTail)) {
            basePrice += config.threeConsecutive.BBBA;
        }

        // 对子号码
        if (/5566|6677|7788|8899|9988|8877|7766|6655/.test(phoneTail)) {
            basePrice += config.duiziNumber;
        }
        // 顺子号码
        if (/1234|2345|3456|4567|5678|6789/.test(phoneTail)) {
            basePrice += config.straightNumber;
        }

        // 其他吉利号码调整
        const countOccurrences = (str, char) => (str.match(new RegExp(char, 'g')) || []).length;

        basePrice += config.luckyNumbers['8'] * countOccurrences(phoneTail, '8');
        basePrice += config.luckyNumbers['6'] * countOccurrences(phoneTail, '6');
        basePrice += config.luckyNumbers['9'] * countOccurrences(phoneTail, '9');
        basePrice += config.luckyNumbers['4'] * countOccurrences(phoneTail, '4');

        // 随机因素
        basePrice += Math.floor(Math.random() * (config.randomFactor[1] - config.randomFactor[0] + 1)) + config.randomFactor[0];

        // 确保价格不为负数
        basePrice = Math.max(basePrice, 0);

        // 更新估价显示
        setPriceHighlight(basePrice);
        // document.getElementById('priceDisplay').classList.remove('hidden');
        document.getElementById('result').classList.remove('hidden');
    });
}
