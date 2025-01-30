// tts.js

// 获取祝福语元素
const suggestionElement = document.getElementById('suggestionDisplay');

// 获取按钮元素
const playTTSButton = document.getElementById('playTTSButton');

// 添加点击事件监听器
playTTSButton.addEventListener('click', function() {
    // 获取祝福语的文本内容
    const message = suggestionElement.innerText;

    // 调用浏览器的TTS功能播放祝福语
    speakMessage(message);
});

/**
 * 使用浏览器自带的TTS功能将文本转换为语音
 * @param {string} message - 需要播放的文本内容
 */
function speakMessage(message) {
    // 创建一个新的SpeechSynthesisUtterance实例
    const utterance = new SpeechSynthesisUtterance(message);

    // 设置语言（根据需要可以设置为其他语言）
    utterance.lang = 'zh-CN';

    // 调整语速（1.0是默认速度）
    utterance.rate = 1.0;

    // 调整音调（1.0是默认音调）
    utterance.pitch = 1.0;

    // 调用浏览器的语音合成功能播放语音
    window.speechSynthesis.speak(utterance);
}

function speakMessage(message) {
    window.speechSynthesis.cancel(); // 取消当前播放的语音
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = 'zh-CN';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
}