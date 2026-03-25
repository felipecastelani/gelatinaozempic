/**
 * js/screens.js
 * 
 * Lista contendo a definição da estrutura de todas as telas do Quiz.
 * Esta arquitetura baseada em dados permite alta escalabilidade.
 */

// Opções Genéricas para Mockup Rápido nas demais telas de pergunta
const defaultOptions = [
    { emoji: '✨', label: 'Opción 1 de ejemplo' },
    { emoji: '💡', label: 'Opción 2 de ejemplo' },
    { emoji: '💎', label: 'Opción 3 de ejemplo' }
];

export const screens = [
    { id: 'start', title: 'Bienvenido', hasHeader: false, type: 'start' },
    {
        id: 'tela-1',
        title: '¡Vamos a empezar tu cambio! 🚀',
        subtitle: 'Responde unas preguntas rápidas para personalizar tu plan.',
        image: 'midia/tela-1/Gelatina-Ozempic-Influencer-Com-Gelatina.png',
        buttonText: '¡Vamos! 💪',
        hasHeader: true,
        type: 'confirmation'
    },
    {
        id: 'tela-2',
        title: '¿Qué edad tienes?',
        subtitle: 'Selecciona tu rango de edad.',
        hasHeader: true,
        type: 'question',
        options: [
            { emoji: '🌸', label: '18 - 27 años' },
            { emoji: '✨', label: '28 - 39 años' },
            { emoji: '💫', label: '40 - 54 años' },
            { emoji: '👑', label: '54+ años' }
        ]
    },
    {
        id: 'tela-3',
        title: '¿Cómo clasificas tu cuerpo?',
        subtitle: 'Selecciona la opción que mejor te describa',
        hasHeader: true,
        type: 'question_grid',
        options: [
            { image: 'midia/tela-3/MÉDIO.png', label: 'Promedio' },
            { image: 'midia/tela-3/PLUSIZE.png', label: 'Talla Plus' },
            { image: 'midia/tela-3/ACIMADOPESO.png', label: 'Con exceso de peso' },
            { image: 'midia/tela-3/SOBREPESO.png', label: 'Sobrepeso' }
        ]
    },
    {
        id: 'tela-4',
        title: '¿En qué áreas quieres perder más grasa?',
        subtitle: 'Selecciona las áreas deseadas.',
        image: 'midia/tela-4/MulherEmPe.png',
        hasHeader: true,
        type: 'question_image_side',
        options: [
            { emoji: '💆‍♀️', label: 'Papada' },
            { emoji: '💪', label: 'Brazos' },
            { emoji: '🤰', label: 'Abdomen' },
            { emoji: '⏳', label: 'Cintura' },
            { emoji: '🍑', label: 'Glúteos' },
            { emoji: '🦵', label: 'Muslos' },
            { emoji: '✨', label: 'Todo el cuerpo' }
        ]
    },
    {
        id: 'tela-5',
        title: '¡Sí! Hasta las famosas lo están usando ⭐',
        subtitle: 'La Gelatina Ozempic es tendencia entre celebridades e influencers.',
        image: 'midia/tela-5/noticia.jpg',
        buttonText: 'Continuar',
        hasHeader: true,
        type: 'news'
    },
    {
        id: 'tela-6',
        title: '¿Cuál es tu nombre?',
        subtitle: 'Para personalizar tu experiencia.',
        buttonText: 'Continuar',
        hasHeader: true,
        type: 'input_name'
    },
    {
        id: 'tela-7',
        title: '{{NomeDoLead}}, ¿cómo afecta el peso a tu vida?',
        subtitle: 'Entender esto nos ayuda a crear tu protocolo ideal',
        hasHeader: true,
        type: 'question',
        options: [
            { emoji: '💔', label: 'Afecta mi autoestima', description: 'Me siento insegura con mi cuerpo' },
            { emoji: '🤒', label: 'Afecta mi salud', description: 'Siento cansancio, dolores y falta de energía' },
            { emoji: '👥', label: 'Afecta mis relaciones', description: 'Evito encuentros y situaciones sociales' },
            { emoji: '⏳', label: 'Afecta mi rutina', description: 'Dificultad para hacer tareas simples' }
        ]
    },
    {
        id: 'tela-8',
        title: '¿Estás feliz con tu apariencia actual?',
        subtitle: 'Sé sincera contigo misma',
        hasHeader: true,
        type: 'question',
        options: [
            { emoji: '😔', label: 'No estoy feliz.' },
            { emoji: '🤔', label: 'Podría ser mejor.' },
            { emoji: '💪', label: 'Estoy trabajando en ello.' }
        ]
    },
    {
        id: 'tela-9',
        title: '¿Qué te impide bajar de peso?',
        subtitle: 'Selecciona todas las barreras que enfrentas',
        hasHeader: true,
        type: 'question_multi',
        options: [
            { emoji: '⏳', label: 'Falta de tiempo' },
            { emoji: '🍫', label: 'Falta de autocontrol' },
            { emoji: '💸', label: 'Problemas financieros' },
            { emoji: '🔄', label: 'Falta de constancia' }
        ]
    },
    {
        id: 'tela-10',
        title: '¿Qué quieres lograr?',
        subtitle: 'Selecciona tus mayores objetivos',
        hasHeader: true,
        type: 'question_multi',
        options: [
            { emoji: '⚡', label: 'Tener más energía' },
            { emoji: '👗', label: 'Usar la ropa que amo' },
            { emoji: '✨', label: 'Mejorar mi autoestima' },
            { emoji: '🩺', label: 'Tener más salud' },
            { emoji: '🦋', label: 'Sentirme más liviana' },
            { emoji: '🥰', label: 'Recibir halagos' }
        ]
    },
    { id: 'tela-11', hasHeader: true, type: 'explanation_flow' },
    { id: 'tela-12', title: '¿Cuál es tu peso actual?', subtitle: 'Sé sincera para tener un resultado preciso', hasHeader: true, type: 'selector_weight' },
    { id: 'tela-13', title: '¿Cuál es tu estatura?', subtitle: 'Lo necesitamos para calcular tu IMC', hasHeader: true, type: 'selector_height' },
    { id: 'tela-14', title: '¿Cuál es tu peso deseado?', subtitle: '¿Qué peso sueñas con alcanzar?', hasHeader: true, type: 'selector_target_weight' },
    { id: 'tela-15', hasHeader: true, type: 'objective_display' },
    {
        id: 'tela-16',
        title: '¿Cuántos embarazos has tenido?',
        subtitle: 'Esto ayuda a personalizar tu plan.',
        hasHeader: true,
        type: 'question',
        options: [
            { emoji: '🙅‍♀️', label: 'Nunca he estado embarazada' },
            { emoji: '👶', label: '1 embarazo' },
            { emoji: '👩‍👧‍👦', label: '2 embarazos' },
            { emoji: '👨‍👩‍👧‍👦', label: '3 o más embarazos' }
        ]
    },
    {
        id: 'tela-17',
        title: '¿Cómo es tu rutina diaria?',
        subtitle: 'Selecciona todas las opciones correspondientes.',
        hasHeader: true,
        type: 'question_multi',
        options: [
            { emoji: '🏢', label: 'Trabajo fuera de casa' },
            { emoji: '💻', label: 'Trabajo desde casa' },
            { emoji: '🧹', label: 'Cuido de la casa/familia' },
            { emoji: '📚', label: 'Estudio' }
        ]
    },
    {
        id: 'tela-18',
        title: '¿Cuántas horas duermes por noche?',
        subtitle: 'El sueño es esencial para adelgazar.',
        hasHeader: true,
        type: 'question',
        options: [
            { emoji: '😫', label: 'Menos de 5 horas' },
            { emoji: '🥱', label: '5 a 7 horas' },
            { emoji: '😌', label: '7 a 9 horas' },
            { emoji: '😴', label: 'Más de 9 horas' }
        ]
    },
    {
        id: 'tela-19',
        title: '¿Cuánta agua tomas al día?',
        subtitle: 'La hidratación acelera los resultados.',
        hasHeader: true,
        type: 'question',
        options: [
            { emoji: '🌵', label: 'Casi nada' },
            { emoji: '🥤', label: 'Menos de 1 litro' },
            { emoji: '💧', label: '1 a 2 litros' },
            { emoji: '🚰', label: 'Más de 2 litros' }
        ]
    },
    { id: 'tela-20', title: 'Resultado', hasHeader: true, type: 'result' },
    { id: 'tela-21', title: 'Cómo usar la receta', hasHeader: true, type: 'info' },
    {
        id: 'tela-22',
        title: '<span class="highlight-purple">¿Te comprometes a aplicar el protocolo</span> por al menos 1 semana para poder ver los resultados?',
        hasHeader: true,
        type: 'commitment',
        options: [
            { emoji: '✅', label: '¡Sí, me comprometo!' },
            { emoji: '🚀', label: 'Quiero empezar hoy' },
            { emoji: '🤔', label: 'No lo sé...' }
        ]
    },
    { id: 'tela-23', title: 'Cargando...', hasHeader: false, type: 'loading_circular' },
    {
        id: 'tela-24',
        title: 'Mira cómo personas normales están <span class="highlight-purple">perdiendo entre 6 a 12kg en 5 semanas.</span>',
        subtitle: 'Con simples <span class="highlight-purple">recetas de gelatina</span> preparadas con ingredientes que todos tenemos en casa...',
        buttonText: 'Continuar ✓',
        vturbId: '69c3334c5610b6167ab9637d',
        hasHeader: false,
        type: 'vsl_1'
    },
    { id: 'tela-25', title: '¿Cuál es el cuerpo de tus sueños?', subtitle: '¿Cuál es el cuerpo de tus sueños?', hasHeader: true, type: 'question', options: [{ emoji: '💃', label: 'En forma y tonificada' }, { emoji: '🧘‍♀️', label: 'Natural y saludable' }] },
    { id: 'tela-26', title: 'Confirmación', hasHeader: true, type: 'dart_confirmation' },
    { id: 'tela-27', title: 'Historias de Transformación', subtitle: 'Mira quiénes ya transformaron su cuerpo con la Gelatina Ozempic', hasHeader: true, type: 'testimonials' },
    { id: 'tela-28', title: 'Verificando datos...', hasHeader: false, type: 'loading_steps' },
    {
        id: 'tela-29',
        title: '¡Felicidades! Tu plan está listo 🎊',
        subtitle: 'Mira el video para desbloquearlo.',
        buttonText: 'Obtener mi plan 🔥',
        vturbId: '69c33353c9da180d96d8d346',
        hasHeader: false,
        type: 'vsl_2'
    },
    { id: 'tela-30', title: 'Finalizando...', hasHeader: true, type: 'loading_final' },
    { id: 'cta', title: 'Acceso', hasHeader: false, type: 'cta' }
];
