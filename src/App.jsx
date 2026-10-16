
import { useState } from 'react'
import './App.css'

const lessons = [
  {
    id: 'definition',
    number: '01',
    title: 'مفهوم المتتالية',
    subtitle: 'تعريف وترميز المتتالية العددية',
    summary:
      'المتتالية العددية هي دالة تربط كل عدد طبيعي n، ابتداءً من رتبة معينة، بعدد حقيقي uₙ.',
    formulas: [
      'uₙ = f(n)',
      'نميز بين المتتالية (uₙ) وحدها العام uₙ.',
    ],
    example: 'uₙ = 2n + 1',
    explanation:
      'لحساب حد معلوم، نعوض n برتبته في العبارة. مثلاً: u₃ = 2 × 3 + 1 = 7.',
  },
  {
    id: 'generation',
    number: '02',
    title: 'توليد متتالية',
    subtitle: 'الحد العام والعلاقة التراجعية',
    summary:
      'يمكن تعريف المتتالية بعبارة صريحة بدلالة n، أو بإعطاء الحد الأول وعلاقة تربط كل حد بالحد السابق.',
    formulas: [
      'uₙ = f(n)',
      'uₙ₊₁ = g(uₙ)',
    ],
    example: 'u₀ = 2 ، uₙ₊₁ = 3uₙ − 2',
    explanation:
      'نحسب الحدود بالتتابع: u₁ = 3 × 2 − 2 = 4، ثم u₂ = 3 × 4 − 2 = 10.',
  },
  {
    id: 'arithmetic',
    number: '03',
    title: 'المتتاليات الحسابية',
    subtitle: 'الأساس والحد العام',
    summary:
      'تكون المتتالية حسابية إذا كان الفرق بين كل حد والحد الذي يسبقه ثابتاً، ويسمى هذا العدد أساس المتتالية ويرمز له بـ r.',
    formulas: [
      'uₙ₊₁ = uₙ + r',
      'uₙ₊₁ − uₙ = r',
      'uₙ = u₀ + nr',
      'uₙ = uₚ + (n − p)r',
    ],
    example: 'u₀ = 2 ، r = 3',
    explanation:
      'الحد العام هو uₙ = 2 + 3n. ومنه u₃ = 2 + 3 × 3 = 11.',
  },
  {
    id: 'sum',
    number: '04',
    title: 'مجموع حدود متتابعة',
    subtitle: 'مجموع حدود متتالية حسابية',
    summary:
      'لحساب مجموع حدود متتالية حسابية، نضرب عدد الحدود في نصف مجموع الحد الأول والحد الأخير.',
    formulas: [
      'S = عدد الحدود × (الحد الأول + الحد الأخير) / 2',
      'S = (n + 1)(u₀ + uₙ) / 2',
    ],
    example: 'S = u₀ + u₁ + … + uₙ',
    explanation:
      'إذا بدأنا من u₀ وانتهينا عند uₙ، فإن عدد الحدود هو n + 1.',
  },
]

const exercises = [
  {
    id: 1,
    level: 'سهل',
    question: 'لدينا uₙ = 5n − 2. احسب u₃.',
    answer: '13',
    hint: 'نعوض n بالعدد 3 في العبارة.',
    solution: 'u₃ = 5 × 3 − 2 = 15 − 2 = 13.',
  },
  {
    id: 2,
    level: 'سهل',
    question: 'لدينا uₙ = 5n − 2. أوجد عبارة uₙ₊₁ بدلالة n.',
    answer: '5n+3',
    hint: 'نعوض n بـ n + 1 ثم ننشر الأقواس.',
    solution: 'uₙ₊₁ = 5(n + 1) − 2 = 5n + 5 − 2 = 5n + 3.',
  },
  {
    id: 3,
    level: 'متوسط',
    question: 'لدينا u₀ = 2 و uₙ₊₁ = 3uₙ − 2. احسب u₂.',
    answer: '10',
    hint: 'احسب u₁ أولاً، ثم استعمله لحساب u₂.',
    solution: 'u₁ = 3 × 2 − 2 = 4، ثم u₂ = 3 × 4 − 2 = 10.',
  },
  {
    id: 4,
    level: 'متوسط',
    question: 'لدينا u₀ = 2 ، u₁ = 6 ، u₂ = 10. ما أساس المتتالية الحسابية؟',
    answer: '4',
    hint: 'احسب الفرق u₁ − u₀.',
    solution: 'r = u₁ − u₀ = 6 − 2 = 4. كما أن u₂ − u₁ = 10 − 6 = 4.',
  },
  {
    id: 5,
    level: 'متوسط',
    question: 'متتالية حسابية حدها الأول u₀ = 2 وأساسها r = 3. احسب u₃.',
    answer: '11',
    hint: 'استعمل العلاقة uₙ = u₀ + nr.',
    solution: 'u₃ = 2 + 3 × 3 = 2 + 9 = 11.',
  },
  {
    id: 6,
    level: 'تحدي البكالوريا',
    question: 'احسب S = 1 + 3 + 5 + 7 + 9 + 11.',
    answer: '36',
    hint: 'هناك 6 حدود. استعمل عدد الحدود × (الأول + الأخير) / 2.',
    solution: 'S = 6 × (1 + 11) / 2 = 6 × 6 = 36.',
  },
]

function normalize(value) {
  return value
    .trim()
    .replace(/\s+/g, '')
    .replace(/[−–]/g, '-')
    .replace(/×/g, '*')
    .replace(/٫/g, '.')
    .replace(/,/g, '.')
    .toLowerCase()
}

function App() {
  const [activeLesson, setActiveLesson] = useState('definition')
  const [answers, setAnswers] = useState({})
  const [checked, setChecked] = useState({})
  const [showHint, setShowHint] = useState({})
  const [showSolutions, setShowSolutions] = useState(false)

  const lesson = lessons.find((item) => item.id === activeLesson)

  const correctCount = exercises.filter(
    (exercise) =>
      checked[exercise.id] &&
      normalize(answers[exercise.id] || '') === normalize(exercise.answer),
  ).length

  function checkAnswer(exercise) {
    if (!(answers[exercise.id] || '').trim()) return

    setChecked((previous) => ({
      ...previous,
      [exercise.id]: true,
    }))
  }

  function resetExercises() {
    setAnswers({})
    setChecked({})
    setShowHint({})
    setShowSolutions(false)
  }

  return (
    <main className="app" dir="rtl">
      <header className="topbar">
        <a className="brand" href="#home">
          <span className="brand-icon">م</span>
          <span>MathLab <strong>BAC</strong></span>
        </a>
        <a href="#chapters" className="top-link">مكتبة الدروس</a>
      </header>

      <section className="hero" id="home">
        <span className="eyebrow">رحلتك نحو النجاح تبدأ هنا</span>
        <h1>
          المتتاليات العددية
          <br />
          <span>افهم القاعدة، ثم اكتشف الحل.</span>
        </h1>
        <p>
          درس تفاعلي مبني على ملخصك الدراسي، مع أمثلة مشروحة
          وتمارين تتدرج من الأساسيات إلى تحدي البكالوريا.
        </p>
        <a className="primary-button" href="#chapters">
          ابدأ التعلم <span>←</span>
        </a>
        <div className="hero-formula" aria-hidden="true">
          uₙ₊₁ = uₙ + r
        </div>
      </section>

      <section className="lesson-section" id="chapters">
        <div className="section-heading">
          <div>
            <span className="eyebrow">الجزء الأول</span>
            <h2>اكتشف الدرس</h2>
          </div>
          <span className="chapter-count">{lessons.length} محاور</span>
        </div>

        <nav className="lesson-tabs" aria-label="محاور الدرس">
          {lessons.map((item) => (
            <button
              key={item.id}
              className={`lesson-tab ${activeLesson === item.id ? 'active' : ''}`}
              onClick={() => setActiveLesson(item.id)}
              type="button"
            >
              <span>{item.number}</span>
              {item.title}
            </button>
          ))}
        </nav>

        <article className="lesson-card">
          <span className="eyebrow">{lesson.subtitle}</span>
          <h2>{lesson.title}</h2>
          <p className="lesson-summary">{lesson.summary}</p>

          <h3>القواعد الأساسية</h3>
          <div className="formula-list">
            {lesson.formulas.map((formula) => (
              <div className="formula" key={formula} dir="auto">
                {formula}
              </div>
            ))}
          </div>

          <div className="example-box">
            <span className="example-label">مثال من الدرس</span>
            <p dir="auto">{lesson.example}</p>
            <p>{lesson.explanation}</p>
          </div>

          <div className="lesson-navigation">
            <button
              type="button"
              className="secondary-button"
              onClick={() => {
                const index = lessons.findIndex((item) => item.id === activeLesson)
                setActiveLesson(lessons[(index + lessons.length - 1) % lessons.length].id)
              }}
            >
              المحور السابق
            </button>
            <button
              type="button"
              className="primary-button"
              onClick={() => {
                const index = lessons.findIndex((item) => item.id === activeLesson)
                setActiveLesson(lessons[(index + 1) % lessons.length].id)
              }}
            >
              المحور التالي ←
            </button>
          </div>
        </article>
      </section>

      <section className="practice-section" id="exercises">
        <div className="section-heading">
          <div>
            <span className="eyebrow">تدرب بنفسك</span>
            <h2>مختبر التمارين</h2>
            <p>أجب عن السؤال، ثم اطلب التصحيح والتفسير.</p>
          </div>
          <span className="chapter-count">{exercises.length} تمارين</span>
        </div>

        <div className="score-panel">
          <div>
            <span className="score-number">{correctCount}/{exercises.length}</span>
            <span>إجابات صحيحة</span>
          </div>
          <p>حاول فهم طريقة الحل، وليس حفظ النتيجة فقط.</p>
        </div>

        <div className="exercise-list">
          {exercises.map((exercise) => {
            const isChecked = checked[exercise.id]
            const isCorrect =
              isChecked &&
              normalize(answers[exercise.id] || '') === normalize(exercise.answer)

            return (
              <article className="exercise-card" key={exercise.id}>
                <div className="exercise-topline">
                  <span className="exercise-number">تمرين {exercise.id}</span>
                  <span className="exercise-level">{exercise.level}</span>
                </div>

                <h3>{exercise.question}</h3>

                <label className="answer-label" htmlFor={`answer-${exercise.id}`}>
                  إجابتك
                </label>
                <div className="answer-row">
                  <input
                    id={`answer-${exercise.id}`}
                    type="text"
                    inputMode="text"
                    value={answers[exercise.id] || ''}
                    placeholder="اكتب إجابتك هنا"
                    onChange={(event) => {
                      setAnswers((previous) => ({
                        ...previous,
                        [exercise.id]: event.target.value,
                      }))
                      setChecked((previous) => ({
                        ...previous,
                        [exercise.id]: false,
                      }))
                    }}
                  />
                  <button
                    type="button"
                    className="primary-button"
                    onClick={() => checkAnswer(exercise)}
                  >
                    تحقق
                  </button>
                </div>

                {isChecked && (
                  <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
                    <strong>
                      {isCorrect ? 'إجابة صحيحة!' : 'ليست الإجابة الصحيحة بعد.'}
                    </strong>
                    <p>{isCorrect ? 'أحسنت، يمكنك الانتقال إلى التمرين التالي.' : 'راجع التلميح أو أعد قراءة القاعدة ثم حاول مجدداً.'}</p>
                    {isCorrect && <p className="solution">{exercise.solution}</p>}
                  </div>
                )}

                <button
                  type="button"
                  className="hint-button"
                  onClick={() =>
                    setShowHint((previous) => ({
                      ...previous,
                      [exercise.id]: !previous[exercise.id],
                    }))
                  }
                >
                  {showHint[exercise.id] ? 'إخفاء التلميح' : 'أحتاج إلى تلميح'}
                </button>

                {showHint[exercise.id] && (
                  <div className="hint-box">{exercise.hint}</div>
                )}

                {isChecked && !isCorrect && showSolutions && (
                  <div className="hint-box">
                    <strong>التصحيح المفصل:</strong> {exercise.solution}
                  </div>
                )}
              </article>
            )
          })}
        </div>

        <div className="exercise-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={() => setShowSolutions((previous) => !previous)}
          >
            {showSolutions ? 'إخفاء التصحيحات' : 'عرض التصحيحات المفصلة'}
          </button>
          <button
            type="button"
            className="secondary-button"
            onClick={resetExercises}
          >
            إعادة المحاولة
          </button>
        </div>

        {showSolutions && (
          <div className="all-solutions">
            <h3>التصحيحات المفصلة</h3>
            {exercises.map((exercise) => (
              <div className="solution-item" key={exercise.id}>
                <strong>تمرين {exercise.id}:</strong>
                <p>{exercise.solution}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer className="footer">
        <span>MathLab BAC</span>
        <span>تعلّم خطوة بخطوة، وتدرّب حتى تتقن.</span>
      </footer>
    </main>
  )
}

export default App
