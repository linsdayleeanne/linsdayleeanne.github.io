// 用于存储预定义的分数，避免重复计算
const predefinedScores = {};

// 用于存储预定义的祝福语
let messages = [];

/**
 * 从 JSON 文件中加载祝福语
 */
function loadMessages() {
    fetch('data/messages.json') // 指定 data 目录中的 JSON 文件
        .then(response => {
            if (!response.ok) {
                throw new Error('网络响应不正确');
            }
            return response.json();
        })
        .then(data => {
            messages = data;
        })
        .catch(error => {
            console.error('加载祝福语失败:', error);
            // 可以在页面上显示错误信息
            document.getElementById('errorDisplay').innerText = '加载祝福语失败，请重试。';
        });
}

/**
 * 获取随机消息
 * @returns {string} 随机消息
 */
function getRandomMessage() {
    if (messages.length === 0) {
        return '暂无祝福语';
    }
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
}

// 调用函数来加载祝福语
document.addEventListener('DOMContentLoaded', loadMessages);


/**
 * 评估尾号并显示结果
 */
function evaluateValue() {
    const phoneTailInput = document.getElementById('phoneTail');
    const phoneTail = phoneTailInput.value.trim();

    // 验证输入的尾号
    if (!/^\d{4}$/.test(phoneTail)) {
        errorDisplay.innerText = '请输入有效的4位数字手机尾号';
        errorDisplay.classList.remove('hidden'); // 显示错误提示
        phoneTailInput.focus();
        return;
    }
    // 隐藏错误提示
    errorDisplay.classList.add('hidden');
    // 获取分数
    let score = predefinedScores[phoneTail] || evaluateNumber(phoneTail);
    predefinedScores[phoneTail] = score;

    // 获取等级
    const level = getExcellenceLevel(score);
    // 更新显示内容
    updateDisplay(phoneTail, score, level);

    // 设置评分高亮
    setScoreHighlight(score);

    // 初始化估价显示
    setPriceHighlight(0);
    showLoadingPrice();

    // 异步获取估价延时时间设置
    setTimeout(() => fetchPrice(phoneTail), 200);
// 清空输入框
    phoneTailInput.value = '';
    // 显示结果区域
    // document.getElementById('result').classList.remove('hidden');
}

    document.addEventListener('DOMContentLoaded', function() {
        // 将光标放置在输入框上
        document.getElementById('phoneTail').focus();

        // 从 localStorage 读取字幕内容
        const savedScrollText = localStorage.getItem('scrollText');
        if (savedScrollText) {
            document.getElementById('scrollingText').innerText = savedScrollText;
        }
    });       
        
