/**
 * 根据尾号算法评估分数
 * @param {string} number - 4位尾号
 * @returns {number} 评分
 */
function evaluateNumber(number) {
    let baseScore = 70;

    // 四个相同
    if (/^(\d)\1\1\1$/.test(number)) {
        baseScore = 100;
    }
    // aabb模式
    else if (/^(\d)\1(\d)\2$/.test(number)) {
        baseScore = 95;
    }
    // abba模式
    else if (/^(\d)(\d)\2\1$/.test(number)) {
        baseScore = 90;
    }
    // abcd模式（四个不同且不连续）
    else if (/^(\d)(?!\1)(\d)(?!\1|\2)(\d)(?!\1|\2|\3)(\d)$/.test(number)) {
        baseScore = 85;
    }

    // 随机因素
    const randomFactor = Math.floor(Math.random() * 11) - 5;
    baseScore = Math.max(Math.min(baseScore + randomFactor, 100), 0);

    return baseScore;
}

/**
 * 获取评分等级
 * @param {number} score - 评分
 * @returns {string} 等级
 */
/**
 * 根据评分返回星级等级
 * @param {number} score - 评分
 * @returns {string} 星级等级
 */
function getExcellenceLevel(score) {
    if (score >= 95) {
        return "★★★★★★★★★★"; // 10星
    } else if (score >= 90) {
        return "★★★★★★★★★☆"; // 9星
    } else if (score >= 85) {
        return "★★★★★★★★☆☆"; // 8星
    } else if (score >= 80) {
        return "★★★★★★★☆☆☆"; // 7星
    } else if (score >= 75) {
        return "★★★★★★☆☆☆☆"; // 6星
    } else if (score >= 70) {
        return "★★★★★☆☆☆☆☆"; // 5星
    } else if (score >= 65) {
        return "★★★★☆☆☆☆☆☆"; // 4星
    } else if (score >= 60) {
        return "★★★☆☆☆☆☆☆☆"; // 3星
    } else if (score >= 55) {
        return "★★☆☆☆☆☆☆☆☆"; // 2星
    } else {
        return "★☆☆☆☆☆☆☆☆☆"; // 1星
    }
}

/**
 * 获取等级对应的建议
 * @param {string} level - 等级
 * @returns {string} 建议
 */
function getLevelSuggestion(level) {
    switch (level) {
        case "★☆☆☆☆☆☆☆☆☆":
            return "可考虑使用";
        case "★★☆☆☆☆☆☆☆☆":
            return "可考虑使用";
        case "★★★☆☆☆☆☆☆☆":
            return "实用性强";
        case "★★★★☆☆☆☆☆☆":
            return "实用性强";
        case "★★★★★☆☆☆☆☆":
            return "长期使用";
        case "★★★★★★☆☆☆☆":
            return "非常不错";
        case "★★★★★★★☆☆☆":
            return "值得拥有";
        case "★★★★★★★★☆☆":
            return "强烈推荐";
        case "★★★★★★★★★☆":
            return "极力推荐";
        case "★★★★★★★★★★":
            return "绝对完美";
        default:
            return "可考虑使用";
    }
}

/**
 * 更新显示内容
 * @param {string} phoneTail - 尾号
 * @param {number} score - 评分
 * @param {string} level - 等级
 */
function updateDisplay(phoneTail, score, level) {
    document.getElementById('phoneTailDisplay').innerText = `尾 号：${phoneTail}`;
    document.getElementById('scoreDisplay').innerText = `评 分：${score}分`;
    document.getElementById('messageDisplay').innerText = getLevelSuggestion(level);
    // document.getElementById('suggestionDisplay').innerText = getRandomMessage();
    document.getElementById('levelDisplay').innerText = `幸运指数：${level}`;
    // 获取随机祝福语
    const message = getRandomMessage();
    document.getElementById('suggestionDisplay').innerText = message;

    // 自动播放祝福语
    speakMessage(message);
    setScoreHighlight(score);

    document.getElementById('result').classList.remove('hidden');
    

}

/**
 * 设置评分高亮
 * @param {number} score - 评分
 */
function setScoreHighlight(score) {
    const scoreDisplay = document.getElementById('scoreDisplay');
    scoreDisplay.className = 'highlight-score'; // 重置类名

    if (score >= 90) {
        scoreDisplay.classList.add('high');
    } else if (score >= 70) {
        scoreDisplay.classList.add('mid');
    } else {
        scoreDisplay.classList.add('low');
    }
}



// 监听按下回车键
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('phoneTail');
    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // 防止表单提交
            evaluateValue();
        }
    });

    // 监听按钮点击事件
    document.querySelector('button').addEventListener('click', function() {
        evaluateValue();
    });
});


