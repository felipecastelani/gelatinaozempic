import { screens } from './screens.js';

/*
|--------------------------------------------------------------------------
| LINKS EDITAVEIS
|--------------------------------------------------------------------------
| Altere o link abaixo sempre que quiser trocar o checkout da CTA final.
*/
const CTA_FINAL_CHECKOUT_URL = 'https://pay.hotmart.com/V105068067A?checkoutMode=10';

class QuizApp {
    constructor() {
        this.currentScreenIndex = 0;
        
        // Elementos DOM
        this.appContent = document.getElementById('app-content');
        this.appHeader = document.getElementById('app-header');
        this.progressBar = document.getElementById('progress-bar');
        this.btnBack = document.getElementById('btn-back');
        
        this.init();
    }

    init() {
        // Event listeners globais
        this.btnBack.addEventListener('click', () => this.navigateBack());
        
        // Iniciar renderização da primeira tela
        this.renderCurrentScreen();
    }

    renderCurrentScreen() {
        // Garantir que o index é válido
        if (this.currentScreenIndex < 0 || this.currentScreenIndex >= screens.length) {
            console.error('Índice de tela inválido.');
            return;
        }

        const screenConfig = screens[this.currentScreenIndex];
        
        // Controle da Header
        if (screenConfig.hasHeader) {
            this.appHeader.classList.remove('hidden');
            this.updateProgressBar();
        } else {
            this.appHeader.classList.add('hidden');
        }

        // Limpar o conteúdo atual
        this.appContent.innerHTML = '';

        // Gerar o HTML da tela dinamicamente (Mockup Estrutural)
        // Isso facilita a manutenção. Componentes mais complexos podem ter suas próprias classes de renderização no futuro.
        const screenEl = document.createElement('div');
        screenEl.className = 'screen-container';
        screenEl.id = screenConfig.id;

        // Processar variáveis dinâmicas no título e subtítulo
        const userName = window.quizUserName || 'Amiga';
        const replaceVars = (text) => text ? text.replace(/\{\{NomeDoLead\}\}/g, userName) : '';
        
        const dynTitle = replaceVars(screenConfig.title);
        const dynSubtitle = replaceVars(screenConfig.subtitle);

        // Estrutura dinâmica baseada no tipo de tela
        let contentHtml = '';
        
        if (screenConfig.type === 'start') {
            contentHtml = `
                <div class="screen-start">
                    <img src="midia/start/GelatinaOzempic-Logo.png" alt="Gelatina Ozempic Logo" class="start-logo">
                    <img src="midia/start/Gelatina-Ozempic-Banner-Quadrado.png" alt="Gelatina Ozempic" class="start-banner">
                    
                    <h2 class="start-headline">Descubre cómo activar tu metabolismo y perder hasta <span class="text-highlight">12kg en 30 días</span> con la <span class="text-highlight">¡Gelatina Ozempic!</span></h2>
                    
                    <div class="action-container" style="width: 100%;">
                        <button class="btn btn-magic btn-next">¡Quiero saber si funciona para mí! 🔥</button>
                        
                        <div class="start-social-proof">
                            <span>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                227.000+ mujeres
                            </span>
                            <span>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>
                                100% Natural
                            </span>
                            <span>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                                Productos que tienes en casa
                            </span>
                        </div>
                    </div>
                </div>
            `;
        } else if (screenConfig.type === 'confirmation') {
            const imgHtml = screenConfig.image ? `<img src="${screenConfig.image}" alt="Gelatina Ozempic" class="conf-image">` : '';
            const subtitleHtml = dynSubtitle ? `<p class="screen-subtitle" style="margin-bottom: var(--spacing-xl);">${dynSubtitle}</p>` : '';
            const btnText = screenConfig.buttonText || 'Continuar';
            
            contentHtml = `
                <div class="screen-confirmation">
                    ${imgHtml}
                    <h1 class="screen-title" style="margin-bottom: var(--spacing-sm);">${dynTitle}</h1>
                    ${subtitleHtml}
                    
                    <div class="action-container" style="width: 100%;">
                        <button class="btn btn-next">${btnText}</button>
                    </div>
                </div>
            `;
        } else if (screenConfig.type === 'news') {
            const subtitleHtml = dynSubtitle ? `<p class="screen-subtitle" style="margin-bottom: var(--spacing-md);">${dynSubtitle}</p>` : '';
            const btnText = screenConfig.buttonText || 'Continuar';
            
            contentHtml = `
                <div class="screen-news" style="display: flex; flex-direction: column; flex-grow: 1; width: 100%; animation: fadeIn 0.3s ease-out;">
                    <h1 class="screen-title" style="margin-bottom: var(--spacing-sm); text-align: center;">${dynTitle}</h1>
                    ${subtitleHtml}
                    
                    <div class="news-image-container">
                        <img src="${screenConfig.image}" alt="Notícia" class="news-image">
                    </div>
                    
                    <div class="action-container" style="width: 100%; margin-top: auto; padding-top: var(--spacing-sm);">
                        <button class="btn btn-magic btn-next">${btnText}</button>
                    </div>
                </div>
            `;
        } else if (screenConfig.type === 'question') {
            const subtitleHtml = dynSubtitle ? `<p class="screen-subtitle">${dynSubtitle}</p>` : '';
            
            let optionsHtml = '<div class="q-options-container">';
            if (screenConfig.options && screenConfig.options.length > 0) {
                screenConfig.options.forEach((opt, index) => {
                    const descHtml = opt.description ? `<span class="q-option-subtext" style="display: block; font-size: 0.85rem; color: var(--text-muted); margin-top: 2px; font-weight: normal;">${replaceVars(opt.description)}</span>` : '';
                    optionsHtml += `
                        <button class="q-option-btn" data-index="${index}">
                            <div class="q-option-left" style="text-align: left; flex-grow: 1;">
                                <span class="q-option-emoji">${opt.emoji}</span>
                                <div class="q-option-texts" style="display: flex; flex-direction: column;">
                                    <span class="q-option-text">${replaceVars(opt.label)}</span>
                                    ${descHtml}
                                </div>
                            </div>
                            <svg class="q-option-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0;"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </button>
                    `;
                });
            }
            optionsHtml += '</div>';

            contentHtml = `
                <div class="screen-question">
                    <h1 class="screen-title">${dynTitle}</h1>
                    ${subtitleHtml}
                    ${optionsHtml}
                </div>
            `;
        } else if (screenConfig.type === 'question_grid') {
            const subtitleHtml = dynSubtitle ? `<p class="screen-subtitle">${dynSubtitle}</p>` : '';
            
            let optionsHtml = '<div class="q-grid-container">';
            if (screenConfig.options && screenConfig.options.length > 0) {
                screenConfig.options.forEach((opt, index) => {
                    optionsHtml += `
                        <button class="q-grid-btn q-option-btn-generic" data-index="${index}" style="background-image: url('${opt.image}');">
                            <div class="q-grid-overlay">
                                <span class="q-grid-text">${replaceVars(opt.label)}</span>
                                <svg class="q-grid-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </div>
                        </button>
                    `;
                });
            }
            optionsHtml += '</div>';

            contentHtml = `
                <div class="screen-question">
                    <h1 class="screen-title" style="margin-bottom: 8px;">${dynTitle}</h1>
                    ${subtitleHtml}
                    ${optionsHtml}
                </div>
            `;
        } else if (screenConfig.type === 'question_image_side') {
            const subtitleHtml = dynSubtitle ? `<p class="screen-subtitle">${dynSubtitle}</p>` : '';
            
            let optionsHtml = '<div class="q-side-options">';
            if (screenConfig.options && screenConfig.options.length > 0) {
                screenConfig.options.forEach((opt, index) => {
                    optionsHtml += `
                        <button class="q-side-btn q-option-btn-multi" data-index="${index}">
                            <div class="q-option-left">
                                <div class="q-checkbox">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                </div>
                                <span class="q-side-emoji">${opt.emoji}</span>
                                <span class="q-side-text">${replaceVars(opt.label)}</span>
                            </div>
                        </button>
                    `;
                });
            }
            optionsHtml += '</div>';

            contentHtml = `
                <div class="screen-question">
                    <h1 class="screen-title" style="margin-bottom: 8px;">${dynTitle}</h1>
                    ${subtitleHtml}
                    <div class="q-side-container">
                        <div class="q-side-image-wrapper">
                            <img src="${screenConfig.image}" alt="Modelo" class="q-side-image">
                        </div>
                        ${optionsHtml}
                    </div>
                    <div class="action-container btn-continue-container hidden" style="width: 100%; padding-top: var(--spacing-md);">
                        <button class="btn btn-magic btn-next">Continuar 🔥</button>
                    </div>
                </div>
            `;
        } else if (screenConfig.type === 'question_multi') {
            const subtitleHtml = dynSubtitle ? `<p class="screen-subtitle">${dynSubtitle}</p>` : '';
            
            let optionsHtml = '<div class="q-options-container">';
            if (screenConfig.options && screenConfig.options.length > 0) {
                screenConfig.options.forEach((opt, index) => {
                    optionsHtml += `
                        <button class="q-side-btn q-option-btn-multi" data-index="${index}" style="padding: 16px var(--spacing-md); border-radius: 14px;">
                            <div class="q-option-left">
                                <div class="q-checkbox">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                </div>
                                <span class="q-option-emoji" style="font-size: 1.6rem; margin-right: 16px;">${opt.emoji}</span>
                                <span class="q-option-text" style="font-size: 1.05rem;">${replaceVars(opt.label)}</span>
                            </div>
                        </button>
                    `;
                });
            }
            optionsHtml += '</div>';

            contentHtml = `
                <div class="screen-question">
                    <h1 class="screen-title" style="margin-bottom: 8px;">${dynTitle}</h1>
                    ${subtitleHtml}
                    ${optionsHtml}
                    <div class="action-container btn-continue-container hidden" style="width: 100%; padding-top: var(--spacing-md);">
                        <button class="btn btn-magic btn-next">Continuar 🔥</button>
                    </div>
                </div>
            `;
        } else if (screenConfig.type === 'input_name') {
            const subtitleHtml = dynSubtitle ? `<p class="screen-subtitle">${dynSubtitle}</p>` : '';
            const btnText = screenConfig.buttonText || 'Continuar';
            
            contentHtml = `
                <div class="screen-input" style="flex-grow: 1; display: flex; flex-direction: column;">
                    <h1 class="screen-title" style="margin-bottom: 8px;">${dynTitle}</h1>
                    ${subtitleHtml}
                    
                    <div style="width: 100%; position: relative;">
                        <input type="text" id="name-input" class="input-field" placeholder="Escribe tu nombre" autocomplete="given-name" />
                        <p id="name-error" class="error-text hidden">Por favor, escribe tu nombre correctamente.</p>
                    </div>
                    
                    <div class="action-container" style="width: 100%; margin-top: auto; padding-top: var(--spacing-xl);">
                        <button class="btn btn-magic btn-submit-name">${btnText}</button>
                    </div>
                </div>
            `;
        } else if (['selector_weight', 'selector_height', 'selector_target_weight'].includes(screenConfig.type)) {
            const isHeight = screenConfig.type === 'selector_height';
            const isTarget = screenConfig.type === 'selector_target_weight';
            
            const min = isHeight ? 140 : 45;
            const max = isHeight ? 200 : 150;
            const defaultValue = isHeight ? 165 : (isTarget ? (window.quizUserWeight ? window.quizUserWeight - 10 : 65) : 75);
            const unit = isHeight ? 'cm' : 'kg';
            const subtitleHtml = dynSubtitle ? `<p class="screen-subtitle">${dynSubtitle}</p>` : '';

            let targetLossHtml = '';
            if (isTarget) {
                targetLossHtml = `
                    <div class="target-loss-container hidden" id="target-loss-box">
                        <span class="loss-emoji">🔥</span>
                        <div class="loss-text">Vas a perder: <strong id="loss-amount">0kg</strong></div>
                    </div>
                `;
            }

            contentHtml = `
                <div class="screen-selector" style="flex-grow: 1; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; animation: fadeIn 0.4s ease-out; width: 100%;">
                    <h1 class="screen-title" style="margin-bottom: 8px;">${dynTitle}</h1>
                    ${subtitleHtml}

                    <div class="selector-display-wrapper">
                        <span class="selector-value" id="selector-val">${Math.max(min, Math.min(max, defaultValue))}</span>
                        <span class="selector-unit">${unit}</span>
                    </div>
                    
                    <div class="selector-slider-wrapper">
                        <input type="range" class="styled-slider" id="selector-slider" min="${min}" max="${max}" value="${Math.max(min, Math.min(max, defaultValue))}">
                    </div>

                    ${targetLossHtml}

                    <div class="action-container" style="width: 100%; margin-top: auto; padding-top: var(--spacing-xl);">
                        <button class="btn btn-magic btn-next">Continuar ✓</button>
                    </div>
                </div>
            `;
        } else if (screenConfig.type === 'objective_display') {
            const weightSelected = window.quizUserWeight || 75;
            const targetWeightSelected = window.quizUserTargetWeight || 65;
            const lossSelected = Math.max(0, weightSelected - targetWeightSelected);

            contentHtml = `
                <div class="screen-objective-display" style="flex-grow: 1; display: flex; flex-direction: column; align-items: center; width: 100%; animation: fadeIn 0.4s ease-out;">
                    <img src="midia/tela-15/GelatinaResultado.png" alt="Resultado" class="objective-image" style="width: 100%; max-height: 250px; object-fit: cover; border-radius: 16px; margin-bottom: var(--spacing-xl); box-shadow: 0 6px 15px rgba(0,0,0,0.08);">
                    
                    <div class="objective-box" style="background: linear-gradient(145deg, #f8f9fa 0%, #f4effa 100%); border-radius: 16px; padding: var(--spacing-lg); width: 100%; box-shadow: 0 8px 20px rgba(0,0,0,0.04); border: 1px solid #e9ecef; text-align: center;">
                        <h2 class="objective-headline" style="font-size: 1.3rem; font-weight: 800; color: var(--text-color); margin-bottom: var(--spacing-md); line-height: 1.3;">¡Ese es un excelente objetivo, <span class="highlight-purple" style="color: #7b1fa2;">${userName}</span>! 💜</h2>
                        
                        <p class="objective-subtext1" style="font-size: 1.1rem; color: var(--text-color); margin-bottom: var(--spacing-md); background-color: white; padding: 12px; border-radius: 12px; box-shadow: 0 2px 5px rgba(0,0,0,0.02);">
                            <strong>Meta:</strong> ${weightSelected}kg ➔ ${targetWeightSelected}kg <span class="highlight-purple" style="color: #7b1fa2;">(-${lossSelected}kg)</span>
                        </p>
                        
                        <p class="objective-subtext2" style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.5;">
                            Ahora vamos a ajustar el próximo paso para que empieces a notar la diferencia <strong class="highlight-purple" style="color: #7b1fa2;">desde los primeros días.</strong>
                        </p>
                    </div>

                    <div class="action-container" style="width: 100%; margin-top: auto; padding-top: var(--spacing-xl);">
                        <button class="btn btn-magic btn-next">Ok, ¡vamos! 🚀</button>
                    </div>
                </div>
            `;
        } else if (screenConfig.type === 'result') {
            const weight = window.quizUserWeight || 75;
            const heightCm = window.quizUserHeight || 165;
            const heightM = heightCm / 100;
            const imc = weight / (heightM * heightM);
            const imcFormatted = imc.toFixed(1);
            
            let imcStatus = '';
            let statusColorClass = 'text-red'; 
            if (imc < 18.5) {
                imcStatus = 'Bajo peso';
                statusColorClass = 'text-orange';
            } else if (imc < 25) {
                imcStatus = 'Peso normal';
                statusColorClass = 'text-green';
            } else if (imc < 30) {
                imcStatus = 'Sobrepeso';
                statusColorClass = 'text-red';
            } else {
                imcStatus = 'Obesidad';
                statusColorClass = 'text-red';
            }

            contentHtml = `
                <div class="screen-result" style="flex-grow: 1; display: flex; flex-direction: column; width: 100%; animation: fadeIn 0.4s ease-out;">
                    <h1 class="result-main-title">Resultado de tu análisis, <span class="highlight-purple">${userName}</span></h1>
                    
                    <div class="imc-card">
                        <div class="imc-number highlight-purple">${imcFormatted}</div>
                        <div class="imc-status">Tu IMC: <span class="${statusColorClass} font-bold">${imcStatus}</span></div>
                        
                        <hr class="imc-divider">
                        
                        <div class="imc-warnings">
                            <h3 class="warnings-title">⚠️ Señales de alerta identificadas:</h3>
                            <ul class="warnings-list">
                                <li><span class="warning-icon">❌</span> Metabolismo lento</li>
                                <li><span class="warning-icon">❌</span> Riesgo de acumulación de grasa visceral</li>
                                <li><span class="warning-icon">❌</span> Hormonas de saciedad desreguladas</li>
                            </ul>
                        </div>
                    </div>

                    <div class="benefit-highlight-box">
                        🌿 El secreto para adelgazar: activar el GLP-1. ¡La Gelatina Ozempic es el 'interruptor' hormonal natural!
                    </div>

                    <h2 class="benefits-section-title">Beneficios de la <span class="highlight-purple">Gelatina Ozempic👇</span></h2>
                    
                    <div class="benefits-grid">
                        <div class="benefit-tag"><span class="benefit-check">✓</span> Receta 100% Natural</div>
                        <div class="benefit-tag"><span class="benefit-check">✓</span> Activa el GLP-1 de tu cuerpo</div>
                        <div class="benefit-tag"><span class="benefit-check">✓</span> Quema de Grasa localizada</div>
                        <div class="benefit-tag"><span class="benefit-check">✓</span> Regula tu Metabolismo</div>
                        <div class="benefit-tag"><span class="benefit-check">✓</span> Ligereza y cuerpo desinflamado</div>
                        <div class="benefit-tag"><span class="benefit-check">✓</span> Menos antojos de dulces</div>
                        <div class="benefit-tag"><span class="benefit-check">✓</span> Fácil de preparar y seguir</div>
                    </div>

                    <div class="social-proof-card">
                        <img src="midia/tela-20/Depoimentotela-20.png" alt="Antes y Después" class="social-proof-image">
                        <div class="social-proof-text">¡Perdí 12kg en 5 semanas!</div>
                        <div class="social-proof-subtext">María, 32 años - Ciudad de México</div>
                        <div class="social-proof-rating">★★★★★</div>
                    </div>

                    <div class="action-container" style="width: 100%; margin-top: auto; padding-top: var(--spacing-xl);">
                        <button class="btn btn-magic btn-next">Continuar</button>
                    </div>
                </div>
            `;
        } else if (screenConfig.type === 'info') {
            contentHtml = `
                <div class="screen-info" style="flex-grow: 1; display: flex; flex-direction: column; width: 100%; animation: fadeIn 0.4s ease-out;">
                    <h1 class="info-main-title">Cómo usar la <span class="highlight-purple">Gelatina Ozempic</span></h1>
                    <p class="info-subtext">Simple, práctico y eficaz</p>

                    <img src="midia/tela-21/mulher_gelatina_calendario-CcxgGxU0.png" alt="Cómo usar la Gelatina Ozempic" class="info-image">

                    <div class="info-instructions-card">
                        <div class="instruction-item">
                            <div class="instruction-number num-orange">1</div>
                            <div class="instruction-text-group">
                                <h3 class="instruction-title">Prepara la gelatina</h3>
                                <p class="instruction-doc">Receta simple de la app</p>
                            </div>
                            <div class="instruction-icon">✨</div>
                        </div>
                        
                        <div class="instruction-item">
                            <div class="instruction-number num-purple">2</div>
                            <div class="instruction-text-group">
                                <h3 class="instruction-title">Consúmela 2x al día</h3>
                                <p class="instruction-doc">Por la mañana y antes de dormir</p>
                            </div>
                            <div class="instruction-icon">🕒</div>
                        </div>
                        
                        <div class="instruction-item">
                            <div class="instruction-number num-green">3</div>
                            <div class="instruction-text-group">
                                <h3 class="instruction-title">Síguelo por 30 días</h3>
                                <p class="instruction-doc">Protocolo completo</p>
                            </div>
                            <div class="instruction-icon">📅</div>
                        </div>
                    </div>

                    <div class="info-routine-line">
                        <div class="routine-progress-line"></div>
                        <div class="routine-steps">
                            <div class="routine-step">
                                <div class="routine-icon">☀️</div>
                                <div class="routine-time">Mañana</div>
                                <div class="routine-desc">En ayuno</div>
                            </div>
                            <div class="routine-step">
                                <div class="routine-icon">✨</div>
                                <div class="routine-time">Día</div>
                                <div class="routine-desc">Sin hambre</div>
                            </div>
                            <div class="routine-step">
                                <div class="routine-icon">🌙</div>
                                <div class="routine-time">Noche</div>
                                <div class="routine-desc">Antes de dormir</div>
                            </div>
                        </div>
                    </div>

                    <div class="action-container" style="width: 100%; margin-top: auto; padding-top: var(--spacing-xl);">
                        <button class="btn btn-magic btn-next">✅ ¡Sí, me comprometo!</button>
                    </div>
                </div>
            `;
        } else if (screenConfig.type === 'commitment') {
            let optionsHtml = '<div class="q-options-container" style="margin-top: var(--spacing-lg);">';
            if (screenConfig.options && screenConfig.options.length > 0) {
                screenConfig.options.forEach((opt, index) => {
                    optionsHtml += `
                        <button class="q-option-btn" data-index="${index}">
                            <div class="q-option-left" style="text-align: left; flex-grow: 1;">
                                <span class="q-option-emoji">${opt.emoji}</span>
                                <div class="q-option-texts" style="display: flex; flex-direction: column;">
                                    <span class="q-option-text">${replaceVars(opt.label)}</span>
                                </div>
                            </div>
                            <svg class="q-option-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0;"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </button>
                    `;
                });
            }
            optionsHtml += '</div>';

            contentHtml = `
                <div class="screen-commitment" style="flex-grow: 1; display: flex; flex-direction: column; width: 100%; animation: fadeIn 0.4s ease-out;">
                    <div class="commitment-image-wrapper">
                        <img src="midia/tela-22/AntesEDepoisEmVetor.png" alt="Antes y Después" class="commitment-image">
                        <div class="commitment-badge">🔒 PARA LIBERAR TU PLAN, NECESITO SABER:</div>
                    </div>
                    
                    <h1 class="screen-title" style="margin-top: var(--spacing-md); text-align: center; font-size: 1.3rem;">${dynTitle}</h1>
                    
                    ${optionsHtml}
                </div>
            `;
        } else if (screenConfig.type === 'loading_circular') {
            contentHtml = `
                <div class="screen-loading-circular" style="flex-grow: 1; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; width: 100%; animation: fadeIn 0.4s ease-out; padding: var(--spacing-xl) 0;">
                    
                    <div class="circular-progress-container" style="width: 140px; height: 140px; margin-bottom: var(--spacing-md);">
                        <svg class="circular-progress" viewBox="0 0 100 100">
                            <circle class="bg" cx="50" cy="50" r="45"></circle>
                            <circle class="progress" cx="50" cy="50" r="45" id="circle-progress"></circle>
                        </svg>
                        <div class="circular-percentage" id="circle-perc" style="font-size: 1.8rem;">0%</div>
                    </div>
                    
                    <div class="loading-status-list" id="loading-texts" style="margin-top: var(--spacing-sm);">
                        <div class="status-item active">🔍 Analizando tus respuestas...</div>
                        <div class="status-item">⏱️ Calculando tu metabolismo basal...</div>
                        <div class="status-item">🧬 Verificando perfil hormonal...</div>
                        <div class="status-item">🧍‍♀️ Evaluando tu perfil corporal...</div>
                        <div class="status-item">📊 Procesando datos de salud...</div>
                        <div class="status-item">✅ ¡Análisis concluido con éxito!</div>
                    </div>
                </div>
            `;
        } else if (screenConfig.type === 'dart_confirmation') {
            const lossMin = window.quizUserTargetWeight && window.quizUserWeight ? Math.max(1, window.quizUserWeight - window.quizUserTargetWeight) : 8;
            const lossMax = lossMin + 4;
            const userLossStr = `${lossMin} y ${lossMax}`;
            
            contentHtml = `
                <div class="screen-dart" style="flex-grow: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; animation: fadeIn 0.4s ease-out; text-align: center;">
                    <div style="font-size: 6rem; margin-bottom: var(--spacing-lg); animation: pulseMagic 2s infinite;">🎯</div>
                    
                    <h1 class="screen-title" style="font-size: 1.5rem; line-height: 1.3;">
                        <span class="highlight-purple">${userName}</span>, ¿te gustaría perder entre ${userLossStr} kilos en pocas semanas?
                    </h1>
                    
                    <p class="screen-subtitle" style="margin-top: var(--spacing-md); font-size: 1.05rem; margin-bottom: var(--spacing-xl);">
                        Basado en tu perfil, ¡este resultado es totalmente alcanzable con la Gelatina Ozempic!
                    </p>
                    
                    <div class="action-container" style="width: 100%;">
                        <button class="btn btn-magic btn-next" style="font-size: 1.2rem; padding: 18px;">¡SÍ! ¡Quiero empezar ya! 🔥</button>
                    </div>
                </div>
            `;
        } else if (screenConfig.type === 'testimonials') {
            const subtitleHtml = dynSubtitle ? `<p class="screen-subtitle">${dynSubtitle}</p>` : '';
            
            contentHtml = `
                <div class="screen-testimonials" style="flex-grow: 1; display: flex; flex-direction: column; width: 100%; animation: fadeIn 0.4s ease-out;">
                    <h1 class="screen-title" style="margin-bottom: 8px;">${dynTitle}</h1>
                    ${subtitleHtml}

                    <div class="testimonials-list" style="display: flex; flex-direction: column; gap: var(--spacing-lg); margin-bottom: var(--spacing-xl);">
                        
                        <div class="testimonial-card-full">
                            <img src="midia/tela-26/Depoimento1.png" alt="Testimonio 1" class="t-img-full">
                            <div class="t-content-full">
                                <h4>"Increíble... ¡Perdí 7kg en 3 semanas!"</h4>
                                <p>Giovanna, 34 - Buenos Aires</p>
                                <div class="t-stars">★★★★★</div>
                            </div>
                        </div>

                        <div class="testimonial-card-full">
                            <img src="midia/tela-26/Depoimento2.png" alt="Testimonio 2" class="t-img-full">
                            <div class="t-content-full">
                                <h4>"¡Mi barriga desapareció! ¡No lo puedo creer!"</h4>
                                <p>Sandra, 39 - Bogotá</p>
                                <div class="t-stars">★★★★★</div>
                            </div>
                        </div>

                        <div class="testimonial-card-full">
                            <img src="midia/tela-26/Depoimento3.png" alt="Testimonio 3" class="t-img-full">
                            <div class="t-content-full">
                                <h4>"¡Volví a usar mi ropa antigua!"</h4>
                                <p>Claudia, 35 - Lima</p>
                                <div class="t-stars">★★★★★</div>
                            </div>
                        </div>
                        
                        <div class="testimonial-card-full">
                            <img src="midia/tela-26/Depoimento4.png" alt="Testimonio 4" class="t-img-full">
                            <div class="t-content-full">
                                <h4>"Quien la usa tiene resultados 😍🙌"</h4>
                                <p>Patricia, 31 - Ciudad de México</p>
                                <div class="t-stars">★★★★★</div>
                            </div>
                        </div>
                    </div>

                    <div class="action-container" style="width: 100%; margin-top: auto; padding-top: var(--spacing-sm);">
                        <button class="btn btn-magic btn-next">Obtener mi protocolo 🌟</button>
                    </div>
                </div>
            `;
        } else if (screenConfig.type === 'loading_final') {
            contentHtml = `
                <div class="screen-loading-final" style="flex-grow: 1; display: flex; flex-direction: column; width: 100%; animation: fadeIn 0.4s ease-out;">
                    
                    <img src="midia/tela-30/GelatinaOzempic-PreCheckout.png" alt="Preparando tu protocolo" class="lf-banner">
                    
                    <div class="lf-checklist">
                        <div class="lf-check-item pending">
                            <div class="lf-check-icon spinner-mini"></div>
                            <span class="lf-check-text">Perfil metabólico analizado</span>
                        </div>
                        <div class="lf-check-item pending">
                            <div class="lf-check-icon spinner-mini"></div>
                            <span class="lf-check-text">Meta de peso calculada</span>
                        </div>
                        <div class="lf-check-item pending">
                            <div class="lf-check-icon spinner-mini"></div>
                            <span class="lf-check-text">Compatibilidad verificada</span>
                        </div>
                        <div class="lf-check-item pending">
                            <div class="lf-check-icon spinner-mini"></div>
                            <span class="lf-check-text">Protocolo de 30 días armado</span>
                        </div>
                        <div class="lf-check-item pending">
                            <div class="lf-check-icon spinner-mini"></div>
                            <span class="lf-check-text">Bonos exclusivos seleccionados</span>
                        </div>
                    </div>

                    <div style="margin-top: auto; padding-bottom: var(--spacing-md); width: 100%;">
                        <div class="lf-progress-container">
                            <div class="lf-progress-fill" id="lf-bar"></div>
                        </div>
                        
                        <p class="lf-waiting-text">Espera mientras finalizamos todo para ti...</p>
                    </div>
                </div>
            `;
        } else if (screenConfig.type === 'cta') {
            const valSemJuros = (5 / 6).toFixed(2).replace('.', ',');
            
            contentHtml = `
                <div class="screen-cta" style="flex-grow: 1; display: flex; flex-direction: column; width: 100%; animation: fadeIn 0.4s ease-out; padding-bottom: 2rem;">
                    
                    <div class="cta-header">
                        <div class="cta-check-icon">✓</div>
                        <h2 class="cta-header-title"><span class="highlight-purple">${userName}</span>, ¡tu<br>Plan de la Gelatina de 30 días fue Generado con Éxito!</h2>
                        <p class="cta-header-sub">Es exclusivo y se genera solo una vez, no salgas de esta página para no perderlo</p>
                    </div>

                    <img src="midia/cta/GelatinaOzempic-AntesEDepois.png" class="cta-transform-img" alt="Transformación">

                    <div class="cta-plan-card">
                        <h3 class="plan-title">TU PLAN EXCLUSIVO<br><span class="highlight-purple">1 Mes de Tratamiento 🎯</span></h3>
                        <p class="plan-sub">${userName}, siguiendo el protocolo al pie de la letra, mira lo que pasará:</p>
                        
                        <div class="plan-steps">
                            <div class="plan-step">
                                <div class="step-num">1</div>
                                <div class="step-text"><strong>Semana 1:</strong> Desinflamación y primeros resultados</div>
                            </div>
                            <div class="plan-step">
                                <div class="step-num">2</div>
                                <div class="step-text"><strong>Semana 2:</strong> Pérdida de hasta 3 kg</div>
                            </div>
                            <div class="plan-step">
                                <div class="step-num">3</div>
                                <div class="step-text"><strong>Semana 3:</strong> Pérdida de 5 a 7 kg</div>
                            </div>
                            <div class="plan-step final-step">
                                <div class="step-num">4</div>
                                <div class="step-text"><strong>Semana 4:</strong> Pérdida de 9 a 12 kg <span class="meta-badge">META</span></div>
                            </div>
                        </div>

                        <div class="plan-expected">
                            Resultado esperado:<br><strong>9 a 12 kg en 30 días</strong>
                        </div>
                    </div>

                    <div class="cta-offer-card">
                        <h3 class="offer-title">Gelatina Ozempic + APP Protocolo Completo<br><span class="badge-lifetime">ACCESO VITALICIO</span></h3>
                        <img src="midia/cta/MockupCelular.png" class="offer-product-img" alt="Produto">
                        
                        <ul class="offer-benefits">
                            <li><span class="chk">✓</span> Receta completa de la gelatina</li>
                            <li><span class="chk">✓</span> Protocolo de 30 días paso a paso</li>
                            <li><span class="chk">✓</span> Acceso a la app exclusiva</li>
                            <li><span class="chk">✓</span> Lista de ingredientes</li>
                            <li><span class="chk">✓</span> Tips para acelerar resultados</li>
                            <li><span class="chk">✓</span> Acceso vitalicio a la app</li>
                        </ul>
                        
                        <h4 class="bonus-title">🎁 Bonos Exclusivos:</h4>
                        <ul class="offer-benefits bonus-list">
                            <li><span class="chk">✓</span> Dietas completas</li>
                            <li><span class="chk">✓</span> Recetas dulces saludables</li>
                            <li><span class="chk">✓</span> Clases en video de pilates en la pared</li>
                        </ul>

                        <div class="offer-price-box">
                            <div class="old-price">De: 29.90 $ Dólares</div>
                            <div class="current-price">Por solo: <strong>5,00 $ Dólares</strong></div>
                            <div class="installments">O en 6 pagos de $ ${valSemJuros}</div>
                        </div>

                        <a class="btn btn-magic btn-buy" href="${CTA_FINAL_CHECKOUT_URL}" target="_blank" rel="noopener noreferrer">¡QUIERO EMPEZAR! 🥰</a>
                    </div>

                    <div class="cta-guarantee-card">
                        <img src="midia/cta/Garantia30D.png" class="guarantee-img" alt="Garantía de 30 días">
                        <h4>Garantía de reembolso de 30 días</h4>
                        <p>Sea por el motivo que sea, tienes 30 días para pedir la devolución de tu dinero. Devolución sin preguntas ni burocracia.</p>
                        <a class="btn btn-magic btn-buy" href="${CTA_FINAL_CHECKOUT_URL}" target="_blank" rel="noopener noreferrer">¡QUIERO EMPEZAR! 🥰</a>
                    </div>

                    <div class="cta-faq-section">
                        <h3 class="faq-main-title">❓ Preguntas Frecuentes</h3>
                        
                        <div class="faq-item">
                            <button class="faq-question">¿La Gelatina Ozempic realmente funciona? <span class="faq-arrow">▼</span></button>
                            <div class="faq-answer"><div class="faq-inner">¡Sí! Nuestros ingredientes fueron combinados para activar puntos específicos de tu metabolismo, promoviendo una alta quema de grasa.</div></div>
                        </div>
                        <div class="faq-item">
                            <button class="faq-question">¿Cuánto tiempo se necesita para ver resultados? <span class="faq-arrow">▼</span></button>
                            <div class="faq-answer"><div class="faq-inner">Muchas empiezan a ver resultados como desinflamación en los primeros 7 días. Siguiendo el protocolo de 30 días la pérdida se acelera.</div></div>
                        </div>
                        <div class="faq-item">
                            <button class="faq-question">¿Es seguro? ¿Tiene efectos secundarios? <span class="faq-arrow">▼</span></button>
                            <div class="faq-answer"><div class="faq-inner">100% enfocado en ingredientes naturales que compras en el supermercado. Sin contraindicaciones.</div></div>
                        </div>
                        <div class="faq-item">
                            <button class="faq-question">¿Cómo voy a recibir el protocolo? <span class="faq-arrow">▼</span></button>
                            <div class="faq-answer"><div class="faq-inner">Inmediatamente en tu email tras la aprobación de la compra. Obtienes acceso a la APP completa.</div></div>
                        </div>
                        <div class="faq-item">
                            <button class="faq-question">¿Y si no funciona para mí? <span class="faq-arrow">▼</span></button>
                            <div class="faq-answer"><div class="faq-inner">Tienes nuestra garantía blindada de 30 días. Solo tienes que enviar un email y te devolvemos el 100% de tu dinero.</div></div>
                        </div>
                        <div class="faq-item">
                            <button class="faq-question">¿El pago es seguro? <span class="faq-arrow">▼</span></button>
                            <div class="faq-answer"><div class="faq-inner">Sí. Utilizamos la plataforma de pagos más grande y segura del mundo.</div></div>
                        </div>
                        <div class="faq-item">
                            <button class="faq-question">¿Necesito comprar ingredientes caros? <span class="faq-arrow">▼</span></button>
                            <div class="faq-answer"><div class="faq-inner">¡No! Son ingredientes súper accesibles y fáciles de encontrar en cualquier supermercado cercano.</div></div>
                        </div>
                    </div>

                    <div class="cta-footer">
                        <a class="btn btn-magic btn-buy" href="${CTA_FINAL_CHECKOUT_URL}" target="_blank" rel="noopener noreferrer">¡QUIERO EMPEZAR! 🥰</a>
                        <p class="footer-secure">🔒 Compra 100% segura • Garantía de 30 días</p>
                    </div>

                </div>
            `;
        } else if (screenConfig.type === 'loading_steps') {
            contentHtml = `
                <div class="screen-loading-steps" style="flex-grow: 1; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; width: 100%; animation: fadeIn 0.4s ease-out; padding: var(--spacing-xl) 0;">
                    
                    <div class="circular-progress-container" style="width: 140px; height: 140px; margin-bottom: var(--spacing-xl);">
                        <svg class="circular-progress" viewBox="0 0 100 100">
                            <circle class="bg" cx="50" cy="50" r="45"></circle>
                            <circle class="progress" cx="50" cy="50" r="45" id="circle-progress-28"></circle>
                        </svg>
                        <div class="circular-percentage" id="circle-perc-28" style="font-size: 1.8rem;">0%</div>
                    </div>
                    
                    <div class="steps-vertical-timeline" id="steps-timeline">
                        <div class="v-step pending" data-step="0">
                            <div class="v-step-indicator">
                                <div class="v-step-icon"></div>
                                <div class="v-step-line"></div>
                            </div>
                            <div class="v-step-content">
                                <h4 class="v-step-title">Analizando tus respuestas</h4>
                            </div>
                        </div>
                        <div class="v-step pending" data-step="1">
                            <div class="v-step-indicator">
                                <div class="v-step-icon"></div>
                                <div class="v-step-line"></div>
                            </div>
                            <div class="v-step-content">
                                <h4 class="v-step-title">Calculando tu déficit calórico</h4>
                            </div>
                        </div>
                        <div class="v-step pending" data-step="2">
                            <div class="v-step-indicator">
                                <div class="v-step-icon"></div>
                                <div class="v-step-line"></div>
                            </div>
                            <div class="v-step-content">
                                <h4 class="v-step-title">Seleccionando ingredientes ideales</h4>
                            </div>
                        </div>
                        <div class="v-step pending" data-step="3" style="margin-bottom: 0;">
                            <div class="v-step-indicator">
                                <div class="v-step-icon" style="margin-bottom: 0;"></div>
                            </div>
                            <div class="v-step-content">
                                <h4 class="v-step-title">¡Verificación concluida!</h4>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else if (screenConfig.type === 'explanation_flow') {
            contentHtml = `
                <div class="screen-explanation-flow">
                    <h1 class="screen-title headline-part1">Excelente, ${userName}!</h1>
                    <h2 class="headline-part2 text-highlight">Mira cómo funciona 🎉</h2>
                    <p class="screen-subtitle subheadline">La Gelatina Ozempic activa la quema de grasa natural con ingredientes caseros que preparas en minutos.</p>
                    
                    <div class="benefits-container">
                        <div class="benefit-card">
                            <div class="benefit-icon-wrapper">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                            <span>Fácil de preparar</span>
                        </div>
                        <div class="benefit-card">
                            <div class="benefit-icon-wrapper">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                            <span>2 veces al día</span>
                        </div>
                        <div class="benefit-card">
                            <div class="benefit-icon-wrapper">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                            <span>Receta 100% Natural</span>
                        </div>
                    </div>

                    <div class="flow-container">
                        <!-- Step 1 -->
                        <div class="flow-step">
                            <img src="midia/tela-11/Antes.png" alt="Antes" class="flow-image">
                            <div class="flow-text">
                                <h3 class="flow-title">Antes</h3>
                                <p class="flow-subtext">Grasa acumulada y metabolismo lento</p>
                            </div>
                        </div>
                        
                        <div class="flow-arrow-down">⬇️</div>

                        <!-- Step 2 -->
                        <div class="flow-step">
                            <img src="midia/tela-11/Gelatina.png" alt="Produto" class="flow-image">
                            <div class="flow-text">
                                <h3 class="flow-title">Gelatina Ozempic</h3>
                                <p class="flow-subtext">Receta casera simple y poderosa</p>
                            </div>
                        </div>

                        <div class="flow-arrow-down">⬇️</div>

                        <!-- Step 3 -->
                        <div class="flow-step">
                            <img src="midia/tela-11/Queima.png" alt="Resultado Interno" class="flow-image">
                            <div class="flow-text">
                                <h3 class="flow-title">Quema natural activada 🔥</h3>
                                <p class="flow-subtext">Metabolismo acelerado sin dietas</p>
                            </div>
                        </div>

                        <div class="flow-arrow-down">⬇️</div>

                        <!-- Step 4 -->
                        <div class="flow-step">
                            <img src="midia/tela-11/Depois.png" alt="Resultado Final" class="flow-image">
                            <div class="flow-text">
                                <h3 class="flow-title title-green">¡El cuerpo de tus sueños!</h3>
                                <p class="flow-subtext">Resultado visible en pocas semanas</p>
                            </div>
                        </div>
                    </div>

                    <div class="insight-box">
                        💡 Receta casera que activa el GLP-1, la misma hormona del Ozempic, ¡de forma 100% natural!
                    </div>

                    <div class="action-container" style="width: 100%;">
                        <button class="btn btn-magic btn-next">🚀 Continuar</button>
                    </div>
                </div>
            `;
        } else if (screenConfig.type === 'vsl_1' || screenConfig.type === 'vsl_2') {
            const subtitleHtml = dynSubtitle ? `<p class="screen-subtitle" style="text-align: center; margin-bottom: var(--spacing-sm); font-size: 1.05rem;">${dynSubtitle}</p>` : '';
            
            contentHtml = `
                <div class="screen-vsl" style="flex-grow: 1; display: flex; flex-direction: column; width: 100%; animation: fadeIn 0.4s ease-out; padding-bottom: 2rem;">
                    <h1 class="screen-title" style="margin-bottom: 4px; text-align: center; font-size: 1.45rem;">${dynTitle}</h1>
                    ${subtitleHtml}

                    <div class="vsl-lock-box" id="vsl-lock-box" style="margin-bottom: var(--spacing-lg); background: linear-gradient(145deg, #ffffff, #fafafa); border: 2px solid #f0f0f0; border-radius: 16px; padding: 14px 8px; text-align: center; box-shadow: 0 8px 24px rgba(0,0,0,0.06); transform: scale(0.98); animation: pulsePremium 2.5s infinite alternate; width: 100%; max-width: 400px; margin-left: auto; margin-right: auto; box-sizing: border-box;">
                        <p id="vsl-lock-msg" style="margin-bottom: 12px; font-weight: 700; font-size: clamp(0.75rem, 4vw, 1rem); color: #d81b60; display: flex; align-items: center; justify-content: center; gap: 4px; width: 100%;">
                            <span style="font-size: 1.1rem; flex-shrink: 0;">🔒</span> <span style="display: inline-block;">El próximo paso se liberará en:</span>
                        </p>
                        <div class="vsl-progress-container" style="width: 100%; height: 12px; background: #eaecf0; border-radius: 8px; overflow: hidden; position: relative; box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);">
                            <div id="vsl-progress-bar" style="width: 0%; height: 100%; background: linear-gradient(90deg, #d81b60, #8e24aa, #d81b60); background-size: 200% 100%; animation: gradientMove 2s infinite linear; border-radius: 8px; transition: width 0.5s linear;"></div>
                        </div>
                    </div>

                    <div class="vsl-video-container" id="vsl-video-container" style="width: 100%; position: relative;">
                        <vturb-smartplayer id="vid-${screenConfig.vturbId || '69c3334c5610b6167ab9637d'}" style="display: block; margin: 0 auto; width: 100%; max-width: 400px; border-radius: 12px; overflow: hidden; box-shadow: 0 12px 30px rgba(0,0,0,0.15);"></vturb-smartplayer>
                    </div>

                    <div class="action-container btn-continue-container hidden" style="width: 100%; margin-top: auto; padding-top: var(--spacing-xl);">
                        <button class="btn btn-magic btn-next">${screenConfig.buttonText || 'Continuar ✓'}</button>
                    </div>
                </div>
                <style>
                    @keyframes pulsePremium {
                        0% { transform: scale(0.99); box-shadow: 0 4px 15px rgba(216, 27, 96, 0.1); }
                        100% { transform: scale(1.01); box-shadow: 0 8px 25px rgba(216, 27, 96, 0.25); }
                    }
                    @keyframes gradientMove {
                        0% { background-position: 100% 0; }
                        100% { background-position: -100% 0; }
                    }
                </style>
            `;
        } else {
            contentHtml = `
                <h1 class="screen-title">${dynTitle}</h1>
                <p class="screen-description">Tipo de Pantalla: <strong>${screenConfig.type}</strong></p>
                <div class="action-container">
                    <button class="btn btn-next">Próxima Pantalla</button>
                </div>
            `;
        }
        
        screenEl.innerHTML = contentHtml;
        this.appContent.appendChild(screenEl);

        // Atribuir evento genérico do btn-next (Para telas simples e também a de multi-seleção que tem o botão final)
        const nextBtnFallback = screenEl.querySelector('.btn-next');
        if (nextBtnFallback && !['question', 'question_grid', 'input_name', 'commitment'].includes(screenConfig.type)) {
            nextBtnFallback.addEventListener('click', () => this.navigateNext());
        }

        // Atribuir eventos de clique nas opções dinâmicas de UM ÚNICO TOQUE
        if (['question', 'question_grid', 'commitment'].includes(screenConfig.type)) {
            const selector = screenConfig.type === 'question' || screenConfig.type === 'commitment' ? '.q-option-btn' : '.q-option-btn-generic';
            const optionBtns = screenEl.querySelectorAll(selector);
            optionBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    btn.style.transform = 'scale(0.96)';
                    setTimeout(() => {
                        this.navigateNext();
                    }, 180);
                });
            });
        }

        // Lógica exclusiva de Múltipla Escolha para a tela-4 e question_multi
        if (['question_image_side', 'question_multi'].includes(screenConfig.type)) {
            const optionBtns = screenEl.querySelectorAll('.q-option-btn-multi');
            const continueContainer = screenEl.querySelector('.btn-continue-container');
            
            optionBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    btn.classList.toggle('selected');
                    // Verifica se existe alguma opção com class 'selected'
                    const hasSelected = screenEl.querySelectorAll('.q-option-btn-multi.selected').length > 0;
                    
                    if (hasSelected) {
                        continueContainer.classList.remove('hidden');
                    } else {
                        continueContainer.classList.add('hidden');
                    }
                });
            });
        }
        // Lógica exclusiva para o Input Name tornando obrigatório
        if (screenConfig.type === 'input_name') {
            const submitBtn = screenEl.querySelector('.btn-submit-name');
            const inputField = screenEl.querySelector('#name-input');
            const errorText = screenEl.querySelector('#name-error');

            const validateAndNext = () => {
                const name = inputField.value.trim();
                // Regra: Nome precisa ter pelo menos 2 letras
                if (name.length < 2) {
                    errorText.classList.remove('hidden');
                    inputField.classList.add('error');
                    
                    // Animação de tremor
                    inputField.classList.add('shake');
                    setTimeout(() => inputField.classList.remove('shake'), 400);
                } else {
                    errorText.classList.add('hidden');
                    inputField.classList.remove('error');
                    // Salvar o nome em memória global pra usar depois (se quiser exibir "Oi Ana!")
                    window.quizUserName = name; 
                    this.navigateNext();
                }
            };

            submitBtn.addEventListener('click', validateAndNext);
            
            // Aceitar clique com o botão "Enter" direto no teclado
            inputField.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') validateAndNext();
            });
            
            // Limpa o erro ao digitar
            inputField.addEventListener('input', () => {
                errorText.classList.add('hidden');
                inputField.classList.remove('error');
            });
        }

        // Logic for selectors (Weight, Height, Target Weight)
        if (['selector_weight', 'selector_height', 'selector_target_weight'].includes(screenConfig.type)) {
            const slider = screenEl.querySelector('#selector-slider');
            const disp = screenEl.querySelector('#selector-val');
            const targetLossBox = screenEl.querySelector('#target-loss-box');
            const lossAmount = screenEl.querySelector('#loss-amount');
            
            const updateUI = () => {
                disp.textContent = slider.value;
                if (screenConfig.type === 'selector_weight') {
                    window.quizUserWeight = parseInt(slider.value, 10);
                } else if (screenConfig.type === 'selector_height') {
                    window.quizUserHeight = parseInt(slider.value, 10);
                } else if (screenConfig.type === 'selector_target_weight') {
                    window.quizUserTargetWeight = parseInt(slider.value, 10);
                    if (window.quizUserWeight) {
                        const loss = window.quizUserWeight - window.quizUserTargetWeight;
                        if (loss > 0) {
                            targetLossBox.classList.remove('hidden');
                            lossAmount.textContent = `${loss}kg`;
                        } else {
                            targetLossBox.classList.add('hidden');
                        }
                    }
                }
            };
            
            // Initialization trigger
            updateUI();
            
            slider.addEventListener('input', updateUI);
        }

        // Logic for loading screens
        if (screenConfig.type === 'loading_circular') {
            const percEl = screenEl.querySelector('#circle-perc');
            const progressCircle = screenEl.querySelector('#circle-progress');
            const statusItems = screenEl.querySelectorAll('.status-item');
            
            const duration = 8000;
            const startTime = Date.now();
            const totalLength = 283; // 2 * PI * 45
            
            const timer = setInterval(() => {
                const elapsed = Date.now() - startTime;
                let percent = Math.min(100, (elapsed / duration) * 100);
                
                percEl.textContent = Math.floor(percent) + '%';
                
                const offset = totalLength - (percent / 100) * totalLength;
                progressCircle.style.strokeDashoffset = offset;
                
                const step = Math.floor((percent / 100) * (statusItems.length));
                const activeIndex = Math.min(statusItems.length - 1, step);
                
                statusItems.forEach((item, idx) => {
                    item.classList.remove('active');
                    if (idx === activeIndex) {
                        item.classList.add('active');
                    }
                });

                if (percent >= 100) {
                    clearInterval(timer);
                    setTimeout(() => this.navigateNext(), 800);
                }
            }, 30);
        }

        if (screenConfig.type === 'loading_steps') {
            const steps = screenEl.querySelectorAll('.v-step');
            const percEl = screenEl.querySelector('#circle-perc-28');
            const progressCircle = screenEl.querySelector('#circle-progress-28');
            
            const duration = 8000;
            const startTime = Date.now();
            const totalLength = 283; 
            
            steps[0].classList.add('active'); // First step active initially

            const timer = setInterval(() => {
                const elapsed = Date.now() - startTime;
                let percent = Math.min(100, (elapsed / duration) * 100);
                
                percEl.textContent = Math.floor(percent) + '%';
                
                const offset = totalLength - (percent / 100) * totalLength;
                progressCircle.style.strokeDashoffset = offset;
                
                // Switch classes
                const stepIndex = Math.floor((percent / 100) * steps.length);
                
                steps.forEach((item, idx) => {
                    item.classList.remove('active');
                    if (idx < stepIndex) {
                        item.classList.add('completed');
                    }
                    if (idx === stepIndex && percent < 100) {
                        item.classList.add('active');
                    }
                });

                if (percent >= 100) {
                    steps[steps.length - 1].classList.add('completed');
                    clearInterval(timer);
                    setTimeout(() => this.navigateNext(), 1200);
                }
            }, 50);
        }

        if (screenConfig.type === 'loading_final') {
            const bar = screenEl.querySelector('#lf-bar');
            const checks = screenEl.querySelectorAll('.lf-check-item');
            const duration = 10000;
            const startTime = Date.now();
            
            const timer = setInterval(() => {
                const elapsed = Date.now() - startTime;
                let percent = Math.min(100, (elapsed / duration) * 100);
                
                bar.style.width = percent + '%';
                
                const checkIndex = Math.floor((percent / 100) * checks.length);
                
                checks.forEach((item, idx) => {
                    if (idx < checkIndex) {
                        if (!item.classList.contains('completed')) {
                            item.classList.add('completed');
                            const iconEl = item.querySelector('.lf-check-icon');
                            iconEl.className = 'lf-check-icon checked-style';
                            iconEl.innerHTML = '✓';
                        }
                    }
                });

                if (percent >= 100) {
                    if (checks.length > 0) {
                        const lastItem = checks[checks.length - 1];
                        lastItem.classList.add('completed');
                        const iconEl = lastItem.querySelector('.lf-check-icon');
                        iconEl.className = 'lf-check-icon checked-style';
                        iconEl.innerHTML = '✓';
                    }
                    clearInterval(timer);
                    setTimeout(() => this.navigateNext(), 800);
                }
            }, 50);
        }

        if (screenConfig.type === 'vsl_1' || screenConfig.type === 'vsl_2') {
            const vId = screenConfig.vturbId || '69c3334c5610b6167ab9637d';
            
            if (!document.getElementById(`scr-${vId}`)) {
                const s = document.createElement("script");
                s.id = `scr-${vId}`;
                s.src = `https://scripts.converteai.net/ea7e3141-e734-41ac-9da4-46a9c79986a5/players/${vId}/v4/player.js`;
                s.async = true;
                document.head.appendChild(s);
            }
            
            if (screenConfig.type === 'vsl_2') {
                if (typeof confetti === 'function') {
                    setTimeout(() => {
                        confetti({
                            particleCount: 150,
                            spread: 80,
                            origin: { y: 0.3 },
                            colors: ['#d81b60', '#8e24aa', '#ffeb3b', '#ffffff']
                        });
                    }, 300);
                }
            }

            const targetBar = screenEl.querySelector('#vsl-progress-bar');
            const contBtn = screenEl.querySelector('.btn-continue-container');
            const lockBox = screenEl.querySelector('#vsl-lock-box');
            const lockMsg = screenEl.querySelector('#vsl-lock-msg');
            const duration = screenConfig.type === 'vsl_2' ? 125 * 1000 : 70 * 1000;
            const startTime = Date.now();
            
            const timer = setInterval(() => {
                if (!document.body.contains(targetBar)) {
                    clearInterval(timer);
                    return;
                }

                const elapsed = Math.max(0, Date.now() - startTime);
                const linearProgress = Math.min(1, elapsed / duration);
                
                // Easing Quadrático (Rápido no inícío, muito lento no final simulando velocidade)
                const easedProgress = 1 - Math.pow(1 - linearProgress, 2);
                const percent = easedProgress * 100;

                targetBar.style.width = percent + '%';
                
                if (linearProgress >= 1) {
                    clearInterval(timer);
                    contBtn.classList.remove('hidden');
                    
                    if (lockMsg) {
                        lockMsg.innerHTML = '<span style="font-size: 1.1rem; flex-shrink: 0;">✅</span> <span style="display: inline-block;">Próximo paso desbloqueado</span>';
                        lockMsg.style.color = '#2e7d32'; 
                    }
                    if (lockBox) {
                        lockBox.style.animation = 'none';
                        lockBox.style.transform = 'scale(1)';
                        lockBox.style.boxShadow = '0 8px 24px rgba(46, 125, 50, 0.15)';
                        lockBox.style.border = '2px solid rgba(46, 125, 50, 0.3)';
                    }
                    
                    setTimeout(() => {
                        contBtn.scrollIntoView({ behavior: 'smooth', block: 'end' });
                    }, 100);
                }
            }, 500);
        }

        if (screenConfig.type === 'cta') {
            if (typeof confetti === 'function') {
                const duration = 3 * 1000;
                const animationEnd = Date.now() + duration;
                const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
                function randomInRange(min, max) { return Math.random() * (max - min) + min; }
                const interval = setInterval(function() {
                    const timeLeft = animationEnd - Date.now();
                    if (timeLeft <= 0) { return clearInterval(interval); }
                    const particleCount = 50 * (timeLeft / duration);
                    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
                    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
                }, 250);
            }
            
            const faqs = screenEl.querySelectorAll('.faq-question');
            faqs.forEach(btn => {
                btn.addEventListener('click', () => {
                    const isActive = btn.classList.contains('active');
                    
                    faqs.forEach(otherBtn => {
                        otherBtn.classList.remove('active');
                        otherBtn.nextElementSibling.style.maxHeight = "0";
                    });

                    if (!isActive) {
                        btn.classList.add('active');
                        const answer = btn.nextElementSibling;
                        answer.style.maxHeight = answer.scrollHeight + "px";
                    }
                });
            });
            
            const buyBtns = screenEl.querySelectorAll('.btn-buy');
            buyBtns.forEach(btn => {
                btn.setAttribute('href', CTA_FINAL_CHECKOUT_URL);
                btn.setAttribute('target', '_blank');
                btn.setAttribute('rel', 'noopener noreferrer');
            });
        }
    }

    updateProgressBar() {
        // Lógica para barra de progresso (Exclui CTA e Start que não tem header)
        const totalProgressScreens = screens.filter(s => s.hasHeader).length;
        
        // Quantas telas com header já passamos?
        const currentProgressIndex = screens.slice(0, this.currentScreenIndex + 1).filter(s => s.hasHeader).length;
        
        // Porcentagem atual
        const progressPercentage = (currentProgressIndex / totalProgressScreens) * 100;
        
        // Atualiza UI
        this.progressBar.style.width = `${progressPercentage}%`;
    }

    navigateNext() {
        // Futuro: Adicionar lógica de validação do input dependendo de screenConfig.type aqui
        if (this.currentScreenIndex < screens.length - 1) {
            this.currentScreenIndex++;
            this.renderCurrentScreen();
        }
    }

    navigateBack() {
        // Futuro: Lógica customizada de voltar (pular algumas telas, etc)
        if (this.currentScreenIndex > 0) {
            this.currentScreenIndex--;
            this.renderCurrentScreen();
        }
    }
}

// Inicializar a aplicação quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    // Instanciar a app no objeto global para debug opcional, 
    // mas mantendo encapsulado na classe
    window.quizApp = new QuizApp();
});
