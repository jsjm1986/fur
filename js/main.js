document.addEventListener('DOMContentLoaded', () => {
    // 获取DOM元素
    const questionInput = document.getElementById('questionInput');
    const predictBtn = document.getElementById('predictBtn');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const resultBox = document.getElementById('resultBox');
    const predictionResult = document.getElementById('predictionResult');
    const predictionSteps = document.querySelector('.prediction-steps');

    // 创建欢迎弹窗
    const createWelcomeDialog = () => {
        return new Promise((resolve) => {
            const dialog = document.createElement('div');
            dialog.className = 'mystic-dialog welcome-dialog';
            dialog.innerHTML = `
                <div class="mystic-dialog-content">
                    <div class="dialog-header">
                        <h3>✧ 欢迎来到神秘预言空间 ✧</h3>
                    </div>
                    <div class="dialog-body">
                        <div class="welcome-content">
                            <div class="welcome-icon">🔮</div>
                            <p class="welcome-title">未来预测机</p>
                            <div class="welcome-description">
                                <p>这是一个融合了先进AI技术与神秘学的预言系统</p>
                                <div class="feature-list">
                                    <div class="feature-item">
                                        <span class="feature-icon">🌟</span>
                                        <span>精准预测未来走向</span>
                                    </div>
                                    <div class="feature-item">
                                        <span class="feature-icon">🎯</span>
                                        <span>多维度分析解读</span>
                                    </div>
                                    <div class="feature-item">
                                        <span class="feature-icon">⚡</span>
                                        <span>即时能量反馈</span>
                                    </div>
                                    <div class="feature-item">
                                        <span class="feature-icon">🔍</span>
                                        <span>深度洞察指引</span>
                                    </div>
                                </div>
                            </div>
                            <div class="welcome-notice">
                                <p>注意：每次预测都需要验证码</p>
                                <p>添加微信号获取验证码：<span class="highlight">livehousevip</span></p>
                            </div>
                        </div>
                    </div>
                    <div class="dialog-footer">
                        <button class="mystic-button welcome-button">进入预言空间</button>
                    </div>
                </div>
            `;
            document.body.appendChild(dialog);

            // 添加动画类
            setTimeout(() => dialog.classList.add('show'), 10);

            // 点击确认按钮
            const confirmBtn = dialog.querySelector('.welcome-button');
            confirmBtn.addEventListener('click', () => {
                dialog.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(dialog);
                    resolve();
                }, 300);
            });
        });
    };

    // 创建提示对话框
    const createMysticDialog = () => {
        return new Promise((resolve, reject) => {
            const dialog = document.createElement('div');
            dialog.className = 'mystic-dialog';
            dialog.innerHTML = `
                <div class="mystic-dialog-content">
                    <div class="dialog-header">
                        <h3>✧ 神秘预言启示 ✧</h3>
                    </div>
                    <div class="dialog-body">
                        <p>尊敬的访客，在开启预言之前，请您留意：</p>
                        <ul>
                            <li>🌟 预言将揭示命运的轨迹，但未来始终掌握在您手中</li>
                            <li>🌙 保持内心平静，静候神秘力量的指引</li>
                            <li>⭐ 预测过程中请勿打断，以免影响能量的传递</li>
                            <li>✨ 记住，每个预言都是独特的时空印记</li>
                        </ul>
                    </div>
                    <div class="dialog-footer">
                        <button class="mystic-button">我已了解，开始预言</button>
                    </div>
                </div>
            `;
            document.body.appendChild(dialog);

            // 添加动画类
            setTimeout(() => dialog.classList.add('show'), 10);

            // 点击确认按钮
            const confirmBtn = dialog.querySelector('.mystic-button');
            confirmBtn.addEventListener('click', () => {
                // 创建验证码对话框
                const verifyDialog = document.createElement('div');
                verifyDialog.className = 'mystic-dialog verify-dialog';
                verifyDialog.innerHTML = `
                    <div class="mystic-dialog-content">
                        <div class="dialog-header">
                            <h3>✧ 能量验证 ✧</h3>
                        </div>
                        <div class="dialog-body">
                            <p>请输入神秘验证码以确认您的预言资格</p>
                            <div class="verify-notice">
                                <p>添加微信号获取验证码：</p>
                                <div class="wechat-id">livehousevip</div>
                                <div class="notice-divider">
                                    <span>✧</span>
                                </div>
                            </div>
                            <div class="verify-input-container">
                                <input type="text" class="verify-input" placeholder="请输入验证码">
                                <div class="verify-error hidden">验证码错误，请重新输入</div>
                            </div>
                        </div>
                        <div class="dialog-footer">
                            <button class="mystic-button verify-button">确认验证</button>
                        </div>
                    </div>
                `;

                // 移除第一个对话框
                dialog.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(dialog);
                    // 显示验证码对话框
                    document.body.appendChild(verifyDialog);
                    setTimeout(() => verifyDialog.classList.add('show'), 10);

                    // 验证码确认按钮点击事件
                    const verifyBtn = verifyDialog.querySelector('.verify-button');
                    const verifyInput = verifyDialog.querySelector('.verify-input');
                    const verifyError = verifyDialog.querySelector('.verify-error');

                    verifyBtn.addEventListener('click', () => {
                        if (verifyInput.value === 'aasdad34') {
                            verifyDialog.classList.remove('show');
                            setTimeout(() => {
                                document.body.removeChild(verifyDialog);
                                resolve();
                            }, 300);
                        } else {
                            verifyError.classList.remove('hidden');
                            verifyInput.value = '';
                            verifyInput.focus();
                        }
                    });

                    // 输入框回车事件
                    verifyInput.addEventListener('keypress', (e) => {
                        if (e.key === 'Enter') {
                            verifyBtn.click();
                        }
                    });

                    // 输入框获得焦点时隐藏错误提示
                    verifyInput.addEventListener('focus', () => {
                        verifyError.classList.add('hidden');
                    });
                }, 300);
            });
        });
    };

    // 初始化按钮粒子效果
    const initButtonParticles = () => {
        const button = document.querySelector('.predict-button');
        button.addEventListener('mousemove', (e) => {
            const particles = button.querySelector('.button-particles');
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            particles.style.setProperty('--x', `${x}px`);
            particles.style.setProperty('--y', `${y}px`);
        });
    };

    // 重置预测步骤动画
    const resetPredictionSteps = () => {
        const steps = predictionSteps.querySelectorAll('.step');
        steps.forEach(step => {
            step.style.animation = 'none';
            step.offsetHeight; // 触发重排
            step.style.animation = null;
        });
    };

    // 添加打字机效果
    const typeWriter = (element, text, speed = 50) => {
        return new Promise(resolve => {
            let i = 0;
            element.textContent = '';
            const timer = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(timer);
                    resolve();
                }
            }, speed);
        });
    };

    // 检查是否已配置API密钥
    const checkApiKey = () => {
        if (!deepseekAPI.API_KEY) {
            const key = prompt('请输入您的Deepseek API密钥：');
            if (key) {
                deepseekAPI.setApiKey(key);
                localStorage.setItem('deepseek_api_key', key);
            }
        }
    };

    // 从localStorage加载API密钥
    const savedApiKey = localStorage.getItem('deepseek_api_key');
    if (savedApiKey) {
        deepseekAPI.setApiKey(savedApiKey);
    }

    // 显示加载动画
    const showLoading = (show) => {
        loadingIndicator.classList.toggle('hidden', !show);
        predictBtn.disabled = show;
        if (show) {
            resetPredictionSteps();
        }
    };

    // 显示预测结果
    const showResult = async (result) => {
        resultBox.classList.remove('hidden');
        // 使用打字机效果显示结果
        await typeWriter(predictionResult, result);
        
        // 显示符文
        const runes = resultBox.querySelectorAll('.rune');
        runes.forEach((rune, index) => {
            setTimeout(() => {
                rune.style.opacity = '1';
            }, index * 300);
        });
    };

    // 处理预测按钮点击事件
    predictBtn.addEventListener('click', async () => {
        const question = questionInput.value.trim();
        
        if (!question) {
            alert('请输入要预测的问题');
            return;
        }

        try {
            checkApiKey();
            if (!deepseekAPI.API_KEY) {
                alert('需要配置API密钥才能使用预测功能');
                return;
            }

            // 显示神秘提示
            await createMysticDialog();

            showLoading(true);
            resultBox.classList.add('hidden');

            // 模拟预测过程的延迟
            const result = await new Promise((resolve) => {
                setTimeout(async () => {
                    const response = await deepseekAPI.predict(question);
                    resolve(response);
                }, 8000); // 给足时间显示预测步骤动画
            });

            showResult(result);

        } catch (error) {
            alert('预测失败：' + error.message);
        } finally {
            showLoading(false);
        }
    });

    // 添加输入框回车键支持
    questionInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            predictBtn.click();
        }
    });

    // 初始化
    const init = async () => {
        // 显示欢迎弹窗
        await createWelcomeDialog();
        // 初始化按钮粒子效果
        initButtonParticles();
    };

    init();
}); 