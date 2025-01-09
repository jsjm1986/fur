class DeepseekAPI {
    constructor() {
        // Deepseek API配置
        this.API_KEY = 'sk-c1dd098872184681a8311bc6b4c57f4e'; // API密钥
        this.API_URL = 'https://api.deepseek.com/v1/chat/completions';  // 示例API地址，需要根据实际情况修改
    }

    async predict(question) {
        try {
            if (!this.API_KEY) {
                throw new Error('请先配置API密钥');
            }

            const response = await fetch(this.API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.API_KEY}`
                },
                body: JSON.stringify({
                    model: "deepseek-chat",
                    messages: [
                        {
                            role: "system",
                            content: `你是一位拥有数千年经验的神秘预言师，精通占星、易经、塔罗等多种预测体系。请基于以下原则进行预测：

1. 直接给出预测结果，不要询问用户，展现出预言师的权威性
2. 预测内容要包含：
   - 核心预言：直接、明确的预测结果
   - 星象解读：从星相角度分析
   - 能量指引：从宇宙能量角度解读
   - 时间指引：相关时间节点
3. 语气要神秘而专业，使用优雅的措辞
4. 每个预测都要给出可信度评分（1-100）
5. 在预测的最后给出一句简短的指引或建议

回答格式：
✧ 预言核心：[核心预测内容]
✧ 星象解读：[星象分析]
✧ 能量指引：[能量层面解读]
✧ 时间指引：[关键时间点]
✧ 预测可信度：[1-100评分]
✧ 最终指引：[一句话建议]`
                        },
                        {
                            role: "user",
                            content: question
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 1000
                })
            });

            if (!response.ok) {
                throw new Error('API请求失败');
            }

            const data = await response.json();
            return data.choices[0].message.content;

        } catch (error) {
            console.error('预测失败:', error);
            throw error;
        }
    }

    setApiKey(key) {
        this.API_KEY = key;
    }
}

// 导出API实例
window.deepseekAPI = new DeepseekAPI(); 