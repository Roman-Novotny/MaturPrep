// Maturitní témata z matematiky – kompletní seznam (skeleton), zatím plně rozepsaná
// jen 2 ukázková témata (kvadraticke-rovnice, funkce-linearni-kvadraticka).
// Zbytek má comingSoon: true a doplní se postupně stejnou strukturou.

export const CATEGORY_COLORS = {
  Algebra: '#3b82f6',
  Funkce: '#10b981',
  Geometrie: '#f59e0b',
  Statistika: '#a855f7',
};

export const ALL_TOPICS = [
  {
    id: 'vyrazy',
    number: 1,
    title: 'Výrazy a jejich úpravy',
    category: 'Algebra',
    difficulty: 'easy',
    comingSoon: true,
  },
  {
    id: 'linearni-rovnice',
    number: 2,
    title: 'Lineární rovnice a nerovnice',
    category: 'Algebra',
    difficulty: 'easy',
    comingSoon: true,
  },
  {
    id: 'kvadraticke-rovnice',
    number: 3,
    title: 'Kvadratické rovnice a nerovnice',
    category: 'Algebra',
    difficulty: 'medium',
    summary: 'Kvadratická rovnice má tvar $ax^2+bx+c=0$ s $a\\neq0$. Řešíme ji přes diskriminant, Vietovy vzorce nebo rozklad na kořenové činitele; nerovnice pak pomocí grafu paraboly.',
    terms: ['diskriminant', 'kořen rovnice', 'Vietovy vzorce', 'parabola', 'kořenový činitel', 'ryze kvadratická rovnice'],
    formulas: [
      { name: 'Obecný tvar', latex: 'ax^2+bx+c=0,\\quad a\\neq 0' },
      { name: 'Diskriminant', latex: 'D=b^2-4ac' },
      { name: 'Kořeny (D ≥ 0)', latex: 'x_{1,2}=\\dfrac{-b\\pm\\sqrt{D}}{2a}' },
      { name: 'Vietovy vzorce', latex: 'x_1+x_2=-\\dfrac{b}{a},\\qquad x_1\\cdot x_2=\\dfrac{c}{a}' },
      { name: 'Rozklad na kořenové činitele', latex: 'ax^2+bx+c=a(x-x_1)(x-x_2)' },
    ],
    subtopics: [
      'Umím určit diskriminant a rozhodnout o počtu řešení',
      'Umím vypočítat kořeny pomocí vzorce',
      'Umím použít Vietovy vzorce',
      'Umím rozložit kvadratický výraz na součin kořenových činitelů',
      'Umím vyřešit ryze kvadratickou rovnici (bez lineárního členu)',
      'Umím vyřešit kvadratickou nerovnici pomocí grafu paraboly',
    ],
    workedExamples: [
      {
        problem: 'Řešte rovnici $x^2-5x+6=0$.',
        steps: [
          'Rovnice je v obecném tvaru $ax^2+bx+c=0$ s $a=1$, $b=-5$, $c=6$.',
          'Diskriminant: $D=b^2-4ac=(-5)^2-4\\cdot1\\cdot6=25-24=1$.',
          'Protože $D>0$, rovnice má dva různé reálné kořeny.',
          'Kořeny: $x_{1,2}=\\dfrac{-b\\pm\\sqrt{D}}{2a}=\\dfrac{5\\pm1}{2}$.',
          'Tedy $x_1=3$, $x_2=2$.',
        ],
        answer: 'x_1=3,\\ x_2=2',
      },
      {
        problem: 'Řešte nerovnici $x^2-x-6>0$.',
        steps: [
          'Nejprve najdeme nulové body odpovídající rovnice $x^2-x-6=0$.',
          'Diskriminant: $D=(-1)^2-4\\cdot1\\cdot(-6)=1+24=25$.',
          'Kořeny: $x_{1,2}=\\dfrac{1\\pm5}{2}$, tedy $x_1=-2$, $x_2=3$.',
          'Graf funkce $y=x^2-x-6$ je parabola s rameny nahoru ($a=1>0$), takže je kladná mimo interval kořenů.',
          'Řešení nerovnice: $x\\in(-\\infty,-2)\\cup(3,\\infty)$.',
        ],
        answer: 'x\\in(-\\infty,-2)\\cup(3,\\infty)',
      },
    ],
    quiz: [
      {
        question: 'Kolik reálných kořenů má rovnice $x^2+2x+5=0$?',
        options: ['Dva různé reálné kořeny', 'Jeden dvojnásobný kořen', 'Žádný reálný kořen', 'Nekonečně mnoho'],
        correctIndex: 2,
      },
      {
        question: 'Jaký je diskriminant rovnice $2x^2-4x+2=0$?',
        options: ['D = 0', 'D = 8', 'D = -8', 'D = 16'],
        correctIndex: 0,
      },
      {
        question: 'Podle Vietových vzorců platí pro rovnici $x^2-7x+12=0$, že součet kořenů je:',
        options: ['7', '-7', '12', '-12'],
        correctIndex: 0,
      },
      {
        question: 'Řešte rovnici $x^2-9=0$.',
        options: ['x = 3 nebo x = -3', 'x = 3 (dvojnásobný kořen)', 'x = 9 nebo x = -9', 'Rovnice nemá řešení'],
        correctIndex: 0,
      },
      {
        question: 'Kdy má kvadratická rovnice právě jeden (dvojnásobný) kořen?',
        options: ['Když D > 0', 'Když D = 0', 'Když D < 0', 'Když a = 0'],
        correctIndex: 1,
      },
    ],
    flashcards: [
      { front: 'Obecný tvar kvadratické rovnice', back: '$ax^2+bx+c=0,\\ a\\neq0$' },
      { front: 'Diskriminant', back: '$D=b^2-4ac$' },
      { front: 'Vzorec pro kořeny (D ≥ 0)', back: '$x_{1,2}=\\dfrac{-b\\pm\\sqrt D}{2a}$' },
      { front: 'Součet kořenů (Vieta)', back: '$x_1+x_2=-\\dfrac{b}{a}$' },
      { front: 'Součin kořenů (Vieta)', back: '$x_1\\cdot x_2=\\dfrac{c}{a}$' },
      { front: 'Co znamená D > 0?', back: 'Dva různé reálné kořeny' },
      { front: 'Co znamená D < 0?', back: 'Žádný reálný kořen (dva komplexně sdružené)' },
      { front: 'Co znamená D = 0?', back: 'Jeden dvojnásobný reálný kořen' },
    ],
  },
  {
    id: 'soustavy-rovnic',
    number: 4,
    title: 'Soustavy rovnic',
    category: 'Algebra',
    difficulty: 'medium',
    comingSoon: true,
  },
  {
    id: 'funkce-linearni-kvadraticka',
    number: 5,
    title: 'Lineární a kvadratická funkce',
    category: 'Funkce',
    difficulty: 'medium',
    summary: 'Lineární funkce $f(x)=ax+b$ má graf přímku se směrnicí $a$; kvadratická funkce $f(x)=ax^2+bx+c$ má graf parabolu s vrcholem, který najdeme doplněním na čtverec.',
    terms: ['definiční obor', 'obor hodnot', 'směrnice', 'vrchol paraboly', 'osa paraboly', 'rostoucí/klesající funkce'],
    formulas: [
      { name: 'Lineární funkce', latex: 'f(x)=ax+b' },
      { name: 'Směrnice ze dvou bodů', latex: 'a=\\dfrac{y_2-y_1}{x_2-x_1}' },
      { name: 'Kvadratická funkce', latex: 'f(x)=ax^2+bx+c,\\ a\\neq0' },
      { name: 'Souřadnice vrcholu paraboly', latex: 'x_V=-\\dfrac{b}{2a},\\qquad y_V=f(x_V)' },
      { name: 'Vrcholový tvar', latex: 'f(x)=a(x-m)^2+n' },
    ],
    subtopics: [
      'Umím určit, zda je lineární funkce rostoucí nebo klesající podle znaménka a',
      'Umím sestavit rovnici přímky ze dvou bodů',
      'Umím najít souřadnice vrcholu paraboly',
      'Umím převést kvadratickou funkci na vrcholový tvar (doplnění na čtverec)',
      'Umím načrtnout graf lineární i kvadratické funkce',
      'Umím určit průsečíky grafu s osami x a y',
    ],
    workedExamples: [
      {
        problem: 'Najděte předpis lineární funkce, jejíž graf prochází body $A=[1,3]$ a $B=[4,9]$.',
        steps: [
          'Směrnici spočítáme jako $a=\\dfrac{y_2-y_1}{x_2-x_1}=\\dfrac{9-3}{4-1}=\\dfrac{6}{3}=2$.',
          'Předpis má tvar $f(x)=2x+b$, dosadíme bod $A$: $3=2\\cdot1+b$.',
          'Odtud $b=3-2=1$.',
          'Předpis funkce je $f(x)=2x+1$.',
        ],
        answer: 'f(x)=2x+1',
      },
      {
        problem: 'Najděte vrchol paraboly funkce $f(x)=x^2-4x+3$ a určete její minimum.',
        steps: [
          'Souřadnice $x$ vrcholu: $x_V=-\\dfrac{b}{2a}=-\\dfrac{-4}{2\\cdot1}=2$.',
          'Dosadíme do funkce: $f(2)=2^2-4\\cdot2+3=4-8+3=-1$.',
          'Vrchol paraboly je $V=[2,-1]$.',
          'Protože $a=1>0$, parabola má ramena nahoru a v bodě $V$ nabývá svého minima.',
        ],
        answer: 'V=[2,-1],\\ f_{min}=-1',
      },
    ],
    quiz: [
      {
        question: 'Jaký je vrchol paraboly $f(x)=x^2-6x+8$?',
        options: ['[3, -1]', '[3, 1]', '[-3, -1]', '[6, 8]'],
        correctIndex: 0,
      },
      {
        question: 'Lineární funkce $f(x)=-3x+2$ je:',
        options: ['rostoucí', 'klesající', 'konstantní', 'žádná z možností'],
        correctIndex: 1,
      },
      {
        question: 'Kolik průsečíků s osou x může mít graf kvadratické funkce nejvýše?',
        options: ['0', '1', '2', 'nekonečně mnoho'],
        correctIndex: 2,
      },
      {
        question: 'Graf konstantní funkce $f(x)=b$ (kdy $a=0$) je:',
        options: ['přímka rovnoběžná s osou x', 'přímka rovnoběžná s osou y', 'parabola', 'bod'],
        correctIndex: 0,
      },
      {
        question: 'Pro kvadratickou funkci $f(x)=ax^2+bx+c$ s $a<0$ platí, že parabola:',
        options: ['má ramena nahoru a vrchol je minimum', 'má ramena dolů a vrchol je maximum', 'je to vlastně přímka', 'nemá vrchol'],
        correctIndex: 1,
      },
    ],
    flashcards: [
      { front: 'Lineární funkce – předpis', back: '$f(x)=ax+b$' },
      { front: 'Směrnice ze dvou bodů', back: '$a=\\dfrac{y_2-y_1}{x_2-x_1}$' },
      { front: 'Kvadratická funkce – předpis', back: '$f(x)=ax^2+bx+c$' },
      { front: 'x-ová souřadnice vrcholu paraboly', back: '$x_V=-\\dfrac{b}{2a}$' },
      { front: 'Kdy má parabola ramena nahoru?', back: 'Když $a>0$ (vrchol je minimum)' },
      { front: 'Kdy má parabola ramena dolů?', back: 'Když $a<0$ (vrchol je maximum)' },
      { front: 'Definiční obor lineární i kvadratické funkce', back: '$\\mathbb{R}$ (všechna reálná čísla)' },
    ],
  },
  {
    id: 'exponencialni-logaritmicke',
    number: 6,
    title: 'Exponenciální a logaritmické funkce a rovnice',
    category: 'Funkce',
    difficulty: 'hard',
    comingSoon: true,
  },
  {
    id: 'goniometrie',
    number: 7,
    title: 'Goniometrické funkce a rovnice',
    category: 'Funkce',
    difficulty: 'hard',
    comingSoon: true,
  },
  {
    id: 'planimetrie',
    number: 8,
    title: 'Planimetrie',
    category: 'Geometrie',
    difficulty: 'medium',
    comingSoon: true,
  },
  {
    id: 'stereometrie',
    number: 9,
    title: 'Stereometrie',
    category: 'Geometrie',
    difficulty: 'hard',
    comingSoon: true,
  },
  {
    id: 'analyticka-geometrie',
    number: 10,
    title: 'Analytická geometrie',
    category: 'Geometrie',
    difficulty: 'hard',
    comingSoon: true,
  },
  {
    id: 'posloupnosti-rady',
    number: 11,
    title: 'Posloupnosti a řady',
    category: 'Algebra',
    difficulty: 'medium',
    comingSoon: true,
  },
  {
    id: 'kombinatorika-pravdepodobnost',
    number: 12,
    title: 'Kombinatorika, pravděpodobnost a statistika',
    category: 'Statistika',
    difficulty: 'medium',
    comingSoon: true,
  },
];

// Zajistí, že u nedopsaných témat existují prázdná pole místo undefined.
for (const t of ALL_TOPICS) {
  t.terms ??= [];
  t.formulas ??= [];
  t.subtopics ??= [];
  t.workedExamples ??= [];
  t.quiz ??= [];
  t.flashcards ??= [];
}
