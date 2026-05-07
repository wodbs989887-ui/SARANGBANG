import React, { useMemo, useState } from "react";

type MemberName =
  | "최휘종"
  | "이동준"
  | "안진용"
  | "박수민"
  | "제주안"
  | "최재윤"
  | "임새해"
  | "박임재"
  | "장의영";

type ScoreMap = Partial<Record<MemberName, number>>;

type Question = {
  text: string;
  scores: ScoreMap;
};

type MemberInfo = {
  emoji: string;
  desc: string;
};

type Result = {
  name: MemberName;
  score: number;
  percent: number;
};

type AnswerOption = {
  label: string;
  multiplier: number;
};

const MEMBERS: Record<MemberName, MemberInfo> = {
  "최휘종": {
    emoji: "🔥",
    desc: "절대 꺼지지 않는 엔진형. 청소, 채찍, 고난, 아침형 인간의 상징!",
  },
  "이동준": {
    emoji: "🐯",
    desc: "기강과 정리의 화신. 원칙과 청결로 사랑방 질서를 세우는 스타일!",
  },
  "안진용": {
    emoji: "⚾",
    desc: "눕기와 잠에 진심인 탱커형. 둥글둥글하지만 존재감은 확실한 스타일!",
  },
  "박수민": {
    emoji: "💻",
    desc: "피곤해도 묵묵히 할 일을 끝내는 성실 인내형!",
  },
  "제주안": {
    emoji: "🍵",
    desc: "관심 분야가 나오면 깊게 파고드는 4차원 설명형!",
  },
  "최재윤": {
    emoji: "🎹",
    desc: "이상한 드립과 뜬금없는 행동으로 분위기를 흔드는 순한 도라이형!",
  },
  "임새해": {
    emoji: "🏋️",
    desc: "대학원생 감성의 은은한 존재감. 피곤해도 묵묵히 버티는 연구형!",
  },
  "박임재": {
    emoji: "🍜",
    desc: "냉장고만 봐도 메뉴가 떠오르는 방밥 요리 장인형!",
  },
  "장의영": {
    emoji: "⚽",
    desc: "릴스, 밈, 드립을 사랑하는 사랑방 막내미 폭발형!",
  },
};

const ANSWER_OPTIONS: AnswerOption[] = [
  { label: "매우 그렇다", multiplier: 1 },
  { label: "그렇다", multiplier: 0.5 },
  { label: "보통이다", multiplier: 0 },
  { label: "그렇지 않다", multiplier: -0.5 },
  { label: "매우 그렇지 않다", multiplier: -1 },
];

const QUESTIONS: Question[] = [
  {
    text: "누가 맡은 일을 대충 하면 결국 내가 다시 하게 될 것 같다.",
    scores: {
      "이동준": 10,
      "최휘종": 7,
      "안진용": -6,
    },
  },
  {
    text: "일단 눕고 나서 생각하는 편이다.",
    scores: {
      "안진용": 9,
      "최휘종": -7,
      "이동준": -5,
    },
  },
  {
    text: "청소가 제대로 안 되어 있으면 신경 쓰인다.",
    scores: {
      "이동준": 10,
      "최휘종": 7,
      "장의영": -5,
    },
  },
  {
    text: "설명하다 보면 혼자 너무 깊게 들어간다.",
    scores: {
      "제주안": 9,
      "이동준": -4,
    },
  },
  {
    text: "아침에 누가 깨우지 않으면 계속 잘 자신 있다.",
    scores: {
      "안진용": 9,
      "장의영": 3,
      "최휘종": -6,
    },
  },
  {
    text: "사람 웃기려고 일부러 이상한 행동을 한 적이 많다.",
    scores: {
      "최재윤": 10,
      "이동준": -5,
      "박수민": -3,
    },
  },
  {
    text: "분위기가 너무 조용하면 괜히 한마디 하고 싶어진다.",
    scores: {
      "최재윤": 9,
      "장의영": 5,
      "박수민": -4,
    },
  },
  {
    text: "릴스 보다가 늦게 잔 적이 많다.",
    scores: {
      "장의영": 10,
      "안진용": 4,
      "최휘종": -5,
    },
  },
  {
    text: "모르는 밈이 거의 없다.",
    scores: {
      "장의영": 9,
      "최재윤": 6,
      "이동준": -4,
    },
  },
  {
    text: "피곤해도 자기 할 일은 결국 끝내고 잔다.",
    scores: {
      "박수민": 10,
      "임새해": 7,
      "안진용": -7,
    },
  },
  {
    text: "밤 늦게까지 과제나 일을 붙잡고 있는 날이 많다.",
    scores: {
      "박수민": 9,
      "임새해": 8,
      "안진용": -5,
    },
  },
  {
    text: "갑자기 아무도 안 궁금한 TMI를 진지하게 말한 적 있다.",
    scores: {
      "제주안": 9,
      "최재윤": 2,
      "이동준": -4,
    },
  },
  {
    text: "냉장고 재료를 보면 요리 가능 여부부터 생각한다.",
    scores: {
      "박임재": 10,
      "장의영": -4,
    },
  },
  {
    text: "배달보다 직접 해먹는 게 더 좋다.",
    scores: {
      "박임재": 9,
      "장의영": -5,
      "안진용": -3,
    },
  },
  {
    text: "아침이 되면 알람 없이도 눈이 떠지는 편이다.",
    scores: {
      "최휘종": 10,
      "이동준": 5,
      "안진용": -8,
      "박임재": -5,
    },
  },
  {
    text: "자기 전까지 휴대폰 붙잡고 있는 날이 많다.",
    scores: {
      "박임재": 8,
      "장의영": 7,
      "박수민": -5,
      "최휘종": -4,
    },
  },
  {
    text: "즐겨라 고통을 경험하라 인내를 같은 말에 공감된다.",
    scores: {
      "최휘종": 10,
      "박수민": 8,
      "장의영": -5,
    },
  },
  {
    text: "오늘 할 일은 결국 끝까지 하게 된다.",
    scores: {
      "박수민": 9,
      "최휘종": 6,
      "안진용": -7,
    },
  },
  {
    text: "진지한 상황이어도 웃긴 생각이 먼저 떠오를 때가 있다.",
    scores: {
      "최재윤": 8,
      "장의영": 5,
      "박수민": -4,
    },
  },
  {
    text: "사람들이 안 궁금해해도 혼자 계속 찾아보는 분야가 있다.",
    scores: {
      "제주안": 10,
      "박수민": -3,
    },
  },
  {
    text: "7시에 아침 먹고 BM 전까지 다시 누워있을 것 같다.",
    scores: {
      "안진용": 10,
      "최휘종": -8,
      "이동준": -5,
    },
  },
  {
    text: "아침당번이면 알람 여러 개 맞춰놓고도 마지막에 일어날 것 같다.",
    scores: {
      "안진용": 9,
      "최휘종": -7,
    },
  },
  {
    text: "사랑방 바닥에 머리카락 보이면 그냥 못 지나친다.",
    scores: {
      "이동준": 10,
      "최휘종": 7,
      "장의영": -5,
    },
  },
  {
    text: "누가 이상한 드립 치면 더 세게 받아칠 자신 있다.",
    scores: {
      "최재윤": 9,
      "장의영": 5,
      "이동준": -3,
    },
  },
  {
    text: "대학원에 진학하고도 사랑방에 계속 살 것 같다.",
    scores: {
      "임새해": 999,
    },
  },
];

function createInitialScores(): Record<MemberName, number> {
  return Object.keys(MEMBERS).reduce((accumulator, name) => {
    accumulator[name as MemberName] = 0;
    return accumulator;
  }, {} as Record<MemberName, number>);
}

function applyQuestionScores(
  currentScores: Record<MemberName, number>,
  scoreMap: ScoreMap,
  multiplier: number,
): Record<MemberName, number> {
  const updatedScores = { ...currentScores };

  Object.entries(scoreMap).forEach(([member, score]) => {
    if (member in updatedScores && typeof score === "number") {
      updatedScores[member as MemberName] += score * multiplier;
    }
  });

  return updatedScores;
}

export function calculateResults(scores: Record<MemberName, number>): Result[] {
  const entries = Object.entries(scores) as Array<[MemberName, number]>;

  const positiveEntries = entries.map(([name, score]) => [
    name,
    Math.max(0, score),
  ]) as Array<[MemberName, number]>;

  const positiveTotal = positiveEntries.reduce((sum, [, score]) => {
    return sum + score;
  }, 0);

  return entries
    .sort((a, b) => b[1] - a[1])
    .map(([name, score]) => {
      const positiveScore = Math.max(0, score);

      return {
        name,
        score,
        percent:
          positiveTotal === 0
            ? 0
            : Math.round((positiveScore / positiveTotal) * 100),
      };
    });
}

export function runTests(): boolean {
  const testScores = createInitialScores();
  testScores["최휘종"] = 5;
  testScores["이동준"] = 3;
  testScores["안진용"] = 1;

  const results = calculateResults(testScores);

  if (!Array.isArray(results)) {
    throw new Error("Results must be an array");
  }

  if (results[0].name !== "최휘종") {
    throw new Error("Top result should be 최휘종");
  }

  if (results[0].percent <= results[1].percent) {
    throw new Error("Percent sorting failed");
  }

  const scaleTest = applyQuestionScores(
    createInitialScores(),
    { "최휘종": 10, "안진용": -6 },
    -0.5,
  );

  if (scaleTest["최휘종"] !== -5 || scaleTest["안진용"] !== 3) {
    throw new Error("Likert scale reverse scoring failed");
  }

  const neutralTest = applyQuestionScores(
    createInitialScores(),
    { "최휘종": 10, "안진용": -6 },
    0,
  );

  if (neutralTest["최휘종"] !== 0 || neutralTest["안진용"] !== 0) {
    throw new Error("Likert scale neutral scoring failed");
  }

  const graduateQuestionScores = applyQuestionScores(
    createInitialScores(),
    QUESTIONS[24].scores,
    1,
  );

  if (graduateQuestionScores["임새해"] !== 999) {
    throw new Error("Graduate school question scoring failed");
  }

  return true;
}

runTests();

export default function SarangbangTest() {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Record<MemberName, number>>(
    createInitialScores,
  );

  const results = useMemo(() => {
    return calculateResults(scores);
  }, [scores]);

  const topResult = results[0];

  const handleAnswer = (multiplier: number) => {
    const currentQuestion = QUESTIONS[questionIndex];

    if (!currentQuestion) {
      return;
    }

    setScores((previousScores) => {
      return applyQuestionScores(
        previousScores,
        currentQuestion.scores,
        multiplier,
      );
    });

    if (questionIndex >= QUESTIONS.length - 1) {
      setFinished(true);
      return;
    }

    setQuestionIndex((previous) => previous + 1);
  };

  const resetTest = () => {
    setStarted(false);
    setFinished(false);
    setQuestionIndex(0);
    setScores(createInitialScores());
  };

  const progress = Math.round(((questionIndex + 1) / QUESTIONS.length) * 100);

  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-orange-100 via-white to-yellow-100 flex items-center justify-center px-4 py-5 sm:p-6">
      <div className="w-full max-w-md sm:max-w-2xl rounded-3xl bg-white px-5 py-6 sm:p-8 shadow-2xl">
        {!started ? (
          <div className="space-y-6 text-center">
            <h1 className="text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
              🏠 사랑방 성격유형 테스트
            </h1>

            <p className="text-base leading-relaxed text-gray-600 sm:text-lg">
              5점 척도로 답하고
              <br />
              당신과 가장 닮은 사랑방원을 찾아보세요!
            </p>

            <button
              type="button"
              onClick={() => setStarted(true)}
              className="w-full rounded-2xl bg-black px-6 py-4 text-base font-bold text-white transition active:scale-95 sm:w-auto sm:px-8 sm:text-lg sm:hover:scale-105"
            >
              테스트 시작하기
            </button>
          </div>
        ) : finished ? (
          <div className="space-y-8">
            {topResult ? (
              <div className="space-y-4 text-center">
                <div className="text-6xl">{MEMBERS[topResult.name].emoji}</div>

                <h2 className="text-2xl font-black sm:text-3xl">
                  당신의 사랑방원 유형은
                </h2>

                <h1 className="text-4xl font-black text-orange-500 sm:text-5xl">
                  {topResult.name}형
                </h1>

                <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
                  {MEMBERS[topResult.name].desc}
                </p>
              </div>
            ) : null}

            <div className="space-y-4">
              <h3 className="text-xl font-bold sm:text-2xl">📊 유형 비율</h3>

              {results.map((result) => (
                <div key={result.name} className="space-y-1">
                  <div className="flex justify-between font-semibold">
                    <span>
                      {MEMBERS[result.name].emoji} {result.name}
                    </span>

                    <span>{result.percent}%</span>
                  </div>

                  <div className="h-4 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-4 rounded-full bg-orange-400 transition-all duration-500"
                      style={{ width: `${Math.max(0, result.percent)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={resetTest}
              className="w-full rounded-2xl bg-black py-4 font-bold text-white transition active:scale-95 sm:hover:scale-[1.01]"
            >
              다시 테스트하기
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <div>
              <div className="mb-2 flex justify-between text-sm text-gray-500">
                <span>
                  질문 {questionIndex + 1} / {QUESTIONS.length}
                </span>

                <span>{progress}%</span>
              </div>

              <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-3 rounded-full bg-orange-400 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="flex min-h-[170px] items-center justify-center py-8 text-center sm:min-h-[180px] sm:py-10">
              <h2 className="text-xl font-bold leading-relaxed sm:text-2xl md:text-3xl">
                {QUESTIONS[questionIndex].text}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-2.5 sm:gap-3">
              {ANSWER_OPTIONS.map((option) => (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => handleAnswer(option.multiplier)}
                  className="rounded-2xl bg-gray-900 px-4 py-4 text-base font-bold text-white transition active:scale-95 sm:px-5 sm:text-lg sm:hover:scale-[1.02] sm:hover:bg-orange-500"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
